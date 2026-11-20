"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Zap,
  Clock,
  Laptop,
  CheckCircle2,
  X,
  Code2,
  BookOpen,
  Trophy,
  Target,
  Star,
  Sparkles,
} from "lucide-react";
import { INTERNSHIP_DOMAINS, type InternshipDomain } from "@/lib/domains";
import { SpotlightCard } from "@/components/SpotlightCard";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { openAuthModal } from "@/components/AuthModal";

const CATEGORIES = [
  "All Tracks",
  "Development",
  "AI & Data",
  "Mobile",
  "DevOps & Security",
  "Design",
] as const;

export function DomainCards() {
  const { data: session } = useSession();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<string>("All Tracks");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<InternshipDomain | null>(null);

  const handleApply = (domainId: string) => {
    if (session?.user) {
      router.push(`/profile?domain=${encodeURIComponent(domainId)}`);
    } else {
      openAuthModal({ mode: "signup", domain: domainId });
    }
  };

  const filteredDomains = INTERNSHIP_DOMAINS.filter((domain) => {
    if (selectedCategory !== "All Tracks" && domain.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = domain.name.toLowerCase().includes(q);
      const matchTech = domain.techStack.some((t) => t.toLowerCase().includes(q));
      const matchDesc = domain.description.toLowerCase().includes(q);
      if (!matchName && !matchTech && !matchDesc) return false;
    }
    return true;
  });

  return (
    <section id="domains" className="px-4 sm:px-6 max-w-7xl mx-auto py-24 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-neutral-300 text-xs font-medium uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Structured Tracks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Explore 11+ Engineering{" "}
            <span className="bg-gradient-to-b from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              Domains
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg leading-relaxed font-normal">
            Select your domain of interest, explore the weekly syllabus, and build production capstones.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search track or tech stack..."
            className="w-full bg-[#0c0c0e] border border-white/[0.08] rounded-full py-2.5 pl-11 pr-4 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-white/30 transition-all font-mono"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                isSelected
                  ? "bg-white text-black shadow-sm font-semibold"
                  : "bg-white/[0.04] border border-white/[0.08] text-neutral-400 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Domain Cards Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredDomains.map((domain, i) => (
            <motion.div
              key={domain.id}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <div className="p-7 rounded-3xl h-full flex flex-col justify-between border border-white/[0.08] bg-[#0c0c0e]/80 backdrop-blur-xl group hover:border-white/[0.18] transition-all">
                <div>
                  {/* Top: Icon & Tags */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-2xl transition-transform group-hover:scale-105">
                      {domain.icon}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {domain.popular && (
                        <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-amber-300 flex items-center gap-1">
                          <Zap className="w-2.5 h-2.5" /> Popular
                        </span>
                      )}
                      <span className="text-[10px] uppercase font-semibold tracking-wider px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-neutral-300">
                        {domain.category}
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg font-bold text-white mb-1 tracking-tight">
                    {domain.name}
                  </h3>
                  <p className="text-xs text-neutral-300 font-medium mb-3">{domain.tagline}</p>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4 line-clamp-2 font-normal">
                    {domain.description}
                  </p>

                  {/* Program Metadata: Duration & Mode */}
                  <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-2xl bg-black/40 border border-white/[0.06] text-xs">
                    <div className="flex items-center gap-1.5 text-neutral-300">
                      <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="font-mono text-[11px]">4, 8, 12 Wks</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-300">
                      <Laptop className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span className="font-mono text-[11px]">Online • Hybrid</span>
                    </div>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {domain.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] bg-white/[0.03] border border-white/[0.08] text-neutral-300 px-2.5 py-0.5 rounded-full font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {domain.techStack.length > 4 && (
                      <span className="text-[10px] bg-white/[0.03] border border-white/[0.08] text-neutral-500 px-2 py-0.5 rounded-full font-mono">
                        +{domain.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedDomain(domain)}
                    className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer font-medium"
                  >
                    View Syllabus &rarr;
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApply(domain.id)}
                    className="px-4 py-2 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-98"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Domain Syllabus Flyout Modal */}
      <AnimatePresence>
        {selectedDomain && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#0c0c0e] border border-white/[0.1] shadow-2xl p-6 sm:p-8"
            >
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-2xl">
                    {selectedDomain.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">{selectedDomain.name}</h3>
                    <p className="text-xs text-neutral-400 font-medium">{selectedDomain.tagline}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDomain(null)}
                  className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <p className="text-sm text-neutral-400 leading-relaxed font-normal">
                  {selectedDomain.description}
                </p>

                {/* Capstone */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                  <span className="text-[10px] uppercase font-semibold text-neutral-400 tracking-wider block mb-1 flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-cyan-400" /> Capstone Project
                  </span>
                  <p className="text-sm font-semibold text-white">
                    {selectedDomain.capstoneProject}
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-xs uppercase font-semibold text-neutral-400 tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-cyan-400" /> Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDomain.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-neutral-300 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Weekly Curriculum */}
                <div>
                  <h4 className="text-xs uppercase font-semibold text-neutral-400 tracking-wider mb-3 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> Weekly Syllabus &amp; Topics
                  </h4>
                  <div className="space-y-2">
                    {selectedDomain.curriculum.map((c) => (
                      <div
                        key={c.week}
                        className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/[0.06] text-neutral-300 font-semibold font-mono">
                            {c.week}
                          </span>
                          <span className="text-xs font-semibold text-white">{c.title}</span>
                        </div>
                        <span className="text-[11px] text-neutral-400 font-normal">
                          {c.topics.join(" • ")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-xs text-neutral-400">
                    Prerequisites: {selectedDomain.prerequisites.join(" • ")}
                  </span>
                  <button
                    onClick={() => {
                      const id = selectedDomain.id;
                      setSelectedDomain(null);
                      handleApply(id);
                    }}
                    className="px-6 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-semibold transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-98"
                  >
                    <span>Apply for this Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
