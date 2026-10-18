"use client";

import { motion } from "framer-motion";
import { GraduationCap, ArrowRight, Sparkles, Laptop, Award, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { SpotlightCard } from "@/components/SpotlightCard";

export function InternshipTeaser() {
  return (
    <section className="px-4 sm:px-6 max-w-7xl mx-auto py-20 relative">
      <SpotlightCard className="p-8 sm:p-12 border-cyan-500/30 bg-gradient-to-r from-gray-950 via-[#070b14] to-cyan-950/20 shadow-[0_0_60px_rgba(6,182,212,0.12)] rounded-3xl relative overflow-hidden">
        {/* Glow orb */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
              <span>College Internship Program 2026</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Launch your tech career with our{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                structured internship program.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Explore 11+ engineering domains from Full-Stack Web and AI Agents to DevOps &amp; Cyber Security.
              Work on production architectures, receive direct code mentorship, and earn tamper-proof verifiable credentials.
            </p>

            {/* Quick feature pills */}
            <div className="flex flex-wrap gap-2.5 pt-1 text-xs text-gray-400 font-mono">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-cyan-300">
                <Laptop className="w-3.5 h-3.5" /> 11 Domain Tracks
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-purple-300">
                <Award className="w-3.5 h-3.5" /> Verifiable QR Cert &amp; LOR
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5" /> AICTE Compliant
              </span>
            </div>
          </div>

          {/* Prominent Action Button */}
          <div className="shrink-0">
            <Link
              href="/internships"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-sm font-bold uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95 group cursor-pointer"
            >
              <span>Explore Internships</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
}
