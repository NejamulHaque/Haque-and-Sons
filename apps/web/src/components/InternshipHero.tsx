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
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden pt-28 pb-16">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Student Session Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto p-3 rounded-2xl bg-gray-950/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl"
        >
          {session?.user ? (
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-gray-300">
                Logged in as <strong className="text-white">{session.user.name || session.user.email}</strong>
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Enrolled intern? Sign in to access your active sprint milestones &amp; profile.</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            {session?.user ? (
              <Link
                href="/profile"
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>My Internship Dashboard</span>
              </Link>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => openAuthModal({ mode: "signin" })}
                  className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-all cursor-pointer"
                >
                  Student Sign In
                </button>
                <button
                  type="button"
                  onClick={() => openAuthModal({ mode: "signup" })}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  Create Account
                </button>
              </>
            )}
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-semibold uppercase tracking-wider shadow-[0_0_25px_rgba(6,182,212,0.15)]"
        >
          <GraduationCap className="w-4 h-4 text-cyan-400" />
          <span>Haque &amp; Sons • College Internship Program 2026</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.1]"
        >
          Launch Your{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            Tech Career.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          Structured internship programs designed to transform students into industry-ready engineers.
          Work on real production architectures, receive direct mentorship, and earn verified credentials.
        </motion.p>

        {/* Key Highlight Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          {[
            { icon: Laptop, text: "Online • Offline • Hybrid", color: "text-cyan-400" },
            { icon: Coins, text: "Paid & Free Certification Tracks", color: "text-yellow-400" },
            { icon: Award, text: "Verifiable QR Certificate + LOR", color: "text-purple-400" },
            { icon: Building, text: "All Colleges & Branches Eligible", color: "text-emerald-400" },
          ].map((item) => (
            <span
              key={item.text}
              className="px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-gray-300 flex items-center gap-2 font-medium"
            >
              <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
              <span>{item.text}</span>
            </span>
          ))}
        </motion.div>

        {/* Hero CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <button
            onClick={handleApplyClick}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-sm font-bold uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#domains"
            className="px-7 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-sm font-semibold text-gray-200 hover:text-white transition-all flex items-center gap-2 hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Explore 11 Tracks</span>
          </a>

          <Link
            href="/verify"
            className="px-6 py-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 text-sm font-semibold text-gray-400 hover:text-white transition-all flex items-center gap-2"
          >
            <QrIcon className="w-4 h-4 text-purple-400" />
            <span>Verify Certificate</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
