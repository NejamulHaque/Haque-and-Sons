import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const ADMIN_NOTIFICATION_EMAIL = "haquendsons@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      email,
      studentName,
      college = "University / College",
      degree = "B.Tech Computer Science",
      domain = "Full-Stack Web Development",
      mode = "Online",
      duration = "4 Weeks",
      internshipType = "Free (Project Certification)",
      offerId,
    } = body;

    if (!email || !studentName) {
      return NextResponse.json(
        { error: "Student email and full name are required." },
        { status: 400 }
      );
    }

    const refNumber = offerId || `HS-OFFER-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const formattedDate = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const isPaid = internshipType.toLowerCase().includes("paid");
    const compensationText = isPaid
      ? "Performance & Milestone-Linked Stipend (Up to ₹15,000/month upon milestone evaluation)"
      : "Full Project Certification & Mentorship Grant (Fully Sponsored)";

    if (resend) {
      // Send Official Offer Letter HTML to the Student
      await resend.emails.send({
        from: "Haque & Sons Internships <onboarding@resend.dev>",
        to: email.trim().toLowerCase(),
        subject: `🎓 Official Offer of Internship: ${studentName} — ${domain} Track | Haque & Sons`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 20px; }
              .container { max-width: 680px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
              .header-ribbon { height: 6px; background: linear-gradient(90deg, #0f172a 0%, #0284c7 50%, #0f172a 100%); }
              .header { padding: 32px 36px 20px 36px; border-bottom: 2px solid #f1f5f9; }
              .logo-title { font-size: 20px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px; text-transform: uppercase; margin: 0; }
              .logo-sub { font-size: 11px; color: #0284c7; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; }
              .meta-box { margin-top: 16px; padding: 10px 14px; background-color: #f8fafc; border-radius: 8px; font-size: 12px; color: #475569; display: flex; justify-content: space-between; border: 1px solid #e2e8f0; }
              .content { padding: 28px 36px; color: #334155; font-size: 13.5px; line-height: 1.65; }
              .recipient-box { margin-bottom: 20px; }
              .recipient-name { font-size: 16px; font-weight: 700; color: #0f172a; margin: 2px 0; }
              .recipient-info { font-size: 12px; color: #64748b; }
              .subject-line { font-size: 14px; font-weight: 700; color: #0369a1; background-color: #f0f9ff; padding: 10px 14px; border-left: 4px solid #0284c7; border-radius: 4px; margin: 20px 0; }
              .matrix-table { width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #fafafa; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; }
              .matrix-table td { padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 12.5px; }
              .matrix-label { font-weight: 600; color: #475569; width: 35%; background-color: #f1f5f9; }
              .matrix-value { font-weight: 700; color: #0f172a; }
              .responsibilities { background-color: #f8fafc; padding: 16px 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0; font-size: 12.5px; }
              .responsibilities ul { margin: 6px 0 0 0; padding-left: 18px; color: #475569; }
              .responsibilities li { margin-bottom: 4px; }
              .signature-section { margin-top: 32px; padding-top: 20px; border-top: 1px solid #e2e8f0; display: table; width: 100%; }
              .sig-col { display: table-cell; vertical-align: top; width: 50%; }
              .sig-name { font-family: 'Georgia', serif; font-style: italic; font-size: 20px; color: #0369a1; font-weight: bold; margin: 6px 0; }
              .sig-title { font-size: 12px; font-weight: 700; color: #0f172a; }
              .sig-org { font-size: 11px; color: #64748b; }
              .cta-btn { display: inline-block; background: #0284c7; color: #ffffff !important; font-weight: 700; font-size: 13px; text-decoration: none; padding: 12px 24px; border-radius: 8px; margin-top: 16px; }
              .footer { background-color: #f8fafc; padding: 20px 36px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 11px; color: #94a3b8; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header-ribbon"></div>
              
              <div class="header">
                <table style="width: 100%;">
                  <tr>
                    <td>
                      <h1 class="logo-title">Haque & Sons</h1>
                      <div class="logo-sub">Software Studio & Engineering Infrastructure</div>
                    </td>
                    <td style="text-align: right; vertical-align: top; font-size: 11px; color: #64748b; line-height: 1.4;">
                      <strong>Ref:</strong> ${refNumber}<br />
                      <strong>Date:</strong> ${formattedDate}
                    </td>
                  </tr>
                </table>
              </div>

              <div class="content">
                <div class="recipient-box">
                  <div style="font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: 700;">To,</div>
                  <div class="recipient-name">${studentName}</div>
                  <div class="recipient-info">${degree} • ${college}</div>
                  <div class="recipient-info">${email}</div>
                </div>

                <div class="subject-line">
                  SUBJECT: OFFICIAL OFFER OF INTERNSHIP & APPOINTMENT — ${domain.toUpperCase()}
                </div>

                <p>Dear <strong>${studentName}</strong>,</p>

                <p>
                  On behalf of <strong>Haque & Sons</strong>, we are pleased to extend this formal offer of internship for the position of <strong>${domain} Intern</strong> with our engineering group.
                </p>

                <table class="matrix-table">
                  <tr>
                    <td class="matrix-label">Domain Track</td>
                    <td class="matrix-value" style="color: #0284c7;">${domain}</td>
                  </tr>
                  <tr>
                    <td class="matrix-label">Engagement Mode</td>
                    <td class="matrix-value">${mode} (Virtual / Remote Sprint)</td>
                  </tr>
                  <tr>
                    <td class="matrix-label">Duration & Term</td>
                    <td class="matrix-value">${duration}</td>
                  </tr>
                  <tr>
                    <td class="matrix-label">Grant / Compensation</td>
                    <td class="matrix-value">${compensationText}</td>
                  </tr>
                  <tr>
                    <td class="matrix-label">Reporting Lead</td>
                    <td class="matrix-value">Nejamul Haque (Founder & Lead Architect)</td>
                  </tr>
                </table>

                <div class="responsibilities">
                  <strong style="color: #0f172a;">Internship Scope & Deliverables:</strong>
                  <ul>
                    <li>Architect, build, and deploy a production-ready capstone software application.</li>
                    <li>Participate in sprint milestones, code reviews, and architectural checkpoints.</li>
                    <li>Complete the mandatory exit feedback form to unlock your verified digital certificate & Letter of Recommendation.</li>
                  </ul>
                </div>

                <p>
                  To manage your sprint deliverables, track milestones, and access your verified certificates, please visit your dedicated Student Dashboard.
                </p>

                <div style="text-align: center; margin: 24px 0;">
                  <a href="https://haqueandsons.vercel.app/profile" class="cta-btn">Access Student Dashboard & Sprint</a>
                </div>

                <div class="signature-section">
                  <div class="sig-col">
                    <div style="font-size: 10px; text-transform: uppercase; color: #94a3b8; font-weight: 700;">Authorized Signatory</div>
                    <div class="sig-name">Nejamul Haque</div>
                    <div class="sig-title">Nejamul Haque</div>
                    <div class="sig-org">Founder & Lead Engineer, Haque & Sons</div>
                  </div>
                  <div class="sig-col" style="text-align: right;">
                    <div style="font-size: 10px; text-transform: uppercase; color: #94a3b8; font-weight: 700;">Issuance Status</div>
                    <div style="font-size: 12px; font-weight: 700; color: #16a34a; margin-top: 6px;">✓ VERIFIED APPOINTMENT</div>
                    <div style="font-size: 11px; color: #64748b; margin-top: 4px;">CIN / Reg: UDYAM-DL-03-0089421</div>
                  </div>
                </div>
              </div>

              <div class="footer">
                Haque & Sons Software Studio Pvt. Ltd. • New Delhi, India<br />
                Official Verification: <a href="https://haqueandsons.vercel.app/verify" style="color: #0284c7; text-decoration: none;">haqueandsons.vercel.app/verify</a> • Strictly Confidential
              </div>
            </div>
          </body>
          </html>
        `,
      });

      // Also copy Admin at haquendsons@gmail.com
      try {
        await resend.emails.send({
          from: "Haque & Sons Internships <onboarding@resend.dev>",
          to: ADMIN_NOTIFICATION_EMAIL,
          subject: `📄 Offer Letter Dispatched: ${studentName} (${domain})`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; background: #000; color: #fff;">
              <h3 style="color: #06b6d4;">📄 Offer Letter Successfully Sent</h3>
              <p>Official offer letter (Ref: <strong>${refNumber}</strong>) was dispatched to <strong>${studentName}</strong> (<a href="mailto:${email}" style="color: #38bdf8;">${email}</a>).</p>
              <p><strong>Domain:</strong> ${domain} | <strong>Mode:</strong> ${mode} | <strong>Duration:</strong> ${duration}</p>
            </div>
          `,
        });
      } catch (adminErr) {
        console.warn("Admin notification copy failed:", adminErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Official Offer Letter successfully emailed to ${email}.`,
      refNumber,
    });
  } catch (error) {
    console.error("Error sending offer letter email:", error);
    return NextResponse.json(
      { error: "Failed to dispatch offer letter email." },
      { status: 500 }
    );
  }
}
