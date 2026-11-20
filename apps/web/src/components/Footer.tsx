"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Heart } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="relative border-t border-white/[0.08] bg-black pt-16 pb-12 print:hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative h-7 w-7 overflow-hidden rounded-lg bg-white/[0.08] border border-white/[0.12] group-hover:scale-105 transition-transform">
                <Image 
                  src="/logo.svg" 
                  alt="Haque & Sons Logo" 
                  fill
                  sizes="28px"
                  className="object-contain p-1"
                  unoptimized
                />
              </div>
              <span className="text-sm font-semibold tracking-tight text-white">
                Haque<span className="text-cyan-400">&</span>Sons
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-neutral-400">
              Building the future of software with enterprise-grade solutions, AI integration, and modern web technologies.
            </p>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-200">Services</h3>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><Link href="/services" className="hover:text-white transition-colors">Software Services</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Full-Stack Development</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">AI &amp; LLM Solutions</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">DevSecOps &amp; Cloud</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-200">Company</h3>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><Link href="/#about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/internships" className="hover:text-white text-neutral-300 transition-colors">Internship Program</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog &amp; Insights</Link></li>
              <li><Link href="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-200">Legal</h3>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] pt-8 md:flex-row">
          <p className="text-xs text-neutral-500">
            &copy; {currentYear} Haque & Sons Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <span>Designed with precision</span>
            <span className="text-neutral-600">•</span>
            <span>Crafted for performance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}