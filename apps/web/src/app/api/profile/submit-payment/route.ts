import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { internshipApplications } from "@/db/schema";
import { ensureTablesExist } from "@/db/init-tables";
import { eq, desc } from "drizzle-orm";
import { Resend } from "resend";
import { dispatchWebhook } from "@/lib/webhooks";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const ADMIN_NOTIFICATION_EMAIL = "haquendsons@gmail.com";

export async function POST(req: NextRequest) {
  try {
    await ensureTablesExist();

    const body = await req.json();
    const {
      email,
      feedbackRating = "5",
      feedbackText = "",
      paymentUtr = "",
      paymentScreenshot = "",
    } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    if (!paymentUtr && !paymentScreenshot) {
      return NextResponse.json(
        { error: "Please provide either the 12-digit UPI UTR number or upload payment screenshot." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    const existing = await db
      .select()
      .from(internshipApplications)
      .where(eq(internshipApplications.email, cleanEmail))
      .orderBy(desc(internshipApplications.createdAt))
      .limit(1);

    if (!existing || existing.length === 0) {
      return NextResponse.json(
        { error: "No active internship application found for this email." },
        { status: 404 }
      );
    }

    const app = existing[0];

    const updated = await db
      .update(internshipApplications)
      .set({
        googleFormSubmitted: true,
        feedbackRating: String(feedbackRating),
        feedbackText: String(feedbackText || ""),
        paymentUtr: String(paymentUtr || "").trim(),
        paymentScreenshot: String(paymentScreenshot || ""),
        paymentStatus: "Pending Approval",
        status: "Payment Review",
      })
      .where(eq(internshipApplications.id, app.id))
      .returning();

    const mode = app.mode || "Online";
    const expectedFee = mode === "Offline" ? 249 : mode === "Hybrid" ? 199 : 99;

    // Dispatch Discord/Slack webhook notification
    await dispatchWebhook({
      event: "payment.submitted",
      title: `Payment Submitted: ${app.fullName} (₹${expectedFee})`,
      description: `Student submitted UPI payment proof and Google exit feedback form for ${app.domain}.`,
      data: {
        student: app.fullName,
        email: cleanEmail,
        college: app.college,
        track: `${mode} Track (₹${expectedFee})`,
        utr: paymentUtr || "Screenshot Attached",
        rating: `${feedbackRating} / 5 Stars`,
      },
    });

    // Alert Admin at haquendsons@gmail.com about payment proof & evaluation submission
    if (resend) {
      try {
        await resend.emails.send({
          from: "Haque & Sons Payment Verification <onboarding@resend.dev>",
          to: ADMIN_NOTIFICATION_EMAIL,
          subject: `💳 Payment Proof Submitted: ${app.fullName} - ${mode} Track (₹${expectedFee}) (UTR: ${paymentUtr || "Screenshot Attached"})`,
          html: `
            <div style="font-family: sans-serif; background: #0a0f1d; color: #fff; padding: 24px; border-radius: 12px; border: 1px solid #1e293b; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #06b6d4; margin-top: 0;">💳 Certificate Processing Fee & Feedback Submitted</h2>
              <p style="color: #94a3b8; font-size: 14px;">An intern has submitted their Google form feedback and UPI payment proof for approval.</p>
              
              <div style="background: #111827; padding: 16px; border-radius: 8px; margin: 16px 0; border: 1px solid #374151; font-size: 13px;">
                <p style="margin: 6px 0;"><strong>Student Name:</strong> ${app.fullName}</p>
                <p style="margin: 6px 0;"><strong>Email:</strong> ${cleanEmail}</p>
                <p style="margin: 6px 0;"><strong>Domain Track:</strong> ${app.domain}</p>
                <p style="margin: 6px 0;"><strong>Internship Mode:</strong> <span style="color: #38bdf8; font-weight: bold;">${mode} Track</span> (Fee: <span style="color: #facc15; font-weight: bold;">₹${expectedFee}</span>)</p>
                <p style="margin: 6px 0;"><strong>UPI UTR Number:</strong> <span style="color: #facc15; font-family: monospace; font-weight: bold;">${paymentUtr || "None provided"}</span></p>
                <p style="margin: 6px 0;"><strong>Feedback Rating:</strong> ${feedbackRating} / 5 Stars</p>
                ${feedbackText ? `<p style="margin: 6px 0;"><strong>Feedback Notes:</strong> ${feedbackText}</p>` : ""}
                ${app.githubRepo ? `<p style="margin: 6px 0;"><strong>GitHub Capstone:</strong> <a href="${app.githubRepo}" style="color: #38bdf8;">${app.githubRepo}</a></p>` : ""}
              </div>

              <div style="text-align: center; margin-top: 24px;">
                <a href="https://haqueandsons.vercel.app/admin" style="display: inline-block; background: #06b6d4; color: #000; font-weight: bold; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 13px;">
                  Open Admin Command OS to Approve Certificate
                </a>
              </div>
            </div>
          `,
        });
      } catch (err) {
        console.warn("Failed to send admin payment alert email:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Payment proof and feedback submitted. Awaiting admin approval to unlock certificate.",
      application: updated[0],
    });
  } catch (error) {
    console.error("Payment submission error:", error);
    return NextResponse.json({ error: "Failed to submit payment proof." }, { status: 500 });
  }
}
