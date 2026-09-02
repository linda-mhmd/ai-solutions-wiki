---
title: "August 2026: The Month Open Weights Came With Conditions"
description: "Alibaba, Z.ai, and DeepSeek all shipped in August 2026. The models were strong, but the story was the licences: a Max-class flagship under a bespoke licence, and GLM-5.3's weights held back two weeks for a cyber-capability safety review."
date: 2026-08-28
lastmod: 2026-09-02
last_updated: 2026-09-02
categories: [News]
tags: [open-weight-models, qwen, glm, deepseek, licensing, model-release, ai-safety]
related:
  - tools/alibaba-qwen
  - tools/deepseek
  - news/grok-4-5-and-qwen-open-models
  - guides/software-licensing-and-vendor-lock-in
---

Three Chinese labs shipped flagship models in a two-week window in August 2026. The capability gains were real but incremental. What changed materially was the terms: the two most capable releases of the month arrived under **bespoke licences rather than Apache 2.0 or MIT**, and one of them had its weights deliberately withheld for a fortnight while the lab ran a cyber-capability safety review. "Open weights" stopped being a single, well-understood thing.

## What happened

### Alibaba: two models, two licences

On **12 August 2026** Alibaba published open weights for **Qwen3.8-2.4T-A95B** — 2.4 trillion total parameters with roughly 95 billion active, a [mixture-of-experts](/glossary/mixture-of-experts/) design. This was the first open release at the Qwen Max flagship tier, and it is worth being precise about what "Max open weights" does and does not mean here: the downloadable checkpoint is **not the hosted Max model**. It is **text-only**, dropping the vision input the API version accepts; its native context is **262,144 tokens rather than the API's 1M**; it requires thinking mode on; and it ships without built-in tools, so you bring your own.

It also did not ship under Apache 2.0. The custom **Qwen3.8-Max Licence** requires you to keep copyright notices, to display the model name prominently once a product passes **100M monthly active users or $20M monthly revenue**, and to obtain a **separate licence** if you run a Model-as-a-Service or AI-assistant business above **$50M trailing-twelve-month** revenue. Purely internal use with no third-party exposure is exempt.

On **14 August 2026** Alibaba released **Qwen3.8-27B**, a dense model accepting text, image, and video, under **Apache 2.0** — confirmed in the licence file rather than only in the model card metadata, which matters because the two have diverged before. It is reported at approximately 27.8 billion parameters with a 262,144-token native context window that Alibaba says extends toward one million tokens using YaRN.

The split is the point. The small model is genuinely permissive; the flagship is neither fully permissive nor fully the flagship.

### Z.ai: GLM-5.3, and a deliberate two-week hold

Z.ai released **GLM-5.3** through its API on **14 August 2026**. Unusually, it is a post-training-only upgrade over GLM-5.2 — the base model was not retrained. On Z.ai's own evaluations:

