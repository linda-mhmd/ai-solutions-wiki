---
title: "Amazon Nova"
description: "Amazon's own family of foundation models for text, image, video, speech, and embeddings, delivered through Amazon Bedrock."
date: 2026-06-29
last_updated: 2026-09-26
lastmod: 2026-09-26
last_verified: 2026-09-26
tags: ["aws", "foundation-models", "bedrock", "multimodal"]
tool_category: "AI"
related:
  - tools/amazon-bedrock
  - tools/claude-anthropic
  - glossary/foundation-models
  - glossary/inference
  - comparisons/llm-landscape-2026
---

<figure class="bz-figure">
  <img src="/img/shaping-ai/stacked-server-block-red-notext.png" alt="A multi-layer server block with red glowing strips, representing Amazon's own foundation model family." loading="lazy">
  <figcaption>Amazon Nova was built as a stack of tiers. Nova 2 flattened it: one generally available workhorse, Nova 2 Lite, with the first-generation Micro, Lite and Pro still active, the rest of Nova 1 retired or retiring, and Nova 2 Pro and Omni still in preview.</figcaption>
</figure>

Amazon Nova is Amazon's own family of [foundation models](/glossary/foundation-models/), announced in December 2024 and now in its second generation. The family covers text, image, video, speech, and embeddings, and every model is delivered through [Amazon Bedrock](/tools/amazon-bedrock/), the managed service that exposes many providers behind a single API. Nova solves a specific procurement problem for AWS customers: it gives them a first-party model line that AWS prices, supports, and integrates directly, rather than depending only on third-party models hosted on the platform.

The original idea behind the family was tiering: instead of one model, Amazon shipped several, each set at a different point on the speed, cost, and capability curve. Nova 2, announced at re:Invent 2025, largely collapsed that ladder. As of September 2026 the only generally available Nova 2 understanding model is **Nova 2 Lite**, and AWS's own migration guide routes Nova 1 Lite, Nova 1 Pro, and Nova Premier workloads onto it. Read the tiers as "what is actually callable today" rather than as a menu.

## Where Nova sits in the stack

Nova is not a standalone product with its own console. It is a set of models you call through Bedrock, alongside models from other providers such as Anthropic's [Claude](/tools/claude-anthropic/).

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Your application</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Web or mobile app</span>
      <span class="bz-arch-chip">Backend service</span>
      <span class="bz-arch-chip-note">Sends prompts, receives completions</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Access layer</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Amazon Bedrock API</span>
      <span class="bz-arch-chip">Knowledge Bases</span>
      <span class="bz-arch-chip">Agents</span>
      <span class="bz-arch-chip">Guardrails</span>
      <span class="bz-arch-chip-note">Knowledge Bases work with no current Nova model; Agents work with Nova Pro but not Nova 2 Lite</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Nova 2, generally available</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Nova 2 Lite</span>
      <span class="bz-arch-chip">Nova 2 Sonic</span>
      <span class="bz-arch-chip">Nova Multimodal Embeddings</span>
      <span class="bz-arch-chip-note">Text, image, video, document, and speech input</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Nova 2, gated preview</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Nova 2 Pro</span>
      <span class="bz-arch-chip">Nova 2 Omni</span>
      <span class="bz-arch-chip-note">Announced December 2025, still not GA</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Nova 1, still callable</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Nova Micro</span>
      <span class="bz-arch-chip">Nova Lite</span>
      <span class="bz-arch-chip">Nova Pro</span>
      <span class="bz-arch-chip-note">Active, but superseded by Nova 2 Lite</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Retired or retiring September 2026</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Nova Premier</span>
      <span class="bz-arch-chip">Nova Sonic v1</span>
      <span class="bz-arch-chip">Nova Canvas</span>
      <span class="bz-arch-chip">Nova Reel v1:0 and v1:1</span>
      <span class="bz-arch-chip-note">Premier and Sonic v1 reached end of life 14 September; Canvas and Reel on 30 September 2026</span>
    </div>
  </div>
