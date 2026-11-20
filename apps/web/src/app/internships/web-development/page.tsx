import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2,
  Layers,
  Database,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  Award,
  ChevronRight,
  Terminal,
  Cpu,
  Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Web Dev Internship | Next.js 16 & React 19 | Verified Certificate",
  description:
    "Join our high-impact Web Development Internship with Certificate. Master Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, and Neon PostgreSQL. Get cryptographically verified.",
  keywords: [
    "Web Development Internship with Certificate",
    "Next.js 16 internship",
    "React 19 full stack internship",
    "verified web development certificate",
    "frontend backend internship India",
    "TypeScript internship 2026",
    "coding internship with certificate",
  ],
  alternates: {
    canonical: "https://haquestudio.me/internships/web-development",
  },
  openGraph: {
    title: "Web Dev Internship | Next.js 16 & React 19 | Verified Certificate",
    description:
      "Build production-grade web systems. Master Next.js 16 Server Components, Drizzle ORM, and Better Auth with verified credentials.",
    url: "https://haquestudio.me/internships/web-development",
    siteName: "Haque Studio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Web Development Internship with Certificate - Haque Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Dev Internship | Next.js 16 & React 19 | Haque Studio",
    description:
      "Build real-world full-stack web software. Earn a cryptographically verifiable certificate.",
    images: ["/og-image.png"],
  },
};

const webDevJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Full-Stack Web Development Practicum & Internship",
  "description":
    "An enterprise curriculum covering Next.js 16 App Router, React 19, TypeScript, Drizzle ORM, Neon PostgreSQL, and Better Auth.",
  "provider": {
    "@type": "Organization",
    "name": "Haque Studio",
    "sameAs": "https://haquestudio.me",
  },
  "educationalLevel": "Intermediate to Advanced",
  "timeToComplete": "P4W",
  "offers": {
    "@type": "Offer",
    "category": "Certified Full-Stack Web Development Practicum",
  },
};

export default function WebDevelopmentInternshipPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webDevJsonLd) }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-black">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-neutral-300 text-xs font-medium mb-6 uppercase tracking-wider">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Full-Stack Track &bull; Next.js 16 &bull; React 19 &bull; Neon DB</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-white">
            Web Dev Internship | Next.js 16 &amp; React 19 | Verified Certificate
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            Move past basic HTML/CSS clones and outdated MERN tutorials. Learn the modern 2026 web stack: <strong className="text-white font-semibold">Next.js 16 App Router</strong>, <strong className="text-white font-semibold">React 19 Server Components</strong>, <strong className="text-white font-semibold">Tailwind CSS v4</strong>, and <strong className="text-white font-semibold">Neon Serverless PostgreSQL</strong>. Graduate with an official, cryptographically verifiable certificate.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/auth/signup?domain=Full-Stack%20Web%20Development"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 font-semibold text-sm transition-all active:scale-98 shadow-sm flex items-center justify-center gap-2"
            >
              <span>Apply for Web Dev Track</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#tech-matrix"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] text-white font-medium text-sm transition-all flex items-center justify-center gap-2 backdrop-blur-md active:scale-98"
            >
              <span>Explore Tech Matrix</span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </a>
          </div>

          {/* Quick Credential Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-8 border-t border-white/[0.08] text-left">
            <div>
              <span className="text-2xl md:text-3xl font-bold text-white block tracking-tight font-mono">React 19</span>
              <span className="text-xs text-neutral-400">Server Actions &amp; Hooks</span>
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-bold text-white block tracking-tight font-mono">Next.js 16</span>
              <span className="text-xs text-neutral-400">App Router &amp; Turbopack</span>
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-bold text-white block tracking-tight font-mono">Postgres</span>
              <span className="text-xs text-neutral-400">Drizzle ORM + Neon</span>
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-bold text-emerald-400 block tracking-tight font-mono">QR Proof</span>
              <span className="text-xs text-neutral-400">Verified Online Ledger</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 2026 MODERN WEB TECH MATRIX */}
      <section id="tech-matrix" className="py-20 px-6 border-t border-white/[0.08] bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">
              The 2026 Production Tech Stack You Will Master
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-base font-normal leading-relaxed">
              Say goodbye to monolithic Express boilerplate. We teach the architecture powering the next generation of Silicon Valley startups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-[#0c0c0e]/80 border border-white/[0.08] hover:border-white/[0.18] transition-all">
              <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-cyan-400 flex items-center justify-center font-bold mb-5">
                <Globe className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2 tracking-tight">Next.js 16 App Router</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                Stream server-rendered HTML at the edge, eliminate hydration waterfalls with React Server Components, and build ultra-fast web pages.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#0c0c0e]/80 border border-white/[0.08] hover:border-white/[0.18] transition-all">
              <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-cyan-400 flex items-center justify-center font-bold mb-5">
                <Database className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2 tracking-tight">Neon DB &amp; Drizzle ORM</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                Type-safe SQL schemas, zero-downtime database migrations, connection pooling, and serverless PostgreSQL on edge compute.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#0c0c0e]/80 border border-white/[0.08] hover:border-white/[0.18] transition-all">
              <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-cyan-400 flex items-center justify-center font-bold mb-5">
                <Lock className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2 tracking-tight">Better Auth &amp; Security</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                Implement production session tokens, OAuth providers (GitHub/Google), rate-limiting middleware, and CSRF protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STUDENT DASHBOARD & HUD MOCKUP SECTION */}
      <section className="py-20 px-6 border-t border-white/[0.08] bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">
              Built on Our Studio Engineering Command HUD
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-base font-normal leading-relaxed">
              Track your milestones, submit pull requests, interact with Irus AI copilot, and download your verified credentials inside your personalized dashboard.
            </p>
          </div>

          {/* Interactive UI Mockup Container */}
          <div className="rounded-3xl border border-white/[0.1] bg-[#0c0c0e]/95 p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white/20 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20 inline-block" />
                <span className="text-xs font-mono text-neutral-400 ml-2">haquestudio.me/profile/hud</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-white/[0.06] text-emerald-400 text-[10px] font-mono font-medium">
                Live Sprints Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.08]">
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold block mb-1">Step 01 &bull; Appointment</span>
                <h4 className="text-sm font-semibold text-white mb-2 tracking-tight">Executive 1-Page Offer Letter</h4>
                <p className="text-xs text-neutral-400 mb-3 font-normal leading-relaxed">Instant official appointment letter with QR authentication code and college clearance.</p>
                <span className="px-2.5 py-1 rounded-full bg-white/[0.04] text-neutral-300 text-[10px] font-mono">Unlocked &bull; PDF Ready</span>
              </div>

              <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.08]">
                <span className="text-[10px] font-mono text-neutral-400 uppercase font-semibold block mb-1">Step 02 &bull; Engineering Sprints</span>
                <h4 className="text-sm font-semibold text-white mb-2 tracking-tight">Milestone Capstone Tracker</h4>
                <p className="text-xs text-neutral-400 mb-3 font-normal leading-relaxed">Weekly architecture standups, GitHub pull request verification, and live demo reviews.</p>
                <span className="px-2.5 py-1 rounded-full bg-white/[0.04] text-neutral-300 text-[10px] font-mono">Week 1-4 Roadmaps</span>
              </div>

              <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.08]">
                <span className="text-[10px] font-mono text-neutral-400 uppercase font-semibold block mb-1">Step 03 &bull; Cryptographic Clearance</span>
                <h4 className="text-sm font-semibold text-white mb-2 tracking-tight">Verified Public Certificate</h4>
                <p className="text-xs text-neutral-400 mb-3 font-normal leading-relaxed">Tamper-proof certificate verifiable anywhere in the world on our public ledger.</p>
                <span className="px-2.5 py-1 rounded-full bg-white/[0.04] text-emerald-400 text-[10px] font-mono">Ledger Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VERIFIABLE CERTIFICATE SECTION */}
      <section className="py-20 px-6 border-t border-white/[0.08] bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-cyan-400 flex items-center justify-center mx-auto mb-6">
            <Award className="w-6 h-6 text-cyan-400" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">
            A Certificate That Employers Actually Believe
          </h2>

          <p className="text-neutral-400 text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            Generic PDF certificates are faked every day. Every Haque Studio certificate includes a dynamic cryptographic QR code linking directly to our public verification registry at <code className="text-cyan-300 font-mono">haquestudio.me/verify/[id]</code>, displaying the candidate&apos;s name, project details, and verifiable timestamps.
          </p>

          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/verify"
              className="px-6 py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] text-white text-xs font-medium uppercase tracking-wider transition-all backdrop-blur-md"
            >
              Test Live Verification Registry &rarr;
            </Link>

            <Link
              href="/auth/signup?domain=Full-Stack%20Web%20Development"
              className="px-7 py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 font-semibold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-98"
            >
              Apply for Web Development Track
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
              href="/internships/btech-computer-science"
              className="p-7 rounded-3xl bg-[#0c0c0e]/80 border border-white/[0.08] hover:border-white/[0.18] transition-all group block"
            >
              <span className="text-xs font-mono text-cyan-400 uppercase font-medium block mb-2">B.Tech Degree Special</span>
              <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors mb-2 tracking-tight">
                B.Tech Computer Science Internship 2026 &rarr;
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                Why CS students need Next.js 16 and DevSecOps over textbook theory. Covers AICTE activity points and verified credentials.
              </p>
            </Link>

            <Link
              href="/internships/delhi-ncr"
              className="p-7 rounded-3xl bg-[#0c0c0e]/80 border border-white/[0.08] hover:border-white/[0.18] transition-all group block"
            >
              <span className="text-xs font-mono text-cyan-400 uppercase font-medium block mb-2">Regional Track</span>
              <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors mb-2 tracking-tight">
                Internship in Delhi NCR for Students &rarr;
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                Skip the grueling Yellow Line commute to Gurgaon or Noida. 100% remote software practicum for DU, IPU, NSUT &amp; DTU.
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
                Hands-on AI &amp; Machine Learning internship covering Python, LangChain, Pinecone Vector DBs, and LLM RAG pipelines.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
