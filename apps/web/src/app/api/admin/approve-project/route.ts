import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { internshipApplications } from "@/db/schema";
import { ensureTablesExist } from "@/db/init-tables";
import { eq } from "drizzle-orm";
import { sendEmail } from "@/lib/email";
import { dispatchWebhook } from "@/lib/webhooks";

export async function POST(req: NextRequest) {
  try {
    await ensureTablesExist();

    const body = await req.json();
    const {
      applicationId,
      action = "approve", // approve | reject | revision
      grade = "Distinction (Grade O)",
      remarks = "",
      assignment1Status = "Approved",
      assignment2Status = "Approved",
      assignment3Status = "Approved",
    } = body;

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

    if (action === "approve") {
      const updated = await db
        .update(internshipApplications)
        .set({
          projectStatus: "Approved",
          projectGrade: grade,
          projectRemarks: remarks ? String(remarks).trim() : "All 3 domain assignments and project ZIP archive evaluated and approved with Distinction.",
          projectApprovedAt: new Date(),
          assignment1Status: assignment1Status || "Approved",
          assignment2Status: assignment2Status || "Approved",
          assignment3Status: assignment3Status || "Approved",
          status: "Completed",
        })
        .where(eq(internshipApplications.id, app.id))
        .returning();

      // Dispatch webhook notification
      await dispatchWebhook({
        event: "project.approved",
        title: `AICTE Practicum Approved: ${app.fullName}`,
        description: `Admin approved 3 assignments & project ZIP for ${app.fullName} (${app.domain}) with grade ${grade}.`,
        data: {
          student: app.fullName,
          email: app.email,
          domain: app.domain,
          grade: grade,
          zipUrl: app.projectZipUrl,
        },
      });

      // Send congratulatory email
      try {
        await sendEmail({
          to: app.email,
          subject: `🎉 AICTE Practicum & Assignments Approved: ${app.domain} — Haque & Sons`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0b0f19; color: #ffffff; padding: 30px; border-radius: 16px; border: 1px solid rgba(6,182,212,0.3);">
              <h2 style="color: #38bdf8; margin-bottom: 8px;">AICTE Practicum & Project Codebase Approved</h2>
              <p style="color: #94a3b8; font-size: 14px; margin-bottom: 20px;">Congratulations <strong>${app.fullName}</strong>,</p>
              
              <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6;">
                Founder & Lead Systems Engineer <strong>Nejamul Haque</strong> has thoroughly evaluated your 3 domain assignments and project ZIP archive for the <strong style="color: #38bdf8;">${app.domain}</strong> track.
              </p>

              <div style="background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.3); border-radius: 12px; padding: 16px; margin: 20px 0;">
                <p style="margin: 0 0 6px 0; font-size: 13px; color: #34d399; font-weight: bold;">Evaluation Status: ✓ Approved with Distinction</p>
                <p style="margin: 0 0 6px 0; font-size: 12px; color: #e2e8f0;">Grade: <strong>${grade}</strong></p>
                ${remarks ? `<p style="margin: 0; font-size: 12px; color: #94a3b8; font-style: italic;">"${remarks}"</p>` : ""}
              </div>

              <p style="color: #cbd5e1; font-size: 13px; line-height: 1.6;">
                Your AICTE Activity Points and NCrF Academic Credits are officially cleared. You may now download your verified <strong>AICTE Activity Logbook</strong>, <strong>Certificate of Completion</strong>, and <strong>Letter of Recommendation (LOR)</strong> directly from your candidate profile dashboard.
              </p>

              <div style="margin-top: 25px; text-align: center;">
                <a href="https://haqueandsons.vercel.app/profile" style="background: linear-gradient(135deg, #06b6d4, #2563eb); color: #ffffff; padding: 12px 28px; border-radius: 10px; font-weight: bold; text-decoration: none; display: inline-block;">
                  Open Candidate Profile
                </a>
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        console.warn("Project approval email error:", emailErr);
      }

      return NextResponse.json({
        success: true,
        message: "Project and assignments approved successfully.",
        application: updated[0],
      });
    } else {
      // Revision Needed / Rejection
      const updated = await db
        .update(internshipApplications)
        .set({
          projectStatus: "Needs Revision",
          projectRemarks: remarks ? String(remarks).trim() : "Please update deliverables according to rubric guidelines and re-upload.",
          assignment1Status: assignment1Status || "Pending",
          assignment2Status: assignment2Status || "Pending",
          assignment3Status: assignment3Status || "Pending",
        })
        .where(eq(internshipApplications.id, app.id))
        .returning();

      return NextResponse.json({
        success: true,
        message: "Feedback sent to student for revision.",
        application: updated[0],
      });
    }
  } catch (error: any) {
    console.error("Admin approve project error:", error);
    return NextResponse.json({ error: error?.message || "Failed to update project status." }, { status: 500 });
  }
}
