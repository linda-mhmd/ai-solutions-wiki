---
title: "Model Evaluation"
description: "Model evaluation tests an AI model in isolation, measuring its raw capabilities and refusals on fixed inputs through benchmarks and red-teaming."
date: 2026-06-29
tags: ["evaluation", "benchmarks", "red-teaming", "llm", "ai-safety"]
related:
  - glossary/ai-evaluation
  - glossary/ai-benchmark
  - glossary/red-teaming
  - glossary/system-evaluation
  - glossary/rag-evaluation
  - guides/how-ai-models-are-evaluated
---

<figure class="bz-figure">
  <img src="/img/obsidian-lab/lens-cylinder-copper-notext.png" alt="A precision lens on dark slate, representing measuring a model in isolation." loading="lazy">
  <figcaption>Model evaluation measures the model alone, the way a lens is tested on the bench before it goes into a camera.</figcaption>
</figure>

Model evaluation is the practice of testing an AI model on its own, separate from any application built around it. You give the model fixed inputs and score its outputs on capabilities like reasoning, coding, and factual recall, and on behaviours like refusing harmful requests. The two main methods are [benchmarks](/glossary/ai-benchmark/), which run the model against standard test sets, and [red-teaming](/glossary/red-teaming/), which probes for failures using adversarial prompts. Model evaluation answers one question: how good is this model, by itself, right now?

## A real-world analogy

Think of a camera lens. Before it goes into a camera body, the manufacturer tests the lens alone on a bench. They measure sharpness, distortion, and how it handles glare. That is model evaluation: the component tested in isolation, on a controlled rig, against a fixed set of charts.

A great lens can still take poor photos once you put it in a cheap body with a shaky autofocus and a bad photographer. Measuring the finished photographs is a different job. That job is [system evaluation](/glossary/system-evaluation/), and it tests everything together, not the lens alone.

## How it works

Model evaluation follows a repeatable loop. You pick a set of tasks, run the model on them without changing the model, and score the results the same way every time.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Fix the inputs</span>
    <span class="bz-flow-step-desc">Choose standard test sets and adversarial prompts. The model does not see them in advance.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Run the model alone</span>
    <span class="bz-flow-step-desc">Send inputs to the model with no retrieval, no tools, and no surrounding application.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Score capabilities</span>
    <span class="bz-flow-step-desc">Grade accuracy, reasoning, and coding against known answers.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Probe for failures</span>
    <span class="bz-flow-step-desc">Red-team the model to see where refusals break and unsafe outputs appear.</span>
  </div>
</div>

Benchmarks handle the capability side. Stanford's Holistic Evaluation of Language Models (HELM) is one well-known example, scoring models across many scenarios and dimensions to make comparisons more transparent. Red-teaming handles the failure side. It is a proactive search for weaknesses, closer to a security audit than to a regression test.

## What it captures and what it misses

Model evaluation captures the raw quality of the model: how well it reasons, how often it gets facts right, and whether it refuses unsafe requests. Because the inputs are fixed and the model runs alone, results are comparable across models and repeatable over time.

Model evaluation misses everything you build around the model. It does not test your [retrieval](/glossary/rag-evaluation/) layer, your tools, your prompts, or the [agent](/glossary/agent-evaluation/) logic that decides when to call which component. A model that scores well on a benchmark can still fail in production when the surrounding pipeline feeds it bad context or misuses its outputs.

## Model evaluation vs system evaluation

| | Model evaluation | System evaluation |
|---|---|---|
| **What it tests** | The model alone | The model plus its pipeline |
| **Inputs** | Fixed, standard | Real use-case data |
| **Includes retrieval and tools** | No | Yes |
| **Main methods** | Benchmarks, red-teaming | End-to-end task scoring |
| **Best for** | Comparing models | Judging your application |

Both matter. Use model evaluation to pick a capable, safe model. Use [system evaluation](/glossary/system-evaluation/) to confirm your application works with that model inside it.

## How it connects to related concepts

Model evaluation is one branch of the broader discipline of [AI evaluation](/glossary/ai-evaluation/), which also covers system, agent, and workflow evaluation. Within model evaluation, [benchmarks](/glossary/ai-benchmark/) measure capability and [red-teaming](/glossary/red-teaming/) measures resilience to attack. When you move from choosing a model to shipping a product, you graduate from model evaluation to [system evaluation](/glossary/system-evaluation/) and, for retrieval-based apps, to [RAG evaluation](/glossary/rag-evaluation/).

## Further reading

- [AI evaluation](/glossary/ai-evaluation/): the parent concept that groups model, system, agent, and workflow testing.
- [AI benchmark](/glossary/ai-benchmark/): the standard test sets that measure model capabilities.
- [Red-teaming](/glossary/red-teaming/): adversarial probing for unsafe or brittle model behaviour.
- [System evaluation](/glossary/system-evaluation/): testing the model together with its retrieval, tools, and application logic.
- [How AI models are evaluated](/guides/how-ai-models-are-evaluated/): a step-by-step guide to running evaluations in practice.
- [HELM by Stanford CRFM](https://crfm.stanford.edu/helm/): open framework for holistic, reproducible model evaluation.
- [Holistic Evaluation of Language Models (paper)](https://arxiv.org/abs/2211.09110): the research behind the HELM approach to measuring models.
