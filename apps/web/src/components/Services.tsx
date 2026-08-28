"use client";

import { useState } from "react";
import {
  Code,
  Brain,
  Binary,
  Briefcase,
  BarChart3,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  Database,
  Server,
  Activity,
  CheckCircle2,
  Lock,
  Cpu,
} from "lucide-react";
import React from "react";
import { SpotlightCard } from "./SpotlightCard";

export interface ServiceDetail {
  id: string;
  title: string;
  category: "AI & Agents" | "Full-Stack Platforms" | "Real-Time DevTools" | "FinTech & Security";
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  spotlight: string;
  link: string;
  external: boolean;
  status: "Live" | "Beta" | "Core Service";
  tech: string[];
  architecture: {
    ingress: string;
    engine: string;
    storage: string;
    security: string;
  };
  metrics: {
    latency: string;
    uptime: string;
    scalability: string;
  };
  deliverables: string[];
}

const SERVICES_DATA: ServiceDetail[] = [
  {
    id: "web-platform",
    title: "Web & Platform Engineering",
    category: "Full-Stack Platforms",
    desc: "Bespoke high-performance web applications engineered with Next.js 16, TypeScript, Tailwind CSS, and scalable PostgreSQL database clusters.",
    icon: Code,
    gradient: "from-cyan-500 to-blue-600",
    spotlight: "rgba(6, 182, 212, 0.2)",
    link: "#calculator",
    external: false,
    status: "Core Service",
    tech: ["Next.js 16", "TypeScript", "PostgreSQL", "Drizzle", "Tailwind v4"],
    architecture: {
      ingress: "Edge Request Ingress & SSG Cache",
      engine: "Next.js 16 App Router Server Actions",
      storage: "Neon PostgreSQL Serverless Pooler",
      security: "Zero-Trust Better Auth + CSRF Guard",
    },
    metrics: {
      latency: "< 25ms TTFB",
      uptime: "99.99%",
      scalability: "100k+ req/min",
    },
    deliverables: [
      "Full TypeScript Source Code Ownership",
      "Neon PostgreSQL with Drizzle ORM Migrations",
      "Automated CI/CD GitHub Actions Pipeline",
      "Lighthouse 95+ Performance & SEO Score",
    ],
  },
  {
    id: "irus-ai",
    title: "Irus AI — Personal Command Center",
    category: "AI & Agents",
    desc: "Autonomous AI command center with web browsing, document intelligence, RAG vector embeddings, and persistent long-term graph memory.",
    icon: Brain,
    gradient: "from-purple-500 to-violet-600",
    spotlight: "rgba(168, 85, 247, 0.25)",
    link: "https://irus-ai.onrender.com/",
    external: true,
    status: "Live",
    tech: ["LangChain", "OpenAI / Claude", "Pinecone Vector", "Redis", "FastAPI"],
    architecture: {
      ingress: "Streaming WebSocket & Prompt API",
      engine: "LangChain Multi-Agent Orchestrator",
      storage: "Pinecone Vector DB + Redis Memory",
      security: "Token Encryption & Context Sanitizer",
    },
    metrics: {
      latency: "Streaming Tokens",
      uptime: "99.9%",
      scalability: "Vector Similarity Graph",
    },
    deliverables: [
      "Custom Multi-Agent Workflows",
      "Hybrid Semantic Vector Search (RAG)",
      "Document Ingestion Pipeline (PDF, DOCX, Web)",
      "Continuous Conversation Context State",
    ],
  },
  {
    id: "collabsheets",
    title: "CollabSheets — Real-Time Editor",
    category: "Real-Time DevTools",
    desc: "Real-time collaborative code and documentation platform with AI pair programming and sandboxed cloud compilation across 60+ programming languages.",
    icon: Binary,
    gradient: "from-emerald-500 to-teal-600",
    spotlight: "rgba(16, 185, 129, 0.2)",
    link: "https://collabsheets.onrender.com/",
    external: true,
    status: "Live",
    tech: ["WebSockets", "Operational Transform", "Monaco Editor", "Docker Sandbox"],
    architecture: {
      ingress: "Bi-directional WebSocket Gateway",
      engine: "Operational Transform (OT) Conflict Resolver",
      storage: "Distributed Document State Cache",
      security: "Sandboxed Containerized Compiler",
    },
    metrics: {
      latency: "< 15ms Sync",
      uptime: "99.95%",
      scalability: "60+ Languages",
    },
    deliverables: [
      "Real-Time Multi-Cursor Collaboration",
      "Integrated Monaco Editor with IntelliSense",
      "Zero-Trust Docker Code Sandbox",
      "AI Code Generation & Explanation Tool",
    ],
  },
  {
    id: "builder-ai",
    title: "Builder AI — Portfolio Generator",
    category: "AI & Agents",
    desc: "Instant portfolio & personal web generator. Transforms structured profile data into a responsive, animated, edge-deployed website in seconds.",
    icon: Briefcase,
    gradient: "from-blue-500 to-indigo-600",
    spotlight: "rgba(59, 130, 246, 0.2)",
    link: "https://builderr-ai.vercel.app/",
    external: true,
    status: "Live",
    tech: ["ONNX Runtime", "Next.js", "Edge Functions", "Tailwind"],
    architecture: {
      ingress: "Form Payload / JSON Schema Parser",
      engine: "Client-Side ML Feature Extractor",
      storage: "Vercel Edge KV Cache",
      security: "Static HTML Content Sanitization",
    },
    metrics: {
      latency: "Instant Render",
      uptime: "100% Edge",
      scalability: "Global CDN",
    },
    deliverables: [
      "Customizable Dynamic Theme Generators",
      "Automated Vercel Edge Deployment",
      "Exportable React & Tailwind Source",
      "Interactive 3D Portfolio Presets",
    ],
  },
  {
    id: "nestfy",
    title: "Nestfy — FinTech Intelligence",
    category: "FinTech & Security",
    desc: "AI-driven personal financial operating system featuring smart dynamic budgeting, receipt OCR ingestion via machine learning, and weekly spending audits.",
    icon: BarChart3,
    gradient: "from-pink-500 to-rose-600",
    spotlight: "rgba(244, 63, 94, 0.2)",
    link: "https://nestfy-beta.vercel.app/",
    external: true,
    status: "Beta",
    tech: ["TensorFlow.js", "Drizzle ORM", "Better Auth", "Chart.js"],
    architecture: {
      ingress: "Receipt Image Upload & Base64 Stream",
      engine: "TensorFlow.js Optical Character Parser",
      storage: "Encrypted PostgreSQL Financial Ledger",
      security: "256-Bit Financial Data Encryption",
    },
    metrics: {
      latency: "Real-Time OCR",
      uptime: "99.9%",
      scalability: "Multi-Wallet Sync",
    },
    deliverables: [
      "Automated Receipt OCR & Categorization",
      "Dynamic Predictive Budget Curves",
      "Exportable Tax & Spend CSV Statements",
      "Zero-Knowledge Ledger Encryption",
    ],
  },
  {
    id: "digital-lens",
    title: "Digital Lens — News Intelligence",
    category: "AI & Agents",
    desc: "Global AI news intelligence engine scanning 500+ sources with sentiment analysis, topic clustering, and live multi-perspective summaries.",
    icon: Brain,
    gradient: "from-cyan-400 to-indigo-500",
    spotlight: "rgba(6, 182, 212, 0.25)",
    link: "https://digital-lens.vercel.app/",
    external: true,
    status: "Live",
    tech: ["NLP Sentiment", "Edge Cron", "Neon Database", "Tailwind"],
    architecture: {
      ingress: "Multi-Source RSS & API Ingestion",
      engine: "NLP Semantic Sentiment Aggregator",
      storage: "PostgreSQL Partitioned Archive",
      security: "Rate-Limited Edge Endpoints",
    },
    metrics: {
      latency: "< 100ms Search",
      uptime: "99.9%",
      scalability: "500+ Feeds",
    },
    deliverables: [
      "Live Article Scraping & Summarization",
      "Real-Time Sentiment Scoring",
      "Topic Clustering by Vector Distance",
      "Clean Ad-Free Reading Interface",
    ],
  },
];

