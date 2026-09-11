"use client";

import { useSyncExternalStore } from "react";

// Client-only profile photo store. There's no Storage backend in this build (see
// isFirestoreEnabled), so a small compressed photo is kept per user in localStorage —
// consistent with the rest of the local persistence auth.service.ts already relies on.
const PREFIX = "rentlet_avatar_";
const EVENT = "rentlet-avatar-change";

export const avatarService = {
  get(userId: string): string | null {
    if (typeof window === "undefined") return null;
    try {
      return window.localStorage.getItem(PREFIX + userId);
    } catch {
      return null;
    }
  },
  set(userId: string, dataUrl: string) {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(PREFIX + userId, dataUrl);
      window.dispatchEvent(new Event(EVENT));
    } catch {
      // Storage full/unavailable — the photo just won't persist, not fatal.
    }
  },
  remove(userId: string) {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(PREFIX + userId);
      window.dispatchEvent(new Event(EVENT));
    } catch {
      // ignore
    }
  },
  subscribe(listener: () => void): () => void {
    if (typeof window === "undefined") return () => {};
    window.addEventListener(EVENT, listener);
    return () => window.removeEventListener(EVENT, listener);
  },
};

/** Live-reads the given user's stored photo, re-rendering on upload/removal anywhere on the page. */
export function useAvatar(userId: string): string | null {
  return useSyncExternalStore(
    (onChange) => avatarService.subscribe(onChange),
    () => avatarService.get(userId),
    () => null
  );
}
