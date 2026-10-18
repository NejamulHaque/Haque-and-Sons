"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, HelpCircle } from "lucide-react";

interface FaqItemData {
  question: string;
  answer: string;
}

const FAQ_LIST: FaqItemData[] = [
  {
    question: "Who can apply for Haque & Sons internship programs?",
    answer:
      "Students from any college, university, branch, or semester (B.Tech, BCA, MCA, B.Sc, Diploma, etc.) as well as recent graduates looking to build a production portfolio are eligible. There are no geographic restrictions — students from across India and internationally are welcomed.",
  },
  {
    question: "Is this internship paid or free?",
    answer:
      "We offer two distinct tracks: The Free Track focuses on project-based learning and awards full verified industry credentials upon capstone delivery with zero fees. The Paid Track is performance-stipend eligible for candidates contributing to live client modules and includes additional 1-on-1 mentorship sessions.",
  },
  {
    question: "What's the required time commitment?",
    answer:
      "Our internships are designed with asynchronous milestones so you can manage your college classes and exams flexibly. Most students complete their tracks dedicating 2-3 hours per day alongside their regular academic schedule.",
  },
  {
    question: "Do I need prior industry experience?",
    answer:
      "No prior corporate experience is required! While foundational familiarity with programming basics (e.g. JavaScript, Python, or Java) is helpful, our weekly structured curriculum and starter repositories guide you through modern architectures step-by-step.",
  },
  {
    question: "What happens after completion?",
    answer:
      "Upon delivering and defending your capstone project, you receive an immutable cryptographic QR certificate verified on our public ledger, an official Letter of Recommendation (for top performers), and your capstone project deployed live to edge networks to showcase on your resume.",
  },
];

function FaqItem({ item, isOpen, onClick }: { item: FaqItemData; isOpen: boolean; onClick: () => void }) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "border-cyan-500/40 bg-cyan-950/15 shadow-[0_0_30px_rgba(6,182,212,0.1)]"
          : "border-white/10 bg-white/[0.02] hover:border-white/20"
      }`}
    >
      <button
        type="button"
        onClick={onClick}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer"
      >
        <span className="text-sm sm:text-base font-bold text-white pr-2">{item.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0"
        >
          <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? "text-cyan-400" : "text-gray-500"}`} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5">
              <div className="h-px bg-gradient-to-r from-cyan-500/30 via-white/5 to-transparent mb-4" />
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function InternshipFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="px-4 sm:px-6 max-w-4xl mx-auto py-24 border-t border-white/5 relative">
      <div className="text-center mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Got Questions?{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            We&apos;ve Got Answers.
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto">
          Everything you need to know about eligibility, tracks, timeline, and certificates.
        </p>
      </div>

      <div className="space-y-3.5">
        {FAQ_LIST.map((faq, i) => (
          <FaqItem
            key={faq.question}
            item={faq}
            isOpen={openIndex === i}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}
