"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { useSession, performSecureSignOut } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  Mail,
  ArrowRight,
  Code2,
  Download,
  Check,
  Send,
  MessageSquare,
  X,
  ShieldCheck,
  Upload,
  Star,
  RefreshCw,
  Archive,
  Terminal,
  Cpu,
  Zap,
  Sliders,
  Copy,
  BookOpen,
  Briefcase,
  Layers,
  FolderArchive,
  FileCode,
  CheckSquare,
  Globe,
  Phone,
  Settings,
  QrCode as QrIcon,
  Printer,
} from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import { CertificateRenderer, type CertificateData } from "@/components/CertificateRenderer";
import { OfferLetterRenderer, type OfferLetterData } from "@/components/OfferLetterRenderer";
import { LetterOfRecommendationRenderer, type LORData } from "@/components/LetterOfRecommendationRenderer";
import { VerifyCredentialActions } from "@/components/VerifyCredentialActions";
import { IrusCopilotWidget } from "@/components/IrusCopilotWidget";
import { INTERNSHIP_DOMAINS, type InternshipDomain, type DomainAssignment } from "@/lib/domains";
import { ACADEMIC_DEGREES, GRADUATION_YEARS } from "@/lib/academic-fields";
import { getAicteComplianceInfo, generateAicteActivityLog } from "@/lib/aicte";
import Link from "next/link";
import Image from "next/image";

