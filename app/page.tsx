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
  { category: "Languages", items: ["Python", "Lean 4", "C++", "C", "Java", "JavaScript", "TypeScript", "SQL", "R"] },
  { category: "Formal Methods", items: ["Mathlib", "Lean metaprogramming", "LSP / JSON-RPC", "LeanTree", "LeanInteract", "Z3"] },
  { category: "ML / Systems", items: ["PyTorch", "vLLM", "SLURM / HPC", "NumPy", "Pandas", "scikit-learn", "Docker"] },
  { category: "Web / Cloud", items: ["React", "Next.js", "Node.js", "Express", "Flask", "Django", "Firebase", "MongoDB", "MySQL", "AWS EC2", "Vercel"] },
];

const research = [
  {
    id: 1,
    title: "Exact Algorithmic Generalization in Tiny Transformers (\"The Neural Engine\")",
    period: "Jun 2026 to Present",
    advisor: "with Tianyu Hua and Prof. Nick Haber, Stanford University",
    tag: "Tiny Transformers",
    tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    description:
      "I study when small transformers learn to compute exactly. I designed and built PaperDiT, a 0.2 to 0.6M-parameter cells-as-tokens 2-D transformer (no positional encodings, fixed-point halting) that computes bit-for-bit against executable oracles: 1,000-digit addition from 10-digit-max training, a universal cellular-automaton interpreter running unseen rules at 50× tape width, and damage-robust interactive physics.",
    bullets: [
      "Self-play: bootstrapped arithmetic from zero data with a propose, solve, oracle-verify, retrain loop. 100% on all lengths 1 to 22 (eval cap) from 1-to-10-digit training, 3/3 seeds. The oracle supplies the verification signal.",
      "Mechanistic interpretability: linear probes show the carry bit is computed, not memorized. Causal activation patching localizes the carry circuit (about 100% output flip at layers 0 to 1, 0% past layer 2).",
      "Transformer plus exact external memory: a 10-digit-trained GPT with a pointer/register harness reaches 100% exact addition on 483/483 problems through 3,000 digits and at 5,000 and 7,000 digits (700× training length), 3/3 seeds.",
      "Four live in-browser demos on a hand-written, dependency-free JavaScript transformer engine with verified fp16 export.",
    ],
    icon: "🧠",
  },
  {
    id: 2,
    title: "Execution Audit & Snapshot Engine for Neural Theorem Proving (Lean 4)",
    period: "Mar 2026 to Present",
    advisor: "with Prof. Yunong Shi, University of Michigan (also AWS Center for Quantum Computing)",
    tag: "Neural Theorem Proving",
    tagColor: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    description:
      "I co-authored a 24-page pre-registered measurement study, the first controlled test of whether execution throughput limits neural theorem provers. Every claimed proof was independently re-verified by whole-file Lean compilation (633/636).",
    bullets: [
      "Patched the Lean 4 language server with custom JSON-RPC snapshot/branch methods for millisecond in-memory proof-state forking: 5.6 to 16.1× (mean 9.1×) end-to-end speedup, and distributed proof search across 4 cluster nodes (about 15.7×).",
      "Ran 2-policy × 2-backend × 244-problem benchmark grids with 7B provers via vLLM on SLURM A40 GPUs. Proof sets were statistically identical across backends.",
      "Found a premise-selection inversion: a reranker that improves Recall@32 by 8.3 points loses 23.7 pp of end-to-end proof rate (p=0.022).",
    ],
    icon: "🔬",
    link: "https://arxiv.org/abs/2605.25556",
    linkLabel: "Read the preprint (arXiv:2605.25556)",
  },
  {
    id: 3,
    title: "LeanQC: Autoformalization & Formal Theorem Proving",
    period: "Jul 2025 to Present",
    advisor: "Prof. Yunong Shi, University of Michigan (also AWS Center for Quantum Computing)",
    tag: "Neuro-Symbolic AI",
    tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    description:
      "Developing a neuro-symbolic framework to formalize informal mathematical statements into Lean 4 code. The DSP-Plus (Draft, Sketch, Prove) architecture uses LeanTree with structured generation and an iterative compiler-feedback pipeline. Ablation studies conducted on MiniF2F and ProofNet (Pass@k metric).",
    bullets: [
      "DSP-Plus architecture: Draft → Sketch → Prove with LeanTree",
      "Structured generation + iterative compiler feedback",
      "Benchmarked on MiniF2F and ProofNet (Pass@k)",
    ],
    icon: "📐",
    link: "https://current-limitation-autoformalizatio.vercel.app/",
    linkLabel: "View Research Blog",
  },
];

