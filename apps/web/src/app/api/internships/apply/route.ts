import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { internshipApplications } from "@/db/schema";
import { ensureTablesExist } from "@/db/init-tables";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const ADMIN_NOTIFICATION_EMAIL = "haquendsons@gmail.com";

export async function POST(req: NextRequest) {
  try {
    await ensureTablesExist();

    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      college,
      degree,
      graduationYear,
      domain,
      mode = "Online",
      internshipType = "Free",
      duration = "4 Weeks",
      githubUrl = "",
      linkedinUrl = "",
      portfolioUrl = "",
      resumeLink = "",
      statement = "",
    } = body;

    if (!fullName || !email || !phone || !college || !domain) {
      return NextResponse.json(
        { error: "Please provide all required fields: Name, Email, Phone, College, and Domain." },
        { status: 400 }
      );
    }

    // Insert into Neon Postgres Database
    const inserted = await db
      .insert(internshipApplications)
      .values({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        college: college.trim(),
        degree: (degree || "B.Tech").trim(),
        graduationYear: (graduationYear || "2026").trim(),
        domain: domain.trim(),
        mode: mode.trim(),
        internshipType: internshipType.trim(),
        duration: duration.trim(),
        githubUrl: (githubUrl || "").trim(),
        linkedinUrl: (linkedinUrl || "").trim(),
        portfolioUrl: (portfolioUrl || "").trim(),
        resumeLink: (resumeLink || "").trim(),
        statement: (statement || "").trim(),
        status: "Pending",
      })
      .returning();

    const application = inserted[0];

    // Attempt to send email alerts via Resend
    if (resend) {
      try {
        // 1. Alert to Admin at haquendsons@gmail.com
        await resend.emails.send({
          from: "Haque & Sons Internships <onboarding@resend.dev>",
          to: ADMIN_NOTIFICATION_EMAIL,
          subject: `🎓 New Internship Application: ${fullName} (${domain} - ${mode} / ${internshipType})`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #000; color: #fff; padding: 24px; border-radius: 12px; border: 1px solid #222;">
              <h2 style="color: #06b6d4; margin-top: 0;">🎓 New Internship Application Received</h2>
              <p style="color: #9ca3af; font-size: 14px;">An applicant has submitted an application for the Haque & Sons College Internship Program.</p>
              
              <div style="background: #111; padding: 16px; border-radius: 8px; margin: 20px 0; border: 1px solid #333;">
                <p style="margin: 6px 0;"><strong>Name:</strong> ${fullName}</p>
                <p style="margin: 6px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #06b6d4;">${email}</a></p>
                <p style="margin: 6px 0;"><strong>Phone:</strong> ${phone}</p>
                <p style="margin: 6px 0;"><strong>College:</strong> ${college}</p>
                <p style="margin: 6px 0;"><strong>Degree & Batch:</strong> ${degree} (${graduationYear})</p>
                <p style="margin: 6px 0;"><strong>Domain Track:</strong> <span style="color: #a855f7; font-weight: bold;">${domain}</span></p>
                <p style="margin: 6px 0;"><strong>Mode:</strong> ${mode}</p>
                <p style="margin: 6px 0;"><strong>Track Type:</strong> ${internshipType}</p>
                <p style="margin: 6px 0;"><strong>Duration:</strong> ${duration}</p>
                ${githubUrl ? `<p style="margin: 6px 0;"><strong>GitHub:</strong> <a href="${githubUrl}" style="color: #06b6d4;">${githubUrl}</a></p>` : ""}
                ${linkedinUrl ? `<p style="margin: 6px 0;"><strong>LinkedIn:</strong> <a href="${linkedinUrl}" style="color: #06b6d4;">${linkedinUrl}</a></p>` : ""}
                ${resumeLink ? `<p style="margin: 6px 0;"><strong>Resume Link:</strong> <a href="${resumeLink}" style="color: #06b6d4;">${resumeLink}</a></p>` : ""}
              </div>

              ${statement ? `
                <div style="background: #0f172a; padding: 14px; border-radius: 8px; border-left: 3px solid #06b6d4; margin-bottom: 20px;">
                  <strong style="color: #38bdf8; font-size: 13px;">Why Haque & Sons:</strong>
                  <p style="color: #cbd5e1; font-size: 13px; margin-top: 6px; white-space: pre-wrap;">${statement}</p>
                </div>
              ` : ""}

              <p style="font-size: 12px; color: #6b7280; text-align: center; margin-top: 24px;">
                Review and issue certificates from the <a href="https://haqueandsons.vercel.app/admin" style="color: #06b6d4;">Admin Command OS</a>.
              </p>
            </div>
          `,
        });

        // 2. Confirmation to Applicant
        await resend.emails.send({
          from: "Haque & Sons <onboarding@resend.dev>",
          to: email,
          subject: `Application Received: ${domain} Internship at Haque & Sons`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #000; color: #fff; padding: 24px; border-radius: 12px; border: 1px solid #222;">
              <h2 style="color: #06b6d4; margin-top: 0;">Application Received! 🚀</h2>
              <p style="color: #cbd5e1; font-size: 14px;">Hi <strong>${fullName}</strong>,</p>
              <p style="color: #9ca3af; font-size: 14px; line-height: 1.6;">
                Thank you for applying for the <strong>${domain}</strong> internship (${mode} • ${duration}) at Haque & Sons.
              </p>
              
              <div style="background: #111; padding: 16px; border-radius: 8px; margin: 20px 0; border: 1px solid #333;">
                <p style="margin: 4px 0; font-size: 13px; color: #9ca3af;"><strong>Track:</strong> ${domain}</p>
                <p style="margin: 4px 0; font-size: 13px; color: #9ca3af;"><strong>Mode:</strong> ${mode}</p>
                <p style="margin: 4px 0; font-size: 13px; color: #9ca3af;"><strong>Type:</strong> ${internshipType}</p>
                <p style="margin: 4px 0; font-size: 13px; color: #9ca3af;"><strong>Status:</strong> Under Review</p>
              </div>

              <p style="color: #9ca3af; font-size: 14px; line-height: 1.6;">
                Our engineering team led by <strong>Nejamul Haque</strong> will review your portfolio/profile and email you with project onboarding instructions.
              </p>
              
              <p style="font-size: 12px; color: #6b7280; text-align: center; margin-top: 30px; border-top: 1px solid #222; padding-top: 16px;">
                Haque & Sons — Next-Gen Software Studio<br />
                <a href="https://haqueandsons.vercel.app" style="color: #06b6d4;">haqueandsons.vercel.app</a>
              </p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.warn("Resend email delivery warning:", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully. We have notified the team!",
      applicationId: application?.id,
    });
  } catch (error) {
    console.error("Internship application submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit application. Please try again." },
      { status: 500 }
    );
  }
}
