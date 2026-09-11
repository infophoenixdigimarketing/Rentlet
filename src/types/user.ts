// Mirrors docs/01-database-schema.md `users` collection (subset needed by the client).
export type UserRole = "tenant" | "buyer" | "owner" | "agent" | "builder";

export interface AuthUser {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  role: UserRole;
  isVerified: boolean;
  /** Email/password accounts: has this address been confirmed via the emailed link?
   *  Always true for phone-OTP accounts (no email to confirm) and Google (Google already
   *  verified it) and for the offline/mock provider (no real email backend to confirm against). */
  emailVerified: boolean;
  createdAt: string;
}
