import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { internshipApplications, certificates, user } from "@/db/schema";
import { ensureTablesExist } from "@/db/init-tables";
import { eq, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    await ensureTablesExist();

    const email = req.nextUrl.searchParams.get("email");
    if (!email) {
      return NextResponse.json({ error: "Email query param required" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Fetch user account info
    const userRecords = await db
      .select()
      .from(user)
      .where(eq(user.email, cleanEmail))
      .limit(1);

    // Fetch student's latest internship application
    const appRecords = await db
      .select()
      .from(internshipApplications)
      .where(eq(internshipApplications.email, cleanEmail))
      .orderBy(desc(internshipApplications.createdAt))
      .limit(1);

    // Fetch any issued certificate for student
    const certRecords = await db
      .select()
      .from(certificates)
      .where(eq(certificates.studentEmail, cleanEmail))
      .orderBy(desc(certificates.createdAt))
      .limit(1);

    return NextResponse.json({
      success: true,
      user: userRecords[0] || null,
      application: appRecords[0] || null,
      certificate: certRecords[0] || null,
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch student profile" }, { status: 500 });
  }
}
