---
title: "What is AI Hallucination?"
description: "AI hallucination is when a language model produces confident, fluent, factually wrong output. Why it happens, how to detect it, and how to reduce it."
date: 2026-06-22
level: 1
categories: [Basics]
tags: ["beginner", "hallucination", "llm", "reliability", "rag", "ai-basics"]
docs: "https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations"
docs_label: "Anthropic: Reducing Hallucinations"
faqs:
  - question: "Why do AI models hallucinate?"
    answer: "Language models generate text by predicting the most likely next token given everything before it. They have no internal fact-checking mechanism and no way to distinguish between 'I know this' and 'I am guessing based on patterns'. When asked about something at the edge of their training data or outside it entirely, they continue generating plausible text, because that is all they can do. The result is confident, fluent, wrong output."
  - question: "How common is hallucination in practice?"
    answer: "It depends heavily on the task and model. For well-documented topics within the model's training data, modern frontier models (GPT-4o, Claude) hallucinate infrequently. For specific facts (citation details, statistics, URLs, names of people), even the best models hallucinate several percent of the time. For knowledge after the training cutoff date, hallucination rate climbs sharply. For tasks where the model can show its reasoning (code, maths), you can verify correctness independently."
  - question: "Can I trust AI output for legal or medical decisions?"
    answer: "Not without expert verification. AI hallucination rates are too high for any decision where being wrong has serious consequences. The correct workflow for high-stakes use cases: use AI to draft, analyse, or summarise, then have a qualified human expert verify every factual claim before acting on it. AI-generated legal contracts, medical advice, and financial recommendations all require human review."
  - question: "Does retrieval-augmented generation (RAG) eliminate hallucination?"
    answer: "RAG significantly reduces hallucination by giving the model verified source documents to draw from instead of relying on training data alone. But RAG does not eliminate hallucination. The model can still misread a source document, generate text that is not grounded in the retrieved content, or hallucinate about aspects of the question that are not covered in the retrieved documents. RAG is the best available mitigation, not a complete solution."
  - question: "What is the difference between hallucination and bias?"
    answer: "Hallucination is factual incorrectness: the model states something false. Bias is systematic skewing of outputs in a particular direction based on patterns in the training data: underrepresenting certain groups, over-representing certain viewpoints. Both are failure modes from the same source (training data patterns) but manifest differently. A model can produce biased output that is factually true, or unbiased output that is factually wrong."
---

{{< quickanswer >}}
AI hallucination is when a language model produces confident, fluent, factually wrong output. The model is not lying or guessing randomly: it is doing exactly what it was designed to do (predict the most likely next word) but with no internal mechanism to flag when the answer is wrong. Hallucination happens with every major LLM and is one of the primary reasons to always verify AI-generated facts before acting on them.
{{< /quickanswer >}}

<figure class="bz-figure">
  <img src="/img/dark-cherry/vortex-complexity.png" alt="Dark spiraling vortex with a glowing red core: the model's internal patterns spiral into confident but incorrect outputs when knowledge runs thin." loading="lazy">
  <figcaption>When a language model encounters a question at the edge of its training data, it continues generating with the same confidence as always: the spiral of plausible-sounding text has no internal brake.</figcaption>
</figure>

## Why the word "hallucination"

The term is borrowed from psychology. A hallucination is a perception that feels real to the person experiencing it but has no basis in external reality. An AI hallucination is text that reads as confident and authoritative but has no basis in fact.

A hallucinating model says "The CEO of Siemens Austria is [name]" with the same tone and confidence it uses to say "Vienna is the capital of Austria". There is no signal in the output to indicate which statement it is sure about and which it invented.

## A real hallucination example

**Prompt**: "Who won the Best Director Oscar for a film set in Vienna in 2022?"

**Hallucinated response** (paraphrased): "The 2022 Academy Award for Best Director went to [Director Name] for their film [Film Title], a critically acclaimed drama set in Vienna during the 1970s."

This might sound plausible, include a plausible director name, a plausible film title, and a plausible plot description. Every specific factual claim can be completely fabricated. The model has generated a convincing answer to a question it did not actually know the answer to.

