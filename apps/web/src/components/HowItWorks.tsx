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
    <section className="px-6 max-w-7xl mx-auto py-24 border-t border-white/[0.08] relative bg-black">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-neutral-300 text-xs font-medium uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Step-by-Step Roadmap</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
          How It Works in{" "}
          <span className="bg-gradient-to-b from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            4 Simple Steps
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto leading-relaxed font-normal">
          From application submission to verified industry credentials on your LinkedIn profile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="p-7 rounded-3xl h-full flex flex-col justify-between border border-white/[0.08] bg-[#0c0c0e]/80 backdrop-blur-xl hover:border-white/[0.18] transition-all">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-bold font-mono text-neutral-600">
                      {step.step}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-semibold tracking-tight text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-[10px] text-neutral-500 font-mono">
                  <span>Phase 0{i + 1} of 04</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
