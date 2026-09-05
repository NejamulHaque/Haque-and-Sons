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
} from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import Link from "next/link";
import Image from "next/image";

import { INTERNSHIP_DOMAINS } from "@/lib/domains";
import {
  ACADEMIC_DEGREES,
  getBranchesForDegree,
  formatFullDegree,
  GRADUATION_YEARS,
  checkPasswordStrength,
  isValidEmail,
} from "@/lib/academic-fields";

function StudentSignUpContent() {
  const searchParams = useSearchParams();
  const domainParam = searchParams.get("domain") || "";
  const modeParam = searchParams.get("mode") || "Online";
  const typeParam = searchParams.get("type") || "Free";
  const durationParam = searchParams.get("duration") || "4 Weeks";
  const redirectParam = searchParams.get("redirect") || "/profile";

  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [degree, setDegree] = useState("B.Tech");
  const [branch, setBranch] = useState("Computer Science & Engineering (CSE)");
  const [graduationYear, setGraduationYear] = useState("2026");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordStrength = checkPasswordStrength(password);

  const [selectedDomain, setSelectedDomain] = useState(
    domainParam ? domainParam.replace(/-/g, " ") : "Full-Stack Web Development"
  );
  const [selectedMode, setSelectedMode] = useState(modeParam || "Online");
  const [selectedDuration, setSelectedDuration] = useState(durationParam || "4 Weeks");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDegreeChange = (newDegree: string) => {
    setDegree(newDegree);
    const branches = getBranchesForDegree(newDegree);
    if (branches.length > 0) {
      setBranch(branches[0]);
    }
  };

  // If already logged in, route to profile
  useEffect(() => {
    if (!isPending && session?.user) {
      const dest = domainParam ? `/profile?domain=${encodeURIComponent(domainParam)}` : redirectParam;
      router.push(dest);
    }
  }, [session, isPending, domainParam, redirectParam, router]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address (e.g. candidate@college.edu).");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (!passwordStrength.checks.hasUppercase || !passwordStrength.checks.hasLowercase || !passwordStrength.checks.hasNumber) {
      setError("Password must contain at least one uppercase letter, one lowercase letter, and one number.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    setLoading(true);

    try {
      const res = await signUp.email({
        email: email.trim().toLowerCase(),
        password,
        name: name.trim() || "Student",
      });

      if (res.error) {
        if (
          res.error.message?.toLowerCase().includes("exists") ||
          res.error.status === 422 ||
          res.error.status === 400
        ) {
          setError("An account with this email already exists. Please Sign In instead.");
        } else {
          setError(res.error.message || "Failed to create student account.");
        }
      } else {
        // Auto initialize student profile in Postgres DB with chosen domain, degree and mode
        try {
          const formattedDegree = formatFullDegree(degree, branch);
          await fetch("/api/profile/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fullName: name.trim(),
              email: email.trim().toLowerCase(),
              college: college.trim() || "College / University",
              degree: formattedDegree,
              graduationYear,
              domain: selectedDomain,
              mode: selectedMode,
              internshipType: typeParam.includes("Paid") ? "Paid (Stipend)" : "Free (Project Certification)",
              duration: selectedDuration,
            }),
          });
        } catch {
          // Non-blocking
        }

        const dest = `/profile?domain=${encodeURIComponent(selectedDomain)}`;
        router.push(dest);
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration request failed.");
    } finally {
      setLoading(false);
    }
  };


  const signinUrl = `/auth/signin${
    selectedDomain
      ? `?domain=${encodeURIComponent(selectedDomain)}&mode=${encodeURIComponent(selectedMode)}&duration=${encodeURIComponent(selectedDuration)}`
      : ""
  }`;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full max-w-lg relative z-10 space-y-6">
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
                Student & Intern Registration
              </span>
            </div>
          </Link>
        </div>

        {/* Registration Card */}
        <SpotlightCard className="p-6 sm:p-8 border-white/10 bg-gray-950/80 backdrop-blur-xl shadow-2xl">
          <div className="mb-6 space-y-1">
            <h2 className="text-xl font-bold text-white">Create Student Account</h2>
            <p className="text-xs text-gray-400">
              Select your internship domain and register to access your roadmap, offer letter, and certificate.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/50 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Domain Selection Dropdown */}
            <div>
              <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                Choose Your Internship Domain Track *
              </label>
              <div className="relative">
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-cyan-400 transition-all font-semibold cursor-pointer"
                >
                  {INTERNSHIP_DOMAINS.map((d) => (
                    <option key={d.id} value={d.name} className="bg-gray-950 text-white py-1">
                      {d.icon} {d.name} ({d.category})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mode & Duration Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                  Track Mode *
                </label>
                <select
                  value={selectedMode}
                  onChange={(e) => setSelectedMode(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-400 transition-all cursor-pointer font-medium"
                >
                  <option value="Online">🌐 Online (₹99)</option>
                  <option value="Hybrid">⚡ Hybrid (₹199)</option>
                  <option value="Offline">🏢 Offline (₹249)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                  Duration *
                </label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-400 transition-all cursor-pointer font-medium"
                >
                  <option value="4 Weeks">4 Weeks (Fast-track)</option>
                  <option value="8 Weeks">8 Weeks (Standard)</option>
                  <option value="12 Weeks">12 Weeks (Comprehensive)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                  Full Name *
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
                  Email Address *
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
            </div>

            {/* Academic Field & Branch Selection Box */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-cyan-500/20 space-y-3.5">
              <div className="flex items-center gap-2 text-cyan-300">
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold uppercase tracking-wider font-mono">
                  Academic Field &amp; Specialization
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Degree / Field *
                  </label>
                  <select
                    value={degree}
                    onChange={(e) => handleDegreeChange(e.target.value)}
                    className="w-full bg-black/80 border border-white/15 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-400 transition-all font-medium cursor-pointer"
                  >
                    {ACADEMIC_DEGREES.map((deg) => (
                      <option key={deg.id} value={deg.id} className="bg-gray-950 text-white">
                        {deg.shortLabel} — {deg.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Branch / Specialization *
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full bg-black/80 border border-white/15 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-400 transition-all font-medium cursor-pointer"
                  >
                    {getBranchesForDegree(degree).map((br) => (
                      <option key={br} value={br} className="bg-gray-950 text-white">
                        {br}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    College / University *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      required
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      placeholder="e.g. Delhi University / IIT Delhi"
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-2 pl-10 pr-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Graduation Batch (Up to 2050) *
                  </label>
                  <select
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                    className="w-full bg-black/80 border border-white/15 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-400 transition-all font-medium cursor-pointer"
                  >
                    {GRADUATION_YEARS.map((yr) => (
                      <option key={yr} value={yr} className="bg-gray-950 text-white">
                        Batch {yr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Password Fields with Live Security Meter */}
            <div className="space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 8 chars"
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-9 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      minLength={8}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter"
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-9 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                      title={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Password Strength Meter & Checklist */}
              {password.length > 0 && (
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-gray-400 font-mono">Password Security:</span>
                    <span
                      className={`font-bold font-mono ${
                        passwordStrength.score >= 80
                          ? "text-emerald-400"
                          : passwordStrength.score >= 60
                          ? "text-cyan-400"
                          : passwordStrength.score >= 40
                          ? "text-amber-400"
                          : "text-red-400"
                      }`}
                    >
                      {passwordStrength.label} ({passwordStrength.score}%)
                    </span>
                  </div>

                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${Math.max(10, passwordStrength.score)}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 text-[10px] text-gray-400 font-mono pt-1">
                    <span
                      className={`flex items-center gap-1 ${
                        passwordStrength.checks.minLength ? "text-emerald-400 font-semibold" : "text-gray-500"
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" /> 8+ Characters
                    </span>
                    <span
                      className={`flex items-center gap-1 ${
                        passwordStrength.checks.hasUppercase && passwordStrength.checks.hasLowercase
                          ? "text-emerald-400 font-semibold"
                          : "text-gray-500"
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" /> Upper &amp; Lowercase
                    </span>
                    <span
                      className={`flex items-center gap-1 ${
                        passwordStrength.checks.hasNumber ? "text-emerald-400 font-semibold" : "text-gray-500"
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" /> Number (0-9)
                    </span>
                    <span
                      className={`flex items-center gap-1 ${
                        passwordStrength.checks.hasSpecial ? "text-emerald-400 font-semibold" : "text-gray-500"
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" /> Special Symbol (!@#$)
                    </span>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account & Start Sprint</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Switch to Sign In */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <p className="text-xs text-gray-400">
              Already registered with Haque & Sons?{" "}
              <Link
                href={signinUrl}
                className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
              >
                Log In / Sign In
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