| Benchmark (Z.ai's own evals) | GLM-5.3 | GLM-5.2 |
|---|---|---|
| Terminal-Bench 3.0 | 28.3% | 4.6% |
| DeepSWE v1.1 | 66.9% | 46.2% |
| CyberGym | 84.5% | 77.2% |

Z.ai stated at launch that the weights would follow roughly two weeks later, after safety evaluation and hardening. The company's stated reason is worth quoting in substance: as it scaled post-training, **cyber capability improved faster than expected**. The CyberGym figure is the visible edge of that. The weights were published on Hugging Face on **28 August 2026** at 753 billion total parameters, under a bespoke **GLM-5.3 License** — MIT-style permissions with a condition that Model-as-a-Service operators above $10 billion trailing-twelve-month revenue pass a Z.ai security review before commercial use. A smaller **GLM-5.3-Flash** followed on 26 August.

This appears to be the first time a major open-weight lab has delayed a weights release explicitly on offensive-cyber grounds and said so publicly.

### DeepSeek: API first, weights not part of the announcement

**DeepSeek-V4-Pro** reached general availability on **13 August 2026** (checkpoint V4-Pro-0813) across app, web, and API. DeepSeek's own announcement covers API availability and agent upgrades; it does not announce open weights, a notable departure in tone from the [V4 open-weight release in July](/news/deepseek-v4/). Alongside it, DeepSeek moved to **peak and off-peak API pricing from 16 August**, with off-peak rates 50% below peak. An experimental multimodal model, **DeepSeek-V4-Flash-Vision-Exp**, arrived on **21 August 2026**.

## The gap between "open weights" and "runnable"

GLM-5.3 at 753 billion parameters is downloadable and, for most teams, unusable. Reports put the FP8 weights at roughly 756 GB — more than fits in an 8×80GB node. The same pattern holds for Qwen3.8-Max at 2.4T total parameters.

This is the practical shape of open weights at the frontier in 2026: the licence permits self-hosting, the hardware does not — and where you *can* download the flagship, as with Qwen, the checkpoint has been trimmed of the capabilities that made the hosted model interesting. The models teams can actually run locally are the 27B-class releases, which is exactly where Alibaba kept Apache 2.0. Read the flagship releases as **auditability and sovereignty artefacts** — you can inspect them, a national lab can host them — rather than as something you will serve from your own cluster. [Quantization](/glossary/quantization/) narrows the gap but does not close it at this scale.

## Why it matters for builders

**Read the licence file, not the badge.** Three of the month's four notable releases were not under a standard OSI-style licence. A "GLM-5.3 License" or a "Qwen3.8-Max Licence" is a bespoke document with bespoke conditions, and **both** carry revenue-triggered clauses that change your obligations as you grow — Qwen at $20M monthly revenue for attribution and $50M TTM for a MaaS licence, Z.ai at $10bn TTM for a security review. If your procurement process treats "open weights" as a synonym for "Apache 2.0," it will approve something it did not intend to. See [software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/).

**Vendor benchmarks are not comparable across vendors.** Every table above is a lab's own evaluation, and the benchmarks themselves are moving — Terminal-Bench 3.0 scores cannot be compared to the Terminal-Bench 2.1 figures other labs quoted a month earlier. Use them as directional evidence of within-family progress and run your own [evals](/guides/llm-evaluation-methods/) before switching anything.

**Safety-gated releases are a new scheduling risk.** If your roadmap depends on weights landing on a stated date, Z.ai just demonstrated that a lab may hold them, and that the reason may be capability rather than legal review. Plan for weights arriving late or not at all, and keep an API path as the fallback. [Preparing for AI provider restrictions](/guides/preparing-for-ai-provider-restrictions/) covers the general case.

**The cyber-capability signal deserves attention on its own.** A frontier open-weight model scoring 84.5% on CyberGym, published under a licence anyone can accept, is the concrete version of the argument in [the collective cyber-defence letter](/news/ai-cyber-defense-open-letter-2026/) that landed the same fortnight. Defenders and attackers are downloading the same file.

## Sources

1. Z.ai, "Preparing GLM-5.3 for Open Release: A Responsible Path to Cyber [Capability]": [https://x.com/Zai_org/article/2088280509474320693](https://x.com/Zai_org/article/2088280509474320693)
2. Z.ai, "GLM-5.3 is now open-weight" (28 August 2026): [https://x.com/Zai_org/status/2093354097122455713](https://x.com/Zai_org/status/2093354097122455713)
3. MarkTechPost, "Z.ai Ships GLM-5.3 Without Retraining the Base Model" (14 August 2026): [https://www.marktechpost.com/2026/08/14/z-ai-ships-glm-5-3-without-retraining-the-base-model-better-at-complex-coding-and-long-horizon-tasks/](https://www.marktechpost.com/2026/08/14/z-ai-ships-glm-5-3-without-retraining-the-base-model-better-at-complex-coding-and-long-horizon-tasks/)
4. Interconnects, "GLM-5.3: How Chinese labs keep stride with the frontier": [https://www.interconnects.ai/p/glm-53-how-chinese-labs-keep-stride](https://www.interconnects.ai/p/glm-53-how-chinese-labs-keep-stride)
5. Digital Applied, "GLM-5.3's Weights Are Out. The Licence Is Not MIT": [https://www.digitalapplied.com/blog/glm-5-3-weights-bespoke-license-not-mit](https://www.digitalapplied.com/blog/glm-5-3-weights-bespoke-license-not-mit)
6. llm-stats, "Qwen3.8-Max Open Weights: First Max-Class Qwen You Can Download": [https://llm-stats.com/blog/research/qwen3-8-max-open-weights](https://llm-stats.com/blog/research/qwen3-8-max-open-weights)
7. DataNorth AI, "Alibaba releases Qwen3.8-27B open weights": [https://datanorth.ai/news/alibaba-releases-qwen3-8-27b](https://datanorth.ai/news/alibaba-releases-qwen3-8-27b)
8. eWeek, "Alibaba Opens Qwen3.8-27B as Max Model Adds License Limits": [https://www.eweek.com/news/alibaba-qwen3-8-27b-license-apac-china/](https://www.eweek.com/news/alibaba-qwen3-8-27b-license-apac-china/)
9. DeepSeek, "DeepSeek-V4-Pro GA Release" (13 August 2026): [https://api-docs.deepseek.com/news/news260813/](https://api-docs.deepseek.com/news/news260813/)
10. DeepSeek API change log: [https://api-docs.deepseek.com/updates/](https://api-docs.deepseek.com/updates/)
11. Artificial Analysis, model comparison index: [https://artificialanalysis.ai/](https://artificialanalysis.ai/)

## Further reading

- [More 2026 model releases: Grok 4.5 and Qwen's open family](/news/grok-4-5-and-qwen-open-models/): the previous chapter of this story.
- [DeepSeek releases V4 open-weight models](/news/deepseek-v4/): the July release this one moves away from.
- [Moonshot AI announces Kimi K3](/news/kimi-k3/): the other trillion-parameter open-weight flagship.
- [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/): how to read a bespoke model licence.
- [Small vs large language models](/comparisons/small-vs-large-language-models/): why the 27B tier is where most teams should look.
- [LLM evaluation methods](/guides/llm-evaluation-methods/): running your own numbers instead of trusting the table.
