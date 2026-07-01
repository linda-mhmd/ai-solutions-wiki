---
title: "AI Benchmark"
description: "A standardized test that runs the same inputs through one or more AI models and scores the outputs so systems can be compared fairly."
date: 2026-07-01
tags: ["evaluation", "benchmarks", "ai-safety", "red-teaming"]
related:
  - glossary/red-teaming
  - glossary/ai-red-team
  - glossary/rag-evaluation
  - glossary/ai-safety
  - guides/how-ai-models-are-evaluated
---

<figure class="bz-figure">
  <img src="/img/obsidian-lab/lens-cylinder-copper-notext.png" alt="A precision machined lens on dark slate, representing standardized measurement of an AI system." loading="lazy">
  <figcaption>A benchmark is a precision instrument: it measures every model against the same fixed reference so the comparison means something.</figcaption>
</figure>

An AI benchmark is a standardized experiment. It runs the same set of inputs through one or more models, scores the outputs against a fixed rubric, and reports the results. The goal is a fair comparison. Because every model is evaluated under the same protocol, the same inputs (or the same rules for generating them) and the same scoring, you can rank systems on one scale instead of trusting a vendor's own headline number. Some modern benchmarks randomize parameters or generate tasks dynamically, so the exact prompts can differ while the protocol stays fixed.

## A concrete analogy

Think of a driving test. Every candidate follows the same route, faces the same manoeuvres, and gets marked against the same checklist. The examiner does not invent an easier route for a favoured driver. That fixed, shared procedure is what makes the pass or fail meaningful. An AI benchmark works the same way: fix the questions, fix the marking scheme, then let every model take the test.

## A benchmark is one part of evaluation

Beginners often use "benchmark" and "evaluation" interchangeably. They are not the same. Evaluation is the whole process of judging whether a model is fit for use. A benchmark is one tool inside that process, and below each benchmark sit the individual test cases.

- Evaluation: the full practice, including [red-teaming](/glossary/red-teaming/), human review, and live monitoring.
- Benchmark: one standardized, scored test within evaluation.
- Test case: one graded example inside a benchmark.

A second distinction matters just as much. Evaluating a model on its own is not the same as evaluating the system around it. A strong model wired to retrieval, tools, and agents can still fail at the system level, and a benchmark that scores the model alone will miss those failures. The guide on [how AI models are evaluated](/guides/how-ai-models-are-evaluated/) walks through the full picture.

## A benchmark is more than a headline score

A single benchmark score hides a lot of structure. Under the number sits a large collection of individual test cases, and a benchmark can contain tens of thousands of them. Each case carries metadata that shapes how it is run and graded.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Test case</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Category</span>
      <span class="bz-arch-chip">Persona</span>
      <span class="bz-arch-chip">Age</span>
      <span class="bz-arch-chip">Language</span>
      <span class="bz-arch-chip">Conversation history</span>
      <span class="bz-arch-chip-note">The context that surrounds the prompt</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Expected behavior</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">What a good answer looks like</span>
      <span class="bz-arch-chip-note">The reference the output is judged against</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Scoring rubric</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Rules for pass or fail</span>
      <span class="bz-arch-chip">Partial credit</span>
      <span class="bz-arch-chip-note">Turns one output into one number</span>
    </div>
  </div>
</div>

That metadata matters. A safety question aimed at a teenager needs different expected behavior than the same question from an adult. The rubric encodes what "correct" means so two people scoring the same output reach the same verdict.

## Main types of benchmark

Benchmarks fall into two broad families.

Capability benchmarks measure what a model can do. They cover maths, coding, reasoning, and factual knowledge. A high score here means the model solves the problems well.

Safety and red-teaming benchmarks measure how a model behaves under pressure or attack. They probe areas such as self-harm, teen safety, scams, jailbreaks, [prompt injection](/glossary/prompt-injection/), and hallucination. Here a high score means the model resists the harmful behavior rather than performs it. These sit close to the work of an [AI red team](/glossary/ai-red-team/) and the broader practice of [red-teaming](/glossary/red-teaming/).

## How it works

A benchmark run follows the same pipeline every time.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Feed inputs</span>
    <span class="bz-flow-step-desc">Send the same fixed test cases to each model.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Collect outputs</span>
    <span class="bz-flow-step-desc">Record every model response, unchanged.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Score</span>
    <span class="bz-flow-step-desc">Grade each output against the rubric.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Compare</span>
    <span class="bz-flow-step-desc">Aggregate scores and rank the systems.</span>
  </div>
</div>

