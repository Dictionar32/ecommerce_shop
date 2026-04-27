import { z } from "zod"

export namespace CartApiContract {

  // OrderDetailResource::collection wraps items in { data: [...] }
  const CartItemDetailSchema = z.object({
    id: z.number(),
    produk_item_id: z.number(),
    produk: z.object({
      id: z.number(),
      nama: z.string(),
      gambar: z.string().nullable(),
      image_url: z.string().nullable(),
    }),
    qty: z.number(),
    harga: z.number(),
    subtotal: z.number(),
  })

  export const CartItemSchema = z.object({
    id: z.number(),
    status: z.string(),
    total_harga: z.number(),
    invoice_number: z.string().nullable(),
    payment_status: z.string(),
    financial_status: z.string(),
    fulfillment_status: z.string(),
    subtotal_minor: z.number(),
    discount_minor: z.number(),
    shipping_minor: z.number(),
    tax_minor: z.number(),
    total_harga_minor: z.number(),
    created_at: z.string(),

    // ResourceCollection wraps with { data: [...] }
    items: z.union([
      z.array(CartItemDetailSchema),
      z.object({ data: z.array(CartItemDetailSchema) }),
    ]),

    promotion: z.object({
      code: z.string().nullable(),
      discount_minor: z.number(),
    }).nullable().optional(),

    shipping: z.object({
      nama: z.string().nullable(),
      telepon: z.string().nullable(),
      alamat: z.string().nullable(),
      kota: z.string().nullable(),
      kode_pos: z.string().nullable(),
    }).nullable().optional(),
  })

  export const CreateSchema = z.object({
    produk_item_id: z.number(),
    qty: z.number(),
  })

  export const UpdateSchema = z.object({
    qty: z.number(),
  })

  export type Response = z.infer<typeof CartItemSchema>
  export type Create = z.infer<typeof CreateSchema>
  export type Update = z.infer<typeof UpdateSchema>
  export type ItemDetail = z.infer<typeof CartItemDetailSchema>

  export const validateSchema = (payload: unknown): Response => CartItemSchema.parse(payload)
  export const validateCreate = (payload: unknown): Create => CreateSchema.parse(payload)
  export const validateUpdate = (payload: unknown): Update => UpdateSchema.parse(payload)
}
