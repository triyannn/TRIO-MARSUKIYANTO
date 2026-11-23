import React from 'react';
import { motion } from 'motion/react';
import {
  Award,
  ChefHat,
  Flame,
  Leaf,
  QrCode,
  ShieldCheck,
  Store,
  Utensils,
} from 'lucide-react';

export const OfficialProfileSection: React.FC = () => {
  const pillars = [
    {
      icon: ChefHat,
      color: 'text-[#EA580C]',
      borderHover: 'hover:border-[#EA580C]',
      title: 'Ayam Segar Marinasi 12 Jam',
      desc: 'Setiap potongan dada, paha atas, dan paha bawah berasal dari pasokan ayam segar harian yang dimarinasi bumbu rempah khas Nusantara agar gurih sampai ke tulang.',
    },
    {
      icon: Flame,
      color: 'text-[#DC2626]',
      borderHover: 'hover:border-[#DC2626]',
      title: 'Sambal Ulek Dadakan Level 0–4',
      desc: 'Cabai rawit merah, cabai lombok ijo, dan bawang pilihan selalu diulek segar per pesanan tanpa bahan pengawet maupun pewarna buatan.',
    },
    {
      icon: Leaf,
      color: 'text-[#15803D]',
      borderHover: 'hover:border-[#15803D]',
      title: '3 Cabang Resmi Wonogiri',
      desc: 'Melayani makan di tempat, ambil cepat, serta antar langsung dari Outlet Wonogiri Kota, Selogiri, dan Baturetno setiap hari pukul 10:00 – 22:00 WIB.',
    },
  ];

  const steps = [
    {
      num: '01',
      accent: 'text-[#15803D]',
      title: 'Pilih Menu & Level Pedas',
      desc: 'Tentukan varian geprek, paket hemat, olahan karage/dimsum, serta level kepedasan 0–4.',
      icon: Utensils,
    },
    {
      num: '02',
      accent: 'text-[#EA580C]',
      title: 'Bayar Digital atau Tunai',
      desc: 'Selesaikan transaksi via QRIS Instan, E-Wallet (GoPay/OVO/DANA), Virtual Account, atau di kasir.',
      icon: ShieldCheck,
    },
    {
      num: '03',
      accent: 'text-[#DC2626]',
      title: 'Terbit Voucher Barcode',
      desc: 'Sistem otomatis menerbitkan kode voucher dan barcode Code-39 berstatus Lunas.',
      icon: QrCode,
    },
    {
      num: '04',
      accent: 'text-[#15803D]',
      title: 'Tukar Cepat di Kasir',
      desc: 'Tunjukkan barcode di kasir outlet Wonogiri untuk pengambilan pesanan hangat tanpa antre.',
      icon: Store,
    },
  ];

  return (
    <section
      id="profil"
      aria-labelledby="profil-heading"
      className="py-14 sm:py-16 border-b border-zinc-200 bg-[#FAFAFA]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Top Story & Official Standards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <p className="text-xs font-semibold text-[#15803D]">
              Profil Resmi Brand · Dapur Asli Kabupaten Wonogiri
            </p>
            <h2
              id="profil-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-zinc-900"
            >
              Tentang Geprek Aja
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              <strong>Geprek Aja</strong> adalah gerai kuliner spesialis ayam geprek krispi dan olahan ayam modern yang lahir di Kabupaten Wonogiri, Jawa Tengah. Kami memadukan renyahnya ayam goreng tepung berbumbu rahasia dengan sensasi pedas sambal ulek tradisional yang bisa diatur sendiri oleh pelanggan mulai dari Level 0 hingga Level 4.
            </p>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Mulai dari sajian andalan <em>Ayam Geprek Mozza</em>, <em>Lombok Ijo</em>, <em>Pedas Nagih</em>, hingga camilan pelengkap seperti <em>Ayam Karage</em>, <em>Dimsum Ayam</em>, dan <em>Ayam Keju</em>, seluruh menu disiapkan higienis untuk makan harian, acara keluarga, hingga pesanan nasi kotak rombongan kantor dan sekolah.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-zinc-800">
              <span className="inline-flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#15803D]" aria-hidden="true" />
                <span>Bahan Baku Halal &amp; Higienis</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#DC2626]" aria-hidden="true" />
                <span>Cabai Ulek Segar Setiap Hari</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-[#EA580C]" aria-hidden="true" />
                <span>Sistem Voucher Barcode Kasir</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 gap-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className={`bg-white border border-zinc-200 ${pillar.borderHover} rounded-xl p-5 flex items-start gap-4 transition-colors`}
                >
                  <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200 shrink-0">
                    <Icon className={`w-5 h-5 ${pillar.color}`} aria-hidden="true" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display text-base font-bold text-zinc-900">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Official 4-Step Ordering & Barcode Explanation */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-[#EA580C]">
                Panduan Resmi Pemesanan Online
              </p>
              <h3 className="font-display text-xl font-bold text-zinc-900 mt-0.5">
                Cara Pesan &amp; Tukar Voucher Barcode
              </h3>
            </div>
            <p className="text-xs text-zinc-500">
              Estimasi penyajian 10–12 menit · Berlaku di seluruh cabang Wonogiri
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="bg-[#FAFAFA] border border-zinc-200 rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-sm font-bold ${step.accent}`}>
                      {step.num}
                    </span>
                    <Icon className="w-4 h-4 text-zinc-500" aria-hidden="true" />
                  </div>
                  <h4 className="font-display text-sm font-bold text-zinc-900">
                    {step.title}
                  </h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
