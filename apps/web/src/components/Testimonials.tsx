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
    <section className="py-32 bg-black px-6 relative overflow-hidden">
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
            What Our Clients{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Say
            </span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
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
