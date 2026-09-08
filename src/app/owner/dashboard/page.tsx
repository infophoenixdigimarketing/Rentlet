"use client";

import { Building2, Eye, Users, CalendarClock, Heart, Home } from "lucide-react";
import { StatCard } from "@/components/charts/StatCard";
import { LineChart } from "@/components/charts/LineChart";
import { useOwnerProperties, useLeads, useVisits } from "@/lib/dashboard-hooks";

const DAY_LABELS = Array.from({ length: 14 }, (_, i) => {
  const d = new Date(2026, 7, 12 + i);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
});

// Deterministic 14-day trend from a seed total — stands in for a real per-day analytics
// query (Phase 12: `property_views` / `leads` aggregated by day, see docs/01-database-schema.md).
function trendFrom(seed: number, points = 14) {
  return Array.from({ length: points }, (_, i) => {
    const wave = Math.sin((i / points) * Math.PI * 2 + seed) * 0.35 + 0.65;
    return Math.max(1, Math.round(((seed * 7) % 40) + wave * (8 + (seed % 6))));
  });
}

export default function OwnerDashboardPage() {
  const properties = useOwnerProperties();
  const leads = useLeads();
  const visits = useVisits();

  const totalViews = properties.reduce((sum, p) => sum + p.views, 0);
  const totalSaved = properties.reduce((sum, p) => sum + p.savedCount, 0);
  const activeCount = properties.filter((p) => p.status === "active").length;
  const scheduledVisits = visits.filter((v) => v.status === "requested" || v.status === "confirmed").length;

  const viewsTrend = trendFrom(3).map((v, i) => ({ label: DAY_LABELS[i], value: v * 12 }));
  const leadsTrend = trendFrom(5).map((v, i) => ({ label: DAY_LABELS[i], value: Math.round(v * 1.4) }));

  return (
    <div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-extrabold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Here&apos;s how your listings are performing.</p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Total Properties" value={String(properties.length)} icon={Home} sparkline={trendFrom(1, 8)} />
        <StatCard label="Active Listings" value={String(activeCount)} icon={Building2} sparkline={trendFrom(2, 8)} />
        <StatCard label="Total Views" value={totalViews.toLocaleString("en-IN")} icon={Eye} delta={8} sparkline={trendFrom(3, 8)} />
        <StatCard label="Total Leads" value={String(leads.length)} icon={Users} delta={12} sparkline={trendFrom(4, 8)} accent="#FF5A00" />
        <StatCard label="Scheduled Visits" value={String(scheduledVisits)} icon={CalendarClock} sparkline={trendFrom(5, 8)} />
        <StatCard label="Saved By Users" value={totalSaved.toLocaleString("en-IN")} icon={Heart} delta={-3} deltaIsGood={false} sparkline={trendFrom(6, 8)} />
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-white p-5">
        <h2 className="text-sm font-bold text-foreground">Views &amp; Leads — last 14 days</h2>
        <div className="mt-4">
          <LineChart
            series={[
              { id: "views", name: "Views", color: "#1a5fae", data: viewsTrend },
              { id: "leads", name: "Leads", color: "#FF5A00", data: leadsTrend },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
