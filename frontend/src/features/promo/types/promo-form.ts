export namespace PromoForm {
  export type Create = {
    code: string
  }
  
  export type Update = Partial<Create>
}
