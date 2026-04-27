import { z } from "zod"

export namespace OrderApiSchema {
  export const Create = z.object({
    shippingNama:    z.string().min(1, "Nama penerima wajib diisi"),
    shippingTelepon: z.string().optional(),
    shippingAlamat:  z.string().min(5, "Alamat lengkap wajib diisi"),
    shippingKota:    z.string().optional(),
    shippingKodePos: z.string().optional(),
  })

  export const BuyNow = z.object({
    produkItemId: z.number(),
    qty: z.number().min(1),
    shippingNama:    z.string().optional(),
    shippingTelepon: z.string().optional(),
    shippingAlamat:  z.string().optional(),
    shippingKota:    z.string().optional(),
    shippingKodePos: z.string().optional(),
  })
}

export namespace OrderFormValues {
  export type Create = z.infer<typeof OrderApiSchema.Create>
  export type BuyNow = z.infer<typeof OrderApiSchema.BuyNow>
}

export namespace OrderDefaultValues {
  export const create: OrderFormValues.Create = {
    shippingNama: "", shippingTelepon: "",
    shippingAlamat: "", shippingKota: "", shippingKodePos: "",
  }
}
