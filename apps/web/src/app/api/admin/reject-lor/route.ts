import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { internshipApplications } from "@/db/schema";
import { ensureTablesExist } from "@/db/init-tables";
import { eq } from "drizzle-orm";
import { Resend } from "resend";
import { dispatchWebhook } from "@/lib/webhooks";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    await ensureTablesExist();

    const body = await req.json();
    const { applicationId, reason = "" } = body;

    if (!applicationId) {
      return NextResponse.json({ error: "Application ID is required." }, { status: 400 });
    }

    const appRecords = await db
      .select()
      .from(internshipApplications)
      .where(eq(internshipApplications.id, Number(applicationId)))
      .limit(1);

    if (!appRecords || appRecords.length === 0) {
      return NextResponse.json({ error: "Application not found." }, { status: 404 });
    }

    const app = appRecords[0];
    const rejectionReason =
      reason && String(reason).trim().length > 0
        ? String(reason).trim()
        : "Practicum deliverables or repository contributions require further progress before executive endorsement.";

    const updated = await db
      .update(internshipApplications)
      .set({
        lorStatus: "Rejected",
        lorRejectionReason: rejectionReason,
      })
      .where(eq(internshipApplications.id, app.id))
      .returning();

    // Dispatch webhook notification
    await dispatchWebhook({
      event: "lor.rejected",
      title: `LOR Request Rejected: ${app.fullName}`,
      description: `Admin rejected LOR request for ${app.fullName}. Reason: ${rejectionReason}`,
      data: {
        student: app.fullName,
        email: app.email,
        reason: rejectionReason,
      },
    });

    // Send email notification to student
    if (resend) {
      try {
        await resend.emails.send({
          from: "Haque & Sons Engineering Team <onboarding@resend.dev>",
          to: app.email,
          subject: `Notice Regarding Your LOR Request: ${app.fullName} | Haque & Sons`,
          html: `
            <div style="font-family: sans-serif; background: #0a0f1d; color: #fff; padding: 24px; border-radius: 12px; border: 1px solid #1e293b; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #f43f5e; margin-top: 0;">Notice Regarding LOR Request</h2>
              <p style="color: #cbd5e1; font-size: 14px;">Dear <strong>${app.fullName}</strong>,</p>
              <p style="color: #94a3b8; font-size: 14px; line-height: 1.6;">
                Thank you for submitting your request for an official Letter of Recommendation (LOR) for the <strong>${app.domain}</strong> track.
              </p>
              <p style="color: #94a3b8; font-size: 14px; line-height: 1.6;">
                After technical evaluation by our engineering team, your request cannot be approved at this stage for the following reason:
              </p>

              <div style="background: #1e1014; padding: 16px; border-radius: 8px; margin: 16px 0; border: 1px solid #881337; font-size: 13px; color: #fda4af;">
                <strong>Review Feedback:</strong> ${rejectionReason}
              </div>

              <p style="color: #cbd5e1; font-size: 13px; line-height: 1.6;">
                You may update your capstone repository, complete outstanding milestone tasks, and submit a re-application directly from your profile dashboard once resolved.
              </p>

              <div style="text-align: center; margin-top: 24px;">
                <a href="https://haqueandsons.vercel.app/profile" style="display: inline-block; background: #38bdf8; color: #000; font-weight: bold; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 13px;">
                  Open Candidate Profile
                </a>
              </div>
            </div>
          `,
        });
      } catch (err) {
        console.warn("Failed to send student LOR rejection email:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: `LOR request for ${app.fullName} marked as Rejected.`,
      application: updated[0],
    });
  } catch (error) {
    console.error("Reject LOR error:", error);
    return NextResponse.json({ error: "Failed to reject LOR." }, { status: 500 });
  }
}
