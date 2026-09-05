"use client";

import { useState, useEffect } from "react";
import { signIn, signUp, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Mail,
  User,
  Building,
  GraduationCap,
  ArrowRight,
  X,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Eye,
  EyeOff,
  Sliders,
  Cpu,
} from "lucide-react";
import { INTERNSHIP_DOMAINS } from "@/lib/domains";
import { ACADEMIC_DEGREES, getBranchesForDegree, formatFullDegree, GRADUATION_YEARS } from "@/lib/academic-fields";
import Image from "next/image";

interface AuthModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialMode?: "signin" | "signup";
  defaultDomain?: string;
  redirectTo?: string;
}

export function AuthModal({
  isOpen: propsIsOpen,
  onClose: propsOnClose,
  initialMode = "signin",
  defaultDomain = "full-stack-web",
  redirectTo = "/profile",
}: AuthModalProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [selectedDomain, setSelectedDomain] = useState(defaultDomain);
  const [selectedMode, setSelectedMode] = useState("Online");
  const [selectedDuration, setSelectedDuration] = useState("4 Weeks");

  // Sign In fields
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Sign Up fields
  const [signUpName, setSignUpName] = useState("");
  const [signUpCollege, setSignUpCollege] = useState("");
  const [signUpDegree, setSignUpDegree] = useState("B.Tech");
  const [signUpBranch, setSignUpBranch] = useState("Computer Science & Engineering (CSE)");
  const [signUpGraduationYear, setSignUpGraduationYear] = useState("2026");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");

  const handleDegreeChange = (newDegree: string) => {
    setSignUpDegree(newDegree);
    const branches = getBranchesForDegree(newDegree);
    if (branches.length > 0) {
      setSignUpBranch(branches[0]);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const isControlled = propsIsOpen !== undefined;
  const isOpen = isControlled ? propsIsOpen : internalIsOpen;

  // Listen to global open event
  useEffect(() => {
    const handleOpen = (e: any) => {
      if (e.detail?.mode) setMode(e.detail.mode);
      if (e.detail?.domain) setSelectedDomain(e.detail.domain);
      setError(null);
      setSuccessMsg(null);
      setInternalIsOpen(true);
    };

    window.addEventListener("haque-open-auth", handleOpen);
    return () => window.removeEventListener("haque-open-auth", handleOpen);
  }, []);

  // Sync mode if initialMode prop changes
  useEffect(() => {
    if (initialMode) setMode(initialMode);
  }, [initialMode]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setError(null);
    setSuccessMsg(null);
    if (propsOnClose) {
      propsOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await signIn.email({
        email: signInEmail.trim().toLowerCase(),
        password: signInPassword,
      });

      if (res.error) {
        setError(res.error.message || "Invalid email or password. Please verify your credentials.");
        setLoading(false);
      } else {
        setSuccessMsg("Signed in successfully! Transitioning to your Internship Dashboard...");
        setTimeout(() => {
          handleClose();
          const targetUrl = selectedDomain
            ? `/profile?domain=${encodeURIComponent(selectedDomain)}`
            : redirectTo;
          router.push(targetUrl);
          router.refresh();
        }, 600);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication request failed.");
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (signUpPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    if (signUpPassword !== signUpConfirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      setLoading(false);
      return;
    }

    try {
      const res = await signUp.email({
        email: signUpEmail.trim().toLowerCase(),
        password: signUpPassword,
        name: signUpName.trim() || "Student",
      });

      if (res.error) {
        if (
          res.error.message?.toLowerCase().includes("exists") ||
          res.error.status === 422 ||
          res.error.status === 400
        ) {
          setError("An account with this email already exists. Switching you to Sign In...");
          setTimeout(() => setMode("signin"), 1500);
        } else {
          setError(res.error.message || "Failed to create student account.");
        }
        setLoading(false);
      } else {
        // Initialize student profile record in PostgreSQL
        try {
          const domainObj = INTERNSHIP_DOMAINS.find((d) => d.id === selectedDomain);
          const formattedDegree = formatFullDegree(signUpDegree, signUpBranch);
          await fetch("/api/profile/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fullName: signUpName.trim(),
              email: signUpEmail.trim().toLowerCase(),
              college: signUpCollege.trim() || "College / University",
              degree: formattedDegree,
              graduationYear: signUpGraduationYear,
              domain: domainObj ? domainObj.name : "Full-Stack Web Development",
              mode: selectedMode,
              internshipType: "Free (Project Certification)",
              duration: selectedDuration,
            }),
          });
        } catch {
          // Non-blocking
        }

        setSuccessMsg("Account created! Transitioning to your Internship Dashboard...");
        setTimeout(() => {
          handleClose();
          const targetUrl = `/profile?domain=${encodeURIComponent(selectedDomain)}`;
          router.push(targetUrl);
          router.refresh();
        }, 700);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration request failed.");
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
          {/* Backdrop dismiss */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-lg bg-[#070a12] border border-cyan-500/30 rounded-3xl shadow-[0_0_60px_rgba(6,182,212,0.25)] overflow-hidden my-6 z-10 select-none"
          >
            {/* Top decorative gradient bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600" />

            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Modal Header */}
            <div className="p-5 sm:p-6 pb-0 flex items-start justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-600 p-1 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] shrink-0">
                  <Image src="/logo.svg" alt="Haque & Sons" fill className="p-1 object-contain" unoptimized />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
                    Haque &amp; Sons <span className="text-cyan-400">Portal</span>
                  </h3>
                  <p className="text-[10px] text-gray-400 font-mono">
                    Internship Dashboard &amp; Verification Hub
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Animated Tab Switcher */}
            <div className="px-5 sm:px-6 pt-4 pb-2 relative z-10">
              <div className="grid grid-cols-2 p-1 bg-black/60 border border-white/10 rounded-2xl relative">
                <button
                  type="button"
                  onClick={() => {
                    setMode("signin");
                    setError(null);
                    setSuccessMsg(null);
                  }}
                  className={`py-2 text-xs font-bold rounded-xl transition-all relative z-10 cursor-pointer flex items-center justify-center gap-1.5 ${
                    mode === "signin" ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Student Sign In</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setError(null);
                    setSuccessMsg(null);
                  }}
                  className={`py-2 text-xs font-bold rounded-xl transition-all relative z-10 cursor-pointer flex items-center justify-center gap-1.5 ${
                    mode === "signup" ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Create Account</span>
                </button>

                {/* Animated active pill background */}
                <motion.div
                  className="absolute inset-y-1 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  layoutId="auth-tab-pill"
                  style={{
                    left: mode === "signin" ? "4px" : "50%",
                    width: "calc(50% - 4px)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              </div>
            </div>

            {/* Status alerts */}
            <div className="px-5 sm:px-6 relative z-10">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2 mt-2"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </motion.div>
              )}

              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2 mt-2"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{successMsg}</span>
                </motion.div>
              )}
            </div>

            {/* Form Content with Cross-Fade Transition */}
            <div className="p-5 sm:p-6 pt-3 relative z-10 max-h-[72vh] overflow-y-auto">
              <AnimatePresence mode="wait">
                {mode === "signin" ? (
                  /* ================= SIGN IN FORM ================= */
                  <motion.form
                    key="signin-form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSignInSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                        Student Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          type="email"
                          required
                          value={signInEmail}
                          onChange={(e) => setSignInEmail(e.target.value)}
                          placeholder="candidate@college.edu"
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
                          value={signInPassword}
                          onChange={(e) => setSignInPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-10 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 uppercase tracking-wider"
                      >
                        {loading ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>Sign In to Internship Dashboard</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-center pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setMode("signup");
                          setError(null);
                        }}
                        className="text-xs text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        New intern candidate? <strong className="text-cyan-300 underline">Create Student Account</strong>
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  /* ================= SIGN UP FORM ================= */
                  <motion.form
                    key="signup-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSignUpSubmit}
                    className="space-y-3.5"
                  >
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
                            value={signUpName}
                            onChange={(e) => setSignUpName(e.target.value)}
                            placeholder="Rahul Sharma"
                            className="w-full bg-black/60 border border-white/10 rounded-xl py-2 pl-10 pr-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all font-medium"
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
                            value={signUpEmail}
                            onChange={(e) => setSignUpEmail(e.target.value)}
                            placeholder="candidate@college.edu"
                            className="w-full bg-black/60 border border-white/10 rounded-xl py-2 pl-10 pr-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Academic Field & Branch Section */}
                    <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-cyan-500/20 space-y-3">
                      <div className="flex items-center gap-1.5 text-cyan-300">
                        <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-[10px] font-bold uppercase tracking-wider font-mono">
                          Academic Field &amp; Specialization
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label className="text-[10px] font-semibold text-gray-300 block mb-1">
                            Field / Degree *
                          </label>
                          <select
                            value={signUpDegree}
                            onChange={(e) => handleDegreeChange(e.target.value)}
                            className="w-full bg-black/80 border border-white/15 rounded-xl py-1.5 px-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-medium cursor-pointer"
                          >
                            {ACADEMIC_DEGREES.map((deg) => (
                              <option key={deg.id} value={deg.id} className="bg-gray-950 text-white">
                                {deg.shortLabel} — {deg.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-semibold text-gray-300 block mb-1">
                            Branch / Major *
                          </label>
                          <select
                            value={signUpBranch}
                            onChange={(e) => setSignUpBranch(e.target.value)}
                            className="w-full bg-black/80 border border-white/15 rounded-xl py-1.5 px-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-medium cursor-pointer"
                          >
                            {getBranchesForDegree(signUpDegree).map((branch) => (
                              <option key={branch} value={branch} className="bg-gray-950 text-white">
                                {branch}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label className="text-[10px] font-semibold text-gray-300 block mb-1">
                            College / University *
                          </label>
                          <div className="relative">
                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                            <input
                              type="text"
                              required
                              value={signUpCollege}
                              onChange={(e) => setSignUpCollege(e.target.value)}
                              placeholder="e.g. Delhi University / IIT"
                              className="w-full bg-black/60 border border-white/10 rounded-xl py-1.5 pl-8 pr-2.5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 font-medium"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-semibold text-gray-300 block mb-1">
                            Graduation Batch *
                          </label>
                          <select
                            value={signUpGraduationYear}
                            onChange={(e) => setSignUpGraduationYear(e.target.value)}
                            className="w-full bg-black/80 border border-white/15 rounded-xl py-1.5 px-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-medium cursor-pointer"
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

                    {/* Domain Track Selection */}
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                        Target Internship Domain Track *
                      </label>
                      <select
                        value={selectedDomain}
                        onChange={(e) => setSelectedDomain(e.target.value)}
                        className="w-full bg-black/80 border border-white/15 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-400 transition-all font-medium cursor-pointer"
                      >
                        {INTERNSHIP_DOMAINS.map((domain) => (
                          <option key={domain.id} value={domain.id} className="bg-gray-950 text-white">
                            {domain.name} ({domain.category})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Mode & Duration Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                          Mode
                        </label>
                        <select
                          value={selectedMode}
                          onChange={(e) => setSelectedMode(e.target.value)}
                          className="w-full bg-black/80 border border-white/15 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-400 transition-all font-medium cursor-pointer"
                        >
                          <option value="Online">Online Track</option>
                          <option value="Hybrid">Hybrid Track</option>
                          <option value="Offline">Offline Studio Track</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                          Duration
                        </label>
                        <select
                          value={selectedDuration}
                          onChange={(e) => setSelectedDuration(e.target.value)}
                          className="w-full bg-black/80 border border-white/15 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-400 transition-all font-medium cursor-pointer"
                        >
                          <option value="4 Weeks">4 Weeks (Fast-Track)</option>
                          <option value="8 Weeks">8 Weeks (Comprehensive)</option>
                          <option value="12 Weeks">12 Weeks (Industry Capstone)</option>
                        </select>
                      </div>
                    </div>

                    {/* Password Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                          Password (min 8 chars) *
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <input
                            type={showPassword ? "text" : "password"}
                            required
                            minLength={8}
                            value={signUpPassword}
                            onChange={(e) => setSignUpPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-black/60 border border-white/10 rounded-xl py-2 pl-10 pr-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                          Confirm Password *
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <input
                            type={showPassword ? "text" : "password"}
                            required
                            minLength={8}
                            value={signUpConfirmPassword}
                            onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-black/60 border border-white/10 rounded-xl py-2 pl-10 pr-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 uppercase tracking-wider"
                      >
                        {loading ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 text-yellow-300" />
                            <span>Create Account &amp; Open Dashboard</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-center pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setMode("signin");
                          setError(null);
                        }}
                        className="text-xs text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        Already have an account? <strong className="text-cyan-300 underline">Sign In</strong>
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Helper function to open Auth Modal from anywhere in client code
export function openAuthModal(options?: { mode?: "signin" | "signup"; domain?: string }) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("haque-open-auth", {
        detail: options || { mode: "signin" },
      })
    );
  }
}
