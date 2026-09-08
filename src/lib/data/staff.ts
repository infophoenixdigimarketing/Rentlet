// RENTLET's in-house relationship managers — the staff who work leads through the
// CRM pipeline (assignment → follow-up → site visit → negotiation → documentation →
// deal closed). Mock roster until a real `staff` user role + directory exists.
export const RENTLET_STAFF = [
  "Neha Rao",
  "Arjun Mehta",
  "Priya Sharma",
  "Rahul Verma",
  "Sana Qureshi",
] as const;

export type StaffName = (typeof RENTLET_STAFF)[number];