</div>

### The Nova 2 models

AWS's current Nova models page lists only the first three of these. Nova 2 Pro and Nova 2 Omni are announced but unshipped, and are covered here only so you can rule them out.

- **Nova 2 Lite** (`amazon.nova-2-lite-v1:0`, or `global.amazon.nova-2-lite-v1:0` for global routing) is the workhorse and the default choice. Generally available since 2 December 2025, it takes text, image, video, and document input and returns text, with a 1,000,000-token context window and up to 64K output tokens. It adds extended thinking at three budget levels (low, medium, high), off by default; built-in web grounding with citations and a code interpreter; remote MCP tools and client-side tool calling; and both supervised and reinforcement fine-tuning on Bedrock and SageMaker AI. Knowledge cutoff is October 2025. Its Bedrock model card lists it as Active with an "end of life no sooner than" date of 2 December 2026. Note that it has no in-Region endpoint: you reach it through a geo (`us.`, `eu.`, `jp.`) or `global.` cross-region inference profile.
- **Nova 2 Sonic** (`amazon.nova-2-sonic-v1:0`) is the speech-to-speech model for real-time voice, generally available since 2 December 2025. It takes speech and text and returns speech and text, over `InvokeModelWithBidirectionalStream` rather than Converse or InvokeModel, with the same 1M-token context. AWS has refreshed it twice in place without any API change: March 2026 brought Amazon Polly-compatible voices, roughly 150 ms off median latency, and better turn-taking on 8 kHz telephony audio, and a deployment between 21 and 28 May 2026 reported 88% fewer speech-generation hallucinations, 52% less speaker drift, and 28% fewer critical errors on Amazon's internal data sets. It covers seven languages and runs in us-east-1, us-west-2, eu-north-1, and ap-northeast-1, plus several more Regions when reached through Amazon Connect.
- **Nova Multimodal Embeddings**, generally available since 28 October 2025, puts text, documents, images, video, and audio into a single semantic space, with a synchronous API for near-real-time work and an asynchronous one for large files. It reached AWS GovCloud (US-West) on 12 August 2026. AWS counts it as part of the Nova 2 generation.
- **Nova 2 Pro** and **Nova 2 Omni** were both announced in preview on 2 December 2025 and, as of 25 September 2026, still are not generally available. Neither has a Bedrock model card, neither appears in the Nova 2 user guide's model table, and both are still labelled "(Preview)" on the AWS Bedrock pricing page. Access runs through Amazon Nova Forge customership or an AWS account team request. Nova 2 Pro is positioned as the most capable Nova for multi-document analysis, video reasoning, migrations, and agentic coding; Nova 2 Omni is a unified model that both reasons over and generates media, taking text, image, video, and speech and emitting text and images. Treat both as not production-available and do not design around them.

### The Nova 1 models still running

Nova Micro, Nova Lite, and Nova Pro remain **Active** in Bedrock and are **not** on the Bedrock legacy-models list, so they are not part of the September 2026 retirements. Their model cards show an "EOL no sooner than" floor of 5 December 2025 that has already passed, but no EOL date has been assigned, and under Bedrock's lifecycle policy they must first enter a Legacy period of at least six months before they can be switched off. They are superseded rather than retiring: AWS dropped them from its Nova models marketing page and published a Nova 1 to Nova 2 migration guide on 18 March 2026 that routes Nova 1 Lite and Nova 1 Pro to Nova 2 Lite. All three carry an October 2024 knowledge cutoff and a 5K maximum output.

- **Nova Micro** is text-only with a 128,000-token context. It is still the cheapest Nova per token.
- **Nova Lite** takes text, image, and video and returns text, with a 300,000-token context.
- **Nova Pro** is the more capable Nova 1 multimodal model, also 300,000 tokens, with function calling and tool use. It does not support structured outputs or Knowledge Bases. AWS's guidance is now to move Nova Pro workloads to Nova 2 Lite, which is cheaper per input token, has a far larger context window, and adds extended thinking.

