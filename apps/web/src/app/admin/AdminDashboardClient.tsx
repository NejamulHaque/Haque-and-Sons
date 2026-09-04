"use client";

import { useState, useMemo } from "react";
import {
  Users,
  Globe,
  Activity,
  Cpu,
  Database,
  ShieldCheck,
  TrendingUp,
  Search,
  Terminal,
  Zap,
  Coins,
  Server,
  Sparkles,
  CheckCircle2,
  Radio,
  ArrowUpRight,
  GraduationCap,
  Award,
  Plus,
  ExternalLink,
  X,
  Clock,
  Mail,
  CreditCard,
  Eye,
  Trash2,
  Edit3,
  Download,
  Send,
  FileText,
  IndianRupee,
  AlertCircle,
  FolderArchive,
  RefreshCw,
  Code2,
} from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import { CURRENCIES, type CurrencyCode } from "@/components/ProjectCalculator";
import { INTERNSHIP_DOMAINS } from "@/lib/domains";
import Link from "next/link";

export interface VisitorLog {
  id: number;
  ip: string | null;
  userAgent: string | null;
  path: string | null;
  country: string | null;
  city: string | null;
  createdAt: Date | string;
}

export interface CountryStat {
  country: string | null;
  count: number | string;
}

export interface InternshipAppRow {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  degree: string;
  graduationYear: string;
  domain: string;
  mode: string;
  internshipType: string;
  duration: string;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  portfolioUrl?: string | null;
  resumeLink?: string | null;
  statement?: string | null;
  status: string;
  githubRepo?: string | null;
  liveUrl?: string | null;
  googleFormSubmitted?: boolean | null;
  feedbackRating?: string | null;
  feedbackText?: string | null;
  paymentScreenshot?: string | null;
  paymentUtr?: string | null;
  paymentStatus?: string | null;
  certificateId?: string | null;
  createdAt: Date | string;
}

export interface CertificateRow {
  id: string;
  studentName: string;
  studentEmail: string;
  domain: string;
  mode: string;
  internshipType: string;
  college: string;
  duration: string;
  grade: string;
  issueDate: Date | string;
  signatoryTitle: string;
  status: string;
  createdAt: Date | string;
}

export interface EcosystemProject {
  name: string;
  description: string;
  url: string;
  githubUrl?: string;
  tech: string[];
  status: "Live" | "Beta" | "Active";
  category: string;
  valuationUSD: number;
}

const PROJECTS: EcosystemProject[] = [
  {
    name: "Haque & Sons",
    description: "Next-Gen Software Studio Portfolio with 3D interactions, Command Palette, and Estimator.",
    url: "https://haqueandsons.vercel.app",
    githubUrl: "https://github.com/NejamulHaque/Haque-and-Sons",
    tech: ["Next.js 16", "Three.js", "Better Auth", "Neon DB", "Tailwind"],
    status: "Live",
    category: "Studio OS",
    valuationUSD: 4500,
  },
  {
    name: "Irus AI",
    description: "Personal AI Command Center with multi-model orchestrator and vector long-term memory.",
    url: "https://irus-ai.onrender.com",
    githubUrl: "https://github.com/NejamulHaque/irus-ai",
    tech: ["LangChain", "Pinecone", "FastAPI", "React 19", "OAuth"],
    status: "Live",
    category: "AI & Agents",
    valuationUSD: 8500,
  },
  {
    name: "CollabSheets",
    description: "Real-time collaborative code editor with AI pair-programming and Monaco engine.",
    url: "https://collabsheets.onrender.com",
    githubUrl: "https://github.com/NejamulHaque/CollabSheets",
    tech: ["WebSockets", "OT Algorithm", "Node.js", "Monaco Editor"],
    status: "Live",
    category: "Real-time DevTools",
    valuationUSD: 6000,
  },
  {
    name: "Nestfy",
    description: "AI-powered personal finance intelligence tracker with receipt OCR & analytics.",
    url: "https://nestfy-beta.vercel.app",
    githubUrl: "https://github.com/NejamulHaque/nestfy",
    tech: ["Next.js", "TensorFlow.js", "Drizzle ORM", "Chart.js"],
    status: "Beta",
    category: "Fintech AI",
    valuationUSD: 5200,
  },
  {
    name: "Digital Lens",
    description: "Global AI news intelligence platform with sentiment parsing & live edge ingestion.",
    url: "https://digital-lens.vercel.app",
    githubUrl: "https://github.com/NejamulHaque/digital-lens",
    tech: ["NLP", "Edge Runtime", "Neon Postgres", "Tailwind"],
    status: "Live",
    category: "Intelligence",
    valuationUSD: 4800,
  },
  {
    name: "ProResume",
    description: "ATS-friendly intelligent resume builder with real-time score optimization.",
    url: "https://proresume-six.vercel.app",
    githubUrl: "https://github.com/NejamulHaque/ProResume",
    tech: ["React Hook Form", "PDF Kit", "Tailwind", "LLM Auditing"],
    status: "Live",
    category: "Productivity",
    valuationUSD: 3900,
  },
];

interface AdminDashboardClientProps {
  initialTotal: number;
  initialRecent: VisitorLog[];
  initialCountries: CountryStat[];
  initialApplications?: InternshipAppRow[];
  initialCertificates?: CertificateRow[];
}

