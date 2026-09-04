"use client";

import { useState, useRef } from "react";
import {
  Download,
  Share2,
  Printer,
  CheckCircle2,
  Award,
  Copy,
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
  const [copied, setCopied] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  const formattedDate = new Date(certificate.issueDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const verificationUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/verify/${certificate.id}`
      : `https://haqueandsons.vercel.app/verify/${certificate.id}`;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
    verificationUrl
  )}&bgcolor=000000&color=06b6d4&margin=2`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const linkedInShareUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
    `Internship in ${certificate.domain}`
  )}&organizationName=${encodeURIComponent(
    "Haque & Sons"
  )}&issueYear=${new Date(certificate.issueDate).getFullYear()}&issueMonth=${
    new Date(certificate.issueDate).getMonth() + 1
  }&certUrl=${encodeURIComponent(verificationUrl)}&certId=${encodeURIComponent(
    certificate.id
  )}`;

  return (
    <div className="space-y-6">
      {/* Top action toolbar (hidden during print) */}
      {showActions && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-gray-950/80 border border-white/10 rounded-2xl backdrop-blur-md print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-semibold text-emerald-300">
              Cryptographically Verified Authenticity
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
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
              <span>Download PDF / Certificate</span>
            </button>
          </div>
        </div>
      )}

      {/* The Printable / Downloadable Certificate Card */}
      <div
        ref={certRef}
        id="certificate-node"
        className="relative w-full max-w-4xl mx-auto aspect-[1.414/1] bg-[#050814] text-white p-8 sm:p-12 md:p-16 rounded-3xl border-2 border-cyan-500/30 shadow-[0_0_80px_rgba(6,182,212,0.15)] flex flex-col justify-between overflow-hidden select-none print:m-0 print:p-8 print:border-none print:shadow-none print:w-full print:max-w-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(6,182,212,0.06) 0%, rgba(0,0,0,0.95) 75%), linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 100%)`,
        }}
      >
        {/* Intricate Guilloché Corner Borders */}
        <div className="absolute inset-3 sm:inset-5 border border-cyan-500/20 rounded-2xl pointer-events-none" />
        <div className="absolute inset-5 sm:inset-7 border border-white/5 rounded-xl pointer-events-none" />

        {/* Corner Accents */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-400" />

        {/* Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <div className="relative w-[380px] h-[380px]">
            <Image src="/logo.svg" alt="Watermark" fill className="object-contain" unoptimized />
          </div>
        </div>

        {/* Certificate Header */}
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-600 p-1 flex items-center justify-center shadow-md">
              <Image src="/logo.svg" alt="Haque & Sons" fill className="p-1 object-cover" unoptimized />
            </div>
            <span className="font-extrabold tracking-widest text-sm sm:text-base text-white uppercase">
              Haque & Sons
            </span>
          </div>

          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-cyan-400 font-semibold mb-6">
            Next-Gen Software Studio Infrastructure
          </p>

          <div className="inline-block relative">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 tracking-tight uppercase font-serif">
              Certificate of Completion
            </h1>
            <div className="h-0.5 w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-2" />
          </div>
        </div>

        {/* Certificate Body */}
        <div className="relative z-10 text-center my-4 sm:my-6 space-y-3 sm:space-y-4">
          <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest font-mono">
            This is proudly awarded to
          </p>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-wide uppercase font-sans drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
            {certificate.studentName}
          </h2>

          <p className="text-xs sm:text-sm text-cyan-300 font-medium">
            of <span className="text-white font-semibold">{certificate.college}</span>
          </p>

          <div className="max-w-2xl mx-auto pt-2">
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              for successfully completing an intensive{" "}
              <strong className="text-white font-semibold">
                {certificate.duration || "4-Week"} Virtual Internship
              </strong>{" "}
              in{" "}
              <strong className="text-cyan-400 font-bold">
                {certificate.domain}
              </strong>
              {certificate.grade && (
                <span>
                  {" "}
                  with distinction grade{" "}
                  <strong className="text-yellow-400 font-bold uppercase">
                    &ldquo;{certificate.grade}&rdquo;
                  </strong>
                </span>
              )}
              , demonstrating high proficiency in industry-grade software engineering, system architecture, and production delivery.
            </p>
          </div>
        </div>

        {/* Certificate Footer: QR Code, Holographic Seal & Signature */}
        <div className="relative z-10 pt-6 border-t border-cyan-500/20 grid grid-cols-3 items-end">
          {/* Left: Verification QR Code & ID */}
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-black p-1 rounded-xl border border-cyan-500/30 overflow-hidden shadow-md">
              <Image
                src={qrCodeUrl}
                alt="Verification QR"
                fill
                className="object-contain p-1"
                unoptimized
              />
            </div>
            <div className="text-left font-mono">
              <span className="text-[9px] text-gray-500 uppercase block">Certificate ID</span>
              <span className="text-[11px] sm:text-xs text-cyan-400 font-bold block truncate max-w-[140px]">
                {certificate.id}
              </span>
              <span className="text-[9px] text-gray-400 block mt-0.5">{formattedDate}</span>
            </div>
          </div>

          {/* Center: Holographic Gold/Cyan Seal */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-cyan-500/20 via-yellow-500/20 to-cyan-500/40 border-2 border-yellow-400/60 p-1 flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.2)]">
              <div className="w-full h-full rounded-full border border-yellow-400/40 flex flex-col items-center justify-center text-[8px] font-bold text-yellow-300 uppercase tracking-tighter">
                <Award className="w-5 h-5 text-yellow-400 mb-0.5" />
                <span>Verified</span>
              </div>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-gray-400 font-mono mt-1.5">
              Official Credential
            </span>
          </div>

          {/* Right: Signature */}
          <div className="flex flex-col items-end text-right">
            <div className="h-10 sm:h-12 flex items-center">
              <span className="font-serif italic text-lg sm:text-2xl text-cyan-300 tracking-wider font-bold">
                Nejamul Haque
              </span>
            </div>
            <div className="h-0.5 w-36 bg-gradient-to-l from-cyan-400 to-transparent my-1" />
            <span className="text-[11px] sm:text-xs font-bold text-white block">
              Nejamul Haque
            </span>
            <span className="text-[9px] text-gray-400 block">
              {certificate.signatoryTitle || "Founder & Lead Engineer"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
