import type { PaymentRead } from "../types/payment-read"
import type { PaymentFormValues } from "../contracts/api-schema"

interface RawPaymentResponse {
  id: number
  order_id: number
  invoice_number: string | null
  metode: string | null
  status: string
  paid_at: string | null
  provider: string | null
  provider_txn_id: string | null
  gateway_status: string | null
  amount_minor: number | null
  refund_amount_minor: number | null
  total_harga: number
  items?: any[]
  promotion?: { code: string | null; discount_minor: number } | null
  gateway?: { name?: string | null; order_id?: string | null; token?: string | null; redirect_url?: string | null } | null
  detail?: any
}

export namespace PaymentMapper {
  export const toApiRead = (api: RawPaymentResponse): PaymentRead.Show => ({
    id:                   api.id,
    orderId:              api.order_id,
    invoiceNumber:        api.invoice_number ?? null,
    status:               api.status as any,
    totalHarga:           api.total_harga ?? 0,
    subtotalMinor:        api.amount_minor ?? 0,
    discountMinor:        api.promotion?.discount_minor ?? 0,
    shippingMinor:        0,
    taxMinor:             0,
    totalHargaMinor:      api.amount_minor ?? 0,
    paymentStatus:        api.status,
    financialStatus:      api.status,
    fulfillmentStatus:    api.status,
    createdAt:            api.paid_at ?? "",
    // Shipping — not in PaymentResource, empty
    shippingNama:         null,
    shippingTelepon:      null,
    shippingAlamat:       null,
    shippingKota:         null,
    shippingKodePos:      null,
    // Promo
    promoCode:            api.promotion?.code ?? null,
    promoDiscountMinor:   api.promotion?.discount_minor ?? 0,
    // Payment detail
    paymentId:            api.id,
    paymentMetode:        api.metode,
    paymentStatusDetail:  api.gateway_status,
    paymentPaidAt:        api.paid_at,
    paymentProvider:      api.provider,
    paymentProviderTxnId: api.provider_txn_id,
    paymentGatewayStatus: api.gateway_status,
    paymentAmountMinor:   api.amount_minor,
    paymentRefundAmountMinor: api.refund_amount_minor,
    paymentGatewayName:   api.gateway?.name ?? null,
    paymentGatewayOrderId: api.gateway?.order_id ?? null,
    paymentGatewayToken:  api.gateway?.token ?? null,
    paymentGatewayRedirectUrl: api.gateway?.redirect_url ?? null,
    // Items
    items: (api.items ?? []).map((item: any) => ({
      id:           item.id,
      produkItemId: item.produk_item_id,
      nama:         item.nama ?? item.produk?.nama ?? "",
      gambar:       item.gambar ?? item.produk?.gambar ?? "",
      imageUrl:     item.image_url ?? item.produk?.image_url ?? "",
      qty:          item.qty,
      harga:        item.harga,
      subtotal:     item.subtotal,
    })),
  })

  export const toApiReadList = (api: RawPaymentResponse[]): PaymentRead.Show[] =>
    api.map(toApiRead)

  export const toApiCreate = (form: PaymentFormValues.Create): { metode: string } => ({
    metode: form.metode,
  })
}
