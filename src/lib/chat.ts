"use client";

import { useCallback, useSyncExternalStore } from "react";
import { chatService } from "@/lib/services/chat.service";

export function useChatRooms() {
  return useSyncExternalStore(
    (cb) => chatService.subscribeRooms(cb),
    () => chatService.getRooms(),
    () => chatService.getRooms()
  );
}

export function useChatMessages(roomId: string) {
  const subscribe = useCallback((cb: () => void) => chatService.subscribeMessages(roomId, cb), [roomId]);
  const getSnapshot = useCallback(() => chatService.getMessages(roomId), [roomId]);
  const messages = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const typing = useSyncExternalStore(subscribe, () => chatService.isOtherTyping(roomId), () => false);
  return { messages, typing };
}
