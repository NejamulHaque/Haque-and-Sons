"use client";

import { ExternalLink, Code2, Sparkles, Terminal, GitBranch, Cpu, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { SpotlightCard } from "./SpotlightCard";

export function ProjectShowcase() {
  return (
    <section className="py-28 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl border border-white/[0.08] bg-[#0c0c0e]/90 backdrop-blur-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-neutral-300 text-xs font-medium uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Open Source Architecture</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                Architected with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-400">
                  Next.js 16
                </span>{" "}
                &amp; React Three Fiber
              </h2>

              <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
                This platform is an open showcase of modern engineering: featuring a custom 3D particle engine, zero-trust authentication via Better Auth, Drizzle ORM on serverless PostgreSQL, and automated DevSecOps pipelines.
              </p>

              {/* Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-2.5">
                  <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-xs text-neutral-300 font-medium">Turborepo Monorepo</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-neutral-300 font-medium">SAST &amp; Secret Audits</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-2.5">
                  <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-xs text-neutral-300 font-medium">Sub-30ms Edge Speed</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-3">
                <a
                  href="https://github.com/NejamulHaque/Haque-and-Sons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-6 py-3 bg-white text-black font-medium text-xs rounded-full hover:bg-neutral-200 transition-all active:scale-98 shadow-sm"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Inspect Source Code</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>

                <Link
                  href="/#contact"
                  className="px-6 py-3 bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/[0.12] font-medium text-xs rounded-full backdrop-blur-md transition-all active:scale-98"
                >
                  Hire Studio
                </Link>
              </div>
            </div>

            {/* Right Terminal Preview */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/[0.1] bg-black/90 p-5 shadow-2xl font-mono text-xs text-neutral-300 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-neutral-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20 inline-block" />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">haque-studio-terminal</span>
                </div>

                <div className="space-y-1.5 text-left">
                  <p className="text-cyan-400">$ turbo run build --filter=web</p>
                  <p className="text-neutral-400">✓ Compiling / (RootLayout)...</p>
                  <p className="text-emerald-400">✓ 3D WebGL Shader Pipeline initialized</p>
                  <p className="text-emerald-400">✓ Zero-Trust Better Auth middleware enabled</p>
                  <p className="text-neutral-300">✓ Serverless PostgreSQL connection pooled</p>
                  <p className="text-white pt-2 font-medium">Ready in 340ms • 100% Type-Safe</p>
                </div>

                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <GitBranch className="w-3.5 h-3.5 text-cyan-400" /> main (production)
                  </span>
                  <span className="text-emerald-400">● 99.9% SLA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
