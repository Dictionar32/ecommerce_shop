// Auto-generated Next.js Server Actions. Do not edit manually.
"use server";

import { api, type RegisterPostContract, type LoginPostContract, type OauthGetProviderRedirectContract, type OauthGetProviderCallbackContract, type OauthPostProviderCallbackContract, type SocialPostLoginContract, type ForgotPasswordPostContract, type ResetPasswordPostContract, type CategoriesGetContract, type ProdukGetContract, type ProdukGetIdContract, type ProdukGetIdReviewsContract, type ProdukPostIdReviewsContract, type PaymentPostWebhookContract, type PaymentPostOrderIdContract, type ProfileGetContract, type ProfilePutContract, type ProfilePatchContract, type OrdersGetContract, type OrdersGetIdContract, type OrdersGetIdInvoiceContract, type CartPostItemsContract, type CartPatchItemsProdukItemIdContract, type CartDeleteItemsProdukItemIdContract, type CartDeleteContract, type CartPostPromoContract, type CartDeletePromoContract, type CheckoutPostContract, type BuyNowPostContract, type KeranjangGetContract, type WishlistGetContract, type WishlistPostContract, type WishlistDeleteProdukItemIdContract, type LogoutPostContract, type AdminPostProdukContract } from './api'
import { cookies } from 'next/headers'

// Helper to auto-inject token from cookies if available
async function getAuthHeaders(): Promise<Record<string, string> | undefined> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  return token ? { Authorization: `Bearer ${token}` } : undefined
}

