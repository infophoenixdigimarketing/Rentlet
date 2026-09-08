// NotificationProvider mock (spec §21/§55). Phase 12 swaps this for FCM push + a real
// `notifications` Firestore collection + email/SMS-WhatsApp providers behind the same push()
// call site — everything that currently calls `notificationsService.push(...)` (chat replies,
// visit responses, contact-flow leads) keeps working unchanged.
import type { AppNotification, NotificationType } from "@/types/notification";

function seed(): AppNotification[] {
  const now = Date.now();
  const ago = (mins: number) => new Date(now - mins * 60000).toISOString();
  return [
    {
      id: "n1",
      type: "PROPERTY_APPROVED",
      title: "Property approved",
      body: "Your listing \"Premium 2 BHK Apartment for Rent in Whitefield\" is now live.",
      href: "/owner/properties",
      read: false,
      createdAt: ago(45),
    },
    {
      id: "n2",
      type: "NEW_LEAD",
      title: "New lead",
      body: "Kavya Iyer enquired about your Whitefield apartment.",
      href: "/owner/leads",
      read: false,
      createdAt: ago(80),
    },
    {
      id: "n3",
      type: "VISIT_REQUEST",
      title: "Visit requested",
      body: "Ritika Shah requested a visit for 25 Aug, 10:00 AM.",
      href: "/owner/visits",
      read: false,
      createdAt: ago(150),
    },
    {
      id: "n4",
      type: "NEW_MATCH",
      title: "New match for your saved search",
      body: "3 new 2 BHK properties match \"2 BHK under ₹30,000 in Whitefield.\"",
      href: "/saved-searches",
      read: true,
      createdAt: ago(400),
    },
    {
      id: "n5",
      type: "PRICE_DROP",
      title: "Price drop",
      body: "A property you saved dropped from ₹32,000 to ₹28,000/month.",
      href: "/favorites",
      read: true,
      createdAt: ago(900),
    },
    {
      id: "n6",
      type: "SUBSCRIPTION_EXPIRING",
      title: "Subscription expiring soon",
      body: "Your Premium plan renews in 3 days.",
      href: "/owner/subscription",
      read: true,
      createdAt: ago(1400),
    },
  ];
}

let store: AppNotification[] = seed();
let listeners: (() => void)[] = [];
let snapshot = store.slice();
let nextId = store.length + 1;

function emit() {
  snapshot = store.slice();
  listeners.forEach((l) => l());
}

const TITLES: Record<NotificationType, string> = {
  PROPERTY_APPROVED: "Property approved",
  PROPERTY_REJECTED: "Property needs changes",
  NEW_LEAD: "New lead",
  NEW_MESSAGE: "New message",
  VISIT_REQUEST: "Visit requested",
  VISIT_ACCEPTED: "Visit confirmed",
  VISIT_REJECTED: "Visit declined",
  PRICE_DROP: "Price drop",
  NEW_MATCH: "New match for your saved search",
  SUBSCRIPTION_EXPIRING: "Subscription expiring soon",
};

export const notificationsService = {
  getAll(): AppNotification[] {
    return snapshot;
  },
  unreadCount(): number {
    return snapshot.filter((n) => !n.read).length;
  },
  subscribe(listener: () => void) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  markRead(id: string) {
    store = store.map((n) => (n.id === id ? { ...n, read: true } : n));
    emit();
  },
  markAllRead() {
    store = store.map((n) => ({ ...n, read: true }));
    emit();
  },
  push(type: NotificationType, body: string, href: string | null = null) {
    const notification: AppNotification = {
      id: `n${nextId++}`,
      type,
      title: TITLES[type],
      body,
      href,
      read: false,
      createdAt: new Date().toISOString(),
    };
    store = [notification, ...store];
    emit();
  },
};
