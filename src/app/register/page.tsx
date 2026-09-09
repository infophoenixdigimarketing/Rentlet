import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterWizard } from "@/components/auth/RegisterWizard";

export const metadata: Metadata = { title: "Create Account" };

// Only allow same-origin path redirects (e.g. "/post-property") — never an absolute URL.
function safeNext(value: string | string[] | undefined): string {
  const v = Array.isArray(value) ? value[0] : value;
  return v && v.startsWith("/") && !v.startsWith("//") ? v : "/";
}

export default async function RegisterPage(props: PageProps<"/register">) {
  const next = safeNext((await props.searchParams).next);

  return (
    <AuthShell
      title="Join Rentlet"
      subtitle="Your space, your choice — create an account to get started."
      showBack={false}
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
      <RegisterWizard redirectTo={next} />
    </AuthShell>
  );
}
