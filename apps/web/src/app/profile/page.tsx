"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { useSession, signOut, performSecureSignOut } from "@/lib/auth-client";
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
  BookOpen,
  Briefcase,
  Layers,
  Compass,
  FolderArchive,
  FileCode,
  CheckSquare,
  HardDrive,
} from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import { CertificateRenderer, type CertificateData } from "@/components/CertificateRenderer";
import { OfferLetterRenderer, type OfferLetterData } from "@/components/OfferLetterRenderer";
import { LetterOfRecommendationRenderer, type LORData } from "@/components/LetterOfRecommendationRenderer";
import { VerifyCredentialActions } from "@/components/VerifyCredentialActions";
import { IrusCopilotWidget } from "@/components/IrusCopilotWidget";
import { INTERNSHIP_DOMAINS, type InternshipDomain, type DomainAssignment } from "@/lib/domains";
import { ACADEMIC_DEGREES, GRADUATION_YEARS } from "@/lib/academic-fields";
import { getAicteComplianceInfo, generateAicteActivityLog, type ActivityDiaryEntry } from "@/lib/aicte";

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
  { id: 2, title: "AICTE Practicum & ZIP", badge: "Stage 03", icon: Code2, desc: "3 Domain Milestones & ZIP Review" },
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

  // AICTE Practicum & Project Submission states
  const [githubRepo, setGithubRepo] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [projectZipUrl, setProjectZipUrl] = useState("");
  const [assignmentNotes, setAssignmentNotes] = useState("");
  const [projectZipFileName, setProjectZipFileName] = useState("");
  const [projectZipFileSize, setProjectZipFileSize] = useState("");
  const [submittingProject, setSubmittingProject] = useState(false);
  const [projectSubmittedSuccess, setProjectSubmittedSuccess] = useState(false);
  const [activeAssignmentTab, setActiveAssignmentTab] = useState<number>(0);

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

  // Offer Letter, LOR & AICTE Diary modals
  const [isOfferLetterOpen, setIsOfferLetterOpen] = useState(false);
  const [isLorModalOpen, setIsLorModalOpen] = useState(false);
  const [isApplyLorModalOpen, setIsApplyLorModalOpen] = useState(false);
  const [isAicteDiaryOpen, setIsAicteDiaryOpen] = useState(false);
  const [downloadingDiary, setDownloadingDiary] = useState(false);
  const [lorRemarksInput, setLorRemarksInput] = useState("");
  const [isSubmittingLor, setIsSubmittingLor] = useState(false);
  const [lorSubmitSuccess, setLorSubmitSuccess] = useState<string | null>(null);
  const [lorSubmitError, setLorSubmitError] = useState<string | null>(null);

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
    if (isOfferLetterOpen || isLorModalOpen || isAicteDiaryOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOfferLetterOpen, isLorModalOpen, isAicteDiaryOpen]);

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

  const handleZipFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert("File is larger than 8MB. Please paste your Google Drive / OneDrive / GitHub Release link in the Cloud ZIP URL field below, or email it to haquendsons@gmail.com.");
      return;
    }

    setProjectZipFileName(file.name);
    setProjectZipFileSize((file.size / (1024 * 1024)).toFixed(2) + " MB");

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setProjectZipUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email) return;

    if (!githubRepo.trim() && !liveUrl.trim() && !projectZipUrl.trim()) {
      alert("Please provide at least a GitHub Repository URL, Live Demo URL, or Project ZIP file.");
      return;
    }

    setSubmittingProject(true);
    try {
      const res = await fetch("/api/profile/submit-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          githubRepo: githubRepo.trim(),
          liveUrl: liveUrl.trim(),
          projectZipUrl: projectZipUrl.trim(),
          assignmentNotes: assignmentNotes.trim(),
          assignment1Status: "Submitted",
          assignment2Status: "Submitted",
          assignment3Status: "Submitted",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setApplication(data.application);
        setProjectSubmittedSuccess(true);
        setTimeout(() => setProjectSubmittedSuccess(false), 5000);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to submit project.");
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
    await performSecureSignOut("/auth/signin");
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

  const aicteInfo = getAicteComplianceInfo(duration);
  const aicteActivityLog = generateAicteActivityLog(domain, duration);

  const handlePrintAicteDiary = () => {
    const node = document.getElementById("aicte-diary-document");
    if (!node) return;

    setDownloadingDiary(true);

    const printWin = window.open("", "_blank", "width=900,height=1100");
    if (printWin) {
      printWin.document.open();
      printWin.document.write(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <title>AICTE_Activity_Diary_${(fullName || "Student").replace(/\s+/g, "_")}_${aicteInfo.aicteCode}</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
            <style>
              @page {
                size: A4 portrait;
                margin: 8mm 10mm;
              }
              *, *::before, *::after {
                box-sizing: border-box !important;
              }
              html, body {
                background: #ffffff !important;
                color: #0f172a !important;
                font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, sans-serif !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                margin: 0 !important;
                padding: 0 !important;
              }
              .diary-sheet {
                width: 100% !important;
                max-width: 100% !important;
                margin: 0 auto !important;
                background: #ffffff !important;
                color: #0f172a !important;
              }
            </style>
          </head>
          <body class="bg-white text-slate-900 p-6">
            <div class="diary-sheet">
              ${node.innerHTML}
            </div>
            <script>
              window.onload = function() {
                setTimeout(function() {
                  window.focus();
                  window.print();
                  setTimeout(function() {
                    window.close();
                  }, 800);
                }, 400);
              };
            </script>
          </body>
        </html>
      `);
      printWin.document.close();
      setTimeout(() => setDownloadingDiary(false), 1200);
    } else {
      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "0";
      document.body.appendChild(iframe);

      const doc = iframe.contentWindow?.document;
      if (doc && iframe.contentWindow) {
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>AICTE_Activity_Diary_${(fullName || "Student").replace(/\s+/g, "_")}_${aicteInfo.aicteCode}</title>
              <script src="https://cdn.tailwindcss.com"></script>
              <style>
                @page { size: A4 portrait; margin: 8mm 10mm; }
                html, body { background: #fff !important; color: #0f172a !important; font-family: sans-serif; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; margin: 0; padding: 0; }
              </style>
            </head>
            <body style="padding: 16px;">
              <div>${node.innerHTML}</div>
            </body>
          </html>
        `);
        doc.close();
        setTimeout(() => {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
          setDownloadingDiary(false);
          setTimeout(() => {
            try { document.body.removeChild(iframe); } catch(e) {}
          }, 2000);
        }, 500);
      } else {
        setDownloadingDiary(false);
      }
    }
  };

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

  const isLorApproved = application?.lorStatus === "Approved";
  const isLorPending = application?.lorStatus === "Pending";
  const isLorRejected = application?.lorStatus === "Rejected";
  const isLorNotApplied = !application?.lorStatus || application?.lorStatus === "None";

  const lorData: LORData = {
    id: application?.lorRefNumber || certificate?.id || `HS-LOR-2026-${(fullName || "STUDENT").replace(/\s+/g, "").slice(0, 4).toUpperCase()}-001`,
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

  const handleApplyLor = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!session?.user?.email) return;
    setIsSubmittingLor(true);
    setLorSubmitError(null);
    setLorSubmitSuccess(null);
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
        setLorSubmitSuccess("Your Letter of Recommendation (LOR) application has been submitted to Admin for technical evaluation!");
        setIsApplyLorModalOpen(false);
      } else {
        setLorSubmitError(data.error || "Failed to submit LOR application.");
      }
    } catch {
      setLorSubmitError("Network error while submitting LOR application.");
    } finally {
      setIsSubmittingLor(false);
    }
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
          setProjectZipUrl(data.application.projectZipUrl || "");
          setAssignmentNotes(data.application.assignmentNotes || "");
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
            1. EXECUTIVE CANDIDATE HUD (AICTE NEP 2020 & NCRF ACCREDITED)
        ========================================================================= */}
        {!isFocusMode && (
          <div className="relative rounded-3xl bg-gradient-to-b from-[#0b101d] via-[#080d18] to-black border border-white/10 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_60px_rgba(6,182,212,0.12)] overflow-hidden space-y-6">
            {/* Subtle Top Accent Glow Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-80" />
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Row: Identity + Actions */}
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Left: Avatar + Details */}
              <div className="flex items-start sm:items-center gap-5">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20 border border-cyan-500/30 p-1 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.25)]">
                    <div className="w-full h-full bg-[#070b14] rounded-[14px] flex items-center justify-center text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-white to-purple-300">
                      {fullName ? fullName.charAt(0).toUpperCase() : "S"}
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-black flex items-center justify-center" title="Active Candidate">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {fullName || session?.user?.name || "Candidate Profile"}
                    </h1>

                    {isApplicationApproved ? (
                      <span className="px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Enrolled Intern</span>
                      </span>
                    ) : (
                      <span className="px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                        <span>Application Under Review</span>
                      </span>
                    )}

                    <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-400 font-mono text-xs">
                      ID: #HS-{application?.id ? String(application.id).padStart(4, "0") : "2026"}
                    </span>
                  </div>

                  {/* Structured Metadata Row */}
                  <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-xs text-gray-300 font-sans">
                    <span className="flex items-center gap-1.5 text-cyan-300 font-medium">
                      <GraduationCap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{college || "Institution Not Specified"}</span>
                    </span>
                    <span className="text-gray-600 hidden sm:inline">•</span>
                    <span className="text-gray-300">
                      {degree} ({graduationYear})
                    </span>
                    <span className="text-gray-600 hidden sm:inline">•</span>
                    <span className="text-purple-300 font-medium">
                      {domain}
                    </span>
                    <span className="text-gray-600 hidden sm:inline">•</span>
                    <span className="text-yellow-300/90 font-medium">
                      {mode} Track ({duration})
                    </span>
                    {session?.user?.email && (
                      <>
                        <span className="text-gray-600 hidden sm:inline">•</span>
                        <span className="text-gray-400 font-mono">
                          {session.user.email}
                        </span>
                      </>
                    )}
                    {phone && (
                      <>
                        <span className="text-gray-600 hidden sm:inline">•</span>
                        <span className="text-gray-400 font-mono">
                          📞 {phone}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Clean Unified Action Bar */}
              <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 lg:pt-0">
                {/* Primary Action Button: Offer Letter */}
                <button
                  onClick={() => setIsOfferLetterOpen(true)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                    isApplicationApproved
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:scale-[1.02]"
                      : "bg-white/5 hover:bg-white/10 border border-yellow-500/30 text-yellow-300"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>{isApplicationApproved ? "Offer Letter" : "Offer Letter (Pending)"}</span>
                </button>

                {/* AICTE Logbook Button */}
                <button
                  onClick={() => setIsAicteDiaryOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm group hover:scale-[1.02]"
                >
                  <BookOpen className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>AICTE Logbook</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-[10px] font-mono text-amber-200">
                    +{aicteInfo.activityPoints} Pts
                  </span>
                </button>

                {/* LOR Button */}
                {isLorApproved ? (
                  <button
                    onClick={() => setIsLorModalOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold transition-all shadow-[0_0_20px_rgba(245,158,11,0.35)] flex items-center gap-1.5 cursor-pointer"
                  >
                    <Star className="w-4 h-4 fill-slate-950 text-slate-950" />
                    <span>Official LOR</span>
                  </button>
                ) : isLorPending ? (
                  <button
                    onClick={() => setIsLorModalOpen(true)}
                    className="px-3.5 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Clock className="w-4 h-4 text-amber-400 animate-spin" />
                    <span>LOR Review</span>
                  </button>
                ) : isLorRejected ? (
                  <button
                    onClick={() => setIsApplyLorModalOpen(true)}
                    className="px-3.5 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                    <span>Re-Apply LOR</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsApplyLorModalOpen(true)}
                    className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 text-gray-300 hover:text-amber-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Star className="w-4 h-4 text-amber-400" />
                    <span>Apply LOR</span>
                  </button>
                )}

                {/* Edit Profile */}
                <button
                  onClick={() => setIsEditProfileOpen(true)}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
                  title="Edit Candidate Details"
                >
                  <User className="w-4 h-4 text-cyan-400" />
                </button>

                {/* Sign Out */}
                <button
                  onClick={handleSignOut}
                  disabled={loggingOut}
                  className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 hover:text-red-200 transition-all cursor-pointer disabled:opacity-60"
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

            {/* Bottom Row: Modern AICTE & NCrF Academic Credit HUD Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2 border-t border-white/5">
              {/* 1. AICTE Activity Points */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-amber-500/20 transition-all space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>AICTE Activity Points</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-300 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20">
                    +{aicteInfo.activityPoints} Pts Granted
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden border border-white/5">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                    style={{ width: `${Math.min(100, (aicteInfo.activityPoints / 100) * 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono">
                  <span>{aicteInfo.activityPoints} / 100 Pts AICTE Mandate</span>
                  <span className="text-emerald-400 font-bold">{Math.round((aicteInfo.activityPoints / 100) * 100)}% Achieved</span>
                </div>
              </div>

              {/* 2. NCrF Academic Credit Matrix */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-cyan-500/20 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-cyan-400" />
                    <span>NCrF Academic Credits</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-300 px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20">
                    {aicteInfo.credits} Credits
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300 font-mono">
                  <span className="text-white font-bold">{aicteInfo.totalHours} Clock Hours</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-cyan-300">{mode} Practicum</span>
                </div>
                <p className="text-[11px] text-gray-400 truncate" title={`${aicteInfo.category} (${aicteInfo.aicteCode})`}>
                  Category-B: Industry Practicum & Software R&D ({aicteInfo.aicteCode})
                </p>
              </div>

              {/* 3. Institutional Accreditations */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-emerald-500/20 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Institutional Accreditation</span>
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                    AICTE Compliant
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-emerald-300 font-semibold">MSME: {aicteInfo.msmeUdyamId}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-purple-300 font-semibold">ISO 9001:2015</span>
                </div>
                <p className="text-[11px] text-gray-400">
                  Compliant under AICTE NEP 2020 Internship Guidelines Clause 4.1-4.3
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            2. INTERNSHIP WORKSPACE & 5-STAGE PIPELINE NAVIGATION
        ========================================================================= */}
        <div className="space-y-4">
          {!isFocusMode && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
                  <GraduationCap className="w-3 h-3" />
                  <span>AICTE Practicum Pipeline</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Internship Workspace &amp; Milestones
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-gray-950 border border-white/10 text-xs font-mono">
                  <span className="text-gray-400">Sprint Progress:</span>
                  <span className="font-bold text-cyan-400">{sprintPercentage}% Completed</span>
                  <div className="w-16 bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-cyan-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${sprintPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW MODE TOGGLE & 5-STAGE LINEAR STEPPER */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-2 rounded-2xl bg-gray-950/90 border border-white/10 backdrop-blur-xl shadow-xl">
            {/* Left: View Mode Pills */}
            <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-white/5 shrink-0">
              <button
                onClick={() => setViewMode("slides")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === "slides"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.35)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Step-by-Step</span>
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
                <span>Complete Overview</span>
              </button>
            </div>

            {/* Center / Right: 5-Stage Linear Pipeline Navigation (When in Slides View) */}
            {viewMode === "slides" && (
              <div className="flex items-center gap-2 flex-wrap justify-between lg:justify-end w-full lg:w-auto">
                {/* 5-Stage Stepper Pills */}
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-full py-0.5">
                  {SLIDES_CONFIG.map((s, idx) => {
                    const isActive = currentSlide === idx;
                    const isCompleted = idx < currentSlide;
                    return (
                      <button
                        key={s.id}
                        onClick={() => goToSlide(idx)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 shrink-0 whitespace-nowrap ${
                          isActive
                            ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)] font-bold"
                            : isCompleted
                            ? "text-gray-300 hover:bg-white/5 border border-transparent"
                            : "text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent"
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                          isActive
                            ? "bg-cyan-500 text-black font-bold"
                            : isCompleted
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-white/10 text-gray-400"
                        }`}>
                          {isCompleted ? "✓" : idx + 1}
                        </span>
                        <span className="hidden sm:inline">{s.title}</span>
                        <span className="sm:hidden">{s.title.split(" ")[0]}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation Arrows & Fullscreen Toggle */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    title="Previous Step (← Arrow)"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="text-xs font-mono font-bold px-2.5 py-1.5 rounded-xl bg-black/60 border border-white/10 text-cyan-400">
                    {currentSlide + 1} / {SLIDES_CONFIG.length}
                  </span>

                  <button
                    onClick={nextSlide}
                    disabled={currentSlide === SLIDES_CONFIG.length - 1}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    title="Next Step (→ Arrow)"
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

                {/* SLIDE 1: SPRINT SYLLABUS & AICTE PRACTICUM KANBAN */}
                {currentSlide === 1 && (
                  <SpotlightCard className="p-6 sm:p-8 border-cyan-500/30 bg-gradient-to-br from-gray-950 via-black to-cyan-950/20 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-white/10">
                      <div className="space-y-2 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-2xl">{currentDomainObj.icon}</span>
                          <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                            {currentDomainObj.category}
                          </span>
                          <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center gap-1">
                            <Award className="w-3 h-3 text-amber-400" />
                            <span>+{aicteInfo.activityPoints} AICTE Points</span>
                          </span>
                          <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300">
                            {mode} • {duration} ({aicteInfo.totalHours}h)
                          </span>
                          <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono">
                            {aicteInfo.aicteCode}
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                          {domain}
                        </h2>
                        <p className="text-xs text-gray-300 leading-relaxed">
                          {currentDomainObj.tagline || currentDomainObj.description}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-3 shrink-0">
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
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-400 font-mono">
                            {completedSprintTasks} / {totalSprintTasks} Tasks ({completedSprintTasks * 4} / {aicteInfo.totalHours} Hours Logged)
                          </span>
                          <button
                            onClick={() => setIsAicteDiaryOpen(true)}
                            className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-[10px] font-bold font-mono transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <BookOpen className="w-3 h-3 text-amber-400" />
                            <span>AICTE Logbook</span>
                          </button>
                        </div>
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

                {/* SLIDE 2: AICTE PRACTICUM & 3 DOMAIN ASSIGNMENTS STUDIO */}
                {currentSlide === 2 && (
                  <SpotlightCard className="p-6 sm:p-8 border-cyan-500/30 bg-gradient-to-br from-gray-950 via-[#070d18] to-cyan-950/20 space-y-7">
                    {/* Header & Badges */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold font-mono uppercase tracking-wider flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-cyan-400" />
                            <span>AICTE NEP 2020 Practicum</span>
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-[10px] font-mono font-bold">
                            +{currentDomainObj.assignments?.reduce((acc, a) => acc + a.points, 0) || 30} Activity Points
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px] font-mono font-bold">
                            4 NCrF Academic Credits
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                          <FolderArchive className="w-6 h-6 text-cyan-400 shrink-0" />
                          <span>AICTE Practicum &amp; Domain Assignments</span>
                        </h3>
                        <p className="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
                          Complete the <strong>3 mandatory industry milestones</strong> for <span className="text-cyan-400 font-semibold">{currentDomainObj.name}</span>, upload your complete source code <strong className="text-white">.ZIP archive</strong>, and link your public GitHub repository for direct evaluation by <strong>Nejamul Haque</strong>.
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        {application?.projectStatus === "Approved" ? (
                          <div className="px-3.5 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold font-mono flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <div>
                              <span className="block">✓ Approved with Distinction</span>
                              <span className="text-[10px] text-emerald-400 font-normal">{application.projectGrade || "Grade O"}</span>
                            </div>
                          </div>
                        ) : application?.projectStatus === "Under Review" ? (
                          <div className="px-3.5 py-2 rounded-2xl bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 text-xs font-bold font-mono flex items-center gap-2 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                            <Clock className="w-4 h-4 text-yellow-400 shrink-0 animate-spin" />
                            <div>
                              <span className="block">⏳ Under Technical Review</span>
                              <span className="text-[10px] text-yellow-400/80 font-normal">By Nejamul Haque</span>
                            </div>
                          </div>
                        ) : application?.projectStatus === "Needs Revision" ? (
                          <div className="px-3.5 py-2 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold font-mono flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                            <div>
                              <span className="block">⚠️ Revision Requested</span>
                              <span className="text-[10px] text-rose-300/80 font-normal">Check remarks &amp; re-upload</span>
                            </div>
                          </div>
                        ) : (
                          <div className="px-3.5 py-2 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono font-medium flex items-center gap-2">
                            <Code2 className="w-4 h-4 text-cyan-400" />
                            <span>Pending Practicum Upload</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Evaluator Review Feedback Box if Approved / Needs Revision */}
                    {application?.projectStatus === "Approved" && (
                      <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold flex items-center gap-1.5 text-emerald-300">
                            <CheckCircle2 className="w-4 h-4" /> AICTE Practicum Evaluator Clearance Note
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400/80">
                            Evaluator: Nejamul Haque (Founder &amp; Lead Systems Engineer)
                          </span>
                        </div>
                        <p className="text-gray-300 italic pl-5 border-l-2 border-emerald-500/50">
                          &ldquo;{application.projectRemarks || "All 3 domain assignments and project ZIP archive evaluated and approved with Distinction."}&rdquo;
                        </p>
                        <div className="flex items-center gap-4 text-[11px] text-emerald-300/90 font-mono pt-1">
                          <span>Grade Awarded: <strong className="text-white">{application.projectGrade || "Distinction (Grade O)"}</strong></span>
                          <span>•</span>
                          <span>NCrF Credits: <strong className="text-white">4.0 Credits Granted</strong></span>
                          <span>•</span>
                          <span>AICTE Points: <strong className="text-white">+30 Activity Points</strong></span>
                        </div>
                      </div>
                    )}

                    {application?.projectStatus === "Needs Revision" && (
                      <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-xs space-y-2">
                        <span className="font-bold flex items-center gap-1.5 text-rose-300">
                          <AlertCircle className="w-4 h-4" /> Mentor Feedback &amp; Required Revisions
                        </span>
                        <p className="text-gray-300 italic pl-5 border-l-2 border-rose-500/50">
                          &ldquo;{application.projectRemarks}&rdquo;
                        </p>
                        <p className="text-[11px] text-rose-300/80">
                          Please update your GitHub repository or re-upload your modified project .ZIP archive using the form below.
                        </p>
                      </div>
                    )}

                    {projectSubmittedSuccess && (
                      <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5 animate-fadeIn">
                        <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                        <div>
                          <strong className="block">AICTE Practicum &amp; Project ZIP Submitted Successfully!</strong>
                          <span className="text-emerald-200/80">Nejamul Haque has been notified to evaluate your code and assign official grades.</span>
                        </div>
                      </div>
                    )}

                    {/* SECTION 1: THE 3 AICTE DOMAIN ASSIGNMENTS INTERACTIVE CARDS */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckSquare className="w-4 h-4 text-cyan-400" />
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                            Domain Assignments Rubric ({currentDomainObj.assignments?.length || 3} Milestones)
                          </h4>
                        </div>
                        <span className="text-[11px] font-mono text-gray-400">
                          Domain: <span className="text-cyan-400">{currentDomainObj.name}</span>
                        </span>
                      </div>

                      {/* Milestone Tabs */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {(currentDomainObj.assignments || []).map((asg, idx) => {
                          const isActive = activeAssignmentTab === idx;
                          const asgStatus =
                            idx === 0
                              ? application?.assignment1Status
                              : idx === 1
                              ? application?.assignment2Status
                              : application?.assignment3Status;

                          return (
                            <button
                              key={asg.id || idx}
                              type="button"
                              onClick={() => setActiveAssignmentTab(idx)}
                              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                                isActive
                                  ? "bg-cyan-500/15 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30"
                                  : "bg-black/50 border-white/10 hover:border-white/20 hover:bg-white/[0.02]"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2 mb-1.5">
                                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                                  isActive ? "bg-cyan-500/30 text-cyan-200" : "bg-white/5 text-gray-400"
                                }`}>
                                  Milestone 0{asg.number}
                                </span>
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                  asgStatus === "Approved"
                                    ? "bg-emerald-500/20 text-emerald-300"
                                    : asgStatus === "Submitted"
                                    ? "bg-yellow-500/20 text-yellow-300"
                                    : "bg-white/5 text-gray-400"
                                }`}>
                                  {asgStatus || "Pending"}
                                </span>
                              </div>
                              <h5 className="text-xs font-bold text-white line-clamp-1">
                                {asg.title}
                              </h5>
                              <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-400 font-mono">
                                <span>⏱ {asg.estimatedHours}h</span>
                                <span>•</span>
                                <span className="text-cyan-400">★ +{asg.points} Pts</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Active Assignment Detailed Rubric Card */}
                      {currentDomainObj.assignments && currentDomainObj.assignments[activeAssignmentTab] && (
                        <div className="p-5 rounded-2xl bg-black/70 border border-white/10 space-y-4 transition-all">
                          {(() => {
                            const asg = currentDomainObj.assignments[activeAssignmentTab];
                            return (
                              <>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                                  <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold">
                                        {asg.badge}
                                      </span>
                                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                        asg.difficulty.includes("Foundational")
                                          ? "bg-blue-500/20 text-blue-300"
                                          : asg.difficulty.includes("Intermediate")
                                          ? "bg-purple-500/20 text-purple-300"
                                          : "bg-amber-500/20 text-amber-300"
                                      }`}>
                                        Level: {asg.difficulty}
                                      </span>
                                      <span className="px-2 py-0.5 rounded-full bg-white/5 text-gray-300 text-[10px] font-mono">
                                        Estimated Work: {asg.estimatedHours} Hours
                                      </span>
                                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                                        AICTE Grant: +{asg.points} Points
                                      </span>
                                    </div>
                                    <h4 className="text-base font-bold text-white mt-1.5">
                                      {asg.number}. {asg.title}
                                    </h4>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                      {asg.description}
                                    </p>
                                  </div>
                                </div>

                                {/* Problem Statement */}
                                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 space-y-1.5">
                                  <span className="text-[11px] font-mono font-bold text-cyan-300 uppercase tracking-wider block">
                                    Industry Problem Statement
                                  </span>
                                  <p className="text-xs text-gray-200 leading-relaxed font-sans">
                                    {asg.problemStatement}
                                  </p>
                                </div>

                                {/* Deliverables Checklist */}
                                <div className="space-y-2">
                                  <span className="text-[11px] font-mono font-bold text-gray-300 uppercase tracking-wider block">
                                    Mandatory Engineering Deliverables:
                                  </span>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {asg.deliverables.map((item, dIdx) => (
                                      <div
                                        key={dIdx}
                                        className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5 text-xs text-gray-300"
                                      >
                                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Tech Requirements Chips */}
                                <div className="space-y-2">
                                  <span className="text-[11px] font-mono font-bold text-gray-300 uppercase tracking-wider block">
                                    Recommended Tech Stack &amp; Libraries:
                                  </span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {asg.techRequirements.map((tech, tIdx) => (
                                      <span
                                        key={tIdx}
                                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-200 text-[11px] font-mono"
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Submission Guidelines */}
                                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-gray-400 flex items-start gap-2">
                                  <FileCode className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                                  <span>
                                    <strong>Submission Guidance:</strong> {asg.submissionGuidelines}
                                  </span>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      )}
                    </div>

                    {/* SECTION 2: PRACTICUM SUBMISSION FORM (GITHUB, LIVE URL & ZIP FILE) */}
                    <div className="p-6 rounded-3xl bg-black/60 border border-cyan-500/20 space-y-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Upload className="w-4 h-4 text-cyan-400" />
                            <span>Submit Practicum Codebase &amp; .ZIP Archive</span>
                          </h4>
                          <p className="text-xs text-gray-400 mt-0.5">
                            Upload your project archive or provide cloud repository links for evaluation.
                          </p>
                        </div>
                        <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-1 rounded-lg border border-cyan-500/20">
                          Evaluator: Nejamul Haque
                        </span>
                      </div>

                      <form onSubmit={handleSubmitProject} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                              GitHub Repository URL *
                            </label>
                            <input
                              type="url"
                              placeholder="https://github.com/username/capstone-project"
                              value={githubRepo}
                              onChange={(e) => setGithubRepo(e.target.value)}
                              className="w-full bg-black/80 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                            />
                            {githubRepo && (
                              <a
                                href={githubRepo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1 mt-1 font-mono"
                              >
                                <span>Verify GitHub link</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                          </div>

                          <div>
                            <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                              Live Deployed URL (Vercel / Render / Netlify / Cloud) *
                            </label>
                            <input
                              type="url"
                              placeholder="https://my-domain-capstone.vercel.app"
                              value={liveUrl}
                              onChange={(e) => setLiveUrl(e.target.value)}
                              className="w-full bg-black/80 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                            />
                            {liveUrl && (
                              <a
                                href={liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1 mt-1 font-mono"
                              >
                                <span>Verify Live demo link</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Project ZIP Upload Box */}
                        <div className="p-4 rounded-2xl bg-[#090e1a] border border-cyan-500/20 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <label className="text-[11px] font-bold text-white flex items-center gap-1.5">
                              <FolderArchive className="w-4 h-4 text-cyan-400" />
                              <span>Attach Project .ZIP File (Source Code, Schemas, Datasets)</span>
                            </label>
                            <span className="text-[10px] font-mono text-gray-400">
                              Max 8MB direct upload (or use Cloud URL below)
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {/* File Upload Trigger */}
                            <div className="relative border border-dashed border-cyan-500/40 hover:border-cyan-400 rounded-xl p-3 bg-black/40 text-center transition-all">
                              <input
                                type="file"
                                accept=".zip,.tar.gz,.rar,.7z"
                                onChange={handleZipFileChange}
                                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                              />
                              <div className="flex flex-col items-center justify-center gap-1 pointer-events-none">
                                <Upload className="w-5 h-5 text-cyan-400" />
                                <span className="text-xs font-semibold text-gray-200">
                                  {projectZipFileName || "Click to browse .ZIP archive"}
                                </span>
                                <span className="text-[10px] text-gray-400 font-mono">
                                  {projectZipFileSize ? `${projectZipFileSize} • Attached` : ".zip, .tar.gz, .rar"}
                                </span>
                              </div>
                            </div>

                            {/* Cloud ZIP Link Option */}
                            <div>
                              <label className="text-[10px] font-mono text-gray-400 block mb-1">
                                Or paste Cloud / Drive / GitHub Release ZIP URL:
                              </label>
                              <input
                                type="url"
                                placeholder="https://drive.google.com/file/d/... or https://github.com/.../archive.zip"
                                value={projectZipUrl.startsWith("data:") ? "" : projectZipUrl}
                                onChange={(e) => {
                                  setProjectZipUrl(e.target.value);
                                  setProjectZipFileName("");
                                  setProjectZipFileSize("");
                                }}
                                className="w-full bg-black/80 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                              />
                              {projectZipUrl && projectZipUrl.startsWith("data:") && (
                                <p className="text-[10px] text-emerald-400 mt-1 font-mono flex items-center gap-1">
                                  <Check className="w-3 h-3" /> Base64 ZIP Archive Attached ({projectZipFileName || "project.zip"})
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Candidate Implementation & Architecture Notes */}
                        <div>
                          <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                            Practicum Architecture &amp; Milestone Implementation Notes
                          </label>
                          <textarea
                            rows={3}
                            placeholder="Describe how you solved Milestone 1, 2, and 3. Mention database schemas, state management, security considerations, and deployment details for reviewer Nejamul Haque..."
                            value={assignmentNotes}
                            onChange={(e) => setAssignmentNotes(e.target.value)}
                            className="w-full bg-black/80 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 resize-none font-sans"
                          />
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                          <button
                            type="submit"
                            disabled={submittingProject}
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center gap-2 cursor-pointer disabled:opacity-50"
                          >
                            {submittingProject ? (
                              <>
                                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Submitting to Nejamul Haque...</span>
                              </>
                            ) : (
                              <>
                                <Send className="w-3.5 h-3.5" />
                                <span>Submit 3 Assignments &amp; ZIP for AICTE Evaluation</span>
                              </>
                            )}
                          </button>

                          <span className="text-[11px] text-gray-400 font-mono">
                            Admin updates status within 12-24 hours
                          </span>
                        </div>
                      </form>
                    </div>

                    {/* SECTION 3: EMAIL BACKUP ARCHIVE CHANNEL */}
                    <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 space-y-3">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 shrink-0 mt-0.5">
                            <Archive className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white flex items-center gap-2 flex-wrap">
                              <span>Alternative: Email Large Project ZIP to Nejamul Haque</span>
                              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-500/30">
                                haquendsons@gmail.com
                              </span>
                            </h4>
                            <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                              If your project archive exceeds 25MB with local databases or heavy assets, email your ZIP file directly to Founder &amp; Lead Systems Engineer <strong>Nejamul Haque</strong>.
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <a
                            href={`mailto:haquendsons@gmail.com?subject=${encodeURIComponent(
                              `AICTE Practicum & ZIP Submission: ${fullName || "Student"} - ${domain} Track (${offerLetterData.id})`
                            )}&body=${encodeURIComponent(
                              `Hi Haque & Sons Evaluation Team / Nejamul Haque,\n\nI am attaching my AICTE Practicum & Capstone Project ZIP file for evaluation.\n\nSTUDENT DETAILS:\n- Candidate Name: ${fullName || "Student"}\n- Registered Email: ${session?.user?.email || ""}\n- College: ${college || "N/A"}\n- Domain Track: ${domain}\n- Track Mode: ${mode} Track\n- Offer Ref ID: ${offerLetterData.id}\n\nPROJECT SUBMISSION:\n- GitHub Repo: ${githubRepo || "N/A"}\n- Live Hosted Demo: ${liveUrl || "N/A"}\n- Practicum Notes: ${assignmentNotes || "N/A"}\n\n[ATTACH YOUR .ZIP ARCHIVE HERE]\n\nRegards,\n${fullName || "Student"}`
                            )}`}
                            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-md cursor-pointer whitespace-nowrap"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Email ZIP to haquendsons@gmail.com</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => {
                              const template = `To: haquendsons@gmail.com\nSubject: AICTE Practicum & ZIP Submission: ${fullName || "Student"} - ${domain} Track (${offerLetterData.id})\n\nHi Haque & Sons Evaluation Team / Nejamul Haque,\n\nI am attaching my AICTE Practicum & Capstone Project ZIP file for evaluation.\n\nSTUDENT DETAILS:\n- Candidate Name: ${fullName || "Student"}\n- Registered Email: ${session?.user?.email || ""}\n- College: ${college || "N/A"}\n- Domain Track: ${domain}\n- Track Mode: ${mode} Track\n- Offer Ref ID: ${offerLetterData.id}\n\nPROJECT SUBMISSION:\n- GitHub Repo: ${githubRepo || "N/A"}\n- Live Hosted Demo: ${liveUrl || "N/A"}\n- Practicum Notes: ${assignmentNotes || "N/A"}\n\n[Attach your .ZIP file]`;
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

                {/* SLIDE 4: VERIFIED CREDENTIALS, AICTE LOGBOOK & LOR SUITE */}
                {currentSlide === 4 && (
                  <div className="space-y-6">
                    {lorSubmitSuccess && (
                      <div className="p-4 rounded-2xl bg-amber-950/50 border border-amber-500/40 text-amber-200 text-xs flex items-center justify-between gap-2 shadow-lg">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-amber-400 shrink-0 fill-amber-400" />
                          <span>{lorSubmitSuccess}</span>
                        </div>
                        <button onClick={() => setLorSubmitSuccess(null)} className="text-amber-400 hover:text-white">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {/* AICTE ACTIVITY DIARY & WEEKLY LOGBOOK SUITE CARD */}
                    <SpotlightCard className="p-6 border-amber-500/40 bg-gradient-to-br from-amber-950/30 via-black to-cyan-950/30 shadow-[0_0_50px_rgba(245,158,11,0.15)]">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 via-yellow-500/20 to-amber-600/30 border border-amber-500/40 text-amber-300 flex items-center justify-center shrink-0 shadow-lg">
                            <BookOpen className="w-7 h-7 text-amber-400" />
                          </div>
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                                Official AICTE Internship Activity Diary &amp; Weekly Logbook
                              </h3>
                              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold">
                                +{aicteInfo.activityPoints} Activity Points Grant
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-bold">
                                {aicteInfo.credits} Academic Credits
                              </span>
                            </div>
                            <p className="text-xs text-gray-300 font-mono">
                              Code: <span className="text-amber-300 font-bold">{aicteInfo.aicteCode}</span> &bull; Total Logged: <span className="text-cyan-300 font-bold">{aicteInfo.totalHours} Clock Hours</span> &bull; {aicteInfo.nepLevel}
                            </p>
                            <p className="text-[11px] text-gray-400 leading-relaxed max-w-2xl">
                              Weekly sprint syllabus breakdowns, 5-Pillar Competency scorecard, and authorized mentor dual sign-off. Compliant under NEP 2020 &amp; NCrF for mandatory college submission.
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                          <button
                            onClick={handlePrintAicteDiary}
                            disabled={downloadingDiary}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-extrabold transition-all shadow-[0_0_25px_rgba(245,158,11,0.35)] flex items-center gap-2 cursor-pointer disabled:opacity-60"
                          >
                            {downloadingDiary ? (
                              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Download className="w-4 h-4" />
                            )}
                            <span>{downloadingDiary ? "Generating PDF..." : "Download A4 PDF Diary"}</span>
                          </button>
                          <button
                            onClick={() => setIsAicteDiaryOpen(true)}
                            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Preview Logbook</span>
                          </button>
                        </div>
                      </div>
                    </SpotlightCard>

                    {/* LOR STATUS & ACTION HERO CARD */}
                    {isLorApproved ? (
                      <SpotlightCard className="p-6 border-amber-500/40 bg-gradient-to-br from-amber-950/30 via-black to-slate-950/80 shadow-[0_0_50px_rgba(245,158,11,0.15)]">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start gap-3.5">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/30 border border-amber-500/40 text-amber-300 flex items-center justify-center shrink-0 shadow-lg">
                              <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                                  Official Letter of Recommendation (LOR) Issued
                                </h3>
                                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold">
                                  Verified by Nejamul Haque
                                </span>
                              </div>
                              <p className="text-xs text-gray-300 font-mono">
                                Ref: <span className="text-amber-300 font-bold">{lorData.id}</span> &bull; Grade: <span className="text-emerald-300 font-bold">{lorData.grade}</span>
                              </p>
                              <p className="text-[11px] text-gray-400 leading-relaxed">
                                Institutional letterhead endorsement with 5-Pillar Competency Appraisal Matrix & ISO 9001:2015 verification.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5 shrink-0">
                            <button
                              onClick={() => setIsLorModalOpen(true)}
                              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-extrabold transition-all shadow-[0_0_20px_rgba(245,158,11,0.35)] flex items-center gap-2 cursor-pointer"
                            >
                              <Download className="w-4 h-4" />
                              <span>Download LOR (PDF)</span>
                            </button>
                            <button
                              onClick={() => setIsLorModalOpen(true)}
                              className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </SpotlightCard>
                    ) : isLorPending ? (
                      <SpotlightCard className="p-6 border-amber-500/30 bg-amber-950/20">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start gap-3.5">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                              <Clock className="w-6 h-6 animate-pulse" />
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-base font-bold text-white">
                                  Letter of Recommendation (LOR) Under Review
                                </h3>
                                <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 text-[10px] font-mono font-semibold">
                                  Evaluation in Progress
                                </span>
                              </div>
                              <p className="text-xs text-gray-300 leading-relaxed">
                                Your application for an Executive Letter of Recommendation is undergoing technical review by <strong>Nejamul Haque</strong> based on your capstone codebase and sprint milestones.
                              </p>
                              {application?.lorRemarks && (
                                <p className="text-[11px] text-gray-400 italic">
                                  Candidate note: &ldquo;{application.lorRemarks}&rdquo;
                                </p>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() => setIsLorModalOpen(true)}
                            className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                          >
                            <Clock className="w-3.5 h-3.5" />
                            <span>Check Status</span>
                          </button>
                        </div>
                      </SpotlightCard>
                    ) : isLorRejected ? (
                      <SpotlightCard className="p-6 border-rose-500/30 bg-rose-950/20">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start gap-3.5">
                            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0">
                              <AlertCircle className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                              <h3 className="text-base font-bold text-white">
                                LOR Request Not Approved
                              </h3>
                              <p className="text-xs text-rose-300 leading-relaxed">
                                <strong>Feedback:</strong> {application?.lorRejectionReason || "Practicum deliverables require further code completion before endorsement."}
                              </p>
                              <p className="text-[11px] text-gray-400">
                                You can update your capstone repository and submit a re-application for review.
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => setIsApplyLorModalOpen(true)}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-600 hover:from-rose-400 hover:to-amber-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Re-Apply for LOR</span>
                          </button>
                        </div>
                      </SpotlightCard>
                    ) : (
                      <SpotlightCard className="p-6 border-amber-500/30 bg-gradient-to-r from-amber-950/20 via-black to-slate-900/60">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start gap-3.5">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                              <Star className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                              <h3 className="text-base font-bold text-white">
                                Apply for Executive Letter of Recommendation (LOR)
                              </h3>
                              <p className="text-xs text-gray-300 leading-relaxed">
                                Stand out with an institutional endorsement from <strong>Nejamul Haque (Founder & Lead Engineer)</strong> featuring MSME UDYAM registration and 5-Pillar Competency evaluation.
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => setIsApplyLorModalOpen(true)}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-extrabold transition-all shadow-lg flex items-center gap-2 cursor-pointer shrink-0"
                          >
                            <Star className="w-3.5 h-3.5 fill-slate-950" />
                            <span>Apply for Official LOR</span>
                          </button>
                        </div>
                      </SpotlightCard>
                    )}

                    {/* CERTIFICATE SECTION */}
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

                          <span className="text-emerald-300 font-mono text-xs font-bold">
                            Grade: {certificate.grade || "Distinction"}
                          </span>
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

                    <div className={`p-4 rounded-2xl border ${application?.projectStatus === "Approved" ? "bg-emerald-950/30 border-emerald-500/40" : application?.projectStatus === "Under Review" ? "bg-yellow-950/30 border-yellow-500/40" : githubRepo || application?.githubRepo ? "bg-cyan-950/30 border-cyan-500/40" : "bg-white/[0.02] border-white/10"}`}>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">02 Practicum</span>
                      <h4 className="text-xs font-bold text-white mt-1">AICTE 3 Milestones &amp; ZIP</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {application?.projectStatus === "Approved" ? "✓ Evaluated & Approved" : application?.projectStatus === "Under Review" ? "⏳ In Evaluation" : "3 assignments + ZIP upload."}
                      </p>
                    </div>

                    <div className={`p-4 rounded-2xl border ${isApproved ? "bg-emerald-950/30 border-emerald-500/40" : isPendingReview ? "bg-yellow-950/30 border-yellow-500/40" : "bg-purple-950/30 border-purple-500/40"}`}>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">03 Clearance</span>
                      <h4 className="text-xs font-bold text-white mt-1">Exit Form &amp; UPI Fee</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">Google form + fee to {UPI_ID}.</p>
                    </div>

                    <div className={`p-4 rounded-2xl border ${isApproved ? "bg-emerald-950/30 border-emerald-500/40" : "bg-white/[0.02] border-white/10"}`}>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isApproved ? "bg-emerald-500/20 text-emerald-300" : "bg-white/10 text-gray-500"}`}>04 Verified</span>
                      <h4 className="text-xs font-bold text-white mt-1">Verified Certificate</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">Cryptographic QR &amp; public ledger.</p>
                    </div>
                  </div>
                </div>

                {/* AICTE Practicum & Assignments Card in Overview */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0a0f1d] via-black to-[#071322] border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold">
                        AICTE NEP 2020 Practicum
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-mono font-bold">
                        3 Industry Milestones
                      </span>
                      <span className="text-[11px] text-gray-400 font-mono">
                        Track: <strong className="text-white">{currentDomainObj.name}</strong>
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <FolderArchive className="w-5 h-5 text-cyan-400 shrink-0" />
                      <span>Domain Practicum, Assignments &amp; Source Code .ZIP</span>
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Complete 3 structured domain assignments ({currentDomainObj.assignments?.map(a => `M${a.number}`).join(", ")}) and attach your project ZIP file for evaluation by <strong>Nejamul Haque</strong>.
                    </p>
                    {application?.projectStatus === "Approved" && (
                      <div className="text-xs text-emerald-300 font-mono pt-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Approved with <strong>{application.projectGrade || "Grade O"}</strong> • 4 NCrF Academic Credits</span>
                      </div>
                    )}
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setViewMode("slides");
                        goToSlide(2);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-2 cursor-pointer"
                    >
                      <Code2 className="w-4 h-4" />
                      <span>{application?.projectStatus === "Approved" ? "View Practicum Details" : "Open Practicum Studio (Slide 03)"}</span>
                    </button>
                  </div>
                </div>

                {/* AICTE Activity Logbook & Offer Letter Preview cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 rounded-3xl bg-gray-950/90 border border-amber-500/30 flex flex-col justify-between gap-4 shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-bold text-white flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-amber-400" />
                          <span>AICTE Activity Diary &amp; Logbook</span>
                        </h4>
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                          +{aicteInfo.activityPoints} Pts Grant
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        NEP 2020 &amp; NCrF compliant weekly practicum diary with competency rubric and dual sign-off.
                      </p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={handlePrintAicteDiary}
                        disabled={downloadingDiary}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                      >
                        {downloadingDiary ? (
                          <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Download className="w-3.5 h-3.5" />
                        )}
                        <span>A4 PDF</span>
                      </button>
                      <button
                        onClick={() => setIsAicteDiaryOpen(true)}
                        className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>View Diary</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl bg-gray-950/90 border border-white/10 flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-bold text-white flex items-center gap-2">
                          <FileText className="w-4 h-4 text-cyan-400" />
                          <span>Official Offer Letter &amp; Terms</span>
                        </h4>
                        {!isApplicationApproved && (
                          <span className="px-2 py-0.5 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-yellow-300 text-[10px] font-mono font-bold">
                            Pending Approval
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {isApplicationApproved
                          ? "Official 2-page appointment letter of intent."
                          : "Unlocks immediately once approved by the administrator."}
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={() => setIsOfferLetterOpen(true)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2 ${
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
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl p-2 sm:p-4 md:p-6 flex items-center justify-center overflow-hidden">
          <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-gray-950 border border-cyan-500/40 rounded-3xl shadow-[0_0_80px_rgba(6,182,212,0.25)] overflow-hidden">
            <div className="shrink-0 bg-gray-950/95 backdrop-blur-xl border-b border-white/10 px-5 sm:px-6 py-3.5 flex items-center justify-between gap-4 z-20 print:hidden">
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

            <div className="flex-1 overflow-y-auto p-3 sm:p-6 overscroll-contain">
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
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl p-2 sm:p-4 md:p-6 flex items-center justify-center overflow-hidden">
          <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-gray-950 border border-amber-500/40 rounded-3xl shadow-[0_0_80px_rgba(245,158,11,0.25)] overflow-hidden">
            <div className="shrink-0 bg-gray-950/95 backdrop-blur-xl border-b border-white/10 px-5 sm:px-6 py-3.5 flex items-center justify-between gap-4 z-20 print:hidden">
              <div className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full ${isLorApproved ? "bg-emerald-400" : "bg-amber-400"} animate-pulse`} />
                <div>
                  <span className="text-xs font-bold text-white block">
                    Official Executive Letter of Recommendation (LOR)
                  </span>
                  <span className="text-[10px] text-amber-400 font-mono">
                    {isLorApproved ? `Ref: ${lorData.id} • Signatory: Nejamul Haque` : `Status: ${isLorPending ? "Under Technical Review" : isLorRejected ? "Revision Required" : "Application Pending"}`}
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

            <div className="flex-1 overflow-y-auto p-3 sm:p-6 overscroll-contain">
              {isLorApproved ? (
                <LetterOfRecommendationRenderer
                  lorData={lorData}
                  showActions={true}
                />
              ) : isLorPending ? (
                <div className="p-8 sm:p-12 text-center space-y-6 max-w-xl mx-auto">
                  <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                    <Clock className="w-8 h-8 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-white">LOR Request Under Evaluation</h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Your request for an official Letter of Recommendation is being evaluated by Founder &amp; Lead Engineer <strong>Nejamul Haque</strong> based on your capstone codebase and sprint milestones.
                    </p>
                    {application?.lorRemarks && (
                      <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-left text-xs text-gray-300">
                        <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Your Submitted Note:</span>
                        <p className="italic">&ldquo;{application.lorRemarks}&rdquo;</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => setIsLorModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-xs font-semibold cursor-pointer"
                    >
                      Close Window
                    </button>
                    <button
                      onClick={refreshProfileData}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold shadow-md cursor-pointer"
                    >
                      Refresh Status
                    </button>
                  </div>
                </div>
              ) : isLorRejected ? (
                <div className="p-8 sm:p-12 text-center space-y-6 max-w-xl mx-auto">
                  <div className="w-16 h-16 rounded-3xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(244,63,94,0.2)]">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-white">LOR Request Not Approved</h3>
                    <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-xs text-rose-300 text-left">
                      <span className="text-[10px] uppercase font-bold text-rose-400 block mb-1">Feedback from Admin:</span>
                      <p>{application?.lorRejectionReason || "Practicum deliverables or repository contributions require further completion."}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setIsLorModalOpen(false);
                        setIsApplyLorModalOpen(true);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-600 hover:from-rose-400 hover:to-amber-500 text-white text-xs font-bold shadow-md cursor-pointer"
                    >
                      Re-Apply for LOR
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-8 sm:p-12 text-center space-y-6 max-w-xl mx-auto">
                  <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
                    <Star className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-white">Executive Recommendation Endorsement</h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Apply for an official Letter of Recommendation featuring institutional accreditation, 5-Pillar Competency scorecard, and authorized executive sign-off.
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setIsLorModalOpen(false);
                        setIsApplyLorModalOpen(true);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs font-bold shadow-md cursor-pointer"
                    >
                      Open LOR Application Form
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* AICTE ACTIVITY DIARY & WEEKLY LOGBOOK MODAL */}
      {isAicteDiaryOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl p-2 sm:p-4 md:p-6 flex items-center justify-center overflow-hidden">
          <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-gray-950 border border-amber-500/40 rounded-3xl shadow-[0_0_80px_rgba(245,158,11,0.25)] overflow-hidden">
            {/* Pinned Header */}
            <div className="shrink-0 bg-gray-950/95 backdrop-blur-xl border-b border-white/10 px-5 sm:px-6 py-3.5 flex items-center justify-between gap-4 z-20 print:hidden">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <div>
                  <span className="text-xs font-bold text-white block">
                    Official AICTE Internship Activity Diary &amp; Weekly Logbook
                  </span>
                  <span className="text-[10px] text-amber-400 font-mono">
                    {aicteInfo.aicteCode} &bull; +{aicteInfo.activityPoints} AICTE Activity Points &bull; {aicteInfo.credits} Credits ({aicteInfo.totalHours} Hours)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrintAicteDiary}
                  disabled={downloadingDiary}
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                >
                  {downloadingDiary ? (
                    <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Download className="w-3.5 h-3.5" />
                  )}
                  <span>{downloadingDiary ? "Exporting PDF..." : "Print / PDF (A4)"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsAicteDiaryOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold shadow-sm"
                >
                  <X className="w-4 h-4" />
                  <span>Close</span>
                </button>
              </div>
            </div>

            {/* AICTE Activity Diary Printable Document Container */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-6 overscroll-contain">
              <div
                id="aicte-diary-document"
                className="bg-white text-slate-900 p-6 sm:p-10 rounded-2xl shadow-2xl space-y-6 font-sans text-xs border border-slate-200"
              >
                {/* 1. Official Header & Institutional Accreditations */}
                <div className="border-b-2 border-slate-900 pb-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-950 text-white flex items-center justify-center font-extrabold text-xl tracking-wider shadow-md">
                        H&amp;S
                      </div>
                      <div>
                        <h1 className="text-lg sm:text-xl font-extrabold text-slate-950 tracking-tight uppercase">
                          Haque &amp; Sons Software R&amp;D Labs
                        </h1>
                        <p className="text-[11px] text-slate-600 font-semibold tracking-wide">
                          Directorate of Technical Practicum &amp; Advanced Engineering Apprenticeships
                        </p>
                      </div>
                    </div>

                    <div className="text-right sm:text-right space-y-0.5 font-mono text-[10px] text-slate-600">
                      <div>
                        MSME UDYAM: <strong className="text-slate-900">{aicteInfo.msmeUdyamId}</strong>
                      </div>
                      <div>
                        Accreditation: <strong className="text-slate-900">{aicteInfo.isoStandard}</strong>
                      </div>
                      <div>
                        Ref Code: <strong className="text-blue-900">{aicteInfo.aicteCode}</strong>
                      </div>
                    </div>
                  </div>

                  {/* AICTE NEP 2020 Accreditation Banner */}
                  <div className="bg-slate-100 border border-slate-300 rounded-lg px-3.5 py-2 text-center space-y-0.5">
                    <div className="text-[11px] font-extrabold text-slate-900 tracking-wider uppercase">
                      Official AICTE Internship Activity Logbook &amp; Weekly Practicum Diary
                    </div>
                    <div className="text-[10px] text-slate-600 font-medium">
                      Compliant with AICTE Internship Policy for Technical Institutions &bull; National Credit Framework (NCrF) under NEP 2020
                    </div>
                  </div>
                </div>

                {/* 2. Candidate & Practicum Meta Card */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Candidate Name:</span>
                    <strong className="text-slate-950 text-xs">{fullName || session?.user?.name || "Student Candidate"}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">College / University:</span>
                    <span className="text-slate-800 font-semibold truncate block">{college || "Affiliated Engineering Institution"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Degree &amp; Branch:</span>
                    <span className="text-slate-800 font-semibold">{degree} ({graduationYear})</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Practicum Track:</span>
                    <strong className="text-blue-900 font-semibold truncate block">{domain}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Practicum Mode:</span>
                    <span className="text-slate-800">{mode} Track ({duration})</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Logged Hours:</span>
                    <strong className="text-slate-950">{aicteInfo.totalHours} Clock Hours</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">AICTE Activity Points:</span>
                    <strong className="text-amber-700">+{aicteInfo.activityPoints} Activity Points</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Academic Credits:</span>
                    <strong className="text-emerald-700">{aicteInfo.credits} Credits ({aicteInfo.nepLevel.split(" ")[0]} Level)</strong>
                  </div>
                </div>

                {/* 3. Executive Practicum Overview */}
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold text-slate-950 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-1">
                    <span>1. Practicum Scope &amp; Industrial Alignment</span>
                  </h3>
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    The candidate has completed intensive hands-on engineering sprints under the direct supervision of senior industry mentors at Haque &amp; Sons. The practicum adhered to enterprise-grade software architecture, trunk-based Git workflows, automated testing pipelines, and production edge deployments aligned with the National Higher Education Qualifications Framework (NHEQF).
                  </p>
                </div>

                {/* 4. Weekly Activity Logbook Table */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-950 uppercase tracking-wider flex items-center justify-between border-b border-slate-200 pb-1">
                    <span>2. Sprint-by-Sprint Activity Diary &amp; Deliverables</span>
                    <span className="text-[10px] font-normal text-slate-500 font-mono">40 Hours / Week &bull; 100% Supervised</span>
                  </h3>

                  <div className="space-y-3">
                    {aicteActivityLog.map((log) => (
                      <div key={log.week} className="border border-slate-200 rounded-lg p-3 bg-slate-50/50 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-mono font-bold text-[10px]">
                              Week {log.week}
                            </span>
                            <h4 className="text-xs font-bold text-slate-950">{log.title}</h4>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-mono">
                            <span className="text-slate-600">Prescribed: <strong>{log.hours}h</strong></span>
                            <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                              ✓ Verified
                            </span>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-600 italic">
                          <strong>Sprint Focus:</strong> {log.focus}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 text-[10px]">
                          <div>
                            <span className="font-bold text-slate-700 block mb-1 uppercase tracking-wide">Key Technical Deliverables:</span>
                            <ul className="space-y-1 list-disc list-inside text-slate-600">
                              {log.deliverables.map((del, idx) => (
                                <li key={idx} className="leading-snug">{del}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <span className="font-bold text-slate-700 block mb-1 uppercase tracking-wide">AICTE Learning Outcomes:</span>
                            <ul className="space-y-1 list-disc list-inside text-slate-600">
                              {log.learningOutcomes.map((lo, idx) => (
                                <li key={idx} className="leading-snug">{lo}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. AICTE 5-Pillar Competency Appraisal Matrix */}
                <div className="space-y-2 pt-2">
                  <h3 className="text-xs font-bold text-slate-950 uppercase tracking-wider flex items-center justify-between border-b border-slate-200 pb-1">
                    <span>3. AICTE 5-Pillar Technical Competency Appraisal Matrix</span>
                    <span className="text-[10px] font-bold text-emerald-700">Cumulative Grade: Distinction (Top 1%)</span>
                  </h3>

                  <table className="w-full text-[10px] border-collapse border border-slate-200 text-left">
                    <thead>
                      <tr className="bg-slate-100 text-slate-800">
                        <th className="border border-slate-200 p-2 font-bold">Competency Pillar</th>
                        <th className="border border-slate-200 p-2 font-bold">Assessment Rubric &amp; Scope</th>
                        <th className="border border-slate-200 p-2 font-bold w-20 text-center">Score</th>
                        <th className="border border-slate-200 p-2 font-bold w-24 text-center">Evaluation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700">
                      <tr>
                        <td className="border border-slate-200 p-2 font-bold text-slate-900">1. Domain Engineering</td>
                        <td className="border border-slate-200 p-2">Architectural problem solving, modular implementation &amp; algorithmic logic</td>
                        <td className="border border-slate-200 p-2 text-center font-mono font-bold text-slate-900">98%</td>
                        <td className="border border-slate-200 p-2 text-center font-bold text-emerald-700">Distinction</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-200 p-2 font-bold text-slate-900">2. Code Quality &amp; Design</td>
                        <td className="border border-slate-200 p-2">Adherence to clean code, zero-trust security standards &amp; database optimization</td>
                        <td className="border border-slate-200 p-2 text-center font-mono font-bold text-slate-900">96%</td>
                        <td className="border border-slate-200 p-2 text-center font-bold text-emerald-700">Outstanding</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-200 p-2 font-bold text-slate-900">3. Toolchain &amp; Version Control</td>
                        <td className="border border-slate-200 p-2">Trunk-based git workflows, automated CI/CD pipelines &amp; cloud deployment</td>
                        <td className="border border-slate-200 p-2 text-center font-mono font-bold text-slate-900">99%</td>
                        <td className="border border-slate-200 p-2 text-center font-bold text-emerald-700">Exemplary</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-200 p-2 font-bold text-slate-900">4. Professional Documentation</td>
                        <td className="border border-slate-200 p-2">Technical README specs, architecture diagrams &amp; professional ethics</td>
                        <td className="border border-slate-200 p-2 text-center font-mono font-bold text-slate-900">95%</td>
                        <td className="border border-slate-200 p-2 text-center font-bold text-emerald-700">Professional</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-200 p-2 font-bold text-slate-900">5. Autonomy &amp; Production Readiness</td>
                        <td className="border border-slate-200 p-2">Initiative, fast debugging capability &amp; production-grade deliverables</td>
                        <td className="border border-slate-200 p-2 text-center font-mono font-bold text-slate-900">97%</td>
                        <td className="border border-slate-200 p-2 text-center font-bold text-emerald-700">Outstanding</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 6. Dual Endorsement & Sign-Off Section */}
                <div className="border-t-2 border-slate-900 pt-4 grid grid-cols-2 gap-8 text-[11px]">
                  {/* Student Signature Block */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Candidate Declaration &amp; Sign-Off:
                    </span>
                    <p className="text-[10px] text-slate-600 leading-snug">
                      I hereby certify that the sprint hours and engineering milestones logged in this diary represent my authentic practicum work.
                    </p>
                    <div className="pt-4 border-b border-dashed border-slate-400 pb-1">
                      <span className="font-serif italic text-slate-900 text-sm font-bold">
                        {fullName || session?.user?.name || "Student Intern"}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      Student Signature &bull; Date: {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </div>
                  </div>

                  {/* Industry Supervisor Sign-Off Block */}
                  <div className="space-y-2 text-right">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Industry Supervisor &amp; Mentor Sign-Off:
                    </span>
                    <p className="text-[10px] text-slate-600 leading-snug">
                      Verified and recommended for AICTE Activity Points ({aicteInfo.activityPoints} Pts) and NCrF Academic Credits ({aicteInfo.credits} Credits).
                    </p>
                    <div className="pt-4 border-b border-dashed border-slate-400 pb-1">
                      <span className="font-serif italic text-blue-950 text-base font-extrabold tracking-wide">
                        Nejamul Haque
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-700 font-semibold">
                      Founder &amp; Lead Systems Engineer, Haque &amp; Sons
                    </div>
                    <div className="text-[9px] text-slate-500 font-mono">
                      Seal: UDYAM-BR-0012948 &bull; ISO 9001:2015 Verified
                    </div>
                  </div>
                </div>

                {/* 7. AICTE Institutional Footnote */}
                <div className="bg-slate-100 border border-slate-200 rounded p-2.5 text-[9px] text-slate-600 text-center leading-relaxed">
                  <strong>INSTITUTIONAL DIRECTIVE:</strong> This activity logbook is an authorized academic credential pursuant to AICTE Internship Guidelines Clause 4.1-4.3 and the National Credit Framework (NCrF) under NEP 2020. University evaluation committees and HODs are requested to award prescribed activity points and facilitate academic credit transfer accordingly.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* APPLY FOR LOR MODAL */}
      {isApplyLorModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/85 backdrop-blur-xl p-3 sm:p-6 flex justify-center items-center">
          <div className="relative w-full max-w-lg bg-[#090d16] border border-amber-500/40 rounded-3xl shadow-[0_0_60px_rgba(245,158,11,0.25)] my-6 overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600" />

            <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Star className="w-5 h-5 fill-amber-400" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Apply for Letter of Recommendation (LOR)
                  </h3>
                  <p className="text-[10px] text-gray-400 font-mono">
                    Official Executive Endorsement by Nejamul Haque (Founder)
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsApplyLorModalOpen(false)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplyLor} className="p-5 sm:p-6 space-y-4 text-xs">
              {lorSubmitError && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-xs">
                  {lorSubmitError}
                </div>
              )}

              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-gray-400">Applicant:</span>
                  <span className="text-white font-bold">{fullName || session?.user?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">College:</span>
                  <span className="text-gray-200">{college}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Domain Track:</span>
                  <span className="text-cyan-300 font-semibold">{domain} ({duration})</span>
                </div>
                {githubRepo && (
                  <div className="flex justify-between pt-1 border-t border-white/5">
                    <span className="text-gray-400">Capstone Repo:</span>
                    <span className="text-cyan-400 font-mono text-[11px] truncate max-w-[200px]">{githubRepo}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">
                  Key Achievements &amp; Capstone Highlights (Optional)
                </label>
                <textarea
                  rows={3}
                  value={lorRemarksInput}
                  onChange={(e) => setLorRemarksInput(e.target.value)}
                  placeholder="Mention your key architectural contributions, features engineered, or specific target institutions/companies..."
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-400 resize-none text-xs"
                />
              </div>

              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-amber-300/90 text-[11px] leading-relaxed">
                Your submission will be queued for technical review. Once approved, your verifiable A4 PDF will unlock with an official institutional reference number.
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsApplyLorModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmittingLor}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold transition-all shadow-lg flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Star className="w-3.5 h-3.5 fill-slate-950" />
                  <span>{isSubmittingLor ? "Submitting Application..." : "Submit LOR Application"}</span>
                </button>
              </div>
            </form>
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
                    Degree &amp; Branch *
                  </label>
                  <input
                    type="text"
                    required
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="B.Tech Computer Science & Engineering"
                    className="w-full bg-black/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-400 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Graduation Year *
                  </label>
                  <select
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                    className="w-full bg-black/80 border border-white/15 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-400 font-medium cursor-pointer"
                  >
                    {GRADUATION_YEARS.map((yr) => (
                      <option key={yr} value={yr} className="bg-gray-950 text-white">
                        Batch {yr}
                      </option>
                    ))}
                  </select>
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
