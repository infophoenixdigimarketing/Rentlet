import type { UserRole } from "@/types/user";

// Mirrors docs/01-database-schema.md `users` (admin-facing subset) and `reports`.
export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  verified: boolean;
  blocked: boolean;
  joinedAt: string;
  propertiesCount: number;
}

export type ReportReason =
  | "fake"
  | "wrong_price"
  | "duplicate"
  | "fraud"
  | "wrong_location"
  | "spam"
  | "broker_misuse"
  | "other";

export type ReportStatus = "pending" | "investigating" | "resolved" | "rejected";

export interface PropertyReport {
  id: string;
  propertyId: string;
  propertyTitle: string;
  reportedBy: string;
  reason: ReportReason;
  details: string | null;
  status: ReportStatus;
  createdAt: string;
}
