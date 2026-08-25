import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/[0.06] py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Haque & Sons</h3>
          <p className="text-gray-400 text-sm">Next-gen software studio building enterprise-grade AI, collaborative platforms, and financial software.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Services</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/#services" className="hover:text-cyan-400 transition-colors">Web Development</Link></li>
            <li><Link href="/#services" className="hover:text-cyan-400 transition-colors">AI Solutions</Link></li>
            <li><Link href="/#services" className="hover:text-cyan-400 transition-colors">DSA Training</Link></li>
            <li><Link href="/#services" className="hover:text-cyan-400 transition-colors">Business Analytics</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Company</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/blog" className="hover:text-cyan-400 transition-colors">Blog</Link></li>
            <li><Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
            <li><Link href="/#contact" className="hover:text-cyan-400 transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Connect</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="https://github.com/NejamulHaque" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">GitHub</a></li>
            <li><a href="https://linkedin.com/in/nejamulhaque" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">LinkedIn</a></li>
            <li><a href="mailto:nejamulhaque.works@gmail.com" className="hover:text-cyan-400 transition-colors">Email</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/[0.06] text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Haque & Sons. All rights reserved.</p>
      </div>
    </footer>
  );
}
