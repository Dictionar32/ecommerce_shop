"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, ArrowRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

function SuccessContent() {
  const params = useSearchParams()
  const orderId  = params.get("orderId")
  const invoice  = params.get("invoice")
  const status   = params.get("status") ?? "paid"

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 animate-[fadeIn_0.5s_ease]">
      <div className="max-w-md w-full">
        <div className="relative card-dark p-10 text-center overflow-hidden">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-14 h-14 border-t-2 border-l-2 border-gold-500/60" />
          <div className="absolute top-0 right-0 w-14 h-14 border-t-2 border-r-2 border-gold-500/60" />
          <div className="absolute bottom-0 left-0 w-14 h-14 border-b-2 border-l-2 border-gold-500/60" />
          <div className="absolute bottom-0 right-0 w-14 h-14 border-b-2 border-r-2 border-gold-500/60" />

          {/* Radial bg glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/5 to-transparent pointer-events-none" />

          <div className="relative">
            <div className="w-20 h-20 rounded-sm bg-emerald-900/20 border border-emerald-800/40 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-emerald-400" />
            </div>

            <p className="text-xs font-semibold text-gold-500 tracking-widest uppercase mb-3">
              Pembayaran Berhasil
            </p>
            <h1 className="font-heading text-3xl text-obsidian-50 mb-3">Terima Kasih!</h1>
            <p className="text-obsidian-400 text-sm leading-relaxed mb-6">
              Pesanan Anda telah dikonfirmasi dan sedang diproses. 
              Kami akan segera mengirimkan ke alamat yang Anda berikan.
            </p>

            {/* Order info */}
            <div className="bg-obsidian-900/60 border border-obsidian-700/40 rounded-sm p-5 mb-6 text-left space-y-3">
              {invoice && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-obsidian-500">Nomor Invoice</span>
                  <span className="font-heading text-gold-400 font-semibold">{invoice}</span>
                </div>
              )}
              {orderId && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-obsidian-500">Order ID</span>
                  <span className="text-sm text-obsidian-300">#{orderId}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-xs text-obsidian-500">Status Pembayaran</span>
                <span className="badge border-emerald-800/60 bg-emerald-900/20 text-emerald-400 capitalize">{status}</span>
              </div>
            </div>

            <Separator className="bg-obsidian-800 mb-6" />

            <div className="flex flex-col gap-3">
              <Link href="/orders">
                <Button className="btn-gold w-full flex items-center justify-center gap-2">
                  <ShoppingBag size={15} /> Lihat Detail Pesanan
                </Button>
              </Link>
              <Link href="/produk">
                <Button variant="outline"
                  className="btn-outline w-full flex items-center justify-center gap-2">
                  Lanjut Belanja <ArrowRight size={14} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
