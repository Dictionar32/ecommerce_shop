import type { AuthRead } from "../types/auth-read"
import { AuthFormValues } from "../contracts/api-schema"
import { AuthApiContract } from "../contracts/api-contract"
import { AuthApiField } from "../contracts/api-field"

export namespace AuthMapper {

  export const toUserRead = (api: AuthApiContract.UserResponse): AuthRead.User => ({
    id: api.id,
    name: api.name,
    email: api.email,
    noTelepon: api.no_telp ?? undefined,   // snake_case sesuai useAuthStore User type
    alamat: api.alamat ?? undefined,
    avatar: api.avatar ?? undefined,
    role: api.role,
  })

  export const toSessionRead = (api: AuthApiContract.SessionResponse): AuthRead.Session => ({
    success: api.success,
    message: api.message,
    token: api.data.token,
    user: toUserRead(api.data.user)
  })

  export const toApiLogin = (form: AuthFormValues.Login): AuthApiContract.Login => ({
    [AuthApiField.EMAIL]: form.email,
    [AuthApiField.PASSWORD]: form.password,
  })

  export const toApiRegister = (form: AuthFormValues.Register): AuthApiContract.Register => ({
    [AuthApiField.NAME]: form.name,
    [AuthApiField.EMAIL]: form.email,
    [AuthApiField.PASSWORD]: form.password,
    [AuthApiField.PASSWORD_CONFIRMATION]: form.passwordConfirmation,
  })

  export const toApiForgotPassword = (form: AuthFormValues.ForgotPassword): AuthApiContract.ForgotPassword => ({
    [AuthApiField.EMAIL]: form.email,
  })

  export const toApiResetPassword = (form: AuthFormValues.ResetPassword): AuthApiContract.ResetPassword => ({
    [AuthApiField.EMAIL]: form.email,
    [AuthApiField.PASSWORD]: form.password,
    [AuthApiField.PASSWORD_CONFIRMATION]: form.passwordConfirmation,
  })

  export const toApiSocialLogin = (form: AuthFormValues.SocialLogin): AuthApiContract.SocialLogin => ({
    [AuthApiField.PROVIDER]: form.provider,
    [AuthApiField.ACCESS_TOKEN]: form.accessToken,
  })
}