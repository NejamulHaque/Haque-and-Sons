import React from "react";

export function AicteLogo({ className = "w-18 h-18" }: { className?: string }) {
  // Generate 24 gear teeth for the outer cogwheel
  const teethCount = 24;
  const teeth = Array.from({ length: teethCount }).map((_, i) => {
    const angle = (i * 360) / teethCount;
    return (
      <rect
        key={i}
        x="47"
        y="1"
        width="6"
        height="8"
        rx="1"
        fill="#f59e0b"
        transform={`rotate(${angle} 50 50)`}
      />
    );
  });

  return (
    <div className={`relative flex flex-col items-center justify-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm select-none"
      >
        {/* Outer Gear Teeth */}
        {teeth}

        {/* Outer Ring */}
        <circle cx="50" cy="50" r="44" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />

        {/* Middle Ring with Deep Navy Base */}
        <circle cx="50" cy="50" r="40" fill="#0b2341" stroke="#fbbf24" strokeWidth="1" />

        {/* Inner White Disc with Gold Border for Maximum Text Contrast */}
        <circle cx="50" cy="50" r="33" fill="#ffffff" stroke="#f59e0b" strokeWidth="1.8" />

        {/* CLEAR, BOLD, PROMINENT "AICTE" TEXT */}
        <text
          x="50"
          y="34"
          textAnchor="middle"
          fill="#0b2341"
          fontSize="12.5"
          fontWeight="900"
          letterSpacing="0.08em"
          fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        >
          AICTE
        </text>

        {/* Underline beneath AICTE */}
        <line x1="32" y1="37" x2="68" y2="37" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" />

        {/* Sacred Flame / Lamp (Diya) in Center */}
        {/* Lamp Base */}
        <path
          d="M 36 64 C 36 70 64 70 64 64 C 64 62 36 62 36 64 Z"
          fill="#d97706"
        />
        <ellipse cx="50" cy="62.5" rx="11" ry="2.2" fill="#f59e0b" />

        {/* Outer Flame (Orange) */}
        <path
          d="M 50 40 C 43 49 43 57 50 61 C 57 57 57 49 50 40 Z"
          fill="#ea580c"
        />

        {/* Inner Flame (Gold) */}
        <path
          d="M 50 44 C 45 50 45 56 50 59 C 55 56 55 50 50 44 Z"
          fill="#fef08a"
        />

        {/* Flame Core Highlight */}
        <ellipse cx="50" cy="54" rx="2" ry="3.5" fill="#ffffff" />

        {/* Bottom Sanskrit Motto: योगः कर्मसु कौशलम् */}
        <text
          x="50"
          y="76"
          textAnchor="middle"
          fill="#92400e"
          fontSize="4"
          fontWeight="700"
          letterSpacing="0.02em"
          fontFamily="sans-serif"
        >
          योगः कर्मसु कौशलम्
        </text>
      </svg>
    </div>
  );
}
