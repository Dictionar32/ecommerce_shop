import Link from "next/link";
import { Shield, Truck, RotateCcw, Star, ArrowRight, Gem } from "lucide-react";

const features = [
  { icon: Shield,    title: "Kualitas Terjamin",    desc: "Setiap produk melewati seleksi ketat untuk memastikan standar premium." },
  { icon: Truck,     title: "Pengiriman Cepat",     desc: "Dikirim langsung ke pintumu dalam waktu tercepat dengan aman." },
  { icon: RotateCcw, title: "Garansi Pengembalian", desc: "Tidak puas? Kembalikan dalam 30 hari tanpa pertanyaan." },
  { icon: Star,      title: "Layanan Eksklusif",    desc: "Tim dukungan kami siap 24/7 untuk pengalaman terbaik Anda." },
];

export default function HomePage() {
  return (
    <div className="animate-[fadeIn_0.5s_ease]">

      {/* ── Hero ── */}
      <section className="relative min-h-[88vh] flex items-center justify-center px-4 overflow-hidden">
        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/[0.06] rounded-full blur-3xl" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-600/[0.04] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-400/[0.03] rounded-full blur-3xl" />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: "linear-gradient(#e8c162 1px, transparent 1px), linear-gradient(90deg, #e8c162 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          {/* Label */}
          <div className="inline-flex items-center gap-2 border border-gold-800/50 bg-gold-500/5 px-4 py-1.5 rounded-sm mb-8 animate-[slideUp_0.5s_ease_0.1s_both]">
            <Gem size={12} className="text-gold-500" />
            <span className="text-xs font-semibold text-gold-400 tracking-widest uppercase">Premium Collection 2025</span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl text-obsidian-50 leading-[0.95] mb-6 animate-[slideUp_0.5s_ease_0.2s_both]">
            Kemewahan<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600">
              Ada di Sini
            </span>
          </h1>

          <p className="text-obsidian-400 text-lg leading-relaxed mb-10 max-w-xl mx-auto animate-[slideUp_0.5s_ease_0.3s_both]">
            Temukan koleksi produk eksklusif yang dipilih dengan cermat untuk mereka yang menghargai kualitas tanpa kompromi.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap animate-[slideUp_0.5s_ease_0.4s_both]">
            <Link href="/produk" className="btn-gold flex items-center gap-2">
              Jelajahi Koleksi <ArrowRight size={15} />
            </Link>
            <Link href="/register" className="btn-outline">
              Daftar Gratis
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 pt-12 border-t border-obsidian-800/60 animate-[slideUp_0.5s_ease_0.5s_both]">
            {[
              { val: "500+", label: "Produk Premium" },
              { val: "10K+", label: "Pelanggan Puas" },
              { val: "4.9★", label: "Rating Rata-rata" },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <p className="font-heading text-2xl text-gold-400">{val}</p>
                <p className="text-xs text-obsidian-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gold divider ── */}
      <div className="gold-divider mx-8" />

      {/* ── Features ── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-gold-500 tracking-widest uppercase mb-3">Mengapa KUNPULAN</p>
            <h2 className="section-title">Pengalaman Belanja<br/>yang Berbeda</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <div key={title}
                className="card-dark p-6 hover:border-gold-800/40 hover:shadow-[0_4px_24px_rgba(212,168,67,0.07)] hover:-translate-y-1 transition-all duration-300 group"
                style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-11 h-11 rounded-sm bg-gold-500/10 border border-gold-800/40 flex items-center justify-center mb-5 group-hover:bg-gold-500/20 group-hover:border-gold-700/50 transition-colors">
                  <Icon size={20} className="text-gold-400" />
                </div>
                <h3 className="font-heading text-base text-obsidian-100 mb-2">{title}</h3>
                <p className="text-xs text-obsidian-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-6 px-4 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-sm border border-gold-800/40 bg-gradient-to-br from-obsidian-900 via-obsidian-900 to-gold-500/5 p-12 text-center">
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: "radial-gradient(circle, #d4a843 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
            <p className="text-xs font-semibold text-gold-500 tracking-widest uppercase mb-3 relative">Penawaran Eksklusif</p>
            <h2 className="font-heading text-4xl text-obsidian-50 mb-4 relative">
              Mulai Koleksi Anda<br/>Hari Ini
            </h2>
            <p className="text-obsidian-400 text-sm mb-8 relative max-w-md mx-auto">
              Daftar sekarang dan dapatkan akses eksklusif ke produk premium pilihan kami.
            </p>
            <Link href="/produk" className="btn-gold inline-flex items-center gap-2 relative">
              Lihat Semua Produk <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
