---
title: "Level 4: AI and Building"
description: "Production AI, vibe coding, and language models. How AI systems actually work in production, how to direct AI tools to build software, and what a production AI stack looks like."
date: 2026-05-29
level_num: 4
tags: ["intermediate", "ai-ml", "vibe-coding", "production-ai", "llm"]
last_updated: 2026-05-30
---

<figure class="bz-figure">
  <img src="/img/dark-cherry/prism-precision.png" alt="A black prism refracting a red laser beam into a precise output: transformation from raw input to structured, directed result." loading="lazy">
  <figcaption>A language model does exactly this. Raw text enters, the model transforms it through learned patterns, and a structured, directed result emerges. The precision comes from training. The direction comes from you.</figcaption>
</figure>

<span class="bz-section-label">Level 4 of 4</span>

## This is where everything connects

Level 4 is the destination. Infrastructure from Level 3 hosts your AI. Git from Level 2 manages your code. Terminals from Level 1 deploy it. Hardware from Level 0 runs it. This level does not introduce a new domain: it shows you how all four previous domains combine into production AI systems, and how to use AI tools to build software whether or not you know how to code.

Two articles. Each one is dense. The material here changes how you think about AI, not as a magic service or an existential threat, but as a specific technical system with known properties, known limits, and known patterns for building on top of it.

---

## What you know after Level 4

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">ML fundamentals</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Training</span>
      <span class="bz-arch-chip">Inference</span>
      <span class="bz-arch-chip">Parameters</span>
      <span class="bz-arch-chip">Tokens</span>
      <span class="bz-arch-chip-note">What machine learning actually does: optimise a function on data until predictions become accurate</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Language models</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Transformers</span>
      <span class="bz-arch-chip">Attention</span>
      <span class="bz-arch-chip">Context window</span>
      <span class="bz-arch-chip">Temperature</span>
      <span class="bz-arch-chip-note">How LLMs predict the next token, what the context window limits, and why temperature affects output randomness</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Prompt engineering</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">System prompts</span>
      <span class="bz-arch-chip">Few-shot examples</span>
      <span class="bz-arch-chip">Chain of thought</span>
      <span class="bz-arch-chip-note">How to direct model behaviour through input structure rather than model retraining</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Production AI stack</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">RAG pipelines</span>
      <span class="bz-arch-chip">Vector databases</span>
      <span class="bz-arch-chip">Evals</span>
      <span class="bz-arch-chip">Observability</span>
      <span class="bz-arch-chip-note">The infrastructure that turns an LLM API call into a reliable, auditable, production feature</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Vibe coding</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Cursor / Claude Code</span>
      <span class="bz-arch-chip">Directing AI tools</span>
      <span class="bz-arch-chip">Prompt patterns</span>
      <span class="bz-arch-chip-note">Building software by describing intent; the Levels 0-3 vocabulary makes AI direction precise and effective</span>
    </div>
  </div>
</div>

---

## Learning path

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Start here</span>
    <span class="bz-flow-step-name">ML fundamentals</span>
    <span class="bz-flow-step-desc">Training, inference, parameters, and loss functions. What the model is and how it got its capabilities.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Layer 2</span>
    <span class="bz-flow-step-name">Language models</span>
    <span class="bz-flow-step-desc">Transformers, attention, context windows. Why LLMs can write code but cannot count letters reliably.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Layer 3</span>
    <span class="bz-flow-step-name">Prompt engineering</span>
    <span class="bz-flow-step-desc">System prompts, few-shot examples, and chain of thought. How to direct model behaviour without touching weights.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Layer 4</span>
    <span class="bz-flow-step-name">Production AI systems</span>
    <span class="bz-flow-step-desc">RAG, evals, observability, and the infrastructure that makes an AI feature reliable enough to ship.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Build</span>
    <span class="bz-flow-step-name">Your first AI product</span>
    <span class="bz-flow-step-desc">Vibe coding tools, architectural direction, and the vocabulary to brief an AI coding assistant precisely.</span>
  </div>
</div>

---

## Before and after

| | Before Level 4 | After Level 4 |
|---|---|---|
| **AI** | Magic / hype / opaque API | A statistical model trained on text; inference is prediction; hallucination is confident wrong prediction |
| **LLM limitations** | "AI sometimes makes things up" | Context window limits what the model can see; temperature controls randomness; retrieval fixes knowledge gaps |
| **Prompts** | Copy from Reddit, hope for the best | System prompts set behaviour; few-shot examples calibrate format; explicit constraints reduce hallucination |
| **RAG** | A three-letter acronym in architecture docs | Retrieval-Augmented Generation: retrieve relevant documents at query time and inject them into the model's context |
| **AI product cost** | A monthly bill that grows mysteriously | Token cost per request times volume; context length and model size are the two main levers |
| **Vibe coding** | AI writes code for you, sometimes works | Directed iteration: you own the architecture; AI implements; Levels 0-3 vocabulary makes direction precise |

---

## Articles in this level

