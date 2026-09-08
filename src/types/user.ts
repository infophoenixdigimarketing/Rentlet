// Mirrors docs/01-database-schema.md `users` collection (subset needed by the client).
export type UserRole = "tenant" | "buyer" | "owner" | "agent" | "builder";

export interface AuthUser {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
}
