"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { useSession, signOut } from "@/lib/auth-client";
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
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Copy,
} from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import { CertificateRenderer, type CertificateData } from "@/components/CertificateRenderer";
import { OfferLetterRenderer, type OfferLetterData } from "@/components/OfferLetterRenderer";
import { LetterOfRecommendationRenderer, type LORData } from "@/components/LetterOfRecommendationRenderer";
import { VerifyCredentialActions } from "@/components/VerifyCredentialActions";
import { IrusCopilotWidget } from "@/components/IrusCopilotWidget";
import { INTERNSHIP_DOMAINS, type InternshipDomain } from "@/lib/domains";

const UPI_ID = "nejamulhaque@upi";
const UPI_PAYEE_NAME = "Nejamul Haque";
const GOOGLE_FORM_URL = "https://forms.gle/PaBkAjbyr84sCFMRA";

const MODE_FEES: Record<string, { amount: number; title: string; subtitle: string; icon: string }> = {
  Online: { amount: 99, title: "Online Track", subtitle: "Remote Agile Sprints", icon: "🌐" },
  Hybrid: { amount: 199, title: "Hybrid Track", subtitle: "Virtual + Studio Check-ins", icon: "⚡" },
  Offline: { amount: 249, title: "Offline Track", subtitle: "Studio Campus Workstation", icon: "🏢" },
};

const SLIDES_CONFIG = [
  { id: 0, title: "Offer Letter", badge: "Stage 01", icon: FileText, desc: "Letter of Intent & Terms" },
  { id: 1, title: "Sprint Syllabus", badge: "Stage 02", icon: Terminal, desc: "4-Week Milestone Kanban" },
  { id: 2, title: "Capstone Studio", badge: "Stage 03", icon: Code2, desc: "GitHub & Deployment Review" },
  { id: 3, title: "Exit & Clearance", badge: "Stage 04", icon: Award, desc: "Feedback & UPI Verification" },
  { id: 4, title: "Certificate & LOR", badge: "Stage 05", icon: ShieldCheck, desc: "Official Credentials & Ledger" },
];

