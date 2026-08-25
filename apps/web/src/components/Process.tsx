"use client";
import { motion } from "framer-motion";
import { Search, Lightbulb, Code2, Rocket, ShieldCheck, HeadphonesIcon } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    title: "Discovery",
    desc: "Deep-dive into your requirements, pain points, and business goals.",
  },
  {
    icon: Lightbulb,
    title: "Architecture",
    desc: "Design scalable, secure system architecture with modern best practices.",
  },
  {
    icon: Code2,
    title: "Development",
    desc: "Agile sprints with CI/CD, automated testing, and code reviews.",
  },
  {
    icon: ShieldCheck,
    title: "Security Audit",
    desc: "Penetration testing, SAST/DAST scanning, and compliance verification.",
  },
  {
    icon: Rocket,
    title: "Launch",
    desc: "Zero-downtime deployment with monitoring, logging, and alerting.",
  },
  {
    icon: HeadphonesIcon,
    title: "Support",
    desc: "Ongoing maintenance, performance optimization, and feature iteration.",
  },
];

export function Process() {
  return (
    <section className="py-32 bg-black px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">
            Our Process
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-3 mb-6">
            How We{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Deliver
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A battle-tested methodology refined across dozens of production deployments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 text-6xl font-black text-white/[0.02] group-hover:text-cyan-500/[0.06] transition-colors select-none">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mb-5 p-3 rounded-xl bg-white/[0.04] w-fit group-hover:bg-cyan-500/10 transition-colors duration-300">
                <step.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
