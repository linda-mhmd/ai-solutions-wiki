---
title: "The Cloud Architecture Behind Every AI App"
description: "A plain-English tour of the production cloud stack behind a real AI application, from the app you touch down to inference, retrieval, and cost control."
date: 2026-06-25
categories: [Guides]
tags: ["architecture", "cloud", "inference", "rag", "finops"]
---

<figure class="bz-figure"><img src="/img/enterprise-dark/server-room-corridor-notext.png" alt="A dark data center corridor lined with red-lit server racks fading into the distance." loading="lazy"><figcaption>The chat box you type into is the front door. Most of an AI app lives in racks like these, far from view.</figcaption></figure>

When you ask an AI app a question, the reply feels like it comes from one place. It does not. Behind the chat box sits a stack of cloud services, each with a narrow job, wired together so a single request can travel through all of them in a second or two. This guide walks through that stack layer by layer, in plain language, so you can picture what runs underneath the apps you already use.

## The seven layers at a glance

A production AI app is built from distinct layers. Each layer can be swapped, scaled, or priced on its own. The diagram below shows the path a single request takes from top to bottom.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Client / App</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Web app</span>
      <span class="bz-arch-chip">Mobile app</span>
      <span class="bz-arch-chip-note">What the user sees and types into</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">API Gateway</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Auth</span>
      <span class="bz-arch-chip">Rate limits</span>
      <span class="bz-arch-chip">Routing</span>
      <span class="bz-arch-chip-note">Front door that checks who you are and where to send the request</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Orchestration / Agent</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Workflow logic</span>
      <span class="bz-arch-chip">Tool calls</span>
      <span class="bz-arch-chip">Memory</span>
      <span class="bz-arch-chip-note">Decides the steps and coordinates everything below</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Retrieval (RAG)</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Vector database</span>
      <span class="bz-arch-chip">Embedding model</span>
      <span class="bz-arch-chip-note">Finds the company facts the model was never trained on</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Model / Inference</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Hosted model API</span>
      <span class="bz-arch-chip">Self-hosted GPU</span>
      <span class="bz-arch-chip-note">The part that actually writes the answer</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Observability / Evaluation</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Traces</span>
      <span class="bz-arch-chip">Logs</span>
      <span class="bz-arch-chip">Quality scores</span>
      <span class="bz-arch-chip-note">Records what happened and whether the answer was good</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Cost / FinOps</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Token tracking</span>
      <span class="bz-arch-chip">Caching</span>
      <span class="bz-arch-chip">Model tiering</span>
      <span class="bz-arch-chip-note">Keeps the bill in check as usage grows</span>
    </div>
  </div>
</div>

## Layer 1: The client and app you touch

This is the only layer most people ever see. It is the web page, the mobile app, or the chat panel inside a bigger product. Its job is narrow. It collects what you type, shows the reply, and handles the screen. It holds no model and stores little. Everything that makes the answer happens elsewhere, which is why the same AI app works on a phone, a laptop, and a browser at once.

## Layer 2: The API gateway, the front door

Every request from the app first hits an API gateway. Think of it as the reception desk of a building. It checks your identity, confirms you are allowed in, and counts how often you knock so no single user can overwhelm the system. The gateway also decides where to send each request next. On the major clouds this maps to Amazon API Gateway, Azure API Management, and Google Cloud API Gateway. Many AI teams add a dedicated LLM gateway here too, a control point that routes traffic across several model providers and tracks spend in one place.

## Layer 3: Orchestration, the part that plans the work

A single question often needs more than one step. The orchestration layer is the planner. It might decide to search a database, call an external tool, run the model twice, then combine the results. When the app can choose its own next step rather than follow a fixed script, this layer is often called the agent layer. Industry write-ups describe AI orchestration as coordinating models, tools, memory, and human checkpoints into one reliable flow that no single model call could handle alone. Common building blocks here include LangChain, LlamaIndex, and Haystack. See [AI agents](/glossary/ai-agents/) and [agentic loops](/glossary/agentic-loops/) for how this layer behaves when it runs on its own.

<div class="bz-flow"><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Question arrives</span><span class="bz-flow-step-desc">Gateway authenticates and forwards the request.</span></div><div class="bz-flow-arrow">&rarr;</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Plan the steps</span><span class="bz-flow-step-desc">Orchestrator decides whether to search, call a tool, or answer directly.</span></div><div class="bz-flow-arrow">&rarr;</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Retrieve facts</span><span class="bz-flow-step-desc">Vector database returns relevant company documents.</span></div><div class="bz-flow-arrow">&rarr;</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Generate answer</span><span class="bz-flow-step-desc">The model reads the question plus the retrieved facts and writes a reply.</span></div><div class="bz-flow-arrow">&rarr;</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 5</span><span class="bz-flow-step-name">Return and log</span><span class="bz-flow-step-desc">Answer goes back to the app and the trace is recorded.</span></div></div>

## Layer 4: Retrieval, how the app knows your data