const experience = [
  {
    role: "Software Engineer Intern",
    company: "BotSmart",
    period: "Jul to Aug 2025",
    location: "Beijing, China",
    description:
      "Built LLMAE, an automated evaluation platform for LLM prompt attacks (modular Python, Django, Docker). A 5-level configuration space with at least 5 options per level yields 3,000+ attack variants, tested across content-safety categories. The platform was adopted for continued development after the internship.",
    tech: ["Django", "Docker", "Python", "LLM"],
    color: "border-amber-500",
  },
  {
    role: "Full Stack Engineer Intern",
    company: "Innovation AI",
    period: "Jun to Jul 2025",
    location: "San Jose, CA",
    description:
      "Built the complete backend for a pre-launch AI writing assistant: content storage and retrieval, LLM text refinement, Firestore cross-platform sync, and a Stripe subscription pipeline (webhook verification, customer metadata mapping) tested end-to-end in Stripe's test environment.",
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
          B.S. Computer Science, Mathematics &amp; Data Science &bull; University of Michigan &bull; GPA 4.00 / 4.00
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-base text-slate-500 max-w-xl mx-auto mb-10"
        >
          I work on neural theorem proving in Lean 4 and on small transformers that learn to compute exactly.
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
            { label: "4.00 GPA", sub: "U of M" },
            { label: "3 Research", sub: "Projects" },
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
              Formal reasoning meets <span className="gradient-text">Machine Learning</span>
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                I&apos;m Austin Shen, a Computer Science, Mathematics, and Data Science triple major at the University of Michigan (GPA 4.00 / 4.00, expected May 2027). I am a James B. Angell Scholar and hold University Honors.
              </p>
              <p>
                I have worked with Prof. Yunong Shi at Michigan since July 2025, first on LeanQC (autoformalization into Lean 4) and, since March 2026, on a proof-state snapshot engine for the Lean 4 language server and a pre-registered audit of whether execution throughput limits neural theorem provers. Since June 2026 I have worked with Tianyu Hua and Prof. Nick Haber at Stanford on tiny transformers that compute exactly, verified bit-for-bit against oracles.
              </p>
              <p>
                Before that I interned at BotSmart, where I built an evaluation platform for LLM prompt attacks, and at Innovation AI, where I built the backend for a pre-launch AI writing product.
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
              { label: "Degree", value: "B.S. Computer Science, Mathematics & Data Science (triple major)" },
              { label: "GPA", value: "4.00 / 4.00" },
              { label: "Honors", value: "James B. Angell Scholar · University Honors" },
              { label: "Expected Grad", value: "May 2027" },
              { label: "Location", value: "Ann Arbor, MI" },
              { label: "Advisor", value: "Prof. Yunong Shi (Michigan)" },
              { label: "Collaborators", value: "Tianyu Hua, Prof. Nick Haber (Stanford)" },
              { label: "Research Area", value: "Neural theorem proving · Exact computation in tiny transformers" },
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
          <AnimatedSection key={item.id} delay={i * 0.15} className={i === 0 ? "lg:col-span-2" : undefined}>
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
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
                <span className="text-slate-500 text-sm font-mono">{item.period}</span>
                <span className="text-slate-700 hidden sm:inline">•</span>
                <span className="text-slate-500 text-sm">{item.advisor}</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">{item.description}</p>
              <ul className="space-y-2 mb-5 flex-1">
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
    venue: "arXiv:2605.25556 · cs.LO, cs.AI",
    date: "May 2026",
    abstract:
      "Parallel tactic search in Lean 4 rebuilds each proof state by re-running elaboration, which accounts for over 99% of per-branch wall time. The paper introduces proof-state snapshotting: capture the elaborated proof state once and reuse it across search branches through a small extension to the Lean 4 language server. Across 48 miniF2F-v2 problems the paper reports a 5.6 to 50× wall-time speedup over the standard fallback (average 14×, median 9.7×).",
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
          Preprints &amp; <span className="gradient-text">Papers</span>
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
