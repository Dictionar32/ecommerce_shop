'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Minus, Plus, Trash2, Tag, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartUiStore } from '@/lib/stores/cart-ui-store';
import { formatPrice } from '@/lib/utils-frontend';
import { toast } from 'sonner';
import {
  useKeranjangGet,
  useCartPatchItemsProdukItemId,
  useCartDeleteItemsProdukItemId,
  useCartPostPromo,
  useCartDeletePromo
} from '@/api/hooks';
import {
  Overlay, Backdrop, Drawer, Header, HeaderTitleArea, Title, CartCountBadge, CloseButton, ContentArea, SkeletonRow, SkeletonImage, SkeletonInfo,
  SkeletonText, SkeletonTextShort, EmptyState, EmptyStateIcon, EmptyStateTitle, EmptyStateSub,
  StartShoppingBtn, CartItemRow, CartItemImageContainer, CartItemImagePlaceholder,
  CartItemInfo, CartItemName, CartItemPrice, CartItemActions, QtyControls,
  QtyBtn, QtyDisplay, SubtotalArea, SubtotalText, RemoveBtn, Footer,
  AppliedPromoContainer, AppliedPromoInfo, StyledTagIcon, AppliedPromoCode, AppliedPromoDiscount,
  RemovePromoBtn, PromoInputContainer, PromoInput, PromoApplyBtn, TotalsContainer,
  TotalRow, DiscountRow, Divider, GrandTotalRow, GrandTotalValue, CheckoutLink,
  StyledShoppingBag
} from './cart-modal.styles';

