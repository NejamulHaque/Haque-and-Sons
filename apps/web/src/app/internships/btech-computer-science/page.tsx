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
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-black">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-neutral-300 text-xs font-medium mb-6 uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Targeted for B.Tech CSE &amp; IT Undergrads • 2026 Cohort</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-white">
            Best B.Tech CSE Internship 2026 | Remote &amp; Certified | Haque Studio
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            Most college curriculums stop at rote syntax and outdated Java 8 theory. Our structured B.Tech Computer Science internship trains you in <strong className="text-white font-semibold">Next.js 16</strong>, <strong className="text-white font-semibold">Turborepo</strong>, and <strong className="text-white font-semibold">DevSecOps</strong>, so you graduate with real production software in your portfolio and an official verifiable credential for college credit transfer.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/auth/signup?domain=Full-Stack%20Web%20Development"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 font-semibold text-sm transition-all active:scale-98 shadow-sm flex items-center justify-center gap-2"
            >
              <span>Apply for B.Tech CSE Track</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/internships"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] text-white font-medium text-sm transition-all flex items-center justify-center gap-2 backdrop-blur-md active:scale-98"
            >
              <span>View All 11 Specialized Tracks</span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </Link>
          </div>

          {/* Quick trust metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-8 border-t border-white/[0.08] text-left">
            <div>
              <span className="text-2xl md:text-3xl font-bold text-white block tracking-tight font-mono">100%</span>
              <span className="text-xs text-neutral-400">Remote &amp; Self-Paced Sprints</span>
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-bold text-white block tracking-tight font-mono">80-240</span>
              <span className="text-xs text-neutral-400">Engineering Clock Hours</span>
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-bold text-emerald-400 block tracking-tight font-mono">AICTE</span>
              <span className="text-xs text-neutral-400">NEP 2020 Aligned Diary</span>
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-bold text-cyan-300 block tracking-tight font-mono">QR Ledger</span>
              <span className="text-xs text-neutral-400">Verifiable Online Credential</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SYLLABUS GAP: COLLEGE VS INDUSTRY */}
      <section className="py-20 px-6 border-t border-white/[0.08] bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">
              Why Traditional B.Tech Syllabi Fall Short in 2026
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-normal">
              Hiring managers aren&apos;t looking for textbook definitions of polymorphism. They look for candidates who understand serverless backends, edge caching, and modern CI/CD automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Outdated College Way */}
            <div className="p-8 rounded-3xl bg-[#0c0c0e]/80 border border-white/[0.08] relative overflow-hidden">
              <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-neutral-400 flex items-center justify-center font-bold mb-6">
                ✕
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                Standard College CSE Curriculum
              </h3>
              <ul className="space-y-3 text-sm text-neutral-400 font-normal">
                <li className="flex items-start gap-2.5">
                  <span className="text-neutral-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>Writing basic C/C++ sorting algorithms on lined practical lab paper.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-neutral-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>Generic copy-paste calculator or hospital management systems for major projects.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-neutral-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>Zero exposure to Git pull requests, edge deployment, or cloud databases.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-neutral-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>Unverifiable paper training letters rejected by top MNC background verification.</span>
                </li>
              </ul>
            </div>

            {/* The Haque Studio Way */}
            <div className="p-8 rounded-3xl bg-[#0c0c0e]/95 border border-white/[0.2] relative overflow-hidden shadow-xl ring-1 ring-white/[0.1]">
              <div className="w-10 h-10 rounded-2xl bg-white/[0.08] border border-white/[0.12] text-white flex items-center justify-center font-bold mb-6">
                ✓
              </div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2 tracking-tight">
                <span>Haque Studio CSE Practicum</span>
                <span className="px-2 py-0.5 rounded-full bg-white/[0.08] text-neutral-300 text-[10px] uppercase font-mono font-semibold">2026 Ready</span>
              </h3>
              <ul className="space-y-3 text-sm text-neutral-300 font-normal">
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
      <section className="py-20 px-6 border-t border-white/[0.08] bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">
              What You Engineer During the B.Tech CSE Sprint
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-normal">
              Every intern completes four intensive milestone sprints designed to simulate working inside a high-velocity software engineering studio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-[#0c0c0e]/80 border border-white/[0.08] hover:border-white/[0.18] transition-all">
              <Terminal className="w-7 h-7 text-cyan-400 mb-4" />
              <h3 className="text-base font-semibold text-white mb-2 tracking-tight">1. Enterprise Full-Stack Core</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4 font-normal">
                Master Next.js 16 App Router, React 19 Server Components, Server Actions, and Tailwind CSS v4 to build responsive, accessible web portals.
              </p>
              <span className="text-[11px] font-mono text-neutral-400 uppercase font-medium">Sprint 01 &bull; Architecture</span>
            </div>

            <div className="p-7 rounded-3xl bg-[#0c0c0e]/80 border border-white/[0.08] hover:border-white/[0.18] transition-all">
              <Cpu className="w-7 h-7 text-cyan-400 mb-4" />
              <h3 className="text-base font-semibold text-white mb-2 tracking-tight">2. Serverless DB &amp; DevSecOps</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4 font-normal">
                Model relational schemas with Drizzle ORM, connect to Neon serverless PostgreSQL, configure environment secret vaults, and enforce OWASP security.
              </p>
              <span className="text-[11px] font-mono text-neutral-400 uppercase font-medium">Sprint 02 &bull; Data &amp; Security</span>
            </div>

            <div className="p-7 rounded-3xl bg-[#0c0c0e]/80 border border-white/[0.08] hover:border-white/[0.18] transition-all">
              <Zap className="w-7 h-7 text-cyan-400 mb-4" />
              <h3 className="text-base font-semibold text-white mb-2 tracking-tight">3. Capstone R&amp;D &amp; Exit Demo</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4 font-normal">
                Deploy production builds onto Vercel edge infrastructure, pass automated test pipelines, submit AICTE logbooks, and receive executive endorsement.
              </p>
              <span className="text-[11px] font-mono text-neutral-400 uppercase font-medium">Sprint 03-04 &bull; Production</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. UNIVERSITY CREDIT & AICTE COMPLIANCE */}
      <section className="py-16 px-6 border-t border-white/[0.08] bg-black">
        <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-10 border border-white/[0.1] bg-[#0c0c0e]/95 relative shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-emerald-400 text-xs font-mono font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% University Degree Credit Accepted</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Fulfills Mandatory Industrial Training (7th/8th Sem)
              </h2>
              <p className="text-sm text-neutral-400 max-w-xl leading-relaxed font-normal">
                Whether you are affiliated with AKTU, IPU, VTU, Anna University, JNTU, or autonomous institutes, our structured 4, 8, or 12-week options provide official Offer Letters, AICTE Activity Diaries, and verifiable completion certificates compliant with NEP 2020.
              </p>
            </div>
            <Link
              href="/auth/signup?domain=Full-Stack%20Web%20Development"
              className="px-6 py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 font-semibold text-xs transition-all text-center shrink-0 active:scale-98 shadow-sm"
            >
              Start Registration
            </Link>
          </div>
        </div>
      </section>

      {/* 5. TOPIC CLUSTER: EXPLORE OTHER TRACKS */}
      <section className="py-20 px-6 border-t border-white/[0.08] bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
              Explore Other Specialized Tracks
            </h2>
            <p className="text-sm text-neutral-400 font-normal">
              Browse our high-impact topic clusters designed for undergraduate engineers and regional cohorts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/internships/delhi-ncr"
              className="p-7 rounded-3xl bg-[#0c0c0e]/80 border border-white/[0.08] hover:border-white/[0.18] transition-all group block"
            >
              <span className="text-xs font-mono text-cyan-400 uppercase font-medium block mb-2">Regional Track</span>
              <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors mb-2 tracking-tight">
                Internship in Delhi NCR for Students &rarr;
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                Skip the painful Yellow Line metro rush to Gurgaon or Noida. Full remote practicum for DU, IPU, NSUT, and DTU students.
              </p>
            </Link>

            <Link
              href="/internships/web-development"
              className="p-7 rounded-3xl bg-[#0c0c0e]/80 border border-white/[0.08] hover:border-white/[0.18] transition-all group block"
            >
              <span className="text-xs font-mono text-cyan-400 uppercase font-medium block mb-2">Core Development</span>
              <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors mb-2 tracking-tight">
                Web Development with Certificate &rarr;
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                Master React 19, Next.js 16, and full-stack PostgreSQL architectures with cryptographically verifiable public credentials.
              </p>
            </Link>

            <Link
              href="/internships/artificial-intelligence"
              className="p-7 rounded-3xl bg-[#0c0c0e]/80 border border-white/[0.08] hover:border-white/[0.18] transition-all group block"
            >
              <span className="text-xs font-mono text-cyan-400 uppercase font-medium block mb-2">AI &amp; Data Track</span>
              <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors mb-2 tracking-tight">
                AI &amp; ML Internship for Beginners &rarr;
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                Learn Python backend, LangChain, vector databases, and Retrieval-Augmented Generation (RAG) through hands-on labs.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}