Scoring is the hard part. Modern evaluation pipelines increasingly combine automated scorers, LLM-as-a-judge models, and pairwise or ensemble judging to grade at scale. But models are not always reliable judges of other models: a model scoring another can share the same blind spots and miss subtle failures. Human evaluation remains the gold standard for subjective and safety-critical tasks, even though humans no longer score everything by hand.

## Public versus private benchmarks

A public benchmark discloses its test cases, its scoring rubric, and its method, so anyone can reproduce the result. A private benchmark keeps those details hidden and reports only the final number.

| | Public benchmark | Private benchmark |
|---|---|---|
| **Test cases** | Disclosed | Hidden |
| **Reproducible** | Yes | No |
| **Chosen by** | Independent method | Often the vendor |
| **Ease of verification** | Easier to verify | Harder to verify |
| **Risk** | Models can overfit to it | You cannot verify it |

A public, reproducible benchmark lets anyone check the result, which builds trust that a vendor-chosen number cannot. A private benchmark is not automatically untrustworthy, though: it can be credible if an independent party audits it. The real gap is verification. If a company picks the tests and hides the method, an outsider cannot tell whether the score reflects real capability or a favourable setup. This tension is why covert or vendor-controlled benchmarking draws scrutiny, as in the [Meta covert-benchmarking case](/news/meta-competitor-ai-benchmarking/).

## The move toward dynamic red-teaming benchmarks

Static benchmarks age fast, and two failure modes have names. Benchmark contamination happens when test cases leak into training data, so a model has effectively seen the answers in advance. Benchmark saturation happens when the best models all cluster near the maximum score, so the test no longer separates them. Either way, a model can pass without getting genuinely more capable or safer. Newer work builds dynamic, automated red-teaming benchmarks that generate real, verifiable examples on the fly.

- **RIFT-Bench** is a dynamic red-teaming framework for agentic AI systems. It uses a graph-driven method to discover a system's structure, then deploys adaptive adversarial probes across many attack vectors. The authors evaluated 45 different agentic systems with it (arXiv 2606.23927).
- **REALM** is a unified red-teaming benchmark for physical-world vision-language models. It tests how these models respond to adversarial and manipulated inputs in real-world scenarios where safety matters (arXiv 2606.23892).
- **AIRTBench** measures the autonomous red-teaming capability of language models themselves: how well a model can find and exploit vulnerabilities without a human driving each step (arXiv 2506.14682).
- **The Agent Red Teaming (ART) benchmark** ran as a large-scale public competition. Security researchers probed AI agents for direct jailbreaks, indirect prompt injection through tools and knowledge bases, and other failures, scored with both automated metrics and human judgment (arXiv 2507.20526).

These approaches connect directly to [adversarial machine learning](/glossary/adversarial-machine-learning/) and to specialized evaluation such as [RAG evaluation](/glossary/rag-evaluation/), where retrieval quality needs its own scoring rather than a single capability number.

## How it connects to related concepts

Benchmarks are the measurement layer of [AI safety](/glossary/ai-safety/). A safety claim without a reproducible benchmark is an assertion, not evidence. The safety and red-teaming families above formalise the work that [red teams](/glossary/ai-red-team/) do by hand into a repeatable, scored test. For a full walkthrough of the evaluation process, see the guide on [how AI models are evaluated](/guides/how-ai-models-are-evaluated/).

## Further reading

- [How AI models are evaluated](/guides/how-ai-models-are-evaluated/): the end-to-end evaluation process behind a benchmark score.
- [Red-teaming](/glossary/red-teaming/): the adversarial testing practice that safety benchmarks formalise.
- [AI red team](/glossary/ai-red-team/): the people and function that stress-test models.
- [RAG evaluation](/glossary/rag-evaluation/): scoring retrieval-augmented systems, a specialized benchmark case.
- [Meta covert-benchmarking case](/news/meta-competitor-ai-benchmarking/): a real-world example of why disclosure matters.
- [RIFT-Bench (arXiv 2606.23927)](https://arxiv.org/abs/2606.23927): dynamic red-teaming for agentic AI systems.
- [REALM (arXiv 2606.23892)](https://arxiv.org/pdf/2606.23892): a unified red-teaming benchmark for physical-world vision-language models.
- [AIRTBench (arXiv 2506.14682)](https://arxiv.org/pdf/2506.14682): measuring autonomous red-teaming capability in language models.
- [Agent Red Teaming benchmark (arXiv 2507.20526)](https://arxiv.org/pdf/2507.20526): a large-scale public red-teaming competition for AI agents.
