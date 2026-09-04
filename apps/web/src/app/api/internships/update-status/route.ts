import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { internshipApplications } from "@/db/schema";
import { ensureTablesExist } from "@/db/init-tables";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    await ensureTablesExist();

    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: "Application ID and status are required." }, { status: 400 });
    }

    const updated = await db
      .update(internshipApplications)
      .set({ status })
      .where(eq(internshipApplications.id, Number(id)))
      .returning();

    return NextResponse.json({
      success: true,
      application: updated[0],
    });
  } catch (error) {
    console.error("Status update error:", error);
    return NextResponse.json({ error: "Failed to update status." }, { status: 500 });
  }
}
