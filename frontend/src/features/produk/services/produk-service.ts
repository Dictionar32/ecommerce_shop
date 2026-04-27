import { createBaseCrudService } from "@/lib/generic/generic-services";
import type { ProdukRead } from "../types/produk-read";
import { ProdukFormValues } from "../contracts/api-schema";
import { ProdukApiContract } from "../contracts/api-contract";
import { ProdukMapper } from "../mappers/produk-mapper";

export const ProdukService = createBaseCrudService<
  ProdukApiContract.Response,
  ProdukRead.Index,
  ProdukRead.Show,
  ProdukFormValues.Create,
  ProdukFormValues.Update,
  ProdukApiContract.Create,
  ProdukApiContract.Update
>({
  basePath: "/produk",

  validateIndex: ProdukApiContract.ValidateIndex,
  validateShow: ProdukApiContract.ValidateSchema,
  validateCreate: ProdukApiContract.ValidateCreate,
  validateUpdate: ProdukApiContract.ValidateUpdate,

  mapIndex: ProdukMapper.toApiReadList,
  mapShow: ProdukMapper.toApiRead,
  mapCreate: ProdukMapper.toApiCreate,
  mapUpdate: ProdukMapper.toApiUpdate,
});
