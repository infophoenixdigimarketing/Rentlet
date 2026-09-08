import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { MethodTabs } from "@/components/auth/MethodTabs";
import { EmailLoginForm } from "@/components/auth/EmailLoginForm";
import { PhoneOtpForm } from "@/components/auth/PhoneOtpForm";
import { GoogleButton } from "@/components/auth/GoogleButton";

export const metadata: Metadata = { title: "Login" };

// Only allow same-origin path redirects (e.g. "/post-property") — never an absolute URL.
function safeNext(value: string | string[] | undefined): string {
  const v = Array.isArray(value) ? value[0] : value;
  return v && v.startsWith("/") && !v.startsWith("//") ? v : "/";
}

export default async function LoginPage(props: PageProps<"/login">) {
  const next = safeNext((await props.searchParams).next);

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Login to manage your properties, favorites and visits."
      footer={
        <>
          New to Rentlet?{" "}
          <Link href="/register" className="font-semibold text-brand-navy hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <MethodTabs
        tabs={[
          { id: "phone", label: "Mobile OTP", content: <PhoneOtpForm redirectTo={next} /> },
          { id: "email", label: "Email", content: <EmailLoginForm redirectTo={next} /> },
        ]}
      />

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium text-muted-foreground">OR</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <GoogleButton redirectTo={next} />
    </AuthShell>
  );
}
