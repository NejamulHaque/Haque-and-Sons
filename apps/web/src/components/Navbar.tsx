"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Command, User, LogIn, UserPlus } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { openAuthModal } from "@/components/AuthModal";

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
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isLight = document.documentElement.classList.contains("light") || localStorage.getItem("theme") === "light";
    if (isLight) {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      setDarkMode(true);
    }

    const handleThemeChange = (e: any) => {
      const mode = e.detail;
      setDarkMode(mode !== "light");
    };

    window.addEventListener("haque-theme-change", handleThemeChange);
    return () => window.removeEventListener("haque-theme-change", handleThemeChange);
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
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      window.dispatchEvent(new CustomEvent("haque-theme-change", { detail: "dark" }));
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      window.dispatchEvent(new CustomEvent("haque-theme-change", { detail: "light" }));
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

  const isHome = pathname === "/";

  const navStyle: React.CSSProperties = darkMode
    ? scrolled || !isHome
      ? {
          backgroundColor: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        }
      : { backgroundColor: "transparent", borderBottom: "none", boxShadow: "none" }
    : scrolled || !isHome
    ? {
        backgroundColor: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid #e2e8f0",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      }
    : {
        backgroundColor: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid #e2e8f0",
        boxShadow: "none",
      };

  const textColor = darkMode ? "#9ca3af" : "#475569";
  const textHoverColor = darkMode ? "#ffffff" : "#0f172a";
  const logoTextColor = darkMode ? "#ffffff" : "#0f172a";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={navStyle}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 print:hidden"
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
            className={`ml-1.5 p-2 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-center ${
              darkMode
                ? "bg-white/5 hover:bg-white/10 border-white/10 text-yellow-400 hover:shadow-[0_0_15px_rgba(250,204,21,0.25)]"
                : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-cyan-600 hover:shadow-[0_0_15px_rgba(6,182,212,0.25)]"
            }`}
            aria-label="Toggle theme"
            title={darkMode ? "Switch to Light Studio OS" : "Switch to Dark Cyber OS"}
          >
            {darkMode ? (
              <Sun size={17} className="text-yellow-400" />
            ) : (
              <Moon size={17} className="text-cyan-600" />
            )}
          </button>

          {/* Student Auth & Dashboard */}
          {session?.user ? (
            <Link
              href="/profile"
              className="ml-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all flex items-center gap-1.5 shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:scale-105"
            >
              <User className="w-3.5 h-3.5" />
              <span>Internship Dashboard</span>
            </Link>
          ) : (
            <div className="ml-2 flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => openAuthModal({ mode: "signin" })}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-xl hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-white/10"
                style={{ color: textColor }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => openAuthModal({ mode: "signup" })}
                className="px-4 py-1.5 text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={() => scrollToSection("contact")}
            className="ml-2 px-5 py-2.5 text-sm font-semibold text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer border-none shadow-[0_0_20px_rgba(6,182,212,0.35)]"
          >
            Let&apos;s Build
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              darkMode
                ? "bg-white/5 border-white/10 text-yellow-400"
                : "bg-slate-100 border-slate-200 text-cyan-600"
            }`}
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

              {/* Mobile Auth Links */}
              <div className="pt-3 mt-2 border-t border-white/10 flex flex-col gap-2">
                {session?.user ? (
                  <Link
                    href="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2.5 text-center text-xs font-bold text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 rounded-xl"
                  >
                    My Internship Dashboard
                  </Link>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        openAuthModal({ mode: "signin" });
                      }}
                      className="px-4 py-2.5 text-center text-xs font-bold text-white bg-white/5 border border-white/10 rounded-xl cursor-pointer"
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        openAuthModal({ mode: "signup" });
                      }}
                      className="px-4 py-2.5 text-center text-xs font-bold text-black bg-cyan-400 rounded-xl cursor-pointer"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>

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
