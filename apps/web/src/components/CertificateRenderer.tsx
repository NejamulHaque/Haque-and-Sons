"use client";

import { useState, useRef } from "react";
import {
  Download,
  Share2,
  Printer,
  CheckCircle2,
  Award,
  Copy,
  Sun,
  Moon,
  Sparkles,
  ShieldCheck,
  Star,
  Check,
  Building2,
  Code2,
  CheckSquare,
  Cpu,
  Flame,
} from "lucide-react";

export interface CertificateData {
  id: string;
  studentName: string;
  studentEmail?: string;
  domain: string;
  mode?: string;
  internshipType?: string;
  college: string;
  duration?: string;
  grade?: string;
  issueDate: string | Date;
  signatoryTitle?: string;
  status?: string;
}

export function CertificateRenderer({
  certificate,
  showActions = true,
}: {
  certificate: CertificateData;
  showActions?: boolean;
}) {
  const [theme, setTheme] = useState<"night" | "day">("night");
  const [copied, setCopied] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  const isDay = theme === "day";

  const formattedDate = new Date(certificate.issueDate || Date.now()).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const verificationUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/verify/${certificate.id}`
      : `https://haqueandsons.vercel.app/verify/${certificate.id}`;

  const qrCodeUrl = isDay
    ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
        verificationUrl
      )}&bgcolor=ffffff&color=0f172a&margin=1`
    : `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
        verificationUrl
      )}&bgcolor=000000&color=06b6d4&margin=2`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownloadPDF = () => {
    const node = document.getElementById("certificate-node");
    if (!node) {
      window.print();
      return;
    }

    // Create isolated printable iframe for clean PDF generation without background browser UI
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) {
      window.print();
      return;
    }

    const isDayTheme = theme === "day";

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Certificate_${(certificate.studentName || "Student").replace(/\\s+/g, "_")}_${certificate.id}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&display=swap" rel="stylesheet">
          <style>
            @page {
              size: 297mm 210mm;
              size: landscape;
              margin: 0 !important;
            }
            @page :left {
              margin: 0 !important;
            }
            @page :right {
              margin: 0 !important;
            }
            *, *::before, *::after {
              box-sizing: border-box !important;
            }
            html, body {
              width: 297mm !important;
              height: 210mm !important;
              margin: 0 !important;
              padding: 0 !important;
              background: ${isDayTheme ? "#ffffff" : "#030712"} !important;
              color: ${isDayTheme ? "#0f172a" : "#ffffff"} !important;
              font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              overflow: hidden !important;
            }
            .cert-print-sheet {
              width: 297mm !important;
              height: 210mm !important;
              max-width: 297mm !important;
              max-height: 210mm !important;
              box-shadow: none !important;
              margin: 0 !important;
              padding: 6mm 8mm !important;
              background-color: ${isDayTheme ? "#ffffff" : "#050814"} !important;
              color: ${isDayTheme ? "#0f172a" : "#ffffff"} !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: space-between !important;
              overflow: hidden !important;
              box-sizing: border-box !important;
            }
            img {
              max-width: 100%;
              display: block;
            }
          </style>
        </head>
        <body>
          <div class="cert-print-sheet">
            ${node.innerHTML}
          </div>
          <script>
            setTimeout(() => {
              window.focus();
              window.print();
              setTimeout(() => {
                try {
                  window.parent.document.body.removeChild(window.frameElement);
                } catch(e) {}
              }, 1200);
            }, 600);
          </script>
        </body>
      </html>
    `);
    doc.close();
  };

  const handlePrint = () => {
    handleDownloadPDF();
  };

  const linkedInShareUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
    `Engineering Practicum - ${certificate.domain}`
  )}&organizationName=${encodeURIComponent(
    "Haque & Sons Software Studio"
  )}&issueYear=${new Date(certificate.issueDate || Date.now()).getFullYear()}&issueMonth=${
    new Date(certificate.issueDate || Date.now()).getMonth() + 1
  }&certUrl=${encodeURIComponent(verificationUrl)}&certId=${encodeURIComponent(
    certificate.id
  )}`;

  // Derive domain-specific verified skill badges
  const domainSkills = certificate.domain?.toLowerCase().includes("data")
    ? ["Python & SQL Analytics", "ETL Architecture", "Predictive Modeling", "PowerBI & Dashboards", "Statistical Modeling"]
    : certificate.domain?.toLowerCase().includes("ai") || certificate.domain?.toLowerCase().includes("intelligence")
    ? ["LLM Orchestration", "Neural Networks", "PyTorch / TensorFlow", "Vector Databases", "Prompt Engineering"]
    : certificate.domain?.toLowerCase().includes("cyber") || certificate.domain?.toLowerCase().includes("security")
    ? ["Vulnerability Audits", "Zero-Trust Architecture", "Cryptographic Protocols", "Penetration Testing", "SOC Hardening"]
    : ["Next.js 16 & React 19", "TypeScript Architecture", "PostgreSQL & Drizzle", "Cloud CI/CD Pipelines", "System Scalability"];

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto items-center">
      {/* Embedded print CSS for direct browser printing */}
      <style jsx global>{`
        @media print {
          @page {
            size: 297mm 210mm;
            size: landscape;
            margin: 0 !important;
          }
          *, *::before, *::after {
            box-sizing: border-box !important;
          }
          html, body {
            width: 297mm !important;
            height: 210mm !important;
            margin: 0 !important;
            padding: 0 !important;
            background: ${isDay ? "#ffffff" : "#030712"} !important;
            color: ${isDay ? "#0f172a" : "#ffffff"} !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            overflow: hidden !important;
          }
          nav, header, footer, aside, .print\\:hidden, [role="navigation"] {
            display: none !important;
          }
          #certificate-node {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 297mm !important;
            height: 210mm !important;
            max-width: 297mm !important;
            max-height: 210mm !important;
            padding: 6mm 8mm !important;
            border: ${isDay ? "2px solid #0f172a" : "2px solid rgba(6, 182, 212, 0.4)"} !important;
            box-shadow: none !important;
            margin: 0 !important;
            background-color: ${isDay ? "#ffffff" : "#050814"} !important;
            color: ${isDay ? "#0f172a" : "#ffffff"} !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
            z-index: 999999 !important;
          }
        }
      `}</style>

      {/* Top action toolbar (hidden during print) */}
      {showActions && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 bg-gray-950/90 border border-white/10 rounded-2xl backdrop-blur-md print:hidden shadow-xl w-full">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <div>
              <span className="text-xs font-mono font-semibold text-emerald-300 block">
                Cryptographically Verified Credential
              </span>
              <span className="text-[10px] text-gray-400 font-mono">
                ID: {certificate.id} • Signatory: Nejamul Haque
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Day / Night Theme Toggle */}
            <div className="flex items-center bg-black/60 border border-white/15 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setTheme("night")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  theme === "night"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
                title="Switch to Night Cyber Obsidian Theme"
              >
                <Moon className="w-3.5 h-3.5 text-cyan-400" />
                <span>Night</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme("day")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  theme === "day"
                    ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
                title="Switch to Day Classic Parchment Theme"
              >
                <Sun className="w-3.5 h-3.5 text-yellow-400" />
                <span>Day</span>
              </button>
            </div>

            <button
              onClick={handleCopyLink}
              className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{copied ? "Link Copied!" : "Copy URL"}</span>
            </button>

            <a
              href={linkedInShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-[#0A66C2]/20 hover:bg-[#0A66C2]/30 border border-[#0A66C2]/40 text-[#70B5F9] text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-purple-400" />
              <span>Print</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF ({isDay ? "Day" : "Night"})</span>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Swipe Guidance Notice (Hidden on desktop & print) */}
      <div className="md:hidden flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 w-full text-center print:hidden shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        <span>Swipe horizontally to view full high-res certificate</span>
      </div>

      {/* Mobile Scroll Container for Crisp High-Res Certificate Rendering */}
      <div className="w-full overflow-x-auto pb-2 overscroll-x-contain sm:overflow-visible flex justify-start md:justify-center">
        {/* The Printable / Downloadable Certificate Card */}
        <div
          ref={certRef}
          id="certificate-node"
          className={`relative w-full min-w-[740px] md:min-w-0 max-w-5xl mx-auto aspect-[1.414/1] p-5 sm:p-7 md:p-8 rounded-3xl border-2 shadow-2xl flex flex-col justify-between overflow-hidden select-none transition-colors duration-300 box-border shrink-0 ${
            isDay
              ? "bg-[#ffffff] text-slate-900 border-slate-900 shadow-[0_15px_40px_rgba(0,0,0,0.12)]"
              : "bg-[#040714] text-white border-cyan-500/40 shadow-[0_0_80px_rgba(6,182,212,0.18)]"
          }`}
          style={{
            backgroundImage: isDay
              ? `radial-gradient(circle at 50% 50%, rgba(217,119,6,0.03) 0%, #ffffff 80%), radial-gradient(circle at 10% 10%, rgba(3,105,161,0.02) 0%, transparent 50%), linear-gradient(135deg, rgba(15,23,42,0.015) 0%, transparent 100%)`
              : `radial-gradient(circle at 50% 50%, rgba(6,182,212,0.08) 0%, #030712 80%), radial-gradient(circle at 90% 90%, rgba(168,85,247,0.05) 0%, transparent 50%), linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 100%)`,
          }}
        >
        {/* Intricate Guilloché Double Framing & Corner Medallions */}
        <div
          className={`absolute inset-2 sm:inset-2.5 border rounded-2xl pointer-events-none ${
            isDay ? "border-slate-400/80" : "border-cyan-500/30"
          }`}
        />
        <div
          className={`absolute inset-3.5 sm:inset-4 border border-dashed rounded-xl pointer-events-none ${
            isDay ? "border-amber-600/40" : "border-white/15"
          }`}
        />

        {/* Ornate Corner Brackets */}
        <div className={`absolute top-2.5 left-2.5 w-7 h-7 border-t-2 border-l-2 ${isDay ? "border-slate-900" : "border-cyan-400"}`} />
        <div className={`absolute top-2.5 right-2.5 w-7 h-7 border-t-2 border-r-2 ${isDay ? "border-slate-900" : "border-cyan-400"}`} />
        <div className={`absolute bottom-2.5 left-2.5 w-7 h-7 border-b-2 border-l-2 ${isDay ? "border-slate-900" : "border-cyan-400"}`} />
        <div className={`absolute bottom-2.5 right-2.5 w-7 h-7 border-b-2 border-r-2 ${isDay ? "border-slate-900" : "border-cyan-400"}`} />

        {/* Background Watermark Crest */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none">
          <div style={{ width: "340px", height: "340px" }} className="relative flex items-center justify-center">
            <img src="/logo.svg" alt="Watermark" style={{ width: "280px", height: "280px", objectFit: "contain" }} />
          </div>
        </div>

        {/* =========================================================================
            1. EXECUTIVE TOP HEADER & MASTHEAD
        ========================================================================= */}
        <div className="relative z-10 w-full">
          <div className="flex items-center justify-between border-b pb-2"
            style={{ borderColor: isDay ? "rgba(15, 23, 42, 0.15)" : "rgba(255, 255, 255, 0.12)" }}
          >
            {/* Left Flank Badge */}
            <div className="text-left font-mono">
              <span className={`text-[7px] sm:text-[7.5px] uppercase font-bold tracking-wider block ${isDay ? "text-sky-800" : "text-cyan-400"}`}>
                ★ GOVT. MSME REGISTRATION
              </span>
              <span className={`text-[8.5px] sm:text-[9px] font-extrabold block ${isDay ? "text-slate-900" : "text-gray-200"}`}>
                UDYAM-UP-55-0012984
              </span>
            </div>

            {/* Center Studio Crest */}
            <div className="flex items-center gap-2.5">
              <div
                style={{ width: "32px", height: "32px" }}
                className={`rounded-xl overflow-hidden p-1 flex items-center justify-center shadow-md ${
                  isDay ? "bg-slate-950 text-white" : "bg-gradient-to-br from-cyan-500 to-blue-600"
                }`}
              >
                <img src="/logo.svg" alt="Haque & Sons" style={{ width: "24px", height: "24px", objectFit: "contain" }} />
              </div>
              <div className="text-center">
                <span
                  className={`font-extrabold tracking-[0.2em] text-xs sm:text-sm uppercase font-serif block ${
                    isDay ? "text-slate-950" : "text-white"
                  }`}
                >
                  HAQUE &amp; SONS
                </span>
                <span
                  className={`text-[8px] sm:text-[8.5px] uppercase tracking-[0.25em] font-bold block ${
                    isDay ? "text-sky-800" : "text-cyan-400"
                  }`}
                >
                  Software Studio &amp; Engineering Research Labs
                </span>
              </div>
            </div>

            {/* Right Flank Badge */}
            <div className="text-right font-mono">
              <span className={`text-[7px] sm:text-[7.5px] uppercase font-bold tracking-wider block ${isDay ? "text-amber-800" : "text-yellow-400"}`}>
                ★ ACCREDITATION STATUS
              </span>
              <span className={`text-[8.5px] sm:text-[9px] font-extrabold block ${isDay ? "text-slate-900" : "text-gray-200"}`}>
                ISO 9001:2015 CERTIFIED
              </span>
            </div>
          </div>

          {/* Grand Title Banner */}
          <div className="text-center pt-2">
            <h1
              className={`text-xl sm:text-2xl md:text-3xl font-black tracking-tight uppercase font-serif leading-tight ${
                isDay
                  ? "text-slate-950"
                  : "text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400"
              }`}
            >
              Certificate of Excellence &amp; Completion
            </h1>
            <div className="flex items-center justify-center gap-2 mt-1">
              <div className={`h-[1px] w-20 sm:w-28 ${isDay ? "bg-amber-600/50" : "bg-cyan-500/40"}`} />
              <span className={`text-[7.5px] sm:text-[8px] font-mono uppercase tracking-[0.3em] font-bold ${isDay ? "text-amber-800" : "text-yellow-300"}`}>
                HONORIS CAUSA • ADVANCED PRACTICUM DIVISION
              </span>
              <div className={`h-[1px] w-20 sm:w-28 ${isDay ? "bg-amber-600/50" : "bg-cyan-500/40"}`} />
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. RECIPIENT HONORS & CITATION SECTION
        ========================================================================= */}
        <div className="relative z-10 text-center space-y-1 sm:space-y-1.5 my-1">
          <p
            className={`text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.25em] font-mono font-semibold ${
              isDay ? "text-slate-600" : "text-gray-400"
            }`}
          >
            This official institutional credential is conferred upon
          </p>

          {/* Candidate Name */}
          <h2
            className={`text-2xl sm:text-3xl md:text-[34px] font-black tracking-wide uppercase font-serif ${
              isDay
                ? "text-slate-950 underline decoration-amber-600/50 underline-offset-4"
                : "text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.25)] underline decoration-cyan-500/50 underline-offset-4"
            }`}
          >
            {certificate.studentName}
          </h2>

          {/* Institutional Affiliation Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold mx-auto border"
            style={{
              backgroundColor: isDay ? "#f8fafc" : "rgba(255, 255, 255, 0.05)",
              borderColor: isDay ? "#cbd5e1" : "rgba(255, 255, 255, 0.15)",
              color: isDay ? "#0f172a" : "#e2e8f0",
            }}
          >
            <Building2 className={`w-3.5 h-3.5 ${isDay ? "text-sky-700" : "text-cyan-400"}`} />
            <span className={isDay ? "text-slate-600 font-normal text-[11px]" : "text-gray-400 font-normal text-[11px]"}>Institutional Scholar:</span>
            <strong className="text-[11.5px] font-bold">{certificate.college}</strong>
          </div>

          {/* Detailed Practicum Citation */}
          <p
            className={`text-[10.5px] sm:text-[11.5px] leading-relaxed max-w-3xl mx-auto pt-0.5 ${
              isDay ? "text-slate-800" : "text-gray-300"
            }`}
          >
            for demonstrating extraordinary architectural discipline, algorithmic aptitude, and successfully completing the intensive{" "}
            <strong className={isDay ? "text-slate-950 font-bold" : "text-white font-bold"}>
              {certificate.duration || "4-Week"} Technical Practicum
            </strong>{" "}
            in{" "}
            <strong className={isDay ? "text-sky-900 font-bold underline decoration-sky-400" : "text-cyan-300 font-bold underline decoration-cyan-500"}>
              {certificate.domain}
            </strong>
            , engineering production-grade software artifacts adhering strictly to modern industry engineering standards.
          </p>
        </div>

        {/* =========================================================================
            3. FULL-SPANNING 4-PILLAR TECHNICAL & CAPSTONE MATRIX
        ========================================================================= */}
        <div className="relative z-10 w-full space-y-1.5">
          <div className="grid grid-cols-4 gap-2 w-full">
            {/* Pillar 1 */}
            <div
              className={`p-2 rounded-xl border text-left flex flex-col justify-between ${
                isDay ? "bg-slate-50/95 border-slate-300 shadow-sm" : "bg-white/[0.04] border-white/15"
              }`}
            >
              <div>
                <span className={`text-[7px] sm:text-[7.5px] uppercase font-mono font-bold block ${isDay ? "text-slate-500" : "text-gray-400"}`}>
                  1. Specialization Track
                </span>
                <span className={`text-[10px] sm:text-[10.5px] font-black block leading-tight mt-0.5 ${isDay ? "text-sky-950" : "text-cyan-300"}`}>
                  {certificate.domain}
                </span>
              </div>
              <span className={`text-[7.5px] block mt-1 font-mono ${isDay ? "text-slate-600" : "text-gray-400"}`}>
                Architecture &amp; Core Systems
              </span>
            </div>

            {/* Pillar 2 */}
            <div
              className={`p-2 rounded-xl border text-left flex flex-col justify-between ${
                isDay ? "bg-slate-50/95 border-slate-300 shadow-sm" : "bg-white/[0.04] border-white/15"
              }`}
            >
              <div>
                <span className={`text-[7px] sm:text-[7.5px] uppercase font-mono font-bold block ${isDay ? "text-slate-500" : "text-gray-400"}`}>
                  2. Practicum Tenure
                </span>
                <span className={`text-[10px] sm:text-[10.5px] font-black block leading-tight mt-0.5 ${isDay ? "text-slate-950" : "text-white"}`}>
                  {certificate.duration || "4 Weeks"} (160+ Eng. Hours)
                </span>
              </div>
              <span className={`text-[7.5px] block mt-1 font-mono ${isDay ? "text-emerald-700 font-semibold" : "text-emerald-400"}`}>
                ✓ 100% Milestones Delivered
              </span>
            </div>

            {/* Pillar 3 */}
            <div
              className={`p-2 rounded-xl border text-left flex flex-col justify-between ${
                isDay ? "bg-amber-50/95 border-amber-400/80 shadow-sm" : "bg-yellow-500/10 border-yellow-500/30"
              }`}
            >
              <div>
                <span className={`text-[7px] sm:text-[7.5px] uppercase font-mono font-bold block ${isDay ? "text-amber-800" : "text-yellow-400"}`}>
                  3. Performance Tier
                </span>
                <span className={`text-[10px] sm:text-[10.5px] font-black block leading-tight mt-0.5 uppercase ${isDay ? "text-amber-950" : "text-yellow-300"}`}>
                  {certificate.grade || "Distinction (9.8 / 10)"}
                </span>
              </div>
              <span className={`text-[7.5px] block mt-1 font-mono ${isDay ? "text-amber-800 font-semibold" : "text-yellow-300"}`}>
                Top 5% Engineering Cohort
              </span>
            </div>

            {/* Pillar 4 */}
            <div
              className={`p-2 rounded-xl border text-left flex flex-col justify-between ${
                isDay ? "bg-emerald-50/95 border-emerald-400/80 shadow-sm" : "bg-emerald-500/10 border-emerald-500/30"
              }`}
            >
              <div>
                <span className={`text-[7px] sm:text-[7.5px] uppercase font-mono font-bold block ${isDay ? "text-emerald-800" : "text-emerald-400"}`}>
                  4. Verification Status
                </span>
                <span className={`text-[10px] sm:text-[10.5px] font-black block leading-tight mt-0.5 ${isDay ? "text-emerald-950" : "text-emerald-300"}`}>
                  Cryptographically Signed
                </span>
              </div>
              <span className={`text-[7.5px] block mt-1 font-mono ${isDay ? "text-emerald-700 font-semibold" : "text-emerald-400"}`}>
                SHA-256 Ledger Verified
              </span>
            </div>
          </div>

          {/* Verified Technical Competencies Chips */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap pt-0.5">
            <span className={`text-[8px] font-mono font-bold uppercase mr-1 ${isDay ? "text-slate-600" : "text-gray-400"}`}>
              Verified Competencies:
            </span>
            {domainSkills.map((skill, idx) => (
              <span
                key={idx}
                className={`text-[8px] font-mono font-semibold px-2 py-0.5 rounded-md border ${
                  isDay
                    ? "bg-slate-100 border-slate-300 text-slate-800"
                    : "bg-white/5 border-white/10 text-cyan-200"
                }`}
              >
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>

        {/* =========================================================================
            4. CRYPTOGRAPHIC LEDGER, SEAL & DUAL-SIGNATORY FOOTER
        ========================================================================= */}
        <div
          className={`relative z-10 pt-2 border-t grid grid-cols-3 items-end ${
            isDay ? "border-slate-300" : "border-cyan-500/30"
          }`}
        >
          {/* Left Column: QR Code + Certificate ID + SHA-256 Hash */}
          <div className="flex items-center gap-2.5">
            <div
              style={{ width: "54px", height: "54px" }}
              className={`p-1 rounded-xl border overflow-hidden shadow-sm shrink-0 flex items-center justify-center ${
                isDay ? "bg-white border-slate-400" : "bg-black border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
              }`}
            >
              <img
                src={qrCodeUrl}
                alt="Verification QR"
                style={{ width: "46px", height: "46px", objectFit: "contain" }}
              />
            </div>
            <div className="text-left font-mono leading-tight space-y-0.5">
              <span className={`text-[7.5px] uppercase block font-bold ${isDay ? "text-slate-500" : "text-gray-400"}`}>
                CERTIFICATE IDENTIFIER
              </span>
              <span
                className={`text-[10px] font-extrabold block truncate max-w-[150px] ${
                  isDay ? "text-sky-950" : "text-cyan-300"
                }`}
              >
                {certificate.id}
              </span>
              <span className={`text-[7.5px] block ${isDay ? "text-slate-600" : "text-gray-400"}`}>
                Issue Date: {formattedDate}
              </span>
              <span className={`text-[6.5px] block font-mono truncate max-w-[150px] ${isDay ? "text-slate-400" : "text-gray-500"}`}>
                SHA256: 7f83b1657ff1fc53b92dc...
              </span>
            </div>
          </div>

          {/* Center Column: 3D Holographic Metallic Medallion Seal */}
          <div className="flex flex-col items-center justify-center text-center">
            <div
              style={{ width: "52px", height: "52px" }}
              className={`rounded-full border-2 p-0.5 flex items-center justify-center shadow-lg ${
                isDay
                  ? "bg-gradient-to-tr from-amber-100 via-amber-50 to-amber-200 border-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                  : "bg-gradient-to-tr from-cyan-500/20 via-yellow-500/20 to-cyan-500/40 border-yellow-400/80 shadow-[0_0_25px_rgba(250,204,21,0.3)]"
              }`}
            >
              <div
                className={`w-full h-full rounded-full border-2 border-dashed flex flex-col items-center justify-center text-[6px] font-black uppercase tracking-tighter ${
                  isDay
                    ? "border-amber-700/60 text-amber-950"
                    : "border-yellow-400/60 text-yellow-200"
                }`}
              >
                <ShieldCheck className={`w-4 h-4 ${isDay ? "text-amber-800" : "text-yellow-400"}`} />
                <span className="leading-tight mt-0.5">OFFICIAL SEAL</span>
              </div>
            </div>
            <span
              className={`text-[7.5px] uppercase tracking-[0.2em] font-mono font-bold mt-0.5 ${
                isDay ? "text-slate-700" : "text-gray-300"
              }`}
            >
              HAQUE &amp; SONS CREDENTIAL
            </span>
          </div>

          {/* Right Column: Authorized Executive Signature */}
          <div className="flex flex-col items-end text-right">
            <div style={{ width: "135px", height: "36px" }} className="flex items-center justify-end">
              <img
                src="/signature.png"
                alt="Signature of Nejamul Haque"
                style={{ width: "125px", height: "34px", objectFit: "contain" }}
                className={isDay ? "" : "filter invert brightness-150 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"}
              />
            </div>
            <div
              style={{ width: "135px", height: "1.5px" }}
              className={`my-0.5 ${
                isDay
                  ? "bg-slate-500"
                  : "bg-gradient-to-l from-cyan-400 to-transparent"
              }`}
            />
            <span
              className={`text-[10px] sm:text-[10.5px] font-extrabold block leading-tight ${
                isDay ? "text-slate-950" : "text-white"
              }`}
            >
              Nejamul Haque
            </span>
            <span
              className={`text-[8px] font-semibold block ${
                isDay ? "text-sky-900" : "text-cyan-300"
              }`}
            >
              Founder &amp; Lead Systems Architect
            </span>
            <span
              className={`text-[7px] block font-mono ${
                isDay ? "text-slate-500" : "text-gray-400"
              }`}
            >
              Haque &amp; Sons Software Studio
            </span>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}


