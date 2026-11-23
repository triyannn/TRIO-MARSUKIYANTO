import React, { useState } from 'react';
import { CheckCircle2, Handshake, MessageCircle, Store } from 'lucide-react';
import { PLATFORM_LINKS } from '../data/menuData';

export const OpenMitraSection: React.FC = () => {
  const [applicantName, setApplicantName] = useState('');
  const [area, setArea] = useState('Wonogiri Kota');
  const [packageChoice, setPackageChoice] = useState('Paket Booth Usaha');

  const mitraMessage = [
    'Halo Tim Kemitraan Geprek Aja!',
    `Saya tertarik bergabung Open Mitra (${packageChoice}).`,
    applicantName.trim() ? `Nama: ${applicantName.trim()}` : '',
    `Rencana Lokasi: ${area}`,
    'Mohon info rincian investasi dan syarat kemitraannya. Terima kasih.',
  ]
    .filter(Boolean)
    .join('\n');

  const mitraWaUrl = `https://wa.me/${PLATFORM_LINKS.whatsappMain}?text=${encodeURIComponent(
    mitraMessage
  )}`;

  return (
    <section
      id="mitra"
      aria-labelledby="mitra-heading"
      className="py-16 border-t border-zinc-200 bg-[#FAFAFA]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold text-[#EA580C]">
                Kemitraan Usaha Kuliner · Wonogiri &amp; Jawa Tengah
              </p>
              <h2
                id="mitra-heading"
                className="font-display text-2xl sm:text-3xl font-bold text-zinc-900"
              >
                Open Mitra Geprek Aja
              </h2>
              <p className="text-sm text-zinc-600 leading-relaxed max-w-2xl">
                Buka gerai Geprek Aja di kota atau kecamatan Anda dengan dukungan penuh racikan tepung krispi, pasokan bumbu sambal standar, sistem voucher barcode kasir, serta pendampingan pendaftaran ShopeeFood &amp; GrabFood.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-zinc-200 rounded-lg p-4 bg-[#FAFAFA] space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-zinc-900">
                  <Store className="w-4 h-4 text-[#DC2626]" aria-hidden="true" />
                  <span>Paket Booth Usaha</span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Cocok untuk teras minimarket, area kampus, atau foodcourt dengan perlengkapan masak lengkap siap jualan.
                </p>
              </div>

              <div className="border border-zinc-200 rounded-lg p-4 bg-[#FAFAFA] space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-zinc-900">
                  <Handshake className="w-4 h-4 text-[#15803D]" aria-hidden="true" />
                  <span>Paket Outlet Ruko</span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Konsep dine-in lengkap dengan branding interior, menu olahan ayam lengkap, dan pelatihan kru dapur.
                </p>
              </div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-zinc-700 pt-2 border-t border-zinc-100">
              {[
                'Tanpa biaya royalti bulanan (100% laba mitra)',
                'Resep baku sambal ulek & marinasi tepung renyah',
                'Dukungan materi promosi & sistem order online',
                'Konsultasi langsung survei titik lokasi Wonogiri',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2
                    className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 flex flex-col justify-between gap-5">
            <div className="space-y-1">
              <p className="text-xs font-medium text-[#15803D]">
                Konsultasi Cepat via WhatsApp
              </p>
              <h3 className="font-display text-xl font-bold text-zinc-900">
                Ajukan Kemitraan Sekarang
              </h3>
              <p className="text-xs text-zinc-500">
                Terhubung langsung ke WhatsApp resmi mitra: <span className="font-mono font-semibold text-zinc-800">0838-2184-6574</span>
              </p>
            </div>

            <div className="space-y-3.5">
              <div>
                <label
                  htmlFor="mitra-name"
                  className="block text-xs font-semibold text-zinc-800 mb-1"
                >
                  Nama Calon Mitra
                </label>
                <input
                  id="mitra-name"
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="Contoh: Hendra Wijaya"
                  className="w-full px-3.5 py-2.5 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div>
                <label
                  htmlFor="mitra-area"
                  className="block text-xs font-semibold text-zinc-800 mb-1"
                >
                  Kecamatan / Kota Rencana Lokasi
                </label>
                <input
                  id="mitra-area"
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="Contoh: Pracimantoro / Jatisrono / Wonogiri"
                  className="w-full px-3.5 py-2.5 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div>
                <label
                  htmlFor="mitra-package"
                  className="block text-xs font-semibold text-zinc-800 mb-1"
                >
                  Pilihan Paket Kemitraan
                </label>
                <select
                  id="mitra-package"
                  value={packageChoice}
                  onChange={(e) => setPackageChoice(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-zinc-200 rounded-lg bg-white focus:outline-none focus:border-zinc-900"
                >
                  <option value="Paket Booth Usaha">Paket Booth Usaha</option>
                  <option value="Paket Outlet Ruko">Paket Outlet Ruko</option>
                </select>
              </div>
            </div>

            <a
              href={mitraWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#15803D] hover:bg-[#166534] text-white font-semibold text-sm py-3.5 px-4 rounded-lg inline-flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Hubungi Open Mitra (0838-2184-6574)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
