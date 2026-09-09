"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { authService } from "@/lib/services/auth.service";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { toast } from "@/lib/toast";
import type { UserRole } from "@/types/user";

// No Firebase keys => the mock auth provider is in use: it never sends a real SMS and accepts
// the fixed code 123456. Say so plainly instead of leaving "123456" as a mystery placeholder.
const DEMO_MODE = !isFirebaseConfigured();

export function PhoneOtpForm({
  redirectTo = "/",
  newUser,
}: {
  redirectTo?: string;
  /** pass name+role (+ optional email) when this form is used inside registration, so a brand-new phone creates that role */
  newUser?: { name: string; role: UserRole; email?: string };
}) {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [stage, setStage] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Firebase phone auth needs an E.164 number (+<country><number>); the field only collects
  // the 10-digit Indian subscriber number, so prefix +91 before handing it to the service.
  const e164 = `+91${phone}`;

  async function sendOtp() {
    if (phone.length !== 10) {
      setError("Mobile number must be exactly 10 digits.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await authService.sendOtp(e164);
      setStage("otp");
      toast(DEMO_MODE ? "Demo mode — enter code 123456 (no SMS sent)." : `OTP sent to +91 ${phone}.`, "info");
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
      toast(`Welcome${newUser ? "" : " back"}, ${user.name.split(" ")[0]}!`);
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
        <Input
          label="Mobile Number"
          type="tel"
          inputMode="numeric"
          maxLength={10}
          placeholder="9876543210"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
          error={error ?? undefined}
        />
        <Button onClick={sendOtp} disabled={loading || phone.length !== 10} size="lg">
          {loading ? "Sending..." : "Send OTP"}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />{" "}
        {DEMO_MODE ? `Demo — no SMS sent to ${phone}.` : `Code sent to +91 ${phone}.`}{" "}
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
