"use client";

import { useRef, useState } from "react";
import { Download, Award, Mail, Sparkles, ShieldCheck, Printer, CheckCircle2, X, FileText, Check } from "lucide-react";
import Image from "next/image";

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
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);

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
          <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
          <style>
            @page {
              size: A4 portrait;
              margin: 10mm 12mm 10mm 12mm;
            }
            body {
              background: #ffffff !important;
              color: #0f172a !important;
              font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              margin: 0;
              padding: 0;
            }
            .page-break {
              page-break-before: always !important;
              break-before: page !important;
              margin-top: 18px !important;
              padding-top: 12px !important;
            }
            .pdf-sheet {
              width: 100% !important;
              max-width: 100% !important;
              box-shadow: none !important;
              border: none !important;
              padding: 0 !important;
              background: #ffffff !important;
              color: #0f172a !important;
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

  const isPaid = (data.internshipType || "").toLowerCase().includes("paid");
  const compensationText = isPaid
    ? "Performance & Milestone-Linked Stipend (Up to ₹15,000/month upon milestone evaluation)"
    : "Full Project Certification & Mentorship Grant (Fully Sponsored)";

  return (
    <div className="space-y-6 relative">
      {/* Top action toolbar */}
      {showActions && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-950/95 border border-white/15 rounded-2xl print:hidden shadow-2xl backdrop-blur-xl sticky top-2 z-40">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <div>
              <span className="text-xs font-mono text-cyan-300 font-bold block">
                Official 2-Page Internship Appointment Letter
              </span>
              <span className="text-[10px] text-gray-400 font-mono">
                Ref: {data.id} • Verified Issue • Signatory: Nejamul Haque
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {data.studentEmail && (
              <button
                type="button"
                onClick={handleEmailOfferLetter}
                disabled={sendingEmail}
                className="px-3.5 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{sendingEmail ? "Dispatching..." : "Email to Inbox"}</span>
              </button>
            )}

            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPDF}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-extrabold transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center gap-2 cursor-pointer uppercase tracking-wider"
            >
              <Download className="w-4 h-4" />
              <span>Download 2-Page PDF</span>
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
            margin: 10mm 12mm 10mm 12mm;
          }
          body {
            background: #ffffff !important;
            color: #0f172a !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          nav, header, footer, .print\\:hidden, [role="navigation"] {
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
          .page-break {
            page-break-before: always !important;
            break-before: page !important;
          }
        }
      `}</style>

      {/* Official 2-PAGE Corporate PDF Document Container */}
      <div
        id="offer-letter-document"
        className="w-full max-w-4xl mx-auto space-y-8 select-none font-sans"
      >
        {/* =========================================================================
            PAGE 1 OF 2: APPOINTMENT OFFER & TERMS OF ENGAGEMENT
        ========================================================================= */}
        <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-2xl relative overflow-hidden">
          {/* Top Corporate Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-slate-950 via-sky-600 to-slate-950" />

          {/* Corporate Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b-2 border-slate-100 mt-1">
            <div className="flex items-start gap-3.5">
              <div className="relative w-12 h-12 rounded-xl bg-slate-950 text-white p-2 flex items-center justify-center shadow-md shrink-0">
                <Image src="/logo.svg" alt="Haque & Sons" fill className="p-1 object-contain" unoptimized />
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-slate-950 tracking-tight uppercase">
                  Haque & Sons
                </h1>
                <p className="text-xs font-bold text-sky-700 uppercase tracking-wide">
                  Software Studio & Engineering Infrastructure
                </p>
                <p className="text-[10px] text-slate-500 font-medium">
                  Govt. Registered MSME • ISO 9001:2015 Compliant Software Labs
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right text-[11px] text-slate-600 space-y-0.5 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
              <p className="font-mono font-bold text-slate-900">Ref: {data.id}</p>
              <p className="text-slate-600">Date: {data.startDate}</p>
              <p className="text-[10px] text-slate-400">CIN: UDYAM-DL-03-0089421</p>
              <p className="text-[10px] text-sky-700 font-medium">haqueandsons.vercel.app</p>
            </div>
          </div>

          {/* Recipient Information */}
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

          {/* Subject Line */}
          <div className="my-3 p-3 bg-sky-50/80 border-l-4 border-sky-600 rounded-r-lg">
            <h3 className="text-xs sm:text-sm font-bold text-sky-950 uppercase tracking-wide">
              Subject: Official Offer of Internship & Appointment — {data.domain} Track
            </h3>
          </div>

          {/* Letter Body */}
          <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans pt-1">
            <p>
              Dear <strong>{data.studentName}</strong>,
            </p>

            <p>
              On behalf of <strong>Haque & Sons</strong>, we are pleased to extend this formal offer of internship for the position of <strong className="text-slate-950">{data.domain} Intern</strong> with our core engineering group. We were highly impressed by your academic credentials, problem-solving mindset, and dedication to software engineering.
            </p>

            <p>
              During this internship program, you will collaborate with our engineering team to architect, develop, test, and ship production software systems while adhering to enterprise standards.
            </p>

            {/* Section 1: Formal Terms Matrix Table */}
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
                      Duration & Term
                    </td>
                    <td className="p-2.5 font-bold text-slate-900">
                      {data.duration} (Commencing {data.startDate})
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-2.5 font-semibold text-slate-600 border-r border-slate-200 bg-slate-50">
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
                      Nejamul Haque (Founder & Lead Architect, Haque & Sons)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Section 2: Core Engineering Scope & Deliverables */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
              <h4 className="font-bold text-slate-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sky-700" />
                <span>Scope of Work & Learning Objectives:</span>
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 leading-normal text-[11px]">
                <li>
                  <strong>Sprint Milestones:</strong> Participate in weekly architecture sprints, database modeling, and code check-ins.
                </li>
                <li>
                  <strong>Capstone Implementation:</strong> Design, build, and deploy an end-to-end production capstone application using modern tools.
                </li>
                <li>
                  <strong>Production Deployment:</strong> Host live projects on edge infrastructure (Vercel / Render / Cloud) and submit GitHub repositories.
                </li>
              </ul>
            </div>
          </div>

          {/* Page 1 Footer */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>Page 1 of 2 • Official Appointment Letter</span>
            <span>Haque & Sons Software Studio</span>
            <span>Ref: {data.id}</span>
          </div>
        </div>

        {/* =========================================================================
            PAGE 2 OF 2: INTELLECTUAL PROPERTY, CODE OF CONDUCT & FORMAL SIGNATURES
        ========================================================================= */}
        <div className="page-break bg-white text-slate-900 p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-2xl relative overflow-hidden">
          {/* Top Corporate Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-slate-950 via-sky-600 to-slate-950" />

          {/* Page 2 Continuation Header */}
          <div className="flex items-center justify-between pb-4 border-b-2 border-slate-100 text-xs font-mono text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 uppercase">Haque & Sons</span>
              <span>•</span>
              <span>Ref: {data.id}</span>
            </div>
            <span>Page 2 of 2 • Terms & Signatures</span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans pt-4">
            {/* Section 4: Confidentiality & Intellectual Property */}
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-950 uppercase tracking-wider text-xs text-sky-900">
                1. Intellectual Property & Confidentiality
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                You agree that proprietary algorithms, studio architectures, internal systems, and confidential datasets belonging to Haque & Sons remain the exclusive property of the organization. The candidate retains full portfolio and showcase rights to the open-source code and public capstone projects authored during the internship.
              </p>
            </div>

            {/* Section 5: Evaluation & Certification Protocol */}
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-950 uppercase tracking-wider text-xs text-sky-900">
                2. Evaluation, Verified Certificate & Letter of Recommendation
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Upon timely delivery of the assigned capstone, repository submission, and completion of the mandatory feedback evaluation form, you will be awarded an official cryptographic <strong>Certificate of Completion</strong> verified on our public ledger (<code className="text-sky-700 font-mono">haqueandsons.vercel.app/verify</code>). High performers will receive an executive <strong>Letter of Recommendation (LOR)</strong> signed by Nejamul Haque.
              </p>
            </div>

            {/* Section 6: Code of Conduct & Integrity */}
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-950 uppercase tracking-wider text-xs text-sky-900">
                3. Code of Conduct & Academic Integrity
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Interns are expected to maintain the highest standards of professional integrity, deliver original work, communicate proactively during sprint check-ins, and adhere to zero-plagiarism principles.
              </p>
            </div>

            {/* Section 7: Formal Acceptance */}
            <div className="p-3.5 bg-sky-50/60 rounded-xl border border-sky-100 text-xs text-slate-800 space-y-1">
              <strong className="block text-sky-950">Formal Acceptance of Appointment:</strong>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                By accepting this offer letter, you acknowledge and agree to the guidelines, responsibilities, and terms of engagement outlined in this document.
              </p>
            </div>
          </div>

          {/* DUAL SIGNATURE & CORPORATE SEAL SECTION */}
          <div className="pt-8 mt-6 border-t-2 border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
            {/* Company Signatory with Real Uploaded Signature */}
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 block uppercase font-mono font-bold">
                For Haque & Sons:
              </span>
              
              {/* Clean, Straight Real Handwritten Signature */}
              <div className="h-16 flex items-center justify-start py-1">
                <div className="relative w-36 h-14">
                  <Image
                    src="/signature.png"
                    alt="Signature of Nejamul Haque"
                    fill
                    className="object-contain object-left"
                    unoptimized
                  />
                </div>
              </div>

              <div className="h-0.5 w-36 bg-slate-300 mb-1" />
              <span className="text-xs font-bold text-slate-950 block">Nejamul Haque</span>
              <span className="text-[11px] text-slate-600 block font-medium">
                Founder & Chief Executive Officer
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">
                Haque & Sons Software Studio Pvt. Ltd.
              </span>
            </div>

            {/* Official Holographic Corporate Seal */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-full border-2 border-sky-800/60 p-1 flex flex-col items-center justify-center text-center bg-sky-50 shadow-inner">
                <Award className="w-5 h-5 text-sky-700 mb-0.5" />
                <span className="text-[7px] uppercase font-extrabold text-sky-950 tracking-tighter leading-tight">
                  HAQUE & SONS
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

            {/* Candidate Acceptance Box */}
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
                Candidate Signature & Date
              </span>
            </div>
          </div>

          {/* Page 2 Corporate Legal Footer */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400 font-mono gap-2">
            <span>Page 2 of 2 • Strictly Confidential</span>
            <span>Verify at: haqueandsons.vercel.app/verify</span>
            <span>Haque & Sons © 2026</span>
          </div>
        </div>
      </div>

      {/* Floating Action Pill Bar - Always Visible On Screen */}
      {showActions && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-950/95 border-2 border-cyan-500/50 rounded-full px-5 py-2.5 shadow-[0_0_35px_rgba(6,182,212,0.4)] flex items-center gap-3 backdrop-blur-xl print:hidden">
          <button
            type="button"
            onClick={handleDownloadPDF}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black text-xs font-extrabold transition-all shadow-md flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
          >
            <Download className="w-4 h-4" />
            <span>Download 2-Page PDF</span>
          </button>

          {data.studentEmail && (
            <button
              type="button"
              onClick={handleEmailOfferLetter}
              disabled={sendingEmail}
              className="px-3.5 py-2 rounded-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-200 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Email to Me</span>
            </button>
          )}

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all cursor-pointer"
              title="Close Offer Letter Preview"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}


