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
      className="py-32 bg-gradient-to-b from-black to-gray-950 px-6 relative overflow-hidden"
    >
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-3 mb-6">
            What You{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Get
            </span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 transition-all duration-500 flex gap-6 items-start"
            >
              <div className="shrink-0 p-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/[0.06] group-hover:border-cyan-500/30 transition-colors">
                <feature.icon className="w-7 h-7 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
