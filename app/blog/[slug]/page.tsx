"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
}

const FALLBACK_POSTS: Record<string, Post> = {
  "building-leanqc": {
    _id: "1",
    title: "Building LeanQC: Formalizing Math with Neural Networks",
    slug: "building-leanqc",
    excerpt:
      "How we designed the DSP-Plus architecture to bridge informal mathematical reasoning and Lean 4 formal proofs, and what we learned from ablation studies on MiniF2F.",
    date: new Date("2025-08-01").toISOString(),
    tags: ["research", "lean4", "AI", "formal-methods"],
    content: `# Building LeanQC: Formalizing Math with Neural Networks

Formal theorem proving has long been a dream of the AI community: the idea that a machine could not just suggest proofs but *verify* them in a rigorous logical system. LeanQC is our attempt to make this a reality using a neuro-symbolic approach.

## The Problem

Informal mathematics, the kind you find in textbooks and research papers, is remarkably hard to formalize. Mathematicians rely on implicit context, notation conventions, and domain knowledge that is incredibly difficult to encode explicitly. Tools like Lean 4 demand absolute precision: every step must be justified with a valid tactic.

## The DSP-Plus Architecture

Our approach, DSP-Plus (Draft, Sketch, Prove), decomposes the formalization task into three stages:

### 1. Draft
A large language model generates an informal proof sketch from the original mathematical statement. This stage captures high-level reasoning without worrying about formal syntax.

### 2. Sketch
The sketch is translated into a Lean 4 *incomplete proof*, a structure with known proof obligations. We use structured generation with constrained decoding to ensure syntactic validity.

### 3. Prove
Individual proof obligations are discharged using LeanTree, a tree-structured search that calls Lean's elaborator as an oracle. Each failed elaboration provides structured feedback that is fed back into the model.

## Iterative Compiler Feedback

One of the key innovations is our use of Lean's compiler errors as training signal. When a generated tactic fails, the error message encodes exactly *why* it failed: type mismatches, missing hypotheses, unknown identifiers. We parse these errors and construct few-shot prompts that guide the model toward a valid completion.

## Benchmarks

We evaluated LeanQC on two standard benchmarks:
- **MiniF2F**: 244 problems spanning high-school to olympiad difficulty
- **ProofNet**: Undergraduate-level mathematics from textbooks

Our Pass@k results show consistent improvement over baseline DSP, with the iterative feedback loop providing the largest gains at k=32.

## Lessons Learned

The biggest insight is that **compiler feedback is underutilized** in neural theorem proving. Most systems treat proof generation as a one-shot problem; we show that tight integration with the formal system's error reporting dramatically improves success rates.

Building this system also deepened my appreciation for Lean 4's metaprogramming capabilities. The ability to extend the language from within is a superpower for this kind of hybrid system.

## Next Steps

We're working on scaling to harder problems and improving the Draft stage with retrieval-augmented generation over a corpus of Lean 4 mathlib proofs. Stay tuned for the paper.
`,
  },
  "voice-ar-assistant": {
    _id: "2",
    title: "Voice-Controlled AR: Combining YOLOv11, GPT-4o, and Meta Quest 3",
    slug: "voice-ar-assistant",
    excerpt:
      "A deep dive into the multi-modal pipeline powering our AR hand assistant.",
    date: new Date("2025-05-10").toISOString(),
    tags: ["AR", "computer-vision", "LLM", "meta-quest"],
    content: `# Voice-Controlled AR: Combining YOLOv11, GPT-4o, and Meta Quest 3

Augmented Reality has always promised a future where your environment becomes an interface. This project was our attempt to make that real: a hands-free AR assistant that understands what you're looking at and responds to natural voice commands.

## System Architecture

The pipeline runs on three parallel threads:

### Object Detection (YOLOv11)
We fine-tuned YOLOv11 on a custom dataset of hand-relevant objects (tools, controls, household items) to run at 30fps on the Quest 3's Snapdragon XR2 Gen 2. Bounding boxes are projected into 3D space using the Quest's depth estimation.

### Language Understanding (GPT-4o)
Voice input is transcribed via Whisper and passed to GPT-4o with a structured prompt that includes:
- Current detected objects and their spatial positions
- Recent conversation history
- User's task context

GPT-4o returns a structured action plan that the AR system executes.

### Visual Classification (CLIP + Moondream)
For fine-grained identification ("which of these buttons is the power button?") we combine CLIP's zero-shot classification with Moondream's visual question answering. This lets users ask about visual properties that YOLO's bounding boxes don't capture.

## Meta Quest 3 Integration

The Meta XR SDK's PassThrough API gives us access to the camera feed with minimal latency. We render AR overlays using Unity's URP pipeline with custom shaders for the bounding box visualizations.

The hardest part was achieving sub-100ms end-to-end latency for voice commands. We ended up running YOLOv11 and CLIP on-device and offloading GPT-4o calls to a local server.

## What We Learned

Real-time AR is fundamentally a systems problem. Every millisecond of latency is perceptible, and the Quest 3's thermal constraints mean you can't simply max out every model. We learned to aggressively quantize models and design the pipeline with graceful degradation.

The multimodal combination of vision + language turned out to be more capable than any single model: CLIP could identify objects YOLO had never seen, while GPT-4o could reason about spatial relationships.
`,
  },
  "llmae-attack-eval": {
    _id: "3",
    title: "LLMAE: Automated LLM Prompt Attack Evaluation",
    slug: "llmae-attack-eval",
    excerpt:
      "Lessons from building an automated evaluation platform for LLM adversarial prompts at BotSmart.",
    date: new Date("2025-08-20").toISOString(),
    tags: ["LLM", "security", "django", "docker"],
    content: `# LLMAE: Automated LLM Prompt Attack Evaluation

At BotSmart, I spent the summer building LLMAE, an automated platform for evaluating LLM robustness against adversarial prompts. Here's what I built and what I learned.

## The Problem

As LLMs get deployed in production, adversarial prompting becomes a real security concern. Red-teaming by hand doesn't scale. LLMAE automates the process: generate attacks, run them against a target model, evaluate success, aggregate results.

## Architecture

The system is built on Django with a PostgreSQL backend and a Redis task queue:

### Attack Generation
A library of attack templates (jailbreaks, prompt injections, indirect attacks) is parameterized and expanded combinatorially. Novel attacks are generated by a mutation engine that applies transformations (paraphrasing, encoding, context injection) to known attacks.

### Evaluation Pipeline
Each attack/model pair is evaluated by an independent judge model that scores the response on a rubric: Did the model comply? Did it leak information? Was the refusal appropriate?

### Result Aggregation
Pass rates, attack success rates by category, and model comparison dashboards are computed and stored. The frontend (React) lets analysts drill into individual failures.

## Docker + CI/CD

The entire stack runs in Docker Compose for local development and deploys to a single EC2 instance via a GitHub Actions pipeline. Multi-stage Docker builds kept the images lean. The Django container is under 200MB.

## Key Findings

- Encoding tricks (Base64, Unicode obfuscation) remain highly effective against models without explicit training on encoded inputs
- Context injection attacks succeed more often when the injected context is semantically related to the user's stated intent
- Judge model quality is the biggest bottleneck. A weak evaluator produces noisy data that hides real attack success

## What I'd Do Differently

Build the judge evaluation framework first. I spent too long on attack generation and had to rebuild the evaluation layer when the judge model outputs turned out to be inconsistent.
`,
  },
  "informal-to-lean4": {
    _id: "4",
    title: "From Informal Math to Lean 4: A Practical Guide",
    slug: "informal-to-lean4",
    excerpt:
      "Step-by-step walkthrough of how we convert natural-language mathematical statements to Lean 4.",
    date: new Date("2025-09-05").toISOString(),
    tags: ["lean4", "tutorial", "formal-methods"],
    content: `# From Informal Math to Lean 4: A Practical Guide

This is a practical walkthrough of the formalization workflow we've developed in LeanQC. If you've ever wanted to start formalizing mathematics in Lean 4 but found the official docs overwhelming, this guide is for you.

## What Is Lean 4?

Lean 4 is a functional programming language and interactive theorem prover. Its type system is expressive enough to encode mathematical propositions as types, and proofs as programs. When your Lean code compiles, your proof is correct, by construction.

## A Simple Example

Let's formalize: "For all natural numbers n, n + 0 = n."

In Lean 4:

\`\`\`lean
theorem add_zero_eq (n : ℕ) : n + 0 = n := by
  simp
\`\`\`

The \`by simp\` tactic calls Lean's simplifier, which knows this fact. But let's prove it manually:

\`\`\`lean
theorem add_zero_eq' (n : ℕ) : n + 0 = n := by
  induction n with
  | zero => rfl
  | succ n ih => simp [Nat.succ_add, ih]
\`\`\`

## The Formalization Workflow

### Step 1: Identify the Statement
Extract the precise mathematical claim. "For all n..." means we need a universal quantifier \`∀ n\`.

### Step 2: Type the Signature
Write the Lean type signature before the proof. This is often the hardest part: getting the types right.

### Step 3: Explore with Tactics
Use the interactive mode (\`#check\`, \`#eval\`, \`sorry\`) to explore. Don't try to write the full proof at once.

### Step 4: Use Mathlib
Lean's standard library (Mathlib) has thousands of lemmas. Before proving something from scratch, search Mathlib: \`exact?\`, \`apply?\`, and \`simp?\` can often close goals automatically.

## Common Pitfalls

1. **Universe polymorphism**: If you get "universe mismatch" errors, you probably need to add \`{α : Type*}\` type variables.
2. **Coercions**: Lean distinguishes ℕ from ℤ from ℚ. Explicit coercions prevent many headaches.
3. **Definitional equality**: Sometimes things that *look* equal aren't definitionally equal. Use \`show\` to rewrite your goal explicitly.

## LeanQC's Approach

In LeanQC, we automate steps 2-4 using a combination of language models and the Lean compiler's feedback. The key insight is that Lean's error messages are structured enough to be parsed programmatically. Each error tells you exactly what type was expected vs. received, which gives the model precise guidance for the next attempt.

Formal verification is hard, but the tooling has never been better. Give Lean 4 a try.
`,
  },
};

