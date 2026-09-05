"use client";

import React, { useState } from "react";
import { Sparkles, Bot, X, Send, ChevronDown, ChevronUp, Terminal, Code2, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  sender: "user" | "irus";
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  {
    title: "Next.js 16 & Neon DB",
    prompt: "How should I structure my database schema and API routes in Next.js 16 with Neon PostgreSQL?",
    reply: "For production architectures at Haque & Sons:\n1. Keep your Drizzle schema in `src/db/schema.ts` with strict typed constraints.\n2. Use `@neondatabase/serverless` connection pooler with WebSocket support for fast edge queries.\n3. Always validate incoming request bodies with zero-trust checks.\n4. Separate business logic from API handlers into isolated service functions.",
  },
  {
    title: "Deployment Checklist",
    prompt: "What is the pre-flight checklist before submitting my live project URL?",
    reply: "Capstone Pre-Flight Checklist:\n✓ 0 TypeScript compilation errors (`pnpm check-types`)\n✓ Clean Lighthouse performance score (>90)\n✓ Configured production environment variables on Vercel/Render\n✓ Working SSL/HTTPS certificate on live URL\n✓ Comprehensive `README.md` with system architecture diagrams.",
  },
  {
    title: "GitHub README Guide",
    prompt: "How do I make my GitHub capstone repository look top 1% to recruiters?",
    reply: "Recruiter-Ready README Structure:\n1. Project Banner + Haque & Sons Verified SVG Badge.\n2. Live Demo URL & Test Credentials.\n3. Core Architectural Highlights (Tech Stack, DB ERD).\n4. Step-by-Step Local Setup (`pnpm install && pnpm dev`).\n5. API Endpoints Reference Matrix & Security Practices.",
  },
];

export function IrusCopilotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "irus",
      text: "Hello! I am Irus AI, your Studio Copilot. How can I assist with your capstone architecture or milestone verification today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    // Look for matching pre-defined response or provide contextual engineering response
    const matchedPrompt = QUICK_PROMPTS.find(
      (p) => p.prompt.toLowerCase() === query.toLowerCase() || query.toLowerCase().includes(p.title.toLowerCase())
    );

    setTimeout(() => {
      const responseText = matchedPrompt
        ? matchedPrompt.reply
        : `To achieve enterprise-grade results in ${query.slice(0, 30)}...: Maintain modular component boundaries, enforce strict TypeScript typing, implement parameterized queries to prevent SQL injection, and verify zero hydration errors in your Next.js application.`;

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "irus",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[90vw] sm:w-[400px] h-[520px] rounded-3xl bg-gray-950/95 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_0_50px_rgba(6,182,212,0.25)] flex flex-col overflow-hidden mb-3"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-gray-950 via-gray-900 to-black border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
                    <span>Irus AI Copilot</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </h4>
                  <p className="text-[10px] text-gray-400 font-mono">Haque &amp; Sons Capstone Assistant</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Prompts Carousel */}
            <div className="p-2.5 bg-white/[0.02] border-b border-white/5 flex gap-2 overflow-x-auto text-[11px] no-scrollbar">
              {QUICK_PROMPTS.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(qp.prompt)}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/15 border border-white/10 hover:border-cyan-500/30 text-gray-300 hover:text-cyan-300 whitespace-nowrap transition-all flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>{qp.title}</span>
                </button>
              ))}
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-xs shadow-md"
                        : "bg-white/[0.06] border border-white/10 text-gray-200 rounded-bl-xs"
                    }`}
                  >
                    {msg.text}
                    <div
                      className={`text-[9px] mt-1 text-right font-mono ${
                        msg.sender === "user" ? "text-cyan-100/70" : "text-gray-500"
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 text-gray-400 p-2 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[10px] text-gray-500 ml-1">Irus is thinking...</span>
                </div>
              )}
            </div>

            {/* Input Footer */}
            <div className="p-3 bg-gray-950 border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask Irus about your capstone architecture..."
                className="flex-1 bg-white/5 border border-white/10 focus:border-cyan-500/50 rounded-xl px-3 py-2 text-xs text-white placeholder:text-gray-500 outline-none transition-colors"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all disabled:opacity-40 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:scale-105 active:scale-95 text-white font-bold text-xs shadow-[0_0_25px_rgba(6,182,212,0.45)] border border-cyan-300/40 flex items-center gap-2.5 transition-all cursor-pointer"
      >
        <Sparkles className="w-4 h-4 text-cyan-200 animate-spin [animation-duration:8s]" />
        <span>{isOpen ? "Close Copilot" : "Irus AI Copilot"}</span>
      </button>
    </div>
  );
}
