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
    <section className="px-4 sm:px-6 max-w-7xl mx-auto py-24 border-t border-white/5 relative">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
          <Quote className="w-3.5 h-3.5" />
          <span>Student Success Stories</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          What Our Interns{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Say
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto leading-relaxed">
          Hear from students from premier institutions who built production software and advanced their tech careers.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <SpotlightCard className="p-8 sm:p-10 border-white/10 bg-gray-950/80 backdrop-blur-xl shadow-2xl relative">
              <Quote className="w-10 h-10 text-cyan-500/25 mb-4" />

              <p className="text-base sm:text-lg text-gray-200 leading-relaxed italic mb-8">
                &ldquo;{TESTIMONIALS[activeIndex].quote}&rdquo;
              </p>

              {/* Achievement Badge */}
              <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{TESTIMONIALS[activeIndex].achievement}</span>
              </div>

              {/* Author Row */}
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {TESTIMONIALS[activeIndex].avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {TESTIMONIALS[activeIndex].name}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {TESTIMONIALS[activeIndex].college}
                    </p>
                    <p className="text-[11px] text-cyan-400 font-medium">
                      {TESTIMONIALS[activeIndex].domain}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1">
                  {Array.from({ length: TESTIMONIALS[activeIndex].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
            </SpotlightCard>
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
                  i === activeIndex ? "w-8 h-2 bg-cyan-400" : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={next}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
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
