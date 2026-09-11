"use client";

import Link from "next/link";
import { Building2, LogIn } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { EmptyState } from "@/components/ui/EmptyState";
import { buttonVariants } from "@/components/ui/Button";
import { PageLoading } from "@/components/ui/PageLoading";
import { cn } from "@/lib/utils";

const OWNER_ROLES = ["owner", "agent", "builder"];

export function OwnerGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  // Don't flash "please log in" for an already-signed-in owner while Firebase confirms the
  // session on refresh.
  if (loading) return <PageLoading />;

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
