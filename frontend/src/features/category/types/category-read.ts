/**
 * Category Read Types - API response types for category feature
 */
export namespace CategoryRead {

  export type CategoryApiTransformed = {
    id: number
    nama: string
  }

  export type Index = CategoryApiTransformed;
  export type Show = CategoryApiTransformed;
}
