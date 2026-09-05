import { AdminGuard } from "@/components/AdminGuard";
import { db } from "@/db";
import { visitors, internshipApplications, certificates } from "@/db/schema";
import { ensureTablesExist } from "@/db/init-tables";
import { desc, sql } from "drizzle-orm";
import { AdminHeader } from "./AdminHeader";
import {
  AdminDashboardClient,
  type VisitorLog,
  type CountryStat,
  type InternshipAppRow,
  type CertificateRow,
} from "./AdminDashboardClient";

export const dynamic = "force-dynamic";

async function getStats(): Promise<{
  total: number;
  recent: VisitorLog[];
  countries: CountryStat[];
  applications: InternshipAppRow[];
  certificatesList: CertificateRow[];
}> {
  try {
    await ensureTablesExist();

    const totalVisitors = await db
      .select({ count: sql<number>`count(*)` })
      .from(visitors);

    const recentVisits = await db
      .select()
      .from(visitors)
      .orderBy(desc(visitors.createdAt))
      .limit(30);

    const countryStatsResult = await db.execute(
      sql`SELECT country, COUNT(*) as count FROM visitors GROUP BY country ORDER BY count DESC LIMIT 10`
    );

    const appsResult = await db
      .select()
      .from(internshipApplications)
      .orderBy(desc(internshipApplications.createdAt))
      .limit(50);

    const certsResult = await db
      .select()
      .from(certificates)
      .orderBy(desc(certificates.createdAt))
      .limit(50);

    const formattedRecent: VisitorLog[] = recentVisits.map((v) => ({
      id: v.id,
      ip: v.ip,
      userAgent: v.userAgent,
      path: v.path,
      country: v.country,
      city: v.city,
      createdAt: v.createdAt instanceof Date ? v.createdAt.toISOString() : String(v.createdAt),
    }));

    const formattedCountries: CountryStat[] = (countryStatsResult.rows as unknown as { country: string | null; count: number }[]).map(
      (r) => ({
        country: r.country,
        count: Number(r.count || 0),
      })
    );

    const formattedApps: InternshipAppRow[] = appsResult.map((a) => ({
      id: a.id,
      fullName: a.fullName,
      email: a.email,
      phone: a.phone,
      college: a.college,
      degree: a.degree,
      graduationYear: a.graduationYear,
      domain: a.domain,
      mode: a.mode,
      internshipType: a.internshipType,
      duration: a.duration,
      githubUrl: a.githubUrl,
      linkedinUrl: a.linkedinUrl,
      portfolioUrl: a.portfolioUrl,
      resumeLink: a.resumeLink,
      statement: a.statement,
      status: a.status,
      githubRepo: a.githubRepo,
      liveUrl: a.liveUrl,
      googleFormSubmitted: a.googleFormSubmitted,
      feedbackRating: a.feedbackRating,
      feedbackText: a.feedbackText,
      paymentScreenshot: a.paymentScreenshot,
      paymentUtr: a.paymentUtr,
      paymentStatus: a.paymentStatus,
      certificateId: a.certificateId,
      lorStatus: a.lorStatus || "None",
      lorRefNumber: a.lorRefNumber,
      lorAppliedAt: a.lorAppliedAt ? (a.lorAppliedAt instanceof Date ? a.lorAppliedAt.toISOString() : String(a.lorAppliedAt)) : null,
      lorApprovedAt: a.lorApprovedAt ? (a.lorApprovedAt instanceof Date ? a.lorApprovedAt.toISOString() : String(a.lorApprovedAt)) : null,
      lorRemarks: a.lorRemarks,
      lorRejectionReason: a.lorRejectionReason,
      lorGrade: a.lorGrade || "Distinction (Top 1%)",
      createdAt: a.createdAt instanceof Date ? a.createdAt.toISOString() : String(a.createdAt),
    }));

    const formattedCerts: CertificateRow[] = certsResult.map((c) => ({
      id: c.id,
      studentName: c.studentName,
      studentEmail: c.studentEmail,
      domain: c.domain,
      mode: c.mode,
      internshipType: c.internshipType,
      college: c.college,
      duration: c.duration,
      grade: c.grade,
      issueDate: c.issueDate instanceof Date ? c.issueDate.toISOString() : String(c.issueDate),
      signatoryTitle: c.signatoryTitle,
      status: c.status,
      createdAt: c.createdAt instanceof Date ? c.createdAt.toISOString() : String(c.createdAt),
    }));

    return {
      total: Number(totalVisitors[0]?.count || 0),
      recent: formattedRecent,
      countries: formattedCountries,
      applications: formattedApps,
      certificatesList: formattedCerts,
    };
  } catch (error) {
    console.error("DB Error fetching admin stats:", error);
    return {
      total: 0,
      recent: [],
      countries: [],
      applications: [],
      certificatesList: [],
    };
  }
}

export default async function AdminPage() {
  const stats = await getStats();

  return (
    <AdminGuard>
      <div className="min-h-screen bg-black text-white p-6 md:p-10 selection:bg-cyan-500/30 selection:text-white">
        <AdminHeader />
        <AdminDashboardClient
          initialTotal={stats.total}
          initialRecent={stats.recent}
          initialCountries={stats.countries}
          initialApplications={stats.applications}
          initialCertificates={stats.certificatesList}
        />
      </div>
    </AdminGuard>
  );
}
