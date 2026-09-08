import Link from "next/link";
import { MessagesSquare } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Direct owner↔tenant chat is disabled — a RENTLET relationship manager works every enquiry.
export default function OwnerMessagesPage() {
  return (
    <div className="py-10">
      <EmptyState
        icon={MessagesSquare}
        title="Messaging isn't available"
        description="A RENTLET relationship manager handles every enquiry on your listings. Track them under Leads."
        action={
          <Link href="/owner/leads" className={cn(buttonVariants({ variant: "primary", size: "md" }))}>
            View enquiries
          </Link>
        }
      />
    </div>
  );
}
