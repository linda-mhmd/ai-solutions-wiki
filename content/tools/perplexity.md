---
title: "Perplexity - AI Search Engine"
description: "Perplexity is an AI-powered answer engine that combines real-time web search with LLM synthesis. It cites its sources inline, making it the alternative to Google Search for technical research and competitive intelligence."
date: 2026-06-22
tags: ["perplexity", "ai-search", "llm", "research", "web-search", "rag", "citation"]
tool_category: "AI"
related:
  - glossary/rag
  - glossary/llm
  - comparisons/llm-landscape-2026
---

<figure class="bz-figure">
  <img src="/img/shaping-ai/eye-neural-network-notext.png" alt="Extreme close-up of a human eye with a red neural network web visible in the iris: AI perception scanning the web in real time." loading="lazy">
  <figcaption>Perplexity does not retrieve pages. It reads the web and tells you what it found.</figcaption>
</figure>

Perplexity is an answer engine that queries the live web, retrieves the most relevant sources, and synthesizes a cited response using a large language model. It is not a chatbot you prime with a system prompt. It is a research tool: fast, sourced, and designed for questions that need current information rather than pre-trained knowledge. For technical teams, it replaces the workflow of "Google it, open five tabs, skim, summarize mentally."

Official site: https://www.perplexity.ai  
API documentation: https://docs.perplexity.ai  
Pricing: https://www.perplexity.ai/pro

---

## How it works

Perplexity is a RAG (retrieval-augmented generation) system built on top of live web search. When you submit a query, Perplexity runs a web search, retrieves the top-k most relevant pages, and feeds those pages into an LLM alongside your question. The model synthesizes a response and marks every factual claim with a numbered citation linking to its source.

The default model on the free tier is Sonar Small. The Pro tier adds Sonar Large, Sonar Huge, GPT-4o, and Claude 4. You can switch models per query.

This pipeline is distinct from a standard LLM chat session. The model's knowledge cutoff is irrelevant: every response draws on pages retrieved seconds before the answer is written. That makes Perplexity reliable for current pricing, recent product launches, live API documentation, and breaking technical news.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Query</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">User question (natural language)</span>
      <span class="bz-arch-chip-note">Plain question or pasted text. No prompt engineering required.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Search</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Real-time web crawl</span>
      <span class="bz-arch-chip">Bing API</span>
      <span class="bz-arch-chip">Perplexity index</span>
      <span class="bz-arch-chip-note">Focus modes narrow the index: Web, Academic, YouTube, Reddit, Wolfram Alpha.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Retrieval</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Top-k relevant pages</span>
      <span class="bz-arch-chip">Citation tracking</span>
      <span class="bz-arch-chip-note">Each retrieved page is numbered and linked in the final response.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Synthesis</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Sonar Small</span>
      <span class="bz-arch-chip">Sonar Large</span>
      <span class="bz-arch-chip">Sonar Huge</span>
      <span class="bz-arch-chip">GPT-4o (Pro)</span>
      <span class="bz-arch-chip">Claude 4 (Pro)</span>
      <span class="bz-arch-chip-note">Pro users select the synthesis model per query.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Response</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Cited answer</span>
      <span class="bz-arch-chip">Follow-up questions</span>
      <span class="bz-arch-chip">Related searches</span>
      <span class="bz-arch-chip-note">Sources are clickable. Answers can be exported or shared as a permalink.</span>
    </div>
  </div>
</div>

---

## Research workflow

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Enter question</span>
    <span class="bz-flow-step-desc">Type a natural-language question. Use Pro Search for broader research with more sources retrieved.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Sources retrieved</span>
    <span class="bz-flow-step-desc">Perplexity searches the web and selects the most relevant pages, displayed as numbered references.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Answer synthesized</span>
    <span class="bz-flow-step-desc">The LLM writes a response with inline citation numbers. Each claim maps to a specific source.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Verify sources</span>
    <span class="bz-flow-step-desc">Click any citation to open the original page. Confirm the claim before using it in a deliverable.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 5</span>
    <span class="bz-flow-step-name">Ask follow-up</span>
    <span class="bz-flow-step-desc">Perplexity maintains thread context. Drill into a sub-topic without repeating the original question.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 6</span>
    <span class="bz-flow-step-name">Export or share</span>
    <span class="bz-flow-step-desc">Copy the thread as markdown, share a permalink, or save it to a Space for team access.</span>
  </div>
</div>

---

## Key features

**Inline citations**: Every factual claim in the response carries a numbered superscript. Click it to open the exact source page. This is the single most important difference from ChatGPT or Claude without web search. You can verify the claim in under five seconds.

**Pro Search mode**: Runs a deeper research pass. More sources retrieved, longer synthesis, more thorough cross-referencing. Use it for competitive intelligence, market sizing, or any question where the standard pass feels thin.

**Focus modes**: Narrow the search index before retrieval. Options include Web (default), Academic (peer-reviewed sources), YouTube (video transcripts), Reddit (community discussion), and Wolfram Alpha (mathematical computation). Academic mode is practical for literature reviews. Reddit mode surfaces practitioner opinions that do not appear in documentation.

**Spaces**: Shared research collections for teams. A Space is a persistent thread environment with its own system prompt, shared history, and access controls. Use it to run ongoing competitive monitoring or to build a shared research base for a client engagement.

**File upload**: Upload a PDF and ask questions against it. Perplexity combines document retrieval with web search in the same response. Useful for cross-referencing a vendor whitepaper against current market conditions.

**API (Sonar models)**: Perplexity exposes its Sonar models through an OpenAI-compatible REST API. Developers can query the live web programmatically and receive cited responses in JSON. Covered in detail below.

---

## Perplexity API

