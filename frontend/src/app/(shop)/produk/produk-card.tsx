"use client";

import { toast } from "sonner";
import useAuthStore from "@/lib/stores/auth-store";
import { useCartUiStore } from "@/lib/stores/cart-ui-store";
import { formatPrice } from "@/lib/utils-frontend";
import { useWishlistPost, useWishlistDeleteProdukItemId, useCartPostItems } from "@/api/hooks";
import {
  CardLink, CardContainer, CardImageArea, CardImage, IconCartLarge, WishlistBtn, IconHeart,
  CardContentArea, IconStar, CardAddToCartBtn, IconCartSmall
} from "./produk.styles"

interface ProdukCardProps {
  item: any;
  isInWishlist?: boolean;
}

export function ProdukCard({ item, isInWishlist = false }: ProdukCardProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const addToCart = useCartPostItems();
  const { openCart } = useCartUiStore();
  const addToWishlist = useWishlistPost();
  const removeFromWishlist = useWishlistDeleteProdukItemId();

  const isOutOfStock = item.stock === 0;

  const firstItemId = item.first_item_id ?? item.id;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    if (!isAuthenticated) {
      toast.error("Masuk terlebih dahulu untuk menambahkan ke keranjang");
      return;
    }

    if (firstItemId === undefined) {
      toast.error("Produk tidak tersedia");
      return;
    }

    addToCart.mutate(
      { produk_item_id: firstItemId, qty: 1 },
      {
        onSuccess: () => {
          toast.success("Ditambahkan ke keranjang!");
          openCart();
        },
        onError: () => toast.error("Gagal menambahkan ke keranjang"),
      }
    );
  };

  const handleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Masuk untuk menambahkan ke wishlist");
      return;
    }
    if (firstItemId === undefined) {
      toast.error("Produk tidak tersedia");
      return;
    }

    if (isInWishlist) {
      removeFromWishlist.mutate({ produkItemId: firstItemId }, {
        onSuccess: () => toast.success("Dihapus dari wishlist"),
        onError: () => toast.error("Gagal menghapus dari wishlist"),
      });
    } else {
      addToWishlist.mutate({ produk_item_id: firstItemId }, {
        onSuccess: () => toast.success("Ditambahkan ke wishlist!"),
        onError: () => toast.error("Gagal menambahkan ke wishlist"),
      });
    }
  };

  const ratingDisplay = Math.round(item.rating ?? 0);

  return (
    <CardLink href={`/produk/${item.id}`}>
      <CardContainer>
        {/* Image */}
        <CardImageArea>
          {item.image_url ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <CardImage src={item.image_url} alt={item.name} />
          ) : (
            <CardImageArea.placeholderBox>
              <IconCartLarge size={32} />
            </CardImageArea.placeholderBox>
          )}

          {/* Wishlist Button */}
          <WishlistBtn
            onClick={handleWishlist}
            active={isInWishlist ? "true" : "false"}
          >
            <IconHeart size={14} fill={isInWishlist ? "currentColor" : "none"} />
          </WishlistBtn>

          {isOutOfStock && (
            <CardImageArea.outOfStockBox>
              <CardImageArea.outOfStockBadge>
                Stok Habis
              </CardImageArea.outOfStockBadge>
            </CardImageArea.outOfStockBox>
          )}
        </CardImageArea>

        {/* Content */}
        <CardContentArea>
          {/* Category */}
          <CardContentArea.category>{item.category_name}</CardContentArea.category>

          {/* Name */}
          <CardContentArea.name>
            {item.name}
          </CardContentArea.name>

          {/* Rating */}
          {(item.review_count ?? 0) > 0 && (
            <CardContentArea.ratingRow>
              <CardContentArea.starsWrap>
                {[1, 2, 3, 4, 5].map((star) => (
                  <IconStar
                    key={star}
                    size={11}
                    active={star <= ratingDisplay ? "true" : "false"}
                    fill="currentColor"
                  />
                ))}
              </CardContentArea.starsWrap>
              <CardContentArea.reviewCount>({item.review_count})</CardContentArea.reviewCount>
            </CardContentArea.ratingRow>
          )}

          {/* Price */}
          <CardContentArea.price>
            {formatPrice(item.price)}
          </CardContentArea.price>

          {/* Add to Cart */}
          <CardAddToCartBtn
            onClick={handleAddToCart}
            disabled={isOutOfStock || addToCart.isPending}
          >
            <IconCartSmall size={13} />
            {isOutOfStock ? "Stok Habis" : "Tambah ke Keranjang"}
          </CardAddToCartBtn>
        </CardContentArea>
      </CardContainer>
    </CardLink>
  );
}

export default ProdukCard;
