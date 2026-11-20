import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Software Development & Tech Internships | Haque Studio",
  description: "Haque Studio builds enterprise-grade Next.js 16 web apps, AI integrations, and DevSecOps pipelines. We also offer structured remote internships across 11+ tech domains.",
  alternates: { canonical: "https://haquestudio.me/services" },
  openGraph: {
    title: "Software Development & Tech Internships | Haque Studio",
    description: "Haque Studio builds enterprise-grade Next.js 16 web apps, AI integrations, and DevSecOps pipelines. We also offer structured remote internships across 11+ tech domains.",
    url: "https://haquestudio.me/services",
  },
};

const services = [
  {
    title: "Full-Stack Web Development",
    desc: "We architect blazing-fast, scalable web applications using the modern stack: Next.js 16, React 19, TypeScript, and Tailwind CSS.",
    icon: "💻",
    features: ["Next.js 16 & App Router", "Serverless Databases (Neon/Postgres)", "Tailwind CSS & Framer Motion", "SEO-Optimized Architecture"]
  },
  {
    title: "AI & LLM Integration",
    desc: "Transform your business with custom AI solutions. We build RAG pipelines, AI agents, and chatbots that actually understand your data.",
    icon: "🧠",
    features: ["LangChain & Vector DBs", "Custom GPT Integrations", "Automated AI Workflows", "Data Processing Pipelines"]
  },
  {
    title: "DevSecOps & Cloud Infrastructure",
    desc: "We don't just write code; we secure it. We set up bulletproof CI/CD pipelines, automated testing, and cloud deployments.",
    icon: "☁️",
    features: ["Docker & Kubernetes", "GitHub Actions CI/CD", "AWS & Vercel Deployments", "SAST & Security Audits"]
  },
  {
    title: "Mobile App Development",
    desc: "Cross-platform mobile applications that feel native. We use React Native and Expo to ship to iOS and Android simultaneously.",
    icon: "📱",
    features: ["React Native & Expo", "iOS & Android Deployment", "Push Notifications", "Offline-First Architecture"]
  },
  {
    title: "3D & Interactive UI/UX",
    desc: "Stand out from the competition with immersive 3D web experiences and high-converting, accessible user interfaces.",
    icon: "🎨",
    features: ["Three.js & React Three Fiber", "WebGL Shaders", "Figma to Code", "Accessibility (a11y) Compliance"]
  },
  {
    title: "Technical Consulting & Audits",
    desc: "Struggling with legacy code or performance bottlenecks? We audit your codebase and provide actionable, senior-level guidance.",
    icon: "🔍",
    features: ["Codebase Audits", "Performance Optimization", "Architecture Design", "Team Training"]
  }
];

