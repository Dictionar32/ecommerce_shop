export namespace CartRead {
  export interface Item {
    id: number
    produkItemId: number
    productId: number
    productName: string
    productImage: string | null
    productImageUrl: string | null
    qty: number
    price: number
    subtotal: number
  }

  export interface CartTransformed {
    id: number
    status: string
    totalHarga: number
    invoiceNumber: string | null
    paymentStatus: string
    financialStatus: string
    fulfillmentStatus: string
    subtotalMinor: number
    discountMinor: number
    shippingMinor: number
    taxMinor: number
    totalHargaMinor: number
    createdAt: string

    promotionCode: string | null
    promotionDiscount: number | null

    shippingNama: string | null
    shippingTelepon: string | null
    shippingAlamat: string | null
    shippingKota: string | null
    shippingKodePos: string | null

    items: Item[]
  }

  export type Show = CartTransformed
  export type Index = CartTransformed
}
