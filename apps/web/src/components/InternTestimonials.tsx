"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

interface Testimonial {
  name: string;
  college: string;
  domain: string;
  achievement: string;
  quote: string;
  avatar: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Aarav Sharma",
    college: "IIT Kanpur",
    domain: "Full-Stack Web Development",
    achievement: "Landed SDE Internship at Y Combinator-backed Startup",
    quote:
      "Building a production SaaS architecture with Next.js 16 and PostgreSQL at Haque & Sons was the centerpiece of my resume. Nejamul's code reviews taught me real enterprise standards.",
    avatar: "AS",
    rating: 5,
  },
  {
    name: "Priya Reddy",
    college: "VIT Vellore",
    domain: "AI & Generative AI Engineering",
    achievement: "Published RAG Agent Framework with 200+ GitHub Stars",
    quote:
      "Implementing autonomous agent architectures with vector embeddings and LangChain was far ahead of any university syllabus. The verified QR certificate immediately caught recruiter attention.",
    avatar: "PR",
    rating: 5,
  },
  {
    name: "Rohit Patel",
    college: "BITS Pilani",
    domain: "Cloud & DevSecOps Engineering",
    achievement: "Secured Cloud Engineer Role at Leading Fintech",
    quote:
      "Real Kubernetes manifests, Docker multi-stage pipelines, and zero-trust security policies. The practical focus and hands-on deliverables made all the difference in technical interviews.",
    avatar: "RP",
    rating: 5,
  },
  {
    name: "Sneha Gupta",
    college: "DTU Delhi",
    domain: "Data Analytics & Business Intelligence",
    achievement: "Received Formal LOR & Distinction Certificate",
    quote:
      "From raw e-commerce telemetry to automated executive dashboards, this program gave me complete end-to-end data pipeline confidence. The mentorship quality was unmatched.",
    avatar: "SG",
    rating: 5,
  },
  {
    name: "Mohammed Faisal",
    college: "Teerthanker Mahaveer University (TMU)",
    domain: "Android Native Development",
    achievement: "Shipped Production App to Google Play Store",
    quote:
      "Writing modern Kotlin with Jetpack Compose and clean architecture patterns under direct mentorship helped me build an app with 5,000+ active users. Top-tier program!",
    avatar: "MF",
    rating: 5,
  },
];

export function InternTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="px-6 max-w-7xl mx-auto py-24 border-t border-white/[0.08] relative bg-black">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-neutral-300 text-xs font-medium uppercase tracking-wider">
          <Quote className="w-3.5 h-3.5 text-cyan-400" />
          <span>Student Success Stories</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
          What Our Interns{" "}
          <span className="bg-gradient-to-b from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            Say
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto leading-relaxed font-normal">
          Hear from students from premier institutions who built production software and advanced their tech careers.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 30, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="p-8 sm:p-10 rounded-3xl border border-white/[0.08] bg-[#0c0c0e]/90 backdrop-blur-xl shadow-xl relative">
              <Quote className="w-8 h-8 text-white/[0.08] mb-4" />

              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal mb-8">
                &ldquo;{TESTIMONIALS[activeIndex].quote}&rdquo;
              </p>

              {/* Achievement Badge */}
              <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-neutral-300 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{TESTIMONIALS[activeIndex].achievement}</span>
              </div>

              {/* Author Row */}
              <div className="flex items-center justify-between pt-6 border-t border-white/[0.06]">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-white/[0.08] border border-white/[0.1] flex items-center justify-center text-white font-medium text-xs">
                    {TESTIMONIALS[activeIndex].avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold tracking-tight text-white">
                      {TESTIMONIALS[activeIndex].name}
                    </h4>
                    <p className="text-xs text-neutral-400 font-normal">
                      {TESTIMONIALS[activeIndex].college}
                    </p>
                    <p className="text-[11px] text-cyan-400 font-medium">
                      {TESTIMONIALS[activeIndex].domain}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1">
                  {Array.from({ length: TESTIMONIALS[activeIndex].rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-white fill-white" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`rounded-full transition-all cursor-pointer ${
                  i === activeIndex ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-neutral-400 hover:text-white transition-all cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={next}
              className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-neutral-400 hover:text-white transition-all cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
