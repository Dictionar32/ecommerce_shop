"use client";

import { ProdukList } from "./produk-list";
import { PageLoader } from "@/components/shared/page-loader";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { useProduk } from "@/features/produk/hooks/use-produk";
import { useCategory } from "@/features/category/hooks/use-category";
import { useWishlist } from "@/features/wishlist/hooks/use-wishlist";

export default function ProdukPage() {
  // Fetch all data at page level (Blueprint: Page composes data)
  const { data: produk, isLoading: produkLoading, isError: produkError } = useProduk.index();
  const { data: categories, isLoading: categoryLoading } = useCategory.index();
  const { data: wishlistData } = useWishlist.index();

  // Show loading for initial data fetch
  if (produkLoading || categoryLoading) {
    return <PageLoader text="Memuat produk..." />;
  }

  // Handle error state
  if (produkError) {
    return <ErrorState title="Gagal memuat produk" />;
  }

  // Handle empty state
  if (!produk || produk.length === 0) {
    return (
      <EmptyState
        title="Tidak ada produk"
        description="Produk belum tersedia saat ini"
      />
    );
  }

  // Pass all data to component (UI only)
  return (
    <ProdukList 
      produk={produk} 
      categories={categories}
      wishlistData={wishlistData}
    />
  );
}
