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
  ShieldCheck,
  CreditCard,
  QrCode,
  Copy,
  Upload,
  Star,
  RefreshCw,
  Archive,
  Terminal,
  Cpu,
  Zap,
} from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import { CertificateRenderer, type CertificateData } from "@/components/CertificateRenderer";
import { OfferLetterRenderer, type OfferLetterData } from "@/components/OfferLetterRenderer";
import { INTERNSHIP_DOMAINS, type InternshipDomain } from "@/lib/domains";
import Link from "next/link";

const UPI_ID = "nejamulhaque@upi";
const UPI_PAYEE_NAME = "Nejamul Haque";
const GOOGLE_FORM_URL = "https://forms.gle/PaBkAjbyr84sCFMRA";

const MODE_FEES: Record<string, { amount: number; title: string; subtitle: string; icon: string }> = {
  Online: { amount: 99, title: "Online Track", subtitle: "Remote Agile Sprints", icon: "🌐" },
  Hybrid: { amount: 199, title: "Hybrid Track", subtitle: "Virtual + Studio Check-ins", icon: "⚡" },
  Offline: { amount: 249, title: "Offline Track", subtitle: "Studio Campus Workstation", icon: "🏢" },
};

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

  // Feedback & Payment states
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackText, setFeedbackText] = useState("");
  const [paymentUtr, setPaymentUtr] = useState("");
  const [paymentScreenshot, setPaymentScreenshot] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<string>("None");
  const [submittingPayment, setSubmittingPayment] = useState(false);
  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState<string | null>(null);
  const [paymentErrorMsg, setPaymentErrorMsg] = useState<string | null>(null);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedEmailTemplate, setCopiedEmailTemplate] = useState(false);
  const [isEditingPayment, setIsEditingPayment] = useState(false);

  // Save profile state
  const [savingProfile, setSavingProfile] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Offer Letter modal
  const [isOfferLetterOpen, setIsOfferLetterOpen] = useState(false);

  // Scroll management for Offer Letter modal
  useEffect(() => {
    if (isOfferLetterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOfferLetterOpen]);

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

            const initialPaymentStatus = data.application?.paymentStatus || (data.certificate ? "Approved" : "None");
            setPaymentStatus(initialPaymentStatus);
            setPaymentUtr(data.application?.paymentUtr || "");
            setPaymentScreenshot(data.application?.paymentScreenshot || "");
            setFeedbackRating(data.application?.feedbackRating ? Number(data.application.feedbackRating) : 5);
            setFeedbackText(data.application?.feedbackText || "");

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
        setSaveSuccessMsg("Academic profile saved successfully! Your offer letter has been updated.");
        setTimeout(() => setSaveSuccessMsg(null), 4000);
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

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      setPaymentErrorMsg("Screenshot size must be under 4MB.");
      return;
    }

    setPaymentErrorMsg(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setPaymentScreenshot(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitPaymentProof = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email) return;

    if (!paymentUtr.trim() && !paymentScreenshot) {
      setPaymentErrorMsg("Please enter the 12-digit UPI UTR number or upload your payment screenshot.");
      return;
    }

    setSubmittingPayment(true);
    setPaymentErrorMsg(null);
    setPaymentSuccessMsg(null);

    try {
      const res = await fetch("/api/profile/submit-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          feedbackRating: String(feedbackRating),
          feedbackText,
          paymentUtr: paymentUtr.trim(),
          paymentScreenshot,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setPaymentStatus("Pending Approval");
        setIsEditingPayment(false);
        setPaymentSuccessMsg(
          "Payment proof and feedback submitted successfully! Admin (Nejamul Haque) will verify and approve your official certificate."
        );
        if (data.application) {
          setApplication(data.application);
        }
      } else {
        setPaymentErrorMsg(data.error || "Failed to submit payment proof.");
      }
    } catch {
      setPaymentErrorMsg("Network error submitting payment proof.");
    } finally {
      setSubmittingPayment(false);
    }
  };

  const [loggingOut, setLoggingOut] = useState(false);

  const handleSignOut = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      const signOutPromise = signOut();
      const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 600));
      await Promise.race([signOutPromise, timeoutPromise]);
    } catch (e) {
      console.warn("Signout error:", e);
    } finally {
      window.location.href = "/auth/signin";
    }
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
    studentEmail: session?.user?.email || application?.email || "",
    college: college || "College / University",
    degree: degree || "B.Tech Computer Science",
    domain: domain || "Full-Stack Web Development",
    mode: mode || "Online",
    duration: duration || "4 Weeks",
    internshipType: internshipType || "Free (Project Certification)",
    startDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  };

  const isApproved = paymentStatus === "Approved" || certificate !== null;
  const isPendingReview = paymentStatus === "Pending Approval" && !isApproved;

  const activeModeKey = mode === "Offline" ? "Offline" : mode === "Hybrid" ? "Hybrid" : "Online";
  const activeFee = MODE_FEES[activeModeKey] || MODE_FEES.Online;

  // Active domain metadata lookup from INTERNSHIP_DOMAINS
  const currentDomainObj: InternshipDomain =
    INTERNSHIP_DOMAINS.find(
      (d) =>
        d.name.toLowerCase() === domain.toLowerCase() ||
        d.id.toLowerCase() === domain.toLowerCase() ||
        domain.toLowerCase().includes(d.name.toLowerCase())
    ) || INTERNSHIP_DOMAINS[0];

  const upiQrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_PAYEE_NAME)}&am=${activeFee.amount}&cu=INR&tn=Haque%20and%20Sons%20${encodeURIComponent(activeModeKey)}%20Certificate%20Processing`
  )}`;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-white pt-24 pb-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Dynamic Cyber Glow Meshes */}
      <div className="fixed top-10 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-10 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed top-1/2 right-10 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* =========================================================================
            1. CYBER STUDENT IDENTITY & SESSION HEADER
        ========================================================================= */}
        <div className="relative rounded-3xl bg-gradient-to-br from-gray-950 via-gray-900 to-black border border-white/10 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden">
          {/* Subtle Top Glowing Cyber Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-purple-500" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* User Details & Cyber Avatar */}
            <div className="flex items-start sm:items-center gap-4 sm:gap-5">
              <div className="relative shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-[0_0_30px_rgba(6,182,212,0.35)] flex items-center justify-center">
                  <div className="w-full h-full bg-gray-950 rounded-[14px] flex items-center justify-center text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-white to-purple-300">
                    {fullName ? fullName.charAt(0).toUpperCase() : "S"}
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-black flex items-center justify-center" title="Online Active">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {fullName || session?.user?.name || "Student Intern"}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                    Verified Candidate
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Neon SQL Synced</span>
                  </span>
                </div>

                <p className="text-xs text-gray-400 font-mono flex items-center gap-2 flex-wrap">
                  <span>{session?.user?.email}</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-cyan-400 font-semibold">{college || "College not set"}</span>
                </p>

                {/* Quick Track Chips */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 flex items-center gap-1.5">
                    <Cpu className="w-3 h-3 text-purple-400" />
                    <span>{domain}</span>
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    <span>{mode} Track ({duration})</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => setIsOfferLetterOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>View & Download Offer Letter</span>
              </button>

              <button
                onClick={handleSignOut}
                disabled={loggingOut}
                className="px-3.5 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {loggingOut ? (
                  <div className="w-3.5 h-3.5 border-2 border-red-300 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <LogOut className="w-3.5 h-3.5" />
                )}
                <span>{loggingOut ? "Signing Out..." : "Sign Out"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. DASHBOARD NAVIGATION TABS
        ========================================================================= */}
        <div className="flex flex-wrap items-center gap-2 bg-gray-950/80 border border-white/10 p-1.5 rounded-2xl backdrop-blur-xl shadow-lg">
          <button
            onClick={() => setActiveTab("internship")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "internship"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Internship Command OS & Capstone</span>
          </button>

          <button
            onClick={() => setActiveTab("academic")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "academic"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Academic & Profile Details</span>
          </button>

          <button
            onClick={() => setActiveTab("community")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "community"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Community & Mentorship</span>
          </button>
        </div>

        {/* =========================================================================
            TAB 1: INTERNSHIP COMMAND OS & CAPSTONE ROADMAP
        ========================================================================= */}
        {activeTab === "internship" && (
          <div className="space-y-8">
            {/* 4-STAGE INTERNSHIP PIPELINE PROGRESS STEPPER */}
            <div className="p-6 rounded-3xl bg-gray-950/90 border border-cyan-500/20 backdrop-blur-xl shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-bold tracking-widest text-cyan-400 font-mono flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Internship Lifecycle Progression</span>
                </span>
                <span className="text-[10px] text-gray-400 font-mono">
                  Ref ID: <strong className="text-white">{offerLetterData.id}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                {/* Step 1: Enrolled & Offer Letter */}
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center font-mono">
                      01
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                      Active
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white">Enrolled & Offer Issued</h4>
                  <p className="text-[11px] text-emerald-400/80 mt-1">
                    Letter of Intent issued & signed by Nejamul Haque.
                  </p>
                </div>

                {/* Step 2: Capstone Project Execution */}
                <div className={`p-4 rounded-2xl border relative overflow-hidden ${
                  githubRepo || application?.githubRepo
                    ? "bg-cyan-950/30 border-cyan-500/40"
                    : "bg-white/[0.02] border-white/10"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center font-mono">
                      02
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      githubRepo || application?.githubRepo
                        ? "bg-cyan-500/20 text-cyan-300"
                        : "bg-white/10 text-gray-400"
                    }`}>
                      {githubRepo || application?.githubRepo ? "Submitted" : "In Progress"}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white">Capstone Project</h4>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Build capstone, deploy & submit GitHub / Email .ZIP.
                  </p>
                </div>

                {/* Step 3: Google Exit Form & UPI Verification */}
                <div className={`p-4 rounded-2xl border relative overflow-hidden ${
                  isApproved
                    ? "bg-emerald-950/30 border-emerald-500/40"
                    : isPendingReview
                    ? "bg-yellow-950/30 border-yellow-500/40"
                    : "bg-purple-950/30 border-purple-500/40"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex items-center justify-center font-mono">
                      03
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isApproved
                        ? "bg-emerald-500/20 text-emerald-300"
                        : isPendingReview
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-purple-500/20 text-purple-300"
                    }`}>
                      {isApproved ? "Approved" : isPendingReview ? "In Review" : "Action Req"}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white">Exit Form & UPI Fee</h4>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Google exit form + UPI proof to {UPI_ID}.
                  </p>
                </div>

                {/* Step 4: Official Certificate Released */}
                <div className={`p-4 rounded-2xl border relative overflow-hidden ${
                  isApproved
                    ? "bg-emerald-950/30 border-emerald-500/40"
                    : "bg-white/[0.02] border-white/10"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold flex items-center justify-center font-mono">
                      04
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isApproved ? "bg-emerald-500/20 text-emerald-300" : "bg-white/10 text-gray-500"
                    }`}>
                      {isApproved ? "Unlocked" : "Locked"}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white">Verified Certificate</h4>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Cryptographic QR certificate & public ledger link.
                  </p>
                </div>
              </div>
            </div>

            {/* DOMAIN CURRICULUM, SYLLABUS & CAPSTONE SPECIFICATION */}
            <SpotlightCard className="p-6 sm:p-8 border-cyan-500/30 bg-gradient-to-br from-gray-950 via-black to-cyan-950/20 space-y-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-white/10">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-2xl">{currentDomainObj.icon}</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                      {currentDomainObj.category}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300">
                      {mode} • {duration}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {domain}
                  </h2>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {currentDomainObj.tagline || currentDomainObj.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                  <button
                    onClick={() => setIsOfferLetterOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Offer Letter (PDF)</span>
                  </button>
                </div>
              </div>

              {/* Core Tech Stack Pills */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  Core Technologies & Frameworks:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentDomainObj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-xl bg-white/[0.04] border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Capstone Project Specification Banner */}
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span>Assigned Capstone Project Goal:</span>
                </div>
                <p className="text-xs text-gray-200 leading-relaxed font-mono">
                  {currentDomainObj.capstoneProject}
                </p>
              </div>

              {/* 4-Week Sprint Milestone Breakdown */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
                  Weekly Sprint Roadmap & Syllabus
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {currentDomainObj.curriculum.map((c) => (
                    <div
                      key={c.week}
                      className="p-4 rounded-2xl bg-black/60 border border-white/10 hover:border-cyan-500/40 transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          {c.week}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                      <h4 className="text-xs font-bold text-white leading-tight">{c.title}</h4>
                      <div className="pt-1">
                        <ul className="text-[10px] text-gray-400 space-y-1 font-mono">
                          {c.topics.map((t) => (
                            <li key={t} className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
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

              {/* Option B: Email Project ZIP Archive to haquendsons@gmail.com */}
              <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 space-y-3">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 shrink-0 mt-0.5">
                      <Archive className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-2 flex-wrap">
                        <span>Send Project .ZIP File via Email</span>
                        <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-500/30">
                          haquendsons@gmail.com
                        </span>
                      </h4>
                      <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                        If your capstone project has local databases, full-stack bundles, or datasets, bundle your project folder into a <strong>.zip</strong> archive and send it directly to <strong>haquendsons@gmail.com</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <a
                      href={`mailto:haquendsons@gmail.com?subject=${encodeURIComponent(
                        `Project ZIP Submission: ${fullName || "Student"} - ${domain} Track (${offerLetterData.id})`
                      )}&body=${encodeURIComponent(
                        `Hi Haque & Sons Evaluation Team / Nejamul Haque,\n\nI am attaching my Capstone Project ZIP file for evaluation.\n\nSTUDENT DETAILS:\n- Candidate Name: ${fullName || "Student"}\n- Registered Email: ${session?.user?.email || ""}\n- College: ${college || "N/A"}\n- Domain Track: ${domain}\n- Track Mode: ${mode} Track\n- Offer Ref ID: ${offerLetterData.id}\n\nPROJECT SUBMISSION:\n- GitHub Repo: ${githubRepo || "N/A"}\n- Live Hosted Demo: ${liveUrl || "N/A"}\n- Project Summary: [Please describe what you built and how to run it]\n\n[ATTACH YOUR .ZIP ARCHIVE HERE]\n\nRegards,\n${fullName || "Student"}`
                      )}`}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-md cursor-pointer whitespace-nowrap"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email ZIP to haquendsons@gmail.com</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        const template = `To: haquendsons@gmail.com\nSubject: Project ZIP Submission: ${fullName || "Student"} - ${domain} Track (${offerLetterData.id})\n\nHi Haque & Sons Evaluation Team / Nejamul Haque,\n\nI am attaching my Capstone Project ZIP file for evaluation.\n\nSTUDENT DETAILS:\n- Candidate Name: ${fullName || "Student"}\n- Registered Email: ${session?.user?.email || ""}\n- College: ${college || "N/A"}\n- Domain Track: ${domain}\n- Track Mode: ${mode} Track\n- Offer Ref ID: ${offerLetterData.id}\n\nPROJECT SUBMISSION:\n- GitHub Repo: ${githubRepo || "N/A"}\n- Live Hosted Demo: ${liveUrl || "N/A"}\n\n[Attach your .ZIP file]`;
                        navigator.clipboard.writeText(template);
                        setCopiedEmailTemplate(true);
                        setTimeout(() => setCopiedEmailTemplate(false), 2500);
                      }}
                      className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-gray-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                      title="Copy Email Template for Webmail (Gmail/Outlook)"
                    >
                      {copiedEmailTemplate ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedEmailTemplate ? "Template Copied!" : "Copy Template"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </SpotlightCard>

            {/* MANDATORY GOOGLE FORM FEEDBACK, UPI PAYMENT & CERTIFICATE UNLOCK CARD */}
            <SpotlightCard className="p-6 sm:p-8 border-purple-500/30 bg-gradient-to-br from-gray-950 via-black to-purple-950/20 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[10px] font-bold uppercase tracking-wider mb-2">
                    <Award className="w-3 h-3" />
                    <span>Mandatory Certificate Claim Process</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Feedback Form, UPI Payment Verification & Certificate Release
                  </h3>
                  <p className="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
                    Complete your internship evaluation form, make the verification processing payment to <strong>{UPI_ID}</strong>, and upload your payment proof. Once reviewed by Nejamul Haque in the Admin Command OS, your official digital certificate unlocks below.
                  </p>
                </div>

                {isApproved ? (
                  <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold font-mono flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>✦ Certificate Unlocked</span>
                  </span>
                ) : isPendingReview ? (
                  <span className="px-3.5 py-1.5 rounded-xl bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-xs font-bold font-mono flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 animate-spin" />
                    <span>⏳ Verification In Review</span>
                  </span>
                ) : (
                  <span className="px-3.5 py-1.5 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold font-mono">
                    ✦ Form & Payment Required
                  </span>
                )}
              </div>

              {/* State 1: Certificate is Approved */}
              {isApproved && certificate && (
                <div className="space-y-6 pt-2">
                  <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                    <div>
                      <strong className="block font-bold text-emerald-300">
                        Payment & Feedback Verified by Nejamul Haque
                      </strong>
                      <span className="text-[11px] text-emerald-400/90">
                        Your official tamper-proof certificate (ID: {certificate.id}) has been issued and permanently verified on our public registry.
                      </span>
                    </div>
                  </div>

                  <CertificateRenderer certificate={certificate} showActions={true} />
                </div>
              )}

              {/* State 2: Payment is Pending Admin Approval */}
              {isPendingReview && !isEditingPayment && (
                <div className="p-6 rounded-2xl bg-yellow-950/30 border border-yellow-500/30 space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-yellow-300">
                        Payment Proof & Feedback Under Review by Nejamul Haque
                      </h4>
                      <p className="text-xs text-yellow-200/80 leading-relaxed">
                        Your 12-digit transaction ID <strong className="font-mono text-white bg-black/40 px-2 py-0.5 rounded">{paymentUtr || "Submitted"}</strong> and payment screenshot have been forwarded to <strong>haquendsons@gmail.com</strong>.
                      </p>
                      <p className="text-[11px] text-yellow-300/70">
                        Admin will verify the transaction and release your official certificate shortly. You do not need to resubmit unless you made a mistake.
                      </p>
                    </div>
                  </div>

                  {paymentScreenshot && (
                    <div className="pt-2">
                      <span className="text-[11px] font-bold text-gray-400 block mb-1 font-mono">
                        Uploaded Screenshot Proof:
                      </span>
                      <div className="max-w-xs max-h-48 overflow-hidden rounded-xl border border-white/10 bg-black/60 p-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={paymentScreenshot}
                          alt="Uploaded payment proof"
                          className="w-full h-auto object-contain max-h-44 rounded-lg"
                        />
                      </div>
                    </div>
                  )}

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsEditingPayment(true)}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Update / Re-submit Payment Proof</span>
                    </button>
                  </div>
                </div>
              )}

              {/* State 3: User needs to complete 3-step verification workflow */}
              {(!isApproved && (!isPendingReview || isEditingPayment)) && (
                <form onSubmit={handleSubmitPaymentProof} className="space-y-6">
                  {paymentSuccessMsg && (
                    <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{paymentSuccessMsg}</span>
                    </div>
                  )}

                  {paymentErrorMsg && (
                    <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{paymentErrorMsg}</span>
                    </div>
                  )}

                  {/* STEP 1: Feedback Form & In-App Evaluation */}
                  <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold flex items-center justify-center font-mono">
                            1
                          </span>
                          <h4 className="text-sm font-bold text-white">
                            Fill Google Form & Evaluation Feedback
                          </h4>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-1">
                          Complete our brief Google exit form, or provide your direct rating and feedback notes below.
                        </p>
                      </div>

                      <a
                        href={GOOGLE_FORM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-200 text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap shadow-sm"
                      >
                        <span>Open Official Google Form</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                      <div>
                        <label className="text-[11px] font-semibold text-gray-300 block mb-1.5">
                          Experience Rating *
                        </label>
                        <div className="flex items-center gap-1.5 bg-black/40 p-2 rounded-xl border border-white/10">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setFeedbackRating(star)}
                              className={`p-1 rounded-lg transition-transform hover:scale-110 cursor-pointer ${
                                feedbackRating >= star ? "text-yellow-400" : "text-gray-600"
                              }`}
                            >
                              <Star className="w-5 h-5 fill-current" />
                            </button>
                          ))}
                          <span className="text-xs font-bold text-yellow-400 ml-2 font-mono">
                            {feedbackRating} / 5
                          </span>
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-[11px] font-semibold text-gray-300 block mb-1.5">
                          Internship Experience Notes & Suggestions
                        </label>
                        <input
                          type="text"
                          placeholder="What did you learn and build during your internship at Haque & Sons?"
                          value={feedbackText}
                          onChange={(e) => setFeedbackText(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* STEP 2: UPI Payment QR Code (nejamulhaque@upi) */}
                  <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-5">
                    <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                      <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center justify-center font-mono">
                        2
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          Select Track Mode & Pay Processing Fee via UPI
                        </h4>
                        <p className="text-[11px] text-gray-400">
                          Scan the dynamic QR code with any UPI app. The amount is automatically configured.
                        </p>
                      </div>
                    </div>

                    {/* Interactive 3-Tier Track Mode Selector */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-semibold text-gray-300 block">
                        Select Your Internship Mode & Fee Tier:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {Object.entries(MODE_FEES).map(([modeKey, feeInfo]) => {
                          const isSelected = activeModeKey === modeKey;
                          return (
                            <button
                              key={modeKey}
                              type="button"
                              onClick={() => setMode(modeKey)}
                              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2.5 relative overflow-hidden ${
                                isSelected
                                  ? "bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400"
                                  : "bg-white/[0.02] hover:bg-white/[0.05] border-white/10 text-gray-400"
                              }`}
                            >
                              <div className="flex items-center justify-between w-full">
                                <span className="text-xl">{feeInfo.icon}</span>
                                <span
                                  className={`text-xs font-bold font-mono px-2 py-0.5 rounded-full ${
                                    isSelected
                                      ? "bg-cyan-500 text-black font-extrabold"
                                      : "bg-white/10 text-gray-300"
                                  }`}
                                >
                                  ₹{feeInfo.amount}
                                </span>
                              </div>
                              <div>
                                <h5 className={`text-xs font-bold ${isSelected ? "text-white" : "text-gray-300"}`}>
                                  {feeInfo.title}
                                </h5>
                                <p className="text-[10px] text-gray-400 mt-0.5">{feeInfo.subtitle}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center pt-2">
                      {/* Interactive QR Code Card */}
                      <div className="flex flex-col items-center justify-center bg-white p-4 rounded-2xl shadow-xl border-2 border-cyan-500/40">
                        <div className="relative w-44 h-44 bg-white flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={upiQrSrc}
                            alt="UPI QR Code for Nejamul Haque"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="mt-2 text-center text-black">
                          <p className="text-[11px] font-extrabold uppercase tracking-tight">
                            Scan to Pay with Any UPI App
                          </p>
                          <p className="text-[10px] text-gray-600 font-mono font-bold">
                            Nejamul Haque • {UPI_ID}
                          </p>
                          <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-[10px] font-mono font-extrabold">
                            Amount: ₹{activeFee.amount} ({activeModeKey})
                          </span>
                        </div>
                      </div>

                      {/* Payment Details & Copy Button */}
                      <div className="md:col-span-2 space-y-3 text-xs">
                        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 font-medium">Recipient / Signatory:</span>
                            <span className="text-white font-bold">{UPI_PAYEE_NAME}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 font-medium">Official UPI ID:</span>
                            <div className="flex items-center gap-2">
                              <code className="text-cyan-300 font-mono font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                                {UPI_ID}
                              </code>
                              <button
                                type="button"
                                onClick={handleCopyUpi}
                                className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                              >
                                {copiedUpi ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                <span>{copiedUpi ? "Copied!" : "Copy"}</span>
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 font-medium">Processing & Verification Fee:</span>
                            <span className="text-yellow-300 font-bold font-mono">
                              ₹{activeFee.amount} ({activeModeKey} Track Processing)
                            </span>
                          </div>
                        </div>

                        {/* Supported Apps Badges */}
                        <div className="space-y-1.5">
                          <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                            Supported Payment Apps:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {["Google Pay", "PhonePe", "Paytm", "BHIM UPI", "Cred", "Amazon Pay"].map((app) => (
                              <span
                                key={app}
                                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] text-gray-300 font-medium"
                              >
                                {app}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* STEP 3: Upload Screenshot & Enter 12-Digit UTR */}
                  <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center justify-center font-mono">
                        3
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        Upload Payment Proof & 12-Digit UPI UTR Reference
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* UTR Input */}
                      <div>
                        <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                          12-Digit UPI Transaction ID / UTR *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 423871928371"
                          value={paymentUtr}
                          onChange={(e) => setPaymentUtr(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                        />
                        <span className="text-[10px] text-gray-500 mt-1 block">
                          Found in payment transaction receipt details in your UPI app.
                        </span>
                      </div>

                      {/* Screenshot Picker */}
                      <div>
                        <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                          Upload Payment Screenshot (PNG/JPG &lt; 4MB)
                        </label>
                        <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/20 hover:border-cyan-400/50 rounded-xl p-3 cursor-pointer bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                          <Upload className="w-4 h-4 text-cyan-400 mb-1" />
                          <span className="text-xs text-gray-300 font-semibold">
                            {paymentScreenshot ? "Change Screenshot Image" : "Choose Screenshot"}
                          </span>
                          <span className="text-[10px] text-gray-500">Click to browse from device</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleScreenshotChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Screenshot Preview */}
                    {paymentScreenshot && (
                      <div className="p-3 bg-black/40 rounded-xl border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={paymentScreenshot}
                            alt="Screenshot preview"
                            className="w-12 h-12 rounded-lg object-cover border border-white/10"
                          />
                          <div>
                            <span className="text-xs font-bold text-white block">Screenshot Ready</span>
                            <span className="text-[10px] text-emerald-400">Attached for verification</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setPaymentScreenshot("")}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    )}

                    {/* Submit Actions */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        type="submit"
                        disabled={submittingPayment}
                        className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        <Check className="w-4 h-4" />
                        <span>
                          {submittingPayment
                            ? "Submitting for Review..."
                            : "Submit Payment Proof & Feedback for Approval"}
                        </span>
                      </button>

                      {isEditingPayment && (
                        <button
                          type="button"
                          onClick={() => setIsEditingPayment(false)}
                          className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-400 hover:text-white transition-all cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </form>
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Mode of Internship
                  </label>
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Online">Online (Remote)</option>
                    <option value="Offline">Offline (Studio Campus)</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Internship Program Type
                  </label>
                  <select
                    value={internshipType}
                    onChange={(e) => setInternshipType(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Free (Project Certification)">Free (Project Certification)</option>
                    <option value="Paid (Stipend Eligible)">Paid (Stipend Eligible)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="4 Weeks">4 Weeks (Standard Sprint)</option>
                    <option value="8 Weeks">8 Weeks (Advanced Architecture)</option>
                    <option value="12 Weeks">12 Weeks (Full Semester)</option>
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
        <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/90 backdrop-blur-2xl p-2 sm:p-4 md:p-6 flex justify-center items-start">
          <div className="relative w-full max-w-4xl bg-gray-950 border border-cyan-500/40 rounded-3xl shadow-[0_0_80px_rgba(6,182,212,0.25)] my-2 sm:my-4 pb-28">
            {/* Sticky Top Header inside modal */}
            <div className="sticky top-0 z-30 bg-gray-950/95 backdrop-blur-xl border-b border-white/10 px-5 sm:px-6 py-3.5 rounded-t-3xl shadow-xl flex items-center justify-between gap-4 print:hidden">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <div>
                  <span className="text-xs font-bold text-white block">
                    Official 2-Page Internship Offer Letter
                  </span>
                  <span className="text-[10px] text-cyan-400 font-mono">
                    Ref: {offerLetterData.id} • Verified Signatory: Nejamul Haque
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsOfferLetterOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold shadow-sm"
                  title="Close Document"
                >
                  <X className="w-4 h-4" />
                  <span>Close</span>
                </button>
              </div>
            </div>

            <div className="p-3 sm:p-6">
              <OfferLetterRenderer
                data={offerLetterData}
                showActions={true}
                onClose={() => setIsOfferLetterOpen(false)}
              />
            </div>
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
