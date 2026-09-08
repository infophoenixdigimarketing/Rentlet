"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";

// Reuses the report-reason taxonomy from spec §27 (Report Property), adapted for a chat user.
const REASONS = ["Fake property", "Spam", "Broker misuse", "Suspicious activity", "Other"];

export function ReportUserModal({ open, onClose, userName }: { open: boolean; onClose: () => void; userName: string }) {
  const [reason, setReason] = useState<string | null>(null);
  const [details, setDetails] = useState("");

  function submit() {
    if (!reason) return;
    toast(`Report submitted. Our team will review your conversation with ${userName}.`, "info");
    setReason(null);
    setDetails("");
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title={`Report ${userName}`}>
      <div className="flex flex-col gap-2">
        {REASONS.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setReason(r)}
            className={cn(
              "rounded-lg border px-3.5 py-2.5 text-left text-sm font-medium",
              reason === r ? "border-brand-navy bg-brand-navy-light text-brand-navy" : "border-border text-foreground hover:bg-muted"
            )}
          >
            {r}
          </button>
        ))}
        <textarea
          rows={3}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Add details (optional)"
          className="mt-1 w-full resize-none rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand-navy"
        />
        <Button className="mt-1" disabled={!reason} onClick={submit}>
          Submit Report
        </Button>
      </div>
    </Modal>
  );
}
