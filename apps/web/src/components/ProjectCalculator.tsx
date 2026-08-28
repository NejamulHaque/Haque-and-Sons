"use client";

import { useState } from "react";
import {
  Calculator,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Clock,
  Coins,
} from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";

export type CurrencyCode = "INR" | "USD" | "EUR" | "GBP" | "AED";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag: string;
  rate: number; // multiplier from USD base
  format: (amount: number) => string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: {
    code: "INR",
    symbol: "₹",
    name: "Indian Rupee",
    flag: "🇮🇳",
    rate: 85,
    format: (amount) => `₹${Math.round(amount * 85).toLocaleString("en-IN")}`,
  },
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    flag: "🇺🇸",
    rate: 1,
    format: (amount) => `$${Math.round(amount).toLocaleString("en-US")}`,
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    flag: "🇪🇺",
    rate: 0.92,
    format: (amount) => `€${Math.round(amount * 0.92).toLocaleString("de-DE")}`,
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    flag: "🇬🇧",
    rate: 0.79,
    format: (amount) => `£${Math.round(amount * 0.79).toLocaleString("en-GB")}`,
  },
  AED: {
    code: "AED",
    symbol: "AED ",
    name: "UAE Dirham",
    flag: "🇦🇪",
    rate: 3.67,
    format: (amount) => `AED ${Math.round(amount * 3.67).toLocaleString("en-AE")}`,
  },
};

interface ProjectType {
  id: string;
  name: string;
  baseWeeks: number;
  basePriceUSD: number;
  desc: string;
  icon: string;
}

const PROJECT_TYPES: ProjectType[] = [
  {
    id: "startup-landing",
    name: "Startup Landing & Brand MVP",
    baseWeeks: 1.5,
    basePriceUSD: 350,
    desc: "High-converting modern animated landing with lead capture, rich SEO, and sub-second edge CDN.",
    icon: "✨",
  },
  {
    id: "3d-interactive",
    name: "3D Interactive Experience",
    baseWeeks: 2,
    basePriceUSD: 550,
    desc: "Three.js / React Three Fiber canvas with particle systems, post-processing & shaders.",
    icon: "🌐",
  },
  {
    id: "fullstack-app",
    name: "Full-Stack Web Application",
    baseWeeks: 2.5,
    basePriceUSD: 650,
    desc: "Next.js 16 App Router, PostgreSQL / Neon DB, Better Auth, and custom API integrations.",
    icon: "⚡",
  },
  {
    id: "ai-platform",
    name: "AI & Agent Platform",
    baseWeeks: 3,
    basePriceUSD: 750,
    desc: "LLM orchestration, vector search RAG, long-term memory & streaming chat interface.",
    icon: "🧠",
  },
  {
    id: "saas-mvp",
    name: "SaaS MVP Launchpad",
    baseWeeks: 3.5,
    basePriceUSD: 950,
    desc: "Complete subscription SaaS with Stripe, auth, analytics dashboard & admin controls.",
    icon: "🚀",
  },
];

interface FeatureOption {
  id: string;
  name: string;
  weeks: number;
  priceUSD: number;
  category: string;
}

const FEATURES: FeatureOption[] = [
  { id: "collab", name: "Real-time Collaboration (WebSockets / OT)", weeks: 0.5, priceUSD: 150, category: "Real-time" },
  { id: "vector", name: "Semantic Vector Search & Embeddings", weeks: 0.5, priceUSD: 180, category: "AI" },
  { id: "devsecops", name: "DevSecOps CI/CD + SAST & Secret Scanning", weeks: 0.5, priceUSD: 120, category: "Security" },
  { id: "pwa", name: "Installable Offline-first PWA Support", weeks: 0.5, priceUSD: 90, category: "Mobile" },
  { id: "analytics", name: "Custom Analytics & Geo-telemetry Dashboard", weeks: 0.5, priceUSD: 110, category: "Analytics" },
  { id: "cms", name: "Dynamic Blog / MDX Engine", weeks: 0.5, priceUSD: 80, category: "Content" },
];

