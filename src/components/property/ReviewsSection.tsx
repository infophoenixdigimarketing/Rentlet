import { MessageSquareText } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// No reviews collection wired yet (docs/01-database-schema.md `reviews`) — premium empty state
// per spec §52 instead of a bare "no reviews" line.
export function ReviewsSection() {
  return (
    <EmptyState
      icon={MessageSquareText}
      title="No reviews yet"
      description="Be the first to share your experience after visiting or moving into this property."
      action={
        <button type="button" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
          Write a Review
        </button>
      }
    />
  );
}
