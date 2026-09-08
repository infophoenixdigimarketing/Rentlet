// Owner contact details — ADMIN / STAFF ONLY.
//
// Deliberately kept OUT of the `Property` type and the seed arrays: those objects are passed
// straight into public client components, so anything on them lands in the page's serialized
// RSC payload where a scraper can read it. Owner phone/email must never leak that way.
//
// Look this up by `ownerId` only from admin & CRM screens (both auth-gated).

export interface OwnerContact {
  name: string;
  phone: string;
  email: string;
}

// Matches seed-properties.ts: ownerId `su<k>` ↔ OWNER_NAMES[k]; properties.ts: `u1`…`u6`.
const SEED: Record<string, OwnerContact> = {
  su0: { name: "Rahul Iyer", phone: "+91 98450 10001", email: "rahul.iyer@example.com" },
  su1: { name: "Sneha Kapoor", phone: "+91 98450 10002", email: "sneha.kapoor@example.com" },
  su2: { name: "Manoj Pillai", phone: "+91 98450 10003", email: "manoj.pillai@example.com" },
  su3: { name: "Divya Krishnan", phone: "+91 98450 10004", email: "divya.krishnan@example.com" },
  su4: { name: "Aditya Verma", phone: "+91 98450 10005", email: "aditya.verma@example.com" },
  su5: { name: "Lakshmi Narayanan", phone: "+91 98450 10006", email: "lakshmi.n@example.com" },
  su6: { name: "Rohit Bhatia", phone: "+91 98450 10007", email: "rohit.bhatia@example.com" },
  su7: { name: "Meera Suresh", phone: "+91 98450 10008", email: "meera.suresh@example.com" },
  su8: { name: "Sanjay Gowda", phone: "+91 98450 10009", email: "sanjay.gowda@example.com" },
  su9: { name: "Nisha Reddy", phone: "+91 98450 10010", email: "nisha.reddy@example.com" },
  u1: { name: "Arvind Menon", phone: "+91 98450 11223", email: "arvind.menon@example.com" },
  u2: { name: "Priya Raghavan", phone: "+91 99020 44556", email: "priya.raghavan@example.com" },
  u3: { name: "Karthik Rao", phone: "+91 90080 77889", email: "karthik.rao@example.com" },
  u4: { name: "Deepa Nair", phone: "+91 97410 33224", email: "deepa.nair@example.com" },
  u5: { name: "Farhan Sheikh", phone: "+91 98330 66771", email: "farhan.sheikh@example.com" },
  u6: { name: "S. Muthu Kumar", phone: "+91 94440 88990", email: "muthu.kumar@example.com" },
};

// Contacts for properties posted during this session (mock mode).
const runtime: Record<string, OwnerContact> = {};

export function setOwnerContact(ownerId: string, contact: OwnerContact) {
  runtime[ownerId] = contact;
}

export function getOwnerContact(ownerId: string): OwnerContact | null {
  return runtime[ownerId] ?? SEED[ownerId] ?? null;
}
