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
      className="py-32 bg-gradient-to-b from-gray-950 to-black px-6 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6 leading-tight">
              We Build Software That{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Drives Growth
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Haque & Sons is a digital services studio founded by Nejamul Haque, a Help Desk
              Specialist and full-stack engineer with 2+ years of experience delivering
              production-grade software.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              We specialize in web development, AI-powered tools, data science solutions, and
              interview preparation platforms. Every project is built with enterprise-grade
              security, performance optimization, and scalability from day one.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="px-5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-2xl font-bold text-cyan-400">2+</div>
                <div className="text-xs text-gray-500 mt-1">Years Experience</div>
              </div>
              <div className="px-5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-2xl font-bold text-purple-400">5+</div>
                <div className="text-xs text-gray-500 mt-1">Projects Shipped</div>
              </div>
              <div className="px-5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-2xl font-bold text-emerald-400">100%</div>
                <div className="text-xs text-gray-500 mt-1">Client Satisfaction</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/20 transition-colors"
              >
                <h.icon className="w-6 h-6 text-cyan-400 mb-3" />
                <h3 className="text-sm font-bold text-white mb-2">{h.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}