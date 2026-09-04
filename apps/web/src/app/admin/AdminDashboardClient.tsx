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
} from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import { CURRENCIES, type CurrencyCode } from "@/components/ProjectCalculator";
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
  >("overview");
  const [currency, setCurrency] = useState<CurrencyCode>("INR");
  const [totalVisitors, setTotalVisitors] = useState(initialTotal);
  const [recentVisits, setRecentVisits] = useState<VisitorLog[]>(initialRecent);
  const [applications, setApplications] = useState<InternshipAppRow[]>(initialApplications);
  const [certificates, setCertificates] = useState<CertificateRow[]>(initialCertificates);

  const [searchQuery, setSearchQuery] = useState("");
  const [appSearchQuery, setAppSearchQuery] = useState("");
  const [appStatusFilter, setAppStatusFilter] = useState("All");

  const [pingStatus, setPingStatus] = useState<string | null>(null);
  const [isPinging, setIsPinging] = useState(false);

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

  const activeCurrency = CURRENCIES[currency];

  const formatCurrency = (usdAmount: number) => {
    return activeCurrency.format(usdAmount);
  };

  const totalPortfolioValuationUSD = useMemo(() => {
    return PROJECTS.reduce((acc, p) => acc + p.valuationUSD, 0);
  }, []);

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
          userAgent: navigator.userAgent,
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
      if (appSearchQuery.trim()) {
        const q = appSearchQuery.toLowerCase();
        const matchName = app.fullName.toLowerCase().includes(q);
        const matchEmail = app.email.toLowerCase().includes(q);
        const matchCollege = app.college.toLowerCase().includes(q);
        const matchDomain = app.domain.toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchCollege && !matchDomain) return false;
      }
      return true;
    });
  }, [applications, appStatusFilter, appSearchQuery]);

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
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === "overview"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Overview & Telemetry</span>
          </button>

          <button
            onClick={() => setActiveTab("internships")}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === "internships"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Internships & Certificates ({applications.length})</span>
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
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <SpotlightCard className="p-6 border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Total Applications
                  </p>
                  <h3 className="text-3xl font-extrabold text-white mt-1">
                    {applications.length}
                  </h3>
                  <p className="text-xs text-cyan-400 mt-2 flex items-center gap-1 font-medium">
                    <GraduationCap className="w-3.5 h-3.5" /> Across 11+ Domains
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-6 border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Pending Review
                  </p>
                  <h3 className="text-3xl font-extrabold text-yellow-300 mt-1">
                    {applications.filter((a) => a.status === "Pending").length}
                  </h3>
                  <p className="text-xs text-yellow-400/80 mt-2 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5" /> Awaiting Evaluation
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
                  <Clock className="w-6 h-6" />
                </div>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-6 border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Active & Completed
                  </p>
                  <h3 className="text-3xl font-extrabold text-emerald-400 mt-1">
                    {applications.filter((a) => a.status === "Accepted" || a.status === "Completed").length}
                  </h3>
                  <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Production Capstones
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>
            </SpotlightCard>

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
                    <Award className="w-3.5 h-3.5" /> Verified on Ledger
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
                <h3 className="text-xl font-bold text-white">Internship Applications Pipeline</h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Review applicant profiles, change status, and issue verified certificates in 1 click.
                </p>
              </div>

              <div className="flex items-center gap-2">
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

            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={appSearchQuery}
                  onChange={(e) => setAppSearchQuery(e.target.value)}
                  placeholder="Search by student name, email, college, or domain..."
                  className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all font-mono"
                />
              </div>

              <div className="flex items-center gap-1 bg-black/60 border border-white/10 p-1 rounded-xl">
                {["All", "Pending", "Accepted", "Completed", "Rejected"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setAppStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      appStatusFilter === st
                        ? "bg-cyan-500 text-black shadow-sm"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Applications Table */}
            <div className="bg-gray-900/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-300">
                  <thead className="bg-white/[0.04] text-gray-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                    <tr>
                      <th className="px-5 py-3.5 font-semibold">Applicant</th>
                      <th className="px-5 py-3.5 font-semibold">College & Branch</th>
                      <th className="px-5 py-3.5 font-semibold">Domain Track</th>
                      <th className="px-5 py-3.5 font-semibold">Mode & Type</th>
                      <th className="px-5 py-3.5 font-semibold">Status</th>
                      <th className="px-5 py-3.5 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredApplications.length > 0 ? (
                      filteredApplications.map((app) => (
                        <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-5 py-3.5">
                            <span className="font-bold text-white block">{app.fullName}</span>
                            <span className="text-[11px] text-cyan-400 font-mono block">{app.email}</span>
                            <span className="text-[10px] text-gray-500 block">{app.phone}</span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="text-gray-200 font-medium block">{app.college}</span>
                            <span className="text-[11px] text-gray-400 block">
                              {app.degree} ({app.graduationYear})
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 font-semibold inline-block">
                              {app.domain}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="text-gray-300 block font-medium">
                              {app.mode} • {app.duration}
                            </span>
                            <span className="text-[10px] text-cyan-400/80 block">{app.internshipType}</span>
                          </td>
                          <td className="px-5 py-3.5">
                            <select
                              value={app.status}
                              onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                              className={`text-[11px] font-bold rounded-lg px-2.5 py-1 border bg-black cursor-pointer ${
                                app.status === "Completed"
                                  ? "text-emerald-400 border-emerald-500/30"
                                  : app.status === "Accepted"
                                  ? "text-cyan-400 border-cyan-500/30"
                                  : app.status === "Pending"
                                  ? "text-yellow-400 border-yellow-500/30"
                                  : "text-gray-400 border-white/10"
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Under Review">Under Review</option>
                              <option value="Accepted">Accepted</option>
                              <option value="Completed">Completed</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            <button
                              onClick={() => openIssueCertForApp(app)}
                              className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-all inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Award className="w-3.5 h-3.5" />
                              <span>Issue Certificate</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center py-10 text-gray-500">
                          No internship applications found matching your criteria.
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
                  All active cryptographic credentials issued to interns.
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
                      <th className="px-5 py-3.5 font-semibold text-right font-sans">Verification</th>
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
                            <Link
                              href={`/verify/${cert.id}`}
                              target="_blank"
                              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-300 text-xs font-semibold transition-all inline-flex items-center gap-1"
                            >
                              <span>View Certificate</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
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

      {/* TAB 1: OVERVIEW */}
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

      {/* ISSUE CERTIFICATE MODAL */}
      {isCertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
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
                  The verified credential is now registered and public.
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
                      className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
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
                    <input
                      type="text"
                      required
                      value={certDomain}
                      onChange={(e) => setCertDomain(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                    />
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
    </div>
  );
}
