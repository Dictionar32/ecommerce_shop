import { z } from "zod"

export namespace WishlistApiSchema {
  export const Create = z.object({
    produkItemId: z.number({ required_error: "Produk wajib dipilih" }),
  })
}

export namespace WishlistFormValues {
  export type Create = z.infer<typeof WishlistApiSchema.Create>
}

export namespace WishlistDefaultValues {
  export const create: WishlistFormValues.Create = { produkItemId: 0 }
}
