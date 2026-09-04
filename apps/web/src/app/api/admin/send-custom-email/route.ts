import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    const { to, subject, message, studentName } = await req.json();

    if (!to || !subject || !message) {
      return NextResponse.json({ error: "To, subject, and message are required." }, { status: 400 });
    }

    if (resend) {
      await resend.emails.send({
        from: "Haque & Sons Admin <onboarding@resend.dev>",
        to: to.trim().toLowerCase(),
        subject: subject.trim(),
        html: `
          <div style="font-family: sans-serif; background: #000; color: #fff; padding: 24px; border-radius: 12px; border: 1px solid #222; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #06b6d4; margin-top: 0;">Haque & Sons Engineering Team</h2>
            ${studentName ? `<p style="color: #cbd5e1; font-size: 14px;">Hi <strong>${studentName}</strong>,</p>` : ""}
            <div style="background: #111; padding: 16px; border-radius: 8px; margin: 16px 0; border: 1px solid #333; font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap;">${message}</div>
            <p style="font-size: 12px; color: #64748b; margin-top: 24px;">
              Sent by Nejamul Haque, Founder & Lead Engineer &bull; Haque & Sons Studio OS<br />
              <a href="https://haqueandsons.vercel.app" style="color: #06b6d4;">haqueandsons.vercel.app</a>
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Email sent successfully to " + to,
    });
  } catch (error) {
    console.error("Send custom email error:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
