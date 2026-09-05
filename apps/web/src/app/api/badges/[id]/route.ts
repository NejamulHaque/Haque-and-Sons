import { NextResponse } from "next/server";
import { db } from "@/db";
import { certificates } from "@/db/schema";
import { ensureTablesExist } from "@/db/init-tables";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await ensureTablesExist();
  const { id } = await params;
  const cleanId = id.trim().toUpperCase();

  let cert = null;
  try {
    const records = await db
      .select()
      .from(certificates)
      .where(eq(certificates.id, cleanId))
      .limit(1);

    if (records && records.length > 0) {
      cert = records[0];
    }
  } catch (err) {
    console.error("Badge generation DB query error:", err);
  }

  const isValid = !!cert && cert.status === "Valid";
  const studentName = cert?.studentName || "Verified Engineer";
  const domain = cert?.domain || "Software Engineering";
  const grade = cert?.grade || "Distinction";

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="340" height="48" viewBox="0 0 340 48" fill="none">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070B14" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>
    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#06B6D4" />
      <stop offset="100%" stop-color="#3B82F6" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Container Box -->
  <rect x="0.5" y="0.5" width="339" height="47" rx="10" fill="url(#bgGrad)" stroke="${isValid ? "#06B6D4" : "#EF4444"}" stroke-opacity="0.5" />

  <!-- Left Accent Pill -->
  <rect x="1" y="1" width="105" height="46" rx="9" fill="${isValid ? "#06B6D4" : "#EF4444"}" fill-opacity="0.12" />
  
  <!-- Left Brand Mark -->
  <circle cx="22" cy="24" r="10" fill="url(#cyanGrad)" />
  <path d="M18 24L21 27L26 21" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  
  <text x="38" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="800" fill="#22D3EE" letter-spacing="1">HAQUE &amp; SONS</text>
  <text x="38" y="33" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8" font-weight="600" fill="#94A3B8" letter-spacing="0.5">STUDIO OS</text>

  <!-- Divider Line -->
  <line x1="106" y1="8" x2="106" y2="40" stroke="#334155" stroke-width="1" />

  <!-- Right Details -->
  <text x="118" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">${studentName.length > 20 ? studentName.substring(0, 18) + '...' : studentName}</text>
  <text x="118" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="500" fill="#38BDF8">${domain.length > 22 ? domain.substring(0, 20) + '...' : domain} • ${grade}</text>

  <!-- Verified Check Badge -->
  <circle cx="318" cy="24" r="9" fill="${isValid ? "#10B981" : "#EF4444"}" fill-opacity="0.2" stroke="${isValid ? "#10B981" : "#EF4444"}" stroke-width="1.5" />
  <path d="M314 24L317 27L322 21" stroke="${isValid ? "#34D399" : "#F87171"}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>
  `.trim();

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
