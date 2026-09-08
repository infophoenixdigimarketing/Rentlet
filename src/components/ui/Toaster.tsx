"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, XCircle, Info } from "lucide-react";
import { subscribeToasts, type ToastMessage } from "@/lib/toast";
import { cn } from "@/lib/utils";

const ICONS = { success: CheckCircle2, error: XCircle, info: Info } as const;
const ACCENTS = {
  success: "text-emerald-600",
  error: "text-red-600",
  info: "text-brand-navy",
} as const;

export function Toaster() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  // Standard SSR-safe "are we on the client yet" check — avoids calling document.body during
  // the server render without needing a setState-in-effect (which trips react-hooks/set-state-in-effect).
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(
    () =>
      subscribeToasts((t) => {
        setToasts((prev) => [...prev, t]);
        setTimeout(() => setToasts((prev) => prev.filter((p) => p.id !== t.id)), 3200);
      }),
    []
  );

  if (!mounted) return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[200] flex flex-col items-center gap-2 px-4 sm:bottom-6 sm:items-end sm:px-6">
      {toasts.map((t) => {
        const Icon = ICONS[t.variant];
        return (
          <div
            key={t.id}
            role="status"
            className="pointer-events-auto flex w-full max-w-sm items-center gap-2.5 rounded-xl border border-border bg-white px-4 py-3 shadow-lg animate-fade-up"
          >
            <Icon className={cn("h-4 w-4 shrink-0", ACCENTS[t.variant])} />
            <span className="text-sm font-medium text-foreground">{t.text}</span>
          </div>
        );
      })}
    </div>,
    document.body
  );
}