function GithubSvg({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.29 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.28-1.56 3.285-1.245 3.285-1.245.675 1.65.255 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinSvg({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const UPI_ID = "nejamulhaque@upi";
const UPI_PAYEE_NAME = "Nejamul Haque";

const MODE_FEES: Record<string, { amount: number; title: string; subtitle: string; icon: string }> = {
  Online: { amount: 99, title: "Online Track", subtitle: "Remote Agile Sprints", icon: "🌐" },
  Hybrid: { amount: 199, title: "Hybrid Track", subtitle: "Virtual + Studio Check-ins", icon: "⚡" },
  Offline: { amount: 249, title: "Offline Track", subtitle: "Studio Campus Workstation", icon: "🏢" },
};

type ActiveTab = "overview" | "syllabus" | "capstone" | "credentials" | "settings";

function ProfileContent() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const domainParam = searchParams.get("domain");

  // Navigation tab
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");

  // Profile data
  const [profileLoading, setProfileLoading] = useState(true);
  const [application, setApplication] = useState<any>(null);
  const [certificate, setCertificate] = useState<CertificateData | null>(null);

  // Editable Profile fields
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

  // Practicum & Submission
  const [githubRepo, setGithubRepo] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [projectZipUrl, setProjectZipUrl] = useState("");
  const [assignmentNotes, setAssignmentNotes] = useState("");
  const [submittingProject, setSubmittingProject] = useState(false);
  const [projectSubmittedSuccess, setProjectSubmittedSuccess] = useState(false);
  const [activeAssignmentIndex, setActiveAssignmentIndex] = useState(0);

  // Payment & Feedback
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackText, setFeedbackText] = useState("");
  const [paymentUtr, setPaymentUtr] = useState("");
  const [paymentScreenshot, setPaymentScreenshot] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<string>("None");
  const [submittingPayment, setSubmittingPayment] = useState(false);
  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState<string | null>(null);
  const [paymentErrorMsg, setPaymentErrorMsg] = useState<string | null>(null);
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Settings Save State
  const [savingProfile, setSavingProfile] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Modals
  const [isOfferLetterOpen, setIsOfferLetterOpen] = useState(false);
  const [isLorModalOpen, setIsLorModalOpen] = useState(false);
  const [isApplyLorModalOpen, setIsApplyLorModalOpen] = useState(false);
  const [isAicteDiaryOpen, setIsAicteDiaryOpen] = useState(false);
  const [lorRemarksInput, setLorRemarksInput] = useState("");
  const [isSubmittingLor, setIsSubmittingLor] = useState(false);
  const [lorSubmitSuccess, setLorSubmitSuccess] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  // Sprint task completion tracking (stored in localStorage)
  const [sprintTasks, setSprintTasks] = useState<Record<string, boolean>>({});

  // Sync sprint tasks from localStorage
  useEffect(() => {
    if (session?.user?.email) {
      try {
        const saved = localStorage.getItem(`haque-sprint-tasks-${session.user.email}`);
        if (saved) setSprintTasks(JSON.parse(saved));
      } catch {}
    }
  }, [session?.user?.email]);

  const toggleSprintTask = (taskId: string) => {
    setSprintTasks((prev) => {
      const updated = { ...prev, [taskId]: !prev[taskId] };
      if (session?.user?.email) {
        try {
          localStorage.setItem(`haque-sprint-tasks-${session.user.email}`, JSON.stringify(updated));
        } catch {}
      }
      return updated;
    });
  };

  // Fetch initial profile data
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
            setProjectZipUrl(data.application?.projectZipUrl || "");
            setAssignmentNotes(data.application?.assignmentNotes || "");

            const initialPaymentStatus = data.application?.paymentStatus || (data.certificate ? "Approved" : "None");
            setPaymentStatus(initialPaymentStatus);
            setPaymentUtr(data.application?.paymentUtr || "");
            setPaymentScreenshot(data.application?.paymentScreenshot || "");
            setFeedbackRating(data.application?.feedbackRating ? Number(data.application.feedbackRating) : 5);
            setFeedbackText(data.application?.feedbackText || "");

            setApplication(data.application);
            if (data.certificate) {
              setCertificate(data.certificate);
            }
          }
        })
        .finally(() => setProfileLoading(false));
    }
  }, [session, isPending, router, domainParam]);

  // Handle Save Profile
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
        setSaveSuccessMsg("Academic profile saved successfully! Your credentials have been refreshed.");
        setTimeout(() => setSaveSuccessMsg(null), 4000);
      }
    } catch {
      alert("Failed to save profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  // Submit Practicum Capstone
  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email) return;

    setSubmittingProject(true);
    setProjectSubmittedSuccess(false);

    try {
      const res = await fetch("/api/profile/submit-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          githubRepo,
          liveUrl,
          projectZipUrl,
          assignmentNotes,
        }),
      });

      if (res.ok) {
        setProjectSubmittedSuccess(true);
        setTimeout(() => setProjectSubmittedSuccess(false), 5000);
      } else {
        alert("Failed to submit project.");
      }
    } catch {
      alert("Failed to submit project.");
    } finally {
      setSubmittingProject(false);
    }
  };

  // Submit Clearance & Payment
  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email) return;

    if (!paymentUtr.trim()) {
      setPaymentErrorMsg("Please provide your 12-digit UPI UTR transaction reference.");
      return;
    }

    setSubmittingPayment(true);
    setPaymentSuccessMsg(null);
    setPaymentErrorMsg(null);

    try {
      const res = await fetch("/api/profile/submit-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          paymentUtr: paymentUtr.trim(),
          paymentScreenshot,
          feedbackRating,
          feedbackText,
          mode,
          amount: activeFee.amount,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setPaymentStatus("Pending Approval");
        setPaymentSuccessMsg("Payment submitted! Administrator review takes under 24 hours.");
      } else {
        setPaymentErrorMsg(data.error || "Failed to submit clearance verification.");
      }
    } catch {
      setPaymentErrorMsg("Network error submitting clearance verification.");
    } finally {
      setSubmittingPayment(false);
    }
  };

  // Apply for LOR
  const handleApplyLor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email) return;
    setIsSubmittingLor(true);
    try {
      const res = await fetch("/api/profile/apply-lor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          remarks: lorRemarksInput,
        }),
      });
      const data = await res.json();
      if (res.ok && data.application) {
        setApplication(data.application);
        setLorSubmitSuccess("LOR request submitted to the evaluation panel.");
        setIsApplyLorModalOpen(false);
      }
    } catch {
      alert("Failed to apply for LOR.");
    } finally {
      setIsSubmittingLor(false);
    }
  };

  const handleSignOut = async () => {
    setLoggingOut(true);
    await performSecureSignOut("/internships");
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  // Derived Values
  const aicteInfo = getAicteComplianceInfo(duration);
  const activeModeKey = mode === "Offline" ? "Offline" : mode === "Hybrid" ? "Hybrid" : "Online";
  const activeFee = MODE_FEES[activeModeKey] || MODE_FEES.Online;

  const currentDomainObj: InternshipDomain =
    INTERNSHIP_DOMAINS.find(
      (d) =>
        d.name.toLowerCase() === domain.toLowerCase() ||
        d.id.toLowerCase() === domain.toLowerCase() ||
        domain.toLowerCase().includes(d.name.toLowerCase())
    ) || INTERNSHIP_DOMAINS[0];

  const totalSprintTasks = currentDomainObj.curriculum.reduce((acc, c) => acc + c.topics.length, 0);
  const completedSprintTasks = currentDomainObj.curriculum.reduce(
    (acc, c) => acc + c.topics.filter((t) => sprintTasks[`${c.week}-${t}`]).length,
    0
  );
  const sprintPercentage = totalSprintTasks > 0 ? Math.round((completedSprintTasks / totalSprintTasks) * 100) : 0;

  const isApproved = paymentStatus === "Approved" || certificate !== null;
  const isPendingReview = paymentStatus === "Pending Approval" && !isApproved;
  const isApplicationApproved = Boolean(
    application &&
      application.status &&
      application.status !== "Pending" &&
      application.status !== "Rejected" &&
      application.status !== "Under Review"
  ) || certificate !== null;

  const isLorApproved = application?.lorStatus === "Approved";
  const isLorPending = application?.lorStatus === "Pending";

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

  const lorData: LORData = {
    id: application?.lorRefNumber || certificate?.id || `HS-LOR-2026-001`,
    studentName: fullName || session?.user?.name || "Student Intern",
    studentEmail: session?.user?.email || application?.email || "",
    college: college || "Partner University",
    degree: degree || "B.Tech Computer Science",
    domain: domain || "Full-Stack Web Development",
    duration: duration || "4 Weeks",
    mode: mode || "Online",
    grade: application?.lorGrade || certificate?.grade || "Distinction (Top 1%)",
    issueDate: application?.lorApprovedAt || certificate?.issueDate || new Date().toISOString(),
    signatoryTitle: "Nejamul Haque, Founder & Lead Engineer",
  };

  const upiQrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_PAYEE_NAME)}&am=${activeFee.amount}&cu=INR&tn=Haque%20and%20Sons%20${encodeURIComponent(activeModeKey)}%20Processing`
  )}`;

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 animate-pulse">
          <GraduationCap className="w-6 h-6" />
        </div>
        <p className="text-sm font-mono text-gray-400">Loading student workspace...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-white pt-24 pb-24 px-4 sm:px-6 relative overflow-x-clip">
      {/* Background ambient lighting */}
      <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        {/* =========================================================================
            1. EXECUTIVE CANDIDATE HUD (MODERN PROFILE HERO)
        ========================================================================= */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#090d16] via-[#070b13] to-black border border-white/10 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden">
          {/* Top highlight glow bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-80" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            {/* Left: Avatar & Identity */}
            <div className="flex items-start sm:items-center gap-5">
              <div className="relative shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20 border border-cyan-500/40 p-1 flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.25)]">
                  <div className="w-full h-full bg-[#070b14] rounded-[14px] flex items-center justify-center text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-white to-purple-300">
                    {fullName ? fullName.charAt(0).toUpperCase() : "S"}
                  </div>
                </div>
                <div
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-black flex items-center justify-center"
                  title="Enrolled Student Active"
                >
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {fullName || session?.user?.name || "Student Profile"}
                  </h1>

                  {isApplicationApproved ? (
                    <span className="px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Enrolled Intern</span>
                    </span>
                  ) : (
                    <span className="px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                      <span>Under Review</span>
                    </span>
                  )}

                  <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-400 font-mono text-xs">
                    ID: #HS-{application?.id ? String(application.id).padStart(4, "0") : "2026"}
                  </span>
                </div>

                {/* Metadata Pills */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-300 font-sans">
                  <span className="flex items-center gap-1.5 text-cyan-300 font-medium">
                    <GraduationCap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{college || "College / University"}</span>
                  </span>
                  <span className="text-gray-600 hidden sm:inline">•</span>
                  <span className="text-gray-300">
                    {degree} ({graduationYear})
                  </span>
                  <span className="text-gray-600 hidden sm:inline">•</span>
                  <span className="text-purple-300 font-medium">{domain}</span>
                  <span className="text-gray-600 hidden sm:inline">•</span>
                  <span className="text-yellow-300/90 font-medium">
                    {mode} ({duration})
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Quick Action Dock */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => setIsOfferLetterOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
              >
                <FileText className="w-4 h-4" />
                <span>Offer Letter</span>
              </button>

              <button
                onClick={() => setIsAicteDiaryOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Activity Logbook</span>
              </button>

              {isLorApproved ? (
                <button
                  onClick={() => setIsLorModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Star className="w-4 h-4 fill-black" />
                  <span>Official LOR</span>
                </button>
              ) : isLorPending ? (
                <span className="px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 animate-spin" />
                  <span>LOR Under Review</span>
                </span>
              ) : (
                <button
                  onClick={() => setIsApplyLorModalOpen(true)}
                  className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Star className="w-4 h-4 text-amber-400" />
                  <span>Apply LOR</span>
                </button>
              )}

              <button
                onClick={handleSignOut}
                disabled={loggingOut}
                className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 hover:text-red-200 transition-all cursor-pointer disabled:opacity-50"
                title="Sign Out"
              >
                {loggingOut ? (
                  <div className="w-4 h-4 border-2 border-red-300 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Candidate Sprint & Practicum Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-6 mt-6 border-t border-white/5">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span>Sprint Milestone Progress</span>
                </span>
                <span className="text-xs font-mono font-bold text-cyan-300 px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20">
                  {completedSprintTasks} / {totalSprintTasks} Tasks
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${sprintPercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono">
                <span>{domain} Curriculum</span>
                <span className="text-cyan-400 font-bold">{sprintPercentage}% Complete</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Practicum Immersion</span>
                </span>
                <span className="text-xs font-mono font-bold text-amber-300 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20">
                  {duration}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-300 font-mono">
                <span className="text-white font-bold">{aicteInfo.totalHours}+ Clock Hours</span>
                <span className="text-gray-500">•</span>
                <span className="text-amber-300">{mode} Practicum</span>
              </div>
              <p className="text-[11px] text-gray-400 truncate">
                Category-B Industry Practicum Immersion
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Accreditation &amp; Standards</span>
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                  Verified
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-emerald-300 font-semibold">MSME: {aicteInfo.msmeUdyamId}</span>
                <span className="text-gray-500">•</span>
                <span className="text-purple-300 font-semibold">ISO 9001:2015</span>
              </div>
              <p className="text-[11px] text-gray-400">
                Cryptographically Signed Verification Ledger
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. MODERN TABBED SEGMENTED NAVIGATION
        ========================================================================= */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#090d16] border border-white/10 overflow-x-auto no-scrollbar shadow-lg">
          {[
            { id: "overview", label: "Overview & Roadmap", icon: Layers },
            { id: "syllabus", label: "Curriculum & Tasks", icon: BookOpen },
            { id: "capstone", label: "Capstone & Submission", icon: Code2 },
            { id: "credentials", label: "Certificate & Clearance", icon: Award },
            { id: "settings", label: "Academic Profile", icon: Settings },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all relative z-10 cursor-pointer flex items-center gap-2 shrink-0 ${
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : ""}`} />
                <span>{tab.label}</span>
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)] -z-10"
                    layoutId="profile-tab-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            3. TAB CONTENT VIEWS
        ========================================================================= */}
        <AnimatePresence mode="wait">
          {/* TAB 1: OVERVIEW & ROADMAP */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Sprint Progress Hero Card */}
              <SpotlightCard className="p-6 sm:p-8 border-white/10 bg-[#090d16]/80">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                      Active Sprint Progress
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                      {domain}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 max-w-xl">
                      Complete weekly milestone tasks and ship your verified capstone project to unlock your credential.
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-3xl sm:text-4xl font-black text-cyan-400 font-mono">
                      {sprintPercentage}%
                    </span>
                    <span className="text-xs text-gray-400 block mt-0.5">
                      {completedSprintTasks} of {totalSprintTasks} Tasks Finished
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden border border-white/5">
                  <div
                    className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 h-full rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                    style={{ width: `${sprintPercentage}%` }}
                  />
                </div>
              </SpotlightCard>

              {/* 5-Phase Internship Roadmap */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  {
                    step: "01",
                    title: "Offer Letter",
                    desc: "Terms & letter of intent issued",
                    status: isApplicationApproved ? "Completed" : "In Progress",
                    action: () => setIsOfferLetterOpen(true),
                    actionText: "View Letter",
                  },
                  {
                    step: "02",
                    title: "Sprint Syllabus",
                    desc: "4-week agile tasks & topics",
                    status: sprintPercentage > 0 ? "In Progress" : "Pending",
                    action: () => setActiveTab("syllabus"),
                    actionText: "Open Tasks",
                  },
                  {
                    step: "03",
                    title: "Capstone Delivery",
                    desc: "GitHub repo & ZIP archive review",
                    status: application?.githubRepo ? "Submitted" : "Pending",
                    action: () => setActiveTab("capstone"),
                    actionText: "Submit Project",
                  },
                  {
                    step: "04",
                    title: "Clearance & Review",
                    desc: "Feedback & UPI verification",
                    status: isApproved ? "Cleared" : isPendingReview ? "Reviewing" : "Pending",
                    action: () => setActiveTab("credentials"),
                    actionText: "Clearance",
                  },
                  {
                    step: "05",
                    title: "Credentials & LOR",
                    desc: "Tamper-proof verifiable cert",
                    status: certificate ? "Issued" : "Locked",
                    action: () => setActiveTab("credentials"),
                    actionText: "View Certificate",
                  },
                ].map((item, i) => (
                  <SpotlightCard key={item.step} className="p-5 border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xl font-black text-cyan-400 font-mono">
                          {item.step}
                        </span>
                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                            item.status === "Completed" || item.status === "Cleared" || item.status === "Issued"
                              ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
                              : item.status === "In Progress" || item.status === "Submitted"
                              ? "bg-cyan-500/15 border border-cyan-500/30 text-cyan-300"
                              : "bg-white/5 border border-white/10 text-gray-500"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed mb-4">{item.desc}</p>
                    </div>

                    <button
                      onClick={item.action}
                      className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>{item.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </SpotlightCard>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 2: SYLLABUS & SPRINT TASKS */}
          {activeTab === "syllabus" && (
            <motion.div
              key="syllabus"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#090d16] border border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-cyan-400" />
                    <span>4-Week Agile Curriculum &amp; Task Checklist</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Check off weekly topics as you build your capstone codebase. Progress is saved automatically.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-2 rounded-xl">
                  <span>{completedSprintTasks} of {totalSprintTasks} Topics Finished</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentDomainObj.curriculum.map((weekObj) => (
                  <SpotlightCard key={weekObj.week} className="p-6 border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                        {weekObj.week}
                      </span>
                      <span className="text-xs text-gray-400">
                        {weekObj.topics.filter((t) => sprintTasks[`${weekObj.week}-${t}`]).length} / {weekObj.topics.length} Done
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-4">{weekObj.title}</h4>

                    <div className="space-y-2.5">
                      {weekObj.topics.map((topic) => {
                        const taskId = `${weekObj.week}-${topic}`;
                        const isDone = Boolean(sprintTasks[taskId]);
                        return (
                          <div
                            key={topic}
                            onClick={() => toggleSprintTask(taskId)}
                            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                              isDone
                                ? "bg-cyan-950/30 border-cyan-500/40 text-cyan-200"
                                : "bg-black/40 border-white/5 hover:border-white/15 text-gray-300"
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all shrink-0 ${
                                isDone
                                  ? "bg-cyan-500 border-cyan-400 text-black font-bold"
                                  : "border-white/20 bg-white/5"
                              }`}
                            >
                              {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <span className={`text-xs ${isDone ? "line-through opacity-80" : ""}`}>
                              {topic}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: CAPSTONE & SUBMISSION */}
          {activeTab === "capstone" && (
            <motion.div
              key="capstone"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Milestone Rubrics */}
              <div className="p-6 rounded-3xl bg-[#090d16] border border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-cyan-400" />
                      <span>Milestone Deliverables &amp; Evaluation Rubric</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Target capstone project: <strong className="text-white">{currentDomainObj.capstoneProject}</strong>
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {currentDomainObj.assignments.map((asg, idx) => (
                      <button
                        key={asg.id}
                        onClick={() => setActiveAssignmentIndex(idx)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          activeAssignmentIndex === idx
                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                            : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
                        }`}
                      >
                        Milestone 0{idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Assignment Detail Card */}
                {currentDomainObj.assignments[activeAssignmentIndex] && (
                  <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase text-purple-400 block mb-1">
                          {currentDomainObj.assignments[activeAssignmentIndex].badge}
                        </span>
                        <h4 className="text-base font-bold text-white">
                          {currentDomainObj.assignments[activeAssignmentIndex].title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-mono">
                        <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">
                          ⏱ {currentDomainObj.assignments[activeAssignmentIndex].estimatedHours}h
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-bold">
                          ★ {currentDomainObj.assignments[activeAssignmentIndex].points} Pts
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed">
                      {currentDomainObj.assignments[activeAssignmentIndex].problemStatement}
                    </p>

                    <div>
                      <span className="text-[11px] font-bold uppercase text-gray-400 tracking-wider block mb-2">
                        Deliverables Checklist
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentDomainObj.assignments[activeAssignmentIndex].deliverables.map((item) => (
                          <div key={item} className="flex items-center gap-2 text-xs text-gray-300 bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Project Submission Form */}
              <SpotlightCard className="p-6 sm:p-8 border-white/10 bg-[#090d16]">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Send className="w-5 h-5 text-cyan-400" />
                    <span>Practicum Submission Dock</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Submit your code repository, live production URL, and project notes for administrative review.
                  </p>
                </div>

                {projectSubmittedSuccess && (
                  <div className="mb-5 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Project successfully submitted to the evaluation panel!</span>
                  </div>
                )}

                <form onSubmit={handleSubmitProject} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        GitHub Repository URL *
                      </label>
                      <div className="relative">
                        <GithubSvg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="url"
                          required
                          value={githubRepo}
                          onChange={(e) => setGithubRepo(e.target.value)}
                          placeholder="https://github.com/username/project"
                          className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        Live Production / Demo URL *
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="url"
                          required
                          value={liveUrl}
                          onChange={(e) => setLiveUrl(e.target.value)}
                          placeholder="https://my-capstone.vercel.app"
                          className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                      Cloud ZIP Archive URL (Google Drive / GitHub Releases)
                    </label>
                    <div className="relative">
                      <Archive className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="url"
                        value={projectZipUrl}
                        onChange={(e) => setProjectZipUrl(e.target.value)}
                        placeholder="https://drive.google.com/file/d/..."
                        className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                      Architecture Notes &amp; Features Summary
                    </label>
                    <textarea
                      rows={3}
                      value={assignmentNotes}
                      onChange={(e) => setAssignmentNotes(e.target.value)}
                      placeholder="Highlight key design decisions, libraries used, and deployment steps..."
                      className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingProject}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] flex items-center gap-2 cursor-pointer disabled:opacity-60 uppercase tracking-wider"
                  >
                    {submittingProject ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Submit Capstone for Verification</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </SpotlightCard>
            </motion.div>
          )}

          {/* TAB 4: CREDENTIALS & CLEARANCE */}
          {activeTab === "credentials" && (
            <motion.div
              key="credentials"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {certificate ? (
                /* Verified Certificate Canvas */
                <div className="space-y-6">
                  <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-gray-950 to-cyan-950/40 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Official Industry Credential
                      </span>
                      <h3 className="text-xl font-bold text-white mt-2">
                        Certificate of Completion Verified
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        Cryptographic ledger ID: <strong className="text-white font-mono">{certificate.id}</strong>
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/verify/${certificate.id}`}
                        target="_blank"
                        className="px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Public Verification Link</span>
                      </Link>
                    </div>
                  </div>

                  <div className="shadow-2xl rounded-3xl p-1 bg-gradient-to-b from-cyan-500/20 via-white/5 to-purple-500/20">
                    <CertificateRenderer certificate={certificate} showActions={true} />
                  </div>
                </div>
              ) : (
                /* Clearance & Verification Section */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left: UPI Clearance QR Card */}
                  <SpotlightCard className="lg:col-span-5 p-6 border-white/10 bg-[#090d16] text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold uppercase">
                      <QrIcon className="w-3.5 h-3.5" />
                      <span>Certificate Processing Clearance</span>
                    </div>

                    <h3 className="text-lg font-bold text-white">
                      Scan UPI to Verify Clearance
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Official processing fee for <strong className="text-white">{activeModeKey} Track</strong> is ₹{activeFee.amount}.
                    </p>

                    {/* QR Frame */}
                    <div className="p-3 rounded-2xl bg-white w-fit mx-auto shadow-2xl">
                      <Image
                        src={upiQrSrc}
                        alt="UPI QR Code"
                        width={180}
                        height={180}
                        className="rounded-xl object-contain"
                        unoptimized
                      />
                    </div>

                    <div className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-gray-300">{UPI_ID}</span>
                      <button
                        onClick={handleCopyUpi}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 hover:text-white transition-colors cursor-pointer"
                        title="Copy UPI ID"
                      >
                        {copiedUpi ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </SpotlightCard>

                  {/* Right: UTR Form & Feedback */}
                  <SpotlightCard className="lg:col-span-7 p-6 border-white/10 bg-[#090d16]">
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-white">
                        Submit Transaction UTR Reference
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        Enter your 12-digit bank reference number to expedite administrative review.
                      </p>
                    </div>

                    {paymentSuccessMsg && (
                      <div className="mb-5 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{paymentSuccessMsg}</span>
                      </div>
                    )}

                    {paymentErrorMsg && (
                      <div className="mb-5 p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                        <span>{paymentErrorMsg}</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmitPayment} className="space-y-4">
                      <div>
                        <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                          12-Digit UPI / Bank Reference (UTR) *
                        </label>
                        <input
                          type="text"
                          required
                          value={paymentUtr}
                          onChange={(e) => setPaymentUtr(e.target.value)}
                          placeholder="e.g. 402918239012"
                          className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 px-3.5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 font-mono"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                          Candidate Experience Rating
                        </label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setFeedbackRating(star)}
                              className="p-1.5 cursor-pointer"
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  star <= feedbackRating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-600"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                          Internship Feedback &amp; Suggestions
                        </label>
                        <textarea
                          rows={3}
                          value={feedbackText}
                          onChange={(e) => setFeedbackText(e.target.value)}
                          placeholder="Share your experience building production software with Haque & Sons..."
                          className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 leading-relaxed"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submittingPayment}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] flex items-center gap-2 cursor-pointer disabled:opacity-60 uppercase tracking-wider"
                      >
                        {submittingPayment ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>Submit Clearance &amp; Issue Certificate</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </SpotlightCard>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 5: ACADEMIC PROFILE SETTINGS */}
          {activeTab === "settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <SpotlightCard className="p-6 sm:p-8 border-white/10 bg-[#090d16]">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Settings className="w-5 h-5 text-cyan-400" />
                    <span>Academic Profile &amp; Contact Details</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Keep your institutional credentials updated. These details appear on your official certificate and offer letter.
                  </p>
                </div>

                {saveSuccessMsg && (
                  <div className="mb-5 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{saveSuccessMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        Full Legal Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        Phone / WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 9999999999"
                        className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        College / University Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        Degree &amp; Branch *
                      </label>
                      <input
                        type="text"
                        required
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        Graduation Batch *
                      </label>
                      <select
                        value={graduationYear}
                        onChange={(e) => setGraduationYear(e.target.value)}
                        className="w-full bg-black/80 border border-white/15 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                      >
                        {GRADUATION_YEARS.slice(0, 10).map((yr) => (
                          <option key={yr} value={yr} className="bg-gray-950 text-white">
                            Batch {yr}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        GitHub Profile URL
                      </label>
                      <input
                        type="url"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        placeholder="https://github.com/username"
                        className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        LinkedIn Profile URL
                      </label>
                      <input
                        type="url"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        Personal Portfolio / Website
                      </label>
                      <input
                        type="url"
                        value={portfolioUrl}
                        onChange={(e) => setPortfolioUrl(e.target.value)}
                        placeholder="https://myportfolio.dev"
                        className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={savingProfile}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] flex items-center gap-2 cursor-pointer disabled:opacity-60 uppercase tracking-wider"
                    >
                      {savingProfile ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Save Changes</span>
                          <Check className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </SpotlightCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =========================================================================
          MODALS
      ========================================================================= */}

      {/* 1. Offer Letter Modal */}
      <AnimatePresence>
        {isOfferLetterOpen && (
          <div
            onClick={() => setIsOfferLetterOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl overflow-y-auto cursor-pointer"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-4xl bg-gray-950 border border-white/15 rounded-3xl overflow-hidden my-6 shadow-2xl cursor-default"
            >
              <div className="p-4 bg-black/60 border-b border-white/10 flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Official Letter of Intent &amp; Offer</span>
                </span>
                <button
                  onClick={() => setIsOfferLetterOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 sm:p-6 max-h-[82vh] overflow-y-auto overscroll-contain">
                <OfferLetterRenderer data={offerLetterData} showActions={true} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Official LOR Modal */}
      <AnimatePresence>
        {isLorModalOpen && (
          <div
            onClick={() => setIsLorModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl overflow-y-auto cursor-pointer"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-4xl bg-gray-950 border border-white/15 rounded-3xl overflow-hidden my-6 shadow-2xl cursor-default"
            >
              <div className="p-4 bg-black/60 border-b border-white/10 flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400" />
                  <span>Official Letter of Recommendation (LOR)</span>
                </span>
                <button
                  onClick={() => setIsLorModalOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 sm:p-6 max-h-[82vh] overflow-y-auto overscroll-contain">
                <LetterOfRecommendationRenderer lorData={lorData} showActions={true} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Apply LOR Modal */}
      <AnimatePresence>
        {isApplyLorModalOpen && (
          <div
            onClick={() => setIsApplyLorModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl cursor-pointer"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-md bg-gray-950 border border-amber-500/30 rounded-3xl p-6 shadow-2xl space-y-4 cursor-default"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400" />
                  <span>Apply for Official LOR</span>
                </h4>
                <button
                  onClick={() => setIsApplyLorModalOpen(false)}
                  className="p-1 text-gray-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed">
                Letters of Recommendation are awarded to high-performing interns. Please share any special project contributions or milestones.
              </p>

              <form onSubmit={handleApplyLor} className="space-y-4">
                <textarea
                  rows={4}
                  required
                  value={lorRemarksInput}
                  onChange={(e) => setLorRemarksInput(e.target.value)}
                  placeholder="Describe your technical contributions, architecture decisions, and capstone features..."
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-400 leading-relaxed"
                />

                <button
                  type="submit"
                  disabled={isSubmittingLor}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmittingLor ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Submit LOR Request</span>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Activity Logbook Modal */}
      <AnimatePresence>
        {isAicteDiaryOpen && (
          <div
            onClick={() => setIsAicteDiaryOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl overflow-y-auto cursor-pointer"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-4xl bg-gray-950 border border-amber-500/30 rounded-3xl overflow-hidden my-6 shadow-2xl cursor-default"
            >
              <div className="p-4 bg-black/60 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-white">
                    Engineering Activity Logbook &amp; Practicum Diary
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-gray-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Logbook</span>
                  </button>
                  <button
                    onClick={() => setIsAicteDiaryOpen(false)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 max-h-[82vh] overflow-y-auto overscroll-contain space-y-6">
                {/* Meta summary card */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block">Candidate</span>
                    <span className="font-bold text-white">{fullName || "Student Intern"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block">Institution</span>
                    <span className="font-bold text-cyan-300 truncate block">{college || "Partner College"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block">Practicum Track</span>
                    <span className="font-bold text-amber-400 truncate block">{domain}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block">Engineering Hours</span>
                    <span className="font-bold text-emerald-400">{aicteInfo.totalHours}+ Hours Completed</span>
                  </div>
                </div>

                {/* Table of Weekly Entries */}
                <div className="space-y-4">
                  {generateAicteActivityLog(domain, duration).map((entry) => (
                    <div
                      key={entry.week}
                      className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-amber-400">
                          Week {entry.week} • {entry.hours} Hours
                        </span>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Verified &amp; Logged
                        </span>
                      </div>
                      <h5 className="text-sm font-bold text-white">{entry.title}</h5>
                      <p className="text-xs text-gray-300 leading-relaxed">{entry.focus}</p>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">
                          Key Milestone Deliverables
                        </span>
                        <ul className="list-disc list-inside space-y-0.5 text-xs text-gray-400 pl-1">
                          {entry.deliverables.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Signatory accreditation seal */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
                  <div className="space-y-0.5 text-center sm:text-left">
                    <span className="font-bold text-white block">Haque &amp; Sons Technical Directorate</span>
                    <span className="text-gray-400 text-[11px] block">MSME Registration: {aicteInfo.msmeUdyamId} • ISO 9001:2015</span>
                  </div>
                  <div className="text-center sm:text-right">
                    <span className="text-cyan-300 font-bold block">Nejamul Haque</span>
                    <span className="text-gray-500 text-[10px] block">CEO &amp; Director, Haque &amp; Sons</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Copilot Widget */}
      <IrusCopilotWidget />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono text-sm">
          Loading student workspace...
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}
