import { Http } from "@/lib/core/api-client";
import { WishlistApiContract } from "../contracts/api-contract";
import { WishlistMapper } from "../mappers/wishlist-mapper";
import type { WishlistRead } from "../types/wishlist-read";
import { WishlistFormValues } from "../contracts/api-schema";

interface ApiWrapper<T> {
  data: T;
}

export const WishlistService = {
  /** GET /wishlist */
  async index(): Promise<WishlistRead.Index[]> {
    const res = await Http.get<ApiWrapper<unknown>>("/wishlist");
    const validated = WishlistApiContract.validateIndex(res.data);
    return WishlistMapper.toApiReadList(validated);
  },

  /** POST /wishlist — payload: { produk_item_id } via mapper */
  async create(form: WishlistFormValues.Create): Promise<void> {
    const payload = WishlistMapper.toApiCreate(form);
    await Http.post("/wishlist", payload);
  },

  /** DELETE /wishlist/{produkItemId} */
  async delete(produkItemId: number): Promise<void> {
    await Http.delete(`/wishlist/${produkItemId}`);
  },
};
