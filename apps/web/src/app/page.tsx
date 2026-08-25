import { Hero3D } from "@/components/Hero3D";
import { Stats } from "@/components/Stats";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { TechStack } from "@/components/TechStack";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero3D />
      <Stats />
      <Services />
      <Process />
      <TechStack />
      <Testimonials />
      <CTA />
    </>
  );
}
