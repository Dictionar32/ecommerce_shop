export namespace AuthForm {
  export type Login = {
    email: string
    password: string
  }

  export type Register = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }

  export type ForgotPassword = {
    email: string
  }

  export type ResetPassword = {
    email: string
    password: string
    passwordConfirmation: string
  }

  export type SocialLogin = {
    provider: string
    accessToken: string
  }
}