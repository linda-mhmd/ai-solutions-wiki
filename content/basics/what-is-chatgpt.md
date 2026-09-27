---
title: "What is ChatGPT?"
description: "ChatGPT is OpenAI's AI chatbot, running at the time of writing (September 2026) on the GPT-5.6 and GPT-6 model families. How it works, what it can and cannot do, and how it compares to Claude and Gemini."
date: 2026-06-22
lastmod: 2026-09-25
last_verified: 2026-09-25
level: 0
categories: [Basics]
tags: ["beginner", "chatgpt", "openai", "gpt", "llm", "ai-basics", "ai-assistant"]
docs: "https://platform.openai.com/docs/introduction"
docs_label: "OpenAI Platform Documentation"
faqs:
  - question: "What is the difference between ChatGPT and GPT?"
    answer: "GPT is the name of OpenAI's family of large language models (at the time of writing, September 2026, the GPT-5.6 and GPT-6 generations). ChatGPT is the product (the website and app) built on top of those models. Think of it like a car engine vs the car: the GPT model is the engine, ChatGPT is the car. Developers can call the same models directly through the OpenAI API (for example gpt-6-sol or gpt-6-luna) to build their own products. The exact model behind ChatGPT changes every few months, so the product name is more stable than the model name."
  - question: "Is ChatGPT free?"
    answer: "Yes, there is a free tier. As of September 2026 OpenAI sells six plans: Free ($0, GPT-5.6 Luna with unlimited text but capped images, uploads and voice, and ads), Go ($8/month, higher caps), Plus ($20/month, GPT-5.6 Terra/Sol plus the GPT-6 Astra, Sol and Luna models, Deep Research, Agent Mode, image generation with ChatGPT Images), Pro ($100 or $200/month, much higher limits and access to GPT-6 Astra as 'GPT-6 Pro'), plus Business and Enterprise for organisations. Prices and limits change often; see the ChatGPT Free vs Plus vs Pro comparison on this wiki for the dated, sourced details. The OpenAI API for developers is billed per token, separately from any ChatGPT subscription."
  - question: "Can ChatGPT access the internet?"
    answer: "Every GPT model has a training knowledge cutoff: a date after which it has not seen any data. ChatGPT can search the web to retrieve current information, and it usually does this automatically when a question needs fresh facts. When it answers without searching, it relies on training data only and may not know about recent events. Check whether an answer cites sources before trusting it on anything recent."
  - question: "Is ChatGPT better than Claude or Gemini?"
    answer: "On different tasks, different models win, and the lead changes with every release. At the time of writing (September 2026), ChatGPT has the largest user base and the broadest single-app feature set (voice, image generation, Deep Research, Agent Mode, Codex). Claude (current flagship models Claude Opus 5.5 and Claude Fable 5.1) is often preferred for long-document analysis, careful writing and coding agents. Gemini (for example Gemini 3.8 Flash) is strong on speed, price and Google Workspace integration. None is definitively 'best': the right choice depends on your use case, data privacy requirements and budget. The LLM Landscape 2026 page tracks the current models."
  - question: "Can businesses use ChatGPT for customer data?"
    answer: "Not on a personal Free, Go or Plus account: consumer conversations may be used to improve OpenAI's models unless you opt out, and there is no business data processing agreement. OpenAI's organisational plans (ChatGPT Business, formerly Team, and ChatGPT Enterprise) and the API do not train on your data by default and offer data processing agreements; Enterprise adds data residency options. EU businesses must still check whether transfers to OpenAI are compatible with their GDPR obligations and document that assessment."
---

{{< quickanswer >}}
ChatGPT is an AI chatbot developed by OpenAI, launched in November 2022. It runs on OpenAI's GPT family of large language models, trained on vast amounts of text, which gives it the ability to answer questions, write, summarise, translate, code, and reason about almost any topic. At the time of writing (September 2026), ChatGPT runs on the **GPT-5.6** models, with the newer **GPT-6** generation rolling in at the top, and it is the most widely used AI assistant in the world: OpenAI said it passed **1 billion weekly users** in mid-2026. It is one of several large language model products; competitors include Claude (Anthropic) and Gemini (Google). For the current list of models, see the [LLM Landscape 2026](/comparisons/llm-landscape-2026/).
{{< /quickanswer >}}

<figure class="bz-figure">
  <img src="/img/enterprise-dark/team-watching-red-brain-notext.png" alt="A team of people watching a glowing red neural brain structure in a dark room: ChatGPT represented the moment AI became widely visible to the public, a shared brain that teams could interact with." loading="lazy">
  <figcaption>ChatGPT's launch in November 2022 was the moment AI became visible to everyone: a shared, conversational intelligence that teams could interact with for the first time.</figcaption>
