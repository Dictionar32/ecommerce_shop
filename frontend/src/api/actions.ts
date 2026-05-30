// Auto-generated Next.js Server Actions. Do not edit manually.
"use server";

import { api } from './api'
import { cookies } from 'next/headers'

// Helper to auto-inject token from cookies if available
async function getAuthHeaders(): Promise<Record<string, string> | undefined> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  return token ? { Authorization: `Bearer ${token}` } : undefined
}

export async function registerPostAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.register.post({ body: payload })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function loginPostAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.login.post({ body: payload })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function oauthGetProviderRedirectAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.oauth.getProviderRedirect({ query: payload })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function oauthGetProviderCallbackAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.oauth.getProviderCallback({ query: payload })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function oauthPostProviderCallbackAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.oauth.postProviderCallback({ body: payload })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function socialPostLoginAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.social.postLogin({ body: payload })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function forgotPasswordPostAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.forgotPassword.post({ body: payload })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function resetPasswordPostAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.resetPassword.post({ body: payload })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function categoriesGetAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.categories.get({ query: payload })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function produkGetAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.produk.get({ query: payload })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function produkGetIdAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.produk.getId({ query: payload })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function produkGetIdReviewsAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.produk.getIdReviews({ query: payload })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function produkPostIdReviewsAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.produk.postIdReviews({ body: payload, headers: await getAuthHeaders() })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function paymentPostWebhookAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.payment.postWebhook({ body: payload })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function paymentPostOrderIdAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.payment.postOrderId({ body: payload, headers: await getAuthHeaders() })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function profileGetAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.profile.get({ query: payload, headers: await getAuthHeaders() })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function profilePutAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.profile.put({ body: payload, headers: await getAuthHeaders() })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function profilePatchAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.profile.patch({ body: payload, headers: await getAuthHeaders() })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function ordersGetAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.orders.get({ query: payload, headers: await getAuthHeaders() })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function ordersGetIdAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.orders.getId({ query: payload, headers: await getAuthHeaders() })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function ordersGetIdInvoiceAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.orders.getIdInvoice({ query: payload, headers: await getAuthHeaders() })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function cartPostItemsAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.cart.postItems({ body: payload, headers: await getAuthHeaders() })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function cartPatchItemsProdukItemIdAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.cart.patchItemsProdukItemId({ body: payload, headers: await getAuthHeaders() })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function cartDeleteItemsProdukItemIdAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.cart.deleteItemsProdukItemId({ body: payload, headers: await getAuthHeaders() })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function cartDeleteAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.cart.delete({ body: payload, headers: await getAuthHeaders() })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function cartPostPromoAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.cart.postPromo({ body: payload, headers: await getAuthHeaders() })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function cartDeletePromoAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.cart.deletePromo({ body: payload, headers: await getAuthHeaders() })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function checkoutPostAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.checkout.post({ body: payload, headers: await getAuthHeaders() })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function buyNowPostAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.buyNow.post({ body: payload, headers: await getAuthHeaders() })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function keranjangGetAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.keranjang.get({ query: payload, headers: await getAuthHeaders() })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function wishlistGetAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.wishlist.get({ query: payload, headers: await getAuthHeaders() })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function wishlistPostAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.wishlist.post({ body: payload, headers: await getAuthHeaders() })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function wishlistDeleteProdukItemIdAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.wishlist.deleteProdukItemId({ body: payload, headers: await getAuthHeaders() })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function logoutPostAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.logout.post({ body: payload, headers: await getAuthHeaders() })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

export async function adminPostProdukAction(payload?: Record<string, unknown>) {
  try {
    const response = await api.admin.postProduk({ body: payload, headers: await getAuthHeaders() })
    return { success: true, data: response.data }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}
