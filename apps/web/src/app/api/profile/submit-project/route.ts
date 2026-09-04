import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { internshipApplications } from "@/db/schema";
import { ensureTablesExist } from "@/db/init-tables";
import { eq, desc } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    await ensureTablesExist();

    const { email, githubRepo, liveUrl } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    const existing = await db
      .select()
      .from(internshipApplications)
      .where(eq(internshipApplications.email, cleanEmail))
      .orderBy(desc(internshipApplications.createdAt))
      .limit(1);

    if (!existing || existing.length === 0) {
      return NextResponse.json({ error: "No active internship found for this email." }, { status: 404 });
    }

    const updated = await db
      .update(internshipApplications)
      .set({
        githubRepo: (githubRepo || "").trim(),
        liveUrl: (liveUrl || "").trim(),
        status: "Under Review",
      })
      .where(eq(internshipApplications.id, existing[0].id))
      .returning();

    return NextResponse.json({
      success: true,
      message: "Capstone project submitted successfully.",
      application: updated[0],
    });
  } catch (error) {
    console.error("Project submit error:", error);
    return NextResponse.json({ error: "Failed to submit project." }, { status: 500 });
  }
}
