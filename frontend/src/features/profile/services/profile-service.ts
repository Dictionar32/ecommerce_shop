import { createBaseCrudService } from "@/lib/generic/generic-services";
import { ProfileRead } from "../types/profile-read";
import { ProfileFormValues } from "../contracts/api-schema";
import { ProfileApiContract } from "../contracts/api-contract";
import { ProfileMapper } from "../mappers/profile-mapper";

export const ProfileService = createBaseCrudService<
  ProfileApiContract.Response,
  ProfileRead.Index,
  ProfileRead.Show,
  never, // ❌ no create
  ProfileFormValues.Update,
  never, // ❌ no create payload
  ProfileApiContract.Update
>({
  basePath: "/profile",

  validateIndex: ProfileApiContract.validateIndex,
  validateShow: ProfileApiContract.ValidateSchema,
  validateUpdate: ProfileApiContract.ValidateUpdate,

  mapIndex: ProfileMapper.toApiReadList,
  mapShow: ProfileMapper.toApiRead,
  mapUpdate: ProfileMapper.toApiUpdate,
});
