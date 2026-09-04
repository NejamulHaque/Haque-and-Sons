import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { internshipApplications } from "@/db/schema";
import { ensureTablesExist } from "@/db/init-tables";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    await ensureTablesExist();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Application ID is required." }, { status: 400 });
    }

    await db
      .delete(internshipApplications)
      .where(eq(internshipApplications.id, Number(id)));

    return NextResponse.json({
      success: true,
      message: "Application deleted successfully.",
    });
  } catch (error) {
    console.error("Admin delete application error:", error);
    return NextResponse.json({ error: "Failed to delete application." }, { status: 500 });
  }
}
