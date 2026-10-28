---
title: "Moonshot AI (Kimi)"
description: "Moonshot AI's Kimi models: Kimi K3.1 Pro and Highspeed (October 2026, weights promised by 4 November), Kimi K3 (2.8T total, 104B active MoE, 1M context), the Kimi K3 License's revenue triggers, API prices, cloud availability and the K2 retirement."
date: 2026-10-28
last_updated: 2026-10-28
lastmod: 2026-10-28
last_verified: 2026-10-28
tags: ["open-weight", "llm", "moonshot", "kimi", "mixture-of-experts", "model-provider", "api", "licensing"]
tool_category: "AI"
related:
  - glossary/mixture-of-experts
  - glossary/llm
  - tools/deepseek
  - tools/minimax
  - tools/alibaba-qwen
  - tools/amazon-bedrock
  - comparisons/llm-landscape-2026
  - news/open-weight-models-october-2026
  - guides/software-licensing-and-vendor-lock-in
---

**Moonshot AI** builds the **Kimi** models and the Kimi assistant apps, and sells API access through its developer platform. Its current models are **Kimi K3.1 Pro** and **K3.1 Pro Highspeed** (announced 23 October 2026) and **Kimi K3** (July 2026). Kimi K3 is published as open weights under a bespoke licence with revenue triggers; K3.1 Pro is described by Moonshot as open-weight, but as of 28 October 2026 its weights and licence are not yet published. Every benchmark on this page is Moonshot's own unless it says otherwise.

Moonshot AI is based in Beijing and was founded in March 2023 by Yang Zhilin, Zhou Xinyu and Wu Yuxin (per Wikipedia, citing TechCrunch and Moonshot). The wiki groups it with the Chinese open-weight labs in the [2026 LLM landscape](/comparisons/llm-landscape-2026/).

## The current line-up

As of 28 October 2026:

| Model | Announced | Shape | Context | Weights and licence |
|---|---|---|---|---|
| **Kimi K3.1 Pro** | 23 October 2026 | "3T-class"; no exact count published | 1,048,576 tokens | Not yet published; "The full model weights will be released by Nov 4." |
| **Kimi K3.1 Pro Highspeed** | 23 October 2026 | Same model, served faster | 1,048,576 tokens | As above |
| **Kimi K3** | 16 July 2026; weights 27 July 2026 | 2.8T total, 104B active MoE, 16 of 896 experts per token | 1,048,576 tokens | Kimi K3 License (revenue triggers, see below) |

Moonshot's pricing page states: "All K3 series models support a 1,048,576-token context window."

### Kimi K3.1 Pro

Moonshot introduces it as "the first model in our new K3.1 series and our most capable 3T-class open-weight model to date" and "a post-trained version of Kimi K3". The Highspeed variant "delivers 2-3× the speed of K3.1 Pro"; Moonshot's model overview says both "have the same parameter constraints as kimi-k3" and does not describe any other difference. Some trackers list K3.1 Pro at 2.8T total and 104B active parameters. Those are Kimi K3's published figures; Moonshot has not confirmed them for K3.1.

Moonshot is unusually direct about one limit: "K3.1 Pro's cyber capability remains behind that of frontier proprietary models that have been publicly available for at least three months", and its weights policy says it aims "not to release open weights that would extend the absolute frontier of cyber capability."

**Moonshot-reported, not reproduced:** 65.7% on Terminal-Bench 4.0 (listing Claude Opus 5.5 at 66.4% and GPT-6 Astra at 58.2%), 64.4 on OfficeQA Pro v2, and a hallucination rate of 8.3% on its own Kimi Hallu Bench (hard, with tools) against 23.4% for K3. **Independent:** Artificial Analysis measured 67% on Terminal-Bench 4.0 and scores the model 46 on its Intelligence Index v5.0 (27 October 2026); Vals ranks it ninth of 29 on Vals Index v2.2 at 62.52%.

### Kimi K3

Natively multimodal (text, image and video). The weights are on Hugging Face as `moonshotai/Kimi-K3`, with a native MXFP4 checkpoint. On Amazon Bedrock it has been generally available since 18 September 2026 with the full 1M context and explicit prompt caching.

### Earlier models

Moonshot's line ran through Kimi K1.5 (January 2025, per Wikipedia), Kimi K2 (weights July 2025, under a modified MIT licence), K2 Thinking (November 2025), K2.5 (January 2026), K2.6 (April 2026) and K2.7 Code (June 2026), the K2-generation dates being when each Hugging Face repository was created. **The K2 generation is being retired:** Moonshot's pricing page says K2-series models close to new users from 31 October 2026 and all K2 models are retired by the end of December 2026. Migrate to K3 or K3.1 Pro.

## Licence

**Kimi K3 License.** Moonshot pre-announced a "Modified MIT" licence for K3 and then shipped a bespoke licence. It requires a separate commercial agreement for Model-as-a-Service businesses with more than US$20 million revenue over any consecutive 12 months, and "Kimi K3" attribution above 100 million monthly active users or US$20 million monthly revenue. Internal use is exempt. It is one of several revenue-triggered licences that became common among Chinese open-weight labs in mid-2026; the [October open-weights roundup](/news/open-weight-models-october-2026/) compares how each measures its trigger.

