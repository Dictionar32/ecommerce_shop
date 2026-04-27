import type { ProdukRead } from "../types/produk-read";
import { ProdukFormValues } from "../contracts/api-schema";
import { ProdukApiContract } from "../contracts/api-contract";
import { ProdukApiField } from "../contracts/api-field";

export namespace ProdukMapper {
    export const toApiRead = (api: ProdukApiContract.Response): ProdukRead.ApiResponseTransformed => {
        return {
            id: api.id,
            nama: api.name,
            description: api.description,
            gambar: api.image ?? '',
            gambarUrl: api.image_url ?? '',
            categoryId: api.category_id,
            categoryNama: api.category_name ?? '',
            harga: api.price,
            hargaMin: api.price,
            stok: api.stock,
            rating: api.rating,
            reviewCount: api.review_count,
            // ProdukItem.id IS the produk_item_id used by cart & wishlist
            firstItemId: api.first_item_id ?? api.id,
        }
    }

    export const toApiReadList = (api: ProdukApiContract.Response[]): ProdukRead.Index[] => {
        return api.map(toApiRead);
    }

    export function toApiCreate(form: ProdukFormValues.Create): ProdukApiContract.Create {
        return {
            [ProdukApiField.NAMA_PRODUK]: form.nama,
            [ProdukApiField.DESKRIPSI]: form.deskripsi,
            [ProdukApiField.HARGA]: form.harga,
            [ProdukApiField.STOK]: form.stok,
            [ProdukApiField.CATEGORY_ID]: form.categoryId,
            [ProdukApiField.GAMBAR]: form.gambar,
        }
    }

    export const toApiUpdate = (form: ProdukFormValues.Update): ProdukApiContract.Update => ({
        [ProdukApiField.NAMA_PRODUK]: form.nama,
        [ProdukApiField.DESKRIPSI]: form.deskripsi,
        [ProdukApiField.HARGA]: form.harga,
        [ProdukApiField.STOK]: form.stok,
        [ProdukApiField.CATEGORY_ID]: form.kategorId,
        [ProdukApiField.GAMBAR]: form.gambar,
    })
}
