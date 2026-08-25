"use client";
import { motion } from "framer-motion";

const TECH = [
  "Next.js 16",
  "React Three Fiber",
  "TypeScript",
  "PostgreSQL",
  "Better Auth",
  "Serwist PWA",
  "Tailwind CSS",
  "Framer Motion",
  "Turborepo",
  "pnpm",
  "GitHub Actions",
  "Cloudflare WAF",
];

export function TechStack() {
  return (
    <section className="py-20 bg-black px-6">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-white mb-10"
        >
          Built With Enterprise-Grade Technology
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-3">
          {TECH.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.02] text-sm text-gray-400 hover:border-cyan-500/40 hover:text-cyan-400 transition-all cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