### The models retired and retiring this month

Five Nova model versions - and only these five - are on the Bedrock legacy list. Two have **already reached end of life (14 September 2026)**; the other three are switched off on **30 September 2026**. After the end-of-life date, the model ID stops serving requests in every Region, and there is no automatic migration. Do not read this as "Nova 1 is retiring": Nova Micro, Lite and Pro are not on the list.

| Model | Legacy since | End of life | Successor |
|---|---|---|---|
| **Nova Premier** (`amazon.nova-premier-v1:0`) | 2026-03-13 | 2026-09-14 | Nova 2 Lite, per AWS's own migration guide. Nova 2 Pro is the notional successor but remains preview-gated. |
| **Nova Sonic v1** (`amazon.nova-sonic-v1:0`) | 2026-03-13 | 2026-09-14 | Nova 2 Sonic |
| **Nova Canvas** (`amazon.nova-canvas-v1:0`) | 2026-03-30 | 2026-09-30 | None from Amazon. There is no Nova 2 image model. |
| **Nova Reel** (`amazon.nova-reel-v1:0`) | 2026-03-30 | 2026-09-30 | None from Amazon. |
| **Nova Reel** (`amazon.nova-reel-v1:1`) | 2026-03-30 | 2026-09-30 | None from Amazon. Both Reel versions retire on the same day. |

Two consequences are worth being blunt about. First, **Nova Premier is not the top of the family any more** - its end-of-life date of 14 September 2026 has passed. Any design that treats it as the model to step up to, or as the teacher model to distil from, needs rewriting. Second, **Amazon will have no first-party creative models after 30 September 2026.** With Canvas and both Reel versions gone and no Nova 2 image or video model shipped, the Bedrock-native replacements are third-party - Stability AI's Stable Image models for images, Luma Ray v2 for video - or Nova 2 Omni's image output, which is still preview-gated. There is no "newer Nova Canvas" or "newer Nova Reel" to migrate to.

Press reporting in late July 2026 (Business Insider, relayed by eWeek and others) said Amazon had moved Nova Premier, Nova 2 Omni, Nova Reel, and Nova Canvas to maintenance-only development and shifted staff toward a new frontier-model research group. AWS has published nothing to confirm this, and the secondary accounts disagree on which models are affected, so treat it as reporting rather than fact. The retirement dates above, by contrast, come from the Bedrock model lifecycle documentation (re-checked 25 September 2026). Models launched on Bedrock from 7 September 2026 onwards fall under a newer lifecycle policy with an "EOL no sooner than" date and a 6-month or 45-day Legacy period on every model card; all current Nova models predate it and stay under the older policy.

### The services around the models

Alongside Nova 2, AWS shipped two services at re:Invent 2025. Both are generally available and both are US East (N. Virginia) only.

- **Amazon Nova Forge** lets an organisation build its own frontier model from early Nova pre-trained, mid-trained, and post-trained checkpoints, blending proprietary data with Amazon-curated training data, with reinforcement learning against custom reward functions and a responsible-AI toolkit. Resulting custom models host on SageMaker AI and Bedrock, and a Forge SDK followed in March 2026. AWS publishes no price; CNBC reported at launch that it starts around $100,000 a year as a subscription, with training compute billed separately through SageMaker and AWS engineering assistance not included. Forge customers are also the main gate for Nova 2 Pro and Nova 2 Omni preview access.
- **Amazon Nova Act** is a service for building, deploying, and managing fleets of agents that automate production browser and UI workflows, powered by a custom Nova 2 Lite model. AWS claims over 90% task reliability. Pricing sits on a separate Nova Act pricing page.

## How to access it and typical use

You do not install Nova. You call it through Amazon Bedrock, so the prerequisite is an AWS account with Bedrock access enabled for the Nova models you want in your Region.

