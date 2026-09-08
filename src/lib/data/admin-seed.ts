// Deterministic generators for admin-only mock data (platform users, reports) — same approach
// as lib/data/seed-properties.ts. Phase 12 replaces both with real Firestore collections.
import { allProperties } from "@/lib/data/seed-properties";
import type { PlatformUser, PropertyReport, ReportReason, ReportStatus } from "@/types/admin";
import type { UserRole } from "@/types/user";

const FIRST_NAMES = ["Rahul", "Sneha", "Vikram", "Ananya", "Farhan", "Meera", "Aditya", "Divya", "Karthik", "Priyanka", "Suresh", "Kavya", "Rohan", "Pooja", "Nikhil", "Shreya", "Manish", "Ritika", "Arjun", "Neha"];
const LAST_NAMES = ["Sharma", "Iyer", "Nair", "Joshi", "Ali", "Krishnan", "Kumar", "Menon", "Reddy", "Rao", "Babu", "Pillai", "Malhotra", "Verma", "Bhatt", "Gupta", "Tiwari", "Shah", "Das", "Singh"];
const ROLES: UserRole[] = ["tenant", "buyer", "owner", "owner", "agent", "builder"];

function generateUsers(count: number): PlatformUser[] {
  const users: PlatformUser[] = [];
  for (let i = 0; i < count; i++) {
    const first = FIRST_NAMES[i % FIRST_NAMES.length];
    const last = LAST_NAMES[(i * 3) % LAST_NAMES.length];
    const role = ROLES[i % ROLES.length];
    users.push({
      id: `pu${i + 1}`,
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}${i}@example.com`,
      phone: `+91 9${String(800000000 + i * 731).slice(0, 9)}`,
      role,
      verified: i % 4 !== 0,
      blocked: i % 11 === 0,
      joinedAt: new Date(2024 + (i % 3), i % 12, 1 + (i % 27)).toISOString().slice(0, 10),
      propertiesCount: role === "owner" || role === "agent" || role === "builder" ? 1 + (i % 9) : 0,
    });
  }
  return users;
}

const REASONS: ReportReason[] = ["fake", "wrong_price", "duplicate", "fraud", "wrong_location", "spam", "broker_misuse", "other"];
const REASON_LABEL: Record<ReportReason, string> = {
  fake: "Fake property",
  wrong_price: "Wrong price",
  duplicate: "Duplicate listing",
  fraud: "Fraud",
  wrong_location: "Incorrect location",
  spam: "Spam",
  broker_misuse: "Broker misuse",
  other: "Other",
};
const STATUSES: ReportStatus[] = ["pending", "pending", "investigating", "resolved", "rejected"];
const REPORTERS = ["Kavya Iyer", "Rohan Das", "Sneha Pillai", "Vikram Nair", "Ananya Joshi", "Farhan Ali", "Meera Krishnan"];

function generateReports(count: number): PropertyReport[] {
  const reports: PropertyReport[] = [];
  for (let i = 0; i < count; i++) {
    const property = allProperties[(i * 7) % allProperties.length];
    const reason = REASONS[i % REASONS.length];
    reports.push({
      id: `rep${i + 1}`,
      propertyId: property.id,
      propertyTitle: property.title,
      reportedBy: REPORTERS[i % REPORTERS.length],
      reason,
      details: i % 3 === 0 ? `Reported for: ${REASON_LABEL[reason].toLowerCase()}.` : null,
      status: STATUSES[i % STATUSES.length],
      createdAt: new Date(2026, 7, 1 + (i % 24)).toISOString().slice(0, 10),
    });
  }
  return reports;
}

export const REPORT_REASON_LABEL = REASON_LABEL;
export const seedPlatformUsers = generateUsers(32);
export const seedReports = generateReports(14);
