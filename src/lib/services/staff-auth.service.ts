// Separate session for RENTLET relationship-manager staff — its own localStorage key,
// its own login page (/staff/login), no code paths shared with tenant/owner auth or the
// admin console. Mock-only for now (no `staff` user role wired to Firebase yet).
//
// Demo credentials (development only): staff@rentlet.in / RentletStaff@123 — signs in as
// the first person on the RENTLET_STAFF roster so the pipeline can scope to "my leads".
import { RENTLET_STAFF } from "@/lib/data/staff";

const DEMO_STAFF_EMAIL = "staff@rentlet.in";
const DEMO_STAFF_PASSWORD = "RentletStaff@123";
const SESSION_KEY = "rentlet_staff_session";

export interface StaffUser {
  /** must match a name in RENTLET_STAFF so leads can be filtered by assignedStaff */
  name: string;
  email: string;
}

function isBrowser() {
  return typeof window !== "undefined";
}

class StaffAuthService {
  private current: StaffUser | null = null;
  private hydrated = false;
  private listeners: ((s: StaffUser | null) => void)[] = [];

  getCurrentStaff(): StaffUser | null {
    if (!this.hydrated && isBrowser()) {
      const raw = window.localStorage.getItem(SESSION_KEY);
      this.current = raw ? (JSON.parse(raw) as StaffUser) : null;
      this.hydrated = true;
    }
    return this.current;
  }

  subscribe(listener: (s: StaffUser | null) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  async login(email: string, password: string): Promise<StaffUser> {
    await new Promise((r) => setTimeout(r, 400));
    if (email.toLowerCase() !== DEMO_STAFF_EMAIL || password !== DEMO_STAFF_PASSWORD) {
      throw new Error("Invalid staff credentials.");
    }
    const staff: StaffUser = { name: RENTLET_STAFF[0], email: DEMO_STAFF_EMAIL };
    this.current = staff;
    this.hydrated = true;
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(staff));
    this.listeners.forEach((l) => l(staff));
    return staff;
  }

  async logout() {
    if (!isBrowser()) return;
    window.localStorage.removeItem(SESSION_KEY);
    this.current = null;
    this.hydrated = true;
    this.listeners.forEach((l) => l(null));
  }
}

export const staffAuthService = new StaffAuthService();