A typical text request flows like this.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Enable access</span>
    <span class="bz-flow-step-desc">Request model access to the Nova models you need in the Bedrock console for your Region.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Start at Nova 2 Lite</span>
    <span class="bz-flow-step-desc">It is the default. Drop to Nova Micro only for high-volume trivial text; Nova Premier has reached end of life.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Call the API</span>
    <span class="bz-flow-step-desc">Send a cross-region inference profile ID and your prompt through Converse or InvokeModel.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Add context</span>
    <span class="bz-flow-step-desc">Turn on Nova 2 Lite's built-in web grounding and code interpreter, attach your own tools over MCP, and add Guardrails for policy.</span>
  </div>
</div>

Because Nova is a first-party AWS line, it plugs into much of the rest of Bedrock without extra glue: Guardrails, prompt caching, and response streaming work across the family. Check the per-model card before you assume the rest, because the Bedrock feature matrix is narrower than the marketing suggests. No current Nova model supports Bedrock Knowledge Bases, and Bedrock Agents works with Nova Pro but **not** with Nova 2 Lite, which also has no Flows, structured outputs, or model evaluation support. Bedrock Agents is in any case now "Bedrock Agents Classic", closed to new customers since 30 July 2026; AWS points new agent builds to [Amazon Bedrock AgentCore](/tools/bedrock-agentcore/), which is model-agnostic. What Nova 2 Lite gives you instead is model-side: built-in web grounding with citations, a code interpreter, remote MCP servers, and client-side tool calling. If your design assumed a Knowledge Base or an Agent in front of the default Nova model, budget for building retrieval and orchestration yourself. Amazon documents [fine-tuning](/glossary/fine-tuning/) for Nova 2 Lite in both supervised and reinforcement form, on Bedrock and SageMaker AI.

### What it costs

