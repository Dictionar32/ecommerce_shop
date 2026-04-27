"use client"

import { useRouter } from "next/navigation"
import { Heart } from "lucide-react"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import { AuthGuard, SectionHeader } from "@/components/shared"
import { WishlistList } from "@/features/wishlist/components/wishlist-list"
import { useWishlist } from "@/features/wishlist/hooks/use-wishlist"
import useAuthStore from "@/lib/stores/auth-store"

export default function WishlistPage() {
  const router = useRouter()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const { data: items = [], isLoading } = useWishlist.index()
  const deleteMutation = useWishlist.remove()

  const handleRemove = (produkItemId: number) => {
    deleteMutation.mutate(produkItemId, {
      onSuccess: () => toast.success("Dihapus dari wishlist"),
      onError: () => toast.error("Gagal menghapus"),
    })
  }

  if (!isAuthenticated) return <AuthGuard icon={Heart} title="Masuk untuk melihat wishlist" description="Simpan produk favorit Anda" />

  if (isLoading) {
    return (
      <div className="min-h-screen py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <Skeleton className="h-8 w-36 bg-obsidian-800 mb-2" />
          <Skeleton className="h-px w-24 bg-obsidian-800 mb-8" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-80 bg-obsidian-800" />)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-10 px-4 animate-[fadeIn_0.4s_ease]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <p className="text-xs font-semibold text-gold-500 tracking-widest uppercase mb-2">Koleksi Saya</p>
          <div className="flex items-center justify-between">
            <h1 className="font-heading text-3xl text-obsidian-50">Wishlist</h1>
            <span className="text-xs text-obsidian-500">{items.length} produk</span>
          </div>
          <div className="gold-divider mt-4 w-24" />
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-5">
            <div className="w-20 h-20 rounded-sm bg-obsidian-800/60 border border-obsidian-700/40 flex items-center justify-center">
              <Heart size={36} className="text-obsidian-600" />
            </div>
            <div className="text-center">
              <p className="text-obsidian-300 font-medium mb-1">Wishlist kosong</p>
              <p className="text-sm text-obsidian-500">Simpan produk favorit Anda di sini</p>
            </div>
            <button onClick={() => router.push("/produk")} className="btn-gold">Jelajahi Produk</button>
          </div>
        ) : (
          <WishlistList items={items} onRemove={handleRemove} isRemoving={deleteMutation.isPending} />
        )}
      </div>
    </div>
  )
}
