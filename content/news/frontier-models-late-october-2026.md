---
title: "Gemini 4 Carbon, GPT-6.1 Terra, Kimi K3.1 Pro: Three Models in Six Days, Two Leaderboards Reset"
description: "Between 23 and 28 October 2026 Moonshot released Kimi K3.1 Pro, OpenAI released GPT-6.1 Terra, and Google announced Gemini 4 Carbon for cyber defenders only. Artificial Analysis moved to Intelligence Index v5.0 and Vals to Index v2.2. Prices, access and what the rankings do and do not show."
date: 2026-10-28
lastmod: 2026-10-28
last_updated: 2026-10-28
last_verified: 2026-10-28
categories: [News]
tags: [model-release, gemini, openai, moonshot, kimi, benchmarks, leaderboards, pricing, open-weight-models]
related:
  - comparisons/llm-landscape-2026
  - tools/google-gemini
  - tools/openai-api
  - news/gemini-4-argon
  - news/open-weight-models-october-2026
  - guides/how-ai-models-are-evaluated
---

Three new models arrived in six days at the end of October 2026, one from each of three different kinds of lab: an open-weight Chinese lab, OpenAI's mid-tier and Google's new frontier model. In the same week both of the independent leaderboards the wiki cites changed their methods, so October's scores and November's should not be compared side by side.

| Model | Lab | Date | Access | Price per 1M tokens (input / output) |
|---|---|---|---|---|
| **Kimi K3.1 Pro** | Moonshot AI | 23 October | Kimi apps and API; weights promised "by Nov 4" | $2.00 / $10.00 (cached input $0.20) |
| **GPT-6.1 Terra** | OpenAI | 26 October | API (`gpt-6.1-terra`); ChatGPT Plus, Pro, Enterprise, Edu | $1.00 / $5.00 (cached input $0.05) |
| **Gemini 4 Carbon** | Google | 28 October | "a subset of cyber defenders" first; no public model ID | $2 / $10 introductory, then $4 / $20 |

## What happened

### Gemini 4 Carbon: announced, not yet available

Google's post of **28 October** introduces "Gemini 4 Carbon, our strongest model with state-of-the-art cybersecurity and long horizon capabilities", "Building on Gemini 4 Argon, which was launched two weeks ago". It follows the same route as [Argon](/news/gemini-4-argon/): "Starting this week", access goes to "a subset of cyber defenders", then gradually to trusted partners through Google's Fairwind Program, and only after that to developers, businesses and consumers, with no date. There is no Carbon model ID in the Gemini API documentation or changelog as of 28 October. Google says it is "actively engaged in the U.S. government's voluntary process for pre-release model testing".

**Price.** Google states "$2 per million input tokens and $10 per million output tokens", the same introductory price as Argon, with cached input at 95 percent off. A footnote says that "After the introductory period expires, the price of $4 per 1M input tokens and $20 per 1M output tokens will apply." Google does not say when Carbon's introductory period ends. (Argon's ends on 30 November; do not assume Carbon's is the same.)

**Not published by Google:** context window, knowledge cutoff, modalities, size and whether it is a reasoning model. Trackers list a 1M context; that is their figure, not Google's.

**Google's own claims, not reproduced:** #1 on Artificial Analysis Intelligence Index v5.0 at 59; 88.2 percent on SEC-bench Pro, 54.8 percent on ExploitGym and 71.0 percent on Collinear's CWE-bench, all "evaluated without guardrails"; and 0.0 percent attack success on Gray Swan's indirect prompt injection benchmark, against 0.7 percent for Argon.

### GPT-6.1 Terra: OpenAI's new mid-tier

OpenAI's API changelog for **26 October**: "Released GPT-6.1 Terra, a fast, efficient model for visual reasoning, precise computer use, and clear, natural writing." OpenAI said on X that it is "available to all Plus, Pro, Enterprise, and Edu users in ChatGPT Work and Codex" and through the API as `gpt-6.1-terra`. Free and Go plans are not mentioned.

Terra fills the gap [our OpenAI API page](/tools/openai-api/) described on 25 October: "there is no GPT-6 Terra". It is the successor to GPT-5.6 Terra and sits between GPT-6 Luna ($0.10 / $0.50) and GPT-6.1 Sol ($2 / $10). The model page lists a 1,050,000-token context window (922,000 maximum input, 128,000 maximum output), a knowledge cutoff of 1 June 2026, text and image input, and reasoning effort from `none` to `max`.