const internshipHighlights = [
  { stat: "11+", label: "Specialized Tech Domains" },
  { stat: "100%", label: "Remote & Flexible" },
  { stat: "Real", label: "Production-Grade Projects" },
  { stat: "Verified", label: "Certificates & LORs" },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black text-white py-28 px-6 selection:bg-white selection:text-black">
      <div className="max-w-6xl mx-auto space-y-28">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto pt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-neutral-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Capabilities &amp; Engineering Disciplines</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08]">
            Enterprise Software &amp; <br />
            <span className="text-neutral-400">
              Next-Gen Talent Development.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Haque Studio partners with businesses to build scalable, AI-powered digital products, while simultaneously training the next generation of engineers through our structured internship programs.
          </p>
        </div>

        {/* B2B Services Grid */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/[0.08] pb-6">
            <div>
              <p className="text-xs uppercase tracking-widest font-mono text-neutral-500 mb-2">For Businesses</p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Software Services</h2>
            </div>
            <p className="text-sm text-neutral-400 max-w-md mt-2 md:mt-0 font-normal">
              High-velocity software engineering, production AI integration, and hardened cloud infrastructure.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="p-8 bg-[#0c0c0e] border border-white/[0.08] rounded-3xl hover:border-white/20 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-2xl mb-6 group-hover:scale-105 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold tracking-tight mb-3 text-white">{service.title}</h3>
                  <p className="text-neutral-400 text-sm mb-6 leading-relaxed font-normal">{service.desc}</p>
                </div>
                <ul className="space-y-2.5 pt-4 border-t border-white/[0.06]">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs text-neutral-300 font-normal">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* --- NEW: Internship Programs Section --- */}
        <section className="p-8 md:p-14 bg-[#0c0c0e] border border-white/[0.08] rounded-3xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="max-w-3xl mb-12">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-neutral-300 text-xs font-mono mb-4">
                For Students &amp; Aspiring Engineers
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
                Structured Tech Internship Programs
              </h2>
              <p className="text-neutral-400 text-base md:text-lg leading-relaxed font-normal">
                We don&apos;t just build software; we build engineers. Our remote internship programs bridge the gap between college theory and industry reality across 11+ specialized domains.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {internshipHighlights.map((item, i) => (
                <div key={i} className="p-5 bg-black/60 rounded-2xl border border-white/[0.06]">
                  <div className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-1">{item.stat}</div>
                  <div className="text-xs text-neutral-400 font-normal">{item.label}</div>
                </div>
              ))}
            </div>

            {/* What Students Learn */}
            <div className="grid md:grid-cols-3 gap-5 mb-10">
              <div className="p-6 bg-black/60 rounded-2xl border border-white/[0.06]">
                <h3 className="font-semibold text-white mb-2 text-sm">🛠️ Real-World Stack</h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-normal">Master Next.js 16, React 19, TypeScript, Tailwind, and Neon Postgres.</p>
              </div>
              <div className="p-6 bg-black/60 rounded-2xl border border-white/5">
                <h3 className="font-semibold text-white mb-2 text-sm">🔒 DevSecOps Focus</h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-normal">Learn SAST, secret scanning, CI/CD, and automated testing pipelines.</p>
              </div>
              <div className="p-6 bg-black/60 rounded-2xl border border-white/5">
                <h3 className="font-semibold text-white mb-2 text-sm">🤖 AI &amp; Automation</h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-normal">Build RAG pipelines, AI agents, and integrate LLMs into production apps.</p>
              </div>
            </div>

            <div>
              <Link 
                href="/internships" 
                className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-all duration-200"
              >
                Explore All 11+ Internship Tracks →
              </Link>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs uppercase tracking-widest font-mono text-neutral-500 mb-2">Methodology</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">How We Work</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery", desc: "We analyze your requirements and architect the perfect technical solution." },
              { step: "02", title: "Design", desc: "We create high-fidelity UI/UX mockups and database schemas." },
              { step: "03", title: "Development", desc: "Agile sprints with weekly demos. You see progress every step of the way." },
              { step: "04", title: "Deployment", desc: "Rigorous testing, security audits, and seamless cloud deployment." }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-[#0c0c0e] border border-white/[0.08] rounded-3xl">
                <div className="text-2xl font-mono font-bold text-neutral-600 mb-4">{item.step}</div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{item.title}</h3>
                <p className="text-neutral-400 text-xs leading-relaxed font-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack Marquee */}
        <section className="text-center">
          <p className="text-xs uppercase tracking-widest font-mono text-neutral-500 mb-4">Under The Hood</p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-8">Our Core Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
            {["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js", "Python", "Docker", "AWS", "Vercel", "Three.js", "LangChain"].map((tech) => (
              <span key={tech} className="px-4 py-2 rounded-full bg-[#0c0c0e] border border-white/[0.08] text-xs font-mono text-neutral-300">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="text-center p-12 md:p-16 bg-[#0c0c0e] rounded-3xl border border-white/[0.08]">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Ready to collaborate?</h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto text-sm md:text-base font-normal leading-relaxed">
            Whether you are a business looking to build your next product, or a student ready to launch your tech career, we have a path for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <Link 
              href="/#contact" 
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-all duration-200"
            >
              Hire Us for a Project
            </Link>
            <Link 
              href="/internships" 
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-white text-sm font-medium transition-all duration-200"
            >
              Apply for an Internship
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