## Where hallucination is most common

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">High risk</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Specific statistics and numbers</span>
      <span class="bz-arch-chip">Citations and references</span>
      <span class="bz-arch-chip">URLs and links</span>
      <span class="bz-arch-chip">People and their roles</span>
      <span class="bz-arch-chip">Events after training cutoff</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Medium risk</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Legal and regulatory details</span>
      <span class="bz-arch-chip">Medical dosages and procedures</span>
      <span class="bz-arch-chip">Product specifications</span>
      <span class="bz-arch-chip">Niche or regional facts</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Lower risk</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Well-documented historical facts</span>
      <span class="bz-arch-chip">Code (can be tested and run)</span>
      <span class="bz-arch-chip">Language tasks (summarising text you provide)</span>
      <span class="bz-arch-chip">Structured reasoning from given premises</span>
    </div>
  </div>
</div>

## How to reduce hallucination

### Technique 1: Ground the model in source documents

Instead of asking the model to recall facts from training, give it the facts in the prompt:

```
Context: [paste the actual document, policy, or data]

Question: Based only on the context above, what is the deadline 
for filing under the EU AI Act Article 53?

If the answer is not in the context, say "I cannot find this 
information in the provided document."
```

This is the core of Retrieval-Augmented Generation (RAG): retrieve the relevant documents first, then have the model answer from those documents. The model's job becomes reading comprehension, not memory recall.

### Technique 2: Ask the model to cite its sources

```
Answer the question and for each factual claim, indicate 
which sentence in the provided document you are drawing from, 
using [sentence X] notation.
```

Models that must cite their sources hallucinate less because citation forces the model to stay anchored to retrieved content.

### Technique 3: Ask for confidence or uncertainty

```
Answer the following question. At the end of your response, 
rate your confidence on a scale of 1-10 and explain what you 
are uncertain about.
```

Current models can estimate their own uncertainty reasonably well. A confidence score of 4/10 is a signal to verify independently.

### Technique 4: Verify with code execution

For questions involving numbers, dates, and calculations, have the model write code that produces the answer rather than generating the number directly:

```python
# Instead of asking "what is 15% of 847,320?"
# Ask the model to write this:
result = 847_320 * 0.15
print(f"15% of 847,320 is {result}")  # 127,098.0
```

Code is deterministic. A hallucinated number in code fails when you run it.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">1</span>
    <span class="bz-flow-step-name">Retrieve source documents</span>
    <span class="bz-flow-step-desc">Use a vector database or keyword search to find documents relevant to the question. Do not rely on the model's training data memory for factual claims.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">2</span>
    <span class="bz-flow-step-name">Inject documents into prompt</span>
    <span class="bz-flow-step-desc">Paste retrieved content into the system prompt or user message. Instruct the model to answer from the provided context only.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">3</span>
    <span class="bz-flow-step-name">Generate grounded response</span>
    <span class="bz-flow-step-desc">The model reads and summarises from your documents. Hallucination rate drops dramatically when the model is reading rather than recalling.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">4</span>
    <span class="bz-flow-step-name">Spot-check high-stakes claims</span>
    <span class="bz-flow-step-desc">For any output used in legal, medical, financial, or public-facing contexts, have a human verify specific factual claims against the original sources.</span>
  </div>
</div>

## Why you cannot fully eliminate hallucination

Models do not know what they do not know. There is no reliable internal signal that says "this is beyond my knowledge". Research into calibration (making models better at knowing when they are uncertain) is active, but no current model eliminates hallucination.

This is why AI tools should augment human judgment in high-stakes contexts, not replace it.

## What's next

- [Building RAG Systems](/guides/building-rag-systems/): Systematic approach to grounding LLMs in your own knowledge base
- [Prompt Engineering Best Practices](/guides/prompt-engineering-enterprise/): How prompt design affects hallucination rates
- [What is an LLM?](/basics/what-is-an-llm/): Why LLMs work the way they do, and why this leads to hallucination

## Further reading

- [Anthropic: Reducing Hallucinations](https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations): Practical techniques with Claude
- [Hallucination in LLMs: a survey](https://arxiv.org/abs/2309.01219): Academic overview of the hallucination problem and mitigation strategies
- [TruLens](https://www.trulens.org): Open-source framework for evaluating LLM output quality including hallucination detection