| Tier | Input | Cached input | Output |
|---|---|---|---|
| Standard | $1.00 | $0.05 | $5.00 |
| Standard, prompts over 272K input tokens | $2.00 | $0.10 | $7.50 |
| Batch and Flex | $0.50 | $0.025 | $2.50 |
| Fast | $2.00 | $0.10 | $10.00 |

Against GPT-5.6 Terra ($2.00 / $12.00), the new model costs half on input and 58 percent less on output. OpenAI's launch post, as quoted by BleepingComputer, claims it "performs on par with GPT-6 Astra at only one-tenth its price per token" and completes tasks "over three times faster" than Astra and GPT-6.1 Sol. OpenAI still points complex coding to Sol or Astra. Its system card addendum treats Terra as "Critical in cybersecurity" and "High for Biological and Chemical capability" under its Preparedness Framework.

### Kimi K3.1 Pro: open-weight, eventually

Moonshot's post introduces "Kimi K3.1 Pro, the first model in our new K3.1 series and our most capable 3T-class open-weight model to date, with a 1-million-token context window", "a post-trained version of Kimi K3". A **Highspeed** variant "delivers 2-3× the speed of K3.1 Pro" and costs twice as much on input and output ($4.00 / $20.00). "The full model weights will be released by Nov 4." As of 28 October there is no K3.1 repository on Moonshot's Hugging Face organisation and no published licence, so the licence question from the [October open-weights roundup](/news/open-weight-models-october-2026/) cannot be answered yet.

Moonshot gives no exact parameter count beyond "3T-class". The 2.8T total and 104B active that some trackers list are Kimi K3's published figures. Moonshot's own caveat is worth quoting: "K3.1 Pro's cyber capability remains behind that of frontier proprietary models that have been publicly available for at least three months." Moonshot also says its K2 models close to new users from 31 October and retire by the end of December 2026.

Vendor-reported, not reproduced: 65.7 percent on Terminal-Bench 4.0 (Moonshot lists Claude Opus 5.5 at 66.4 percent and GPT-6 Astra at 58.2 percent) and 64.4 on OfficeQA Pro v2. Artificial Analysis measured 67 percent on Terminal-Bench 4.0 in its own run.

### Both leaderboards changed their method

**Artificial Analysis Intelligence Index v5.0** was published on **27 October**. It adds FrontierCode 2.0 and Terminal-Bench-Science, replaces HLE with HLE-Diamond, drops GDPval-AA, SciCode and AA-LCR, weights four categories at 25 percent each, and puts about 60 percent of the index on private test sets. Scores fell across the board: Kimi K3.1 Pro scored 55 on the old index at launch and 46 on v5.0. **A v4 score and a v5 score are not comparable.**

At publication Artificial Analysis wrote that "Claude Opus 5.5 (max) leads at 58, ahead of GPT-6 Astra (max, 57) and GPT-6.1 Sol (max, 55)". A day later it listed Gemini 4 Carbon at 59, ranked first. GPT-6.1 Terra (max) scores 51 and Kimi K3.1 Pro 46, which Artificial Analysis calls "the top open weights model" although its weights are not yet released.

**Vals Index v2.2**, released 19 October and updated 27 October, ranks 29 models:

| Rank | Model | Vals Index |
|---|---|---|
| 1 | Claude Sonnet 5.5 | 70.85% |
| 2 | Gemini 4 Carbon | 70.36% |
| 3 | Claude Opus 5.5 | 70.18% |
| 4 | Gemini 4 Argon | 69.24% |
| 5 | Meta Muse Wonder Full | 66.79% |
| 6 | GPT-6 Astra | 65.02% |
| 9 | Kimi K3.1 Pro | 62.52% |
| 11 | GPT-6.1 Terra | 60.47% |

Google's Argon announcement on 30 September said Argon ranked "#1 on the Vals Index". On v2.2 it is fourth. Both statements can be true, because the index changed version and new models arrived; quote the rank with its version and date.

## What is actually different

- **Release no longer means access.** Carbon has prices, benchmark scores and independent leaderboard entries, but no public model ID. Vals and Artificial Analysis published results on the day of the announcement; neither says how it got access.
- **The mid-tier got much cheaper.** Terra's list price is half its predecessor's input price, and OpenAI claims near-flagship results on agent work.
- **Open-weight frontier models now launch API-first.** K3.1 Pro, like Mistral Large 4, was announced as open-weight with the weights to follow.
- **Leaderboard positions are version-specific.** Within ten days both main indexes moved to new versions.

