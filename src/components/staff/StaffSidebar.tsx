"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Workflow, ScrollText, LogOut, Headset } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { staffAuthService } from "@/lib/services/staff-auth.service";
import { useStaffAuth } from "@/lib/staff-auth";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/staff/pipeline", label: "My Pipeline", icon: Workflow },
  { href: "/staff/deals", label: "Closed Deals", icon: ScrollText },
];

export function StaffSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { staff } = useStaffAuth();

  async function logout() {
    await staffAuthService.logout();
    toast("Signed out of the staff console");
    router.push("/staff/login");
  }

  return (
    <aside className="flex h-full w-full flex-col border-r border-white/10 bg-brand-navy text-white lg:w-60">
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-5">
        <Logo className="h-10" />
      </div>
      <div className="flex items-center gap-1.5 px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-white/50">
        <Headset className="h-3.5 w-3.5" /> Staff Console
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-x-auto px-3 py-2 lg:overflow-visible">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors",
                active ? "bg-brand-orange text-white" : "text-white/75 hover:bg-white/10"
              )}
            >
              <link.icon className="h-4 w-4" /> {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <p className="truncate px-2 text-xs text-white/60">{staff?.name}</p>
        <p className="truncate px-2 text-[11px] text-white/40">{staff?.email}</p>
        <button
          type="button"
          onClick={logout}
          className="mt-1 flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    </aside>
  );
}
