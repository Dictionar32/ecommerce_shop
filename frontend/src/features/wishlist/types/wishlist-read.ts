export namespace WishlistRead {
  export interface Item {
    id: number
    name: string
    description: string
    image: string
    imageUrl: string
    categoryId: number
    categoryName: string
    price: number
    stock: number
    rating: number
    reviewCount: number
  }

  export type Index = Item
  export type Show = Item
}
//features/wishlist/types/wishlist-read.ts
//features/wishlist/types/wishlist-form.ts

//features/wishlist/contracts/api-contract.ts
//features/wishlist/contracts/api-field.ts
//features/wishlist/contracts/api-schema.ts

//features/wishlist/mappers/wishlist-mapper.ts

//features/wishlist/services/wishlist-service.ts

//features/wishlist/hooks/use-wishlist.ts
