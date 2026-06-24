---
title: "What is ChatGPT?"
description: "ChatGPT is an AI chatbot built by OpenAI on top of the GPT-4o language model. How it works, what it can and cannot do, and how it compares to Claude and Gemini."
date: 2026-06-22
level: 0
categories: [Basics]
tags: ["beginner", "chatgpt", "openai", "gpt", "llm", "ai-basics", "ai-assistant"]
docs: "https://platform.openai.com/docs/introduction"
docs_label: "OpenAI Platform Documentation"
faqs:
  - question: "What is the difference between ChatGPT and GPT-4o?"
    answer: "GPT-4o is the underlying AI model: the large language model developed by OpenAI. ChatGPT is the product (the website and app) built on top of that model. Think of it like a car engine vs the car: GPT-4o is the engine, ChatGPT is the car. Developers can access GPT-4o directly via the OpenAI API to build their own products. When you use ChatGPT.com or the app, you are using OpenAI's own product interface on top of the same model."
  - question: "Is ChatGPT free?"
    answer: "ChatGPT has a free tier with limited access and a paid tier (ChatGPT Plus, roughly €20/month) that provides access to GPT-4o, faster responses, image generation via DALL-E 3, and higher message limits. Teams and enterprise plans are available for business use. The OpenAI API (for developers building applications) is priced per token, separate from the ChatGPT subscription."
  - question: "Can ChatGPT access the internet?"
    answer: "The free version uses GPT-4o mini and has a training knowledge cutoff (early 2024). ChatGPT Plus subscribers on GPT-4o can use the built-in web search feature to retrieve current information. Without web search enabled, ChatGPT generates from training data only and may not know about recent events."
  - question: "Is ChatGPT better than Claude or Gemini?"
    answer: "On different tasks, different models win. GPT-4o (ChatGPT) is strong at general tasks, coding, multimodal reasoning, and has the largest ecosystem of integrations. Claude claude-opus-4-8 often leads on long document analysis, careful reasoning, and writing quality. Gemini 2.0 Flash leads on speed and large context windows. None is definitively 'best' across all tasks: the right choice depends on your use case, data privacy requirements, and pricing."
  - question: "Can businesses use ChatGPT for customer data?"
    answer: "For business use with customer data, the standard ChatGPT consumer product is not appropriate: conversations may be used for training. OpenAI's enterprise product (ChatGPT Enterprise) and the API both offer data processing agreements and options to opt out of training data use. EU businesses must additionally evaluate whether data transfer to OpenAI's US servers is compatible with their GDPR obligations under current Standard Contractual Clauses."
---

{{< quickanswer >}}
ChatGPT is an AI chatbot developed by OpenAI, launched in November 2022. It runs on GPT-4o, a large language model trained on vast amounts of text, which gives it the ability to answer questions, write, summarise, translate, code, and reason about almost any topic. In 2026, ChatGPT is the most widely used AI assistant in the world, with over 200 million weekly active users. It is one of several large language model products; competitors include Claude (Anthropic) and Gemini (Google).
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
- Generate image prompts for DALL-E 3 or Midjourney

## The GPT model family

ChatGPT has been built on successively more capable models since launch:

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">GPT-4o (current flagship)</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">128K context window</span>
      <span class="bz-arch-chip">Text, image, audio input</span>
      <span class="bz-arch-chip">Strongest reasoning</span>
      <span class="bz-arch-chip-note">Available in ChatGPT Plus and via API. Multimodal: reads images, describes charts, analyses documents.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">GPT-4o mini (free tier)</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">128K context</span>
      <span class="bz-arch-chip">Faster and cheaper</span>
      <span class="bz-arch-chip-note">Handles most tasks well. Lower performance on complex reasoning. Used in free ChatGPT and as the default API model for high-volume use.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">o3 / o4-mini (reasoning models)</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Slower generation</span>
      <span class="bz-arch-chip">Stronger at maths and logic</span>
      <span class="bz-arch-chip-note">Designed for tasks requiring step-by-step reasoning. Used in scientific research, coding competitions, and complex analysis. More expensive.</span>
    </div>
  </div>
</div>

