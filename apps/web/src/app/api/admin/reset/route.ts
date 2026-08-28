import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { eq, sql } from "drizzle-orm";

const ADMIN_EMAIL = "nejamulhaque.works@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const { email, newPassword } = await req.json();

    if (!email || !newPassword) {
      return NextResponse.json(
        { error: "Email and new password are required." },
        { status: 400 }
      );
    }

    if (email.toLowerCase().trim() !== ADMIN_EMAIL.toLowerCase()) {
      return NextResponse.json(
        { error: "Password reset via this portal is only available for the admin email." },
        { status: 403 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    // Ensure database table has the issuer column required by Better Auth
    try {
      await db.execute(sql`ALTER TABLE "account" ADD COLUMN IF NOT EXISTS "issuer" text`);
    } catch {
      // Column may already exist or table created without issue
    }

    // 1. Find existing user
    const existingUsers = await db
      .select()
      .from(schema.user)
      .where(eq(schema.user.email, ADMIN_EMAIL.toLowerCase()));

    const existingUser = existingUsers[0];

    // 2. If user exists, remove old account and session records so fresh signup with new password succeeds
    if (existingUser) {
      await db.delete(schema.session).where(eq(schema.session.userId, existingUser.id));
      await db.delete(schema.account).where(eq(schema.account.userId, existingUser.id));
      await db.delete(schema.user).where(eq(schema.user.id, existingUser.id));
    }

    return NextResponse.json({
      success: true,
      message: "Admin account reset successfully. You can now sign up or sign in with your new password.",
    });
  } catch (error) {
    console.error("Admin reset error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to reset admin account." },
      { status: 500 }
    );
  }
}
