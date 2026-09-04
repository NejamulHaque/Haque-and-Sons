"use client";

import { useState, useEffect, Suspense } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  GraduationCap,
  Award,
  User,
  CheckCircle2,
  Clock,
  LogOut,
  Sparkles,
  ExternalLink,
  FileText,
  AlertCircle,
  Building,
  Mail,
  Phone,
  ArrowRight,
  Code2,
  Globe,
  Download,
  Check,
  Send,
  HelpCircle,
  MessageSquare,
  X,
} from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import { CertificateRenderer, type CertificateData } from "@/components/CertificateRenderer";
import { OfferLetterRenderer, type OfferLetterData } from "@/components/OfferLetterRenderer";
import { INTERNSHIP_DOMAINS } from "@/lib/domains";
import Link from "next/link";

function ProfileContent() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const domainParam = searchParams.get("domain");

  const [activeTab, setActiveTab] = useState<"internship" | "academic" | "community">("internship");

  // Profile data states
  const [profileLoading, setProfileLoading] = useState(true);
  const [application, setApplication] = useState<any>(null);
  const [certificate, setCertificate] = useState<CertificateData | null>(null);

  // Form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");
  const [degree, setDegree] = useState("B.Tech Computer Science");
  const [graduationYear, setGraduationYear] = useState("2026");
  const [domain, setDomain] = useState("Full-Stack Web Development");
  const [mode, setMode] = useState("Online");
  const [internshipType, setInternshipType] = useState("Free (Project Certification)");
  const [duration, setDuration] = useState("4 Weeks");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");

  // Project Submission states
  const [githubRepo, setGithubRepo] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [submittingProject, setSubmittingProject] = useState(false);
  const [projectSubmittedSuccess, setProjectSubmittedSuccess] = useState(false);

  // Mandatory Google Form state
  const [googleFormDone, setGoogleFormDone] = useState(false);
  const [verifyingForm, setVerifyingForm] = useState(false);

  // Save profile state
  const [savingProfile, setSavingProfile] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Offer Letter modal
  const [isOfferLetterOpen, setIsOfferLetterOpen] = useState(false);

  // Fetch initial profile
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push(`/auth/signin${domainParam ? `?domain=${domainParam}` : ""}`);
      return;
    }

    if (session?.user?.email) {
      fetch(`/api/profile?email=${encodeURIComponent(session.user.email)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setFullName(data.application?.fullName || session.user?.name || "");
            setPhone(data.application?.phone || "");
            setCollege(data.application?.college || "");
            setDegree(data.application?.degree || "B.Tech Computer Science");
            setGraduationYear(data.application?.graduationYear || "2026");
            setDomain(data.application?.domain || domainParam?.replace(/-/g, " ") || "Full-Stack Web Development");
            setMode(data.application?.mode || "Online");
            setInternshipType(data.application?.internshipType || "Free (Project Certification)");
            setDuration(data.application?.duration || "4 Weeks");
            setGithubUrl(data.application?.githubUrl || "");
            setLinkedinUrl(data.application?.linkedinUrl || "");
            setPortfolioUrl(data.application?.portfolioUrl || "");
            setGithubRepo(data.application?.githubRepo || "");
            setLiveUrl(data.application?.liveUrl || "");
            setGoogleFormDone(Boolean(data.application?.googleFormSubmitted));

            setApplication(data.application);
            if (data.certificate) {
              setCertificate({
                id: data.certificate.id,
                studentName: data.certificate.studentName,
                studentEmail: data.certificate.studentEmail,
                domain: data.certificate.domain,
                mode: data.certificate.mode,
                internshipType: data.certificate.internshipType,
                college: data.certificate.college,
                duration: data.certificate.duration,
                grade: data.certificate.grade,
                issueDate: data.certificate.issueDate,
                signatoryTitle: data.certificate.signatoryTitle,
                status: data.certificate.status,
              });
            }
          }
        })
        .finally(() => setProfileLoading(false));
    }
  }, [session, isPending, router, domainParam]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email) return;

    setSavingProfile(true);
    setSaveSuccessMsg(null);
    try {
      const res = await fetch("/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email: session.user.email,
          phone,
          college,
          degree,
          graduationYear,
          domain,
          mode,
          internshipType,
          duration,
          githubUrl,
          linkedinUrl,
          portfolioUrl,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setApplication(data.application);
        setSaveSuccessMsg("Academic profile saved successfully!");
        setTimeout(() => setSaveSuccessMsg(null), 3000);
      }
    } catch {
      alert("Failed to save profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email) return;

    setSubmittingProject(true);
    try {
      const res = await fetch("/api/profile/submit-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          githubRepo,
          liveUrl,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setApplication(data.application);
        setProjectSubmittedSuccess(true);
        setTimeout(() => setProjectSubmittedSuccess(false), 4000);
      }
    } catch {
      alert("Failed to submit project.");
    } finally {
      setSubmittingProject(false);
    }
  };

  const handleConfirmGoogleForm = async () => {
    if (!session?.user?.email) return;

    setVerifyingForm(true);
    try {
      const res = await fetch("/api/profile/complete-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
        }),
      });

      const data = await res.json();
      if (res.ok && data.certificate) {
        setGoogleFormDone(true);
        setCertificate({
          id: data.certificate.id,
          studentName: data.certificate.studentName,
          studentEmail: data.certificate.studentEmail,
          domain: data.certificate.domain,
          mode: data.certificate.mode,
          internshipType: data.certificate.internshipType,
          college: data.certificate.college,
          duration: data.certificate.duration,
          grade: data.certificate.grade,
          issueDate: data.certificate.issueDate,
          signatoryTitle: data.certificate.signatoryTitle,
          status: data.certificate.status,
        });
      }
    } catch {
      alert("Failed to confirm form completion.");
    } finally {
      setVerifyingForm(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth/signin");
    router.refresh();
  };

  if (isPending || profileLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-gray-400 font-mono">Loading Student Portal...</p>
        </div>
      </div>
    );
  }

  const offerLetterData: OfferLetterData = {
    id: `HS-OFFER-${application?.id || "2026-001"}`,
    studentName: fullName || session?.user?.name || "Student",
    college: college || "College / University",
    domain: domain || "Full-Stack Web Development",
    mode: mode || "Online",
    duration: duration || "4 Weeks",
    internshipType: internshipType || "Free (Project Certification)",
    startDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-white pt-24 pb-20 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="fixed top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* Student Top Header Card */}
        <div className="p-6 rounded-3xl bg-gray-950/80 border border-white/10 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-[0_0_25px_rgba(6,182,212,0.3)] flex items-center justify-center">
              <div className="w-full h-full bg-black/60 rounded-[14px] flex items-center justify-center text-xl font-bold text-cyan-300">
                {fullName ? fullName.charAt(0) : "S"}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-bold text-white tracking-tight">
                  {fullName || session?.user?.name || "Student"}
                </h1>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Intern Candidate
                </span>
              </div>
              <p className="text-xs text-gray-400 font-mono mt-0.5">{session?.user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOfferLetterOpen(true)}
              className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>View Offer Letter</span>
            </button>

            <button
              onClick={handleSignOut}
              className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 bg-gray-950/60 border border-white/10 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab("internship")}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "internship"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>My Internship & Capstone</span>
          </button>

          <button
            onClick={() => setActiveTab("academic")}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "academic"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Academic & Profile Details</span>
          </button>

          <button
            onClick={() => setActiveTab("community")}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "community"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Community & Mentorship</span>
          </button>
        </div>

        {/* TAB 1: INTERNSHIP & CAPSTONE PROGRESS */}
        {activeTab === "internship" && (
          <div className="space-y-8">
            {/* Active Track Banner */}
            <SpotlightCard className="p-6 sm:p-8 border-cyan-500/30 bg-gradient-to-br from-gray-950 via-black to-cyan-950/20">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                      Enrolled Track
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300">
                      {mode} • {duration}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">{domain}</h2>
                  <p className="text-xs text-gray-400 mt-1">
                    College: <strong className="text-white">{college || "Not specified (Edit in Profile tab)"}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsOfferLetterOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Offer Letter</span>
                  </button>
                </div>
              </div>

              {/* Weekly Milestone Checklist */}
              <div className="py-6 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
                  Sprint Milestone Progress
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-black/50 border border-white/5 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-white block">Week 1: Setup</span>
                      <span className="text-[11px] text-gray-400 block">Git setup & architecture blueprint</span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/50 border border-white/5 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-white block">Week 2: Backend</span>
                      <span className="text-[11px] text-gray-400 block">Schema modeling & API routes</span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/50 border border-white/5 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-white block">Week 3: Frontend</span>
                      <span className="text-[11px] text-gray-400 block">Reactive UI & state integration</span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/50 border border-white/5 flex items-start gap-2.5">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${certificate ? "text-emerald-400" : "text-gray-600"}`} />
                    <div>
                      <span className="text-xs font-bold text-white block">Week 4: Capstone</span>
                      <span className="text-[11px] text-gray-400 block">Vercel deploy & code review</span>
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightCard>

            {/* Capstone Project Submission Section */}
            <SpotlightCard className="p-6 sm:p-8 border-white/10 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-cyan-400" />
                  <span>Capstone Project Submission</span>
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Submit your public GitHub repository and live deployment URL for review by Nejamul Haque.
                </p>
              </div>

              {projectSubmittedSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Capstone project submitted! Next, complete the completion feedback form below to unlock your certificate.</span>
                </div>
              )}

              <form onSubmit={handleSubmitProject} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    GitHub Repository URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://github.com/username/capstone-project"
                    value={githubRepo}
                    onChange={(e) => setGithubRepo(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Live Deployed URL (Vercel / Render / Netlify) *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://my-capstone.vercel.app"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    disabled={submittingProject}
                    className="px-6 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submittingProject ? "Saving..." : "Save & Update Capstone Links"}</span>
                  </button>
                </div>
              </form>
            </SpotlightCard>

            {/* MANDATORY GOOGLE FORM & CERTIFICATE UNLOCK CARD */}
            <SpotlightCard className="p-6 sm:p-8 border-purple-500/30 bg-gradient-to-br from-gray-950 via-black to-purple-950/20 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[10px] font-bold uppercase tracking-wider mb-2">
                    <Award className="w-3 h-3" />
                    <span>Mandatory Certificate Requirement</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Internship Feedback Form & Certificate Claim
                  </h3>
                  <p className="text-xs text-gray-300 mt-1 max-w-xl leading-relaxed">
                    Before gaining your verified certificate, it is mandatory to submit the official completion Google Form. Once submitted, your certificate will unlock instantly.
                  </p>
                </div>

                {certificate ? (
                  <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold font-mono">
                    ✦ Certificate Unlocked
                  </span>
                ) : (
                  <span className="px-3.5 py-1.5 rounded-xl bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-xs font-bold font-mono">
                    ⏳ Form Pending
                  </span>
                )}
              </div>

              {/* Action Buttons to Fill Form & Confirm */}
              {!certificate ? (
                <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-white block">
                        Step 1: Fill the Completion Google Form
                      </span>
                      <p className="text-[11px] text-gray-400">
                        Share your feedback, project link, and experience during the internship.
                      </p>
                    </div>

                    <a
                      href="https://forms.gle/sample-internship-feedback"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center gap-2 whitespace-nowrap"
                    >
                      <span>Open Google Form</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-white block">
                        Step 2: Confirm & Unlock Official Certificate
                      </span>
                      <p className="text-[11px] text-gray-400">
                        Click below once you have submitted the Google Form to generate your verified credential.
                      </p>
                    </div>

                    <button
                      onClick={handleConfirmGoogleForm}
                      disabled={verifyingForm}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center gap-2 cursor-pointer disabled:opacity-50 whitespace-nowrap"
                    >
                      <Check className="w-4 h-4" />
                      <span>{verifyingForm ? "Verifying & Generating..." : "I Have Submitted the Form — Unlock Certificate"}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 pt-2">
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Completion form verified! Your official verified certificate is ready below for download and sharing.</span>
                  </div>

                  <CertificateRenderer certificate={certificate} showActions={true} />
                </div>
              )}
            </SpotlightCard>
          </div>
        )}

        {/* TAB 2: ACADEMIC & PROFILE DETAILS */}
        {activeTab === "academic" && (
          <SpotlightCard className="p-6 sm:p-8 border-white/10 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white">Academic & Professional Details</h3>
              <p className="text-xs text-gray-400 mt-1">
                Keep your college credentials and links up to date for official certificates and recommendations.
              </p>
            </div>

            {saveSuccessMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{saveSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Full Legal Name (For Certificate) *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    College / University *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Delhi University / IIT"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Degree & Branch
                  </label>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Graduation Year
                  </label>
                  <select
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="Passout">Recent Graduate</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Internship Domain Track
                  </label>
                  <select
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    {INTERNSHIP_DOMAINS.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    GitHub Profile URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/username"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer disabled:opacity-50"
                >
                  {savingProfile ? "Saving Profile..." : "Save Academic Profile"}
                </button>
              </div>
            </form>
          </SpotlightCard>
        )}

        {/* TAB 3: COMMUNITY & MENTORSHIP */}
        {activeTab === "community" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SpotlightCard className="p-6 sm:p-8 border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Student Developer Community</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Collaborate with fellow student engineers, share code snippets, participate in weekly tech talks, and solve bugs together.
              </p>
              <div className="pt-2">
                <a
                  href="https://chat.whatsapp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold inline-flex items-center gap-1.5"
                >
                  <span>Join Student WhatsApp Group</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-6 sm:p-8 border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Direct Mentorship Channel</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Schedule code audits, ask architecture questions, and get resume reviews directly with <strong>Nejamul Haque</strong>.
              </p>
              <div className="pt-2">
                <a
                  href="mailto:haquendsons@gmail.com?subject=Internship%20Mentorship%20Inquiry"
                  className="px-4 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold inline-flex items-center gap-1.5"
                >
                  <span>Email Mentor Directly</span>
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </div>
            </SpotlightCard>
          </div>
        )}
      </div>

      {/* OFFER LETTER MODAL */}
      {isOfferLetterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-gray-950 border border-cyan-500/30 rounded-3xl p-6 shadow-2xl my-8 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 print:hidden">
              <span className="text-xs font-bold text-cyan-400">
                Official Document Preview
              </span>
              <button
                onClick={() => setIsOfferLetterOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <OfferLetterRenderer data={offerLetterData} showActions={true} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function StudentProfilePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading student profile...</div>}>
      <ProfileContent />
    </Suspense>
  );
}
