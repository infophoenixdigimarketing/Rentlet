import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Sends the "we received your listing" emails after a property is submitted. Fully optional:
// with no SMTP env vars set it returns { skipped: true } and the caller ignores it, so a
// missing mail config never blocks a submission. Server-side only — SMTP_PASS is NOT
// NEXT_PUBLIC_. Set these in apps/web/.env.local (and on the host):
//   SMTP_HOST=smtp.gmail.com
//   SMTP_PORT=465
//   SMTP_USER=info.rentlet@gmail.com
//   SMTP_PASS=<16-char Gmail App Password>   (Google account → Security → App passwords)
//   LISTING_NOTIFY_TO=info.rentlet@gmail.com  (where the admin copy lands; defaults to SMTP_USER)

type Payload = {
  listingTitle?: string;
  city?: string;
  listingType?: string;
  ownerName?: string;
  ownerEmail?: string;
  ownerPhone?: string;
  propertyId?: string;
  slug?: string;
};

function esc(s: string) {
  return s.replace(/[<>&]/g, (c) => (c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;"));
}

export async function POST(req: Request) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    return NextResponse.json({ skipped: true, reason: "SMTP not configured" });
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const title = (body.listingTitle || "New property").trim();
  const city = (body.city || "").trim();
  const kind = (body.listingType || "").trim();
  const ownerName = (body.ownerName || "").trim();
  const ownerEmail = (body.ownerEmail || "").trim();
  const ownerPhone = (body.ownerPhone || "").trim();
  const adminTo = process.env.LISTING_NOTIFY_TO || user;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rentlet.in";
  const link =
    body.slug && body.propertyId ? `${siteUrl}/property/${body.slug}/${body.propertyId}` : siteUrl;

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: { user, pass },
  });

  const from = `Rentlet <${user}>`;

  const adminHtml = `
    <h2>New listing submitted</h2>
    <p><strong>${esc(title)}</strong>${city ? ` — ${esc(city)}` : ""}${kind ? ` (${esc(kind)})` : ""}</p>
    <table cellpadding="4" style="border-collapse:collapse">
      <tr><td>Posted by</td><td>${esc(ownerName || "—")}</td></tr>
      <tr><td>Email</td><td>${esc(ownerEmail || "—")}</td></tr>
      <tr><td>Phone</td><td>${esc(ownerPhone || "—")}</td></tr>
      <tr><td>Status</td><td>Pending verification</td></tr>
    </table>
    <p><a href="${esc(link)}">Open listing</a></p>
  `;

  const results: Record<string, unknown> = {};

  try {
    results.admin = await transporter.sendMail({
      from,
      to: adminTo,
      subject: `New listing: ${title}${city ? ` (${city})` : ""}`,
      html: adminHtml,
    });

    if (ownerEmail) {
      results.owner = await transporter.sendMail({
        from,
        to: ownerEmail,
        subject: "We've received your Rentlet listing",
        html: `
          <p>Hi ${esc(ownerName || "there")},</p>
          <p>Thanks for listing <strong>${esc(title)}</strong>${city ? ` in ${esc(city)}` : ""} on Rentlet.
          Our team is reviewing it now — you'll get another email once it's approved and live.</p>
          <p>You can track it any time from your dashboard.</p>
          <p>— Team Rentlet</p>
        `,
      });
    }

    return NextResponse.json({ ok: true, sent: Object.keys(results) });
  } catch (err) {
    // Don't 500 the client flow over a mail hiccup — log-and-report.
    console.error("notify-listing mail failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Mail send failed." },
      { status: 502 }
    );
  }
}