## Why it matters for builders

- **Re-run your own evaluations before switching.** Terra is the obvious candidate to test against GPT-5.6 Terra and GPT-6.1 Sol on your workload, with the 272K long-context pricing rule in mind. See [how AI models are evaluated](/guides/how-ai-models-are-evaluated/).
- **Do not plan around Carbon yet.** There is no date for developer access, and the post-introductory price is double the launch price.
- **Wait for K3.1 Pro's licence before self-hosting plans.** Moonshot's K3 licence carries revenue triggers; the K3.1 terms are unpublished.
- **Cite leaderboard ranks with version and date**, for example "Vals Index v2.2, 27 October 2026", not "the #1 model".

## Sources

1. Google, Koray Kavukcuoglu, "Introducing Gemini 4 Carbon" (28 October 2026): [https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/)
2. Google AI for Developers, Gemini API models and changelog (fetched 28 October 2026, no Carbon entry): [https://ai.google.dev/gemini-api/docs/changelog](https://ai.google.dev/gemini-api/docs/changelog)
3. OpenAI, API changelog, entry of 26 October 2026: [https://developers.openai.com/api/docs/changelog](https://developers.openai.com/api/docs/changelog)
4. OpenAI, GPT-6.1 Terra model page (fetched 28 October 2026): [https://developers.openai.com/api/docs/models/gpt-6.1-terra](https://developers.openai.com/api/docs/models/gpt-6.1-terra)
5. OpenAI, API pricing (fetched 28 October 2026): [https://developers.openai.com/api/docs/pricing](https://developers.openai.com/api/docs/pricing)
6. OpenAI, "Addendum to GPT-6 Astra system card: GPT-6.1 Terra" (26 October 2026): [https://deploymentsafety.openai.com/gpt-6-1-terra/addendum-to-gpt-6-astra-system-card-gpt-6.1-terra](https://deploymentsafety.openai.com/gpt-6-1-terra/addendum-to-gpt-6-astra-system-card-gpt-6.1-terra)
7. OpenAI on X, GPT-6.1 Terra availability (26 October 2026): [https://x.com/OpenAI/status/2114780720170164735](https://x.com/OpenAI/status/2114780720170164735)
8. Moonshot AI, "Kimi K3.1 Pro" (23 October 2026): [https://www.kimi.ai/blog/kimi-k3-1-pro](https://www.kimi.ai/blog/kimi-k3-1-pro)
9. Moonshot AI, Kimi API pricing (fetched 28 October 2026): [https://platform.kimi.ai/docs/pricing/chat](https://platform.kimi.ai/docs/pricing/chat)
10. Artificial Analysis, "Artificial Analysis Intelligence Index v5" (27 October 2026): [https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v5](https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v5)
11. Artificial Analysis, Gemini 4 Carbon model page (fetched 28 October 2026): [https://artificialanalysis.ai/models/gemini-4-carbon](https://artificialanalysis.ai/models/gemini-4-carbon)
12. Artificial Analysis, "Kimi K3.1 Pro launch benchmarks" (23 October 2026): [https://artificialanalysis.ai/articles/kimi-k3-1-pro-launch-benchmarks](https://artificialanalysis.ai/articles/kimi-k3-1-pro-launch-benchmarks)
13. Vals AI, Vals Index v2.2 (updated 27 October 2026): [https://www.vals.ai/benchmarks/vals_index](https://www.vals.ai/benchmarks/vals_index)
14. BleepingComputer, report on the GPT-6.1 Terra launch (26 October 2026, secondary, for quotes from OpenAI's launch post, which returned an access error to our fetch): [https://www.bleepingcomputer.com/news/artificial-intelligence/openai-launches-gpt-61-terra-with-3x-faster-ai-agents-50-percent-lower-pricing/](https://www.bleepingcomputer.com/news/artificial-intelligence/openai-launches-gpt-61-terra-with-3x-faster-ai-agents-50-percent-lower-pricing/)

## Further reading

- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/)
- [Gemini 4 Argon](/news/gemini-4-argon/): the model Carbon builds on, and the same staged rollout
- [OpenAI API](/tools/openai-api/) and [Google Gemini](/tools/google-gemini/)
- [Open-weight models, October 2026](/news/open-weight-models-october-2026/)
- [How AI models are evaluated](/guides/how-ai-models-are-evaluated/)
