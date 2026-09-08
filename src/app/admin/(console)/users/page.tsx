"use client";

import { useMemo, useState } from "react";
import { Search, ShieldCheck, Ban, Trash2, ShieldOff } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { useAdminUsers } from "@/lib/admin-data";
import { adminUsersService } from "@/lib/services/admin-users.service";
import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";
import type { UserRole } from "@/types/user";

const ROLES: (UserRole | "all")[] = ["all", "tenant", "buyer", "owner", "agent", "builder"];

export default function AdminUsersPage() {
  const users = useAdminUsers();
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<UserRole | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users
      .filter((u) => (role === "all" ? true : u.role === role))
      .filter((u) => (q ? u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) : true));
  }, [users, query, role]);

  return (
    <div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-extrabold text-foreground">Users</h1>
        <p className="text-sm text-muted-foreground">{filtered.length} of {users.length} accounts</p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="h-10 w-full rounded-lg border border-border bg-white pl-9 pr-3 text-sm outline-none focus:border-brand-navy"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto">
          {ROLES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold capitalize",
                role === r ? "border-brand-navy bg-brand-navy text-white" : "border-border bg-white text-foreground hover:bg-muted"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState className="mt-6" icon={Search} title="No users match" description="Try a different search or role filter." />
      ) : (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-white">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-semibold">User</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 font-semibold">Properties</th>
                <th className="px-4 py-3 font-semibold">Joined</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-foreground">{u.name}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </td>
                  <td className="px-4 py-3 capitalize text-foreground/80">{u.role}</td>
                  <td className="px-4 py-3 text-muted-foreground">{u.propertiesCount || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{u.joinedAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", u.verified ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground")}>
                        {u.verified ? "Verified" : "Unverified"}
                      </span>
                      {u.blocked && <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700">Blocked</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        title={u.verified ? "Unverify" : "Verify"}
                        onClick={() => adminUsersService.toggleVerified(u.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700"
                      >
                        <ShieldCheck className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        title={u.blocked ? "Unblock" : "Block"}
                        onClick={() => {
                          adminUsersService.toggleBlocked(u.id);
                          toast(u.blocked ? `${u.name} unblocked` : `${u.name} blocked`);
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700"
                      >
                        {u.blocked ? <ShieldOff className="h-3.5 w-3.5" /> : <Ban className="h-3.5 w-3.5" />}
                      </button>
                      <button
                        type="button"
                        title="Delete"
                        onClick={() => {
                          adminUsersService.remove(u.id);
                          toast("User deleted", "info");
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
