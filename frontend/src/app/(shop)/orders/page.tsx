"use client"

import { useState } from "react"
import Link from "next/link"
import { Package, Download, ChevronRight, FileText, Loader2, ShoppingBag, User } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { PageLoader, ErrorState, AuthGuard, SectionHeader, StatusBadge } from "@/components/shared"

import { useOrder } from "@/features/order/hooks/use-order"
import useAuthStore from "@/lib/stores/auth-store"
import { formatPrice, formatDate } from "@/lib/utils-frontend"
import type { OrderRead } from "@/features/order/types/order-read"
import apiClient from "@/lib/core/api-client"

export default function OrdersPage() {
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [downloadingId, setDownloadingId] = useState<number | null>(null)

  const { data: orders, isLoading, isError } = useOrder.index()
  const { data: detail, isLoading: detailLoading } = useOrder.show(selectedId ?? 0)

  const handleDownloadInvoice = async (orderId: number) => {
    setDownloadingId(orderId)
    try {
      const response = await apiClient.get(`/orders/${orderId}/invoice`, { responseType: "blob" })
      const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }))
      const a = document.createElement("a")
      a.href = url
      a.download = `invoice-order-${orderId}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast.success("Invoice berhasil diunduh")
    } catch {
      toast.error("Gagal mengunduh invoice")
    } finally {
      setDownloadingId(null)
    }
  }

  if (!isAuthenticated) return <AuthGuard icon={Package} title="Masuk untuk melihat pesanan" description="Lacak semua pesanan Anda di satu tempat" />
  if (isLoading) return <PageLoader text="Memuat pesanan..." />
  if (isError) return <ErrorState title="Gagal memuat pesanan" />

  return (
    <div className="min-h-screen py-10 px-4 animate-[fadeIn_0.4s_ease]">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="Akun Saya" title="Pesanan Saya" subtitle="Riwayat dan detail semua pesanan Anda" />

        <div className="grid lg:grid-cols-[280px_1fr] gap-6">

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="card-dark p-5">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-obsidian-800">
                <div className="w-11 h-11 rounded-sm bg-gradient-to-br from-gold-600/30 to-gold-400/10 border border-gold-700/40 flex items-center justify-center text-gold-400 font-heading font-bold text-lg shrink-0">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-obsidian-100 text-sm truncate">{user?.name}</p>
                  <p className="text-xs text-obsidian-500 truncate">{user?.email}</p>
                </div>
              </div>
              <nav className="space-y-1">
                {[
                  { href: "/profile", label: "Profil Saya", icon: User },
                  { href: "/orders",  label: "Pesanan",     icon: ShoppingBag, active: true },
                ].map(({ href, label, icon: Icon, active }) => (
                  <Link key={href} href={href}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-sm text-sm transition-colors ${
                      active
                        ? "bg-gold-500/10 text-gold-400 border border-gold-800/40"
                        : "text-obsidian-400 hover:bg-obsidian-800/40 hover:text-obsidian-200"
                    }`}>
                    <Icon size={14} />{label}
                    {active && <ChevronRight size={13} className="ml-auto" />}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="card-dark p-4">
              <p className="text-xs font-semibold text-obsidian-500 uppercase tracking-widest mb-3">Riwayat Pesanan</p>
              {!orders?.length ? (
                <div className="text-center py-8">
                  <Package size={32} className="text-obsidian-700 mx-auto mb-3" />
                  <p className="text-xs text-obsidian-500 mb-3">Belum ada pesanan</p>
                  <Link href="/produk" className="text-xs text-gold-500 hover:text-gold-400 underline underline-offset-2">Mulai belanja</Link>
                </div>
              ) : (
                <ScrollArea className="max-h-[480px]">
                  <div className="space-y-2 pr-1">
                    {orders.map((order: OrderRead.Index) => (
                      <button key={order.id} onClick={() => setSelectedId(order.id)}
                        className={`w-full text-left p-3 rounded-sm border transition-all duration-150 ${
                          selectedId === order.id
                            ? "border-gold-700/70 bg-gold-500/5"
                            : "border-obsidian-800/60 hover:border-obsidian-700 hover:bg-obsidian-800/20"
                        }`}>
                        <div className="flex items-center justify-between mb-1.5 gap-2">
                          <span className="text-xs font-semibold text-obsidian-200 truncate">{order.invoiceNumber || `#${order.id}`}</span>
                          <StatusBadge status={order.paymentStatus} />
                        </div>
                        <p className="text-[11px] text-obsidian-600">{formatDate(order.createdAt)}</p>
                        <p className="text-xs text-gold-500 mt-1 font-semibold font-heading">{formatPrice(order.totalHargaMinor)}</p>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </div>
          </aside>

          {/* Detail Panel */}
          <main className="card-dark p-6 min-h-[500px]">
            {!selectedId ? (
              <div className="flex flex-col items-center justify-center h-full min-h-80 gap-4">
                <div className="w-16 h-16 rounded-sm bg-obsidian-800/60 border border-obsidian-700/40 flex items-center justify-center">
                  <FileText size={28} className="text-obsidian-600" />
                </div>
                <p className="text-obsidian-500 text-sm">Pilih pesanan untuk melihat detail</p>
              </div>
            ) : detailLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-7 w-48 bg-obsidian-800" />
                <Skeleton className="h-4 w-32 bg-obsidian-800" />
                <Separator className="bg-obsidian-800 my-4" />
                <Skeleton className="h-24 bg-obsidian-800" />
                <Skeleton className="h-20 bg-obsidian-800" />
                <Skeleton className="h-20 bg-obsidian-800" />
              </div>
            ) : detail ? (
              <div className="animate-[fadeIn_0.3s_ease]">
                {/* Header */}
                <div className="flex items-start justify-between mb-6 pb-5 border-b border-obsidian-800 gap-4">
                  <div>
                    <h2 className="font-heading text-2xl text-obsidian-50">{detail.invoiceNumber || `Order #${detail.id}`}</h2>
                    <p className="text-sm text-obsidian-500 mt-1">{formatDate(detail.createdAt)}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <StatusBadge status={detail.paymentStatus} />
                      {detail.fulfillmentStatus && detail.fulfillmentStatus !== detail.paymentStatus && (
                        <StatusBadge status={detail.fulfillmentStatus} />
                      )}
                    </div>
                  </div>
                  <Button variant="outline"
                    onClick={() => handleDownloadInvoice(detail.id)}
                    disabled={downloadingId === detail.id}
                    className="border-obsidian-700 bg-transparent text-obsidian-300 hover:border-gold-600 hover:text-gold-400 hover:bg-transparent shrink-0 text-xs uppercase tracking-wide">
                    {downloadingId === detail.id ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />}
                    Invoice
                  </Button>
                </div>

                {/* Shipping */}
                {detail.shippingNama && (
                  <div className="bg-obsidian-900/50 border border-obsidian-800/50 rounded-sm p-4 mb-6">
                    <p className="text-xs font-semibold text-obsidian-400 uppercase tracking-widest mb-3">Alamat Pengiriman</p>
                    <p className="text-sm font-semibold text-obsidian-100">{detail.shippingNama}</p>
                    <p className="text-sm text-obsidian-400 mt-0.5">{detail.shippingAlamat}</p>
                    <p className="text-sm text-obsidian-400">{detail.shippingKota}{detail.shippingKodePos ? `, ${detail.shippingKodePos}` : ""}</p>
                    {detail.shippingTelepon && <p className="text-xs text-obsidian-500 mt-1">{detail.shippingTelepon}</p>}
                  </div>
                )}

                {/* Items */}
                <p className="text-xs font-semibold text-obsidian-500 uppercase tracking-widest mb-3">Item Pesanan</p>
                <div className="space-y-2.5 mb-6">
                  {detail.items?.map((item: OrderRead.Item) => (
                    <div key={item.produkItemId}
                      className="flex items-center gap-4 p-3.5 border border-obsidian-800/40 bg-obsidian-900/30 rounded-sm">
                      <div className="w-14 h-14 bg-obsidian-800 rounded-sm shrink-0 overflow-hidden border border-obsidian-700/40">
                        {item.productImageUrl
                          ? <img src={item.productImageUrl} alt={item.productName} className="w-full h-full object-cover" />
                          : <div className="w-full h-full flex items-center justify-center"><Package size={18} className="text-obsidian-600" /></div>
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-obsidian-200 text-sm truncate">{item.productName}</p>
                        <p className="text-xs text-obsidian-500 mt-1">{item.qty} × {formatPrice(item.price)}</p>
                      </div>
                      <p className="font-semibold text-obsidian-100 text-sm font-heading shrink-0">{formatPrice(item.subtotal)}</p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <Separator className="bg-obsidian-800 mb-4" />
                <div className="space-y-2.5">
                  {[
                    { label: "Subtotal", val: detail.subtotalMinor, show: true },
                    { label: `Diskon${detail.promotionCode ? ` (${detail.promotionCode})` : ""}`, val: -(detail.discountMinor ?? 0), show: (detail.discountMinor ?? 0) > 0, cls: "text-gold-500" },
                    { label: "Ongkos Kirim", val: detail.shippingMinor ?? 0, show: (detail.shippingMinor ?? 0) > 0 },
                  ].filter(r => r.show).map(row => (
                    <div key={row.label} className={`flex justify-between text-sm ${row.cls ?? "text-obsidian-400"}`}>
                      <span>{row.label}</span>
                      <span>{row.val < 0 ? `-${formatPrice(-row.val)}` : formatPrice(row.val)}</span>
                    </div>
                  ))}
                  <Separator className="bg-obsidian-800 my-2" />
                  <div className="flex justify-between font-bold text-base">
                    <span className="text-obsidian-100 font-heading">Total</span>
                    <span className="text-gold-400 font-heading">{formatPrice(detail.totalHargaMinor)}</span>
                  </div>
                </div>
              </div>
            ) : null}
          </main>
        </div>
      </div>
    </div>
  )
}