export async function registerPostAction(payload?: { body?: RegisterPostContract['request']['body'] }) {
  try {
    const data = await api.register.post({ body: payload?.body })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function loginPostAction(payload?: { body?: LoginPostContract['request']['body'] }) {
  try {
    const data = await api.login.post({ body: payload?.body })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function oauthGetProviderRedirectAction(payload: { params: OauthGetProviderRedirectContract['request']['params'], query?: OauthGetProviderRedirectContract['request']['query'] }) {
  try {
    const data = await api.oauth.getProviderRedirect({ params: payload.params, query: payload?.query })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function oauthGetProviderCallbackAction(payload: { params: OauthGetProviderCallbackContract['request']['params'], query?: OauthGetProviderCallbackContract['request']['query'] }) {
  try {
    const data = await api.oauth.getProviderCallback({ params: payload.params, query: payload?.query })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function oauthPostProviderCallbackAction(payload: { params: OauthPostProviderCallbackContract['request']['params'] }) {
  try {
    const data = await api.oauth.postProviderCallback({ params: payload.params })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function socialPostLoginAction(payload?: { body?: SocialPostLoginContract['request']['body'] }) {
  try {
    const data = await api.social.postLogin({ body: payload?.body })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function forgotPasswordPostAction(payload?: { body?: ForgotPasswordPostContract['request']['body'] }) {
  try {
    const data = await api.forgotPassword.post({ body: payload?.body })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function resetPasswordPostAction(payload?: { body?: ResetPasswordPostContract['request']['body'] }) {
  try {
    const data = await api.resetPassword.post({ body: payload?.body })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function categoriesGetAction(payload?: { query?: CategoriesGetContract['request']['query'] }) {
  try {
    const data = await api.categories.get({ query: payload?.query })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function produkGetAction(payload?: { query?: ProdukGetContract['request']['query'] }) {
  try {
    const data = await api.produk.get({ query: payload?.query })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function produkGetIdAction(payload: { params: ProdukGetIdContract['request']['params'], query?: ProdukGetIdContract['request']['query'] }) {
  try {
    const data = await api.produk.getId({ params: payload.params, query: payload?.query })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function produkGetIdReviewsAction(payload: { params: ProdukGetIdReviewsContract['request']['params'], query?: ProdukGetIdReviewsContract['request']['query'] }) {
  try {
    const data = await api.produk.getIdReviews({ params: payload.params, query: payload?.query })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function produkPostIdReviewsAction(payload: { params: ProdukPostIdReviewsContract['request']['params'], body?: ProdukPostIdReviewsContract['request']['body'] }) {
  try {
    const data = await api.produk.postIdReviews({ params: payload.params, body: payload?.body, headers: await getAuthHeaders() })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function paymentPostWebhookAction() {
  try {
    const data = await api.payment.postWebhook()
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function paymentPostOrderIdAction(payload: { params: PaymentPostOrderIdContract['request']['params'], body?: PaymentPostOrderIdContract['request']['body'] }) {
  try {
    const data = await api.payment.postOrderId({ params: payload.params, body: payload?.body, headers: await getAuthHeaders() })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function profileGetAction(payload?: { query?: ProfileGetContract['request']['query'] }) {
  try {
    const data = await api.profile.get({ query: payload?.query, headers: await getAuthHeaders() })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function profilePutAction(payload?: { body?: ProfilePutContract['request']['body'] }) {
  try {
    const data = await api.profile.put({ body: payload?.body, headers: await getAuthHeaders() })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function profilePatchAction(payload?: { body?: ProfilePatchContract['request']['body'] }) {
  try {
    const data = await api.profile.patch({ body: payload?.body, headers: await getAuthHeaders() })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function ordersGetAction(payload?: { query?: OrdersGetContract['request']['query'] }) {
  try {
    const data = await api.orders.get({ query: payload?.query, headers: await getAuthHeaders() })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function ordersGetIdAction(payload: { params: OrdersGetIdContract['request']['params'], query?: OrdersGetIdContract['request']['query'] }) {
  try {
    const data = await api.orders.getId({ params: payload.params, query: payload?.query, headers: await getAuthHeaders() })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function ordersGetIdInvoiceAction(payload: { params: OrdersGetIdInvoiceContract['request']['params'], query?: OrdersGetIdInvoiceContract['request']['query'] }) {
  try {
    const data = await api.orders.getIdInvoice({ params: payload.params, query: payload?.query, headers: await getAuthHeaders() })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function cartPostItemsAction(payload?: { body?: CartPostItemsContract['request']['body'] }) {
  try {
    const data = await api.cart.postItems({ body: payload?.body, headers: await getAuthHeaders() })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function cartPatchItemsProdukItemIdAction(payload: { params: CartPatchItemsProdukItemIdContract['request']['params'], body?: CartPatchItemsProdukItemIdContract['request']['body'] }) {
  try {
    const data = await api.cart.patchItemsProdukItemId({ params: payload.params, body: payload?.body, headers: await getAuthHeaders() })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function cartDeleteItemsProdukItemIdAction(payload: { params: CartDeleteItemsProdukItemIdContract['request']['params'], query?: CartDeleteItemsProdukItemIdContract['request']['query'] }) {
  try {
    const data = await api.cart.deleteItemsProdukItemId({ params: payload.params, query: payload?.query, headers: await getAuthHeaders() })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function cartDeleteAction(payload?: { query?: CartDeleteContract['request']['query'] }) {
  try {
    const data = await api.cart.delete({ query: payload?.query, headers: await getAuthHeaders() })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function cartPostPromoAction(payload?: { body?: CartPostPromoContract['request']['body'] }) {
  try {
    const data = await api.cart.postPromo({ body: payload?.body, headers: await getAuthHeaders() })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function cartDeletePromoAction(payload?: { query?: CartDeletePromoContract['request']['query'] }) {
  try {
    const data = await api.cart.deletePromo({ query: payload?.query, headers: await getAuthHeaders() })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function checkoutPostAction(payload?: { body?: CheckoutPostContract['request']['body'] }) {
  try {
    const data = await api.checkout.post({ body: payload?.body, headers: await getAuthHeaders() })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function buyNowPostAction(payload?: { body?: BuyNowPostContract['request']['body'] }) {
  try {
    const data = await api.buyNow.post({ body: payload?.body, headers: await getAuthHeaders() })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function keranjangGetAction(payload?: { query?: KeranjangGetContract['request']['query'] }) {
  try {
    const data = await api.keranjang.get({ query: payload?.query, headers: await getAuthHeaders() })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function wishlistGetAction(payload?: { query?: WishlistGetContract['request']['query'] }) {
  try {
    const data = await api.wishlist.get({ query: payload?.query, headers: await getAuthHeaders() })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function wishlistPostAction(payload?: { body?: WishlistPostContract['request']['body'] }) {
  try {
    const data = await api.wishlist.post({ body: payload?.body, headers: await getAuthHeaders() })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function wishlistDeleteProdukItemIdAction(payload: { params: WishlistDeleteProdukItemIdContract['request']['params'], query?: WishlistDeleteProdukItemIdContract['request']['query'] }) {
  try {
    const data = await api.wishlist.deleteProdukItemId({ params: payload.params, query: payload?.query, headers: await getAuthHeaders() })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function logoutPostAction() {
  try {
    const data = await api.logout.post({ headers: await getAuthHeaders() })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function adminPostProdukAction(payload?: { body?: AdminPostProdukContract['request']['body'] }) {
  try {
    const data = await api.admin.postProduk({ body: payload?.body, headers: await getAuthHeaders() })
    return { success: true, data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}
