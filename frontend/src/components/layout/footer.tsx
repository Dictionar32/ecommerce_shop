import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-obsidian-800/80 bg-obsidian-950">
      {/* Gold accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-600/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-heading text-gold-400 tracking-widest uppercase text-xl mb-1">KUNPULAN</h3>
            <div className="h-px w-12 bg-gold-600/40 mb-4" />
            <p className="text-sm text-obsidian-500 leading-relaxed max-w-xs">
              Destinasi belanja online terpercaya Anda untuk produk berkualitas tinggi dengan pengalaman berbelanja yang elegan.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-obsidian-400 uppercase tracking-widest mb-5">Navigasi</h4>
            <ul className="space-y-3">
              {[
                { href: '/produk', label: 'Produk' },
                { href: '/wishlist', label: 'Wishlist' },
                { href: '/orders', label: 'Pesanan' },
                { href: '/profile', label: 'Profil' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="link-gold text-sm">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Auth */}
          <div>
            <h4 className="text-xs font-semibold text-obsidian-400 uppercase tracking-widest mb-5">Akun</h4>
            <ul className="space-y-3">
              {[
                { href: '/login', label: 'Masuk' },
                { href: '/register', label: 'Daftar' },
                { href: '/forgot-password', label: 'Lupa Password' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="link-gold text-sm">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-obsidian-900 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-obsidian-600">
            © {new Date().getFullYear()} KUNPULAN. Hak cipta dilindungi.
          </p>
          <p className="text-xs text-obsidian-700">
            Dibangun dengan Next.js & Laravel
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
