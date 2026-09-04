import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { internshipApplications, certificates } from "@/db/schema";
import { ensureTablesExist } from "@/db/init-tables";
import { eq, desc } from "drizzle-orm";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    await ensureTablesExist();

    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    const appRecords = await db
      .select()
      .from(internshipApplications)
      .where(eq(internshipApplications.email, cleanEmail))
      .orderBy(desc(internshipApplications.createdAt))
      .limit(1);

    if (!appRecords || appRecords.length === 0) {
      return NextResponse.json(
        { error: "No active internship application found for this account." },
        { status: 404 }
      );
    }

    const app = appRecords[0];

    // Check if certificate already exists
    const existingCerts = await db
      .select()
      .from(certificates)
      .where(eq(certificates.studentEmail, cleanEmail))
      .orderBy(desc(certificates.createdAt))
      .limit(1);

    let cert = existingCerts[0];

    if (!cert) {
      // Generate new official certificate
      const randomHex = crypto.randomBytes(3).toString("hex").toUpperCase();
      const currentYear = new Date().getFullYear();
      const certificateId = `HS-INT-${currentYear}-${randomHex}`;

      const inserted = await db
        .insert(certificates)
        .values({
          id: certificateId,
          studentName: app.fullName,
          studentEmail: cleanEmail,
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

    // Mark googleFormSubmitted = true & status = Completed
    await db
      .update(internshipApplications)
      .set({
        googleFormSubmitted: true,
        status: "Completed",
        certificateId: cert.id,
      })
      .where(eq(internshipApplications.id, app.id));

    return NextResponse.json({
      success: true,
      message: "Mandatory completion form confirmed. Certificate unlocked!",
      certificate: cert,
      verificationUrl: `https://haqueandsons.vercel.app/verify/${cert.id}`,
    });
  } catch (error) {
    console.error("Complete form verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify completion and unlock certificate." },
      { status: 500 }
    );
  }
}
