import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#2e2b24] bg-[#111214]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-sm text-amber-400">&lt;</span>
              <span className="font-bold text-white text-lg">Austin Shen</span>
              <span className="font-mono text-sm text-amber-400">/&gt;</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              CS, Math &amp; Data Science @ University of Michigan.<br />
              Building at the intersection of AI and formal reasoning.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "Projects", href: "/projects" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-slate-500 hover:text-amber-400 text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/A2DR1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-amber-400 text-sm transition-colors flex items-center gap-2"
                >
                  <GithubIcon /> GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/austin-zj-shen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-amber-400 text-sm transition-colors flex items-center gap-2"
                >
                  <LinkedinIcon /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:austinsz@umich.edu"
                  className="text-slate-500 hover:text-amber-400 text-sm transition-colors flex items-center gap-2"
                >
                  <MailIcon /> austinsz@umich.edu
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#2e2b24] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Austin Shen. All rights reserved.
          </p>
          <p className="text-slate-600 text-sm font-mono">
            Built with Next.js · Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}

function GithubIcon() {
  return (
    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
