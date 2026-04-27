import { createBaseCrudService } from "@/lib/generic/generic-services";
import { CategoryApiContract } from "../contracts/api-contract";
import type { CategoryRead } from "../types/category-read";
import { CategoryFormValues } from "../contracts/api-schema";
import { CategoryMapper } from "../mappers/category-mapper";

export const CategoryService = createBaseCrudService<
  CategoryApiContract.Response,
  CategoryRead.Index,
  CategoryRead.Show,
  CategoryFormValues.Create,
  CategoryFormValues.Update,
  CategoryApiContract.Create,
  CategoryApiContract.Update
>({
  basePath: "/categories",

  validateIndex: CategoryApiContract.validateIndex,
  validateShow: CategoryApiContract.validateSchema,
  validateCreate: CategoryApiContract.validateCreate,
  validateUpdate: CategoryApiContract.validateUpdate,

  mapIndex: CategoryMapper.toApiReadList,
  mapShow: CategoryMapper.toApiRead,
  mapCreate: CategoryMapper.toApiCreate,
  mapUpdate: CategoryMapper.toApiUpdate,
});
