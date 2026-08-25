"use client";
import { motion } from "framer-motion";

const STATS = [
  { value: "6+", label: "Production Products" },
  { value: "10K+", label: "Active Users" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "0$", label: "Core Tools Free" },
];

export function Stats() {
  return (
    <section className="py-16 bg-black border-y border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {stat.value}
            </div>
            <div className="mt-2 text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
