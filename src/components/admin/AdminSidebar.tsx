"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  Flag,
  Settings,
  LogOut,
  ShieldCheck,
  Workflow,
  ScrollText,
  CalendarClock,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { adminAuthService } from "@/lib/services/admin-auth.service";
import { useAdminAuth } from "@/lib/admin-auth";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/pipeline", label: "CRM Pipeline", icon: Workflow },
  { href: "/admin/visits", label: "Visits", icon: CalendarClock },
  { href: "/admin/deals", label: "Deal Ledger", icon: ScrollText },
  { href: "/admin/properties", label: "Properties", icon: Building2 },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/reports", label: "Reports", icon: Flag },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { admin } = useAdminAuth();

  async function logout() {
    await adminAuthService.logout();
    toast("Logged out of admin console");
    router.push("/admin/login");
  }

  return (
    <aside className="sticky top-0 z-30 w-full border-b border-white/10 bg-brand-navy-dark text-white lg:static lg:flex lg:h-full lg:w-60 lg:flex-col lg:border-b-0 lg:border-r">
      {/* Top bar: logo + (mobile only) a quick logout */}
      <div className="flex items-center justify-between gap-2 px-4 py-3 lg:border-b lg:border-white/10 lg:px-5 lg:py-5">
        <Logo className="h-9 lg:h-10" />
        <button
          type="button"
          onClick={logout}
          aria-label="Logout"
          className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white lg:hidden"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>

      <div className="hidden items-center gap-1.5 px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-white/50 lg:flex">
        <ShieldCheck className="h-3.5 w-3.5" /> Admin Console
      </div>

      {/* Nav — a horizontal, swipeable strip on mobile; the usual vertical list on lg+ */}
      <nav className="flex gap-1.5 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-3 lg:py-2">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors lg:py-2.5",
                active ? "bg-brand-orange text-white" : "text-white/75 hover:bg-white/10"
              )}
            >
              <link.icon className="h-4 w-4 shrink-0" /> {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Account block — desktop only (mobile logout lives in the top bar) */}
      <div className="hidden border-t border-white/10 p-3 lg:block">
        <p className="truncate px-2 text-xs text-white/50">{admin?.email}</p>
        <button
          type="button"
          onClick={logout}
          className="mt-1 flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </aside>
  );
}
