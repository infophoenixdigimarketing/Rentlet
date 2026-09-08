"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { authService } from "@/lib/services/auth.service";
import { toast } from "@/lib/toast";
import type { UserRole } from "@/types/user";

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
      });
      toast(`Welcome to Rentlet, ${user.name.split(" ")[0]}!`);
      router.push(redirectTo);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      // The register form is prefilled with a demo account for each intent — if that email
      // already exists, treat submit as a sign-in instead of erroring.
      if (/already exists/i.test(message)) {
        try {
          const user = await authService.loginWithEmail(effectiveEmail, password);
          toast(`Welcome back, ${user.name.split(" ")[0]}!`);
          router.push(redirectTo);
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