## How ChatGPT works

ChatGPT is built on GPT-4o, a transformer-based large language model. It generates responses by predicting the most likely next token given the full conversation history.

What makes it feel like a genuine assistant rather than a raw text predictor is the training pipeline:

1. **Pre-training**: GPT-4o is trained on hundreds of billions of words of text from the internet, books, and code. It learns language patterns, facts, and reasoning structures from this data.

2. **Instruction fine-tuning**: The model is further trained on human-written examples of question-answer pairs. It learns to follow instructions rather than just predict text.

3. **RLHF**: Human raters compare multiple responses and rank them. A reward model learns what responses humans prefer. The LLM is tuned to produce higher-ranked responses.

The result is a model that feels cooperative, helpful, and able to engage with almost any topic.

## ChatGPT vs Claude vs Gemini

| | ChatGPT (GPT-4o) | Claude claude-opus-4-8 | Gemini 2.0 Flash |
|---|---|---|---|
| **Provider** | OpenAI (US) | Anthropic (US) | Google (US) |
| **Context window** | 128K tokens | 200K tokens | 1M tokens |
| **Best for** | General tasks, GPT plugins | Long docs, careful reasoning | Speed, large context, Google Workspace |
| **Image input** | Yes | Yes | Yes |
| **Voice mode** | Yes (Advanced Voice) | No (as of June 2026) | Yes |
| **API pricing (input/1M)** | ~€4.50 | ~€3.00 | ~€0.10 |
| **EU data residency** | No (US only) | No (US only) | EU option available |
| **Enterprise DPA** | Yes (Enterprise plan) | Yes (Claude for Work) | Yes (Google Workspace) |

## What ChatGPT cannot do

**Recall recent events without web search**: GPT-4o's training data has a knowledge cutoff. Without web search enabled, it does not know what happened after that date.

**Give reliable specific facts**: ChatGPT hallucinate. It can state statistics, URLs, names, and dates with confidence when the information is fabricated. Always verify specific factual claims from authoritative sources.

**Take actions in the world without tools**: The base ChatGPT chat interface only generates text. ChatGPT can browse the web (when enabled) and run code (in the code interpreter). It cannot book flights, send emails, or update databases on its own without additional integration.

**Maintain memory across sessions**: Each conversation starts fresh unless you enable the Memory feature (Plus tier). ChatGPT does not remember that you told it your name last week.

**Guarantee accuracy for high-stakes decisions**: Legal, medical, and financial decisions require human expert review. ChatGPT's output is a starting point, not a conclusion.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">You type</span>
    <span class="bz-flow-step-name">Send a message</span>
    <span class="bz-flow-step-desc">Your message is added to the conversation history and sent to GPT-4o as the full context.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Model runs</span>
    <span class="bz-flow-step-name">Token prediction</span>
    <span class="bz-flow-step-desc">GPT-4o generates one token at a time, streaming each word as it is produced. It draws on its training data, not a live knowledge lookup.</span>
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

## Using GPT-4o via the OpenAI API

Developers access GPT-4o directly via the API to build custom products:

```python
from openai import OpenAI

client = OpenAI(api_key="YOUR_OPENAI_API_KEY")

response = client.chat.completions.create(
    model="gpt-4o",
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
    max_tokens=500,
)

print(response.choices[0].message.content)
```

## What's next

- [What is a Large Language Model?](/basics/what-is-an-llm/): The technology powering ChatGPT in depth
- [Claude vs GPT](/comparisons/claude-vs-gpt/): Detailed comparison of Anthropic and OpenAI models
- [What is AI Hallucination?](/basics/what-is-ai-hallucination/): Why ChatGPT and other LLMs produce confident wrong answers

## Further reading

- [OpenAI Platform Documentation](https://platform.openai.com/docs/introduction): API reference for developers using GPT-4o
- [ChatGPT Enterprise](https://openai.com/enterprise): Business and data processing agreement details
- [LLM Landscape 2026](/comparisons/llm-landscape-2026/): Full comparison of all major AI models
- [What is Generative AI?](/basics/what-is-generative-ai/): The broader category ChatGPT belongs to
