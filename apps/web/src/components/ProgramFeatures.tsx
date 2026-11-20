"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Users,
  Award,
  Star,
  Share2,
  Rocket,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

const FEATURES = [
  {
    icon: Code2,
    title: "Real-World Projects",
    description:
      "Build production-grade applications with modern full-stack architectures, API integrations, and database schemas instead of toy tutorial clones.",
    badge: "Production Standard",
    color: "from-cyan-500/20 to-blue-500/10",
    iconColor: "text-cyan-400",
  },
  {
    icon: Users,
    title: "Mentorship from Experts",
    description:
      "Receive direct 1-on-1 code reviews, architectural feedback, and engineering mentorship from Nejamul Haque throughout your sprints.",
    badge: "Direct Guidance",
    color: "from-purple-500/20 to-pink-500/10",
    iconColor: "text-purple-400",
  },
  {
    icon: Award,
    title: "Certificate of Completion",
    description:
      "Earn a tamper-proof cryptographic QR certificate permanently recorded on our public ledger, verifiable instantly by tech recruiters.",
    badge: "Tamper-Proof QR",
    color: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-400",
  },
  {
    icon: Star,
    title: "Letter of Recommendation",
    description:
      "Top-performing interns receive an official technical Letter of Recommendation (LOR) for master's applications and corporate employment.",
    badge: "Top Performers",
    color: "from-amber-500/20 to-yellow-500/10",
    iconColor: "text-amber-400",
  },
  {
    icon: Share2,
    title: "LinkedIn Profile Optimization",
    description:
      "Proven blueprints to showcase your verified credentials, capstone projects, and GitHub commits to attract recruiter inquiries.",
    badge: "Career Visibility",
    color: "from-blue-500/20 to-cyan-500/10",
    iconColor: "text-blue-400",
  },
  {
    icon: Rocket,
    title: "Live Portfolio Building",
    description:
      "Deploy your capstone project to production edge networks (Vercel, Render, AWS) with live URLs to demonstrate tangible technical capability.",
    badge: "Edge Deployed",
    color: "from-pink-500/20 to-purple-500/10",
    iconColor: "text-pink-400",
  },
];

export function ProgramFeatures() {
  return (
    <section className="px-6 max-w-7xl mx-auto py-20 border-t border-white/[0.08] relative bg-black">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-neutral-300 text-xs font-medium uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Why Choose Haque &amp; Sons</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
          Engineering Program{" "}
          <span className="bg-gradient-to-b from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            Features
          </span>
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-normal">
          Designed specifically to bridge the gap between academic curriculum and high-growth industry standards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div className="p-7 rounded-3xl border border-white/[0.08] bg-[#0c0c0e]/80 backdrop-blur-xl h-full flex flex-col justify-between hover:border-white/[0.18] transition-all">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-cyan-400">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="text-[10px] uppercase font-semibold tracking-wider px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-neutral-300">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold tracking-tight text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-[11px] text-neutral-400 font-normal">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Included in All Domain Tracks</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
