---
title: "What is AI?"
description: "AI is software that learns patterns from data instead of following hand-written rules. Here is what that actually means, without the hype."
date: 2026-05-24
level: 4
categories: [Basics]
tags: [beginner, ai, machine-learning, llm, neural-networks]
youtube_id: "zjkBMFhNj_g"
youtube_title: "But What is a Neural Network?"
youtube_channel: "3Blue1Brown"
docs: "https://docs.anthropic.com/en/docs/"
docs_label: "Anthropic Documentation"
faqs:
  - question: "What is the difference between AI and machine learning?"
    answer: "AI (Artificial Intelligence) is the broad concept: software that performs tasks normally requiring human intelligence. Machine learning (ML) is the main technique used to achieve modern AI: instead of programming explicit rules, you train a system on data and it learns the rules itself. Deep learning is a subset of ML using neural networks with many layers. In practice: when people say 'AI' in 2026, they usually mean ML-based systems, often deep learning. When they say 'machine learning', they might mean traditional ML (decision trees, regression) or neural networks depending on context."
  - question: "What is a token in AI?"
    answer: "Language models process text as tokens, pieces of words, not always whole words. 'unbelievable' might be split into 'un', 'believ', 'able'. The exact split depends on the tokeniser. Models have a context window measured in tokens: how much text they can consider at once. GPT-4o handles 128,000 tokens (~100,000 words). Claude models support up to 200,000 tokens. The limit matters because everything outside the context window is not 'visible' to the model when it generates a response."
  - question: "Why does AI make things up (hallucinate)?"
    answer: "Language models generate text by predicting what token comes next, based on patterns in their training data. They have no mechanism for distinguishing 'I know this' from 'I am extrapolating this'. When asked about something outside their training data or at the edges of their knowledge, they continue generating plausible-sounding text, which may be factually wrong. This is hallucination: fluent, confident, incorrect output. Mitigation strategies: retrieval-augmented generation (RAG), grounding responses with source documents, and always verifying factual claims from AI independently."
---

{{< quickanswer >}}
AI (Artificial Intelligence) is a broad term for software that performs tasks normally requiring human intelligence. Modern AI works by learning statistical patterns from enormous amounts of data, rather than following explicit rules written by a programmer. Large language models like Claude, GPT, and Gemini are the dominant form of AI in 2026.
{{< /quickanswer >}}

## The old way vs the new way

Traditional software follows explicit rules written by programmers:

```python
if age < 18:
    deny_purchase()
if temperature > 100:
    send_alert()
```

Every situation must be anticipated and coded manually. This works for precise, rule-governed tasks. It breaks down for complex ones, recognising a cat in a photo, understanding sarcasm, or generating a coherent essay.

**Machine learning** takes a different approach: instead of writing rules, you give the system thousands or millions of labelled examples, and it figures out the patterns itself. Show it enough photos labelled "cat" and "not cat" and it learns what makes a cat a cat, better than you could describe in rules.

