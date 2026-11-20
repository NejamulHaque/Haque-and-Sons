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
  { label: "Services", href: "/services" },
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
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }
      : { backgroundColor: "transparent", borderBottom: "none" }
    : scrolled || !isHome
    ? {
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
      }
    : {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid #f3f4f6",
      };

  const textColor = darkMode ? "#a1a1aa" : "#52525b";
  const textHoverColor = darkMode ? "#ffffff" : "#09090b";
  const logoTextColor = darkMode ? "#ffffff" : "#09090b";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={navStyle}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 print:hidden"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => scrollToSection("home")}
          className="group flex items-center gap-2.5 cursor-pointer bg-transparent border-none"
        >
          <div className="relative w-8 h-8 overflow-hidden rounded-xl bg-white/[0.08] border border-white/[0.12] p-1.5 transition-transform group-hover:scale-105">
            <Image
              src="/logo.svg"
              alt="Haque & Sons Logo"
              fill
              className="object-contain p-1"
              unoptimized
            />
          </div>

          <div className="text-left">
            <span style={{ color: logoTextColor }} className="text-sm font-semibold tracking-tight block">
              Haque<span className="text-cyan-400">&</span>Sons
            </span>
            <span className="text-[10px] text-neutral-500 font-medium tracking-wider uppercase block -mt-0.5">
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
                style={{ color: isActive ? "#ffffff" : textColor }}
                className={`px-3 py-1.5 text-xs font-medium transition-colors rounded-full bg-transparent border-none cursor-pointer ${
                  isActive ? "bg-white/[0.08] text-white" : "hover:text-white"
                }`}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = textHoverColor;
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = textColor;
                }}
              >
                {item.label}
              </button>
            );
          })}

          {/* Cmd+K Quick Button */}
          <button
            onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))}
            className="ml-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[11px] text-neutral-400 hover:text-white transition-all cursor-pointer"
            title="Open Command Palette"
          >
            <Command size={11} className="text-neutral-400" />
            <span className="font-mono text-[10px]">⌘K</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className={`ml-1.5 p-1.5 rounded-full border transition-all duration-200 cursor-pointer flex items-center justify-center ${
              darkMode
                ? "bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] text-neutral-400 hover:text-white"
                : "bg-neutral-100 hover:bg-neutral-200 border-neutral-200 text-neutral-600 hover:text-black"
            }`}
            aria-label="Toggle theme"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? (
              <Sun size={14} className="text-neutral-300" />
            ) : (
              <Moon size={14} className="text-neutral-700" />
            )}
          </button>

          {/* Student Auth & Dashboard */}
          {session?.user ? (
            <Link
              href="/profile"
              className="ml-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] text-white text-xs font-medium transition-all flex items-center gap-1.5 backdrop-blur-md"
            >
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span>Dashboard</span>
            </Link>
          ) : (
            <div className="ml-2 flex items-center gap-1">
              <button
                type="button"
                onClick={() => openAuthModal({ mode: "signin" })}
                className="px-3 py-1.5 text-xs font-medium rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer border-none bg-transparent"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => openAuthModal({ mode: "signup" })}
                className="px-3 py-1.5 text-xs font-medium text-white bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.1] rounded-full transition-all cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={() => scrollToSection("contact")}
            className="ml-2 px-4 py-1.5 text-xs font-semibold text-black bg-white hover:bg-neutral-200 rounded-full transition-all active:scale-95 cursor-pointer border-none shadow-sm"
          >
            Let&apos;s Build
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              darkMode
                ? "bg-white/[0.05] border-white/[0.1] text-neutral-300"
                : "bg-neutral-100 border-neutral-200 text-neutral-700"
            }`}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: logoTextColor }}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors bg-transparent border-none"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
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
              <div className="pt-3 mt-2 border-t border-white/[0.08] flex flex-col gap-2">
                {session?.user ? (
                  <Link
                    href="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2.5 text-center text-xs font-medium text-white bg-white/[0.08] border border-white/[0.12] rounded-full"
                  >
                    Internship Dashboard
                  </Link>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        openAuthModal({ mode: "signin" });
                      }}
                      className="px-4 py-2 text-center text-xs font-medium text-white bg-white/[0.06] border border-white/[0.1] rounded-full cursor-pointer"
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        openAuthModal({ mode: "signup" });
                      }}
                      className="px-4 py-2 text-center text-xs font-medium text-black bg-white rounded-full cursor-pointer"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => scrollToSection("contact")}
                className="mt-2 px-4 py-2.5 text-center text-black bg-white font-medium text-xs rounded-full cursor-pointer border-none"
              >
                Let&apos;s Build
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
