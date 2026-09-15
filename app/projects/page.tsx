"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  open_issues_count: number;
}

const languageColors: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#2b7489",
  JavaScript: "#f1e05a",
  "C++": "#f34b7d",
  C: "#555555",
  Java: "#b07219",
  Rust: "#dea584",
  Go: "#00ADD8",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Lean: "#e07b53",
  R: "#198CE7",
};

function LanguageDot({ lang }: { lang: string }) {
  const color = languageColors[lang] ?? "#6b7280";
  return (
    <span className="flex items-center gap-1.5 text-xs text-slate-400">
      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
      {lang}
    </span>
  );
}

function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5 5a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-2 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm-5 6.5a.5.5 0 0 1 .5.5v1.146a1 1 0 0 0 .708.952l1.207.362A2 2 0 0 1 14 16.12V17a2 2 0 1 1-4 0v-.879a2 2 0 0 1 1.585-1.956l1.208-.362A1 1 0 0 0 13.5 13V12a.5.5 0 0 1 .5-.5v-1A.5.5 0 0 1 14 10h-4a.5.5 0 0 1 0-1h4a1.5 1.5 0 0 1 1.5 1.5v1z" />
    </svg>
  );
}

const featured = [
  {
    title: "Voice-Controlled AR Hand Assistant",
    period: "Jan to May 2025",
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
  {
    title: "Transformer Language Model from First Principles",
    period: "2026",
    tag: "Learning project",
    tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    description:
      "A GPT written from scratch in NumPy and PyTorch without reference implementations. Along the way I measured RNN gradient decay, pre-norm versus post-norm gradient flow, and an emergent previous-token head (97% of attention mass).",
    bullets: [
      "Hand-derived backprop in NumPy, validated against numerical gradients (under 1e-4)",
      "Multi-head causal attention verified numerically identical to PyTorch's fused kernel",
      "Trained an 892K-parameter GPT (4 layers, 4 heads, d_model 128) on character-level Shakespeare; 54 unit tests passing",
    ],
    icon: "🧮",
  },
];

function FeaturedCard({ item, index }: { item: (typeof featured)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card rounded-2xl p-8 h-full flex flex-col hover:border-amber-500/30 transition-all hover:shadow-lg hover:shadow-amber-500/5 group"
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="text-3xl">{item.icon}</div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${item.tagColor}`}>
          {item.tag}
        </span>
      </div>
      <h3 className="text-white font-bold text-xl mb-2 leading-tight group-hover:text-amber-100 transition-colors">
        {item.title}
      </h3>
      <span className="text-slate-500 text-sm font-mono mb-4 block">{item.period}</span>
      <p className="text-slate-400 text-sm leading-relaxed mb-5">{item.description}</p>
      <ul className="space-y-2">
        {item.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-slate-500">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-500 shrink-0" />
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ProjectCard({ repo, index }: { repo: Repo; index: number }) {
  const relativeTime = () => {
    const diff = Date.now() - new Date(repo.updated_at).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "today";
    if (days === 1) return "yesterday";
    if (days < 30) return `${days}d ago`;
    if (days < 365) return `${Math.floor(days / 30)}mo ago`;
    return `${Math.floor(days / 365)}y ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="glass-card rounded-2xl p-6 flex flex-col gap-4 hover:border-amber-500/30 transition-all hover:shadow-lg hover:shadow-amber-500/5 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth={2}>
              <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
            </svg>
          </div>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white text-sm truncate hover:text-amber-400 transition-colors"
          >
            {repo.name}
          </a>
        </div>
        <div className="flex gap-2 shrink-0">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-[#2e2b24] transition-colors"
            title="View on GitHub"
          >
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-[#2e2b24] transition-colors"
              title="Live Demo"
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm leading-relaxed flex-1 line-clamp-3">
        {repo.description ?? "No description provided."}
      </p>

      {/* Topics */}
      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 4).map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-[#2e2b24]">
        <div className="flex items-center gap-4">
          {repo.language && <LanguageDot lang={repo.language} />}
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <StarIcon /> {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <ForkIcon /> {repo.forks_count}
          </span>
        </div>
        <span className="text-xs text-slate-600 font-mono">{relativeTime()}</span>
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(data);
        } else {
          setError("Failed to load projects.");
        }
      })
      .catch(() => setError("Network error."))
      .finally(() => setLoading(false));
  }, []);

  const languages = ["All", ...Array.from(new Set(repos.map((r) => r.language).filter(Boolean) as string[]))];
  const filtered = filter === "All" ? repos : repos.filter((r) => r.language === filter);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="font-mono text-amber-400 text-sm tracking-widest uppercase mb-3 block">Portfolio</span>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-5 leading-tight">
            My <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Selected builds, followed by open-source work and prototypes from GitHub.
          </p>
        </AnimatedSection>

        {/* Featured projects */}
        <section className="mb-24">
          <AnimatedSection className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
              Featured <span className="gradient-text">Projects</span>
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featured.map((item, i) => (
              <FeaturedCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </section>

        {/* GitHub section heading */}
        <AnimatedSection className="mb-10 text-center">
          <span className="font-mono text-amber-400 text-sm tracking-widest uppercase mb-3 block">GitHub</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            From <span className="gradient-text">GitHub</span>
          </h2>
        </AnimatedSection>

        {/* Language filter */}
        {!loading && !error && (
          <AnimatedSection delay={0.1} className="mb-10">
            <div className="flex flex-wrap gap-2 justify-center">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setFilter(lang)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === lang
                      ? "bg-amber-700 text-white"
                      : "bg-[#1a1a1c] border border-[#2e2b24] text-slate-400 hover:text-white hover:border-amber-500/40"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 h-48 animate-pulse">
                <div className="h-4 bg-[#2e2b24] rounded w-2/3 mb-3" />
                <div className="h-3 bg-[#2e2b24] rounded w-full mb-2" />
                <div className="h-3 bg-[#2e2b24] rounded w-4/5" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">{error}</p>
            <a
              href="https://github.com/A2DR1"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-amber-400 hover:underline"
            >
              Visit GitHub directly →
            </a>
          </div>
        )}

        {/* Repos */}
        {!loading && !error && (
          <>
            <p className="text-slate-600 text-sm mb-6 text-center font-mono">
              Showing {filtered.length} of {repos.length} repositories
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((repo, i) => (
                <ProjectCard key={repo.id} repo={repo} index={i} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-20 text-slate-500">
                No repositories found for this filter.
              </div>
            )}
          </>
        )}

        {/* GitHub CTA */}
        {!loading && (
          <AnimatedSection className="mt-16 text-center">
            <a
              href="https://github.com/A2DR1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#1a1a1c] border border-[#2e2b24] text-white font-semibold hover:border-amber-500/40 hover:text-amber-400 transition-all hover:-translate-y-0.5"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View All on GitHub
            </a>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
