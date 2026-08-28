import { AdminGuard } from "@/components/AdminGuard";
import { db } from "@/db";
import { visitors } from "@/db/schema";
import { desc, sql } from "drizzle-orm";
import { AdminHeader } from "./AdminHeader";
import { AdminDashboardClient, type VisitorLog, type CountryStat } from "./AdminDashboardClient";

export const dynamic = "force-dynamic";

async function getStats(): Promise<{
  total: number;
  recent: VisitorLog[];
  countries: CountryStat[];
}> {
  try {
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

    return {
      total: Number(totalVisitors[0]?.count || 0),
      recent: formattedRecent,
      countries: formattedCountries,
    };
  } catch (error) {
    console.error("DB Error fetching admin stats:", error);
    return {
      total: 0,
      recent: [],
      countries: [],
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
        />
      </div>
    </AdminGuard>
  );
}
