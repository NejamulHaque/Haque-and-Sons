"use client";

import { motion } from "framer-motion";
import { Target, Code2, Rocket, Award, Sparkles } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

const STEPS = [
  {
    step: "01",
    title: "Apply for Your Track",
    description:
      "Pick your engineering domain, preferred duration (4, 8, or 12 weeks), and mode (Online, Offline, or Hybrid). Fill in your basic student details in under 1 minute.",
    icon: Target,
    color: "cyan",
  },
  {
    step: "02",
    title: "Learn & Build",
    description:
      "Get instant access to your student sprint dashboard, starter GitHub repository, architectural specifications, and milestone rubrics.",
    icon: Code2,
    color: "purple",
  },
  {
    step: "03",
    title: "Submit Projects",
    description:
      "Ship your capstone codebase with direct mentorship and reviews from Nejamul Haque. Deploy your application to live edge networks (Vercel, Render).",
    icon: Rocket,
    color: "emerald",
  },
  {
    step: "04",
    title: "Get Certified",
    description:
      "Receive an immutable, tamper-proof cryptographic QR certificate verifiable on our public portal, plus an official Letter of Recommendation (LOR) for top performers.",
    icon: Award,
    color: "yellow",
  },
];

export function HowItWorks() {
  return (
    <section className="px-4 sm:px-6 max-w-7xl mx-auto py-24 border-t border-white/5 relative">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Step-by-Step Roadmap</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          How It Works in{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            4 Simple Steps
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto leading-relaxed">
          From application submission to verified industry credentials on your LinkedIn profile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <SpotlightCard className="p-7 h-full flex flex-col justify-between border-white/10 bg-gray-950/70 backdrop-blur-xl group hover:border-cyan-500/30 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-black font-mono text-cyan-400/40 group-hover:text-cyan-400 transition-colors">
                      {step.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] text-gray-400 font-mono">
                  <span>Phase 0{i + 1} of 04</span>
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
