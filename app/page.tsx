"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const HeroScene = dynamic(() => import("@/components/HeroScene"), {
  ssr: false,
});

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const skills = [
  { category: "Languages", items: ["Python", "C++", "C", "Java", "JavaScript", "TypeScript", "SQL", "R", "Golang", "Verilog", "Lean 4"] },
  { category: "Frontend / Backend", items: ["React", "Next.js", "Node.js", "Express", "Flask", "Django"] },
  { category: "Infra / Cloud", items: ["Docker", "AWS EC2", "Vercel", "Firebase"] },
  { category: "Data / AI", items: ["PyTorch", "scikit-learn", "Pandas", "NumPy", "MongoDB", "MySQL"] },
];

const research = [
  {
    id: 1,
    title: "LeanQC — Autoformalization & Formal Theorem Proving",
    period: "Jul 2025 – Present",
    advisor: "Prof. Yunong Shi, University of Michigan",
    tag: "Neuro-Symbolic AI",
    tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    description:
      "Developing a neuro-symbolic framework to formalize informal mathematical statements into Lean 4 code. The DSP-Plus (Draft, Sketch, Prove) architecture uses LeanTree with structured generation and an iterative compiler-feedback pipeline. Ablation studies conducted on MiniF2F and ProofNet (Pass@k metric).",
    bullets: [
      "DSP-Plus architecture: Draft → Sketch → Prove with LeanTree",
      "Structured generation + iterative compiler feedback",
      "Benchmarked on MiniF2F and ProofNet (Pass@k)",
    ],
    icon: "🔬",
    link: "https://current-limitation-autoformalizatio.vercel.app/",
    linkLabel: "View Research Blog",
  },
  {
    id: 2,
    title: "Voice-Controlled AR Hand Assistant",
    period: "Jan – May 2025",
    advisor: "Research Project",
    tag: "AR / Computer Vision",
    tagColor: "bg-cyan-500/10 text-yellow-500 border-yellow-500/20",
    description:
      "Built a multi-modal AR pipeline on Meta Quest 3 using the Meta XR SDK. Integrates YOLOv11 for real-time object detection, GPT-4o for natural language understanding, CLIP for zero-shot classification, and Moondream for visual question answering.",
    bullets: [
      "Meta Quest 3 + Meta XR SDK deployment",
      "YOLOv11 real-time object detection",
      "GPT-4o + CLIP + Moondream multi-modal pipeline",
    ],
    icon: "🥽",
  },
];

const experience = [
  {
    role: "Software Engineer",
    company: "BotSmart",
    period: "Jul – Aug 2025",
    location: "Beijing, China",
    description:
      "Built LLMAE — an automated LLM prompt attack evaluation platform. Designed the full backend with Django and containerized the entire stack with Docker for reproducible deployments.",
    tech: ["Django", "Docker", "Python", "LLM"],
    color: "border-amber-500",
  },
  {
    role: "Full Stack Engineer",
    company: "Innovation AI",
    period: "Jun – Jul 2025",
    location: "San Jose, CA",
    description:
      "Architected and shipped Firebase Cloud Functions, Node.js REST APIs, and integrated a Stripe payment pipeline for a production AI product.",
    tech: ["Firebase", "Node.js", "Stripe", "REST API"],
    color: "border-yellow-500",
  },
];

