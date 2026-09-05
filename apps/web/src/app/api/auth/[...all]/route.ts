import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { ensureTablesExist } from "@/db/init-tables";
import { NextRequest, NextResponse } from "next/server";

const handlers = toNextJsHandler(auth);

export async function POST(req: NextRequest) {
  try {
    await ensureTablesExist();
    return await handlers.POST(req);
  } catch (err: any) {
    console.error("Auth POST error:", err?.message || err);
    return NextResponse.json({ error: "Auth operation failed" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await ensureTablesExist();
    return await handlers.GET(req);
  } catch (err: any) {
    console.error("Auth GET error:", err?.message || err);
    return NextResponse.json({ error: "Auth operation failed" }, { status: 500 });
  }
}