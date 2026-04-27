import { Http } from "@/lib/core/api-client"
import { ReviewApiContract } from "../contracts/api-contract"
import { ReviewMapper } from "../mappers/review-mapper"
import type { ReviewRead } from "../types/review-read"
import { ReviewFormValues } from "../contracts/api-schema"

interface ReviewIndexResponse {
  summary: { avg_rating: number; total_review: number }
  reviews: { data: ReviewApiContract.Response[]; current_page: number; last_page: number; total: number }
}

export const ReviewService = {
  async index(produkId: number): Promise<{ summary: ReviewIndexResponse["summary"]; reviews: ReviewRead.Index[] }> {
    const res = await Http.get<ReviewIndexResponse>(`/produk/${produkId}/reviews`)
    const reviews = Array.isArray(res.reviews) ? res.reviews : (res.reviews?.data ?? [])
    return {
      summary: res.summary,
      reviews: reviews.map(ReviewMapper.toApiRead),
    }
  },

  async create(produkId: number, form: ReviewFormValues.Create): Promise<void> {
    await Http.post(`/produk/${produkId}/reviews`, form)
  },
}
