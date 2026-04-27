import { z } from "zod"

export namespace ProdukApiSchema {
  export const Create = z.object({
    nama:       z.string().min(1, "Nama produk wajib diisi"),
    deskripsi:  z.string().min(1, "Deskripsi wajib diisi"),
    harga:      z.number().positive("Harga harus lebih dari 0"),
    stok:       z.number().int().nonnegative("Stok tidak boleh negatif"),
    categoryId: z.number({ required_error: "Kategori wajib dipilih" }),
    gambar:     z.instanceof(File).optional(),
  })
  export const Update = Create.partial()
}

export namespace ProdukFormValues {
  export type Create = z.infer<typeof ProdukApiSchema.Create>
  export type Update = z.infer<typeof ProdukApiSchema.Update>
}

export namespace ProdukDefaultValues {
  export const create: ProdukFormValues.Create = {
    nama: "", deskripsi: "", harga: 0, stok: 0, categoryId: 0,
  }
}
