"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";

function GithubSvg({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.29 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.28-1.56 3.285-1.245 3.285-1.245.675 1.65.255 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
function LinkedinSvg({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function CTA() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send");
      }
      setFormState("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormState("idle"), 4000);
    } catch (err: unknown) {
      setFormState("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setTimeout(() => setFormState("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="py-32 bg-black px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-3 mb-6">
            Let&apos;s Build Something{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Great
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Whether you need a custom AI solution, collaborative platform, or secure software
            architecture — we&apos;re ready.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none"
                placeholder="Tell us about your project..."
              />
            </div>
            {formState === "error" && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={16} /> {errorMsg}
              </div>
            )}
            <button
              type="submit"
              disabled={formState !== "idle"}
              className="w-full py-4 rounded-xl font-bold text-black bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {formState === "idle" && (
                <>
                  <Send size={18} /> Send Message
                </>
              )}
              {formState === "submitting" && (
                <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              )}
              {formState === "success" && (
                <>
                  <CheckCircle size={18} /> Message Sent!
                </>
              )}
              {formState === "error" && (
                <>
                  <AlertCircle size={18} /> Try Again
                </>
              )}
            </button>
          </motion.form>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <Mail className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Email Us Directly</h3>
              <a
                href="mailto:nejamulhaque.works@gmail.com"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                nejamulhaque.works@gmail.com
              </a>
            </div>
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-lg font-bold text-white mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/NejamulHaque"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-white/[0.08] hover:bg-white/[0.06] text-gray-400 hover:text-white transition-all"
                  aria-label="GitHub"
                >
                  <GithubSvg size={22} />
                </a>
                <a
                  href="https://linkedin.com/in/nejamulhaque"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-white/[0.08] hover:bg-white/[0.06] text-gray-400 hover:text-white transition-all"
                  aria-label="LinkedIn"
                >
                  <LinkedinSvg size={22} />
                </a>
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
              <h3 className="text-lg font-bold text-white mb-2">Response Time</h3>
              <p className="text-gray-400 text-sm">
                We typically respond within 24 hours. For urgent projects, mention it in your
                message.
              </p>
            </div>
          </motion.div>
        </div>
        <p className="mt-20 text-center text-xs text-gray-600">
          © 2026 Haque & Sons. All rights reserved.
        </p>
      </div>
    </section>
  );
}
