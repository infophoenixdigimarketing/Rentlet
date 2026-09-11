"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BadgeCheck, Clock3, Camera } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { PropertyImage } from "@/components/ui/PropertyImage";
import { Avatar } from "@/components/ui/Avatar";
import { useAuth } from "@/lib/auth";
import { authService } from "@/lib/services/auth.service";
import { avatarService, useAvatar } from "@/lib/services/avatar.service";
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasPhoto = Boolean(useAvatar(user?.id ?? ""));

  useEffect(() => {
    if (!user) return;
    const ids = recentlyViewedService.getIds(user.id);
    Promise.all(ids.map((id) => propertyRepository.getById(id))).then((results) => {
      setRecent(results.filter((p): p is Property => p != null));
    });
  }, [user]);

  if (!user) return null;

  function onPickPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !user) return;
    if (!file.type.startsWith("image/")) {
      toast("Please choose an image file", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // Downscale to a small square so the stored photo stays a few KB, regardless of the
        // original file's size or aspect ratio.
        const size = 240;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const scale = Math.max(size / img.width, size / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
        avatarService.set(user.id, canvas.toDataURL("image/jpeg", 0.85));
        toast("Profile photo updated");
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  function removePhoto() {
    if (!user) return;
    avatarService.remove(user.id);
  }

  // The phone (from OTP) and the email (from sign-up) are identity fields — shown, not editable
  // here, so a stray Save can't change or wipe them.
  const phoneLocked = Boolean(user.phone);
  const emailLocked = Boolean(user.email);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    // Only send fields the user actually changed — never blank out an untouched phone/email.
    const patch: Partial<Pick<AuthUser, "name" | "email" | "phone">> = {};
    if (name.trim() && name.trim() !== user.name) patch.name = name.trim();
    if (!emailLocked && email.trim() && email.trim() !== (user.email ?? "")) patch.email = email.trim();
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
          <div className="relative h-16 w-16 shrink-0">
            <Avatar userId={user.id} name={user.name} className="h-16 w-16 text-xl" />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Change profile photo"
              className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-orange text-white shadow ring-2 ring-white"
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onPickPhoto} />
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-base font-bold text-foreground">
              {user.name}
              {user.isVerified && <BadgeCheck className="h-4 w-4 text-emerald-600" />}
            </p>
            <p className="text-sm capitalize text-muted-foreground">
              {user.role} · Member since {new Date(user.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
            </p>
            {hasPhoto && (
              <button type="button" onClick={removePhoto} className="mt-1 text-[11px] font-semibold text-red-600 hover:underline">
                Remove photo
              </button>
            )}
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
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Not set"
              disabled={emailLocked}
              className={emailLocked ? "bg-muted text-muted-foreground" : undefined}
            />
            {emailLocked && (
              <span className="text-[11px] text-muted-foreground">Set at sign-up — can’t be changed here.</span>
            )}
          </div>
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
