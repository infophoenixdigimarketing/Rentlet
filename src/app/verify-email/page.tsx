"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { EmailVerifyGate } from "@/components/auth/EmailVerifyGate";
import { useAuth } from "@/lib/auth";

// Only allow same-origin path redirects — never an absolute URL.
function safeNext(value: string | null): string {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/";
}

function VerifyEmailContent() {
  const { user } = useAuth();
  const router = useRouter();
  const next = safeNext(useSearchParams().get("next"));

  useEffect(() => {
    if (!user) {
      router.replace(`/login?next=${encodeURIComponent("/verify-email")}`);
      return;
    }
    // Nothing to confirm (phone/Google account, or already verified) — this page isn't for them.
    if (!user.email || user.emailVerified) router.replace(next);
  }, [user, next, router]);

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
