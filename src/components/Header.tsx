import React, { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  savedVoucherCount: number;
  onOpenCart: () => void;
  onOpenVouchers: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  savedVoucherCount,
  onOpenCart,
  onOpenVouchers,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-zinc-200">
      <div className="h-1 w-full bg-gradient-to-r from-[#15803D] via-[#EA580C] to-[#DC2626]" />
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-6 lg:gap-8">
        {/* Zone 1: Official Mascot Icon + Single-line brand wordmark */}
        <a
          href="#beranda"
          className="inline-flex items-center gap-2 font-display text-lg sm:text-xl font-bold tracking-tight text-zinc-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#DC2626] rounded"
        >
          <img
            src="/assets/aistudio/Logo_Ayam_Ceria_Geprek_Aja_1cb8013f.png"
            alt="Logo Ayam Ceria Geprek Aja"
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain shrink-0"
          />
          <span>
            Geprek <span className="text-[#DC2626]">Aja</span>
          </span>
        </a>

        {/* Zone 2: 6 concise single-line nav links */}
        <nav
          aria-label="Navigasi utama"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-600"
        >
          <a
            href="#profil"
            className="hover:text-[#15803D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Profil
          </a>
          <a
            href="#menu"
            className="hover:text-[#DC2626] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Menu
          </a>
          <a
            href="#paket"
            className="hover:text-[#EA580C] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Paket
          </a>
          <a
            href="#lokasi"
            className="hover:text-[#15803D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Lokasi
          </a>
          <a
            href="#mitra"
            className="hover:text-[#EA580C] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Open Mitra
          </a>
          <button
            type="button"
            onClick={onOpenVouchers}
            className="hover:text-[#15803D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {savedVoucherCount > 0
              ? `Cek Voucher (${savedVoucherCount})`
              : 'Cek Voucher'}
          </button>
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Buka keranjang pesanan, ${cartCount} item`}
            className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#DC2626] hover:bg-[#EA580C] text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DC2626]"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            <span>Keranjang</span>
            <span className="font-mono tabular-nums">({cartCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          aria-label="Navigasi seluler"
          className="lg:hidden border-t border-zinc-200 bg-white px-4 py-3 grid grid-cols-2 gap-1.5"
        >
          <a
            href="#profil"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2.5 px-3 text-sm font-medium text-zinc-800 rounded-lg hover:bg-zinc-100"
          >
            Profil Geprek Aja
          </a>
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2.5 px-3 text-sm font-medium text-zinc-800 rounded-lg hover:bg-zinc-100"
          >
            Daftar Menu
          </a>
          <a
            href="#paket"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2.5 px-3 text-sm font-medium text-zinc-800 rounded-lg hover:bg-zinc-100"
          >
            Paket Duo &amp; Hemat
          </a>
          <a
            href="#lokasi"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2.5 px-3 text-sm font-medium text-zinc-800 rounded-lg hover:bg-zinc-100"
          >
            Lokasi Wonogiri
          </a>
          <a
            href="#mitra"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2.5 px-3 text-sm font-medium text-zinc-800 rounded-lg hover:bg-zinc-100"
          >
            Open Mitra
          </a>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenVouchers();
            }}
            className="py-2.5 px-3 text-left text-sm font-medium text-zinc-800 rounded-lg hover:bg-zinc-100 cursor-pointer"
          >
            {savedVoucherCount > 0
              ? `Cek Voucher (${savedVoucherCount})`
              : 'Cek Voucher'}
          </button>
        </nav>
      )}
    </header>
  );
};
