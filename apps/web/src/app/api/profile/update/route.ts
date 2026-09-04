import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { internshipApplications } from "@/db/schema";
import { ensureTablesExist } from "@/db/init-tables";
import { eq, desc } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    await ensureTablesExist();

    const body = await req.json();
    const {
      fullName,
      email,
      phone = "",
      college = "",
      degree = "",
      graduationYear = "2026",
      domain = "Full-Stack Web Development",
      mode = "Online",
      internshipType = "Free (Project Certification)",
      duration = "4 Weeks",
      githubUrl = "",
      linkedinUrl = "",
      portfolioUrl = "",
      statement = "",
    } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check if an application already exists for this email
    const existing = await db
      .select()
      .from(internshipApplications)
      .where(eq(internshipApplications.email, cleanEmail))
      .orderBy(desc(internshipApplications.createdAt))
      .limit(1);

    let result;
    if (existing && existing.length > 0) {
      // Update existing record
      const updated = await db
        .update(internshipApplications)
        .set({
          fullName: fullName || existing[0].fullName,
          phone: phone || existing[0].phone,
          college: college || existing[0].college,
          degree: degree || existing[0].degree,
          graduationYear: graduationYear || existing[0].graduationYear,
          domain: domain || existing[0].domain,
          mode: mode || existing[0].mode,
          internshipType: internshipType || existing[0].internshipType,
          duration: duration || existing[0].duration,
          githubUrl: githubUrl || existing[0].githubUrl,
          linkedinUrl: linkedinUrl || existing[0].linkedinUrl,
          portfolioUrl: portfolioUrl || existing[0].portfolioUrl,
          statement: statement || existing[0].statement,
        })
        .where(eq(internshipApplications.id, existing[0].id))
        .returning();
      result = updated[0];
    } else {
      // Insert new application record
      const inserted = await db
        .insert(internshipApplications)
        .values({
          fullName: fullName || "Student",
          email: cleanEmail,
          phone: phone || "+91 9999999999",
          college: college || "Engineering College",
          degree: degree || "B.Tech Computer Science",
          graduationYear: graduationYear || "2026",
          domain: domain || "Full-Stack Web Development",
          mode: mode || "Online",
          internshipType: internshipType || "Free (Project Certification)",
          duration: duration || "4 Weeks",
          githubUrl,
          linkedinUrl,
          portfolioUrl,
          statement,
          status: "Pending",
        })
        .returning();
      result = inserted[0];
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully.",
      application: result,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Failed to update profile." }, { status: 500 });
  }
}
