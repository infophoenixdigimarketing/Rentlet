import type { Metadata } from "next";
import Link from "next/link";
import { MessagesSquare } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Messages" };

// Managed-brokerage model: house-seekers don't chat with owners. A RENTLET agent handles
// every enquiry, so direct messaging is turned off.
export default function MessagesPage() {
  return (
    <div className="container-rentlet py-16">
      <EmptyState
        icon={MessagesSquare}
        title="Messaging isn't available"
        description="A RENTLET agent handles every enquiry directly — request a callback from any property page and a manager will call you."
        action={
          <Link href="/properties" className={cn(buttonVariants({ variant: "primary", size: "md" }))}>
            Browse properties
          </Link>
        }
      />
    </div>
  );
}
