"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BadgeCheck, Clock3 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { PropertyImage } from "@/components/ui/PropertyImage";
import { useAuth } from "@/lib/auth";
import { authService } from "@/lib/services/auth.service";
import { recentlyViewedService } from "@/lib/services/recently-viewed.service";
import { propertyRepository } from "@/lib/services/properties.service";
import { priceLabel } from "@/lib/utils";
import { toast } from "@/lib/toast";
import type { Property } from "@/types/property";
import type { AuthUser } from "@/types/user";

export default function ProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [saving, setSaving] = useState(false);
  const [recent, setRecent] = useState<Property[]>([]);

  useEffect(() => {
    if (!user) return;
    const ids = recentlyViewedService.getIds(user.id);
    Promise.all(ids.map((id) => propertyRepository.getById(id))).then((results) => {
      setRecent(results.filter((p): p is Property => p != null));
    });
  }, [user]);

  if (!user) return null;
  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  // A phone that came from OTP sign-in is a verified credential — don't let a stray Save wipe it.
  const phoneLocked = Boolean(user.phone);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    // Only send fields the user actually changed — never blank out an untouched phone/email.
    const patch: Partial<Pick<AuthUser, "name" | "email" | "phone">> = {};
    if (name.trim() && name.trim() !== user.name) patch.name = name.trim();
    if (email.trim() !== (user.email ?? "")) patch.email = email.trim() || null;
    if (!phoneLocked && phone.trim() !== (user.phone ?? "")) patch.phone = phone.trim() || null;

    if (Object.keys(patch).length === 0) {
      toast("No changes to save.", "info");
      return;
    }

    setSaving(true);
    try {
      await authService.updateProfile(patch);
      toast("Profile updated");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Couldn't update profile", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 className="text-xl font-extrabold text-foreground">My Profile</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage your personal details.</p>

      <div className="mt-5 rounded-2xl border border-border bg-white p-6">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-navy-light text-xl font-bold text-brand-navy">
            {initials}
          </span>
          <div>
            <p className="flex items-center gap-1.5 text-base font-bold text-foreground">
              {user.name}
              {user.isVerified && <BadgeCheck className="h-4 w-4 text-emerald-600" />}
            </p>
            <p className="text-sm capitalize text-muted-foreground">
              {user.role} · Member since {new Date(user.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
            </p>
          </div>
        </div>

        <form onSubmit={save} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          <div className="flex flex-col gap-1.5">
            <Input
              label="Phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Not set"
              disabled={phoneLocked}
              className={phoneLocked ? "bg-muted text-muted-foreground" : undefined}
            />
            {phoneLocked && (
              <span className="text-[11px] text-muted-foreground">Verified by OTP — can’t be changed here.</span>
            )}
          </div>
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Not set" className="sm:col-span-2" />
          <div className="sm:col-span-2">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>

      {recent.length > 0 && (
        <div className="mt-6">
          <h2 className="flex items-center gap-1.5 text-sm font-bold text-foreground">
            <Clock3 className="h-4 w-4" /> Recently Viewed
          </h2>
          <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-1">
            {recent.map((p) => (
              <Link
                key={p.id}
                href={`/property/${p.slug}/${p.id}`}
                className="w-40 shrink-0 overflow-hidden rounded-xl border border-border bg-white"
              >
                <PropertyImage id={p.id} propertyType={p.propertyType} className="h-24 w-full" />
                <div className="p-2.5">
                  <p className="text-xs font-bold text-brand-navy">{priceLabel(p)}</p>
                  <p className="line-clamp-1 text-[11px] text-muted-foreground">{p.locality}, {p.city}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
