"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

export interface BlogListPost {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  dateLabel: string;
}

function PostCard({ post, index }: { post: BlogListPost; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <article className="glass-card rounded-2xl p-7 hover:border-navy/30 transition-all hover:shadow-lg hover:shadow-navy/10 group cursor-pointer">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-0.5 rounded-full bg-tint border border-tintbd text-link text-xs font-mono">
                #{tag}
              </span>
            ))}
          </div>
          <h2 className="text-ink text-xl font-bold mb-3 leading-snug group-hover:text-link transition-colors line-clamp-2">
            {post.title}
          </h2>
          <p className="text-muted text-sm leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
          <div className="flex items-center justify-between">
            <span className="text-dim text-xs font-mono">{post.dateLabel}</span>
            <span className="text-link text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Read more <span>→</span>
            </span>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

export default function BlogList({ posts }: { posts: BlogListPost[] }) {
  const [activeTag, setActiveTag] = useState<string>("All");
  const allTags = ["All", ...Array.from(new Set(posts.flatMap((p) => p.tags)))];
  const filtered = activeTag === "All" ? posts : posts.filter((p) => p.tags.includes(activeTag));

  return (
    <>
      <AnimatedSection delay={0.1} className="mb-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTag === tag
                  ? "bg-navy text-white"
                  : "bg-card border border-line text-muted hover:text-ink hover:border-navy/40"
              }`}
            >
              {tag === "All" ? "All Posts" : `#${tag}`}
            </button>
          ))}
        </div>
      </AnimatedSection>

      <div className="space-y-6">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-dim">No posts found for this tag.</div>
        ) : (
          filtered.map((post, i) => <PostCard key={post.slug} post={post} index={i} />)
        )}
      </div>
    </>
  );
}
