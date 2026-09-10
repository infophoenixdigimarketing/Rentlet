"use client";

import { LayoutDashboard, Building2, Users, BarChart3 } from "lucide-react";
import { SidebarNav } from "@/components/layout/SidebarNav";

const LINKS = [
  { href: "/owner/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/owner/properties", label: "My Properties", icon: Building2 },
  { href: "/owner/leads", label: "Leads", icon: Users },
  { href: "/owner/analytics", label: "Analytics", icon: BarChart3 },
];

export function OwnerSidebar() {
  return <SidebarNav links={LINKS} ariaLabel="Owner dashboard" className="lg:w-56 lg:shrink-0" />;
}
