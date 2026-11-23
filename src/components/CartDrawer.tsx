import React from 'react';
import { MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { MENU_ITEMS, PLATFORM_LINKS } from '../data/menuData';
import {
  buildCartKey,
  buildWhatsAppOrderUrl,
  calculateCartTotals,
  formatRupiah,
  type CartItem,
  type FulfillmentType,
} from '../utils/orderLogic';

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  fulfillment: FulfillmentType;
  onChangeFulfillment: (f: FulfillmentType) => void;
  onClose: () => void;
  onUpdateQty: (cartKey: string, delta: number) => void;
  onRemoveItem: (cartKey: string) => void;
  onQuickAddDrink: (item: CartItem) => void;
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  items,
  fulfillment,
  onChangeFulfillment,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onQuickAddDrink,
  onProceedCheckout,
}) => {
  if (!open) return null;

  const { subtotal, serviceFee, total, itemCount } = calculateCartTotals(
    items,
    fulfillment
  );

  const hasDrink = items.some(
    (i) => i.menuId === 'es-teh-manis' || i.menuId === 'air-mineral'
  );
  const companionDrinks = MENU_ITEMS.filter((m) => m.category === 'minuman');

  const quickAdd = (menuId: string) => {
    const found = MENU_ITEMS.find((m) => m.id === menuId);
    if (!found) return;
    const defaultOpt = found.drinkTempOptions?.[0] ?? '';
    onQuickAddDrink({
      cartKey: buildCartKey(found.id, null, defaultOpt, [], ''),
      menuId: found.id,
      name: found.name,
      basePrice: found.price,
      unitPrice: found.price,
      quantity: 1,
      spiceLevel: null,
      spiceLabel: null,
      optionChoice: defaultOpt,
      addOnIds: [],
      addOnNames: [],
      note: '',
    });
  };

  const whatsappDirectUrl = buildWhatsAppOrderUrl({
    phone: PLATFORM_LINKS.whatsappMain,
    items,
    total,
  });

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-zinc-900/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      <div className="bg-white w-full max-w-md h-full flex flex-col border-l border-zinc-200">
        <div className="px-5 py-4 border-b border-zinc-200 flex items-center justify-between">
          <div>
            <h2
              id="cart-drawer-title"
              className="font-display text-lg font-bold text-zinc-900"
            >
              Keranjang Pesanan
            </h2>
            <p className="text-xs text-zinc-500">
              {itemCount} item dipilih
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup keranjang"
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {items.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-zinc-100 mx-auto flex items-center justify-center text-zinc-500">
                <ShoppingBag className="w-5 h-5" aria-hidden="true" />
              </div>
              <p className="text-sm font-medium text-zinc-900">
                Keranjang Anda masih kosong
              </p>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                Pilih Ayam Geprek Mozza, Lombok Ijo, Pedas Nagih, atau Paket Duo &amp; Hemat dari daftar menu.
              </p>
            </div>
          ) : (
            <>
              <fieldset>
                <legend className="text-xs font-semibold text-zinc-500 mb-2">
                  Metode Pengambilan
                </legend>
                <div className="grid grid-cols-3 gap-1.5 bg-zinc-100 p-1 rounded-lg">
                  {[
                    { id: 'pickup', label: 'Ambil Sendiri' },
                    { id: 'dine_in', label: 'Makan di Sini' },
                    { id: 'delivery', label: 'Antar Kurir' },
                  ].map((opt) => {
                    const active = fulfillment === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          onChangeFulfillment(opt.id as FulfillmentType)
                        }
                        aria-pressed={active}
                        className={`py-2 px-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                          active
                            ? 'bg-white text-zinc-900 shadow-sm'
                            : 'text-zinc-600 hover:text-zinc-900'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <ul className="divide-y divide-zinc-200">
                {items.map((item) => (
                  <li key={item.cartKey} className="py-3.5 first:pt-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-zinc-900">
                          {item.name}
                        </p>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          {[item.spiceLabel, item.optionChoice]
                            .filter(Boolean)
                            .join(' · ')}
                        </p>
                        {item.addOnNames.length > 0 && (
                          <p className="text-xs text-zinc-600 mt-0.5">
                            + {item.addOnNames.join(', ')}
                          </p>
                        )}
                        {item.note && (
                          <p className="text-xs text-zinc-500 italic mt-0.5">
                            Catatan: {item.note}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.cartKey)}
                        aria-label={`Hapus ${item.name}`}
                        className="p-1.5 text-zinc-400 hover:text-[#DC2626] rounded cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="inline-flex items-center border border-zinc-200 rounded-lg">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.cartKey, -1)}
                          aria-label={`Kurangi jumlah ${item.name}`}
                          className="w-9 h-9 inline-flex items-center justify-center text-zinc-600 hover:bg-zinc-100 rounded-l-lg cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                        <span className="w-8 text-center font-mono text-xs font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.cartKey, 1)}
                          aria-label={`Tambah jumlah ${item.name}`}
                          className="w-9 h-9 inline-flex items-center justify-center text-zinc-600 hover:bg-zinc-100 rounded-r-lg cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>
                      <span className="font-mono text-sm font-semibold text-zinc-900 tabular-nums">
                        {formatRupiah(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              {!hasDrink && (
                <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3.5 space-y-2.5">
                  <p className="text-xs font-semibold text-zinc-900">
                    Lengkapi dengan Minuman Pendamping
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {companionDrinks.map((drink) => (
                      <button
                        key={drink.id}
                        type="button"
                        onClick={() => quickAdd(drink.id)}
                        className="text-left bg-white border border-zinc-200 hover:border-zinc-900 rounded-lg p-2.5 transition-colors cursor-pointer"
                      >
                        <div className="text-xs font-semibold text-zinc-900">
                          + {drink.name}
                        </div>
                        <div className="font-mono text-xs text-zinc-600 tabular-nums mt-0.5">
                          {formatRupiah(drink.price)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t border-zinc-200 bg-zinc-50/80 space-y-3">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">
                  {formatRupiah(subtotal)}
                </span>
              </div>
              {serviceFee > 0 && (
                <div className="flex justify-between text-zinc-600">
                  <span>Ongkos Antar Kurir</span>
                  <span className="font-mono tabular-nums">
                    {formatRupiah(serviceFee)}
                  </span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-zinc-900 pt-1.5 border-t border-zinc-200 text-base">
                <span>Total Pembayaran</span>
                <span className="font-mono tabular-nums">
                  {formatRupiah(total)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onProceedCheckout}
              className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold text-sm py-3 px-4 rounded-lg transition-colors cursor-pointer"
            >
              Lanjut Pembayaran &amp; Buat Voucher
            </button>

            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white border border-zinc-200 hover:border-zinc-900 text-zinc-900 font-semibold text-sm py-2.5 px-4 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#15803D]" aria-hidden="true" />
              <span>Kirim Pesanan via WhatsApp</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
