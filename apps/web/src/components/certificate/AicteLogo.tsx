import React from "react";

export function AicteLogo({ className = "w-16 h-16" }: { className?: string }) {
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
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
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
        <circle cx="50" cy="50" r="39" fill="#0b2341" stroke="#fbbf24" strokeWidth="1" />

        {/* Inner White/Cream Ring */}
        <circle cx="50" cy="50" r="30" fill="#ffffff" stroke="#f59e0b" strokeWidth="1.2" />

        {/* Top Text Arc: AICTE */}
        <path
          id="aicte-top-arc"
          d="M 23 50 A 27 27 0 0 1 77 50"
          fill="none"
          stroke="none"
        />
        <text
          fill="#0b2341"
          fontSize="7.5"
          fontWeight="900"
          letterSpacing="0.22em"
          fontFamily="system-ui, sans-serif"
        >
          <textPath href="#aicte-top-arc" startOffset="50%" textAnchor="middle">
            AICTE
          </textPath>
        </text>

        {/* Bottom Arc Text: योगः कर्मसु कौशलम् */}
        <path
          id="aicte-bot-arc"
          d="M 78 51 A 28 28 0 0 1 22 51"
          fill="none"
          stroke="none"
        />
        <text
          fill="#d97706"
          fontSize="4.2"
          fontWeight="700"
          letterSpacing="0.08em"
          fontFamily="sans-serif"
        >
          <textPath href="#aicte-bot-arc" startOffset="50%" textAnchor="middle">
            योगः कर्मसु कौशलम्
          </textPath>
        </text>

        {/* Sacred Flame / Lamp Motif in Center */}
        {/* Base of Lamp / Diya */}
        <path
          d="M 37 60 C 37 65 63 65 63 60 C 63 58 37 58 37 60 Z"
          fill="#d97706"
        />
        <ellipse cx="50" cy="58.5" rx="10" ry="2" fill="#f59e0b" />

        {/* Outer Flame (Orange) */}
        <path
          d="M 50 36 C 44 45 43 53 50 57 C 57 53 56 45 50 36 Z"
          fill="#ea580c"
        />

        {/* Inner Flame (Yellow/Bright Gold) */}
        <path
          d="M 50 40 C 46 47 46 52 50 55 C 54 52 54 47 50 40 Z"
          fill="#fef08a"
        />

        {/* Small Core Flame (Cyan/White) */}
        <ellipse cx="50" cy="51" rx="2" ry="3.5" fill="#ffffff" />
      </svg>
    </div>
  );
}
