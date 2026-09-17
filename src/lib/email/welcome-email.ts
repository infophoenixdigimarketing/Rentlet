import nodemailer from "nodemailer";
import { SITE_URL } from "@/lib/site-url";

// Shared by every server-side place that needs to send the "Welcome to Rentlet" email — moved
// here (out of api/auth/notify-login/route.ts) so the email/password + OTP signup path can call
// it directly, server-side, right where verification actually succeeds (see
// api/auth/verify-email-otp/route.ts), instead of depending on a second client-triggered fetch
// after the fact. That second network call is exactly what was going silently missing earlier —
// this removes it as a failure point for that path entirely. Google/Phone signups still use the
// client-triggered version (lib/notify-login.ts) since Firebase's client SDK completes those
// sign-ins directly — there's no server route of ours in that path to hook this into.
export async function sendWelcomeEmail(email: string, name: string): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return false;

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `Rentlet <${user}>`,
      to: email,
      subject: `Welcome to Rentlet, ${name}!`,
      html: `
        <div style="max-width:520px;margin:0 auto;padding:40px 32px;font-family:Georgia,'Times New Roman',serif;background:#fdfcfb;">
          <h1 style="margin:0 0 24px;font-family:'Brush Script MT',cursive,Georgia,serif;font-size:40px;font-weight:normal;color:#c81e2c;line-height:1.2;">
            Welcome to<br />Rentlet!
          </h1>

          <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 28px;">
            <tr>
              <td style="padding-bottom:8px;">
                <img src="${SITE_URL}/images/hero/hero-villa.jpg" width="456" height="220" alt="" style="width:100%;height:220px;object-fit:cover;border-radius:12px;display:block;" />
              </td>
            </tr>
            <tr>
              <td>
                <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
                  <tr>
                    <td style="width:50%;padding-right:4px;">
                      <img src="${SITE_URL}/images/showcase/living-3bhk.jpg" width="222" height="140" alt="" style="width:100%;height:140px;object-fit:cover;border-radius:10px;display:block;" />
                    </td>
                    <td style="width:50%;padding-left:4px;">
                      <img src="${SITE_URL}/images/properties/p3-apartment-interior.jpg" width="222" height="140" alt="" style="width:100%;height:140px;object-fit:cover;border-radius:10px;display:block;" />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#111;">Hi ${name},</p>
          <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:bold;color:#111;">
            Welcome to <span style="color:#c81e2c;">Rentlet!</span>
          </p>
          <p style="margin:0 0 28px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#444;">
            Find your next home with ease, or list your property and reach the right renters.
          </p>
          <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-family:Arial,Helvetica,sans-serif;">
            <tr>
              <td style="width:33%;text-align:center;padding:0 8px;vertical-align:top;">
                <div style="font-size:22px;color:#c81e2c;">&#127968;</div>
                <p style="margin:8px 0 2px;font-size:13px;font-weight:bold;color:#111;">Find a Home</p>
                <p style="margin:0;font-size:11px;color:#666;line-height:1.4;">Browse quality rentals that fit your lifestyle.</p>
              </td>
              <td style="width:33%;text-align:center;padding:0 8px;vertical-align:top;border-left:1px solid #e5dfd8;border-right:1px solid #e5dfd8;">
                <div style="font-size:22px;color:#c81e2c;">&#128203;</div>
                <p style="margin:8px 0 2px;font-size:13px;font-weight:bold;color:#111;">List a Property</p>
                <p style="margin:0;font-size:11px;color:#666;line-height:1.4;">Showcase your property and find reliable renters.</p>
              </td>
              <td style="width:33%;text-align:center;padding:0 8px;vertical-align:top;">
                <div style="font-size:22px;color:#c81e2c;">&#128101;</div>
                <p style="margin:8px 0 2px;font-size:13px;font-weight:bold;color:#111;">Connect Easily</p>
                <p style="margin:0;font-size:11px;color:#666;line-height:1.4;">Chat, share, and finalise — all in one place.</p>
              </td>
            </tr>
          </table>
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:32px 0 24px;">
            <tr>
              <td style="border-radius:24px;background:#c81e2c;">
                <a href="${SITE_URL}/properties" style="display:inline-block;padding:13px 28px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;color:#fff;text-decoration:none;border-radius:24px;">
                  Explore Rentlet &rarr;
                </a>
              </td>
            </tr>
          </table>
          <p style="margin:0 0 2px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#444;">Your next place starts here.</p>
          <p style="margin:0;font-family:Georgia,serif;font-style:italic;font-size:15px;color:#111;">Team Rentlet</p>
        </div>
      `,
    });
    return true;
  } catch (err) {
    console.error("sendWelcomeEmail failed:", err);
    return false;
  }
}
