import { useEffect, useState } from 'react';
import { MotionConfig, motion } from 'motion/react';
import {
  ExternalLink,
  Flame,
  GitBranch,
  MessageCircle,
  QrCode,
  ShoppingBag,
  SlidersHorizontal,
} from 'lucide-react';
import {
  MENU_ITEMS,
  OUTLETS,
  PLATFORM_LINKS,
  SPICE_LEVELS,
  type MenuCategory,
  type MenuItem,
} from './data/menuData';
import {
  formatRupiah,
  type CartItem,
  type FulfillmentType,
  type VoucherRecord,
} from './utils/orderLogic';
import { Header } from './components/Header';
import { BrandMascotHero } from './components/BrandMascotHero';
import { OfficialProfileSection } from './components/OfficialProfileSection';
import { DishIllustration } from './components/DishIllustration';
import { CustomizeModal } from './components/CustomizeModal';
import { CartDrawer } from './components/CartDrawer';
import { PaymentVoucherModal } from './components/PaymentVoucherModal';
import { VoucherLookupModal } from './components/VoucherLookupModal';
import { LocationMapSection } from './components/LocationMapSection';
import { OpenMitraSection } from './components/OpenMitraSection';
import { WordPressExportSection } from './components/WordPressExportSection';

const VOUCHERS_STORAGE_KEY = 'geprek_aja_vouchers_v1';
const CART_STORAGE_KEY = 'geprek_aja_cart_v1';

type FilterTab = 'all' | MenuCategory;

