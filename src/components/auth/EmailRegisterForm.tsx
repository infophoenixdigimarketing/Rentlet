"use client";
  
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { authService } from "@/lib/services/auth.service";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { WELCOME_KEY } from "@/components/layout/WelcomeBanner";
import { toast } from "@/lib/toast";
import type { AuthUser, UserRole } from "@/types/user";

function greet(text: string) {
  try {
    window.sessionStorage.setItem(WELCOME_KEY, text);
  } catch {
    /* fall back to the toast */
  }
}

// An email/password account that hasn't confirmed yet gets routed to the confirmation
// screen instead of straight through — phone/Google accounts never hit this (see AuthUser).
function destinationFor(user: AuthUser, redirectTo: string): string {
  return user.email && !user.emailVerified ? `/verify-email?next=${encodeURIComponent(redirectTo)}` : redirectTo;
}

export function EmailRegisterForm({
  role,
  redirectTo = "/",
  name: externalName,
  email: externalEmail,
}: {
  role: UserRole;
  redirectTo?: string;
  /** when set (e.g. collected earlier in a wizard step), the internal Name field is hidden */
  name?: string;
  /** email, collected earlier in the wizard — when set the internal Email field is hidden */
  email?: string;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const effectiveName = externalName ?? name;
  const [email, setEmail] = useState("");
  const effectiveEmail = externalEmail ?? email;
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!effectiveEmail.trim()) {
      setError("Enter your email above.");
      return;
    }
    // Email accounts otherwise have no phone on file at all — required so a RENTLET manager can
    // always call back about a visit or listing, the same way a phone-OTP account already works.
    if (!/^\d{10}$/.test(phone)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const user = await authService.registerWithEmail({
        name: effectiveName,
        email: effectiveEmail,
        password,
        role,
        phone: `+91${phone}`,
      });
      const first = user.name.split(" ")[0] || "there";
      greet(
        isFirebaseConfigured()
          ? `Welcome to Rentlet, ${first}! We've emailed a verification link to ${effectiveEmail} — confirm it to secure your account.`
          : `Welcome to Rentlet, ${first}! Your account is ready.`
      );
      toast(`Welcome to Rentlet, ${first}!`);
      router.push(destinationFor(user, redirectTo));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      // Mock mode only: the register form is prefilled with a demo account (fixed password) for
      // each intent, so if that email already exists, retrying as a sign-in always succeeds and
      // feels seamless. With real Firebase accounts the typed password is the user's own guess,
      // not a known demo one — silently attempting to log in with it just turns "this email is
      // already registered" into a confusing "incorrect password" when it (almost always) fails.
      if (!isFirebaseConfigured() && /already exists/i.test(message)) {
        try {
          const user = await authService.loginWithEmail(effectiveEmail, password);
          const first = user.name.split(" ")[0] || "there";
          greet(`Welcome back, ${first}! Good to see you again.`);
          toast(`Welcome back, ${first}!`);
          router.push(destinationFor(user, redirectTo));
          return;
        } catch (loginErr) {
          setError(loginErr instanceof Error ? loginErr.message : message);
          return;
        }
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      {externalName == null && (
        <Input label="Full Name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
      )}
      {externalEmail == null && (
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      )}
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-foreground/80">Phone Number</span>
        <span className="flex items-stretch">
          <span className="flex h-11 shrink-0 items-center rounded-l-xl border border-r-0 border-border bg-muted px-3 text-sm font-semibold text-foreground">
            +91
          </span>
          <input
            type="tel"
            inputMode="numeric"
            required
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="9876543210"
            className="h-11 w-full rounded-r-xl border border-border bg-white px-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand-navy"
          />
        </span>
      </label>
      <Input
        label="Password"
        type="password"
        autoComplete="new-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="At least 6 characters"
        error={error ?? undefined}
      />
      <Button type="submit" size="lg" disabled={loading}>
        {loading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
}
