"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code2, Sparkles } from "lucide-react";
import Link from "next/link";

export function ProjectShowcase() {
  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Open Source Project</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Built with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Next.js 16</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Three.js</span>
          </h2>
          
          <p className="text-lg text-gray-400 mb-10 leading-relaxed">
            This platform is a demonstration of modern web capabilities. It features a custom 3D engine, 
            real-time collaboration tools, and an AI-driven content system. 
            Designed and developed by <span className="text-white font-semibold">Nejamul Haque</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://github.com/NejamulHaque/Haque-and-Sons" 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all hover:scale-105"
            >
              <Code2 className="w-5 h-5" />
              View Source Code
              <ExternalLink className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
            
            <Link 
              href="/#contact"
              className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-all hover:border-white/40"
            >
              Hire Me
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
