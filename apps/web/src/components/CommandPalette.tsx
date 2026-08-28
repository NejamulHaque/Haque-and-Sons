"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Command,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Sun,
  Layers,
  Code2,
  Mail,
  BookOpen,
  FileText,
  Calculator,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Live Products" | "Actions" | "Resources";
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  shortcut?: string;
  external?: boolean;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleTheme = () => {
    const isLight = document.documentElement.classList.contains("light");
    if (isLight) {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
    handleClose();
  };

  const scrollTo = (id: string) => {
    handleClose();
    if (window.location.pathname !== "/") {
      router.push(`/#${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-services",
      title: "Explore Studio Services",
      category: "Navigation",
      icon: Layers,
      action: () => scrollTo("services"),
    },
    {
      id: "nav-calculator",
      title: "Project Scope & Cost Estimator",
      category: "Navigation",
      icon: Calculator,
      action: () => scrollTo("calculator"),
    },
    {
      id: "nav-tech",
      title: "View Technology Stack",
      category: "Navigation",
      icon: Code2,
      action: () => scrollTo("tech"),
    },
    {
      id: "nav-process",
      title: "Our Engineering Process",
      category: "Navigation",
      icon: Sparkles,
      action: () => scrollTo("process"),
    },
    {
      id: "nav-blog",
      title: "Read Engineering Blog",
      category: "Navigation",
      icon: BookOpen,
      action: () => {
        handleClose();
        router.push("/blog");
      },
    },
    {
      id: "nav-contact",
      title: "Contact & Project Inquiries",
      category: "Navigation",
      icon: Mail,
      action: () => scrollTo("contact"),
    },

    // Live Products
    {
      id: "prod-irus",
      title: "Irus AI — Personal Command Center",
      category: "Live Products",
      icon: Sparkles,
      external: true,
      action: () => {
        window.open("https://irus-ai.onrender.com/", "_blank");
        handleClose();
      },
    },
    {
      id: "prod-collab",
      title: "CollabSheets — Real-Time Collaborative Editor",
      category: "Live Products",
      icon: Code2,
      external: true,
      action: () => {
        window.open("https://collabsheets.onrender.com/", "_blank");
        handleClose();
      },
    },
    {
      id: "prod-nestfy",
      title: "Nestfy — AI Finance & Analytics Tracker",
      category: "Live Products",
      icon: Layers,
      external: true,
      action: () => {
        window.open("https://nestfy-beta.vercel.app/", "_blank");
        handleClose();
      },
    },
    {
      id: "prod-digital-lens",
      title: "Digital Lens — AI News Intelligence Platform",
      category: "Live Products",
      icon: FileText,
      external: true,
      action: () => {
        window.open("https://digital-lens.vercel.app/", "_blank");
        handleClose();
      },
    },
    {
      id: "prod-proresume",
      title: "ProResume — ATS Resume Builder",
      category: "Live Products",
      icon: FileText,
      external: true,
      action: () => {
        window.open("https://proresume-six.vercel.app/", "_blank");
        handleClose();
      },
    },

    // Actions
    {
      id: "act-theme",
      title: "Toggle Light / Dark Mode",
      category: "Actions",
      icon: Sun,
      action: toggleTheme,
      shortcut: "T",
    },
    {
      id: "act-github",
      title: "View Studio GitHub Repository",
      category: "Resources",
      icon: Code2,
      external: true,
      action: () => {
        window.open("https://github.com/NejamulHaque/Haque-and-Sons", "_blank");
        handleClose();
      },
    },
    {
      id: "act-admin",
      title: "Admin Command Center",
      category: "Actions",
      icon: Command,
      action: () => {
        handleClose();
        router.push("/admin");
      },
    },
  ];

  const filtered = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleKeyNav = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
    }
  };

  return (
    <>
      {/* Floating Quick Action Badge */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/80 hover:bg-black text-xs font-medium text-gray-300 border border-white/10 hover:border-cyan-500/50 shadow-xl backdrop-blur-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all cursor-pointer"
        aria-label="Open Command Menu"
      >
        <Command className="w-3.5 h-3.5 text-cyan-400" />
        <span>Command Menu</span>
        <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-white/10 text-gray-400">⌘K</kbd>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 sm:px-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl bg-gray-950 border border-white/15 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden z-10"
            >
              {/* Search Bar */}
              <div className="flex items-center px-4 border-b border-white/10">
                <Search className="w-5 h-5 text-gray-400 shrink-0 mr-3" />
                <input
                  type="text"
                  placeholder="Type a command, jump to section, or launch a product..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyNav}
                  autoFocus
                  className="w-full py-4 bg-transparent text-white placeholder-gray-500 text-sm focus:outline-none"
                />
                <button
                  onClick={handleClose}
                  className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* List */}
              <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-white/5">
                {filtered.length === 0 ? (
                  <div className="py-12 text-center text-sm text-gray-500">
                    No results found for &ldquo;{query}&rdquo;
                  </div>
                ) : (
                  filtered.map((item, index) => {
                    const Icon = item.icon;
                    const isSelected = selectedIndex === index;
                    return (
                      <button
                        key={item.id}
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
                          isSelected
                            ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                            : "text-gray-300 hover:bg-white/5 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-1.5 rounded-lg ${
                              isSelected
                                ? "bg-cyan-500/20 text-cyan-400"
                                : "bg-white/5 text-gray-400"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">{item.title}</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                              {item.category}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {item.external && (
                            <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
                          )}
                          {item.shortcut && (
                            <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-white/10 text-gray-400">
                              {item.shortcut}
                            </kbd>
                          )}
                          {isSelected && (
                            <ArrowRight className="w-4 h-4 text-cyan-400 animate-pulse" />
                          )}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
                <div className="flex items-center gap-3">
                  <span>
                    Use <kbd className="font-mono text-gray-400">↑</kbd>{" "}
                    <kbd className="font-mono text-gray-400">↓</kbd> to navigate
                  </span>
                  <span>
                    <kbd className="font-mono text-gray-400">Enter</kbd> to select
                  </span>
                </div>
                <span>Haque & Sons OS v2.0</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
