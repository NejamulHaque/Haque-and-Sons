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

const baseUrl = "https://haqueandsons.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Haque & Sons | Next-Gen Software & AI Studio",
    template: "%s | Haque & Sons",
  },
  description:
    "Experience the future of digital engineering. Haque & Sons architects enterprise-grade AI, 3D interactive platforms, and financial software using Next.js 16.",
  keywords: [
    "Nejamul Haque",
    "Haque and Sons",
    "Next.js 16",
    "React 19",
    "Three.js",
    "Web Development",
    "AI Solutions",
    "DevSecOps",
    "Full-Stack Engineer",
    "Portfolio",
  ],
  authors: [{ name: "Nejamul Haque", url: "https://github.com/NejamulHaque" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Haque & Sons",
    title: "Haque & Sons | Building the Future of Software",
    description:
      "Interactive 3D portfolio & AI software studio by Nejamul Haque. Built with Next.js 16, React Three Fiber, and Tailwind CSS.",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "Haque & Sons Studio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Haque & Sons | Next-Gen Software Studio",
    description: "Interactive 3D portfolio & AI software studio by Nejamul Haque.",
    images: ["/logo.svg"],
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://haqueandsons.vercel.app/#organization",
      "name": "Haque & Sons",
      "url": "https://haqueandsons.vercel.app",
      "logo": "https://haqueandsons.vercel.app/logo.svg",
      "founder": {
        "@type": "Person",
        "name": "Nejamul Haque",
        "jobTitle": "Lead Full-Stack Engineer & Founder",
        "url": "https://github.com/NejamulHaque"
      },
      "sameAs": [
        "https://github.com/NejamulHaque",
        "https://www.linkedin.com/in/nejamulhaque",
        "https://x.com/Nejamul_Haque_"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://haqueandsons.vercel.app/#website",
      "url": "https://haqueandsons.vercel.app",
      "name": "Haque & Sons Software Studio",
      "publisher": {
        "@id": "https://haqueandsons.vercel.app/#organization"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href={baseUrl} />
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
