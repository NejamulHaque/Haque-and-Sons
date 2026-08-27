// apps/web/src/app/admin/AdminHeader.tsx
"use client";

import { LogOut } from "lucide-react";
import { signOut } from "@/lib/auth-client";

export function AdminHeader() {
  return (
    <header className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Admin Command Center
        </h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back, Nejamul. System operational.</p>
      </div>
      <button 
        onClick={() => signOut({ callbackURL: "/" })}
        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all text-sm"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    </header>
  );
}