import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { visitors } from "@/db/schema";
import { ensureTablesExist } from "@/db/init-tables";

export async function GET(request: NextRequest) {
  try {
    // Non-blocking initialization check
    ensureTablesExist().catch(() => {});

    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Unknown";
    const path = request.nextUrl.pathname;

    let country = "India";
    let city = "New Delhi";

    const isLocal =
      ip === "127.0.0.1" ||
      ip === "::1" ||
      ip.startsWith("192.168.") ||
      ip.startsWith("10.") ||
      ip === "localhost";

    if (!isLocal) {
      try {
        const geoRes = await fetch(`https://ipapi.co/${ip}/json/`, {
          signal: AbortSignal.timeout(2000),
        });
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          country = geoData.country_name || geoData.country_code || "India";
          city = geoData.city || "New Delhi";
        }
      } catch {
        // Fallback gracefully on geo API timeout or error
      }
    } else {
      country = "Local Dev";
      city = "Workspace";
    }

    try {
      await db.insert(visitors).values({
        ip,
        userAgent,
        path,
        country,
        city,
      });
    } catch {
      // Gracefully ignore logging errors during local dev/cold starts
    }

    return NextResponse.json({ success: true, ip, country, city });
  } catch {
    return NextResponse.json({ success: false }, { status: 200 });
  }
}