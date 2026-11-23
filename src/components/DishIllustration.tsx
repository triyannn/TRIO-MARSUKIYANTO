import React from 'react';

interface DishIllustrationProps {
  dishId: string;
  alt: string;
  className?: string;
}

export const DishIllustration: React.FC<DishIllustrationProps> = ({
  dishId,
  alt,
  className = '',
}) => {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative w-full h-full overflow-hidden bg-[#F4F4F5] select-none ${className}`}
    >
      {dishId === 'hero' && <HeroFeastArt />}
      {dishId === 'geprek-mozza' && <GeprekMozzaArt />}
      {dishId === 'geprek-lombok-ijo' && <GeprekLombokIjoArt />}
      {dishId === 'geprek-pedas-nagih' && <GeprekPedasNagihArt />}
      {dishId === 'geprek-sambal-matah' && <GeprekMatahArt />}
      {dishId === 'geprek-ayam-keju' && <GeprekKejuArt />}
      {dishId === 'paket-duo' && <PaketDuoArt />}
      {dishId === 'paket-hemat' && <PaketHematArt />}
      {dishId === 'ayam-karage' && <AyamKarageArt />}
      {dishId === 'dimsum-ayam' && <DimsumAyamArt />}
      {dishId === 'ayam-keju-bites' && <AyamKejuBitesArt />}
      {dishId === 'kulit-tahu-krispi' && <KulitTahuArt />}
      {dishId === 'es-teh-manis' && <EsTehManisArt />}
      {dishId === 'air-mineral' && <AirMineralArt />}
    </div>
  );
};

function PlateBase({ cx = 200, cy = 152, r = 112 }: { cx?: number; cy?: number; r?: number }) {
  return (
    <g>
      <ellipse cx={cx + 6} cy={cy + 12} rx={r + 4} ry={r * 0.72} fill="#E4E4E7" />
      <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.7} fill="#FFFFFF" stroke="#D4D4D8" strokeWidth="2.5" />
      <ellipse cx={cx} cy={cy} rx={r * 0.8} ry={r * 0.54} fill="#FAFAFA" stroke="#E4E4E7" strokeWidth="1.2" />
    </g>
  );
}

function CrispyChickenBase({ x = 135, y = 112 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <path
        d="M15 36 C8 18, 28 2, 58 6 C84 2, 118 14, 126 38 C134 58, 118 82, 86 84 C58 88, 22 76, 15 36 Z"
        fill="#B45309"
      />
      <path
        d="M18 33 C14 16, 34 4, 60 8 C84 4, 114 16, 121 36 C128 54, 112 75, 84 78 C58 80, 24 68, 18 33 Z"
        fill="#D97706"
      />
      <path
        d="M28 28 C34 16, 56 12, 74 16 C92 14, 108 24, 110 38 C108 54, 92 66, 70 66 C48 66, 26 52, 28 28 Z"
        fill="#F59E0B"
        opacity="0.7"
      />
      <circle cx="42" cy="24" r="4" fill="#FDE68A" opacity="0.7" />
      <circle cx="86" cy="22" r="5" fill="#92400E" opacity="0.45" />
      <circle cx="62" cy="54" r="4.5" fill="#FDE68A" opacity="0.65" />
      <circle cx="102" cy="48" r="3.5" fill="#92400E" opacity="0.4" />
    </g>
  );
}

function CucumberGarnish({ x = 98, y = 165 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <ellipse cx="22" cy="18" rx="20" ry="13" fill="#16A34A" />
      <ellipse cx="22" cy="18" rx="15" ry="9.5" fill="#BBF7D0" />
      <ellipse cx="44" cy="24" rx="19" ry="12" fill="#15803D" />
      <ellipse cx="44" cy="24" rx="14" ry="8.5" fill="#DCFCE7" />
    </g>
  );
}

