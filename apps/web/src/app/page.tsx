import { Hero3D } from "@/components/Hero3D";
import { Stats } from "@/components/Stats";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Features } from "@/components/Features";
import { Process } from "@/components/Process";
import { TechStack } from "@/components/TechStack";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { ShareButtons } from "@/components/ShareButtons";

export default function Home() {
  return (
    <>
      <ShareButtons />
      <Hero3D />
      <Stats />
      <About />
      <Services />
      <Features />
      <Process />
      <TechStack />
      <Testimonials />
      <FAQ />
      <ProjectShowcase /> {/* Added Here */}
      <CTA />
    </>
  );
}
