"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { savedSearchesService } from "@/lib/services/saved-searches.service";
import { authService } from "@/lib/services/auth.service";
import { toast } from "@/lib/toast";
import type { SearchFilters } from "@/lib/services/search.service";

function defaultLabel(filters: SearchFilters): string {
  const parts: string[] = [];
  if (filters.bedrooms?.length) parts.push(filters.bedrooms.map((b) => (b >= 5 ? "5+" : b)).join("/") + " BHK");
  if (filters.propertyTypes?.length) parts.push(filters.propertyTypes[0].replace("_", " "));
  if (filters.maxPrice) parts.push(`under ₹${filters.maxPrice.toLocaleString("en-IN")}`);
  if (filters.city) parts.push(`in ${filters.city}`);
  return parts.length ? parts.join(" ") : "My search";
}

export function SaveSearchButton({ filters }: { filters: SearchFilters }) {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("");

  function openModal() {
    if (!authService.getCurrentUser()) {
      toast("Login to save searches", "info");
      return;
    }
    setLabel(defaultLabel(filters));
    setOpen(true);
  }

  function save() {
    savedSearchesService.save(label.trim() || defaultLabel(filters), filters);
    toast("Search saved — we'll notify you about new matches.");
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted"
      >
        <Bookmark className="h-4 w-4" /> Save Search
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Save this search" className="sm:max-w-sm">
        <Input label="Name" value={label} onChange={(e) => setLabel(e.target.value)} placeholder={defaultLabel(filters)} />
        <p className="mt-2 text-xs text-muted-foreground">
          You&apos;ll be notified when new properties match these filters.
        </p>
        <Button className="mt-4 w-full" onClick={save}>
          Save Search
        </Button>
      </Modal>
    </>
  );
}
