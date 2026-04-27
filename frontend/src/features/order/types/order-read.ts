export namespace OrderRead {
  // items tetap array
  export interface Item {
    produkItemId: number
    productId: number
    productName: string
    productImage: string
    productImageUrl: string
    qty: number
    price: number
    subtotal: number
  }

  // Flat DTO: gabungan order + shipping + promotion + items
  export interface OrderTransformed {
    // order main fields
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

    // flatten promotion
    promotionCode: string | null
    promotionDiscount: number | null

    // flatten shipping
    shippingNama: string | null
    shippingTelepon: string | null
    shippingAlamat: string | null
    shippingKota: string | null
    shippingKodePos: string | null

    // items array tetap ada
    items: Item[]
  }

  export type Show = OrderTransformed
  export type Index = OrderTransformed
}
