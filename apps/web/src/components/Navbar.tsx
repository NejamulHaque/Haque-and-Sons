"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Command } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "Home", sectionId: "home" },
  { label: "Services", sectionId: "services" },
  { label: "Internships", href: "/internships" },
  { label: "Estimator", sectionId: "calculator" },
  { label: "Tech Stack", sectionId: "tech" },
  { label: "Process", sectionId: "process" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isLight = document.documentElement.classList.contains("light") || localStorage.getItem("theme") === "light";
    if (isLight) {
      document.documentElement.classList.add("light");
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  };

  const scrollToSection = (sectionId: string) => {
    setMobileOpen(false);
    if (pathname !== "/") {
      router.push(`/#${sectionId}`);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navStyle: React.CSSProperties = darkMode
    ? scrolled
      ? {
          backgroundColor: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        }
      : { backgroundColor: "transparent", borderBottom: "none", boxShadow: "none" }
    : scrolled
    ? {
        backgroundColor: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      }
    : {
        backgroundColor: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "none",
      };

  const textColor = darkMode ? "#9ca3af" : "#374151";
  const textHoverColor = darkMode ? "#ffffff" : "#111827";
  const logoTextColor = darkMode ? "#ffffff" : "#111827";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={navStyle}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => scrollToSection("home")}
          className="group flex items-center gap-3 cursor-pointer bg-transparent border-none"
        >
          <div className="relative w-9 h-9 overflow-hidden rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-1.5 shadow-lg group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all">
            <Image
              src="/logo.svg"
              alt="Haque & Sons Logo"
              fill
              className="object-contain p-1"
              unoptimized
            />
          </div>

          <div className="text-left">
            <span style={{ color: logoTextColor }} className="text-lg font-bold tracking-tight block">
              Haque<span className="text-cyan-400">&</span>Sons
            </span>
            <span className="text-[10px] text-gray-500 font-medium tracking-widest uppercase block -mt-1">
              Studio OS
            </span>
          </div>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = "href" in item && pathname === item.href;
            return (
              <button
                key={item.label}
                onClick={() =>
                  "href" in item ? router.push(item.href!) : scrollToSection(item.sectionId!)
                }
                style={{ color: isActive ? "#22d3ee" : textColor }}
                className="px-3.5 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-white/10 bg-transparent border-none cursor-pointer"
                onMouseEnter={(e) => (e.currentTarget.style.color = textHoverColor)}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = isActive ? "#22d3ee" : textColor)
                }
              >
                {item.label}
              </button>
            );
          })}

          {/* Cmd+K Quick Button */}
          <button
            onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))}
            className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-400 hover:text-white transition-all cursor-pointer"
            title="Open Command Palette"
          >
            <Command size={13} className="text-cyan-400" />
            <span className="font-mono text-[11px]">⌘K</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            style={{ color: textColor }}
            className="ml-1 p-2 rounded-lg hover:bg-white/10 transition-all cursor-pointer bg-transparent border-none"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* CTA */}
          <button
            onClick={() => scrollToSection("contact")}
            className="ml-3 px-5 py-2.5 text-sm font-semibold text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer border-none shadow-[0_0_20px_rgba(6,182,212,0.35)]"
          >
            Let&apos;s Build
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            style={{ color: textColor }}
            className="p-2 rounded-lg cursor-pointer bg-transparent border-none"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: logoTextColor }}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors bg-transparent border-none"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: darkMode ? "rgba(0,0,0,0.96)" : "rgba(255,255,255,0.98)",
              borderBottom: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e5e7eb",
              backdropFilter: "blur(24px)",
            }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() =>
                    "href" in item
                      ? (setMobileOpen(false), router.push(item.href!))
                      : scrollToSection(item.sectionId!)
                  }
                  style={{
                    color: "href" in item && pathname === item.href ? "#22d3ee" : textColor,
                  }}
                  className="px-4 py-3 text-left font-medium rounded-lg transition-all bg-transparent border-none cursor-pointer hover:bg-white/5"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("contact")}
                className="mt-2 px-4 py-3 text-center text-black bg-cyan-400 font-semibold rounded-xl cursor-pointer border-none"
              >
                Let&apos;s Talk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
