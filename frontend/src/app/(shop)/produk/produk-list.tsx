"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X, Gem } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ProdukCard } from "@/features/produk/components/produk-card";
import type { ProdukRead } from "@/features/produk/types/produk-read";
import type { CategoryRead } from "@/features/category/types/category-read";

type SortOption = "default" | "harga_asc" | "harga_desc" | "rating" | "nama_asc" | "nama_desc";

interface ProdukListProps {
  produk: ProdukRead.Index[];
  categories?: CategoryRead.Index[];
  wishlistData?: { id: number }[];
}

function FilterSheet({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: {
  categories: CategoryRead.Index[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="lg:hidden flex items-center gap-2 border border-obsidian-700 hover:border-gold-600 text-obsidian-300 hover:text-gold-400 px-3 py-2 rounded-sm text-sm transition-colors">
          <SlidersHorizontal size={14} />
          Filter
        </button>
      </SheetTrigger>
      <SheetContent className="bg-obsidian-950 border-l border-obsidian-800">
        <SheetHeader>
          <SheetTitle className="text-obsidian-100 font-heading">Filter & Urutkan</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 mt-6">
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-obsidian-400 uppercase tracking-widest">Kategori</h3>
            <div className="space-y-1">
              <button
                className={`w-full text-left px-3 py-2 rounded-sm text-sm transition-colors ${
                  selectedCategory === "all"
                    ? "bg-gold-500/15 text-gold-400 border border-gold-800/50"
                    : "text-obsidian-400 hover:text-obsidian-200 hover:bg-obsidian-900"
                }`}
                onClick={() => onCategoryChange("all")}
              >
                Semua Kategori
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`w-full text-left px-3 py-2 rounded-sm text-sm transition-colors ${
                    selectedCategory === String(cat.id)
                      ? "bg-gold-500/15 text-gold-400 border border-gold-800/50"
                      : "text-obsidian-400 hover:text-obsidian-200 hover:bg-obsidian-900"
                  }`}
                  onClick={() => onCategoryChange(String(cat.id))}
                >
                  {cat.nama}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-obsidian-400 uppercase tracking-widest">Urutkan</h3>
            <Select value={sortBy} onValueChange={(v) => onSortChange(v as SortOption)}>
              <SelectTrigger className="bg-obsidian-900 border-obsidian-700 text-obsidian-200">
                <SelectValue placeholder="Pilih urutan" />
              </SelectTrigger>
              <SelectContent className="bg-obsidian-900 border-obsidian-700">
                <SelectItem value="default">Terpopuler</SelectItem>
                <SelectItem value="rating">Rating Tertinggi</SelectItem>
                <SelectItem value="harga_asc">Harga: Rendah ke Tinggi</SelectItem>
                <SelectItem value="harga_desc">Harga: Tinggi ke Rendah</SelectItem>
                <SelectItem value="nama_asc">Nama: A–Z</SelectItem>
                <SelectItem value="nama_desc">Nama: Z–A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function ProdukList({ produk, categories = [], wishlistData = [] }: ProdukListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const wishlistProductIds = useMemo(() => {
    if (!wishlistData) return new Set<number>();
    return new Set(wishlistData.map((item) => item.id));
  }, [wishlistData]);

  const filteredProducts = useMemo((): ProdukRead.Index[] => {
    let result = [...produk];
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.nama.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.categoryNama.toLowerCase().includes(query)
      );
    }
    if (selectedCategory !== "all") {
      const catId = Number(selectedCategory);
      result = result.filter((p) => p.categoryId === catId);
    }
    switch (sortBy) {
      case "harga_asc":  result.sort((a, b) => a.harga - b.harga); break;
      case "harga_desc": result.sort((a, b) => b.harga - a.harga); break;
      case "rating":     result.sort((a, b) => b.rating - a.rating); break;
      case "nama_asc":   result.sort((a, b) => a.nama.localeCompare(b.nama)); break;
      case "nama_desc":  result.sort((a, b) => b.nama.localeCompare(a.nama)); break;
      default:           result.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return result;
  }, [produk, searchQuery, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("default");
  };

  const hasActiveFilters = !!searchQuery.trim() || selectedCategory !== "all" || sortBy !== "default";

  return (
    <div className="min-h-screen animate-[fadeIn_0.4s_ease]">
      {/* Page Header */}
      <div className="border-b border-obsidian-800/60 bg-obsidian-950/80">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
          <div className="flex items-center gap-2 mb-2">
            <Gem size={12} className="text-gold-500" />
            <span className="text-xs font-semibold text-gold-500 tracking-widest uppercase">Koleksi Premium</span>
          </div>
          <h1 className="font-heading text-4xl text-obsidian-50">Semua Produk</h1>
          <p className="text-obsidian-500 text-sm mt-1">{produk.length} produk pilihan tersedia</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="card-dark p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-obsidian-500 pointer-events-none" />
              <input
                type="search"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-dark pl-9 pr-9 py-2.5"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-obsidian-500 hover:text-obsidian-300 transition-colors"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Sort — desktop */}
            <div className="hidden md:flex items-center gap-3">
              <Select value={sortBy} onValueChange={(val) => setSortBy(val as SortOption)}>
                <SelectTrigger className="w-52 bg-obsidian-900 border-obsidian-700 text-obsidian-200">
                  <SelectValue placeholder="Urutkan" />
                </SelectTrigger>
                <SelectContent className="bg-obsidian-900 border-obsidian-700">
                  <SelectItem value="default">Terpopuler</SelectItem>
                  <SelectItem value="rating">Rating Tertinggi</SelectItem>
                  <SelectItem value="harga_asc">Harga: Rendah ke Tinggi</SelectItem>
                  <SelectItem value="harga_desc">Harga: Tinggi ke Rendah</SelectItem>
                  <SelectItem value="nama_asc">Nama: A–Z</SelectItem>
                  <SelectItem value="nama_desc">Nama: Z–A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mobile filter sheet */}
            <FilterSheet
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>

          {/* Category pills */}
          {categories.length > 0 && (
            <>
              {/* Desktop */}
              <div className="hidden md:flex flex-wrap gap-2 mt-4 pt-4 border-t border-obsidian-800">
                {[{ id: "all", nama: "Semua" }, ...categories.map(c => ({ id: String(c.id), nama: c.nama }))].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 text-xs rounded-sm border transition-all duration-150 ${
                      selectedCategory === cat.id
                        ? "bg-gold-500/15 border-gold-700/60 text-gold-400 font-medium"
                        : "border-obsidian-700 text-obsidian-400 hover:border-obsidian-600 hover:text-obsidian-200"
                    }`}
                  >
                    {cat.nama}
                  </button>
                ))}
              </div>
              {/* Mobile horizontal scroll */}
              <div className="md:hidden flex gap-2 mt-4 pt-4 border-t border-obsidian-800 overflow-x-auto pb-1 -mx-4 px-4">
                {[{ id: "all", nama: "Semua" }, ...categories.map(c => ({ id: String(c.id), nama: c.nama }))].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`shrink-0 px-3.5 py-1.5 text-xs rounded-sm border transition-all duration-150 ${
                      selectedCategory === cat.id
                        ? "bg-gold-500/15 border-gold-700/60 text-gold-400 font-medium"
                        : "border-obsidian-700 text-obsidian-400 hover:text-obsidian-200"
                    }`}
                  >
                    {cat.nama}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Active filter chips */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-obsidian-800 flex-wrap">
              <span className="text-xs text-obsidian-500">Filter aktif:</span>
              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-gold-500/10 border border-gold-800/50 text-gold-400 text-xs px-2 py-0.5 rounded-sm">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery("")} className="hover:text-gold-300"><X size={10} /></button>
                </span>
              )}
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1 bg-gold-500/10 border border-gold-800/50 text-gold-400 text-xs px-2 py-0.5 rounded-sm">
                  {categories.find((c) => c.id === Number(selectedCategory))?.nama}
                  <button onClick={() => setSelectedCategory("all")} className="hover:text-gold-300"><X size={10} /></button>
                </span>
              )}
              <button onClick={clearFilters} className="text-xs text-obsidian-500 hover:text-gold-400 underline ml-auto transition-colors">
                Reset semua
              </button>
            </div>
          )}
        </div>

        {/* Results count */}
        <p className="text-sm text-obsidian-500 mb-5">
          Menampilkan <span className="text-obsidian-200 font-medium">{filteredProducts.length}</span> produk
        </p>

        {filteredProducts.length === 0 ? (
          <div className="card-dark text-center py-24">
            <Search size={40} className="text-obsidian-700 mx-auto mb-4" />
            <h3 className="font-heading text-xl text-obsidian-300 mb-2">Produk Tidak Ditemukan</h3>
            <p className="text-obsidian-500 text-sm mb-6">Coba kata kunci lain atau ubah filter</p>
            <button onClick={clearFilters} className="btn-gold">Lihat Semua Produk</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {filteredProducts.map((item, i) => (
              <div
                key={item.id}
                className="animate-[slideUp_0.4s_ease_both]"
                style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}
              >
                <ProdukCard item={item} isInWishlist={wishlistProductIds.has(item.id)} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
