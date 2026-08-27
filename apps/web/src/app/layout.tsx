import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { ShareButtons } from "@/components/ShareButtons";
import Script from "next/script";
import { Tracker } from "@/components/Tracker";


const inter = Inter({ subsets: ["latin"] });

// IMPORTANT: Replace this with your actual deployed URL
const baseUrl = "https://haqueandsons.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Haque & Sons | Next-Gen Software Studio",
    template: "%s | Haque & Sons",
  },
  description:
    "Experience the future of web development. Haque & Sons builds enterprise-grade AI, 3D interactive platforms, and financial software using Next.js 16.",
  keywords: [
    "Nejamul Haque",
    "Haque and Sons",
    "Next.js 16",
    "Three.js",
    "Web Development",
    "AI Solutions",
    "Portfolio"
  ],
  authors: [{ name: "Nejamul Haque", url: "https://github.com/NejamulHaque" }],
  
  // --- SOCIAL MEDIA PREVIEW CONFIGURATION ---
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Haque & Sons",
    title: "Haque & Sons | Building the Future of Software",
    description: "Interactive 3D portfolio & AI software studio by Nejamul Haque. Built with Next.js 16, Three.js, and Tailwind CSS v4.",
    images: [
      {
        url: "/og-image.png", // YOU MUST CREATE THIS IMAGE (1200x630px)
        width: 1200,
        height: 630,
        alt: "Haque & Sons Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Haque & Sons | Next-Gen Software Studio",
    description: "Interactive 3D portfolio & AI software studio. Check out the live demo!",
    images: ["/og-image.png"],
    creator: "@Nejamul_Haque_",
  },
  // ------------------------------------------

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href={baseUrl} />
      </head>
      <body className={`${inter.className} antialiased bg-black text-white`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
        <ShareButtons />
        <Tracker />
        
        {/* Analytics placeholder */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
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