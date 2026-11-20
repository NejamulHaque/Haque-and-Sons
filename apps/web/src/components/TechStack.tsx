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
    <section id="tech" className="py-28 bg-black px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-neutral-300 text-xs font-medium uppercase tracking-wider mb-4">
            Technology
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Enterprise-Grade{" "}
            <span className="bg-gradient-to-b from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              Stack
            </span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Every tool chosen for performance, security, and developer experience.
          </p>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                active === cat
                  ? "bg-white text-black shadow-sm font-semibold"
                  : "bg-white/[0.04] border border-white/[0.08] text-neutral-400 hover:border-white/[0.16] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {TECH[active].map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="p-6 rounded-2xl bg-[#0c0c0e]/80 border border-white/[0.08] hover:border-white/[0.18] transition-all cursor-default"
              >
                <h3 className="text-sm font-semibold tracking-tight text-white mb-1.5">
                  {tech.name}
                </h3>
                <p className="text-neutral-400 text-xs leading-relaxed font-normal">{tech.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
