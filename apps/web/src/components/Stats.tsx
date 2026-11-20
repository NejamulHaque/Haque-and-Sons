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
    <section className="py-20 bg-black border-y border-white/[0.08] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative z-10">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="text-center group"
          >
            <div className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-2 inline-block">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
            </div>
            <div className="text-sm font-medium text-neutral-200 mb-1">{stat.label}</div>
            <div className="text-xs text-neutral-500 leading-relaxed max-w-[200px] mx-auto">{stat.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
