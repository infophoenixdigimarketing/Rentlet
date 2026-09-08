// Admin user management (spec §26). Same in-memory pub/sub pattern as owner.service.ts.
import { seedPlatformUsers } from "@/lib/data/admin-seed";
import type { PlatformUser } from "@/types/admin";

let store: PlatformUser[] = seedPlatformUsers.map((u) => ({ ...u }));
let listeners: (() => void)[] = [];
let snapshot = store.slice();

function emit() {
  snapshot = store.slice();
  listeners.forEach((l) => l());
}

export const adminUsersService = {
  getAll(): PlatformUser[] {
    return snapshot;
  },
  subscribe(listener: () => void) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  toggleVerified(id: string) {
    store = store.map((u) => (u.id === id ? { ...u, verified: !u.verified } : u));
    emit();
  },
  toggleBlocked(id: string) {
    store = store.map((u) => (u.id === id ? { ...u, blocked: !u.blocked } : u));
    emit();
  },
  remove(id: string) {
    store = store.filter((u) => u.id !== id);
    emit();
  },
};
