"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Download, Printer, ShieldCheck, CheckCircle2, Award, Sparkles, Building, Mail, Globe, Star } from "lucide-react";

export interface LORData {
  id?: string;
  studentName: string;
  studentEmail: string;
  college: string;
  degree?: string;
  domain: string;
  duration: string;
  mode?: string;
  grade?: string;
  issueDate: string | Date;
  signatoryTitle?: string;
}

interface LetterOfRecommendationRendererProps {
  lorData: LORData;
  showActions?: boolean;
}

export function LetterOfRecommendationRenderer({
  lorData,
  showActions = true,
}: LetterOfRecommendationRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const formattedDate = new Date(lorData.issueDate || Date.now()).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const refNumber = `HS-LOR-${(lorData.id || "2026-REC").replace(/^HS-INT-/, "").replace(/[^a-zA-Z0-9]/g, "").slice(0, 10).toUpperCase()}`;

  const handlePrint = () => {
    const printContent = containerRef.current;
    if (!printContent) return;

    setDownloading(true);

    const printIframe = document.createElement("iframe");
    printIframe.style.position = "fixed";
    printIframe.style.top = "0";
    printIframe.style.left = "0";
    printIframe.style.width = "1px";
    printIframe.style.height = "1px";
    printIframe.style.border = "none";
    printIframe.style.opacity = "0";
    printIframe.style.pointerEvents = "none";

    document.body.appendChild(printIframe);

    const doc = printIframe.contentDocument || printIframe.contentWindow?.document;
    if (!doc) {
      setDownloading(false);
      return;
    }

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Letter of Recommendation - ${lorData.studentName}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
            
            @page {
              size: A4 portrait;
              margin: 8mm;
            }

            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            body {
              font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
              background-color: #ffffff;
              color: #0f172a;
            }

            .page-container {
              width: 100%;
              max-width: 194mm;
              margin: 0 auto;
              background: #ffffff;
            }
          </style>
        </head>
        <body>
          <div class="page-container">
            ${printContent.innerHTML}
          </div>
        </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      printIframe.contentWindow?.focus();
      printIframe.contentWindow?.print();
      setTimeout(() => {
        document.body.removeChild(printIframe);
        setDownloading(false);
      }, 1000);
    }, 400);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto">
      {/* Floating Action Controls */}
      {showActions && (
        <div className="flex flex-wrap items-center justify-between gap-4 w-full bg-slate-900/90 border border-white/10 p-4 rounded-2xl backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 flex items-center justify-center shadow-lg">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                <span>Executive Letter of Recommendation</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-mono">
                  Official Endorsement
                </span>
              </h3>
              <p className="text-xs text-gray-400">
                Official institutional recommendation for higher education, master&apos;s admissions &amp; high-growth engineering roles.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              disabled={downloading}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? "Generating PDF..." : "Download Official LOR (PDF)"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
              title="Print Document"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* LOR Document Container */}
      <div className="w-full overflow-x-auto pb-4 flex justify-center">
        <div
          ref={containerRef}
          style={{ width: "210mm", minHeight: "297mm", padding: "12mm 14mm" }}
          className="bg-white text-slate-900 shadow-2xl rounded-sm relative border border-slate-200 flex flex-col justify-between font-sans shrink-0"
        >
          {/* Top Decorative Border */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-600 via-blue-700 to-amber-600" />

          {/* Document Content */}
          <div className="space-y-6">
            {/* Header / Letterhead */}
            <div className="flex items-start justify-between border-b-2 border-slate-800 pb-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 relative rounded-xl bg-slate-950 p-1.5 flex items-center justify-center shadow-md">
                  <Image
                    src="/logo.svg"
                    alt="Haque & Sons Logo"
                    fill
                    className="object-contain p-1"
                    unoptimized
                  />
                </div>
                <div>
                  <h1 className="text-xl font-extrabold tracking-tight text-slate-950 font-serif">
                    HAQUE &amp; SONS
                  </h1>
                  <p className="text-[10px] uppercase font-mono tracking-widest text-cyan-800 font-bold">
                    Next-Gen Software Studio &amp; Engineering Research OS
                  </p>
                  <p className="text-[9px] text-slate-600">
                    MSME UDYAM Registration: <strong className="text-slate-800">UDYAM-UP-55-0012984</strong>
                  </p>
                </div>
              </div>

              <div className="text-right text-[10px] text-slate-600 space-y-0.5">
                <p><strong className="text-slate-800">Ref:</strong> {refNumber}</p>
                <p><strong className="text-slate-800">Date:</strong> {formattedDate}</p>
                <p><strong className="text-slate-800">Web:</strong> haqueandsons.vercel.app</p>
                <p><strong className="text-slate-800">Email:</strong> haquendsons@gmail.com</p>
              </div>
            </div>

            {/* Formal Salutation */}
            <div className="pt-2">
              <div className="inline-block px-3 py-1 rounded bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-800 mb-3 uppercase tracking-wider font-mono">
                Official Letter of Academic &amp; Professional Recommendation
              </div>
              <p className="text-xs text-slate-700">
                <strong>TO WHOM IT MAY CONCERN / ADMISSIONS &amp; HIRING COMMITTEES,</strong>
              </p>
            </div>

            {/* Main Recommendation Body */}
            <div className="text-[12px] leading-relaxed text-slate-800 space-y-3.5 text-justify">
              <p>
                It is with exceptional enthusiasm that I provide this formal Letter of Recommendation for{" "}
                <strong className="text-slate-950 underline decoration-cyan-500 underline-offset-2">{lorData.studentName}</strong>,
                a dedicated scholar from <strong className="text-slate-950">{lorData.college}</strong>, who has completed an intensive{" "}
                <strong>{lorData.duration}</strong> technical engagement as an Engineering Intern in our{" "}
                <strong className="text-cyan-800 font-bold">{lorData.domain}</strong> track at Haque &amp; Sons.
              </p>

              <p>
                During their tenure at our software engineering studio, {lorData.studentName} demonstrated profound technical aptitude, algorithmic rigor, and an exemplary architectural discipline. They actively engineered and delivered high-velocity capstone deliverables following modern industry standards (including Next.js 16, TypeScript, automated CI/CD pipelines, and PostgreSQL database architectures).
              </p>

              <p>
                Beyond technical execution, {lorData.studentName} exhibited exceptional problem-solving initiative, clean git hygiene, and clear engineering documentation. Their ability to decompose complex real-world requirements into modular, scalable, and resilient software components places them firmly among the top echelon of candidate engineers I have mentored.
              </p>
            </div>

            {/* 5-Pillar Competency & Appraisal Scorecard */}
            <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/80 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                <span className="text-[11px] font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-700" />
                  <span>5-Pillar Competency Appraisal Matrix</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-mono">
                  Overall Rating: {lorData.grade || "Distinction (9.8 / 10)"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">1. System Architecture &amp; Scalability:</span>
                  <span className="font-bold text-slate-950 font-mono">9.8 / 10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">2. Code Cleanliness &amp; TypeScript Discipline:</span>
                  <span className="font-bold text-slate-950 font-mono">9.7 / 10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">3. Algorithmic Problem Solving &amp; Debugging:</span>
                  <span className="font-bold text-slate-950 font-mono">9.6 / 10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">4. Git CI/CD &amp; Production Deployment:</span>
                  <span className="font-bold text-slate-950 font-mono">9.9 / 10</span>
                </div>
                <div className="col-span-2 flex items-center justify-between pt-1 border-t border-slate-200/60">
                  <span className="text-slate-700">5. Technical Communication &amp; Product Ownership:</span>
                  <span className="font-bold text-slate-950 font-mono">9.8 / 10</span>
                </div>
              </div>
            </div>

            {/* Closing Endorsement */}
            <p className="text-[12px] leading-relaxed text-slate-800 text-justify">
              I give {lorData.studentName} my highest and unreserved recommendation for any software engineering position, research fellowship, or postgraduate degree program in Computer Science. Should you require further technical context or verification, please do not hesitate to contact our executive office directly.
            </p>
          </div>

          {/* Signature & Corporate Execution Footer */}
          <div className="pt-6 border-t-2 border-slate-800 flex items-end justify-between">
            {/* Signatory Authority */}
            <div className="space-y-1">
              <p className="text-[11px] text-slate-600 font-semibold">Sincerely &amp; Respectfully Submitted,</p>
              <div className="relative w-44 h-16 my-1">
                <Image
                  src="/signature.png"
                  alt="Nejamul Haque Authorized Signature"
                  fill
                  className="object-contain object-left"
                  unoptimized
                />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-950">Nejamul Haque</p>
                <p className="text-[10px] text-cyan-800 font-bold uppercase tracking-wider">
                  Founder &amp; Lead Systems Architect
                </p>
                <p className="text-[9px] text-slate-500">
                  Haque &amp; Sons Next-Gen Software Studio
                </p>
              </div>
            </div>

            {/* Official Holographic Seal Stamp */}
            <div className="text-center space-y-1">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-cyan-800/80 bg-cyan-50/50 p-1 flex flex-col items-center justify-center text-center shadow-sm">
                <ShieldCheck className="w-5 h-5 text-cyan-800" />
                <span className="text-[7px] font-black text-slate-900 tracking-tighter uppercase block leading-tight mt-0.5">
                  HAQUE &amp; SONS
                </span>
                <span className="text-[6px] font-mono text-cyan-900 uppercase tracking-widest block font-bold">
                  VERIFIED SEAL
                </span>
              </div>
              <p className="text-[8px] font-mono text-slate-500">Cryptographically Sealed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
