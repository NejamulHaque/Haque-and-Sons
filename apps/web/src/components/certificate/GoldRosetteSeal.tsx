import React from "react";

export function GoldRosetteSeal({ className = "w-20 h-28" }: { className?: string }) {
  // Generate 24 scallop lobes for the rosette edge
  const lobesCount = 24;
  const lobes = Array.from({ length: lobesCount }).map((_, i) => {
    const angle = (i * 360) / lobesCount;
    return (
      <circle
        key={i}
        cx="50"
        cy="9"
        r="4.2"
        fill="#f59e0b"
        stroke="#d97706"
        strokeWidth="0.8"
        transform={`rotate(${angle} 50 48)`}
      />
    );
  });

  return (
    <div className={`relative flex flex-col items-center justify-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 100 135"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md select-none"
      >
        <defs>
          {/* Radial gold gradient for the medal face */}
          <radialGradient id="gold-radial" cx="45%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="25%" stopColor="#fef08a" />
            <stop offset="60%" stopColor="#f59e0b" />
            <stop offset="90%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#b45309" />
          </radialGradient>

          {/* Ribbon gradient */}
          <linearGradient id="ribbon-grad-left" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          <linearGradient id="ribbon-grad-right" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="60%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
        </defs>

        {/* =========================================================================
            RIBBONS (Hanging from behind the medal)
        ========================================================================= */}
        {/* Left Ribbon with V-Notch */}
        <polygon
          points="38,65 18,128 29,116 45,125 48,65"
          fill="url(#ribbon-grad-left)"
          stroke="#b45309"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* Right Ribbon with V-Notch */}
        <polygon
          points="52,65 55,125 71,116 82,128 62,65"
          fill="url(#ribbon-grad-right)"
          stroke="#b45309"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* Subtle ribbon fold highlights */}
        <line x1="29" y1="116" x2="43" y2="70" stroke="#fef08a" strokeWidth="1" opacity="0.6" />
        <line x1="71" y1="116" x2="57" y2="70" stroke="#fef08a" strokeWidth="1" opacity="0.6" />

        {/* =========================================================================
            ROSETTE MEDALLION
        ========================================================================= */}
        {/* Scalloped outer perimeter */}
        {lobes}

        {/* Main outer gold rim */}
        <circle cx="50" cy="48" r="39" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />

        {/* Inset ring with bevel */}
        <circle cx="50" cy="48" r="36" fill="url(#gold-radial)" stroke="#fbbf24" strokeWidth="1.2" />

        {/* Delicate inner ring */}
        <circle cx="50" cy="48" r="30" fill="none" stroke="#b45309" strokeWidth="1" strokeDasharray="2 1.5" opacity="0.75" />

        {/* Core disc with rich gold finish */}
        <circle cx="50" cy="48" r="26" fill="url(#gold-radial)" stroke="#f59e0b" strokeWidth="1" />

        {/* Inner subtle starburst/facet lines */}
        <circle cx="50" cy="48" r="21" fill="none" stroke="#fef08a" strokeWidth="0.8" opacity="0.8" />
        <circle cx="50" cy="48" r="14" fill="none" stroke="#d97706" strokeWidth="0.6" opacity="0.5" />
      </svg>
    </div>
  );
}
