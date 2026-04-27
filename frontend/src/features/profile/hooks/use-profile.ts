import { createCrudHooks } from "@/lib/generic/generic-hooks";
import { QueryKey } from "@/lib/core/query-key";
import { ProfileService } from "../services/profile-service";

export const useProfile = createCrudHooks({
    queryKey: {
        list: () => [QueryKey.auth.all],
        detail: (id: number) => [QueryKey.auth.me],
    },
    service: {
        index: ProfileService.index,
        show: ProfileService.show,
        update: ProfileService.update,
    }
})