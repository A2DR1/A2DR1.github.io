---
title: "From Informal Math to Lean 4: A Practical Guide"
date: "2025-09-05"
excerpt: "Step-by-step walkthrough of how we convert natural-language mathematical statements to Lean 4 using structured generation and iterative compiler feedback."
tags: [lean4, tutorial, formal-methods]
---

This is a practical walkthrough of the formalization workflow we've developed in LeanQC. If you've ever wanted to start formalizing mathematics in Lean 4 but found the official docs overwhelming, this guide is for you.

## What Is Lean 4?

Lean 4 is a functional programming language and interactive theorem prover. Its type system is expressive enough to encode mathematical propositions as types, and proofs as programs. When your Lean code compiles, your proof is correct, by construction.

## A Simple Example

Let's formalize: "For all natural numbers n, n + 0 = n."

In Lean 4:

```lean
theorem add_zero_eq (n : ℕ) : n + 0 = n := by
  simp
```

The `by simp` tactic calls Lean's simplifier, which knows this fact. But let's prove it manually:

```lean
theorem add_zero_eq' (n : ℕ) : n + 0 = n := by
  induction n with
  | zero => rfl
  | succ n ih => simp [Nat.succ_add, ih]
```

## The Formalization Workflow

### Step 1: Identify the Statement
Extract the precise mathematical claim. "For all n..." means we need a universal quantifier `∀ n`.

### Step 2: Type the Signature
Write the Lean type signature before the proof. This is often the hardest part: getting the types right.

### Step 3: Explore with Tactics
Use the interactive mode (`#check`, `#eval`, `sorry`) to explore. Don't try to write the full proof at once.

### Step 4: Use Mathlib
Lean's standard library (Mathlib) has thousands of lemmas. Before proving something from scratch, search Mathlib: `exact?`, `apply?`, and `simp?` can often close goals automatically.

## Common Pitfalls

1. **Universe polymorphism**: If you get "universe mismatch" errors, you probably need to add `{α : Type*}` type variables.
2. **Coercions**: Lean distinguishes ℕ from ℤ from ℚ. Explicit coercions prevent many headaches.
3. **Definitional equality**: Sometimes things that *look* equal aren't definitionally equal. Use `show` to rewrite your goal explicitly.

## LeanQC's Approach

In LeanQC, we automate steps 2-4 using a combination of language models and the Lean compiler's feedback. The key insight is that Lean's error messages are structured enough to be parsed programmatically. Each error tells you exactly what type was expected vs. received, which gives the model precise guidance for the next attempt.

Formal verification is hard, but the tooling has never been better. Give Lean 4 a try.
