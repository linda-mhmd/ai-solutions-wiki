---
title: "What is Generative AI?"
description: "Generative AI is software that creates new content: text, images, audio, video, and code. Plain-English explanation of how it works, why it matters, and what it cannot do."
date: 2026-06-22
level: 0
categories: [Basics]
tags: ["beginner", "generative-ai", "llm", "image-generation", "ai-basics"]
youtube_id: "G2fqAlgmoPo"
youtube_title: "Generative AI in a Nutshell - how to survive and thrive in the age of AI"
youtube_channel: "Henrik Kniberg"
docs: "https://ai.google/discover/generativeai"
docs_label: "Google AI: Generative AI overview"
faqs:
  - question: "What is the difference between AI and generative AI?"
    answer: "AI (artificial intelligence) is the broad category: any software that performs tasks usually requiring human intelligence, like recognising images or recommending products. Generative AI is a specific type of AI that produces new content. A spam filter is AI but not generative. ChatGPT, Midjourney, and GitHub Copilot are generative AI: they create text, images, and code that did not exist before."
  - question: "How does generative AI actually work?"
    answer: "Generative AI models are trained on enormous datasets: text from the internet for language models, images for image generators. During training, the model learns statistical patterns at a very deep level, like how words relate to each other, how image features cluster, and which concepts tend to appear together. When you give it a prompt, it uses those patterns to generate a plausible continuation or transformation. It is not searching a database or copying content. It is producing new output from learned patterns."
  - question: "Is generative AI the same as ChatGPT?"
    answer: "ChatGPT is one product built on generative AI (specifically a large language model from OpenAI). Generative AI is the technology category. Other generative AI products include: Claude (Anthropic), Gemini (Google), Midjourney and DALL-E 3 (image generation), GitHub Copilot (code), Sora and RunwayML (video), ElevenLabs (voice). ChatGPT is to generative AI what iPhone is to smartphones: a specific popular product, not the category itself."
  - question: "Can generative AI be wrong?"
    answer: "Yes, frequently. Language models generate text by predicting what comes next based on training patterns, with no built-in fact-checking mechanism. They can produce confident, fluent, incorrect statements, a problem called hallucination. They can also reflect biases in their training data. Always verify factual claims from AI tools, especially for legal, medical, or financial decisions."
  - question: "Is generative AI going to replace jobs?"
    answer: "Generative AI automates specific tasks within jobs, not jobs wholesale. Writing a first draft, summarising documents, generating images, and writing boilerplate code are all tasks that AI accelerates. But editing for accuracy, making judgment calls, managing client relationships, and taking responsibility for outcomes still require humans. Most evidence from 2024-2026 shows AI augmenting skilled workers rather than replacing them, while significantly reducing demand for some entry-level task-based roles."
---

{{< quickanswer >}}
Generative AI is software that creates new content: text, images, audio, video, code, and more. It works by learning patterns from enormous training datasets, then using those patterns to produce original output in response to a prompt. ChatGPT, Claude, Midjourney, and GitHub Copilot are all generative AI. It is different from traditional AI, which classifies or predicts rather than creates.
{{< /quickanswer >}}

<figure class="bz-figure">
  <img src="/img/rapid-ai/plasma-sphere-purple-green-notext.png" alt="Glass sphere containing swirling purple and green plasma energy, suspended in dark space: a generative AI model contains compressed patterns from vast training data, releasing new content on demand." loading="lazy">
  <figcaption>A generative AI model is like a sphere that has absorbed vast amounts of human-created content during training: when you prompt it, it releases that compressed knowledge as new, original output.</figcaption>
</figure>

## Traditional AI vs generative AI

Traditional AI software classifies, predicts, or detects. It answers yes-or-no or multiple-choice questions:

- Is this email spam? (yes or no)
- Which product will this customer buy next? (pick one from a list)
- Does this X-ray show a tumour? (probability score)

Generative AI produces open-ended new content:

- Write a business proposal for a fintech startup in Vienna
- Create a photorealistic image of a mountain landscape at sunset
- Refactor this Python function to use async/await

The shift is significant. Previous AI required you to define the output categories in advance. Generative AI accepts almost any instruction and creates something new.

