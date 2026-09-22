"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MailCheck, RefreshCw } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { authService } from "@/lib/services/auth.service";
import { notifyLogin } from "@/lib/notify-login";
import { toast } from "@/lib/toast";
import { useAuth } from "@/lib/auth";

/** Shown wherever an email/password account must confirm its address before continuing
 *  (property pages, the post-property wizard, /verify-email itself). Signup already emailed a
 *  verification link by the time this renders (see auth.service.ts's registerWithEmail) — a real
 *  clickable link, not a typed code. Clicking it completes verification on /verify-email itself
 *  (see that page's ConfirmFromCode), possibly in a different tab or device than this one — this
 *  polls refreshEmailVerified() in the background as a fallback so *this* tab also notices and
 *  moves on, without requiring the user to come back and press anything here. Pass `bare` when
 *  the caller already provides its own page container (e.g. inside AuthShell). */
export function EmailVerifyGate({
  email,
  next = "/",
  bare = false,
}: {
  email: string;
  next?: string;
  bare?: boolean;
}) {
  const router = useRouter();
  const { user } = useAuth();
  const [checking, setChecking] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Seconds left before "Resend link" unlocks (60s countdown after each send).
  const [resendIn, setResendIn] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const confirmedOnce = useRef(false);

  useEffect(() => {
    if (resendIn <= 0) return;
    timerRef.current = setInterval(() => {
      setResendIn((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resendIn > 0]); // eslint-disable-line react-hooks/exhaustive-deps -- restart only when the countdown toggles on/off

  async function handleVerified() {
    if (confirmedOnce.current) return;
    confirmedOnce.current = true;
    toast("Email confirmed! Welcome to Rentlet.");
    // Same moment Google/Phone signups already send their welcome email at — client-triggered,
    // since there's no server route of ours in this Firebase-handled link flow to hook into.
    void notifyLogin({ email, name: user?.name?.split(" ")[0] ?? "there", isNewAccount: true });
    router.push(next);
  }

  // Poll in the background — covers clicking the link in another tab or on another device
  // without needing to come back and press a button.
  useEffect(() => {
    const id = setInterval(async () => {
      const verified = await authService.refreshEmailVerified().catch(() => false);
      if (verified) {
        clearInterval(id);
        handleVerified();
      }
    }, 4000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- runs once for the life of this screen
  }, []);

  // Also check right when the tab regains focus — the common case of "clicked the link, switched
  // back to this tab" shouldn't need to wait for the next poll tick.
  useEffect(() => {
    function onFocus() {
      authService
        .refreshEmailVerified()
        .then((verified) => {
          if (verified) handleVerified();
        })
        .catch(() => {});
    }
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function checkNow() {
    setChecking(true);
    setError(null);
    try {
      const verified = await authService.refreshEmailVerified();
      if (verified) {
        handleVerified();
      } else {
        setError("Not verified yet — click the link in the email first.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't check right now.");
    } finally {
      setChecking(false);
    }
  }

  async function resend() {
    setResending(true);
    setError(null);
    try {
      await authService.resendEmailVerification();
      setResendIn(60);
      toast(`Verification link sent to ${email}.`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't send the link.");
    } finally {
      setResending(false);
    }
  }

  const content = (
    <EmptyState
      icon={MailCheck}
      title="Confirm your email to continue"
      description={`We've sent a verification link to ${email}. Click it, then come back here — this page updates automatically.`}
      className={bare ? "border-none bg-transparent px-0 py-0" : undefined}
      action={
        <div className="mx-auto flex w-full max-w-xs flex-col items-center gap-2.5">
          <Button type="button" onClick={checkNow} disabled={checking} size="lg" className="w-full">
            <RefreshCw className={checking ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
            {checking ? "Checking..." : "I've clicked the link — Check now"}
          </Button>
          {error && <p className="text-xs font-medium text-red-600">{error}</p>}
          <p className="text-xs text-muted-foreground">
            {resendIn > 0 ? (
              <>
                Didn&apos;t get it? Resend in <span className="font-semibold tabular-nums">0:{String(resendIn).padStart(2, "0")}</span>
              </>
            ) : (
              <>
                Didn&apos;t get the email?{" "}
                <button
                  type="button"
                  onClick={resend}
                  disabled={resending}
                  className="font-semibold text-brand-navy hover:underline disabled:opacity-50"
                >
                  {resending ? "Resending…" : "Resend link"}
                </button>
              </>
            )}
          </p>
        </div>
      }
    />
  );

  return bare ? content : <div className="container-rentlet py-16">{content}</div>;
}
