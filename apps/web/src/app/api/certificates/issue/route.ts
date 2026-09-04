import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { certificates, internshipApplications } from "@/db/schema";
import { ensureTablesExist } from "@/db/init-tables";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    await ensureTablesExist();

    const body = await req.json();
    const {
      studentName,
      studentEmail,
      domain,
      mode = "Online",
      internshipType = "Free",
      college = "Engineering College",
      duration = "4 Weeks",
      grade = "Distinction",
      applicationId,
    } = body;

    if (!studentName || !studentEmail || !domain) {
      return NextResponse.json(
        { error: "Student Name, Email, and Domain are required to issue a certificate." },
        { status: 400 }
      );
    }

    // Generate unique Certificate ID e.g., HS-INT-2026-A8F9B2
    const randomHex = crypto.randomBytes(3).toString("hex").toUpperCase();
    const currentYear = new Date().getFullYear();
    const certificateId = `HS-INT-${currentYear}-${randomHex}`;

    const inserted = await db
      .insert(certificates)
      .values({
        id: certificateId,
        studentName: studentName.trim(),
        studentEmail: studentEmail.trim().toLowerCase(),
        domain: domain.trim(),
        mode: mode.trim(),
        internshipType: internshipType.trim(),
        college: college.trim(),
        duration: duration.trim(),
        grade: grade.trim(),
        signatoryTitle: "Nejamul Haque, Founder & Lead Engineer",
        status: "Valid",
      })
      .returning();

    // If linked to an application, update status to Completed
    if (applicationId) {
      try {
        await db
          .update(internshipApplications)
          .set({ status: "Completed" })
          .where(eq(internshipApplications.id, Number(applicationId)));
      } catch (err) {
        console.warn("Could not update linked application status:", err);
      }
    }

    const cert = inserted[0];
    const verificationUrl = `https://haqueandsons.vercel.app/verify/${certificateId}`;

    // Send email to student with their certificate
    if (resend) {
      try {
        await resend.emails.send({
          from: "Haque & Sons Internships <onboarding@resend.dev>",
          to: studentEmail,
          subject: `🎓 Your Verified Certificate of Completion from Haque & Sons (${certificateId})`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #000; color: #fff; padding: 28px; border-radius: 12px; border: 1px solid #222;">
              <h1 style="color: #06b6d4; font-size: 22px; margin-top: 0;">Congratulations, ${studentName}! 🎓</h1>
              <p style="color: #9ca3af; font-size: 14px; line-height: 1.6;">
                We are thrilled to present your official <strong>Certificate of Completion</strong> for successfully completing your <strong>${domain}</strong> internship (${mode} • ${duration}) at Haque & Sons with grade <strong>${grade}</strong>.
              </p>
              
              <div style="background: #111; padding: 20px; border-radius: 8px; margin: 24px 0; border: 1px solid #333; text-align: center;">
                <p style="color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px 0;">Certificate Identifier</p>
                <p style="color: #38bdf8; font-family: monospace; font-size: 18px; font-weight: bold; margin: 0 0 16px 0;">${certificateId}</p>
                
                <a href="${verificationUrl}" style="display: inline-block; background: linear-gradient(135deg, #06b6d4, #3b82f6); color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; font-size: 14px;">
                  View & Download Verified Certificate 📜
                </a>
              </div>

              <p style="color: #9ca3af; font-size: 13px;">
                You can add this verified credential to your <strong>LinkedIn profile</strong>, resume, and portfolio. Anyone scanning your certificate QR code will be able to verify its cryptographic authenticity.
              </p>

              <div style="margin-top: 30px; border-top: 1px solid #222; padding-top: 20px;">
                <p style="color: #cbd5e1; font-size: 13px; margin: 0;"><strong>Nejamul Haque</strong></p>
                <p style="color: #6b7280; font-size: 12px; margin: 2px 0 0 0;">Founder & Lead Engineer, Haque & Sons</p>
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        console.warn("Could not email certificate link:", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Certificate issued successfully.",
      certificate: cert,
      verificationUrl,
    });
  } catch (error) {
    console.error("Certificate issuance error:", error);
    return NextResponse.json(
      { error: "Failed to issue certificate. Please check fields." },
      { status: 500 }
    );
  }
}
