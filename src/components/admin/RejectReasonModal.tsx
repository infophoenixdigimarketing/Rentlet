"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

// Spec §25 — rejection reason is required, never optional.
export function RejectReasonModal({
  open,
  onClose,
  propertyTitle,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  propertyTitle: string;
  onConfirm: (reason: string) => void;
}) {
  const [reason, setReason] = useState("");

  function submit() {
    if (!reason.trim()) return;
    onConfirm(reason.trim());
    setReason("");
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="Reject Listing">
      <p className="text-xs text-muted-foreground">{propertyTitle}</p>
      <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-muted-foreground" htmlFor="reject-reason">
        Rejection reason (required)
      </label>
      <textarea
        id="reject-reason"
        rows={3}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="e.g. Photos don't match the address, price looks inaccurate..."
        className="mt-2 w-full resize-none rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand-navy"
      />
      <Button className="mt-4 w-full" disabled={!reason.trim()} onClick={submit}>
        Reject Listing
      </Button>
    </Modal>
  );
}
