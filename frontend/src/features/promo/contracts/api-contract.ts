import { z } from "zod"

export namespace PromoApiContract {

export const Schema = z.object({
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

    items: z.array(z.object({
      produk_item_id: z.number(),
      produk: z.object({
        id: z.number(),
        nama: z.string(),
        gambar: z.string(),
        image_url: z.string(),
      }),
      qty: z.number(),
      harga: z.number(),
      subtotal: z.number(),
    })),

    promotion: z.object({
      code: z.string(),
      discount_minor: z.number(),
    }),

    shipping: z.object({
      nama: z.string(),
      telepon: z.string(),
      alamat: z.string(),
      kota: z.string(),
      kode_pos: z.string(),
    }),
  });


export const IndexSchema = z.array(Schema);

export const CreateSchema = z.object({
  code: z.string().min(1),
});

export const UpdateSchema = z.object({
    code: z.string().min(1).optional(),
})

// type inference
export type Response = z.infer<typeof Schema>
export type Index = z.infer<typeof IndexSchema>;
export type Create = z.infer<typeof CreateSchema>;
export type Update = z.infer<typeof UpdateSchema>;

// validator
export const validateSchema = (payload: unknown): Response => Schema.parse(payload);
export const validateIndex = (payload: unknown): Index => IndexSchema.parse(payload);
export const validateCreate = (payload: unknown): Create => CreateSchema.parse(payload);
export const validateUpdate = (payload: unknown): Update => UpdateSchema.parse(payload);
}