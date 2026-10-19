import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Best B.Tech CSE Internship 2026 | Remote & Certified | Haque Studio",
  description: "Structured remote internship for B.Tech CS students. Learn Next.js 16, AI/ML & DevSecOps. Get verified certificate + LOR. Apply now!",
  alternates: { canonical: "https://haquestudio.me/internships/btech-computer-science" },
};

export default function BTechInternshipPage() {
  return (
    <div className="min-h-screen bg-black text-white py-24 px-6 max-w-4xl mx-auto">
      {/* H1: Exact Match Keyword */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
        Best B.Tech Computer Science Internship in 2026
      </h1>
      
      <p className="text-xl text-gray-300 mb-8 leading-relaxed">
        Stop building toy projects. Join Haque Studio's structured program designed specifically for 
        B.Tech CS students who want industry-ready skills in Next.js 16, AI, and Cloud Engineering.
      </p>

      {/* Why This Matters Section - Targets Student Pain Points */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-cyan-400">Why B.Tech Students Choose Haque Studio</h2>
        <ul className="space-y-4 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-cyan-400 mt-1">✅</span>
            <span><strong>Next.js 16 & React 19:</strong> Learn the exact stack top startups use in 2026.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-cyan-400 mt-1">✅</span>
            <span><strong>DevSecOps Pipeline:</strong> Master SAST, secret scanning, and CI/CD — skills most grads lack.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-cyan-400 mt-1">✅</span>
            <span><strong>Verified Certificate:</strong> Cryptographically verifiable credential for your LinkedIn.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-cyan-400 mt-1">✅</span>
            <span><strong>Real Projects:</strong> Build AI command centers, not todo apps.</span>
          </li>
        </ul>
      </section>

      {/* Curriculum Preview - Builds Trust */}
      <section className="mb-12 p-6 bg-white/5 rounded-xl border border-white/10">
        <h2 className="text-2xl font-bold mb-4">What You'll Build</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-black/40 rounded-lg border border-white/5">
            <h3 className="font-bold text-cyan-400 mb-2">AI Command Center</h3>
            <p className="text-sm text-gray-400">RAG, Vector DBs, LangChain integration</p>
          </div>
          <div className="p-4 bg-black/40 rounded-lg border border-white/5">
            <h3 className="font-bold text-cyan-400 mb-2">Real-Time Collab Tool</h3>
            <p className="text-sm text-gray-400">WebSockets, OT/CRDTs, Docker sandboxing</p>
          </div>
        </div>
      </section>

      {/* Internal Linking - Passes Authority to Main Page */}
      <section className="mb-12">
        <p className="text-gray-300 mb-4">
          Looking for other tracks? We also offer specialized internships in 
          <Link href="/internships/artificial-intelligence" className="text-cyan-400 hover:underline mx-1">AI/ML</Link>, 
          <Link href="/internships/cybersecurity" className="text-cyan-400 hover:underline mx-1">Cybersecurity</Link>, and 
          <Link href="/internships/delhi-ncr" className="text-cyan-400 hover:underline mx-1">Delhi NCR</Link>.
        </p>
      </section>

      {/* Primary CTA */}
      <div className="text-center mt-12 p-8 bg-gradient-to-b from-cyan-900/20 to-transparent rounded-2xl border border-cyan-500/20">
        <h3 className="text-2xl font-bold mb-4">Ready to Launch Your Career?</h3>
        <Link 
          href="/internships?domain=web-development" 
          className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all transform hover:-translate-y-1"
        >
          Apply for B.Tech CS Track →
        </Link>
        <p className="mt-4 text-sm text-gray-500">Open to all B.Tech, BCA, MCA & self-taught students</p>
      </div>
    </div>
  );
}