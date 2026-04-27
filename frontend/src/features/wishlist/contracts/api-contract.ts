import { z } from "zod"
export namespace WishlistApiContract {

export const Schema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  image_url: z.string(),
  category_id: z.number(),
  category_name: z.string(),
  price: z.number(),
  stock: z.number(),
  rating: z.number(),
  review_count: z.number(),
});

export const CreateSchema = z.object({
  produk_item_id: z.number(),
})

export const WishlishttIndexSchema = z.array(Schema)

// TypeScript types inferred from Zod
export type Response = z.infer<typeof Schema>
export type Index = z.infer<typeof WishlishttIndexSchema>
export type Create = z.infer<typeof CreateSchema>

// Validation helpers
export const validateSchema = (payload: unknown): Response => Schema.parse(payload)
export const validateIndex = (payload: unknown): Index => WishlishttIndexSchema.parse(payload)
export const validateCreate = (payload: unknown): Create => CreateSchema.parse(payload)
}