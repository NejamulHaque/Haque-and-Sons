"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client"; // Assuming you have better-auth client setup
import { Loader2, ShieldAlert } from "lucide-react";

const ADMIN_EMAIL = "nejamulhaque.works@gmail.com";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!isPending) {
      if (!session) {
        router.push("/auth/signin"); // Redirect to login if not logged in
      } else if (session.user.email !== ADMIN_EMAIL) {
        router.push("/"); // Redirect to home if not admin
      } else {
        setIsAuthorized(true);
      }
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-gray-400">You do not have permission to view this page.</p>
      </div>
    );
  }

  return <>{children}</>;
}