export default function CartModal() {
  const { isOpen, closeCart } = useCartUiStore();
  
  // Use generated hooks directly
  const { data: res, isLoading } = useKeranjangGet();
  const cart: any = res?.data;
  
  const updateItemMut = useCartPatchItemsProdukItemId();
  const removeItemMut = useCartDeleteItemsProdukItemId();
  const applyPromoMut = useCartPostPromo();
  const removePromoMut = useCartDeletePromo();

  const [promoInput, setPromoInput] = useState('');

  if (!isOpen) return null;

  // Unwrap items manually if it's paginated or a resource collection
  const rawItems = cart?.items;
  const items: any[] = Array.isArray(rawItems) ? rawItems : (rawItems?.data ?? []);
  const cartCount = items.reduce((s: number, i: any) => s + i.qty, 0);

  const handleUpdateQty = async (produkItemId: number, newQty: number) => {
    if (newQty < 1) {
      removeItemMut.mutate({ produkItemId }, {
        onError: () => toast.error('Gagal hapus item'),
      });
      return;
    }
    updateItemMut.mutate(
      { produkItemId, qty: newQty },
      { onError: () => toast.error('Gagal update jumlah') }
    );
  };

  const handleRemove = (produkItemId: number) => {
    removeItemMut.mutate({ produkItemId }, {
      onSuccess: () => toast.success('Item dihapus'),
      onError: () => toast.error('Gagal hapus'),
    });
  };

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    applyPromoMut.mutate({ code: promoInput.trim() }, {
      onSuccess: () => {
        toast.success('Kode promo diterapkan!');
        setPromoInput('');
      },
      onError: (e: any) => {
        const msg = e?.response?.data?.message || e?.message;
        toast.error(msg || 'Kode promo tidak valid');
      },
    });
  };

  const handleRemovePromo = () => {
    removePromoMut.mutate({}, {
      onSuccess: () => toast.success('Promo dihapus'),
      onError: () => toast.error('Gagal hapus promo'),
    });
  };

  return (
    <Overlay>
      {/* Backdrop */}
      <Backdrop onClick={closeCart} />

      {/* Drawer */}
      <Drawer style={{ animation: 'slideInRight 0.3s ease forwards' }}>
        {/* Header */}
        <Header>
          <HeaderTitleArea>
            <StyledShoppingBag>
              <ShoppingBag size={20} />
            </StyledShoppingBag>
            <Title>Keranjang</Title>
            {cartCount > 0 && (
              <CartCountBadge>
                {cartCount} item
              </CartCountBadge>
            )}
          </HeaderTitleArea>
          <CloseButton onClick={closeCart}>
            <X size={20} />
          </CloseButton>
        </Header>

        {/* Content */}
        <ContentArea>
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <SkeletonRow key={i}>
                <SkeletonImage />
                <SkeletonInfo>
                  <SkeletonText />
                  <SkeletonTextShort />
                </SkeletonInfo>
              </SkeletonRow>
            ))
          ) : !cart || items.length === 0 ? (
            <EmptyState>
              <EmptyStateIcon>
                <ShoppingBag size={48} />
              </EmptyStateIcon>
              <EmptyStateTitle>Keranjang Kosong</EmptyStateTitle>
              <EmptyStateSub>Tambahkan produk untuk memulai belanja</EmptyStateSub>
              <StartShoppingBtn onClick={closeCart}>
                Mulai Belanja
              </StartShoppingBtn>
            </EmptyState>
          ) : (
            items.map((item: any) => (
              <CartItemRow key={item.produk_item_id}>
                {/* Image */}
                <CartItemImageContainer>
                  {item.produk?.image_url ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={item.produk.image_url}
                      alt={item.produk?.nama}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <CartItemImagePlaceholder>
                      <ShoppingBag size={20} />
                    </CartItemImagePlaceholder>
                  )}
                </CartItemImageContainer>

                {/* Info */}
                <CartItemInfo>
                  <CartItemName>{item.produk?.nama}</CartItemName>
                  <CartItemPrice>{formatPrice(item.harga)}</CartItemPrice>

                  <CartItemActions>
                    <QtyControls>
                      <QtyBtn onClick={() => handleUpdateQty(item.produk_item_id, item.qty - 1)}>
                        <Minus size={12} />
                      </QtyBtn>
                      <QtyDisplay>{item.qty}</QtyDisplay>
                      <QtyBtn onClick={() => handleUpdateQty(item.produk_item_id, item.qty + 1)}>
                        <Plus size={12} />
                      </QtyBtn>
                    </QtyControls>

                    <SubtotalArea>
                      <SubtotalText>{formatPrice(item.subtotal)}</SubtotalText>
                      <RemoveBtn onClick={() => handleRemove(item.produk_item_id)}>
                        <Trash2 size={13} />
                      </RemoveBtn>
                    </SubtotalArea>
                  </CartItemActions>
                </CartItemInfo>
              </CartItemRow>
            ))
          )}
        </ContentArea>

        {/* Footer */}
        {cart && items.length > 0 && (
          <Footer>
            {/* Promo code */}
            {cart.promotion?.code ? (
              <AppliedPromoContainer>
                <AppliedPromoInfo>
                  <StyledTagIcon>
                    <Tag size={14} />
                  </StyledTagIcon>
                  <AppliedPromoCode>{cart.promotion.code}</AppliedPromoCode>
                  {cart.promotion.discount_minor && (
                    <AppliedPromoDiscount>-{formatPrice(cart.promotion.discount_minor)}</AppliedPromoDiscount>
                  )}
                </AppliedPromoInfo>
                <RemovePromoBtn onClick={handleRemovePromo}>
                  <X size={14} />
                </RemovePromoBtn>
              </AppliedPromoContainer>
            ) : (
              <PromoInputContainer>
                <PromoInput
                  value={promoInput}
                  onChange={(e: any) => setPromoInput(e.target.value)}
                  placeholder="Kode promo..."
                  onKeyDown={(e: any) => e.key === 'Enter' && handleApplyPromo()}
                />
                <PromoApplyBtn onClick={handleApplyPromo} disabled={applyPromoMut.isPending}>
                  Pakai
                </PromoApplyBtn>
              </PromoInputContainer>
            )}

            {/* Totals */}
            <TotalsContainer>
              <TotalRow>
                <span>Subtotal</span>
                <span>{formatPrice(cart.subtotal_minor)}</span>
              </TotalRow>
              {cart.discount_minor > 0 && (
                <DiscountRow>
                  <span>Diskon</span>
                  <span>-{formatPrice(cart.discount_minor)}</span>
                </DiscountRow>
              )}
              {cart.shipping_minor > 0 && (
                <TotalRow>
                  <span>Pengiriman</span>
                  <span>{formatPrice(cart.shipping_minor)}</span>
                </TotalRow>
              )}
              <Divider />
              <GrandTotalRow>
                <span>Total</span>
                <GrandTotalValue>{formatPrice(cart.total_harga_minor)}</GrandTotalValue>
              </GrandTotalRow>
            </TotalsContainer>

            <CheckoutLink href="/checkout" onClick={closeCart}>
              Checkout <ArrowRight size={16} />
            </CheckoutLink>
          </Footer>
        )}
      </Drawer>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </Overlay>
  );
}
