"use client";

import { Users, Building2, ShieldCheck, Clock3, Flag, TrendingUp, CreditCard, ListChecks } from "lucide-react";
import { StatCard } from "@/components/charts/StatCard";
import { LineChart } from "@/components/charts/LineChart";
import { useAdminProperties, useAdminUsers, useAdminReports } from "@/lib/admin-data";
import { formatINR } from "@/lib/utils";

const DAY_LABELS = Array.from({ length: 14 }, (_, i) => {
  const d = new Date(2026, 7, 12 + i);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
});

function trendFrom(seed: number, points = 14) {
  return Array.from({ length: points }, (_, i) => {
    const wave = Math.sin((i / points) * Math.PI * 2 + seed) * 0.35 + 0.65;
    return Math.max(1, Math.round(((seed * 11) % 60) + wave * (12 + (seed % 8))));
  });
}

export default function AdminDashboardPage() {
  const properties = useAdminProperties();
  const users = useAdminUsers();
  const reports = useAdminReports();

  const owners = users.filter((u) => u.role === "owner" || u.role === "agent" || u.role === "builder").length;
  const active = properties.filter((p) => p.status === "active").length;
  const pending = properties.filter((p) => p.verificationStatus === "pending" || p.verificationStatus === "under_review").length;
  const openReports = reports.filter((r) => r.status === "pending" || r.status === "investigating").length;
  const totalLeads = properties.reduce((sum, p) => sum + p.leadsCount, 0);
  const revenue = 428500; // Phase 12: real Razorpay/Cashfree settlement totals
  const activeSubs = 214;

  const dailyUsers = trendFrom(2).map((v, i) => ({ label: DAY_LABELS[i], value: v }));
  const rentListings = trendFrom(4).map((v, i) => ({ label: DAY_LABELS[i], value: Math.round(v * 0.7) }));
  const saleListings = trendFrom(6).map((v, i) => ({ label: DAY_LABELS[i], value: Math.round(v * 0.4) }));
  const revenueTrend = trendFrom(8).map((v, i) => ({ label: DAY_LABELS[i], value: v * 900 }));
  const conversionTrend = trendFrom(10).map((v, i) => ({ label: DAY_LABELS[i], value: Math.round(v / 2) }));

  return (
    <div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-extrabold text-foreground">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">Platform-wide overview.</p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Total Users" value={users.length.toLocaleString("en-IN")} icon={Users} sparkline={trendFrom(1, 8)} />
        <StatCard label="Total Owners" value={owners.toLocaleString("en-IN")} icon={Building2} sparkline={trendFrom(2, 8)} />
        <StatCard label="Total Properties" value={properties.length.toLocaleString("en-IN")} icon={ListChecks} sparkline={trendFrom(3, 8)} />
        <StatCard label="Active Properties" value={active.toLocaleString("en-IN")} icon={ShieldCheck} delta={6} sparkline={trendFrom(4, 8)} />
        <StatCard label="Pending Verification" value={pending.toLocaleString("en-IN")} icon={Clock3} deltaIsGood={false} sparkline={trendFrom(5, 8)} accent="#FF5A00" />
        <StatCard label="Reported Properties" value={openReports.toLocaleString("en-IN")} icon={Flag} deltaIsGood={false} sparkline={trendFrom(6, 8)} accent="#FF5A00" />
        <StatCard label="Total Leads" value={totalLeads.toLocaleString("en-IN")} icon={TrendingUp} delta={9} sparkline={trendFrom(7, 8)} />
        <StatCard label="Revenue (MTD)" value={formatINR(revenue, true)} icon={CreditCard} delta={14} sparkline={trendFrom(8, 8)} />
        <StatCard label="Active Subscriptions" value={activeSubs.toLocaleString("en-IN")} icon={CreditCard} delta={4} sparkline={trendFrom(9, 8)} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-5">
          <h2 className="text-sm font-bold text-foreground">Daily Active Users</h2>
          <div className="mt-4">
            <LineChart series={[{ id: "users", name: "Users", color: "#1a5fae", data: dailyUsers }]} height={200} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5">
          <h2 className="text-sm font-bold text-foreground">Daily Listings — Rent vs Sale</h2>
          <div className="mt-4">
            <LineChart
              series={[
                { id: "rent", name: "Rent", color: "#1a5fae", data: rentListings },
                { id: "sale", name: "Sale", color: "#FF5A00", data: saleListings },
              ]}
              height={200}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5">
          <h2 className="text-sm font-bold text-foreground">Revenue — last 14 days</h2>
          <div className="mt-4">
            <LineChart series={[{ id: "revenue", name: "Revenue", color: "#1a5fae", data: revenueTrend }]} height={200} valueFormatter={(n) => formatINR(n, true)} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5">
          <h2 className="text-sm font-bold text-foreground">Lead Conversion — last 14 days</h2>
          <div className="mt-4">
            <LineChart series={[{ id: "conversion", name: "Conversions", color: "#FF5A00", data: conversionTrend }]} height={200} />
          </div>
        </div>
      </div>
    </div>
  );
}
