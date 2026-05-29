import { createBaseCrudService } from "@/lib/generic/generic-services";
import { ProdukIndex, ProdukShow } from "../types/produk-read";
import { ProdukFormValues } from "../contracts/api-schema";
import { ProdukApiResponse, ProdukApiCreate, ProdukApiUpdate, ValidateIndex, ValidateSchema, ValidateCreate, ValidateUpdate } from "../contracts/api-contract";
import { toApiReadList, toApiRead, toApiCreate, toApiUpdate } from "../mappers/produk-mapper";

export const ProdukService = createBaseCrudService<
  ProdukApiResponse,
  ProdukIndex,
  ProdukShow,
  ProdukFormValues['Create'],
  ProdukFormValues['Update'],
  ProdukApiCreate,
  ProdukApiUpdate
>({
  basePath: "/produk",

  validateIndex: ValidateIndex,
  validateShow: ValidateSchema,
  validateCreate: ValidateCreate,
  validateUpdate: ValidateUpdate,

  mapIndex: toApiReadList,
  mapShow: toApiRead,
  mapCreate: toApiCreate,
  mapUpdate: toApiUpdate,
});
