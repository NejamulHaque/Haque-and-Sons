"use client";

import { motion } from "framer-motion";
import { GraduationCap, ArrowRight, Laptop, Coins, Award, Building, Sparkles, User, QrCode as QrIcon } from "lucide-react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { openAuthModal } from "@/components/AuthModal";

export function InternshipHero() {
  const { data: session } = useSession();

  const handleApplyClick = () => {
    const target = "full-stack-web";
    if (session?.user) {
      window.location.href = `/profile?domain=${encodeURIComponent(target)}`;
    } else {
      openAuthModal({ mode: "signup", domain: target });
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden pt-28 pb-16 bg-black">
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Student Session Bar */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto p-2.5 px-4 rounded-full bg-[#0c0c0e]/80 border border-white/[0.08] backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm"
        >
          {session?.user ? (
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-neutral-400">
                Logged in as <strong className="text-white font-medium">{session.user.name || session.user.email}</strong>
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Enrolled intern? Sign in to access your active sprint milestones &amp; profile.</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            {session?.user ? (
              <Link
                href="/profile"
                className="px-4 py-1.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-medium transition-all shadow-sm flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Intern Dashboard</span>
              </Link>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => openAuthModal({ mode: "signin" })}
                  className="px-3.5 py-1.5 rounded-full text-neutral-400 hover:text-white text-xs font-medium transition-colors cursor-pointer border-none bg-transparent"
                >
                  Student Sign In
                </button>
                <button
                  type="button"
                  onClick={() => openAuthModal({ mode: "signup" })}
                  className="px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] text-white text-xs font-medium transition-all cursor-pointer"
                >
                  Create Account
                </button>
              </>
            )}
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-neutral-300 text-xs font-medium uppercase tracking-wider"
        >
          <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Haque &amp; Sons • College Internship Program 2026</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.08]"
        >
          Launch Your{" "}
          <span className="bg-gradient-to-b from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            Tech Career.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          Structured internship programs designed to transform students into industry-ready engineers.
          Work on real production architectures, receive direct mentorship, and earn verified credentials.
        </motion.p>

        {/* Key Highlight Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2.5 pt-1"
        >
          {[
            { icon: Laptop, text: "Online • Offline • Hybrid", color: "text-cyan-400" },
            { icon: Coins, text: "Paid & Free Certification Tracks", color: "text-yellow-400" },
            { icon: Award, text: "Verifiable QR Certificate + LOR", color: "text-neutral-300" },
            { icon: Building, text: "All Colleges & Branches Eligible", color: "text-emerald-400" },
          ].map((item) => (
            <span
              key={item.text}
              className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-neutral-300 flex items-center gap-2 font-medium"
            >
              <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
              <span>{item.text}</span>
            </span>
          ))}
        </motion.div>

        {/* Hero CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3.5 pt-4"
        >
          <button
            onClick={handleApplyClick}
            className="px-7 py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 text-sm font-semibold transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-98"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#domains"
            className="px-7 py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] text-sm font-medium text-white transition-all flex items-center gap-2 active:scale-98 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Explore 11 Tracks</span>
          </a>

          <Link
            href="/verify"
            className="px-6 py-3.5 rounded-full text-sm font-medium text-neutral-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <QrIcon className="w-4 h-4 text-cyan-400" />
            <span>Verify Certificate</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
