// Minimal pub/sub so any component (favorites, contact, post-property wizard, ...) can fire a
// toast without prop-drilling or a context provider. <Toaster/> (mounted once in the root
// layout) is the only subscriber that renders anything.
export type ToastVariant = "success" | "error" | "info";
export interface ToastMessage {
  id: number;
  text: string;
  variant: ToastVariant;
}

type Listener = (toast: ToastMessage) => void;

let listeners: Listener[] = [];
let nextId = 1;

export function toast(text: string, variant: ToastVariant = "success") {
  const message: ToastMessage = { id: nextId++, text, variant };
  listeners.forEach((l) => l(message));
}

export function subscribeToasts(listener: Listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}
