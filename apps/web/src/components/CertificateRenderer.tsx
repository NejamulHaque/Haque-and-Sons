"use client";

import { useState, useRef } from "react";
import {
  Download,
  Share2,
  Printer,
  CheckCircle2,
  Copy,
  Sun,
  Moon,
  Sparkles,
  ShieldCheck,
  Building2,
  ExternalLink,
  ChevronDown,
  Info,
} from "lucide-react";
import { getAicteComplianceInfo } from "@/lib/aicte";
import { AicteLogo } from "./certificate/AicteLogo";
import { GoldRosetteSeal } from "./certificate/GoldRosetteSeal";
import { CertificateFrame } from "./certificate/CertificateFrame";

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
  startDate?: string;
  endDate?: string;
}

function getOrdinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function formatDurationDays(durationStr?: string): string {
  const dur = (durationStr || "").toLowerCase();
  if (dur.includes("12") || dur.includes("90")) return "90 days";
  if (dur.includes("8") || dur.includes("60")) return "60 days";
  if (dur.includes("4") || dur.includes("30")) return "30 days";
  return durationStr || "90 days";
}

function formatConductedDates(issueDateInput: string | Date, durationStr?: string): string {
  const end = new Date(issueDateInput || Date.now());
  const dur = (durationStr || "").toLowerCase();
  let days = 90;
  if (dur.includes("12") || dur.includes("90")) days = 90;
  else if (dur.includes("8") || dur.includes("60")) days = 60;
  else if (dur.includes("4") || dur.includes("30")) days = 30;

  const start = new Date(end.getTime() - days * 24 * 60 * 60 * 1000);

  const startDay = getOrdinal(start.getDate());
  const startMonth = start.toLocaleDateString("en-US", { month: "long" });

  const endDay = getOrdinal(end.getDate());
  const endMonth = end.toLocaleDateString("en-US", { month: "long" });
  const endYear = end.getFullYear();

  if (start.getFullYear() === endYear) {
    return `${startDay} ${startMonth} – ${endDay} ${endMonth}, ${endYear}`;
  }
  return `${startDay} ${startMonth}, ${start.getFullYear()} – ${endDay} ${endMonth}, ${endYear}`;
}

