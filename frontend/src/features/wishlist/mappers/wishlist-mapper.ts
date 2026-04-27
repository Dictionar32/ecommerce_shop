import { WishlistFormValues } from "../contracts/api-schema";
import { WishlistApiContract } from "../contracts/api-contract";
import { WishlistApiField } from "../contracts/api-field";
import { WishlistRead } from "../types/wishlist-read";

export namespace WishlistMapper {
  export const toApiRead = (api: WishlistApiContract.Response): WishlistRead.Show => {
    return {
      id: api.id,
      name: api.name,
      description: api.description,
      image: api.image,
      imageUrl: api.image_url,
      categoryId: api.category_id,
      categoryName: api.category_name,
      price: api.price,
      stock: api.stock,
      rating: api.rating,
      reviewCount: api.review_count,
    };
  }

  export const toApiReadList = (api: WishlistApiContract.Response[]): WishlistRead.Index[] => {
    return api.map(toApiRead);
  }

  export const toApiCreate = (form: WishlistFormValues.Create): WishlistApiContract.Create => {
    return {
      [WishlistApiField.PRODUK_ITEM_ID]: form.produkItemId,
    };
  };
}