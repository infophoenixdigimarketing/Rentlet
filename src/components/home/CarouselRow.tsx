"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// A real horizontal carousel — snap-scrolling track + desktop arrow buttons that scroll by one
// card-width, not just a grid that happens to overflow. Touch/trackpad swipe still works
// natively (it's just a scroll container); the arrows are the desktop-pointer affordance,
// hidden on touch-sized viewports where swipe is the expected gesture.
export function CarouselRow({
  children,
  className,
  fadeFrom = "from-white",
}: {
  children: React.ReactNode;
  className?: string;
  /** Match the section's own background so the fade cue blends in instead of showing a seam
   *  (e.g. "from-muted" on a bg-muted section). Defaults to "from-white". */
  fadeFrom?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  function scroll(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>("[data-carousel-item]")?.offsetWidth ?? 320;
    el.scrollBy({ left: dir * (cardWidth + 24), behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className={cn(
          "no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 lg:mx-0 lg:gap-6 lg:px-0",
          className
        )}
      >
        {children}
      </div>

      {/* Fade-out cue on the trailing edge — the clearest signal that there's more to scroll to,
          independent of whether the visitor notices the arrow button. Purely visual, so it's
          pointer-events-none and never blocks a click on the card underneath. */}
      {canScrollRight && (
        <div
          className={cn("pointer-events-none absolute right-0 top-0 hidden h-[calc(100%-0.5rem)] w-16 bg-gradient-to-l to-transparent lg:block", fadeFrom)}
          aria-hidden
        />
      )}

      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
          className="absolute -left-4 top-[38%] hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white text-brand-navy shadow-lg transition-transform hover:scale-105 hover:text-brand-orange lg:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Scroll right"
          className="absolute -right-4 top-[38%] hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white text-brand-navy shadow-lg transition-transform hover:scale-105 hover:text-brand-orange lg:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
