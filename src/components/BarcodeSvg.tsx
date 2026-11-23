import { encodeCode39Barcode } from '../utils/orderLogic';

interface BarcodeSvgProps {
  value: string;
  height?: number;
  className?: string;
}

export function BarcodeSvg({ value, height = 64, className = '' }: BarcodeSvgProps) {
  const { bars, totalWidth } = encodeCode39Barcode(value, 2, 5);
  const paddingX = 14;
  const viewWidth = totalWidth + paddingX * 2;

  return (
    <div
      className={`bg-white border border-zinc-200 rounded-lg px-4 py-3 flex flex-col items-center ${className}`}
      data-testid="voucher-barcode"
    >
      <svg
        viewBox={`0 0 ${viewWidth} ${height}`}
        className="w-full max-w-[320px] h-16"
        role="img"
        aria-label={`Barcode penukaran kasir untuk kode ${value}`}
        shapeRendering="crispEdges"
      >
        <rect x={0} y={0} width={viewWidth} height={height} fill="#FFFFFF" />
        {bars.map((bar, idx) => (
          <rect
            key={`${bar.x}-${idx}`}
            x={bar.x + paddingX}
            y={4}
            width={bar.width}
            height={height - 8}
            fill="#18181B"
          />
        ))}
      </svg>
      <span className="mt-1.5 font-mono text-xs font-semibold tracking-[0.22em] text-zinc-900 tabular-nums">
        {value}
      </span>
    </div>
  );
}
