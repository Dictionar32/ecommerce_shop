import { z } from "zod"
import { Validation } from "@/lib/core/validation"

// ================================
// SCHEMAS
// ================================
export namespace AuthApiSchema {

  export const Login = z.object({
    email: Validation.commonSchemas.email,
    password: Validation.commonSchemas.password,
  })

  export const Register = z
    .object({
      name: z.string().min(2, "Nama minimal 2 karakter"),
      email: Validation.commonSchemas.email,
      password: Validation.commonSchemas.password,
      passwordConfirmation: z.string().min(1, "Konfirmasi password wajib diisi"),
    })
    .refine((d) => d.password === d.passwordConfirmation, {
      message: "Password tidak cocok",
      path: ["passwordConfirmation"],
    })

  export const ForgotPassword = z.object({
    email: Validation.commonSchemas.email,
  })

  export const ResetPassword = z
    .object({
      email: Validation.commonSchemas.email,
      password: Validation.commonSchemas.password,
      passwordConfirmation: z.string().min(1, "Konfirmasi password wajib diisi"),
    })
    .refine((d) => d.password === d.passwordConfirmation, {
      message: "Password tidak cocok",
      path: ["passwordConfirmation"],
    })
}

// ================================
// TYPES
// ================================
export namespace AuthFormValues {
  export type Login          = z.infer<typeof AuthApiSchema.Login>
  export type Register       = z.infer<typeof AuthApiSchema.Register>
  export type ForgotPassword = z.infer<typeof AuthApiSchema.ForgotPassword>
  export type ResetPassword  = z.infer<typeof AuthApiSchema.ResetPassword>
}

// ================================
// DEFAULT VALUES
// ================================
export namespace AuthDefaultValues {
  export const login: AuthFormValues.Login = {
    email: "",
    password: "",
  }

  export const register: AuthFormValues.Register = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  }

  export const forgotPassword: AuthFormValues.ForgotPassword = {
    email: "",
  }

  export const resetPassword: AuthFormValues.ResetPassword = {
    email: "",
    password: "",
    passwordConfirmation: "",
  }
}