On-demand list prices per million tokens, US East (N. Virginia), read on 9 September 2026. Nova 2 pricing now splits by routing: `global.` cross-region inference is roughly 10% cheaper than a geo profile or an in-Region call, which is why third-party trackers quote conflicting figures. AWS renders its pricing pages client-side, so confirm on the [Bedrock pricing page](https://aws.amazon.com/bedrock/pricing/) before budgeting.

| Model | Input | Output | Notes |
|---|---|---|---|
| **Nova 2 Lite** | $0.30 | $2.50 | Global routing. Geo or in-Region: $0.33 / $2.75. Flex and Batch: $0.15 / $1.25. Priority: $0.525 / $4.375. Cache read $0.075. |
| **Nova 2 Sonic** | $3.00 speech, $0.33 text | $12.00 speech, $2.75 text | |
| **Nova Multimodal Embeddings** | $0.135 | n/a | Batch $0.0675. |
| **Nova 2 Pro** (preview) | $1.25 | $10.00 | Global routing; same input rate for text, image, video, and audio. Geo: $1.375 / $11.00. |
| **Nova 2 Omni** (preview) | $0.30 text, image, video; $1.00 audio | $2.50 text, $40.00 image | Global routing. |
| **Nova Pro** (Nova 1) | $0.80 | $3.20 | Latency-optimised $1.00 / $4.00; Flex and Batch $0.40 / $1.60. |
| **Nova Lite** (Nova 1) | $0.06 | $0.24 | Batch $0.03 / $0.12. |
| **Nova Micro** (Nova 1) | $0.035 | $0.14 | Batch $0.0175 / $0.07. |

Regional prices differ. In Frankfurt (eu-central-1), checked on 26 September 2026, Nova 2 Lite Standard costs $0.39 / $3.27 with global routing and $0.429 / $3.597 geo or in-Region, about 30% more than US East ([Bedrock pricing](https://aws.amazon.com/bedrock/pricing/)).

Common uses:

- **Document, image, and video understanding** with Nova 2 Lite, where a request mixes text and visual input and the 1M-token context lets you skip aggressive chunking.
- **High-volume text classification** with Nova Micro, where cost per call matters more than depth and a 128K context is plenty.
- **Agentic workflows** with Nova 2 Lite, using extended thinking, the built-in code interpreter and web grounding, and remote MCP or client-side tools to act on external systems. Bedrock Agents is not an option here: the model card lists it as unsupported for Nova 2 Lite, and Agents Classic no longer takes new customers. Host the loop on [AgentCore](/tools/bedrock-agentcore/) or in your own code instead.
- **Real-time voice** with Nova 2 Sonic over the bidirectional streaming API, including contact-centre audio through Amazon Connect.
- **Cross-modal search** with Nova Multimodal Embeddings, where text, image, audio, and video need to land in one index.

## How it compares

Nova competes on two fronts: against other models hosted inside Bedrock, and against first-party model families from other clouds and labs.

| | Amazon Nova | Claude (Anthropic) | Azure OpenAI | Google Gemini |
|---|---|---|---|---|
| **Maker** | Amazon | Anthropic | OpenAI | Google |
| **Primary access** | Amazon Bedrock | Bedrock, direct API | Azure | Google Cloud |
| **First-party to a cloud** | Yes, AWS | No | Yes, Azure | Yes, GCP |
| **Modalities** | Text, image, video, document, speech; image output preview-only | Text, image | Text, image | Text, image, audio, video |
| **Largest GA context** | 1,000,000 tokens (Nova 2 Lite) | 1,000,000 tokens | Model-dependent | 1,000,000 tokens and up |
| **Best for** | AWS-native, cost-tiered work | Reasoning, long context | Azure shops | GCP shops |

Inside Bedrock, the practical choice is often Nova versus Claude. Nova is Amazon's cost-and-speed play across a wide task range, and Nova 2 Lite narrowed the gap on context length and reasoning while staying well under frontier pricing. Claude tends to be the reach-for model when a task needs deeper reasoning or careful instruction following. See the wider field in the [LLM landscape for 2026](/comparisons/llm-landscape-2026/).

## When not to use it

- **You are not on AWS.** Nova is delivered through Bedrock. If your stack lives on Azure or Google Cloud, a first-party family there fits your billing and IAM better.
- **You want a portable, cloud-neutral contract.** Building on a first-party model ties you more tightly to one cloud. Weigh that lock-in against the integration benefits.
- **You need first-party image or video generation.** After 30 September 2026 Amazon has none. Plan on Stability AI or Luma inside Bedrock instead, and do not wait on Nova 2 Omni, which has been in preview since December 2025.
- **The task needs top-end reasoning.** Nova 2 Pro is not generally available, so the ceiling for a GA Nova is Nova 2 Lite with a high thinking budget. For the hardest reasoning or agentic tasks inside Bedrock, evaluate Claude against Nova on your own data before committing.
- **You need a capability Nova does not cover.** Match the specific modality and context needs of your task to a model's documented specs, and confirm current specs and lifecycle status in the AWS docs rather than assuming.

## Further reading

- [Amazon Bedrock](/tools/amazon-bedrock/): the managed service that hosts Nova and many other models behind one API.
- [What are foundation models](/glossary/foundation-models/): the model category Nova belongs to.
- [Claude by Anthropic](/tools/claude-anthropic/): the model family most often compared to Nova inside Bedrock.
- [The LLM landscape in 2026](/comparisons/llm-landscape-2026/): where Nova sits among competing model families.
- [Amazon Nova models page](https://aws.amazon.com/nova/models/): the official current lineup from AWS.
- [Migrate from Amazon Nova 1 to Amazon Nova 2 (AWS ML Blog)](https://aws.amazon.com/blogs/machine-learning/migrate-from-amazon-nova-1-to-amazon-nova-2-on-amazon-bedrock/): AWS's own mapping of old models to new ones.

## Sources

- Amazon Nova models page: https://aws.amazon.com/nova/models/
- Amazon Nova 2 foundation models now available in Amazon Bedrock, AWS what's new, 2 December 2025: https://aws.amazon.com/about-aws/whats-new/2025/12/nova-2-foundation-models-amazon-bedrock/
- Introducing Amazon Nova 2 Lite, AWS News Blog: https://aws.amazon.com/blogs/aws/introducing-amazon-nova-2-lite-a-fast-cost-effective-reasoning-model/
- Introducing Amazon Nova 2 Sonic, AWS News Blog: https://aws.amazon.com/blogs/aws/introducing-amazon-nova-2-sonic-next-generation-speech-to-speech-model-for-conversational-ai/
- Amazon Nova 2 Omni (Preview), AWS what's new: https://aws.amazon.com/about-aws/whats-new/2025/12/amazon-nova-2-omni-preview
- Introducing Amazon Nova Forge, AWS News Blog: https://aws.amazon.com/blogs/aws/introducing-amazon-nova-forge-build-your-own-frontier-models-using-nova/
- Amazon Nova Act now generally available, AWS News Blog: https://aws.amazon.com/blogs/aws/build-reliable-ai-agents-for-ui-workflow-automation-with-amazon-nova-act-now-generally-available/
- Amazon Bedrock model lifecycle, legacy models table (Premier, Sonic v1, Canvas, Reel v1:0 and v1:1; re-checked 25 September 2026): https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle-legacy.html
- Amazon Bedrock model lifecycle policy for models launched on or after 7 September 2026: https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html
- Amazon Bedrock model cards for Nova Micro, Nova Lite and Nova Pro (Active, "EOL no sooner than" 5 December 2025, Legacy period at least 6 months; fetched 25 September 2026): https://docs.aws.amazon.com/bedrock/latest/userguide/model-card-amazon-nova-micro.html
- Amazon Bedrock model cards for Amazon models: https://docs.aws.amazon.com/bedrock/latest/userguide/model-cards-amazon.html
- Amazon Bedrock model card, Nova 2 Lite (Active, 1M context, 64K output, Knowledge Bases, Agents, Flows, structured outputs, and model evaluation listed as not supported): https://docs.aws.amazon.com/bedrock/latest/userguide/model-card-amazon-nova-2-lite.html
- Amazon Bedrock model card, Nova Pro (Active, 300K context, 5K output, Agents supported, Knowledge Bases and structured outputs not): https://docs.aws.amazon.com/bedrock/latest/userguide/model-card-amazon-nova-pro.html
- Amazon Nova 2 user guide, what is Nova 2: https://docs.aws.amazon.com/nova/latest/nova2-userguide/what-is-nova-2.html
- Amazon Nova 2 release notes (Sonic March and May 2026 refreshes): https://docs.aws.amazon.com/nova/latest/nova2-userguide/release-notes.html
- Migrate from Amazon Nova 1 to Amazon Nova 2 on Amazon Bedrock, AWS ML Blog, 18 March 2026: https://aws.amazon.com/blogs/machine-learning/migrate-from-amazon-nova-1-to-amazon-nova-2-on-amazon-bedrock/
- Amazon Nova Multimodal Embeddings in AWS GovCloud (US-West), 12 August 2026: https://aws.amazon.com/about-aws/whats-new/2026/08/amazon-nova-mme-govcloud/
- Amazon Bedrock pricing: https://aws.amazon.com/bedrock/pricing/
- Amazon Nova Forge subscription pricing, CNBC, 2 December 2025 (reported, not published by AWS): https://www.cnbc.com/2025/12/02/amazon-nova-forge-lets-clients-customize-ai-models-for-100000-a-year.html
- Amazon Nova AI Service Cards (Micro, Lite, Pro, Premier): https://docs.aws.amazon.com/ai/responsible-ai/nova-micro-lite-pro/overview.html
- Amazon Bedrock Agents Classic maintenance mode, AWS documentation (closed to new customers 30 July 2026; fetched 25 September 2026): https://docs.aws.amazon.com/bedrock/latest/userguide/agents-classic-maintenance-mode.html
