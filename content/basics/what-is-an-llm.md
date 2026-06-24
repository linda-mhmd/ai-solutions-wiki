---
title: "What is a Large Language Model (LLM)?"
description: "A large language model is the AI behind ChatGPT, Claude, and Gemini. Plain-English explanation of how LLMs work, what they can and cannot do, and how to choose between them."
date: 2026-06-22
level: 1
categories: [Basics]
tags: ["beginner", "llm", "chatgpt", "claude", "gemini", "transformers", "ai-basics"]
youtube_id: "LPZh9BOjkQs"
youtube_title: "What are Large Language Models (LLMs)?"
youtube_channel: "Google Cloud"
docs: "https://platform.openai.com/docs/introduction"
docs_label: "OpenAI Platform Documentation"
faqs:
  - question: "What is an LLM in simple terms?"
    answer: "An LLM (large language model) is a type of AI trained on massive amounts of text that can understand and generate human language. 'Large' refers to billions of internal parameters. 'Language model' means it works with text: reading it, summarising it, translating it, answering questions about it, and writing new text. ChatGPT, Claude, Gemini, and Mistral are all LLMs."
  - question: "What is the difference between an LLM and ChatGPT?"
    answer: "An LLM is the underlying model (the AI brain). ChatGPT is a product built on top of an LLM (GPT-4o from OpenAI). The relationship is like the difference between an engine and a car: the LLM is the engine, ChatGPT is the car. Other products built on LLMs include Claude (Anthropic), Gemini (Google), Copilot (Microsoft), and Perplexity. Companies can also access LLMs directly via API to build their own products."
  - question: "How does an LLM know so much?"
    answer: "LLMs are trained on text scraped from the internet, books, code repositories, and other sources. Training data for GPT-4 is estimated at several hundred billion words. During training, the model learns statistical relationships between words, concepts, facts, and reasoning patterns. It does not have a separate knowledge database it looks things up in. Everything it knows is encoded in its billions of parameters as learned patterns."
  - question: "What is a context window?"
    answer: "The context window is how much text an LLM can consider at once in a single conversation. It is measured in tokens (roughly 0.75 words per token). A 128K context window holds about 100,000 words, enough for roughly 300 pages of text. Everything outside the context window is invisible to the model when generating a response. Larger context windows let you work with longer documents, but cost more per API call."
  - question: "Which LLM is best?"
    answer: "It depends on the use case. Claude claude-opus-4-8 and GPT-4o lead on complex reasoning and long documents. Mistral and Llama 3 are best for cost-sensitive or EU-data-residency requirements. Gemini 2.0 Flash leads on speed and multimodal tasks. The best practice is to define your quality bar and budget, then benchmark 2-3 models on your actual use case before committing."
---

{{< quickanswer >}}
A large language model (LLM) is an AI system trained on enormous amounts of text that can read, write, summarise, and reason about language. "Large" refers to billions of internal parameters learned during training. LLMs are the technology behind ChatGPT, Claude, Gemini, Copilot, and most modern AI assistants. They work by predicting the most likely next word given everything before it, repeated until a full response is produced.
{{< /quickanswer >}}

<figure class="bz-figure">
  <img src="/img/shaping-ai/books-radial-red-sphere-notext.png" alt="Hundreds of books arranged radially around a glowing red central sphere in a dark space: a large language model compresses vast text data into a single model." loading="lazy">
  <figcaption>An LLM is trained on billions of words from books, websites, and code, then distils all of that into a single model that can engage with any text you give it.</figcaption>
</figure>

## Why "large"?

"Large" refers to the number of parameters in the model: billions of numerical values that encode everything the model has learned. GPT-3 (2020) had 175 billion parameters. Modern frontier models are estimated at hundreds of billions to over a trillion parameters.

Parameters are not directly interpretable (you cannot look at parameter number 4.2 billion and see "this is the concept of democracy"). They are numerical weights that collectively produce language behaviour when combined. The "large" matters because more parameters generally means the model can represent more complex patterns, though this relationship is not linear.

## How an LLM generates text

An LLM generates text one token at a time. A token is roughly a word or word fragment:

- "unbelievable" might become `un`, `believ`, `able`
- Most common words are single tokens
- Rare words and most non-English words use multiple tokens

When you send a message, the model processes all the text in the conversation and predicts the most likely next token. Then it appends that token and predicts the next one. This continues until the model generates a stop signal or reaches a length limit.

```
Prompt: "The capital of Austria is"
Token 1: "Vienna"         ← predicted with ~95% probability
Token 2: "."              ← predicted with high probability
Token 3: [STOP]
```

The key insight: an LLM does not retrieve facts from a database. It generates text from learned statistical patterns. This is why it can write fluently about any topic, and also why it can be wrong.

