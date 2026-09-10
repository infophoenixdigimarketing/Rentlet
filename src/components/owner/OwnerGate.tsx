"use client";

import Link from "next/link";
import { Building2, LogIn } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { EmptyState } from "@/components/ui/EmptyState";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const OWNER_ROLES = ["owner", "agent", "builder"];

export function OwnerGate({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

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
          description={`You're signed in as a ${user.role}. Register a listing account to access leads, visits and analytics.`}
          action={
            <Link
              href="/register?next=/owner/dashboard"
              className={cn(buttonVariants({ variant: "primary", size: "md" }))}
            >
              Create a listing account
            </Link>
          }
        />
      </div>
    );
  }

  return <>{children}</>;
}
