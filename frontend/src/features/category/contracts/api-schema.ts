import { z } from "zod"

export namespace CategoryApiSchema {
  export const Create = z.object({
    nama: z.string().min(1, "Nama kategori wajib diisi"),
  })
  export const Update = z.object({
    nama: z.string().min(1, "Nama kategori wajib diisi").optional(),
  })
}

export namespace CategoryFormValues {
  export type Create = z.infer<typeof CategoryApiSchema.Create>
  export type Update = z.infer<typeof CategoryApiSchema.Update>
}

export namespace CategoryDefaultValues {
  export const create: CategoryFormValues.Create = { nama: "" }
}