function HeroFeastArt() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#EFECE6" />
      <path d="M0 210 L400 185 L400 300 L0 300 Z" fill="#E6E1D8" />
      <g transform="translate(292, 32)">
        <ellipse cx="34" cy="116" rx="28" ry="8" fill="#D4CEC3" />
        <path d="M12 16 L56 16 L50 112 C49 116, 19 116, 18 112 Z" fill="#FFFFFF" fillOpacity="0.65" stroke="#D4D4D8" strokeWidth="1.5" />
        <path d="M15 36 L53 36 L49 109 C48 112, 20 112, 19 109 Z" fill="#B45309" opacity="0.88" />
        <rect x="20" y="42" width="12" height="12" rx="2" fill="#FEF3C7" opacity="0.55" transform="rotate(12 26 48)" />
        <rect x="34" y="54" width="11" height="11" rx="2" fill="#FEF3C7" opacity="0.5" transform="rotate(-8 39 59)" />
        <line x1="40" y1="2" x2="32" y2="92" stroke="#EA580C" strokeWidth="3.5" strokeLinecap="round" />
      </g>
      <PlateBase cx={180} cy={166} r={126} />
      <g transform="translate(88, 128)">
        <ellipse cx="44" cy="40" rx="40" ry="30" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1.5" />
        <ellipse cx="42" cy="34" rx="34" ry="24" fill="#F8FAFC" />
        <circle cx="34" cy="28" r="2.2" fill="#E2E8F0" />
        <circle cx="52" cy="32" r="2.2" fill="#E2E8F0" />
      </g>
      <CucumberGarnish x={115} y={182} />
      <CrispyChickenBase x={152} y={118} />
      <g transform="translate(178, 134)">
        <path d="M8 18 C4 6, 24 0, 46 6 C68 4, 82 18, 72 34 C60 44, 18 42, 8 18 Z" fill="#B91C1C" />
        <path d="M14 16 C18 8, 42 6, 58 14 C68 22, 56 34, 34 34 C18 34, 10 24, 14 16 Z" fill="#DC2626" />
        <circle cx="32" cy="18" r="2.5" fill="#FDE047" />
        <circle cx="46" cy="24" r="2" fill="#FDE047" />
        <circle cx="54" cy="16" r="2.2" fill="#FCA5A5" />
      </g>
      <g transform="translate(24, 24)" opacity="0.9">
        <ellipse cx="42" cy="38" rx="36" ry="18" fill="#44403C" />
        <ellipse cx="42" cy="34" rx="30" ry="13" fill="#292524" />
        <ellipse cx="42" cy="34" rx="20" ry="8" fill="#EA580C" opacity="0.88" />
      </g>
    </svg>
  );
}

function GeprekMozzaArt() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#F4F4F5" />
      <PlateBase cx={200} cy={156} r={116} />
      <CucumberGarnish x={108} y={175} />
      <CrispyChickenBase x={135} y={110} />
      <ellipse cx="204" cy="148" rx="44" ry="22" fill="#DC2626" />
      <path
        d="M150 144 C156 122, 190 116, 224 122 C252 126, 268 144, 256 164 C244 182, 224 176, 212 184 C198 192, 186 172, 168 176 C154 178, 146 158, 150 144 Z"
        fill="#FEF9C3"
        stroke="#FDE047"
        strokeWidth="2"
      />
      <ellipse cx="188" cy="140" rx="12" ry="6" fill="#D97706" opacity="0.55" />
      <ellipse cx="228" cy="148" rx="14" ry="7" fill="#B45309" opacity="0.5" />
      <circle cx="176" cy="152" r="2.4" fill="#DC2626" />
      <circle cx="215" cy="136" r="2.2" fill="#DC2626" />
      <circle cx="238" cy="160" r="2" fill="#15803D" />
    </svg>
  );
}

function GeprekLombokIjoArt() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#F4F4F5" />
      <PlateBase cx={200} cy={156} r={116} />
      <CucumberGarnish x={108} y={175} />
      <CrispyChickenBase x={135} y={110} />
      <path d="M156 144 C162 124, 198 120, 228 128 C252 134, 256 158, 238 170 C214 182, 166 176, 156 144 Z" fill="#15803D" />
      <path d="M168 142 C176 130, 208 128, 226 136 C240 144, 236 160, 214 164 C190 168, 164 156, 168 142 Z" fill="#22C55E" opacity="0.7" />
      <ellipse cx="186" cy="142" rx="7" ry="4" fill="#166534" transform="rotate(-15 186 142)" />
      <ellipse cx="216" cy="152" rx="8" ry="4.5" fill="#14532D" transform="rotate(20 216 152)" />
      <ellipse cx="200" cy="134" rx="11" ry="5" fill="#4ADE80" opacity="0.85" transform="rotate(-28 200 134)" />
    </svg>
  );
}

