"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import {
  Lock, Package, ArrowLeft, MapPin, Loader2,
  CreditCard, Wallet, Building2, ChevronRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { AuthGuard, SectionHeader } from "@/components/shared"

import { useCartSummary } from "@/features/cart/hooks/use-cart-summary"
import { useOrder } from "@/features/order/hooks/use-order"
import { usePayment } from "@/features/payment/hooks/use-payment"
import useAuthStore from "@/lib/stores/auth-store"
import { formatPrice } from "@/lib/utils-frontend"
import { OrderApiSchema, OrderDefaultValues } from "@/features/order/contracts/api-schema"
import type { OrderFormValues } from "@/features/order/contracts/api-schema"

// ── Metode pembayaran ──────────────────────────────────────
const PAYMENT_METHODS = [
  { id: "transfer_bank", label: "Transfer Bank",    icon: Building2, desc: "BCA · Mandiri · BNI · BRI" },
  { id: "e_wallet",      label: "E-Wallet",         icon: Wallet,    desc: "GoPay · OVO · DANA · ShopeePay" },
  { id: "kartu_kredit",  label: "Kartu Kredit/Debit", icon: CreditCard, desc: "Visa · Mastercard · JCB" },
] as const

type PaymentMethodId = typeof PAYMENT_METHODS[number]["id"]

// ── Combined form schema ───────────────────────────────────
const CheckoutSchema = OrderApiSchema.Create

