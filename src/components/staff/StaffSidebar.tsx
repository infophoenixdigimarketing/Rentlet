"use client";

import { useRouter } from "next/navigation";
import { Workflow, ScrollText, LogOut, Headset } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { SidebarNav } from "@/components/layout/SidebarNav";
import { staffAuthService } from "@/lib/services/staff-auth.service";
import { useStaffAuth } from "@/lib/staff-auth";
import { toast } from "@/lib/toast";

const LINKS = [
  { href: "/staff/pipeline", label: "My Pipeline", icon: Workflow },
  { href: "/staff/deals", label: "Closed Deals", icon: ScrollText },
];

export function StaffSidebar() {
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

      <SidebarNav links={LINKS} ariaLabel="Staff console" variant="dark" className="flex-1 px-3 py-2" />

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
