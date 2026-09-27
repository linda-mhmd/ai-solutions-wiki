---
title: "AI21 Labs"
description: "AI21 Labs built the Jamba hybrid Mamba-Transformer model family, but refocused on its Maestro agent platform in 2026 and stopped selling standalone models."
date: 2026-06-29
last_updated: 2026-09-09
lastmod: 2026-09-09
last_verified: 2026-09-09
tags: ["llm", "foundation-models", "enterprise-ai", "long-context", "agents"]
tool_category: "AI"
related:
  - glossary/llm
  - glossary/foundation-models
  - comparisons/llm-landscape-2026
  - tools/amazon-bedrock
  - tools/azure-openai
  - tools/mistral-ai
---

<figure class="bz-figure">
  <img src="/img/obsidian-lab/lens-cylinder-copper-notext.png" alt="A precision machined lens on dark slate, representing an enterprise-focused model provider." loading="lazy">
  <figcaption>AI21 Labs frames its models as precision instruments for regulated, long-document enterprise work rather than general consumer chat.</figcaption>
</figure>

AI21 Labs is an enterprise AI company that built [large language models](/glossary/llm/) and agent tooling for production use inside businesses. It is best known for the Jamba family, a set of open-weight [foundation models](/glossary/foundation-models/) built on a hybrid Mamba-Transformer architecture designed for fast, efficient processing of very long inputs. The problem it targeted is concrete: enterprises need to run documents, contracts, and records that are far longer than a typical prompt, keep that data private, and control cost as usage scales.

**Read this before you pick AI21 as a model provider.** In May 2026 AI21 stopped selling standalone models. Israeli business press - Calcalist/ctech and Globes, reporting on 18 May 2026 - said the company cut more than 60% of its workforce, from roughly 180 staff to about 70, halted Jamba development, and redirected its remaining resources to Maestro, its agent-optimisation platform. The stated reason was that selling models alone was not a sufficiently sustainable revenue stream. AI21 has published no such announcement itself: its site and docs still present Jamba as available, and the documentation changelog's last entry is 1 December 2025. That silence is consistent with the reports but is not confirmation, so treat the pivot as well-corroborated secondary reporting rather than a vendor statement. Either way, the practical advice is the same: existing Jamba endpoints and open weights still work, but do not plan a roadmap around a model line with no active development behind it.

Maestro, an orchestration framework that routes calls across an ensemble of models and matches an agent to a suitable model-and-harness combination, is now effectively the company's product. The positioning remains enterprise-first: long context, deployment on your own infrastructure or a private cloud, and predictable spend, rather than a mass-market consumer assistant.

## Where AI21 Labs sits in the stack

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Application</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Document analysis</span>
      <span class="bz-arch-chip">RAG workflows</span>
      <span class="bz-arch-chip">Enterprise agents</span>
      <span class="bz-arch-chip-note">Long-context summarization, contract review, retrieval</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Orchestration</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Maestro</span>
      <span class="bz-arch-chip-note">AI21's active product line: routes calls across an ensemble of models, matches agent to model and harness</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Models</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Jamba family</span>
      <span class="bz-arch-chip">Jamba Reasoning 3B</span>
      <span class="bz-arch-chip-note">Hybrid Mamba-Transformer, 256K context. Still callable, but development halted in 2026</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Deployment</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Self-hosted</span>
      <span class="bz-arch-chip">Private cloud / VPC</span>
      <span class="bz-arch-chip">Partner clouds</span>
      <span class="bz-arch-chip-note">Private-by-design for proprietary data</span>
    </div>
  </div>
</div>

## The Jamba model family

Jamba uses a hybrid Mamba-Transformer architecture. Mamba is a state-space model design that scales more efficiently on long sequences than a pure Transformer, and AI21 combines the two to keep quality high while processing long inputs quickly. The published Jamba models support a large context window, which AI21 markets as one of the longest available, aimed at tasks like lengthy document summarization, contract analysis, and [retrieval-augmented workflows](/comparisons/llm-landscape-2026/).

The last significant release was Jamba 2, announced on 8 January 2026: a 3B dense model plus a Mini at 52B total and 12B active parameters, with a 256K context window, published under Apache 2.0 on AI21 Studio and Hugging Face alongside Jamba Reasoning 3B. That was four months before the pivot, so "recent" is doing less work than it looks - nothing has shipped since.

The current documented aliases are `jamba-large`, which still resolves to a July 2025 build (`jamba-large-1.7-2025-07`), and `jamba-mini`, which resolves to `jamba-mini-2-2026-01`. Several earlier versions are already deprecated: Jamba Mini 1.7 on 1 February 2026, Jamba Large and Mini 1.6 on 3 August 2025, and the 1.5 line on 6 May 2025. Because the Jamba 2 weights are open, you can download and run them on your own hardware indefinitely, which matters for teams that cannot send data to a third-party API - and it is the main reason Jamba is still worth considering at all now that the hosted line has no roadmap.

## How to access it and typical use

