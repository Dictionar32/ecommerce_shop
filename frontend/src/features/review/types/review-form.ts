/**
 * Review Form Types - Form input types for review feature (in produk)
 */
export namespace ReviewForm {
  export type Index = {
    page?: number
    per_page?: number
  }

  export type Create = {
    rating: number
    title?: string
    comment: string
  }

  export type Update = {
    rating?: number
    title?: string
    comment?: string
  }
}
