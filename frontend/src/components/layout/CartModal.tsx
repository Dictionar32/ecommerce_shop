'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Minus, Plus, Trash2, Tag, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartSummary } from '@/features/cart/hooks/use-cart-summary';
import { useCartUiStore } from '@/lib/stores/cart-ui-store';
import { formatPrice } from '@/lib/utils-frontend';
import { toast } from 'sonner';

export default function CartModal() {
  const { isOpen, closeCart } = useCartUiStore();
  const { data: cart, isLoading } = useCartSummary.get();

  const updateItemMut = useCartSummary.updateItem();
  const removeItemMut = useCartSummary.removeItem();
  const applyPromoMut = useCartSummary.applyPromo();
  const removePromoMut = useCartSummary.removePromo();

  const [promoInput, setPromoInput] = useState('');

  if (!isOpen) return null;

  const cartCount = cart?.items?.reduce((s, i) => s + i.qty, 0) ?? 0;

  const handleUpdateQty = async (produkItemId: number, newQty: number) => {
    if (newQty < 1) {
      removeItemMut.mutate(produkItemId, {
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
    removeItemMut.mutate(produkItemId, {
      onSuccess: () => toast.success('Item dihapus'),
      onError: () => toast.error('Gagal hapus'),
    });
  };

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    applyPromoMut.mutate(promoInput.trim(), {
      onSuccess: () => {
        toast.success('Kode promo diterapkan!');
        setPromoInput('');
      },
      onError: (e: unknown) => {
        const msg = (e as { response?: { data?: { message?: string } } })?.response?.data?.message;
        toast.error(msg || 'Kode promo tidak valid');
      },
    });
  };

  const handleRemovePromo = () => {
    removePromoMut.mutate(undefined, {
      onSuccess: () => toast.success('Promo dihapus'),
      onError: () => toast.error('Gagal hapus promo'),
    });
  };

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 modal-backdrop" onClick={closeCart} />

      {/* Drawer */}
      <div
        className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-obsidian-950 border-l border-obsidian-800 flex flex-col shadow-2xl"
        style={{ animation: 'slideInRight 0.3s ease forwards' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-obsidian-800">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-gold-500" />
            <h2 className="font-heading text-xl text-obsidian-50">Keranjang</h2>
            {cartCount > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-sm bg-gold-500/20 text-gold-400 border border-gold-800/50">
                {cartCount} item
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 text-obsidian-400 hover:text-obsidian-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="w-16 h-16 shrink-0 bg-obsidian-800 rounded-sm" />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-3 bg-obsidian-800 rounded w-3/4" />
                  <div className="h-3 bg-obsidian-800 rounded w-1/2" />
                </div>
              </div>
            ))
          ) : !cart || !cart.items?.length ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <ShoppingBag size={48} className="text-obsidian-700 mb-4" />
              <p className="text-obsidian-400 font-heading text-lg">Keranjang Kosong</p>
              <p className="text-obsidian-600 text-sm mt-1">Tambahkan produk untuk memulai belanja</p>
              <button onClick={closeCart} className="mt-6 px-5 py-2.5 text-xs bg-gold-500 text-obsidian-950 font-semibold hover:bg-gold-400 transition-colors rounded-sm">
                Mulai Belanja
              </button>
            </div>
          ) : (
            cart.items.map((item) => (
              <div
                key={item.produkItemId}
                className="flex gap-4 py-3 border-b border-obsidian-800/60 last:border-0"
              >
                {/* Image */}
                <div className="w-16 h-16 shrink-0 bg-obsidian-800 rounded-sm overflow-hidden">
                  {item.productImageUrl ? (
                    <img
                      src={item.productImageUrl}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag size={20} className="text-obsidian-600" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-obsidian-100 text-sm font-medium truncate">{item.productName}</p>
                  <p className="text-gold-500 text-sm mt-0.5">{formatPrice(item.price)}</p>

                  <div className="flex items-center justify-between mt-2">
                    {/* Qty controls */}
                    <div className="flex items-center border border-obsidian-700 rounded-sm">
                      <button
                        onClick={() => handleUpdateQty(item.produkItemId, item.qty - 1)}
                        className="px-2 py-1 text-obsidian-400 hover:text-gold-400 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-3 text-sm text-obsidian-100 min-w-8 text-center">{item.qty}</span>
                      <button
                        onClick={() => handleUpdateQty(item.produkItemId, item.qty + 1)}
                        className="px-2 py-1 text-obsidian-400 hover:text-gold-400 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-obsidian-200 text-sm font-medium">{formatPrice(item.price * item.qty)}</span>
                      <button
                        onClick={() => handleRemove(item.produkItemId)}
                        className="text-obsidian-600 hover:text-red-400 transition-colors p-1"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart && cart.items?.length > 0 && (
          <div className="border-t border-obsidian-800 px-6 py-5 space-y-4">
            {/* Promo code */}
            {cart.promotionCode ? (
              <div className="flex items-center justify-between bg-gold-500/10 border border-gold-800/50 rounded-sm px-3 py-2">
                <div className="flex items-center gap-2">
                  <Tag size={14} className="text-gold-500" />
                  <span className="text-gold-400 text-sm font-medium">{cart.promotionCode}</span>
                  {cart.promotionDiscount && (
                    <span className="text-gold-600 text-xs">-{formatPrice(cart.promotionDiscount)}</span>
                  )}
                </div>
                <button
                  onClick={handleRemovePromo}
                  className="text-obsidian-500 hover:text-red-400 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Kode promo..."
                  onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                  className="flex-1 bg-obsidian-900 border border-obsidian-700 text-obsidian-100 placeholder-obsidian-600 text-xs py-2 px-3 rounded-sm focus:outline-none focus:border-gold-600"
                />
                <button
                  onClick={handleApplyPromo}
                  disabled={applyPromoMut.isPending}
                  className="border border-obsidian-600 text-obsidian-300 hover:border-gold-600 hover:text-gold-400 transition-colors text-xs py-2 px-4 whitespace-nowrap rounded-sm disabled:opacity-50"
                >
                  Pakai
                </button>
              </div>
            )}

            {/* Totals */}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-obsidian-400">
                <span>Subtotal</span>
                <span>{formatPrice(cart.subtotalMinor)}</span>
              </div>
              {cart.discountMinor > 0 && (
                <div className="flex justify-between text-gold-500">
                  <span>Diskon</span>
                  <span>-{formatPrice(cart.discountMinor)}</span>
                </div>
              )}
              {cart.shippingMinor > 0 && (
                <div className="flex justify-between text-obsidian-400">
                  <span>Pengiriman</span>
                  <span>{formatPrice(cart.shippingMinor)}</span>
                </div>
              )}
              <div className="border-t border-obsidian-800 my-2" />
              <div className="flex justify-between font-semibold text-obsidian-50 text-base">
                <span>Total</span>
                <span className="text-gold-400">{formatPrice(cart.totalHargaMinor)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full flex items-center justify-center gap-2 text-center bg-gold-500 text-obsidian-950 font-semibold py-3 hover:bg-gold-400 transition-colors rounded-sm"
            >
              Checkout <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
