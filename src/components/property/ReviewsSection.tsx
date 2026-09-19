"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter, usePathname } from "next/navigation";
import { MessageSquareText, Star, UserCircle2 } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useAuth } from "@/lib/auth";
import { reviewsService } from "@/lib/services/reviews.service";
import { timeAgo, cn } from "@/lib/utils";
import type { Review } from "@/types/review";

const EMPTY_REVIEWS: Review[] = [];

function StarPicker({ value, onChange }: { value: number; onChange: (rating: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`${n} star${n === 1 ? "" : "s"}`}
          onClick={() => onChange(n)}
          className="p-0.5"
        >
          <Star
            className={cn("h-7 w-7 transition-colors", n <= value ? "fill-brand-orange text-brand-orange" : "text-border")}
          />
        </button>
      ))}
    </div>
  );
}

function StarRow({ rating, size = "h-3.5 w-3.5" }: { rating: number; size?: string }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={cn(size, n <= Math.round(rating) ? "fill-brand-orange text-brand-orange" : "text-border")} />
      ))}
    </div>
  );
}

export function ReviewsSection({ propertyId }: { propertyId: string }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reviews = useSyncExternalStore(
    (onChange) => reviewsService.subscribe(propertyId, onChange),
    () => reviewsService.getForProperty(propertyId),
    () => EMPTY_REVIEWS
  );

  const average = reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  function openWriteReview() {
    if (!user) {
      router.push(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }
    setError(null);
    setRating(0);
    setComment("");
    setOpen(true);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) return setError("Choose a star rating to continue.");
    setSubmitting(true);
    setError(null);
    try {
      await reviewsService.add(propertyId, rating, comment.trim());
      setOpen(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't post your review — try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {reviews.length === 0 ? (
        <EmptyState
          icon={MessageSquareText}
          title="No reviews yet"
          description="Be the first to share your experience after visiting or moving into this property."
          action={
            <button type="button" onClick={openWriteReview} className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
              Write a Review
            </button>
          }
        />
      ) : (
        <div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <StarRow rating={average} size="h-4 w-4" />
              <span className="text-sm font-semibold text-foreground">
                {average.toFixed(1)} · {reviews.length} review{reviews.length === 1 ? "" : "s"}
              </span>
            </div>
            <button type="button" onClick={openWriteReview} className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
              Write a Review
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            {reviews.map((r) => (
              <div key={r.id} className="rounded-xl border border-border bg-white p-4">
                <div className="flex items-start gap-3">
                  <UserCircle2 className="h-9 w-9 shrink-0 text-muted-foreground" strokeWidth={1.5} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-foreground">{r.userName}</span>
                      <span className="shrink-0 text-xs text-muted-foreground">{timeAgo(r.createdAt)}</span>
                    </div>
                    <StarRow rating={r.rating} />
                    {r.comment && <p className="mt-1.5 text-sm text-muted-foreground">{r.comment}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Write a Review">
        <form onSubmit={submit} className="flex flex-col gap-4">
          <div>
            <p className="mb-1.5 text-xs font-semibold text-foreground">Your rating</p>
            <StarPicker value={rating} onChange={setRating} />
          </div>
          <div>
            <label htmlFor="review-comment" className="mb-1.5 block text-xs font-semibold text-foreground">
              Your review (optional)
            </label>
            <textarea
              id="review-comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share what it was like visiting or living here..."
              className="w-full resize-y rounded-xl border border-border bg-white px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand-navy"
            />
          </div>
          {error && <p className="text-xs font-medium text-red-600">{error}</p>}
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? "Posting..." : "Post Review"}
          </Button>
        </form>
      </Modal>
    </>
  );
}
