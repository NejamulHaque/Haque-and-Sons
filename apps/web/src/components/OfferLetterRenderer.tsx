"use client";

import { useRef } from "react";
import { Download, Printer, Award, FileText, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export interface OfferLetterData {
  id: string;
  studentName: string;
  college: string;
  domain: string;
  mode: string;
  duration: string;
  internshipType: string;
  startDate: string;
}

export function OfferLetterRenderer({
  data,
  showActions = true,
}: {
  data: OfferLetterData;
  showActions?: boolean;
}) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {showActions && (
        <div className="flex items-center justify-between p-3 bg-gray-950/80 border border-white/10 rounded-2xl print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono text-cyan-300 font-semibold">
              Official Internship Offer Letter
            </span>
          </div>
          <button
            onClick={handlePrint}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF / Print</span>
          </button>
        </div>
      )}

      {/* Official A4 Letterhead Container */}
      <div
        ref={printRef}
        className="w-full max-w-3xl mx-auto bg-[#0a0f1d] text-white p-8 sm:p-12 rounded-3xl border border-cyan-500/30 shadow-2xl relative overflow-hidden select-none print:m-0 print:p-8 print:border-none print:shadow-none print:w-full"
      >
        {/* Top Letterhead Header */}
        <div className="flex items-center justify-between pb-6 border-b border-cyan-500/20">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-600 p-1 flex items-center justify-center">
              <Image src="/logo.svg" alt="Haque & Sons" fill className="p-1 object-cover" unoptimized />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white tracking-tight uppercase">
                Haque & Sons
              </h2>
              <p className="text-[10px] text-cyan-400 font-mono">
                Next-Gen Software Studio Infrastructure
              </p>
            </div>
          </div>

          <div className="text-right text-[11px] font-mono text-gray-400">
            <span className="text-white block font-bold">Ref: {data.id}</span>
            <span>Date: {data.startDate}</span>
          </div>
        </div>

        {/* Letter Body */}
        <div className="py-8 space-y-5 text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
          <div className="space-y-1">
            <p className="text-gray-400 text-xs uppercase font-mono">To,</p>
            <p className="text-base sm:text-lg font-bold text-white">{data.studentName}</p>
            <p className="text-xs text-cyan-300">{data.college}</p>
          </div>

          <div className="pt-2">
            <h3 className="text-sm sm:text-base font-bold text-cyan-400 uppercase tracking-wide border-b border-white/5 pb-2">
              Subject: Offer of Internship — {data.domain} Track
            </h3>
          </div>

          <p>
            Dear <strong>{data.studentName}</strong>,
          </p>

          <p>
            On behalf of <strong>Haque & Sons</strong>, we are pleased to offer you an internship position as a{" "}
            <strong className="text-white">{data.domain} Intern</strong>. Your dedication to modern software engineering and enthusiasm for building production-grade platforms align directly with our studio&apos;s standards.
          </p>

          {/* Key Internship Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-black/50 border border-white/10 rounded-xl text-xs font-mono">
            <div>
              <span className="text-[10px] text-gray-500 uppercase block">Domain</span>
              <span className="font-bold text-cyan-300 truncate block">{data.domain}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase block">Mode</span>
              <span className="font-bold text-white block">{data.mode}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase block">Duration</span>
              <span className="font-bold text-white block">{data.duration}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase block">Track</span>
              <span className="font-bold text-purple-300 block">{data.internshipType}</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Internship Scope & Responsibilities:
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-300">
              <li>Architect and implement real-world capstone software using modern tools.</li>
              <li>Participate in agile review cycles and receive code reviews from our engineering leads.</li>
              <li>Upon successful milestone delivery and feedback evaluation, you will receive an official verifiable certificate with cryptographic QR verification and a Letter of Recommendation (LOR) for outstanding work.</li>
            </ul>
          </div>

          <p className="text-xs text-gray-400 pt-2">
            We look forward to working with you and seeing the incredible production software you build during your sprint with us.
          </p>
        </div>

        {/* Signatory Footer */}
        <div className="pt-6 border-t border-cyan-500/20 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-500 block uppercase font-mono">Authorized Signatory</span>
            <div className="h-10 flex items-center">
              <span className="font-serif italic text-lg sm:text-xl text-cyan-300 font-bold">
                Nejamul Haque
              </span>
            </div>
            <span className="text-xs font-bold text-white block">Nejamul Haque</span>
            <span className="text-[10px] text-gray-400 block">Founder & Lead Engineer, Haque & Sons</span>
          </div>

          <div className="w-16 h-16 rounded-full border border-cyan-500/30 flex flex-col items-center justify-center text-center p-1 bg-cyan-950/20">
            <Award className="w-5 h-5 text-cyan-400 mb-0.5" />
            <span className="text-[7px] uppercase font-bold text-cyan-300 tracking-tighter">
              Haque & Sons
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