function GeprekPedasNagihArt() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#F4F4F5" />
      <PlateBase cx={200} cy={156} r={116} />
      <CucumberGarnish x={108} y={175} />
      <CrispyChickenBase x={135} y={110} />
      <path d="M150 144 C156 120, 200 116, 234 126 C260 134, 260 164, 236 174 C208 186, 158 178, 150 144 Z" fill="#991B1B" />
      <path d="M162 142 C170 126, 204 124, 228 134 C244 142, 238 162, 214 166 C188 170, 158 158, 162 142 Z" fill="#DC2626" />
      <circle cx="182" cy="144" r="2.5" fill="#FDE047" />
      <circle cx="204" cy="136" r="2.2" fill="#FDE047" />
      <circle cx="222" cy="150" r="2.5" fill="#FDE047" />
      <ellipse cx="212" cy="144" rx="6" ry="2.5" fill="#78350F" transform="rotate(24 212 144)" />
    </svg>
  );
}

function GeprekMatahArt() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#F4F4F5" />
      <PlateBase cx={200} cy={156} r={116} />
      <CucumberGarnish x={108} y={175} />
      <CrispyChickenBase x={135} y={110} />
      {/* Sliced shallots, red chilies, lemongrass rings, lime */}
      <g transform="translate(155, 126)">
        <ellipse cx="48" cy="24" rx="40" ry="20" fill="#FB923C" opacity="0.25" />
        <circle cx="30" cy="22" r="7" fill="#F43F5E" opacity="0.7" />
        <circle cx="30" cy="22" r="4" fill="#FECDD3" />
        <circle cx="52" cy="18" r="7.5" fill="#E11D48" opacity="0.7" />
        <circle cx="52" cy="18" r="4" fill="#FFE4E6" />
        <circle cx="68" cy="28" r="6" fill="#F43F5E" opacity="0.7" />
        <ellipse cx="42" cy="30" rx="6" ry="3" fill="#4ADE80" transform="rotate(15 42 30)" />
        <circle cx="22" cy="30" r="3" fill="#DC2626" />
        <circle cx="60" cy="34" r="3" fill="#DC2626" />
        <circle cx="44" cy="14" r="2.8" fill="#15803D" />
      </g>
    </svg>
  );
}

function GeprekKejuArt() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#F4F4F5" />
      <PlateBase cx={200} cy={156} r={116} />
      <CucumberGarnish x={108} y={175} />
      <CrispyChickenBase x={135} y={110} />
      <ellipse cx="204" cy="150" rx="40" ry="20" fill="#DC2626" />
      {/* Rich orange cheddar cheese sauce drizzle */}
      <path
        d="M148 142 C164 126, 200 122, 236 130 C258 136, 256 156, 240 162 C226 168, 214 156, 202 172 C192 184, 178 164, 162 170 C150 174, 142 152, 148 142 Z"
        fill="#F97316"
        opacity="0.92"
      />
      <path
        d="M158 140 C174 130, 206 128, 230 136 C242 140, 236 152, 216 154 C194 156, 166 152, 158 140 Z"
        fill="#FBBF24"
        opacity="0.8"
      />
      <circle cx="185" cy="144" r="2" fill="#DC2626" />
      <circle cx="215" cy="142" r="2" fill="#15803D" />
    </svg>
  );
}

