import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import BlogList from "@/components/BlogList";
import { formatDate, getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Austin Shen",
  description: "Notes on neural theorem proving, Lean 4, and building research systems.",
};

export default function BlogPage() {
  const posts = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    tags: p.tags,
    dateLabel: formatDate(p.date),
  }));

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="font-mono text-link text-sm tracking-widest uppercase mb-3 block">Writing</span>
          <h1 className="text-5xl sm:text-6xl font-bold text-ink mb-5 leading-tight">
            The <span className="hl-maize">Blog</span>
          </h1>
          <p className="text-muted text-lg max-w-lg mx-auto">
            Thoughts on research, engineering, and building at the frontier of AI and formal methods.
          </p>
        </AnimatedSection>

        {posts.length === 0 ? (
          <div className="text-center py-20 text-dim">No posts yet.</div>
        ) : (
          <BlogList posts={posts} />
        )}
      </div>
    </div>
  );
}
