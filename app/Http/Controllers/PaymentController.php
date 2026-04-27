<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePaymentRequest;
use App\Http\Resources\PaymentResource;
use App\Models\Order;
use App\Models\Payment;
use App\Models\PromoCode;
use App\Models\ProdukItem;
use App\Services\PaymentGateways\MidtransGateway;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    public function __construct(
        private readonly MidtransGateway $midtransGateway
    ) {}

    public function store(StorePaymentRequest $request, int $orderId)
    {
        $provider = strtolower((string) $request->input('provider', 'mock'));

        // idempotency check
        if ($request->filled('idempotency_key')) {
            $existing = Payment::where('idempotency_key', $request->idempotency_key)
                ->whereHas('order', fn($q) => $q->where('user_id', $request->user()->id))
                ->with(['order', 'paymentDetail'])
                ->first();
            if ($existing) return new PaymentResource($existing);
        }

        $order = Order::where('id', $orderId)
            ->where('user_id', $request->user()->id)
            ->where('status', 'pending')
            ->with(['details.produkItem', 'payment', 'promotion.promoCode', 'user', 'shipping'])
            ->firstOrFail();

        if ($order->details->isEmpty()) abort(400, 'Order tidak memiliki item');

        return match ($provider) {
            'midtrans' => $this->storeWithMidtrans($request, $order),
            'mock', '' => $this->storeWithMock($request, $order),
            default => abort(422, 'Provider payment tidak didukung.'),
        };
    }

    private function storeWithMock(StorePaymentRequest $request, Order $order)
    {
        return DB::transaction(function () use ($request, $order) {
            $lockedOrder = Order::whereKey($order->id)
                ->lockForUpdate()
                ->with(['details.produkItem', 'payment', 'promotion.promoCode'])
                ->firstOrFail();

            if ($lockedOrder->payment) abort(400, 'Order sudah dibayar');

            foreach ($lockedOrder->details as $item) {
                $produk = ProdukItem::whereKey($item->produk_item_id)->lockForUpdate()->firstOrFail();
                if ($produk->stok < $item->qty) abort(400, 'Stok tidak cukup untuk ' . $produk->nama);
                $produk->decrement('stok', $item->qty);
            }

            if (! $lockedOrder->order_number) {
                $lockedOrder->order_number = $this->generateOrderNumber($lockedOrder->id);
                $lockedOrder->save();
            }

            $amount = (int) ($lockedOrder->total_harga_minor ?? $lockedOrder->total_harga);
            $idempotencyKey = $request->input('idempotency_key') ?: ('mock-' . Str::uuid());
            $providerTxnId = (string) Str::uuid();

            $payment = Payment::create([
                'order_id' => $lockedOrder->id,
                'metode' => $request->metode,
                'status' => 'success',
                'currency_code' => $lockedOrder->currency_code ?? 'IDR',
                'amount_minor' => $amount,
                'net_amount_minor' => $amount,
                'provider' => 'mock',
                'provider_txn_id' => $providerTxnId,
                'idempotency_key' => $idempotencyKey,
                'gateway_status' => 'success',
                'gateway_code' => $request->input('gateway_code'),
                'gateway_message' => $request->input('gateway_message'),
                'paid_at' => now(),
                'captured_at' => now(),
                'authorized_at' => now(),
            ]);

            $payload = $request->input('detail', ['source' => 'mock']);
            $encoded = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

            $payment->paymentDetail()->updateOrCreate(
                ['payment_id' => $payment->id],
                [
                    'detail' => $payload,
                    'payload_hash' => hash('sha256', $encoded ?: '{}'),
                    'payload_received_at' => now(),
                ]
            );

            $lockedOrder->update([
                'status' => 'paid',
                'financial_status' => 'paid',
                'processing_at' => $lockedOrder->processing_at ?? now(),
            ]);

            if ($lockedOrder->promotion?->promoCode) {
                PromoCode::whereKey($lockedOrder->promotion->promoCode->id)->increment('used_count');
            }

            return new PaymentResource($payment->load(['order', 'paymentDetail']));
        });
    }

    private function storeWithMidtrans(StorePaymentRequest $request, Order $order)
    {
        return DB::transaction(function () use ($request, $order) {
            $lockedOrder = Order::whereKey($order->id)
                ->lockForUpdate()
                ->with(['details.produkItem', 'payment.paymentDetail', 'promotion.promoCode', 'user', 'shipping'])
                ->firstOrFail();

            if ($lockedOrder->payment && $lockedOrder->payment->status === 'success') {
                abort(400, 'Order sudah dibayar');
            }

            if (! $lockedOrder->order_number) {
                $lockedOrder->order_number = $this->generateOrderNumber($lockedOrder->id);
                $lockedOrder->save();
            }

            $amount = (int) ($lockedOrder->total_harga_minor ?? $lockedOrder->total_harga);
            if ($amount <= 0) abort(422, 'Total order tidak valid untuk transaksi gateway.');

            $idempotencyKey = $request->input('idempotency_key') ?: ('midtrans-' . Str::uuid());
            $payload = $this->midtransGateway->buildSnapPayload($lockedOrder, $amount, $request->metode);
            $response = $this->midtransGateway->createSnapTransaction($payload, $idempotencyKey);

            $payment = Payment::updateOrCreate(
                ['order_id' => $lockedOrder->id],
                [
                    'metode' => $request->metode,
                    'status' => 'pending',
                    'currency_code' => $lockedOrder->currency_code ?? 'IDR',
                    'amount_minor' => $amount,
                    'net_amount_minor' => $amount,
                    'provider' => 'midtrans',
                    'provider_txn_id' => null,
                    'idempotency_key' => $idempotencyKey,
                    'gateway_status' => 'pending',
                ]
            );

            $detailPayload = [
                'gateway' => [
                    'name' => 'midtrans',
                    'order_id' => $lockedOrder->order_number,
                    'token' => $response['token'] ?? null,
                    'redirect_url' => $response['redirect_url'] ?? null,
                ],
                'request' => $payload,
                'response' => $response,
            ];

            $encoded = json_encode($detailPayload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

            $payment->paymentDetail()->updateOrCreate(
                ['payment_id' => $payment->id],
                [
                    'detail' => $detailPayload,
                    'payload_hash' => hash('sha256', $encoded ?: '{}'),
                    'payload_received_at' => now(),
                ]
            );

            $lockedOrder->update(['financial_status' => 'pending']);

            return response()->json([
                'message' => 'Transaksi gateway berhasil dibuat.',
                'data' => new PaymentResource($payment->load(['order', 'paymentDetail'])),
                'gateway' => $detailPayload['gateway'],
            ], 201);
        });
    }

    private function generateOrderNumber(int $orderId): string
    {
        return 'INV-' . now()->format('Ymd') . '-' . str_pad((string) $orderId, 8, '0', STR_PAD_LEFT);
    }
}