import { z } from "zod"

export namespace PaymentApiSchema {
  export const Create = z.object({
    metode:          z.string().min(1, "Metode pembayaran wajib dipilih"),
    provider:        z.string().optional(),
    idempotencyKey:  z.string().optional(),
    detail:          z.record(z.any()).optional(),
    gatewayCode:     z.string().optional(),
    gatewayMessage:  z.string().optional(),
  })
  export const Update = z.object({
    transactionId: z.string().min(1, "Transaction ID wajib diisi"),
  })
}

export namespace PaymentFormValues {
  export type Create = z.infer<typeof PaymentApiSchema.Create>
  export type Update = z.infer<typeof PaymentApiSchema.Update>
}

export namespace PaymentDefaultValues {
  export const create: PaymentFormValues.Create = { metode: "" }
  export const update: PaymentFormValues.Update = { transactionId: "" }
}
