"use client";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "CTO, TechVentures",
    text: "Haque & Sons delivered our AI platform 3 weeks ahead of schedule. The code quality and security posture exceeded our enterprise standards.",
    stars: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Founder, FinStack",
    text: "Nestfy transformed how we handle personal finance for our users. The OCR accuracy and AI insights are genuinely best-in-class.",
    stars: 5,
  },
  {
    name: "Aisha Patel",
    role: "VP Engineering, DataFlow",
    text: "Their DevSecOps pipeline caught vulnerabilities our internal team missed. The GitHub Actions setup alone saved us months of work.",
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-32 bg-gradient-to-b from-black to-gray-950 px-6 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-3 mb-6">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Innovators
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-white/[0.04]" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={14} className="fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 text-sm">&ldquo;{t.text}&rdquo;</p>
              <div>
                <div className="text-white font-semibold text-sm">{t.name}</div>
                <div className="text-gray-500 text-xs">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
