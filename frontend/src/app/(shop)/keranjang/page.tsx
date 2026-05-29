"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ShoppingCart, Trash2, Plus, Minus, Tag, X, ArrowRight, Loader2, Package } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { AuthGuard, SectionHeader } from "@/components/shared"

import { useCartSummary } from "@/features/cart/hooks/use-cart-summary"
import useAuthStore from "@/lib/stores/auth-store"
import { formatPrice } from "@/lib/utils-frontend"

export default function KeranjangPage() {
  const router = useRouter()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const [promoInput, setPromoInput] = useState("")

  const { data: cart, isLoading } = useCartSummary.useGet()
  const updateItemMut = useCartSummary.useUpdateItem()
  const removeItemMut = useCartSummary.useRemoveItem()
  const applyPromoMut = useCartSummary.useApplyPromo()
  const removePromoMut = useCartSummary.useRemovePromo()

  const handleQtyChange = (produkItemId: number, currentQty: number, delta: number) => {
    const newQty = currentQty + delta
    if (newQty < 1) {
      removeItemMut.mutate(produkItemId, { onError: () => toast.error("Gagal menghapus item") })
    } else {
      updateItemMut.mutate({ produkItemId, qty: newQty }, { onError: () => toast.error("Gagal mengubah jumlah") })
    }
  }

  const handleRemove = (produkItemId: number) => {
    removeItemMut.mutate(produkItemId, {
      onSuccess: () => toast.success("Item dihapus"),
      onError: () => toast.error("Gagal menghapus item"),
    })
  }

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return
    applyPromoMut.mutate(promoInput.trim(), {
      onSuccess: () => { toast.success("Kode promo diterapkan!"); setPromoInput("") },
      onError: () => toast.error("Kode promo tidak valid"),
    })
  }

  if (!isAuthenticated) return <AuthGuard icon={ShoppingCart} title="Masuk untuk melihat keranjang" description="Item keranjang tersimpan di akun Anda" />

  if (isLoading) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-4">
          <Skeleton className="h-8 w-48 bg-obsidian-800" />
          <Skeleton className="h-px w-24 bg-obsidian-800" />
          <div className="grid lg:grid-cols-[1fr_340px] gap-6 mt-6">
            <div className="space-y-3"><Skeleton className="h-32 bg-obsidian-800" /><Skeleton className="h-32 bg-obsidian-800" /></div>
            <Skeleton className="h-64 bg-obsidian-800" />
          </div>
        </div>
      </div>
    )
  }

  const items = cart?.items ?? []

  return (
    <div className="min-h-screen py-10 px-4 animate-[fadeIn_0.4s_ease]">
      <div className="max-w-5xl mx-auto">
        <SectionHeader label="Belanja" title="Keranjang Belanja" />

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-5">
            <div className="w-20 h-20 rounded-sm bg-obsidian-800/60 border border-obsidian-700/40 flex items-center justify-center">
              <ShoppingCart size={36} className="text-obsidian-600" />
            </div>
            <div className="text-center">
              <p className="text-obsidian-300 font-medium mb-1">Keranjang Anda kosong</p>
              <p className="text-sm text-obsidian-500">Temukan produk premium pilihan kami</p>
            </div>
            <Link href="/produk" className="btn-gold">Jelajahi Produk</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_340px] gap-6">

            {/* Items */}
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.produkItemId} className="card-dark flex gap-4 p-4 hover:border-obsidian-700 transition-colors">
                  <div className="w-20 h-20 shrink-0 bg-obsidian-800 rounded-sm overflow-hidden border border-obsidian-700/40">
                    {item.productImageUrl
                      ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={item.productImageUrl} alt={item.productName} className="w-full h-full object-cover" />
                      )
                      : <div className="w-full h-full flex items-center justify-center"><Package size={24} className="text-obsidian-600" /></div>
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-obsidian-100 text-sm leading-snug mb-1 truncate">{item.productName}</p>
                    <p className="text-gold-400 font-semibold font-heading text-sm">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-obsidian-700 rounded-sm overflow-hidden">
                        <Button variant="ghost" size="icon"
                          className="w-8 h-8 text-obsidian-400 hover:text-gold-400 hover:bg-obsidian-800 rounded-none"
                          disabled={updateItemMut.isPending || removeItemMut.isPending}
                          onClick={() => handleQtyChange(item.produkItemId, item.qty, -1)}>
                          <Minus size={12} />
                        </Button>
                        <span className="w-8 text-center text-sm text-obsidian-200 font-medium">{item.qty}</span>
                        <Button variant="ghost" size="icon"
                          className="w-8 h-8 text-obsidian-400 hover:text-gold-400 hover:bg-obsidian-800 rounded-none"
                          disabled={updateItemMut.isPending}
                          onClick={() => handleQtyChange(item.produkItemId, item.qty, 1)}>
                          <Plus size={12} />
                        </Button>
                      </div>
                      <Button variant="ghost" size="icon" className="w-8 h-8 text-obsidian-500 hover:text-red-400"
                        disabled={removeItemMut.isPending}
                        onClick={() => handleRemove(item.produkItemId)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                  <p className="font-semibold text-obsidian-100 font-heading shrink-0">{formatPrice(item.subtotal)}</p>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="space-y-4">
              {/* Promo */}
              <div className="card-dark p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={14} className="text-gold-500" />
                  <p className="text-xs font-semibold text-obsidian-400 uppercase tracking-widest">Kode Promo</p>
                </div>
                {cart?.promotionCode ? (
                  <div className="flex items-center justify-between bg-gold-500/10 border border-gold-800/50 rounded-sm px-3 py-2">
                    <span className="text-sm text-gold-400 font-semibold font-heading">{cart.promotionCode}</span>
                    <Button variant="ghost" size="icon" className="w-6 h-6 text-obsidian-500 hover:text-red-400"
                      disabled={removePromoMut.isPending}
                      onClick={() => removePromoMut.mutate(undefined, { onSuccess: () => toast.success("Promo dihapus") })}>
                      {removePromoMut.isPending ? <Loader2 size={12} className="animate-spin" /> : <X size={12} />}
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input value={promoInput} onChange={(e) => setPromoInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                      placeholder="Kode promo" className="input-dark text-xs py-2 flex-1" />
                    <Button variant="outline" onClick={handleApplyPromo}
                      disabled={applyPromoMut.isPending || !promoInput.trim()}
                      className="border-obsidian-700 bg-transparent text-obsidian-300 hover:border-gold-600 hover:text-gold-400 hover:bg-transparent text-xs">
                      {applyPromoMut.isPending ? <Loader2 size={12} className="animate-spin" /> : "Pakai"}
                    </Button>
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="card-dark p-5">
                <p className="text-xs font-semibold text-obsidian-500 uppercase tracking-widest mb-4">Ringkasan</p>
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-obsidian-400">
                    <span>Subtotal ({items.length} item)</span>
                    <span>{formatPrice(cart?.subtotalMinor ?? 0)}</span>
                  </div>
                  {(cart?.discountMinor ?? 0) > 0 && (
                    <div className="flex justify-between text-gold-500">
                      <span>Diskon</span><span>-{formatPrice(cart?.discountMinor ?? 0)}</span>
                    </div>
                  )}
                  {(cart?.shippingMinor ?? 0) > 0 && (
                    <div className="flex justify-between text-obsidian-400">
                      <span>Ongkir</span><span>{formatPrice(cart?.shippingMinor ?? 0)}</span>
                    </div>
                  )}
                </div>
                <Separator className="bg-obsidian-800 my-4" />
                <div className="flex justify-between font-bold text-base mb-5">
                  <span className="text-obsidian-100 font-heading">Total</span>
                  <span className="text-gold-400 font-heading">{formatPrice(cart?.totalHargaMinor ?? 0)}</span>
                </div>
                <Button className="btn-gold w-full flex items-center justify-center gap-2"
                  onClick={() => router.push("/checkout")}>
                  Lanjut Checkout <ArrowRight size={15} />
                </Button>
                <Link href="/produk" className="block text-center text-xs text-obsidian-500 hover:text-obsidian-300 mt-3 transition-colors">
                  ← Lanjut Belanja
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
