// Shared localStorage persistence for the mock (Firebase-off) services.
//
// Without this, each mock service holds its rows only in the current tab's JS memory:
// a visit/lead created on the public site never reaches an already-open /admin tab, and
// a reload rebuilds from seed data and loses anything the user created. Persisting the
// store (and listening for the cross-tab `storage` event) makes the mock behave like a
// real shared backend for the demo.
//
// The payload is versioned — bump `version` when a service's seed shape changes so stale
// data from an older build is ignored instead of wedging the page.

export interface MockPersistence<T> {
  load(): T[] | null;
  save(rows: T[]): void;
  /** Subscribe to writes made by OTHER tabs. Returns an unsubscribe fn. */
  onExternalChange(handler: (rows: T[]) => void): () => void;
}

export function createMockPersistence<T>(key: string, version: string): MockPersistence<T> {
  const isBrowser = typeof window !== "undefined";

  function parse(raw: string | null): T[] | null {
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw) as { version?: string; rows?: unknown };
      if (parsed.version === version && Array.isArray(parsed.rows)) return parsed.rows as T[];
    } catch {
      /* malformed — fall through */
    }
    return null;
  }

  return {
    load() {
      if (!isBrowser) return null;
      try {
        return parse(window.localStorage.getItem(key));
      } catch {
        return null;
      }
    },
    save(rows) {
      if (!isBrowser) return;
      try {
        window.localStorage.setItem(key, JSON.stringify({ version, rows }));
      } catch {
        /* quota hit or storage disabled — this tab still works in-memory */
      }
    },
    onExternalChange(handler) {
      if (!isBrowser) return () => {};
      const listener = (e: StorageEvent) => {
        if (e.key !== key) return;
        const rows = parse(e.newValue);
        if (rows) handler(rows);
      };
      window.addEventListener("storage", listener);
      return () => window.removeEventListener("storage", listener);
    },
  };
}

/** Collision-proof id for a mock row created at runtime (unique across tabs). */
export function mockId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
