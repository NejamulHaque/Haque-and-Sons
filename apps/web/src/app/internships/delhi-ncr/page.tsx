import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Train,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Sparkles,
  Zap,
  Building2,
  FileCheck,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Remote Tech Internship for Delhi Students | Skip the Commute | Haque Studio",
  description:
    "Looking for an internship in Delhi NCR for students? Skip the grueling Yellow Line commute to Cyber City or Noida. Join Haque Studio's 100% remote tech internship for DU, IPU, NSUT & DTU students.",
  keywords: [
    "Internship in Delhi NCR for Students",
    "remote tech internship Delhi",
    "internship for DU students",
    "IPU CSE internship 2026",
    "NSUT DTU internship",
    "Noida Gurgaon software internship",
    "Delhi NCR college internship with certificate",
  ],
  alternates: {
    canonical: "https://haquestudio.me/internships/delhi-ncr",
  },
  openGraph: {
    title: "Remote Tech Internship for Delhi NCR Students | Haque Studio",
    description:
      "Save 3+ hours daily on Delhi Metro travel. Build production Next.js 16 and AI software remotely with verified certificates accepted by DU, IPU, NSUT, and AKTU.",
    url: "https://haquestudio.me/internships/delhi-ncr",
    siteName: "Haque Studio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Remote Tech Internship for Delhi Students - Haque Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Remote Tech Internship for Delhi Students | Haque Studio",
    description:
      "Skip Rajiv Chowk peak hour chaos. Join our remote engineering sprint for Delhi NCR tech students.",
    images: ["/og-image.png"],
  },
};

// LocalBusiness Schema for Delhi NCR Region
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Haque Studio - Software Engineering & Internship Hub",
  "image": "https://haquestudio.me/logo.svg",
  "url": "https://haquestudio.me/internships/delhi-ncr",
  "telephone": "+91-9876543210",
  "priceRange": "Free to ₹1,499",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Connaught Place / South Extension",
    "addressLocality": "New Delhi",
    "addressRegion": "Delhi",
    "postalCode": "110001",
    "addressCountry": "IN",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 28.6139,
    "longitude": 77.209,
  },
  "areaServed": [
    "Delhi",
    "New Delhi",
    "Noida",
    "Greater Noida",
    "Gurgaon (Gurugram)",
    "Ghaziabad",
    "Faridabad",
  ],
  "sameAs": [
    "https://github.com/NejamulHaque",
    "https://www.linkedin.com/in/nejamulhaque",
    "https://x.com/Nejamul_Haque_",
  ],
};

