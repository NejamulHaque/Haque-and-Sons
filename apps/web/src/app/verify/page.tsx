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
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black pt-32 pb-24 px-6 relative overflow-hidden">
      <div className="max-w-2xl mx-auto text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-neutral-300 text-xs font-mono mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
          <span>Credential Registry &amp; Verification</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
          Verify Official Credentials
        </h1>

        <p className="text-neutral-400 text-sm leading-relaxed max-w-lg mx-auto font-normal">
          Enter the unique Certificate Identifier (e.g. <code className="text-white font-mono bg-white/[0.06] px-1.5 py-0.5 rounded">HS-INT-2026-A8F9B2</code>) found on any Haque Studio credential to verify its authenticity.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              required
              value={certId}
              onChange={(e) => {
                setCertId(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. HS-INT-2026-A8F9B2"
              className="w-full bg-[#0c0c0e] border border-white/[0.12] rounded-full py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-white transition-all font-mono tracking-wider"
            />
          </div>

          {error && <p className="text-xs text-rose-400 text-left font-mono">{error}</p>}

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-medium uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Verify Credential Authenticity</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security Info Box */}
        <div className="pt-8 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <div className="p-5 rounded-2xl bg-[#0c0c0e] border border-white/[0.08] space-y-2">
            <div className="flex items-center gap-2 text-white text-xs font-semibold">
              <QrIcon className="w-4 h-4 text-neutral-400" />
              <span>Direct QR Verification</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-normal">
              Every printed or digital certificate contains a QR code that directly routes to its tamper-proof digital record.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0c0c0e] border border-white/[0.08] space-y-2">
            <div className="flex items-center gap-2 text-white text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-neutral-400" />
              <span>Immutable Ledger State</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-normal">
              Issued credentials cannot be modified or forged once registered in the Haque Studio database.
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-4">
          <Link
            href="/internships"
            className="text-xs text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-1 font-mono"
          >
            <span>← Explore College Internships</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
