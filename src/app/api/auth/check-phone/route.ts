import { NextResponse } from "next/server";
import { getAdminAuth, isFirebaseAdminConfigured } from "@/lib/firebase/admin";

// Checked before creating an email/password account (see EmailRegisterForm) so a duplicate
// phone number stops the signup with a clear message up front, instead of silently failing to
// attach the phone afterwards (see set-phone/route.ts — that 409 used to be swallowed by a
// .catch(() => {}), so the account was created anyway with no phone saved and no one told).
// No auth required — this only needs to run before a session exists, same as how Firebase's own
// client SDK already reveals "email already in use" pre-signup.
export async function POST(req: Request) {
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json({ available: true });
  }

  let body: { phone?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const phone = (body.phone || "").trim();
  if (!/^\+\d{8,15}$/.test(phone)) {
    return NextResponse.json({ error: "Enter a valid phone number." }, { status: 400 });
  }

  try {
    await getAdminAuth().getUserByPhoneNumber(phone);
    return NextResponse.json({ available: false });
  } catch (err) {
    const code = typeof err === "object" && err !== null && "code" in err ? String((err as { code: unknown }).code) : "";
    if (code === "auth/user-not-found") return NextResponse.json({ available: true });
    console.error("check-phone failed:", err);
    // Fail open — a lookup hiccup shouldn't block a real signup; the actual set-phone call
    // afterwards still has Firebase's own uniqueness check as a backstop.
    return NextResponse.json({ available: true });
  }
}
