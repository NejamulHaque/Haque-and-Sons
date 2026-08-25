import { Hero3D } from "@/components/Hero3D";
import { Services } from "@/components/Services";
import { Stats } from "@/components/Stats";
import { TechStack } from "@/components/TechStack";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero3D />
      <Stats />
      <Services />
      <TechStack />
      <CTA />
    </>
  );
}
