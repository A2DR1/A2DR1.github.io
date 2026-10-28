---
title: "Building LeanQC: Formalizing Math with Neural Networks"
date: "2025-08-01"
excerpt: "How we designed the DSP-Plus architecture to bridge informal mathematical reasoning and Lean 4 formal proofs, and what we learned from ablation studies on MiniF2F."
tags: [research, lean4, AI, formal-methods]
---

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
