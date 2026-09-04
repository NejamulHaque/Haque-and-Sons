"use client";

import { useState } from "react";
import {
  X,
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
  Mail,
  Phone,
  User,
  Globe,
  Code2,
} from "lucide-react";
import { INTERNSHIP_DOMAINS } from "@/lib/domains";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDomainId?: string;
  defaultMode?: "Online" | "Offline" | "Hybrid";
  defaultType?: "Paid" | "Free";
}

export function InternshipApplicationModal({
  isOpen,
  onClose,
  defaultDomainId = "full-stack-web",
  defaultMode = "Online",
  defaultType = "Free",
}: ApplicationModalProps) {
  const [domainId, setDomainId] = useState(defaultDomainId);
  const [mode, setMode] = useState<"Online" | "Offline" | "Hybrid">(defaultMode);
  const [internshipType, setInternshipType] = useState<"Paid" | "Free">(defaultType);
  const [duration, setDuration] = useState("4 Weeks");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");
  const [degree, setDegree] = useState("B.Tech Computer Science");
  const [graduationYear, setGraduationYear] = useState("2026");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [statement, setStatement] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedDomain =
    INTERNSHIP_DOMAINS.find((d) => d.id === domainId) || INTERNSHIP_DOMAINS[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/internships/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          college,
          degree,
          graduationYear,
          domain: selectedDomain.name,
          mode,
          internshipType: internshipType === "Paid" ? "Paid (Stipend Eligible)" : "Free (Project Certification)",
          duration,
          githubUrl,
          linkedinUrl,
          statement,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit application");
      }

      setSuccess(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please check your inputs.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setSuccess(false);
    setErrorMessage(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#090d16] border border-cyan-500/30 rounded-3xl shadow-[0_0_60px_rgba(6,182,212,0.2)] overflow-hidden my-8">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-xl">
              {selectedDomain.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Apply for College Internship
                </h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {mode}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                {selectedDomain.name} • Haque & Sons
              </p>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 relative z-10 max-h-[75vh] overflow-y-auto">
          {success ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-white">Application Received! 🚀</h4>
              <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{fullName}</strong>! We have received your application for the <strong className="text-cyan-400">{selectedDomain.name}</strong> track ({mode} • {duration}).
              </p>
              <p className="text-xs text-gray-400 max-w-md mx-auto">
                A confirmation has been recorded, and our engineering team led by Nejamul Haque will reach out with project onboarding details.
              </p>
              <div className="pt-4">
                <button
                  onClick={resetAndClose}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer"
                >
                  Done & Back to Portal
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 1. Track & Mode Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider block mb-1.5">
                    Internship Domain Track
                  </label>
                  <select
                    value={domainId}
                    onChange={(e) => setDomainId(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 transition-all font-medium"
                  >
                    {INTERNSHIP_DOMAINS.map((d) => (
                      <option key={d.id} value={d.id} className="bg-gray-950 text-white">
                        {d.icon} {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider block mb-1.5">
                    Internship Mode
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/60 border border-white/10 rounded-xl">
                    {(["Online", "Offline", "Hybrid"] as const).map((m) => (
                      <button
                        type="button"
                        key={m}
                        onClick={() => setMode(m)}
                        className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                          mode === m
                            ? "bg-cyan-500 text-black shadow-sm"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2. Track Type (Paid vs Free) & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider block mb-1.5">
                    Compensation Track
                  </label>
                  <div className="grid grid-cols-2 gap-1.5 p-1 bg-black/60 border border-white/10 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setInternshipType("Free")}
                      className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        internshipType === "Free"
                          ? "bg-purple-500 text-white shadow-sm"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      Project & Cert (Free)
                    </button>
                    <button
                      type="button"
                      onClick={() => setInternshipType("Paid")}
                      className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        internshipType === "Paid"
                          ? "bg-cyan-500 text-black shadow-sm"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      Paid / Stipend Track
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider block mb-1.5">
                    Internship Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 transition-all font-medium"
                  >
                    <option value="4 Weeks" className="bg-gray-950 text-white">4 Weeks (Fast-Track Sprint)</option>
                    <option value="8 Weeks" className="bg-gray-950 text-white">8 Weeks (Standard Mastery)</option>
                    <option value="12 Weeks" className="bg-gray-950 text-white">12 Weeks (Capstone & LOR)</option>
                  </select>
                </div>
              </div>

              {/* 3. Personal & Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                    <input
                      type="email"
                      required
                      placeholder="rahul@college.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* 4. College, Degree & Graduation */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    College / University *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Delhi University / IIT / NIT"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Degree & Branch
                  </label>
                  <input
                    type="text"
                    placeholder="B.Tech CSE / BCA / MCA"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Graduation Year
                  </label>
                  <select
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-400 transition-all"
                  >
                    <option value="2025" className="bg-gray-950 text-white">2025</option>
                    <option value="2026" className="bg-gray-950 text-white">2026</option>
                    <option value="2027" className="bg-gray-950 text-white">2027</option>
                    <option value="2028" className="bg-gray-950 text-white">2028</option>
                    <option value="Passout" className="bg-gray-950 text-white">Recent Graduate</option>
                  </select>
                </div>
              </div>

              {/* 5. Online Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    GitHub Profile (Recommended)
                  </label>
                  <div className="relative">
                    <Code2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                    <input
                      type="url"
                      placeholder="https://github.com/yourhandle"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    LinkedIn / Portfolio / Resume Link
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/yourhandle"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* 6. Motivation Statement */}
              <div>
                <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                  Why do you want to intern with Haque & Sons? (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your learning goals, passion for software engineering, and what you're excited to build..."
                  value={statement}
                  onChange={(e) => setStatement(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Internship Application</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
