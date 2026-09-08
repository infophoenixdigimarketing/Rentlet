"use client";

import { MessageSquare } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { useChatRooms } from "@/lib/chat";
import { cn, timeAgo } from "@/lib/utils";
import type { ChatRoom } from "@/types/chat";

export function RoomList({ activeRoomId, onSelect }: { activeRoomId: string | null; onSelect: (room: ChatRoom) => void }) {
  const rooms = useChatRooms();

  if (rooms.length === 0) {
    return <EmptyState icon={MessageSquare} title="No messages yet" description="Contact an owner from a property page to start a conversation." className="m-4" />;
  }

  return (
    <div className="flex flex-col overflow-y-auto">
      {rooms.map((room) => (
        <button
          key={room.id}
          type="button"
          onClick={() => onSelect(room)}
          className={cn(
            "flex items-start gap-3 border-b border-border px-4 py-3 text-left transition-colors hover:bg-muted",
            activeRoomId === room.id && "bg-brand-navy-light/40"
          )}
        >
          <span className="relative shrink-0">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy-light text-sm font-bold text-brand-navy">
              {room.otherPartyName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </span>
            {room.otherPartyOnline && (
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
            )}
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-semibold text-foreground">{room.otherPartyName}</span>
              <span className="shrink-0 text-[10px] text-muted-foreground">{timeAgo(room.lastMessageAt)}</span>
            </span>
            {room.propertyTitle && <span className="block truncate text-[11px] text-muted-foreground">{room.propertyTitle}</span>}
            <span className="mt-0.5 flex items-center justify-between gap-2">
              <span className="truncate text-xs text-foreground/70">{room.lastMessage || "Say hello 👋"}</span>
              {room.unreadCount > 0 && (
                <span className="flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full bg-brand-orange px-1 text-[10px] font-bold text-white">
                  {room.unreadCount}
                </span>
              )}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
