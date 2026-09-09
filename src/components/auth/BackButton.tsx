"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

/** Small "go back" control for the auth screens. Uses browser history when there is any,
 *  otherwise falls back to the home page so it's never a dead click. */
export function BackButton() {
  const router = useRouter();

  function goBack() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }

  return (
    <button
      type="button"
      onClick={goBack}
      className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-brand-navy shadow-sm shadow-black/10 backdrop-blur transition-colors hover:bg-white"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </button>
  );
}
