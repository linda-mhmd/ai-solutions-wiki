---
aliases: ["/engineers/"]
title: "For Software Engineers and Architects"
description: "You already know how to build production systems. Learn the part that is genuinely new: how LLMs behave as components, and where your instincts mislead you."
date: 2026-07-17
tags: ["engineering", "architecture", "llm", "production"]
---

## You know software. The model is the part that behaves differently.

<figure class="bz-figure">
  <img src="/img/enterprise-dark/gears-neural-wires-notext.png" alt="Interlocking dark industrial gears laced with glowing red neural wires, mechanical precision meeting a learned system." loading="lazy">
  <figcaption>An LLM is a component in a system you already know how to build. The gears are familiar. The wiring is new.</figcaption>
</figure>

You have shipped production systems for a decade or more. You know distributed systems, test pyramids, deployment pipelines, and incident review. None of that knowledge is obsolete. An LLM-backed feature is still a service with an API, a latency budget, a cost profile, and failure modes.

The delta is not engineering. The delta is the behaviour of one component. An LLM is a stateless function that takes text in and produces text out, probabilistically. Almost every surprise you will hit traces back to that one property.

This page maps the shortest path from "experienced engineer" to "experienced engineer who ships LLM features with confidence." It skips everything you already know.

---

### Where strong engineering instincts mislead you

**Determinism.** You expect the same input to produce the same output. With LLMs it does not, by design. Setting temperature to 0 narrows the variance but most hosted APIs still do not guarantee bit-identical output across runs. Every downstream assumption built on reproducibility needs rethinking: snapshot tests, response diffing, exact-match assertions.

**Caching semantics.** Your instinct says hash the input, cache the output. Two prompts that mean the same thing hash differently, so hit rates collapse. Provider-side [prompt caching](/glossary/prompt-caching/) helps, but it is prefix-based: a cache hit requires an exact match on the leading tokens, which changes how you order your prompts. And any cached response silently encodes the model version that produced it.

**Regression via model updates.** Your dependencies change when you bump a version. A hosted model can change behaviour underneath a pinned-looking name, and providers retire model versions on their schedule, not yours. Treat every model as a dependency with a deprecation clock. The mitigation is familiar: pin the most specific version identifier available, and run your evals before and after every switch.

**Error handling.** A wrong answer arrives with an HTTP 200. The hardest failures are not exceptions you can catch. They are confident, fluent, plausible outputs that are false. Your retry logic, circuit breakers, and timeouts all still apply, but they only cover the failures the transport layer can see.

---

### Where your instincts transfer directly

**Testing discipline.** Evals are test suites for model behaviour: versioned datasets, scored outputs, thresholds in CI. If you have built a test pyramid, you can build an eval harness. The shift is from exact assertions to statistical ones.

**Observability.** Log prompts, outputs, token counts, latency, and cost per request. Trace multi-step chains the way you trace microservice calls. Teams that already take [observability](/glossary/observability/) seriously debug LLM systems dramatically faster.

**Versioning.** Prompts are code. Put them in git, review changes, and record which prompt version and model version produced which output. Your configuration management habits apply without modification.

**Architecture judgement.** Rate limits, retries, backpressure, cost ceilings, blast-radius thinking. An LLM API is a slow, expensive, occasionally wrong external dependency. You have designed around worse.

---

### Your reading path

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Start</span>
    <span class="bz-flow-step-name">An LLM Mental Model for Engineers</span>
    <span class="bz-flow-step-desc">What the model actually is: a stateless token predictor. Every practical consequence follows from this.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Hands-on</span>
    <span class="bz-flow-step-name">Your First LLM API Call</span>
    <span class="bz-flow-step-desc">Make one real request. See tokens, roles, and parameters as concrete request fields, not concepts.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Architecture</span>
    <span class="bz-flow-step-name">Building RAG Systems</span>
    <span class="bz-flow-step-desc">The most common production LLM architecture: retrieval, chunking, embeddings, and generation with context.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Production</span>
    <span class="bz-flow-step-name">AI Systems Are Software Systems</span>
    <span class="bz-flow-step-desc">Why the discipline you already have is the thing that makes AI systems work in production.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Depth</span>
    <span class="bz-flow-step-name">Foundations</span>
    <span class="bz-flow-step-desc">The timeless engineering principles this wiki builds on, applied to AI delivery end to end.</span>
  </div>
</div>

In order: [An LLM Mental Model for Engineers](/guides/llm-mental-model-for-engineers/), [Your First LLM API Call](/guides/your-first-llm-api-call/), [Building RAG Systems](/guides/building-rag-systems/), [AI Systems Are Software Systems](/guides/ai-systems-are-software-systems/), then the [Foundations](/foundations/) section for depth.

---

### The six terms that unlock the rest

Crisp definitions, engineer to engineer. Each links to a full glossary entry.

**[Token](/glossary/tokenization/):** The unit the model reads, generates, and bills by. Roughly four characters of English text. Your input is token IDs, not strings.

**[Context window](/glossary/context-window/):** The hard cap on tokens per request, input plus output combined. There is no session state behind it. "Memory" is you resending history.

**[Temperature](/glossary/temperature-and-sampling/):** A sampling parameter that scales output randomness. 0 is near-greedy selection, not a determinism guarantee.

**[Embeddings](/glossary/embeddings/):** Fixed-length vectors that encode meaning. Nearby vectors mean similar text. The data structure behind semantic search and RAG retrieval.

**[RAG](/glossary/rag/):** Retrieval-augmented generation. Fetch relevant documents at request time and include them in the prompt. A search problem stapled to a generation call.

**[Evals](/glossary/ai-evaluation/):** Automated tests for model behaviour. Scored datasets with pass thresholds, run in CI. The regression suite that makes model and prompt changes safe.

---

### How to approach the next month

Do not start with a framework. Start with raw API calls so you see exactly what crosses the wire. Frameworks earn their place later, once you know what they abstract.

Build one small end-to-end feature before reading broadly. A summariser over your own data teaches you more about context windows and cost than any article. Then add evals before you add capabilities. The teams that struggle are rarely weak at engineering. They scaled a prototype before they could measure whether changes made it better or worse.

---

**Start here:** [An LLM Mental Model for Engineers](/guides/llm-mental-model-for-engineers/)

## Also useful

- [Your First LLM API Call](/guides/your-first-llm-api-call/): one real request, dissected field by field
- [Testing Non-Deterministic Systems](/guides/testing-non-deterministic-systems/): how test discipline survives contact with probabilistic output
- [LLM Evaluation Methods](/guides/llm-evaluation-methods/): building the eval harness that replaces exact-match assertions
- [AI Observability](/guides/ai-observability-guide/): what to log, trace, and alert on in LLM systems
- [OWASP Top 10 for LLM Applications](/guides/owasp-top-10-llm/): the threat model that is genuinely new, starting with prompt injection
- [LLM Cost Optimization](/guides/llm-cost-optimization/): the cost model of per-token pricing and how architecture decisions drive it
- [AI for Software Engineering](/guides/ai-for-software-engineering/): the other direction, using LLMs to build software faster
