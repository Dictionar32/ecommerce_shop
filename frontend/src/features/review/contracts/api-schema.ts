import { z } from "zod"

export namespace ReviewApiSchema {
  export const Create = z.object({
    rating:  z.number().min(1, "Pilih rating").max(5),
    title:   z.string().optional(),
    comment: z.string().min(5, "Ulasan minimal 5 karakter"),
  })
}

export namespace ReviewFormValues {
  export type Create = z.infer<typeof ReviewApiSchema.Create>
}

export namespace ReviewDefaultValues {
  export const create: ReviewFormValues.Create = { rating: 0, comment: "", title: "" }
}
