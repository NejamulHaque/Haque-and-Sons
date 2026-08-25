"use client";
import { motion, type Variants } from "framer-motion";
import { Brain, Code, Wallet, FileText, Layers, LineChart, ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    title: "Irus AI",
    desc: "Personal AI command center with live search, document intelligence, and long-term memory.",
    icon: Brain,
    gradient: "from-purple-500 to-violet-600",
    link: "https://irus-ai.onrender.com/",
  },
  {
    title: "CollabSheets",
    desc: "Real-time collaborative code & doc editor with AI assistant and 60+ language execution.",
    icon: Code,
    gradient: "from-cyan-500 to-blue-600",
    link: "https://collabsheets.onrender.com/",
  },
  {
    title: "Nestfy",
    desc: "Elegant personal finance tracker with smart budgets, receipt OCR, and AI spending insights.",
    icon: Wallet,
    gradient: "from-emerald-500 to-green-600",
    link: "https://nestfy-beta.vercel.app/",
  },
  {
    title: "ProResume",
    desc: "Build ATS-friendly professional resumes in minutes with smart formatting and export.",
    icon: FileText,
    gradient: "from-blue-500 to-indigo-600",
    link: "https://proresume-six.vercel.app/",
  },
  {
    title: "Builder AI",
    desc: "AI-powered portfolio generator. Fill in details, get a live responsive site instantly.",
    icon: Layers,
    gradient: "from-pink-500 to-rose-600",
    link: "https://builderr-ai.vercel.app/",
  },
  {
    title: "Digital Lens",
    desc: "AI news intelligence platform with real-time aggregation, sentiment analysis, and summaries.",
    icon: LineChart,
    gradient: "from-amber-500 to-orange-600",
    link: "https://digital-lens.vercel.app/",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Services() {
  return (
    <section id="services" className="py-32 bg-black px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">
            Our Products
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-3 mb-6">
            The{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Ecosystem
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Six production-grade products powering thousands of users worldwide. Each built with
            enterprise-grade security and performance.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service) => (
            <motion.a
              key={service.title}
              href={service.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 cursor-pointer overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <div
                  className={`mb-6 p-3.5 rounded-xl bg-gradient-to-br ${service.gradient} w-fit shadow-lg`}
                >
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>
                <p className="text-gray-400 leading-relaxed text-sm">{service.desc}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
