'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, Heart, User, Menu, X, LogOut, Package } from 'lucide-react'
import { useState } from 'react'
import { useCartUiStore } from '@/lib/stores/cart-ui-store'
import { useCartSummary } from '@/features/cart/hooks/use-cart-summary'
import useAuthStore from '@/lib/stores/auth-store'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/produk', label: 'Produk' },
  { href: '/wishlist', label: 'Wishlist' },
  { href: '/orders', label: 'Pesanan' },
]

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const { openCart } = useCartUiStore()
  const { data: cart } = useCartSummary.useGet()
  const { user, isAuthenticated, logout } = useAuthStore()
  const qc = useQueryClient()
  const router = useRouter()

  const cartCount = cart?.items?.reduce((s, i) => s + i.qty, 0) ?? 0

  const handleLogout = () => {
    logout()
    qc.clear()
    setUserMenuOpen(false)
    toast.success('Berhasil keluar')
    router.push('/')
  }

  const isActive = (href: string) => pathname === href

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-obsidian-800/80 bg-obsidian-950/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-xl text-gold-400 tracking-widest uppercase">KUNPULAN</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors relative pb-0.5 group ${
                  isActive(link.href)
                    ? 'text-gold-400 font-medium'
                    : 'text-obsidian-400 hover:text-obsidian-100'
                }`}
              >
                {link.label}
                {/* Active underline */}
                <span className={`absolute -bottom-1 left-0 h-px bg-gold-500 transition-all duration-300 ${
                  isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full opacity-60'
                }`} />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-2 text-obsidian-400 hover:text-gold-400 transition-colors"
              aria-label="Buka keranjang"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-gold-500 text-obsidian-950 text-[10px] font-bold">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="p-2 text-obsidian-400 hover:text-gold-400 transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </Link>

            {/* User */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 border border-obsidian-700 hover:border-gold-600 rounded-sm text-sm text-obsidian-300 hover:text-gold-400 transition-colors"
                >
                  <User size={16} />
                  <span className="max-w-[80px] truncate">{user?.name?.split(' ')[0]}</span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-obsidian-900 border border-obsidian-700 rounded-sm shadow-xl z-[60] overflow-hidden">
                    <Link
                      href="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-obsidian-300 hover:bg-obsidian-800 hover:text-obsidian-100 transition-colors"
                    >
                      <User size={15} /> Profil
                    </Link>
                    <Link
                      href="/orders"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-obsidian-300 hover:bg-obsidian-800 hover:text-obsidian-100 transition-colors"
                    >
                      <Package size={15} /> Pesanan Saya
                    </Link>
                    <div className="border-t border-obsidian-800" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-obsidian-800 transition-colors w-full text-left"
                    >
                      <LogOut size={15} /> Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-1.5 bg-gold-500 text-obsidian-950 text-sm font-semibold hover:bg-gold-400 transition-colors rounded-sm"
              >
                Masuk
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={openCart} className="relative p-2 text-obsidian-400">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-gold-500 text-obsidian-950 text-[10px] font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="p-2 text-obsidian-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-obsidian-800 md:hidden">
            <nav className="max-w-7xl mx-auto flex flex-col px-4 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-3 text-sm border-b border-obsidian-900 transition-colors ${
                    isActive(link.href)
                      ? 'text-gold-400 font-medium'
                      : 'text-obsidian-400 hover:text-obsidian-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 flex gap-2">
                {isAuthenticated ? (
                  <>
                    <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="flex-1 py-2 text-center border border-obsidian-700 text-obsidian-300 text-sm rounded-sm">
                      Profil
                    </Link>
                    <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="flex-1 py-2 text-center border border-red-800/60 text-red-400 text-sm rounded-sm">
                      Keluar
                    </button>
                  </>
                ) : (
                  <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex-1 py-2 text-center bg-gold-500 text-obsidian-950 text-sm font-semibold rounded-sm">
                    Masuk
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Click outside to close user dropdown */}
      {userMenuOpen && (
        <div className="fixed inset-0 z-[55]" onClick={() => setUserMenuOpen(false)} />
      )}
    </>
  )
}

export default Navbar
