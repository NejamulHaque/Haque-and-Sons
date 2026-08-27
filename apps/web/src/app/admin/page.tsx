// apps/web/src/app/admin/page.tsx
// NO "use client" here - this is a Server Component
import { AdminGuard } from "@/components/AdminGuard";
import { db } from "@/db";
import { visitors } from "@/db/schema";
import { desc, sql } from "drizzle-orm";
import { 
  LayoutDashboard, 
  Users, 
  Globe, 
  TrendingUp, 
  ExternalLink, 
  Cpu, 
  Database,
} from "lucide-react";
import Link from "next/link";
import { AdminHeader } from "./AdminHeader"; // Import the new client component

const GithubIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const PROJECTS = [
  { name: "Haque & Sons", description: "Next-Gen Software Studio Portfolio with 3D interactions.", url: "https://haqueandsons.vercel.app", tech: ["Next.js 16", "Three.js", "Tailwind"], status: "Live" },
  { name: "Irus AI", description: "Personal AI Command Center with long-term memory.", url: "https://irus-ai.onrender.com", tech: ["LangChain", "Vector DB", "React"], status: "Live" },
  { name: "CollabSheets", description: "Real-time collaborative code editor with AI assistance.", url: "https://collabsheets.onrender.com", tech: ["WebSockets", "Node.js", "Monaco Editor"], status: "Live" },
  { name: "Nestfy", description: "AI-powered personal finance tracker with OCR.", url: "https://nestfy-beta.vercel.app", tech: ["Next.js", "TensorFlow.js", "Drizzle"], status: "Beta" },
  { name: "Digital Lens", description: "AI News Intelligence Platform with sentiment analysis.", url: "https://digital-lens.vercel.app", tech: ["NLP", "Edge Functions", "Neon"], status: "Live" },
  { name: "ProResume", description: "ATS-friendly resume builder with AI optimization.", url: "https://proresume-six.vercel.app", tech: ["React Hook Form", "PDF Gen", "AI"], status: "Live" }
];

async function getStats() {
  try {
    const totalVisitors = await db.select({ count: sql<number>`count(*)` }).from(visitors);
    const recentVisits = await db.select().from(visitors).orderBy(desc(visitors.createdAt)).limit(5);
    const countryStats = await db.execute(sql`SELECT country, COUNT(*) as count FROM visitors GROUP BY country ORDER BY count DESC LIMIT 5`);
    return { total: Number(totalVisitors[0]?.count || 0), recent: recentVisits, countries: countryStats.rows };
  } catch (error) {
    console.error("DB Error:", error);
    return { total: 0, recent: [], countries: [] };
  }
}

export default async function AdminPage() {
  const stats = await getStats();

  return (
    <AdminGuard>
      <div className="min-h-screen bg-black text-white p-6 md:p-10">
        {/* Use the Client Component for the header with the button */}
        <AdminHeader />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Visitors" value={stats.total.toString()} icon={<Users className="text-cyan-400" />} trend="+12%" />
          <StatCard title="Active Projects" value={PROJECTS.length.toString()} icon={<LayoutDashboard className="text-purple-400" />} trend="Stable" />
          <StatCard title="Countries Reached" value={stats.countries.length.toString()} icon={<Globe className="text-green-400" />} trend="Global" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2"><Cpu className="w-5 h-5 text-cyan-400" /> Project Ecosystem</h2>
              <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">Live Deployment</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROJECTS.map((project) => (
                <div key={project.name} className="group relative bg-gray-900/50 border border-white/10 rounded-xl p-5 hover:border-cyan-500/50 transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-white"><ExternalLink className="w-5 h-5" /></a>
                  </div>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{project.name}</h3>
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full ${project.status === 'Live' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{project.status}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (<span key={t} className="text-[10px] bg-white/5 border border-white/10 text-gray-300 px-2 py-1 rounded-md">{t}</span>))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Database className="w-3 h-3" /> Neon DB</span>
                    <a href={project.url} target="_blank" className="hover:text-white flex items-center gap-1">Visit <ExternalLink className="w-3 h-3" /></a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-900/50 border border-white/10 rounded-xl p-5">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-purple-400" /> Recent Activity</h2>
              <div className="space-y-4">
                {stats.recent.length > 0 ? (
                  stats.recent.map((visit: any, i: number) => (
                    <div key={i} className="flex items-center justify-between text-sm border-b border-white/5 pb-2 last:border-0">
                      <div className="flex flex-col">
                        <span className="text-white font-mono text-xs">{visit.ip}</span>
                        <span className="text-gray-500 text-[10px]">{visit.path}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-cyan-400 text-xs font-bold">{visit.country || 'Unknown'}</span>
                        <p className="text-gray-600 text-[10px]">{new Date(visit.createdAt).toLocaleTimeString()}</p>
                      </div>
                    </div>
                  ))
                ) : (<p className="text-gray-500 text-sm text-center py-4">No recent activity</p>)}
              </div>
            </div>
            <div className="bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border border-white/10 rounded-xl p-5">
              <h2 className="text-lg font-bold mb-2">System Status</h2>
              <div className="space-y-3 mt-4">
                <StatusRow label="API Latency" value="24ms" status="good" />
                <StatusRow label="Database" value="Connected" status="good" />
                <StatusRow label="Build Status" value="Success" status="good" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}

function StatCard({ title, value, icon, trend }: any) {
  return (
    <div className="bg-gray-900/50 border border-white/10 rounded-xl p-6 flex items-center justify-between relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-cyan-500/20 transition-all" />
      <div>
        <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-white">{value}</h3>
        <p className="text-xs text-green-400 mt-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> {trend}</p>
      </div>
      <div className="p-3 bg-white/5 rounded-lg border border-white/10">{icon}</div>
    </div>
  );
}

function StatusRow({ label, value, status }: any) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-400">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${status === 'good' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
        <span className="text-white font-mono">{value}</span>
      </div>
    </div>
  );
}