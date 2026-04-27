export namespace OrderForm {
  /**
   * Checkout / update shipping
   */
  export interface Create {
    shippingNama: string
    shippingTelepon: string
    shippingAlamat: string
    shippingKota: string
    shippingKodePos: string
  }

  /**
   * Buy Now
   */
  export interface BuyNow extends Partial<Create> {
    produkItemId: number
    qty: number
  }
}
