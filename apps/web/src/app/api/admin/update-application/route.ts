import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { internshipApplications } from "@/db/schema";
import { ensureTablesExist } from "@/db/init-tables";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    await ensureTablesExist();

    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Application ID is required." }, { status: 400 });
    }

    if (updates.duration) {
      updates.duration = String(updates.duration)
        .replace(/^(Online|Hybrid|Offline|\s|•)+/gi, "")
        .trim() || "4 Weeks";
    }

    if (updates.mode) {
      let m = String(updates.mode).trim();
      if (/offline/i.test(m)) m = "Offline";
      else if (/hybrid/i.test(m)) m = "Hybrid";
      else m = "Online";
      updates.mode = m;
    }

    const updated = await db
      .update(internshipApplications)
      .set(updates)
      .where(eq(internshipApplications.id, Number(id)))
      .returning();

    if (!updated || updated.length === 0) {
      return NextResponse.json({ error: "Application not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Application updated successfully.",
      application: updated[0],
    });
  } catch (error) {
    console.error("Admin update application error:", error);
    return NextResponse.json({ error: "Failed to update application." }, { status: 500 });
  }
}
