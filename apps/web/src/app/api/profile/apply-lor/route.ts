import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { internshipApplications } from "@/db/schema";
import { ensureTablesExist } from "@/db/init-tables";
import { eq, desc } from "drizzle-orm";
import { sendEmail } from "@/lib/email";
import { dispatchWebhook } from "@/lib/webhooks";

const ADMIN_NOTIFICATION_EMAIL = "haquendsons@gmail.com";

export async function POST(req: NextRequest) {
  try {
    await ensureTablesExist();

    const body = await req.json();
    const { email, remarks = "" } = body;

    if (!email) {
      return NextResponse.json({ error: "Candidate email is required." }, { status: 400 });
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
        { error: "No active internship application found for this account." },
        { status: 404 }
      );
    }

    const app = existing[0];

    const updated = await db
      .update(internshipApplications)
      .set({
        lorStatus: "Pending",
        lorRemarks: String(remarks || "").trim(),
        lorAppliedAt: new Date(),
        lorRejectionReason: null,
      })
      .where(eq(internshipApplications.id, app.id))
      .returning();

    // Dispatch webhook notification
    await dispatchWebhook({
      event: "lor.applied",
      title: `LOR Requested: ${app.fullName}`,
      description: `Student applied for an Executive Letter of Recommendation (LOR) for ${app.domain}.`,
      data: {
        student: app.fullName,
        email: cleanEmail,
        college: app.college,
        domain: app.domain,
        remarks: remarks || "Standard LOR Request",
      },
    });

    // Send notification email to admin
    await sendEmail({
      fromName: "Haque & Sons LOR System",
      to: ADMIN_NOTIFICATION_EMAIL,
      subject: `⭐ Letter of Recommendation (LOR) Requested: ${app.fullName} (${app.domain})`,
      html: `
        <div style="font-family: sans-serif; background: #0a0f1d; color: #fff; padding: 24px; border-radius: 12px; border: 1px solid #1e293b; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f59e0b; margin-top: 0;">⭐ New Letter of Recommendation (LOR) Request</h2>
          <p style="color: #94a3b8; font-size: 14px;">An engineering intern has requested an official institutional Letter of Recommendation.</p>
          
          <div style="background: #111827; padding: 16px; border-radius: 8px; margin: 16px 0; border: 1px solid #374151; font-size: 13px;">
            <p style="margin: 6px 0;"><strong>Candidate:</strong> ${app.fullName}</p>
            <p style="margin: 6px 0;"><strong>Email:</strong> ${cleanEmail}</p>
            <p style="margin: 6px 0;"><strong>College:</strong> ${app.college}</p>
            <p style="margin: 6px 0;"><strong>Domain Track:</strong> ${app.domain} (${app.duration})</p>
            ${remarks ? `<p style="margin: 6px 0;"><strong>Candidate Note / Highlights:</strong> ${remarks}</p>` : ""}
            ${app.githubRepo ? `<p style="margin: 6px 0;"><strong>Capstone Project:</strong> <a href="${app.githubRepo}" style="color: #38bdf8;">${app.githubRepo}</a></p>` : ""}
          </div>

          <div style="text-align: center; margin-top: 24px;">
            <a href="https://haqueandsons.vercel.app/admin" style="display: inline-block; background: #f59e0b; color: #000; font-weight: bold; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 13px;">
              Review & Approve LOR in Admin Command OS
            </a>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Letter of Recommendation application submitted successfully. It is now pending admin review.",
      application: updated[0],
    });
  } catch (error) {
    console.error("Apply LOR error:", error);
    return NextResponse.json({ error: "Failed to submit LOR application." }, { status: 500 });
  }
}
