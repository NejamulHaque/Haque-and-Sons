import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { ShareButtons } from "@/components/ShareButtons";
import { CommandPalette } from "@/components/CommandPalette";
import { SmoothScroll } from "@/components/SmoothScroll";
import { AuthModal } from "@/components/AuthModal";
import Script from "next/script";
import { Tracker } from "@/components/Tracker";

// ✅ UPDATED: New domain
const baseUrl = "https://haquestudio.me";

// ✅ FIXED: Clean metadata object (removed duplicates and broken syntax)
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Haque Studio | Software Engineering & Internships",
    template: "%s | Haque Studio",
  },
  description:
    "Haque Studio architects enterprise-grade AI, 3D interactive platforms, and financial software using Next.js 16. Launch your tech career with our structured internship programs.",
  keywords: [
    "Haque Studio",
    "Nejamul Haque",
    "Next.js 16",
    "React 19",
    "Three.js",
    "Web Development Internship",
    "AI Internship",
    "DevSecOps",
    "Software Engineering",
    "Tech Internship 2026",
  ],
  authors: [{ name: "Nejamul Haque", url: "https://github.com/NejamulHaque" }],
  creator: "Nejamul Haque",
  publisher: "Haque Studio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Haque Studio",
    title: "Haque Studio | Building the Future of Software",
    description:
      "Enterprise-grade AI, 3D platforms & structured internship programs. Launch your tech career with Haque Studio.",
    images: [
      {
        url: "/og-image.png", // ⚠️ Create a 1200x630 image at public/og-image.png
        width: 1200,
        height: 630,
        alt: "Haque Studio - Software Engineering & Internships",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Haque Studio | Next-Gen Software Studio",
    description: "Enterprise AI, 3D platforms & internship programs for students.",
    images: ["/og-image.png"],
    creator: "@Nejamul_Haque_",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  alternates: {
    canonical: baseUrl,
  },
};

// ✅ UPDATED: JSON-LD with new domain URLs
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      "name": "Haque Studio",
      "url": baseUrl,
      "logo": `${baseUrl}/logo.svg`,
      "description": "Software engineering studio specializing in AI, 3D platforms, and structured tech internship programs.",
      "founder": {
        "@type": "Person",
        "name": "Nejamul Haque",
        "jobTitle": "Lead Full-Stack Engineer & Founder",
        "url": "https://github.com/NejamulHaque",
      },
      "sameAs": [
        "https://github.com/NejamulHaque",
        "https://www.linkedin.com/in/nejamulhaque",
        "https://x.com/Nejamul_Haque_",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      "url": baseUrl,
      "name": "Haque Studio",
      "publisher": {
        "@id": `${baseUrl}/#organization`,
      },
    },
    {
      "@type": "EducationalOccupationalProgram",
      "name": "Haque Studio Internship Program",
      "description": "Structured remote internship programs in Web Development, AI/ML, and Cybersecurity for students.",
      "provider": {
        "@id": `${baseUrl}/#organization`,
      },
      "educationalLevel": "Beginner to Intermediate",
      "timeToComplete": "P4W",
      "offers": {
        "@type": "Offer",
        "category": "Internship with Certification",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
                  if (saved === 'light' || (!saved && prefersLight && false)) {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased bg-black text-white selection:bg-cyan-500/30 selection:text-white">
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CookieConsent />
          <ShareButtons />
          <CommandPalette />
          <Tracker />
          <AuthModal />
        </SmoothScroll>

        <Script id="sw-dev-cleanup" strategy="beforeInteractive">
          {`
            if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && 'serviceWorker' in navigator) {
              navigator.serviceWorker.getRegistrations().then(function(registrations) {
                for (var r of registrations) { r.unregister(); }
              });
            }
          `}
        </Script>

        {process.env.NEXT_PUBLIC_GA_ID && process.env.NODE_ENV === "production" && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}