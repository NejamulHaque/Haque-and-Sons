import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { internshipApplications, certificates } from "@/db/schema";
import { ensureTablesExist } from "@/db/init-tables";
import { eq, desc } from "drizzle-orm";
import crypto from "crypto";
import { sendEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    await ensureTablesExist();

    const body = await req.json();
    const { applicationId, action = "approve" } = body;

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

    if (action === "reject") {
      const updated = await db
        .update(internshipApplications)
        .set({
          paymentStatus: "Rejected",
          status: "Under Review",
        })
        .where(eq(internshipApplications.id, app.id))
        .returning();

      return NextResponse.json({
        success: true,
        message: "Payment proof rejected. Student notified to re-submit valid proof.",
        application: updated[0],
      });
    }

    // Action === 'approve':
    // 1. Check or generate official Certificate
    const existingCerts = await db
      .select()
      .from(certificates)
      .where(eq(certificates.studentEmail, app.email))
      .orderBy(desc(certificates.createdAt))
      .limit(1);

    let cert = existingCerts[0];

    if (!cert) {
      const randomHex = crypto.randomBytes(3).toString("hex").toUpperCase();
      const currentYear = new Date().getFullYear();
      const certId = `HS-INT-${currentYear}-${randomHex}`;

      const inserted = await db
        .insert(certificates)
        .values({
          id: certId,
          studentName: app.fullName,
          studentEmail: app.email,
          domain: app.domain,
          mode: app.mode,
          internshipType: app.internshipType,
          college: app.college,
          duration: app.duration,
          grade: "Distinction",
          signatoryTitle: "Nejamul Haque, Founder & Lead Engineer",
          status: "Valid",
        })
        .returning();

      cert = inserted[0];
    }

    // 2. Mark application as Approved and Completed
    const updated = await db
      .update(internshipApplications)
      .set({
        paymentStatus: "Approved",
        status: "Completed",
        certificateId: cert.id,
      })
      .where(eq(internshipApplications.id, app.id))
      .returning();

    // 3. Email certificate notification to the student
    await sendEmail({
      fromName: "Haque & Sons Certifications",
      to: app.email,
      subject: `🎓 Payment Approved & Certificate Issued: ${app.fullName} | Haque & Sons`,
      html: `
        <div style="font-family: sans-serif; background: #000; color: #fff; padding: 24px; border-radius: 12px; border: 1px solid #222; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #06b6d4; margin-top: 0;">🎉 Certificate Verification Approved!</h2>
          <p style="color: #cbd5e1; font-size: 14px;">Dear <strong>${app.fullName}</strong>,</p>
          <p style="color: #9ca3af; font-size: 14px; line-height: 1.6;">
            Your UPI payment and exit feedback have been reviewed and approved by <strong>Nejamul Haque</strong>. Your official verifiable certificate is now unlocked and ready for download.
          </p>

          <div style="background: #111; padding: 16px; border-radius: 8px; margin: 20px 0; border: 1px solid #333; text-align: center;">
            <span style="color: #a855f7; font-size: 12px; font-weight: bold; text-transform: uppercase;">Credential ID</span>
            <h3 style="color: #06b6d4; font-family: monospace; font-size: 20px; margin: 6px 0;">${cert.id}</h3>
            <p style="color: #10b981; font-size: 12px; margin: 4px 0;">Grade: Distinction (Top 5%)</p>
          </div>

          <div style="text-align: center; margin-top: 24px;">
            <a href="https://haqueandsons.vercel.app/profile" style="display: inline-block; background: #06b6d4; color: #000; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 13px;">
              Download Certificate & Add to LinkedIn
            </a>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: `Payment approved and certificate ${cert.id} successfully issued to ${app.fullName}!`,
      certificate: cert,
      application: updated[0],
    });
  } catch (error) {
    console.error("Payment approval error:", error);
    return NextResponse.json({ error: "Failed to approve payment." }, { status: 500 });
  }
}