You reach AI21 models through several paths, depending on how much control over data and hosting you need:

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Path 1</span>
    <span class="bz-flow-step-name">Hosted API</span>
    <span class="bz-flow-step-desc">Call Jamba through AI21's own API or a partner cloud catalog such as Azure or Google Cloud Vertex AI (rebranded Gemini Enterprise Agent Platform in April 2026 — see [Google Vertex AI](/tools/google-vertex-ai/) for the full story).</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Path 2</span>
    <span class="bz-flow-step-name">Open weights</span>
    <span class="bz-flow-step-desc">Download Jamba2 and Reasoning models from Hugging Face and run them in your own environment.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Path 3</span>
    <span class="bz-flow-step-name">Private deployment</span>
    <span class="bz-flow-step-desc">Host in a VPC or on-premises for data that cannot leave your boundary, then orchestrate with Maestro.</span>
  </div>
</div>

Typical use cases centre on long, sensitive text: summarizing and querying large financial documents, reviewing contracts, and building retrieval and agent systems that keep proprietary data inside a controlled boundary. For production agent systems, Maestro adds routing and model selection so you are not locked to a single model for every call - which is now also AI21's own strategy, since Maestro is designed to orchestrate other vendors' models rather than only its own.

## AI21 Labs compared to other providers

| | AI21 Labs | Anthropic | OpenAI (via Azure) | Mistral AI |
|---|---|---|---|---|
| **Flagship models** | Jamba family (development halted 2026) | Claude family | GPT family | Mistral Large 3 and open models |
| **Architecture angle** | Hybrid Mamba-Transformer | Transformer | Transformer | Sparse mixture-of-experts |
| **Open weights** | Yes, Jamba 2 and Reasoning (Apache 2.0) | No | No | Yes, including the flagship |
| **Actively shipping models** | No, refocused on the Maestro platform | Yes | Yes | Yes |
| **Positioning** | Agent orchestration; models are legacy | Safety, coding, agents | General purpose scale | Open weights, efficiency |
| **Best for** | Maestro orchestration; self-hosting existing Jamba weights | Assistants, coding agents | Broad app coverage | Cost-aware open deployment |

See the [Claude and Anthropic](/tools/claude-anthropic/) and [Mistral AI](/tools/mistral-ai/) pages for those alternatives, and [Amazon Bedrock](/tools/amazon-bedrock/) or [Azure OpenAI](/tools/azure-openai/) for managed multi-model access.

## When not to use it

- **You are choosing a model provider for a new build.** This is now the main reason to look elsewhere. AI21 stopped selling standalone models in May 2026 and Jamba development is halted, so a new system built on Jamba starts life on an unmaintained model. For long-context work, compare [Mistral](/tools/mistral-ai/), [Claude](/tools/claude-anthropic/), or an actively developed open-weight family instead.
- **You want a turnkey consumer assistant.** AI21 targets enterprise integration, not a polished end-user chat product. A general assistant may fit better for casual use.
- **You need the broadest ecosystem of tools and integrations.** Larger providers ship more SDKs, plugins, and community examples. If you depend on that breadth, weigh it against Jamba's long-context strengths.
- **Your work is short-prompt and latency-critical at consumer scale.** Jamba's advantage is long inputs. For tiny prompts a smaller general model may be cheaper and simpler.
- **You cannot self-host and need a single managed vendor.** If you prefer one cloud to own the whole stack, a managed catalog like [Amazon Bedrock](/tools/amazon-bedrock/) may reduce operational load.

## Further reading

- [What is an LLM?](/glossary/llm/): plain-English explanation of large language models and how they work.
- [Foundation models](/glossary/foundation-models/): what a foundation model is and why open weights matter.
- [The LLM landscape in 2026](/comparisons/llm-landscape-2026/): where AI21 sits among other model providers.
- [Mistral AI](/tools/mistral-ai/): another open-weight, efficiency-focused European provider.
- [Amazon Bedrock](/tools/amazon-bedrock/): managed access to models from multiple providers.
- [AI21 Labs official site](https://www.ai21.com/): company overview, models, and Maestro.
- [Jamba model documentation](https://docs.ai21.com/docs/jamba-foundation-models): technical reference, current aliases, and the deprecation table.

## Sources

- AI21 Labs homepage: https://www.ai21.com/
- Jamba product page: https://www.ai21.com/jamba/
- Jamba documentation, including model aliases and deprecation dates: https://docs.ai21.com/docs/jamba-foundation-models
- Introducing Jamba2 (AI21 blog, 8 January 2026): https://www.ai21.com/blog/introducing-jamba2/
- Announcing the Jamba model family (AI21 blog): https://www.ai21.com/blog/announcing-jamba-model-family/
- AI21 cuts staff and stops selling standalone models, Calcalist/ctech, 18 May 2026: https://www.calcalistech.com/ctechnews/article/rjwumhukfx - secondary source; AI21 has published no equivalent statement.
- Shashua's AI21 Labs laying off 60% of employees, Globes: https://en.globes.co.il/en/article-shashuas-ai21-labs-laying-off-60-of-employees-1001543241 - independent corroboration of the restructuring.