## The four main types of generative AI

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Text (LLMs)</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">ChatGPT</span>
      <span class="bz-arch-chip">Claude</span>
      <span class="bz-arch-chip">Gemini</span>
      <span class="bz-arch-chip">Mistral</span>
      <span class="bz-arch-chip-note">Generate text, summarise documents, write code, answer questions</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Images</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Midjourney</span>
      <span class="bz-arch-chip">DALL-E 3</span>
      <span class="bz-arch-chip">Stable Diffusion</span>
      <span class="bz-arch-chip">Flux</span>
      <span class="bz-arch-chip-note">Generate images from text descriptions, edit photos, create product visuals</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Audio and voice</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">ElevenLabs</span>
      <span class="bz-arch-chip">Suno (music)</span>
      <span class="bz-arch-chip">OpenAI TTS</span>
      <span class="bz-arch-chip-note">Convert text to natural speech, clone voices, generate music</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Video and code</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Sora (OpenAI)</span>
      <span class="bz-arch-chip">GitHub Copilot</span>
      <span class="bz-arch-chip">Lovable</span>
      <span class="bz-arch-chip">Cursor</span>
      <span class="bz-arch-chip-note">Generate video from text, write and complete code automatically</span>
    </div>
  </div>
</div>

## How it works: the pattern compression idea

Training a generative AI model works like this:

1. **Collect training data**: For a language model, this is text from the internet, books, and other sources. Hundreds of billions of words.
2. **Train the model**: The model processes this data repeatedly and adjusts its internal parameters (billions of numbers called weights) until it can accurately predict patterns in the data. This takes weeks on thousands of specialised chips.
3. **Compress the patterns**: The result is a model that has encoded the statistical relationships in the training data into its weights. It does not store the original text. It has absorbed the patterns.
4. **Generate**: When you give it a prompt, the model uses these patterns to generate the most likely continuation, word by word (for text) or pixel by pixel (for images).

A useful analogy: imagine someone who has read every book ever written. They have not memorised the books, but they have deeply absorbed how language works, how arguments are structured, and what tends to follow what. When you ask them to write something, they produce new text informed by all of that absorbed knowledge.

## What generative AI is not

**It is not a search engine.** It does not retrieve existing content from the internet. A language model generates responses from its training data, which has a cut-off date. It may have no knowledge of events after that date.

**It is not always right.** It generates plausible output, not verified facts. It can confidently state incorrect information.

**It is not conscious.** It has no understanding, intentions, or feelings. It processes inputs and generates outputs according to learned patterns.

**It is not magic.** The output quality depends directly on the quality and specificity of the prompt you provide.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Training</span>
    <span class="bz-flow-step-name">Data collection</span>
    <span class="bz-flow-step-desc">Billions of examples: text, images, code, audio. The model sees this data once or multiple times.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Training</span>
    <span class="bz-flow-step-name">Pattern learning</span>
    <span class="bz-flow-step-desc">The model adjusts billions of internal parameters to minimise prediction errors on the training data.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Deployment</span>
    <span class="bz-flow-step-name">Prompt input</span>
    <span class="bz-flow-step-desc">A user provides a prompt: a text description, an image, a partial piece of code, or a question.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Deployment</span>
    <span class="bz-flow-step-name">Content generation</span>
    <span class="bz-flow-step-desc">The model generates new content one token (word fragment) at a time, using learned patterns to determine what comes next.</span>
  </div>
</div>

## The business significance

Generative AI matters for businesses because it automates creative and analytical work at a scale and speed that was previously impossible:

- **Writing**: First drafts of reports, proposals, emails, and marketing copy in seconds
- **Code**: Junior-level coding tasks completed by AI in minutes instead of hours
- **Images**: Product photos, marketing visuals, and illustrations generated without a designer
- **Summarisation**: 100-page documents reduced to a structured brief in under a minute
- **Translation and localisation**: Content adapted for new markets instantly

The economic case is strongest for high-volume, repeatable tasks where speed and cost matter more than perfect originality.

## What's next

- [What is a Large Language Model?](/basics/what-is-an-llm/): The specific type of generative AI behind ChatGPT, Claude, and Gemini
- [What is an AI Agent?](/basics/what-is-an-ai-agent/): When generative AI goes beyond answering questions and starts taking actions
- [What is AI Hallucination?](/basics/what-is-ai-hallucination/): Why generative AI makes things up and how to reduce it
- [What is Machine Learning?](/basics/what-is-machine-learning/): The foundational technique that powers generative AI

## Further reading

- [What is AI?](/basics/what-is-ai/): Broader introduction to the full spectrum of artificial intelligence
- [LLM Landscape 2026](/comparisons/llm-landscape-2026/): Comparison of all major generative AI models
- [Prompt Engineering Best Practices](/guides/prompt-engineering-enterprise/): How to get better results from generative AI tools
