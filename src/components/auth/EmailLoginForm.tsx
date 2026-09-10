"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { authService } from "@/lib/services/auth.service";
import { toast } from "@/lib/toast";

export function EmailLoginForm({ redirectTo = "/" }: { redirectTo?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await authService.loginWithEmail(email, password);
      toast(`Welcome back, ${user.name.split(" ")[0]}!`);
      router.push(redirectTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <Input label="Email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      <div>
        <Input label="Password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" error={error ?? undefined} />
        <Link href="/forgot-password" className="mt-1.5 inline-block text-xs font-semibold text-brand-navy hover:underline">
          Forgot password?
        </Link>
      </div>
      <Button type="submit" size="lg" disabled={loading}>
        {loading ? "Signing in..." : "Login"}
      </Button>
    </form>
  );
}
