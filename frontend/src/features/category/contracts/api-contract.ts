import { z } from 'zod'

export namespace CategoryApiContract {

export const CategorySchema = z.object({
  id: z.number().int().positive(),
  nama: z.string().min(1, 'Nama kategori is required'),
})

export const IndexSchema = z.array(CategorySchema)

export const CreateSchema = z.object({
  nama: z.string().min(1, 'Nama kategori is required'),
})

export const UpdateSchema = z.object({
  nama: z.string().min(1, 'Nama kategori is required').optional(),
})

export const CategoryListSchema = z.object({
  page: z.number().int().positive().optional(),
  per_page: z.number().int().positive().optional(),
  search: z.string().optional(),
})

export type Response = z.infer<typeof CategorySchema>
export type Index = z.infer<typeof IndexSchema>
export type Create = z.infer<typeof CreateSchema>
export type Update = z.infer<typeof UpdateSchema>
export type ListSchema = z.infer<typeof CategoryListSchema>

export const validateSchema = (payload: unknown):Response =>CategorySchema.parse(payload)
export const validateIndex = (payload: unknown):Index =>IndexSchema.parse(payload)
export const validateCreate = (payload: unknown):Create =>CreateSchema.parse(payload)
export const validateUpdate = (payload: unknown):Update =>UpdateSchema.parse(payload)
export const validateList = (payload: unknown):ListSchema =>CategoryListSchema.parse(payload)

}