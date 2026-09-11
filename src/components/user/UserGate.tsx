"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogIn, Building2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { authService } from "@/lib/services/auth.service";
import { EmptyState } from "@/components/ui/EmptyState";
import { buttonVariants } from "@/components/ui/Button";
import { EmailVerifyGate } from "@/components/auth/EmailVerifyGate";
import { cn } from "@/lib/utils";

const LISTER_ROLES = ["owner", "agent", "builder"];

export function UserGate({
  children,
  title = "Login required",
  description = "Sign in to manage your favorites, saved searches and visits.",
  blockListers = false,
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
  /** When true, an owner/agent/builder account is stopped here too — mirrors the
   *  "looking for property" account being unable to post on /post-property. */
  blockListers?: boolean;
}) {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  if (!user) {
    const next = pathname ? `?next=${encodeURIComponent(pathname)}` : "";
    return (
      <div className="container-rentlet py-16">
        <EmptyState
          icon={LogIn}
          title={title}
          description={description}
          action={
            <Link href={`/login${next}`} className={cn(buttonVariants({ variant: "primary", size: "md" }))}>
              Login to continue
            </Link>
          }
        />
      </div>
    );
  }

  // Email/password accounts must confirm their address before anything gated is usable.
  if (user.email && !user.emailVerified) {
    return <EmailVerifyGate email={user.email} next={pathname ?? "/"} />;
  }

  if (blockListers && LISTER_ROLES.includes(user.role)) {
    async function switchAccount() {
      await authService.logout();
      router.push(`/login${pathname ? `?next=${encodeURIComponent(pathname)}` : ""}`);
    }
    return (
      <div className="container-rentlet py-16">
        <EmptyState
          icon={Building2}
          title="This account is for listing"
          description="You signed in as an owner, agent or builder, so you can manage your listings but not browse properties. To explore properties, sign in with an account that's looking for property."
          action={
            <div className="flex flex-col items-center gap-2.5">
              <button type="button" onClick={switchAccount} className={cn(buttonVariants({ variant: "primary", size: "md" }))}>
                Sign in to explore properties
              </button>
              <Link href="/owner/dashboard" className={cn(buttonVariants({ variant: "outline", size: "md" }))}>
                Go to my dashboard instead
              </Link>
            </div>
          }
        />
      </div>
    );
  }

  return <>{children}</>;
}
