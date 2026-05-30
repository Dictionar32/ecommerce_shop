// Auto-generated MSW Mocks. Do not edit manually.
import { http, HttpResponse, delay } from 'msw'

export const handlers = [
  http.post('http://localhost/api/register', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for registerPost at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.post('http://localhost/api/login', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for loginPost at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.get('http://localhost/api/oauth/:provider/redirect', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for oauthGet at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.get('http://localhost/api/oauth/:provider/callback', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for oauthGet at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.post('http://localhost/api/oauth/:provider/callback', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for oauthPost at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.post('http://localhost/api/social/login', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for socialPost at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.post('http://localhost/api/forgot-password', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for forgotPasswordPost at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.post('http://localhost/api/reset-password', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for resetPasswordPost at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.get('http://localhost/api/categories', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for categoriesGet at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.get('http://localhost/api/produk', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for produkGet at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.get('http://localhost/api/produk/:id', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for produkGet at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.get('http://localhost/api/produk/:id/reviews', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for produkGet at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.post('http://localhost/api/payment/webhook', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for paymentPost at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.get('http://localhost/api/profile', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for profileGet at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.put('http://localhost/api/profile', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for profilePut at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.patch('http://localhost/api/profile', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for profilePatch at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.get('http://localhost/api/orders', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for ordersGet at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.get('http://localhost/api/orders/:id', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for ordersGet at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.post('http://localhost/api/cart/items', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for cartPost at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.patch('http://localhost/api/cart/items/:produkItemId', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for cartPatch at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.delete('http://localhost/api/cart/items/:produkItemId', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for cartDelete at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.delete('http://localhost/api/cart', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for cartDelete at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.post('http://localhost/api/cart/promo', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for cartPost at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.delete('http://localhost/api/cart/promo', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for cartDelete at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.post('http://localhost/api/checkout', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for checkoutPost at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.post('http://localhost/api/buy-now', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for buyNowPost at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.get('http://localhost/api/keranjang', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for keranjangGet at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.get('http://localhost/api/wishlist', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for wishlistGet at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.post('http://localhost/api/wishlist', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for wishlistPost at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.delete('http://localhost/api/wishlist/:produkItemId', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for wishlistDelete at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.post('http://localhost/api/produk/:id/reviews', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for produkPost at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.post('http://localhost/api/payment/:orderId', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for paymentPost at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.get('http://localhost/api/orders/:id/invoice', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for ordersGet at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.post('http://localhost/api/logout', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for logoutPost at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
  http.post('http://localhost/api/admin/produk', async ({ request, params }) => {
    await delay(300) // Simulated network latency
    const url = new URL(request.url)
    return HttpResponse.json({
      success: true,
      message: 'Mocked response for adminPost at ' + url.pathname,
      data: {
        params,
        // TODO: Add mock data based on your schema
      }
    })
  }),
]