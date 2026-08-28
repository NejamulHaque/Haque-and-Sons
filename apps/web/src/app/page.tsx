import { Hero3D } from "@/components/Hero3D";
import { Stats } from "@/components/Stats";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { ProjectCalculator } from "@/components/ProjectCalculator";
import { Features } from "@/components/Features";
import { Process } from "@/components/Process";
import { TechStack } from "@/components/TechStack";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero3D />
      <Stats />
      <About />
      <Services />
      <ProjectShowcase />
      <ProjectCalculator />
      <Features />
      <Process />
      <TechStack />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
