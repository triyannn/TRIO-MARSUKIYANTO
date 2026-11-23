import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DishIllustration } from './DishIllustration';

export const BrandMascotHero: React.FC = () => {
  const [greetingIndex, setGreetingIndex] = useState(0);

  const greetings = [
    'Hallo! Ada ayam geprek renyah & sambal ulek segar hari ini!',
    'Pilih level pedas 0–4 sesuai seleramu, siap tukar barcode di kasir!',
    'Tersedia juga Ayam Karage, Dimsum Ayam & Paket Hemat Wonogiri!',
  ];

  const handleMascotClick = () => {
    setGreetingIndex((prev) => (prev + 1) % greetings.length);
  };

  return (
    <div className="relative w-full h-full min-h-[320px] rounded-2xl overflow-hidden border border-zinc-200 bg-gradient-to-br from-[#F0FDF4] via-[#FFFBEB] to-[#FEF2F2] flex flex-col justify-between p-5 sm:p-6">
      {/* Top tri-color subtle editorial frame + Dish preview */}
      <div className="grid grid-cols-12 gap-4 items-center flex-1">
        <div className="col-span-12 sm:col-span-7 flex flex-col items-center justify-center text-center">
          <button
            type="button"
            onClick={handleMascotClick}
            aria-label="Sapa ayam maskot Geprek Aja untuk melihat pesan sapaan"
            className="animate-mascot-float transition-transform duration-150 hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EA580C] rounded-xl"
          >
            <img
              src="/assets/aistudio/Logo_Ayam_Ceria_Geprek_Aja_1cb8013f.png"
              alt="Maskot Ayam Ceria Geprek Aja menyapa pelanggan"
              decoding="async"
              className="w-56 sm:w-64 h-auto drop-shadow-sm mx-auto select-none"
            />
          </button>
        </div>

        <div className="col-span-12 sm:col-span-5 flex flex-col gap-3">
          <motion.div
            key={greetingIndex}
            initial={{ opacity: 0.4, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white border border-zinc-200 rounded-xl p-3.5 text-left"
          >
            <p className="text-xs font-bold text-[#15803D]">
              Hallo, Sobat Geprek!
            </p>
            <p className="text-xs text-zinc-700 leading-relaxed mt-1">
              {greetings[greetingIndex]}
            </p>
            <button
              type="button"
              onClick={handleMascotClick}
              className="mt-2 text-xs font-semibold text-[#EA580C] hover:underline cursor-pointer"
            >
              Sapa Ayam Lagi &rarr;
            </button>
          </motion.div>

          <div className="aspect-[4/3] w-full rounded-xl overflow-hidden border border-zinc-200 bg-white">
            <DishIllustration
              dishId="hero"
              alt="Sajian Ayam Geprek Aja dengan nasi hangat, sambal ulek merah, dan es teh manis"
            />
          </div>
        </div>
      </div>

      {/* Bottom Official Bar */}
      <div className="mt-4 pt-3 border-t border-zinc-200/80 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-700">
        <span className="font-semibold text-[#15803D]">
          100% Halal &amp; Ayam Segar Harian
        </span>
        <span className="text-zinc-500">
          Dapur Resmi Wonogiri · Level 0–4
        </span>
      </div>
    </div>
  );
};
