// Mirrors docs/01-database-schema.md `chat_rooms` / `messages` sub-collection.
export interface ChatRoom {
  id: string;
  propertyId: string | null;
  propertyTitle: string | null;
  otherPartyName: string;
  otherPartyRole: "owner" | "tenant" | "agent" | "builder";
  otherPartyOnline: boolean;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  blocked: boolean;
}

export type MessageType = "text" | "image" | "property_card" | "visit_request";

export interface ChatMessage {
  id: string;
  roomId: string;
  sender: "me" | "them";
  type: MessageType;
  text?: string;
  propertyId?: string;
  visitInfo?: { date: string; slot: string };
  createdAt: string; // ISO
  read: boolean;
}
