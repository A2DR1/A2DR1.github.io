import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import { formatDate, getAllPosts, getPostBySlug, getPostMeta } from "@/lib/blog";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const meta = getPostMeta(slug);
  if (!meta) return {};
  return { title: `${meta.title} | Austin Shen`, description: meta.excerpt };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen pt-24 pb-20">
      <article className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <Link href="/blog" className="text-dim hover:text-link text-sm transition-colors flex items-center gap-2">
            ← Back to Blog
          </Link>
        </div>

        <AnimatedSection className="mb-10">
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-0.5 rounded-full bg-tint border border-tintbd text-link text-xs font-mono">
                #{tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink mb-5 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-dim text-sm border-b border-line pb-8">
            <span className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-navy to-link flex items-center justify-center text-xs font-bold text-white">
                A
              </span>
              Austin Shen
            </span>
            <span>·</span>
            <span className="font-mono">{formatDate(post.date)}</span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="post" dangerouslySetInnerHTML={{ __html: post.html }} />
        </AnimatedSection>

        <div className="mt-16 pt-8 border-t border-line flex items-center justify-between">
          <Link href="/blog" className="text-dim hover:text-link text-sm transition-colors">
            ← All Posts
          </Link>
          <Link href="/contact" className="px-5 py-2.5 rounded-xl bg-navy hover:bg-navy/90 text-white text-sm font-semibold transition-colors">
            Get in Touch
          </Link>
        </div>
      </article>
    </div>
  );
}
