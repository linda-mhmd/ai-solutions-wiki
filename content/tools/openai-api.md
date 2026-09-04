---
title: "OpenAI API - GPT and Image Generation"
description: "A comprehensive reference for the OpenAI API: the GPT-5.6 (Sol/Terra/Luna) and GPT-6 Astra model lineup, current pricing, function calling, and integration patterns for enterprise AI applications."
date: 2026-03-28
categories: [Tools]
tags: [openai, GPT, API, LLM, embeddings, function-calling, gpt-6-astra, gpt-5.6]
related:
  - tools/azure-openai
  - tools/amazon-bedrock
  - tools/langchain
last_updated: 2026-09-03
---

The OpenAI API provides programmatic access to OpenAI's GPT model family, image generation, speech, and embedding models. It is the most widely used LLM API and has become the de facto standard that other providers emulate — chat-completions-style message arrays and function-calling schemas are now conventions the rest of the industry follows too. For enterprise AI projects, the OpenAI API is often the first integration point for proof-of-concept work, though production deployments may migrate to Azure OpenAI or Amazon Bedrock for compliance and enterprise support reasons.

Official documentation: https://developers.openai.com/api/docs (platform.openai.com/docs now redirects here)

## Core API Endpoints

**Chat Completions** (and the newer Responses API) — The primary endpoints for text generation. You send a list of messages (system, user, assistant roles) or a structured input, and receive a model response. This powers conversational AI, content generation, summarization, classification, and virtually every text-based AI task.

**Embeddings** - Converts text into numerical vectors for semantic search, clustering, and classification. `text-embedding-3-small` and `text-embedding-3-large` remain OpenAI's current embedding models — OpenAI has not shipped a successor since these launched, so this part of the lineup is genuinely stable. Embeddings are the foundation for RAG systems: embed your documents, store the vectors, and retrieve semantically similar content at query time.

**Images** - DALL-E 2 and DALL-E 3 were retired on 12 May 2026. `gpt-image-2` (launched 21 April 2026) is now the default image-generation and editing model in both ChatGPT and the API, with stronger instruction-following, text rendering, and output up to 2K resolution; the earlier `gpt-image-1` line is still available. Billing for image models is token-based for both the prompt and the generated image, not a flat per-image rate the way DALL-E was — check the pricing page directly for current per-resolution figures.

**Audio** - `gpt-4o-transcribe` (with a `gpt-4o-mini-transcribe` low-cost variant) is now the recommended general-purpose speech-to-text model, with lower word-error rates than the original Whisper; a `gpt-live-transcribe`/realtime-streaming variant exists for live transcription as audio arrives. The original `whisper-1` model is still available via the API and as an open-source model for self-hosting, but OpenAI now positions it as the choice only when you specifically need word-level timestamps, subtitle formats, or translation into English rather than as the general default. For text-to-speech, `gpt-4o-mini-tts` is the current recommended model, ahead of the older `tts-1`/`tts-1-hd`.

## Function Calling

Function calling enables the model to generate structured JSON that maps to functions you define. Instead of parsing free-text responses, you declare functions with typed parameters, and the model returns a function call when appropriate. This is the foundation for tool-using agents: the model decides which tool to use and provides the arguments.

Define functions in the API request, and the model either responds with text or requests a function call. Your application executes the function and returns the result to the model for further processing. This loop continues until the model has enough information to provide a final response.

Function calling is more reliable than prompt-based JSON extraction because the model is specifically trained to generate valid function call structures. It supports parallel function calls (requesting multiple tools simultaneously) and strict mode (guaranteeing JSON schema conformance).

## Structured Outputs

The `response_format` parameter constrains model output to valid JSON matching a provided schema. This eliminates the parsing failures that plague free-text extraction. For enterprise applications that feed model outputs into downstream systems, structured outputs are essential for reliability.

## Current Model Lineup

This section was badly out of date as of mid-2026 (it described GPT-4o and GPT-3.5-turbo as current); here is the lineup as of early September 2026. Context for how we got here: the GPT-5 family superseded GPT-4o and GPT-4 Turbo and folded the earlier "o-series" reasoning models (o1, o3) into unified models that reason natively rather than requiring a separate model choice.

**GPT-6 Astra** — the newest and most capable model in the API, and the first OpenAI model to cross the "Critical" cybersecurity capability threshold in OpenAI's own Preparedness Framework: during evaluation it found and chained two previously unknown zero-day vulnerabilities into a working exploit without a human directing each step. Because of that finding, Astra is not a simple drop-in default the way the GPT-5.6 tiers are. It shipped first, on 1 September 2026, through a Daybreak-gated Trusted Access program to a small set of vetted testers, then began a wider rollout from 3 September 2026 to ChatGPT Plus/Pro/Business/Enterprise plans, the API under model ID `gpt-6-astra`, AWS Bedrock, and Microsoft Azure. Its strongest cyber-capable behavior stays restricted to that gated program regardless of how broadly the base model becomes available. See this wiki's full writeup: [Astra becomes the first OpenAI model to cross the "Critical" cyber threshold](/news/openai-astra-critical-cyber-threshold/). Practically: don't assume instant self-serve API access to Astra the way you'd get with Sol, Terra, or Luna — budget for a request/eligibility step, and don't build a workflow that depends on its full capability set being generally available on a fixed date.

