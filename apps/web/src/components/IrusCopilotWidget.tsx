"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Bot, X, Send, Code2, CheckCircle2, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  sender: "user" | "irus";
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  {
    title: "How to Submit Capstone?",
    prompt: "How do I submit my capstone project and what is required?",
    reply: "To submit your Capstone project at Haque & Sons:\n1. Switch to the 'Capstone & Submission' tab.\n2. Ensure your GitHub repo is public with a comprehensive README.\n3. Provide your Live Production URL (Vercel/Render) and optional cloud ZIP backup.\n4. Click 'Submit Final Capstone' — our automated validator will run syntax and repository checks.",
  },
  {
    title: "Offer Letter & LOR",
    prompt: "How do I view my Offer Letter or request an official LOR?",
    reply: "Offer Letter & LOR Access:\n• Offer Letter: Click the 'Offer Letter' button in your profile HUD (or Roadmap Step 01) to view, print, or download.\n• Official LOR: High performers who complete their milestones can click 'Apply LOR' to receive an executive recommendation letter signed by CEO Nejamul Haque.",
  },
  {
    title: "Deployment Checklist",
    prompt: "What is the pre-flight checklist before submitting my live project URL?",
    reply: "Capstone Pre-Flight Checklist:\n✓ 0 TypeScript compilation errors (`pnpm check-types`)\n✓ Clean Lighthouse performance score (>90)\n✓ Configured production environment variables on Vercel/Render\n✓ Working SSL/HTTPS certificate on live URL\n✓ Comprehensive `README.md` with system architecture diagrams.",
  },
  {
    title: "Next.js 16 & Neon DB",
    prompt: "How should I structure my database schema and API routes in Next.js 16 with Neon PostgreSQL?",
    reply: "For production architectures at Haque & Sons:\n1. Keep your Drizzle schema in `src/db/schema.ts` with strict typed constraints.\n2. Use `@neondatabase/serverless` connection pooler with WebSocket support for fast edge queries.\n3. Always validate incoming request bodies with zero-trust checks.\n4. Separate business logic from API handlers into isolated service functions.",
  },
];

export function IrusCopilotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "irus",
      text: "Hello! I am Irus AI, your Studio Engineering Copilot. How can I assist with your capstone architecture, offer letter, or milestone verification today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat smoothly
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

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

    const lowerQuery = query.toLowerCase();
    const matchedPrompt = QUICK_PROMPTS.find(
      (p) =>
        lowerQuery === p.prompt.toLowerCase() ||
        lowerQuery.includes(p.title.toLowerCase()) ||
        (p.title.includes("Offer") && (lowerQuery.includes("offer") || lowerQuery.includes("lor"))) ||
        (p.title.includes("Submit") && (lowerQuery.includes("submit") || lowerQuery.includes("capstone")))
    );

    setTimeout(() => {
      let responseText = "";
      if (matchedPrompt) {
        responseText = matchedPrompt.reply;
      } else if (lowerQuery.includes("certificate") || lowerQuery.includes("verify")) {
        responseText = "Once your capstone deliverables and clearance review are completed, your official Certificate of Completion will be generated with a cryptographic QR code and public verification URL at haqueandsons.vercel.app/verify/[id].";
      } else if (lowerQuery.includes("scroll") || lowerQuery.includes("help")) {
        responseText = "You can navigate all sections of your profile via the top segmented bar (Overview, Curriculum, Capstone, Certificate, Profile). All tabs feature smooth animated transitions and responsive scrolling.";
      } else {
        responseText = `Regarding "${query.slice(0, 35)}...": Maintain modular component boundaries, enforce strict TypeScript typing, adhere to trunk-based Git workflows, and verify zero hydration errors in your deployment.`;
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "irus",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 print:hidden select-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="w-[calc(100vw-32px)] sm:w-[420px] h-[520px] max-h-[84vh] rounded-3xl bg-gray-950/95 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_0_60px_rgba(6,182,212,0.3)] flex flex-col overflow-hidden mb-3"
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
                  <p className="text-[10px] text-gray-400 font-mono">Haque &amp; Sons Studio Assistant</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    setMessages([
                      {
                        id: Date.now().toString(),
                        sender: "irus",
                        text: "Chat context cleared. How else can I assist with your engineering practicum?",
                        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                      },
                    ])
                  }
                  className="p-1.5 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  title="Reset Conversation"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
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
            <div className="flex-1 p-4 overflow-y-auto overscroll-contain space-y-3 font-sans text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl whitespace-pre-wrap leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-xs"
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
                  <span className="text-[10px] text-gray-500 ml-1">Irus is computing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
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
