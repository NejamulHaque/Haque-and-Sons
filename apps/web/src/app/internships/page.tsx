"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Sparkles,
  Award,
  Laptop,
  Search,
  ArrowRight,
  Coins,
  QrCode as QrIcon,
  ChevronDown,
  ChevronUp,
  Building,
  User,
  ShieldCheck,
} from "lucide-react";
import { INTERNSHIP_DOMAINS } from "@/lib/domains";
import { SpotlightCard } from "@/components/SpotlightCard";
import { CertificateRenderer, type CertificateData } from "@/components/CertificateRenderer";
import { InternshipApplicationModal } from "@/components/InternshipApplicationModal";
import { openAuthModal } from "@/components/AuthModal";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CATEGORIES = [
  "All Tracks",
  "Development",
  "AI & Data",
  "Mobile",
  "DevOps & Security",
  "Design",
] as const;

export default function InternshipsPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<string>("All Tracks");
  const [searchQuery, setSearchQuery] = useState("");

  // Application Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDomainId, setActiveDomainId] = useState<string>("full-stack-web");
  const [expandedDomainId, setExpandedDomainId] = useState<string | null>(null);

  const handleOpenApply = (domainId?: string) => {
    const target = domainId || "full-stack-web";
    if (session?.user) {
      router.push(`/profile?domain=${encodeURIComponent(target)}`);
    } else {
      openAuthModal({ mode: "signup", domain: target });
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

  const previewCertificateData: CertificateData = {
    id: "HS-INT-2026-TMU-001",
    studentName: "Nejamul Haque",
    studentEmail: "nejamulhaque.works@gmail.com",
    domain: "Full-Stack Web Development",
    mode: "Offline Studio Track",
    internshipType: "Industry Capstone & Production Architecture",
    college: "Teerthanker Mahaveer University",
    duration: "12 Weeks",
    grade: "Distinction (Top 1%)",
    issueDate: "2026-09-04T00:00:00.000Z",
    signatoryTitle: "Nejamul Haque, Founder & Lead Engineer",
    status: "Valid",
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-white pt-24 pb-20">
      {/* Background ambient lighting */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative px-6 max-w-7xl mx-auto text-center pt-4 pb-16">
        {/* Top Student Portal Quick Access Bar */}
        <div className="max-w-4xl mx-auto mb-8 p-3 rounded-2xl bg-gray-950/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
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
              <span>Are you an enrolled intern? Sign in to access your active sprint & profile.</span>
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
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider shadow-sm">
            <GraduationCap className="w-4 h-4" />
            <span>Haque & Sons • College Internship Program 2026</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight max-w-5xl mx-auto">
            Build Production Software.{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Earn Verified Credentials.
            </span>
          </h1>

          <p className="text-gray-400 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            Hands-on virtual, offline, and hybrid internships for college students across all engineering domains. Work on real production architectures, receive direct code mentorship from Nejamul Haque, and earn tamper-proof verifiable certificates.
          </p>

          {/* Quick Stats Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-gray-300 flex items-center gap-1.5 font-medium">
              <Laptop className="w-3.5 h-3.5 text-cyan-400" />
              <span>Online • Offline • Hybrid</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-gray-300 flex items-center gap-1.5 font-medium">
              <Coins className="w-3.5 h-3.5 text-yellow-400" />
              <span>Paid & Free Certification Tracks</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-gray-300 flex items-center gap-1.5 font-medium">
              <Award className="w-3.5 h-3.5 text-purple-400" />
              <span>Verifiable QR Certificate + LOR</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-gray-300 flex items-center gap-1.5 font-medium">
              <Building className="w-3.5 h-3.5 text-emerald-400" />
              <span>All Colleges & Branches Eligible</span>
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => handleOpenApply("full-stack-web")}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-sm font-bold uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center gap-2 cursor-pointer"
            >
              <span>Apply for Internship</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href="/verify"
              className="px-6 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-sm font-semibold text-gray-300 hover:text-white transition-all flex items-center gap-2"
            >
              <QrIcon className="w-4 h-4 text-cyan-400" />
              <span>Verify Existing Certificate</span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Domain Tracks Filter & Catalog */}
      <section className="px-6 max-w-7xl mx-auto py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Explore 11+ Domain Tracks
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select your domain of interest and build enterprise-grade capstones.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search domain or tech stack..."
              className="w-full bg-black/60 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all font-mono"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    : "bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Domains Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDomains.map((domain) => {
            const isExpanded = expandedDomainId === domain.id;

            return (
              <SpotlightCard
                key={domain.id}
                className="p-7 border-white/10 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon, Category & Popular badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl shadow-inner">
                      {domain.icon}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {domain.popular && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-yellow-400">
                          Popular
                        </span>
                      )}
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-cyan-300">
                        {domain.category}
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg font-bold text-white mb-1.5">{domain.name}</h3>
                  <p className="text-xs text-cyan-400/90 font-medium mb-3">{domain.tagline}</p>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">{domain.description}</p>

                  {/* Capstone Project Preview */}
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 mb-4">
                    <span className="text-[10px] uppercase font-bold text-purple-400 block mb-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Capstone Project
                    </span>
                    <p className="text-xs font-semibold text-gray-200">
                      {domain.capstoneProject}
                    </p>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {domain.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] bg-white/[0.03] border border-white/10 text-gray-300 px-2 py-0.5 rounded-md font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Expandable Syllabus */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                      <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider block">
                        Weekly Syllabus Overview
                      </span>
                      {domain.curriculum.map((c) => (
                        <div key={c.week} className="text-xs bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                          <span className="font-bold text-white block mb-0.5">
                            {c.week}: {c.title}
                          </span>
                          <span className="text-[11px] text-gray-400">
                            {c.topics.join(" • ")}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Actions: View Syllabus & Apply Now */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setExpandedDomainId(isExpanded ? null : domain.id)}
                    className="text-xs text-gray-400 hover:text-white font-medium flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? "Hide Syllabus" : "View Syllabus"}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenApply(domain.id)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </section>

      {/* Official Certificate Credential Showcase */}
      <section className="px-6 max-w-7xl mx-auto py-20 border-t border-white/10 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto mb-10 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Industry Credential</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Official Certificate of Completion
          </h2>
          <p className="mt-3 text-gray-400 text-sm sm:text-base leading-relaxed">
            Every graduate earns an immutable, cryptographic certificate verified on our public ledger and shareable on LinkedIn. Sample credential awarded to <strong className="text-white">Nejamul Haque</strong> of <strong className="text-cyan-300">Teerthanker Mahaveer University</strong>.
          </p>
        </div>

        {/* The Live Certificate Canvas */}
        <div className="max-w-4xl mx-auto relative z-10 shadow-[0_0_80px_rgba(6,182,212,0.15)] rounded-3xl p-1 bg-gradient-to-b from-cyan-500/20 via-white/5 to-purple-500/20">
          <CertificateRenderer certificate={previewCertificateData} showActions={false} />
        </div>
      </section>

      {/* Program Process & Steps */}
      <section className="px-6 max-w-7xl mx-auto py-16 border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How It Works in 4 Simple Steps
          </h2>
          <p className="mt-2 text-gray-400 text-sm">
            From application to verified industry credential on your LinkedIn profile.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <span className="text-2xl font-black text-cyan-400 font-mono">01</span>
            <h4 className="text-base font-bold text-white">Apply for Your Track</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Pick your preferred domain, mode (Online/Offline/Hybrid), and duration (4, 8, or 12 weeks).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <span className="text-2xl font-black text-purple-400 font-mono">02</span>
            <h4 className="text-base font-bold text-white">Receive Project Kit</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Get direct access to project requirements, GitHub starter repos, and architectural guidelines.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <span className="text-2xl font-black text-emerald-400 font-mono">03</span>
            <h4 className="text-base font-bold text-white">Build & Code Review</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Ship your capstone with mentorship from Nejamul Haque and automated CI/CD deployment.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <span className="text-2xl font-black text-yellow-400 font-mono">04</span>
            <h4 className="text-base font-bold text-white">Get Verified & LOR</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Receive your official cryptographic QR certificate, public verification link, and LOR for top performers.
            </p>
          </div>
        </div>
      </section>

      {/* Program FAQ */}
      <section className="px-6 max-w-4xl mx-auto py-16 border-t border-white/10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Everything you need to know about eligibility, timeline, and certificates.
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
            <h4 className="text-sm font-bold text-white mb-1.5">
              Who is eligible to apply for Haque & Sons internships?
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Students from any college, university, branch, or semester (B.Tech, BCA, MCA, B.Sc, Diploma, etc.) as well as recent graduates looking to build a production portfolio are eligible.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
            <h4 className="text-sm font-bold text-white mb-1.5">
              What is the difference between Paid and Free tracks?
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              The <strong>Free Track</strong> focuses on project-based learning and awards full verified industry credentials upon capstone delivery with zero fees. The <strong>Paid Track</strong> is performance-stipend eligible for candidates contributing to live client modules.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
            <h4 className="text-sm font-bold text-white mb-1.5">
              How does the certificate verification work?
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Each certificate is assigned a unique cryptographic identifier (e.g. <code>HS-INT-2026-A8F9B2</code>) and an embedded QR code linking directly to our public verification portal on <code>haqueandsons.vercel.app/verify/[id]</code>.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
            <h4 className="text-sm font-bold text-white mb-1.5">
              Can I do this internship alongside my college classes?
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Yes, our virtual internships are designed with asynchronous milestones so you can manage your college schedule and exams flexibly.
            </p>
          </div>
        </div>

        {/* Bottom Apply CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => handleOpenApply("full-stack-web")}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)] cursor-pointer"
          >
            Start Your Application Today
          </button>
        </div>
      </section>

      {/* Application Modal */}
      <InternshipApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultDomainId={activeDomainId}
        defaultMode="Online"
        defaultType="Free"
      />
    </div>
  );
}
