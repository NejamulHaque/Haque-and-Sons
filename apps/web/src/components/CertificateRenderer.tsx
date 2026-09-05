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
} from "lucide-react";
import Image from "next/image";

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

  const formattedDate = new Date(certificate.issueDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const verificationUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/verify/${certificate.id}`
      : `https://haqueandsons.vercel.app/verify/${certificate.id}`;

  const qrCodeUrl = isDay
    ? `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
        verificationUrl
      )}&bgcolor=ffffff&color=0f172a&margin=1`
    : `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
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
          <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Cinzel:wght@700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
          <style>
            @page {
              size: A4 landscape;
              margin: 0 !important;
            }
            *, *::before, *::after {
              box-sizing: border-box;
            }
            html, body {
              width: 297mm;
              height: 210mm;
              margin: 0 !important;
              padding: 0 !important;
              background: ${isDayTheme ? "#ffffff" : "#030712"} !important;
              color: ${isDayTheme ? "#0f172a" : "#ffffff"} !important;
              font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              overflow: hidden;
            }
            .cert-print-sheet {
              width: 297mm !important;
              height: 210mm !important;
              max-width: 297mm !important;
              max-height: 210mm !important;
              box-shadow: none !important;
              margin: 0 !important;
              padding: 10mm 12mm !important;
              background-color: ${isDayTheme ? "#ffffff" : "#050814"} !important;
              color: ${isDayTheme ? "#0f172a" : "#ffffff"} !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              overflow: hidden;
              box-sizing: border-box !important;
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
    `Engineering Internship - ${certificate.domain}`
  )}&organizationName=${encodeURIComponent(
    "Haque & Sons Software Studio"
  )}&issueYear=${new Date(certificate.issueDate).getFullYear()}&issueMonth=${
    new Date(certificate.issueDate).getMonth() + 1
  }&certUrl=${encodeURIComponent(verificationUrl)}&certId=${encodeURIComponent(
    certificate.id
  )}`;

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto items-center">
      {/* Embedded print CSS for direct browser printing */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 landscape;
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
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 297mm !important;
            height: 210mm !important;
            max-width: 297mm !important;
            max-height: 210mm !important;
            padding: 10mm 12mm !important;
            border: ${isDay ? "2px solid #0f172a" : "2px solid rgba(6, 182, 212, 0.4)"} !important;
            box-shadow: none !important;
            margin: 0 !important;
            background-color: ${isDay ? "#ffffff" : "#050814"} !important;
            color: ${isDay ? "#0f172a" : "#ffffff"} !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>

      {/* Top action toolbar (hidden during print) */}
      {showActions && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-950/90 border border-white/10 rounded-2xl backdrop-blur-md print:hidden shadow-xl">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
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
              <span>{copied ? "Link Copied!" : "Copy Verification URL"}</span>
            </button>

            <a
              href={linkedInShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-[#0A66C2]/20 hover:bg-[#0A66C2]/30 border border-[#0A66C2]/40 text-[#70B5F9] text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Add to LinkedIn</span>
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
              <span>Download PDF ({isDay ? "Day" : "Night"})</span>
            </button>
          </div>
        </div>
      )}

      {/* The Printable / Downloadable Certificate Card */}
      <div
        ref={certRef}
        id="certificate-node"
        className={`relative w-full max-w-4xl mx-auto aspect-[1.414/1] p-6 sm:p-10 md:p-12 rounded-3xl border-2 shadow-2xl flex flex-col justify-between overflow-hidden select-none transition-colors duration-300 ${
          isDay
            ? "bg-[#ffffff] text-slate-900 border-slate-900 shadow-[0_15px_40px_rgba(0,0,0,0.12)]"
            : "bg-[#050814] text-white border-cyan-500/40 shadow-[0_0_80px_rgba(6,182,212,0.18)]"
        }`}
        style={{
          backgroundImage: isDay
            ? `radial-gradient(circle at 50% 50%, rgba(217,119,6,0.02) 0%, #ffffff 85%), linear-gradient(135deg, rgba(15,23,42,0.02) 0%, transparent 100%)`
            : `radial-gradient(circle at 50% 50%, rgba(6,182,212,0.07) 0%, #030712 85%), linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 100%)`,
        }}
      >
        {/* Intricate Guilloché Corner Borders */}
        <div
          className={`absolute inset-3 sm:inset-4 border rounded-2xl pointer-events-none ${
            isDay ? "border-slate-300" : "border-cyan-500/25"
          }`}
        />
        <div
          className={`absolute inset-4 sm:inset-6 border rounded-xl pointer-events-none ${
            isDay ? "border-amber-600/20" : "border-white/10"
          }`}
        />

        {/* Corner Accents */}
        <div className={`absolute top-3.5 left-3.5 w-6 h-6 border-t-2 border-l-2 ${isDay ? "border-slate-900" : "border-cyan-400"}`} />
        <div className={`absolute top-3.5 right-3.5 w-6 h-6 border-t-2 border-r-2 ${isDay ? "border-slate-900" : "border-cyan-400"}`} />
        <div className={`absolute bottom-3.5 left-3.5 w-6 h-6 border-b-2 border-l-2 ${isDay ? "border-slate-900" : "border-cyan-400"}`} />
        <div className={`absolute bottom-3.5 right-3.5 w-6 h-6 border-b-2 border-r-2 ${isDay ? "border-slate-900" : "border-cyan-400"}`} />

        {/* Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <div className="relative w-[340px] h-[340px]">
            <Image src="/logo.svg" alt="Watermark" fill className="object-contain" unoptimized />
          </div>
        </div>

        {/* Certificate Header */}
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-2.5 mb-1.5">
            <div
              className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg overflow-hidden p-1 flex items-center justify-center shadow-md ${
                isDay ? "bg-slate-950 text-white" : "bg-gradient-to-br from-cyan-500 to-blue-600"
              }`}
            >
              <Image src="/logo.svg" alt="Haque & Sons" fill className="p-1 object-cover" unoptimized />
            </div>
            <span
              className={`font-extrabold tracking-widest text-xs sm:text-sm uppercase ${
                isDay ? "text-slate-950" : "text-white"
              }`}
            >
              Haque & Sons
            </span>
          </div>

          <p
            className={`text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-bold mb-3 ${
              isDay ? "text-sky-800" : "text-cyan-400"
            }`}
          >
            Software Studio & Engineering Infrastructure Labs
          </p>

          <div className="inline-block relative">
            <h1
              className={`text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight uppercase font-serif ${
                isDay
                  ? "text-slate-950"
                  : "text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400"
              }`}
            >
              Certificate of Completion
            </h1>
            <div
              className={`h-0.5 w-28 mx-auto mt-1 ${
                isDay
                  ? "bg-gradient-to-r from-transparent via-amber-600 to-transparent"
                  : "bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              }`}
            />
          </div>
        </div>

        {/* Certificate Body */}
        <div className="relative z-10 text-center my-2 sm:my-3 space-y-2 sm:space-y-2.5">
          <p
            className={`text-[10px] sm:text-xs uppercase tracking-widest font-mono ${
              isDay ? "text-slate-500" : "text-gray-400"
            }`}
          >
            This is proudly awarded to
          </p>

          <h2
            className={`text-xl sm:text-3xl md:text-4xl font-black tracking-wide uppercase font-sans ${
              isDay ? "text-slate-950" : "text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]"
            }`}
          >
            {certificate.studentName}
          </h2>

          <p
            className={`text-xs sm:text-sm font-semibold ${
              isDay ? "text-sky-900" : "text-cyan-300"
            }`}
          >
            of <span className={isDay ? "text-slate-950 font-bold" : "text-white font-bold"}>{certificate.college}</span>
          </p>

          <div className="max-w-2xl mx-auto pt-1">
            <p
              className={`text-[11px] sm:text-xs leading-relaxed ${
                isDay ? "text-slate-700" : "text-gray-300"
              }`}
            >
              for successfully completing an intensive{" "}
              <strong className={isDay ? "text-slate-950 font-bold" : "text-white font-bold"}>
                {certificate.duration || "4-Week"} Virtual Internship
              </strong>{" "}
              in{" "}
              <strong className={isDay ? "text-sky-900 font-bold" : "text-cyan-400 font-bold"}>
                {certificate.domain}
              </strong>
              {certificate.grade && (
                <span>
                  {" "}
                  with distinction grade{" "}
                  <strong className={isDay ? "text-amber-700 font-bold uppercase" : "text-yellow-400 font-bold uppercase"}>
                    &ldquo;{certificate.grade}&rdquo;
                  </strong>
                </span>
              )}
              , demonstrating high proficiency in industry-grade software engineering, system architecture, and production delivery.
            </p>
          </div>
        </div>

        {/* Certificate Footer: QR Code, Holographic Seal & Signature */}
        <div
          className={`relative z-10 pt-3 sm:pt-4 border-t grid grid-cols-3 items-end ${
            isDay ? "border-slate-200" : "border-cyan-500/20"
          }`}
        >
          {/* Left: Verification QR Code & ID */}
          <div className="flex items-center gap-2.5">
            <div
              className={`relative w-14 h-14 sm:w-16 sm:h-16 p-1 rounded-xl border overflow-hidden shadow-sm shrink-0 ${
                isDay ? "bg-white border-slate-300" : "bg-black border-cyan-500/30"
              }`}
            >
              <Image
                src={qrCodeUrl}
                alt="Verification QR"
                fill
                className="object-contain p-0.5"
                unoptimized
              />
            </div>
            <div className="text-left font-mono">
              <span className={`text-[8px] sm:text-[9px] uppercase block font-semibold ${isDay ? "text-slate-500" : "text-gray-500"}`}>
                Certificate ID
              </span>
              <span
                className={`text-[10px] sm:text-[11px] font-bold block truncate max-w-[130px] ${
                  isDay ? "text-sky-900" : "text-cyan-400"
                }`}
              >
                {certificate.id}
              </span>
              <span className={`text-[8px] sm:text-[9px] block mt-0.5 ${isDay ? "text-slate-600" : "text-gray-400"}`}>
                {formattedDate}
              </span>
            </div>
          </div>

          {/* Center: Holographic Gold/Cyan Seal */}
          <div className="flex flex-col items-center justify-center text-center">
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 p-1 flex items-center justify-center shadow-md ${
                isDay
                  ? "bg-amber-50 border-amber-600/70"
                  : "bg-gradient-to-tr from-cyan-500/20 via-yellow-500/20 to-cyan-500/40 border-yellow-400/60 shadow-[0_0_20px_rgba(250,204,21,0.2)]"
              }`}
            >
              <div
                className={`w-full h-full rounded-full border flex flex-col items-center justify-center text-[7px] sm:text-[8px] font-bold uppercase tracking-tighter ${
                  isDay
                    ? "border-amber-600/40 text-amber-900"
                    : "border-yellow-400/40 text-yellow-300"
                }`}
              >
                <Award className={`w-4 h-4 mb-0.5 ${isDay ? "text-amber-700" : "text-yellow-400"}`} />
                <span>Verified</span>
              </div>
            </div>
            <span
              className={`text-[8px] sm:text-[9px] uppercase tracking-widest font-mono mt-1 ${
                isDay ? "text-slate-500" : "text-gray-400"
              }`}
            >
              Official Credential
            </span>
          </div>

          {/* Right: Signature with Real Uploaded Signature */}
          <div className="flex flex-col items-end text-right">
            <div className="h-10 sm:h-12 flex items-center justify-end">
              <div className="relative w-28 sm:w-32 h-10">
                <Image
                  src="/signature.png"
                  alt="Signature of Nejamul Haque"
                  fill
                  className={`object-contain object-right ${
                    isDay
                      ? ""
                      : "filter invert brightness-150 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                  }`}
                  unoptimized
                />
              </div>
            </div>
            <div
              className={`h-0.5 w-32 my-0.5 ${
                isDay
                  ? "bg-slate-400"
                  : "bg-gradient-to-l from-cyan-400 to-transparent"
              }`}
            />
            <span
              className={`text-[10px] sm:text-[11px] font-bold block ${
                isDay ? "text-slate-950" : "text-white"
              }`}
            >
              Nejamul Haque
            </span>
            <span
              className={`text-[8px] sm:text-[9px] block ${
                isDay ? "text-slate-600" : "text-gray-400"
              }`}
            >
              {certificate.signatoryTitle || "Founder & Lead Engineer"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