**Kimi K3.1 Pro.** No licence published as of 28 October 2026. Do not assume it matches K3's.

## API prices

From Moonshot's pricing page (USD per million tokens, excluding taxes, fetched 28 October 2026). The developer platform moved from `platform.moonshot.ai` to `platform.kimi.ai`, which the old host redirects to.

| Model | Input | Cached input | Output | Cache write, 5 min | Cache write, 1 h |
|---|---|---|---|---|---|
| `kimi-k3.1-pro` | $2.00 | $0.20 | $10.00 | $2.00 | $4.00 |
| `kimi-k3.1-pro-highspeed` | $4.00 | $0.20 | $20.00 | $4.00 | $8.00 |
| `kimi-k3` | $3.00 | $0.30 | $15.00 | $3.00 | $6.00 |

K3.1 Pro is a third cheaper than K3 on input and output. Highspeed doubles the price of K3.1 Pro for input, output and cache writes, not for cached input. Moonshot says "Zero Data Retention is available for API customers".

## Where to run it

| Route | K3.1 Pro | K3 |
|---|---|---|
| Kimi API (`platform.kimi.ai`) | Yes | Yes |
| Kimi apps (Kimi.ai, Kimi Work, Kimi Code) | Yes | Not checked |
| OpenRouter | Yes, Moonshot as the only provider | Not checked |
| Amazon Bedrock | Not as of 28 October 2026 | GA since 18 September 2026 |
| Alibaba Cloud Model Studio | Not found | Since 19 August 2026 |
| Self-hosting from Hugging Face | Not until the weights are published | Yes, under the Kimi K3 License |

## When to use it

- **K3.1 Pro on the API** is worth evaluating against other frontier-adjacent models for agentic coding and office work, at a lower price than K3. Check data-residency requirements first: the Kimi API is Moonshot's own service.
- **K3 self-hosted** is one of the strongest open-weight options, but at 2.8T total parameters it needs multi-node serving, and the licence's revenue triggers matter if you sell model access.
- **Anyone on K2** should plan the move now; new users are cut off from 31 October 2026.

## Sources

1. Moonshot AI, "Kimi K3.1 Pro" (23 October 2026, per the post's image paths and independent coverage; the post shows no date): [https://www.kimi.ai/blog/kimi-k3-1-pro](https://www.kimi.ai/blog/kimi-k3-1-pro)
2. Moonshot AI, Kimi API pricing (fetched 28 October 2026): [https://platform.kimi.ai/docs/pricing/chat](https://platform.kimi.ai/docs/pricing/chat)
3. Moonshot AI, Kimi API models overview (fetched 28 October 2026): [https://platform.kimi.ai/docs/api/models-overview](https://platform.kimi.ai/docs/api/models-overview)
4. Moonshot AI, Kimi K3 model card and licence on Hugging Face: [https://huggingface.co/moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3)
5. Moonshot AI, "Kimi K3" blog post: [https://www.kimi.com/blog/kimi-k3](https://www.kimi.com/blog/kimi-k3)
6. Amazon Bedrock, Kimi K3 model card: [https://docs.aws.amazon.com/bedrock/latest/userguide/model-card-moonshot-ai-kimi-k3.html](https://docs.aws.amazon.com/bedrock/latest/userguide/model-card-moonshot-ai-kimi-k3.html)
7. Artificial Analysis, "Kimi K3.1 Pro launch benchmarks" (23 October 2026): [https://artificialanalysis.ai/articles/kimi-k3-1-pro-launch-benchmarks](https://artificialanalysis.ai/articles/kimi-k3-1-pro-launch-benchmarks)
8. Artificial Analysis, Kimi K3.1 Pro model page (fetched 28 October 2026): [https://artificialanalysis.ai/models/kimi-k3-1-pro](https://artificialanalysis.ai/models/kimi-k3-1-pro)
9. Vals AI, Kimi K3.1 Pro (fetched 28 October 2026): [https://www.vals.ai/models/kimi_kimi-k3.1-pro](https://www.vals.ai/models/kimi_kimi-k3.1-pro)
10. Wikipedia, "Moonshot AI" (fetched 28 October 2026; secondary, for company founding facts): [https://en.wikipedia.org/wiki/Moonshot_AI](https://en.wikipedia.org/wiki/Moonshot_AI)

## Further reading

- [Gemini 4 Carbon, GPT-6.1 Terra, Kimi K3.1 Pro](/news/frontier-models-late-october-2026/): the K3.1 Pro launch in context
- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/)
- [Open-weight models, October 2026](/news/open-weight-models-october-2026/)
- [DeepSeek](/tools/deepseek/), [MiniMax](/tools/minimax/) and [Alibaba Qwen](/tools/alibaba-qwen/): the other Chinese open-weight labs
- [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/)
