"use client";

// Plain-SVG line chart per the dataviz skill: 2px round-joined lines, ~10% area wash for a
// single series, hairline recessive gridlines, an 8px end-marker with a 2px surface ring, a
// crosshair that snaps to the nearest X, and one tooltip listing every series at that X.
// Palette: brand-derived 2-slot categorical pair (navy #1a5fae / orange #FF5A00), validated
// with dataviz's validate_palette.js — see docs/03-dashboard-charts.md.
import { useId, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export interface ChartSeries {
  id: string;
  name: string;
  color: string;
  data: { label: string; value: number }[];
}

const WIDTH = 640;
const HEIGHT = 240;
const PAD_LEFT = 40;
const PAD_RIGHT = 12;
const PAD_TOP = 16;
const PAD_BOTTOM = 28;

function niceMax(max: number) {
  if (max <= 0) return 10;
  const magnitude = Math.pow(10, Math.floor(Math.log10(max)));
  const steps = [1, 2, 2.5, 5, 10];
  for (const s of steps) {
    if (max <= s * magnitude) return s * magnitude;
  }
  return 10 * magnitude;
}

export function LineChart({
  series,
  height = HEIGHT,
  valueFormatter = (n) => n.toLocaleString("en-IN"),
  className,
}: {
  series: ChartSeries[];
  height?: number;
  valueFormatter?: (n: number) => string;
  className?: string;
}) {
  const uid = useId();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const pointCount = series[0]?.data.length ?? 0;
  const innerW = WIDTH - PAD_LEFT - PAD_RIGHT;
  const innerH = height - PAD_TOP - PAD_BOTTOM;

  const maxValue = useMemo(() => {
    const raw = Math.max(1, ...series.flatMap((s) => s.data.map((d) => d.value)));
    return niceMax(raw);
  }, [series]);

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(maxValue * f));

  function xAt(i: number) {
    if (pointCount <= 1) return PAD_LEFT;
    return PAD_LEFT + (innerW * i) / (pointCount - 1);
  }
  function yAt(v: number) {
    return PAD_TOP + innerH - (innerH * v) / maxValue;
  }

  const paths = series.map((s) => ({
    id: s.id,
    color: s.color,
    d: s.data.map((d, i) => `${i === 0 ? "M" : "L"}${xAt(i)},${yAt(d.value)}`).join(" "),
  }));

  // sparse x labels so they never crowd
  const labelEvery = Math.max(1, Math.ceil(pointCount / 6));

  return (
    <div className={cn("relative w-full", className)}>
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        role="img"
        aria-label={series.map((s) => s.name).join(" and ")}
        className="w-full overflow-visible"
        onMouseLeave={() => setHoverIndex(null)}
      >
        {yTicks.map((t) => (
          <g key={t}>
            <line x1={PAD_LEFT} x2={WIDTH - PAD_RIGHT} y1={yAt(t)} y2={yAt(t)} stroke="var(--border)" strokeWidth={1} />
            <text x={PAD_LEFT - 8} y={yAt(t)} textAnchor="end" dominantBaseline="middle" className="fill-muted-foreground text-[9px]">
              {t >= 1000 ? `${Math.round(t / 100) / 10}K` : t}
            </text>
          </g>
        ))}

        {series[0]?.data.map((d, i) =>
          i % labelEvery === 0 ? (
            <text key={d.label} x={xAt(i)} y={height - 8} textAnchor="middle" className="fill-muted-foreground text-[9px]">
              {d.label}
            </text>
          ) : null
        )}

        {paths.length === 1 && (
          <path d={`${paths[0].d} L${xAt(pointCount - 1)},${yAt(0)} L${xAt(0)},${yAt(0)} Z`} fill={paths[0].color} opacity={0.1} />
        )}

        {paths.map((p) => (
          <path key={p.id} d={p.d} fill="none" stroke={p.color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        ))}

        {series.map((s) => {
          const last = s.data[s.data.length - 1];
          if (!last) return null;
          return (
            <circle key={s.id} cx={xAt(pointCount - 1)} cy={yAt(last.value)} r={4} fill={s.color} stroke="white" strokeWidth={2} />
          );
        })}

        {hoverIndex != null && (
          <line x1={xAt(hoverIndex)} x2={xAt(hoverIndex)} y1={PAD_TOP} y2={PAD_TOP + innerH} stroke="var(--muted-foreground)" strokeWidth={1} strokeDasharray="2,2" />
        )}
        {hoverIndex != null &&
          series.map((s) => (
            <circle key={s.id} cx={xAt(hoverIndex)} cy={yAt(s.data[hoverIndex]?.value ?? 0)} r={4} fill={s.color} stroke="white" strokeWidth={2} />
          ))}

        {/* hit layer */}
        {Array.from({ length: pointCount }).map((_, i) => (
          <rect
            key={i}
            x={xAt(i) - innerW / pointCount / 2}
            y={PAD_TOP}
            width={innerW / pointCount || 1}
            height={innerH}
            fill="transparent"
            onMouseEnter={() => setHoverIndex(i)}
            onFocus={() => setHoverIndex(i)}
            tabIndex={0}
            aria-label={`${series[0]?.data[i]?.label}: ${series.map((s) => `${s.name} ${valueFormatter(s.data[i]?.value ?? 0)}`).join(", ")}`}
          />
        ))}
      </svg>

      {hoverIndex != null && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+10px)] rounded-lg border border-border bg-white px-3 py-2 shadow-lg"
          style={{
            left: `${(xAt(hoverIndex) / WIDTH) * 100}%`,
            top: `${(yAt(Math.max(...series.map((s) => s.data[hoverIndex]?.value ?? 0))) / height) * 100}%`,
          }}
        >
          <p className="text-[10px] font-semibold text-muted-foreground">{series[0]?.data[hoverIndex]?.label}</p>
          {series.map((s) => (
            <p key={s.id} className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <span className="inline-block h-0.5 w-3 rounded" style={{ backgroundColor: s.color }} />
              {valueFormatter(s.data[hoverIndex]?.value ?? 0)}
              <span className="font-normal text-muted-foreground">{s.name}</span>
            </p>
          ))}
        </div>
      )}

      {series.length > 1 && (
        <div className="mt-3 flex flex-wrap items-center gap-4">
          {series.map((s) => (
            <span key={`${uid}-${s.id}`} className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/80">
              <span className="inline-block h-0.5 w-3.5 rounded" style={{ backgroundColor: s.color }} /> {s.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