function PaketDuoArt() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#F4F4F5" />
      <g transform="translate(-46, 30) scale(0.76)">
        <PlateBase cx={180} cy={175} r={104} />
        <CrispyChickenBase x={125} y={130} />
        <ellipse cx="188" cy="166" rx="34" ry="18" fill="#DC2626" />
      </g>
      <g transform="translate(110, 38) scale(0.76)">
        <PlateBase cx={180} cy={175} r={104} />
        <CrispyChickenBase x={125} y={130} />
        <ellipse cx="188" cy="166" rx="34" ry="18" fill="#15803D" />
      </g>
      <g transform="translate(115, 18) scale(0.62)">
        <path d="M12 16 L56 16 L50 112 L18 112 Z" fill="#B45309" opacity="0.9" stroke="#D4D4D8" strokeWidth="2" />
        <rect x="22" y="34" width="12" height="12" rx="2" fill="#FEF3C7" opacity="0.6" />
      </g>
      <g transform="translate(238, 18) scale(0.62)">
        <path d="M12 16 L56 16 L50 112 L18 112 Z" fill="#B45309" opacity="0.9" stroke="#D4D4D8" strokeWidth="2" />
        <rect x="24" y="36" width="12" height="12" rx="2" fill="#FEF3C7" opacity="0.6" />
      </g>
    </svg>
  );
}

function PaketHematArt() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#F4F4F5" />
      <g transform="translate(274, 34) scale(0.85)">
        <ellipse cx="34" cy="116" rx="26" ry="7" fill="#D4D4D8" />
        <path d="M12 16 L56 16 L50 112 C49 116, 19 116, 18 112 Z" fill="#B45309" opacity="0.92" stroke="#D4D4D8" strokeWidth="2" />
        <rect x="20" y="32" width="12" height="12" rx="2" fill="#FEF3C7" opacity="0.55" />
        <line x1="40" y1="4" x2="32" y2="90" stroke="#EA580C" strokeWidth="3.5" strokeLinecap="round" />
      </g>
      <PlateBase cx={178} cy={172} r={112} />
      <ellipse cx="122" cy="166" rx="34" ry="26" fill="#FFFFFF" stroke="#E4E4E7" strokeWidth="1.5" />
      <CucumberGarnish x={105} y={182} />
      <CrispyChickenBase x={144} y={124} />
      <ellipse cx="206" cy="160" rx="36" ry="18" fill="#DC2626" />
      <circle cx="202" cy="158" r="2.2" fill="#FDE047" />
    </svg>
  );
}

function AyamKarageArt() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#F4F4F5" />
      <PlateBase cx={200} cy={156} r={114} />
      {/* Golden karage nuggets */}
      <g fill="#D97706" stroke="#B45309" strokeWidth="1.5">
        <ellipse cx="165" cy="136" rx="26" ry="19" transform="rotate(-12 165 136)" />
        <ellipse cx="218" cy="132" rx="25" ry="18" transform="rotate(14 218 132)" />
        <ellipse cx="155" cy="168" rx="24" ry="18" transform="rotate(8 155 168)" />
        <ellipse cx="204" cy="164" rx="28" ry="20" transform="rotate(-6 204 164)" />
        <ellipse cx="242" cy="164" rx="22" ry="17" transform="rotate(18 242 164)" />
      </g>
      {/* Small dipping sauce cup */}
      <circle cx="256" cy="118" r="22" fill="#FFFFFF" stroke="#D4D4D8" strokeWidth="2" />
      <circle cx="256" cy="118" r="16" fill="#EA580C" />
      {/* Parsley garnish */}
      <circle cx="195" cy="148" r="3" fill="#15803D" />
      <circle cx="225" cy="152" r="2.5" fill="#15803D" />
    </svg>
  );
}

function DimsumAyamArt() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#F4F4F5" />
      {/* Bamboo steamer basket */}
      <ellipse cx="200" cy="162" rx="112" ry="78" fill="#D97706" opacity="0.35" stroke="#B45309" strokeWidth="6" />
      <ellipse cx="200" cy="158" rx="98" ry="66" fill="#FEF3C7" stroke="#E4E4E7" strokeWidth="2" />
      {/* 4 Dimsum pieces */}
      {[
        { x: 162, y: 136 },
        { x: 234, y: 136 },
        { x: 164, y: 180 },
        { x: 236, y: 180 },
      ].map((pos, idx) => (
        <g key={idx} transform={`translate(${pos.x}, ${pos.y})`}>
          <ellipse cx="0" cy="6" rx="26" ry="18" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
          <ellipse cx="0" cy="0" rx="22" ry="15" fill="#FEF9C3" />
          <circle cx="0" cy="-2" r="7" fill="#EA580C" />
        </g>
      ))}
      {/* Chili oil dip */}
      <circle cx="322" cy="212" r="24" fill="#FFFFFF" stroke="#D4D4D8" strokeWidth="2" />
      <circle cx="322" cy="212" r="17" fill="#DC2626" />
    </svg>
  );
}