</figure>

## What ChatGPT can do

ChatGPT is a general-purpose conversational AI assistant. Its core capabilities:

**Writing and editing**
- Draft emails, reports, proposals, articles, and presentations
- Edit for clarity, tone, grammar, and conciseness
- Summarise long documents or research papers
- Translate between languages (supports 50+ languages)

**Coding**
- Write code in Python, JavaScript, SQL, TypeScript, and dozens of other languages
- Explain what a piece of code does
- Debug errors and suggest fixes
- Refactor code for readability or performance

**Analysis and reasoning**
- Answer questions about documents you paste in
- Compare options and recommend based on criteria you specify
- Break down complex problems into steps
- Draft structured plans, outlines, and checklists

**Creative tasks**
- Write stories, scripts, poems, and presentations
- Brainstorm ideas and suggest variations
- Generate and edit images directly with ChatGPT Images (powered by GPT Image 2.5 at the time of writing), or write prompts for other image tools

## The GPT model family

ChatGPT has been built on successively more capable models since launch, and OpenAI swaps the model underneath every few months. This is the lineup at the time of writing (September 2026); check the [LLM Landscape 2026](/comparisons/llm-landscape-2026/) for the live list.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">GPT-6 Astra (top tier, shown as "GPT-6 Pro")</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">1.05M-token context (API)</span>
      <span class="bz-arch-chip">Strongest reasoning</span>
      <span class="bz-arch-chip-note">Rolling out in ChatGPT since 3 September 2026, starting with the Pro, Business and Enterprise plans. The most capable and most expensive OpenAI model; access is gated.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">GPT-5.6 Sol / Terra (Plus and above)</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Reasoning-effort picker</span>
      <span class="bz-arch-chip">Text and image input</span>
      <span class="bz-arch-chip-note">Plus users choose a reasoning effort (Instant, Medium, High, Extra High) instead of a model name; underneath, ChatGPT routes to GPT-5.6 Terra or Sol. Reads images, charts and documents.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">GPT-5.6 Luna (Free and Go default)</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Fastest and cheapest</span>
      <span class="bz-arch-chip">"Think" toggle</span>
      <span class="bz-arch-chip-note">Handles most everyday tasks well. Unlimited text chat on the Free plan since August 2026, with a toggle for slower, more careful answers.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">GPT-6 Sol / GPT-6 Luna (new generation, 22 September 2026)</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Released 22 September 2026</span>
      <span class="bz-arch-chip">1.05M-token context</span>
      <span class="bz-arch-chip-note">The newest mid-tier and small models. Available in the OpenAI API, and listed on ChatGPT Plus and Pro (at launch mainly in ChatGPT Work and Codex rather than the everyday chat picker).</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">GPT-4o, o3, o4-mini (previous generations)</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Superseded</span>
      <span class="bz-arch-chip-note">GPT-4o was ChatGPT's flagship in 2024 and early 2025, and o3 and o4-mini were OpenAI's dedicated reasoning models. All have been superseded by the GPT-5.x and GPT-6 families; reasoning is now built into the main models.</span>
    </div>
  </div>
</div>

## How ChatGPT works

ChatGPT is built on OpenAI's GPT models, which are transformer-based large language models. It generates responses by predicting the most likely next token given the full conversation history.

What makes it feel like a genuine assistant rather than a raw text predictor is the training pipeline:

1. **Pre-training**: The model is trained on hundreds of billions of words of text from the internet, books, and code. It learns language patterns, facts, and reasoning structures from this data.

2. **Instruction fine-tuning**: The model is further trained on human-written examples of question-answer pairs. It learns to follow instructions rather than just predict text.

3. **RLHF and reinforcement learning**: Human raters compare multiple responses and rank them. A reward model learns what responses humans prefer, and the LLM is tuned to produce higher-ranked responses. Current GPT models are also trained with reinforcement learning to "think" through a problem step by step before answering, which is what the reasoning-effort setting controls.

The result is a model that feels cooperative, helpful, and able to engage with almost any topic.

## ChatGPT vs Claude vs Gemini

At the time of writing (September 2026). Model versions and prices change often; the [LLM Landscape 2026](/comparisons/llm-landscape-2026/) and [ChatGPT vs Gemini vs Claude](/comparisons/chatgpt-vs-gemini-vs-claude/) pages track the current state.

