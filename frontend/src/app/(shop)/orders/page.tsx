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

import useAuthStore from "@/lib/stores/auth-store"
import { formatPrice, formatDate } from "@/lib/utils-frontend"
import { useOrdersGet, useOrdersGetId } from "@/api/hooks"
import apiClient from "@/lib/core/api-client"
import {
  PageContainer, ContentWrapper, GridContainer, SidebarWrapper, SidebarCard, SidebarCardSm,
  UserProfileBox, UserAvatar, UserInfoWrapper, UserName, UserEmail, NavContainer, NavLinkItem,
  OrderListTitle, OrderEmptyBox, OrderEmptyText, OrderEmptyLink, OrderListWrapper, OrderListItemBtn,
  OrderListRow, OrderListInv, OrderListDate, OrderListTotal,
  DetailMain, DetailEmptyBox, DetailEmptyIconBox, DetailEmptyText,
  SkelDetailWrapper, SkelDetail1, SkelDetail2, SkelDetailSep, SkelDetail3, SkelDetail4,
  DetailContentWrapper, DetailHeaderRow, DetailInvoiceTitle, DetailDate, DetailStatusWrapper, DetailDownloadBtn,
  ShippingCard, ShippingTitle, ShippingName, ShippingAddress, ShippingCity, ShippingPhone,
  ItemsTitle, ItemsWrapper, ItemCard, ItemImageBox, ItemImage, ItemImagePlaceholder, ItemInfoWrapper, ItemName, ItemQty, ItemSubtotal,
  DetailSeparator, DetailSeparatorSm, TotalsWrapper, TotalRowBox, GrandTotalRowBox, GrandTotalLabel, GrandTotalValue
} from "./orders.styles"

