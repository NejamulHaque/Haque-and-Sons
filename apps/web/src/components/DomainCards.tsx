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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Structured Tracks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Explore 11+ Engineering{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Domains
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-lg leading-relaxed">
            Select your domain of interest, explore the weekly syllabus, and build production capstones.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search track or tech stack..."
            className="w-full bg-black/60 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all font-mono"
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
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isSelected
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] font-bold"
                  : "bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.06]"
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
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <SpotlightCard className="p-7 h-full flex flex-col justify-between border-white/10 bg-gray-950/70 backdrop-blur-xl group hover:border-cyan-500/30 transition-all">
                <div>
                  {/* Top: Icon & Tags */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-3xl shadow-inner group-hover:scale-105 transition-transform">
                      {domain.icon}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {domain.popular && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 flex items-center gap-1">
                          <Zap className="w-2.5 h-2.5" /> Popular
                        </span>
                      )}
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-cyan-300">
                        {domain.category}
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                    {domain.name}
                  </h3>
                  <p className="text-xs text-cyan-400 font-medium mb-3">{domain.tagline}</p>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">
                    {domain.description}
                  </p>

                  {/* Program Metadata: Duration & Mode */}
                  <div className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-xl bg-black/40 border border-white/5 text-xs">
                    <div className="flex items-center gap-1.5 text-gray-300">
                      <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="font-mono text-[11px]">4, 8, 12 Wks</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-300">
                      <Laptop className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="font-mono text-[11px]">Online • Hybrid</span>
                    </div>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {domain.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] bg-white/[0.03] border border-white/10 text-gray-300 px-2 py-0.5 rounded-md font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {domain.techStack.length > 4 && (
                      <span className="text-[10px] bg-white/[0.03] border border-white/10 text-gray-500 px-2 py-0.5 rounded-md font-mono">
                        +{domain.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedDomain(domain)}
                    className="text-xs text-gray-400 hover:text-cyan-300 transition-colors cursor-pointer font-medium"
                  >
                    View Syllabus &rarr;
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApply(domain.id)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Domain Syllabus Flyout Modal */}
      <AnimatePresence>
        {selectedDomain && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl bg-gray-950 border border-white/10 shadow-2xl p-6 sm:p-8"
            >
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-3xl">
                    {selectedDomain.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedDomain.name}</h3>
                    <p className="text-xs text-cyan-400 font-medium">{selectedDomain.tagline}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDomain(null)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <p className="text-sm text-gray-300 leading-relaxed">
                  {selectedDomain.description}
                </p>

                {/* Capstone */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/5 border border-purple-500/20">
                  <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider block mb-1 flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5" /> Capstone Project
                  </span>
                  <p className="text-sm font-semibold text-white">
                    {selectedDomain.capstoneProject}
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-xs uppercase font-bold text-cyan-400 tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5" /> Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDomain.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-gray-200 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Weekly Curriculum */}
                <div>
                  <h4 className="text-xs uppercase font-bold text-cyan-400 tracking-wider mb-3 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Weekly Syllabus &amp; Topics
                  </h4>
                  <div className="space-y-2.5">
                    {selectedDomain.curriculum.map((c) => (
                      <div
                        key={c.week}
                        className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 font-bold font-mono">
                            {c.week}
                          </span>
                          <span className="text-xs font-bold text-white">{c.title}</span>
                        </div>
                        <span className="text-[11px] text-gray-400">
                          {c.topics.join(" • ")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Prerequisites: {selectedDomain.prerequisites.join(" • ")}
                  </span>
                  <button
                    onClick={() => {
                      const id = selectedDomain.id;
                      setSelectedDomain(null);
                      handleApply(id);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
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
