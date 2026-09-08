// Admin report queue (spec §27). Same in-memory pub/sub pattern as owner.service.ts.
import { seedReports } from "@/lib/data/admin-seed";
import type { PropertyReport, ReportStatus } from "@/types/admin";

let store: PropertyReport[] = seedReports.map((r) => ({ ...r }));
let listeners: (() => void)[] = [];
let snapshot = store.slice();

function emit() {
  snapshot = store.slice();
  listeners.forEach((l) => l());
}

export const adminReportsService = {
  getAll(): PropertyReport[] {
    return snapshot;
  },
  subscribe(listener: () => void) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  setStatus(id: string, status: ReportStatus) {
    store = store.map((r) => (r.id === id ? { ...r, status } : r));
    emit();
  },
};