export default function OrdersPage() {
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [downloadingId, setDownloadingId] = useState<number | null>(null)

  const { data: resOrders, isLoading, isError } = useOrdersGet()
  const orders: any[] = resOrders?.data ?? []
  const { data: resDetail, isLoading: detailLoading } = useOrdersGetId({ id: selectedId ?? 0 })
  const detail: any = resDetail?.data

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
    <PageContainer>
      <ContentWrapper>
        <SectionHeader label="Akun Saya" title="Pesanan Saya" subtitle="Riwayat dan detail semua pesanan Anda" />

        <GridContainer>
          {/* Sidebar */}
          <SidebarWrapper>
            <SidebarCard>
              <UserProfileBox>
                <UserAvatar>
                  {user?.name?.charAt(0).toUpperCase()}
                </UserAvatar>
                <UserInfoWrapper>
                  <UserName>{user?.name}</UserName>
                  <UserEmail>{user?.email}</UserEmail>
                </UserInfoWrapper>
              </UserProfileBox>
              <NavContainer>
                {[
                  { href: "/profile", label: "Profil Saya", icon: User },
                  { href: "/orders",  label: "Pesanan",     icon: ShoppingBag, active: true },
                ].map(({ href, label, icon: Icon, active }) => (
                  <NavLinkItem key={href} href={href} active={active ? "true" : "false"}>
                    <Icon size={14} />{label}
                    {active && <ChevronRight size={13} className="ml-auto" />}
                  </NavLinkItem>
                ))}
              </NavContainer>
            </SidebarCard>

            <SidebarCardSm>
              <OrderListTitle>Riwayat Pesanan</OrderListTitle>
              {!orders?.length ? (
                <OrderEmptyBox>
                  <Package size={32} className="text-obsidian-700 mx-auto mb-3" />
                  <OrderEmptyText>Belum ada pesanan</OrderEmptyText>
                  <OrderEmptyLink href="/produk">Mulai belanja</OrderEmptyLink>
                </OrderEmptyBox>
              ) : (
                <ScrollArea className="max-h-[480px]">
                  <OrderListWrapper>
                    {orders.map((order: any) => (
                      <OrderListItemBtn key={order.id} onClick={() => setSelectedId(order.id)}
                        active={selectedId === order.id ? "true" : "false"}>
                        <OrderListRow>
                          <OrderListInv>{order.invoice_number || `#${order.id}`}</OrderListInv>
                          <StatusBadge status={order.payment_status} />
                        </OrderListRow>
                        <OrderListDate>{formatDate(order.created_at)}</OrderListDate>
                        <OrderListTotal>{formatPrice(order.total_harga_minor)}</OrderListTotal>
                      </OrderListItemBtn>
                    ))}
                  </OrderListWrapper>
                </ScrollArea>
              )}
            </SidebarCardSm>
          </SidebarWrapper>

          {/* Detail Panel */}
          <DetailMain>
            {!selectedId ? (
              <DetailEmptyBox>
                <DetailEmptyIconBox>
                  <FileText size={28} className="text-obsidian-600" />
                </DetailEmptyIconBox>
                <DetailEmptyText>Pilih pesanan untuk melihat detail</DetailEmptyText>
              </DetailEmptyBox>
            ) : detailLoading ? (
              <SkelDetailWrapper>
                <SkelDetail1 />
                <SkelDetail2 />
                <SkelDetailSep />
                <SkelDetail3 />
                <SkelDetail4 />
                <SkelDetail4 />
              </SkelDetailWrapper>
            ) : detail ? (
              <DetailContentWrapper>
                {/* Header */}
                <DetailHeaderRow>
                  <div>
                    <DetailInvoiceTitle>{detail.invoice_number || `Order #${detail.id}`}</DetailInvoiceTitle>
                    <DetailDate>{formatDate(detail.created_at)}</DetailDate>
                    <DetailStatusWrapper>
                      <StatusBadge status={detail.payment_status} />
                      {detail.fulfillment_status && detail.fulfillment_status !== detail.payment_status && (
                        <StatusBadge status={detail.fulfillment_status} />
                      )}
                    </DetailStatusWrapper>
                  </div>
                  <DetailDownloadBtn variant="outline"
                    onClick={() => handleDownloadInvoice(detail.id)}
                    disabled={downloadingId === detail.id}>
                    {downloadingId === detail.id ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />}
                    Invoice
                  </DetailDownloadBtn>
                </DetailHeaderRow>

                {/* Shipping */}
                {detail.shipping_nama && (
                  <ShippingCard>
                    <ShippingTitle>Alamat Pengiriman</ShippingTitle>
                    <ShippingName>{detail.shipping_nama}</ShippingName>
                    <ShippingAddress>{detail.shipping_alamat}</ShippingAddress>
                    <ShippingCity>{detail.shipping_kota}{detail.shipping_kode_pos ? `, ${detail.shipping_kode_pos}` : ""}</ShippingCity>
                    {detail.shipping_telepon && <ShippingPhone>{detail.shipping_telepon}</ShippingPhone>}
                  </ShippingCard>
                )}

                {/* Items */}
                <ItemsTitle>Item Pesanan</ItemsTitle>
                <ItemsWrapper>
                  {detail.items?.map((item: any) => (
                    <ItemCard key={item.produk_item_id}>
                      <ItemImageBox>
                        {item.product_image_url
                          ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <ItemImage src={item.product_image_url} alt={item.product_name} />
                          )
                          : <ItemImagePlaceholder><Package size={18} className="text-obsidian-600" /></ItemImagePlaceholder>
                        }
                      </ItemImageBox>
                      <ItemInfoWrapper>
                        <ItemName>{item.product_name}</ItemName>
                        <ItemQty>{item.qty} × {formatPrice(item.price)}</ItemQty>
                      </ItemInfoWrapper>
                      <ItemSubtotal>{formatPrice(item.subtotal)}</ItemSubtotal>
                    </ItemCard>
                  ))}
                </ItemsWrapper>

                {/* Totals */}
                <DetailSeparator />
                <TotalsWrapper>
                  {[
                    { label: "Subtotal", val: detail.subtotal_minor, show: true },
                    { label: `Diskon${detail.promotion_code ? ` (${detail.promotion_code})` : ""}`, val: -(detail.discount_minor ?? 0), show: (detail.discount_minor ?? 0) > 0, cls: "gold" as const },
                    { label: "Ongkos Kirim", val: detail.shipping_minor ?? 0, show: (detail.shipping_minor ?? 0) > 0 },
                  ].filter(r => r.show).map(row => (
                    <TotalRowBox key={row.label} color={row.cls ?? "default"}>
                      <span>{row.label}</span>
                      <span>{row.val < 0 ? `-${formatPrice(-row.val)}` : formatPrice(row.val)}</span>
                    </TotalRowBox>
                  ))}
                  <DetailSeparatorSm />
                  <GrandTotalRowBox>
                    <GrandTotalLabel>Total</GrandTotalLabel>
                    <GrandTotalValue>{formatPrice(detail.total_harga_minor)}</GrandTotalValue>
                  </GrandTotalRowBox>
                </TotalsWrapper>
              </DetailContentWrapper>
            ) : null}
          </DetailMain>
        </GridContainer>
      </ContentWrapper>
    </PageContainer>
  )
}
