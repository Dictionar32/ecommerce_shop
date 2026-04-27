/**
 * Produk Form Types - Form input types for produk feature
 */
export namespace ProdukForm {
  export type Create = {
    nama: string
    deskripsi: string
    harga: number
    stok: number
    categoryId: number
    gambar: File
  }

  export type Update = {
    nama: string
    deskripsi: string
    harga: number
    stok: number
    kategorId: number
    gambar: File
  }
}
