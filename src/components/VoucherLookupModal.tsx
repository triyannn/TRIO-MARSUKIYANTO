import React, { useState } from 'react';
import { CheckCircle2, Printer, Search, Ticket, X } from 'lucide-react';
import { formatRupiah, type VoucherRecord } from '../utils/orderLogic';
import { BarcodeSvg } from './BarcodeSvg';

interface VoucherLookupModalProps {
  open: boolean;
  vouchers: VoucherRecord[];
  onClose: () => void;
}

export const VoucherLookupModal: React.FC<VoucherLookupModalProps> = ({
  open,
  vouchers,
  onClose,
}) => {
  const [query, setQuery] = useState('');

  if (!open) return null;

  const filtered = vouchers.filter((v) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      v.voucherCode.toLowerCase().includes(q) ||
      v.customerName.toLowerCase().includes(q)
    );
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="voucher-lookup-title"
    >
      <div className="bg-white w-full max-w-lg rounded-xl border border-zinc-200 max-h-[88vh] flex flex-col overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-200 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500">Riwayat &amp; Penukaran Kasir</p>
            <h2
              id="voucher-lookup-title"
              className="font-display text-lg font-bold text-zinc-900"
            >
              Voucher Barcode Saya
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup daftar voucher"
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4">
          <div className="relative">
            <Search
              className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari kode voucher (GPA-...) atau nama pemesan"
              aria-label="Cari kode voucher atau nama pemesan"
              className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-900"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="py-10 text-center space-y-2 border border-dashed border-zinc-200 rounded-xl">
              <Ticket className="w-6 h-6 text-zinc-400 mx-auto" aria-hidden="true" />
              <p className="text-sm font-medium text-zinc-800">
                Belum ada voucher tersimpan
              </p>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                Selesaikan pemesanan melalui keranjang dan pilih pembayaran digital untuk mendapatkan voucher barcode kasir.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((v) => (
                <article
                  key={v.voucherCode}
                  className="border border-zinc-200 rounded-xl p-4 bg-zinc-50/70 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold text-zinc-900">
                        {v.customerName}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {v.outletName} ·{' '}
                        <span className="font-mono tabular-nums">
                          {formatRupiah(v.total)}
                        </span>
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold ${
                        v.paymentStatus === 'LUNAS'
                          ? 'text-[#15803D]'
                          : 'text-amber-700'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                      {v.paymentStatus === 'LUNAS' ? 'LUNAS' : 'Bayar di Kasir'}
                    </span>
                  </div>

                  <BarcodeSvg value={v.voucherCode} height={52} />

                  <div className="flex items-center justify-between text-xs text-zinc-600 pt-1">
                    <span>
                      {v.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                    </span>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-1 font-semibold text-zinc-900 hover:underline cursor-pointer shrink-0 ml-2"
                    >
                      <Printer className="w-3.5 h-3.5" aria-hidden="true" />
                      Cetak
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
