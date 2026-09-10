"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Headset } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { staffAuthService } from "@/lib/services/staff-auth.service";
import { toast } from "@/lib/toast";

export default function StaffLoginPage() {
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
      const staff = await staffAuthService.login(email, password);
      toast(`Welcome, ${staff.name.split(" ")[0]}.`);
      router.push("/staff/pipeline");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-navy px-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white p-8 shadow-2xl">
        <div className="flex justify-center">
          <Logo className="h-11" />
        </div>
        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wide text-brand-navy">
          <Headset className="h-3.5 w-3.5" /> Staff Console
        </div>

        <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
          <Input
            label="Staff Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="staff@rentlet.in"
          />
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
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="mt-5 text-center text-[11px] text-muted-foreground">
          Staff access: staff@rentlet.in / RentletStaff@123
        </p>
      </div>
    </div>
  );
}