export function CertificateRenderer({
  certificate,
  showActions = true,
}: {
  certificate: CertificateData;
  showActions?: boolean;
}) {
  const [theme, setTheme] = useState<"day" | "night">("day");
  const [copied, setCopied] = useState(false);
  const [showMetadata, setShowMetadata] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  const aicte = getAicteComplianceInfo(certificate.duration);
  const isDay = theme === "day";

  const durationDays = formatDurationDays(certificate.duration);
  const conductedDates =
    certificate.startDate && certificate.endDate
      ? `${certificate.startDate} – ${certificate.endDate}`
      : formatConductedDates(certificate.issueDate, certificate.duration);

  const signatoryDesignation =
    !certificate.signatoryTitle || certificate.signatoryTitle.includes("Founder")
      ? "CEO & Director"
      : certificate.signatoryTitle.replace(/^Nejamul Haque,?\s*/i, "");

  const verificationUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/verify/${certificate.id}`
      : `https://haqueandsons.vercel.app/verify/${certificate.id}`;

  const originUrl =
    typeof window !== "undefined" ? window.location.origin : "https://haqueandsons.vercel.app";

  const qrCodeUrl = isDay
    ? `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
        verificationUrl
      )}&bgcolor=ffffff&color=0a2240&margin=0`
    : `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
        verificationUrl
      )}&bgcolor=030712&color=22d3ee&margin=0`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownloadPDF = () => {
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
    const bg = isDayTheme ? "#ffffff" : "#040714";
    const textColor = isDayTheme ? "#0a2240" : "#ffffff";
    const navyDark = isDayTheme ? "#0a2240" : "#081b33";
    const navyDeep = isDayTheme ? "#061528" : "#040e1c";
    const subText = isDayTheme ? "#334155" : "#94a3b8";
    const nameColor = isDayTheme ? "#0f172a" : "#ffffff";
    const signatureSrc = `${originUrl}/signature.png`;

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Certificate_${(certificate.studentName || "Candidate").replace(/\\s+/g, "_")}_${certificate.id}</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,400;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap" rel="stylesheet">
          <style>
            @page {
              size: A4 landscape;
              margin: 0;
            }
            *, *::before, *::after {
              box-sizing: border-box !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            html, body {
              width: 297mm !important;
              height: 210mm !important;
              margin: 0 !important;
              padding: 0 !important;
              background-color: ${bg} !important;
              color: ${textColor} !important;
              font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              overflow: hidden !important;
            }
            .cert-page {
              position: relative;
              width: 297mm;
              height: 210mm;
              max-width: 297mm;
              max-height: 210mm;
              padding: 12mm 18mm;
              margin: 0;
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              background-color: ${bg};
              color: ${textColor};
              overflow: hidden;
            }
            .frame-svg {
              position: absolute;
              inset: 0;
              width: 297mm;
              height: 210mm;
              pointer-events: none;
              z-index: 1;
            }
            .content-wrapper {
              position: relative;
              z-index: 10;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
            .header-section {
              text-align: center;
              position: relative;
              padding-top: 2mm;
            }
            .company-name {
              font-size: 13.5pt;
              font-weight: 700;
              color: ${textColor};
              letter-spacing: 0.04em;
              margin: 0;
            }
            .cert-title {
              font-size: 38pt;
              font-weight: 900;
              color: ${navyDark};
              letter-spacing: 0.06em;
              text-transform: uppercase;
              line-height: 1.05;
              margin: 1.5mm 0 2.5mm 0;
            }
            .ribbon-bar {
              display: inline-block;
              background-color: ${navyDark};
              color: #ffffff;
              padding: 2.2mm 24mm;
              font-size: 10pt;
              font-weight: 800;
              letter-spacing: 0.35em;
              text-transform: uppercase;
              border-radius: 0.5mm;
            }
            .aicte-seal {
              position: absolute;
              top: 0;
              right: 6mm;
              width: 22mm;
              height: 22mm;
            }
            .recipient-section {
              text-align: center;
              margin: 4mm 0 2mm 0;
            }
            .awarded-to {
              font-size: 11.5pt;
              color: ${subText};
              font-weight: 500;
              margin: 0 0 2mm 0;
            }
            .candidate-name {
              font-family: 'Playfair Display', Georgia, serif;
              font-size: 34pt;
              font-weight: 700;
              color: ${nameColor};
              line-height: 1.1;
              margin: 0;
              padding-bottom: 2mm;
              border-bottom: 1.5pt solid ${navyDark};
              display: inline-block;
              min-width: 140mm;
            }
            .college-name {
              font-family: 'Playfair Display', Georgia, serif;
              font-style: italic;
              font-size: 13pt;
              color: ${nameColor};
              margin: 2.5mm 0 3mm 0;
            }
            .citation-line {
              font-size: 10.5pt;
              color: ${subText};
              line-height: 1.5;
              margin: 0.8mm 0;
            }
            .domain-title {
              font-size: 14pt;
              font-weight: 800;
              color: ${navyDark};
              margin: 2mm 0 1mm 0;
            }
            .conducted-dates {
              font-size: 10.5pt;
              color: ${subText};
              font-weight: 500;
              margin: 0;
            }
            .footer-row {
              display: grid;
              grid-template-columns: 1fr auto 1fr;
              align-items: end;
              padding-bottom: 3mm;
            }
            .qr-col {
              display: flex;
              align-items: center;
              gap: 3mm;
            }
            .qr-box {
              width: 24mm;
              height: 24mm;
              border: 1pt solid ${navyDark};
              padding: 0.8mm;
              background: #ffffff;
            }
            .qr-box img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
            .qr-meta {
              font-family: 'JetBrains Mono', monospace;
              font-size: 6.5pt;
              color: ${subText};
              line-height: 1.35;
            }
            .seal-col {
              display: flex;
              justify-content: center;
              align-items: center;
              padding-bottom: 1mm;
            }
            .seal-img {
              width: 24mm;
              height: 32mm;
            }
            .sig-col {
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              text-align: right;
            }
            .sig-img {
              width: 32mm;
              height: 14mm;
              object-fit: contain;
              margin-bottom: 0.5mm;
              ${isDayTheme ? "" : "filter: invert(1) brightness(1.5);"}
            }
            .sig-line {
              width: 44mm;
              height: 1.2pt;
              background-color: ${navyDark};
              margin-bottom: 1.8mm;
            }
            .sig-name {
              font-size: 11pt;
              font-weight: 800;
              color: ${nameColor};
              line-height: 1.1;
              margin: 0;
            }
            .sig-title {
              font-style: italic;
              font-size: 9.5pt;
              color: ${subText};
              margin-top: 0.5mm;
            }
          </style>
        </head>
        <body>
          <div class="cert-page">
            <!-- Vector Geometric Framing -->
            <svg class="frame-svg" viewBox="0 0 1000 707" preserveAspectRatio="none">
              <!-- Top-Left -->
              <polygon points="0,0 400,0 365,22 0,22" fill="${navyDark}" />
              <polygon points="0,0 28,0 28,340 0,380" fill="${navyDark}" />
              <line x1="22" y1="22" x2="22" y2="360" stroke="${navyDark}" stroke-width="1.5" />

              <!-- Bottom-Left -->
              <polygon points="0,707 0,380 180,707" fill="${navyDark}" />
              <polygon points="0,707 0,470 120,707" fill="${navyDeep}" />
              <line x1="22" y1="707" x2="22" y2="380" stroke="${navyDark}" stroke-width="1.5" opacity="0.4" />

              <!-- Top-Right -->
              <polygon points="780,0 1000,0 1000,140" fill="${navyDark}" />
              <polygon points="815,0 1000,0 1000,115" fill="${navyDeep}" />
              <polygon points="976,0 1000,0 1000,350 976,320" fill="${navyDark}" opacity="0.9" />
              <line x1="976" y1="140" x2="976" y2="660" stroke="${navyDark}" stroke-width="1.5" />

              <!-- Bottom-Right -->
              <polygon points="600,707 1000,707 1000,665 640,665" fill="${navyDark}" />
              <polygon points="960,665 1000,665 1000,580 960,620" fill="${navyDark}" />
              <line x1="180" y1="685" x2="600" y2="685" stroke="${navyDark}" stroke-width="1.5" opacity="0.6" />
              <line x1="400" y1="22" x2="780" y2="22" stroke="${navyDark}" stroke-width="1.5" opacity="0.6" />
            </svg>

            <div class="content-wrapper">
              <!-- Header -->
              <div class="header-section">
                <!-- AICTE Emblem -->
                <div class="aicte-seal">
                  <svg viewBox="0 0 100 100" fill="none">
                    ${Array.from({ length: 24 })
                      .map((_, i) => `<rect x="47" y="1" width="6" height="8" rx="1" fill="#f59e0b" transform="rotate(${i * 15} 50 50)" />`)
                      .join("")}
                    <circle cx="50" cy="50" r="44" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
                    <circle cx="50" cy="50" r="40" fill="#0b2341" stroke="#fbbf24" stroke-width="1" />
                    <circle cx="50" cy="50" r="33" fill="#ffffff" stroke="#f59e0b" stroke-width="1.8" />
                    <text x="50" y="34" fill="#0b2341" font-size="12.5" font-weight="900" letter-spacing="0.08em" text-anchor="middle" font-family="sans-serif">AICTE</text>
                    <line x1="32" y1="37" x2="68" y2="37" stroke="#f59e0b" stroke-width="1" stroke-linecap="round" />
                    <path d="M 36 64 C 36 70 64 70 64 64 C 64 62 36 62 36 64 Z" fill="#d97706" />
                    <ellipse cx="50" cy="62.5" rx="11" ry="2.2" fill="#f59e0b" />
                    <path d="M 50 40 C 43 49 43 57 50 61 C 57 57 57 49 50 40 Z" fill="#ea580c" />
                    <path d="M 50 44 C 45 50 45 56 50 59 C 55 56 55 50 50 44 Z" fill="#fef08a" />
                    <text x="50" y="76" fill="#92400e" font-size="4" font-weight="700" letter-spacing="0.02em" text-anchor="middle" font-family="sans-serif">योगः कर्मसु कौशलम्</text>
                  </svg>
                </div>

                <p class="company-name">Haque &amp; Sons Co.</p>
                <h1 class="cert-title">CERTIFICATE</h1>
                <div class="ribbon-bar">OF INTERNSHIP</div>
              </div>

              <!-- Recipient Honors -->
              <div class="recipient-section">
                <p class="awarded-to">This certificate awarded to</p>
                <h2 class="candidate-name">${certificate.studentName}</h2>
                <p class="college-name">${certificate.college}</p>
                <p class="citation-line">In recognition of his/her efforts and achievements in completing the</p>
                <p class="citation-line">${durationDays} internship program in</p>
                <h3 class="domain-title">${certificate.domain}</h3>
                <p class="conducted-dates">Conducted from ${conductedDates}</p>
              </div>

              <!-- Footer -->
              <div class="footer-row">
                <!-- QR Code (Left) -->
                <div class="qr-col">
                  <div class="qr-box">
                    <img src="${qrCodeUrl}" alt="QR Verification" />
                  </div>
                  <div class="qr-meta">
                    <strong style="color: ${navyDark}; font-size: 7.2pt; display: block;">ID: ${certificate.id}</strong>
                    <span>Verified Industry Credential</span><br />
                    <span>Scan to verify public ledger</span>
                  </div>
                </div>

                <!-- Signatory (Center) -->
                <div class="sig-col" style="align-items: center; text-align: center;">
                  <img class="sig-img" src="${signatureSrc}" alt="Signature" style="margin: 0 auto 0.5mm auto;" />
                  <div class="sig-line" style="margin: 0 auto 1.8mm auto;"></div>
                  <p class="sig-name">Nejamul Haque</p>
                  <p class="sig-title">${signatoryDesignation}</p>
                </div>

                <!-- Gold Rosette Seal (Right) -->
                <div class="seal-col" style="justify-content: flex-end; align-items: center;">
                  <svg class="seal-img" viewBox="0 0 100 135" fill="none">
                    <polygon points="38,65 18,128 29,116 45,125 48,65" fill="#d97706" stroke="#b45309" stroke-width="1" />
                    <polygon points="52,65 55,125 71,116 82,128 62,65" fill="#f59e0b" stroke="#b45309" stroke-width="1" />
                    ${Array.from({ length: 24 })
                      .map((_, i) => `<circle cx="50" cy="9" r="4.2" fill="#f59e0b" stroke="#d97706" stroke-width="0.8" transform="rotate(${i * 15} 50 48)" />`)
                      .join("")}
                    <circle cx="50" cy="48" r="39" fill="#f59e0b" stroke="#b45309" stroke-width="1.5" />
                    <circle cx="50" cy="48" r="36" fill="#fef08a" stroke="#fbbf24" stroke-width="1.2" />
                    <circle cx="50" cy="48" r="30" fill="none" stroke="#b45309" stroke-width="1" stroke-dasharray="2 1.5" opacity="0.75" />
                    <circle cx="50" cy="48" r="26" fill="#f59e0b" stroke="#f59e0b" stroke-width="1" />
                    <circle cx="50" cy="48" r="21" fill="none" stroke="#fef08a" stroke-width="0.8" opacity="0.8" />
                  </svg>
                </div>
              </div>
            </div>
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
    `Internship Certification - ${certificate.domain}`
  )}&organizationName=${encodeURIComponent(
    "Haque & Sons Co."
  )}&issueYear=${new Date(certificate.issueDate || Date.now()).getFullYear()}&issueMonth=${
    new Date(certificate.issueDate || Date.now()).getMonth() + 1
  }&certUrl=${encodeURIComponent(verificationUrl)}&certId=${encodeURIComponent(certificate.id)}`;

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto items-center">
      {/* Top action toolbar (hidden during print) */}
      {showActions && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 bg-gray-950/90 border border-white/10 rounded-2xl backdrop-blur-md print:hidden shadow-xl w-full">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <div>
              <span className="text-xs font-mono font-semibold text-emerald-300 block">
                Cryptographically Verified Credential
              </span>
              <span className="text-[10px] text-gray-400 font-mono">
                ID: {certificate.id} • Signatory: Nejamul Haque (CEO &amp; Director)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Day / Night Theme Toggle */}
            <div className="flex items-center bg-black/60 border border-white/15 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setTheme("day")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  theme === "day"
                    ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
                title="Switch to Executive Light Theme (Matches Official Certificate)"
              >
                <Sun className="w-3.5 h-3.5 text-yellow-400" />
                <span>Executive Light</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme("night")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  theme === "night"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
                title="Switch to Cyber Dark Theme"
              >
                <Moon className="w-3.5 h-3.5 text-cyan-400" />
                <span>Cyber Dark</span>
              </button>
            </div>

            <button
              onClick={handleCopyLink}
              className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-cyan-400" />
              )}
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
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Swipe Guidance Notice */}
      <div className="md:hidden flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 w-full text-center print:hidden shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        <span>Swipe horizontally to view full high-res certificate</span>
      </div>

      {/* Certificate Container */}
      <div className="w-full overflow-x-auto pb-4 overscroll-x-contain sm:overflow-visible flex justify-start md:justify-center">
        <div
          ref={certRef}
          id="certificate-node"
          className={`relative w-full min-w-[760px] md:min-w-0 max-w-4xl mx-auto aspect-[1.414/1] p-8 sm:p-10 md:p-12 shadow-2xl flex flex-col justify-between overflow-hidden select-none transition-colors duration-300 box-border shrink-0 ${
            isDay
              ? "bg-[#ffffff] text-[#0a2240] shadow-[0_20px_60px_rgba(10,34,64,0.18)]"
              : "bg-[#040714] text-white shadow-[0_0_80px_rgba(6,182,212,0.18)]"
          }`}
        >
          {/* Vector Geometric Corner Frames */}
          <CertificateFrame isDay={isDay} />

          {/* =========================================================================
              1. HEADER: Haque & Sons Co. + CERTIFICATE + OF INTERNSHIP + AICTE Seal
          ========================================================================= */}
          <div className="relative z-10 w-full text-center pt-1">
            {/* AICTE Logo in Top-Right */}
            <div className="absolute top-0 right-4 sm:right-6">
              <AicteLogo className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20" />
            </div>

            {/* Company Name */}
            <p
              className={`text-sm sm:text-base md:text-lg font-bold tracking-wide ${
                isDay ? "text-[#0a2240]" : "text-gray-200"
              }`}
            >
              Haque &amp; Sons Co.
            </p>

            {/* Grand Certificate Title */}
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wider leading-none mt-1.5 mb-2 font-sans ${
                isDay ? "text-[#0a2240]" : "text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]"
              }`}
            >
              CERTIFICATE
            </h1>

            {/* Navy Solid Banner Ribbon */}
            <div className="inline-flex items-center justify-center">
              <span
                className={`px-8 sm:px-14 md:px-20 py-1.5 sm:py-2 text-[10px] sm:text-xs md:text-sm font-extrabold tracking-[0.35em] uppercase text-white rounded-[2px] shadow-sm ${
                  isDay ? "bg-[#0a2240]" : "bg-gradient-to-r from-cyan-900 via-blue-900 to-indigo-950 border border-cyan-500/40 text-cyan-200"
                }`}
              >
                OF INTERNSHIP
              </span>
            </div>
          </div>

          {/* =========================================================================
              2. RECIPIENT & CITATION SECTION
          ========================================================================= */}
          <div className="relative z-10 w-full text-center my-auto py-2 space-y-1 sm:space-y-1.5">
            <p
              className={`text-xs sm:text-sm md:text-base font-medium ${
                isDay ? "text-slate-600" : "text-gray-300"
              }`}
            >
              This certificate awarded to
            </p>

            {/* Candidate Name with Underline */}
            <div className="inline-block px-4">
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl font-bold font-serif pb-1.5 border-b-2 inline-block min-w-[280px] sm:min-w-[380px] md:min-w-[440px] leading-tight ${
                  isDay
                    ? "text-[#0f172a] border-[#0a2240]"
                    : "text-white border-cyan-400 drop-shadow-[0_2px_10px_rgba(255,255,255,0.25)]"
                }`}
              >
                {certificate.studentName}
              </h2>
            </div>

            {/* College Name */}
            <p
              className={`text-xs sm:text-sm md:text-base font-serif italic pt-0.5 ${
                isDay ? "text-[#0f172a]" : "text-cyan-200"
              }`}
            >
              {certificate.college}
            </p>

            {/* Recognition Text */}
            <p
              className={`text-[11px] sm:text-xs md:text-sm leading-snug max-w-2xl mx-auto pt-1 ${
                isDay ? "text-slate-600" : "text-gray-300"
              }`}
            >
              In recognition of his/her efforts and achievements in completing the
              <br />
              {durationDays} internship program in
            </p>

            {/* Domain Specialization */}
            <h3
              className={`text-sm sm:text-base md:text-lg font-extrabold uppercase tracking-wide pt-0.5 ${
                isDay ? "text-[#0a2240]" : "text-cyan-300"
              }`}
            >
              {certificate.domain}
            </h3>

            {/* Conducted Dates */}
            <p
              className={`text-[10px] sm:text-xs md:text-sm font-medium ${
                isDay ? "text-slate-600" : "text-gray-400"
              }`}
            >
              Conducted from {conductedDates}
            </p>
          </div>

          {/* =========================================================================
              3. FOOTER: QR CODE + GOLD ROSETTE SEAL + SIGNATURE
          ========================================================================= */}
          <div className="relative z-10 w-full grid grid-cols-3 items-end pt-2 pb-1">
            {/* Left: Dynamic QR Code according to intern details */}
            <div className="flex items-center gap-2.5">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 p-1 rounded-sm border shrink-0 flex items-center justify-center bg-white shadow-sm ${
                  isDay ? "border-[#0a2240]" : "border-cyan-500/50"
                }`}
              >
                <img
                  src={qrCodeUrl}
                  alt={`Verification QR for ${certificate.id}`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="hidden sm:flex flex-col text-left font-mono leading-tight space-y-0.5">
                <span
                  className={`text-[8px] sm:text-[9px] uppercase font-bold block ${
                    isDay ? "text-[#0a2240]" : "text-cyan-300"
                  }`}
                >
                  ID: {certificate.id}
                </span>
                <span className={`text-[7px] sm:text-[8px] block ${isDay ? "text-slate-500" : "text-gray-400"}`}>
                  Verified Industry Credential
                </span>
                <span className={`text-[7px] sm:text-[8px] block ${isDay ? "text-slate-500" : "text-gray-400"}`}>
                  Scan to verify authenticity
                </span>
              </div>
            </div>

            {/* Center: Signature of Nejamul Haque (CEO & Director) */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-28 sm:w-36 md:w-44 h-10 sm:h-12 md:h-14 flex items-center justify-center">
                <img
                  src="/signature.png"
                  alt="Signature of Nejamul Haque"
                  className={`max-h-full max-w-full object-contain ${
                    isDay ? "" : "filter invert brightness-150 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                  }`}
                />
              </div>
              <div
                className={`w-32 sm:w-40 md:w-48 h-[1.5px] my-1 mx-auto ${
                  isDay ? "bg-[#0a2240]" : "bg-cyan-400"
                }`}
              />
              <span
                className={`text-xs sm:text-sm md:text-base font-bold block leading-tight ${
                  isDay ? "text-[#0f172a]" : "text-white"
                }`}
              >
                Nejamul Haque
              </span>
              <span
                className={`text-[10px] sm:text-xs md:text-sm italic block ${
                  isDay ? "text-slate-600" : "text-cyan-200"
                }`}
              >
                {signatoryDesignation}
              </span>
            </div>

            {/* Right: Golden Rosette Medal with Ribbon Tails */}
            <div className="flex flex-col items-center sm:items-end justify-center pr-2 sm:pr-4">
              <GoldRosetteSeal className="w-16 h-22 sm:w-20 sm:h-28 md:w-24 md:h-32" />
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Academic & Cryptographic Security Panel (Suggestions for User) */}
      <div className="w-full max-w-4xl bg-gray-950/70 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setShowMetadata(!showMetadata)}
          className="w-full flex items-center justify-between text-left cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs sm:text-sm font-semibold text-white">
              Institutional Accreditation &amp; Quality Verification Standards
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>{showMetadata ? "Hide details" : "View compliance metadata"}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                showMetadata ? "rotate-180 text-cyan-400" : ""
              }`}
            />
          </div>
        </button>

        {showMetadata && (
          <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
              <span className="text-[10px] uppercase font-mono text-gray-400 block font-bold">
                Engineering Immersion
              </span>
              <span className="text-base font-bold text-emerald-400 block">
                {aicte.totalHours}+ Hours
              </span>
              <span className="text-[11px] text-gray-400 block">
                {certificate.duration || "90 days"} Practicum
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
              <span className="text-[10px] uppercase font-mono text-gray-400 block font-bold">
                Specialization Track
              </span>
              <span className="text-base font-bold text-cyan-400 block truncate">
                {certificate.domain}
              </span>
              <span className="text-[11px] text-gray-400 block">
                Production Capstone R&amp;D
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
              <span className="text-[10px] uppercase font-mono text-gray-400 block font-bold">
                MSME Registration
              </span>
              <span className="text-base font-bold text-amber-300 block">
                {aicte.msmeUdyamId}
              </span>
              <span className="text-[11px] text-gray-400 block">
                Ministry of MSME, Govt of India
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
              <span className="text-[10px] uppercase font-mono text-gray-400 block font-bold">
                Verification Ledger
              </span>
              <span className="text-base font-bold text-purple-300 block truncate">
                SHA-256 Ledger
              </span>
              <a
                href={verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>Live Record</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
