"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MailCheck } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { authService } from "@/lib/services/auth.service";
import { toast } from "@/lib/toast";

/** Shown wherever an email/password account must confirm its address before continuing
 *  (property pages, the post-property wizard, /verify-email itself). Signup already emails a
 *  6-digit code by the time this renders (see auth.service.ts's registerWithEmail), so this
 *  goes straight to "enter the code", mirroring the phone-OTP flow. Pass `bare` when the caller
 *  already provides its own page container (e.g. inside AuthShell). */
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
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Seconds left before "Resend code" unlocks (60s countdown after each send) — same pattern
  // as PhoneOtpForm.
  const [resendIn, setResendIn] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (resendIn <= 0) return;
    timerRef.current = setInterval(() => {
      setResendIn((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resendIn > 0]); // eslint-disable-line react-hooks/exhaustive-deps -- restart only when the countdown toggles on/off

  async function resend() {
    setResending(true);
    setError(null);
    try {
      await authService.resendEmailVerification();
      setResendIn(60);
      toast(`Verification code sent to ${email}.`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't send the code.");
    } finally {
      setResending(false);
    }
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setVerifying(true);
    try {
      const verified = await authService.verifyEmailOtp(code);
      if (verified) {
        toast("Email confirmed! Welcome to Rentlet.");
        router.push(next);
      } else {
        setError("Incorrect code. Try again.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't verify that code.");
    } finally {
      setVerifying(false);
    }
  }

  const content = (
    <EmptyState
      icon={MailCheck}
      title="Confirm your email to continue"
      description={`Enter the 6-digit code we sent to ${email}.`}
      className={bare ? "border-none bg-transparent px-0 py-0" : undefined}
      action={
        <form onSubmit={verify} className="mx-auto flex w-full max-w-xs flex-col items-center gap-2.5">
          <Input
            inputMode="numeric"
            maxLength={6}
            placeholder="6-digit code"
            value={code}
            onChange={(ev) => setCode(ev.target.value.replace(/\D/g, "").slice(0, 6))}
            error={error ?? undefined}
            className="w-full text-center text-lg tracking-[0.3em]"
          />
          <Button type="submit" disabled={verifying || code.length < 6} size="lg" className="w-full">
            {verifying ? "Verifying..." : "Verify & Continue"}
          </Button>
          <p className="text-xs text-muted-foreground">
            {resendIn > 0 ? (
              <>
                Didn&apos;t get it? Resend in <span className="font-semibold tabular-nums">0:{String(resendIn).padStart(2, "0")}</span>
              </>
            ) : (
              <>
                Didn&apos;t get the code?{" "}
                <button
                  type="button"
                  onClick={resend}
                  disabled={resending}
                  className="font-semibold text-brand-navy hover:underline disabled:opacity-50"
                >
                  {resending ? "Resending…" : "Resend code"}
                </button>
              </>
            )}
          </p>
        </form>
      }
    />
  );

  return bare ? content : <div className="container-rentlet py-16">{content}</div>;
}
