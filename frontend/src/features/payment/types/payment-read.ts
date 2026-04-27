// Definisi tipe Item terpisah
export namespace PaymentRead {
  export type Item = {
    id: number;
    produkItemId: number;
    nama: string;
    gambar: string;
    imageUrl: string;
    qty: number;
    harga: number;
    subtotal: number;
  };

  // Flat Order type, memanggil Item[]
  export type PaymentApiTransformed = {
    // Order info
    id: number;
    orderId: number;
    invoiceNumber: string | null;
    status: 'pending' | 'paid' | 'failed';
    totalHarga: number;
    subtotalMinor: number;
    discountMinor: number;
    shippingMinor: number;
    taxMinor: number;
    totalHargaMinor: number;
    paymentStatus: string;
    financialStatus: string;
    fulfillmentStatus: string;
    createdAt: string;

    // Shipping info (flattened)
    shippingNama: string | null;
    shippingTelepon: string | null;
    shippingAlamat: string | null;
    shippingKota: string | null;
    shippingKodePos: string | null;

    // Promo info (flattened)
    promoCode: string | null;
    promoDiscountMinor: number;

    // Payment info (flattened)
    paymentId: number | null;
    paymentMetode: string | null;
    paymentStatusDetail: string | null;
    paymentPaidAt: string | null;
    paymentProvider: string | null;
    paymentProviderTxnId: string | null;
    paymentGatewayStatus: string | null;
    paymentAmountMinor: number | null;
    paymentRefundAmountMinor: number | null;
    paymentGatewayName: string | null;
    paymentGatewayOrderId: string | null;
    paymentGatewayToken: string | null;
    paymentGatewayRedirectUrl: string | null;

    // Items array
    items: Item[];
  };

  export type Index = PaymentApiTransformed;
  export type Show = PaymentApiTransformed;
}

//features/payment/types/payment-read.ts
//features/payment/types/payment-form.ts

//features/payment/contracts/api-contract.ts
//features/payment/contracts/api-field.ts
//features/payment/contracts/api-schema.ts

//features/payment/mappers/payment-mapper.ts

//features/payment/services/payment-service.ts

//features/payment/hooks/use-payment.ts