### [What is AI?](/basics/what-is-ai/)

Machine learning, neural networks, and language models explained without mathematics. Covers supervised learning, the training process, what parameters are, how transformer architecture enables language understanding, and why GPUs are the limiting resource in AI development. Includes an honest account of what language models cannot do and why.

**You should read this if:** You use AI tools daily but could not explain to a stakeholder why an AI system made a specific decision, or you need to evaluate an AI vendor's claims against what the technology actually does.

### [What is Vibe Coding?](/basics/what-is-vibe-coding/)

Building software by describing intent and letting AI write the code. Covers the current landscape of vibe coding tools (Cursor, Claude Code, v0, Bolt), the mental model shift from writing code to directing a system, and the patterns that separate effective vibe coders from frustrated ones. Explains why Levels 0-3 vocabulary makes AI direction precise and effective.

**You should read this if:** You want to build a prototype, an internal tool, or a product MVP without hiring a full development team, and you want to understand how to do it reliably rather than getting stuck on the first error message.

---

## Why this matters in practice

**AI is infrastructure, not magic**: A language model is an HTTP API. It takes a JSON body with a prompt and returns a JSON body with a completion. It runs on GPU servers in a cloud region. It has rate limits, token costs, and latency characteristics. Treating it as infrastructure, rather than magic, is what separates products that scale from prototypes that do not.

**Hallucination is a design problem**: LLMs predict plausible next tokens based on training data. When the training data does not cover a topic accurately, the model generates plausible-sounding text that is factually wrong. This is not a bug to report to the vendor. It is a known property to design around: retrieval, grounding, and evals are the design solutions. Level 4 covers all three.

**The vocabulary gap costs money**: When a product team cannot evaluate AI vendor claims, they sign contracts for capabilities the model does not reliably have. When a product team cannot write a precise system prompt, they get inconsistent outputs they cannot debug. The concepts in Level 4 close that gap.

**Vibe coding scales further than you expect**: The constraint on vibe coding is not the AI. It is the quality of architectural direction. A person who understands what a database schema is, what an API endpoint does, and how a server handles requests can direct an AI coding tool to build a production-quality feature. That same person without Levels 0-3 will build a fragile prototype and not know why it fails.

---

## The workshop connection

The three-workshop method used at [ai-workshops.online](https://ai-workshops.online) maps directly to the concepts in this level.

**Workshop 1 (Discovery)** is use case prioritisation: which AI capabilities map to which business problems, and which are technically feasible with current models. That evaluation requires understanding what language models can and cannot do reliably, covered in "What is AI?"

**Workshop 2 (Concept)** is architecture: where does the model fit in the system, what data sources feed it, how does retrieval work, and where do evals run. Reading that architecture requires Level 3 vocabulary. Designing it requires Level 4 knowledge of production AI patterns.

**Workshop 3 (Prototype)** is building: a working demo using the vibe coding approach, with real infrastructure behind it. The prototype is built using the techniques in "What is Vibe Coding?" and deployed on the infrastructure from Level 3.

The wiki is the theory. The workshops are the practice. Level 4 is where both converge.

---

## What comes next

You have completed the foundations curriculum. The next step is depth.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Production AI</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Building RAG Systems</span>
      <span class="bz-arch-chip">LLMOps</span>
      <span class="bz-arch-chip-note">Step-by-step guides to production AI implementation</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Infrastructure</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">From Zero to Production</span>
      <span class="bz-arch-chip">Capacity Planning for AI</span>
      <span class="bz-arch-chip-note">How to deploy and scale what you build</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Glossary</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Transformer Architecture</span>
      <span class="bz-arch-chip">Attention Mechanism</span>
      <span class="bz-arch-chip">Foundation Models</span>
      <span class="bz-arch-chip-note">Precise definitions for the technical vocabulary of AI systems</span>
    </div>
  </div>
</div>

**Deep dives:**
- [Building RAG Systems](/guides/building-rag-systems/): document ingestion, chunking, embeddings, and retrieval in production
- [LLMOps](/glossary/llmops/): the operational discipline of running language models reliably at scale
- [From Zero to Production](/guides/from-zero-to-production/): the full path from prototype to deployed product

---

## Further reading

- [What is AI?](/basics/what-is-ai/): language models, training, and inference in plain English
- [What is Vibe Coding?](/basics/what-is-vibe-coding/): directing AI tools to build software, with tool comparisons and prompt patterns
- [Anthropic Documentation](https://docs.anthropic.com/): the authoritative reference for Claude models, prompt engineering, and the Messages API
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762): the 2017 paper that introduced the transformer architecture; the abstract is readable
- [Andrej Karpathy: Let's build GPT from scratch](https://www.youtube.com/watch?v=kCc8FmEb1nY): the clearest explanation of how language models work at a technical level
- [Prompt Engineering Guide](https://www.promptingguide.ai/): comprehensive, maintained reference on prompting techniques with examples
- [LLM Visualization](https://bbycroft.net/llm): interactive visual walkthrough of transformer inference; no code required