**GPT-5.6 — Sol / Terra / Luna** — the current self-serve, generally-available flagship family, previewed 25 June 2026 and GA 9 July 2026 (GA on Amazon Bedrock 13 July 2026). Point releases gave way to three named capability tiers, all sharing a 1.05M-token context window and full reasoning-mode support:

- **Sol** — flagship tier for the hardest reasoning, coding, and agentic work.
- **Terra** — balanced cost and capability; the reasonable default for most production traffic.
- **Luna** — cost-optimized, for high-volume/lower-complexity tasks: classification, simple extraction, routine summarization.

Release detail: [OpenAI ships GPT-5.5, then the GPT-5.6 Sol/Terra/Luna family](/news/openai-gpt-5-5-and-5-6/).

**GPT-5.5** — released 23 April 2026 with a 1M-token context window and an agentic focus; GPT-5.6 Sol effectively supersedes it as the flagship choice, but OpenAI has not announced a retirement date, so it remains a reasonable option if you're already tuned to it. GPT-5.5 Pro adds extended-compute reasoning at a premium price.

**Legacy: GPT-4o and GPT-3.5-turbo** — both were the "current" models the last time this page was accurate, and both are being wound down. GPT-4o was withdrawn from ChatGPT in February 2026; `gpt-3.5-turbo-instruct` retires from the API on 28 September 2026 and the rest of the `gpt-3.5-turbo` family follows on 23 October 2026. Do not start new work against either — migrate to whichever GPT-5.6 tier matches your cost/quality target.

## Pricing

OpenAI bills per token, input and output separately, with a discount for cached input (repeated prompt prefixes) and a "long-context" surcharge once a request's input exceeds roughly 272K tokens. Verified directly against OpenAI's own pricing documentation and cross-checked against a third-party pricing tracker on 4 September 2026:

| Model | Input | Cached input | Output | Long-context (input/cached/output) |
|---|---|---|---|---|
| GPT-6 Astra (standard) | $10.00 | $1.00 | $50.00 | $20.00 / $2.00 / $75.00 |
| GPT-6 Astra (Fast mode) | $20.00 | $2.00 | $100.00 | $40.00 / $4.00 / $150.00 |
| GPT-5.6 Sol | $4.00 | $0.40 | $20.00 | $8.00 / $0.80 / $30.00 |
| GPT-5.6 Terra | $2.00 | $0.20 | $12.00 | $4.00 / $0.40 / $18.00 |
| GPT-5.6 Luna | $0.20 | $0.02 | $1.20 | $0.40 / $0.04 / $1.80 |
| GPT-5.5 | $5.00 | $0.50 | $30.00 | $10.00 / $1.00 / $45.00 |
| GPT-5.5 Pro | $30.00 | — | $180.00 | $60.00 / — / $270.00 |
| text-embedding-3-small | $0.02 | — | — | — |
| text-embedding-3-large | $0.13 | — | — | — |

All figures are $ per 1M tokens. The long-context break point (~272K input tokens) is confirmed for the GPT-5.6 family; Astra's long-context row mirrors the same standard/long split in OpenAI's pricing docs but the exact threshold for Astra specifically wasn't independently re-verified — check the pricing page before relying on it for a cost estimate near that boundary. Image and audio models (gpt-image-1/2, Whisper, TTS, Realtime) are priced separately in different units and aren't shown above.

The Batch API remains a flat 50% discount off standard synchronous token rates for eligible models, with results delivered within 24 hours — still the right default for document processing, classification, and extraction workloads that don't need a live response. For cost optimization generally: default to Terra, drop to Luna for high-volume/low-complexity work, reserve Sol or Astra for tasks where the extra reasoning changes the outcome, and keep repeated prompt content (system prompts, few-shot examples, long shared context) stable across calls so it qualifies for cached-input pricing.

## Rate Limits and Scaling

OpenAI enforces rate limits per organization/project across several metrics — RPM (requests/minute), RPD (requests/day), TPM (tokens/minute), TPD (tokens/day), and IPM (images/minute) for image models — whichever limit a request hits first applies. Accounts move up automatically through a ladder of usage tiers (a geography-limited Free tier, then Tier 1 through Tier 5) as cumulative spend increases, with each tier raising the ceiling; there is no separate manual increase request outside of that spend-based graduation. For production workloads, implement retry logic with exponential backoff and plan capacity against your current tier's ceiling rather than assuming it scales instantly with demand.

For high-throughput batch processing, the Batch API (see Pricing above) uses a separate, larger rate-limit pool that doesn't compete with your synchronous traffic.

## Enterprise Considerations

