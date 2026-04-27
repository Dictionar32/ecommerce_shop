import type { CategoryRead } from "../types/category-read";
import { CategoryFormValues } from "../contracts/api-schema";
import { CategoryApiField } from "../contracts/api-field";
import { CategoryApiContract } from "../contracts/api-contract";

export namespace CategoryMapper {
  export const toApiRead = (api: CategoryApiContract.Response): CategoryRead.Show => {
    return {
      id: api.id,
      nama: api.nama,
    }
  }

  export const toApiReadList = (api: CategoryApiContract.Response[]): CategoryRead.Index[] => {
    return api.map(toApiRead)
  }

  export const toApiCreate = (form: CategoryFormValues.Create): CategoryApiContract.Create => {
    return {
      [CategoryApiField.NAMA]: form.nama,
    }
  }

  export const toApiUpdate = (form: CategoryFormValues.Update): CategoryApiContract.Update => {
    return {
      [CategoryApiField.NAMA]: form.nama,
    }
  }
}