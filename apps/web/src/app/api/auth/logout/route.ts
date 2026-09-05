import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // Invalidate session via Better Auth API
    await auth.api.signOut({ headers: req.headers }).catch(() => {});
  } catch (e) {
    console.warn("Logout API warning:", e);
  }

  const response = NextResponse.json({ success: true, message: "Logged out successfully" });

  // Explicitly expire and delete all possible session cookies across all prefixes & domains
  const cookieNames = [
    "better-auth.session_token",
    "__Secure-better-auth.session_token",
    "better-auth.session_data",
    "__Secure-better-auth.session_data",
    "better-auth.csrf_token",
    "__Secure-better-auth.csrf_token",
    "better-auth.dont_remember",
    "__Secure-better-auth.dont_remember",
  ];

  for (const name of cookieNames) {
    response.cookies.set(name, "", {
      path: "/",
      maxAge: 0,
      expires: new Date(0),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  }

  return response;
}
