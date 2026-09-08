"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useAdminSettings } from "@/lib/admin-data";
import { adminSettingsService } from "@/lib/services/admin-settings.service";
import { toast } from "@/lib/toast";

export default function AdminSettingsPage() {
  const { cities, amenities } = useAdminSettings();

  return (
    <div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-extrabold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Platform configuration (spec §47) — no code changes needed for these.</p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ChipEditor
          title="Cities"
          description="Cities available across search filters and the homepage."
          items={cities}
          onAdd={(v) => {
            adminSettingsService.addCity(v);
            toast(`Added ${v}`);
          }}
          onRemove={(v) => {
            adminSettingsService.removeCity(v);
            toast(`Removed ${v}`, "info");
          }}
          placeholder="e.g. Jaipur"
        />

        <ChipEditor
          title="Amenities"
          description="Options shown in the post-property wizard and search filters."
          items={amenities}
          onAdd={(v) => {
            adminSettingsService.addAmenity(v);
            toast(`Added ${v}`);
          }}
          onRemove={(v) => {
            adminSettingsService.removeAmenity(v);
            toast(`Removed ${v}`, "info");
          }}
          placeholder="e.g. Rainwater Harvesting"
        />

        <div className="rounded-2xl border border-dashed border-border bg-muted/60 p-5">
          <h2 className="text-sm font-bold text-foreground">Homepage CMS &amp; Verification Rules</h2>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Hero banner text/image, featured-property curation, testimonials and FAQ editing
            (spec §48) land alongside the Firestore-backed config in Phase 12 — this page&apos;s
            Cities/Amenities editors are the working pattern that gets reused there.
          </p>
        </div>
      </div>
    </div>
  );
}

function ChipEditor({
  title,
  description,
  items,
  onAdd,
  onRemove,
  placeholder,
}: {
  title: string;
  description: string;
  items: string[];
  onAdd: (value: string) => void;
  onRemove: (value: string) => void;
  placeholder: string;
}) {
  const [value, setValue] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue("");
  }

  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <h2 className="text-sm font-bold text-foreground">{title}</h2>
      <p className="mt-1 text-xs text-muted-foreground">{description}</p>

      <form onSubmit={submit} className="mt-3 flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="h-9 flex-1 rounded-lg border border-border px-3 text-sm outline-none focus:border-brand-navy"
        />
        <button type="submit" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-navy text-white hover:bg-brand-navy-dark">
          <Plus className="h-4 w-4" />
        </button>
      </form>

      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-foreground">
            {item}
            <button type="button" aria-label={`Remove ${item}`} onClick={() => onRemove(item)} className="text-muted-foreground hover:text-red-600">
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