The result is systems that can do things programmers could never explicitly code. [More: Machine learning, Google Developers](https://developers.google.com/machine-learning/crash-course/ml-intro)

<div class="bz-compare">
<div class="bz-compare-col">
<div class="bz-compare-head">Traditional software</div>
<div class="bz-compare-item">Developer writes explicit rules</div>
<div class="bz-compare-item">Every case must be anticipated in code</div>
<div class="bz-compare-item">Deterministic: same input always gives same output</div>
<div class="bz-compare-item">Easy to explain: "if X then Y"</div>
<div class="bz-compare-item">Breaks on edge cases not in the rules</div>
<div class="bz-compare-item">Good for: accounting, form validation, business rules</div>
</div>
<div class="bz-compare-col">
<div class="bz-compare-head">Machine learning</div>
<div class="bz-compare-item">System learns rules from labelled examples</div>
<div class="bz-compare-item">Generalises to cases it has never seen</div>
<div class="bz-compare-item">Probabilistic: outputs have confidence scores</div>
<div class="bz-compare-item">Hard to explain: parameters are opaque weights</div>
<div class="bz-compare-item">Degrades gracefully on novel inputs</div>
<div class="bz-compare-item">Good for: image recognition, language, recommendations</div>
</div>
</div>

<figure class="bz-figure">
<img src="/img/basics/comparison-code-vs-ai.png" alt="Side-by-side comparison of traditional code (explicit if/else rules) versus AI/ML (data-driven pattern learning), showing where each approach works best">
<figcaption>The fundamental shift: from handwritten rules to learned patterns. Neither approach is universally better. Production systems often combine both.</figcaption>
</figure>

## Types of machine learning

**Supervised learning**, the most common type. You provide labelled training examples (inputs paired with correct outputs). The model learns to predict the output for new inputs. Examples: spam detection, image classification, sentiment analysis, house price prediction.

**Unsupervised learning**, you provide inputs without labels. The model finds structure on its own. Examples: customer segmentation, anomaly detection, topic modelling.

**Reinforcement learning**, the model learns by taking actions in an environment and receiving rewards or penalties. Examples: game-playing AI (AlphaGo, AlphaStar), robotic control, recommendation systems. RLHF (Reinforcement Learning from Human Feedback) is used to align language models with human preferences.

**Self-supervised learning**, the model creates its own labels from the data structure. This is how language models are trained: predict the next word given all previous words. Doing this on billions of documents develops rich internal representations of language and knowledge.

## What is a large language model (LLM)?

An **LLM** (Large Language Model) is the type of AI behind Claude, ChatGPT, Gemini, and similar tools. It is a neural network trained on a vast amount of text, books, websites, code, conversations, scientific papers, using self-supervised learning.

The training objective is simple: given a sequence of tokens, predict the next token. Doing this well at scale (on hundreds of billions of parameters, across trillions of tokens) requires the model to develop deep representations of language, knowledge, and reasoning.

When you send a message to Claude, the model does not "look up" the answer. It generates a response one token at a time, each token being the model's prediction of what should come next given all the preceding context.

Key LLMs and who builds them:
- **Claude**, Anthropic. [Model docs](https://docs.anthropic.com/en/docs/about-claude/models/overview)
- **GPT-4o**, OpenAI
- **Gemini**, Google DeepMind
- **Llama 3**, Meta (open weights, downloadable)
- **Mistral**, Mistral AI (European, open source)
- **Command R**, Cohere (enterprise-focused)

## Neural networks: the architecture

An LLM is built on a **neural network**, loosely inspired by the brain, practically a mathematical function. [3Blue1Brown's video series on neural networks](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi) is the clearest visual explanation.

The core components:
- **Parameters (weights)**: numerical values that the model learns during training. GPT-3 had 175 billion parameters. Parameter counts for frontier models are no longer publicly disclosed; the industry trend since 2023 has moved toward smaller, more efficient models (7B-70B range) for most applications.
- **Layers**: stacked transformations applied to the input. Each layer learns to recognise increasingly abstract patterns.
- **Attention mechanism (Transformer)**: the architectural innovation from 2017 that enabled modern LLMs. Attention lets the model consider relationships between distant parts of the input, understanding that "it" in "The cat sat on the mat. It was comfortable." refers to the cat. [More: Attention is All You Need, original paper (readable abstract)](https://arxiv.org/abs/1706.03762)

## Training vs inference

**Training** builds the model. Billions of text examples, gradient descent updating parameters over weeks on thousands of GPUs. This is enormously expensive, frontier model training costs tens to hundreds of millions of dollars.

**Inference** runs the model. Given your prompt, generate a response. This is much cheaper and is what happens every time you send a message.

Most people and applications use inference via APIs. Only a handful of labs train frontier models from scratch.

**Fine-tuning** is a middle ground: take a pre-trained model and train it further on a smaller specialised dataset. This adapts a general model for a specific domain (medical, legal, coding) at a fraction of the cost of training from scratch.

<div class="bz-diagram">
<div class="bz-diagram-label">AI lifecycle: where you fit in</div>
<div class="bz-diagram-body">
<div class="bz-arch">
<div class="bz-arch-layer">
  <span class="bz-arch-layer-label">Pre-training</span>
  <div class="bz-arch-layer-content">
    <span class="bz-arch-chip">Trillions of tokens</span>
    <span class="bz-arch-chip">Thousands of GPUs</span>
    <span class="bz-arch-chip">Weeks → months</span>
    <span class="bz-arch-chip-note">Done by AI labs (Anthropic, OpenAI, Google). Cost: $50M–$500M+</span>
  </div>
</div>
<div class="bz-arch-layer">
  <span class="bz-arch-layer-label">Fine-tuning</span>
  <div class="bz-arch-layer-content">
    <span class="bz-arch-chip">Domain-specific data</span>
    <span class="bz-arch-chip">Hours → days</span>
    <span class="bz-arch-chip-note">Done by companies adapting a base model to their use case</span>
  </div>
</div>
<div class="bz-arch-layer">
  <span class="bz-arch-layer-label">Inference</span>
  <div class="bz-arch-layer-content">
    <span class="bz-arch-chip">Your prompt</span>
    <span class="bz-arch-chip">API call</span>
    <span class="bz-arch-chip">Milliseconds</span>
    <span class="bz-arch-chip-note">What happens every time you use Claude, ChatGPT, or any LLM product</span>
  </div>
</div>
</div>
</div>
</div>

## What AI is good at

| Task | Examples |
|---|---|
| **Text generation** | Writing, summarising, translating, explaining, coding |
| **Reasoning and analysis** | Structuring problems, drafting plans, reviewing documents |
| **Code generation** | Writing, debugging, refactoring, explaining code |
| **Image understanding** | Describing images, answering questions about visual content |
| **Image generation** | DALL-E, Midjourney, Stable Diffusion, Adobe Firefly |
| **Speech recognition** | OpenAI Whisper, Google Speech-to-Text |
| **Structured output** | Extracting data from documents, classifying text |

## What AI is bad at

- **Hallucination**, confidently generating false information. Always verify factual claims.
- **Real-time knowledge**, models have a training cutoff date and do not know what happened since (without retrieval tools).
- **Precise arithmetic**, LLMs are surprisingly poor at multi-step calculation. Use a calculator via tool use.
- **Counting and spatial reasoning**, many models count tokens, not discrete objects.
- **Consistent long-form reasoning without tools**, complex multi-step reasoning degrades over many steps without scaffolding.
- **Knowing what they don't know**, models often cannot accurately report their own uncertainty.

## Context windows and RAG

The **context window** is how much text a model can consider at once. Everything outside the window is invisible to the model. For long documents, codebases, or multi-session conversations, this matters.

**RAG (Retrieval-Augmented Generation)** is the standard solution: embed and index your documents, retrieve relevant chunks at query time, and inject them into the context alongside the question. This lets a model answer questions about documents far larger than its context window, and ground answers in up-to-date sources. [More: RAG, Anthropic docs](https://docs.anthropic.com/en/docs/build-with-claude/retrieve-information-with-rag)

## AI in production vs AI as a tool

There is a difference between using an AI tool (ChatGPT, Midjourney) and **building something with AI APIs**. When you build:

1. Your code calls an AI API (Anthropic, OpenAI, Google) with a prompt
2. The model generates a response
3. Your code uses that response: displays it, extracts data from it, triggers another action based on it

This is how AI-powered products work. The AI is one component inside a larger system, alongside a database, a server, APIs, and user interface. The earlier articles in this series describe all those other components.

<figure class="bz-figure">
<img src="/img/basics/diagram-production-ai.png" alt="Production AI system diagram showing user input flowing through an application layer, to an LLM API (Claude/OpenAI), with RAG pulling from a vector database, results returned and displayed to the user">
<figcaption>A production AI system is not just an LLM. The model is one component, alongside retrieval, databases, business logic, and a user interface. Understanding the other components in this series is what lets you build and evaluate these systems.</figcaption>
</figure>

## Further reading

- [Anthropic documentation](https://docs.anthropic.com/en/docs/), Claude API reference, prompt engineering guide, model capabilities
- [But what is a neural network?, 3Blue1Brown](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi), 4-part visual series, the best introduction to how neural networks learn
- [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course), free, practical, interactive
- [fast.ai, Practical Deep Learning](https://course.fast.ai/), free course, code-first, runs real models from the start
- [Andrej Karpathy's Neural Networks: Zero to Hero](https://karpathy.ai/zero-to-hero.html), builds GPT from scratch, exceptional depth
- [The Illustrated Transformer, Jay Alammar](https://jalammar.github.io/illustrated-transformer/), visual explanation of the transformer architecture
- [AI Safety Fundamentals](https://aisafetyfundamentals.com/), free course on AI alignment and safety

## What's next

Next: [What is Vibe Coding?](/basics/what-is-vibe-coding/), how to use AI to build software without needing to code yourself.
