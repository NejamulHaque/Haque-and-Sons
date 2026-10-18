import React from "react";

export function CertificateFrame({ isDay = true }: { isDay?: boolean }) {
  const navyDark = isDay ? "#0a2240" : "#081b33";
  const navyDeep = isDay ? "#061528" : "#040e1c";
  const navyAccent = isDay ? "#153a66" : "#0ea5e9";
  const borderLine = isDay ? "#0a2240" : "rgba(14, 165, 233, 0.4)";

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
      <svg
        viewBox="0 0 1000 707"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* =====================================================================
            1. TOP-LEFT GEOMETRIC CORNER
        ===================================================================== */}
        {/* Top Horizontal Navy Bar (slanted end) */}
        <polygon
          points="0,0 400,0 365,22 0,22"
          fill={navyDark}
        />
        {/* Top Accent Strip */}
        <polygon
          points="0,22 365,22 355,27 0,27"
          fill={navyAccent}
          opacity={isDay ? "0.2" : "0.5"}
        />

        {/* Left Vertical Navy Bar (slanted end) */}
        <polygon
          points="0,0 28,0 28,340 0,380"
          fill={navyDark}
        />

        {/* Inner Thin Border Line - Left */}
        <line
          x1="22"
          y1="22"
          x2="22"
          y2="360"
          stroke={borderLine}
          strokeWidth="1.5"
        />

        {/* =====================================================================
            2. BOTTOM-LEFT MULTI-FACETED GEOMETRIC POLYGON
        ===================================================================== */}
        {/* Outer large angled triangle */}
        <polygon
          points="0,707 0,380 180,707"
          fill={navyDark}
        />

        {/* Deep faceted shadow triangle for 3D depth */}
        <polygon
          points="0,707 0,470 120,707"
          fill={navyDeep}
        />

        {/* Accent diagonal wedge */}
        <polygon
          points="0,707 60,707 180,660 0,550"
          fill={navyAccent}
          opacity={isDay ? "0.15" : "0.4"}
        />

        {/* Inner thin framing line - Bottom-Left to Center */}
        <line
          x1="22"
          y1="707"
          x2="22"
          y2="380"
          stroke={borderLine}
          strokeWidth="1.5"
          opacity="0.4"
        />

        {/* =====================================================================
            3. TOP-RIGHT GEOMETRIC CORNER
        ===================================================================== */}
        {/* Angled diagonal wedge */}
        <polygon
          points="780,0 1000,0 1000,140"
          fill={navyDark}
        />

        {/* Inner diagonal accent trim */}
        <polygon
          points="815,0 1000,0 1000,115"
          fill={navyDeep}
        />

        {/* Right Vertical Navy Accent Strip */}
        <polygon
          points="976,0 1000,0 1000,350 976,320"
          fill={navyDark}
          opacity="0.9"
        />

        {/* Right Inner Border Line */}
        <line
          x1="976"
          y1="140"
          x2="976"
          y2="660"
          stroke={borderLine}
          strokeWidth="1.5"
        />

        {/* =====================================================================
            4. BOTTOM-RIGHT STEPPED BLOCK & ACCENT
        ===================================================================== */}
        {/* Main bottom block */}
        <polygon
          points="600,707 1000,707 1000,665 640,665"
          fill={navyDark}
        />

        {/* Stepped corner piece */}
        <polygon
          points="960,665 1000,665 1000,580 960,620"
          fill={navyDark}
        />

        {/* Accent sliver along the bottom step */}
        <polygon
          points="640,665 1000,665 1000,660 660,660"
          fill={navyAccent}
          opacity={isDay ? "0.3" : "0.6"}
        />

        {/* Bottom Framing Line */}
        <line
          x1="180"
          y1="685"
          x2="600"
          y2="685"
          stroke={borderLine}
          strokeWidth="1.5"
          opacity="0.6"
        />

        {/* Top Framing Line */}
        <line
          x1="400"
          y1="22"
          x2="780"
          y2="22"
          stroke={borderLine}
          strokeWidth="1.5"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}
