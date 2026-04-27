import { PromoFormValues } from "../contracts/api-schema";
import type { PromoRead } from "../types/promo-read";
import { PromoApiContract } from "../contracts/api-contract";
import { PromoApiField } from "../contracts/api-field";

export namespace PromoMapper {

    export const toApiRead  = (api: PromoApiContract.Response): PromoRead.Show => {
        return {
            id: api.id,
            promoCode: api.promotion.code,
            promoDiscountMinor: api.promotion.discount_minor,
            createdAt: api.created_at,
            
            status: api.status,
            totalHargaMinor: api.total_harga_minor,
            invoiceNumber: api.invoice_number,
            paymentStatus: api.payment_status,
            financialStatus: api.financial_status,
            fulfillmentStatus: api.fulfillment_status,
            subtotalMinor: api.subtotal_minor,
            discountMinor: api.discount_minor,
            shippingMinor: api.shipping_minor,
            taxMinor: api.tax_minor,

            shippingAlamat: api.shipping.alamat,
            shippingKota: api.shipping.kota,
            shippingKodePos: api.shipping.kode_pos,
            shippingNama: api.shipping.nama,
            shippingTelepon: api.shipping.telepon,

            items: api.items.map(item => ({
                produkId: item.produk.id,
                produkItemId: item.produk_item_id,
                produkNama: item.produk.nama,
                produkGambar: item.produk.gambar,
                produkImageUrl: item.produk.image_url,
                qty: item.qty,
                harga: item.harga,
                subtotal: item.subtotal,
            })),
        }
    }

    export const toApiReadList = (api: PromoApiContract.Response[]): PromoRead.Index[] => {
        return api.map(toApiRead);
    }

    export const toApiCreate = (form: PromoFormValues.Create): PromoApiContract.Create => {
        return {
            [PromoApiField.CODE]: form.code,
        }
    }
}