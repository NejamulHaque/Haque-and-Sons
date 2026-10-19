import type { Metadata } from "next";
import { InternshipHero } from "@/components/InternshipHero";
import { ProgramFeatures } from "@/components/ProgramFeatures";
import { DomainCards } from "@/components/DomainCards";
import { HowItWorks } from "@/components/HowItWorks";
import { ApplicationProcess } from "@/components/ApplicationProcess";
import { InternTestimonials } from "@/components/InternTestimonials";
import { InternshipFAQ } from "@/components/InternshipFAQ";
import { InternshipFinalCTA } from "@/components/InternshipFinalCTA";

// ✅ SEO OPTIMIZED METADATA
export const metadata: Metadata = {
  title: "Remote Tech Internships 2026 | Web Dev, AI & Cybersecurity | Haque Studio",
  description:
    "Launch your tech career with Haque Studio's structured remote internships. Master Next.js 16, AI/ML, and DevSecOps. Build real projects, get certified, and land your dream job.",
  keywords: [
    "remote internship 2026",
    "web development internship",
    "AI internship for students",
    "Next.js internship",
    "coding internship with certificate",
    "software engineering internship",
    "Haque Studio internships",
    "tech internship India",
  ],
  openGraph: {
    title: "Remote Tech Internships 2026 | Haque Studio",
    description: "10+ Domain Tracks. Real Projects. Industry Certification. Apply now for the 2026 batch.",
    images: ["/og-image.png"], // ✅ Uses your new custom OG image
    url: "https://haquestudio.me/internships",
    siteName: "Haque Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Remote Tech Internships 2026 | Haque Studio",
    description: "Master Next.js, AI & Cloud with our structured internship program.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://haquestudio.me/internships",
  },
};

// ✅ SCHEMA MARKUP FOR GOOGLE RICH RESULTS
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalProgram",
  "name": "Haque Studio Tech Internship Program",
  "description": "Structured remote internship programs in Web Development, AI/ML, and Cybersecurity for students.",
  "provider": {
    "@type": "Organization",
    "name": "Haque Studio",
    "sameAs": "https://haquestudio.me"
  },
  "educationalLevel": "Beginner to Intermediate",
  "timeToComplete": "P4W", // 4 Weeks
  "offers": {
    "@type": "Offer",
    "category": "Internship with Certification"
  }
};

export default function InternshipsPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-white">
      {/* ✅ Inject Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero Section */}
      <InternshipHero />

      {/* 2. Program Features Grid */}
      <ProgramFeatures />

      {/* 3. 11 Domain Tracks Grid */}
      <DomainCards />

      {/* 4. How It Works (4 Steps) */}
      <HowItWorks />

      {/* 5. Application Process & Criteria */}
      <ApplicationProcess />

      {/* 6. Intern Testimonials */}
      <InternTestimonials />

      {/* 7. FAQ Accordion */}
      <InternshipFAQ />

      {/* 8. Final Call to Action */}
      <InternshipFinalCTA />
    </div>
  );
}
