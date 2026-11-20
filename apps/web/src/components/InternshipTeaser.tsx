"use client";

import { motion } from "framer-motion";
import { GraduationCap, ArrowRight, Sparkles, Laptop, Award, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { SpotlightCard } from "@/components/SpotlightCard";

export function InternshipTeaser() {
  return (
    <section className="px-6 max-w-7xl mx-auto py-20 relative">
      <div className="p-8 sm:p-12 border border-white/[0.08] bg-[#0c0c0e]/90 backdrop-blur-2xl rounded-3xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-neutral-300 text-xs font-medium uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
              <span>College Internship Program 2026</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Launch your tech career with our{" "}
              <span className="bg-gradient-to-b from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                structured internship program.
              </span>
            </h2>

            <p className="text-sm text-neutral-400 leading-relaxed font-normal">
              Explore 11+ engineering domains from Full-Stack Web and AI Agents to DevOps &amp; Cyber Security.
              Work on production architectures, receive direct code mentorship, and earn tamper-proof verifiable credentials.
            </p>

            {/* Quick feature pills */}
            <div className="flex flex-wrap gap-2 pt-1 text-xs text-neutral-300">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
                <Laptop className="w-3.5 h-3.5 text-cyan-400" /> 11 Domain Tracks
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
                <Award className="w-3.5 h-3.5 text-cyan-400" /> Verifiable QR Cert &amp; LOR
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> AICTE Compliant
              </span>
            </div>
          </div>

          {/* Prominent Action Button */}
          <div className="shrink-0">
            <Link
              href="/internships"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 text-sm font-semibold transition-all shadow-sm active:scale-98 group cursor-pointer"
            >
              <span>Explore Internships</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
