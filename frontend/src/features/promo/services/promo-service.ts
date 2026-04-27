import { PromoApiContract } from "../contracts/api-contract";
import { createBaseCrudService } from "@/lib/generic/generic-services";
import { PromoFormValues } from "../contracts/api-schema";
import { PromoRead } from "../types/promo-read";
import { PromoMapper } from "../mappers/promo-mapper";

export const PromoService = createBaseCrudService<
  PromoApiContract.Response,
  PromoRead.Index,
  PromoRead.Show,
  PromoFormValues.Create,
  never,
  PromoApiContract.Create,
  never
>({
  basePath: "/cart/promo",

  validateIndex: PromoApiContract.validateIndex,
  validateShow: PromoApiContract.validateSchema,
  validateCreate: PromoApiContract.validateCreate,

  mapIndex: PromoMapper.toApiReadList,
  mapShow: PromoMapper.toApiRead,
  mapCreate: PromoMapper.toApiCreate,
});
