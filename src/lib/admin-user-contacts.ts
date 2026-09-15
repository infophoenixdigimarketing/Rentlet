"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";

export interface UserContact {
  email: string | null;
  phone: string | null;
  name: string | null;
}

const cache = new Map<string, UserContact>();
const inFlight = new Set<string>();

/** Resolves real account contact info for a set of uids, admin-console only — see
 *  api/admin/user-contact. Caches across calls so switching filters/tabs doesn't re-fetch. */
export function useAdminUserContacts(uids: (string | null | undefined)[]): Record<string, UserContact> {
  const [, forceRender] = useState(0);
  const unique = Array.from(new Set(uids.filter((u): u is string => Boolean(u))));
  const missing = unique.filter((u) => !cache.has(u) && !inFlight.has(u));

  useEffect(() => {
    if (missing.length === 0) return;
    missing.forEach((u) => inFlight.add(u));
    let cancelled = false;

    // getFirebaseAuth().currentUser can still be null here even when genuinely signed in — the
    // SDK hasn't finished restoring the session yet right after page load/navigation, and that
    // check would then never retry (this effect's deps don't change again once `missing` is
    // stable). onAuthStateChanged always fires once with the real, resolved state instead.
    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), (firebaseUser) => {
      unsubscribe();
      if (cancelled) return;
      if (!firebaseUser) {
        missing.forEach((u) => inFlight.delete(u));
        return;
      }
      firebaseUser
        .getIdToken()
        .then((idToken) =>
          fetch("/api/admin/user-contact", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
            body: JSON.stringify({ uids: missing }),
          })
        )
        .then((res) => res.json())
        .then((body: { users?: Record<string, UserContact> }) => {
          if (cancelled) return;
          for (const [uid, contact] of Object.entries(body.users ?? {})) cache.set(uid, contact);
          forceRender((n) => n + 1);
        })
        .catch(() => {})
        .finally(() => missing.forEach((u) => inFlight.delete(u)));
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-run only when the actual uid set changes
  }, [missing.join(",")]);

  const result: Record<string, UserContact> = {};
  for (const u of unique) {
    const hit = cache.get(u);
    if (hit) result[u] = hit;
  }
  return result;
}
