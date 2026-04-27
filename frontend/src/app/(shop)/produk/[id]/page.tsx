"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { ChevronLeft, Minus, Plus, Heart, ShoppingCart, Zap, Star, MessageSquare, Loader2, Package } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { ErrorState } from "@/components/shared/error-state"
import { StarRating } from "@/components/shared/star-rating"

import { useProduk } from "@/features/produk/hooks/use-produk"
import { useCartSummary } from "@/features/cart/hooks/use-cart-summary"
import { useCartUiStore } from "@/lib/stores/cart-ui-store"
import { useWishlist } from "@/features/wishlist/hooks/use-wishlist"
import { useReview } from "@/features/review/hooks/use-review"
import useAuthStore from "@/lib/stores/auth-store"
import { formatPrice } from "@/lib/utils-frontend"
import { ReviewFormValues } from "@/features/review/contracts/api-schema"

const ReviewSchema = z.object({
  rating: z.number().min(1, "Pilih rating").max(5),
  comment: z.string().min(5, "Ulasan minimal 5 karakter"),
  title: z.string().optional(),
})

function DetailSkeleton() {
  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <Skeleton className="h-4 w-48 bg-obsidian-800 mb-6" />
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square bg-obsidian-800 rounded-sm" />
          <div className="space-y-4">
            <Skeleton className="h-5 w-24 bg-obsidian-800" />
            <Skeleton className="h-8 w-3/4 bg-obsidian-800" />
            <Skeleton className="h-4 w-32 bg-obsidian-800" />
            <Skeleton className="h-10 w-40 bg-obsidian-800" />
            <Skeleton className="h-12 w-full bg-obsidian-800" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProdukDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params.id)
  const [qty, setQty] = useState(1)
  const [hoverRating, setHoverRating] = useState(0)

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const { openCart } = useCartUiStore()

  const { data: product, isLoading, isError } = useProduk.show(id)
  const { data: reviewData } = useReview.index(id)
  const addToCart    = useCartSummary.addItem()
  const addToWishlist = useWishlist.create()
  const submitReview = useReview.create(id)

  const form = useForm<ReviewFormValues.Create>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: { rating: 0, comment: "", title: "" },
  })

  const watchRating = form.watch("rating")

  const handleAddToCart = () => {
    if (!isAuthenticated) { toast.error("Masuk untuk menambahkan ke keranjang"); return }
    if (!product?.firstItemId) { toast.error("Produk tidak tersedia"); return }
    addToCart.mutate({ produkItemId: product.firstItemId, qty }, {
      onSuccess: () => { toast.success("Ditambahkan ke keranjang!"); openCart() },
      onError: () => toast.error("Gagal menambahkan ke keranjang"),
    })
  }

  const handleBuyNow = () => {
    if (!isAuthenticated) { toast.error("Masuk terlebih dahulu"); return }
    if (!product?.firstItemId) return
    addToCart.mutate({ produkItemId: product.firstItemId, qty }, {
      onSuccess: () => router.push("/keranjang"),
      onError: () => toast.error("Gagal"),
    })
  }

  const handleWishlist = () => {
    if (!isAuthenticated) { toast.error("Masuk untuk menambahkan ke wishlist"); return }
    if (!product?.firstItemId) return
    addToWishlist.mutate({ produkItemId: product.firstItemId }, {
      onSuccess: () => toast.success("Ditambahkan ke wishlist!"),
      onError: () => toast.error("Gagal"),
    })
  }

  const onReviewSubmit = async (values: ReviewFormValues.Create) => {
    if (!isAuthenticated) { toast.error("Masuk untuk menulis ulasan"); return }
    try {
      await submitReview.mutateAsync(values)
      toast.success("Ulasan berhasil dikirim!")
      form.reset()
    } catch {
      toast.error("Gagal mengirim ulasan")
    }
  }

  if (isLoading) return <DetailSkeleton />
  if (isError || !product) return (
    <ErrorState title="Produk tidak ditemukan"
      description="Produk yang Anda cari tidak tersedia"
      actionLabel="Kembali ke Produk"
      onAction={() => router.push("/produk")} />
  )

  const isOutOfStock = product.stok === 0
  const reviews = reviewData?.reviews ?? []
  const summary = reviewData?.summary

  return (
    <div className="min-h-screen py-10 px-4 animate-[fadeIn_0.4s_ease]">
      <div className="max-w-5xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-obsidian-500 mb-8">
          <Link href="/produk" className="hover:text-gold-400 transition-colors flex items-center gap-1">
            <ChevronLeft size={12} /> Semua Produk
          </Link>
          <span>/</span>
          <span className="text-obsidian-400">{product.categoryNama}</span>
          <span>/</span>
          <span className="text-obsidian-300 truncate max-w-48">{product.nama}</span>
        </nav>

        {/* Product Main */}
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          {/* Image */}
          <div className="aspect-square bg-obsidian-900 border border-obsidian-800 rounded-sm overflow-hidden">
            {product.gambarUrl ? (
              <img src={product.gambarUrl} alt={product.nama} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package size={64} className="text-obsidian-700" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="badge border-obsidian-700 bg-obsidian-800/40 text-obsidian-400 mb-3 self-start">
              {product.categoryNama}
            </span>
            <h1 className="font-heading text-3xl text-obsidian-50 leading-tight mb-3">{product.nama}</h1>

            {(product.reviewCount ?? 0) > 0 && (
              <div className="mb-4">
                <StarRating rating={product.rating} count={product.reviewCount} size={16} />
              </div>
            )}

            <p className="font-heading text-3xl text-gold-400 font-bold mb-2">{formatPrice(product.harga)}</p>
            <p className={`text-xs mb-6 ${product.stok > 0 ? "text-emerald-400" : "text-red-400"}`}>
              {product.stok > 0 ? `Stok: ${product.stok} tersedia` : "Stok habis"}
            </p>

            {product.description && (
              <p className="text-sm text-obsidian-400 leading-relaxed mb-6">{product.description}</p>
            )}

            {!isOutOfStock && (
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center border border-obsidian-700 rounded-sm overflow-hidden">
                  <Button variant="ghost" size="icon"
                    className="w-10 h-10 text-obsidian-400 hover:text-gold-400 hover:bg-obsidian-800 rounded-none"
                    onClick={() => setQty(q => Math.max(1, q - 1))}>
                    <Minus size={14} />
                  </Button>
                  <span className="w-12 text-center text-sm text-obsidian-100 font-medium">{qty}</span>
                  <Button variant="ghost" size="icon"
                    className="w-10 h-10 text-obsidian-400 hover:text-gold-400 hover:bg-obsidian-800 rounded-none"
                    onClick={() => setQty(q => Math.min(product.stok, q + 1))}>
                    <Plus size={14} />
                  </Button>
                </div>
                <span className="text-xs text-obsidian-500">Maks. {product.stok}</span>
              </div>
            )}

            <div className="flex gap-3">
              <Button className="btn-gold flex-1 flex items-center gap-2"
                disabled={isOutOfStock || addToCart.isPending}
                onClick={handleAddToCart}>
                {addToCart.isPending ? <Loader2 size={14} className="animate-spin" /> : <ShoppingCart size={14} />}
                {isOutOfStock ? "Stok Habis" : "Tambah ke Keranjang"}
              </Button>
              <Button variant="outline" className="btn-outline flex items-center gap-2"
                disabled={isOutOfStock} onClick={handleBuyNow}>
                <Zap size={14} /> Beli Sekarang
              </Button>
              <Button variant="ghost" size="icon"
                className="w-12 h-12 border border-obsidian-700 text-obsidian-400 hover:text-gold-400 hover:border-gold-700 rounded-sm"
                onClick={handleWishlist}>
                <Heart size={16} />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-obsidian-800 mb-12" />

        {/* Reviews Section */}
        <div className="grid md:grid-cols-[1fr_360px] gap-8">
          {/* Review List */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare size={16} className="text-gold-500" />
              <h2 className="font-heading text-xl text-obsidian-100">Ulasan Pelanggan</h2>
              {summary && <span className="text-xs text-obsidian-500 ml-1">({summary.total_review})</span>}
            </div>

            {summary && summary.total_review > 0 && (
              <div className="flex items-center gap-4 mb-6 p-4 card-dark">
                <div className="text-center">
                  <p className="font-heading text-4xl text-gold-400">{summary.avg_rating.toFixed(1)}</p>
                  <StarRating rating={summary.avg_rating} size={14} />
                  <p className="text-xs text-obsidian-500 mt-1">{summary.total_review} ulasan</p>
                </div>
              </div>
            )}

            {reviews.length === 0 ? (
              <div className="text-center py-10">
                <MessageSquare size={32} className="text-obsidian-700 mx-auto mb-3" />
                <p className="text-obsidian-500 text-sm">Belum ada ulasan untuk produk ini</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="card-dark p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <StarRating rating={review.rating} size={13} />
                        {review.title && <p className="text-sm font-semibold text-obsidian-200 mt-1">{review.title}</p>}
                      </div>
                      <div className="text-right shrink-0">
                        {review.isVerifiedPurchase && (
                          <span className="badge border-emerald-800/50 bg-emerald-900/10 text-emerald-500 text-[10px]">Verified</span>
                        )}
                        <p className="text-[11px] text-obsidian-600 mt-1">{new Date(review.createdAt).toLocaleDateString("id-ID")}</p>
                      </div>
                    </div>
                    <p className="text-sm text-obsidian-400 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Write Review */}
          <div className="card-dark p-5 h-fit">
            <h3 className="font-heading text-lg text-obsidian-100 mb-5">Tulis Ulasan</h3>

            {!isAuthenticated ? (
              <div className="text-center py-6">
                <p className="text-sm text-obsidian-500 mb-4">Masuk untuk menulis ulasan</p>
                <Link href="/login" className="btn-gold text-sm">Masuk</Link>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onReviewSubmit)} className="space-y-4">
                  {/* Star Picker */}
                  <FormField name="rating" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-obsidian-400 uppercase tracking-widest">Rating *</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map((star) => (
                            <button key={star} type="button"
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              onClick={() => field.onChange(star)}
                              className="focus:outline-none transition-transform hover:scale-110">
                              <Star size={24} fill="currentColor"
                                className={star <= (hoverRating || watchRating) ? "star-filled" : "star-empty"} />
                            </button>
                          ))}
                          {watchRating > 0 && (
                            <span className="text-xs text-obsidian-500 ml-2">
                              {["","Jelek","Kurang","Cukup","Bagus","Sempurna"][watchRating]}
                            </span>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField name="comment" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-obsidian-400 uppercase tracking-widest">Ulasan *</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Bagaimana pengalaman Anda dengan produk ini?" rows={4}
                          className="input-dark resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <Button type="submit" disabled={submitReview.isPending} className="btn-gold w-full">
                    {submitReview.isPending ? <Loader2 size={14} className="animate-spin" /> : "Kirim Ulasan"}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
