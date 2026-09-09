import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { BackButton } from "@/components/auth/BackButton";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-muted py-10">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-brand-navy-dark"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(255,90,0,0.3), transparent 40%), radial-gradient(circle at 85% 0%, rgba(10,79,158,0.55), transparent 45%)",
        }}
        aria-hidden
      />
      <div className="relative w-full max-w-md px-4">
        <BackButton />
        <div className="mb-5 flex justify-center sm:mb-6">
          <Link href="/" aria-label="Rentlet home">
            <Logo className="h-20 w-20 rounded-full shadow-xl shadow-black/20 sm:h-28 sm:w-28" />
          </Link>
        </div>
        <div className="rounded-2xl border border-border bg-white p-5 shadow-xl shadow-black/10 sm:p-8">
          <h1 className="text-lg font-extrabold text-foreground sm:text-xl">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-5 sm:mt-6">{children}</div>
        </div>
        {footer && <div className="mt-5 text-center text-sm text-foreground/70">{footer}</div>}
      </div>
    </div>
  );
}