## The components of a modern LLM system

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">User interface</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Chat interface (ChatGPT, Claude.ai)</span>
      <span class="bz-arch-chip">API (developer access)</span>
      <span class="bz-arch-chip">SDK (Python, Node.js)</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">System prompt</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Persona and role definition</span>
      <span class="bz-arch-chip">Behaviour constraints</span>
      <span class="bz-arch-chip">Context injection</span>
      <span class="bz-arch-chip-note">Set by the application builder, invisible to the end user in most products</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">The LLM</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Transformer architecture</span>
      <span class="bz-arch-chip">Billions of parameters</span>
      <span class="bz-arch-chip">Context window</span>
      <span class="bz-arch-chip-note">Pre-trained on large text corpus, then fine-tuned on instructions and human preferences</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Optional: tools</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Web search</span>
      <span class="bz-arch-chip">Code execution</span>
      <span class="bz-arch-chip">Database retrieval (RAG)</span>
      <span class="bz-arch-chip-note">Modern LLMs can call external tools to augment their knowledge and capabilities</span>
    </div>
  </div>
</div>

## What LLMs are good at

- **Writing**: Drafts, emails, reports, summaries, translations
- **Code**: Writing, explaining, debugging, reviewing, and refactoring code
- **Analysis**: Extracting structure from unstructured text, classifying content, identifying patterns
- **Question answering**: Answering questions about documents you provide (the model reads what you paste in)
- **Reasoning**: Multi-step logical problems, comparing options, planning
- **Conversation**: Maintaining context across a long dialogue

## What LLMs are not good at

- **Real-time information**: Training data has a cut-off date. The model does not know what happened yesterday unless you tell it or connect it to a search tool.
- **Precise arithmetic**: LLMs are not calculators. They can do basic maths but make errors on multi-step calculations. Use code execution for precise numbers.
- **Remembering between sessions**: Each conversation is independent. The model does not remember your name from last week's chat unless explicitly told.
- **Guaranteed accuracy**: LLMs hallucinate. They generate plausible-sounding text that may be factually wrong. Never rely on LLM output for medical, legal, or financial decisions without expert verification.

## Major LLMs compared

| | GPT-4o (OpenAI) | Claude Sonnet 4.6 (Anthropic) | Gemini 2.0 Flash (Google) | Mistral Large |
|---|---|---|---|---|
| **Context window** | 128K tokens | 200K tokens | 1M tokens | 128K tokens |
| **Multimodal (images)** | Yes | Yes | Yes | No |
| **Best at** | General tasks, GPT ecosystem | Long documents, coding | Speed, large context | EU residency, cost |
| **API pricing (input/1M)** | ~€4.50 | ~€3.00 | ~€0.10 | €2.00 |
| **Data residency** | US | US | US or EU | EU (Paris) |

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Pre-training</span>
    <span class="bz-flow-step-name">Learn language</span>
    <span class="bz-flow-step-desc">Trained on hundreds of billions of words to predict the next token. Learns grammar, facts, reasoning, and style from the data distribution.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Fine-tuning</span>
    <span class="bz-flow-step-name">Learn to follow instructions</span>
    <span class="bz-flow-step-desc">Further trained on human-written instruction-response pairs. Teaches the model to be helpful rather than just predicting text.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">RLHF</span>
    <span class="bz-flow-step-name">Learn human preferences</span>
    <span class="bz-flow-step-desc">Human raters compare responses. A reward model learns preferences. The LLM is tuned to produce responses that score higher with human raters.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Deployment</span>
    <span class="bz-flow-step-name">Serve via API</span>
    <span class="bz-flow-step-desc">The model is quantised and served at scale. Developers access it via API with per-token pricing. Consumers access via chat interfaces.</span>
  </div>
</div>

## What's next

- [What is an AI Agent?](/basics/what-is-an-ai-agent/): LLMs that take actions in the world, not just chat
- [What is AI Hallucination?](/basics/what-is-ai-hallucination/): Why LLMs produce confident wrong answers
- [What is Fine-tuning?](/basics/what-is-fine-tuning/): Adapting a pre-trained LLM for a specific domain
- [Building RAG Systems](/guides/building-rag-systems/): Giving an LLM access to your private knowledge base

## Further reading

- [LLM Landscape 2026](/comparisons/llm-landscape-2026/): Side-by-side comparison of all major models
- [What is Generative AI?](/basics/what-is-generative-ai/): Broader context for the content-generation capability of LLMs
- [What is Machine Learning?](/basics/what-is-machine-learning/): The foundational technique behind LLMs
- [Attention is All You Need (2017)](https://arxiv.org/abs/1706.03762): The original Transformer paper that made modern LLMs possible
