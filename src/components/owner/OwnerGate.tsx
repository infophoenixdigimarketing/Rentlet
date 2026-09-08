"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, LogIn } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { authService } from "@/lib/services/auth.service";
import { EmptyState } from "@/components/ui/EmptyState";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";

const OWNER_ROLES = ["owner", "agent", "builder"];

export function OwnerGate({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <div className="container-rentlet py-16">
        <EmptyState
          icon={LogIn}
          title="Login required"
          description="Sign in to manage your property listings, leads and visits."
          action={
            <Link href="/login" className={cn(buttonVariants({ variant: "primary", size: "md" }))}>
              Login to continue
            </Link>
          }
        />
      </div>
    );
  }

  if (!OWNER_ROLES.includes(user.role)) {
    return (
      <div className="container-rentlet py-16">
        <EmptyState
          icon={Building2}
          title="This area is for owners, agents & builders"
          description={`You're signed in as a ${user.role}. Switch to the demo owner account to explore leads, visits and analytics.`}
          action={
            <button
              type="button"
              onClick={async () => {
                await authService.loginWithEmail("demo.owner@rentlet.in", "rentlet123");
                toast("Switched to the demo owner account");
                router.refresh();
              }}
              className={cn(buttonVariants({ variant: "primary", size: "md" }))}
            >
              Continue as demo owner
            </button>
          }
        />
      </div>
    );
  }

  return <>{children}</>;
}
