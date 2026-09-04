---
title: "How to Start an AI Project as a Founder"
description: "A technical guide for founders integrating LLMs into their first AI product. Covers technology selection, cost management, architecture decisions, and the path from prototype to production."
date: 2026-06-22
categories: [Guides]
tags: ["startup", "founder", "llm-integration", "ai-project", "technology-selection", "prototyping", "mvp", "cost"]
related:
  - comparisons/llm-landscape-2026
  - guides/llm-cost-optimization
  - guides/building-rag-systems
  - tools/amazon-bedrock
  - tools/fastapi
  - tools/railway
last_updated: 2026-09-03
---

<figure class="bz-figure">
  <img src="/img/rapid-ai/hand-holding-crystal-cube-green-notext.png" alt="A hand holding a glowing green crystal cube against a dark background: the working prototype, tangible and deliverable, built from careful decisions." loading="lazy">
  <figcaption>The first AI feature you ship is not about the model. It is about deciding fast enough that you learn something real.</figcaption>
</figure>

This guide is for technical founders, CTOs, and startup leads integrating an LLM into a product for the first time. It covers the six decisions that determine whether your first AI project ships and scales, or stalls in prototyping. By the end, you will have a clear technology stack, a realistic cost model, and a checklist that separates a prototype from a production system.

This is not a survey of everything possible. It is a direct path through the decisions that matter at the start.

---

## The six phases of a founder AI project

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Define the task</span>
    <span class="bz-flow-step-desc">Write the exact input the model receives and the exact output format you expect. Test with 20 real examples before touching code.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Choose your model</span>
    <span class="bz-flow-step-desc">API or open-weight? Which provider fits your volume, latency, and data residency requirements?</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Build the prototype</span>
    <span class="bz-flow-step-desc">Minimal integration using real data and real users. Ship the loop fast enough to learn something.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Measure what matters</span>
    <span class="bz-flow-step-desc">Track latency, output accuracy, and cost per call. Build a small eval set from real user requests.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 5</span>
    <span class="bz-flow-step-name">Harden for production</span>
    <span class="bz-flow-step-desc">Add error handling, model fallbacks, rate limiting, and observability before scaling traffic.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 6</span>
    <span class="bz-flow-step-name">Optimize cost</span>
    <span class="bz-flow-step-desc">Cache repeated context, route cheap requests to smaller models, and batch where latency allows.</span>
  </div>
</div>

---

## Define the task first

LLM projects fail when the task is vague. "Make it smarter" is not a task. "Extract the invoice total and due date from a PDF and return them as JSON" is a task.

Before you write a line of code, write out:

1. **The exact input.** What text, documents, or data does the model receive? What is the maximum length? Where does it come from?
2. **The exact output format.** Is it free-form prose, structured JSON, a classification label, or a short summary? Define the schema.
3. **The quality bar.** What does "correct" mean? How will you know when the model gets it wrong?

Then collect 20 real examples from your domain. Not synthetic examples you made up, real ones from your data or your users. Run each through the model manually in a playground (Claude.ai, ChatGPT, or the provider console). If you cannot get a useful result from 20 real examples by hand, adding a backend will not fix the problem.

This step takes one to three days. Skipping it costs weeks.

### Write your system prompt as a specification

Your system prompt is not a suggestion. It is the specification for what the model does. Treat it like a function signature:

```
You are an invoice parser. You receive the full text of a PDF invoice.
Return a JSON object with these fields:
- total_amount: number (in euros, no currency symbol)
- due_date: string (ISO 8601 format, e.g. 2026-07-15)
- vendor_name: string

If any field cannot be found, return null for that field.
Return only the JSON object. No explanation.
```

Version this prompt. Store it in a file or a database row, not hardcoded in your application. You will iterate on it.

---

## Choosing your first model

Use this table to pick a starting point. Start with the cheapest model that meets your quality bar. You can always switch up.

| Situation | Recommended model | Rough monthly cost at 10k calls/day |
|---|---|---|
| Budget under €200/month | GPT-5.6 Luna or Claude Haiku 4.5 | €30 to €80 |
| Need a 1M-token context window | Claude Sonnet 5 | €150 to €400 |
| Need self-hosting | Llama 3.3 70B via Groq or Together AI | €0 (API) or infra cost |
| Data must stay in AWS | Amazon Bedrock with Nova or Claude | Usage-based, same model pricing |
| Need open-source with compliance | IBM Granite on Hugging Face | €0 model, infra cost only |
| Need lowest latency | Groq with Llama or Mixtral | €20 to €60 |
| **Best for most founders** | **Claude Haiku 4.5 to start, Claude Sonnet 5 when you need it** | **€30 to €150** |

A few rules that hold in almost every case:

- Start with an API model. Do not self-host until you have a cost problem that justifies the operational overhead.
- Use Claude Haiku 4.5 or GPT-5.6 Luna for high-volume, structured tasks. They cost several times less than frontier models and are fast.
- Move to Claude Sonnet 5 or GPT-5.6 Terra when the task requires reasoning, long context, or nuanced generation.
- Use Amazon Bedrock if you are already on AWS and need data residency controls, auditability, or enterprise procurement.

