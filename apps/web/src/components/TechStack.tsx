"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["Frontend", "Backend", "DevOps", "Security", "AI/ML"] as const;
const TECH: Record<string, { name: string; desc: string }[]> = {
  Frontend: [
    { name: "Next.js 16", desc: "React framework with App Router & Turbopack" },
    { name: "React Three Fiber", desc: "3D graphics engine for immersive UIs" },
    { name: "Tailwind CSS", desc: "Utility-first styling with design tokens" },
    { name: "Framer Motion", desc: "Production-grade animation library" },
    { name: "Lenis", desc: "Buttery smooth scroll experience" },
  ],
  Backend: [
    { name: "TypeScript", desc: "End-to-end type safety across stack" },
    { name: "PostgreSQL", desc: "ACID-compliant relational database" },
    { name: "Drizzle ORM", desc: "Type-safe SQL query builder" },
    { name: "Better Auth", desc: "Open-source authentication framework" },
    { name: "tRPC", desc: "End-to-end typesafe API layer" },
  ],
  DevOps: [
    { name: "Turborepo", desc: "High-performance monorepo build system" },
    { name: "pnpm", desc: "Fast, disk-efficient package manager" },
    { name: "GitHub Actions", desc: "CI/CD with security scanning" },
    { name: "Vercel", desc: "Edge deployment with preview URLs" },
    { name: "Serwist PWA", desc: "Offline-first progressive web apps" },
  ],
  Security: [
    { name: "Semgrep SAST", desc: "Static analysis for vulnerability detection" },
    { name: "OSV Scanner", desc: "Open-source dependency vulnerability DB" },
    { name: "Cloudflare WAF", desc: "Enterprise DDoS & bot protection" },
    { name: "Gitleaks", desc: "Secret scanning in CI pipeline" },
    { name: "Row Level Security", desc: "Database-level access control" },
  ],
  "AI/ML": [
    { name: "OpenAI API", desc: "LLM integration for intelligent features" },
    { name: "LangChain", desc: "Orchestration for AI agent workflows" },
    { name: "Vector Embeddings", desc: "Semantic search & RAG pipelines" },
    { name: "ONNX Runtime", desc: "Client-side ML model inference" },
    { name: "Hugging Face", desc: "Pre-trained model fine-tuning" },
  ],
};

export function TechStack() {
  const [active, setActive] = useState<string>("Frontend");
  return (
    <section id="tech" className="py-32 bg-black px-6 relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">
            Technology
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-3 mb-6">
            Enterprise-Grade{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Stack
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Every tool chosen for performance, security, and developer experience.
          </p>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${active === cat ? "bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.3)]" : "border border-white/[0.08] text-gray-400 hover:border-white/20 hover:text-white"}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {TECH[active].map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 transition-all duration-300 cursor-default"
              >
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {tech.name}
                </h3>
                <p className="text-gray-500 text-sm">{tech.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
