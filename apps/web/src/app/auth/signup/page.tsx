"use client";

import { useState, useEffect, Suspense } from "react";
import { signUp, useSession } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock,
  Mail,
  User,
  ArrowRight,
  GraduationCap,
  AlertCircle,
  Building,
  ShieldCheck,
  CheckCircle2,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import Link from "next/link";
import Image from "next/image";
import { INTERNSHIP_DOMAINS } from "@/lib/domains";
import { isValidEmail } from "@/lib/academic-fields";

function StudentSignUpContent() {
  const searchParams = useSearchParams();
  const domainParam = searchParams.get("domain") || "";
  const redirectParam = searchParams.get("redirect") || "/profile";

  const { data: session, isPending } = useSession();
  const router = useRouter();

  // Find initial domain match
  const matchedDomain = INTERNSHIP_DOMAINS.find(
    (d) => d.id === domainParam || d.name.toLowerCase() === domainParam.toLowerCase()
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [selectedDomain, setSelectedDomain] = useState(
    matchedDomain ? matchedDomain.name : "Full-Stack Web Development"
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // If already logged in, route to profile
  useEffect(() => {
    if (!isPending && session?.user) {
      const dest = domainParam
        ? `/profile?domain=${encodeURIComponent(domainParam)}`
        : redirectParam;
      router.push(dest);
    }
  }, [session, isPending, domainParam, redirectParam, router]);

  // Simple password strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { label: "", color: "bg-transparent", percent: 0 };
    let score = 0;
    if (pwd.length >= 8) score += 35;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score += 35;
    if (/[0-9]/.test(pwd) || /[^A-Za-z0-9]/.test(pwd)) score += 30;

    if (score < 40) return { label: "Weak", color: "bg-red-400", percent: 33 };
    if (score < 75) return { label: "Good", color: "bg-amber-400", percent: 66 };
    return { label: "Strong", color: "bg-emerald-400", percent: 100 };
  };

  const strength = getPasswordStrength(password);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanCollege = college.trim();

    if (!cleanName || cleanName.length < 2) {
      setError("Please enter your full legal name for your internship credentials.");
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setError("Please enter a valid email address (e.g. candidate@college.edu).");
      return;
    }

    if (!cleanCollege) {
      setError("Please enter your college or university name.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    setLoading(true);

    try {
      const res = await signUp.email({
        email: cleanEmail,
        password,
        name: cleanName,
      });

      if (res.error) {
        if (
          res.error.message?.toLowerCase().includes("exists") ||
          res.error.status === 422 ||
          res.error.status === 400
        ) {
          setError("An account with this email already exists.");
        } else {
          setError(res.error.message || "Failed to create student account.");
        }
        setLoading(false);
      } else {
        // Initialize student profile in PostgreSQL DB
        try {
          await fetch("/api/profile/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fullName: cleanName,
              email: cleanEmail,
              college: cleanCollege,
              degree: "Engineering / Technical Degree",
              graduationYear: "2026",
              domain: selectedDomain,
              mode: "Online",
              internshipType: "Free (Project Certification)",
              duration: "4 Weeks",
            }),
          });
        } catch {
          // Non-blocking
        }

        setSuccess(true);
        const domainSlug =
          INTERNSHIP_DOMAINS.find((d) => d.name === selectedDomain)?.id || "full-stack-web";
        const dest = `/profile?domain=${encodeURIComponent(domainSlug)}`;

        setTimeout(() => {
          router.push(dest);
          router.refresh();
        }, 600);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration request failed.");
      setLoading(false);
    }
  };

  const signinUrl = `/auth/signin${
    email ? `?email=${encodeURIComponent(email)}` : ""
  }`;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full max-w-lg relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/internships" className="inline-flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-600 p-1 flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.4)] group-hover:scale-105 transition-all">
              <Image src="/logo.svg" alt="Haque & Sons" fill className="p-1 object-contain" unoptimized />
            </div>
            <div className="text-left">
              <span className="font-extrabold text-white text-lg tracking-tight block">
                Haque &amp; Sons
              </span>
              <span className="text-[10px] text-cyan-400 font-mono block">
                Student &amp; Intern Registration
              </span>
            </div>
          </Link>
        </div>

        {/* Registration Card */}
        <SpotlightCard className="p-6 sm:p-8 border-white/10 bg-[#090d16]/90 backdrop-blur-xl shadow-2xl rounded-3xl">
          <div className="mb-6 space-y-1">
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
              <span>Create Student Account</span>
            </h1>
            <p className="text-xs text-gray-400 leading-relaxed">
              Register in 30 seconds to receive your capstone project kit, curriculum, and verified certificate.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <div className="flex-1">
                <span>{error}</span>
                {error.includes("already exists") && (
                  <Link
                    href={signinUrl}
                    className="text-cyan-300 font-bold underline hover:text-cyan-200 mt-1 block"
                  >
                    Click here to Sign In with this email &rarr;
                  </Link>
                )}
              </div>
            </div>
          )}

          {success && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Account created! Transitioning to your dashboard...</span>
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Domain Selection Dropdown */}
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                Choose Your Internship Domain Track *
              </label>
              <div className="relative">
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all font-semibold cursor-pointer"
                >
                  {INTERNSHIP_DOMAINS.map((d) => (
                    <option key={d.id} value={d.name} className="bg-gray-950 text-white py-1">
                      {d.icon} {d.name} ({d.category})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Name & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Rahul Sharma"
                    className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@college.edu"
                    className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* College */}
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                College / University *
              </label>
              <div className="relative">
                <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  autoComplete="organization"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="e.g. Teerthanker Mahaveer University / IIT Delhi"
                  className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all font-medium"
                />
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                  Create Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-9 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all font-medium font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-9 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all font-medium font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    title={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Subtle Password Strength Indicator */}
            {password.length > 0 && (
              <div className="space-y-1 pt-0.5">
                <div className="flex items-center justify-between text-[11px] text-gray-400">
                  <span>Security strength:</span>
                  <span className="font-semibold text-white">{strength.label}</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${strength.color}`}
                    style={{ width: `${strength.percent}%` }}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4 active:scale-[0.98]"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>Create Account &amp; Access Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Switch to Sign In */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <p className="text-xs text-gray-400">
              Already registered with Haque &amp; Sons?{" "}
              <Link
                href="/auth/signin"
                className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors underline"
              >
                Log In / Sign In
              </Link>
            </p>
          </div>
        </SpotlightCard>

        {/* Security & Zero-Trust Notice */}
        <div className="flex items-center justify-center gap-4 text-[11px] text-gray-400 font-mono">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Better Auth Protected
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            256-bit Encrypted
          </span>
        </div>
      </div>
    </div>
  );
}

export default function StudentSignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          Loading student registration...
        </div>
      }
    >
      <StudentSignUpContent />
    </Suspense>
  );
}
