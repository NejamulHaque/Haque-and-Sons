"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  GraduationCap,
  Sparkles,
  Award,
  Laptop,
  Search,
  ArrowRight,
  Coins,
  QrCode as QrIcon,
  ChevronDown,
  Building,
  User,
  Clock,
  CheckCircle2,
  X,
  Quote,
  Zap,
  Globe,
  Users,
  BookOpen,
  Shield,
  Rocket,
  Code2,
  Target,
  Trophy,
  Star,
} from "lucide-react";
import { INTERNSHIP_DOMAINS } from "@/lib/domains";
import { SpotlightCard } from "@/components/SpotlightCard";
import { CertificateRenderer, type CertificateData } from "@/components/CertificateRenderer";
import { InternshipApplicationModal } from "@/components/InternshipApplicationModal";
import { openAuthModal } from "@/components/AuthModal";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

// ─── Animated Counter Hook ──────────────────────────────────────────────────
function useCounter(end: number, duration: number = 2000, inView: boolean) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return count;
}

// ─── 3D Tilt Card Component ────────────────────────────────────────────────
function TiltCard({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), { stiffness: 300, damping: 30 });
  const shimmerX = useSpring(useTransform(x, [0, 1], [0, 100]), { stiffness: 300, damping: 30 });
  const shimmerY = useSpring(useTransform(y, [0, 1], [0, 100]), { stiffness: 300, damping: 30 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width);
      y.set((e.clientY - rect.top) / rect.height);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0.5);
    y.set(0.5);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gray-950/40 backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] ${className}`}
    >
      {/* Holographic shimmer overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [shimmerX, shimmerY],
            ([sx, sy]) =>
              `radial-gradient(600px circle at ${sx}% ${sy}%, rgba(6,182,212,0.12), rgba(168,85,247,0.06), transparent 50%)`
          ),
        }}
      />
      <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

// ─── Particle Background ────────────────────────────────────────────────────
function ParticleGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-cyan-400/20"
          style={{
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `particleFloat ${Math.random() * 6 + 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 4}s`,
          }}
        />
      ))}
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

// ─── Domain Detail Modal ─────────────────────────────────────────────────────
function DomainDetailModal({
  domain,
  isOpen,
  onClose,
  onApply,
}: {
  domain: (typeof INTERNSHIP_DOMAINS)[number] | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (id: string) => void;
}) {
  if (!domain) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl bg-gray-950 border border-white/10 shadow-[0_0_80px_rgba(6,182,212,0.15)]"
          >
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Header */}
            <div className="sticky top-0 z-20 bg-gray-950/95 backdrop-blur-xl border-b border-white/10 px-8 py-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-3xl">
                  {domain.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{domain.name}</h3>
                  <p className="text-xs text-cyan-400 font-medium">{domain.tagline}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-8 py-8 space-y-8">
              {/* Description */}
              <p className="text-sm text-gray-300 leading-relaxed">{domain.description}</p>

              {/* Tech Stack */}
              <div>
                <h4 className="text-xs uppercase font-bold text-cyan-400 tracking-wider mb-3 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" /> Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {domain.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-gray-200 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Capstone Project */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/5 border border-purple-500/20">
                <h4 className="text-xs uppercase font-bold text-purple-400 tracking-wider mb-2 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5" /> Capstone Project
                </h4>
                <p className="text-sm font-semibold text-white">{domain.capstoneProject}</p>
              </div>

              {/* Curriculum */}
              <div>
                <h4 className="text-xs uppercase font-bold text-cyan-400 tracking-wider mb-4 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> Weekly Curriculum
                </h4>
                <div className="space-y-3">
                  {domain.curriculum.map((c, i) => (
                    <motion.div
                      key={c.week}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-bold">
                          {c.week}
                        </span>
                        <span className="text-sm font-bold text-white">{c.title}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pl-[70px]">
                        {c.topics.map((t) => (
                          <span key={t} className="text-[11px] text-gray-400">
                            • {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Assignments */}
              <div>
                <h4 className="text-xs uppercase font-bold text-cyan-400 tracking-wider mb-4 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" /> Milestone Assignments
                </h4>
                <div className="space-y-3">
                  {domain.assignments.map((a, i) => (
                    <div
                      key={a.id}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/5"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">
                          {a.badge}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            a.difficulty === "Foundational"
                              ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
                              : a.difficulty === "Intermediate"
                              ? "bg-yellow-500/15 border border-yellow-500/30 text-yellow-400"
                              : "bg-pink-500/15 border border-pink-500/30 text-pink-400"
                          }`}
                        >
                          {a.difficulty}
                        </span>
                      </div>
                      <h5 className="text-sm font-bold text-white mb-1">{a.title}</h5>
                      <p className="text-xs text-gray-400 leading-relaxed">{a.description}</p>
                      <div className="flex items-center gap-4 mt-3 text-[11px] text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {a.estimatedHours}h
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" /> {a.points} pts
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Apply CTA */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="text-xs text-gray-400">
                  Prerequisites: {domain.prerequisites.join(" • ")}
                </div>
                <button
                  onClick={() => onApply(domain.id)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-bold transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center gap-2 cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── FAQ Accordion Item ──────────────────────────────────────────────────────
function FaqItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "border-cyan-500/30 bg-cyan-950/10 shadow-[0_0_30px_rgba(6,182,212,0.08)]"
          : "border-white/10 bg-white/[0.02] hover:border-white/20"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer"
      >
        <span className="text-sm font-bold text-white pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? "text-cyan-400" : "text-gray-500"}`} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 pb-5">
              <div className="h-px bg-gradient-to-r from-cyan-500/30 via-white/5 to-transparent mb-4" />
              <p className="text-xs text-gray-400 leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Testimonials Data ───────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Aarav Sharma",
    college: "IIT Kanpur",
    domain: "Full-Stack Web Development",
    quote: "The production-grade capstone project at Haque & Sons was a game-changer for my resume. Direct code reviews from Nejamul helped me land my dream internship at a Y Combinator startup.",
    avatar: "AS",
    rating: 5,
  },
  {
    name: "Priya Reddy",
    college: "VIT Vellore",
    domain: "AI & Generative AI Engineering",
    quote: "Building an autonomous AI agent from scratch with RAG vector embeddings gave me skills no classroom could. My verified certificate impressed every recruiter I spoke with.",
    avatar: "PR",
    rating: 5,
  },
  {
    name: "Rohit Patel",
    college: "BITS Pilani",
    domain: "Cloud & DevSecOps",
    quote: "Setting up real CI/CD pipelines with Docker, Kubernetes, and GitHub Actions — not just tutorials. The hands-on approach here is unmatched.",
    avatar: "RP",
    rating: 5,
  },
  {
    name: "Sneha Gupta",
    college: "DTU Delhi",
    domain: "Data Analytics & BI",
    quote: "The PowerBI capstone project with real e-commerce datasets taught me more about business intelligence in 4 weeks than my entire semester at college.",
    avatar: "SG",
    rating: 5,
  },
  {
    name: "Mohammed Faisal",
    college: "TMU Moradabad",
    domain: "Android Development",
    quote: "Shipping a production-quality Android app with Jetpack Compose and getting a signed APK was an incredible experience. The mentorship quality is top-tier.",
    avatar: "MF",
    rating: 5,
  },
];

