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
          <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
          <style>
            @page {
              size: A4 landscape;
              margin: 0 !important;
            }
            *, *::before, *::after {
              box-sizing: border-box !important;
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
              padding: 8mm 10mm !important;
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
    `Engineering Internship - ${certificate.domain}`
  )}&organizationName=${encodeURIComponent(
    "Haque & Sons Software Studio"
  )}&issueYear=${new Date(certificate.issueDate || Date.now()).getFullYear()}&issueMonth=${
    new Date(certificate.issueDate || Date.now()).getMonth() + 1
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
            padding: 8mm 10mm !important;
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-950/90 border border-white/10 rounded-2xl backdrop-blur-md print:hidden shadow-xl w-full">
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
        className={`relative w-full max-w-5xl mx-auto aspect-[1.414/1] p-6 sm:p-8 md:p-10 rounded-3xl border-2 shadow-2xl flex flex-col justify-between overflow-hidden select-none transition-colors duration-300 box-border ${
          isDay
            ? "bg-[#ffffff] text-slate-900 border-slate-900 shadow-[0_15px_40px_rgba(0,0,0,0.12)]"
            : "bg-[#050814] text-white border-cyan-500/40 shadow-[0_0_80px_rgba(6,182,212,0.18)]"
        }`}
        style={{
          backgroundImage: isDay
            ? `radial-gradient(circle at 50% 50%, rgba(217,119,6,0.025) 0%, #ffffff 85%), linear-gradient(135deg, rgba(15,23,42,0.02) 0%, transparent 100%)`
            : `radial-gradient(circle at 50% 50%, rgba(6,182,212,0.07) 0%, #030712 85%), linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 100%)`,
        }}
      >
        {/* Intricate Guilloché Corner Borders */}
        <div
          className={`absolute inset-2.5 sm:inset-3 border rounded-2xl pointer-events-none ${
            isDay ? "border-slate-300" : "border-cyan-500/25"
          }`}
        />
        <div
          className={`absolute inset-4 sm:inset-5 border rounded-xl pointer-events-none ${
            isDay ? "border-amber-600/30" : "border-white/10"
          }`}
        />

        {/* Corner Accents */}
        <div className={`absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 ${isDay ? "border-slate-900" : "border-cyan-400"}`} />
        <div className={`absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 ${isDay ? "border-slate-900" : "border-cyan-400"}`} />
        <div className={`absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 ${isDay ? "border-slate-900" : "border-cyan-400"}`} />
        <div className={`absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 ${isDay ? "border-slate-900" : "border-cyan-400"}`} />

        {/* Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <div style={{ width: "320px", height: "320px" }} className="relative flex items-center justify-center">
            <img src="/logo.svg" alt="Watermark" style={{ width: "260px", height: "260px", objectFit: "contain" }} />
          </div>
        </div>

        {/* 1. Header Section */}
        <div className="relative z-10 text-center space-y-1">
          <div className="flex items-center justify-center gap-2.5">
            <div
              style={{ width: "32px", height: "32px" }}
              className={`rounded-lg overflow-hidden p-1 flex items-center justify-center shadow-md ${
                isDay ? "bg-slate-950 text-white" : "bg-gradient-to-br from-cyan-500 to-blue-600"
              }`}
            >
              <img src="/logo.svg" alt="Haque & Sons" style={{ width: "24px", height: "24px", objectFit: "contain" }} />
            </div>
            <span
              className={`font-extrabold tracking-widest text-xs sm:text-sm uppercase font-serif ${
                isDay ? "text-slate-950" : "text-white"
              }`}
            >
              Haque &amp; Sons
            </span>
          </div>

          <p
            className={`text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.25em] font-bold ${
              isDay ? "text-sky-800" : "text-cyan-400"
            }`}
          >
            Software Studio &amp; Engineering Infrastructure Labs
          </p>

          <p className={`text-[7.5px] sm:text-[8px] font-mono tracking-wider ${isDay ? "text-slate-500" : "text-gray-400"}`}>
            MSME REGISTRATION: <strong className={isDay ? "text-slate-800 font-semibold" : "text-gray-200"}>UDYAM-UP-55-0012984</strong> • ISO 9001:2015 ACCREDITED
          </p>

          <div className="pt-1">
            <h1
              className={`text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight uppercase font-serif leading-tight ${
                isDay
                  ? "text-slate-950"
                  : "text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400"
              }`}
            >
              Certificate of Excellence &amp; Completion
            </h1>
            <div
              className={`h-0.5 w-36 mx-auto mt-1 ${
                isDay
                  ? "bg-gradient-to-r from-transparent via-amber-600 to-transparent"
                  : "bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              }`}
            />
          </div>
        </div>

        {/* 2. Recipient Presentation Section */}
        <div className="relative z-10 text-center space-y-1.5 sm:space-y-2 my-auto py-1">
          <p
            className={`text-[9px] sm:text-[10px] uppercase tracking-widest font-mono ${
              isDay ? "text-slate-500" : "text-gray-400"
            }`}
          >
            This is proudly conferred upon
          </p>

          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-wide uppercase font-serif ${
              isDay ? "text-slate-950" : "text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]"
            }`}
          >
            {certificate.studentName}
          </h2>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold mx-auto border"
            style={{
              backgroundColor: isDay ? "#f1f5f9" : "rgba(255, 255, 255, 0.05)",
              borderColor: isDay ? "#cbd5e1" : "rgba(255, 255, 255, 0.12)",
              color: isDay ? "#0f172a" : "#e2e8f0",
            }}
          >
            <span className={isDay ? "text-slate-500 font-normal" : "text-gray-400 font-normal"}>Institutional Affiliation:</span>
            <span className="font-bold">{certificate.college}</span>
          </div>

          <p
            className={`text-[10.5px] sm:text-[11.5px] leading-relaxed max-w-2xl mx-auto pt-1 ${
              isDay ? "text-slate-700" : "text-gray-300"
            }`}
          >
            for demonstrating exemplary engineering rigor, problem-solving proficiency, and successfully completing the intensive{" "}
            <strong className={isDay ? "text-slate-950 font-bold" : "text-white font-bold"}>
              {certificate.duration || "4-Week"} Virtual Practicum
            </strong>{" "}
            in{" "}
            <strong className={isDay ? "text-sky-900 font-bold" : "text-cyan-400 font-bold"}>
              {certificate.domain}
            </strong>
            , delivering production-grade architectures and meeting rigorous industry benchmarks.
          </p>

          {/* 3. Practicum Appraisal & Credentials Highlight Matrix */}
          <div className="grid grid-cols-4 gap-2 max-w-2xl mx-auto pt-1.5">
            <div
              className={`p-1.5 rounded-xl border text-center ${
                isDay ? "bg-slate-50/90 border-slate-200" : "bg-white/[0.03] border-white/10"
              }`}
            >
              <span className={`text-[7.5px] uppercase font-mono block ${isDay ? "text-slate-500" : "text-gray-400"}`}>
                Specialization Track
              </span>
              <span className={`text-[9.5px] font-bold block truncate mt-0.5 ${isDay ? "text-sky-900" : "text-cyan-300"}`}>
                {certificate.domain}
              </span>
            </div>

            <div
              className={`p-1.5 rounded-xl border text-center ${
                isDay ? "bg-slate-50/90 border-slate-200" : "bg-white/[0.03] border-white/10"
              }`}
            >
              <span className={`text-[7.5px] uppercase font-mono block ${isDay ? "text-slate-500" : "text-gray-400"}`}>
                Practicum Tenure
              </span>
              <span className={`text-[9.5px] font-bold block mt-0.5 ${isDay ? "text-slate-900" : "text-white"}`}>
                {certificate.duration || "4 Weeks"} (160+ Hrs)
              </span>
            </div>

            <div
              className={`p-1.5 rounded-xl border text-center ${
                isDay ? "bg-amber-50/80 border-amber-300/60" : "bg-yellow-500/10 border-yellow-500/25"
              }`}
            >
              <span className={`text-[7.5px] uppercase font-mono block ${isDay ? "text-amber-800" : "text-yellow-400"}`}>
                Performance Tier
              </span>
              <span className={`text-[9.5px] font-extrabold block mt-0.5 uppercase ${isDay ? "text-amber-900" : "text-yellow-300"}`}>
                {certificate.grade || "Distinction"}
              </span>
            </div>

            <div
              className={`p-1.5 rounded-xl border text-center ${
                isDay ? "bg-emerald-50/80 border-emerald-300/60" : "bg-emerald-500/10 border-emerald-500/25"
              }`}
            >
              <span className={`text-[7.5px] uppercase font-mono block ${isDay ? "text-emerald-800" : "text-emerald-400"}`}>
                Verification
              </span>
              <span className={`text-[9.5px] font-bold block mt-0.5 ${isDay ? "text-emerald-900" : "text-emerald-300"}`}>
                Cryptographically Sealed
              </span>
            </div>
          </div>
        </div>

        {/* 4. Footer Section: QR Code, Holographic Seal & Signature */}
        <div
          className={`relative z-10 pt-2.5 sm:pt-3 border-t grid grid-cols-3 items-end ${
            isDay ? "border-slate-300" : "border-cyan-500/25"
          }`}
        >
          {/* Left: Verification QR Code & ID */}
          <div className="flex items-center gap-2">
            <div
              style={{ width: "52px", height: "52px" }}
              className={`p-1 rounded-xl border overflow-hidden shadow-sm shrink-0 flex items-center justify-center ${
                isDay ? "bg-white border-slate-300" : "bg-black border-cyan-500/30"
              }`}
            >
              <img
                src={qrCodeUrl}
                alt="Verification QR"
                style={{ width: "44px", height: "44px", objectFit: "contain" }}
              />
            </div>
            <div className="text-left font-mono leading-tight">
              <span className={`text-[7.5px] sm:text-[8px] uppercase block font-semibold ${isDay ? "text-slate-500" : "text-gray-500"}`}>
                Certificate ID
              </span>
              <span
                className={`text-[9.5px] sm:text-[10px] font-bold block truncate max-w-[140px] ${
                  isDay ? "text-sky-900" : "text-cyan-400"
                }`}
              >
                {certificate.id}
              </span>
              <span className={`text-[7.5px] sm:text-[8px] block mt-0.5 ${isDay ? "text-slate-600" : "text-gray-400"}`}>
                Issued: {formattedDate}
              </span>
            </div>
          </div>

          {/* Center: Holographic Gold/Cyan Seal */}
          <div className="flex flex-col items-center justify-center text-center">
            <div
              style={{ width: "48px", height: "48px" }}
              className={`rounded-full border-2 p-0.5 flex items-center justify-center shadow-md ${
                isDay
                  ? "bg-amber-50 border-amber-600/70"
                  : "bg-gradient-to-tr from-cyan-500/20 via-yellow-500/20 to-cyan-500/40 border-yellow-400/60 shadow-[0_0_20px_rgba(250,204,21,0.2)]"
              }`}
            >
              <div
                className={`w-full h-full rounded-full border border-dashed flex flex-col items-center justify-center text-[6.5px] sm:text-[7px] font-bold uppercase tracking-tighter ${
                  isDay
                    ? "border-amber-600/40 text-amber-900"
                    : "border-yellow-400/40 text-yellow-300"
                }`}
              >
                <ShieldCheck className={`w-3.5 h-3.5 ${isDay ? "text-amber-700" : "text-yellow-400"}`} />
                <span>OFFICIAL SEAL</span>
              </div>
            </div>
            <span
              className={`text-[7.5px] uppercase tracking-widest font-mono mt-0.5 ${
                isDay ? "text-slate-500" : "text-gray-400"
              }`}
            >
              Verified Credential
            </span>
          </div>

          {/* Right: Signature with Real Uploaded Signature */}
          <div className="flex flex-col items-end text-right">
            <div style={{ width: "130px", height: "36px" }} className="flex items-center justify-end">
              <img
                src="/signature.png"
                alt="Signature of Nejamul Haque"
                style={{ width: "120px", height: "34px", objectFit: "contain" }}
                className={isDay ? "" : "filter invert brightness-150 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"}
              />
            </div>
            <div
              style={{ width: "125px", height: "1px" }}
              className={`my-0.5 ${
                isDay
                  ? "bg-slate-400"
                  : "bg-gradient-to-l from-cyan-400 to-transparent"
              }`}
            />
            <span
              className={`text-[9.5px] sm:text-[10px] font-bold block leading-tight ${
                isDay ? "text-slate-950" : "text-white"
              }`}
            >
              Nejamul Haque
            </span>
            <span
              className={`text-[7.5px] sm:text-[8px] block ${
                isDay ? "text-slate-600" : "text-gray-400"
              }`}
            >
              {certificate.signatoryTitle || "Founder & Lead Systems Architect"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


