import type { ReviewRead } from "../types/review-read";
import { ReviewFormValues } from "../contracts/api-schema";
import { ReviewApiContract } from "../contracts/api-contract";
import { ReviewApiField } from "../contracts/api-field";

export namespace ReviewMapper {
  export const toApiRead = (api: ReviewApiContract.Response): ReviewRead.Detail => {
    return {
      id: api.id,
      rating: api.rating,
      title: api.title,
      comment: api.comment,
      isVerifiedPurchase: api.is_verified_purchase,
      createdAt: api.created_at,
    };
  }

  export const toApiReadList = (api: ReviewApiContract.Index): ReviewRead.Index[] => {
    return api.map(toApiRead);
  }

  export const toApiCreate = (form: ReviewFormValues.Create): ReviewApiContract.Create => {
    return {
      [ReviewApiField.RATING]: form.rating,
        [ReviewApiField.TITLE]: form.title,
        [ReviewApiField.COMMENT]: form.comment,
    };
  };
}