| | ChatGPT (OpenAI) | Claude (Anthropic) | Gemini (Google) |
|---|---|---|---|
| **Example current model** | GPT-6 Sol (API and paid plans), GPT-5.6 in everyday chat | Claude Opus 5.5 | Gemini 3.8 Flash |
| **Context window (API)** | 1.05M tokens | 1M tokens | 1,048,576 tokens |
| **Best for** | Broadest all-in-one app, voice, images, Codex | Long docs, careful writing, coding agents | Speed, low price, Google Workspace |
| **Image input** | Yes | Yes | Yes |
| **Image generation** | Yes (ChatGPT Images) | No | Yes |
| **API price (input / output per 1M tokens)** | $2 / $10 | $4 / $20 | $0.75 / $3.75 (introductory, until 31 Dec 2026) |
| **Business data terms** | Business and Enterprise plans, API | Claude for Work plans, API | Google Workspace, Gemini API paid tier |

## What ChatGPT cannot do

**Recall recent events without web search**: Every GPT model's training data has a knowledge cutoff. Without web search enabled, it does not know what happened after that date.

**Give reliable specific facts**: ChatGPT can hallucinate. It can state statistics, URLs, names, and dates with confidence when the information is fabricated. Always verify specific factual claims from authoritative sources.

**Take actions in the world without tools**: The underlying model only generates text. ChatGPT can search the web, run code, and (on paid plans) use Agent Mode to operate a browser for multi-step tasks, but it cannot send your emails or update your company's databases unless you connect those systems and give it permission.

**Maintain memory across sessions by default**: Each conversation starts fresh unless the Memory feature is switched on (available on Free, with more capacity on paid plans). Without it, ChatGPT does not remember that you told it your name last week.

**Guarantee accuracy for high-stakes decisions**: Legal, medical, and financial decisions require human expert review. ChatGPT's output is a starting point, not a conclusion.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">You type</span>
    <span class="bz-flow-step-name">Send a message</span>
    <span class="bz-flow-step-desc">Your message is added to the conversation history and sent to the model as the full context.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Model runs</span>
    <span class="bz-flow-step-name">Token prediction</span>
    <span class="bz-flow-step-desc">The model generates one token at a time (reasoning models may "think" first), streaming each word as it is produced. It draws on its training data, not a live knowledge lookup.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Optional tool</span>
    <span class="bz-flow-step-name">Web search or code</span>
    <span class="bz-flow-step-desc">If web search or the code interpreter is enabled and triggered, the model calls the tool, reads the result, and incorporates it into the response.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Response</span>
    <span class="bz-flow-step-name">You receive text</span>
    <span class="bz-flow-step-desc">The generated response appears in the conversation. You can ask follow-up questions: the model remembers everything in the current session.</span>
  </div>
</div>

## Using GPT models via the OpenAI API

Developers call the GPT models directly via the API to build custom products. This example uses `gpt-6-sol`, OpenAI's mid-tier model at the time of writing; swap in `gpt-6-luna` for cheaper, faster answers:

```python
from openai import OpenAI

client = OpenAI(api_key="YOUR_OPENAI_API_KEY")

response = client.chat.completions.create(
    model="gpt-6-sol",
    reasoning_effort="low",
    messages=[
        {
            "role": "system",
            "content": "You are an expert on Austrian tax law. Answer questions clearly and flag where the user should consult a registered tax advisor."
        },
        {
            "role": "user",
            "content": "Can I deduct home office costs if I work remotely three days per week in Austria?"
        }
    ],
    max_completion_tokens=2000,  # reasoning models count their "thinking" tokens here too
)

print(response.choices[0].message.content)
```

## What's next

- [What is a Large Language Model?](/basics/what-is-an-llm/): The technology powering ChatGPT in depth
- [Claude vs ChatGPT](/comparisons/claude-vs-chatgpt/): Detailed comparison of Anthropic and OpenAI models
- [ChatGPT Free vs Plus vs Pro](/comparisons/chatgpt-free-vs-plus-vs-pro/): What each ChatGPT plan costs and unlocks
- [What is AI Hallucination?](/basics/what-is-ai-hallucination/): Why ChatGPT and other LLMs produce confident wrong answers

## Further reading

- [OpenAI Platform Documentation](https://platform.openai.com/docs/introduction): API reference for developers using GPT models
- [ChatGPT Enterprise](https://openai.com/enterprise): Business and data processing agreement details
- [LLM Landscape 2026](/comparisons/llm-landscape-2026/): Full comparison of all major AI models
- [What is Generative AI?](/basics/what-is-generative-ai/): The broader category ChatGPT belongs to