By default, API inputs and outputs are retained for up to 30 days for abuse monitoring and then deleted, and API data is not used to train OpenAI's models unless you explicitly opt in. Enterprise and Business customers can request Zero Data Retention (ZDR) for eligible endpoints, which removes even that 30-day window. SOC 2 Type II compliance remains available. For organizations that need Azure- or AWS-native infrastructure, data-residency guarantees beyond OpenAI's own locations, or procurement through an existing cloud agreement, [Azure OpenAI](/tools/azure-openai/) and [Amazon Bedrock](/tools/amazon-bedrock/) offer the same underlying models through each cloud's enterprise compliance and billing framework — though a brand-new model like Astra typically reaches those platforms days to weeks after the direct API, so check availability before assuming parity. Always confirm current retention and training defaults against OpenAI's own enterprise-privacy documentation before committing contractually, since these terms move.

OpenAI's commercial center of gravity has shifted alongside the model lineup: CFO Sarah Friar told investors in August 2026 that enterprise revenue (~$40B annualized run rate) now exceeds ChatGPT consumer revenue for the first time, about six months ahead of OpenAI's own prior guidance — see [OpenAI's enterprise revenue overtakes consumer](/news/openai-enterprise-revenue-overtakes-consumer/). On the consumer side, free and low-cost ChatGPT tiers picked up unpersonalized advertising in the US and, from 24 August 2026, across 31 European markets; paid tiers (Plus, Pro, Business, Enterprise, Education) remain ad-free — see [ChatGPT ads reach 31 European markets](/news/chatgpt-ads-europe/). Neither change affects API terms directly, but as enterprise becomes OpenAI's primary business, it's a reasonable moment to push for stronger SLAs, longer deprecation notice periods, and version-pinning guarantees than you might previously have been offered.

## Sources

1. OpenAI, API Pricing: [https://developers.openai.com/api/docs/pricing](https://developers.openai.com/api/docs/pricing)
2. OpenAI, API Models reference: [https://developers.openai.com/api/docs/models](https://developers.openai.com/api/docs/models)
3. OpenAI, Rate limits guide: [https://developers.openai.com/api/docs/guides/rate-limits](https://developers.openai.com/api/docs/guides/rate-limits)
4. OpenAI Cookbook: [https://cookbook.openai.com/](https://cookbook.openai.com/)
5. OpenAI Developer Community, "Introducing gpt-image-2 — available today in the API and Codex": [https://community.openai.com/t/introducing-gpt-image-2-available-today-in-the-api-and-codex/1379479](https://community.openai.com/t/introducing-gpt-image-2-available-today-in-the-api-and-codex/1379479)
6. Artificial Analysis, GPT-6 Astra pricing/benchmarks: [https://artificialanalysis.ai/models/gpt-6-astra](https://artificialanalysis.ai/models/gpt-6-astra)
7. Artificial Analysis, GPT-5.6 Sol pricing/benchmarks: [https://artificialanalysis.ai/models/gpt-5-6-sol](https://artificialanalysis.ai/models/gpt-5-6-sol)
8. CloudZero, "OpenAI API pricing in 2026: every model after the July price cuts": [https://www.cloudzero.com/blog/openai-pricing/](https://www.cloudzero.com/blog/openai-pricing/)
9. VentureBeat, "OpenAI is ending API access to fan-favorite GPT-4o model in February 2026": [https://venturebeat.com/ai/openai-is-ending-api-access-to-fan-favorite-gpt-4o-model-in-february-2026](https://venturebeat.com/ai/openai-is-ending-api-access-to-fan-favorite-gpt-4o-model-in-february-2026)
10. Codersera, "GPT-3.5 Turbo Shutdown (Oct 2026): Dates & What to Use Instead": [https://codersera.com/blog/gpt-3-5-turbo-shutdown-2026-what-to-use-instead/](https://codersera.com/blog/gpt-3-5-turbo-shutdown-2026-what-to-use-instead/)
11. Captain Compliance, "OpenAI Pledges No User Data Retention — What It Means for Enterprise Privacy Compliance": [https://captaincompliance.com/news/openai-pledges-no-user-data-retention-what-it-means-for-enterprise-privacy-compliance/](https://captaincompliance.com/news/openai-pledges-no-user-data-retention-what-it-means-for-enterprise-privacy-compliance/)
12. This wiki, "Astra becomes the first OpenAI model to cross the 'Critical' cyber threshold": [/news/openai-astra-critical-cyber-threshold/](/news/openai-astra-critical-cyber-threshold/)
13. This wiki, "OpenAI ships GPT-5.5, then the GPT-5.6 Sol/Terra/Luna family": [/news/openai-gpt-5-5-and-5-6/](/news/openai-gpt-5-5-and-5-6/)
14. This wiki, "OpenAI's enterprise revenue overtakes consumer, six months early": [/news/openai-enterprise-revenue-overtakes-consumer/](/news/openai-enterprise-revenue-overtakes-consumer/)
15. This wiki, "ChatGPT ads reach 31 European markets": [/news/chatgpt-ads-europe/](/news/chatgpt-ads-europe/)
16. OpenAI, Speech-to-text guide (transcription model lineup): [https://developers.openai.com/api/docs/guides/speech-to-text](https://developers.openai.com/api/docs/guides/speech-to-text)
17. OpenAI, Text-to-speech guide: [https://developers.openai.com/api/docs/guides/text-to-speech](https://developers.openai.com/api/docs/guides/text-to-speech)
