"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

// Spec §25 — a listing can't be approved until every verification point is confirmed.
// This is what stops fake or invalid properties reaching search.
export const VERIFICATION_CHECKS = [
  { id: "owner", label: "Owner information", hint: "Name and phone match a real, reachable person." },
  { id: "documents", label: "Property documents", hint: "Tax receipt / electricity bill / allotment letter seen." },
  { id: "address", label: "Property address", hint: "Locality, pincode and map pin are consistent and real." },
  { id: "ownership", label: "Ownership proof", hint: "Sale deed / khata / rent agreement confirms the lister's right to list." },
  { id: "listing", label: "Listing details", hint: "Photos, area, price and amenities look accurate — no obvious fakes." },
] as const;

export function VerifyChecklistModal({
  open,
  onClose,
  propertyTitle,
  onApprove,
}: {
  open: boolean;
  onClose: () => void;
  propertyTitle: string;
  onApprove: (checks: string[], note: string) => void;
}) {
  // The parent mounts this fresh per property (keyed on the property id), so plain
  // initial state is all the reset we need.
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [note, setNote] = useState("");

  const allPassed = VERIFICATION_CHECKS.every((c) => checked[c.id]);
  const passedCount = VERIFICATION_CHECKS.filter((c) => checked[c.id]).length;

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function submit() {
    if (!allPassed) return;
    onApprove(
      VERIFICATION_CHECKS.filter((c) => checked[c.id]).map((c) => c.label),
      note.trim()
    );
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="Verify Listing">
      <p className="text-xs text-muted-foreground">{propertyTitle}</p>

      <p className="mt-3 text-sm text-foreground">
        Confirm each point below before this listing goes live. A tenant or buyer only sees the
        property once it&apos;s approved.
      </p>

      <ul className="mt-4 flex flex-col gap-2.5">
        {VERIFICATION_CHECKS.map((c) => (
          <li key={c.id}>
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-3 hover:bg-muted/50">
              <input
                type="checkbox"
                checked={!!checked[c.id]}
                onChange={() => toggle(c.id)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-emerald-600"
              />
              <span>
                <span className="block text-sm font-semibold text-foreground">{c.label}</span>
                <span className="block text-xs text-muted-foreground">{c.hint}</span>
              </span>
            </label>
          </li>
        ))}
      </ul>

      <label
        className="mt-4 block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
        htmlFor="verify-note"
      >
        Verifier note (optional)
      </label>
      <textarea
        id="verify-note"
        rows={2}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="e.g. Spoke to owner, khata verified against BBMP portal."
        className="mt-2 w-full resize-none rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand-navy"
      />

      <Button className="mt-4 w-full" disabled={!allPassed} onClick={submit}>
        <ShieldCheck className="h-4 w-4" />
        {allPassed ? "Verify & Approve" : `Confirm all points (${passedCount}/${VERIFICATION_CHECKS.length})`}
      </Button>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Can&apos;t confirm a point? Close this and use <span className="font-semibold">Reject</span> instead.
      </p>
    </Modal>
  );
}