export default function DelhiNCRInternshipPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-6 uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span>Delhi NCR Regional Cohort • DU • IPU • NSUT • DTU • AKTU</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Remote Tech Internship for Delhi Students | Skip the Commute | Haque Studio
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Don&apos;t waste 3 to 4 hours every single day fighting peak hour rush at Rajiv Chowk, Kashmere Gate, or Sikanderpur just to do basic data entry in an office. Haque Studio provides <strong className="text-cyan-400">100% remote, production-level software internships</strong> designed for students across Delhi, Noida, and Gurgaon.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/signup?domain=Full-Stack%20Web%20Development"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm md:text-base uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(6,182,212,0.35)] flex items-center justify-center gap-2"
            >
              <span>Apply from Delhi NCR</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/internships"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 text-gray-300 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Explore 11 Domain Tracks</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
          </div>

          {/* Commute vs Remote Numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-8 border-t border-white/10 text-left">
            <div>
              <span className="text-2xl md:text-3xl font-black text-red-400 block font-mono">0 Hrs</span>
              <span className="text-xs text-gray-400">Delhi Metro / Traffic Commute</span>
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-black text-emerald-400 block font-mono">₹4,000+</span>
              <span className="text-xs text-gray-400">Saved Monthly on Metro &amp; Autos</span>
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-black text-cyan-400 block font-mono">100%</span>
              <span className="text-xs text-gray-400">College NOC &amp; TPO Accepted</span>
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-black text-white block font-mono">MSME Reg.</span>
              <span className="text-xs text-gray-400">Govt. Verified Studio Labs</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE DELHI COMMUTE REALITY */}
      <section className="py-20 px-6 border-t border-white/10 bg-zinc-950/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Why Smart Delhi NCR Students Choose Remote Over Commuting
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
              Delhi summers reach 45°C, winter smog triggers AQI 400+, and metro rush drains your energy. Reclaim your time to build actual coding skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Daily Delhi Travel Ordeal */}
            <div className="p-8 rounded-2xl bg-zinc-950/90 border border-red-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center">
                  <Train className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Physical In-Office Internship</h3>
                  <span className="text-xs text-red-400 font-mono">Gurgaon Cyber City / Noida Sec 62</span>
                </div>
              </div>
              <ul className="space-y-3.5 text-sm text-gray-400">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0 mt-0.5">•</span>
                  <span><strong>3-4 Hours Lost Daily:</strong> Crushed in Yellow Line / Blue Line interchange jams.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0 mt-0.5">•</span>
                  <span><strong>Extreme Smog &amp; Weather:</strong> Battling dangerous AQI levels and heat exhaustion.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0 mt-0.5">•</span>
                  <span><strong>Monotonous Desk Work:</strong> Most offline intern roles relegate college students to Excel sheets or photocopies.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0 mt-0.5">•</span>
                  <span><strong>Exhaustion:</strong> Zero energy left to study for Semester Exams, GATE, or Placements.</span>
                </li>
              </ul>
            </div>

            {/* The Haque Studio Remote Sprint */}
            <div className="p-8 rounded-2xl bg-zinc-950/90 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Haque Studio Remote Sprint</h3>
                  <span className="text-xs text-cyan-400 font-mono">Work from Your Hostel or Home</span>
                </div>
              </div>
              <ul className="space-y-3.5 text-sm text-gray-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>100% Focused Coding:</strong> Invest those extra 4 daily hours into architecture, TypeScript, and AI tooling.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Async Agile Check-ins:</strong> Weekly mentor review sprints that fit smoothly around your college timetable.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Real GitHub PR Workflows:</strong> Ship live applications deployed on modern edge clouds like Vercel.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>TPO Verification Guarantee:</strong> Formal 1-page Offer Letter and ISO-accredited certificate for college records.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TAILORED FOR DELHI UNIVERSITIES */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Approved Across Major Delhi NCR Universities
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
              Our documentation meets the strict compliance standards demanded by academic departments and training &amp; placement cells.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 text-center">
              <Building2 className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <h3 className="font-bold text-white text-sm">GGSIPU (IPU)</h3>
              <p className="text-[11px] text-gray-400 mt-1">MAIT, MSIT, BVCOE, USIC&amp;T, BPIT</p>
            </div>

            <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 text-center">
              <Building2 className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <h3 className="font-bold text-white text-sm">Delhi University (DU)</h3>
              <p className="text-[11px] text-gray-400 mt-1">CIC, DDU, ANDC, Keshav Mahavidyalaya</p>
            </div>

            <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 text-center">
              <Building2 className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <h3 className="font-bold text-white text-sm">DTU &amp; NSUT</h3>
              <p className="text-[11px] text-gray-400 mt-1">Industrial training credit fulfillment</p>
            </div>

            <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 text-center">
              <Building2 className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <h3 className="font-bold text-white text-sm">AKTU NCR Region</h3>
              <p className="text-[11px] text-gray-400 mt-1">JSS Noida, Galgotias, AKGEC, KIET</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAST ONBOARDING CTA */}
      <section className="py-16 px-6 border-t border-white/10 bg-zinc-950/70">
        <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-10 border border-cyan-500/30 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
            Start Your Remote Internship From Delhi Today
          </h2>
          <p className="text-sm text-gray-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Apply online in under 2 minutes. Receive your formal 1-page Offer Letter immediately to present to your college placement cell.
          </p>
          <Link
            href="/auth/signup?domain=Full-Stack%20Web%20Development"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(6,182,212,0.35)]"
          >
            <span>Register for Free Application</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
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
              href="/internships/web-development"
              className="p-6 rounded-2xl bg-zinc-950 border border-white/10 hover:border-cyan-500/50 hover:bg-zinc-900/60 transition-all group block"
            >
              <span className="text-xs font-mono text-cyan-400 uppercase font-semibold block mb-2">Web Engineering</span>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                Web Development with Certificate &rarr;
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Build enterprise full-stack web applications with Next.js 16 App Router, React 19, and Neon serverless PostgreSQL.
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
