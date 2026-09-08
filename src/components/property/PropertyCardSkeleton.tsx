// Skeleton loader — spec §53: never show a blank screen while property data loads.
export function PropertyCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-border bg-white ${className ?? ""}`}>
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      </div>
      <div className="space-y-3 p-4">
        <div className="h-5 w-2/5 rounded bg-muted" />
        <div className="h-4 w-4/5 rounded bg-muted" />
        <div className="h-3 w-3/5 rounded bg-muted" />
        <div className="flex gap-2 pt-1">
          <div className="h-6 w-16 rounded bg-muted" />
          <div className="h-6 w-16 rounded bg-muted" />
          <div className="h-6 w-16 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}