// ── Step indicator ─────────────────────────────────────────
function StepIndicator({ step }: { step: 1 | 2 }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      {[
        { n: 1, label: "Alamat" },
        { n: 2, label: "Pembayaran" },
      ].map(({ n, label }, i) => (
        <div key={n} className="flex items-center gap-3">
          {i > 0 && <div className={`h-px w-8 ${step > 1 ? "bg-gold-500" : "bg-obsidian-700"}`} />}
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-sm flex items-center justify-center text-xs font-bold transition-colors ${
              step === n
                ? "bg-gold-500 text-obsidian-950"
                : step > n
                  ? "bg-gold-500/20 border border-gold-700/40 text-gold-400"
                  : "bg-obsidian-800 border border-obsidian-700 text-obsidian-500"
            }`}>{n}</div>
            <span className={`text-xs font-semibold uppercase tracking-wide ${
              step === n ? "text-gold-400" : step > n ? "text-obsidian-400" : "text-obsidian-600"
            }`}>{label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function CheckoutPage() {
  const router = useRouter()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  const { data: cart, isLoading: cartLoading } = useCartSummary.get()
  const createOrder = useOrder.create()

  // orderId diisi setelah step 1 selesai — dipakai untuk usePayment
  const [orderId, setOrderId] = useState<number>(0)
  const createPayment = usePayment.create(orderId)

  const [step, setStep] = useState<1 | 2>(1)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>("transfer_bank")
  const [savedOrder, setSavedOrder] = useState<{ id: number; invoice: string } | null>(null)

  const form = useForm<OrderFormValues.Create>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: OrderDefaultValues.create,
  })

  // ── Step 1: buat order ──────────────────────────────────
  const onShippingSubmit = async (values: OrderFormValues.Create) => {
    try {
      const order = await createOrder.mutateAsync(values)
      setOrderId(order.id)
      setSavedOrder({ id: order.id, invoice: order.invoiceNumber ?? `#${order.id}` })
      setStep(2)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch {
      toast.error("Gagal membuat pesanan, coba lagi")
    }
  }

  // ── Step 2: proses payment ──────────────────────────────
  const onPaymentSubmit = async () => {
    if (!savedOrder) return
    try {
      const payment = await createPayment.mutateAsync({
        metode: paymentMethod,
        provider: "mock",
      })
      toast.success("Pembayaran berhasil!")
      router.push(
        `/payment/success?orderId=${savedOrder.id}&invoice=${savedOrder.invoice}&status=${payment.status ?? "paid"}`
      )
    } catch {
      toast.error("Pembayaran gagal, coba lagi")
    }
  }

  if (!isAuthenticated) return <AuthGuard icon={Lock} title="Masuk untuk checkout" />

  const items = cart?.items ?? []

  return (
    <div className="min-h-screen py-10 px-4 animate-[fadeIn_0.4s_ease]">
      <div className="max-w-5xl mx-auto">

        <Link href="/keranjang"
          className="inline-flex items-center gap-2 text-xs text-obsidian-500 hover:text-obsidian-300 transition-colors mb-6">
          <ArrowLeft size={13} /> Kembali ke Keranjang
        </Link>

        <SectionHeader label="Checkout" title="Selesaikan Pesanan" />
        <StepIndicator step={step} />

        <div className="grid lg:grid-cols-[1fr_360px] gap-8">

          {/* ── Left: form ── */}
          <div>

            {/* STEP 1 — Alamat */}
            {step === 1 && (
              <div className="card-dark p-6 animate-[fadeIn_0.3s_ease]">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-obsidian-800">
                  <MapPin size={16} className="text-gold-500" />
                  <h2 className="font-heading text-lg text-obsidian-100">Alamat Pengiriman</h2>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onShippingSubmit)} className="space-y-5">

                    <FormField name="shippingNama" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-obsidian-400 uppercase tracking-widest">
                          Nama Penerima *
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Nama lengkap penerima" className="input-dark" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField name="shippingTelepon" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-obsidian-400 uppercase tracking-widest">
                          Nomor Telepon
                        </FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="08xx-xxxx-xxxx" className="input-dark" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField name="shippingAlamat" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-obsidian-400 uppercase tracking-widest">
                          Alamat Lengkap *
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Jalan, nomor, RT/RW, kelurahan, kecamatan..."
                            rows={3} className="input-dark resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField name="shippingKota" control={form.control} render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-obsidian-400 uppercase tracking-widest">Kota</FormLabel>
                          <FormControl><Input placeholder="Jakarta" className="input-dark" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField name="shippingKodePos" control={form.control} render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-obsidian-400 uppercase tracking-widest">Kode Pos</FormLabel>
                          <FormControl><Input placeholder="12345" maxLength={10} className="input-dark" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <Button type="submit"
                      disabled={createOrder.isPending || items.length === 0}
                      className="btn-gold w-full flex items-center justify-center gap-2 mt-2">
                      {createOrder.isPending
                        ? <><Loader2 size={14} className="animate-spin" /> Menyimpan...</>
                        : <>Lanjut ke Pembayaran <ChevronRight size={14} /></>
                      }
                    </Button>
                  </form>
                </Form>
              </div>
            )}

            {/* STEP 2 — Pembayaran */}
            {step === 2 && savedOrder && (
              <div className="space-y-4 animate-[fadeIn_0.3s_ease]">

                {/* Alamat ringkas */}
                <div className="card-dark p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-gold-500" />
                      <p className="text-xs font-semibold text-obsidian-400 uppercase tracking-widest">Alamat Pengiriman</p>
                    </div>
                    <button onClick={() => setStep(1)}
                      className="text-xs text-obsidian-500 hover:text-gold-400 transition-colors underline underline-offset-2">
                      Ubah
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-obsidian-200">{form.getValues("shippingNama")}</p>
                  <p className="text-sm text-obsidian-400 mt-0.5">{form.getValues("shippingAlamat")}</p>
                  <p className="text-sm text-obsidian-400">
                    {form.getValues("shippingKota")}
                    {form.getValues("shippingKodePos") ? `, ${form.getValues("shippingKodePos")}` : ""}
                  </p>
                  {form.getValues("shippingTelepon") && (
                    <p className="text-xs text-obsidian-500 mt-1">{form.getValues("shippingTelepon")}</p>
                  )}
                </div>

                {/* Pilih metode */}
                <div className="card-dark p-5">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-obsidian-800">
                    <CreditCard size={14} className="text-gold-500" />
                    <p className="text-xs font-semibold text-obsidian-400 uppercase tracking-widest">Metode Pembayaran</p>
                  </div>
                  <div className="space-y-2.5">
                    {PAYMENT_METHODS.map(({ id, label, icon: Icon, desc }) => (
                      <button key={id} type="button" onClick={() => setPaymentMethod(id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-sm border text-left transition-all duration-150 ${
                          paymentMethod === id
                            ? "border-gold-700/70 bg-gold-500/5"
                            : "border-obsidian-800/60 hover:border-obsidian-700 hover:bg-obsidian-800/20"
                        }`}>
                        <div className={`w-10 h-10 rounded-sm flex items-center justify-center shrink-0 transition-colors ${
                          paymentMethod === id
                            ? "bg-gold-500/20 border border-gold-700/40"
                            : "bg-obsidian-800 border border-obsidian-700/40"
                        }`}>
                          <Icon size={18} className={paymentMethod === id ? "text-gold-400" : "text-obsidian-500"} />
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-semibold ${paymentMethod === id ? "text-obsidian-100" : "text-obsidian-300"}`}>
                            {label}
                          </p>
                          <p className="text-xs text-obsidian-500 mt-0.5">{desc}</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                          paymentMethod === id ? "border-gold-500" : "border-obsidian-600"
                        }`}>
                          {paymentMethod === id && <div className="w-2 h-2 rounded-full bg-gold-500" />}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-obsidian-800 flex items-center gap-2">
                    <Lock size={12} className="text-obsidian-600" />
                    <p className="text-xs text-obsidian-600">Transaksi aman & terenkripsi SSL</p>
                  </div>
                </div>

                <Button onClick={onPaymentSubmit}
                  disabled={createPayment.isPending}
                  className="btn-gold w-full flex items-center justify-center gap-2 h-12 text-base">
                  {createPayment.isPending
                    ? <><Loader2 size={16} className="animate-spin" /> Memproses Pembayaran...</>
                    : <><Lock size={15} /> Bayar Sekarang</>
                  }
                </Button>
              </div>
            )}
          </div>

          {/* ── Right: order summary ── */}
          <div className="card-dark p-5 h-fit">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-obsidian-800">
              <Package size={14} className="text-gold-500" />
              <p className="text-xs font-semibold text-obsidian-400 uppercase tracking-widest">Ringkasan Pesanan</p>
            </div>

            {cartLoading ? (
              <div className="space-y-2.5">
                <Skeleton className="h-14 bg-obsidian-800" />
                <Skeleton className="h-14 bg-obsidian-800" />
              </div>
            ) : (
              <div className="space-y-3 max-h-72 overflow-y-auto mb-4">
                {items.map((item) => (
                  <div key={item.produkItemId} className="flex items-center gap-3">
                    <div className="w-12 h-12 shrink-0 bg-obsidian-800 rounded-sm overflow-hidden border border-obsidian-700/40">
                      {item.productImageUrl && (
                        <img src={item.productImageUrl} alt={item.productName} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-obsidian-300 truncate">{item.productName}</p>
                      <p className="text-xs text-obsidian-500">×{item.qty} · {formatPrice(item.price)}</p>
                    </div>
                    <p className="text-xs font-semibold text-obsidian-200 shrink-0">{formatPrice(item.subtotal)}</p>
                  </div>
                ))}
              </div>
            )}

            <Separator className="bg-obsidian-800 mb-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-obsidian-400">
                <span>Subtotal</span><span>{formatPrice(cart?.subtotalMinor ?? 0)}</span>
              </div>
              {(cart?.discountMinor ?? 0) > 0 && (
                <div className="flex justify-between text-gold-500">
                  <span>Diskon</span><span>-{formatPrice(cart.discountMinor)}</span>
                </div>
              )}
              {(cart?.shippingMinor ?? 0) > 0 && (
                <div className="flex justify-between text-obsidian-400">
                  <span>Ongkir</span><span>{formatPrice(cart.shippingMinor)}</span>
                </div>
              )}
            </div>
            <Separator className="bg-obsidian-800 my-4" />
            <div className="flex justify-between font-bold text-base">
              <span className="text-obsidian-100 font-heading">Total</span>
              <span className="text-gold-400 font-heading">{formatPrice(cart?.totalHargaMinor ?? 0)}</span>
            </div>

            {savedOrder && (
              <div className="mt-4 pt-4 border-t border-obsidian-800">
                <p className="text-xs text-obsidian-500 mb-1">Nomor Pesanan</p>
                <p className="font-heading text-gold-400 font-semibold">{savedOrder.invoice}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
