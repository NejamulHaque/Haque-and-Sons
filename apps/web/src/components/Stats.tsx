"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
}: {
  target: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = performance.now();
    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [isInView, target]);
  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const STATS = [
  {
    value: 5,
    suffix: "+",
    label: "Projects Completed",
    desc: "Delivering excellence for clients worldwide",
  },
  {
    value: 5,
    suffix: "+",
    label: "Happy Clients",
    desc: "Satisfied with our outstanding services",
  },
  { value: 2, suffix: "+", label: "Years Experience", desc: "Providing quality digital solutions" },
  {
    value: 100,
    suffix: "%",
    prefix: "",
    label: "Client Satisfaction",
    desc: "Professional team and timely delivery",
  },
];

export function Stats() {
  return (
    <section className="py-24 bg-black border-y border-white/[0.04] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.02] via-transparent to-purple-500/[0.02] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="text-center group"
          >
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
            </div>
            <div className="text-sm font-semibold text-white mb-1">{stat.label}</div>
            <div className="text-xs text-gray-500">{stat.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
