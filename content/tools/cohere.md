---
title: "Cohere"
description: "Enterprise-focused model provider offering Command generation models plus Embed and Rerank models for search and retrieval-augmented generation, with cloud, VPC, and on-premises deployment."
date: 2026-06-29
tags: ["ai", "llm", "rag", "enterprise", "embeddings"]
tool_category: "AI"
related:
  - glossary/foundation-models
  - glossary/rag
  - glossary/llm
  - tools/mistral-ai
  - tools/claude-anthropic
  - comparisons/llm-landscape-2026
---

<figure class="bz-figure">
  <img src="/img/dark-cherry/prism-precision.png" alt="A black prism splitting a red laser, representing an enterprise-focused model provider." loading="lazy">
  <figcaption>Cohere positions itself around precise retrieval and generation for regulated enterprises rather than a single flagship chat model.</figcaption>
</figure>

Cohere is a model provider that builds [foundation models](/glossary/foundation-models/) for enterprises that need to keep data inside their own boundaries. It offers three product lines: Command models for generation, Embed models for turning text and images into vectors, and Rerank models that reorder search results by relevance. Cohere's positioning centres on search and [retrieval-augmented generation](/glossary/rag/), plus deployment flexibility for companies that cannot send data to a public API.

The company packages these models under North, an enterprise AI platform for workplace productivity, and Compass, a search and discovery system. The underlying models are also available directly through Cohere's API and through major cloud marketplaces.

## Where Cohere sits in the stack

Cohere spans two roles in a typical AI application: it supplies the generation model that writes answers, and it supplies the retrieval models that decide which documents feed those answers.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Application</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">North platform</span>
      <span class="bz-arch-chip">Compass search</span>
      <span class="bz-arch-chip-note">Enterprise workplace agents and search</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Generation</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Command A</span>
      <span class="bz-arch-chip">Command A+</span>
      <span class="bz-arch-chip">Command R7B</span>
      <span class="bz-arch-chip-note">Tool use, agents, RAG</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Retrieval</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Embed v4.0</span>
      <span class="bz-arch-chip">Rerank v4.0</span>
      <span class="bz-arch-chip-note">Vectors and relevance scoring for RAG</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Deployment</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Cohere API</span>
      <span class="bz-arch-chip">VPC</span>
      <span class="bz-arch-chip">On-premises</span>
      <span class="bz-arch-chip">Bedrock / Azure / SageMaker / OCI</span>
    </div>
  </div>
</div>

## How to access it and how it fits

You can reach Cohere's models four ways: the hosted Cohere API, a private deployment inside your own virtual private cloud (VPC), a fully on-premises install, and cloud marketplaces. Cohere lists availability across Amazon Bedrock, Amazon SageMaker, Microsoft Azure, and Oracle Generative AI Service. In September 2025 the company added Model Vault, a dedicated inference platform that runs Command, Embed, and Rerank inside isolated VPC or on-premises environments.

The models divide by job:

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Embed</span>
    <span class="bz-flow-step-desc">Convert documents into vectors with Embed v4.0. It handles text, images, and PDFs with a 128K context window.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Retrieve</span>
    <span class="bz-flow-step-desc">A vector search returns candidate documents for a query.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Rerank</span>
    <span class="bz-flow-step-desc">Rerank v4.0 reorders candidates by relevance across documents, tables, JSON, and code.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Generate</span>
    <span class="bz-flow-step-desc">A Command model reads the top documents and writes a grounded answer with citations.</span>
  </div>
</div>

The Command line covers a range of needs. Command A (command-a-03-2025) targets tool use, agents, and RAG. Command A+ (command-a-plus-05-2026) is a [mixture-of-experts](/glossary/mixture-of-experts/) model with vision and reasoning. Command R7B is a small, fast model for RAG and tool use. Context lengths across the Command family run from 8K to 256K tokens, and the multilingual variants cover dozens of languages.

## Compared to other model providers

Cohere is narrower than the general-purpose labs but deeper on retrieval. Here is how it lines up.

| | Cohere | [Anthropic](/tools/claude-anthropic/) | [Mistral AI](/tools/mistral-ai/) | [AI21 Labs](/tools/ai21-labs/) |
|---|---|---|---|---|
| **Core focus** | Enterprise RAG and search | Frontier reasoning models | Open-weight and hosted models | Enterprise long-context models |
| **Retrieval models** | Embed and Rerank | None first-party | Embed model | None first-party |
| **Deployment** | API, VPC, on-prem, clouds | API and cloud marketplaces | API, cloud, some open weights | API and cloud |
| **Best for** | Regulated RAG at scale | Complex reasoning tasks | Cost-flexible general use | Long-document tasks |

For a wider view of how these vendors relate, see the [LLM landscape 2026 comparison](/comparisons/llm-landscape-2026/).

## When not to use it

Cohere is a focused choice, not a default. Consider alternatives when:

- **You want the top reasoning benchmarks.** The largest frontier chat models from other labs often lead on public reasoning leaderboards. Cohere optimises for enterprise retrieval and deployment, not headline scores.
- **You need a large consumer ecosystem.** Cohere sells to enterprises. If you want a broad third-party plugin and app ecosystem, other providers offer more.
- **You only need a chatbot.** If you are not doing search or RAG, the Embed and Rerank strengths that differentiate Cohere go unused, and a simpler single-model provider may cost less.
- **You want fully open weights to self-modify.** Cohere ships private deployments, but its frontier models are not permissively open in the way some open-weight families are.

## Further reading

- [What are foundation models?](/glossary/foundation-models/): the model category Cohere builds within.
- [What is RAG?](/glossary/rag/): the retrieval pattern Cohere's Embed and Rerank models serve.
- [What is an LLM?](/glossary/llm/): background on the generation models behind Command.
- [LLM landscape 2026](/comparisons/llm-landscape-2026/): how Cohere compares to other model providers.
- [Cohere Rerank documentation](https://docs.cohere.com/docs/rerank): official details on the reranking model and its use in search.
- [Cohere models overview](https://docs.cohere.com/docs/models): the current list of Command, Embed, and Rerank models.

## Sources

- [Cohere homepage](https://cohere.com/): product lines, deployment options, and sovereign AI positioning.
- [An Overview of Cohere's Models](https://docs.cohere.com/docs/models): current Command, Embed, and Rerank model names, context lengths, and cloud availability.
- [Cohere Command models](https://cohere.com/command): Command model capabilities and enterprise focus.
- [Cohere Rerank](https://cohere.com/rerank): Rerank model positioning for enterprise search and retrieval.
