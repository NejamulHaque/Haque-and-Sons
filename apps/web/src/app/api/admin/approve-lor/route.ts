import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { internshipApplications } from "@/db/schema";
import { ensureTablesExist } from "@/db/init-tables";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import { Resend } from "resend";
import { dispatchWebhook } from "@/lib/webhooks";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    await ensureTablesExist();

    const body = await req.json();
    const { applicationId, remarks = "", grade = "Distinction (Top 1%)" } = body;

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

    // Generate unique LOR Reference Number if not existing
    const currentYear = new Date().getFullYear();
    const randomHex = crypto.randomBytes(3).toString("hex").toUpperCase();
    const lorRefNumber = app.lorRefNumber || `HS-LOR-${currentYear}-${randomHex}`;

    const updated = await db
      .update(internshipApplications)
      .set({
        lorStatus: "Approved",
        lorRefNumber: lorRefNumber,
        lorApprovedAt: new Date(),
        lorGrade: grade,
        lorRemarks: remarks ? String(remarks).trim() : app.lorRemarks,
        lorRejectionReason: null,
      })
      .where(eq(internshipApplications.id, app.id))
      .returning();

    // Dispatch webhook notification
    await dispatchWebhook({
      event: "lor.approved",
      title: `LOR Approved: ${app.fullName}`,
      description: `Admin approved Letter of Recommendation for ${app.fullName} (${lorRefNumber}).`,
      data: {
        student: app.fullName,
        email: app.email,
        lorRefNumber: lorRefNumber,
        domain: app.domain,
        grade: grade,
      },
    });

    // Send email notification to student
    if (resend) {
      try {
        await resend.emails.send({
          from: "Haque & Sons Recommendations <onboarding@resend.dev>",
          to: app.email,
          subject: `🌟 Letter of Recommendation Approved & Issued: ${app.fullName} | Haque & Sons`,
          html: `
            <div style="font-family: sans-serif; background: #0a0f1d; color: #fff; padding: 24px; border-radius: 12px; border: 1px solid #1e293b; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #f59e0b; margin-top: 0;">🌟 Official Letter of Recommendation Approved!</h2>
              <p style="color: #cbd5e1; font-size: 14px;">Dear <strong>${app.fullName}</strong>,</p>
              <p style="color: #94a3b8; font-size: 14px; line-height: 1.6;">
                We are pleased to inform you that your request for an official <strong>Executive Letter of Recommendation (LOR)</strong> has been formally evaluated and approved by <strong>Nejamul Haque</strong> (Founder & Lead Engineer).
              </p>

              <div style="background: #111827; padding: 18px; border-radius: 10px; margin: 20px 0; border: 1px solid #374151; text-align: center;">
                <span style="color: #f59e0b; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Verified LOR Reference Number</span>
                <h3 style="color: #38bdf8; font-family: monospace; font-size: 22px; margin: 8px 0;">${lorRefNumber}</h3>
                <p style="color: #10b981; font-size: 12px; margin: 4px 0; font-weight: bold;">Appraisal Rating: ${grade}</p>
                <p style="color: #94a3b8; font-size: 11px; margin: 4px 0;">Signatory: Nejamul Haque (Founder & Lead Systems Architect)</p>
              </div>

              <p style="color: #cbd5e1; font-size: 13px; line-height: 1.6;">
                Your official LOR features our MSME/ISO credentials, 5-Pillar Competency Matrix, and authorized signature. You can view, print, or download your high-resolution A4 PDF directly from your candidate dashboard.
              </p>

              <div style="text-align: center; margin-top: 24px;">
                <a href="https://haqueandsons.vercel.app/profile" style="display: inline-block; background: #f59e0b; color: #000; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 13px; box-shadow: 0 4px 12px rgba(245,158,11,0.3);">
                  Download Official LOR (PDF)
                </a>
              </div>
            </div>
          `,
        });
      } catch (err) {
        console.warn("Failed to send student LOR approval email:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Letter of Recommendation ${lorRefNumber} approved and issued to ${app.fullName}.`,
      application: updated[0],
    });
  } catch (error) {
    console.error("Approve LOR error:", error);
    return NextResponse.json({ error: "Failed to approve LOR." }, { status: 500 });
  }
}
