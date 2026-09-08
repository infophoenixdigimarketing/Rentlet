"use client";

// Single-measure categorical bar chart (dataviz skill): one hue (category identity already
// carried by the x-axis label, so no legend needed), ≤24px bars with a 4px rounded cap,
// per-bar hover tooltip + lighten-on-hover, hairline recessive gridlines.
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const WIDTH = 480;
const HEIGHT = 220;
const PAD_LEFT = 36;
const PAD_RIGHT = 8;
const PAD_TOP = 12;
const PAD_BOTTOM = 30;
const BAR_MAX = 28;

function niceMax(max: number) {
  if (max <= 0) return 10;
  const magnitude = Math.pow(10, Math.floor(Math.log10(max)));
  const steps = [1, 2, 2.5, 5, 10];
  for (const s of steps) if (max <= s * magnitude) return s * magnitude;
  return 10 * magnitude;
}

export function BarChart({
  data,
  color = "#1a5fae",
  height = HEIGHT,
  valueFormatter = (n) => n.toLocaleString("en-IN"),
  className,
}: {
  data: { label: string; value: number }[];
  color?: string;
  height?: number;
  valueFormatter?: (n: number) => string;
  className?: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const innerW = WIDTH - PAD_LEFT - PAD_RIGHT;
  const innerH = height - PAD_TOP - PAD_BOTTOM;
  const maxValue = useMemo(() => niceMax(Math.max(1, ...data.map((d) => d.value))), [data]);
  const yTicks = [0, 0.5, 1].map((f) => Math.round(maxValue * f));

  const slot = innerW / data.length;
  const barW = Math.min(BAR_MAX, slot * 0.5);

  function yAt(v: number) {
    return PAD_TOP + innerH - (innerH * v) / maxValue;
  }

  return (
    <div className={cn("relative w-full", className)}>
      <svg viewBox={`0 0 ${WIDTH} ${height}`} role="img" aria-label="bar chart" className="w-full overflow-visible" onMouseLeave={() => setHover(null)}>
        {yTicks.map((t) => (
          <g key={t}>
            <line x1={PAD_LEFT} x2={WIDTH - PAD_RIGHT} y1={yAt(t)} y2={yAt(t)} stroke="var(--border)" strokeWidth={1} />
            <text x={PAD_LEFT - 8} y={yAt(t)} textAnchor="end" dominantBaseline="middle" className="fill-muted-foreground text-[9px]">
              {t}
            </text>
          </g>
        ))}

        {data.map((d, i) => {
          const cx = PAD_LEFT + slot * i + slot / 2;
          const y = yAt(d.value);
          const h = PAD_TOP + innerH - y;
          const isHover = hover === i;
          return (
            <g key={d.label}>
              <rect
                x={cx - barW / 2}
                y={y}
                width={barW}
                height={Math.max(h, 1)}
                rx={4}
                fill={color}
                opacity={isHover ? 1 : 0.85}
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                tabIndex={0}
                aria-label={`${d.label}: ${valueFormatter(d.value)}`}
              />
              <text x={cx} y={height - 10} textAnchor="middle" className="fill-muted-foreground text-[9px]">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>

      {hover != null && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+10px)] rounded-lg border border-border bg-white px-3 py-1.5 shadow-lg"
          style={{
            left: `${((PAD_LEFT + slot * hover + slot / 2) / WIDTH) * 100}%`,
            top: `${(yAt(data[hover].value) / height) * 100}%`,
          }}
        >
          <p className="text-[10px] font-semibold text-muted-foreground">{data[hover].label}</p>
          <p className="text-xs font-bold text-foreground">{valueFormatter(data[hover].value)}</p>
        </div>
      )}
    </div>
  );
}
