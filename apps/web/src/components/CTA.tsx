import { Mail } from "lucide-react";

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.29 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.28-1.56 3.285-1.245 3.285-1.245.675 1.65.255 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function CTA() {
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-black to-gray-950 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Ready to Build Something Great?</h2>
        <p className="text-gray-400 mb-10 text-lg">
          Whether you need a custom AI solution, collaborative platform, or secure software
          architecture — let's talk.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="mailto:nejamulhaque.works@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-full transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)]"
          >
            <Mail size={18} /> Email Us
          </a>
          <div className="flex gap-4">
            <a
              href="https://github.com/NejamulHaque"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
              aria-label="GitHub"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href="https://linkedin.com/in/nejamulhaque"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={20} />
            </a>
          </div>
        </div>
        <p className="mt-12 text-xs text-gray-600">© 2026 Haque & Sons. All rights reserved.</p>
      </div>
    </section>
  );
}
