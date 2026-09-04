import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { ensureTablesExist } from "@/db/init-tables";
import { NextRequest } from "next/server";

const handlers = toNextJsHandler(auth);

export async function POST(req: NextRequest) {
  await ensureTablesExist();
  return handlers.POST(req);
}

export async function GET(req: NextRequest) {
  await ensureTablesExist();
  return handlers.GET(req);
}