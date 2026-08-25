"use client";
import { motion } from "framer-motion";
import { Brain, Code, Wallet, FileText, Layers, LineChart } from "lucide-react";

const SERVICES = [
  {
    title: "Irus AI",
    desc: "Personal AI command center with live search, document intelligence, and long-term memory.",
    icon: Brain,
    color: "text-purple-400",
    link: "https://irus-ai.onrender.com/",
  },
  {
    title: "CollabSheets",
    desc: "Real-time collaborative code & doc editor with AI assistant and 60+ language execution.",
    icon: Code,
    color: "text-cyan-400",
    link: "https://collabsheets.onrender.com/",
  },
  {
    title: "Nestfy",
    desc: "Elegant personal finance tracker with smart budgets, receipt OCR, and AI spending insights.",
    icon: Wallet,
    color: "text-green-400",
    link: "https://nestfy-beta.vercel.app/",
  },
  {
    title: "ProResume",
    desc: "Build ATS-friendly professional resumes in minutes with smart formatting and export.",
    icon: FileText,
    color: "text-blue-400",
    link: "https://proresume-six.vercel.app/",
  },
  {
    title: "Builder AI",
    desc: "AI-powered portfolio generator. Fill in details, get a live responsive site instantly.",
    icon: Layers,
    color: "text-pink-400",
    link: "https://builderr-ai.vercel.app/",
  },
  {
    title: "Digital Lens",
    desc: "AI news intelligence platform with real-time aggregation, sentiment analysis, and summaries.",
    icon: LineChart,
    color: "text-yellow-400",
    link: "https://digital-lens.vercel.app/",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Services() {
  return (
    <section id="services" className="py-24 bg-black px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-white"
        >
          Our <span className="text-cyan-400">Ecosystem</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-400 mb-16 max-w-2xl mx-auto"
        >
          Six production-grade products powering thousands of users worldwide.
        </motion.p>

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
              className="group p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-500/40 hover:bg-white/[0.06] transition-all duration-300 cursor-pointer"
            >
              <div
                className={`mb-5 p-3 rounded-xl bg-white/[0.04] w-fit group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon className={`w-7 h-7 ${service.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">{service.desc}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
