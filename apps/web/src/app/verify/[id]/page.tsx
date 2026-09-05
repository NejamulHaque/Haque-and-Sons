import { db } from "@/db";
import { certificates } from "@/db/schema";
import { ensureTablesExist } from "@/db/init-tables";
import { eq } from "drizzle-orm";
import { CertificateRenderer, type CertificateData } from "@/components/CertificateRenderer";
import { VerifyCredentialActions } from "@/components/VerifyCredentialActions";
import { ShieldCheck, AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface VerifyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: VerifyPageProps) {
  const { id } = await params;
  return {
    title: `Verify Certificate ${id.toUpperCase()} | Haque & Sons`,
    description: `Official cryptographic verification of Haque & Sons Certificate of Internship Completion (${id.toUpperCase()}).`,
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
      <div className="min-h-screen bg-black text-white pt-28 pb-20 px-6 flex items-center justify-center">
        <div className="max-w-md w-full text-center p-8 rounded-3xl bg-gray-950/80 border border-red-500/30 space-y-5 shadow-[0_0_50px_rgba(239,68,68,0.15)]">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 mx-auto flex items-center justify-center">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-bold text-white">Certificate Not Found</h1>
          <p className="text-xs text-gray-400 leading-relaxed">
            The certificate identifier <code className="text-red-400 font-mono font-bold">{cleanId}</code> does not match any valid records in the Haque & Sons verification registry.
          </p>

          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/verify"
              className="px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-xs font-semibold text-white transition-all inline-flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Try Another Certificate ID</span>
            </Link>

            <Link
              href="/internships"
              className="text-xs text-cyan-400 hover:underline pt-2"
            >
              Explore Haque & Sons College Internships →
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

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-white pt-24 pb-24 px-6 relative overflow-hidden">
      {/* Glow backgrounds */}
      <div className="fixed top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        {/* Verification Status Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-black to-cyan-950/40 border border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.15)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Official Verified Credential
                </h2>
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Status: {certData.status || "Valid"}
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-0.5">
                Issued to <strong className="text-white">{certData.studentName}</strong> for completing{" "}
                <strong className="text-cyan-400">{certData.domain}</strong> internship.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/verify"
              className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Verify Another</span>
            </Link>
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
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[10px] text-gray-500 uppercase font-semibold block">
              Recipient College
            </span>
            <span className="text-xs font-bold text-white block truncate">
              {certData.college}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[10px] text-gray-500 uppercase font-semibold block">
              Track Modality & Duration
            </span>
            <span className="text-xs font-bold text-cyan-300 block">
              {certData.mode || "Online"} • {certData.duration || "4 Weeks"}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[10px] text-gray-500 uppercase font-semibold block">
              Signatory Authority
            </span>
            <span className="text-xs font-bold text-white block">
              {certData.signatoryTitle || "Nejamul Haque, Founder & Lead Engineer"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