See [OpenAI API](/tools/openai-api/) and [Claude by Anthropic](/tools/claude-anthropic/) for each provider's full current lineup and pricing -- both move fast enough that a table like this ages quickly.

See the [LLM landscape comparison](/comparisons/llm-landscape-2026/) for a full breakdown of models by capability, context window, and pricing.

---

## The prototype stack

Keep the prototype stack boring. Every layer you add is a problem you have to debug at 2 AM before launch.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Frontend</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Your existing UI</span>
      <span class="bz-arch-chip-note">Add AI as a feature to what you already have. Do not build a new frontend for the prototype.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">API layer</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">FastAPI (Python)</span>
      <span class="bz-arch-chip">Express (Node)</span>
      <span class="bz-arch-chip-note">One endpoint per AI task. Keep it thin.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">LLM access</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Anthropic Python SDK</span>
      <span class="bz-arch-chip">OpenAI Python SDK</span>
      <span class="bz-arch-chip-note">Both SDKs are two-line integrations. Pick the one matching your model.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Database</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Supabase (Postgres)</span>
      <span class="bz-arch-chip-note">Includes pgvector. When you add RAG, the vector store is already there.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Deployment</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Railway</span>
      <span class="bz-arch-chip">Render</span>
      <span class="bz-arch-chip-note">Push to deploy. No infrastructure to manage for the MVP.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Observability</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Structured logging to file</span>
      <span class="bz-arch-chip">Langfuse (add later)</span>
      <span class="bz-arch-chip-note">Log every request, response, latency, and token count from day one.</span>
    </div>
  </div>
</div>

### A minimal FastAPI integration

This is the pattern you need. Everything else is wiring:

```python
from fastapi import FastAPI
from anthropic import Anthropic

app = FastAPI()
client = Anthropic()

SYSTEM_PROMPT = open("prompts/invoice_parser_v1.txt").read()

@app.post("/parse-invoice")
async def parse_invoice(body: dict):
    message = client.messages.create(
        model="claude-haiku-4-5",
        max_tokens=512,
        system=SYSTEM_PROMPT,
        messages=[
            {"role": "user", "content": body["invoice_text"]}
        ]
    )
    return {"result": message.content[0].text}
```

Notice `max_tokens=512`. Always set `max_tokens`. Without it, the model can return thousands of tokens on a task that should return 50. That cost adds up across thousands of calls.

Notice the system prompt loads from a file. Version that file. Commit it to git. When the prompt changes, the filename or a version tag changes with it.

---

## LLM cost reality check

Run this calculation before you commit to a model:

```
Daily volume:         1,000 users x 5 requests = 5,000 requests/day
Tokens per request:   1,500 input + 500 output = 2,000 tokens
Monthly token volume: 5,000 x 30 x 2,000 = 300,000,000 tokens
```

At current pricing (September 2026), Anthropic's first-party rates are:

| Model | Input price | Output price | Notes |
|---|---|---|---|
| Claude Haiku 4.5 | $1.00 per million tokens | $5.00 per million tokens | Cheapest, fastest tier |
| Claude Sonnet 5 | $2.00 per million tokens | $10.00 per million tokens | Best value for most enterprise tasks |
| Claude Opus 5 | $5.00 per million tokens | $25.00 per million tokens | Flagship, complex reasoning |

OpenAI's current GPT-5.6 family (Luna, Terra, Sol) is priced separately -- see [OpenAI API](/tools/openai-api/) for current per-token rates before budgeting. These numbers change. Always check the provider pricing page before committing. But the ratio holds directionally: a provider's cheapest tier runs roughly 5 to 10 times less than its flagship tier (see [Claude by Anthropic](/tools/claude-anthropic/) for the full current pricing table).

### Three cost traps to avoid

**Trap 1: Conversation context compounds.** If you pass the full conversation history on every turn, your input tokens grow with each message. A 10-turn conversation at 200 tokens per turn means the 10th turn sends 2,000 tokens of history. Cap conversation context or summarize it.

**Trap 2: Not setting `max_tokens`.** A model asked to "summarize this article" can return 4,000 tokens if you do not constrain it. Set `max_tokens` to the maximum useful output for your task, not the model maximum.

**Trap 3: Not caching static context.** If every request includes the same 2,000-token system prompt and reference document, use prompt caching. Anthropic and OpenAI both support it. You pay full price on the first call and a fraction on subsequent calls with the same prefix. On high-volume tasks, this cuts costs by 70 to 90 percent.

See [Reducing LLM Inference Costs in Production](/guides/llm-cost-optimization/) for the full optimization playbook.

---

## When RAG changes everything

Prompting alone works when the knowledge your product needs is already in the model's training data. It breaks when your product needs to answer questions from:

