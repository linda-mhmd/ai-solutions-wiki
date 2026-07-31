---
title: "Claude 3 Launch: March 4, 2024"
description: "On March 4, 2024, Anthropic announced the Claude 3 model family: Haiku, Sonnet, and Opus. Opus became the first model to claim benchmark parity with GPT-4 across most major evaluations."
date: 2024-03-04
lastmod: 2026-07-30
last_updated: 2026-07-30
categories: [History]
tags: [anthropic, claude, llm, ai-history, milestones]
related:
  - history/gpt-4-launch-march-2023
  - history/gemini-1-5-pro-launch-february-2024
  - news/claude-opus-4-8
  - news/anthropic-series-h
  - comparisons/openai-vs-anthropic
---

On March 4, 2024, Anthropic announced the Claude 3 model family. The family included three models in ascending order of capability: Claude 3 Haiku, Claude 3 Sonnet, and Claude 3 Opus. Anthropic claimed that Opus outperformed GPT-4 and Gemini 1.0 Ultra on most common evaluation benchmarks, marking the first time a competitor claimed benchmark parity with OpenAI's flagship model.

## The model family

Claude 3 introduced a tiered structure that became industry standard:

**Claude 3 Opus** — The most capable model, priced at $15 per million input tokens and $75 per million output tokens. Anthropic positioned it for "task automation, R&D, and strategy" work requiring complex reasoning.

**Claude 3 Sonnet** — The balanced mid-tier model, priced at $3 per million input tokens and $15 per million output tokens. Designed for "data processing, sales, and time-saving tasks" at scale.

**Claude 3 Haiku** — The fastest and most affordable model, priced at $0.25 per million input tokens and $1.25 per million output tokens. Built for "customer interactions, content moderation, and cost-saving tasks" requiring near-instant responses.

All three models launched with a 200,000-token context window, with Anthropic noting they could accept inputs exceeding one million tokens for select customers.

## Benchmark performance

Anthropic published benchmark comparisons showing Opus outperforming GPT-4 and Gemini 1.0 Ultra:

- **MMLU (undergraduate-level knowledge)**: Opus scored 86.8%, compared to GPT-4's 86.4%
- **GPQA (graduate-level reasoning)**: Opus scored 50.4%, compared to GPT-4's 35.7%
- **GSM8K (grade-school math)**: Opus scored 95.0%, matching GPT-4
- **MATH (competition-level math)**: Opus scored 60.1%, compared to GPT-4's 52.9%
- **HumanEval (coding)**: Opus scored 84.9%, compared to GPT-4's 67.0%

These numbers established a new competitive dynamic. For the first time since GPT-4's launch, a non-OpenAI model could credibly claim to be the most capable general-purpose LLM available.

## Key capabilities

**Vision**: All Claude 3 models could process images, including photos, charts, graphs, and technical diagrams. Anthropic noted that some enterprise customers had up to 50% of their knowledge bases encoded in visual formats like PDFs and presentation slides.

**Reduced refusals**: Previous Claude models often refused requests unnecessarily. Anthropic reported that Claude 3 showed "a more nuanced understanding of requests, recognize real harm, and refuse to answer harmless prompts much less often."

**Improved accuracy**: On complex factual questions, Opus demonstrated "a twofold improvement in accuracy" compared to Claude 2.1, with reduced hallucination rates. Anthropic announced plans to enable citations so models could "point to precise sentences in reference material to verify their answers."

**Long context recall**: Claude 3 achieved over 99% accuracy on the Needle in a Haystack evaluation across its full context window. Anthropic noted that in some cases, Opus "even identified the limitations of the evaluation itself by recognizing that the 'needle' sentence appeared to be artificially inserted."

## Safety approach

Anthropic positioned Claude 3 as maintaining its safety focus while expanding capabilities:

- Dedicated teams tracked risks including misinformation, CSAM, biological misuse, election interference, and autonomous replication.
- Constitutional AI methods continued to guide training.
- Red team evaluations concluded the models presented "negligible potential for catastrophic risk" and remained at AI Safety Level 2 (ASL-2) under Anthropic's Responsible Scaling Policy.
- Bias evaluations using the BBQ benchmark showed reduced biases compared to previous Claude models.

## Availability

Opus and Sonnet launched immediately via the Claude API (now generally available in 159 countries) and claude.ai. Haiku followed shortly after. Sonnet powered the free tier on claude.ai, with Opus available to Claude Pro subscribers.

Sonnet also launched on Amazon Bedrock and in private preview on Google Cloud's Vertex AI Model Garden, with Opus and Haiku following on both platforms.

## Market impact

Claude 3 changed the competitive landscape:

- **First credible GPT-4 challenger**: Enterprise customers now had a second option for frontier model deployments.
- **Tiered pricing became standard**: The Opus/Sonnet/Haiku structure influenced how other labs positioned their model families.
- **Context length competition**: The 200K standard window (with 1M available) pushed competitors to expand their own context capabilities.
- **Multi-cloud distribution**: Availability on AWS and GCP alongside Anthropic's own API became expected for frontier models.

## Why it still matters

Claude 3 established several patterns:

1. **Model families over single models**: Offering capability tiers at different price points became the standard approach.

2. **Benchmark competition intensified**: Labs began publishing detailed comparative benchmarks with each release.

3. **Vision as table stakes**: Multimodal input stopped being a differentiator and became expected.

4. **Safety framing**: Publishing red-team results and responsible scaling assessments became routine.

For builders, Claude 3 proved that the frontier model market was no longer a monopoly. The ability to switch between providers, or use different providers for different tasks based on cost-capability tradeoffs, became practical.

## Sources

- Anthropic, "Introducing the next generation of Claude" (March 4, 2024): https://www.anthropic.com/news/claude-3-family
- Google Cloud Blog, "Announcing Anthropic's Claude 3 models on Google Cloud Vertex AI" (March 2024): https://cloud.google.com/blog/products/ai-machine-learning/announcing-anthropics-claude-3-models-in-google-cloud-vertex-ai
- CIO Dive, "Anthropic rolls out Claude 3, says it outperforms generative AI rivals" (March 2024): https://www.ciodive.com/news/anthropic-claude-3-opus-sonnet-haiku/709233/

## Further reading

- [GPT-4 launch](/history/gpt-4-launch-march-2023/): the model Claude 3 challenged.
- [Gemini 1.5 Pro launch](/history/gemini-1-5-pro-launch-february-2024/): Google's competitive response.
- [Claude Opus 4.8](/news/claude-opus-4-8/): where Claude is now.
- [OpenAI vs Anthropic](/comparisons/openai-vs-anthropic/): how the labs compare today.
