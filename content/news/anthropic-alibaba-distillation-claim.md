---
title: "Anthropic Accuses Alibaba of a Large-Scale Claude Distillation Campaign"
description: "Anthropic told US senators that operators it links to Alibaba's Qwen lab ran its largest known distillation attack on Claude, using about 25,000 fake accounts."
date: 2026-06-25
lastmod: 2026-06-25
categories: [News]
tags: ["anthropic", "alibaba", "model distillation", "ai security"]
related:
  - glossary/llm
  - glossary/ai-agents
  - comparisons/llm-landscape-2026
---

<figure class="bz-figure"><img src="/img/enterprise-dark/server-cpu-split-notext.png" alt="A dark server room on one side and a red-lit processor chip on the other, representing AI model infrastructure under scrutiny." loading="lazy"><figcaption>The dispute centres on access to Claude through its API, the same channel that paying developers use to build software.</figcaption></figure>

On 24 June 2026 Anthropic told two US senators that operators it links to Alibaba's Qwen AI lab ran the largest model-distillation campaign it has recorded against Claude. The company said the operators carried out roughly 28.8 million interactions through about 25,000 fake accounts between 22 April and 5 June 2026, and that they targeted Claude's software-engineering and agentic-reasoning skills. Alibaba has not been shown to confirm the account, so the claims here are Anthropic's allegations.

## What Anthropic alleges

Anthropic set out the claim in a letter to Senators Tim Scott and Elizabeth Warren, sent ahead of a Senate Banking Committee hearing on AI. The letter describes the activity as "the largest known distillation attack on Anthropic to date" and says the operators were affiliated with Alibaba and its Qwen lab.

The figures Anthropic gave:

| | Detail |
|---|---|
| **Interactions** | About 28.8 million exchanges with Claude |
| **Accounts** | Roughly 25,000 fake accounts |
| **Window** | 22 April to 5 June 2026 |
| **Target** | Software engineering and agentic reasoning |
| **Named source** | Operators linked to Alibaba's Qwen lab |

Anthropic said this single campaign exceeded the combined volume of three earlier efforts it had flagged. With Alibaba added, the company has now named four Chinese labs as distillers of its technology: DeepSeek, Moonshot AI, MiniMax, and Qwen. The three earlier campaigns together accounted for more than 16 million exchanges through about 24,000 accounts, according to Anthropic.

Alibaba has not publicly confirmed the activity. Reporting indicates the company declined to comment on the allegations. Treat the account as one side of a dispute that the other party has not addressed in detail.

## What model distillation is

Distillation is a training method. A team feeds carefully chosen questions to a strong model, records the answers, then trains a smaller and cheaper model on those answers so it copies the larger model's behaviour. The smaller model learns from the outputs rather than from raw data alone.

Distillation is a standard and legitimate technique when a lab distils its own model. The dispute here is about scale and consent. Anthropic argues that running tens of millions of queries through fake accounts to harvest a competitor's outputs breaks its terms of use and amounts to extracting capabilities it paid to build. For background on the models at the centre of this, see the [LLM glossary entry](/glossary/llm/) and the [2026 LLM landscape](/comparisons/llm-landscape-2026/).

<div class="bz-flow"><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Craft queries</span><span class="bz-flow-step-desc">Operators design prompts that pull out the target model's strongest behaviour.</span></div><div class="bz-flow-arrow">&rarr;</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Collect outputs</span><span class="bz-flow-step-desc">Many accounts send queries at volume and store every response.</span></div><div class="bz-flow-arrow">&rarr;</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Train a copy</span><span class="bz-flow-step-desc">A smaller model trains on those outputs to imitate the original.</span></div></div>

## Why it matters for anyone building on a model

The wider point sits beyond the two companies. For most of the last few years the contest was about who could train the strongest model. This dispute marks a shift toward protecting a model after it ships. A frontier model is only valuable if rivals cannot cheaply copy its behaviour through the API.

That shift lands directly on developers. Expect model providers to tighten three things:

- **Account verification.** More identity checks at sign-up to make fake accounts harder to create at scale.
- **API monitoring.** Closer tracking of query patterns that look like systematic harvesting rather than normal product use.
- **Usage terms.** Clearer rules on training other models from a provider's outputs, with enforcement to match.

If you build on a hosted model, including [agent systems](/glossary/ai-agents/) that send high query volumes, these controls may add verification steps or rate limits. Legitimate workloads should pass, but the friction is real and worth planning for.

The matter also moved into policy. Senators have signalled interest in measures that would penalise foreign firms found to be improperly accessing US AI model outputs. The Senate Banking Committee hearing is the venue where that discussion continues.

## Further reading

- [What is an LLM](/glossary/llm/): the type of model at the centre of the dispute.
- [AI agents](/glossary/ai-agents/): why agentic reasoning is a commercially valued target.
- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): where Anthropic, Alibaba, DeepSeek and others sit.
- [CNBC: Anthropic accuses Alibaba of distillation campaign](https://www.cnbc.com/2026/06/24/anthropic-alibaba-distillation-campaign.html): primary reporting on the letter.
- [TNW: Anthropic accuses Alibaba over Claude distillation](https://thenextweb.com/news/anthropic-accuses-alibaba-distillation-claude-qwen): figures and context on earlier campaigns.

## Sources

- [Reuters](https://www.reuters.com/world/china/anthropic-says-alibaba-illicitly-extracted-claude-ai-model-capabilities-2026-06-24/)
- [CNBC](https://www.cnbc.com/2026/06/24/anthropic-alibaba-distillation-campaign.html)
- [TNW](https://thenextweb.com/news/anthropic-accuses-alibaba-distillation-claude-qwen)
