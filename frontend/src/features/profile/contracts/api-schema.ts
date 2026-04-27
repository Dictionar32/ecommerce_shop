import { z } from "zod"

export namespace ProfileApiSchema {
  export const Update = z.object({
    name:  z.string().min(2, "Nama minimal 2 karakter"),
    email: z.string().email("Email tidak valid"),
    no_telp: z.string().optional(),
    alamat:  z.string().optional(),
  })

  export const UpdatePassword = z.object({
    current_password:      z.string().min(1, "Password lama wajib diisi"),
    new_password:          z.string().min(8, "Password baru minimal 8 karakter"),
    new_password_confirmation: z.string().min(1, "Konfirmasi password wajib diisi"),
  }).refine((d) => d.new_password === d.new_password_confirmation, {
    message: "Konfirmasi password tidak cocok",
    path: ["new_password_confirmation"],
  })
}

export namespace ProfileFormValues {
  export type Update         = z.infer<typeof ProfileApiSchema.Update>
  export type UpdatePassword = z.infer<typeof ProfileApiSchema.UpdatePassword>
}

export namespace ProfileDefaultValues {
  export const update: ProfileFormValues.Update = { name: "", email: "" }
  export const updatePassword: ProfileFormValues.UpdatePassword = {
    current_password: "", new_password: "", new_password_confirmation: "",
  }
}
