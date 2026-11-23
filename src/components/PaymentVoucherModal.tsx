import React, { useState } from 'react';
import {
  CheckCircle2,
  CreditCard,
  MessageCircle,
  Printer,
  QrCode,
  ShieldCheck,
  Store,
  Wallet,
  X,
} from 'lucide-react';
import { OUTLETS } from '../data/menuData';
import {
  buildWhatsAppOrderUrl,
  calculateCartTotals,
  formatRupiah,
  generateVoucherCode,
  type CartItem,
  type FulfillmentType,
  type PaymentMethod,
  type VoucherRecord,
} from '../utils/orderLogic';
import { BarcodeSvg } from './BarcodeSvg';

interface PaymentVoucherModalProps {
  open: boolean;
  items: CartItem[];
  fulfillment: FulfillmentType;
  selectedOutletId: string;
  onClose: () => void;
  onVoucherCreated: (voucher: VoucherRecord) => void;
}

export const PaymentVoucherModal: React.FC<PaymentVoucherModalProps> = ({
  open,
  items,
  fulfillment,
  selectedOutletId,
  onClose,
  onVoucherCreated,
}) => {
  const [step, setStep] = useState<'form' | 'gateway' | 'voucher'>('form');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [outletId, setOutletId] = useState(selectedOutletId);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qris');
  const [errorMsg, setErrorMsg] = useState('');
  const [createdVoucher, setCreatedVoucher] = useState<VoucherRecord | null>(
    null
  );

  if (!open) return null;

  const { subtotal, serviceFee, total } = calculateCartTotals(
    items,
    fulfillment
  );
  const activeOutlet =
    OUTLETS.find((o) => o.id === outletId) ?? OUTLETS[0];

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMsg('Mohon masukkan nama pemesan untuk label voucher.');
      return;
    }
    if (customerPhone.replace(/\D/g, '').length < 9) {
      setErrorMsg('Mohon masukkan nomor WhatsApp yang valid.');
      return;
    }
    if (fulfillment === 'delivery' && !deliveryAddress.trim()) {
      setErrorMsg('Mohon lengkapi alamat pengantaran.');
      return;
    }
    setErrorMsg('');

    if (paymentMethod === 'kasir') {
      finalizeVoucher('BAYAR_DI_KASIR');
    } else {
      setStep('gateway');
    }
  };

  const finalizeVoucher = (status: 'LUNAS' | 'BAYAR_DI_KASIR') => {
    const voucher: VoucherRecord = {
      voucherCode: generateVoucherCode(new Date()),
      createdAt: new Date().toISOString(),
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      deliveryAddress:
        fulfillment === 'delivery' ? deliveryAddress.trim() : undefined,
      outletId: activeOutlet.id,
      outletName: activeOutlet.name,
      fulfillment,
      paymentMethod,
      paymentStatus: status,
      items: [...items],
      subtotal,
      serviceFee,
      total,
      redeemed: false,
    };
    setCreatedVoucher(voucher);
    onVoucherCreated(voucher);
    setStep('voucher');
  };

  const resetAndClose = () => {
    setStep('form');
    setErrorMsg('');
    setCreatedVoucher(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/55 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-modal-title"
    >
      <div className="bg-white w-full max-w-lg rounded-xl border border-zinc-200 max-h-[92vh] flex flex-col overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-200 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500">
              Pembayaran Terintegrasi Geprek Aja
            </p>
            <h2
              id="payment-modal-title"
              className="font-display text-lg font-bold text-zinc-900"
            >
              {step === 'form' && 'Detail Pemesan & Metode Bayar'}
              {step === 'gateway' && 'Selesaikan Pembayaran Digital'}
              {step === 'voucher' && 'Voucher Barcode Kasir'}
            </h2>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Tutup jendela pembayaran"
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-5">
          {step === 'form' && (
            <form onSubmit={handleSubmitForm} className="space-y-4">
              {errorMsg && (
                <div
                  role="alert"
                  className="bg-red-50 border border-red-200 text-[#B91C1C] text-xs font-medium px-3.5 py-2.5 rounded-lg"
                >
                  {errorMsg}
                </div>
              )}

              <div>
                <label
                  htmlFor="checkout-name"
                  className="block text-sm font-semibold text-zinc-900 mb-1"
                >
                  Nama Pemesan
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full px-3.5 py-2.5 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div>
                <label
                  htmlFor="checkout-phone"
                  className="block text-sm font-semibold text-zinc-900 mb-1"
                >
                  Nomor WhatsApp Aktif
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="081234567890"
                  className="w-full px-3.5 py-2.5 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div>
                <label
                  htmlFor="checkout-outlet"
                  className="block text-sm font-semibold text-zinc-900 mb-1"
                >
                  Outlet Penukaran / Dapur
                </label>
                <select
                  id="checkout-outlet"
                  value={outletId}
                  onChange={(e) => setOutletId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-zinc-200 rounded-lg bg-white focus:outline-none focus:border-zinc-900"
                >
                  {OUTLETS.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.name} ({o.district})
                    </option>
                  ))}
                </select>
              </div>

              {fulfillment === 'delivery' && (
                <div>
                  <label
                    htmlFor="checkout-address"
                    className="block text-sm font-semibold text-zinc-900 mb-1"
                  >
                    Alamat Lengkap Pengantaran
                  </label>
                  <textarea
                    id="checkout-address"
                    rows={2}
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Jalan, nomor rumah, dan patokan terdekat"
                    className="w-full px-3.5 py-2.5 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-900"
                  />
                </div>
              )}

              <fieldset>
                <legend className="text-sm font-semibold text-zinc-900 mb-2">
                  Pilih Pembayaran Digital
                </legend>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    {
                      id: 'qris',
                      title: 'QRIS Instan (GoPay, OVO, DANA, ShopeePay, Bank)',
                      desc: 'Langsung terbit Voucher Barcode Lunas untuk kasir',
                      icon: QrCode,
                    },
                    {
                      id: 'ewallet',
                      title: 'E-Wallet Langsung (OVO / GoPay / DANA)',
                      desc: 'Konfirmasi cepat dengan voucher digital otomatis',
                      icon: Wallet,
                    },
                    {
                      id: 'va_bank',
                      title: 'Virtual Account (BCA / Mandiri / BRI / BNI)',
                      desc: 'Verifikasi otomatis dan terbit voucher barcode',
                      icon: CreditCard,
                    },
                    {
                      id: 'kasir',
                      title: 'Bayar Tunai di Kasir Outlet',
                      desc: 'Buat kode booking barcode lalu bayar saat ambil',
                      icon: Store,
                    },
                  ].map((m) => {
                    const Icon = m.icon;
                    const active = paymentMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as PaymentMethod)}
                        aria-pressed={active}
                        className={`w-full text-left px-3.5 py-3 rounded-lg border flex items-start gap-3 transition-colors cursor-pointer ${
                          active
                            ? 'border-[#DC2626] bg-red-50/60'
                            : 'border-zinc-200 hover:border-zinc-300'
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 mt-0.5 shrink-0 ${
                            active ? 'text-[#DC2626]' : 'text-zinc-500'
                          }`}
                          aria-hidden="true"
                        />
                        <div>
                          <div className="text-sm font-semibold text-zinc-900">
                            {m.title}
                          </div>
                          <div className="text-xs text-zinc-500">{m.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="pt-3 border-t border-zinc-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-500 block">
                    Total Tagihan
                  </span>
                  <span className="font-mono text-lg font-bold text-zinc-900 tabular-nums">
                    {formatRupiah(total)}
                  </span>
                </div>
                <button
                  type="submit"
                  className="bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold text-sm px-5 py-3 rounded-lg transition-colors cursor-pointer"
                >
                  {paymentMethod === 'kasir'
                    ? 'Buat Voucher Booking'
                    : 'Lanjut Bayar Digital'}
                </button>
              </div>
            </form>
          )}

          {step === 'gateway' && (
            <div className="space-y-5 text-center">
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 space-y-3">
                <p className="text-xs font-medium text-zinc-500">
                  {paymentMethod === 'qris' && 'Scan QRIS Nasional · Geprek Aja Kitchen'}
                  {paymentMethod === 'ewallet' && 'Pembayaran E-Wallet · Geprek Aja'}
                  {paymentMethod === 'va_bank' && 'Virtual Account BCA: 8801 0812 9000 4848'}
                </p>
                <div className="font-mono text-2xl font-bold text-zinc-900 tabular-nums">
                  {formatRupiah(total)}
                </div>

                {/* Deterministic high-contrast QR code pattern */}
                <div className="mx-auto w-44 h-44 bg-white border border-zinc-200 rounded-lg p-3 flex items-center justify-center">
                  <svg
                    viewBox="0 0 21 21"
                    className="w-full h-full"
                    shapeRendering="crispEdges"
                    role="img"
                    aria-label="Kode QRIS Pembayaran Digital Geprek Aja"
                  >
                    <rect width="21" height="21" fill="#FFFFFF" />
                    {/* Corner finder squares */}
                    <path
                      d="M0,0 h7 v7 h-7 z M1,1 v5 h5 v-5 z M2,2 h3 v3 h-3 z M14,0 h7 v7 h-7 z M15,1 v5 h5 v-5 z M16,2 h3 v3 h-3 z M0,14 h7 v7 h-7 z M1,15 v5 h5 v-5 z M2,16 h3 v3 h-3 z"
                      fill="#18181B"
                    />
                    {/* Timing & data modules */}
                    <path
                      d="M9,1 h2 v1 h-2 z M12,2 h1 v3 h-1 z M8,4 h3 v1 h-3 z M9,6 h4 v1 h-4 z M1,9 h1 v2 h-1 z M4,8 h2 v3 h-2 z M8,8 h5 v2 h-5 z M15,9 h3 v1 h-3 z M19,8 h2 v3 h-2 z M8,12 h2 v3 h-2 z M12,11 h2 v2 h-2 z M16,12 h4 v2 h-4 z M9,16 h2 v4 h-2 z M13,15 h3 v2 h-3 z M17,15 h2 v3 h-2 z M14,19 h5 v2 h-5 z"
                      fill="#18181B"
                    />
                  </svg>
                </div>

                <p className="text-xs text-zinc-600 max-w-sm mx-auto">
                  Setelah Anda menyelesaikan pembayaran di aplikasi e-wallet atau mobile banking, klik tombol konfirmasi di bawah untuk menerbitkan Voucher Barcode Kasir.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="sm:w-1/3 border border-zinc-200 hover:border-zinc-900 text-zinc-700 font-semibold text-sm py-3 px-4 rounded-lg cursor-pointer"
                >
                  Kembali
                </button>
                <button
                  type="button"
                  onClick={() => finalizeVoucher('LUNAS')}
                  className="sm:w-2/3 bg-[#15803D] hover:bg-[#166534] text-white font-semibold text-sm py-3 px-4 rounded-lg inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                  <span>Konfirmasi Pembayaran &amp; Terbitkan Voucher</span>
                </button>
              </div>
            </div>
          )}

          {step === 'voucher' && createdVoucher && (
            <div className="space-y-4">
              <div
                id="printable-voucher"
                className="border border-zinc-200 rounded-xl p-5 bg-zinc-50/70 space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-base font-bold text-zinc-900">
                      Geprek Aja · Voucher Penukaran Kasir
                    </p>
                    <p className="text-xs text-zinc-500">
                      {createdVoucher.outletName}
                    </p>
                  </div>
                  <div
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap shrink-0 ${
                      createdVoucher.paymentStatus === 'LUNAS'
                        ? 'text-[#15803D]'
                        : 'text-amber-700'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>
                      {createdVoucher.paymentStatus === 'LUNAS'
                        ? 'LUNAS · Siap Tukar'
                        : 'Bayar di Kasir'}
                    </span>
                  </div>
                </div>

                <BarcodeSvg value={createdVoucher.voucherCode} />

                <div className="grid grid-cols-2 gap-3 text-xs bg-white border border-zinc-200 rounded-lg p-3">
                  <div>
                    <span className="text-zinc-500 block">Pemesan</span>
                    <span className="font-semibold text-zinc-900">
                      {createdVoucher.customerName}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">No. WhatsApp</span>
                    <span className="font-mono font-semibold text-zinc-900 tabular-nums">
                      {createdVoucher.customerPhone}
                    </span>
                  </div>
                </div>

                <div className="bg-white border border-zinc-200 rounded-lg p-3 space-y-2">
                  <p className="text-xs font-semibold text-zinc-500">
                    Rincian Pesanan
                  </p>
                  <ul className="divide-y divide-zinc-100 text-xs">
                    {createdVoucher.items.map((item) => (
                      <li
                        key={item.cartKey}
                        className="py-1.5 flex items-start justify-between gap-2"
                      >
                        <div>
                          <span className="font-semibold text-zinc-900">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="block text-zinc-500">
                            {[item.spiceLabel, item.optionChoice, ...item.addOnNames]
                              .filter(Boolean)
                              .join(' · ')}
                          </span>
                        </div>
                        <span className="font-mono font-semibold text-zinc-900 tabular-nums">
                          {formatRupiah(item.unitPrice * item.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2 border-t border-zinc-200 flex justify-between text-sm font-bold text-zinc-900">
                    <span>Total Dibayar</span>
                    <span className="font-mono tabular-nums">
                      {formatRupiah(createdVoucher.total)}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-zinc-500 text-center">
                  Tunjukkan barcode ini kepada kasir {createdVoucher.outletName} untuk verifikasi dan pengambilan pesanan.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="border border-zinc-200 hover:border-zinc-900 bg-white text-zinc-900 font-semibold text-sm py-2.5 px-4 rounded-lg inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" aria-hidden="true" />
                  <span>Cetak / Simpan PDF</span>
                </button>
                <a
                  href={buildWhatsAppOrderUrl({
                    phone: activeOutlet.whatsapp,
                    items: createdVoucher.items,
                    total: createdVoucher.total,
                    customerName: createdVoucher.customerName,
                    outletName: createdVoucher.outletName,
                    voucherCode: createdVoucher.voucherCode,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#15803D] hover:bg-[#166534] text-white font-semibold text-sm py-2.5 px-4 rounded-lg inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Kirim Voucher ke WA</span>
                </a>
              </div>

              <button
                type="button"
                onClick={resetAndClose}
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm py-2.5 px-4 rounded-lg cursor-pointer"
              >
                Selesai &amp; Kembali ke Menu
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
