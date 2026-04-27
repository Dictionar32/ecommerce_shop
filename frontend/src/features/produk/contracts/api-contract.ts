import { z } from "zod";

export namespace ProdukApiContract {
  export const Schema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    image: z.string().nullable(),
    image_url: z.string().nullable(),
    category_id: z.number(),
    category_name: z.string().nullable(),
    price: z.number(),
    stock: z.number(),
    rating: z.number(),
    review_count: z.number(),
    first_item_id: z.number().optional(),
  });

  export const IndexSchema = z.array(Schema);

  export const CreateSchema = z.object({
    nama: z.string().min(1),
    deskripsi: z.string().min(1),
    gambar: z.string().optional(),
    category_id: z.number(),
    harga: z.number().positive(),
    stok: z.number().int().nonnegative(),
  });

  export const UpdateSchema = CreateSchema.partial();

  export type Response = z.infer<typeof Schema>
  export type Index = z.infer<typeof IndexSchema>
  export type Create = z.infer<typeof CreateSchema>
  export type Update = z.infer<typeof UpdateSchema>

  export const ValidateSchema = (payload: unknown): Response => Schema.parse(payload)
  export const ValidateIndex = (payload: unknown): Index => IndexSchema.parse(payload)
  export const ValidateCreate = (payload: unknown): Create => CreateSchema.parse(payload)
  export const ValidateUpdate = (payload: unknown): Update => UpdateSchema.parse(payload)
}
