"use client";
import { motion } from "framer-motion";
import { Code2, ShieldCheck, Zap, Users, Globe, Award } from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    desc: "End-to-end web applications with modern frameworks, APIs, and databases.",
  },
  {
    icon: ShieldCheck,
    title: "Security-First Approach",
    desc: "DevSecOps pipeline with SAST, secret scanning, and supply-chain policies on every project.",
  },
  {
    icon: Zap,
    title: "AI-Powered Solutions",
    desc: "Machine learning, NLP, and intelligent automation integrated into real products.",
  },
  {
    icon: Users,
    title: "Client-Centric Process",
    desc: "Agile sprints with regular demos, feedback loops, and transparent communication.",
  },
  {
    icon: Globe,
    title: "Global Delivery",
    desc: "Remote-first team delivering for clients worldwide with 24/7 support coverage.",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    desc: "Automated testing, code reviews, and performance benchmarks on every release.",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="py-28 bg-black px-6 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-white/[0.1] bg-white/[0.04] text-neutral-300 mb-4">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              We Build Software That{" "}
              <span className="bg-gradient-to-b from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                Drives Growth
              </span>
            </h2>
            <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-6 font-normal">
              Haque & Sons is a digital services studio founded by Nejamul Haque, a Help Desk
              Specialist and full-stack engineer with 2+ years of experience delivering
              production-grade software.
            </p>
            <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-8 font-normal">
              We specialize in web development, AI-powered tools, data science solutions, and
              interview preparation platforms. Every project is built with enterprise-grade
              security, performance optimization, and scalability from day one.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="px-5 py-3.5 rounded-2xl bg-[#0c0c0e] border border-white/[0.08]">
                <div className="text-2xl font-bold tracking-tight text-white">2+</div>
                <div className="text-xs text-neutral-400 mt-0.5">Years Experience</div>
              </div>
              <div className="px-5 py-3.5 rounded-2xl bg-[#0c0c0e] border border-white/[0.08]">
                <div className="text-2xl font-bold tracking-tight text-white">5+</div>
                <div className="text-xs text-neutral-400 mt-0.5">Projects Shipped</div>
              </div>
              <div className="px-5 py-3.5 rounded-2xl bg-[#0c0c0e] border border-white/[0.08]">
                <div className="text-2xl font-bold tracking-tight text-white">100%</div>
                <div className="text-xs text-neutral-400 mt-0.5">Client Satisfaction</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="p-6 rounded-2xl bg-[#0c0c0e]/80 border border-white/[0.08] hover:border-white/[0.18] transition-all backdrop-blur-xl"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4">
                  <h.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-sm font-semibold tracking-tight text-white mb-2">{h.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-normal">{h.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}