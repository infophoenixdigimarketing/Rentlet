import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterWizard } from "@/components/auth/RegisterWizard";

export const metadata: Metadata = { title: "Create Account" };

export default function RegisterPage() {
  return (
    <AuthShell
      title="Join Rentlet"
      subtitle="Your space, your choice — create an account to get started."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-brand-navy hover:underline">
            Login
          </Link>
          <span className="mx-2 text-border">·</span>
          <Link href="/admin/login" className="font-semibold text-muted-foreground hover:text-brand-navy hover:underline">
            Admin panel
          </Link>
        </>
      }
    >
      <RegisterWizard />
    </AuthShell>
  );
}
