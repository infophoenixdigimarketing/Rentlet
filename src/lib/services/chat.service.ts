// Mock chat store (spec §20). Phase 12 swaps this for Firestore `chat_rooms`/`messages` +
// realtime listeners; the "auto-reply" here stands in for the other party actually typing back,
// so the interaction (typing indicator, read receipts, unread counts) is genuinely exercised
// without a second logged-in user in this single-browser demo.
import { notificationsService } from "@/lib/services/notifications.service";
import { featuredProperties } from "@/lib/data/properties";
import type { ChatRoom, ChatMessage, MessageType } from "@/types/chat";

const CANNED_REPLIES = [
  "Thanks for reaching out! Yes, it's still available.",
  "Sure, I can share more photos if you'd like.",
  "That works for me — let's confirm the visit time.",
  "The deposit is negotiable for the right tenant.",
  "Happy to answer any other questions you have!",
];

function seedRooms(): { room: ChatRoom; messages: ChatMessage[] }[] {
  const p1 = featuredProperties[0];
  const p2 = featuredProperties[2];
  const p3 = featuredProperties[4];

  const now = Date.now();
  const ago = (mins: number) => new Date(now - mins * 60000).toISOString();

  return [
    {
      room: {
        id: "room1",
        propertyId: p1.id,
        propertyTitle: p1.title,
        otherPartyName: p1.ownerName,
        otherPartyRole: "owner",
        otherPartyOnline: true,
        lastMessage: "Sure, I can share more photos if you'd like.",
        lastMessageAt: ago(20),
        unreadCount: 1,
        blocked: false,
      },
      messages: [
        { id: "m1", roomId: "room1", sender: "me", type: "property_card", propertyId: p1.id, createdAt: ago(60), read: true },
        { id: "m2", roomId: "room1", sender: "me", type: "text", text: "Hi, is this still available?", createdAt: ago(58), read: true },
        { id: "m3", roomId: "room1", sender: "them", type: "text", text: "Yes it is! Would you like to schedule a visit?", createdAt: ago(55), read: true },
        { id: "m4", roomId: "room1", sender: "them", type: "text", text: "Sure, I can share more photos if you'd like.", createdAt: ago(20), read: false },
      ],
    },
    {
      room: {
        id: "room2",
        propertyId: p2.id,
        propertyTitle: p2.title,
        otherPartyName: p2.ownerName,
        otherPartyRole: "agent",
        otherPartyOnline: false,
        lastMessage: "The deposit is negotiable for the right tenant.",
        lastMessageAt: ago(240),
        unreadCount: 0,
        blocked: false,
      },
      messages: [
        { id: "m5", roomId: "room2", sender: "me", type: "text", text: "Is the deposit negotiable?", createdAt: ago(250), read: true },
        { id: "m6", roomId: "room2", sender: "them", type: "text", text: "The deposit is negotiable for the right tenant.", createdAt: ago(240), read: true },
      ],
    },
    {
      room: {
        id: "room3",
        propertyId: p3.id,
        propertyTitle: p3.title,
        otherPartyName: p3.ownerName,
        otherPartyRole: "owner",
        otherPartyOnline: true,
        lastMessage: "Visit requested for 26 Aug, 4:30 PM",
        lastMessageAt: ago(1440),
        unreadCount: 0,
        blocked: false,
      },
      messages: [
        { id: "m7", roomId: "room3", sender: "me", type: "text", text: "Hello! Interested in this one.", createdAt: ago(1450), read: true },
        { id: "m8", roomId: "room3", sender: "me", type: "visit_request", visitInfo: { date: "26 Aug 2026", slot: "4:30 PM" }, createdAt: ago(1440), read: true },
      ],
    },
  ];
}

const seeded = seedRooms();
let rooms: ChatRoom[] = seeded.map((s) => s.room);
let messagesByRoom: Record<string, ChatMessage[]> = Object.fromEntries(seeded.map((s) => [s.room.id, s.messages]));
const typingRooms = new Set<string>();
let nextMsgId = 100;
let nextRoomId = seeded.length + 1;

let roomListeners: (() => void)[] = [];
const messageListeners: Record<string, (() => void)[]> = {};
let roomsSnapshot = rooms.slice();
let messagesSnapshot: Record<string, ChatMessage[]> = { ...messagesByRoom };

function emitRooms() {
  roomsSnapshot = rooms.slice().sort((a, b) => b.lastMessageAt.localeCompare(a.lastMessageAt));
  roomListeners.forEach((l) => l());
}
function emitMessages(roomId: string) {
  messagesSnapshot = { ...messagesSnapshot, [roomId]: (messagesByRoom[roomId] ?? []).slice() };
  (messageListeners[roomId] ?? []).forEach((l) => l());
}

