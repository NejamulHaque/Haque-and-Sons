"use client";

import { useState, Suspense } from "react";
import { signIn, signUp } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, User, ArrowRight, GraduationCap, AlertCircle, CheckCircle2, Sparkles, Building } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import Link from "next/link";
import Image from "next/image";

function StudentAuthContent() {
  const searchParams = useSearchParams();
  const domainParam = searchParams.get("domain");
  const redirectParam = searchParams.get("redirect") || "/profile";

  const [mode, setMode] = useState<"signin" | "signup">(domainParam ? "signup" : "signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn.email({
        email,
        password,
      });

      if (res.error) {
        setError(res.error.message || "Invalid email or password. Please try again.");
      } else {
        const dest = domainParam ? `/profile?domain=${domainParam}` : redirectParam;
        router.push(dest);
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication request failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signUp.email({
        email,
        password,
        name: name || "Student",
      });

      if (res.error) {
        if (
          res.error.message?.toLowerCase().includes("exists") ||
          res.error.status === 422 ||
          res.error.status === 400
        ) {
          setError("An account with this email already exists. Please Sign In.");
        } else {
          setError(res.error.message || "Failed to create account.");
        }
      } else {
        // Auto initialize profile record
        try {
          await fetch("/api/profile/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fullName: name,
              email,
              domain: domainParam || "Full-Stack Web Development",
            }),
          });
        } catch {
          // ignore
        }

        const dest = domainParam ? `/profile?domain=${domainParam}` : redirectParam;
        router.push(dest);
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Glow ambient */}
      <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Header Logo */}
        <div className="text-center space-y-2">
          <Link href="/internships" className="inline-flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-600 p-1 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:scale-105 transition-all">
              <Image src="/logo.svg" alt="Haque & Sons" fill className="p-1 object-cover" unoptimized />
            </div>
            <div className="text-left">
              <span className="font-extrabold text-white text-base tracking-tight block">
                Haque & Sons
              </span>
              <span className="text-[10px] text-cyan-400 font-mono block">
                Student & Intern Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Selected domain banner */}
        {domainParam && (
          <div className="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-center space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider block">
              Enrolling in Track
            </span>
            <span className="text-xs font-bold text-white capitalize block">
              {domainParam.replace(/-/g, " ")}
            </span>
          </div>
        )}

        {/* Auth Card */}
        <SpotlightCard className="p-6 sm:p-8 border-white/10 bg-gray-950/80 backdrop-blur-xl">
          {/* Tabs */}
          <div className="flex bg-black/60 p-1 rounded-xl border border-white/10 mb-6">
            <button
              onClick={() => {
                setMode("signin");
                setError("");
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === "signin"
                  ? "bg-cyan-500 text-black shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode("signup");
                setError("");
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === "signup"
                  ? "bg-cyan-500 text-black shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Create Account
            </button>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/50 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {mode === "signin" ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@college.edu"
                    className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In to Student Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Rahul Sharma"
                    className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@college.edu"
                    className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Create Account & Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </SpotlightCard>

        {/* Footer info */}
        <div className="text-center text-xs text-gray-400">
          <Link href="/internships" className="hover:text-cyan-400 transition-colors">
            ← Back to Internship Domains
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function StudentAuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading portal...</div>}>
      <StudentAuthContent />
    </Suspense>
  );
}
