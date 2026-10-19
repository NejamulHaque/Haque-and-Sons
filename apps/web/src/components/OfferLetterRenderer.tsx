"use client";

import { useState } from "react";
import {
  Download,
  Award,
  Mail,
  Sparkles,
  ShieldCheck,
  Printer,
  CheckCircle2,
  X,
  FileText,
  Check,
  GraduationCap,
  Copy,
  Share2,
} from "lucide-react";
import Image from "next/image";
import { getAicteComplianceInfo } from "@/lib/aicte";

export interface OfferLetterData {
  id: string;
  studentName: string;
  studentEmail?: string;
  college: string;
  degree?: string;
  domain: string;
  mode: string;
  duration: string;
  internshipType: string;
  startDate: string;
}

export function OfferLetterRenderer({
  data,
  showActions = true,
  onClose,
}: {
  data: OfferLetterData;
  showActions?: boolean;
  onClose?: () => void;
}) {
  const [format, setFormat] = useState<"1-page" | "2-page">("1-page");
  const [isAccepted, setIsAccepted] = useState(true);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const verificationUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/verify/${data.id}`
      : `https://haquestudio.me/verify/${data.id}`;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    verificationUrl
  )}&bgcolor=ffffff&color=0a2240&margin=0`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleDownloadPDF = () => {
    const node = document.getElementById("offer-letter-document");
    if (!node) {
      window.print();
      return;
    }

    // Create isolated printable iframe for clean PDF generation without any surrounding UI
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

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Offer_Letter_${(data.studentName || "Student").replace(/\\s+/g, "_")}_${data.id}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
          <style>
            @page {
              size: A4 portrait;
              margin: 0 !important;
            }
            *, *::before, *::after {
              box-sizing: border-box;
            }
            html, body {
              background: #ffffff !important;
              color: #0f172a !important;
              font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            .page-break {
              page-break-before: always !important;
              break-before: page !important;
              margin-top: 0 !important;
              padding-top: 0 !important;
            }
            .pdf-sheet {
              width: 100% !important;
              max-width: 100% !important;
              box-shadow: none !important;
              border: none !important;
              padding: 0 !important;
              margin: 0 !important;
              background: #ffffff !important;
              color: #0f172a !important;
            }
            .a4-one-page {
              width: 210mm !important;
              height: 297mm !important;
              max-height: 297mm !important;
              padding: 10mm 12mm !important;
              margin: 0 auto !important;
              box-sizing: border-box !important;
              overflow: hidden !important;
              page-break-inside: avoid !important;
              page-break-after: avoid !important;
              box-shadow: none !important;
              border: none !important;
              border-radius: 0 !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: space-between !important;
            }
            .a4-two-page-sheet {
              padding: 12mm 14mm !important;
              min-height: 297mm !important;
              box-sizing: border-box !important;
              box-shadow: none !important;
              border: none !important;
              border-radius: 0 !important;
            }
          </style>
        </head>
        <body>
          <div class="pdf-sheet">
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

  const handleEmailOfferLetter = async () => {
    if (!data.studentEmail) {
      setEmailStatus("Student email not found.");
      return;
    }

    setSendingEmail(true);
    setEmailStatus(null);
    try {
      const res = await fetch("/api/internships/send-offer-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.studentEmail,
          studentName: data.studentName,
          college: data.college,
          degree: data.degree || "B.Tech Computer Science",
          domain: data.domain,
          mode: data.mode,
          duration: data.duration,
          internshipType: data.internshipType,
          offerId: data.id,
        }),
      });

      const resData = await res.json();
      if (res.ok) {
        setEmailStatus(`✓ Official Offer Letter dispatched to ${data.studentEmail}!`);
        setTimeout(() => setEmailStatus(null), 6000);
      } else {
        setEmailStatus(resData.error || "Failed to send offer letter email.");
      }
    } catch {
      setEmailStatus("Network error sending email.");
    } finally {
      setSendingEmail(false);
    }
  };

  const aicteInfo = getAicteComplianceInfo(data.duration);
  const isPaid = (data.internshipType || "").toLowerCase().includes("paid");
  const compensationText = isPaid
    ? "Performance & Milestone-Linked Stipend (Up to ₹15,000/month upon milestone evaluation)"
    : "Full Project Certification & Mentorship Grant (Fully Sponsored)";

  const linkedInShareText = `I am excited to announce that I have officially received an offer to join Haque & Sons as a ${data.domain} Intern! Looking forward to working on enterprise software architectures, learning under industry mentors, and engineering high-impact capstone systems. #Internship #SoftwareEngineering #HaqueAndSons #TechCareers`;
  const linkedInShareUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(
    linkedInShareText
  )}`;

  return (
    <div className="space-y-6 relative">
      {/* Top action toolbar */}
      {showActions && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-950/95 border border-white/15 rounded-2xl print:hidden shadow-2xl backdrop-blur-xl sticky top-2 z-40">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono text-cyan-300 font-bold block">
                  {format === "1-page"
                    ? "Official 1-Page Appointment Letter"
                    : "Official 2-Page Legal Contract"}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-mono font-bold">
                  AICTE NEP 2020 Compliant
                </span>
              </div>
              <span className="text-[10px] text-gray-400 font-mono">
                Ref: {data.id} • Signatory: Nejamul Haque (CEO &amp; Director)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Format Switcher: 1-Page vs 2-Page */}
            <div className="flex items-center bg-black/60 border border-white/15 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setFormat("1-page")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  format === "1-page"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
                title="Switch to 1-Page Executive Format (Ideal for College TPO Submissions)"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>1-Page Executive</span>
              </button>

              <button
                type="button"
                onClick={() => setFormat("2-page")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  format === "2-page"
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
                title="Switch to 2-Page Comprehensive Legal Contract"
              >
                <FileText className="w-3.5 h-3.5 text-purple-400" />
                <span>2-Page Contract</span>
              </button>
            </div>

            {/* LinkedIn Announcement */}
            <a
              href={linkedInShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-[#0077b5]/20 hover:bg-[#0077b5]/30 border border-[#0077b5]/40 text-sky-200 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
              title="Share selection news on LinkedIn"
            >
              <Share2 className="w-3.5 h-3.5 text-[#0077b5]" />
              <span className="hidden sm:inline">Share on LinkedIn</span>
            </a>

            {/* Copy Verification Link */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
              title="Copy verification link"
            >
              {copiedLink ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-cyan-400" />
              )}
              <span>{copiedLink ? "Copied!" : "Copy Link"}</span>
            </button>

            {/* Email to inbox */}
            {data.studentEmail && (
              <button
                type="button"
                onClick={handleEmailOfferLetter}
                disabled={sendingEmail}
                className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{sendingEmail ? "Sending..." : "Email PDF"}</span>
              </button>
            )}

            {/* Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span>Print</span>
            </button>

            {/* Download Button */}
            <button
              type="button"
              onClick={handleDownloadPDF}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-extrabold transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center gap-2 cursor-pointer uppercase tracking-wider"
            >
              <Download className="w-4 h-4" />
              <span>{format === "1-page" ? "Download 1-Page PDF" : "Download 2-Page PDF"}</span>
            </button>
          </div>
        </div>
      )}

      {emailStatus && (
        <div className="p-3.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-200 text-xs flex items-center gap-2 print:hidden">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{emailStatus}</span>
        </div>
      )}

      {/* Embedded Print CSS to guarantee clean A4 PDF output */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0 !important;
          }
          body {
            background: #ffffff !important;
            color: #0f172a !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          nav, header, footer, aside, .print\\:hidden, [role="navigation"] {
            display: none !important;
          }
          #offer-letter-document {
            border: none !important;
            box-shadow: none !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #0f172a !important;
          }
          .a4-one-page {
            width: 210mm !important;
            height: 297mm !important;
            max-height: 297mm !important;
            padding: 10mm 12mm !important;
            margin: 0 auto !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            page-break-inside: avoid !important;
            page-break-after: avoid !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }
          .a4-two-page-sheet {
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            padding: 12mm 14mm !important;
            min-height: 297mm !important;
            box-sizing: border-box !important;
          }
          .page-break {
            page-break-before: always !important;
            break-before: page !important;
            margin-top: 0 !important;
            padding-top: 0 !important;
          }
        }
      `}</style>

      {/* Official Corporate PDF Document Container */}
      <div
        id="offer-letter-document"
        className="w-full max-w-4xl mx-auto space-y-8 select-none font-sans"
      >
        {/* =========================================================================
            FORMAT 1: EXECUTIVE 1-PAGE A4 OFFICIAL OFFER LETTER & APPOINTMENT
        ========================================================================= */}
        {format === "1-page" && (
          <div className="a4-one-page bg-white text-slate-900 p-6 sm:p-8 md:p-10 rounded-2xl border border-slate-200 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            {/* Top Corporate Gradient Ribbon */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-slate-950 via-sky-600 to-slate-950" />

            {/* Top Section */}
            <div>
              {/* Corporate Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b-2 border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-xl bg-slate-950 text-white p-2 flex items-center justify-center shadow-md shrink-0">
                    <Image src="/logo.svg" alt="Haque & Sons" fill className="p-1 object-contain" unoptimized />
                  </div>
                  <div>
                    <h1 className="text-lg font-black text-slate-950 tracking-tight uppercase leading-tight">
                      Haque &amp; Sons
                    </h1>
                    <p className="text-[11px] font-bold text-sky-700 uppercase tracking-wider">
                      Software Studio &amp; Engineering Labs
                    </p>
                    <p className="text-[9.5px] text-slate-500 font-medium">
                      Govt. Reg. MSME ({aicteInfo.msmeUdyamId}) • ISO 9001:2015 Compliant • AICTE NEP 2020 Practicum
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right text-[10.5px] text-slate-600 space-y-0.5 border-t sm:border-t-0 pt-1.5 sm:pt-0 border-slate-100 shrink-0 font-mono">
                  <p className="font-bold text-slate-900">
                    Ref: <span className="text-sky-700">{data.id}</span>
                  </p>
                  <p className="text-slate-600">Date: {data.startDate}</p>
                  <p className="text-[9px] text-emerald-700 font-semibold uppercase">{aicteInfo.aicteCode}</p>
                </div>
              </div>

              {/* Practicum Immersion Ribbon */}
              <div className="my-2.5 p-2 bg-emerald-50/90 border border-emerald-200 rounded-lg flex items-center justify-between gap-2 text-[10px]">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span className="font-bold text-emerald-950 uppercase font-mono tracking-wide">
                    Industry Practicum Immersion • {aicteInfo.totalHours}+ Engineering Hours • Category-B R&amp;D
                  </span>
                </div>
                <span className="font-mono font-bold text-emerald-800 bg-emerald-100/90 px-1.5 py-0.5 rounded text-[9px] shrink-0">
                  ISO 9001:2015
                </span>
              </div>

              {/* Recipient Information & Subject Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 pb-1.5">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Addressed To:
                  </p>
                  <h2 className="text-sm sm:text-base font-bold text-slate-950 leading-snug">
                    {data.studentName}
                  </h2>
                  <p className="text-[11px] text-slate-700 font-medium">
                    {data.degree || "B.Tech Computer Science / Engineering"}
                  </p>
                  <p className="text-[11px] text-sky-800 font-medium">
                    {data.college || "University / Institute"}
                  </p>
                  {data.studentEmail && (
                    <p className="text-[9.5px] text-slate-400 font-mono">{data.studentEmail}</p>
                  )}
                </div>

                <div className="sm:text-right flex flex-col justify-center">
                  <div className="inline-block sm:self-end text-left p-2 bg-sky-50/90 border-l-4 border-sky-600 rounded-r-lg max-w-md">
                    <p className="text-[9px] font-bold text-sky-700 uppercase font-mono">
                      Official Appointment
                    </p>
                    <p className="text-[11px] font-bold text-sky-950 uppercase tracking-wide leading-tight">
                      Subject: Offer of Internship — {data.domain} Track
                    </p>
                  </div>
                </div>
              </div>

              {/* Formal Letter Body */}
              <div className="text-[11px] text-slate-700 leading-relaxed space-y-1 pt-1">
                <p>
                  Dear <strong>{data.studentName}</strong>,
                </p>
                <p>
                  On behalf of <strong>Haque &amp; Sons</strong>, we are pleased to extend this formal offer of appointment for the position of <strong className="text-slate-950">{data.domain} Intern</strong>. Following comprehensive review of your academic record and technical competencies, we are delighted to welcome you to our engineering labs to architect and ship production-grade software systems.
                </p>
              </div>

              {/* Terms of Engagement Matrix */}
              <div className="my-2.5 overflow-hidden rounded-xl border border-slate-200 shadow-sm text-[10.5px]">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-slate-200 bg-slate-50/80">
                      <td className="p-2 font-semibold text-slate-600 w-1/3 border-r border-slate-200">
                        Domain Track &amp; Role
                      </td>
                      <td className="p-2 font-bold text-sky-900">
                        {data.domain} Intern
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-2 font-semibold text-slate-600 border-r border-slate-200 bg-slate-50/50">
                        Engagement Modality
                      </td>
                      <td className="p-2 font-medium text-slate-900">
                        {data.mode} ({data.mode === "Offline" ? "Studio Campus Workstation" : data.mode === "Hybrid" ? "Virtual + Studio Check-ins" : "Remote Agile Sprints"})
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200 bg-slate-50/80">
                      <td className="p-2 font-semibold text-slate-600 border-r border-slate-200">
                        Duration &amp; Term
                      </td>
                      <td className="p-2 font-bold text-slate-900">
                        {data.duration} ({aicteInfo.totalHours}+ Engineering Hours • Commencing {data.startDate})
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-2 font-semibold text-slate-600 border-r border-slate-200 bg-slate-50/50">
                        Grant / Compensation
                      </td>
                      <td className="p-2 font-medium text-slate-900">
                        {compensationText}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-slate-600 border-r border-slate-200 bg-slate-50/80">
                        Reporting Technical Mentor
                      </td>
                      <td className="p-2 font-medium text-slate-900">
                        Nejamul Haque (Founder &amp; Chief Executive Officer, Haque &amp; Sons)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Core Deliverables & Academic Rights Box */}
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[10px] space-y-1">
                <h4 className="font-bold text-slate-950 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-700" />
                  <span>Deliverables, Code of Conduct &amp; Academic Submission Rights:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-600 leading-normal pt-0.5">
                  <div className="p-1.5 bg-white rounded-lg border border-slate-200/80">
                    <strong className="text-slate-900 block text-[10px]">1. Capstone Delivery</strong>
                    <span>Architect &amp; deploy production system satisfying {aicteInfo.totalHours}+ engineering hours.</span>
                  </div>
                  <div className="p-1.5 bg-white rounded-lg border border-slate-200/80">
                    <strong className="text-slate-900 block text-[10px]">2. Agile Sprints</strong>
                    <span>Weekly standups, Git commit verification, and peer code reviews adhering to enterprise protocols.</span>
                  </div>
                  <div className="p-1.5 bg-white rounded-lg border border-slate-200/80">
                    <strong className="text-slate-900 block text-[10px]">3. College Submission Rights</strong>
                    <span>Full unencumbered rights to submit capstone thesis &amp; activity diary to university TPO for academic credits.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Authentications, Dual Signatures & Dynamic QR Verification */}
            <div className="pt-2.5 border-t-2 border-slate-200 mt-2">
              <div className="grid grid-cols-4 gap-2.5 items-end">
                {/* Col 1: Authorized Corporate Signatory */}
                <div className="space-y-0.5">
                  <span className="text-[9px] text-slate-400 block uppercase font-mono font-bold">
                    Authorized Signatory:
                  </span>
                  <div className="h-9 flex items-center justify-start">
                    <img
                      src="/signature.png"
                      alt="Signature of Nejamul Haque"
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                  <div className="h-0.5 w-28 bg-slate-400 mb-0.5" />
                  <span className="text-[10.5px] font-bold text-slate-950 block leading-tight">
                    Nejamul Haque
                  </span>
                  <span className="text-[9px] text-slate-600 block font-medium">
                    Founder &amp; Chief Executive Officer
                  </span>
                  <span className="text-[8px] text-slate-400 block font-mono">
                    Haque &amp; Sons Software Studio
                  </span>
                </div>

                {/* Col 2: Official Corporate Seal */}
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-sky-800/70 p-1 flex flex-col items-center justify-center text-center bg-sky-50 shadow-inner">
                    <Award className="w-3.5 h-3.5 text-sky-700 mb-0.5" />
                    <span className="text-[6.5px] uppercase font-extrabold text-sky-950 tracking-tighter leading-tight">
                      HAQUE &amp; SONS
                    </span>
                    <span className="text-[5.5px] uppercase font-bold text-sky-700 tracking-wider">
                      OFFICIAL SEAL
                    </span>
                    <span className="text-[5px] text-slate-500 font-mono">
                      VERIFIED 2026
                    </span>
                  </div>
                  <span className="text-[7.5px] text-slate-400 mt-0.5 font-mono">
                    Digitally Authenticated
                  </span>
                </div>

                {/* Col 3: Dynamic Live QR Code Verification */}
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-15 h-15 p-1 border border-slate-300 rounded-lg bg-white shadow-sm flex items-center justify-center">
                    <img
                      src={qrCodeUrl}
                      alt={`QR Verification for ${data.id}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-[7.5px] font-mono text-slate-500 mt-0.5 block leading-tight">
                    Scan to Verify<br />Public Ledger
                  </span>
                </div>

                {/* Col 4: Candidate Acceptance */}
                <div className="space-y-0.5 text-right">
                  <span className="text-[9px] text-slate-400 block uppercase font-mono font-bold">
                    Candidate Acceptance:
                  </span>
                  <div className="h-9 flex flex-col justify-end items-end pb-0.5">
                    {isAccepted ? (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 text-[8.5px] font-mono font-bold inline-flex items-center gap-1">
                        <Check className="w-2.5 h-2.5 text-emerald-700" />
                        <span>Digitally Accepted</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-800 italic">
                        {data.studentName}
                      </span>
                    )}
                    <div className="h-0.5 w-28 bg-slate-300 mt-1" />
                  </div>
                  <span className="text-[10.5px] font-bold text-slate-950 block leading-tight">
                    {data.studentName}
                  </span>
                  <span className="text-[8.5px] text-slate-500 block font-mono">
                    {isAccepted ? `Accepted on ${data.startDate}` : "Signature & Date"}
                  </span>
                </div>
              </div>

              {/* Corporate Legal Footer */}
              <div className="mt-2 pt-1.5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[8.5px] text-slate-400 font-mono gap-1">
                <span>Official Appointment • Strictly Confidential</span>
                <span>Verify: haquestudio.me/verify</span>
                <span>Haque &amp; Sons © 2026</span>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            FORMAT 2: COMPREHENSIVE 2-PAGE CORPORATE CONTRACT
        ========================================================================= */}
        {format === "2-page" && (
          <div className="space-y-8">
            {/* Page 1 of 2 */}
            <div className="a4-two-page-sheet bg-white text-slate-900 p-4 sm:p-8 md:p-12 rounded-2xl border border-slate-200 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-slate-950 via-sky-600 to-slate-950" />

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b-2 border-slate-100 mt-1">
                <div className="flex items-start gap-3.5">
                  <div className="relative w-12 h-12 rounded-xl bg-slate-950 text-white p-2 flex items-center justify-center shadow-md shrink-0">
                    <Image src="/logo.svg" alt="Haque & Sons" fill className="p-1 object-contain" unoptimized />
                  </div>
                  <div>
                    <h1 className="text-xl font-extrabold text-slate-950 tracking-tight uppercase">
                      Haque &amp; Sons
                    </h1>
                    <p className="text-xs font-bold text-sky-700 uppercase tracking-wide">
                      Software Studio &amp; Engineering Infrastructure
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium">
                      Govt. Registered MSME ({aicteInfo.msmeUdyamId}) • ISO 9001:2015 Compliant • AICTE NEP 2020 Practicum
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right text-[11px] text-slate-600 space-y-0.5 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                  <p className="font-mono font-bold text-slate-900">Ref: {data.id}</p>
                  <p className="text-slate-600">Date: {data.startDate}</p>
                  <p className="text-[10px] text-slate-400">MSME: {aicteInfo.msmeUdyamId}</p>
                  <p className="text-[10px] text-sky-700 font-medium font-mono">{aicteInfo.aicteCode}</p>
                </div>
              </div>

              <div className="my-3 p-2.5 bg-emerald-50/90 border border-emerald-200 rounded-xl flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="text-[11px] font-bold text-emerald-950 uppercase font-mono tracking-wide">
                    Industry Practicum Immersion • {aicteInfo.totalHours}+ Engineering Hours • Category-B R&amp;D
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded shrink-0">
                  ISO 9001:2015
                </span>
              </div>

              <div className="pt-6 pb-3">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-1">
                  To,
                </p>
                <h2 className="text-base sm:text-lg font-bold text-slate-950">
                  {data.studentName}
                </h2>
                <p className="text-xs text-slate-700 font-medium">
                  {data.degree || "B.Tech Computer Science / Engineering"}
                </p>
                <p className="text-xs text-sky-800 font-medium">
                  {data.college || "University / Institute"}
                </p>
                {data.studentEmail && (
                  <p className="text-[11px] text-slate-500 font-mono">{data.studentEmail}</p>
                )}
              </div>

              <div className="my-3 p-3 bg-sky-50/80 border-l-4 border-sky-600 rounded-r-lg">
                <h3 className="text-xs sm:text-sm font-bold text-sky-950 uppercase tracking-wide">
                  Subject: Official Offer of Internship &amp; Appointment — {data.domain} Track
                </h3>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans pt-1">
                <p>
                  Dear <strong>{data.studentName}</strong>,
                </p>
                <p>
                  On behalf of <strong>Haque &amp; Sons</strong>, we are pleased to extend this formal offer of internship for the position of <strong className="text-slate-950">{data.domain} Intern</strong> with our core engineering group. We were highly impressed by your academic credentials, problem-solving mindset, and dedication to software engineering.
                </p>
                <p>
                  During this internship program, you will collaborate with our engineering team to architect, develop, test, and ship production software systems while adhering to enterprise standards.
                </p>

                <div className="my-3 overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <tbody>
                      <tr className="border-b border-slate-200 bg-slate-50">
                        <td className="p-2.5 font-semibold text-slate-600 w-1/3 border-r border-slate-200">
                          Domain Track
                        </td>
                        <td className="p-2.5 font-bold text-sky-900">
                          {data.domain}
                        </td>
                      </tr>
                      <tr className="border-b border-slate-200">
                        <td className="p-2.5 font-semibold text-slate-600 border-r border-slate-200 bg-slate-50">
                          Engagement Modality
                        </td>
                        <td className="p-2.5 font-medium text-slate-900">
                          {data.mode} ({data.mode === "Offline" ? "Studio Campus Workstation" : data.mode === "Hybrid" ? "Virtual + Studio Check-ins" : "Remote Agile Sprints"})
                        </td>
                      </tr>
                      <tr className="border-b border-slate-200 bg-slate-50">
                        <td className="p-2.5 font-semibold text-slate-600 border-r border-slate-200">
                          Duration &amp; Term
                        </td>
                        <td className="p-2.5 font-bold text-slate-900">
                          {data.duration} ({aicteInfo.totalHours}+ Engineering Hours • Commencing {data.startDate})
                        </td>
                      </tr>
                      <tr className="border-b border-slate-200">
                        <td className="p-2.5 font-semibold text-slate-600 border-r border-slate-200 bg-slate-50">
                          Practicum Immersion
                        </td>
                        <td className="p-2.5 font-bold text-emerald-800">
                          {aicteInfo.totalHours}+ Engineering Clock Hours • Production Capstone R&amp;D
                        </td>
                      </tr>
                      <tr className="border-b border-slate-200 bg-slate-50">
                        <td className="p-2.5 font-semibold text-slate-600 border-r border-slate-200">
                          Stipend / Grant Structure
                        </td>
                        <td className="p-2.5 font-medium text-slate-900">
                          {compensationText}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold text-slate-600 border-r border-slate-200 bg-slate-50">
                          Reporting Technical Mentor
                        </td>
                        <td className="p-2.5 font-medium text-slate-900">
                          Nejamul Haque (Founder &amp; Lead Architect, Haque &amp; Sons)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                  <h4 className="font-bold text-slate-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-sky-700" />
                    <span>Scope of Work &amp; Learning Objectives (AICTE NEP 2020 Compliant):</span>
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600 leading-normal text-[11px]">
                    <li>
                      <strong>Sprint Milestones:</strong> Participate in weekly architecture sprints, database modeling, and code check-ins ({aicteInfo.totalHours} hours total practicum effort).
                    </li>
                    <li>
                      <strong>Capstone Implementation:</strong> Design, build, and deploy an end-to-end production capstone application satisfying {aicteInfo.subCategory}.
                    </li>
                    <li>
                      <strong>Production Deployment &amp; Logbook:</strong> Maintain AICTE Activity Diary, host live projects on edge infrastructure, and submit verified GitHub repositories.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>Page 1 of 2 • AICTE Category-B Industry Practicum</span>
                <span>Haque &amp; Sons Software Studio</span>
                <span>Ref: {data.id}</span>
              </div>
            </div>

            {/* Page 2 of 2 */}
            <div className="page-break a4-two-page-sheet bg-white text-slate-900 p-4 sm:p-8 md:p-12 rounded-2xl border border-slate-200 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-slate-950 via-sky-600 to-slate-950" />

              <div className="flex items-center justify-between pb-4 border-b-2 border-slate-100 text-xs font-mono text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 uppercase">Haque &amp; Sons</span>
                  <span>•</span>
                  <span>Ref: {data.id}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold">{aicteInfo.aicteCode}</span>
                </div>
                <span>Page 2 of 2 • Terms &amp; Signatures</span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans pt-4">
                <div className="space-y-1.5">
                  <h4 className="font-bold text-slate-950 uppercase tracking-wider text-xs text-sky-900">
                    1. Intellectual Property &amp; Academic Institutional Submission Rights
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    You agree that proprietary algorithms and studio architectures belonging to Haque &amp; Sons remain the exclusive property of the organization. The candidate is granted full unencumbered rights to publish, present, and submit their capstone repository, weekly AICTE activity diary, and engineering thesis to their college, university examination board, and Training &amp; Placement Officer (TPO) for academic credit transfer.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-bold text-slate-950 uppercase tracking-wider text-xs text-sky-900">
                    2. Evaluation, Capstone Delivery &amp; Recommendation
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Upon timely delivery of the assigned capstone, repository submission, and completion of the mandatory feedback evaluation form, you will be awarded an official cryptographic <strong>Certificate of Completion</strong> verified on our public ledger (<code className="text-sky-700 font-mono">haquestudio.me/verify</code>). High performers will receive an executive <strong>Letter of Recommendation (LOR)</strong> signed by Nejamul Haque.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-bold text-slate-950 uppercase tracking-wider text-xs text-sky-900">
                    3. Code of Conduct &amp; Academic Integrity
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Interns are expected to maintain the highest standards of professional integrity, deliver original work, communicate proactively during sprint check-ins, and adhere to zero-plagiarism principles under the National Credit Framework.
                  </p>
                </div>

                <div className="p-3.5 bg-sky-50/60 rounded-xl border border-sky-100 text-xs text-slate-800 space-y-1">
                  <strong className="block text-sky-950">Formal Acceptance of Appointment:</strong>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    By accepting this offer letter, you acknowledge and agree to the guidelines, responsibilities, and terms of engagement outlined in this document.
                  </p>
                </div>
              </div>

              {/* Signatures & Seal Grid */}
              <div className="pt-8 mt-6 border-t-2 border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono font-bold">
                    For Haque &amp; Sons:
                  </span>
                  <div className="h-16 flex items-center justify-start py-1">
                    <img
                      src="/signature.png"
                      alt="Signature of Nejamul Haque"
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                  <div className="h-0.5 w-36 bg-slate-300 mb-1" />
                  <span className="text-xs font-bold text-slate-950 block">Nejamul Haque</span>
                  <span className="text-[11px] text-slate-600 block font-medium">
                    Founder &amp; Chief Executive Officer
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    Haque &amp; Sons Software Studio Pvt. Ltd.
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 rounded-full border-2 border-sky-800/60 p-1 flex flex-col items-center justify-center text-center bg-sky-50 shadow-inner">
                    <Award className="w-5 h-5 text-sky-700 mb-0.5" />
                    <span className="text-[7px] uppercase font-extrabold text-sky-950 tracking-tighter leading-tight">
                      HAQUE &amp; SONS
                    </span>
                    <span className="text-[6px] uppercase font-bold text-sky-700 tracking-wider">
                      OFFICIAL SEAL
                    </span>
                    <span className="text-[6px] text-slate-500 font-mono">
                      VERIFIED 2026
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 font-mono">
                    Digitally Authenticated
                  </span>
                </div>

                <div className="space-y-1 sm:text-right">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono font-bold">
                    Candidate Acceptance:
                  </span>
                  <div className="h-16 flex flex-col justify-end sm:items-end py-1">
                    <span className="text-xs font-semibold text-slate-800 italic">
                      {data.studentName}
                    </span>
                    <div className="h-0.5 w-36 bg-slate-300 mt-1" />
                  </div>
                  <span className="text-xs font-bold text-slate-950 block">
                    {data.studentName}
                  </span>
                  <span className="text-[10px] text-slate-500 block font-mono">
                    Candidate Signature &amp; Date
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400 font-mono gap-2">
                <span>Page 2 of 2 • Strictly Confidential</span>
                <span>Verify at: haquestudio.me/verify</span>
                <span>Haque &amp; Sons © 2026</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Pill Bar - Always Visible On Screen */}
      {showActions && (
        <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-950/95 border-2 border-cyan-500/50 rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 shadow-[0_0_35px_rgba(6,182,212,0.4)] flex items-center gap-2 sm:gap-3 backdrop-blur-xl print:hidden max-w-[calc(100vw-24px)]">
          <button
            type="button"
            onClick={handleDownloadPDF}
            className="px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black text-[11px] sm:text-xs font-extrabold transition-all shadow-md flex items-center gap-1.5 cursor-pointer uppercase tracking-wider whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>{format === "1-page" ? "Download 1-Page PDF" : "Download 2-Page PDF"}</span>
          </button>

          {data.studentEmail && (
            <button
              type="button"
              onClick={handleEmailOfferLetter}
              disabled={sendingEmail}
              className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-200 text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 whitespace-nowrap"
            >
              <Mail className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Email PDF</span>
            </button>
          )}

          <a
            href={linkedInShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-[#0077b5]/30 hover:bg-[#0077b5]/50 border border-[#0077b5]/50 text-sky-200 text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            title="Announce on LinkedIn"
          >
            <Share2 className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
            <span className="hidden md:inline">LinkedIn</span>
          </a>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all cursor-pointer shrink-0"
              title="Close Offer Letter Preview"
            >
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
