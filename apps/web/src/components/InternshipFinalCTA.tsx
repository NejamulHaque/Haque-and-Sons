"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, CheckCircle2, Lock, GraduationCap } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { openAuthModal } from "@/components/AuthModal";

export function InternshipFinalCTA() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleApply = () => {
    if (session?.user) {
      router.push("/profile?domain=full-stack-web");
    } else {
      openAuthModal({ mode: "signup", domain: "full-stack-web" });
    }
  };

  return (
    <section className="px-4 sm:px-6 max-w-5xl mx-auto py-24 border-t border-white/5 relative">
      <div className="relative rounded-3xl bg-gradient-to-b from-[#090d16] via-[#070b13] to-black border border-cyan-500/30 p-8 sm:p-14 text-center overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.15)] space-y-6">
        {/* Top ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Cohort Enrollment Open</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Ready to Start Your{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            Engineering Journey?
          </span>
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
          Join hundreds of students building real-world software, receiving direct mentorship, and earning verified industry credentials.
        </p>

        <div className="pt-2">
          <button
            onClick={handleApply}
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-sm font-bold uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 mx-auto cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>Apply Now &amp; Select Track</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-white/5 text-xs text-gray-400 font-mono">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            256-bit Encrypted
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Better Auth Protected
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
            AICTE NEP 2020 Compliant
          </span>
        </div>
      </div>
    </section>
  );
}