function AyamKejuBitesArt() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#F4F4F5" />
      <PlateBase cx={200} cy={156} r={112} />
      <g fill="#D97706">
        <circle cx="164" cy="142" r="18" />
        <circle cx="198" cy="134" r="19" />
        <circle cx="232" cy="144" r="18" />
        <circle cx="176" cy="172" r="19" />
        <circle cx="216" cy="172" r="20" />
      </g>
      {/* Cheese sauce zigzag drizzle */}
      <path
        d="M148 152 Q170 124 192 152 T236 148 T252 168"
        fill="none"
        stroke="#F97316"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M156 164 Q182 140 208 164 T244 156"
        fill="none"
        stroke="#FACC15"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function KulitTahuArt() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#F4F4F5" />
      <PlateBase cx={200} cy={156} r={112} />
      {/* Crispy tahu cubes */}
      <rect x="132" y="132" width="44" height="38" rx="6" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
      <rect x="150" y="156" width="44" height="38" rx="6" fill="#FBBF24" stroke="#B45309" strokeWidth="2" />
      {/* Crispy chicken skin curls */}
      <path d="M204 128 C228 118, 256 134, 246 154 C236 172, 202 162, 204 128 Z" fill="#B45309" />
      <path d="M214 152 C238 148, 260 166, 244 182 C226 196, 198 180, 214 152 Z" fill="#D97706" />
      {/* Sambal center */}
      <ellipse cx="198" cy="158" rx="22" ry="13" fill="#DC2626" />
      <circle cx="194" cy="156" r="2" fill="#FDE047" />
    </svg>
  );
}

function EsTehManisArt() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#F4F4F5" />
      <ellipse cx="204" cy="248" rx="68" ry="16" fill="#E4E4E7" />
      <path d="M150 48 L250 48 L236 242 C234 250, 166 250, 164 242 Z" fill="#FFFFFF" fillOpacity="0.8" stroke="#D4D4D8" strokeWidth="2.5" />
      <path d="M156 84 L244 84 L232 236 C230 242, 170 242, 168 236 Z" fill="#B45309" />
      <path d="M156 84 L244 84 L241 116 L159 116 Z" fill="#D97706" opacity="0.7" />
      <rect x="172" y="92" width="24" height="24" rx="4" fill="#FEF3C7" opacity="0.6" transform="rotate(14 184 104)" />
      <rect x="202" y="96" width="22" height="22" rx="4" fill="#FEF3C7" opacity="0.55" transform="rotate(-10 213 107)" />
      <line x1="226" y1="18" x2="202" y2="210" stroke="#15803D" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function AirMineralArt() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#F4F4F5" />
      <ellipse cx="170" cy="248" rx="48" ry="12" fill="#E4E4E7" />
      <ellipse cx="268" cy="248" rx="40" ry="10" fill="#E4E4E7" />
      <g transform="translate(132, 34)">
        <rect x="24" y="6" width="28" height="14" rx="3" fill="#0284C7" />
        <path d="M24 20 L52 20 L64 48 L64 206 C64 212, 12 212, 12 206 L12 48 Z" fill="#E0F2FE" stroke="#7DD3FC" strokeWidth="2" />
        <rect x="13" y="98" width="50" height="44" fill="#0EA5E9" opacity="0.88" />
        <rect x="20" y="114" width="36" height="6" rx="2" fill="#FFFFFF" opacity="0.9" />
      </g>
      <g transform="translate(232, 134)">
        <path d="M6 8 L66 8 L58 110 C57 114, 15 114, 14 110 Z" fill="#FFFFFF" fillOpacity="0.8" stroke="#CBD5E1" strokeWidth="2" />
        <path d="M10 34 L62 34 L56 106 C55 109, 17 109, 16 106 Z" fill="#BAE6FD" opacity="0.7" />
      </g>
    </svg>
  );
}
