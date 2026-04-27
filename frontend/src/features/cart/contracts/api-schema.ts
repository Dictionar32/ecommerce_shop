import { z } from "zod"

export namespace CartApiSchema {
  export const Create = z.object({
    produkItemId: z.number({ required_error: "Produk wajib dipilih" }),
    qty: z.number().min(1, "Minimal 1"),
  })
  export const Update = z.object({
    qty: z.number().min(1, "Minimal 1"),
  })
}

export namespace CartFormValues {
  export type Create = z.infer<typeof CartApiSchema.Create>
  export type Update = z.infer<typeof CartApiSchema.Update>
}

export namespace CartDefaultValues {
  export const create: CartFormValues.Create = { produkItemId: 0, qty: 1 }
  export const update: CartFormValues.Update = { qty: 1 }
}