export default function App() {
  const [filter, setFilter] = useState<FilterTab>('all');
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [voucherModalOpen, setVoucherModalOpen] = useState(false);
  const [fulfillment, setFulfillment] = useState<FulfillmentType>('pickup');
  const [selectedOutletId, setSelectedOutletId] = useState<string>(
    OUTLETS[0].id
  );

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  const [vouchers, setVouchers] = useState<VoucherRecord[]>(() => {
    try {
      const raw = localStorage.getItem(VOUCHERS_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as VoucherRecord[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(VOUCHERS_STORAGE_KEY, JSON.stringify(vouchers));
    } catch {
      // Ignore storage quota errors
    }
  }, [vouchers]);

  const filteredMenu = MENU_ITEMS.filter(
    (item) => filter === 'all' || item.category === filter
  );

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.cartKey === newItem.cartKey);
      if (existing) {
        return prev.map((i) =>
          i.cartKey === newItem.cartKey
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        );
      }
      return [...prev, newItem];
    });
    setCartOpen(true);
  };

  const handleUpdateQty = (cartKey: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (cartKey: string) => {
    setCart((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const handleVoucherCreated = (voucher: VoucherRecord) => {
    setVouchers((prev) => [voucher, ...prev]);
    setCart([]);
  };

  const jumpToPaket = () => {
    setFilter('paket');
    const el = document.getElementById('menu');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#18181B]">
        <Header
          cartCount={totalCartCount}
          savedVoucherCount={vouchers.length}
          onOpenCart={() => setCartOpen(true)}
          onOpenVouchers={() => setVoucherModalOpen(true)}
        />

        <main className="flex-1">
          {/* Official Hero Section with Animated Chicken Mascot */}
          <section id="beranda" className="py-10 sm:py-14 bg-white border-b border-zinc-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              <motion.div
                initial={{ opacity: 0.9, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 flex flex-col justify-between gap-6 py-2"
              >
                <div className="space-y-4">
                  <p className="text-xs font-semibold text-[#15803D]">
                    Situs Resmi Geprek Aja · Kabupaten Wonogiri
                  </p>
                  <h1
                    className="font-display font-bold tracking-tight text-zinc-900 leading-[1.08]"
                    style={{
                      fontSize: 'clamp(2.25rem, 4vw, 3.45rem)',
                      textWrap: 'balance',
                    }}
                  >
                    Ayam Geprek Renyah dengan Sambal Sesuai Levelmu.
                  </h1>
                  <p className="text-base text-zinc-600 leading-relaxed max-w-xl">
                    Nikmati Ayam Geprek Mozza, Lombok Ijo, Pedas Nagih, Sambal Matah, Saus Keju, Paket Duo &amp; Hemat, serta olahan Karage &amp; Dimsum Ayam. Pesan langsung, bayar digital QRIS, dan tukar voucher barcode di kasir outlet Wonogiri.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <motion.a
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      href="#menu"
                      className="inline-flex items-center gap-2 bg-[#DC2626] hover:bg-[#EA580C] text-white font-semibold text-sm px-6 py-3.5 rounded-lg transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                      <span>Pesan Menu Sekarang</span>
                    </motion.a>
                    <motion.a
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      href={`https://wa.me/${PLATFORM_LINKS.whatsappMain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#15803D] hover:bg-[#166534] text-white font-semibold text-sm px-5 py-3.5 rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>WhatsApp 0838-2184-6574</span>
                    </motion.a>
                  </div>

                  <div className="pt-3 border-t border-zinc-200 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-600">
                    <span className="font-medium text-zinc-900">
                      Tersedia juga di:
                    </span>
                    <a
                      href={PLATFORM_LINKS.shopeeFood}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-[#EA580C] hover:underline whitespace-nowrap"
                    >
                      <span>ShopeeFood</span>
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                    <a
                      href={PLATFORM_LINKS.grabFood}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-[#15803D] hover:underline whitespace-nowrap"
                    >
                      <span>GrabFood</span>
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      onClick={jumpToPaket}
                      className="font-semibold text-[#DC2626] hover:underline cursor-pointer whitespace-nowrap"
                    >
                      Lihat Paket Duo &amp; Hemat
                    </button>
                  </div>
                </div>
              </motion.div>

              <div className="lg:col-span-6">
                <BrandMascotHero />
              </div>
            </div>
          </section>

          <OfficialProfileSection />

          {/* Menu & Spice Customization Section */}
          <section id="menu" aria-labelledby="menu-heading" className="py-14 sm:py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
              <div id="paket" className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-[#DC2626]">
                    Daftar Menu Lengkap · Kustomisasi Level 0–4 &amp; Olahan Ayam
                  </p>
                  <h2
                    id="menu-heading"
                    className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 mt-1"
                  >
                    Pilih Menu &amp; Atur Level Pedas
                  </h2>
                </div>

                <div
                  role="tablist"
                  aria-label="Filter kategori menu"
                  className="flex flex-wrap items-center gap-1 p-1 bg-zinc-200/70 rounded-lg"
                >
                  {[
                    { id: 'all', label: 'Semua Menu' },
                    { id: 'ayam', label: 'Ayam Geprek' },
                    { id: 'paket', label: 'Paket Duo & Hemat' },
                    { id: 'olahan', label: 'Olahan & Add-ons' },
                    { id: 'minuman', label: 'Minuman' },
                  ].map((tab) => {
                    const active = filter === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setFilter(tab.id as FilterTab)}
                        className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'bg-white text-zinc-900 shadow-sm'
                            : 'text-zinc-600 hover:text-zinc-900'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tri-color Spice Level Reference Bar */}
              <div className="bg-white border border-zinc-200 rounded-xl px-4 py-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-zinc-600">
                <span className="inline-flex items-center gap-1.5 font-semibold text-zinc-900">
                  <Flame className="w-4 h-4 text-[#EA580C]" aria-hidden="true" />
                  <span>Panduan Level Kepedasan:</span>
                </span>
                {SPICE_LEVELS.map((lvl) => {
                  const colorCls =
                    lvl.level <= 1
                      ? 'text-[#15803D]'
                      : lvl.level === 2
                        ? 'text-[#EA580C]'
                        : 'text-[#DC2626]';
                  return (
                    <span key={lvl.level} className="whitespace-nowrap">
                      <strong className={colorCls}>Lv.{lvl.level}</strong>{' '}
                      {lvl.name} ({lvl.chiliCount})
                    </span>
                  );
                })}
              </div>

              {/* Uniform 3-Column Product Grid with Subtle Hover Motion */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                data-testid="menu-grid"
              >
                {filteredMenu.map((item) => (
                  <article
                    key={item.id}
                    className="bg-white border border-zinc-200 rounded-xl overflow-hidden flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5"
                  >
                    <div>
                      <div className="aspect-[4/3] w-full border-b border-zinc-200 bg-[#F4F4F5]">
                        <DishIllustration dishId={item.id} alt={item.name} />
                      </div>

                      <div className="p-5 space-y-2">
                        <div className="flex items-center justify-between gap-2 text-xs text-zinc-500">
                          <span>
                            {item.categoryLabel} · {item.shortSpec}
                          </span>
                          {item.featuredTag && (
                            <span className="font-semibold text-[#EA580C] shrink-0">
                              {item.featuredTag}
                            </span>
                          )}
                        </div>

                        <h3 className="font-display text-lg font-bold text-zinc-900">
                          {item.name}
                        </h3>

                        <p className="text-sm text-zinc-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-3 border-t border-zinc-100 flex items-center justify-between gap-3">
                      <span className="font-mono text-base font-bold text-zinc-900 tabular-nums">
                        {formatRupiah(item.price)}
                      </span>

                      <button
                        type="button"
                        onClick={() => setCustomizingItem(item)}
                        className="inline-flex items-center gap-1.5 bg-zinc-900 hover:bg-[#DC2626] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer active:scale-95"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>
                          {item.isSpicyCustomizable
                            ? 'Pilih Level & Pesan'
                            : 'Pilih & Tambah'}
                        </span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              {/* Integrated Delivery & Digital Voucher Strip */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-white border border-zinc-200 rounded-xl p-5 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-[#15803D]">
                      Pembayaran &amp; Penukaran
                    </p>
                    <h3 className="font-display text-base font-bold text-zinc-900">
                      Voucher Barcode Kasir
                    </h3>
                    <p className="text-xs text-zinc-600">
                      Bayar via QRIS, E-Wallet, atau VA dan tunjukkan barcode otomatis ke kasir.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setVoucherModalOpen(true)}
                    className="shrink-0 p-2.5 rounded-lg border border-zinc-200 hover:border-zinc-900 text-zinc-800 cursor-pointer"
                    aria-label="Lihat voucher barcode tersimpan"
                  >
                    <QrCode className="w-5 h-5 text-[#DC2626]" aria-hidden="true" />
                  </button>
                </div>

                <a
                  href={PLATFORM_LINKS.shopeeFood}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-zinc-200 hover:border-[#EA580C] rounded-xl p-5 flex items-start justify-between gap-4 transition-colors"
                >
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-[#EA580C]">
                      Mitra Pengantaran
                    </p>
                    <h3 className="font-display text-base font-bold text-zinc-900">
                      Pesan di ShopeeFood
                    </h3>
                    <p className="text-xs text-zinc-600">
                      Akses menu lengkap Geprek Aja dengan promo pengiriman ShopeeFood.
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#EA580C] shrink-0 mt-1" aria-hidden="true" />
                </a>

                <a
                  href={PLATFORM_LINKS.grabFood}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-zinc-200 hover:border-[#15803D] rounded-xl p-5 flex items-start justify-between gap-4 transition-colors"
                >
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-[#15803D]">
                      Mitra Pengantaran
                    </p>
                    <h3 className="font-display text-base font-bold text-zinc-900">
                      Pesan di GrabFood
                    </h3>
                    <p className="text-xs text-zinc-600">
                      Pengiriman cepat langsung dari dapur cabang Wonogiri via GrabFood.
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#15803D] shrink-0 mt-1" aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>

          <LocationMapSection
            selectedOutletId={selectedOutletId}
            onSelectOutlet={setSelectedOutletId}
          />

          <OpenMitraSection />

          <WordPressExportSection />
        </main>

        <footer className="bg-white border-t border-zinc-200 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-500">
            <div className="flex items-center gap-2.5">
              <img
                src="/assets/aistudio/Logo_Ayam_Ceria_Geprek_Aja_1cb8013f.png"
                alt="Logo Geprek Aja"
                className="w-7 h-7 object-contain shrink-0"
              />
              <div>
                <span className="font-display text-sm font-bold text-zinc-900">
                  Geprek <span className="text-[#DC2626]">Aja</span>
                </span>
                <span className="mx-2" aria-hidden="true">
                  ·
                </span>
                <span>Kabupaten Wonogiri · Ayam Geprek &amp; Olahan Ayam Segar</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <a href="#profil" className="hover:text-[#15803D]">
                Profil
              </a>
              <a href="#menu" className="hover:text-[#DC2626]">
                Menu
              </a>
              <a href="#lokasi" className="hover:text-[#15803D]">
                Lokasi Wonogiri
              </a>
              <a href="#mitra" className="hover:text-[#EA580C]">
                Open Mitra
              </a>
              <a
                href={`https://wa.me/${PLATFORM_LINKS.whatsappMain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#15803D] font-medium"
              >
                WhatsApp 0838-2184-6574
              </a>
              <a
                href={PLATFORM_LINKS.githubRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-zinc-900 font-medium"
              >
                <GitBranch className="w-3.5 h-3.5" aria-hidden="true" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </footer>

        <CustomizeModal
          item={customizingItem}
          onClose={() => setCustomizingItem(null)}
          onAddToCart={handleAddToCart}
        />

        <CartDrawer
          open={cartOpen}
          items={cart}
          fulfillment={fulfillment}
          onChangeFulfillment={setFulfillment}
          onClose={() => setCartOpen(false)}
          onUpdateQty={handleUpdateQty}
          onRemoveItem={handleRemoveItem}
          onQuickAddDrink={handleAddToCart}
          onProceedCheckout={() => {
            setCartOpen(false);
            setCheckoutOpen(true);
          }}
        />

        <PaymentVoucherModal
          open={checkoutOpen}
          items={cart}
          fulfillment={fulfillment}
          selectedOutletId={selectedOutletId}
          onClose={() => setCheckoutOpen(false)}
          onVoucherCreated={handleVoucherCreated}
        />

        <VoucherLookupModal
          open={voucherModalOpen}
          vouchers={vouchers}
          onClose={() => setVoucherModalOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}
