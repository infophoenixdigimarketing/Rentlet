import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// A stable reference for "empty" useSyncExternalStore server/initial snapshots — `() => []`
// creates a new array every call, which fails the "getSnapshot must be cached" contract and can
// crash with "Maximum update depth exceeded" (see lib/visits.ts's real instance of this bug).
export const EMPTY_ARRAY: never[] = [];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** ₹28,000 style formatting; compact for large sale prices (₹1.2 Cr / ₹45 L). */
export function formatINR(value: number, compact = false): string {
  if (compact && value >= 10000000) {
    return `₹${trimZero(value / 10000000)} Cr`;
  }
  if (compact && value >= 100000) {
    return `₹${trimZero(value / 100000)} L`;
  }
  return `₹${value.toLocaleString("en-IN")}`;
}

function trimZero(n: number): string {
  return n % 1 === 0 ? n.toString() : n.toFixed(1);
}

export function formatArea(sqft: number): string {
  return `${sqft.toLocaleString("en-IN")} sq.ft`;
}

/** Primary listing price line, e.g. "₹28,000/month" or "₹85 L". */
export function priceLabel(p: { listingType: "rent" | "sale"; rent: number | null; price: number | null }): string {
  if (p.listingType === "rent" && p.rent != null) return `${formatINR(p.rent)}/month`;
  if (p.listingType === "sale" && p.price != null) return formatINR(p.price, true);
  return "Price on request";
}

/** "2h ago" / "5m ago" style relative time for notifications and chat timestamps. */
export function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}
