"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Home", sectionId: "home" },
  { label: "Services", sectionId: "services" },
  { label: "Features", sectionId: "features" },
  { label: "Tech Stack", sectionId: "tech" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setDarkMode(false);
      document.documentElement.classList.add("light");
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      router.push("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Inline styles based on theme — guarantees correct colors
  const navStyle: React.CSSProperties = darkMode
    ? scrolled
      ? {
          backgroundColor: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }
      : { backgroundColor: "transparent", borderBottom: "none", boxShadow: "none" }
    : scrolled
      ? {
          backgroundColor: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid #e5e7eb",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }
      : {
          backgroundColor: "rgba(255,255,255,0.7)",
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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        <button
          onClick={() => scrollToSection("home")}
          className="group flex items-center gap-2 cursor-pointer bg-transparent border-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
            H
          </div>
          <span style={{ color: logoTextColor }} className="text-lg font-bold tracking-tight">
            Haque<span className="text-cyan-400">&</span>Sons
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() =>
                "href" in item ? router.push(item.href!) : scrollToSection(item.sectionId!)
              }
              style={{ color: "href" in item && pathname === item.href ? "#22d3ee" : textColor }}
              className="px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-white/10 bg-transparent border-none cursor-pointer"
              onMouseEnter={(e) => (e.currentTarget.style.color = textHoverColor)}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  "href" in item && pathname === item.href ? "#22d3ee" : textColor)
              }
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={toggleTheme}
            style={{ color: textColor }}
            className="ml-2 p-2 rounded-lg hover:bg-white/10 transition-all cursor-pointer bg-transparent border-none"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="ml-2 px-5 py-2 text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer border-none"
          >
            Let&apos;s Talk
          </button>
        </div>

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

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: darkMode ? "rgba(0,0,0,0.95)" : "rgba(255,255,255,0.98)",
              borderBottom: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e5e7eb",
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
                  className="px-4 py-3 text-left rounded-lg transition-all bg-transparent border-none cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("contact")}
                className="mt-2 px-4 py-3 text-center text-black bg-cyan-400 font-semibold rounded-lg cursor-pointer border-none"
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
