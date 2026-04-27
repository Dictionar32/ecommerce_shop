import { ProfileRead } from "../types/profile-read";
import { ProfileFormValues } from "../contracts/api-schema";
import{ ProfileApiContract } from "../contracts/api-contract";
import { ProfileApiField } from "../contracts/api-field";

export namespace ProfileMapper {
  export const toApiRead = (api: ProfileApiContract.Response): ProfileRead.Show => {
    return {
      id: api.id,
      name: api.name,
      email: api.email,
    }
  }

  export const toApiReadList = (api: ProfileApiContract.Response[]): ProfileRead.Index[] => {
    return api.map(toApiRead)
  }

  export const toApiUpdate = (form: ProfileFormValues.Update): ProfileApiContract.Update => {
    return {
      [ProfileApiField.NAME]: form.name,
      [ProfileApiField.EMAIL]: form.email,
    }
  }
}