"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/Modal";
import { authService, GOOGLE_DEMO_ACCOUNTS, type GoogleDemoAccount } from "@/lib/services/auth.service";
import { toast } from "@/lib/toast";
import type { UserRole } from "@/types/user";

// Real Google Sign-In needs an OAuth client (Phase 12 — Firebase Auth). This mock reproduces
// the *shape* of the flow (an account picker) without a real consent screen, so the UI is
// honest about being a demo rather than a dead button.
export function GoogleButton({
  redirectTo = "/",
  role,
}: {
  redirectTo?: string;
  /** From the register flow — sets the picked account's role (owner / agent / builder / …). */
  role?: UserRole;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  function initials(name: string) {
    return name
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  async function choose(account: GoogleDemoAccount) {
    setLoadingId(account.id);
    try {
      const user = await authService.loginWithGoogle(account, role);
      setOpen(false);
      toast(`Welcome, ${user.name.split(" ")[0]}!`);
      router.push(redirectTo);
    } catch {
      toast("Google sign-in failed. Try again.", "error");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-border bg-white text-sm font-semibold text-foreground hover:bg-muted"
      >
        <GoogleG />
        Continue with Google
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Choose an account" className="sm:max-w-xs">
        <p className="text-xs text-muted-foreground">to continue to Rentlet (demo sign-in)</p>
        <div className="mt-4 flex flex-col gap-2">
          {GOOGLE_DEMO_ACCOUNTS.map((account) => (
            <button
              key={account.id}
              type="button"
              onClick={() => choose(account)}
              disabled={loadingId !== null}
              className="flex w-full items-center gap-3 rounded-xl border border-border p-3 text-left hover:bg-muted disabled:opacity-60"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-navy-light text-sm font-bold text-brand-navy">
                {initials(account.name)}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-foreground">{account.name}</span>
                <span className="block truncate text-xs text-muted-foreground">{account.email}</span>
              </span>
              {loadingId === account.id && (
                <span className="ml-auto text-xs font-medium text-muted-foreground">Signing in…</span>
              )}
            </button>
          ))}
        </div>
        <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
          This demo skips real Google OAuth — Phase 12 wires Firebase Auth&apos;s actual Google
          provider here.
        </p>
      </Modal>
    </>
  );
}

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path fill="#4285F4" d="M23.5 12.27c0-.82-.07-1.42-.22-2.05H12v3.72h6.5c-.13 1.06-.84 2.66-2.42 3.73l-.02.15 3.52 2.7.24.02c2.24-2.05 3.68-5.08 3.68-8.27" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.06 7.93-2.88l-3.78-2.92c-1 .7-2.36 1.19-4.15 1.19-3.18 0-5.86-2.09-6.82-4.98l-.14.01-3.66 2.82-.05.14C3.35 21.3 7.35 24 12 24" />
      <path fill="#FBBC05" d="M5.18 14.41A7.4 7.4 0 0 1 4.77 12c0-.84.15-1.65.4-2.41l-.01-.16-3.7-2.87-.12.06A11.98 11.98 0 0 0 0 12c0 1.93.47 3.76 1.34 5.38l3.84-2.97" />
      <path fill="#EA4335" d="M12 4.75c2.25 0 3.77.97 4.64 1.78l3.39-3.31C17.94 1.19 15.24 0 12 0 7.35 0 3.35 2.7 1.34 6.62l3.83 2.97C6.14 6.7 8.82 4.75 12 4.75" />
    </svg>
  );
}
