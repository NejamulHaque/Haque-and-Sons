"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn, useSession } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock,
  Mail,
  ArrowRight,
  GraduationCap,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import Link from "next/link";
import Image from "next/image";
import { isValidEmail } from "@/lib/academic-fields";

function StudentSignInContent() {
  const searchParams = useSearchParams();
  const domainParam = searchParams.get("domain") || "";
  const modeParam = searchParams.get("mode") || "Online";
  const typeParam = searchParams.get("type") || "Free";
  const durationParam = searchParams.get("duration") || "4 Weeks";
  const redirectParam = searchParams.get("redirect") || "/profile";

  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Brute force protection
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  useEffect(() => {
    if (lockoutRemaining <= 0) return;
    const interval = setInterval(() => {
      setLockoutRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutRemaining]);

  // If already logged in and not in the process of resolving, route straight to profile
  useEffect(() => {
    if (!isPending && session?.user) {
      const dest = domainParam ? `/profile?domain=${encodeURIComponent(domainParam)}` : redirectParam;
      router.push(dest);
    }
  }, [session, isPending, domainParam, redirectParam, router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (lockoutRemaining > 0) {
      setError(`Temporary security lockout active. Please wait ${lockoutRemaining}s.`);
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address (e.g. candidate@college.edu).");
      return;
    }

    setLoading(true);

    try {
      const res = await signIn.email({
        email: email.trim().toLowerCase(),
        password,
      });

      if (res.error) {
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);

        if (nextAttempts >= 5) {
          setLockoutRemaining(30);
          setError("Maximum failed attempts reached. For security, sign in is locked for 30 seconds.");
        } else {
          setError(
            res.error.message ||
              `Invalid credentials. (${5 - nextAttempts} attempts remaining before temporary lockout)`
          );
        }
      } else {
        setFailedAttempts(0);
        setLockoutRemaining(0);
        const dest = domainParam
          ? `/profile?domain=${encodeURIComponent(domainParam)}`
          : redirectParam;
        router.push(dest);
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication request failed.");
    } finally {
      setLoading(false);
    }
  };


  const signupUrl = `/auth/signup${
    domainParam
      ? `?domain=${encodeURIComponent(domainParam)}&mode=${encodeURIComponent(modeParam)}&type=${encodeURIComponent(typeParam)}&duration=${encodeURIComponent(durationParam)}`
      : ""
  }`;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/internships" className="inline-flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-600 p-1 flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.4)] group-hover:scale-105 transition-all">
              <Image src="/logo.svg" alt="Haque & Sons" fill className="p-1 object-cover" unoptimized />
            </div>
            <div className="text-left">
              <span className="font-extrabold text-white text-lg tracking-tight block">
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
          <div className="p-3 rounded-2xl bg-cyan-950/50 border border-cyan-500/30 text-center space-y-0.5 shadow-lg">
            <div className="flex items-center justify-center gap-1.5 text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Target Track</span>
            </div>
            <span className="text-xs font-bold text-white capitalize block">
              {domainParam.replace(/-/g, " ")} • {modeParam} ({durationParam})
            </span>
          </div>
        )}

        {/* Login Card */}
        <SpotlightCard className="p-6 sm:p-8 border-white/10 bg-gray-950/80 backdrop-blur-xl shadow-2xl">
          <div className="mb-6 space-y-1">
            <h2 className="text-xl font-bold text-white">Student Sign In</h2>
            <p className="text-xs text-gray-400">
              Enter your credentials to access your active sprint milestones, project submission, and verified certificates.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/50 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

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
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-10 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || lockoutRemaining > 0}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : lockoutRemaining > 0 ? (
                <span>Security Lockout ({lockoutRemaining}s)</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Switch to Sign Up */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <p className="text-xs text-gray-400">
              New to Haque & Sons Internship Program?{" "}
              <Link
                href={signupUrl}
                className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
              >
                Create Student Account
              </Link>
            </p>
          </div>
        </SpotlightCard>

        {/* Security & Zero-Trust Notice */}
        <div className="flex items-center justify-center gap-4 text-[11px] text-gray-500 font-mono">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Better Auth Protected
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            256-bit Encrypted
          </span>
        </div>
      </div>
    </div>
  );
}

export default function StudentSignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          Loading student sign in...
        </div>
      }
    >
      <StudentSignInContent />
    </Suspense>
  );
}
