import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { internshipApplications } from "@/db/schema";
import { ensureTablesExist } from "@/db/init-tables";
import { eq, desc, sql } from "drizzle-orm";
import { sendEmail } from "@/lib/email";
import { dispatchWebhook } from "@/lib/webhooks";

const ADMIN_NOTIFICATION_EMAIL = "haquendsons@gmail.com";

export async function POST(req: NextRequest) {
  try {
    await ensureTablesExist();

    const body = await req.json();
    const { email, applicationId, remarks = "" } = body;

    if (!email && !applicationId) {
      return NextResponse.json({ error: "Candidate email or application ID is required." }, { status: 400 });
    }

    const cleanEmail = email ? String(email).trim().toLowerCase() : "";

    let app = null;

    // 1. Try finding by Application ID first (most robust)
    if (applicationId) {
      const byId = await db
        .select()
        .from(internshipApplications)
        .where(eq(internshipApplications.id, Number(applicationId)))
        .limit(1);
      if (byId && byId.length > 0) {
        app = byId[0];
      }
    }

    // 2. If not found by ID, lookup by case-insensitive email
    if (!app && cleanEmail) {
      const existing = await db
        .select()
        .from(internshipApplications)
        .where(sql`LOWER(${internshipApplications.email}) = ${cleanEmail}`)
        .orderBy(desc(internshipApplications.createdAt))
        .limit(1);

      if (existing && existing.length > 0) {
        app = existing[0];
      }
    }

    if (!app) {
      return NextResponse.json(
        { error: "No active internship application found for this account. Please verify your registered email or submit your internship application." },
        { status: 404 }
      );
    }

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

    const updatedApp = (updated && updated.length > 0) ? updated[0] : app;

    // Dispatch webhook notification (safe & non-blocking)
    try {
      await dispatchWebhook({
        event: "lor.applied",
        title: `LOR Requested: ${app.fullName}`,
        description: `Student applied for an Executive Letter of Recommendation (LOR) for ${app.domain}.`,
        data: {
          student: app.fullName,
          email: app.email,
          college: app.college,
          domain: app.domain,
          remarks: remarks || "Standard LOR Request",
        },
      });
    } catch (webhookErr) {
      console.error("[apply-lor] Webhook dispatch error:", webhookErr);
    }

    // Send notification email to admin channels safely (non-blocking)
    try {
      const adminRecipients = Array.from(
        new Set(
          [
            ADMIN_NOTIFICATION_EMAIL,
            "nejamulhaque.works@gmail.com",
            process.env.ADMIN_EMAIL,
            process.env.GMAIL_USER,
          ].filter(Boolean) as string[]
        )
      );

      const emailSubject = `⭐ Letter of Recommendation (LOR) Requested: ${app.fullName} (${app.domain})`;
      const emailHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0f1d; color: #fff; padding: 24px; border-radius: 12px; border: 1px solid #1e293b; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f59e0b; margin-top: 0;">⭐ New Letter of Recommendation (LOR) Request</h2>
          <p style="color: #94a3b8; font-size: 14px;">An engineering intern has requested an official institutional Letter of Recommendation.</p>
          
          <div style="background: #111827; padding: 16px; border-radius: 8px; margin: 16px 0; border: 1px solid #374151; font-size: 13px;">
            <p style="margin: 6px 0;"><strong>Candidate:</strong> ${app.fullName}</p>
            <p style="margin: 6px 0;"><strong>Email:</strong> <a href="mailto:${app.email}" style="color: #38bdf8;">${app.email}</a></p>
            <p style="margin: 6px 0;"><strong>College:</strong> ${app.college}</p>
            <p style="margin: 6px 0;"><strong>Domain Track:</strong> ${app.domain} (${app.duration})</p>
            <p style="margin: 6px 0;"><strong>Mode:</strong> ${app.mode}</p>
            ${remarks ? `<p style="margin: 6px 0;"><strong>Candidate Note / Highlights:</strong> ${remarks}</p>` : ""}
            ${app.githubRepo ? `<p style="margin: 6px 0;"><strong>Capstone Project:</strong> <a href="${app.githubRepo}" style="color: #38bdf8;">${app.githubRepo}</a></p>` : ""}
          </div>

          <div style="text-align: center; margin-top: 24px;">
            <a href="https://haquestudio.me/admin" style="display: inline-block; background: #f59e0b; color: #000; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 13px;">
              Review & Approve LOR in Admin Command OS
            </a>
          </div>
        </div>
      `;

      await Promise.allSettled(
        adminRecipients.map((recipient) =>
          sendEmail({
            fromName: "Haque & Sons LOR System",
            to: recipient,
            subject: emailSubject,
            html: emailHtml,
          })
        )
      );
    } catch (emailErr) {
      console.error("[apply-lor] Email notification error:", emailErr);
    }

    return NextResponse.json({
      success: true,
      message: "Letter of Recommendation application submitted successfully. It is now pending admin review.",
      application: updatedApp,
    });
  } catch (error: any) {
    console.error("Apply LOR error:", error);
    return NextResponse.json({ error: error?.message || "Failed to submit LOR application." }, { status: 500 });
  }
}
