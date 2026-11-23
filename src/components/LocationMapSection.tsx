import React, { useState } from 'react';
import {
  Clock,
  ExternalLink,
  MapPin,
  MessageCircle,
  Minus,
  Navigation,
  Plus,
  RotateCcw,
} from 'lucide-react';
import { OUTLETS, type OutletLocation } from '../data/menuData';

interface LocationMapSectionProps {
  selectedOutletId: string;
  onSelectOutlet: (id: string) => void;
}

export const LocationMapSection: React.FC<LocationMapSectionProps> = ({
  selectedOutletId,
  onSelectOutlet,
}) => {
  const [zoom, setZoom] = useState(1);

  const activeOutlet: OutletLocation =
    OUTLETS.find((o) => o.id === selectedOutletId) ?? OUTLETS[0];

  const handleZoomIn = () => setZoom((z) => Math.min(1.5, Number((z + 0.15).toFixed(2))));
  const handleZoomOut = () => setZoom((z) => Math.max(0.85, Number((z - 0.15).toFixed(2))));
  const handleReset = () => setZoom(1);

  return (
    <section
      id="lokasi"
      aria-labelledby="lokasi-heading"
      className="py-16 border-t border-zinc-200 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-[#15803D]">
              Kabupaten Wonogiri, Jawa Tengah · Peta Outlet &amp; Penukaran Voucher
            </p>
            <h2
              id="lokasi-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 mt-1"
            >
              Lokasi Dapur Geprek Aja Wonogiri
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Pilih cabang outlet Wonogiri"
            className="flex flex-wrap gap-1.5 bg-zinc-100 p-1 rounded-lg"
          >
            {OUTLETS.map((outlet) => {
              const active = outlet.id === activeOutlet.id;
              return (
                <button
                  key={outlet.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onSelectOutlet(outlet.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-white text-zinc-900 shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {outlet.name.replace('Outlet ', '')}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Interactive Aesthetic Wonogiri Vector Map */}
          <div className="lg:col-span-7 relative rounded-xl border border-zinc-200 bg-[#F4F4F5] overflow-hidden min-h-[350px] flex flex-col justify-between">
            <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur border border-zinc-200 rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-700 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#DC2626]" aria-hidden="true" />
              <span>Kab. Wonogiri · Klik pin untuk pindah outlet</span>
            </div>

            <div className="absolute top-3 right-3 z-10 flex flex-col gap-1 bg-white/95 backdrop-blur border border-zinc-200 rounded-lg p-1">
              <button
                type="button"
                onClick={handleZoomIn}
                aria-label="Perbesar peta"
                className="w-8 h-8 inline-flex items-center justify-center rounded hover:bg-zinc-100 text-zinc-700 cursor-pointer"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                aria-label="Perkecil peta"
                className="w-8 h-8 inline-flex items-center justify-center rounded hover:bg-zinc-100 text-zinc-700 cursor-pointer"
              >
                <Minus className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleReset}
                aria-label="Reset zoom peta"
                className="w-8 h-8 inline-flex items-center justify-center rounded hover:bg-zinc-100 text-zinc-700 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>

            <div className="w-full h-full flex-1 flex items-center justify-center overflow-hidden">
              <svg
                viewBox="0 0 640 360"
                className="w-full h-full min-h-[350px] transition-transform duration-200 ease-out"
                style={{ transform: `scale(${zoom})` }}
                role="img"
                aria-label="Peta interaktif lokasi outlet Geprek Aja di Kabupaten Wonogiri"
              >
                <rect width="640" height="360" fill="#F1F0EC" />

                {/* Waduk Gajah Mungkur (southwest lake) */}
                <path
                  d="M40 220 C85 195, 165 210, 185 255 C205 300, 145 340, 75 332 C30 325, 10 250, 40 220 Z"
                  fill="#BAE6FD"
                />
                <text
                  x="105"
                  y="272"
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="600"
                  fill="#0369A1"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                >
                  Waduk Gajah Mungkur
                </text>

                {/* Green hill & Alun-Alun parks */}
                <path
                  d="M365 88 C395 80, 425 95, 418 122 C404 136, 368 132, 360 110 Z"
                  fill="#DCFCE7"
                />
                <path
                  d="M500 130 C540 120, 580 140, 570 176 C545 194, 502 180, 500 130 Z"
                  fill="#DCFCE7"
                />

                {/* Bengawan Solo upper stream */}
                <path
                  d="M150 230 Q245 195 305 150 T430 60"
                  fill="none"
                  stroke="#BAE6FD"
                  strokeWidth="8"
                  strokeLinecap="round"
                />

                {/* Secondary District Roads */}
                <g stroke="#E4E4E7" strokeWidth="2">
                  <line x1="90" y1="0" x2="90" y2="360" />
                  <line x1="210" y1="0" x2="210" y2="360" />
                  <line x1="330" y1="0" x2="330" y2="360" />
                  <line x1="450" y1="0" x2="450" y2="360" />
                  <line x1="0" y1="75" x2="640" y2="75" />
                  <line x1="0" y1="175" x2="640" y2="175" />
                  <line x1="0" y1="265" x2="640" y2="265" />
                </g>

                {/* Primary Wonogiri Highways */}
                <path
                  d="M110 0 L185 105 L300 165 L465 255 L560 360"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="10"
                />
                <path
                  d="M300 165 L640 140"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="8"
                />
                <path
                  d="M110 0 L185 105 L300 165 L465 255 L560 360"
                  fill="none"
                  stroke="#D4D4D8"
                  strokeWidth="1.5"
                />

                {/* Street & Landmark Labels */}
                <text x="64" y="62" fontSize="10" fill="#71717A" fontFamily="Plus Jakarta Sans, sans-serif">
                  Jl. Raya Solo–Wonogiri
                </text>
                <text x="235" y="196" fontSize="10" fill="#71717A" fontFamily="Plus Jakarta Sans, sans-serif">
                  Jl. Jend. Sudirman
                </text>
                <text x="488" y="286" fontSize="10" fill="#71717A" fontFamily="Plus Jakarta Sans, sans-serif">
                  Jl. Raya Baturetno
                </text>

                {/* Landmarks */}
                <g transform="translate(240, 118)">
                  <rect x="-42" y="-9" width="84" height="17" rx="4" fill="#FFFFFF" stroke="#D4D4D8" />
                  <text x="0" y="3" textAnchor="middle" fontSize="8.5" fill="#15803D" fontWeight="600">
                    Terminal Adipura
                  </text>
                </g>
                <g transform="translate(388, 108)">
                  <rect x="-42" y="-9" width="84" height="17" rx="4" fill="#FFFFFF" stroke="#D4D4D8" />
                  <text x="0" y="3" textAnchor="middle" fontSize="8.5" fill="#15803D" fontWeight="600">
                    Alun-Alun Kota
                  </text>
                </g>

                {/* Wonogiri Outlet Pins */}
                {OUTLETS.map((outlet) => {
                  const isActive = outlet.id === activeOutlet.id;
                  const { x, y } = outlet.mapCoords;
                  return (
                    <g
                      key={outlet.id}
                      transform={`translate(${x}, ${y})`}
                      onClick={() => onSelectOutlet(outlet.id)}
                      className="cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={`Pilih ${outlet.name}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onSelectOutlet(outlet.id);
                        }
                      }}
                    >
                      {isActive && (
                        <circle cx="0" cy="0" r="24" fill="#EA580C" opacity="0.18" />
                      )}
                      <circle
                        cx="0"
                        cy="0"
                        r={isActive ? 12 : 9}
                        fill={isActive ? '#DC2626' : '#18181B'}
                        stroke="#FFFFFF"
                        strokeWidth="2.5"
                      />
                      <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" />
                      <g transform="translate(0, -24)">
                        <rect
                          x="-66"
                          y="-14"
                          width="132"
                          height="22"
                          rx="6"
                          fill={isActive ? '#18181B' : '#FFFFFF'}
                          stroke={isActive ? '#18181B' : '#D4D4D8'}
                        />
                        <text
                          x="0"
                          y="1"
                          textAnchor="middle"
                          fontSize="9.5"
                          fontWeight="600"
                          fill={isActive ? '#FFFFFF' : '#18181B'}
                          fontFamily="Plus Jakarta Sans, sans-serif"
                        >
                          {outlet.name.replace('Outlet ', '')}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="px-4 py-2.5 bg-white border-t border-zinc-200 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-600">
              <span>Zoom: {Math.round(zoom * 100)}%</span>
              <span>Estimasi siap saji: ~{activeOutlet.prepMinutes} menit setelah pembayaran</span>
            </div>
          </div>

          {/* Outlet Details Card */}
          <div className="lg:col-span-5 bg-[#FAFAFA] border border-zinc-200 rounded-xl p-6 flex flex-col justify-between gap-5">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-[#EA580C]">
                  {activeOutlet.district} · Buka Setiap Hari
                </p>
                <h3 className="font-display text-xl font-bold text-zinc-900 mt-0.5">
                  {activeOutlet.name}
                </h3>
              </div>

              <p className="text-sm text-zinc-700 leading-relaxed">
                {activeOutlet.address}
              </p>

              <div className="space-y-2 text-sm text-zinc-700 pt-2 border-t border-zinc-200">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#EA580C] shrink-0" aria-hidden="true" />
                  <span>{activeOutlet.hours}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Navigation className="w-4 h-4 text-[#15803D] shrink-0" aria-hidden="true" />
                  <span>{activeOutlet.landmarks.join(' · ')}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-200">
                <p className="text-xs font-semibold text-zinc-500 mb-1.5">
                  Fasilitas Outlet
                </p>
                <p className="text-sm text-zinc-800">
                  {activeOutlet.amenities.join(' · ')}
                </p>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <a
                href={activeOutlet.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold py-3 px-4 rounded-lg inline-flex items-center justify-center gap-2 transition-colors"
              >
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>Buka Petunjuk Arah Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>

              <div className="grid grid-cols-3 gap-2">
                <a
                  href={activeOutlet.shopeeFoodUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-zinc-200 hover:border-[#EA580C] text-zinc-900 text-xs font-semibold py-2.5 px-2 rounded-lg text-center transition-colors"
                >
                  ShopeeFood
                </a>
                <a
                  href={activeOutlet.grabFoodUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-zinc-200 hover:border-[#15803D] text-zinc-900 text-xs font-semibold py-2.5 px-2 rounded-lg text-center transition-colors"
                >
                  GrabFood
                </a>
                <a
                  href={`https://wa.me/${activeOutlet.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-zinc-200 hover:border-[#15803D] text-zinc-900 text-xs font-semibold py-2.5 px-2 rounded-lg inline-flex items-center justify-center gap-1 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#15803D]" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
