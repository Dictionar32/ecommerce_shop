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

import {
  PageContainer, ContentWrapper, GridContainer,
  EmptyState, ItemsList, CartItemCard, SummaryColumn, PromoCard, TotalsCard, SkeletonScreen,
  SkelTitle, SkelLine, SkelItem, SkelSummary,
  IconCart, IconPackage, IconTag, IconMinus, IconPlus, IconTrash, IconArrowRight, IconX, IconLoader,
  StyledInput, StyledSeparator, ActionLink, ContinueShoppingLink, CartItemImg,
  QtyBtn, RemoveBtn, RemovePromoBtn, ApplyPromoBtn, CheckoutBtn
} from "./keranjang.styles"

import { useKeranjangGet, useCartPatchItemsProdukItemId, useCartDeleteItemsProdukItemId, useCartPostPromo, useCartDeletePromo } from "@/api/hooks"
import useAuthStore from "@/lib/stores/auth-store"
import { formatPrice } from "@/lib/utils-frontend"

export default function KeranjangPage() {
  const router = useRouter()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const [promoInput, setPromoInput] = useState("")

  const { data: resCart, isLoading } = useKeranjangGet()
  const cart: any = resCart?.data
  const updateItemMut = useCartPatchItemsProdukItemId()
  const removeItemMut = useCartDeleteItemsProdukItemId()
  const applyPromoMut = useCartPostPromo()
  const removePromoMut = useCartDeletePromo()

  const handleQtyChange = (produkItemId: number, currentQty: number, delta: number) => {
    const newQty = currentQty + delta
    if (newQty < 1) {
      removeItemMut.mutate({ produkItemId }, { onError: () => toast.error("Gagal menghapus item") })
    } else {
      updateItemMut.mutate({ produkItemId, qty: newQty }, { onError: () => toast.error("Gagal mengubah jumlah") })
    }
  }

  const handleRemove = (produkItemId: number) => {
    removeItemMut.mutate({ produkItemId }, {
      onSuccess: () => toast.success("Item dihapus"),
      onError: () => toast.error("Gagal menghapus item"),
    })
  }

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return
    applyPromoMut.mutate({ code: promoInput.trim() }, {
      onSuccess: () => { toast.success("Kode promo diterapkan!"); setPromoInput("") },
      onError: () => toast.error("Kode promo tidak valid"),
    })
  }

  if (!isAuthenticated) return <AuthGuard icon={ShoppingCart} title="Masuk untuk melihat keranjang" description="Item keranjang tersimpan di akun Anda" />

  if (isLoading) {
    return (
      <SkeletonScreen>
        <SkeletonScreen.content>
          <SkelTitle />
          <SkelLine />
          <SkeletonScreen.grid>
            <SkeletonScreen.itemsCol><SkelItem /><SkelItem /></SkeletonScreen.itemsCol>
            <SkelSummary />
          </SkeletonScreen.grid>
        </SkeletonScreen.content>
      </SkeletonScreen>
    )
  }

  const rawItems = cart?.items;
  const items: any[] = Array.isArray(rawItems) ? rawItems : (rawItems?.data ?? []);

  return (
    <PageContainer>
      <ContentWrapper>
        <SectionHeader label="Belanja" title="Keranjang Belanja" />

        {items.length === 0 ? (
          <EmptyState>
            <EmptyState.iconBox>
              <IconCart size={36} />
            </EmptyState.iconBox>
            <EmptyState.textWrapper>
              <EmptyState.title>Keranjang Anda kosong</EmptyState.title>
              <EmptyState.desc>Temukan produk premium pilihan kami</EmptyState.desc>
            </EmptyState.textWrapper>
            <ActionLink href="/produk">Jelajahi Produk</ActionLink>
          </EmptyState>
        ) : (
          <GridContainer>

            {/* Items */}
            <ItemsList>
              {items.map((item) => (
                <CartItemCard key={item.produk_item_id}>
                  <CartItemCard.imageWrapper>
                    {item.product_image_url
                      ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <CartItemImg src={item.product_image_url} alt={item.product_name} />
                      )
                      : <CartItemCard.placeholder><IconPackage size={24} /></CartItemCard.placeholder>
                    }
                  </CartItemCard.imageWrapper>
                  <CartItemCard.details>
                    <CartItemCard.name>{item.product_name}</CartItemCard.name>
                    <CartItemCard.price>{formatPrice(item.price)}</CartItemCard.price>
                    <CartItemCard.actionRow>
                      <CartItemCard.qtyGroup>
                        <QtyBtn variant="ghost" size="icon"
                          disabled={updateItemMut.isPending || removeItemMut.isPending}
                          onClick={() => handleQtyChange(item.produk_item_id, item.qty, -1)}>
                          <IconMinus size={12} />
                        </QtyBtn>
                        <CartItemCard.qty>{item.qty}</CartItemCard.qty>
                        <QtyBtn variant="ghost" size="icon"
                          disabled={updateItemMut.isPending}
                          onClick={() => handleQtyChange(item.produk_item_id, item.qty, 1)}>
                          <IconPlus size={12} />
                        </QtyBtn>
                      </CartItemCard.qtyGroup>
                      <RemoveBtn variant="ghost" size="icon"
                        disabled={removeItemMut.isPending}
                        onClick={() => handleRemove(item.produk_item_id)}>
                        <IconTrash size={14} />
                      </RemoveBtn>
                    </CartItemCard.actionRow>
                  </CartItemCard.details>
                  <CartItemCard.subtotal>{formatPrice(item.subtotal)}</CartItemCard.subtotal>
                </CartItemCard>
              ))}
            </ItemsList>

            {/* Summary */}
            <SummaryColumn>
              {/* Promo */}
              <PromoCard>
                <PromoCard.headerRow>
                  <IconTag size={14} />
                  <PromoCard.label>Kode Promo</PromoCard.label>
                </PromoCard.headerRow>
                {cart?.promotion_code ? (
                  <PromoCard.appliedWrapper>
                    <PromoCard.code>{cart.promotion_code}</PromoCard.code>
                    <RemovePromoBtn variant="ghost" size="icon"
                      disabled={removePromoMut.isPending}
                      onClick={() => removePromoMut.mutate({} as any, { onSuccess: () => toast.success("Promo dihapus") })}>
                      {removePromoMut.isPending ? <IconLoader size={12} /> : <IconX size={12} />}
                    </RemovePromoBtn>
                  </PromoCard.appliedWrapper>
                ) : (
                  <PromoCard.inputGroup>
                    <StyledInput value={promoInput} onChange={(e: any) => setPromoInput(e.target.value)}
                      onKeyDown={(e: any) => e.key === "Enter" && handleApplyPromo()}
                      placeholder="Kode promo" />
                    <ApplyPromoBtn variant="outline" onClick={handleApplyPromo}
                      disabled={applyPromoMut.isPending || !promoInput.trim()}>
                      {applyPromoMut.isPending ? <IconLoader size={12} /> : "Pakai"}
                    </ApplyPromoBtn>
                  </PromoCard.inputGroup>
                )}
              </PromoCard>

              {/* Totals */}
              <TotalsCard>
                <TotalsCard.header>Ringkasan</TotalsCard.header>
                <TotalsCard.list>
                  <TotalsCard.row>
                    <TotalsCard.label>Subtotal ({items.length} item)</TotalsCard.label>
                    <TotalsCard.value>{formatPrice(cart?.subtotal_minor ?? 0)}</TotalsCard.value>
                  </TotalsCard.row>
                  {(cart?.discount_minor ?? 0) > 0 && (
                    <TotalsCard.discountRow>
                      <TotalsCard.label>Diskon</TotalsCard.label><TotalsCard.value>-{formatPrice(cart?.discount_minor ?? 0)}</TotalsCard.value>
                    </TotalsCard.discountRow>
                  )}
                  {(cart?.shipping_minor ?? 0) > 0 && (
                    <TotalsCard.row>
                      <TotalsCard.label>Ongkir</TotalsCard.label><TotalsCard.value>{formatPrice(cart?.shipping_minor ?? 0)}</TotalsCard.value>
                    </TotalsCard.row>
                  )}
                </TotalsCard.list>
                <StyledSeparator />
                <TotalsCard.grandTotalWrapper>
                  <TotalsCard.grandLabel>Total</TotalsCard.grandLabel>
                  <TotalsCard.grandValue>{formatPrice(cart?.total_harga_minor ?? 0)}</TotalsCard.grandValue>
                </TotalsCard.grandTotalWrapper>
                <CheckoutBtn onClick={() => router.push("/checkout")}>
                  Lanjut Checkout <IconArrowRight size={15} />
                </CheckoutBtn>
                <ContinueShoppingLink href="/produk">
                  ← Lanjut Belanja
                </ContinueShoppingLink>
              </TotalsCard>
            </SummaryColumn>
          </GridContainer>
        )}
      </ContentWrapper>
    </PageContainer>
  )
}
