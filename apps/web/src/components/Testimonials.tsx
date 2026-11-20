"use client";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Rohan",
    role: "HR, Tech Company",
    text: "Haque And Sons provided us with a fantastic website! Highly recommended for anyone looking for professional digital services.",
    stars: 5,
  },
  {
    name: "Shalini",
    role: "Founder, ABC Corp",
    text: "Excellent customer support and great value for money! The team delivered beyond our expectations.",
    stars: 5,
  },
  {
    name: "Amitabh",
    role: "Manager, IT Industries",
    text: "Professional team and timely delivery of services. They understood our requirements perfectly.",
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-28 bg-black px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-neutral-300 text-xs font-medium uppercase tracking-wider mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            What Our Clients{" "}
            <span className="bg-gradient-to-b from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              Say
            </span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="p-8 rounded-3xl bg-[#0c0c0e]/80 border border-white/[0.08] hover:border-white/[0.18] transition-all relative flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={13} className="fill-white text-white" />
                  ))}
                </div>
                <p className="text-neutral-300 leading-relaxed mb-6 text-sm font-normal">&ldquo;{t.text}&rdquo;</p>
              </div>
              <div className="pt-4 border-t border-white/[0.06]">
                <div className="text-white font-medium text-sm">{t.name}</div>
                <div className="text-neutral-500 text-xs mt-0.5">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
