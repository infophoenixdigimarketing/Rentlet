"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { authService } from "@/lib/services/auth.service";
import { toast } from "@/lib/toast";
import type { UserRole } from "@/types/user";

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

  async function sendOtp() {
    if (phone.length !== 10) {
      setError("Mobile number must be exactly 10 digits.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await authService.sendOtp(phone);
      setStage("otp");
      toast(`OTP sent to ${phone}. Use 123456 for this demo.`, "info");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Couldn't send OTP. Try again.";
      setError(
        msg.includes("configuration-not-found")
          ? "Phone sign-in isn't enabled for this Firebase project yet. Enable Authentication → Sign-in method → Phone, or use email/Google."
          : msg
      );
    } finally {
      setLoading(false);
    }
  }

  async function verify() {
    setError(null);
    setLoading(true);
    try {
      const user = await authService.verifyOtp(phone, code, newUser);
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
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Code sent to {phone}.{" "}
        <button type="button" onClick={() => setStage("phone")} className="font-semibold text-brand-navy hover:underline">
          Change
        </button>
      </p>
      <Input
        label="Enter OTP"
        inputMode="numeric"
        maxLength={6}
        placeholder="123456"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        error={error ?? undefined}
      />
      <Button onClick={verify} disabled={loading || code.length < 6} size="lg">
        {loading ? "Verifying..." : "Verify & Continue"}
      </Button>
    </div>
  );
}
