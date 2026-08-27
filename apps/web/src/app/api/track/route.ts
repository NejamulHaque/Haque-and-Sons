import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db"; // Ensure you have a db connection file
import { visitors } from "@/db/schema";

export async function GET(request: NextRequest) {
  try {
    // 1. Get IP (Vercel provides x-forwarded-for)
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Unknown";
    const path = request.nextUrl.pathname;

    // 2. Simple Geo-lookup (Optional: Use a free API like ipapi.co)
    // Note: For high traffic, use a edge-compatible geo DB. 
    // For now, we'll just log the IP.
    let country = "Unknown";
    let city = "Unknown";

    try {
        // Free tier limit applies, but good for demo
        const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
        if(geoRes.ok) {
            const geoData = await geoRes.json();
            country = geoData.country_code || "N/A";
            city = geoData.city || "N/A";
        }
    } catch (e) {
        console.error("Geo lookup failed", e);
    }

    // 3. Save to DB
    await db.insert(visitors).values({
      ip,
      userAgent,
      path,
      country,
      city,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Tracking error:", error);
    return NextResponse.json({ error: "Failed to track" }, { status: 500 });
  }
}