- Your internal documents (contracts, SOPs, product specs)
- A knowledge base that updates frequently
- Content the model has never seen (proprietary research, customer data, recent events)

In these cases, retrieval-augmented generation (RAG) is the right architecture. You store your documents as vector embeddings in a database, retrieve the most relevant chunks at query time, and inject them into the prompt as context. The model answers from that context, not from training memory.

This is not more complex than it sounds, but it is a distinct system with its own failure modes. Read the [Building RAG Systems guide](/guides/building-rag-systems/) before adding document retrieval to your product. The key decision is your embedding model and vector store. Supabase with pgvector covers the prototype and the first production deployment.

Do not try to implement RAG in the same sprint as your first LLM integration. Get the base integration working and measured first.

---

## The production checklist

A prototype becomes a production system when it handles failure gracefully, costs are visible, and personal data is protected. Work through this list before you open the feature to all users.

<div class="bz-diagram">
  <div class="bz-diagram-label">Prototype to production: what changes</div>
  <div class="bz-diagram-body">

| Area | Prototype | Production |
|---|---|---|
| **Error handling** | Crashes on API error | Catches errors, returns user-friendly message |
| **Retries** | None | Exponential backoff on 429 and 5xx |
| **Fallback** | One model | Falls back to cheaper model on failure |
| **Rate limiting** | None | Per-user limits to prevent runaway costs |
| **Prompt versioning** | Hardcoded string | File with version tag, committed to git |
| **Prompt testing** | Manual | Eval set of 50 real examples, run on each change |
| **Cost alerts** | None | Budget alert at €X/day in provider console |
| **Token logging** | None | Log input tokens, output tokens, latency per request |
| **PII handling** | Not considered | Strip or pseudonymize before sending to external API |
| **`max_tokens`** | Not set | Set to the maximum useful output for the task |

  </div>
</div>

### PII handling is not optional

If your product processes user data, do not send personal information to an external LLM API without a legal basis and user consent. This applies to names, email addresses, phone numbers, financial data, and health information. Check your jurisdiction's data protection rules (GDPR applies across the EU). If you cannot strip PII before sending, use Amazon Bedrock or Azure OpenAI with a data processing agreement in place.

---

## Common mistakes

These are the four mistakes that add the most time and cost to a first AI project.

### Starting with the most expensive model

The temptation is to start with GPT-5.6 Sol or Claude Opus 5 because they produce the best results in demos. Resist it. Start with GPT-5.6 Luna or Claude Haiku 4.5. If the cheap model cannot do the task at all, moving up to the frontier model is a real decision. If it can do it with a better prompt, you saved €200 per month.

### Not testing with real, messy data

Demos use clean examples. Real user data is messy: incorrect spelling, mixed languages, unexpected formats, edge cases the prompt does not handle. Build your eval set from actual user requests or documents from your domain. A model that works on 20 synthetic examples and breaks on real ones is not ready to ship.

### Hardcoding prompts

The system prompt is your most important artifact. It determines output quality more than model choice does. If it lives inline in your code:

- You cannot A/B test two versions without a deployment
- You cannot roll back a bad prompt change without reverting code
- You cannot see the history of what changed and when

Store prompts as versioned files or database rows. Track which version produced which outputs.

### Ignoring latency until users complain

LLM calls take 500 ms to 5 seconds depending on model and output length. If your product calls the API synchronously on a user action, that latency is visible. Measure it from day one. For tasks where the result does not need to be instant (document analysis, nightly reports, background enrichment), move to an async queue. For real-time tasks, use the fastest model that meets your quality bar and stream the response so users see output as it generates.

---

## Further reading

- [LLM Landscape 2026](/comparisons/llm-landscape-2026/): Full comparison of models by capability, context window, speed, and pricing. Use this before committing to a provider.
- [Reducing LLM Inference Costs in Production](/guides/llm-cost-optimization/): Caching, batching, model routing, and prompt optimization strategies for when your costs grow.
- [Building RAG Systems](/guides/building-rag-systems/): Step-by-step guide to document ingestion, chunking, embedding, and retrieval for products that need private knowledge.
- [Amazon Bedrock](/tools/amazon-bedrock/): AWS-native LLM gateway supporting Claude, Nova, and other models with enterprise data controls.
- [FastAPI](/tools/fastapi/): The Python framework used in the prototype stack above. Fast to build, production-ready from day one.
- [Railway](/tools/railway/): Push-to-deploy hosting for your backend API. Covers the MVP without infrastructure work.
- [Anthropic API documentation](https://docs.anthropic.com/): Official reference for the Claude API including prompt caching, tool use, and streaming.
- [OpenAI API documentation](https://platform.openai.com/docs): Official reference for OpenAI's current GPT-5.6 family with pricing calculator.
- [OpenAI API](/tools/openai-api/) and [Claude by Anthropic](/tools/claude-anthropic/): This wiki's own reference pages for each provider's current model lineup, tiers, and pricing.