// ─────────────────────────────────────────────
// Hero Section
// ─────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D background */}
      <HeroScene />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#111214]/20 to-[#111214] pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(59,130,246,0.08) 0%, transparent 70%)" }} />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-mono">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Available for research &amp; internships
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-none"
        >
          Austin{" "}
          <span className="gradient-text">Shen</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          B.S. Mathematics &amp; Data Science &bull; University of Michigan &bull; GPA 4.0
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-base text-slate-500 max-w-xl mx-auto mb-10"
        >
          Researcher in neuro-symbolic AI &amp; formal theorem proving. Building at the intersection of language models and mathematical reasoning.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/projects"
            className="px-8 py-3.5 rounded-xl bg-amber-700 hover:bg-amber-600 text-white font-semibold transition-all hover:shadow-lg hover:shadow-amber-500/25 hover:-translate-y-0.5"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-xl bg-[#1a1a1c] hover:bg-[#2e2b24] text-white font-semibold border border-[#2e2b24] hover:border-amber-500/40 transition-all hover:-translate-y-0.5"
          >
            Get in Touch
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex items-center justify-center gap-6 mt-12"
        >
          {[
            { label: "4.0 GPA", sub: "U of M" },
            { label: "2 Research", sub: "Projects" },
            { label: "2 SWE", sub: "Internships" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl font-bold text-white">{stat.label}</div>
              <div className="text-xs text-slate-500 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-slate-600 text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-slate-600 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-slate-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────
// About Section
// ─────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <AnimatedSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-mono text-amber-400 text-sm tracking-widest uppercase mb-3 block">About Me</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Math meets <span className="gradient-text">Machine Learning</span>
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                I&apos;m Austin (Zi Jun) Shen, a junior at the University of Michigan studying Mathematics and Data Science with a perfect 4.0 GPA. I work under Prof. Yunong Shi on LeanQC, a neuro-symbolic framework for automated theorem proving in Lean 4.
              </p>
              <p>
                My research sits at the intersection of formal methods, large language models, and mathematical reasoning. I believe rigorous proof systems and neural networks can be made to work together — and I&apos;m building that bridge.
              </p>
              <p>
                Beyond research, I&apos;ve shipped production software at BotSmart (LLM security evaluation) and Innovation AI (full-stack AI product). I&apos;m always looking for the next hard problem.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href="https://www.linkedin.com/in/austin-zj-shen"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1a1c] border border-[#2e2b24] text-slate-300 hover:text-amber-400 hover:border-amber-500/40 text-sm transition-colors"
              >
                LinkedIn →
              </a>
              <a
                href="https://github.com/A2DR1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1a1c] border border-[#2e2b24] text-slate-300 hover:text-amber-400 hover:border-amber-500/40 text-sm transition-colors"
              >
                GitHub →
              </a>
              <a
                href="mailto:austinsz@umich.edu"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1a1c] border border-[#2e2b24] text-slate-300 hover:text-amber-400 hover:border-amber-500/40 text-sm transition-colors"
              >
                Email →
              </a>
            </div>
          </div>

          {/* Info card */}
          <div className="glass-card rounded-2xl p-8 space-y-5">
            {[
              { label: "University", value: "University of Michigan" },
              { label: "Degree", value: "B.S. Mathematics & Data Science" },
              { label: "GPA", value: "4.0 / 4.0" },
              { label: "Expected Grad", value: "May 2027" },
              { label: "Location", value: "Ann Arbor, MI" },
              { label: "Advisor", value: "Prof. Yunong Shi" },
              { label: "Research Area", value: "Neuro-Symbolic AI · Formal Proving" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-start gap-4 border-b border-[#2e2b24] pb-4 last:border-0 last:pb-0">
                <span className="text-slate-500 text-sm font-mono">{item.label}</span>
                <span className="text-slate-200 text-sm text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}

// ─────────────────────────────────────────────
// Skills Section
// ─────────────────────────────────────────────

function Skills() {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <AnimatedSection>
        <span className="font-mono text-amber-400 text-sm tracking-widest uppercase mb-3 block text-center">Technical Skills</span>
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-16 text-center leading-tight">
          Tools &amp; <span className="gradient-text">Technologies</span>
        </h2>
      </AnimatedSection>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((group, i) => (
          <AnimatedSection key={group.category} delay={i * 0.1}>
            <div className="glass-card rounded-2xl p-6 h-full hover:border-amber-500/30 transition-colors">
              <h3 className="text-amber-400 font-mono text-xs uppercase tracking-widest mb-5">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded-md bg-[#111214] border border-[#2e2b24] text-slate-300 text-xs font-mono hover:border-amber-500/40 hover:text-amber-400 transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Research Section
// ─────────────────────────────────────────────

function Research() {
  return (
    <section id="research" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <AnimatedSection>
        <span className="font-mono text-amber-400 text-sm tracking-widest uppercase mb-3 block text-center">Academic Research</span>
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-16 text-center leading-tight">
          Research <span className="gradient-text">Projects</span>
        </h2>
      </AnimatedSection>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {research.map((item, i) => (
          <AnimatedSection key={item.id} delay={i * 0.15}>
            <div className="glass-card rounded-2xl p-8 h-full flex flex-col hover:border-amber-500/30 transition-all hover:shadow-lg hover:shadow-amber-500/5 group">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="text-3xl">{item.icon}</div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${item.tagColor}`}>
                  {item.tag}
                </span>
              </div>
              <h3 className="text-white font-bold text-xl mb-2 leading-tight group-hover:text-amber-100 transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-slate-500 text-sm font-mono">{item.period}</span>
                <span className="text-slate-700">•</span>
                <span className="text-slate-500 text-sm">{item.advisor}</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{item.description}</p>
              <ul className="space-y-2 mb-5">
                {item.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-slate-500">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-500 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              {'link' in item && item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors group/link"
                >
                  {item.linkLabel}
                  <svg className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Experience Timeline
// ─────────────────────────────────────────────

function Experience() {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <AnimatedSection>
        <span className="font-mono text-amber-400 text-sm tracking-widest uppercase mb-3 block text-center">Work Experience</span>
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-16 text-center leading-tight">
          Industry <span className="gradient-text">Experience</span>
        </h2>
      </AnimatedSection>

      <div className="relative max-w-3xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/50 via-amber-500/20 to-transparent" />

        <div className="space-y-8">
          {experience.map((job, i) => (
            <AnimatedSection key={job.company} delay={i * 0.15}>
              <div className="relative flex gap-8">
                {/* Dot */}
                <div className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-2xl border-2 ${job.color} bg-[#1a1a1c] flex items-center justify-center text-lg font-bold text-white`}>
                  {job.company.slice(0, 2)}
                </div>
                {/* Card */}
                <div className="glass-card rounded-2xl p-6 flex-1 hover:border-amber-500/30 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-white font-bold text-lg">{job.role}</h3>
                      <p className="text-amber-400 font-medium text-sm">{job.company}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 text-sm font-mono block">{job.period}</span>
                      <span className="text-slate-600 text-xs">{job.location}</span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded text-xs bg-[#111214] border border-[#2e2b24] text-slate-500 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// CTA Section
// ─────────────────────────────────────────────

function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <AnimatedSection>
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-card rounded-3xl p-12 relative overflow-hidden">
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-yellow-500/5 pointer-events-none" />
            <div className="relative z-10">
              <span className="font-mono text-amber-400 text-sm tracking-widest uppercase mb-3 block">Let&apos;s Work Together</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
                Have a project in <span className="gradient-text">mind?</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto">
                I&apos;m open to research collaborations, internship opportunities, and interesting engineering problems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-3.5 rounded-xl bg-amber-700 hover:bg-amber-600 text-white font-semibold transition-all hover:shadow-lg hover:shadow-amber-500/25 hover:-translate-y-0.5"
                >
                  Send a Message
                </Link>
                <Link
                  href="/projects"
                  className="px-8 py-3.5 rounded-xl bg-[#111214] hover:bg-[#1a1a1c] text-white font-semibold border border-[#2e2b24] hover:border-amber-500/40 transition-all hover:-translate-y-0.5"
                >
                  Browse Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}

// ─────────────────────────────────────────────
// Publications
// ─────────────────────────────────────────────

const publications = [
  {
    title: "Keep the Proof State Live: Snapshotting for Efficient Tactic Search in Lean 4",
    authors: "Austin Shen, Yunong Shi",
    venue: "arXiv · cs.LO, cs.AI",
    date: "May 2026",
    abstract: "Identifies that parallel tactic search reconstructs proof states repeatedly, consuming over 99% of per-branch processing time. Introduces proof-state snapshotting — capturing an elaborated proof state once and reusing it across search branches via a Lean 4 language server extension. Achieves 5.6–50× wall-time speedup (avg 14×, median 9.7×) on miniF2F-v2 benchmarks.",
    arxiv: "https://arxiv.org/abs/2605.25556",
    tags: ["Lean 4", "Theorem Proving", "Tactic Search", "cs.LO", "cs.AI"],
  },
];

function Publications() {
  return (
    <section id="publications" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <AnimatedSection>
        <span className="font-mono text-amber-400 text-sm tracking-widest uppercase mb-3 block text-center">Publications</span>
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-16 text-center leading-tight">
          Published <span className="gradient-text">Work</span>
        </h2>
      </AnimatedSection>
      <div className="flex flex-col gap-6">
        {publications.map((pub, i) => (
          <AnimatedSection key={i} delay={i * 0.1}>
            <div className="glass-card rounded-2xl p-8 hover:border-amber-500/30 transition-all hover:shadow-lg hover:shadow-amber-500/5 group">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg leading-snug group-hover:text-amber-100 transition-colors mb-2">
                    {pub.title}
                  </h3>
                  <p className="text-amber-400 text-sm font-medium mb-1">{pub.authors}</p>
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
                    <span>{pub.venue}</span>
                    <span>·</span>
                    <span>{pub.date}</span>
                  </div>
                </div>
                <a
                  href={pub.arxiv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-amber-500/30 text-amber-400 text-sm font-medium hover:bg-amber-500/10 transition-all hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  arXiv
                </a>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">{pub.abstract}</p>
              <div className="flex flex-wrap gap-2">
                {pub.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Research />
      <Publications />
      <Experience />
      <CTA />
    </>
  );
}
