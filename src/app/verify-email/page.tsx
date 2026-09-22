"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { MailCheck, XCircle } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { EmailVerifyGate } from "@/components/auth/EmailVerifyGate";
import { EmptyState } from "@/components/ui/EmptyState";
import { buttonVariants } from "@/components/ui/Button";
import { authService } from "@/lib/services/auth.service";
import { notifyLogin } from "@/lib/notify-login";
import { toast } from "@/lib/toast";
import { useAuth } from "@/lib/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { cn } from "@/lib/utils";

// Only allow same-origin path redirects — never an absolute URL.
function safeNext(value: string | null): string {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/";
}

/** Reached when the emailed link has an ?oobCode= attached (handleCodeInApp: true in
 *  auth.service.ts's sendVerificationLink) — completes verification right here instead of on
 *  Firebase's own generic hosted page, so the welcome email fires reliably in the tab that
 *  actually does the clicking, not dependent on some other tab still being open and polling. */
function ConfirmFromCode({ oobCode, next }: { oobCode: string; next: string }) {
  const router = useRouter();
  const [state, setState] = useState<"checking" | "done" | "error">("checking");
  const [error, setError] = useState<string | null>(null);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    (async () => {
      try {
        const { email } = await authService.confirmEmailFromCode(oobCode);
        setState("done");
        toast("Email confirmed! Welcome to Rentlet.");
        // Best-effort real name if this happens to be the same signed-in session as signup;
        // otherwise fall back to the email's local part — same pattern EmailVerifyGate uses.
        const name = getFirebaseAuth().currentUser?.displayName?.split(" ")[0] || email.split("@")[0];
        void notifyLogin({ email, name, isNewAccount: true });
        setTimeout(() => router.push(next), 1500);
      } catch (e) {
        setState("error");
        setError(e instanceof Error ? e.message : "This verification link is invalid or has expired.");
      }
    })();
  }, [oobCode, next, router]);

  if (state === "checking") {
    return <EmptyState icon={MailCheck} title="Confirming your email..." description="One moment." className="border-none bg-transparent px-0 py-0" />;
  }
  if (state === "error") {
    return (
      <EmptyState
        icon={XCircle}
        title="Link expired or already used"
        description={error ?? "Request a fresh one from the login page and try again."}
        className="border-none bg-transparent px-0 py-0"
        action={
          <Link href="/login" className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
            Back to login
          </Link>
        }
      />
    );
  }
  return (
    <EmptyState icon={MailCheck} title="Email confirmed!" description="Taking you in now..." className="border-none bg-transparent px-0 py-0" />
  );
}

function VerifyEmailContent() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = safeNext(params.get("next"));
  const oobCode = params.get("mode") === "verifyEmail" ? params.get("oobCode") : null;

  useEffect(() => {
    if (oobCode) return; // the code-confirm branch below handles its own routing
    if (!user) {
      router.replace(`/login?next=${encodeURIComponent("/verify-email")}`);
      return;
    }
    // Nothing to confirm (phone/Google account, or already verified) — this page isn't for them.
    if (!user.email || user.emailVerified) router.replace(next);
  }, [user, next, router, oobCode]);

  if (oobCode) {
    return (
      <AuthShell title="Confirm your email" subtitle="Finishing up." showBack={false}>
        <ConfirmFromCode oobCode={oobCode} next={next} />
      </AuthShell>
    );
  }

  if (!user || !user.email || user.emailVerified) return null;

  return (
    <AuthShell title="Confirm your email" subtitle="One more step before you're in." showBack={false}>
      <EmailVerifyGate email={user.email} next={next} bare />
    </AuthShell>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailContent />
    </Suspense>
  );
}
