import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { certificates } from "@/db/schema";
import { ensureTablesExist } from "@/db/init-tables";
import { eq } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureTablesExist();
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Certificate ID is required." }, { status: 400 });
    }

    const cleanId = id.trim().toUpperCase();

    const certs = await db
      .select()
      .from(certificates)
      .where(eq(certificates.id, cleanId))
      .limit(1);

    if (!certs || certs.length === 0) {
      return NextResponse.json(
        { error: "Certificate not found or invalid identifier." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      certificate: certs[0],
    });
  } catch (error) {
    console.error("Certificate lookup error:", error);
    return NextResponse.json(
      { error: "Internal server error during certificate lookup." },
      { status: 500 }
    );
  }
}
