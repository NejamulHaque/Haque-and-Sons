"use client";

import { useState } from "react";
import { LogOut, ExternalLink, RefreshCw } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export function AdminHeader({ onRefresh, isRefreshing }: { onRefresh?: () => void; isRefreshing?: boolean }) {
  const [loggingOut, setLoggingOut] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    setLoggingOut(true);
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/admin/signin");
            router.refresh();
          },
        },
      });
      router.push("/admin/signin");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
      router.push("/admin/signin");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-xl border-b border-white/10 px-6 py-4 -mx-6 md:-mx-10 -mt-6 md:-mt-10 mb-8 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-600 p-1 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:scale-105 transition-all">
              <Image src="/logo.svg" alt="Haque & Sons" fill sizes="36px" className="p-1 object-cover" unoptimized />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base tracking-tight">Haque & Sons</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                  Command OS
                </span>
              </div>
              <p className="text-[11px] text-gray-400">Next-Gen Software Studio Infrastructure</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-[11px]">Systems Operational</span>
          </div>
        </div>

        {/* Right: User profile, Refresh, View Site, Logout */}
        <div className="flex items-center gap-3 self-end md:self-center">
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              title="Refresh telemetry"
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-gray-300 hover:text-white transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-cyan-400" : ""}`} />
            </button>
          )}

          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-gray-300 hover:text-white transition-all"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
          </Link>

          {/* User Pill */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10">
            <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 text-xs font-bold">
              {session?.user?.name ? session.user.name.charAt(0) : "N"}
            </div>
            <div className="text-left hidden sm:block">
              <span className="block text-xs font-bold text-white leading-tight">
                {session?.user?.name || "Nejamul Haque"}
              </span>
              <span className="block text-[10px] text-cyan-400/80 font-mono leading-none">
                Admin
              </span>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            disabled={loggingOut}
            className="flex items-center gap-2 px-3.5 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 hover:text-red-200 rounded-xl transition-all text-xs font-semibold cursor-pointer disabled:opacity-50 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
          >
            {loggingOut ? (
              <span className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
            ) : (
              <LogOut className="w-4 h-4" />
            )}
            <span>{loggingOut ? "Signing Out..." : "Sign Out"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