The Perplexity API gives developers access to the Sonar model family with live web search built in. It uses the OpenAI chat completions format, so existing OpenAI SDK integrations need minimal changes.

**Base URL**: `https://api.perplexity.ai`

**Available models**:

| Model | Context | Best for |
|---|---|---|
| `sonar` | 127k tokens | Standard web-grounded Q&A |
| `sonar-pro` | 200k tokens | Deeper research, more sources |
| `sonar-reasoning` | 127k tokens | Step-by-step reasoning with citations |
| `sonar-reasoning-pro` | 200k tokens | Complex multi-step research tasks |

**Python example**:

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["PERPLEXITY_API_KEY"],
    base_url="https://api.perplexity.ai",
)

response = client.chat.completions.create(
    model="sonar-pro",
    messages=[
        {
            "role": "system",
            "content": (
                "You are a technical research assistant. "
                "Return concise answers with all sources cited."
            ),
        },
        {
            "role": "user",
            "content": (
                "What is the current pricing for Amazon Bedrock Claude Sonnet "
                "in eu-west-1 as of June 2026?"
            ),
        },
    ],
)

answer = response.choices[0].message.content
citations = response.citations  # list of URLs used in the response

print(answer)
print("\nSources:")
for i, url in enumerate(citations, start=1):
    print(f"  [{i}] {url}")
```

The `response.citations` field returns the list of URLs that the model used to construct the answer. Store these alongside any extracted facts if you are building a research pipeline that requires audit trails.

**Cost**: Sonar is priced per request plus per token. At June 2026 pricing, `sonar` costs $5 per 1,000 requests and $1 per million tokens. `sonar-pro` costs $8 per 1,000 requests and $3 per million tokens. Check the official pricing page for current rates: https://docs.perplexity.ai/guides/pricing

---

## Comparison

| | Perplexity | Google Search | ChatGPT Browse | Claude (web search) | You.com |
|---|---|---|---|---|---|
| **Real-time web** | Yes | Yes | Yes | Yes | Yes |
| **Inline citations** | Yes, every claim | No | Partial | Partial | Yes |
| **API access** | Yes (Sonar) | Yes (Custom Search) | No | No (via API only) | Yes |
| **File upload** | Yes (Pro) | No | Yes (Plus) | Yes | Yes |
| **Focus modes** | Yes (Academic, Reddit, YouTube, Wolfram) | Limited filters | No | No | Yes |
| **Spaces (team)** | Yes | No | No | No | No |
| **Free tier** | Yes (limited queries) | Yes | No | Yes | Yes |
| **Pro cost/month** | ~$20 | N/A | ~$20 | ~$20 | ~$15 |

---

## When to use Perplexity

**Technical research**: Ask "What changed in the OpenAI Assistants API in May 2026?" and get a sourced answer in fifteen seconds. No tab-opening required.

**Competitive intelligence**: "What are the key differences between Snowflake Cortex and Amazon Bedrock Knowledge Bases?" returns a comparison synthesized from current vendor documentation, analyst posts, and community discussion.

**Documentation lookup**: Use it for current pricing, quota limits, and feature availability. Official docs change frequently. Perplexity retrieves the live page, not a cached version from training data.

**Replacing long-form Google sessions**: When a question requires synthesizing five or more sources, Perplexity does the synthesis. Use this for market sizing, vendor shortlisting, or technology selection research.

**Academic focus mode**: Surface peer-reviewed papers on a topic without using Google Scholar directly. Useful as a starting point before going deeper into a literature review.

---

## When not to use Perplexity

**When you need to verify every claim independently**: Perplexity is a synthesis tool. It can misread or misrepresent sources. For high-stakes decisions, open the citations and read the originals yourself. Do not treat the synthesized answer as a primary source.

**When you need deep analysis, not synthesis**: Perplexity is fast and broad. For nuanced interpretation of a complex topic (for example, a detailed code review or architectural trade-off analysis), a long-context LLM with your own curated context will outperform it.

**When API cost matters for non-search tasks**: Sonar queries the web on every call, which adds latency and cost compared to a standard LLM completion. If your task does not require live web data (classification, summarization of a document you already have, code generation), use Claude or GPT-4o directly. The web search overhead is unnecessary.

**When you need reproducible outputs**: Web search results change. The same query submitted twice may produce a different answer if the top-k retrieved pages differ. For deterministic pipelines, use a static knowledge base.

**When source quality needs strict control**: Perplexity retrieves from the open web. The Academic focus mode narrows this, but the default mode may cite blog posts, forums, or vendor marketing. For regulated industries (healthcare, finance, legal), validate every source before relying on the output.

---

## Further reading

- [Perplexity API documentation](https://docs.perplexity.ai): Official reference for the Sonar model API, authentication, request format, and citation fields.
- [Perplexity API pricing](https://docs.perplexity.ai/guides/pricing): Current per-request and per-token rates for all Sonar model tiers.
- [Sonar model overview](https://docs.perplexity.ai/guides/model-cards): Capability comparison for sonar, sonar-pro, sonar-reasoning, and sonar-reasoning-pro.
- [Perplexity Spaces documentation](https://www.perplexity.ai/hub/faq/what-are-spaces): How to create shared research collections and configure custom system prompts for team use.
- [What is RAG?](/glossary/rag/): Explains retrieval-augmented generation, the architecture that underlies Perplexity's answer pipeline.
- [What is an LLM?](/glossary/llm/): Background on large language models, which Perplexity uses for synthesis.
- [LLM Landscape 2026](/comparisons/llm-landscape-2026/): Model comparison covering the Sonar family alongside GPT-4o, Claude 4, and Gemini.
- [Perplexity research hub](https://www.perplexity.ai/hub): Blog posts and product announcements from the Perplexity team.
