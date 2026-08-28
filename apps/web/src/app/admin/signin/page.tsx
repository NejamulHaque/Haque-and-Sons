"use client";

import { useState } from "react";
import { signIn, signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2, KeyRound } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

export default function SignInPage() {
  const [mode, setMode] = useState<"signin" | "signup" | "reset">("signin");
  const [name, setName] = useState("Nejamul Haque");
  const [email, setEmail] = useState("nejamulhaque.works@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await signIn.email({
        email,
        password,
      });

      if (res.error) {
        setError(
          res.error.message ||
            "Invalid email or password. If you don't remember your password, switch to the 'Reset Password' tab."
        );
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication request failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await signUp.email({
        email,
        password,
        name,
      });

      if (res.error) {
        if (
          res.error.message?.toLowerCase().includes("exists") ||
          res.error.status === 422 ||
          res.error.status === 400
        ) {
          setError(
            "Account already exists in the database. Please Sign In or use 'Reset Password' to set a new password."
          );
        } else {
          setError(res.error.message || "Failed to create account.");
        }
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration request failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // 1. Call admin reset endpoint to clean up old mismatched credentials
      const res = await fetch("/api/admin/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          newPassword: password,
          name,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to reset password.");
      }

      // 2. Automatically sign up with the fresh new password
      const signUpRes = await signUp.email({
        email,
        password,
        name,
      });

      if (signUpRes.error) {
        // Fallback: try sign in with the new password
        const signInRes = await signIn.email({
          email,
          password,
        });

        if (signInRes.error) {
          setSuccess("Password reset. Please switch to Sign In and enter your new password.");
          setMode("signin");
          return;
        }
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to reset admin credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <SpotlightCard className="p-8 border-white/10 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center mx-auto mb-4 text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Admin Command Center</h1>
            <p className="text-xs text-gray-400 mt-1">Haque & Sons Studio OS Access</p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex p-1 rounded-xl bg-black/60 border border-white/10 mb-6">
            <button
              type="button"
              onClick={() => {
                setMode("signin");
                setError("");
                setSuccess("");
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                mode === "signin"
                  ? "bg-cyan-500 text-black shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setError("");
                setSuccess("");
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                mode === "signup"
                  ? "bg-cyan-500 text-black shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("reset");
                setError("");
                setSuccess("");
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                mode === "reset"
                  ? "bg-purple-500 text-white shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Reset Password
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
              {mode !== "reset" && (
                <button
                  type="button"
                  onClick={() => {
                    setMode("reset");
                    setError("");
                  }}
                  className="self-start text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-2 cursor-pointer"
                >
                  Set new password in Reset Password tab →
                </button>
              )}
            </div>
          )}

          {/* Success Banner */}
          {success && (
            <div className="mb-5 p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={
              mode === "signin"
                ? handleSignIn
                : mode === "signup"
                ? handleSignUp
                : handleResetPassword
            }
            className="space-y-4"
          >
            {mode !== "signin" && (
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Admin Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-cyan-400 transition-all"
                    placeholder="Nejamul Haque"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-cyan-400 transition-all font-mono text-xs"
                  placeholder="nejamulhaque.works@gmail.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">
                {mode === "reset" ? "New Password" : "Password"}
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-cyan-400 transition-all"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-2 font-bold py-3.5 rounded-xl transition-all shadow-[0_0_25px_rgba(6,182,212,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer active:scale-98 text-sm ${
                mode === "reset"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white shadow-[0_0_25px_rgba(168,85,247,0.4)]"
                  : "bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black"
              }`}
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : mode === "signin" ? (
                <>
                  <span>Sign In to Admin</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : mode === "signup" ? (
                <>
                  <span>Create Admin Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Reset & Sign In with New Password</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-[11px] text-gray-500">
            <span>Admin authorized email: nejamulhaque.works@gmail.com</span>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}
