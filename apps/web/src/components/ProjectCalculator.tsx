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
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-neutral-300 text-xs font-medium uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5 text-cyan-400" />
            <span>Transparent Scope Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Estimate Your Project Scope
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg leading-relaxed">
            Accessible, founder-friendly pricing built for startups and growing teams. Configure your modules and timeline for transparent estimates.
          </p>

          {/* Currency Switcher */}
          <div className="mt-8 inline-flex items-center gap-1 p-1 rounded-full bg-[#0c0c0e] border border-white/[0.08] backdrop-blur-md">
            <div className="px-3 py-1 text-xs font-medium text-neutral-400 flex items-center gap-1.5">
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
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "bg-white text-black shadow-sm font-semibold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <span>{c.flag}</span>
                  <span>{c.code}</span>
                  <span className="opacity-60 text-[10px]">({c.symbol.trim()})</span>
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
              <label className="block font-semibold uppercase tracking-wider text-xs text-neutral-400 mb-3">
                1. Select Core Archetype
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {PROJECT_TYPES.map((type) => {
                  const isSelected = selectedType === type.id;
                  return (
                    <div
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer relative bg-[#0c0c0e] ${
                        isSelected
                          ? "border-white/[0.3] bg-[#121216] ring-1 ring-white/[0.15]"
                          : "border-white/[0.08] hover:border-white/[0.18]"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-2xl">{type.icon}</span>
                        <div className="text-right">
                          <span className="text-xs font-semibold text-white">
                            From {formatPrice(type.basePriceUSD)}
                          </span>
                          <span className="block text-[11px] text-neutral-500 font-mono">
                            ~{type.baseWeeks}w base
                          </span>
                        </div>
                      </div>
                      <h4 className="font-semibold text-sm text-white tracking-tight">{type.name}</h4>
                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed font-normal">{type.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Modules */}
            <div>
              <label className="block font-semibold uppercase tracking-wider text-xs text-neutral-400 mb-3">
                2. Architectural Add-on Modules
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FEATURES.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <div
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all bg-[#0c0c0e] ${
                        isChecked
                          ? "border-white/[0.3] bg-[#121216]"
                          : "border-white/[0.08] hover:border-white/[0.18]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${
                            isChecked
                              ? "bg-white border-white text-black"
                              : "border-white/30 bg-transparent"
                          }`}
                        >
                          {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-white">{feat.name}</p>
                          <span className="text-[10px] text-neutral-400 font-mono">
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
              <label className="block font-semibold uppercase tracking-wider text-xs text-neutral-400 mb-3">
                3. Delivery Sprint Pace
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setTimelineSpeed("standard")}
                  className={`flex-1 p-4 rounded-2xl border text-xs font-medium cursor-pointer transition-all flex items-center justify-center gap-2 bg-[#0c0c0e] ${
                    timelineSpeed === "standard"
                      ? "border-white/[0.3] bg-[#121216] text-white"
                      : "border-white/[0.08] text-neutral-400 hover:border-white/[0.18]"
                  }`}
                >
                  <Clock className="w-4 h-4 text-cyan-400" />
                  Standard Agile Pace
                </button>
                <button
                  onClick={() => setTimelineSpeed("expedited")}
                  className={`flex-1 p-4 rounded-2xl border text-xs font-medium cursor-pointer transition-all flex items-center justify-center gap-2 bg-[#0c0c0e] ${
                    timelineSpeed === "expedited"
                      ? "border-white/[0.3] bg-[#121216] text-white"
                      : "border-white/[0.08] text-neutral-400 hover:border-white/[0.18]"
                  }`}
                >
                  <Zap className="w-4 h-4 text-yellow-400" />
                  Fast-Track Launch (+Priority)
                </button>
              </div>
            </div>
          </div>

          {/* Summary Box */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="p-8 rounded-3xl border border-white/[0.1] bg-[#0c0c0e]/95 backdrop-blur-2xl shadow-xl">
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                <div>
                  <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Estimated Investment &amp; Timeline
                  </span>
                  <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
                    {formatPrice(calculateEstimateUSD())}
                    <span className="text-xs font-normal text-neutral-400 block mt-1">
                      ~{calculateTotalWeeks()} Weeks Target
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-cyan-400">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              <div className="py-6 space-y-3.5 text-xs border-b border-white/[0.08]">
                <div className="flex justify-between items-center text-neutral-400">
                  <span className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" /> Core Archetype
                  </span>
                  <span className="font-medium text-white">{currentType.name}</span>
                </div>
                <div className="flex justify-between items-center text-neutral-400">
                  <span className="flex items-center gap-2">
                    <Coins className="w-3.5 h-3.5 text-neutral-300" /> Selected Currency
                  </span>
                  <span className="font-medium text-white">
                    {activeCurrency.flag} {activeCurrency.code} ({activeCurrency.name})
                  </span>
                </div>
                <div className="flex justify-between items-center text-neutral-400">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Security Standard
                  </span>
                  <span className="font-medium text-emerald-400">DevSecOps Hardened</span>
                </div>
                <div className="flex justify-between items-center text-neutral-400">
                  <span className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" /> Selected Modules
                  </span>
                  <span className="font-medium text-white">{selectedFeatures.length} Add-on(s)</span>
                </div>
                <div className="flex justify-between items-center text-neutral-400">
                  <span className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" /> Delivery Sprint
                  </span>
                  <span className="font-medium text-white capitalize">{timelineSpeed}</span>
                </div>
              </div>

              <div className="pt-6">
                <p className="text-xs text-neutral-400 mb-6 leading-relaxed font-normal">
                  Every Haque &amp; Sons project includes full source code ownership, automated CI/CD security audits, responsive UI, and 30 days of post-launch guarantee.
                </p>

                <button
                  onClick={handleApplyToContact}
                  className="w-full py-3.5 rounded-full font-medium text-sm text-black bg-white hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 shadow-sm"
                >
                  <span>Lock in Estimate &amp; Inquire</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
