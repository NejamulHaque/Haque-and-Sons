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
    <div className="min-h-screen bg-black text-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Hero Section */}
        <div className="text-center mb-20 pt-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Enterprise Software &amp; <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Next-Gen Talent Development
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Haque Studio partners with businesses to build scalable, AI-powered digital products, while simultaneously training the next generation of engineers through our structured internship programs.
          </p>
        </div>

        {/* B2B Services Grid */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">For Businesses: Software Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="text-cyan-400">✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* --- NEW: Internship Programs Section --- */}
        <div className="mb-24 p-8 md:p-12 bg-gradient-to-br from-cyan-900/20 to-blue-900/10 border border-cyan-500/30 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-semibold mb-4 border border-cyan-500/20">
                For Students &amp; Aspiring Engineers
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Structured Tech Internship Programs
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                We don&apos;t just build software; we build engineers. Our remote internship programs bridge the gap between college theory and industry reality across 11+ specialized domains.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {internshipHighlights.map((item, i) => (
                <div key={i} className="text-center p-4 bg-black/40 rounded-xl border border-white/5">
                  <div className="text-3xl font-bold text-cyan-400 mb-1">{item.stat}</div>
                  <div className="text-sm text-gray-400">{item.label}</div>
                </div>
              ))}
            </div>

            {/* What Students Learn */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="p-6 bg-black/30 rounded-xl border border-white/5">
                <h3 className="font-bold text-white mb-2">🛠️ Real-World Stack</h3>
                <p className="text-sm text-gray-400">Master Next.js 16, React 19, TypeScript, Tailwind, and Neon Postgres.</p>
              </div>
              <div className="p-6 bg-black/30 rounded-xl border border-white/5">
                <h3 className="font-bold text-white mb-2">🔒 DevSecOps Focus</h3>
                <p className="text-sm text-gray-400">Learn SAST, secret scanning, CI/CD, and automated testing pipelines.</p>
              </div>
              <div className="p-6 bg-black/30 rounded-xl border border-white/5">
                <h3 className="font-bold text-white mb-2">🤖 AI &amp; Automation</h3>
                <p className="text-sm text-gray-400">Build RAG pipelines, AI agents, and integrate LLMs into production apps.</p>
              </div>
            </div>

            <div className="text-center">
              <Link 
                href="/internships" 
                className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all transform hover:-translate-y-1"
              >
                Explore All 11+ Internship Tracks →
              </Link>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">How We Work</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "We analyze your requirements and architect the perfect technical solution." },
              { step: "02", title: "Design", desc: "We create high-fidelity UI/UX mockups and database schemas." },
              { step: "03", title: "Development", desc: "Agile sprints with weekly demos. You see progress every step of the way." },
              { step: "04", title: "Deployment", desc: "Rigorous testing, security audits, and seamless cloud deployment." }
            ].map((item, i) => (
              <div key={i} className="text-center p-4">
                <div className="text-5xl font-bold text-cyan-500/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Marquee */}
        <div className="text-center mb-24">
          <h2 className="text-2xl font-bold mb-8 text-gray-300">Our Core Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-4 text-gray-400 font-mono text-sm">
            {["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js", "Python", "Docker", "AWS", "Vercel", "Three.js", "LangChain"].map((tech) => (
              <span key={tech} className="px-4 py-2 bg-white/5 rounded-full border border-white/10">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Dual CTA Section */}
        <div className="text-center p-12 bg-white/5 rounded-3xl border border-white/10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to collaborate?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Whether you are a business looking to build your next product, or a student ready to launch your tech career, we have a path for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/#contact" 
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all"
            >
              Hire Us for a Project
            </Link>
            <Link 
              href="/internships" 
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/10"
            >
              Apply for an Internship
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
