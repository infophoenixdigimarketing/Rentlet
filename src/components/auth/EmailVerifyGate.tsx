"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MailCheck } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { buttonVariants } from "@/components/ui/Button";
import { authService } from "@/lib/services/auth.service";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

/** Shown wherever an email/password account must confirm its address before continuing
 *  (property pages, the post-property wizard, /verify-email itself). Pass `bare` when the
 *  caller already provides its own page container (e.g. inside AuthShell). */
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
  const [checking, setChecking] = useState(false);
  const [resending, setResending] = useState(false);

  async function checkNow() {
    setChecking(true);
    try {
      const verified = await authService.refreshEmailVerified();
      if (verified) {
        toast("Email confirmed! Welcome to Rentlet.");
        router.push(next);
      } else {
        toast("Not verified yet — check your inbox (and spam folder), then try again.", "info");
      }
    } catch (e) {
      toast(e instanceof Error ? e.message : "Couldn't check right now.", "error");
    } finally {
      setChecking(false);
    }
  }

  async function resend() {
    setResending(true);
    try {
      await authService.resendEmailVerification();
      toast(`Confirmation email sent to ${email}.`);
    } catch (e) {
      toast(e instanceof Error ? e.message : "Couldn't resend right now.", "error");
    } finally {
      setResending(false);
    }
  }

  const content = (
    <EmptyState
      icon={MailCheck}
      title="Confirm your email to continue"
      description={`We've sent a confirmation link to ${email}. Click it, then come back and press "I've confirmed".`}
      className={bare ? "border-none bg-transparent px-0 py-0" : undefined}
      action={
        <div className="flex flex-col items-center gap-2.5">
          <button
            type="button"
            onClick={checkNow}
            disabled={checking}
            className={cn(buttonVariants({ variant: "primary", size: "md" }))}
          >
            {checking ? "Checking..." : "I've confirmed — Continue"}
          </button>
          <button
            type="button"
            onClick={resend}
            disabled={resending}
            className={cn(buttonVariants({ variant: "outline", size: "md" }))}
          >
            {resending ? "Sending..." : "Resend confirmation email"}
          </button>
        </div>
      }
    />
  );

  return bare ? content : <div className="container-rentlet py-16">{content}</div>;
}
