"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { EmptyState } from "@/components/ui/EmptyState";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function UserGate({
  children,
  title = "Login required",
  description = "Sign in to manage your favorites, saved searches and visits.",
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
}) {
  const { user } = useAuth();
  const pathname = usePathname();

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

  return <>{children}</>;
}
