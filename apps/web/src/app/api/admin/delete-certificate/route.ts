import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { certificates } from "@/db/schema";
import { ensureTablesExist } from "@/db/init-tables";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    await ensureTablesExist();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Certificate ID is required." }, { status: 400 });
    }

    await db
      .delete(certificates)
      .where(eq(certificates.id, String(id)));

    return NextResponse.json({
      success: true,
      message: "Certificate deleted successfully.",
    });
  } catch (error) {
    console.error("Admin delete certificate error:", error);
    return NextResponse.json({ error: "Failed to delete certificate." }, { status: 500 });
  }
}
