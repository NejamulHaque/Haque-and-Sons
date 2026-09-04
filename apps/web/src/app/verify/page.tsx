"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ShieldCheck, QrCode as QrIcon, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function CertificateVerifySearchPage() {
  const [certId, setCertId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = certId.trim().toUpperCase();
    if (!clean) {
      setError("Please enter a valid Certificate ID");
      return;
    }
    router.push(`/verify/${clean}`);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-white pt-28 pb-20 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Haque & Sons Credential Verification</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Verify Official Credentials
        </h1>

        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
          Enter the unique Certificate Identifier (e.g. <code className="text-cyan-400 font-mono">HS-INT-2026-A8F9B2</code>) found on the bottom-left of any Haque & Sons certificate to verify its authenticity.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
            <input
              type="text"
              required
              value={certId}
              onChange={(e) => {
                setCertId(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. HS-INT-2026-A8F9B2"
              className="w-full bg-black/70 border border-cyan-500/40 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 font-mono tracking-wider shadow-[0_0_30px_rgba(6,182,212,0.15)]"
            />
          </div>

          {error && <p className="text-xs text-red-400 text-left">{error}</p>}

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Verify Credential Authenticity</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security Info Box */}
        <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-semibold">
              <QrIcon className="w-4 h-4 text-cyan-400" />
              <span>Direct QR Verification</span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Every printed or digital certificate contains a QR code that directly routes to its tamper-proof digital record.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Immutable Ledger State</span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Issued credentials cannot be modified or forged once registered in the Haque & Sons database.
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-4">
          <Link
            href="/internships"
            className="text-xs text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1"
          >
            <span>← Explore College Internships</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
