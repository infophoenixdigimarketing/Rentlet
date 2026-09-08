import { ArrowDown, ArrowUp, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Stat-tile contract (dataviz skill): label · value (compact) · optional signed delta
// (color = direction × whether up is good) · optional sparkline. No hover layer needed —
// the one documented exception to "ship the hover layer by default".
export function StatCard({
  label,
  value,
  delta,
  deltaIsGood = true,
  icon: Icon,
  sparkline,
  accent = "#1a5fae",
}: {
  label: string;
  value: string;
  delta?: number;
  deltaIsGood?: boolean;
  icon?: LucideIcon;
  sparkline?: number[];
  accent?: string;
}) {
  const up = (delta ?? 0) >= 0;
  const good = up === deltaIsGood;

  return (
    <div className="rounded-2xl border border-border bg-white p-4">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        {Icon && (
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-navy-light text-brand-navy">
            <Icon className="h-4 w-4" strokeWidth={1.75} />
          </span>
        )}
      </div>
      <p className="mt-2 text-2xl font-extrabold text-foreground">{value}</p>
      <div className="mt-2 flex items-center justify-between">
        {delta != null ? (
          <span className={cn("inline-flex items-center gap-0.5 text-xs font-semibold", good ? "text-emerald-600" : "text-red-600")}>
            {up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            {Math.abs(delta)}%
          </span>
        ) : (
          <span />
        )}
        {sparkline && sparkline.length > 1 && <Sparkline data={sparkline} color={accent} />}
      </div>
    </div>
  );
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 64;
  const h = 22;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const points = data.map((v, i) => [
    (w * i) / (data.length - 1),
    h - ((v - min) / range) * h,
  ]);
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden className="overflow-visible">
      <path d={d} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r={2} fill={color} />
    </svg>
  );
}
