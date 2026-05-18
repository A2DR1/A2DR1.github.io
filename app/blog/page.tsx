"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  tags: string[];
}

// Fallback posts displayed when MongoDB is unavailable
const FALLBACK_POSTS: Post[] = [
  {
    _id: "1",
    title: "Building LeanQC: Formalizing Math with Neural Networks",
    slug: "building-leanqc",
    excerpt:
      "How we designed the DSP-Plus architecture to bridge informal mathematical reasoning and Lean 4 formal proofs, and what we learned from ablation studies on MiniF2F.",
    date: new Date("2025-08-01").toISOString(),
    tags: ["research", "lean4", "AI", "formal-methods"],
  },
  {
    _id: "2",
    title: "Voice-Controlled AR: Combining YOLOv11, GPT-4o, and Meta Quest 3",
    slug: "voice-ar-assistant",
    excerpt:
      "A deep dive into the multi-modal pipeline powering our AR hand assistant — real-time object detection, natural language commands, and zero-shot visual classification.",
    date: new Date("2025-05-10").toISOString(),
    tags: ["AR", "computer-vision", "LLM", "meta-quest"],
  },
  {
    _id: "3",
    title: "LLMAE: Automated LLM Prompt Attack Evaluation",
    slug: "llmae-attack-eval",
    excerpt:
      "Lessons from building an automated evaluation platform for LLM adversarial prompts at BotSmart. Architecture decisions, Django REST, and Docker containerization.",
    date: new Date("2025-08-20").toISOString(),
    tags: ["LLM", "security", "django", "docker"],
  },
  {
    _id: "4",
    title: "From Informal Math to Lean 4: A Practical Guide",
    slug: "informal-to-lean4",
    excerpt:
      "Step-by-step walkthrough of how we convert natural-language mathematical statements to Lean 4 using structured generation and iterative compiler feedback.",
    date: new Date("2025-09-05").toISOString(),
    tags: ["lean4", "tutorial", "formal-methods"],
  },
];

function PostCard({ post, index }: { post: Post; index: number }) {
  const date = new Date(post.date);
  const formatted = date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <article className="glass-card rounded-2xl p-7 hover:border-amber-500/30 transition-all hover:shadow-lg hover:shadow-amber-500/5 group cursor-pointer">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
                #{tag}
              </span>
            ))}
          </div>
          <h2 className="text-white text-xl font-bold mb-3 leading-snug group-hover:text-amber-100 transition-colors line-clamp-2">
            {post.title}
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
          <div className="flex items-center justify-between">
            <span className="text-slate-600 text-xs font-mono">{formatted}</span>
            <span className="text-amber-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Read more <span>→</span>
            </span>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState<string>("All");

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data);
        } else {
          // Use fallback posts when DB is empty or unavailable
          setPosts(FALLBACK_POSTS);
        }
      })
      .catch(() => setPosts(FALLBACK_POSTS))
      .finally(() => setLoading(false));
  }, []);

  const allTags = ["All", ...Array.from(new Set(posts.flatMap((p) => p.tags)))];
  const filtered = activeTag === "All" ? posts : posts.filter((p) => p.tags.includes(activeTag));

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="font-mono text-amber-400 text-sm tracking-widest uppercase mb-3 block">Writing</span>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-5 leading-tight">
            The <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-lg mx-auto">
            Thoughts on research, engineering, and building at the frontier of AI and formal methods.
          </p>
        </AnimatedSection>

        {/* Tag filter */}
        {!loading && (
          <AnimatedSection delay={0.1} className="mb-10">
            <div className="flex flex-wrap gap-2 justify-center">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTag === tag
                      ? "bg-amber-700 text-white"
                      : "bg-[#1a1a1c] border border-[#2e2b24] text-slate-400 hover:text-white hover:border-amber-500/40"
                  }`}
                >
                  {tag === "All" ? "All Posts" : `#${tag}`}
                </button>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* Loading */}
        {loading && (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass-card rounded-2xl p-7 animate-pulse">
                <div className="flex gap-2 mb-4">
                  <div className="h-5 w-16 bg-[#2e2b24] rounded-full" />
                  <div className="h-5 w-16 bg-[#2e2b24] rounded-full" />
                </div>
                <div className="h-6 bg-[#2e2b24] rounded w-3/4 mb-3" />
                <div className="h-4 bg-[#2e2b24] rounded w-full mb-2" />
                <div className="h-4 bg-[#2e2b24] rounded w-5/6" />
              </div>
            ))}
          </div>
        )}

        {/* Posts */}
        {!loading && (
          <div className="space-y-6">
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-slate-500">No posts found for this tag.</div>
            ) : (
              filtered.map((post, i) => (
                <PostCard key={post._id} post={post} index={i} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
