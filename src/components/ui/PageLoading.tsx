import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/** Neutral placeholder shown while auth is still confirming who's signed in (see useAuth's
 *  `loading`) — avoids flashing the logged-out screen on every refresh before the real one
 *  takes over. */
export function PageLoading({ className }: { className?: string }) {
  return (
    <div className={cn("flex min-h-[50vh] items-center justify-center", className)}>
      <Loader2 className="h-6 w-6 animate-spin text-brand-navy/60" />
    </div>
  );
}
