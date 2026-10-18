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
    <section className="px-4 sm:px-6 max-w-7xl mx-auto py-24 border-t border-white/5 relative">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5" />
          <span>Admissions &amp; Onboarding</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Application{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            Process
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto leading-relaxed">
          Transparent guidelines, timeline expectations, and criteria to help you prepare your candidate profile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: What to Prepare */}
        <SpotlightCard className="p-7 border-white/10 bg-gray-950/70 backdrop-blur-xl space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">What to Prepare</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
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
              <div key={item} className="flex items-start gap-2.5 text-xs text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </SpotlightCard>

        {/* Card 2: Timeline Expectations */}
        <SpotlightCard className="p-7 border-white/10 bg-gray-950/70 backdrop-blur-xl space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Timeline Expectations</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
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
              <div key={item} className="flex items-start gap-2.5 text-xs text-gray-300">
                <Calendar className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </SpotlightCard>

        {/* Card 3: Selection Criteria */}
        <SpotlightCard className="p-7 border-white/10 bg-gray-950/70 backdrop-blur-xl space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Selection Criteria</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
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
              <div key={item} className="flex items-start gap-2.5 text-xs text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
