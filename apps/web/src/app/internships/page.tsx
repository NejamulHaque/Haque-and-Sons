import type { Metadata } from "next";
import { InternshipHero } from "@/components/InternshipHero";
import { ProgramFeatures } from "@/components/ProgramFeatures";
import { DomainCards } from "@/components/DomainCards";
import { HowItWorks } from "@/components/HowItWorks";
import { ApplicationProcess } from "@/components/ApplicationProcess";
import { InternTestimonials } from "@/components/InternTestimonials";
import { InternshipFAQ } from "@/components/InternshipFAQ";
import { InternshipFinalCTA } from "@/components/InternshipFinalCTA";

export const metadata: Metadata = {
  title: "Internship Programs | Haque & Sons",
  description:
    "Launch your tech career with structured internship programs in Web Development, AI/ML, Cybersecurity, and more. Get certified, build portfolio, and get hired.",
  keywords: [
    "internship",
    "web development internship",
    "AI internship",
    "coding internship",
    "tech internship",
    "software engineering internship",
  ],
  openGraph: {
    title: "Internship Programs | Haque & Sons",
    description: "11 domain tracks, real projects, industry certification",
    images: ["/logo.svg"],
  },
};

export default function InternshipsPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-white">
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
