import React, { useEffect, useState } from 'react';
import { Flame, Minus, Plus, X } from 'lucide-react';
import {
  CHICKEN_ADDONS,
  SPICE_LEVELS,
  type MenuItem,
} from '../data/menuData';
import {
  buildCartKey,
  calculateItemUnitPrice,
  formatRupiah,
  type CartItem,
} from '../utils/orderLogic';
import { DishIllustration } from './DishIllustration';

interface CustomizeModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  const [spiceLevel, setSpiceLevel] = useState<0 | 1 | 2 | 3 | 4>(2);
  const [optionChoice, setOptionChoice] = useState<string>('');
  const [addOnIds, setAddOnIds] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!item) return;
    setSpiceLevel(2);
    setOptionChoice(
      item.defaultCutOptions?.[0] ?? item.drinkTempOptions?.[0] ?? ''
    );
    setAddOnIds([]);
    setNote('');
    setQuantity(1);
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [item, onClose]);

  if (!item) return null;

  const activeSpiceLevel = item.isSpicyCustomizable ? spiceLevel : null;
  const unitPrice = calculateItemUnitPrice(
    item.price,
    activeSpiceLevel,
    item.isSpicyCustomizable ? addOnIds : []
  );
  const lineTotal = unitPrice * quantity;
  const selectedSpiceObj = SPICE_LEVELS.find((s) => s.level === spiceLevel);

  const toggleAddOn = (id: string) => {
    setAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const chosenAddOnNames = addOnIds
      .map((id) => CHICKEN_ADDONS.find((a) => a.id === id)?.name)
      .filter((name): name is string => Boolean(name));

    const spiceLabel =
      activeSpiceLevel !== null && selectedSpiceObj
        ? `Level ${selectedSpiceObj.level} · ${selectedSpiceObj.name}`
        : null;

    const finalAddOnIds = item.isSpicyCustomizable ? addOnIds : [];
    const cartItem: CartItem = {
      cartKey: buildCartKey(
        item.id,
        activeSpiceLevel,
        optionChoice,
        finalAddOnIds,
        note
      ),
      menuId: item.id,
      name: item.name,
      basePrice: item.price,
      unitPrice,
      quantity,
      spiceLevel: activeSpiceLevel,
      spiceLabel,
      optionChoice,
      addOnIds: finalAddOnIds,
      addOnNames: item.isSpicyCustomizable ? chosenAddOnNames : [],
      note: note.trim(),
    };

    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-zinc-900/50 p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="customize-modal-title"
    >
      <div className="bg-white w-full sm:max-w-lg sm:rounded-xl rounded-t-2xl border border-zinc-200 max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200">
          <div>
            <p className="text-xs text-zinc-500">{item.categoryLabel}</p>
            <h3
              id="customize-modal-title"
              className="font-display text-lg font-bold text-zinc-900"
            >
              {item.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup jendela kustomisasi"
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleConfirm} className="overflow-y-auto flex-1 p-5 space-y-6">
          <div className="flex gap-4 items-center">
            <div className="w-24 h-18 rounded-lg overflow-hidden shrink-0 border border-zinc-200">
              <DishIllustration dishId={item.id} alt={item.name} />
            </div>
            <div>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {item.description}
              </p>
              <p className="mt-1 font-mono text-sm font-semibold text-zinc-900 tabular-nums">
                Harga dasar {formatRupiah(item.price)}
              </p>
            </div>
          </div>

          {item.isSpicyCustomizable && (
            <fieldset>
              <legend className="text-sm font-semibold text-zinc-900 flex items-center gap-2 mb-2.5">
                <Flame className="w-4 h-4 text-[#DC2626]" aria-hidden="true" />
                <span>Pilih Level Kepedasan</span>
              </legend>
              <div className="grid grid-cols-1 gap-2">
                {SPICE_LEVELS.map((lvl) => {
                  const selected = spiceLevel === lvl.level;
                  return (
                    <button
                      key={lvl.level}
                      type="button"
                      onClick={() => setSpiceLevel(lvl.level)}
                      aria-pressed={selected}
                      className={`w-full text-left px-3.5 py-2.5 rounded-lg border transition-colors flex items-center justify-between gap-3 cursor-pointer ${
                        selected
                          ? 'border-[#DC2626] bg-red-50/70 text-zinc-900'
                          : 'border-zinc-200 bg-white hover:border-zinc-300 text-zinc-700'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-semibold flex items-center gap-2">
                          <span>Level {lvl.level}</span>
                          <span aria-hidden="true">·</span>
                          <span>{lvl.name}</span>
                        </div>
                        <p className="text-xs text-zinc-500">
                          {lvl.chiliCount} — {lvl.description}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        {lvl.priceDelta > 0 ? (
                          <span className="font-mono text-xs font-semibold text-[#DC2626] tabular-nums">
                            +{formatRupiah(lvl.priceDelta)}
                          </span>
                        ) : (
                          <span className="text-xs text-zinc-500">Gratis</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          {(item.defaultCutOptions || item.drinkTempOptions) && (
            <fieldset>
              <legend className="text-sm font-semibold text-zinc-900 mb-2">
                {item.defaultCutOptions ? 'Pilih Potongan Ayam' : 'Pilih Penyajian Minuman'}
              </legend>
              <div className="flex flex-wrap gap-2">
                {(item.defaultCutOptions ?? item.drinkTempOptions ?? []).map(
                  (opt) => {
                    const active = optionChoice === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setOptionChoice(opt)}
                        aria-pressed={active}
                        className={`px-3.5 py-2 text-sm font-medium rounded-lg border transition-colors cursor-pointer ${
                          active
                            ? 'border-zinc-900 bg-zinc-900 text-white'
                            : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  }
                )}
              </div>
            </fieldset>
          )}

          {item.isSpicyCustomizable && (
            <fieldset>
              <legend className="text-sm font-semibold text-zinc-900 mb-2">
                Tambahan Pendamping (Opsional)
              </legend>
              <div className="space-y-2">
                {CHICKEN_ADDONS.map((addon) => {
                  const checked = addOnIds.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg border cursor-pointer transition-colors ${
                        checked
                          ? 'border-zinc-900 bg-zinc-50'
                          : 'border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      <span className="flex items-center gap-2.5 text-sm text-zinc-800">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleAddOn(addon.id)}
                          className="w-4 h-4 accent-[#DC2626] rounded"
                        />
                        {addon.name}
                      </span>
                      <span className="font-mono text-xs font-medium text-zinc-700 tabular-nums">
                        +{formatRupiah(addon.price)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}

          <div>
            <label
              htmlFor="item-note-input"
              className="block text-sm font-semibold text-zinc-900 mb-1.5"
            >
              Catatan untuk Dapur (Opsional)
            </label>
            <input
              id="item-note-input"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Contoh: sambal dipisah, tanpa timun"
              className="w-full px-3.5 py-2.5 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-900"
            />
          </div>

          <div className="pt-2 border-t border-zinc-200 flex items-center justify-between gap-4">
            <div className="inline-flex items-center border border-zinc-200 rounded-lg">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Kurangi jumlah"
                className="w-11 h-11 inline-flex items-center justify-center text-zinc-700 hover:bg-zinc-100 rounded-l-lg cursor-pointer"
              >
                <Minus className="w-4 h-4" aria-hidden="true" />
              </button>
              <span
                className="w-10 text-center font-mono text-sm font-semibold tabular-nums"
                aria-label={`Jumlah ${quantity}`}
              >
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Tambah jumlah"
                className="w-11 h-11 inline-flex items-center justify-center text-zinc-700 hover:bg-zinc-100 rounded-r-lg cursor-pointer"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <button
              type="submit"
              className="flex-1 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold text-sm py-3 px-4 rounded-lg transition-colors cursor-pointer"
            >
              Tambah ke Keranjang ·{' '}
              <span className="font-mono tabular-nums">
                {formatRupiah(lineTotal)}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
