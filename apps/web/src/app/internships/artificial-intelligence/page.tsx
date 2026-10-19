import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  Cpu,
  Database,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Layers,
  Zap,
  Award,
  Bot,
  BrainCircuit,
  FileCode,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI & Machine Learning Internship | Python, LLMs & RAG | Haque Studio",
  description:
    "Hands-on AI ML Internship for Beginners. Master Python backend, LangChain, Pinecone Vector DBs, and Retrieval-Augmented Generation (RAG). Earn an official verified certificate.",
  keywords: [
    "AI ML Internship for Beginners",
    "artificial intelligence internship India",
    "LLM RAG internship",
    "LangChain Python internship",
    "machine learning internship with certificate",
    "GenAI engineering internship 2026",
    "Python AI internship for students",
  ],
  alternates: {
    canonical: "https://haquestudio.me/internships/artificial-intelligence",
  },
  openGraph: {
    title: "AI & Machine Learning Internship | Python, LLMs & RAG | Haque Studio",
    description:
      "Engineered for students starting out in AI. Build real LLM applications, RAG search pipelines, and autonomous agent systems with verified credentials.",
    url: "https://haquestudio.me/internships/artificial-intelligence",
    siteName: "Haque Studio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI ML Internship for Beginners - Haque Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI ML Internship for Beginners | Haque Studio",
    description:
      "Master Python, LangChain, Pinecone, and LLM RAG pipelines. Earn an industry-backed verifiable credential.",
    images: ["/og-image.png"],
  },
};

const aiJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Artificial Intelligence & Generative AI Engineering Internship",
  "description":
    "A beginner-to-intermediate industry practicum covering Python, LangChain, vector embeddings, Pinecone, LLM agents, and Retrieval-Augmented Generation (RAG).",
  "provider": {
    "@type": "Organization",
    "name": "Haque Studio",
    "sameAs": "https://haquestudio.me",
  },
  "educationalLevel": "Beginner to Intermediate",
  "timeToComplete": "P4W",
  "offers": {
    "@type": "Offer",
    "category": "Certified AI & Machine Learning Practicum",
  },
};

export default function ArtificialIntelligenceInternshipPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aiJsonLd) }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-6 uppercase tracking-wider">
            <BrainCircuit className="w-4 h-4 text-purple-400" />
            <span>AI &amp; Generative AI Track &bull; Python &bull; LangChain &bull; RAG</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            AI &amp; Machine Learning Internship | Python, LLMs &amp; RAG | Haque Studio
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Stop watching theoretical videos that only call standard OpenAI endpoints. Learn how real AI engineers build: <strong className="text-cyan-400">Python asynchronous backends</strong>, <strong className="text-cyan-400">Vector Embeddings with Pinecone</strong>, <strong className="text-cyan-400">Retrieval-Augmented Generation (RAG)</strong>, and <strong className="text-cyan-400">Autonomous Tool-Calling Agents</strong>. Designed for beginners and undergraduate students.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/signup?domain=AI%20%26%20Generative%20AI%20Engineering"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm md:text-base uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(6,182,212,0.35)] flex items-center justify-center gap-2"
            >
              <span>Apply for AI &amp; ML Track</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#curriculum"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 text-gray-300 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <span>View 4-Week AI Syllabus</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </a>
          </div>

          {/* Quick AI Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-8 border-t border-white/10 text-left">
            <div>
              <span className="text-2xl md:text-3xl font-black text-purple-400 block font-mono">Python 3.12</span>
              <span className="text-xs text-gray-400">FastAPI &amp; Async Microservices</span>
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-black text-cyan-400 block font-mono">Vector DB</span>
              <span className="text-xs text-gray-400">Pinecone &amp; pgvector Indexing</span>
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-black text-blue-400 block font-mono">LangChain</span>
              <span className="text-xs text-gray-400">RAG Chains &amp; Tool Calling</span>
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-black text-emerald-400 block font-mono">Verified</span>
              <span className="text-xs text-gray-400">QR Ledger Certificate &amp; LOR</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 4 PILLARS OF MODERN AI ENGINEERING */}
      <section id="curriculum" className="py-20 px-6 border-t border-white/10 bg-zinc-950/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              The 4 Pillars of Production AI Engineering
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
              Beginners are guided through step-by-step milestones to construct production-ready AI software systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pillar 1 */}
            <div className="p-7 rounded-2xl bg-zinc-950/90 border border-white/10 hover:border-purple-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center font-bold mb-4">
                <FileCode className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">1. Python Backend &amp; Async Architecture</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-3">
                Master Python 3.12 syntax, data structures, Pydantic v2 validation models, and asynchronous REST APIs using FastAPI to power responsive AI services.
              </p>
              <span className="text-[10px] font-mono text-purple-300 uppercase font-bold">Week 1 Milestone &bull; Foundational Backend</span>
            </div>

            {/* Pillar 2 */}
            <div className="p-7 rounded-2xl bg-zinc-950/90 border border-white/10 hover:border-cyan-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold mb-4">
                <Database className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">2. Vector Embeddings &amp; Similarity Search</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-3">
                Learn mathematical embeddings, cosine similarity metrics, chunking strategies, and vector database management using Pinecone and pgvector.
              </p>
              <span className="text-[10px] font-mono text-cyan-300 uppercase font-bold">Week 2 Milestone &bull; Vector Space</span>
            </div>

            {/* Pillar 3 */}
            <div className="p-7 rounded-2xl bg-zinc-950/90 border border-white/10 hover:border-blue-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold mb-4">
                <BrainCircuit className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">3. Retrieval-Augmented Generation (RAG)</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-3">
                Connect LLMs to private datasets without retraining. Eliminate hallucinations using LangChain, query re-ranking, and contextual document retrieval.
              </p>
              <span className="text-[10px] font-mono text-blue-300 uppercase font-bold">Week 3 Milestone &bull; Hybrid RAG Systems</span>
            </div>

            {/* Pillar 4 */}
            <div className="p-7 rounded-2xl bg-zinc-950/90 border border-white/10 hover:border-emerald-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold mb-4">
                <Bot className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">4. Autonomous Agents &amp; Tool Calling</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-3">
                Build autonomous software agents capable of executing database queries, calling external REST APIs, and self-correcting logic outputs dynamically.
              </p>
              <span className="text-[10px] font-mono text-emerald-300 uppercase font-bold">Week 4 Milestone &bull; Agentic Workflows</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. REAL CAPSTONES YOU BUILD */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Real Capstone Projects to Showcase on GitHub
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
              No generic spam classifiers or MNIST digit detectors. You build software that solves actual enterprise challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-zinc-950 border border-white/10 hover:border-cyan-500/40 transition-all">
              <span className="text-xs font-mono text-cyan-400 uppercase font-bold block mb-2">Capstone Project A</span>
              <h3 className="text-xl font-bold text-white mb-3">Enterprise PDF &amp; Document RAG Intelligence</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                An end-to-end vector pipeline that ingests complex technical documents, chunks tables and text, computes embeddings, and provides cited, accurate answers with sub-second retrieval latency.
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-gray-300">FastAPI</span>
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-gray-300">LangChain</span>
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-gray-300">Pinecone</span>
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-gray-300">Docker</span>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-950 border border-white/10 hover:border-purple-500/40 transition-all">
              <span className="text-xs font-mono text-purple-400 uppercase font-bold block mb-2">Capstone Project B</span>
              <h3 className="text-xl font-bold text-white mb-3">Autonomous Code Auditor &amp; SQL Query Agent</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                An intelligent agent equipped with tools to inspect SQL schemas, parse GitHub commits, test query performance, and flag security vulnerabilities automatically via LLM function calling.
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-gray-300">Python 3.12</span>
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-gray-300">Tool Calling</span>
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-gray-300">Neon PostgreSQL</span>
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-gray-300">Pydantic</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VERIFIABLE CERTIFICATION & LOR */}
      <section className="py-20 px-6 border-t border-white/10 bg-zinc-950/70">
        <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-10 border border-purple-500/30 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-center">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto mb-5">
            <Award className="w-6 h-6 text-purple-400" />
          </div>

          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
            Earn an Industry-Endorsed AI Credential
          </h2>
          <p className="text-sm text-gray-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Every candidate receives an official, cryptographically verifiable Certificate of Completion with a dynamic QR code. High performers who demonstrate exceptional capstone engineering receive an executive Letter of Recommendation (LOR) signed by CEO Nejamul Haque.
          </p>
          <Link
            href="/auth/signup?domain=AI%20%26%20Generative%20AI%20Engineering"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(6,182,212,0.35)]"
          >
            <span>Apply for AI &amp; ML Cohort 2026</span>
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
              href="/internships/web-development"
              className="p-6 rounded-2xl bg-zinc-950 border border-white/10 hover:border-cyan-500/50 hover:bg-zinc-900/60 transition-all group block"
            >
              <span className="text-xs font-mono text-cyan-400 uppercase font-semibold block mb-2">Core Development</span>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                Web Development with Certificate &rarr;
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Master React 19, Next.js 16 App Router, and full-stack PostgreSQL architectures with cryptographically verifiable public credentials.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
