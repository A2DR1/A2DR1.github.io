import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";

/**
 * Posts are markdown files in content/blog. Each file starts with front matter:
 *
 *   ---
 *   title: "Post title"
 *   date: "2026-01-31"          (ISO date, quoted so it stays a string)
 *   excerpt: "One or two sentences shown on the list page."
 *   tags: [lean4, research]
 *   ---
 *
 * The file name is the URL slug: content/blog/my-post.md -> /blog/my-post.
 * Everything is read at build time; publishing a post is commit and push.
 */

const POSTS_DIR = path.join(process.cwd(), "content", "blog");
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

export interface Post extends PostMeta {
  html: string;
}

function parseFile(slug: string): { meta: PostMeta; body: string } | null {
  if (!SLUG.test(slug)) return null;
  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? "");
  return {
    meta: {
      slug,
      title: String(data.title ?? slug),
      date,
      excerpt: String(data.excerpt ?? ""),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    },
    body: content,
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parseFile(f.replace(/\.md$/, "")))
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .map((p) => p.meta)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getPostMeta(slug: string): PostMeta | null {
  return parseFile(slug)?.meta ?? null;
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeShiki, { theme: "github-dark-default", defaultLanguage: "text", fallbackLanguage: "text" })
  .use(rehypeStringify);

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const parsed = parseFile(slug);
  if (!parsed) return null;
  const html = String(await processor.process(parsed.body));
  return { ...parsed.meta, html };
}

/** "2026-01-31" -> "January 31, 2026", independent of the server's time zone. */
export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
