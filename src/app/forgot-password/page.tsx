"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { KeyRound } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { authService } from "@/lib/services/auth.service";
import { toast } from "@/lib/toast";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [stage, setStage] = useState<"email" | "reset">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendCode(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await authService.sendPasswordResetOtp(email);
      setStage("reset");
      toast(`If an account exists for ${email}, a reset code is on its way.`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't send the code.");
    } finally {
      setLoading(false);
    }
  }

  async function reset(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await authService.confirmPasswordReset(email, code, password);
      toast("Password updated — log in with your new password.");
      router.push("/login");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't reset your password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Reset your password"
      subtitle={
        stage === "email"
          ? "Enter your email and we'll send you a 6-digit code."
          : `Enter the code we sent to ${email}, plus your new password.`
      }
      footer={
        <Link href="/login" className="font-semibold text-brand-navy hover:underline">
          Back to login
        </Link>
      }
    >
      {stage === "email" ? (
        <form onSubmit={sendCode} className="flex flex-col gap-3">
          <Input
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            error={error ?? undefined}
          />
          <Button type="submit" size="lg" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Code"}
          </Button>
        </form>
      ) : (
        <form onSubmit={reset} className="flex flex-col gap-3">
          <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <KeyRound className="h-3.5 w-3.5" />
            <button
              type="button"
              onClick={() => {
                setStage("email");
                setError(null);
              }}
              className="font-semibold text-brand-navy hover:underline"
            >
              Use a different email
            </button>
          </div>
          <Input
            label="6-digit code"
            inputMode="numeric"
            maxLength={6}
            required
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="123456"
            className="text-center text-lg tracking-[0.3em]"
          />
          <Input
            label="New password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            error={error ?? undefined}
          />
          <Button type="submit" size="lg" disabled={loading || code.length < 6 || password.length < 6}>
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
