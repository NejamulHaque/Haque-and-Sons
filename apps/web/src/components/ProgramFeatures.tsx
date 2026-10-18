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
    <section className="px-4 sm:px-6 max-w-7xl mx-auto py-20 border-t border-white/5 relative">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Why Choose Haque &amp; Sons</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Engineering Program{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            Features
          </span>
        </h2>
        <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
          Designed specifically to bridge the gap between academic curriculum and high-growth industry standards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <SpotlightCard className="p-7 border-white/10 bg-gray-950/60 backdrop-blur-xl h-full flex flex-col justify-between group hover:border-cyan-500/30 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] text-gray-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Included in All Domain Tracks</span>
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
