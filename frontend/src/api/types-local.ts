export interface User {
  id: number
  name: string
  email: string
  avatar_url?: string
}

export interface Category {
  id: number
  nama: string
  slug: string
}

export interface ProdukItem {
  id: number
  category_id: number
  nama: string
  slug: string
  deskripsi?: string
  harga: number
  stok: number
  gambar?: string
  rating?: number
  jumlah_review?: number
  category?: Category
  first_item_id?: number
  image_url?: string
  name?: string
  category_name?: string
  review_count?: number
  price?: number
}

export interface Review {
  id: number
  user_id: number
  rating: number
  title?: string
  comment?: string
  created_at?: string
  user?: User
}

export interface CartItem {
  produk_item_id: number
  product_name: string
  product_image_url: string
  qty: number
  price: number
  subtotal: number
}

export interface WishlistItem {
  produk_item_id: number
  product_name: string
  product_image_url?: string
  category_name?: string
  review_count?: number
  rating?: number
  price: number
}

export interface CartResponse {
  items: CartItem[]
  subtotal_minor: number
  discount_minor: number
  shipping_minor: number
  total_minor: number
  promotion_code?: string
  total_harga_minor?: number
  promotion?: any
}

export interface OrderItem {
  id: number
  produk_item_id: number
  nama_produk: string
  harga: number
  qty: number
  subtotal: number
}

export interface OrderResponse {
  id: number
  invoice_number: string
  status: string
  payment_status?: string
  fulfillment_status?: string
  total_harga: number
  total_harga_minor?: number
  subtotal_minor?: number
  discount_minor?: number
  shipping_minor?: number
  promotion_code?: string
  shipping_nama: string
  shipping_alamat: string
  shipping_kota?: string
  shipping_kode_pos?: string
  shipping_telepon?: string
  items?: OrderItem[]
  created_at?: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
}
