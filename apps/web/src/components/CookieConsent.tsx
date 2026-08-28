"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function CookieConsent() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem("cookie-consent");
    if (!hasConsented) {
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
    // Initialize analytics here if needed
    if (typeof window !== "undefined" && "gtag" in window) {
      const gtagFn = (window as unknown as { gtag: (...args: unknown[]) => void }).gtag;
      if (typeof gtagFn === "function") {
        gtagFn("consent", "update", {
          analytics_storage: "granted",
        });
      }
    }
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 z-50 p-6 rounded-2xl bg-gray-900/95 backdrop-blur-xl border border-white/[0.08] shadow-2xl"
        >
          <h3 className="text-sm font-semibold text-white mb-2">Cookie Consent</h3>
          <p className="text-xs text-gray-400 mb-4">
            We use cookies to enhance your experience and analyze site traffic. By clicking &ldquo;Accept&rdquo;, you consent to our use of cookies.
          </p>
          <div className="flex gap-3">
            <button
              onClick={acceptCookies}
              className="flex-1 px-4 py-2 text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
            >
              Accept
            </button>
            <button
              onClick={declineCookies}
              className="flex-1 px-4 py-2 text-xs font-semibold text-gray-300 bg-white/[0.06] hover:bg-white/[0.1] rounded-lg transition-colors"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
