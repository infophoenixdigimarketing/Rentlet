"use client";

import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";
import { useLeads } from "@/lib/dashboard-hooks";

const DAY_LABELS = Array.from({ length: 14 }, (_, i) => {
  const d = new Date(2026, 7, 12 + i);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
});

function trendFrom(seed: number, points = 14) {
  return Array.from({ length: points }, (_, i) => {
    const wave = Math.sin((i / points) * Math.PI * 2 + seed) * 0.35 + 0.65;
    return Math.max(1, Math.round(((seed * 7) % 40) + wave * (8 + (seed % 6))));
  });
}

const SOURCE_LABEL: Record<string, string> = {
  contact: "Contact Form",
  call: "Call",
  whatsapp: "WhatsApp",
  chat: "Chat",
  visit: "Visit Request",
};

export default function OwnerAnalyticsPage() {
  const leads = useLeads();

  const enquiriesTrend = trendFrom(7).map((v, i) => ({ label: DAY_LABELS[i], value: v }));
  const conversionTrend = trendFrom(9).map((v, i) => ({ label: DAY_LABELS[i], value: Math.round(v / 3) }));

  const leadsBySource = Object.entries(
    leads.reduce<Record<string, number>>((acc, l) => {
      acc[l.source] = (acc[l.source] ?? 0) + 1;
      return acc;
    }, {})
  ).map(([source, value]) => ({ label: SOURCE_LABEL[source] ?? source, value }));

  return (
    <div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-extrabold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground">Track performance across all your listings.</p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-5">
          <h2 className="text-sm font-bold text-foreground">Enquiries — last 14 days</h2>
          <div className="mt-4">
            <LineChart series={[{ id: "enquiries", name: "Enquiries", color: "#1a5fae", data: enquiriesTrend }]} height={200} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5">
          <h2 className="text-sm font-bold text-foreground">Conversions — last 14 days</h2>
          <div className="mt-4">
            <LineChart series={[{ id: "conversions", name: "Conversions", color: "#FF5A00", data: conversionTrend }]} height={200} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5 lg:col-span-2">
          <h2 className="text-sm font-bold text-foreground">Leads by Source</h2>
          <div className="mt-4 max-w-lg">
            <BarChart data={leadsBySource} height={200} />
          </div>
        </div>
      </div>
    </div>
  );
}
