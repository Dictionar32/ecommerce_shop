import { createBaseCrudService } from "@/lib/generic/generic-services";
import type { CartRead } from "../types/cart-read";
import { CartFormValues } from "../contracts/api-schema";
import { CartMapper } from "../mappers/cart-mapper";
import { CartApiContract } from "../contracts/api-contract";

export const CartService = createBaseCrudService<
  CartApiContract.Response,
  CartRead.Index,
  CartRead.Show,
  CartFormValues.Create,
  CartFormValues.Update,
  CartApiContract.Create,
  CartApiContract.Update
>({
  basePath: "/cart/items",

  validateIndex: CartApiContract.validateIndex,
  validateShow: CartApiContract.validateSchema,
  validateCreate: CartApiContract.validateCreate,
  validateUpdate: CartApiContract.validateUpdate,

  mapIndex: CartMapper.toApiReadList,
  mapShow: CartMapper.toApiRead,
  mapCreate: CartMapper.toApiCreate,
  mapUpdate: CartMapper.toApiUpdate,
});