export function ProjectCalculator() {
  const [currency, setCurrency] = useState<CurrencyCode>("INR");
  const [selectedType, setSelectedType] = useState<string>("ai-platform");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "vector",
    "devsecops",
  ]);
  const [timelineSpeed, setTimelineSpeed] = useState<"standard" | "expedited">("standard");

  const currentType = PROJECT_TYPES.find((t) => t.id === selectedType) || PROJECT_TYPES[0];
  const activeCurrency = CURRENCIES[currency];

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const calculateTotalWeeks = () => {
    let weeks = currentType.baseWeeks;
    selectedFeatures.forEach((fId) => {
      const f = FEATURES.find((item) => item.id === fId);
      if (f) weeks += f.weeks;
    });
    if (timelineSpeed === "expedited") {
      weeks = Math.max(1.5, Math.round(weeks * 0.7 * 10) / 10);
    }
    return Math.ceil(weeks);
  };

  const calculateEstimateUSD = () => {
    let price = currentType.basePriceUSD;
    selectedFeatures.forEach((fId) => {
      const f = FEATURES.find((item) => item.id === fId);
      if (f) price += f.priceUSD;
    });
    if (timelineSpeed === "expedited") {
      price = Math.round(price * 1.25);
    }
    return price;
  };

  const formatPrice = (usdAmount: number) => {
    return activeCurrency.format(usdAmount);
  };

  const handleApplyToContact = () => {
    const featureNames = selectedFeatures
      .map((fId) => FEATURES.find((f) => f.id === fId)?.name)
      .filter(Boolean)
      .join(", ");

    const totalFormatted = formatPrice(calculateEstimateUSD());

    const summary = `Project Scope Estimate:\n- Archetype: ${currentType.name}\n- Selected Modules: ${featureNames || "Core setup"}\n- Delivery Pace: ${timelineSpeed === "expedited" ? "Expedited Fast-Track" : "Standard Agile"}\n- Target Timeline: ~${calculateTotalWeeks()} Weeks\n- Estimated Investment: ${totalFormatted} (${currency})\n\nLet's discuss requirements!`;

    const messageInput = document.getElementById("message") as HTMLTextAreaElement | null;
    if (messageInput) {
      messageInput.value = summary;
      messageInput.dispatchEvent(new Event("input", { bubbles: true }));
    }

    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="calculator" className="py-28 bg-black relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>Startup-Friendly Scope Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Estimate Your Project Scope
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            Accessible, founder-friendly pricing built for startups and growing teams. Configure your modules and timeline for transparent estimates.
          </p>

          {/* Currency Switcher */}
          <div className="mt-8 inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-gray-900/80 border border-white/10 backdrop-blur-md shadow-xl">
            <div className="px-3 py-1 text-xs font-medium text-gray-400 flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-cyan-400" />
              <span>Currency:</span>
            </div>
            {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
              const c = CURRENCIES[code];
              const isSelected = currency === code;
              return (
                <button
                  key={code}
                  onClick={() => setCurrency(code)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{c.flag}</span>
                  <span>{c.code}</span>
                  <span className="opacity-70 text-[10px]">({c.symbol.trim()})</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Archetype */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3 uppercase tracking-wider text-xs text-gray-400">
                1. Select Core Archetype
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {PROJECT_TYPES.map((type) => {
                  const isSelected = selectedType === type.id;
                  return (
                    <div
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                        isSelected
                          ? "bg-cyan-500/10 border-cyan-500 text-white shadow-[0_0_25px_rgba(6,182,212,0.15)]"
                          : "bg-white/[0.02] border-white/[0.08] text-gray-300 hover:border-white/20 hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-2xl">{type.icon}</span>
                        <div className="text-right">
                          <span className="text-xs font-bold text-cyan-400">
                            From {formatPrice(type.basePriceUSD)}
                          </span>
                          <span className="block text-[11px] text-gray-500">
                            ~{type.baseWeeks}w base
                          </span>
                        </div>
                      </div>
                      <h4 className="font-bold text-sm text-white">{type.name}</h4>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">{type.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Modules */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3 uppercase tracking-wider text-xs text-gray-400">
                2. Architectural Add-on Modules
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FEATURES.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <div
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? "bg-purple-500/10 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                          : "bg-white/[0.02] border-white/[0.08] text-gray-400 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                            isChecked
                              ? "bg-purple-500 border-purple-500 text-white"
                              : "border-white/30 bg-transparent"
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white">{feat.name}</p>
                          <span className="text-[10px] text-purple-300 font-mono">
                            +{feat.weeks}w • +{formatPrice(feat.priceUSD)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Pace */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3 uppercase tracking-wider text-xs text-gray-400">
                3. Delivery Sprint Pace
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setTimelineSpeed("standard")}
                  className={`flex-1 p-4 rounded-xl border text-sm font-medium cursor-pointer transition-all flex items-center justify-center gap-2 ${
                    timelineSpeed === "standard"
                      ? "bg-cyan-500/10 border-cyan-500 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                      : "bg-white/[0.02] border-white/[0.08] text-gray-400 hover:border-white/20"
                  }`}
                >
                  <Clock className="w-4 h-4 text-cyan-400" />
                  Standard Agile Pace
                </button>
                <button
                  onClick={() => setTimelineSpeed("expedited")}
                  className={`flex-1 p-4 rounded-xl border text-sm font-medium cursor-pointer transition-all flex items-center justify-center gap-2 ${
                    timelineSpeed === "expedited"
                      ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500 text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                      : "bg-white/[0.02] border-white/[0.08] text-gray-400 hover:border-white/20"
                  }`}
                >
                  <Zap className="w-4 h-4 text-purple-400" />
                  Fast-Track Launch (+Priority)
                </button>
              </div>
            </div>
          </div>

          {/* Summary Box */}
          <div className="lg:col-span-5 sticky top-28">
            <SpotlightCard className="p-8 border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.1)]">
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    Estimated Investment & Timeline
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                    {formatPrice(calculateEstimateUSD())}
                    <span className="text-sm font-semibold text-gray-400 block mt-0.5">
                      ~{calculateTotalWeeks()} Weeks Target
                    </span>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Sparkles className="w-7 h-7" />
                </div>
              </div>

              <div className="py-6 space-y-4 text-sm border-b border-white/10">
                <div className="flex justify-between items-center text-gray-300">
                  <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" /> Core Archetype
                  </span>
                  <span className="font-semibold text-white">{currentType.name}</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-yellow-400" /> Selected Currency
                  </span>
                  <span className="font-semibold text-yellow-300">
                    {activeCurrency.flag} {activeCurrency.code} ({activeCurrency.name})
                  </span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Security Standard
                  </span>
                  <span className="font-semibold text-emerald-400">DevSecOps Hardened</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-400" /> Selected Modules
                  </span>
                  <span className="font-semibold text-white">{selectedFeatures.length} Add-on(s)</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" /> Delivery Sprint
                  </span>
                  <span className="font-semibold text-white capitalize">{timelineSpeed}</span>
                </div>
              </div>

              <div className="pt-6">
                <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                  Every Haque & Sons project includes full source code ownership, automated CI/CD security audits, responsive UI, and 30 days of post-launch guarantee.
                </p>

                <button
                  onClick={handleApplyToContact}
                  className="w-full py-4 rounded-xl font-bold text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_45px_rgba(6,182,212,0.6)] flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Lock in Estimate & Inquire</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
