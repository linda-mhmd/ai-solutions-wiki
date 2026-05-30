---
title: "Double Diamond for AI - Diverge and Converge Twice"
description: "Applying the Double Diamond design process to AI projects: discovering the right problem, then discovering the right AI solution through structured divergence and convergence."
date: 2026-03-28
categories: [Frameworks]
tags: [double-diamond, design-process, problem-framing, solution-design, discovery]
related:
  - frameworks/design-thinking-ai
  - frameworks/jobs-to-be-done-ai
  - frameworks/lean-startup-ai
last_updated: 2026-05-30
---

The Double Diamond is a design process model from the UK Design Council that structures work into four phases: Discover, Define, Develop, and Deliver. The process diverges (exploring broadly) and converges (focusing narrowly) twice, forming two diamond shapes. The first diamond finds the right problem. The second diamond finds the right solution. For AI projects, the Double Diamond prevents the common failure of solving the wrong problem with the right technology.

## Why Two Diamonds Matter for AI

AI teams are biased toward jumping to solutions. When someone says "we need a chatbot," the team starts building a chatbot. The first diamond challenges this by asking: what is the actual problem? Maybe the problem is not "users need a chatbot" but "users cannot find answers in our knowledge base." The solution might be a chatbot, or it might be better search, improved documentation, or a different UI entirely.

The second diamond then explores solution approaches within the defined problem space. If the problem is "users cannot find answers," potential solutions include RAG-based search, keyword search with better indexing, curated FAQ pages, or a combination. The second diamond evaluates these options before committing to one.

## Diamond 1: Discover the Right Problem

### Discover Phase (Diverge)

Explore the problem space broadly. Methods include:

**User research** - Interview 8-12 users who experience the problem. Ask about their workflow, frustrations, workarounds, and what good looks like. Look for patterns across interviews.

**Data analysis** - Examine existing data for problem signals. Support ticket volumes, error rates, processing times, and customer satisfaction scores quantify the problem.

**Stakeholder interviews** - Understand business priorities, constraints, and previous attempts to solve the problem. What has been tried before? Why did it fail?

**Process observation** - Watch users work. What they do often differs from what they describe. Observation reveals inefficiencies and workarounds that interviews miss.

The output of Discover is a rich, unfiltered understanding of the problem space with multiple problem candidates.

### Define Phase (Converge)

Synthesize the discoveries into a focused problem statement. Filter problem candidates using:

- **Severity**: How painful is this problem? Mild inconveniences do not justify AI investment.
- **Frequency**: How often does the problem occur? Daily problems are better candidates than annual ones.
- **AI suitability**: Is this a problem that AI can plausibly solve? Does data exist? Is the task amenable to pattern recognition?
- **Business alignment**: Does solving this problem support organizational priorities?

The output is a single, clearly defined problem statement: "Customer service agents spend an average of 6 minutes per ticket searching for answers across three knowledge bases, resulting in longer wait times and inconsistent responses."

## Diamond 2: Discover the Right Solution

### Develop Phase (Diverge)

Generate multiple solution concepts for the defined problem. For AI projects, explore:

**Different AI approaches** - RAG with semantic search, fine-tuned classification model, agentic workflow, rules-based system with AI fallback.

**Different integration patterns** - Fully automated, human-in-the-loop, AI-assisted (suggestions), AI-reviewed (checking human work).

**Different scope levels** - Start with one knowledge base or all three? Start with one team or the entire department?

**Non-AI solutions** - Would better documentation, a restructured knowledge base, or a different search tool solve the problem without AI? Include these as honest options.

Prototype the most promising concepts. For AI solutions, prototypes can be prompt-based demonstrations, Wizard of Oz simulations, or quick POCs using pre-trained models.

### Deliver Phase (Converge)

Select the best solution based on prototype results and evaluation criteria:

- **Effectiveness**: Does it solve the defined problem? Measure against the success criteria from the Define phase.
- **Feasibility**: Can it be built with available data, technology, and team capabilities?
- **Desirability**: Do users want it? Did they respond positively to the prototype?
- **Viability**: Does the business case support it? Are the costs justified by the benefits?

The output is a selected solution with a clear implementation plan, success criteria, and the evidence from prototyping that supports the decision.

## Anti-Patterns

**Skipping Diamond 1** - Starting with "build a chatbot" without understanding the problem. The most common failure mode in AI projects.

**Converging too early** - Jumping to a solution during the Discover phase. Stay in divergent thinking until the research is complete.

**Only diverging** - Exploring endlessly without converging on a decision. Set timeboxes for each phase.

## When to Use the Double Diamond

Use the Double Diamond at the start of any significant AI initiative (>1 month of effort). For smaller tasks (adding a feature to an existing AI system), the second diamond alone may suffice. The framework is most valuable when the problem is not well understood and multiple stakeholders have different perspectives on what should be built.
