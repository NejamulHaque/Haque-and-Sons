"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Lightbulb,
  Code2,
  Rocket,
  ShieldCheck,
  HeadphonesIcon,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";

interface ProcessStep {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tagline: string;
  duration: string;
  desc: string;
  deliverables: string[];
  gradient: string;
}

const STEPS: ProcessStep[] = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & Requirements",
    tagline: "Aligning architectural vision & product goals",
    duration: "Day 1 - 3",
    desc: "Deep-dive workshop into your technical requirements, API integrations, target audience metrics, and product scale objectives.",
    deliverables: ["Product Scope Document", "System Architecture Blueprint", "Sprint Timeline & Milestones"],
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "System & UI/UX Design",
    tagline: "Cyber glassmorphic design & database modeling",
    duration: "Week 1",
    desc: "Designing responsive, high-performance user experiences and modeling resilient PostgreSQL / vector database schemas with Drizzle.",
    deliverables: ["High-Fidelity Interactive Prototypes", "Relational & Vector Schema Mapping", "API Contracts & Flow Diagrams"],
    gradient: "from-purple-500 to-violet-600",
  },
  {
    number: "03",
    icon: Code2,
    title: "Agile Engineering Sprints",
    tagline: "Production-grade Next.js 16 & AI orchestrations",
    duration: "Weeks 2 - 4",
    desc: "Fast, test-driven development using Next.js 16, TypeScript, React 19, WebSockets, and state-of-the-art AI model integrations.",
    deliverables: ["Full-Stack Source Code Ownership", "Live Preview Staging Environments", "Automated CI/CD Pipelines"],
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "DevSecOps & SAST Audit",
    tagline: "Zero-trust hardening & security penetration tests",
    duration: "Week 4",
    desc: "Comprehensive security scanning, SAST/DAST verification, secret auditing, rate-limiting, and GDPR/Cookie compliance enforcement.",
    deliverables: ["Security Audit Certification", "Zero-Trust Role Guard Implementation", "Lighthouse 95+ Performance Audit"],
    gradient: "from-yellow-500 to-amber-600",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Edge Deployment & Launch",
    tagline: "Global edge CDN distribution with zero downtime",
    duration: "Launch Day",
    desc: "Seamless production launch on Vercel Edge / Render networks with custom domain routing, SSL enforcement, and live SEO indexing.",
    deliverables: ["Zero-Downtime Live Release", "DNS & SSL Configuration", "Real-Time Telemetry & Monitoring"],
    gradient: "from-pink-500 to-rose-600",
  },
  {
    number: "06",
    icon: HeadphonesIcon,
    title: "Support & Evolution",
    tagline: "30-day warranty & continuous optimization",
    duration: "Ongoing",
    desc: "Post-launch guarantee covering bug fixes, performance tuning, model fine-tuning, and scalable feature expansions.",
    deliverables: ["30-Day Post-Launch Warranty", "Automated Error Alerting", "Quarterly Scale Strategy Sessions"],
    gradient: "from-cyan-400 to-teal-500",
  },
];

export function Process() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="process" className="py-28 bg-black px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-neutral-300 text-xs font-medium uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Proven Engineering Methodology</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4 tracking-tight">
            How We{" "}
            <span className="bg-gradient-to-b from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              Deliver Excellence
            </span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            A battle-tested 6-phase engineering lifecycle designed to turn complex visions into robust, high-performance production platforms.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STEPS.map((step, i) => {
            const isSelected = activeStep === i;
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className={`p-7 rounded-3xl flex flex-col justify-between transition-all cursor-pointer bg-[#0c0c0e]/80 backdrop-blur-xl ${
                  isSelected
                    ? "border border-white/[0.3] shadow-md ring-1 ring-white/[0.15]"
                    : "border border-white/[0.08] hover:border-white/[0.18]"
                }`}
                onClick={() => setActiveStep(i)}
              >
                <div>
                  {/* Top Bar: Icon + Number + Duration */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="p-3 rounded-2xl bg-white/[0.06] border border-white/[0.08] text-cyan-400"
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-[11px] text-neutral-300 bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.5 rounded-full font-mono">
                        <Clock className="w-3 h-3 text-neutral-400" />
                        {step.duration}
                      </span>
                      <span className="text-xl font-bold text-neutral-600 font-mono">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg font-bold text-white mb-1 tracking-tight">{step.title}</h3>
                  <p className="text-xs text-neutral-300 font-medium mb-3">{step.tagline}</p>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-6 font-normal">{step.desc}</p>
                </div>

                {/* Deliverables */}
                <div className="pt-4 border-t border-white/[0.06] space-y-2">
                  <span className="text-[10px] uppercase font-semibold text-neutral-500 tracking-wider block">
                    Key Deliverables
                  </span>
                  {step.deliverables.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-neutral-400 font-normal">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to Estimator */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-2 pl-4 pr-2 rounded-full bg-[#0c0c0e] border border-white/[0.08] backdrop-blur-md">
            <span className="text-xs text-neutral-300 font-medium">
              Ready to kick off Phase 1 with Nejamul Haque?
            </span>
            <button
              onClick={() =>
                document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-5 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer active:scale-98 shadow-sm"
            >
              <span>Configure Your Sprint Scope</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
