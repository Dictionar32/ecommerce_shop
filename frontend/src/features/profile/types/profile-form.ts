/**
 * Profile Form Types - Form input types for profile feature
 */
export namespace ProfileForm {
  export type Update = {
    name: string;
    email: string;
    no_telp?: string;
    alamat?: string;
  }

  export type UpdatePassword = {
    current_password: string
    new_password: string
    new_password_confirmation: string
  }
}