function ProfileContent() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const domainParam = searchParams.get("domain");

  // View Mode: 'slides' for interactive presentations, 'overview' for grid dashboard
  const [viewMode, setViewMode] = useState<"slides" | "overview">("slides");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [isFocusMode, setIsFocusMode] = useState(false);

  // Tab for overview mode
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
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Offer Letter & LOR modals
  const [isOfferLetterOpen, setIsOfferLetterOpen] = useState(false);
  const [isLorModalOpen, setIsLorModalOpen] = useState(false);

  // Interactive LMS Sprint Checklist state
  const [sprintTasks, setSprintTasks] = useState<Record<string, boolean>>({});

  // Slide navigation handlers
  const goToSlide = useCallback((newIndex: number) => {
    setSlideDirection(newIndex > currentSlide ? 1 : -1);
    setCurrentSlide(Math.max(0, Math.min(SLIDES_CONFIG.length - 1, newIndex)));
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    if (currentSlide < SLIDES_CONFIG.length - 1) {
      setSlideDirection(1);
      setCurrentSlide((prev) => prev + 1);
    }
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setSlideDirection(-1);
      setCurrentSlide((prev) => prev - 1);
    }
  }, [currentSlide]);

  // Keyboard navigation for slides
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== "slides" || isOfferLetterOpen || isLorModalOpen) return;
      if (["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, isOfferLetterOpen, isLorModalOpen, nextSlide, prevSlide]);

  // Load sprint tasks from localStorage
  useEffect(() => {
    if (session?.user?.email) {
      try {
        const saved = localStorage.getItem(`haque-sprint-tasks-${session.user.email}`);
        if (saved) {
          setSprintTasks(JSON.parse(saved));
        }
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

  // Scroll management for Modals
  useEffect(() => {
    if (isOfferLetterOpen || isLorModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOfferLetterOpen, isLorModalOpen]);

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
        setSaveSuccessMsg("Academic profile saved successfully! Your credentials have been refreshed.");
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
          "Payment proof and feedback submitted successfully! Admin (Nejamul Haque) will verify and issue your official certificate."
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
          <p className="text-xs text-gray-400 font-mono">Loading Studio Candidate Profile...</p>
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

  const lorData: LORData = {
    id: certificate?.id || `HS-INT-2026-${(fullName || "STUDENT").replace(/\s+/g, "").slice(0, 4).toUpperCase()}-001`,
    studentName: fullName || session?.user?.name || "Student Intern",
    studentEmail: session?.user?.email || application?.email || "",
    college: college || "Partner University",
    degree: degree || "B.Tech Computer Science",
    domain: domain || "Full-Stack Web Development",
    duration: duration || "4 Weeks",
    mode: mode || "Online",
    grade: certificate?.grade || "Distinction (Top 1%)",
    issueDate: certificate?.issueDate || new Date().toISOString(),
    signatoryTitle: "Nejamul Haque, Founder & Lead Engineer",
  };

  const isApproved = paymentStatus === "Approved" || certificate !== null;
  const isPendingReview = paymentStatus === "Pending Approval" && !isApproved;

  const isApplicationApproved = Boolean(
    application &&
    application.status &&
    application.status !== "Pending" &&
    application.status !== "Rejected" &&
    application.status !== "Under Review"
  ) || certificate !== null;
  const isApplicationRejected = application?.status === "Rejected";
  const isApplicationPending = !isApplicationApproved && !isApplicationRejected;

  const refreshProfileData = async () => {
    if (!session?.user?.email) return;
    try {
      const res = await fetch(`/api/profile?email=${encodeURIComponent(session.user.email)}`);
      const data = await res.json();
      if (data.success) {
        setApplication(data.application);
        if (data.application) {
          setFullName(data.application.fullName || session.user?.name || "");
          setPhone(data.application.phone || "");
          setCollege(data.application.college || "");
          setDegree(data.application.degree || "B.Tech Computer Science");
          setGraduationYear(data.application.graduationYear || "2026");
          setDomain(data.application.domain || "Full-Stack Web Development");
          setMode(data.application.mode || "Online");
          setInternshipType(data.application.internshipType || "Free (Project Certification)");
          setDuration(data.application.duration || "4 Weeks");
          setGithubUrl(data.application.githubUrl || "");
          setLinkedinUrl(data.application.linkedinUrl || "");
          setPortfolioUrl(data.application.portfolioUrl || "");
          setGithubRepo(data.application.githubRepo || "");
          setLiveUrl(data.application.liveUrl || "");
          setPaymentStatus(data.application.paymentStatus || "None");
          setPaymentUtr(data.application.paymentUtr || "");
          setPaymentScreenshot(data.application.paymentScreenshot || "");
        }
        if (data.certificate) {
          setCertificate(data.certificate);
        }
      }
    } catch (err) {
      console.error("Refresh error:", err);
    }
  };

  const activeModeKey = mode === "Offline" ? "Offline" : mode === "Hybrid" ? "Hybrid" : "Online";
  const activeFee = MODE_FEES[activeModeKey] || MODE_FEES.Online;

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

  const totalSprintTasks = currentDomainObj.curriculum.reduce((acc, c) => acc + c.topics.length, 0);
  const completedSprintTasks = currentDomainObj.curriculum.reduce(
    (acc, c) => acc + c.topics.filter((t) => sprintTasks[`${c.week}-${t}`]).length,
    0
  );
  const sprintPercentage = totalSprintTasks > 0 ? Math.round((completedSprintTasks / totalSprintTasks) * 100) : 0;

  return (
    <div className={`min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-white ${isFocusMode ? "pt-6 pb-12" : "pt-20 sm:pt-24 pb-20 sm:pb-24"} px-3 sm:px-6 relative overflow-hidden transition-all duration-300`}>
      {/* Glow Meshes */}
      <div className="fixed top-10 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-10 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed top-1/2 right-10 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        {/* =========================================================================
            1. CANDIDATE PROFILE & ACADEMIC IDENTITY SECTION
        ========================================================================= */}
        {!isFocusMode && (
          <div className="relative rounded-3xl bg-gradient-to-br from-gray-950 via-gray-900 to-black border border-white/10 p-5 sm:p-7 backdrop-blur-2xl shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-purple-500" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* User Avatar & Candidate Details */}
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
                      {fullName || session?.user?.name || "Student Candidate"}
                    </h1>
                    {isApplicationApproved ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Selected & Enrolled</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-yellow-300 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                        <Clock className="w-3 h-3 text-yellow-400 animate-pulse" />
                        <span>Under Review</span>
                      </span>
                    )}
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
                    {degree && (
                      <>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-300">{degree} ({graduationYear})</span>
                      </>
                    )}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[11px] px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 flex items-center gap-1.5">
                      <Cpu className="w-3 h-3 text-purple-400" />
                      <span>{domain}</span>
                    </span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-yellow-400" />
                      <span>{mode} Track ({duration})</span>
                    </span>
                    {phone && (
                      <span className="text-[11px] px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-gray-400">
                        📞 {phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Actions & Edit Profile Trigger */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  onClick={() => setIsEditProfileOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Edit Details</span>
                </button>

                <button
                  onClick={() => setIsOfferLetterOpen(true)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isApplicationApproved
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.35)]"
                      : "bg-white/5 hover:bg-white/10 border border-yellow-500/30 text-yellow-300"
                  }`}
                >
                  {isApplicationApproved ? (
                    <>
                      <FileText className="w-3.5 h-3.5" />
                      <span>Offer Letter</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-3.5 h-3.5 text-yellow-400" />
                      <span>Offer Letter (Under Review)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setIsLorModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center gap-1.5 cursor-pointer"
                >
                  <Star className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                  <span>LOR</span>
                </button>

                <button
                  onClick={handleSignOut}
                  disabled={loggingOut}
                  className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
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
        )}

        {/* =========================================================================
            2. INTERNSHIP DASHBOARD & MILESTONE WORKSPACE
        ========================================================================= */}
        <div className="space-y-3">
          {!isFocusMode && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
                  <GraduationCap className="w-3 h-3" />
                  <span>Internship Workspace</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Internship Dashboard &amp; Milestone Kanban
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-gray-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                  Progress: <strong className="text-cyan-400">{sprintPercentage}% Completed</strong>
                </span>
              </div>
            </div>
          )}

          {/* VIEW MODE TOGGLE & SLIDE CONTROLLER BAR */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-2.5 rounded-2xl bg-gray-950/90 border border-white/10 backdrop-blur-xl shadow-xl">
            {/* View Mode Pills */}
            <div className="flex items-center gap-1.5 bg-black/60 p-1 rounded-xl border border-white/5">
              <button
                onClick={() => setViewMode("slides")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === "slides"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.35)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Interactive Slides</span>
              </button>

              <button
                onClick={() => setViewMode("overview")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === "overview"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.35)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Full Overview</span>
              </button>
            </div>

          {/* Slide Deck Navigation Controls (When in Slides View) */}
          {viewMode === "slides" && (
            <div className="flex items-center gap-2 flex-wrap justify-between sm:justify-end w-full sm:w-auto">
              {/* Slide Indicator Pills */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-full py-1">
                {SLIDES_CONFIG.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => goToSlide(idx)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 whitespace-nowrap ${
                      currentSlide === idx
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                        : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                    }`}
                  >
                    <span>{idx + 1}.</span>
                    <span>{s.title}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  title="Previous Slide (← Arrow)"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-cyan-400">
                  {currentSlide + 1} / {SLIDES_CONFIG.length}
                </span>

                <button
                  onClick={nextSlide}
                  disabled={currentSlide === SLIDES_CONFIG.length - 1}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  title="Next Slide (→ Arrow)"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsFocusMode(!isFocusMode)}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    isFocusMode
                      ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300"
                      : "bg-white/5 hover:bg-white/10 border-white/10 text-gray-400 hover:text-white"
                  }`}
                  title={isFocusMode ? "Exit Focus Mode" : "Focus Mode"}
                >
                  {isFocusMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>
        </div>

        {/* =========================================================================
            MODE A: INTERACTIVE SLIDES EXPERIENCE
        ========================================================================= */}
        {viewMode === "slides" && (
          <div className="relative min-h-[600px] overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: slideDirection * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: slideDirection * -40 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="space-y-6"
              >
                {/* SLIDE HEADER BANNER */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-gray-950 via-gray-900 to-black border border-white/10 flex items-center justify-between gap-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                      {(() => {
                        const Icon = SLIDES_CONFIG[currentSlide].icon;
                        return <Icon className="w-5 h-5" />;
                      })()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          {SLIDES_CONFIG[currentSlide].badge}
                        </span>
                        <h2 className="text-base sm:text-lg font-bold text-white">
                          {SLIDES_CONFIG[currentSlide].title}
                        </h2>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {SLIDES_CONFIG[currentSlide].desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {currentSlide > 0 && (
                      <button
                        onClick={prevSlide}
                        className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Back</span>
                      </button>
                    )}
                    {currentSlide < SLIDES_CONFIG.length - 1 ? (
                      <button
                        onClick={nextSlide}
                        className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all flex items-center gap-1 shadow-md cursor-pointer"
                      >
                        <span>Next Slide</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => goToSlide(0)}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Start Over</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* SLIDE 0: OFFICIAL OFFER LETTER & TERMS */}
                {currentSlide === 0 && (
                  <SpotlightCard className="p-6 sm:p-8 border-cyan-500/30 bg-gradient-to-br from-gray-950 via-black to-cyan-950/20 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <FileText className="w-5 h-5 text-cyan-400" />
                            <span>Stage 01: Letter of Intent & Appointment</span>
                          </h3>
                          {isApplicationApproved ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase">
                              ✓ Approved & Issued
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-yellow-300 text-[10px] font-mono font-bold uppercase flex items-center gap-1">
                              <Clock className="w-3 h-3 animate-pulse text-yellow-400" />
                              <span>Pending Admin Selection</span>
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Issued under Haque & Sons Practicum Division • Reference:{" "}
                          <strong className="text-white font-mono">{offerLetterData.id}</strong>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {isApplicationApproved ? (
                          <button
                            onClick={() => setIsOfferLetterOpen(true)}
                            className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                            <span>Expand Fullscreen</span>
                          </button>
                        ) : (
                          <button
                            onClick={refreshProfileData}
                            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Refresh Status</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {isApplicationApproved ? (
                      <div className="bg-gray-950/80 rounded-2xl border border-white/10 p-4">
                        <OfferLetterRenderer data={offerLetterData} showActions={true} />
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Pending Admin Evaluation Hero Card */}
                        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-yellow-950/20 via-black to-cyan-950/20 border border-yellow-500/30 shadow-2xl relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />
                          <div className="relative z-10 space-y-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                                  <Clock className="w-6 h-6 animate-pulse" />
                                </div>
                                <div className="space-y-1">
                                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                                    Stage 01 • Application Under Review
                                  </div>
                                  <h4 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                                    Awaiting Lead Admin Review & Selection Dispatch
                                  </h4>
                                  <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
                                    Hi <strong className="text-white">{fullName || "Student"}</strong>, your application for the <strong className="text-cyan-300">{domain}</strong> track has been registered in the Haque & Sons studio ledger.
                                    Our evaluation team reviews each applicant&apos;s academic background and profile before issuing the formal 2-page Offer Letter.
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* 4-Step Progress Ribbon */}
                            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                <div>
                                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Step 01</span>
                                  <span className="text-xs font-semibold text-white">Application Submitted</span>
                                </div>
                              </div>

                              <div className="p-3 rounded-xl bg-yellow-950/30 border border-yellow-500/40 flex items-center gap-2.5 shadow-[0_0_15px_rgba(234,179,8,0.15)]">
                                <div className="w-4 h-4 rounded-full border-2 border-yellow-400 border-t-transparent animate-spin shrink-0" />
                                <div>
                                  <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-wider block">Step 02 • Active</span>
                                  <span className="text-xs font-semibold text-yellow-200">Admin Evaluation</span>
                                </div>
                              </div>

                              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex items-center gap-2.5 opacity-60">
                                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                                <div>
                                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Step 03</span>
                                  <span className="text-xs font-semibold text-gray-300">Selection Email</span>
                                </div>
                              </div>

                              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex items-center gap-2.5 opacity-60">
                                <FileText className="w-4 h-4 text-gray-400 shrink-0" />
                                <div>
                                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Step 04</span>
                                  <span className="text-xs font-semibold text-gray-300">Offer Letter Unlocked</span>
                                </div>
                              </div>
                            </div>

                            {/* Candidate Summary Box */}
                            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                              <div>
                                <span className="text-[10px] uppercase font-bold text-gray-500 block">Domain Track:</span>
                                <span className="text-cyan-400 font-semibold">{domain}</span>
                              </div>
                              <div>
                                <span className="text-[10px] uppercase font-bold text-gray-500 block">Track Mode:</span>
                                <span className="text-white font-semibold">{mode} Track</span>
                              </div>
                              <div>
                                <span className="text-[10px] uppercase font-bold text-gray-500 block">Duration:</span>
                                <span className="text-white font-semibold">{duration}</span>
                              </div>
                              <div>
                                <span className="text-[10px] uppercase font-bold text-gray-500 block">College / University:</span>
                                <span className="text-gray-300 font-semibold truncate block">{college || "Not specified"}</span>
                              </div>
                              <div>
                                <span className="text-[10px] uppercase font-bold text-gray-500 block">Degree & Batch:</span>
                                <span className="text-gray-300 font-semibold">{degree} ({graduationYear})</span>
                              </div>
                              <div>
                                <span className="text-[10px] uppercase font-bold text-gray-500 block">Registered Email:</span>
                                <span className="text-gray-300 font-mono truncate block">{session?.user?.email || application?.email || "N/A"}</span>
                              </div>
                            </div>

                            {/* What happens next callout */}
                            <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="space-y-1">
                                <h5 className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                                  <span>What happens when you are selected?</span>
                                </h5>
                                <p className="text-[11px] text-gray-300 leading-relaxed">
                                  Once the administrator approves your application, an official selection email will be sent to <strong className="text-white">{session?.user?.email}</strong> with your confirmation, and your formal 2-page Offer Letter of Appointment will unlock right here for immediate download and print.
                                </p>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <button
                                  onClick={() => setIsEditProfileOpen(true)}
                                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                                >
                                  <User className="w-3.5 h-3.5 text-cyan-400" />
                                  <span>Edit Info</span>
                                </button>
                                <button
                                  onClick={() => goToSlide(1)}
                                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                                >
                                  <span>Preview Syllabus</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </SpotlightCard>
                )}

                {/* SLIDE 1: SPRINT SYLLABUS & 4-WEEK KANBAN */}
                {currentSlide === 1 && (
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

                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-white/10 rounded-full h-2 overflow-hidden border border-white/10">
                            <div
                              className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                              style={{ width: `${sprintPercentage}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono font-bold text-emerald-400">
                            {sprintPercentage}% Completed
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {completedSprintTasks} / {totalSprintTasks} Tasks Checked
                        </span>
                      </div>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                        Assigned Tech Stack:
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

                    {/* Assigned Capstone Goal */}
                    <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-1.5">
                      <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold">
                        <Code2 className="w-4 h-4 text-cyan-400" />
                        <span>Assigned Capstone Project Goal:</span>
                      </div>
                      <p className="text-xs text-gray-200 leading-relaxed font-mono">
                        {currentDomainObj.capstoneProject}
                      </p>
                    </div>

                    {/* 4-Week Kanban Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {currentDomainObj.curriculum.map((c) => {
                        const weekDone = c.topics.every((t) => sprintTasks[`${c.week}-${t}`]);
                        return (
                          <div
                            key={c.week}
                            className={`p-4 rounded-2xl border transition-all space-y-2.5 ${
                              weekDone
                                ? "bg-emerald-950/20 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                                : "bg-black/60 border-white/10 hover:border-cyan-500/40"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                                  weekDone
                                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                                    : "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                                }`}
                              >
                                {c.week}
                              </span>
                              {weekDone ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Clock className="w-3.5 h-3.5 text-gray-500" />
                              )}
                            </div>
                            <h4 className="text-xs font-bold text-white leading-tight">{c.title}</h4>
                            <div className="pt-1">
                              <div className="text-[11px] text-gray-400 space-y-1.5 font-mono">
                                {c.topics.map((t) => {
                                  const isTaskDone = !!sprintTasks[`${c.week}-${t}`];
                                  return (
                                    <button
                                      key={t}
                                      type="button"
                                      onClick={() => toggleSprintTask(`${c.week}-${t}`)}
                                      className="w-full flex items-start gap-2 text-left cursor-pointer group py-0.5"
                                    >
                                      <span
                                        className={`w-3.5 h-3.5 mt-0.5 rounded border flex items-center justify-center shrink-0 transition-all ${
                                          isTaskDone
                                            ? "bg-emerald-500 border-emerald-400 text-white"
                                            : "border-white/20 bg-white/5 group-hover:border-cyan-400"
                                        }`}
                                      >
                                        {isTaskDone && <Check className="w-2.5 h-2.5" />}
                                      </span>
                                      <span
                                        className={`leading-snug transition-all ${
                                          isTaskDone
                                            ? "line-through text-gray-500"
                                            : "text-gray-300 group-hover:text-cyan-200"
                                        }`}
                                      >
                                        {t}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </SpotlightCard>
                )}

                {/* SLIDE 2: CAPSTONE SUBMISSION STUDIO */}
                {currentSlide === 2 && (
                  <SpotlightCard className="p-6 sm:p-8 border-white/10 space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Code2 className="w-5 h-5 text-cyan-400" />
                        <span>Capstone Project Submission & Code Evaluation</span>
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        Submit your public GitHub repository and live deployment URL for review by Nejamul Haque.
                      </p>
                    </div>

                    {projectSubmittedSuccess && (
                      <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>Capstone project submitted! Proceed to Slide 04 for exit feedback & verification.</span>
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

                    {/* Email Project ZIP Archive */}
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
                              If your project has local databases, full-stack bundles, or datasets, bundle your project folder into a <strong>.zip</strong> archive and send it directly to <strong>haquendsons@gmail.com</strong>.
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <a
                            href={`mailto:haquendsons@gmail.com?subject=${encodeURIComponent(
                              `Project ZIP Submission: ${fullName || "Student"} - ${domain} Track (${offerLetterData.id})`
                            )}&body=${encodeURIComponent(
                              `Hi Haque & Sons Evaluation Team / Nejamul Haque,\n\nI am attaching my Capstone Project ZIP file for evaluation.\n\nSTUDENT DETAILS:\n- Candidate Name: ${fullName || "Student"}\n- Registered Email: ${session?.user?.email || ""}\n- College: ${college || "N/A"}\n- Domain Track: ${domain}\n- Track Mode: ${mode} Track\n- Offer Ref ID: ${offerLetterData.id}\n\nPROJECT SUBMISSION:\n- GitHub Repo: ${githubRepo || "N/A"}\n- Live Hosted Demo: ${liveUrl || "N/A"}\n\n[ATTACH YOUR .ZIP ARCHIVE HERE]\n\nRegards,\n${fullName || "Student"}`
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
                            title="Copy Email Template for Webmail"
                          >
                            {copiedEmailTemplate ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedEmailTemplate ? "Template Copied!" : "Copy Template"}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                )}

                {/* SLIDE 3: EXIT FEEDBACK & UPI FEE CLEARANCE */}
                {currentSlide === 3 && (
                  <SpotlightCard className="p-6 sm:p-8 border-purple-500/30 bg-gradient-to-br from-gray-950 via-black to-purple-950/20 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[10px] font-bold uppercase tracking-wider mb-2">
                          <Award className="w-3 h-3" />
                          <span>Mandatory Verification Process</span>
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          Feedback Form, UPI Fee & Verification Release
                        </h3>
                        <p className="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
                          Complete your evaluation form, make the verification processing payment to <strong>{UPI_ID}</strong>, and upload your payment proof. Once reviewed, your official digital certificate unlocks on Slide 05.
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

                    {/* Payment review status */}
                    {isPendingReview && !isEditingPayment && (
                      <div className="p-6 rounded-2xl bg-yellow-950/30 border border-yellow-500/30 space-y-4">
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <h4 className="text-sm font-bold text-yellow-300">
                              Payment Proof Under Review by Nejamul Haque
                            </h4>
                            <p className="text-xs text-yellow-200/80 leading-relaxed">
                              Transaction UTR: <strong className="font-mono text-white bg-black/40 px-2 py-0.5 rounded">{paymentUtr || "Submitted"}</strong>.
                            </p>
                            <p className="text-[11px] text-yellow-300/70">
                              Admin will approve and release your certificate shortly.
                            </p>
                          </div>
                        </div>

                        <div className="pt-2 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setIsEditingPayment(true)}
                            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Update Payment Proof</span>
                          </button>
                        </div>
                      </div>
                    )}

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

                        {/* Step 1: Evaluation */}
                        <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
                            <div>
                              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold flex items-center justify-center font-mono">1</span>
                                <span>Google Form & Evaluation Feedback</span>
                              </h4>
                              <p className="text-[11px] text-gray-400 mt-1">
                                Complete our official Google exit form or enter your rating notes.
                              </p>
                            </div>

                            <a
                              href={GOOGLE_FORM_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-200 text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap"
                            >
                              <span>Open Google Form</span>
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
                                Internship Feedback Notes
                              </label>
                              <input
                                type="text"
                                placeholder="What did you build and learn during your internship at Haque & Sons?"
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Step 2: UPI Payment QR */}
                        <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-5">
                          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                            <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center justify-center font-mono">
                              2
                            </span>
                            <div>
                              <h4 className="text-sm font-bold text-white">
                                Mode & UPI Processing Fee
                              </h4>
                              <p className="text-[11px] text-gray-400">
                                Scan the dynamic QR code with any UPI app.
                              </p>
                            </div>
                          </div>

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

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center pt-2">
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
                                  Scan with Any UPI App
                                </p>
                                <p className="text-[10px] text-gray-600 font-mono font-bold">
                                  Nejamul Haque • {UPI_ID}
                                </p>
                                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-[10px] font-mono font-extrabold">
                                  Amount: ₹{activeFee.amount} ({activeModeKey})
                                </span>
                              </div>
                            </div>

                            <div className="md:col-span-2 space-y-3 text-xs">
                              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-400 font-medium">Recipient:</span>
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
                                  <span className="text-gray-400 font-medium">Processing Fee:</span>
                                  <span className="text-yellow-300 font-bold font-mono">
                                    ₹{activeFee.amount} ({activeModeKey} Track)
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Step 3: UTR & Screenshot */}
                        <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-4">
                          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center justify-center font-mono">
                              3
                            </span>
                            <h4 className="text-sm font-bold text-white">
                              Upload Payment Screenshot & 12-Digit UTR
                            </h4>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                            </div>

                            <div>
                              <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                                Payment Screenshot
                              </label>
                              <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/20 hover:border-cyan-400/50 rounded-xl p-3 cursor-pointer bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                                <Upload className="w-4 h-4 text-cyan-400 mb-1" />
                                <span className="text-xs text-gray-300 font-semibold">
                                  {paymentScreenshot ? "Change Screenshot" : "Upload Screenshot"}
                                </span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleScreenshotChange}
                                  className="hidden"
                                />
                              </label>
                            </div>
                          </div>

                          <div className="pt-2 flex items-center gap-3">
                            <button
                              type="submit"
                              disabled={submittingPayment}
                              className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center gap-2 cursor-pointer disabled:opacity-50"
                            >
                              <Check className="w-4 h-4" />
                              <span>
                                {submittingPayment ? "Submitting for Review..." : "Submit Payment & Unlock Certificate"}
                              </span>
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </SpotlightCard>
                )}

                {/* SLIDE 4: VERIFIED CERTIFICATE & LOR SUITE */}
                {currentSlide === 4 && (
                  <div className="space-y-6">
                    {isApproved && certificate ? (
                      <div className="space-y-6">
                        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                            <div>
                              <strong className="block font-bold text-emerald-300">
                                Verified by Nejamul Haque (Founder & Lead Engineer)
                              </strong>
                              <span className="text-[11px] text-emerald-400/90">
                                Certificate ID: {certificate.id} • Permanently recorded on public ledger.
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => setIsLorModalOpen(true)}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
                          >
                            <Star className="w-3.5 h-3.5 fill-slate-950" />
                            <span>Download LOR (PDF)</span>
                          </button>
                        </div>

                        <CertificateRenderer certificate={certificate} showActions={true} />

                        <VerifyCredentialActions
                          certId={certificate.id}
                          studentName={certificate.studentName}
                          domain={certificate.domain}
                          issueDate={certificate.issueDate}
                        />
                      </div>
                    ) : (
                      <SpotlightCard className="p-8 sm:p-12 text-center border-purple-500/30 space-y-4">
                        <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 mx-auto flex items-center justify-center">
                          <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Certificate Locked</h3>
                        <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                          Complete your capstone submission (Slide 03) and clear the exit feedback & verification fee (Slide 04) to unlock your tamper-proof certificate and official Letter of Recommendation.
                        </p>
                        <div className="pt-2">
                          <button
                            onClick={() => goToSlide(3)}
                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
                          >
                            <span>Go to Exit Form & Payment (Slide 04)</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </SpotlightCard>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* =========================================================================
            MODE B: FULL OVERVIEW GRID DASHBOARD
        ========================================================================= */}
        {viewMode === "overview" && (
          <div className="space-y-6">
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

            {activeTab === "internship" && (
              <div className="space-y-6">
                {/* Stepper overview */}
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
                    <div className={`p-4 rounded-2xl border ${isApplicationApproved ? "bg-emerald-950/30 border-emerald-500/40" : "bg-yellow-950/30 border-yellow-500/40"}`}>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isApplicationApproved ? "bg-emerald-500/20 text-emerald-300" : "bg-yellow-500/20 text-yellow-300"}`}>
                        {isApplicationApproved ? "01 Active" : "01 Review"}
                      </span>
                      <h4 className="text-xs font-bold text-white mt-1">
                        {isApplicationApproved ? "Enrolled & Offer Issued" : "Pending Admin Review"}
                      </h4>
                      <p className={`text-[11px] mt-0.5 ${isApplicationApproved ? "text-emerald-400/80" : "text-yellow-400/80"}`}>
                        {isApplicationApproved ? "Letter of Intent signed & issued." : "Awaiting admin selection approval."}
                      </p>
                    </div>

                    <div className={`p-4 rounded-2xl border ${githubRepo || application?.githubRepo ? "bg-cyan-950/30 border-cyan-500/40" : "bg-white/[0.02] border-white/10"}`}>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">02 Capstone</span>
                      <h4 className="text-xs font-bold text-white mt-1">Capstone Project</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">Submit GitHub & live link.</p>
                    </div>

                    <div className={`p-4 rounded-2xl border ${isApproved ? "bg-emerald-950/30 border-emerald-500/40" : isPendingReview ? "bg-yellow-950/30 border-yellow-500/40" : "bg-purple-950/30 border-purple-500/40"}`}>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">03 Clearance</span>
                      <h4 className="text-xs font-bold text-white mt-1">Exit Form & UPI Fee</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">Google form + fee to {UPI_ID}.</p>
                    </div>

                    <div className={`p-4 rounded-2xl border ${isApproved ? "bg-emerald-950/30 border-emerald-500/40" : "bg-white/[0.02] border-white/10"}`}>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isApproved ? "bg-emerald-500/20 text-emerald-300" : "bg-white/10 text-gray-500"}`}>04 Verified</span>
                      <h4 className="text-xs font-bold text-white mt-1">Verified Certificate</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">Cryptographic QR & public ledger.</p>
                    </div>
                  </div>
                </div>

                {/* Offer Letter Preview button */}
                <div className="p-6 rounded-3xl bg-gray-950/90 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-white">Official Offer Letter & Terms</h4>
                      {!isApplicationApproved && (
                        <span className="px-2 py-0.5 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-yellow-300 text-[10px] font-mono font-bold">
                          Pending Approval
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">
                      {isApplicationApproved
                        ? "View, print, or download your 2-page letter of intent."
                        : "Unlocks immediately once approved by the administrator."}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOfferLetterOpen(true)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2 ${
                      isApplicationApproved
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                        : "bg-white/5 hover:bg-white/10 border border-yellow-500/30 text-yellow-300"
                    }`}
                  >
                    {isApplicationApproved ? (
                      <span>View Offer Letter</span>
                    ) : (
                      <>
                        <Clock className="w-3.5 h-3.5 text-yellow-400" />
                        <span>Check Offer Status</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Academic Details Tab */}
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
                        Full Legal Name *
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
                        Phone / WhatsApp *
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
                        placeholder="e.g. Teerthanker Mahaveer University"
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
                        Internship Domain
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

            {/* Community Tab */}
            {activeTab === "community" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SpotlightCard className="p-6 sm:p-8 border-white/10 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Developer Community</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Collaborate with fellow student engineers, share code snippets, and participate in tech discussions.
                  </p>
                  <div className="pt-2">
                    <a
                      href="https://chat.whatsapp.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold inline-flex items-center gap-1.5"
                    >
                      <span>Join WhatsApp Group</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </SpotlightCard>

                <SpotlightCard className="p-6 sm:p-8 border-white/10 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Direct Mentorship</h3>
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
        )}
      </div>

      {/* OFFER LETTER MODAL */}
      {isOfferLetterOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/90 backdrop-blur-2xl p-2 sm:p-4 md:p-6 flex justify-center items-start">
          <div className="relative w-full max-w-4xl bg-gray-950 border border-cyan-500/40 rounded-3xl shadow-[0_0_80px_rgba(6,182,212,0.25)] my-2 sm:my-4 pb-28">
            <div className="sticky top-0 z-30 bg-gray-950/95 backdrop-blur-xl border-b border-white/10 px-5 sm:px-6 py-3.5 rounded-t-3xl shadow-xl flex items-center justify-between gap-4 print:hidden">
              <div className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full ${isApplicationApproved ? "bg-cyan-400" : "bg-yellow-400"} animate-pulse`} />
                <div>
                  <span className="text-xs font-bold text-white block">
                    Official 2-Page Internship Offer Letter
                  </span>
                  <span className="text-[10px] text-cyan-400 font-mono">
                    {isApplicationApproved ? `Ref: ${offerLetterData.id} • Signatory: Nejamul Haque` : `Status: Awaiting Admin Review & Approval`}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOfferLetterOpen(false)}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold shadow-sm"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>

            <div className="p-3 sm:p-6">
              {isApplicationApproved ? (
                <OfferLetterRenderer
                  data={offerLetterData}
                  showActions={true}
                  onClose={() => setIsOfferLetterOpen(false)}
                />
              ) : (
                <div className="p-8 sm:p-12 text-center space-y-6 max-w-xl mx-auto">
                  <div className="w-16 h-16 rounded-3xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                    <Clock className="w-8 h-8 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-white">Offer Letter Under Review</h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Your application for the <strong className="text-cyan-300">{domain}</strong> track is currently undergoing technical review.
                      Once approved by the admin, you will receive an official selection email and your full 2-page Offer Letter will unlock right here for PDF download.
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setIsOfferLetterOpen(false);
                        setIsEditProfileOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-xs font-semibold cursor-pointer"
                    >
                      Edit Application Details
                    </button>
                    <button
                      onClick={refreshProfileData}
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold shadow-md cursor-pointer"
                    >
                      Refresh Status
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* LOR MODAL */}
      {isLorModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/90 backdrop-blur-2xl p-2 sm:p-4 md:p-6 flex justify-center items-start">
          <div className="relative w-full max-w-4xl bg-gray-950 border border-amber-500/40 rounded-3xl shadow-[0_0_80px_rgba(245,158,11,0.25)] my-2 sm:my-4 pb-28">
            <div className="sticky top-0 z-30 bg-gray-950/95 backdrop-blur-xl border-b border-white/10 px-5 sm:px-6 py-3.5 rounded-t-3xl shadow-xl flex items-center justify-between gap-4 print:hidden">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <div>
                  <span className="text-xs font-bold text-white block">
                    Official Executive Letter of Recommendation (LOR)
                  </span>
                  <span className="text-[10px] text-amber-400 font-mono">
                    Ref: {lorData.id} • Signatory: Nejamul Haque
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsLorModalOpen(false)}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold shadow-sm"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>

            <div className="p-3 sm:p-6">
              <LetterOfRecommendationRenderer
                lorData={lorData}
                showActions={true}
              />
            </div>
          </div>
        </div>
      )}

      {/* EDIT PROFILE DETAILS MODAL */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/85 backdrop-blur-xl p-3 sm:p-6 flex justify-center items-center">
          <div className="relative w-full max-w-xl bg-[#090d16] border border-cyan-500/30 rounded-3xl shadow-[0_0_60px_rgba(6,182,212,0.25)] my-6 overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600" />

            <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Edit Candidate Profile &amp; Academic Info
                  </h3>
                  <p className="text-[10px] text-gray-400 font-mono">
                    Updated info is synchronized directly to your verified credentials.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsEditProfileOpen(false)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {saveSuccessMsg && (
              <div className="mx-5 sm:mx-6 mt-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{saveSuccessMsg}</span>
              </div>
            )}

            <form
              onSubmit={async (e) => {
                await handleSaveProfile(e);
                setTimeout(() => setIsEditProfileOpen(false), 800);
              }}
              className="p-5 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-400 font-medium"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    College / University *
                  </label>
                  <input
                    type="text"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-400 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full bg-black/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-400 font-medium"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Degree / Branch
                  </label>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="B.Tech Computer Science"
                    className="w-full bg-black/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-400 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Graduation Year
                  </label>
                  <input
                    type="text"
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                    placeholder="2026"
                    className="w-full bg-black/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-400 font-medium"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Internship Mode
                  </label>
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="w-full bg-black/80 border border-white/15 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-400 font-medium cursor-pointer"
                  >
                    <option value="Online">Online Track</option>
                    <option value="Hybrid">Hybrid Track</option>
                    <option value="Offline">Offline Studio Track</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    GitHub Profile
                  </label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full bg-black/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full bg-black/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Portfolio URL
                  </label>
                  <input
                    type="url"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-black/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-all cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={savingProfile}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {savingProfile ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  <span>Save Profile Details</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Embedded Irus AI Studio Copilot */}
      <IrusCopilotWidget />
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
