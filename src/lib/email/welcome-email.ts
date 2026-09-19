import { SITE_URL } from "@/lib/site-url";
import { sendMail } from "@/lib/email/send-mail";

// Shared by every server-side place that needs to send the "Welcome to Rentlet" email — moved
// here (out of api/auth/notify-login/route.ts) so the email/password + OTP signup path can call
// it directly, server-side, right where verification actually succeeds (see
// api/auth/verify-email-otp/route.ts), instead of depending on a second client-triggered fetch
// after the fact. That second network call is exactly what was going silently missing earlier —
// this removes it as a failure point for that path entirely. Google/Phone signups still use the
// client-triggered version (lib/notify-login.ts) since Firebase's client SDK completes those
// sign-ins directly — there's no server route of ours in that path to hook this into.
//
// The banner is a plain hosted <img>, not a CID attachment — sendMail() may go through Resend's
// HTTP API or Gmail SMTP depending on what's configured, and a hosted URL is the one image
// approach that's guaranteed to work identically on both.
//
// Bump this whenever welcome-banner.jpg's content changes. Mail providers and recipient webmail
// clients cache remote images by URL — overwriting the file in place at the same address left
// people seeing whatever version their client first fetched, no matter how the file changed
// since. Appending a version query string gives every edit its own cache-free URL.
const BANNER_VERSION = "2";

export async function sendWelcomeEmail(email: string, name: string): Promise<boolean> {
  return sendMail({
    to: email,
    subject: `Welcome to Rentlet, ${name}!`,
    html: `
      <div style="max-width:520px;margin:0 auto;padding:24px;background:#fdfcfb;">
        <a href="${SITE_URL}/properties" style="display:block;text-decoration:none;">
          <img
            src="${SITE_URL}/images/email/welcome-banner.jpg?v=${BANNER_VERSION}"
            width="472"
            alt="Welcome to Rentlet! Find your next home with ease, or list your property and reach the right renters. Find a Home. List a Property. Connect Easily. Explore Rentlet -> Your next place starts here. Team Rentlet"
            style="width:100%;max-width:472px;height:auto;display:block;border:0;border-radius:8px;"
          />
        </a>
        <p style="margin:16px 0 0;text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:13px;">
          <a href="${SITE_URL}/properties" style="color:#c81e2c;font-weight:bold;text-decoration:none;">Explore Rentlet &rarr;</a>
        </p>
      </div>
    `,
  });
}