function renderMarkdown(content: string): string {
  return content
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-white mt-10 mb-5">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-white mt-8 mb-4">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-amber-300 mt-6 mb-3">$1</h3>')
    .replace(/```(\w*)\n([\s\S]*?)```/gm, '<pre class="bg-[#0a0a12] border border-[#2e2b24] rounded-xl p-5 overflow-x-auto my-5 text-sm font-mono text-slate-300"><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-[#2e2b24] text-amber-300 text-sm font-mono">$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="text-slate-300">$1</em>')
    .replace(/^- (.+)$/gm, '<li class="text-slate-400 ml-4 list-disc list-outside mb-1.5">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul class="my-4 space-y-1 pl-4">$&</ul>')
    .replace(/^\d+\. (.+)$/gm, '<li class="text-slate-400 ml-4 list-decimal list-outside mb-1.5">$1</li>')
    .replace(/^(?!<[h123ulpre])(.+)$/gm, '<p class="text-slate-400 leading-relaxed mb-4">$1</p>')
    .replace(/<p[^>]*>\s*<\/p>/g, "");
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/blog/${slug}`)
      .then((r) => {
        if (r.status === 404) throw new Error("not-found");
        return r.json();
      })
      .then((data) => {
        if (data.error) throw new Error("not-found");
        setPost(data);
      })
      .catch((err) => {
        // Fall back to static content
        const fallback = FALLBACK_POSTS[slug];
        if (fallback) {
          setPost(fallback);
        } else if (err.message === "not-found") {
          setNotFound(true);
        } else {
          const fallbackPost = FALLBACK_POSTS[slug];
          if (fallbackPost) setPost(fallbackPost);
          else setNotFound(true);
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 max-w-3xl mx-auto px-4">
        <div className="animate-pulse space-y-4 mt-8">
          <div className="h-8 bg-[#2e2b24] rounded w-2/3" />
          <div className="h-4 bg-[#2e2b24] rounded w-1/3" />
          <div className="mt-8 space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-4 bg-[#2e2b24] rounded" style={{ width: `${70 + Math.random() * 30}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
        <p className="text-slate-400 mb-8">That blog post doesn&apos;t exist.</p>
        <Link href="/blog" className="text-amber-400 hover:underline">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const html = renderMarkdown(post.content);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <article className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10"
        >
          <Link href="/blog" className="text-slate-500 hover:text-amber-400 text-sm transition-colors flex items-center gap-2">
            ← Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
                #{tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-slate-500 text-sm border-b border-[#2e2b24] pb-8">
            <span className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-xs font-bold text-white">
                A
              </div>
              Austin Shen
            </span>
            <span>·</span>
            <span className="font-mono">{date}</span>
          </div>
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 pt-8 border-t border-[#2e2b24]"
        >
          <div className="flex items-center justify-between">
            <Link href="/blog" className="text-slate-500 hover:text-amber-400 text-sm transition-colors">
              ← All Posts
            </Link>
            <Link href="/contact" className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-600 text-white text-sm font-semibold transition-colors">
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