// ─── Categories ──────────────────────────────────────────────────────────────
const CATEGORIES = [
  "All Tracks",
  "Development",
  "AI & Data",
  "Mobile",
  "DevOps & Security",
  "Design",
] as const;

// ─── FAQ Data ────────────────────────────────────────────────────────────────
const FAQ_DATA = [
  {
    question: "Who is eligible to apply for Haque & Sons internships?",
    answer:
      "Students from any college, university, branch, or semester (B.Tech, BCA, MCA, B.Sc, Diploma, etc.) as well as recent graduates looking to build a production portfolio are eligible. There are no geographic restrictions — students from across India and internationally can apply.",
  },
  {
    question: "What is the difference between Paid and Free tracks?",
    answer:
      "The Free Track focuses on project-based learning and awards full verified industry credentials upon capstone delivery with zero fees. The Paid Track is performance-stipend eligible for candidates contributing to live client modules and includes additional 1-on-1 mentorship sessions.",
  },
  {
    question: "How does the certificate verification work?",
    answer:
      "Each certificate is assigned a unique cryptographic identifier (e.g. HS-INT-2026-A8F9B2) and an embedded QR code linking directly to our public verification portal. Anyone — recruiters, HR, universities — can verify the authenticity of your certificate instantly.",
  },
  {
    question: "Can I do this internship alongside my college classes?",
    answer:
      "Absolutely! Our virtual internships are designed with asynchronous milestones so you can manage your college schedule and exams flexibly. Most students complete their tracks working 2-3 hours per day alongside their regular academics.",
  },
  {
    question: "What happens after I complete the internship?",
    answer:
      "You receive a verified cryptographic QR certificate, a Letter of Recommendation (for top performers), and your capstone project is deployed live — giving you a real production portfolio to showcase to future employers.",
  },
  {
    question: "Do I get mentorship during the internship?",
    answer:
      "Yes! Every intern receives direct code reviews and architectural guidance from Nejamul Haque, the founder. You also get access to a private Discord community of fellow interns and alumni for peer collaboration.",
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function InternshipsPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<string>("All Tracks");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<(typeof INTERNSHIP_DOMAINS)[number] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [activeDomainId, setActiveDomainId] = useState<string>("full-stack-web");
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [dismissedCTA, setDismissedCTA] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Show floating CTA after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissedCTA) setShowFloatingCTA(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [dismissedCTA]);

  const handleOpenApply = (domainId?: string) => {
    const target = domainId || "full-stack-web";
    if (session?.user) {
      router.push(`/profile?domain=${encodeURIComponent(target)}`);
    } else {
      openAuthModal({ mode: "signup", domain: target });
    }
  };

  const filteredDomains = INTERNSHIP_DOMAINS.filter((domain) => {
    if (selectedCategory !== "All Tracks" && domain.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = domain.name.toLowerCase().includes(q);
      const matchTech = domain.techStack.some((t) => t.toLowerCase().includes(q));
      const matchDesc = domain.description.toLowerCase().includes(q);
      if (!matchName && !matchTech && !matchDesc) return false;
    }
    return true;
  });

  const previewCertificateData: CertificateData = {
    id: "HS-INT-2026-TMU-001",
    studentName: "Nejamul Haque",
    studentEmail: "nejamulhaque.works@gmail.com",
    domain: "Full-Stack Web Development",
    mode: "Offline Studio Track",
    internshipType: "Industry Capstone & Production Architecture",
    college: "Teerthanker Mahaveer University",
    duration: "12 Weeks",
    grade: "Distinction (Top 1%)",
    issueDate: "2026-09-04T00:00:00.000Z",
    signatoryTitle: "Nejamul Haque, Founder & Lead Engineer",
    status: "Valid",
  };

  // Stats section observer
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.3, triggerOnce: true });
  const domainCount = useCounter(11, 1500, statsInView);
  const studentCount = useCounter(500, 2000, statsInView);
  const certCount = useCounter(100, 1800, statsInView);

  // Stagger animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-white">
      {/* ─── Inline Keyframes ─────────────────────────────────────────────── */}
      <style jsx global>{`
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
          50% { transform: translateY(-40px) translateX(-5px); opacity: 0.3; }
          75% { transform: translateY(-20px) translateX(15px); opacity: 0.7; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(6,182,212,0.3); }
          50% { box-shadow: 0 0 40px rgba(6,182,212,0.6); }
        }
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #22d3ee 0%, #a855f7 30%, #ec4899 50%, #a855f7 70%, #22d3ee 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        .glow-button {
          animation: glow-pulse 3s ease-in-out infinite;
        }
        .gradient-border {
          background: linear-gradient(135deg, rgba(6,182,212,0.3), rgba(168,85,247,0.3), rgba(236,72,153,0.3));
          background-size: 200% 200%;
          animation: gradient-flow 4s ease infinite;
        }
      `}</style>

      {/* Background ambient lighting */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/3 rounded-full blur-[200px] pointer-events-none" />

      {/* ═══════════════════════════════════════════════════════════════════════
           SECTION 1: CINEMATIC HERO
       ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-24 pb-12">
        <ParticleGrid />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Student Portal Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto mb-10 p-3 rounded-2xl bg-gray-950/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl"
          >
            {session?.user ? (
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-gray-300">
                  Logged in as <strong className="text-white">{session.user.name || session.user.email}</strong>
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>Are you an enrolled intern? Sign in to access your active sprint & profile.</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              {session?.user ? (
                <Link
                  href="/profile"
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>My Internship Dashboard</span>
                </Link>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => openAuthModal({ mode: "signin" })}
                    className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    Student Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => openAuthModal({ mode: "signup" })}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    Create Account
                  </button>
                </>
              )}
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider shadow-[0_0_30px_rgba(6,182,212,0.1)] mb-8"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Haque & Sons • College Internship Program 2026</span>
          </motion.div>

          {/* Animated Heading — word-by-word reveal */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.1] max-w-5xl mx-auto mb-8"
          >
            {["Build", "Production", "Software."].map((word, i) => (
              <motion.span
                key={word}
                variants={wordVariants}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span
              variants={wordVariants}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="shimmer-text inline-block"
            >
              Earn Verified Credentials.
            </motion.span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="text-gray-400 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed mb-10"
          >
            Hands-on virtual, offline, and hybrid internships for college students across all
            engineering domains. Work on real production architectures, receive direct code
            mentorship from Nejamul Haque, and earn tamper-proof verifiable certificates.
          </motion.p>

          {/* Animated Stat Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
          >
            {[
              { icon: Laptop, text: "Online • Offline • Hybrid", color: "cyan" },
              { icon: Coins, text: "Paid & Free Certification Tracks", color: "yellow" },
              { icon: Award, text: "Verifiable QR Certificate + LOR", color: "purple" },
              { icon: Building, text: "All Colleges & Branches Eligible", color: "emerald" },
            ].map((badge, i) => (
              <motion.span
                key={badge.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6 + i * 0.1, type: "spring" }}
                className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-gray-300 flex items-center gap-2 font-medium hover:bg-white/[0.06] hover:border-white/20 transition-all"
              >
                <badge.icon className={`w-4 h-4 text-${badge.color}-400`} />
                <span>{badge.text}</span>
              </motion.span>
            ))}
          </motion.div>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => handleOpenApply("full-stack-web")}
              className="glow-button px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>Apply for Internship</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href="/verify"
              className="px-7 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-sm font-semibold text-gray-300 hover:text-white transition-all flex items-center gap-2 hover:scale-105"
            >
              <QrIcon className="w-4 h-4 text-cyan-400" />
              <span>Verify Existing Certificate</span>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-widest text-gray-500">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1"
            >
              <div className="w-1 h-2 rounded-full bg-cyan-400" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
           SECTION 2: ANIMATED STATS DASHBOARD
       ═══════════════════════════════════════════════════════════════════════ */}
      <section ref={statsRef} className="py-16 px-6 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/20 via-transparent to-purple-950/20 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: domainCount, suffix: "+", label: "Domain Tracks", icon: BookOpen, color: "cyan" },
              { value: studentCount, suffix: "+", label: "Students Trained", icon: Users, color: "purple" },
              { value: certCount, suffix: "%", label: "Placement Rate", icon: Trophy, color: "emerald" },
              { value: 3, suffix: " Modes", label: "Online • Offline • Hybrid", icon: Globe, color: "pink" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all group"
              >
                <stat.icon className={`w-6 h-6 text-${stat.color}-400 mx-auto mb-3 group-hover:scale-110 transition-transform`} />
                <div className="text-3xl sm:text-4xl font-black text-white font-mono mb-1">
                  {stat.value}
                  <span className={`text-${stat.color}-400`}>{stat.suffix}</span>
                </div>
                <span className="text-xs text-gray-500 font-medium">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
           SECTION 3: DOMAIN EXPLORER — 3D TILT CARDS
       ═══════════════════════════════════════════════════════════════════════ */}
      <section className="px-6 max-w-7xl mx-auto py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Domain Catalog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Explore 11+ Domain{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                Tracks
              </span>
            </h2>
            <p className="text-sm text-gray-400 mt-2 max-w-lg">
              Select your domain of interest, explore the curriculum, and build
              enterprise-grade capstones. Click any card to view full details.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search domain or tech stack..."
              className="w-full bg-black/60 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all font-mono"
            />
          </div>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                    : "bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>

        {/* Domain Cards Grid with AnimatePresence */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredDomains.map((domain, i) => (
              <motion.div
                key={domain.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <TiltCard
                  className="p-7 flex flex-col justify-between cursor-pointer group h-full"
                  onClick={() => {
                    setSelectedDomain(domain);
                    setIsModalOpen(true);
                  }}
                >
                  <div>
                    {/* Top Bar: Icon, Category & Popular badge */}
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl shadow-inner"
                      >
                        {domain.icon}
                      </motion.div>

                      <div className="flex items-center gap-1.5">
                        {domain.popular && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 flex items-center gap-1">
                            <Zap className="w-2.5 h-2.5" /> Popular
                          </span>
                        )}
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-cyan-300">
                          {domain.category}
                        </span>
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                      {domain.name}
                    </h3>
                    <p className="text-xs text-cyan-400/90 font-medium mb-3">{domain.tagline}</p>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">
                      {domain.description}
                    </p>

                    {/* Capstone Preview */}
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 mb-4 group-hover:border-purple-500/20 transition-all">
                      <span className="text-[10px] uppercase font-bold text-purple-400 block mb-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Capstone Project
                      </span>
                      <p className="text-xs font-semibold text-gray-200 line-clamp-1">
                        {domain.capstoneProject}
                      </p>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {domain.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] bg-white/[0.03] border border-white/10 text-gray-300 px-2 py-0.5 rounded-md font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                      {domain.techStack.length > 4 && (
                        <span className="text-[10px] bg-white/[0.03] border border-white/10 text-gray-500 px-2 py-0.5 rounded-md font-mono">
                          +{domain.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                    <span className="text-xs text-gray-500 font-medium group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                      Click to explore full details
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenApply(domain.id);
                        }}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
                      >
                        <span>Apply</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
           SECTION 4: ANIMATED TIMELINE — HOW IT WORKS
       ═══════════════════════════════════════════════════════════════════════ */}
      <section className="px-6 max-w-5xl mx-auto py-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Rocket className="w-3.5 h-3.5" />
            <span>Your Journey Map</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            How It Works in{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              4 Simple Steps
            </span>
          </h2>
          <p className="mt-3 text-gray-400 text-sm max-w-xl mx-auto">
            From application to verified industry credential on your LinkedIn profile.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full origin-top gradient-border rounded-full"
            />
          </div>

          {[
            {
              step: "01",
              title: "Apply for Your Track",
              desc: "Pick your preferred domain, mode (Online/Offline/Hybrid), and duration (4, 8, or 12 weeks). Create your account and select your internship track.",
              icon: Target,
              color: "cyan",
            },
            {
              step: "02",
              title: "Receive Project Kit",
              desc: "Get direct access to project requirements, GitHub starter repos, architectural guidelines, and your personal mentor assignment.",
              icon: Code2,
              color: "purple",
            },
            {
              step: "03",
              title: "Build & Code Review",
              desc: "Ship your capstone with direct mentorship from Nejamul Haque. Receive real-time code reviews, architectural feedback, and automated CI/CD deployment.",
              icon: Rocket,
              color: "emerald",
            },
            {
              step: "04",
              title: "Get Verified & LOR",
              desc: "Receive your official cryptographic QR certificate, public verification link, and Letter of Recommendation for top performers.",
              icon: Award,
              color: "yellow",
            },
          ].map((item, i) => {
            const isEven = i % 2 === 0;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex items-center mb-16 last:mb-0 ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Node dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    whileInView={{ scale: [0, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.3 }}
                    className={`w-12 h-12 rounded-full bg-${item.color}-500/20 border-2 border-${item.color}-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.2)]`}
                  >
                    <Icon className={`w-5 h-5 text-${item.color}-400`} />
                  </motion.div>
                </div>

                {/* Content */}
                <div
                  className={`ml-20 md:ml-0 md:w-[calc(50%-40px)] ${
                    isEven ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <SpotlightCard className="p-6 border-white/10 hover:border-white/20">
                    <span className={`text-3xl font-black text-${item.color}-400/30 font-mono block mb-2`}>
                      {item.step}
                    </span>
                    <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                  </SpotlightCard>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
           SECTION 5: CERTIFICATE SHOWCASE — 3D FLIP
       ═══════════════════════════════════════════════════════════════════════ */}
      <section className="px-6 max-w-7xl mx-auto py-24 border-t border-white/5 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Industry Credential</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Official Certificate of{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Completion
            </span>
          </h2>
          <p className="mt-3 text-gray-400 text-sm sm:text-base leading-relaxed">
            Every graduate earns an immutable, cryptographic certificate verified on our public
            ledger. <strong className="text-white">Click the certificate to flip</strong> and
            see the verification details.
          </p>
        </motion.div>

        {/* 3D Flip Card */}
        <div className="max-w-4xl mx-auto relative z-10" style={{ perspective: "1500px" }}>
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative cursor-pointer"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front — Certificate */}
            <div
              className="shadow-[0_0_80px_rgba(6,182,212,0.15)] rounded-3xl p-1 bg-gradient-to-b from-cyan-500/20 via-white/5 to-purple-500/20"
              style={{ backfaceVisibility: "hidden" }}
            >
              <CertificateRenderer certificate={previewCertificateData} showActions={false} />
            </div>

            {/* Back — Verification Info */}
            <div
              className="absolute inset-0 rounded-3xl p-1 bg-gradient-to-b from-purple-500/20 via-white/5 to-cyan-500/20"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <div className="bg-gray-950 rounded-[22px] p-8 sm:p-12 h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-6">
                  <Shield className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Cryptographic Verification</h3>
                <p className="text-sm text-gray-400 max-w-md mb-6 leading-relaxed">
                  Each certificate is encoded with a unique identifier and QR code that links
                  directly to our public verification portal. Tamper-proof and instantly
                  verifiable by recruiters and institutions.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6 w-full max-w-sm">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                    <span className="text-[10px] text-gray-500 uppercase block">Certificate ID</span>
                    <span className="text-xs font-bold text-cyan-300 font-mono">HS-INT-2026-TMU-001</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                    <span className="text-[10px] text-gray-500 uppercase block">Status</span>
                    <span className="text-xs font-bold text-emerald-400">✓ Valid & Active</span>
                  </div>
                </div>
                <Link
                  href="/verify"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
                >
                  <QrIcon className="w-4 h-4" />
                  <span>Visit Verification Portal</span>
                </Link>
                <p className="text-[11px] text-gray-500 mt-4">Click to flip back to certificate</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
           SECTION 6: TESTIMONIALS CAROUSEL
       ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Quote className="w-3.5 h-3.5" />
              <span>Student Success Stories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              What Our Interns{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Say
              </span>
            </h2>
          </motion.div>

          {/* Testimonial Cards */}
          <div className="relative max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <SpotlightCard className="p-8 sm:p-10 border-white/10">
                  {/* Quote */}
                  <Quote className="w-8 h-8 text-cyan-500/30 mb-4" />
                  <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-8 italic">
                    &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                        {TESTIMONIALS[activeTestimonial].avatar}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {TESTIMONIALS[activeTestimonial].name}
                        </h4>
                        <p className="text-xs text-gray-400">
                          {TESTIMONIALS[activeTestimonial].college}
                        </p>
                        <p className="text-[11px] text-cyan-400 font-medium">
                          {TESTIMONIALS[activeTestimonial].domain}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: TESTIMONIALS[activeTestimonial].rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            </AnimatePresence>

            {/* Dots indicator */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`rounded-full transition-all cursor-pointer ${
                    i === activeTestimonial
                      ? "w-8 h-2 bg-cyan-400"
                      : "w-2 h-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
           SECTION 7: FAQ ACCORDION
       ═══════════════════════════════════════════════════════════════════════ */}
      <section className="px-6 max-w-4xl mx-auto py-24 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Frequently Asked</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Got Questions?{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              We&apos;ve Got Answers.
            </span>
          </h2>
          <p className="text-xs text-gray-400 mt-2">
            Everything you need to know about eligibility, timeline, and certificates.
          </p>
        </motion.div>

        <div className="space-y-3">
          {FAQ_DATA.map((faq, i) => (
            <FaqItem key={i} question={faq.question} answer={faq.answer} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <button
            onClick={() => handleOpenApply("full-stack-web")}
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)] cursor-pointer hover:scale-105 active:scale-95"
          >
            Start Your Application Today
          </button>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
           FLOATING CTA BANNER
       ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showFloatingCTA && !dismissedCTA && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-xl"
          >
            <div className="relative p-4 rounded-2xl bg-gray-950/95 backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.2)] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Ready to start your internship?</p>
                  <p className="text-[11px] text-gray-400">Apply now — limited seats available for 2026 batch</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleOpenApply("full-stack-web")}
                  className="glow-button px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold cursor-pointer hover:scale-105 active:scale-95 transition-all"
                >
                  Apply Now
                </button>
                <button
                  onClick={() => {
                    setDismissedCTA(true);
                    setShowFloatingCTA(false);
                  }}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Domain Detail Modal ──────────────────────────────────────────── */}
      <DomainDetailModal
        domain={selectedDomain}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDomain(null);
        }}
        onApply={(id) => {
          setIsModalOpen(false);
          handleOpenApply(id);
        }}
      />

      {/* ─── Application Modal (kept for backward compat) ─────────────────── */}
      <InternshipApplicationModal
        isOpen={isAppModalOpen}
        onClose={() => setIsAppModalOpen(false)}
        defaultDomainId={activeDomainId}
        defaultMode="Online"
        defaultType="Free"
      />
    </div>
  );
}
