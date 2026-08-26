"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Heart } from "lucide-react";

// Custom SVG components for brand icons since Lucide removed them
const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/nejamulhaque", icon: LinkedinIcon, color: "hover:text-blue-500" },
    { name: "Instagram", href: "https://instagram.com/neja_mul_", icon: InstagramIcon, color: "hover:text-pink-500" },
    { name: "WhatsApp", href: "https://wa.me/919458170239", icon: MessageCircle, color: "hover:text-green-500" },
    { name: "X (Twitter)", href: "https://x.com/Nejamul_Haque_", icon: TwitterIcon, color: "hover:text-white" }, // Changed hover to white for dark mode consistency
    { name: "GitHub", href: "https://github.com/NejamulHaque", icon: GithubIcon, color: "hover:text-gray-400" },
  ];

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
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 transition-colors ${link.color}`}
                  aria-label={link.name}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
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
            <span>& lots of coffee</span>
          </div>
        </div>
      </div>
    </footer>
  );
}