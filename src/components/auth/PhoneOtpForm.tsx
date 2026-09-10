"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { authService } from "@/lib/services/auth.service";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { WELCOME_KEY } from "@/components/layout/WelcomeBanner";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types/user";

// No Firebase keys => the mock auth provider is in use: it never sends a real SMS and accepts
// the fixed code 123456. Say so plainly instead of leaving "123456" as a mystery placeholder.
const DEMO_MODE = !isFirebaseConfigured();

const COUNTRY_CODES = [
  { code: "+91", label: "🇮🇳 +91" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+971", label: "🇦🇪 +971" },
  { code: "+65", label: "🇸🇬 +65" },
  { code: "+61", label: "🇦🇺 +61" },
  { code: "+49", label: "🇩🇪 +49" },
  { code: "+92", label: "🇵🇰 +92" },
  { code: "+880", label: "🇧🇩 +880" },
  { code: "+94", label: "🇱🇰 +94" },
  { code: "+977", label: "🇳🇵 +977" },
];

export function PhoneOtpForm({
  redirectTo = "/",
  newUser,
}: {
  redirectTo?: string;
  /** pass name+role (+ optional email) when this form is used inside registration, so a brand-new phone creates that role */
  newUser?: { name: string; role: UserRole; email?: string };
}) {
  const router = useRouter();
  const [dialCode, setDialCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [stage, setStage] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // +91 numbers are exactly 10 digits; other codes accept 6–14.
  const maxLen = dialCode === "+91" ? 10 : 14;
  const phoneOk = dialCode === "+91" ? phone.length === 10 : phone.length >= 6 && phone.length <= 14;
  // Firebase phone auth needs an E.164 number (+<country><subscriber>).
  const e164 = `${dialCode}${phone}`;
  const displayNumber = `${dialCode} ${phone}`;

  function changePhone(value: string) {
    setPhone(value.replace(/\D/g, "").slice(0, maxLen));
  }

  function changeDial(value: string) {
    setDialCode(value);
    setPhone((p) => p.slice(0, value === "+91" ? 10 : 14));
  }

  async function sendOtp() {
    if (!phoneOk) {
      setError(dialCode === "+91" ? "Mobile number must be exactly 10 digits." : "Enter a valid number (6–14 digits).");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await authService.sendOtp(e164);
      setStage("otp");
      toast(DEMO_MODE ? "Demo mode — enter code 123456 (no SMS sent)." : `OTP sent to ${displayNumber}.`, "info");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function verify() {
    setError(null);
    setLoading(true);
    try {
      const user = await authService.verifyOtp(e164, code, newUser);
      const first = user.name.split(" ")[0] || "there";
      try {
        window.sessionStorage.setItem(
          WELCOME_KEY,
          newUser ? `Welcome to Rentlet, ${first}! Your account is ready.` : `Welcome back, ${first}! Good to see you again.`
        );
      } catch {
        /* fall back to the toast */
      }
      toast(`Welcome${newUser ? " to Rentlet" : " back"}, ${first}!`);
      router.push(redirectTo);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (stage === "phone") {
    return (
      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-foreground/80">Mobile Number</span>
          <span className="flex items-stretch">
            <select
              aria-label="Country code"
              value={dialCode}
              onChange={(e) => changeDial(e.target.value)}
              className="h-11 shrink-0 rounded-l-xl border border-r-0 border-border bg-muted px-2 text-sm font-semibold text-foreground outline-none focus:border-brand-navy"
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={maxLen}
              placeholder={dialCode === "+91" ? "9876543210" : "Mobile number"}
              value={phone}
              onChange={(e) => changePhone(e.target.value)}
              aria-invalid={Boolean(error)}
              className={cn(
                "h-11 w-full rounded-r-xl border border-border bg-white px-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand-navy",
                error && "border-red-400 focus:border-red-500"
              )}
            />
          </span>
          {error && <span className="text-xs font-medium text-red-600">{error}</span>}
        </label>
        <Button onClick={sendOtp} disabled={loading || !phoneOk} size="lg">
          {loading ? "Sending..." : "Send OTP"}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />{" "}
        {DEMO_MODE ? `Demo — no SMS sent to ${displayNumber}.` : `Code sent to ${displayNumber}.`}{" "}
        <button type="button" onClick={() => setStage("phone")} className="font-semibold text-brand-navy hover:underline">
          Change
        </button>
      </p>
      <Input
        label="Enter OTP"
        inputMode="numeric"
        maxLength={6}
        placeholder={DEMO_MODE ? "123456" : "6-digit code"}
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
        error={error ?? undefined}
      />
      {DEMO_MODE && (
        <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
          This site isn&apos;t connected to an SMS service yet, so real OTPs aren&apos;t sent.
          Enter <strong>123456</strong> to continue, or use Email / Google.
        </p>
      )}
      <Button onClick={verify} disabled={loading || code.length < 6} size="lg">
        {loading ? "Verifying..." : "Verify & Continue"}
      </Button>
    </div>
  );
}
