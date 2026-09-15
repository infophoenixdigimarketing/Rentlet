import { NextResponse } from "next/server";
import { getAdminAuth, getAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";

// Resolves real account email/phone for a batch of uids — for the admin console only (visit
// requesters, property owners). The client SDK has no way to look up another user's Firebase
// Auth profile by uid, so this goes through the Admin SDK instead. Gated to real admins: the
// caller's own uid must have an admin_users doc, checked server-side (bypassing Firestore rules,
// which is exactly why this can't just be a direct client read).
export async function POST(req: Request) {
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json({ error: "Not configured." }, { status: 503 });
  }

  const authHeader = req.headers.get("authorization") || "";
  const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!idToken) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  let callerUid: string;
  try {
    callerUid = (await getAdminAuth().verifyIdToken(idToken)).uid;
  } catch {
    return NextResponse.json({ error: "Your session has expired — please log in again." }, { status: 401 });
  }

  const adminDoc = await getAdminDb().collection("admin_users").doc(callerUid).get();
  if (!adminDoc.exists) {
    return NextResponse.json({ error: "This account is not authorized for the admin console." }, { status: 403 });
  }

  let body: { uids?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const uids = Array.isArray(body.uids) ? body.uids.filter((u): u is string => typeof u === "string").slice(0, 100) : [];
  if (!uids.length) return NextResponse.json({ users: {} });

  const users: Record<string, { email: string | null; phone: string | null; name: string | null }> = {};
  await Promise.all(
    uids.map(async (uid) => {
      try {
        const u = await getAdminAuth().getUser(uid);
        users[uid] = { email: u.email ?? null, phone: u.phoneNumber ?? null, name: u.displayName ?? null };
      } catch {
        users[uid] = { email: null, phone: null, name: null };
      }
    })
  );

  return NextResponse.json({ users });
}
