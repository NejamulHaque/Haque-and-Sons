import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
});

// Export Better Auth primitives
export const { signIn, signUp, signOut, useSession } = authClient;

/**
 * Universal logout helper that:
 * 1. Calls Better Auth client signOut()
 * 2. Calls server-side /api/auth/logout to expire and clear all cookies
 * 3. Clears local and session storage
 * 4. Force-replaces location to clear React and in-memory caches
 */
export async function performSecureSignOut(redirectTo: string = "/auth/signin") {
  try {
    await signOut();
  } catch (err) {
    console.warn("Better Auth client signOut notice:", err);
  }

  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch (err) {
    console.warn("Server logout route notice:", err);
  }

  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem("better-auth.session");
      localStorage.removeItem("better-auth.session_token");
      localStorage.removeItem("better-auth.session_data");
      sessionStorage.clear();

      // Clear any non-httpOnly cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
    } catch {}

    window.location.replace(redirectTo);
  }
}