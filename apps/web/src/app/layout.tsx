import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

const baseUrl = "https://haqueandsons.vercel.app"; // Update this if you have a custom domain

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Haque & Sons | Next-Gen Software Studio",
    template: "%s | Haque & Sons",
  },
  description:
    "We build enterprise-grade AI, collaborative platforms, and financial software. Code smarter with real-world practice and comprehensive solutions.",
  keywords: [
    "web development",
    "AI solutions",
    "software studio",
    "Next.js",
    "React",
    "DevSecOps",
    "Haque and Sons",
    "Nejamul Haque",
  ],
  authors: [{ name: "Nejamul Haque", url: "https://github.com/NejamulHaque" }],
  creator: "Nejamul Haque",
  publisher: "Haque & Sons",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Haque & Sons",
    title: "Haque & Sons | Next-Gen Software Studio",
    description:
      "Enterprise-grade AI, collaborative platforms, and financial software.",
    images: [
      {
        url: "/og-image.png", // Ensure you have this image in /public
        width: 1200,
        height: 630,
        alt: "Haque & Sons",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Haque & Sons | Next-Gen Software Studio",
    description:
      "Enterprise-grade AI, collaborative platforms, and financial software.",
    images: ["/og-image.png"],
    creator: "@nejamulhaque",
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
  alternates: {
    canonical: baseUrl,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  verification: {
    google: "ODppaoTQS8GBiLvwbHsskXc7VAz_ati8QqVi5sFImKU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning is required for next-themes or manual theme toggling to prevent hydration mismatch
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Canonical URL fallback */}
        <link rel="canonical" href={baseUrl} />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieConsent />

        {/* Google Analytics - Replace G-XXXXXXXXXX with your actual Measurement ID */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
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