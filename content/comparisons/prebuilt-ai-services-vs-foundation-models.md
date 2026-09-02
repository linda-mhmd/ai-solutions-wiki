---
title: "Pre-Built AI Services vs Foundation Models - When a Narrow API Beats an LLM"
description: "Task-specific AI APIs for OCR, transcription, and vision versus sending the same job to a general foundation model. Accuracy on constrained input, cost per unit, latency, structured output, and the generic-object limitation that decides most cases."
date: 2026-09-02
last_verified: 2026-09-02
categories: [Comparisons]
tags: ["ai-ml", "intermediate", "comparison", "ai-services", "foundation-models", "ocr", "computer-vision", "cost"]
tools: [amazon-textract, amazon-rekognition, amazon-transcribe, amazon-bedrock]
last_updated: 2026-09-02
lastmod: 2026-09-02
---

There is a decision that comes up in almost every applied AI project and gets surprisingly little written about it: you need to read text off a document, transcribe an audio file, or detect objects in an image. Do you call a **task-specific AI service** built for exactly that, or do you send it to a **general foundation model** that can also do it?

The reflex in 2026 is to reach for the foundation model, because one API covers everything. That is often right and frequently expensive. The distinction that decides it is not capability — modern multimodal models are genuinely good at these tasks — but **how constrained your input is and how much volume you have**.

## What each one is

**Pre-built AI services** are narrow, pre-trained models exposed as an API for a single task: document text extraction, speech-to-text, object detection, language detection, translation. You send input, you get structured output. There is no prompt, no model choice, and no ML expertise required. Examples include Amazon Textract, Transcribe, Rekognition and Comprehend, and their Azure and Google equivalents.

**Foundation models** are large general-purpose models — typically multimodal — accessed through a platform like [Amazon Bedrock](/tools/amazon-bedrock/). One endpoint handles text, images, and often audio, steered entirely by the prompt. See [foundation models](/glossary/foundation-models/).

## The comparison

| | Pre-built AI service | Foundation model |
|---|---|---|
| **Setup** | Call the API | Call the API, write and maintain a prompt |
| **Output** | Structured by contract (JSON schema, confidence scores, bounding boxes) | Free text unless constrained; needs [structured output](/glossary/structured-output/) enforcement |
| **Determinism** | High — same input, same output | Variable; needs temperature control and still drifts across model versions |
| **Cost basis** | Per page, per minute, per image | Per token, input and output |
| **Latency** | Low and predictable | Higher and variable with output length |
| **Flexibility** | None outside the trained task | Arbitrary — reasoning, summarising, and extraction in one call |
| **Custom concepts** | Only via a custom-training variant, where offered | Describe it in the prompt |
| **Failure mode** | Low confidence score you can threshold on | A fluent, plausible, wrong answer |

## The generic-object limitation

The constraint most often discovered late: **a pre-built vision or document service only recognises what it was trained on**. Generic object detection identifies cars, people, and furniture. It will not identify your company's specific components, a domain-specific form layout, or an industry-specific defect — those are not in the label set, and no prompt exists to add them.

This is the cleanest decision rule available:

- **Your target is generic** → the pre-built service is almost certainly cheaper, faster, and more accurate.
- **Your target is domain-specific** → either use a foundation model, which can be told what to look for in words, or [fine-tune a custom model](/comparisons/custom-ml-vs-foundation-models/).

## The accuracy trade is not one-directional

A common assumption is that the bigger model is more accurate. On constrained tasks the opposite is often true. A dedicated OCR service trained on millions of documents typically beats a general model at reading a dense, low-quality scan, and it returns confidence scores and coordinates that a general model does not natively provide. Bounding boxes and per-field confidence are what let you build a [human-in-the-loop](/glossary/human-in-the-loop/) review queue that routes only uncertain items to a person.

Conversely, the general model wins whenever the task requires **understanding rather than extraction**: reading a document *and* deciding whether it satisfies a policy, transcribing audio *and* summarising the decisions in it. A pre-built service returns facts; a foundation model returns judgement — with the corresponding risk that the judgement is confidently wrong.

## Cost behaves differently, not just differently priced

The two price on different units, which makes intuition unreliable at volume. Document processing is billed per page; a foundation model is billed per token, and a dense page can consume thousands of input tokens before it produces any output. At single-digit volumes the difference is noise. At hundreds of thousands of pages per month it is often an order of magnitude, and it goes in the pre-built service's favour.

Do the arithmetic on your actual volume rather than reasoning from per-unit prices, and re-do it when volume changes by 10x. See [LLM cost optimization](/guides/llm-cost-optimization/) and [AI total cost of ownership](/guides/ai-total-cost-ownership/).

## Decision framework

**Use a pre-built AI service when:**
- The task is exactly what the service does, on generic subject matter
- Volume is high and unit cost dominates
- You need structured output, confidence scores, or coordinates
- Latency is user-facing and must be predictable
- You want a stable contract that does not change when a model is updated

**Use a foundation model when:**
- The task requires reasoning, not just extraction
- Your target concepts are domain-specific and describable in words
- Volume is low, or the workload is exploratory and still changing
- You want one integration instead of five
- The output feeds a conversation or a generated artefact rather than a database column

**Use both.** This is the answer in most production systems, and it is worth designing for deliberately. Extract with the specialised service, reason over the result with the foundation model. A document pipeline that runs OCR with a purpose-built service and then passes clean, structured text to a foundation model for classification and summarisation is cheaper, more accurate, and easier to evaluate than either approach alone — because each stage does what it is good at, and each stage can be tested separately.

## Further reading

- [Custom ML models vs foundation models](/comparisons/custom-ml-vs-foundation-models/): the other axis, when neither pre-built option fits.
- [AI deployment models](/guides/deployment-models-ai/): where each of these sits on the managed-to-self-managed spectrum.
- [Document extraction](/glossary/document-extraction/): the task itself in more detail.
- [AI for document workflows](/guides/ai-for-document-workflows/): the end-to-end pipeline.
- [Structured output](/glossary/structured-output/): making a foundation model return parseable results.
- [LLM cost optimization](/guides/llm-cost-optimization/): the arithmetic at volume.

## Sources

1. Amazon Web Services. "Amazon Textract — document text and data extraction." [https://aws.amazon.com/textract/](https://aws.amazon.com/textract/)
2. Amazon Web Services. "Amazon Rekognition — image and video analysis." [https://aws.amazon.com/rekognition/](https://aws.amazon.com/rekognition/)
3. Amazon Web Services. "Amazon Transcribe — automatic speech recognition." [https://aws.amazon.com/transcribe/](https://aws.amazon.com/transcribe/)
4. Amazon Web Services. "Amazon Bedrock pricing." [https://aws.amazon.com/bedrock/pricing/](https://aws.amazon.com/bedrock/pricing/)
5. Microsoft. "Azure AI Document Intelligence." [https://azure.microsoft.com/en-us/products/ai-services/ai-document-intelligence](https://azure.microsoft.com/en-us/products/ai-services/ai-document-intelligence)
6. Google Cloud. "Document AI." [https://cloud.google.com/document-ai](https://cloud.google.com/document-ai)
