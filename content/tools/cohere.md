---
title: "Cohere"
description: "Enterprise-focused model provider offering Command generation models plus Embed and Rerank models for search and retrieval-augmented generation, with cloud, VPC, on-premises, and since 2026 Apache 2.0 open-weight deployment."
date: 2026-06-29
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
tags: ["ai", "llm", "rag", "enterprise", "embeddings", "open-weights"]
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

In 2026 Cohere's licensing stance changed materially. Command A+ (May 2026) and North Mini Code (June 2026) were both released with downloadable weights under a full Apache 2.0 licence, the first time Cohere has done that. The long-standing summary of Cohere as "private deployment, but not permissively open" no longer holds. It is not uniform either: **North Small Translate** (September 2026) ships open weights under the **non-commercial CC BY-NC 4.0** licence, so check each model.

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
      <span class="bz-arch-chip">Command A+</span>
      <span class="bz-arch-chip">Command A</span>
      <span class="bz-arch-chip">North Mini Code</span>
      <span class="bz-arch-chip">North Small Translate</span>
      <span class="bz-arch-chip">Command R7B</span>
      <span class="bz-arch-chip-note">Tool use, agents, RAG, agentic coding</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Retrieval</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Embed v4.0</span>
      <span class="bz-arch-chip">Rerank v4.0-pro / v4.0-fast</span>
      <span class="bz-arch-chip">Parse v5.0</span>
      <span class="bz-arch-chip-note">Vectors, relevance scoring, and document parsing for RAG</span>
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
    <span class="bz-flow-step-desc">Rerank v4.0-pro or v4.0-fast reorders candidates by relevance across documents, tables, JSON, and code, with a 32K context.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Generate</span>
    <span class="bz-flow-step-desc">A Command model reads the top documents and writes a grounded answer with citations.</span>
  </div>
</div>

### The model lineup

**Command A+** (`command-a-plus-05-2026`, announced 20 May 2026) is the flagship and the most consequential release Cohere has made in years. It is the company's first [mixture-of-experts](/glossary/mixture-of-experts/) model, at 218B total parameters with 25B active, handling 128K input tokens and up to 64K generated tokens across 48 languages including every official EU language. Cohere released it under Apache 2.0 and positions it explicitly for sovereign and air-gapped deployment. The licence is stated by Cohere itself, not only by coverage of it: the Command A+ docs page says the model "is available under an Apache 2.0 License on Hugging Face", and the weights sit in the CohereLabs repository there. As always, read the licence file in the repository before you build a deployment that depends on it.

**North Mini Code 1.0** (9 June 2026) is Cohere's first fully open developer-facing model, and the first in a new North model family: a 30B MoE with about 3B active parameters, purpose-built for agentic software engineering, with 256K input and 64K output and Apache 2.0 weights that run on a single H100 in FP8. The production model id reached the Chat V2 API in August 2026.

**North Small Translate 1.0** (`north-small-translate-1-0`, 9 September 2026) is a mixture-of-experts model built only for machine translation, covering **more than 50 languages and locale variants**. It has **218B total and 25B active parameters** and a **16K context window**. It is on the **free tier of the Chat V2 API**, and the weights are on Hugging Face (`CohereLabs/North-Small-Translate-1.0`) in W4A16, FP8 and BF16 formats under **CC BY-NC 4.0, so non-commercial use only**. Cohere's suggested hardware is two H100s (or one B200) for W4A16, four H100s for FP8 and eight H100s for BF16. For commercial translation workloads, use the API or talk to Cohere about a licence; do not assume the Apache 2.0 terms of Command A+ carry over.

**Cohere Parse** (`parse-v5.0`, 27 August 2026) converts complex documents into structured Markdown for downstream AI pipelines. It is a **2.3B-parameter multimodal model** (about 4.6 GB) with an **8K context window** that extracts reading-order text, tables, lists, forms, images and captions, page boundaries and element locations, returning Markdown or HTML, HTML tables, bounding boxes and image descriptions. It is available through the Parse API, Microsoft Foundry, AWS SageMaker and Model Vault. It is the ingestion step in front of Embed and Rerank in a Cohere RAG stack.

The rest of the Command line covers narrower jobs: **Command A** (`command-a-03-2025`, 256K) for tool use, agents, and RAG; **command-a-reasoning-08-2025** (256K); **command-a-vision-07-2025** (128K); **command-a-translate-08-2025** (8K); and **Command R7B** (128K), a small fast model for RAG and tool use. Cohere also ships **cohere-transcribe-03-2026** and **cohere-transcribe-arabic-07-2026** for speech, and the multilingual **Aya** research models (`c4ai-aya-expanse-32b`, `c4ai-aya-vision-32b`, and the small open `tiny-aya` series). In early September 2026 Cohere Labs added three 3.35B-parameter models to the tiny-aya series on Hugging Face: **`tiny-aya-en-thinker`** and **`tiny-aya-l2-thinker`** (2 September, reasoning variants) and **`tiny-aya-base-32K`** (8 September, a long-context base model). All three are gated behind an access form and licensed **CC BY-NC 4.0**, so they are research models, not commercial building blocks.

