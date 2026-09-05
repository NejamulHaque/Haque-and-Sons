import { Resend } from "resend";
import nodemailer from "nodemailer";

// 1. Resend Configuration
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const RESEND_FROM = process.env.RESEND_FROM_EMAIL || "Haque & Sons <onboarding@resend.dev>";

// 2. Gmail / Custom SMTP Configuration (Zero Domain Required)
// Set in .env.local or Vercel:
// GMAIL_USER="haquendsons@gmail.com"
// GMAIL_APP_PASSWORD="your-16-char-app-password"
const gmailUser = process.env.GMAIL_USER || process.env.SMTP_USER;
const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASSWORD;

const smtpTransporter =
  gmailUser && gmailPass
    ? nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailPass.replace(/\s+/g, ""), // strip any spaces in Google 16-char app password
        },
      })
    : null;

const ADMIN_FALLBACK_EMAIL = "nejamulhaque.works@gmail.com";

export interface SendEmailOptions {
  fromName?: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({
  fromName = "Haque & Sons",
  to,
  subject,
  html,
  replyTo,
}: SendEmailOptions): Promise<{ success: boolean; id?: string; testMode?: boolean; transport?: string; error?: string }> {
  const cleanRecipient = to.trim().toLowerCase();
  const cleanReplyTo = replyTo || gmailUser || ADMIN_FALLBACK_EMAIL;

  // -------------------------------------------------------------
  // PRIORITY 1: Gmail SMTP (Sends to ANY email worldwide for FREE)
  // -------------------------------------------------------------
  if (smtpTransporter && gmailUser) {
    try {
      const fromFormatted = `${fromName} <${gmailUser}>`;
      const info = await smtpTransporter.sendMail({
        from: fromFormatted,
        to: cleanRecipient,
        subject,
        html,
        replyTo: cleanReplyTo,
      });

      console.log(`[Email Dispatcher - Gmail SMTP] Successfully delivered email to ${cleanRecipient} (MessageID: ${info.messageId})`);
      return { success: true, id: info.messageId, transport: "gmail" };
    } catch (smtpErr: any) {
      console.error("[Email Dispatcher - Gmail SMTP] Delivery error:", smtpErr?.message || smtpErr);
      // If SMTP fails and Resend exists, fall through to Resend attempt
    }
  }

  // -------------------------------------------------------------
  // PRIORITY 2: Resend API
  // -------------------------------------------------------------
  if (resend) {
    let fromAddress = RESEND_FROM;
    if (fromName && RESEND_FROM.includes("<")) {
      const rawEmail = RESEND_FROM.slice(RESEND_FROM.indexOf("<"));
      fromAddress = `${fromName} ${rawEmail}`;
    }

    try {
      const response = await resend.emails.send({
        from: fromAddress,
        to: cleanRecipient,
        subject,
        html,
        replyTo: cleanReplyTo,
      });

      if (!response.error) {
        console.log(`[Email Dispatcher - Resend] Successfully delivered email to ${cleanRecipient} (ID: ${response.data?.id})`);
        return { success: true, id: response.data?.id, transport: "resend" };
      }

      // Check if blocked by Resend Free Tier / Unverified Domain restriction
      const errMsg = response.error.message || "";
      const isFreeTierRestriction =
        response.error.name === "validation_error" ||
        errMsg.toLowerCase().includes("testing emails") ||
        errMsg.toLowerCase().includes("verify a domain");

      if (isFreeTierRestriction && cleanRecipient !== ADMIN_FALLBACK_EMAIL) {
        console.warn(
          `[Email Dispatcher - Resend Sandbox] Cannot send to external recipient ${cleanRecipient} without a verified domain. Forwarding test preview copy to admin (${ADMIN_FALLBACK_EMAIL}).`
        );

        const fallbackRes = await resend.emails.send({
          from: fromAddress,
          to: ADMIN_FALLBACK_EMAIL,
          subject: `[Dev Preview: For ${cleanRecipient}] ${subject}`,
          html: `
            <div style="background: #1e1b4b; border: 1px solid #4338ca; border-radius: 8px; padding: 12px 16px; margin-bottom: 20px; font-family: sans-serif; font-size: 13px; color: #e0e7ff;">
              <strong>Resend Sandbox Notice:</strong><br />
              This email was addressed to <code>${cleanRecipient}</code>. To deliver directly to any student email without a domain, set <code>GMAIL_USER</code> and <code>GMAIL_APP_PASSWORD</code> in your environment variables.
            </div>
            ${html}
          `,
          replyTo: cleanRecipient,
        });

        return {
          success: !fallbackRes.error,
          id: fallbackRes.data?.id,
          testMode: true,
          transport: "resend-sandbox-fallback",
          error: fallbackRes.error?.message,
        };
      }

      return { success: false, error: response.error.message };
    } catch (err: any) {
      console.error("[Email Dispatcher - Resend] Exception:", err?.message || err);
      return { success: false, error: err?.message || "Internal email error" };
    }
  }

  console.warn("[Email Dispatcher] Neither Gmail SMTP nor RESEND_API_KEY is configured.");
  return { success: false, error: "No email provider configured (Set GMAIL_USER/GMAIL_APP_PASSWORD or RESEND_API_KEY)" };
}
