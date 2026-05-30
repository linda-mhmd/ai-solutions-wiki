---
title: "Reflection Pattern - Self-Critique and Iterative Refinement for LLMs"
description: "Using self-reflection loops where an LLM evaluates and improves its own output, catching errors and improving quality without human intervention."
date: 2026-03-28
categories: [Patterns]
tags: [agentic-AI, reflection, self-critique, quality, prompt-engineering]
related:
  - patterns/evaluator-optimizer
  - patterns/chain-of-thought
  - patterns/react-pattern-ai
last_updated: 2026-05-30
---

The reflection pattern has an LLM generate an initial response, then evaluate that response for errors, gaps, or quality issues, and produce an improved version. This self-critique loop can run once or multiple times, with each iteration refining the output. The pattern exploits the observation that LLMs are often better at identifying problems in existing text than avoiding those problems during initial generation.

## How It Works

**Step 1: Generate** - The model produces an initial response to the prompt. This is the first draft, generated with standard instructions.

**Step 2: Critique** - The same model (or a different one) receives the original prompt plus the generated response, with instructions to identify specific flaws: factual errors, logical inconsistencies, missing information, unclear explanations, or violations of stated requirements.

**Step 3: Revise** - The model receives the original prompt, the initial response, and the critique, with instructions to produce an improved version that addresses the identified issues.

Steps 2 and 3 can repeat for multiple iterations. In practice, two to three reflection cycles capture most of the quality improvement. Beyond that, gains diminish and token costs accumulate.

## Implementation Variants

**Single-model reflection** - The same model generates, critiques, and revises. This is simplest to implement but can be limited because the model may have blind spots it cannot self-diagnose. Works well for catching formatting errors, missing sections, and obvious logical gaps.

**Dual-model reflection** - A stronger model critiques the output of a weaker model, or a model with different system instructions acts as the critic. This produces better critiques because the evaluator has a genuinely different perspective. The critic model can be smaller and cheaper since critique is typically easier than generation.

**Rubric-based reflection** - The critique step uses an explicit rubric or checklist. Instead of open-ended "find problems," the model evaluates against specific criteria: "Does the response include error handling? Does it address edge cases? Is the tone appropriate for the audience?" This produces more consistent and actionable feedback.

**Tool-augmented reflection** - The critique step includes tool calls to verify claims. The model checks code by running it, verifies facts against a knowledge base, or validates output against a schema. This catches errors that no amount of reasoning can detect.

## Where Reflection Adds Value

**Code generation** - The model writes code, then reviews it for bugs, edge cases, missing error handling, and security issues. Reflection catches a meaningful percentage of bugs that the initial generation misses.

**Long-form writing** - Articles, reports, and documentation benefit from a structural review pass: Does the introduction match the conclusion? Are all claims supported? Is the structure logical?

**Complex reasoning** - Math problems, multi-step analysis, and planning tasks benefit from a verification pass where the model checks its work step by step.

**Compliance-sensitive output** - When outputs must meet regulatory or policy requirements, a reflection step with an explicit compliance checklist catches violations before the output reaches the user.

## When Not to Use Reflection

Reflection doubles or triples the token cost of a request. For high-volume, low-stakes tasks (simple classification, entity extraction, short summaries), the cost is not justified. If the initial output quality is already acceptable for 95% of cases, add reflection selectively for the remaining 5% rather than applying it to everything.

Reflection also adds latency. Each cycle is another full model call. For real-time applications with strict latency budgets, reflection may not fit within the time constraint.

## Practical Tips

**Be specific in critique instructions** - Vague instructions like "find problems" produce vague critiques. Specify what to look for: "Check for factual accuracy, completeness relative to the original question, and logical consistency between paragraphs."

**Limit iterations** - Set a maximum of two to three reflection cycles. Diminishing returns set in quickly, and in some cases the model starts introducing new errors while fixing old ones.

**Track improvement** - Log quality scores across iterations to verify that reflection is actually improving output for your use case. If iteration two consistently scores the same as iteration one, you are burning tokens for no benefit.

**Separate the critic persona** - Use different system prompts for the generator and the critic. The critic should be instructed to be rigorous and specific, not deferential. A system prompt like "You are a demanding reviewer. Identify every flaw, no matter how minor" produces better critiques than generic instructions.
