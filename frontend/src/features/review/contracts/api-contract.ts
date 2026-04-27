import z from "zod";


export namespace ReviewApiContract {
  export const Schema = z.object({
    id: z.number(),
    rating: z.number(),
    title: z.string().nullable(),
    comment: z.string(),
    is_verified_purchase: z.boolean(),
    created_at: z.string(),
  });

  export const IndexSchema = z.array(Schema);

  export const CreateSchema = z.object({ 
    rating: z.number().min(1).max(5, 'Rating harus antara 1 dan 5'),
    title: z.string().min(1, 'Title harus diisi').optional(),
    comment: z.string().min(1, 'Comment harus diisi'),
  });

  export type Response = z.infer<typeof Schema>
  export type Index = z.infer<typeof IndexSchema>
  export type Create = z.infer<typeof CreateSchema>

  export const validateSchema = (payload: unknown): Response => Schema.parse(payload)
  export const validateIndex = (payload: unknown): Index => IndexSchema.parse(payload)
  export const validateCreate = (payload: unknown): Create => CreateSchema.parse(payload)
}