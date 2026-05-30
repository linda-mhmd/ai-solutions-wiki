---
title: "For Product Managers"
description: "The AI vocabulary your team assumes you already have. Understand what engineers are building, evaluate proposals, and ask the right questions in every AI project room."
date: 2026-05-29
tags: ["product-management", "beginner", "ai-ml", "strategy"]
last_updated: 2026-05-30
---

## The AI vocabulary your team assumes you already have.

<figure class="bz-figure">
  <img src="/img/wardrobe/stylists-brief-ai.png" alt="Person reviewing a brief in a dark atelier, surrounded by structured notes and references." loading="lazy">
  <figcaption>Every AI brief needs a product manager who can read between the technical lines.</figcaption>
</figure>

You are in rooms where AI decisions get made. Your engineers propose architectures. Vendors pitch "AI-powered" features. Executives ask whether the roadmap is realistic. You need to hold your own in every one of those conversations.

This wiki is not a coding course. It is a structured vocabulary. You learn what things are, what they cost, and what questions expose the gaps in a proposal.

---

### What you need to understand

**Evaluating a technical proposal** requires knowing whether the scope is realistic. An engineer who says "we can build a RAG pipeline in two weeks" is making assumptions about data quality, embedding infrastructure, and retrieval latency. You cannot push back without a working model of what those things are.

**Vendors claiming "AI-powered"** are describing a spectrum that runs from a simple keyword filter to a fine-tuned language model. The term tells you nothing. The architecture does.

**Risk and scope** are connected to technical choices you do not control directly. But you can ask: what happens when the model returns a wrong answer? What is the fallback? How does this behave under load? Those questions change how engineers design a system.

The reading path below gives you the concepts in the order they build on each other. Start with APIs and databases. Those two concepts underpin almost every AI system you will ship.

---

### Your reading path

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Start</span>
    <span class="bz-flow-step-name">What is an API?</span>
    <span class="bz-flow-step-desc">APIs are how every AI feature connects to the rest of your product. Start here.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Next</span>
    <span class="bz-flow-step-name">What is a Database?</span>
    <span class="bz-flow-step-desc">AI systems read and write data constantly. Know what that means architecturally.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Then</span>
    <span class="bz-flow-step-name">What is the Cloud?</span>
    <span class="bz-flow-step-desc">Where your AI feature actually runs, and what that costs at scale.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Applied</span>
    <span class="bz-flow-step-name">Building RAG Systems</span>
    <span class="bz-flow-step-desc">The most common AI architecture your team will propose. Understand the moving parts.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Strategy</span>
    <span class="bz-flow-step-name">Wardley Mapping for AI</span>
    <span class="bz-flow-step-desc">A strategic tool for evaluating where AI creates genuine advantage versus commodity noise.</span>
  </div>
</div>

---

### Questions worth asking in every AI project room

- What does this system do when the model returns a wrong answer?
- What data does this model train on, and who owns that data?
- How does cost scale as usage grows?
- What is the latency at the 95th percentile, not the average?
- Which parts of this are vendor-locked and which are portable?

These questions do not require code knowledge. They require understanding that AI systems have inputs, outputs, failure modes, and costs. This wiki gives you that understanding.

---

### Vocabulary that comes up constantly

**RAG (Retrieval-Augmented Generation):** A pattern where a language model is given relevant documents before generating a response. Most "AI-powered search" or "AI assistant" features use some version of this.

**Foundation model:** A large pre-trained model (like GPT-4 or Claude) that your product is built on top of. You pay per use. You do not train it yourself.

**Latency:** How long a response takes. AI features are often slower than traditional features. Users notice.

**Context window:** How much text a model can consider at once. Relevant when building anything that processes long documents.

---

**Start here:** [What is an API?](/basics/what-is-an-api/)

## Also useful

- [What is a Database?](/basics/what-is-a-database/): the storage layer every AI system reads from and writes to
- [Building RAG Systems](/guides/building-rag-systems/): the architecture behind most AI features your engineers will propose
- [Wardley Mapping for AI](/frameworks/wardley-mapping-ai/): a framework for evaluating where AI investment creates real strategic value
- [Foundation Models](/glossary/foundation-models/): what it means to build on top of a model you do not own
