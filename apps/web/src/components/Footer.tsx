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
    <footer className="relative border-t border-white/10 bg-black pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              {/* Fixed Logo Container: Added relative positioning for fill image */}
              <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 group-hover:scale-110 transition-transform">
                <Image 
                  src="/logo.svg" 
                  alt="Haque & Sons Logo" 
                  fill
                  sizes="32px"
                  className="object-cover p-1" // Added padding so SVG isn't cut off
                  unoptimized // Fixes the SVG build error
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Haque<span className="text-cyan-400">&</span>Sons
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Building the future of software with enterprise-grade solutions, AI integration, and modern web technologies.
            </p>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/#services" className="hover:text-cyan-400 transition-colors">Web Development</Link></li>
              <li><Link href="/#services" className="hover:text-cyan-400 transition-colors">AI Solutions</Link></li>
              <li><Link href="/#services" className="hover:text-cyan-400 transition-colors">Cloud Architecture</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/#about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-cyan-400 transition-colors">Blog</Link></li>
              <li><Link href="/#contact" className="hover:text-cyan-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} Haque & Sons. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>Built with</span>
            <Heart className="h-3 w-3 fill-red-500 text-red-500" />
            <span>& effort</span>
          </div>
        </div>
      </div>
    </footer>
  );
}