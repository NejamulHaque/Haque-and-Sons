import { db } from "@/db";
import { certificates } from "@/db/schema";
import { ensureTablesExist } from "@/db/init-tables";
import { eq } from "drizzle-orm";
import { CertificateRenderer, type CertificateData } from "@/components/CertificateRenderer";
import { VerifyCredentialActions } from "@/components/VerifyCredentialActions";
import { ShieldCheck, AlertTriangle, ArrowLeft, GraduationCap, Award, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { getAicteComplianceInfo } from "@/lib/aicte";

export const dynamic = "force-dynamic";

interface VerifyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: VerifyPageProps) {
  const { id } = await params;
  return {
    title: `Verify Certificate ${id.toUpperCase()} | AICTE Approved | Haque Studio`,
    description: `Official cryptographic verification of Haque Studio Certificate of Internship Completion (${id.toUpperCase()}) with verified industry competencies and ISO 9001:2015 standards.`,
    alternates: { canonical: `https://haquestudio.me/verify/${id.toUpperCase()}` },
  };
}

export default async function VerifyCertificateDetailPage({ params }: VerifyPageProps) {
  await ensureTablesExist();
  const { id } = await params;
  const cleanId = id.trim().toUpperCase();

  let certRecord = null;
  try {
    const records = await db
      .select()
      .from(certificates)
      .where(eq(certificates.id, cleanId))
      .limit(1);

    if (records && records.length > 0) {
      certRecord = records[0];
    }
  } catch (err) {
    console.error("DB error looking up certificate:", err);
  }

  if (!certRecord) {
    return (
      <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6 flex items-center justify-center selection:bg-white selection:text-black">
        <div className="max-w-md w-full text-center p-8 rounded-3xl bg-[#0c0c0e] border border-white/[0.08] space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-rose-400 mx-auto flex items-center justify-center">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white">Certificate Not Found</h1>
          <p className="text-xs text-neutral-400 leading-relaxed font-normal">
            The certificate identifier <code className="text-white font-mono bg-white/[0.08] px-1.5 py-0.5 rounded">{cleanId}</code> does not match any valid records in the Haque Studio verification registry.
          </p>

          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/verify"
              className="px-6 py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-medium transition-all inline-flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Try Another Certificate ID</span>
            </Link>

            <Link
              href="/internships"
              className="text-xs font-mono text-neutral-400 hover:text-white transition-colors pt-2"
            >
              Explore Haque Studio College Internships →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const certData: CertificateData = {
    id: certRecord.id,
    studentName: certRecord.studentName,
    studentEmail: certRecord.studentEmail,
    domain: certRecord.domain,
    mode: certRecord.mode,
    internshipType: certRecord.internshipType,
    college: certRecord.college,
    duration: certRecord.duration,
    grade: certRecord.grade,
    issueDate: certRecord.issueDate instanceof Date ? certRecord.issueDate.toISOString() : String(certRecord.issueDate),
    signatoryTitle: certRecord.signatoryTitle,
    status: certRecord.status,
  };

  const aicte = getAicteComplianceInfo(certData.duration);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black pt-28 pb-24 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        {/* Verification Status Banner */}
        <div className="p-6 rounded-3xl bg-[#0c0c0e] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold tracking-tight text-white">
                  Official Verified Credential
                </h2>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Status: {certData.status || "Valid"}
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] text-neutral-300 border border-white/[0.08]">
                  Industry Practicum
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1 font-normal">
                Issued to <strong className="text-white font-medium">{certData.studentName}</strong> for completing{" "}
                <strong className="text-white font-medium">{certData.domain}</strong> internship ({aicte.totalHours}+ Hours).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/verify"
              className="px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-neutral-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Verify Another</span>
            </Link>
          </div>
        </div>

        {/* Accreditation & Practicum Immersion Breakdown Card */}
        <div className="p-5 rounded-3xl bg-[#0c0c0e] border border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-black/60 border border-white/[0.06] space-y-1">
            <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono">
              <GraduationCap className="w-4 h-4" />
              <span>TECHNICAL IMMERSION</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white block">
              {aicte.totalHours}+ Hours
            </span>
            <span className="text-[11px] text-neutral-500 block font-mono">
              {certData.duration || "90 days"} • {certData.mode || "Online"} Practicum
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-black/60 border border-white/[0.06] space-y-1">
            <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono">
              <Award className="w-4 h-4" />
              <span>GOVT. MSME REGISTRATION</span>
            </div>
            <span className="text-base font-bold text-white block font-mono">
              {aicte.msmeUdyamId}
            </span>
            <span className="text-[11px] text-neutral-500 block font-normal">
              ISO 9001:2015 Quality Management
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-black/60 border border-white/[0.06] space-y-1">
            <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono">
              <CheckCircle2 className="w-4 h-4" />
              <span>PRACTICUM CLASSIFICATION</span>
            </div>
            <span className="text-xs font-bold text-white block font-mono">
              {aicte.aicteCode}
            </span>
            <span className="text-[11px] text-neutral-500 block font-normal">
              Category-B Industry Practicum
            </span>
          </div>
        </div>

        {/* The Printable & Downloadable Certificate Component */}
        <CertificateRenderer certificate={certData} showActions={true} />

        {/* Social Credential & GitHub Badge Embed Suite */}
        <VerifyCredentialActions
          certId={certData.id}
          studentName={certData.studentName}
          domain={certData.domain}
          issueDate={certData.issueDate}
        />

        {/* Verification Metadata Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-[#0c0c0e] border border-white/[0.08] space-y-1">
            <span className="text-[10px] text-neutral-500 uppercase font-mono block">
              Recipient College
            </span>
            <span className="text-xs font-medium text-white block truncate">
              {certData.college}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0c0c0e] border border-white/[0.08] space-y-1">
            <span className="text-[10px] text-neutral-500 uppercase font-mono block">
              Track Modality &amp; Duration
            </span>
            <span className="text-xs font-mono text-neutral-300 block">
              {certData.mode || "Online"} • {certData.duration || "4 Weeks"} ({aicte.totalHours} Hours)
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0c0c0e] border border-white/[0.08] space-y-1">
            <span className="text-[10px] text-neutral-500 uppercase font-mono block">
              Signatory Authority
            </span>
            <span className="text-xs font-medium text-white block">
              {certData.signatoryTitle || "Nejamul Haque, CEO & Director"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
