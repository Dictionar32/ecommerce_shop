export namespace ReviewRead {
  export interface Detail {
    id: number
    rating: number
    title: string | null
    comment: string
    isVerifiedPurchase: boolean
    createdAt: string
  }

  export type Index = Detail;
  export type Show = Detail;
}

//features/review/types/review-read.ts
//features/review/types/review-form.ts

//features/review/contracts/api-contract.ts
//features/review/contracts/api-field.ts
//features/review/contracts/api-schema.ts

//features/review/mappers/review-mapper.ts

//features/review/services/review-service.ts

//features/review/hooks/use-review.ts