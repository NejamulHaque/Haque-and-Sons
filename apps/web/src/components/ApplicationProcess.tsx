"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Clock,
  CheckCircle2,
  Calendar,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

export function ApplicationProcess() {
  return (
    <section className="px-6 max-w-7xl mx-auto py-24 border-t border-white/[0.08] relative bg-black">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-neutral-300 text-xs font-medium uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span>Admissions &amp; Onboarding</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
          Application{" "}
          <span className="bg-gradient-to-b from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            Process
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto leading-relaxed font-normal">
          Transparent guidelines, timeline expectations, and criteria to help you prepare your candidate profile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: What to Prepare */}
        <div className="p-7 rounded-3xl border border-white/[0.08] bg-[#0c0c0e]/80 backdrop-blur-xl space-y-5 hover:border-white/[0.18] transition-all">
          <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-cyan-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-white mb-2">What to Prepare</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-normal">
              Having these ready ensures your registration and offer letter generation take under two minutes.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {[
              "Active GitHub Account for code repository submissions",
              "Valid Student Email Address (college or personal)",
              "College / University name & current degree program",
              "Basic fundamentals in your chosen track's language",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-xs text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Timeline Expectations */}
        <div className="p-7 rounded-3xl border border-white/[0.08] bg-[#0c0c0e]/80 backdrop-blur-xl space-y-5 hover:border-white/[0.18] transition-all">
          <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-neutral-300">
            <Clock className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-white mb-2">Timeline Expectations</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-normal">
              We operate rolling weekly cohorts so you can start without waiting for semester breaks.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {[
              "Application Review: Reviewed automatically within 24 hours",
              "Offer Letter: Immediate formal letter of appointment issued",
              "Cohort Kickoff: New development sprints begin every Monday",
              "Milestone Reviews: Weekly code reviews and feedback loops",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-xs text-neutral-300">
                <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: Selection Criteria */}
        <div className="p-7 rounded-3xl border border-white/[0.08] bg-[#0c0c0e]/80 backdrop-blur-xl space-y-5 hover:border-white/[0.18] transition-all">
          <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-white mb-2">Selection Criteria</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-normal">
              We value curiosity, consistency, and problem-solving passion over competitive test scores.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {[
              "Enrolled in any college/university (B.Tech, BCA, MCA, Diploma)",
              "Commitment to deliver milestones within chosen duration",
              "Willingness to receive and act on code review feedback",
              "Zero geographic restrictions — open internationally",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-xs text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
