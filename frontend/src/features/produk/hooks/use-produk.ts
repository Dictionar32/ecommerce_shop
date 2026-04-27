import { createCrudHooks } from "@/lib/generic/generic-hooks";
import { QueryKey } from "@/lib/core/query-key";
import { ProdukService } from '../services/produk-service';
import type { ProdukRead } from "../types/produk-read";
import { ProdukFormValues } from "../contracts/api-schema";

export const useProduk = createCrudHooks<
  ProdukRead.Index,
  ProdukRead.Show,
  ProdukFormValues.Create,
  ProdukFormValues.Update
>({
    queryKey: {
        list: () => [QueryKey.produk.list],
        detail: (id: number) => [QueryKey.produk.detail(id)],
    },
    service: {
        index: ProdukService.index,
        show: ProdukService.show,
        create: ProdukService.create,
        update: ProdukService.update,
        delete: ProdukService.delete,
    }
})
