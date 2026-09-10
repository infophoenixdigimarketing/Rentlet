"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/services/auth.service";
import { toast } from "@/lib/toast";
import type { UserRole } from "@/types/user";

export function GoogleButton({
  redirectTo = "/",
  role,
}: {
  redirectTo?: string;
  /** From the register flow — sets the account's role (owner / agent / builder / …) on first sign-in. */
  role?: UserRole;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function signIn() {
    setLoading(true);
    try {
      const user = await authService.loginWithGoogle(undefined, role);
      toast(`Welcome, ${user.name.split(" ")[0]}!`);
      router.push(redirectTo);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Google sign-in failed. Try again.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={signIn}
      disabled={loading}
      className="inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-border bg-white text-sm font-semibold text-foreground hover:bg-muted disabled:opacity-60"
    >
      <GoogleG />
      {loading ? "Opening Google…" : "Continue with Google"}
    </button>
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
