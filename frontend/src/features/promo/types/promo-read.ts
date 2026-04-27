export namespace PromoRead {
  // Satu item produk di order/promo
  export interface Item {
    produkItemId: number;
    produkId: number;
    produkNama: string;
    produkGambar: string;
    produkImageUrl: string;
    qty: number;
    harga: number;
    subtotal: number;
  }

  // Detail order/promo
  export type Detail = {
    id: number;
    status: string;
    invoiceNumber: string | null;

    paymentStatus: string;
    financialStatus: string;
    fulfillmentStatus: string;

    subtotalMinor: number;
    discountMinor: number;
    shippingMinor: number;
    taxMinor: number;
    totalHargaMinor: number;

    items: Item[];

    promoCode: string | null;
    promoDiscountMinor: number | null;

    shippingNama: string;
    shippingTelepon: string;
    shippingAlamat: string;
    shippingKota: string;
    shippingKodePos: string;

    createdAt: string;
  }

  export type Index = Detail;
  export type Show = Detail;
}

//features/promo/types/promo-read.ts
//features/promo/types/promo-form.ts

//features/promo/contracts/api-contract.ts
//features/promo/contracts/api-field.ts
//features/promo/contracts/api-schema.ts

//features/promo/mappers/promo-mapper.ts

//features/promo/services/promo-service.ts

//features/promo/hooks/use-promo.ts