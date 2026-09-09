"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GoogleTranslate } from "@/components/layout/GoogleTranslate";

// The admin console (spec §24-27) and the staff CRM console are distinct surfaces with their
// own sidebars/gates — the public marketing header/footer would just be visual noise on top of
// them. These are the path-based exceptions; every other route keeps the standard site chrome.
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isConsole = pathname?.startsWith("/admin") || pathname?.startsWith("/staff");

  if (isConsole) return <>{children}</>;

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      {/* SupportChatWidget removed per request — the floating bubble covered content on
          mobile. Component + /api/chat route are still in the codebase; re-add
          <SupportChatWidget /> here to bring it back. */}
      {/* Whole-site translation — off-screen Google widget driven by LanguageMenu. */}
      <GoogleTranslate />
    </>
  );
}