export function AdminDashboardClient({
  initialTotal,
  initialRecent,
  initialCountries,
  initialApplications = [],
  initialCertificates = [],
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "visitors" | "internships" | "ecosystem" | "system"
  >("internships");
  const [currency, setCurrency] = useState<CurrencyCode>("INR");
  const [totalVisitors, setTotalVisitors] = useState(initialTotal);
  const [recentVisits, setRecentVisits] = useState<VisitorLog[]>(initialRecent);
  const [applications, setApplications] = useState<InternshipAppRow[]>(initialApplications);
  const [certificates, setCertificates] = useState<CertificateRow[]>(initialCertificates);

  // Search and multi-filters
  const [searchQuery, setSearchQuery] = useState("");
  const [appSearchQuery, setAppSearchQuery] = useState("");
  const [appStatusFilter, setAppStatusFilter] = useState("All");
  const [appDomainFilter, setAppDomainFilter] = useState("All");
  const [appModeFilter, setAppModeFilter] = useState("All");
  const [appPaymentFilter, setAppPaymentFilter] = useState("All");

  const [pingStatus, setPingStatus] = useState<string | null>(null);
  const [isPinging, setIsPinging] = useState(false);

  // Modals & Action States
  const [viewDetailApp, setViewDetailApp] = useState<InternshipAppRow | null>(null);
  const [editingApp, setEditingApp] = useState<InternshipAppRow | null>(null);
  const [isUpdatingApp, setIsUpdatingApp] = useState(false);
  const [deletingAppId, setDeletingAppId] = useState<number | null>(null);
  const [deletingCertId, setDeletingCertId] = useState<string | null>(null);

  // Custom Email Modal state
  const [emailingApp, setEmailingApp] = useState<InternshipAppRow | null>(null);
  const [customEmailSubject, setCustomEmailSubject] = useState("");
  const [customEmailMessage, setCustomEmailMessage] = useState("");
  const [isSendingCustomEmail, setIsSendingCustomEmail] = useState(false);

  // Issue Certificate Modal state
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [certStudentName, setCertStudentName] = useState("");
  const [certStudentEmail, setCertStudentEmail] = useState("");
  const [certDomain, setCertDomain] = useState("Full-Stack Web Development");
  const [certMode, setCertMode] = useState("Online");
  const [certType, setCertType] = useState("Free");
  const [certCollege, setCertCollege] = useState("Engineering College");
  const [certDuration, setCertDuration] = useState("4 Weeks");
  const [certGrade, setCertGrade] = useState("Distinction");
  const [certAppId, setCertAppId] = useState<number | null>(null);
  const [isIssuingCert, setIsIssuingCert] = useState(false);
  const [certSuccessUrl, setCertSuccessUrl] = useState<string | null>(null);

  // Send Offer Letter state
  const [sendingOfferEmailId, setSendingOfferEmailId] = useState<number | null>(null);
  const [offerSentToast, setOfferSentToast] = useState<string | null>(null);

  // Payment Verification & Screenshot Modal state
  const [viewScreenshotApp, setViewScreenshotApp] = useState<InternshipAppRow | null>(null);
  const [approvingPaymentId, setApprovingPaymentId] = useState<number | null>(null);

  const activeCurrency = CURRENCIES[currency];

  const formatCurrency = (usdAmount: number) => {
    return activeCurrency.format(usdAmount);
  };

  const totalPortfolioValuationUSD = useMemo(() => {
    return PROJECTS.reduce((acc, p) => acc + p.valuationUSD, 0);
  }, []);

  // Financial Revenue Calculations (INR)
  const financialStats = useMemo(() => {
    const getPrice = (mode: string) => {
      if (mode === "Offline") return 249;
      if (mode === "Hybrid") return 199;
      return 99;
    };

    let collectedINR = 0;
    let pipelineINR = 0;
    let onlineCount = 0;
    let hybridCount = 0;
    let offlineCount = 0;

    applications.forEach((app) => {
      const p = getPrice(app.mode);
      if (app.mode === "Offline") offlineCount++;
      else if (app.mode === "Hybrid") hybridCount++;
      else onlineCount++;

      if (app.paymentStatus === "Approved") {
        collectedINR += p;
      } else if (app.paymentStatus === "Pending Approval") {
        pipelineINR += p;
      }
    });

    return {
      collectedINR,
      pipelineINR,
      onlineCount,
      hybridCount,
      offlineCount,
    };
  }, [applications]);

  const handleSimulateTrack = async () => {
    setIsPinging(true);
    setPingStatus("Sending beacon to /api/track...");
    try {
      const res = await fetch("/api/track");
      if (res.ok) {
        setTotalVisitors((prev) => prev + 1);
        const newLog: VisitorLog = {
          id: Date.now(),
          ip: "127.0.0.1 (Local Ping)",
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "Chrome / Edge Browser",
          path: "/admin",
          country: "India",
          city: "New Delhi",
          createdAt: new Date().toISOString(),
        };
        setRecentVisits((prev) => [newLog, ...prev.slice(0, 19)]);
        setPingStatus("Beacon recorded successfully! Visitor count updated.");
      } else {
        setPingStatus("Beacon returned non-200 response.");
      }
    } catch {
      setPingStatus("Failed to send tracking beacon.");
    } finally {
      setIsPinging(false);
      setTimeout(() => setPingStatus(null), 4000);
    }
  };

  const handleSendOfferLetter = async (app: InternshipAppRow) => {
    setSendingOfferEmailId(app.id);
    setOfferSentToast(null);
    try {
      const res = await fetch("/api/internships/send-offer-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: app.email,
          studentName: app.fullName,
          college: app.college,
          degree: app.degree,
          domain: app.domain,
          mode: app.mode,
          duration: app.duration,
          internshipType: app.internshipType,
          offerId: `HS-OFFER-2026-${app.id}`,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setOfferSentToast(`✓ Official Offer Letter dispatched to ${app.email}!`);
        setTimeout(() => setOfferSentToast(null), 6000);
      } else {
        alert(data.error || "Failed to dispatch offer letter email.");
      }
    } catch {
      alert("Network error while sending offer letter.");
    } finally {
      setSendingOfferEmailId(null);
    }
  };

  const handleApprovePayment = async (app: InternshipAppRow) => {
    setApprovingPaymentId(app.id);
    try {
      const res = await fetch("/api/admin/approve-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId: app.id, action: "approve" }),
      });
      const data = await res.json();
      if (res.ok) {
        setOfferSentToast(`✓ Payment approved & certificate ${data.certificate?.id} issued to ${app.fullName}!`);
        setTimeout(() => setOfferSentToast(null), 7000);
        setApplications((prev) =>
          prev.map((a) =>
            a.id === app.id
              ? {
                  ...a,
                  paymentStatus: "Approved",
                  status: "Completed",
                  certificateId: data.certificate?.id,
                }
              : a
          )
        );
        if (data.certificate) {
          setCertificates((prev) => [data.certificate, ...prev]);
        }
      } else {
        alert(data.error || "Failed to approve payment.");
      }
    } catch {
      alert("Network error approving payment.");
    } finally {
      setApprovingPaymentId(null);
    }
  };

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch("/api/internships/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
        );
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const handleSaveEditApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApp) return;
    setIsUpdatingApp(true);
    try {
      const res = await fetch("/api/admin/update-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingApp),
      });
      const data = await res.json();
      if (res.ok && data.application) {
        setApplications((prev) =>
          prev.map((a) => (a.id === editingApp.id ? data.application : a))
        );
        if (viewDetailApp?.id === editingApp.id) {
          setViewDetailApp(data.application);
        }
        setEditingApp(null);
        setOfferSentToast(`✓ Student record #${editingApp.id} updated successfully!`);
        setTimeout(() => setOfferSentToast(null), 5000);
      } else {
        alert(data.error || "Failed to update record.");
      }
    } catch (err) {
      console.error("Save edit error:", err);
      alert("Network error updating application.");
    } finally {
      setIsUpdatingApp(false);
    }
  };

  const handleDeleteApp = async (id: number) => {
    if (!confirm(`Are you sure you want to permanently delete application #${id}? This action cannot be undone.`)) {
      return;
    }
    setDeletingAppId(id);
    try {
      const res = await fetch("/api/admin/delete-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (res.ok) {
        setApplications((prev) => prev.filter((a) => a.id !== id));
        if (viewDetailApp?.id === id) setViewDetailApp(null);
        setOfferSentToast(`✓ Application #${id} deleted from database.`);
        setTimeout(() => setOfferSentToast(null), 5000);
      } else {
        alert(data.error || "Failed to delete application.");
      }
    } catch (err) {
      console.error("Delete app error:", err);
      alert("Network error deleting application.");
    } finally {
      setDeletingAppId(null);
    }
  };

  const handleDeleteCert = async (id: string) => {
    if (!confirm(`Are you sure you want to revoke/delete Certificate ${id}? This credential will no longer be verifiable.`)) {
      return;
    }
    setDeletingCertId(id);
    try {
      const res = await fetch("/api/admin/delete-certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (res.ok) {
        setCertificates((prev) => prev.filter((c) => c.id !== id));
        setOfferSentToast(`✓ Certificate ${id} has been revoked.`);
        setTimeout(() => setOfferSentToast(null), 5000);
      } else {
        alert(data.error || "Failed to delete certificate.");
      }
    } catch (err) {
      console.error("Delete cert error:", err);
      alert("Network error deleting certificate.");
    } finally {
      setDeletingCertId(null);
    }
  };

  const handleSendCustomEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailingApp || !customEmailSubject.trim() || !customEmailMessage.trim()) return;
    setIsSendingCustomEmail(true);
    try {
      const res = await fetch("/api/admin/send-custom-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: emailingApp.email,
          subject: customEmailSubject,
          message: customEmailMessage,
          studentName: emailingApp.fullName,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setEmailingApp(null);
        setCustomEmailSubject("");
        setCustomEmailMessage("");
        setOfferSentToast(`✓ Custom message sent to ${emailingApp.email}!`);
        setTimeout(() => setOfferSentToast(null), 5000);
      } else {
        alert(data.error || "Failed to send email.");
      }
    } catch (err) {
      console.error("Send custom email error:", err);
      alert("Network error sending email.");
    } finally {
      setIsSendingCustomEmail(false);
    }
  };

  const handleExportCSV = () => {
    if (filteredApplications.length === 0) {
      alert("No applications to export.");
      return;
    }
    const headers = [
      "ID",
      "Full Name",
      "Email",
      "Phone",
      "College",
      "Degree",
      "Graduation Year",
      "Domain",
      "Mode",
      "Internship Type",
      "Duration",
      "Status",
      "Payment Status",
      "Payment UTR",
      "Feedback Rating",
      "Feedback Text",
      "GitHub Profile",
      "LinkedIn",
      "Portfolio",
      "Resume Link",
      "GitHub Repo",
      "Live URL",
      "Certificate ID",
      "Created At",
    ];

    const rows = filteredApplications.map((app) => [
      app.id,
      `"${(app.fullName || "").replace(/"/g, '""')}"`,
      `"${(app.email || "").replace(/"/g, '""')}"`,
      `"${(app.phone || "").replace(/"/g, '""')}"`,
      `"${(app.college || "").replace(/"/g, '""')}"`,
      `"${(app.degree || "").replace(/"/g, '""')}"`,
      `"${(app.graduationYear || "").replace(/"/g, '""')}"`,
      `"${(app.domain || "").replace(/"/g, '""')}"`,
      `"${(app.mode || "").replace(/"/g, '""')}"`,
      `"${(app.internshipType || "").replace(/"/g, '""')}"`,
      `"${(app.duration || "").replace(/"/g, '""')}"`,
      `"${(app.status || "").replace(/"/g, '""')}"`,
      `"${(app.paymentStatus || "").replace(/"/g, '""')}"`,
      `"${(app.paymentUtr || "").replace(/"/g, '""')}"`,
      `"${(app.feedbackRating || "").replace(/"/g, '""')}"`,
      `"${(app.feedbackText || "").replace(/"/g, '""')}"`,
      `"${(app.githubUrl || "").replace(/"/g, '""')}"`,
      `"${(app.linkedinUrl || "").replace(/"/g, '""')}"`,
      `"${(app.portfolioUrl || "").replace(/"/g, '""')}"`,
      `"${(app.resumeLink || "").replace(/"/g, '""')}"`,
      `"${(app.githubRepo || "").replace(/"/g, '""')}"`,
      `"${(app.liveUrl || "").replace(/"/g, '""')}"`,
      `"${(app.certificateId || "").replace(/"/g, '""')}"`,
      `"${new Date(app.createdAt).toISOString()}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `haque_and_sons_interns_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openIssueCertForApp = (app: InternshipAppRow) => {
    setCertStudentName(app.fullName);
    setCertStudentEmail(app.email);
    setCertDomain(app.domain);
    setCertMode(app.mode);
    setCertType(app.internshipType);
    setCertCollege(app.college);
    setCertDuration(app.duration);
    setCertAppId(app.id);
    setCertSuccessUrl(null);
    setIsCertModalOpen(true);
  };

  const handleIssueCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsIssuingCert(true);
    try {
      const res = await fetch("/api/certificates/issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: certStudentName,
          studentEmail: certStudentEmail,
          domain: certDomain,
          mode: certMode,
          internshipType: certType,
          college: certCollege,
          duration: certDuration,
          grade: certGrade,
          applicationId: certAppId,
        }),
      });

      const data = await res.json();
      if (res.ok && data.certificate) {
        setCertificates((prev) => [data.certificate, ...prev]);
        setCertSuccessUrl(data.verificationUrl);
        if (certAppId) {
          setApplications((prev) =>
            prev.map((a) => (a.id === certAppId ? { ...a, status: "Completed" } : a))
          );
        }
      } else {
        alert(data.error || "Failed to issue certificate");
      }
    } catch (err) {
      console.error("Issue cert error:", err);
      alert("Failed to issue certificate");
    } finally {
      setIsIssuingCert(false);
    }
  };

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      if (appStatusFilter !== "All" && app.status !== appStatusFilter) return false;
      if (appDomainFilter !== "All" && app.domain !== appDomainFilter) return false;
      if (appModeFilter !== "All" && app.mode !== appModeFilter) return false;
      if (appPaymentFilter !== "All") {
        if (appPaymentFilter === "Approved" && app.paymentStatus !== "Approved") return false;
        if (appPaymentFilter === "Pending Approval" && app.paymentStatus !== "Pending Approval") return false;
        if (appPaymentFilter === "Unpaid" && (app.paymentStatus === "Approved" || app.paymentStatus === "Pending Approval")) return false;
      }
      if (appSearchQuery.trim()) {
        const q = appSearchQuery.toLowerCase();
        const matchName = (app.fullName || "").toLowerCase().includes(q);
        const matchEmail = (app.email || "").toLowerCase().includes(q);
        const matchCollege = (app.college || "").toLowerCase().includes(q);
        const matchDomain = (app.domain || "").toLowerCase().includes(q);
        const matchPhone = (app.phone || "").toLowerCase().includes(q);
        const matchUtr = (app.paymentUtr || "").toLowerCase().includes(q);
        const matchCert = (app.certificateId || "").toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchCollege && !matchDomain && !matchPhone && !matchUtr && !matchCert) {
          return false;
        }
      }
      return true;
    });
  }, [applications, appStatusFilter, appDomainFilter, appModeFilter, appPaymentFilter, appSearchQuery]);

  const filteredLogs = useMemo(() => {
    if (!searchQuery.trim()) return recentVisits;
    const q = searchQuery.toLowerCase();
    return recentVisits.filter(
      (log) =>
        (log.ip && log.ip.toLowerCase().includes(q)) ||
        (log.country && log.country.toLowerCase().includes(q)) ||
        (log.path && log.path.toLowerCase().includes(q)) ||
        (log.userAgent && log.userAgent.toLowerCase().includes(q))
    );
  }, [recentVisits, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Top OS Navigation Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gray-950/80 border border-white/10 p-2.5 rounded-2xl backdrop-blur-xl">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveTab("internships")}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === "internships"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Internships Command OS ({applications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === "overview"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Studio Telemetry</span>
          </button>

          <button
            onClick={() => setActiveTab("visitors")}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === "visitors"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Visitor Intelligence ({recentVisits.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("ecosystem")}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === "ecosystem"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Project Ecosystem ({PROJECTS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("system")}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === "system"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>DevSecOps & Health</span>
          </button>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center gap-1.5 self-end lg:self-center bg-black/60 border border-white/10 p-1 rounded-xl">
          <span className="text-[11px] text-gray-400 px-2 font-medium flex items-center gap-1">
            <Coins className="w-3 h-3 text-yellow-400" />
            Currency:
          </span>
          {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
            const isSelected = currency === code;
            return (
              <button
                key={code}
                onClick={() => setCurrency(code)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-cyan-500 text-black shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {code}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB: INTERNSHIPS & CERTIFICATES */}
      {activeTab === "internships" && (
        <div className="space-y-8">
          {/* Top Metric Cards with Financial Revenue KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Revenue Collected */}
            <SpotlightCard className="p-6 border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <IndianRupee className="w-3.5 h-3.5" /> Verified Revenue
                  </p>
                  <h3 className="text-3xl font-extrabold text-emerald-300 mt-1">
                    ₹{financialStats.collectedINR.toLocaleString()}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> From approved UPI verify
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <IndianRupee className="w-6 h-6" />
                </div>
              </div>
            </SpotlightCard>

            {/* Pipeline / Pending Revenue */}
            <SpotlightCard className="p-6 border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-yellow-400 uppercase tracking-wider flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Pipeline Revenue
                  </p>
                  <h3 className="text-3xl font-extrabold text-yellow-300 mt-1">
                    ₹{financialStats.pipelineINR.toLocaleString()}
                  </h3>
                  <p className="text-[11px] text-yellow-400/80 mt-2 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" /> {applications.filter((a) => a.paymentStatus === "Pending Approval").length} payments to verify
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
                  <Clock className="w-6 h-6" />
                </div>
              </div>
            </SpotlightCard>

            {/* Total Applications & Mode Breakdown */}
            <SpotlightCard className="p-6 border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Enrolled Interns
                  </p>
                  <h3 className="text-3xl font-extrabold text-white mt-1">
                    {applications.length}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-400 font-mono">
                    <span className="text-cyan-400">Online: {financialStats.onlineCount} (₹99)</span>
                    <span className="text-purple-400">Hyb: {financialStats.hybridCount} (₹199)</span>
                    <span className="text-emerald-400">Off: {financialStats.offlineCount} (₹249)</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
              </div>
            </SpotlightCard>

            {/* Issued Credentials */}
            <SpotlightCard className="p-6 border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Certificates Issued
                  </p>
                  <h3 className="text-3xl font-extrabold text-purple-300 mt-1">
                    {certificates.length}
                  </h3>
                  <p className="text-xs text-purple-400 mt-2 flex items-center gap-1 font-medium">
                    <Award className="w-3.5 h-3.5" /> Verifiable on Ledger
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <Award className="w-6 h-6" />
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Applications Management Section */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>Internship Applications Command OS</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
                    {filteredApplications.length} showing
                  </span>
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Review applicant profiles, inspect submitted project ZIPs, edit student records, send custom emails, and issue verified credentials.
                </p>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  onClick={handleExportCSV}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Export currently filtered applications to CSV"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={() => {
                    setCertStudentName("");
                    setCertStudentEmail("");
                    setCertAppId(null);
                    setCertSuccessUrl(null);
                    setIsCertModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Issue Direct Certificate</span>
                </button>
              </div>
            </div>

            {/* Filter controls & Deep Search */}
            <div className="bg-black/60 border border-white/10 rounded-2xl p-4 space-y-3">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={appSearchQuery}
                    onChange={(e) => setAppSearchQuery(e.target.value)}
                    placeholder="Search by name, email, phone, college, domain, UTR, cert ID..."
                    className="w-full bg-black/80 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all font-mono"
                  />
                  {appSearchQuery && (
                    <button
                      onClick={() => setAppSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Multi-dropdown filters row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                {/* Domain Filter */}
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">
                    Domain Track:
                  </label>
                  <select
                    value={appDomainFilter}
                    onChange={(e) => setAppDomainFilter(e.target.value)}
                    className="w-full bg-gray-900 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="All">All Domains ({applications.length})</option>
                    {INTERNSHIP_DOMAINS.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mode Filter */}
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">
                    Track Mode:
                  </label>
                  <select
                    value={appModeFilter}
                    onChange={(e) => setAppModeFilter(e.target.value)}
                    className="w-full bg-gray-900 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="All">All Modes</option>
                    <option value="Online">Online Track (₹99)</option>
                    <option value="Hybrid">Hybrid Mentorship (₹199)</option>
                    <option value="Offline">Offline Studio (₹249)</option>
                  </select>
                </div>

                {/* Payment Filter */}
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">
                    Payment Status:
                  </label>
                  <select
                    value={appPaymentFilter}
                    onChange={(e) => setAppPaymentFilter(e.target.value)}
                    className="w-full bg-gray-900 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="All">All Payments</option>
                    <option value="Pending Approval">Pending Approval (Action Req.)</option>
                    <option value="Approved">Paid & Verified</option>
                    <option value="Unpaid">Unpaid / In Progress</option>
                  </select>
                </div>

                {/* Application Lifecycle Status */}
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">
                    Application Status:
                  </label>
                  <select
                    value={appStatusFilter}
                    onChange={(e) => setAppStatusFilter(e.target.value)}
                    className="w-full bg-gray-900 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Payment Review">Payment Review</option>
                    <option value="Completed">Completed</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {(appSearchQuery || appDomainFilter !== "All" || appModeFilter !== "All" || appPaymentFilter !== "All" || appStatusFilter !== "All") && (
                <div className="pt-2 flex items-center justify-between border-t border-white/5 text-xs">
                  <span className="text-gray-400">
                    Showing <strong className="text-cyan-300">{filteredApplications.length}</strong> of {applications.length} interns
                  </span>
                  <button
                    onClick={() => {
                      setAppSearchQuery("");
                      setAppDomainFilter("All");
                      setAppModeFilter("All");
                      setAppPaymentFilter("All");
                      setAppStatusFilter("All");
                    }}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              )}
            </div>

            {offerSentToast && (
              <div className="p-3.5 rounded-xl bg-purple-950/70 border border-purple-500/40 text-purple-200 text-xs flex items-center gap-2 shadow-lg">
                <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{offerSentToast}</span>
              </div>
            )}

            {/* Applications Table */}
            <div className="bg-gray-900/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-300">
                  <thead className="bg-white/[0.04] text-gray-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                    <tr>
                      <th className="px-4 py-3.5 font-semibold">Applicant</th>
                      <th className="px-4 py-3.5 font-semibold">College & Branch</th>
                      <th className="px-4 py-3.5 font-semibold">Domain Track</th>
                      <th className="px-4 py-3.5 font-semibold">Mode & Fee</th>
                      <th className="px-4 py-3.5 font-semibold">Payment & Review</th>
                      <th className="px-4 py-3.5 font-semibold">Lifecycle</th>
                      <th className="px-4 py-3.5 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredApplications.length > 0 ? (
                      filteredApplications.map((app) => (
                        <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => setViewDetailApp(app)}
                                className="font-bold text-white hover:text-cyan-400 transition-colors text-left block cursor-pointer"
                              >
                                {app.fullName}
                              </button>
                              <span className="text-[10px] text-gray-500 font-mono">#{app.id}</span>
                            </div>
                            <span className="text-[11px] text-cyan-400 font-mono block">{app.email}</span>
                            <span className="text-[10px] text-gray-500 block">{app.phone}</span>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="text-gray-200 font-medium block">{app.college}</span>
                            <span className="text-[11px] text-gray-400 block">
                              {app.degree} ({app.graduationYear})
                            </span>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 font-semibold inline-block">
                              {app.domain}
                            </span>
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-gray-300 font-medium">
                                {app.mode} • {app.duration}
                              </span>
                              <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] font-mono font-bold">
                                ₹{app.mode === "Offline" ? 249 : app.mode === "Hybrid" ? 199 : 99}
                              </span>
                            </div>
                            <span className="text-[10px] text-cyan-400/80 block mt-0.5">{app.internshipType}</span>
                          </td>

                          {/* Payment Column */}
                          <td className="px-4 py-3.5">
                            {app.paymentStatus === "Pending Approval" ? (
                              <div className="space-y-1">
                                <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 text-[10px] font-bold font-mono inline-flex items-center gap-1">
                                  <Clock className="w-2.5 h-2.5 animate-spin" />
                                  <span>UTR: {app.paymentUtr || "Submitted"}</span>
                                </span>
                                {app.paymentScreenshot && (
                                  <div>
                                    <button
                                      type="button"
                                      onClick={() => setViewScreenshotApp(app)}
                                      className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-cyan-300 text-[10px] font-semibold transition-all inline-flex items-center gap-1 cursor-pointer"
                                    >
                                      <Eye className="w-2.5 h-2.5" />
                                      <span>View Proof</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            ) : app.paymentStatus === "Approved" ? (
                              <div className="space-y-0.5">
                                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold inline-flex items-center gap-1">
                                  <CheckCircle2 className="w-2.5 h-2.5" />
                                  <span>Paid & Verified</span>
                                </span>
                                {app.feedbackRating && (
                                  <span className="text-[10px] text-gray-400 block">
                                    ⭐ {app.feedbackRating}/5 Stars
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-[11px] text-gray-500 italic">
                                Unpaid / In Progress
                              </span>
                            )}
                          </td>

                          {/* Lifecycle Status Select */}
                          <td className="px-4 py-3.5">
                            <select
                              value={app.status}
                              onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                              className={`text-[11px] font-bold rounded-lg px-2.5 py-1 border bg-black cursor-pointer ${
                                app.status === "Completed"
                                  ? "text-emerald-400 border-emerald-500/30"
                                  : app.status === "Accepted"
                                  ? "text-cyan-400 border-cyan-500/30"
                                  : app.status === "Payment Review"
                                  ? "text-yellow-400 border-yellow-500/30"
                                  : app.status === "Pending"
                                  ? "text-yellow-400 border-yellow-500/30"
                                  : "text-gray-400 border-white/10"
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Under Review">Under Review</option>
                              <option value="Accepted">Accepted</option>
                              <option value="Payment Review">Payment Review</option>
                              <option value="Completed">Completed</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </td>

                          {/* Action Buttons */}
                          <td className="px-4 py-3.5 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* 360 Full Inspect */}
                              <button
                                onClick={() => setViewDetailApp(app)}
                                title="Inspect Student 360° Profile"
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-all cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              {/* Edit Student Record */}
                              <button
                                onClick={() => setEditingApp(app)}
                                title="Edit Student Record"
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 hover:text-cyan-300 border border-white/10 transition-all cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              {/* Compose Custom Email */}
                              <button
                                onClick={() => {
                                  setEmailingApp(app);
                                  setCustomEmailSubject(`Update regarding your Internship Application #${app.id}`);
                                  setCustomEmailMessage(
                                    `Dear ${app.fullName},\n\nWe are writing from Haque & Sons regarding your ${app.domain} internship application.\n\nBest regards,\nNejamul Haque`
                                  );
                                }}
                                title="Compose & Send Custom Email"
                                className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 transition-all cursor-pointer"
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </button>

                              {/* Send Offer Letter */}
                              <button
                                onClick={() => handleSendOfferLetter(app)}
                                disabled={sendingOfferEmailId === app.id}
                                title="Email Official Offer Letter to Student"
                                className="px-2.5 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold transition-all inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                              >
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>{sendingOfferEmailId === app.id ? "Sending..." : "Offer"}</span>
                              </button>

                              {/* Approve Payment or Issue Certificate */}
                              {app.paymentStatus === "Pending Approval" ? (
                                <button
                                  onClick={() => handleApprovePayment(app)}
                                  disabled={approvingPaymentId === app.id}
                                  title="Approve UPI Payment & Issue Certificate"
                                  className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-black text-xs font-bold transition-all shadow-md inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>{approvingPaymentId === app.id ? "Approving..." : "Approve"}</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => openIssueCertForApp(app)}
                                  title="Issue Verifiable Certificate"
                                  className="px-2.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-all inline-flex items-center gap-1 cursor-pointer"
                                >
                                  <Award className="w-3.5 h-3.5" />
                                  <span>Issue Cert</span>
                                </button>
                              )}

                              {/* Delete Record */}
                              <button
                                onClick={() => handleDeleteApp(app.id)}
                                disabled={deletingAppId === app.id}
                                title="Permanently Delete Application"
                                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-all cursor-pointer disabled:opacity-50"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center py-10 text-gray-500">
                          No internship applications found matching your search or filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Issued Certificates Registry Table */}
          <div className="space-y-4 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Issued Certificates Registry</h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  All active cryptographic credentials issued to interns on the tamper-proof ledger.
                </p>
              </div>

              <span className="text-xs text-purple-400 font-mono font-semibold">
                {certificates.length} Total Issued
              </span>
            </div>

            <div className="bg-gray-900/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-300 font-mono">
                  <thead className="bg-white/[0.04] text-gray-400 uppercase text-[10px] tracking-wider border-b border-white/10 font-sans">
                    <tr>
                      <th className="px-5 py-3.5 font-semibold">Certificate ID</th>
                      <th className="px-5 py-3.5 font-semibold">Student Name</th>
                      <th className="px-5 py-3.5 font-semibold">Domain Track</th>
                      <th className="px-5 py-3.5 font-semibold">Grade</th>
                      <th className="px-5 py-3.5 font-semibold">Issued Date</th>
                      <th className="px-5 py-3.5 font-semibold text-right font-sans">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {certificates.length > 0 ? (
                      certificates.map((cert) => (
                        <tr key={cert.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-5 py-3.5 font-bold text-cyan-400">{cert.id}</td>
                          <td className="px-5 py-3.5 font-sans font-semibold text-white">
                            {cert.studentName}
                          </td>
                          <td className="px-5 py-3.5 text-purple-300 font-sans">{cert.domain}</td>
                          <td className="px-5 py-3.5 text-yellow-400 font-bold">{cert.grade}</td>
                          <td className="px-5 py-3.5 text-gray-400 text-[11px]">
                            {new Date(cert.issueDate).toLocaleDateString()}
                          </td>
                          <td className="px-5 py-3.5 text-right font-sans">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/verify/${cert.id}`}
                                target="_blank"
                                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-300 text-xs font-semibold transition-all inline-flex items-center gap-1"
                              >
                                <span>View Live</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Link>
                              <button
                                onClick={() => handleDeleteCert(cert.id)}
                                disabled={deletingCertId === cert.id}
                                title="Revoke and Delete Certificate"
                                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-all cursor-pointer disabled:opacity-50"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center py-10 text-gray-500 font-sans">
                          No certificates issued yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: STUDIO TELEMETRY */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <SpotlightCard className="p-6 border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Total Visitors
                  </p>
                  <h3 className="text-3xl font-extrabold text-white mt-1">
                    {totalVisitors.toLocaleString()}
                  </h3>
                  <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1 font-medium">
                    <TrendingUp className="w-3.5 h-3.5" /> Real-time beacon active
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-6 border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Active Projects
                  </p>
                  <h3 className="text-3xl font-extrabold text-white mt-1">
                    {PROJECTS.length}{" "}
                    <span className="text-base text-emerald-400 font-normal">/ 6 Live</span>
                  </h3>
                  <p className="text-xs text-cyan-400 mt-2 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 100% Operational
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <Cpu className="w-6 h-6" />
                </div>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-6 border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Global Reach
                  </p>
                  <h3 className="text-3xl font-extrabold text-white mt-1">
                    {Math.max(initialCountries.length, 1)}{" "}
                    <span className="text-base text-gray-400 font-normal">Countries</span>
                  </h3>
                  <p className="text-xs text-purple-400 mt-2 flex items-center gap-1 font-medium">
                    <Globe className="w-3.5 h-3.5" /> Worldwide Edge CDN
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Globe className="w-6 h-6" />
                </div>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-6 border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Portfolio Value
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-yellow-300 mt-1">
                    {formatCurrency(totalPortfolioValuationUSD)}
                  </h3>
                  <p className="text-xs text-yellow-400/80 mt-2 flex items-center gap-1 font-mono">
                    <Coins className="w-3.5 h-3.5" /> in {currency}
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
                  <Coins className="w-6 h-6" />
                </div>
              </div>
            </SpotlightCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-base font-bold text-white">Live Activity Stream</h3>
                </div>
                <button
                  onClick={handleSimulateTrack}
                  disabled={isPinging}
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Radio className={`w-3.5 h-3.5 ${isPinging ? "animate-ping text-cyan-400" : ""}`} />
                  <span>{isPinging ? "Sending Beacon..." : "Simulate Live Beacon"}</span>
                </button>
              </div>

              {pingStatus && (
                <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs flex items-center gap-2">
                  <Sparkles className="w-4 h-4 shrink-0 text-cyan-400" />
                  <span>{pingStatus}</span>
                </div>
              )}

              <div className="bg-gray-900/40 border border-white/10 rounded-2xl p-5 space-y-3">
                {recentVisits.length > 0 ? (
                  recentVisits.slice(0, 6).map((visit, i) => (
                    <div
                      key={visit.id || i}
                      className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 transition-all text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <div>
                          <span className="font-mono text-white font-semibold">
                            {visit.ip || "127.0.0.1"}
                          </span>
                          <span className="text-gray-400 ml-2 font-mono text-[11px]">
                            {visit.path || "/"}
                          </span>
                        </div>
                      </div>

                      <div className="text-right flex items-center gap-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-cyan-300 font-medium text-[11px]">
                          {visit.city ? `${visit.city}, ` : ""}
                          {visit.country || "India"}
                        </span>
                        <span className="text-gray-500 text-[10px] font-mono hidden sm:inline">
                          {new Date(visit.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-xs text-center py-6">
                    No visitor records captured yet.
                  </p>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Infrastructure Health</h3>
              </div>

              <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-cyan-950/20 border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center text-xs pb-3 border-b border-white/10">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-cyan-400" /> PostgreSQL Neon
                  </span>
                  <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Connected
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs pb-3 border-b border-white/10">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-yellow-400" /> Edge Latency
                  </span>
                  <span className="text-white font-mono font-bold">18ms</span>
                </div>

                <div className="flex justify-between items-center text-xs pb-3 border-b border-white/10">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Better Auth
                  </span>
                  <span className="text-purple-300 font-mono font-bold">Session Guarded</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" /> Framework
                  </span>
                  <span className="text-white font-mono font-bold">Next.js 16 + React 19</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: VISITOR INTELLIGENCE */}
      {activeTab === "visitors" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">Visitor Intelligence & Telemetry</h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Real-time connection logs, geolocation parsing, and client device agents.
              </p>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by IP, Country, Path, or Device..."
              className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all font-mono"
            />
          </div>

          <div className="bg-gray-900/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-white/[0.04] text-gray-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                  <tr>
                    <th className="px-5 py-3.5 font-semibold">Timestamp</th>
                    <th className="px-5 py-3.5 font-semibold">Client IP</th>
                    <th className="px-5 py-3.5 font-semibold">Location</th>
                    <th className="px-5 py-3.5 font-semibold">Endpoint Path</th>
                    <th className="px-5 py-3.5 font-semibold">User Agent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-3.5 whitespace-nowrap text-gray-400 text-[11px]">
                          {new Date(log.createdAt).toLocaleString()}
                        </td>
                        <td className="px-5 py-3.5 font-bold text-cyan-400">{log.ip || "127.0.0.1"}</td>
                        <td className="px-5 py-3.5">
                          <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white font-sans text-xs">
                            {log.city ? `${log.city}, ` : ""}
                            {log.country || "India"}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-purple-300 font-semibold">{log.path || "/"}</td>
                        <td className="px-5 py-3.5 max-w-xs truncate text-gray-500 text-[10px]" title={log.userAgent || ""}>
                          {log.userAgent || "Unknown Client"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-gray-500 font-sans">
                        No telemetry logs matching query &ldquo;{searchQuery}&rdquo;.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PROJECT ECOSYSTEM */}
      {activeTab === "ecosystem" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">Software Studio Ecosystem</h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Active deployments, live products, code repositories, and asset valuations.
              </p>
            </div>

            <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
              Total Portfolio Valuation: {formatCurrency(totalPortfolioValuationUSD)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p) => (
              <SpotlightCard key={p.name} className="p-6 border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-cyan-300">
                      {p.category}
                    </span>
                    <span
                      className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                        p.status === "Live"
                          ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
                          : "bg-yellow-500/15 border border-yellow-500/30 text-yellow-400"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white">{p.name}</h4>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">{p.description}</p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] bg-white/[0.03] border border-white/10 text-gray-300 px-2 py-0.5 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 block uppercase">Scope Value</span>
                    <span className="text-xs font-bold text-yellow-300 font-mono">
                      {formatCurrency(p.valuationUSD)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all text-xs"
                        title="GitHub Repo"
                      >
                        <Terminal className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-all flex items-center gap-1"
                    >
                      <span>Launch</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SYSTEM HEALTH & DEVOPS */}
      {activeTab === "system" && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white">DevSecOps & System Health</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Infrastructure metrics, database schemas, and zero-trust authentication state.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SpotlightCard className="p-6 border-white/10 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <Database className="w-5 h-5 text-cyan-400" />
                <h4 className="text-sm font-bold text-white">PostgreSQL Database Schema</h4>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between p-2 rounded-lg bg-black/40 border border-white/5">
                  <span className="font-mono text-cyan-300">internship_applications</span>
                  <span className="text-gray-400">Student applications & tracks</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-black/40 border border-white/5">
                  <span className="font-mono text-cyan-300">certificates</span>
                  <span className="text-gray-400">Cryptographic credentials & QR IDs</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-black/40 border border-white/5">
                  <span className="font-mono text-cyan-300">user & account</span>
                  <span className="text-gray-400">Admin credentials & hashed auth</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-black/40 border border-white/5">
                  <span className="font-mono text-cyan-300">visitors</span>
                  <span className="text-gray-400">Real-time edge telemetry logs</span>
                </div>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-6 border-white/10 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h4 className="text-sm font-bold text-white">Security & Environment Audit</h4>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-emerald-300">
                  <span>Zero-Trust Admin Guard</span>
                  <span className="font-mono font-bold">ACTIVE</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-cyan-950/20 border border-cyan-500/20 text-cyan-300">
                  <span>Certificate Cryptographic Registry</span>
                  <span className="font-mono font-bold">ONLINE (TAMPER-PROOF)</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-purple-950/20 border border-purple-500/20 text-purple-300">
                  <span>Automated Resend Alerts</span>
                  <span className="font-mono font-bold">ENABLED (haquendsons@gmail.com)</span>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      )}

      {/* ================= MODALS ================= */}

      {/* MODAL 1: 360° STUDENT FULL DETAIL INSPECTOR MODAL */}
      {viewDetailApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#0a0f1d] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xl">
                  {viewDetailApp.fullName.slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{viewDetailApp.fullName}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-cyan-300">
                      ID #{viewDetailApp.id}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        viewDetailApp.status === "Completed"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : viewDetailApp.status === "Accepted"
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                          : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                      }`}
                    >
                      {viewDetailApp.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {viewDetailApp.college} &bull; {viewDetailApp.degree} ({viewDetailApp.graduationYear})
                  </p>
                </div>
              </div>

              <button
                onClick={() => setViewDetailApp(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Contact & Academic */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2.5">
                <h4 className="text-[11px] uppercase font-bold text-cyan-400 tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Contact & Academic Details
                </h4>
                <div className="space-y-1.5 text-gray-300">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email:</span>
                    <a href={`mailto:${viewDetailApp.email}`} className="text-cyan-400 hover:underline font-mono">
                      {viewDetailApp.email}
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Phone:</span>
                    <span className="font-mono text-white">{viewDetailApp.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">College:</span>
                    <span className="text-right text-white font-medium">{viewDetailApp.college}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Degree & Year:</span>
                    <span className="text-white">{viewDetailApp.degree} ({viewDetailApp.graduationYear})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Applied Date:</span>
                    <span className="text-gray-400 font-mono">{new Date(viewDetailApp.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Track & Pricing */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2.5">
                <h4 className="text-[11px] uppercase font-bold text-purple-400 tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" /> Track & Financials
                </h4>
                <div className="space-y-1.5 text-gray-300">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Domain:</span>
                    <span className="text-purple-300 font-semibold">{viewDetailApp.domain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Mode:</span>
                    <span className="text-white font-medium">{viewDetailApp.mode} Track</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration:</span>
                    <span className="text-white">{viewDetailApp.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Track Fee:</span>
                    <span className="text-cyan-300 font-bold font-mono">
                      ₹{viewDetailApp.mode === "Offline" ? 249 : viewDetailApp.mode === "Hybrid" ? 199 : 99}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Payment Status:</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        viewDetailApp.paymentStatus === "Approved"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : viewDetailApp.paymentStatus === "Pending Approval"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : "text-gray-500"
                      }`}
                    >
                      {viewDetailApp.paymentStatus || "Unpaid"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Statement of Purpose */}
            {viewDetailApp.statement && (
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1.5 text-xs">
                <h4 className="text-[11px] uppercase font-bold text-gray-400 tracking-wider">
                  Statement of Purpose / Motivation
                </h4>
                <p className="text-gray-300 leading-relaxed italic bg-black/50 p-3 rounded-xl border border-white/5">
                  &ldquo;{viewDetailApp.statement}&rdquo;
                </p>
              </div>
            )}

            {/* Social & Portfolio Links */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2 text-xs">
              <h4 className="text-[11px] uppercase font-bold text-gray-400 tracking-wider">
                Candidate Profiles & Links
              </h4>
              <div className="flex flex-wrap gap-2 pt-1">
                {viewDetailApp.githubUrl && (
                  <a
                    href={viewDetailApp.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white flex items-center gap-1.5"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>GitHub Profile</span>
                    <ExternalLink className="w-3 h-3 text-gray-500" />
                  </a>
                )}
                {viewDetailApp.linkedinUrl && (
                  <a
                    href={viewDetailApp.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white flex items-center gap-1.5"
                  >
                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3 h-3 text-gray-500" />
                  </a>
                )}
                {viewDetailApp.portfolioUrl && (
                  <a
                    href={viewDetailApp.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white flex items-center gap-1.5"
                  >
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Portfolio</span>
                    <ExternalLink className="w-3 h-3 text-gray-500" />
                  </a>
                )}
                {viewDetailApp.resumeLink && (
                  <a
                    href={viewDetailApp.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Resume / CV</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            {/* Project Submissions Details */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-white/10 space-y-3 text-xs">
              <h4 className="text-[11px] uppercase font-bold text-cyan-400 tracking-wider flex items-center gap-1.5">
                <FolderArchive className="w-3.5 h-3.5" /> Final Capstone & Code Submissions
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-black/50 border border-white/5">
                  <span className="text-gray-500 block text-[10px] uppercase">Submitted GitHub Repo:</span>
                  {viewDetailApp.githubRepo ? (
                    <a
                      href={viewDetailApp.githubRepo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline font-mono text-xs flex items-center gap-1 mt-0.5"
                    >
                      <span>{viewDetailApp.githubRepo}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-gray-500 italic">Not submitted yet</span>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-black/50 border border-white/5">
                  <span className="text-gray-500 block text-[10px] uppercase">Live Demo URL:</span>
                  {viewDetailApp.liveUrl ? (
                    <a
                      href={viewDetailApp.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline font-mono text-xs flex items-center gap-1 mt-0.5"
                    >
                      <span>{viewDetailApp.liveUrl}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-gray-500 italic">Not submitted yet</span>
                  )}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-cyan-300 flex items-center justify-between">
                <div>
                  <span className="font-semibold block">Project .ZIP Deliverable Email Box:</span>
                  <span className="text-[11px] text-gray-400 font-mono">
                    Interns submit project ZIPs to: <strong>haquendsons@gmail.com</strong>
                  </span>
                </div>
                <a
                  href={`mailto:haquendsons@gmail.com?subject=Project%20ZIP%20Submission%20-%20${encodeURIComponent(
                    viewDetailApp.fullName
                  )}`}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-semibold text-xs"
                >
                  Check Inbox
                </a>
              </div>
            </div>

            {/* Payment & Feedback Verification */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3 text-xs">
              <h4 className="text-[11px] uppercase font-bold text-yellow-400 tracking-wider flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5" /> Payment & Feedback Ledger
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono">
                <div className="p-2.5 bg-black/60 rounded-xl border border-white/5">
                  <span className="text-gray-500 block text-[10px] uppercase">Payment UTR:</span>
                  <span className="text-yellow-300 font-bold">{viewDetailApp.paymentUtr || "None"}</span>
                </div>
                <div className="p-2.5 bg-black/60 rounded-xl border border-white/5">
                  <span className="text-gray-500 block text-[10px] uppercase">Rating:</span>
                  <span className="text-cyan-300 font-bold font-sans">
                    {viewDetailApp.feedbackRating ? `⭐ ${viewDetailApp.feedbackRating}/5` : "Unrated"}
                  </span>
                </div>
                <div className="p-2.5 bg-black/60 rounded-xl border border-white/5">
                  <span className="text-gray-500 block text-[10px] uppercase">Certificate ID:</span>
                  <span className="text-purple-300 font-bold">{viewDetailApp.certificateId || "Not Issued"}</span>
                </div>
              </div>

              {viewDetailApp.feedbackText && (
                <div className="p-3 bg-black/60 rounded-xl border border-white/5 text-gray-300 font-sans">
                  <span className="text-gray-500 text-[10px] uppercase font-bold block mb-0.5">Feedback Note:</span>
                  <p>{viewDetailApp.feedbackText}</p>
                </div>
              )}

              {viewDetailApp.paymentScreenshot && (
                <div className="space-y-1.5">
                  <span className="text-gray-400 font-semibold block">Payment Screenshot:</span>
                  <div className="max-h-60 overflow-y-auto rounded-xl border border-white/10 bg-black p-2 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={viewDetailApp.paymentScreenshot}
                      alt="Payment Proof Screenshot"
                      className="max-h-56 rounded-lg object-contain"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Quick Action Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const target = viewDetailApp;
                    setViewDetailApp(null);
                    setEditingApp(target);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Edit Record</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const target = viewDetailApp;
                    setViewDetailApp(null);
                    setEmailingApp(target);
                    setCustomEmailSubject(`Update regarding your Internship Application #${target.id}`);
                    setCustomEmailMessage(
                      `Dear ${target.fullName},\n\nWe are writing from Haque & Sons regarding your ${target.domain} internship.\n\nBest regards,\nNejamul Haque`
                    );
                  }}
                  className="px-3.5 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Custom Email</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const target = viewDetailApp;
                    handleSendOfferLetter(target);
                  }}
                  disabled={sendingOfferEmailId === viewDetailApp.id}
                  className="px-3.5 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{sendingOfferEmailId === viewDetailApp.id ? "Sending..." : "Send Offer Letter"}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {viewDetailApp.paymentStatus === "Pending Approval" ? (
                  <button
                    type="button"
                    onClick={() => {
                      const target = viewDetailApp;
                      setViewDetailApp(null);
                      handleApprovePayment(target);
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-black text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve Payment & Issue Cert</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const target = viewDetailApp;
                      setViewDetailApp(null);
                      openIssueCertForApp(target);
                    }}
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Issue Certificate</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setViewDetailApp(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT STUDENT RECORD MODAL */}
      {editingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0a0f1d] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <Edit3 className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="text-base font-bold text-white">
                    Edit Student Application #{editingApp.id}
                  </h3>
                  <span className="text-[11px] text-gray-400 font-mono">
                    Modify database record directly
                  </span>
                </div>
              </div>
              <button
                onClick={() => setEditingApp(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEditApp} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editingApp.fullName}
                    onChange={(e) => setEditingApp({ ...editingApp, fullName: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={editingApp.email}
                    onChange={(e) => setEditingApp({ ...editingApp, email: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Phone</label>
                  <input
                    type="text"
                    value={editingApp.phone || ""}
                    onChange={(e) => setEditingApp({ ...editingApp, phone: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">College</label>
                  <input
                    type="text"
                    value={editingApp.college || ""}
                    onChange={(e) => setEditingApp({ ...editingApp, college: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Degree & Year</label>
                  <input
                    type="text"
                    value={`${editingApp.degree || ""} (${editingApp.graduationYear || ""})`}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditingApp({ ...editingApp, degree: val });
                    }}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Domain Track</label>
                  <select
                    value={editingApp.domain}
                    onChange={(e) => setEditingApp({ ...editingApp, domain: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    {INTERNSHIP_DOMAINS.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Mode</label>
                  <select
                    value={editingApp.mode}
                    onChange={(e) => setEditingApp({ ...editingApp, mode: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="Online">Online (₹99)</option>
                    <option value="Hybrid">Hybrid (₹199)</option>
                    <option value="Offline">Offline (₹249)</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Duration</label>
                  <select
                    value={editingApp.duration}
                    onChange={(e) => setEditingApp({ ...editingApp, duration: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="4 Weeks">4 Weeks</option>
                    <option value="8 Weeks">8 Weeks</option>
                    <option value="12 Weeks">12 Weeks</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Lifecycle Status</label>
                  <select
                    value={editingApp.status}
                    onChange={(e) => setEditingApp({ ...editingApp, status: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Payment Review">Payment Review</option>
                    <option value="Completed">Completed</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Payment Status</label>
                  <select
                    value={editingApp.paymentStatus || "Unpaid"}
                    onChange={(e) => setEditingApp({ ...editingApp, paymentStatus: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="Unpaid">Unpaid</option>
                    <option value="Pending Approval">Pending Approval</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Payment UTR</label>
                  <input
                    type="text"
                    value={editingApp.paymentUtr || ""}
                    onChange={(e) => setEditingApp({ ...editingApp, paymentUtr: e.target.value })}
                    placeholder="e.g. 423984729384"
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Submitted GitHub Repo</label>
                  <input
                    type="url"
                    value={editingApp.githubRepo || ""}
                    onChange={(e) => setEditingApp({ ...editingApp, githubRepo: e.target.value })}
                    placeholder="https://github.com/user/project"
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Live Project Demo URL</label>
                  <input
                    type="url"
                    value={editingApp.liveUrl || ""}
                    onChange={(e) => setEditingApp({ ...editingApp, liveUrl: e.target.value })}
                    placeholder="https://project.vercel.app"
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingApp(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingApp}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isUpdatingApp ? "Saving Changes..." : "Save Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: COMPOSE & SEND CUSTOM EMAIL MODAL */}
      {emailingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="relative w-full max-w-xl bg-[#0a0f1d] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <Mail className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="text-base font-bold text-white">
                    Send Direct Email to {emailingApp.fullName}
                  </h3>
                  <span className="text-[11px] text-cyan-400 font-mono">
                    {emailingApp.email}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setEmailingApp(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendCustomEmail} className="space-y-4 text-xs">
              {/* Quick Template Presets */}
              <div className="space-y-1">
                <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Quick Subject Presets:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Internship Application Accepted & Next Steps",
                    "Project Submission Review & Approval",
                    "Offer Letter & Onboarding Details",
                    "Certificate Ready for Verification",
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setCustomEmailSubject(preset)}
                      className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-[11px] cursor-pointer"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Subject Line *</label>
                <input
                  type="text"
                  required
                  value={customEmailSubject}
                  onChange={(e) => setCustomEmailSubject(e.target.value)}
                  placeholder="Subject of the email"
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400 font-medium"
                />
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Email Body Content *</label>
                <textarea
                  required
                  rows={6}
                  value={customEmailMessage}
                  onChange={(e) => setCustomEmailMessage(e.target.value)}
                  placeholder="Write your custom message here..."
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400 leading-relaxed font-sans"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEmailingApp(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSendingCustomEmail}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSendingCustomEmail ? "Dispatching..." : "Send Email via Resend"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: ISSUE VERIFIABLE CERTIFICATE MODAL */}
      {isCertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="relative w-full max-w-lg bg-[#090d16] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">
                  Issue Verifiable Certificate
                </h3>
              </div>
              <button
                onClick={() => setIsCertModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {certSuccessUrl ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Certificate Issued! 🎓</h4>
                <p className="text-xs text-gray-300">
                  The verified credential is now registered on the cryptographic ledger.
                </p>
                <div className="p-3 bg-black rounded-xl border border-white/10 text-xs font-mono text-cyan-400 truncate">
                  {certSuccessUrl}
                </div>
                <div className="pt-2 flex justify-center gap-2">
                  <Link
                    href={certSuccessUrl}
                    target="_blank"
                    className="px-4 py-2 rounded-xl bg-cyan-500 text-black text-xs font-bold"
                  >
                    Open Certificate View
                  </Link>
                  <button
                    onClick={() => setIsCertModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleIssueCertificate} className="space-y-4 text-xs">
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={certStudentName}
                    onChange={(e) => setCertStudentName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-300 font-semibold block mb-1">Student Email *</label>
                    <input
                      type="email"
                      required
                      value={certStudentEmail}
                      onChange={(e) => setCertStudentEmail(e.target.value)}
                      placeholder="student@college.edu"
                      className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 font-semibold block mb-1">College Name *</label>
                    <input
                      type="text"
                      required
                      value={certCollege}
                      onChange={(e) => setCertCollege(e.target.value)}
                      placeholder="e.g. Delhi University"
                      className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-300 font-semibold block mb-1">Domain Track</label>
                    <select
                      value={certDomain}
                      onChange={(e) => setCertDomain(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                    >
                      {INTERNSHIP_DOMAINS.map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-300 font-semibold block mb-1">Grade Distinction</label>
                    <select
                      value={certGrade}
                      onChange={(e) => setCertGrade(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="Distinction">Distinction (Top 5%)</option>
                      <option value="Outstanding">Outstanding</option>
                      <option value="Excellent">Excellent</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-300 font-semibold block mb-1">Mode & Duration</label>
                    <input
                      type="text"
                      value={`${certMode} • ${certDuration}`}
                      onChange={(e) => setCertDuration(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 font-semibold block mb-1">Signatory Title</label>
                    <input
                      type="text"
                      value="Nejamul Haque, Founder & Lead Engineer"
                      disabled
                      className="w-full bg-black/30 border border-white/5 rounded-xl p-2.5 text-gray-500"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isIssuingCert}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isIssuingCert ? "Registering & Generating QR..." : "Confirm & Issue Official Certificate"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL 5: VIEW PAYMENT SCREENSHOT PROOF MODAL */}
      {viewScreenshotApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#0a0f1d] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="text-base font-bold text-white">
                    Payment & Feedback Proof
                  </h3>
                  <span className="text-[11px] text-gray-400 font-mono">
                    Applicant: {viewScreenshotApp.fullName} ({viewScreenshotApp.email})
                  </span>
                </div>
              </div>
              <button
                onClick={() => setViewScreenshotApp(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-black/50 border border-white/10 space-y-1 font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-400">Transaction UTR:</span>
                  <span className="text-yellow-300 font-bold">{viewScreenshotApp.paymentUtr || "Not specified"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Feedback Rating:</span>
                  <span className="text-cyan-300 font-bold font-sans">⭐ {viewScreenshotApp.feedbackRating || "5"}/5 Stars</span>
                </div>
                {viewScreenshotApp.feedbackText && (
                  <div className="pt-2 border-t border-white/5 text-gray-300 font-sans">
                    <span className="text-gray-500 font-bold block uppercase text-[10px]">Student Feedback:</span>
                    <p className="mt-0.5 text-xs text-gray-200">{viewScreenshotApp.feedbackText}</p>
                  </div>
                )}
              </div>

              {viewScreenshotApp.paymentScreenshot ? (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-gray-300 block">
                    Uploaded Payment Screenshot:
                  </span>
                  <div className="max-h-80 overflow-y-auto rounded-xl border border-white/10 bg-black p-2 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={viewScreenshotApp.paymentScreenshot}
                      alt="Payment Proof Screenshot"
                      className="max-w-full h-auto rounded-lg object-contain"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 italic text-center py-4">No screenshot image attached.</p>
              )}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setViewScreenshotApp(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
              >
                Close
              </button>
              {viewScreenshotApp.paymentStatus === "Pending Approval" && (
                <button
                  type="button"
                  onClick={() => {
                    const target = viewScreenshotApp;
                    setViewScreenshotApp(null);
                    handleApprovePayment(target);
                  }}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-black text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approve & Issue Certificate</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
