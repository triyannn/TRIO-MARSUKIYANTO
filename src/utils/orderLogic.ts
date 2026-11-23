import { CHICKEN_ADDONS, SPICE_LEVELS } from '../data/menuData';

export type FulfillmentType = 'pickup' | 'dine_in' | 'delivery';

export type PaymentMethod = 'qris' | 'ewallet' | 'va_bank' | 'kasir';

export interface CartItem {
  cartKey: string;
  menuId: string;
  name: string;
  basePrice: number;
  unitPrice: number;
  quantity: number;
  spiceLevel: 0 | 1 | 2 | 3 | 4 | null;
  spiceLabel: string | null;
  optionChoice: string;
  addOnIds: string[];
  addOnNames: string[];
  note: string;
}

export interface VoucherRecord {
  voucherCode: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress?: string;
  outletId: string;
  outletName: string;
  fulfillment: FulfillmentType;
  paymentMethod: PaymentMethod;
  paymentStatus: 'LUNAS' | 'BAYAR_DI_KASIR';
  items: CartItem[];
  subtotal: number;
  serviceFee: number;
  total: number;
  redeemed: boolean;
}

export function formatRupiah(amount: number): string {
  const rounded = Math.round(amount);
  const formatted = Math.abs(rounded)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return rounded < 0 ? `-Rp ${formatted}` : `Rp ${formatted}`;
}

export function calculateItemUnitPrice(
  basePrice: number,
  spiceLevel: 0 | 1 | 2 | 3 | 4 | null,
  addOnIds: string[]
): number {
  const spiceObj =
    spiceLevel !== null
      ? SPICE_LEVELS.find((s) => s.level === spiceLevel)
      : undefined;
  const spiceDelta = spiceObj ? spiceObj.priceDelta : 0;

  const addOnTotal = addOnIds.reduce((sum, id) => {
    const found = CHICKEN_ADDONS.find((a) => a.id === id);
    return sum + (found ? found.price : 0);
  }, 0);

  return basePrice + spiceDelta + addOnTotal;
}

export function calculateCartTotals(
  items: CartItem[],
  fulfillment: FulfillmentType
): {
  subtotal: number;
  serviceFee: number;
  total: number;
  itemCount: number;
} {
  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const serviceFee =
    items.length === 0 ? 0 : fulfillment === 'delivery' ? 8000 : 0;
  return {
    subtotal,
    serviceFee,
    total: subtotal + serviceFee,
    itemCount,
  };
}

export function buildCartKey(
  menuId: string,
  spiceLevel: number | null,
  optionChoice: string,
  addOnIds: string[],
  note: string
): string {
  const sortedAddOns = [...addOnIds].sort().join(',');
  return `${menuId}|s:${spiceLevel ?? 'none'}|o:${optionChoice}|a:${sortedAddOns}|n:${note.trim()}`;
}

export function generateVoucherCode(
  date: Date = new Date(),
  randomSuffix?: number
): string {
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const suffix =
    randomSuffix !== undefined
      ? Math.floor(randomSuffix % 10000)
          .toString()
          .padStart(4, '0')
      : Math.floor(1000 + Math.random() * 9000).toString();
  return `GPA-${yy}${mm}${dd}-${suffix}`;
}

// Standard Code 39 character patterns: 9 elements (5 bars, 4 spaces), 'w' = wide (3x), 'n' = narrow (1x)
const CODE39_MAP: Record<string, string> = {
  '0': 'nnnwwnwnn',
  '1': 'wnnwnnnnw',
  '2': 'nnwwnnnnw',
  '3': 'wnwwnnnnn',
  '4': 'nnnwwnnnw',
  '5': 'wnnwwnnnn',
  '6': 'nnwwwnnnn',
  '7': 'nnnwnnwnw',
  '8': 'wnnwnnwnn',
  '9': 'nnwwnnwnn',
  A: 'wnnnnwnnw',
  B: 'nnwnnwnnw',
  C: 'wnwnnwnnn',
  D: 'nnnnwwnnw',
  E: 'wnnnwwnnn',
  F: 'nnwnwwnnn',
  G: 'nnnnnwwnw',
  H: 'wnnnnwwnn',
  I: 'nnwnnwwnn',
  J: 'nnnnwwwnn',
  K: 'wnnnnnnww',
  L: 'nnwnnnnww',
  M: 'wnwnnnnwn',
  N: 'nnnnwnnww',
  O: 'wnnnwnnwn',
  P: 'nnwnwnnwn',
  Q: 'nnnnnnwww',
  R: 'wnnnnnwwn',
  S: 'nnwnnnwwn',
  T: 'nnnnwnwwn',
  U: 'wwnnnnnnw',
  V: 'nwwnnnnnw',
  W: 'wwwnnnnnn',
  X: 'nwnnwnnnw',
  Y: 'wwnnwnnnn',
  Z: 'nwwnwnnnn',
  '-': 'nwnnnnwnw',
  '.': 'wwnnnnwnn',
  ' ': 'nwwnnnwnn',
  '*': 'nwnnwnwnn',
};

export function encodeCode39Barcode(
  rawText: string,
  narrowWidth = 2,
  wideWidth = 5
): { bars: Array<{ x: number; width: number }>; totalWidth: number } {
  const sanitized = rawText
    .toUpperCase()
    .replace(/[^0-9A-Z\-.\s]/g, '');
  const fullText = `*${sanitized || 'GPA'}*`;
  const bars: Array<{ x: number; width: number }> = [];
  let cursor = 0;

  for (let i = 0; i < fullText.length; i++) {
    const pattern = CODE39_MAP[fullText[i]] ?? CODE39_MAP['-'];
    for (let j = 0; j < pattern.length; j++) {
      const w = pattern[j] === 'w' ? wideWidth : narrowWidth;
      if (j % 2 === 0) {
        bars.push({ x: cursor, width: w });
      }
      cursor += w;
    }
    if (i < fullText.length - 1) {
      cursor += narrowWidth; // inter-character gap
    }
  }

  return { bars, totalWidth: cursor };
}

export function buildWhatsAppOrderUrl(params: {
  phone: string;
  items: CartItem[];
  total: number;
  customerName?: string;
  outletName?: string;
  voucherCode?: string;
}): string {
  const { phone, items, total, customerName, outletName, voucherCode } = params;
  const cleanPhone = phone.replace(/\D/g, '');
  const lines: string[] = ['Halo Geprek Aja! Saya ingin memesan:'];

  if (voucherCode) {
    lines.push(`Kode Voucher: *${voucherCode}*`);
  }
  if (customerName) {
    lines.push(`Nama: ${customerName}`);
  }
  if (outletName) {
    lines.push(`Outlet: ${outletName}`);
  }

  lines.push('');
  items.forEach((item, idx) => {
    const spicePart = item.spiceLabel ? ` (${item.spiceLabel})` : '';
    const optionPart = item.optionChoice ? ` - ${item.optionChoice}` : '';
    const addonsPart =
      item.addOnNames.length > 0 ? ` + ${item.addOnNames.join(', ')}` : '';
    lines.push(
      `${idx + 1}. ${item.quantity}x ${item.name}${spicePart}${optionPart}${addonsPart} — ${formatRupiah(item.unitPrice * item.quantity)}`
    );
  });

  lines.push('');
  lines.push(`Total: *${formatRupiah(total)}*`);
  const encoded = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}
