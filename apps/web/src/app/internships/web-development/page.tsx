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
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-6 uppercase tracking-wider">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>Full-Stack Track &bull; Next.js 16 &bull; React 19 &bull; Neon DB</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Web Dev Internship | Next.js 16 &amp; React 19 | Verified Certificate
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Move past basic HTML/CSS clones and outdated MERN tutorials. Learn the modern 2026 web stack: <strong className="text-cyan-400">Next.js 16 App Router</strong>, <strong className="text-cyan-400">React 19 Server Components</strong>, <strong className="text-cyan-400">Tailwind CSS v4</strong>, and <strong className="text-cyan-400">Neon Serverless PostgreSQL</strong>. Graduate with an official, cryptographically verifiable certificate.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/signup?domain=Full-Stack%20Web%20Development"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm md:text-base uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(6,182,212,0.35)] flex items-center justify-center gap-2"
            >
              <span>Apply for Web Dev Track</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#tech-matrix"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 text-gray-300 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Tech Matrix</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </a>
          </div>

          {/* Quick Credential Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-8 border-t border-white/10 text-left">
            <div>
              <span className="text-2xl md:text-3xl font-black text-cyan-400 block font-mono">React 19</span>
              <span className="text-xs text-gray-400">Server Actions &amp; Hooks</span>
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-black text-blue-400 block font-mono">Next.js 16</span>
              <span className="text-xs text-gray-400">App Router &amp; Turbopack</span>
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-black text-emerald-400 block font-mono">Postgres</span>
              <span className="text-xs text-gray-400">Drizzle ORM + Neon</span>
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-black text-white block font-mono">QR Proof</span>
              <span className="text-xs text-gray-400">Verified Online Ledger</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 2026 MODERN WEB TECH MATRIX */}
      <section id="tech-matrix" className="py-20 px-6 border-t border-white/10 bg-zinc-950/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              The 2026 Production Tech Stack You Will Master
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
              Say goodbye to monolithic Express boilerplate. We teach the architecture powering the next generation of Silicon Valley startups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-2xl bg-zinc-950/90 border border-white/10 hover:border-cyan-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold mb-5">
                <Globe className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Next.js 16 App Router</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Stream server-rendered HTML at the edge, eliminate hydration waterfalls with React Server Components, and build ultra-fast web pages.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-zinc-950/90 border border-white/10 hover:border-cyan-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold mb-5">
                <Database className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Neon DB &amp; Drizzle ORM</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Type-safe SQL schemas, zero-downtime database migrations, connection pooling, and serverless PostgreSQL on edge compute.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-zinc-950/90 border border-white/10 hover:border-cyan-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center font-bold mb-5">
                <Lock className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Better Auth &amp; Security</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Implement production session tokens, OAuth providers (GitHub/Google), rate-limiting middleware, and CSRF protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STUDENT DASHBOARD & HUD MOCKUP SECTION */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Built on Our Studio Engineering Command HUD
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
              Track your milestones, submit pull requests, interact with Irus AI copilot, and download your verified credentials inside your personalized dashboard.
            </p>
          </div>

          {/* Interactive UI Mockup Container */}
          <div className="rounded-2xl border border-cyan-500/30 bg-zinc-950 p-4 sm:p-6 shadow-[0_0_40px_rgba(6,182,212,0.2)]">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                <span className="text-xs font-mono text-gray-400 ml-2">haquestudio.me/profile/hud</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                Live Sprints Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900 border border-white/10">
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block mb-1">Step 01 &bull; Appointment</span>
                <h4 className="text-sm font-bold text-white mb-2">Executive 1-Page Offer Letter</h4>
                <p className="text-[11px] text-gray-400 mb-3">Instant official appointment letter with QR authentication code and college clearance.</p>
                <span className="px-2 py-1 rounded bg-cyan-500/10 text-cyan-300 text-[10px] font-mono">Unlocked &bull; PDF Ready</span>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-white/10">
                <span className="text-[10px] font-mono text-blue-400 uppercase font-bold block mb-1">Step 02 &bull; Engineering Sprints</span>
                <h4 className="text-sm font-bold text-white mb-2">Milestone Capstone Tracker</h4>
                <p className="text-[11px] text-gray-400 mb-3">Weekly architecture standups, GitHub pull request verification, and live demo reviews.</p>
                <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-300 text-[10px] font-mono">Week 1-4 Roadmaps</span>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-white/10">
                <span className="text-[10px] font-mono text-purple-400 uppercase font-bold block mb-1">Step 03 &bull; Cryptographic Clearance</span>
                <h4 className="text-sm font-bold text-white mb-2">Verified Public Certificate</h4>
                <p className="text-[11px] text-gray-400 mb-3">Tamper-proof certificate verifiable anywhere in the world on our public ledger.</p>
                <span className="px-2 py-1 rounded bg-purple-500/10 text-purple-300 text-[10px] font-mono">Ledger Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VERIFIABLE CERTIFICATE SECTION */}
      <section className="py-20 px-6 border-t border-white/10 bg-zinc-950/40">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto mb-6">
            <Award className="w-7 h-7 text-cyan-400" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            A Certificate That Employers Actually Believe
          </h2>

          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Generic PDF certificates are faked every day. Every Haque Studio certificate includes a dynamic cryptographic QR code linking directly to our public verification registry at <code className="text-cyan-300 font-mono">haquestudio.me/verify/[id]</code>, displaying the candidate&apos;s name, project details, and verifiable timestamps.
          </p>

          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/verify"
              className="px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-white text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Test Live Verification Registry &rarr;
            </Link>

            <Link
              href="/auth/signup?domain=Full-Stack%20Web%20Development"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)]"
            >
              Apply for Web Development Track
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
              href="/internships/btech-computer-science"
              className="p-6 rounded-2xl bg-zinc-950 border border-white/10 hover:border-cyan-500/50 hover:bg-zinc-900/60 transition-all group block"
            >
              <span className="text-xs font-mono text-cyan-400 uppercase font-semibold block mb-2">B.Tech Degree Special</span>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                B.Tech Computer Science Internship 2026 &rarr;
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Why CS students need Next.js 16 and DevSecOps over textbook theory. Covers AICTE activity points and verified credentials.
              </p>
            </Link>

            <Link
              href="/internships/delhi-ncr"
              className="p-6 rounded-2xl bg-zinc-950 border border-white/10 hover:border-cyan-500/50 hover:bg-zinc-900/60 transition-all group block"
            >
              <span className="text-xs font-mono text-cyan-400 uppercase font-semibold block mb-2">Regional Track</span>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                Internship in Delhi NCR for Students &rarr;
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Skip the grueling Yellow Line commute to Gurgaon or Noida. 100% remote software practicum for DU, IPU, NSUT &amp; DTU.
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
                Hands-on AI &amp; Machine Learning internship covering Python, LangChain, Pinecone Vector DBs, and LLM RAG pipelines.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
