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
  HelpCircle,
} from "lucide-react";
import { INTERNSHIP_DOMAINS } from "@/lib/domains";
import { isValidEmail } from "@/lib/academic-fields";
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

  // Sign In State
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign In Security: Rate limit / lockout
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  // Sign Up State - Clean, essential fields
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpCollege, setSignUpCollege] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] = useState(false);

  // Common UI State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showHelpNote, setShowHelpNote] = useState(false);

  const isControlled = propsIsOpen !== undefined;
  const isOpen = isControlled ? propsIsOpen : internalIsOpen;

  // Countdown timer for lockout
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

  // Listen to global open event
  useEffect(() => {
    const handleOpen = (e: any) => {
      if (e.detail?.mode) setMode(e.detail.mode);
      if (e.detail?.domain) {
        // Map domain id or name
        const match = INTERNSHIP_DOMAINS.find(
          (d) => d.id === e.detail.domain || d.name.toLowerCase() === e.detail.domain.toLowerCase()
        );
        setSelectedDomain(match ? match.id : e.detail.domain);
      }
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
    setShowHelpNote(false);
    if (propsOnClose) {
      propsOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  // Switch to signin with pre-filled email
  const switchToSignInWithEmail = (emailToFill: string) => {
    setSignInEmail(emailToFill);
    setMode("signin");
    setError(null);
    setSuccessMsg("Please enter your password to sign in.");
  };

  // Sign In Handler
  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (lockoutRemaining > 0) {
      setError(`Temporary security lockout active. Please wait ${lockoutRemaining}s.`);
      return;
    }

    if (!isValidEmail(signInEmail)) {
      setError("Please enter a valid email address (e.g. student@college.edu).");
      return;
    }

    if (!signInPassword) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await signIn.email({
        email: signInEmail.trim().toLowerCase(),
        password: signInPassword,
      });

      if (res.error) {
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);

        if (nextAttempts >= 5) {
          setLockoutRemaining(30);
          setError("Maximum attempts reached. For security, sign in is locked for 30 seconds.");
        } else {
          setError(
            res.error.message?.includes("Invalid") || res.error.message?.includes("credential")
              ? `Invalid email or password. (${5 - nextAttempts} attempts remaining)`
              : res.error.message || "Failed to sign in. Please verify your credentials."
          );
        }
        setLoading(false);
      } else {
        setFailedAttempts(0);
        setLockoutRemaining(0);
        setSuccessMsg("Sign in successful! Preparing your dashboard...");

        setTimeout(() => {
          handleClose();
          const targetUrl = selectedDomain
            ? `/profile?domain=${encodeURIComponent(selectedDomain)}`
            : redirectTo;
          router.push(targetUrl);
          router.refresh();
        }, 500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication request failed.");
      setLoading(false);
    }
  };

  // Sign Up Handler
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanName = signUpName.trim();
    const cleanEmail = signUpEmail.trim().toLowerCase();
    const cleanCollege = signUpCollege.trim();

    if (!cleanName || cleanName.length < 2) {
      setError("Please enter your full legal name for your internship credentials.");
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setError("Please enter a valid email address format (e.g. name@college.edu).");
      return;
    }

    if (!cleanCollege) {
      setError("Please enter your college or university name.");
      return;
    }

    if (signUpPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (signUpPassword !== signUpConfirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    setLoading(true);

    try {
      const res = await signUp.email({
        email: cleanEmail,
        password: signUpPassword,
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
        // Initialize student profile record in database
        try {
          const domainObj = INTERNSHIP_DOMAINS.find(
            (d) => d.id === selectedDomain || d.name === selectedDomain
          );
          const domainName = domainObj ? domainObj.name : "Full-Stack Web Development";

          await fetch("/api/profile/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fullName: cleanName,
              email: cleanEmail,
              college: cleanCollege,
              degree: "Engineering / Technical Degree",
              graduationYear: "2026",
              domain: domainName,
              mode: "Online",
              internshipType: "Free (Project Certification)",
              duration: "4 Weeks",
            }),
          });
        } catch {
          // Non-blocking background sync
        }

        setSuccessMsg("Account created! Transitioning to your Internship Dashboard...");
        setTimeout(() => {
          handleClose();
          const targetUrl = `/profile?domain=${encodeURIComponent(selectedDomain)}`;
          router.push(targetUrl);
          router.refresh();
        }, 600);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration request failed.");
      setLoading(false);
    }
  };

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

  const strength = getPasswordStrength(signUpPassword);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xl overflow-y-auto">
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
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-md bg-[#090d16] border border-cyan-500/25 rounded-3xl shadow-[0_0_60px_rgba(6,182,212,0.2)] overflow-hidden my-6 z-10 select-none"
          >
            {/* Top gradient highlight line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />

            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="p-6 pb-2 flex items-start justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-600 p-1 flex items-center justify-center shadow-md shrink-0">
                  <Image
                    src="/logo.svg"
                    alt="Haque & Sons"
                    fill
                    className="p-1 object-contain"
                    unoptimized
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                    Haque &amp; Sons <span className="text-cyan-400">Portal</span>
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    {mode === "signin"
                      ? "Sign in to access your sprint milestones"
                      : "Create your student account in 30 seconds"}
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

            {/* Interactive Tab Switcher */}
            <div className="px-6 pt-3 pb-2 relative z-10">
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

                {/* Animated sliding background pill */}
                <motion.div
                  className="absolute inset-y-1 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_15px_rgba(6,182,212,0.35)]"
                  layoutId="auth-modal-tab-pill"
                  style={{
                    left: mode === "signin" ? "4px" : "50%",
                    width: "calc(50% - 4px)",
                  }}
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              </div>
            </div>

            {/* Feedback Notifications */}
            <div className="px-6 relative z-10">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5 mt-2"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                  <div className="flex-1">
                    <p>{error}</p>
                    {error.includes("already exists") && (
                      <button
                        type="button"
                        onClick={() => switchToSignInWithEmail(signUpEmail)}
                        className="text-cyan-300 font-bold underline hover:text-cyan-200 mt-1 block cursor-pointer"
                      >
                        Click here to Sign In with this email &rarr;
                      </button>
                    )}
                  </div>
                </motion.div>
              )}

              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2 mt-2"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{successMsg}</span>
                </motion.div>
              )}
            </div>

            {/* Form Container */}
            <div className="p-6 pt-3 relative z-10 max-h-[72vh] overflow-y-auto">
              <AnimatePresence mode="wait">
                {mode === "signin" ? (
                  /* ================= SIGN IN ================= */
                  <motion.form
                    key="signin"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.18 }}
                    onSubmit={handleSignInSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        Student Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          required
                          autoComplete="email"
                          value={signInEmail}
                          onChange={(e) => setSignInEmail(e.target.value)}
                          placeholder="student@college.edu"
                          className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-gray-300">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowHelpNote(!showHelpNote)}
                          className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <HelpCircle className="w-3 h-3" />
                          <span>Need help?</span>
                        </button>
                      </div>

                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type={showSignInPassword ? "text" : "password"}
                          required
                          autoComplete="current-password"
                          value={signInPassword}
                          onChange={(e) => setSignInPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-10 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all font-medium font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignInPassword(!showSignInPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                          title={showSignInPassword ? "Hide password" : "Show password"}
                        >
                          {showSignInPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {showHelpNote && (
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] text-gray-400 leading-relaxed">
                        Forgot your password or credentials? Reach out directly to{" "}
                        <a
                          href="mailto:nejamulhaque.works@gmail.com"
                          className="text-cyan-400 underline font-mono"
                        >
                          nejamulhaque.works@gmail.com
                        </a>{" "}
                        with your registered student name and college.
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading || lockoutRemaining > 0}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed uppercase tracking-wider active:scale-[0.98]"
                      >
                        {loading ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : lockoutRemaining > 0 ? (
                          <span>Security Lockout ({lockoutRemaining}s)</span>
                        ) : (
                          <>
                            <span>Sign In to Portal</span>
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
                        className="text-xs text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer"
                      >
                        Don&apos;t have an account?{" "}
                        <strong className="text-cyan-300 underline font-bold">
                          Create Student Account
                        </strong>
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  /* ================= SIGN UP (STREAMLINED & PROFESSIONAL) ================= */
                  <motion.form
                    key="signup"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.18 }}
                    onSubmit={handleSignUpSubmit}
                    className="space-y-3.5"
                  >
                    {/* Full Name */}
                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          required
                          autoComplete="name"
                          value={signUpName}
                          onChange={(e) => setSignUpName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1">
                        Student Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          required
                          autoComplete="email"
                          value={signUpEmail}
                          onChange={(e) => setSignUpEmail(e.target.value)}
                          placeholder="rahul@college.edu"
                          className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* College */}
                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1">
                        College / University *
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          required
                          autoComplete="organization"
                          value={signUpCollege}
                          onChange={(e) => setSignUpCollege(e.target.value)}
                          placeholder="e.g. Teerthanker Mahaveer University / IIT"
                          className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* Internship Track Selection */}
                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1">
                        Internship Domain Track *
                      </label>
                      <div className="relative">
                        <select
                          value={selectedDomain}
                          onChange={(e) => setSelectedDomain(e.target.value)}
                          className="w-full bg-black/80 border border-white/15 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-cyan-400 transition-all font-semibold cursor-pointer"
                        >
                          {INTERNSHIP_DOMAINS.map((domain) => (
                            <option
                              key={domain.id}
                              value={domain.id}
                              className="bg-gray-950 text-white py-1"
                            >
                              {domain.icon} {domain.name} ({domain.category})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Password Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-gray-300 block mb-1">
                          Password *
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                          <input
                            type={showSignUpPassword ? "text" : "password"}
                            required
                            minLength={8}
                            autoComplete="new-password"
                            value={signUpPassword}
                            onChange={(e) => setSignUpPassword(e.target.value)}
                            placeholder="Min 8 chars"
                            className="w-full bg-black/60 border border-white/10 rounded-xl py-2 pl-9 pr-8 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all font-medium font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                            title={showSignUpPassword ? "Hide password" : "Show password"}
                          >
                            {showSignUpPassword ? (
                              <EyeOff className="w-3.5 h-3.5" />
                            ) : (
                              <Eye className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-300 block mb-1">
                          Confirm Password *
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                          <input
                            type={showSignUpConfirmPassword ? "text" : "password"}
                            required
                            minLength={8}
                            autoComplete="new-password"
                            value={signUpConfirmPassword}
                            onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                            placeholder="Re-enter password"
                            className="w-full bg-black/60 border border-white/10 rounded-xl py-2 pl-9 pr-8 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all font-medium font-mono"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowSignUpConfirmPassword(!showSignUpConfirmPassword)
                            }
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                            title={showSignUpConfirmPassword ? "Hide password" : "Show password"}
                          >
                            {showSignUpConfirmPassword ? (
                              <EyeOff className="w-3.5 h-3.5" />
                            ) : (
                              <Eye className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Subtle Password Strength Indicator */}
                    {signUpPassword.length > 0 && (
                      <div className="space-y-1 pt-0.5">
                        <div className="flex items-center justify-between text-[10px] text-gray-400">
                          <span>Security:</span>
                          <span className="font-semibold text-white">{strength.label}</span>
                        </div>
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${strength.color}`}
                            style={{ width: `${strength.percent}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 uppercase tracking-wider active:scale-[0.98]"
                      >
                        {loading ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 text-yellow-300" />
                            <span>Create Account &amp; Access Dashboard</span>
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
                        className="text-xs text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer"
                      >
                        Already have an account?{" "}
                        <strong className="text-cyan-300 underline font-bold">Sign In</strong>
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Security Footer */}
            <div className="px-6 py-3.5 bg-black/40 border-t border-white/5 flex items-center justify-center gap-3 text-[10px] text-gray-400 font-mono">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                256-bit SSL Protected
              </span>
              <span>•</span>
              <span>Zero Vendor Lock-in</span>
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
