import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2,
  Cpu,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Sparkles,
  FileCheck,
  Layers,
  ChevronRight,
  Award,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best B.Tech CSE Internship 2026 | Remote & Certified | Haque Studio",
  description:
    "Bridge the college syllabus gap with Haque Studio's B.Tech Computer Science Internship 2026. Master Next.js 16, DevSecOps & AI while building production capstones with verified certificates.",
  keywords: [
    "B.Tech Computer Science Internship 2026",
    "CSE internship for students",
    "computer science internship India",
    "BTech CSE remote internship",
    "Next.js DevSecOps internship",
    "college credit internship 2026",
    "software engineering internship for students",
  ],
  alternates: {
    canonical: "https://haquestudio.me/internships/btech-computer-science",
  },
  openGraph: {
    title: "Best B.Tech CSE Internship 2026 | Remote & Certified | Haque Studio",
    description:
      "Engineered specifically for B.Tech Computer Science undergraduates. Build enterprise production systems, satisfy university credits, and earn cryptographically verified credentials.",
    url: "https://haquestudio.me/internships/btech-computer-science",
    siteName: "Haque Studio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "B.Tech Computer Science Internship 2026 - Haque Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best B.Tech CSE Internship 2026 | Haque Studio",
    description:
      "Level up beyond rote university theory. Master Next.js 16, Neon DB & DevSecOps with verified certificates.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "B.Tech Computer Science Industrial Internship 2026",
  "description":
    "An industry-grade practicum designed for B.Tech Computer Science & IT students covering Next.js 16, DevSecOps, serverless databases, and enterprise AI orchestration.",
  "provider": {
    "@type": "Organization",
    "name": "Haque Studio",
    "sameAs": "https://haquestudio.me",
  },
  "educationalLevel": "Undergraduate B.Tech / B.E. / BCA / MCA",
  "timeToComplete": "P4W",
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "Online",
    "courseWorkload": "80-160 Hours",
  },
};

export default function BTechComputerScienceInternshipPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-6 uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span>Targeted for B.Tech CSE &amp; IT Undergrads • 2026 Cohort</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Best B.Tech CSE Internship 2026 | Remote &amp; Certified | Haque Studio
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Most college curriculums stop at rote syntax and outdated Java 8 theory. Our structured B.Tech Computer Science internship trains you in <strong className="text-cyan-400">Next.js 16</strong>, <strong className="text-cyan-400">Turborepo</strong>, and <strong className="text-cyan-400">DevSecOps</strong>, so you graduate with real production software in your portfolio and an official verifiable credential for college credit transfer.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/signup?domain=Full-Stack%20Web%20Development"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm md:text-base uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(6,182,212,0.35)] flex items-center justify-center gap-2"
            >
              <span>Apply for B.Tech CSE Track</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/internships"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 text-gray-300 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <span>View All 11 Specialized Tracks</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
          </div>

          {/* Quick trust metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-8 border-t border-white/10 text-left">
            <div>
              <span className="text-2xl md:text-3xl font-black text-cyan-400 block font-mono">100%</span>
              <span className="text-xs text-gray-400">Remote &amp; Self-Paced Sprints</span>
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-black text-white block font-mono">80-240</span>
              <span className="text-xs text-gray-400">Engineering Clock Hours</span>
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-black text-emerald-400 block font-mono">AICTE</span>
              <span className="text-xs text-gray-400">NEP 2020 Aligned Diary</span>
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-black text-cyan-300 block font-mono">QR Ledger</span>
              <span className="text-xs text-gray-400">Verifiable Online Credential</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SYLLABUS GAP: COLLEGE VS INDUSTRY */}
      <section className="py-20 px-6 border-t border-white/10 bg-zinc-950/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Why Traditional B.Tech Syllabi Fall Short in 2026
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
              Hiring managers aren&apos;t looking for textbook definitions of polymorphism. They look for candidates who understand serverless backends, edge caching, and modern CI/CD automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Outdated College Way */}
            <div className="p-8 rounded-2xl bg-zinc-950/90 border border-red-500/20 relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center font-bold mb-6">
                ✕
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Standard College CSE Curriculum
              </h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0 mt-0.5">•</span>
                  <span>Writing basic C/C++ sorting algorithms on lined practical lab paper.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0 mt-0.5">•</span>
                  <span>Generic copy-paste calculator or hospital management systems for major projects.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0 mt-0.5">•</span>
                  <span>Zero exposure to Git pull requests, edge deployment, or cloud databases.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0 mt-0.5">•</span>
                  <span>Unverifiable paper training letters rejected by top MNC background verification.</span>
                </li>
              </ul>
            </div>

            {/* The Haque Studio Way */}
            <div className="p-8 rounded-2xl bg-zinc-950/90 border border-cyan-500/30 relative overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.15)]">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold mb-6">
                ✓
              </div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span>Haque Studio CSE Practicum</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] uppercase font-mono font-bold">2026 Ready</span>
              </h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Build multi-tenant architectures using Next.js 16 App Router &amp; TypeScript.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Integrate Neon PostgreSQL, Drizzle ORM, and vector search with Pinecone.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Enforce DevSecOps security, rate limiting, and zero-trust authentication via Better Auth.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Permanent cryptographic certificate verified at <code className="text-cyan-300 font-mono">haquestudio.me/verify/[id]</code>.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE TECHNICAL MODULES */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              What You Engineer During the B.Tech CSE Sprint
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
              Every intern completes four intensive milestone sprints designed to simulate working inside a high-velocity software engineering studio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-cyan-500/40 transition-all">
              <Terminal className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">1. Enterprise Full-Stack Core</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Master Next.js 16 App Router, React 19 Server Components, Server Actions, and Tailwind CSS v4 to build responsive, accessible web portals.
              </p>
              <span className="text-[11px] font-mono text-cyan-400 uppercase font-semibold">Sprint 01 &bull; Architecture</span>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-cyan-500/40 transition-all">
              <Cpu className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">2. Serverless DB &amp; DevSecOps</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Model relational schemas with Drizzle ORM, connect to Neon serverless PostgreSQL, configure environment secret vaults, and enforce OWASP security.
              </p>
              <span className="text-[11px] font-mono text-blue-400 uppercase font-semibold">Sprint 02 &bull; Data &amp; Security</span>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-cyan-500/40 transition-all">
              <Zap className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">3. Capstone R&amp;D &amp; Exit Demo</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Deploy production builds onto Vercel edge infrastructure, pass automated test pipelines, submit AICTE logbooks, and receive executive endorsement.
              </p>
              <span className="text-[11px] font-mono text-purple-400 uppercase font-semibold">Sprint 03-04 &bull; Production</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. UNIVERSITY CREDIT & AICTE COMPLIANCE */}
      <section className="py-16 px-6 border-t border-white/10 bg-zinc-950/70">
        <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-10 border border-cyan-500/30 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% University Degree Credit Accepted</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Fulfills Mandatory Industrial Training (7th/8th Sem)
              </h2>
              <p className="text-sm text-gray-300 max-w-xl leading-relaxed">
                Whether you are affiliated with AKTU, IPU, VTU, Anna University, JNTU, or autonomous institutes, our structured 4, 8, or 12-week options provide official Offer Letters, AICTE Activity Diaries, and verifiable completion certificates compliant with NEP 2020.
              </p>
            </div>
            <Link
              href="/auth/signup?domain=Full-Stack%20Web%20Development"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider text-center shrink-0"
            >
              Start Registration
            </Link>
          </div>
        </div>
      </section>

      {/* 5. TOPIC CLUSTER: EXPLORE OTHER TRACKS */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Explore Other Specialized Tracks
            </h2>
            <p className="text-sm text-gray-400">
              Browse our high-impact topic clusters designed for undergraduate engineers and regional cohorts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/internships/delhi-ncr"
              className="p-6 rounded-2xl bg-zinc-950 border border-white/10 hover:border-cyan-500/50 hover:bg-zinc-900/60 transition-all group block"
            >
              <span className="text-xs font-mono text-cyan-400 uppercase font-semibold block mb-2">Regional Track</span>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                Internship in Delhi NCR for Students &rarr;
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Skip the painful Yellow Line metro rush to Gurgaon or Noida. Full remote practicum for DU, IPU, NSUT, and DTU students.
              </p>
            </Link>

            <Link
              href="/internships/web-development"
              className="p-6 rounded-2xl bg-zinc-950 border border-white/10 hover:border-cyan-500/50 hover:bg-zinc-900/60 transition-all group block"
            >
              <span className="text-xs font-mono text-cyan-400 uppercase font-semibold block mb-2">Core Development</span>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                Web Development with Certificate &rarr;
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Master React 19, Next.js 16, and full-stack PostgreSQL architectures with cryptographically verifiable public credentials.
              </p>
            </Link>

            <Link
              href="/internships/artificial-intelligence"
              className="p-6 rounded-2xl bg-zinc-950 border border-white/10 hover:border-cyan-500/50 hover:bg-zinc-900/60 transition-all group block"
            >
              <span className="text-xs font-mono text-cyan-400 uppercase font-semibold block mb-2">AI &amp; Data Track</span>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                AI &amp; ML Internship for Beginners &rarr;
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Learn Python backend, LangChain, vector databases, and Retrieval-Augmented Generation (RAG) through hands-on labs.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}