Check deprecations before you pin an old id. Cohere deprecated `command-r-03-2024`, `command-r-plus-04-2024`, `command`, `command-light`, and the `command-r` / `command-r-plus` aliases on 15 September 2025, and retired `c4ai-aya-expanse-8b` and `c4ai-aya-vision-8b` on 4 April 2026.

## Compared to other model providers

Cohere is narrower than the general-purpose labs but deeper on retrieval. Here is how it lines up.

| | Cohere | [Anthropic](/tools/claude-anthropic/) | [Mistral AI](/tools/mistral-ai/) | [AI21 Labs](/tools/ai21-labs/) |
|---|---|---|---|---|
| **Core focus** | Enterprise RAG and search | Frontier reasoning models | Open-weight and hosted models | Jamba long-context models, now discontinued |
| **Retrieval models** | Embed, Rerank, Parse | None first-party | Embed model | None first-party |
| **Deployment** | API, VPC, on-prem, clouds, Apache 2.0 weights | API and cloud marketplaces | API, cloud, Apache 2.0 weights | API and cloud, existing endpoints only |
| **Best for** | Regulated RAG at scale, sovereign deployment | Complex reasoning tasks | Cost-flexible general use | Nothing new: AI21 stopped selling standalone models in May 2026 |

For a wider view of how these vendors relate, see the [LLM landscape 2026 comparison](/comparisons/llm-landscape-2026/).

## When not to use it

Cohere is a focused choice, not a default. Consider alternatives when:

- **You want the top reasoning benchmarks.** The largest frontier chat models from other labs often lead on public reasoning leaderboards. Cohere optimises for enterprise retrieval and deployment, not headline scores.
- **You need a large consumer ecosystem.** Cohere sells to enterprises. If you want a broad third-party plugin and app ecosystem, other providers offer more.
- **You only need a chatbot.** If you are not doing search or RAG, the Embed and Rerank strengths that differentiate Cohere go unused, and a simpler single-model provider may cost less.
- **You need open weights across the whole catalogue.** This is no longer a blanket objection: Command A+ and North Mini Code ship under Apache 2.0. But Embed, Rerank, Parse, and the older Command models remain API and private-deployment only, and North Small Translate and the tiny-aya models are open but non-commercial (CC BY-NC 4.0). Check the specific model you need rather than assuming the whole line is downloadable or commercially usable.

## Further reading

- [What are foundation models?](/glossary/foundation-models/): the model category Cohere builds within.
- [What is RAG?](/glossary/rag/): the retrieval pattern Cohere's Embed and Rerank models serve.
- [What is an LLM?](/glossary/llm/): background on the generation models behind Command.
- [LLM landscape 2026](/comparisons/llm-landscape-2026/): how Cohere compares to other model providers.
- [Cohere Rerank documentation](https://docs.cohere.com/docs/rerank): official details on the reranking model and its use in search.
- [Cohere models overview](https://docs.cohere.com/docs/models): the current list of Command, Embed, Rerank, and Parse models, plus the deprecation table.
- [Command A+ announcement](https://cohere.com/blog/command-a-plus): the Apache 2.0 release and its architecture.

## Sources

- [Cohere homepage](https://cohere.com/): product lines, deployment options, and sovereign AI positioning.
- [An Overview of Cohere's Models](https://docs.cohere.com/docs/models): current model names, context lengths, cloud availability, deprecations, and retirements, checked 25 September 2026.
- [Cohere release notes](https://docs.cohere.com/changelog): North Small Translate (9 September 2026: 218B / 25B active, 16K context, 50+ languages, free-tier Chat V2 API, CC BY-NC 4.0 weights in W4A16/FP8/BF16) and Cohere Parse (27 August 2026: `parse-v5.0`, 2.3B, 8K context).
- [North Small Translate 1.0 on Hugging Face](https://huggingface.co/CohereLabs/North-Small-Translate-1.0): open weights, CC BY-NC 4.0.
- [tiny-aya-en-thinker](https://huggingface.co/CohereLabs/tiny-aya-en-thinker), [tiny-aya-l2-thinker](https://huggingface.co/CohereLabs/tiny-aya-l2-thinker) (2 September 2026) and [tiny-aya-base-32K](https://huggingface.co/CohereLabs/tiny-aya-base-32K) (8 September 2026) on Hugging Face: 3.35B parameters, gated, CC BY-NC 4.0.
- [Introducing Command A+, Cohere blog, 20 May 2026](https://cohere.com/blog/command-a-plus): 218B total / 25B active, 128K context, 48 languages, Apache 2.0.
- [VentureBeat on Command A+](https://venturebeat.com/technology/cohere-cracks-lossless-quantization-and-native-citations-with-first-full-apache-2-0-licensed-open-model-command-a): independent corroboration of the Apache 2.0 licence.
- [North Mini Code 1.0, Cohere docs](https://docs.cohere.com/docs/north-mini-code-1.0): 30B total / 3B active MoE, Apache 2.0.
- [Introducing North Mini Code, Cohere Labs](https://huggingface.co/blog/CohereLabs/introducing-north-mini-code): Cohere's own announcement of its first developer model.
- [Cohere Command models](https://cohere.com/command): Command model capabilities and enterprise focus.
- [Cohere Rerank](https://cohere.com/rerank): Rerank model positioning for enterprise search and retrieval.