const CATEGORIES = [
  "All Solutions",
  "AI & Agents",
  "Full-Stack Platforms",
  "Real-Time DevTools",
  "FinTech & Security",
] as const;

export function Services() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Solutions");
  const [activeServiceId, setActiveServiceId] = useState<string>("web-platform");

  const filteredServices = SERVICES_DATA.filter((s) => {
    if (selectedCategory === "All Solutions") return true;
    return s.category === selectedCategory;
  });

  const activeService =
    SERVICES_DATA.find((s) => s.id === activeServiceId) || SERVICES_DATA[0];

  return (
    <section id="services" className="py-32 bg-black relative overflow-hidden">
      {/* Ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Services & Solutions Dashboard</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Capabilities &{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Deployed Ecosystem
            </span>
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg leading-relaxed">
            Explore our battle-tested engineering capabilities and live production platforms. Click any solution to inspect its architecture and metrics.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                      : "bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Visualizing Topology Inspector (Selected Service Live Architecture) */}
        <div className="mb-14">
          <SpotlightCard className="p-8 border-cyan-500/30 bg-gradient-to-br from-gray-950/90 via-black to-cyan-950/20 shadow-[0_0_50px_rgba(6,182,212,0.12)]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activeService.gradient} p-0.5 shadow-lg flex items-center justify-center`}
                >
                  <div className="w-full h-full bg-black/60 rounded-[14px] flex items-center justify-center text-white">
                    <activeService.icon className="w-7 h-7 text-cyan-300" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {activeService.title}
                    </h3>
                    <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                      {activeService.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 max-w-xl">
                    {activeService.desc}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 self-start lg:self-center">
                {activeService.external ? (
                  <a
                    href={activeService.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center gap-2"
                  >
                    <span>Launch Live Platform</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <button
                    onClick={() =>
                      document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center gap-2 cursor-pointer"
                  >
                    <span>Configure Scope</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Visualizing Architecture Pipeline */}
            <div className="py-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  System Architecture Pipeline
                </span>
                <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  DevSecOps Hardened
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-black/50 border border-white/10 hover:border-cyan-500/30 transition-all">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold mb-2">
                    <Server className="w-4 h-4" />
                    <span>1. Ingress Layer</span>
                  </div>
                  <p className="text-xs text-gray-300 font-mono">
                    {activeService.architecture.ingress}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/50 border border-white/10 hover:border-purple-500/30 transition-all">
                  <div className="flex items-center gap-2 text-purple-400 text-xs font-bold mb-2">
                    <Cpu className="w-4 h-4" />
                    <span>2. Compute Engine</span>
                  </div>
                  <p className="text-xs text-gray-300 font-mono">
                    {activeService.architecture.engine}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/50 border border-white/10 hover:border-emerald-500/30 transition-all">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-2">
                    <Database className="w-4 h-4" />
                    <span>3. State & Storage</span>
                  </div>
                  <p className="text-xs text-gray-300 font-mono">
                    {activeService.architecture.storage}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/50 border border-white/10 hover:border-pink-500/30 transition-all">
                  <div className="flex items-center gap-2 text-pink-400 text-xs font-bold mb-2">
                    <Lock className="w-4 h-4" />
                    <span>4. Zero-Trust Security</span>
                  </div>
                  <p className="text-xs text-gray-300 font-mono">
                    {activeService.architecture.security}
                  </p>
                </div>
              </div>
            </div>

            {/* Performance Metrics & Key Deliverables */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Telemetry Metrics */}
              <div className="lg:col-span-4 grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <span className="text-[10px] text-gray-500 uppercase block">Response</span>
                  <span className="text-xs font-bold text-cyan-300 font-mono">
                    {activeService.metrics.latency}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <span className="text-[10px] text-gray-500 uppercase block">Uptime</span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">
                    {activeService.metrics.uptime}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <span className="text-[10px] text-gray-500 uppercase block">Scale Tier</span>
                  <span className="text-xs font-bold text-purple-300 font-mono">
                    {activeService.metrics.scalability}
                  </span>
                </div>
              </div>

              {/* Deliverables List */}
              <div className="lg:col-span-8 flex flex-wrap gap-2">
                {activeService.deliverables.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-xs text-gray-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const isSelected = activeServiceId === service.id;
            const Icon = service.icon;

            return (
              <SpotlightCard
                key={service.id}
                className={`p-7 flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected
                    ? "border-cyan-500/60 bg-cyan-950/20 shadow-[0_0_30px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/40"
                    : "border-white/10 hover:border-white/20"
                }`}
                onClick={() => setActiveServiceId(service.id)}
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${service.gradient} text-white shadow-md`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full ${
                        service.status === "Live"
                          ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
                          : service.status === "Core Service"
                          ? "bg-cyan-500/15 border border-cyan-500/30 text-cyan-300"
                          : "bg-yellow-500/15 border border-yellow-500/30 text-yellow-400"
                      }`}
                    >
                      {service.status}
                    </span>
                  </div>

                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                    {service.category}
                  </span>
                  <h4 className="text-lg font-bold text-white mt-1 mb-2">{service.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                    {service.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {service.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] bg-white/[0.03] border border-white/10 text-gray-300 px-2 py-0.5 rounded-md font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={`font-semibold transition-colors ${
                        isSelected ? "text-cyan-400" : "text-gray-400 group-hover:text-white"
                      }`}
                    >
                      {isSelected ? "✦ Inspected Architecture" : "Click to Inspect Architecture"}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Studio Guarantees Bar */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <h5 className="text-xs font-bold text-white">100% Code Ownership</h5>
              <p className="text-[11px] text-gray-400">Zero vendor lock-in with full git repo</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
            <Zap className="w-5 h-5 text-yellow-400 shrink-0" />
            <div>
              <h5 className="text-xs font-bold text-white">Sub-30ms Edge Speed</h5>
              <p className="text-[11px] text-gray-400">Optimized Vercel & Neon serverless</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
            <Lock className="w-5 h-5 text-purple-400 shrink-0" />
            <div>
              <h5 className="text-xs font-bold text-white">DevSecOps Hardened</h5>
              <p className="text-[11px] text-gray-400">SAST & secret scanning integrated</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <h5 className="text-xs font-bold text-white">30-Day Guarantee</h5>
              <p className="text-[11px] text-gray-400">Post-launch bug fix & tuning warranty</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
