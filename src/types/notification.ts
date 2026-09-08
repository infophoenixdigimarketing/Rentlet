// Mirrors docs/01-database-schema.md `notifications` collection (spec §21/§55).
export type NotificationType =
  | "PROPERTY_APPROVED"
  | "PROPERTY_REJECTED"
  | "NEW_LEAD"
  | "NEW_MESSAGE"
  | "VISIT_REQUEST"
  | "VISIT_ACCEPTED"
  | "VISIT_REJECTED"
  | "PRICE_DROP"
  | "NEW_MATCH"
  | "SUBSCRIPTION_EXPIRING";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  href: string | null;
  read: boolean;
  createdAt: string; // ISO
}
