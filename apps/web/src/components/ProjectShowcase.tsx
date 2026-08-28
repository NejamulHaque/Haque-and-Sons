"use client";

import { ExternalLink, Code2, Sparkles, Terminal, GitBranch, Cpu, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { SpotlightCard } from "./SpotlightCard";

export function ProjectShowcase() {
  return (
    <section className="py-32 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SpotlightCard className="p-8 sm:p-12 border-cyan-500/30 bg-gradient-to-br from-gray-950/80 via-black/90 to-purple-950/30 shadow-[0_0_60px_rgba(6,182,212,0.12)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open Source Architecture</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Architected with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">
                  Next.js 16
                </span>{" "}
                & React Three Fiber
              </h2>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                This platform is an open showcase of modern engineering: featuring a custom 3D particle engine, zero-trust authentication via Better Auth, Drizzle ORM on serverless PostgreSQL, and automated DevSecOps pipelines.
              </p>

              {/* Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-2.5">
                  <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-xs text-gray-300 font-medium">Turborepo Monorepo</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-gray-300 font-medium">SAST & Secret Audits</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-2.5">
                  <Cpu className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="text-xs text-gray-300 font-medium">Edge Speed</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="https://github.com/NejamulHaque/Haque-and-Sons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-7 py-3.5 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-lg"
                >
                  <Code2 className="w-4 h-4" />
                  <span>Inspect Source Code</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                </a>

                <Link
                  href="/#contact"
                  className="px-7 py-3.5 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-all hover:border-cyan-400/50"
                >
                  Hire Studio
                </Link>
              </div>
            </div>

            {/* Right Terminal Preview */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-white/15 bg-black/80 p-5 shadow-2xl font-mono text-xs text-gray-300 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  </div>
                  <span className="text-[11px]">haque-studio-terminal</span>
                </div>

                <div className="space-y-1.5 text-left">
                  <p className="text-cyan-400">$ turbo run build --filter=web</p>
                  <p className="text-gray-400">✓ Compiling / (RootLayout)...</p>
                  <p className="text-emerald-400">✓ 3D WebGL Shader Pipeline initialized</p>
                  <p className="text-emerald-400">✓ Zero-Trust Better Auth middleware enabled</p>
                  <p className="text-purple-400">✓ Serverless PostgreSQL connection pooled</p>
                  <p className="text-white pt-2 font-semibold">Ready in 340ms • 100% Type-Safe</p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <GitBranch className="w-3.5 h-3.5 text-cyan-400" /> main (production)
                  </span>
                  <span className="text-emerald-400">● 99.9% SLA</span>
                </div>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
