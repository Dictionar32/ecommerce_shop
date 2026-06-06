'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, Heart, User, Menu, X, LogOut, Package } from 'lucide-react'
import { useState } from 'react'
import { useCartUiStore } from '@/lib/stores/cart-ui-store'
import { useKeranjang, useLogout } from '@/api/hooks'
import type * as Types from "@/api/types"
import useAuthStore from '@/lib/stores/auth-store'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import {
  Header, Container, LogoLink, LogoText, DesktopNav, DesktopActions, DesktopNavLink, DesktopNavUnderline,
  IconButton, CartBadge, IconLink, UserMenuContainer, UserMenuTrigger,
  UserName, Dropdown, DropdownLink, DropdownDivider, DropdownLogout,
  LoginLink, MobileActions, MobileMenuOverlay, MobileNav, MobileActionRow, MobileNavLinkItem,
  MobileProfileLink, MobileLogoutButton, MobileLoginLink, ClickOutsideLayer
} from './navbar.styles'

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
  const { data: res } = useKeranjang.index()
  const cart = res as Types.OrderResourceTransformed | undefined
  const { user, isAuthenticated, logout } = useAuthStore()
  const qc = useQueryClient()
  const router = useRouter()

  const items = cart?.items ?? []
  const cartCount = items.reduce((s: number, i) => s + i.qty, 0);

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
      <Header>
        <Container>
          {/* Logo */}
          <LogoLink href="/">
            <LogoText>KUNPULAN</LogoText>
          </LogoLink>

          {/* Desktop Navigation */}
          <DesktopNav>
            {navLinks.map((link) => {
              const active = isActive(link.href) ? "true" : "false"
              return (
                <DesktopNavLink
                  key={link.href}
                  href={link.href}
                  active={active}
                >
                  {link.label}
                  {/* Active underline */}
                  <DesktopNavUnderline active={active} />
                </DesktopNavLink>
              )
            })}
            </DesktopNav>

          {/* Desktop Actions */}
          <DesktopActions>
            {/* Cart */}
            <IconButton onClick={openCart} aria-label="Buka keranjang">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <CartBadge>{cartCount > 99 ? '99+' : cartCount}</CartBadge>
              )}
            </IconButton>

            {/* Wishlist */}
            <IconLink href="/wishlist" aria-label="Wishlist">
              <Heart size={20} />
            </IconLink>

            {/* User */}
            {isAuthenticated ? (
              <UserMenuContainer>
                <UserMenuTrigger onClick={() => setUserMenuOpen(!userMenuOpen)}>
                  <User size={16} />
                  <UserName>{user?.name?.split(' ')[0]}</UserName>
                </UserMenuTrigger>

                {userMenuOpen && (
                  <Dropdown>
                    <DropdownLink href="/profile" onClick={() => setUserMenuOpen(false)}>
                      <User size={15} /> Profil
                    </DropdownLink>
                    <DropdownLink href="/orders" onClick={() => setUserMenuOpen(false)}>
                      <Package size={15} /> Pesanan Saya
                    </DropdownLink>
                    <DropdownDivider />
                    <DropdownLogout onClick={handleLogout}>
                      <LogOut size={15} /> Keluar
                    </DropdownLogout>
                  </Dropdown>
                )}
              </UserMenuContainer>
            ) : (
              <LoginLink href="/login">Masuk</LoginLink>
            )}
          </DesktopActions>

          {/* Mobile Menu Button */}
          <MobileActions>
            <IconButton onClick={openCart}>
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <CartBadge>{cartCount}</CartBadge>
              )}
            </IconButton>
            <IconButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </IconButton>
          </MobileActions>
        </Container>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <MobileMenuOverlay>
            <MobileNav>
              {navLinks.map((link) => {
                const active = isActive(link.href) ? "true" : "false"
                return (
                  <MobileNavLinkItem
                    key={link.href}
                    href={link.href}
                    active={active}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </MobileNavLinkItem>
                )
              })}
              <MobileActionRow>
                {isAuthenticated ? (
                  <>
                    <MobileProfileLink href="/profile" onClick={() => setIsMenuOpen(false)}>
                      Profil
                    </MobileProfileLink>
                    <MobileLogoutButton onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                      Keluar
                    </MobileLogoutButton>
                  </>
                ) : (
                  <MobileLoginLink href="/login" onClick={() => setIsMenuOpen(false)}>
                    Masuk
                  </MobileLoginLink>
                )}
              </MobileActionRow>
            </MobileNav>
          </MobileMenuOverlay>
        )}
      </Header>

      {/* Click outside to close user dropdown */}
      {userMenuOpen && (
        <ClickOutsideLayer onClick={() => setUserMenuOpen(false)} />
      )}
    </>
  )
}

export default Navbar
