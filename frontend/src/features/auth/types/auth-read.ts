export namespace AuthRead {

  export interface User {
    id: number
    name: string
    email: string
    role: "user" | "admin"
    createdAt?: string
    updatedAt?: string
    noTelepon?: string
    alamat?: string
    avatar?: string
  }

  export interface Session {
    success: boolean
    message: string
    token: string
    user: User
  }

  export type Show = User
  export type Index = User
}