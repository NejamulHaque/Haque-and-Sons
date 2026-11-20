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
    <section className="px-6 max-w-5xl mx-auto py-24 border-t border-white/[0.08] relative bg-black">
      <div className="relative rounded-3xl bg-[#0c0c0e]/95 border border-white/[0.08] p-8 sm:p-14 text-center overflow-hidden shadow-xl space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-neutral-300 text-xs font-medium uppercase tracking-wider">
          <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Cohort Enrollment Open</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
          Ready to Start Your{" "}
          <span className="bg-gradient-to-b from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            Engineering Journey?
          </span>
        </h2>

        <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed font-normal">
          Join hundreds of students building real-world software, receiving direct mentorship, and earning verified industry credentials.
        </p>

        <div className="pt-2">
          <button
            onClick={handleApply}
            className="px-8 py-4 rounded-full bg-white text-black hover:bg-neutral-200 text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 mx-auto cursor-pointer active:scale-98"
          >
            <span>Apply Now &amp; Select Track</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-5 pt-6 border-t border-white/[0.06] text-xs text-neutral-400 font-mono">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-neutral-300" />
            256-bit Encrypted
          </span>
          <span className="text-neutral-600">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Better Auth Protected
          </span>
          <span className="text-neutral-600">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            AICTE NEP 2020 Compliant
          </span>
        </div>
      </div>
    </section>
  );
}
