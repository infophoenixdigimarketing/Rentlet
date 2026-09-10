"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { adminAuthService } from "@/lib/services/admin-auth.service";
import { toast } from "@/lib/toast";

export default function AdminLoginPage() {
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
      await adminAuthService.login(email, password);
      toast("Welcome back, Admin.");
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-navy-dark px-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white p-8 shadow-2xl">
        <div className="flex justify-center">
          <Logo className="h-11" />
        </div>
        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wide text-brand-navy">
          <ShieldCheck className="h-3.5 w-3.5" /> Admin Console
        </div>

        <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
          <Input label="Admin Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@gmail.com" />
          <Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            error={error ?? undefined}
          />
          <Button type="submit" size="lg" disabled={loading}>
            {loading ? "Signing in..." : "Login to Console"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => {
            setEmail("admin@gmail.com");
            setPassword("123456");
            setError(null);
          }}
          className="mt-3 w-full rounded-lg border border-dashed border-border py-2 text-xs font-semibold text-brand-navy hover:bg-brand-navy-light/50"
        >
          Fill credentials
        </button>

        <p className="mt-5 text-center text-[11px] text-muted-foreground">
          Console access: admin@gmail.com / 123456
        </p>
      </div>
    </div>
  );
}
