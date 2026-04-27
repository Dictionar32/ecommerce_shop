import { z } from "zod"

export namespace PromoApiSchema {
  export const Apply = z.object({
    code: z.string().min(1, "Kode promo wajib diisi"),
  })
}

export namespace PromoFormValues {
  export type Apply = z.infer<typeof PromoApiSchema.Apply>
}

export namespace PromoDefaultValues {
  export const apply: PromoFormValues.Apply = { code: "" }
}
