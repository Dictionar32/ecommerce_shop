import { Http } from "@/lib/core/api-client";
import { CartApiContract } from "../contracts/api-contract";
import { CartMapper } from "../mappers/cart-mapper";
import type { CartRead } from "../types/cart-read";
import { CartFormValues } from "../contracts/api-schema";

interface ApiWrapper<T> {
  success: boolean;
  message: string;
  data: T;
}

export const CartSummaryService = {
  /** GET /keranjang — full cart dengan totals */
  async get(): Promise<CartRead.Show | null> {
    try {
      const res = await Http.get<ApiWrapper<unknown>>("/keranjang");
      if (!res.data) return null;
      const validated = CartApiContract.validateSchema(res.data);
      return CartMapper.toApiRead(validated);
    } catch {
      return null;
    }
  },

  /** POST /cart/items — form { produkItemId, qty } via CartApiField */
  async addItem(form: CartFormValues.Create): Promise<CartRead.Show | null> {
    const payload = CartMapper.toApiCreate(form);
    const res = await Http.post<ApiWrapper<unknown>>("/cart/items", payload);
    if (!res.data) return null;
    const validated = CartApiContract.validateSchema(res.data);
    return CartMapper.toApiRead(validated);
  },

  /** PATCH /cart/items/:produkItemId — form { qty } via CartApiField */
  async updateItem(produkItemId: number, form: CartFormValues.Update): Promise<CartRead.Show | null> {
    const payload = CartMapper.toApiUpdate(form);
    const res = await Http.patch<ApiWrapper<unknown>>(`/cart/items/${produkItemId}`, payload);
    if (!res.data) return null;
    const validated = CartApiContract.validateSchema(res.data);
    return CartMapper.toApiRead(validated);
  },

  /** DELETE /cart/items/:produkItemId */
  async removeItem(produkItemId: number): Promise<CartRead.Show | null> {
    const res = await Http.delete<ApiWrapper<unknown>>(`/cart/items/${produkItemId}`);
    if (!res?.data) return null;
    try {
      const validated = CartApiContract.validateSchema(res.data);
      return CartMapper.toApiRead(validated);
    } catch {
      return null;
    }
  },

  /** POST /cart/promo — apply promo code */
  async applyPromo(code: string): Promise<CartRead.Show | null> {
    const res = await Http.post<ApiWrapper<unknown>>("/cart/promo", { code });
    if (!res.data) return null;
    const validated = CartApiContract.validateSchema(res.data);
    return CartMapper.toApiRead(validated);
  },

  /** DELETE /cart/promo — remove promo */
  async removePromo(): Promise<CartRead.Show | null> {
    const res = await Http.delete<ApiWrapper<unknown>>("/cart/promo");
    if (!res?.data) return null;
    try {
      const validated = CartApiContract.validateSchema(res.data);
      return CartMapper.toApiRead(validated);
    } catch {
      return null;
    }
  },
};
