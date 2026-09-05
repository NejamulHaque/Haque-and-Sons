import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

// Configurable sender identity. If you verify a domain in resend.com/domains (e.g. haqueandsons.in),
// set RESEND_FROM_EMAIL="Haque & Sons <team@haqueandsons.in>" in your .env.local / Vercel env.
const DEFAULT_FROM = process.env.RESEND_FROM_EMAIL || "Haque & Sons <onboarding@resend.dev>";
const ADMIN_FALLBACK_EMAIL = "nejamulhaque.works@gmail.com";

export interface SendEmailOptions {
  fromName?: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({
  fromName,
  to,
  subject,
  html,
  replyTo,
}: SendEmailOptions): Promise<{ success: boolean; id?: string; testMode?: boolean; error?: string }> {
  if (!resend) {
    console.warn("[Email Dispatcher] Notice: RESEND_API_KEY not configured. Skipping email dispatch.");
    return { success: false, error: "RESEND_API_KEY not configured" };
  }

  // Determine From address
  let fromAddress = DEFAULT_FROM;
  if (fromName && DEFAULT_FROM.includes("<")) {
    const rawEmail = DEFAULT_FROM.slice(DEFAULT_FROM.indexOf("<"));
    fromAddress = `${fromName} ${rawEmail}`;
  }

  const cleanRecipient = to.trim().toLowerCase();

  try {
    // 1. Primary Attempt: Send to recipient
    const response = await resend.emails.send({
      from: fromAddress,
      to: cleanRecipient,
      subject,
      html,
      replyTo: replyTo || "nejamulhaque.works@gmail.com",
    });

    if (response.error) {
      const errMsg = response.error.message || "";
      const isFreeTierRestriction =
        response.error.name === "validation_error" ||
        errMsg.toLowerCase().includes("testing emails") ||
        errMsg.toLowerCase().includes("verify a domain");

      if (isFreeTierRestriction && cleanRecipient !== ADMIN_FALLBACK_EMAIL) {
        console.warn(
          `[Email Dispatcher] Resend Sandbox Mode: Cannot deliver to ${cleanRecipient} without a verified domain. Forwarding test preview copy to admin (${ADMIN_FALLBACK_EMAIL}).`
        );

        // Fallback Attempt: Dispatch to admin testing email with debug header
        const fallbackRes = await resend.emails.send({
          from: fromAddress,
          to: ADMIN_FALLBACK_EMAIL,
          subject: `[Dev Preview: For ${cleanRecipient}] ${subject}`,
          html: `
            <div style="background: #1e1b4b; border: 1px solid #4338ca; border-radius: 8px; padding: 12px 16px; margin-bottom: 20px; font-family: sans-serif; font-size: 13px; color: #e0e7ff;">
              <strong>Resend Sandbox Mode Notice:</strong><br />
              This email was intended for <code>${cleanRecipient}</code>. To send to arbitrary student emails directly, add and verify your custom domain at <a href="https://resend.com/domains" style="color: #38bdf8; text-decoration: underline;">resend.com/domains</a> and set <code>RESEND_FROM_EMAIL="Haque & Sons &lt;internships@yourdomain.com&gt;"</code>.
            </div>
            ${html}
          `,
          replyTo: cleanRecipient,
        });

        return {
          success: !fallbackRes.error,
          id: fallbackRes.data?.id,
          testMode: true,
          error: fallbackRes.error?.message,
        };
      }

      console.error("[Email Dispatcher] Resend error:", response.error);
      return { success: false, error: response.error.message };
    }

    return { success: true, id: response.data?.id };
  } catch (error: any) {
    console.error("[Email Dispatcher] Exception sending email:", error?.message || error);
    return { success: false, error: error?.message || "Internal error sending email" };
  }
}