export const chatService = {
  getRooms(): ChatRoom[] {
    return roomsSnapshot;
  },
  subscribeRooms(listener: () => void) {
    roomListeners.push(listener);
    return () => {
      roomListeners = roomListeners.filter((l) => l !== listener);
    };
  },
  getMessages(roomId: string): ChatMessage[] {
    return messagesSnapshot[roomId] ?? [];
  },
  subscribeMessages(roomId: string, listener: () => void) {
    messageListeners[roomId] = [...(messageListeners[roomId] ?? []), listener];
    return () => {
      messageListeners[roomId] = (messageListeners[roomId] ?? []).filter((l) => l !== listener);
    };
  },
  isOtherTyping(roomId: string) {
    return typingRooms.has(roomId);
  },

  getOrCreateRoomForProperty(input: { propertyId: string; propertyTitle: string; ownerName: string; ownerRole: ChatRoom["otherPartyRole"] }): string {
    const existing = rooms.find((r) => r.propertyId === input.propertyId);
    if (existing) return existing.id;

    const id = `room${nextRoomId++}`;
    const room: ChatRoom = {
      id,
      propertyId: input.propertyId,
      propertyTitle: input.propertyTitle,
      otherPartyName: input.ownerName,
      otherPartyRole: input.ownerRole,
      otherPartyOnline: true,
      lastMessage: "",
      lastMessageAt: new Date().toISOString(),
      unreadCount: 0,
      blocked: false,
    };
    rooms = [room, ...rooms];
    messagesByRoom = { ...messagesByRoom, [id]: [] };
    emitRooms();
    return id;
  },

  send(roomId: string, message: { type: MessageType; text?: string; propertyId?: string; visitInfo?: ChatMessage["visitInfo"] }) {
    const msg: ChatMessage = {
      id: `msg${nextMsgId++}`,
      roomId,
      sender: "me",
      read: true,
      createdAt: new Date().toISOString(),
      ...message,
    };
    messagesByRoom = { ...messagesByRoom, [roomId]: [...(messagesByRoom[roomId] ?? []), msg] };
    rooms = rooms.map((r) =>
      r.id === roomId ? { ...r, lastMessage: summarize(msg), lastMessageAt: msg.createdAt } : r
    );
    emitMessages(roomId);
    emitRooms();

    // Simulate the other party responding — see file header.
    const room = rooms.find((r) => r.id === roomId);
    if (!room || room.blocked) return;
    typingRooms.add(roomId);
    emitMessages(roomId);
    setTimeout(() => {
      typingRooms.delete(roomId);
      const reply: ChatMessage = {
        id: `msg${nextMsgId++}`,
        roomId,
        sender: "them",
        type: "text",
        text: CANNED_REPLIES[Math.floor(Math.random() * CANNED_REPLIES.length)],
        createdAt: new Date().toISOString(),
        read: false,
      };
      messagesByRoom = { ...messagesByRoom, [roomId]: [...(messagesByRoom[roomId] ?? []), reply] };
      rooms = rooms.map((r) =>
        r.id === roomId ? { ...r, lastMessage: reply.text ?? "", lastMessageAt: reply.createdAt, unreadCount: r.unreadCount + 1 } : r
      );
      emitMessages(roomId);
      emitRooms();
      notificationsService.push("NEW_MESSAGE", `${room.otherPartyName}: ${reply.text}`, `/messages?room=${roomId}`);
    }, 1200 + Math.random() * 800);
  },

  markRead(roomId: string) {
    messagesByRoom = { ...messagesByRoom, [roomId]: (messagesByRoom[roomId] ?? []).map((m) => ({ ...m, read: true })) };
    rooms = rooms.map((r) => (r.id === roomId ? { ...r, unreadCount: 0 } : r));
    emitMessages(roomId);
    emitRooms();
  },

  toggleBlock(roomId: string) {
    rooms = rooms.map((r) => (r.id === roomId ? { ...r, blocked: !r.blocked } : r));
    emitRooms();
  },
};

function summarize(msg: ChatMessage): string {
  switch (msg.type) {
    case "text":
      return msg.text ?? "";
    case "image":
      return "Sent a photo";
    case "property_card":
      return "Shared a property";
    case "visit_request":
      return `Visit requested for ${msg.visitInfo?.date}, ${msg.visitInfo?.slot}`;
    default:
      return "";
  }
}
