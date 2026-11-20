"use client";
import { motion } from "framer-motion";
import { GraduationCap, FolderKanban, BookOpen, CheckCircle2 } from "lucide-react";

const FEATURES = [
  {
    icon: GraduationCap,
    title: "Beginner-Friendly",
    desc: "Step-by-step guidance from zero to pro. No prior experience required to get started.",
  },
  {
    icon: FolderKanban,
    title: "Real-World Projects",
    desc: "Build projects according to actual client requirements. Portfolio-ready work from day one.",
  },
  {
    icon: BookOpen,
    title: "Comprehensive Resources",
    desc: "Templates, cheat sheets, and business analytics tools to support your entire journey.",
  },
  {
    icon: CheckCircle2,
    title: "All Business Managed",
    desc: "From virtual assistance to full-stack development — we handle every aspect of your digital presence.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="py-28 bg-black px-6 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-neutral-300 text-xs font-medium uppercase tracking-wider mb-4">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            What You{" "}
            <span className="bg-gradient-to-b from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              Receive
            </span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="p-8 rounded-3xl bg-[#0c0c0e]/80 border border-white/[0.08] hover:border-white/[0.18] transition-all flex gap-6 items-start"
            >
              <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed font-normal">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