A base model only knows what it learned during training. It has never seen your company handbook or last week's tickets. Retrieval fixes that. The technique is called [retrieval-augmented generation](/glossary/rag/), or RAG. Your documents are turned into numbers that capture meaning, then stored in a [vector database](/glossary/vector-database/). When a question comes in, the system converts it the same way and pulls back the closest matching passages, then hands them to the model as context. Reports put retrieval at roughly 50 to 300 milliseconds, depending on the database and the embedding model. Common vector stores include Pinecone, Weaviate, and pgvector on Postgres.

## Layer 5: Inference, the part that writes the answer

This is the engine. [Inference](/glossary/inference/) is the act of running a trained model to produce output. Teams reach it in one of two ways. The most common route is a hosted model API, where a provider runs the hardware and you pay per token of text in and out. The other route is self-hosting, where you rent GPUs and run the model yourself, often with a serving engine such as vLLM. On the major clouds the managed route maps to Amazon Bedrock, Azure AI Foundry, and Google Vertex AI. All three keep pace on the popular models, including Claude, Llama, and Mistral; Azure AI Foundry has the deepest GPT-family integration through the OpenAI partnership.

| | Hosted model API | Self-hosted GPUs |
|---|---|---|
| **You manage** | API keys and prompts | Servers, scaling, updates |
| **Pricing unit** | Per token | Per GPU-hour |
| **Best for** | Most teams, fast start | High volume, strict data control |
| **Cloud examples** | Bedrock, Foundry, Vertex AI | EC2, Azure VMs, GCE plus vLLM |

## Layer 6: Observability and evaluation

Once an app is live, the team needs to see what happened inside each request and whether the answer was any good. Observability for AI has three parts. Infrastructure metrics track machines and latency. Telemetry traces the path of each request through every layer. Quality evaluation scores the output itself, catching wrong or low-quality answers that no server metric would reveal. Tools in this space include Langfuse and the cloud providers' own tracing services. This layer is what turns a black box into something a team can debug and improve.

## Layer 7: Cost and FinOps

AI apps bill in a unit most cloud teams had never managed before: the token, a fragment of text the model reads or writes. The FinOps Foundation frames the cost of any cloud service as price times quantity, and notes that cost-per-token is now the dominant metric for generative AI services. The share of FinOps teams managing AI spend has risen sharply, from under a third two years ago to nearly all of them today, according to the foundation's community reports. Three habits keep the bill down:

- **Model tiering**: send easy requests to a small cheap model and only escalate hard ones to a large model.
- **Semantic caching**: reuse a stored answer when a near-identical question has already been asked. Reports cite reductions of 30 to 60 percent in model calls.
- **Context management**: trim long prompts so the model is not charged for text it does not need.

The FinOps Foundation suggests growing this discipline in three stages, crawl, walk, then run, starting with simple visibility and ending with cost tied to return on investment.

## Vendor-neutral summary

Most AI apps follow the same shape regardless of cloud. The names change, the layers do not.

| Layer | AWS | Azure | Google Cloud |
|---|---|---|---|
| **API gateway** | API Gateway | API Management | API Gateway |
| **Model / inference** | Bedrock | AI Foundry | Vertex AI |
| **Vector store** | OpenSearch, pgvector | AI Search | Vertex AI, pgvector |
| **Observability** | CloudWatch | Monitor | Cloud Operations |

## Further reading

- [Architecture](/architecture/): how these layers connect into full systems on this wiki.
- [What is RAG](/glossary/rag/): the retrieval technique that lets an app use your own data.
- [What is a vector database](/glossary/vector-database/): where retrieved knowledge is stored and searched.
- [What is inference](/glossary/inference/): the step that turns a trained model into an answer.
- [FinOps for AI Overview](https://www.finops.org/wg/finops-for-ai-overview/): the FinOps Foundation's guidance on managing token-based AI spend.
- [AI Orchestration in 2026](https://www.groovyweb.co/blog/ai-orchestration-definition-production-stack): how the orchestration and agent layer is built in production.

## Sources

- [FinOps Foundation](https://www.finops.org/wg/finops-for-ai-overview/): FinOps for AI overview, cost-per-token as the dominant unit, and the crawl-walk-run model.
- [Usage.ai](https://www.usage.ai/blogs/finops/ai-ml-cost/finops-x-2026-takeaways): FinOps X 2026 takeaways, including the rise in teams managing AI spend.
- [Finout](https://www.finout.io/blog/token-economics-and-tokenops-the-definitive-guide-to-finops-for-tokens): token economics, semantic caching, and model tiering as cost levers.
- [GroovyWeb](https://www.groovyweb.co/blog/ai-orchestration-definition-production-stack): definition of AI orchestration and the production stack layers.
- [Spheron](https://www.spheron.network/blog/ai-infrastructure-companies-2026/): the layered view of AI infrastructure, from compute to governance.
- [Atlan](https://atlan.com/know/enterprise-rag-platforms-comparison/): retrieval latency ranges and enterprise RAG platform components.
- [Bits Lovers](https://www.bitslovers.com/bedrock-vs-azure-ai-foundry-vs-vertex-ai/): comparison of Amazon Bedrock, Azure AI Foundry, and Google Vertex AI.
