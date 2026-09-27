---
title: "DeepSeek vs ChatGPT: Cost, Privacy, and Capability Compared"
description: "How DeepSeek and ChatGPT actually compare on price, benchmark performance, and — because these two specifically differ on this — where your data goes depending on whether you use the hosted app, the API, or self-hosted open weights."
date: 2026-09-04
categories: [Comparisons]
tags: ["deepseek", "chatgpt", "openai", "gpt", "comparison", "llm", "open-weight", "pricing", "data-privacy", "china", "self-hosting"]
tools: ["deepseek", "openai-api"]
related:
  - tools/deepseek
  - tools/openai-api
  - comparisons/ai-subscription-pricing-2026
  - comparisons/llm-landscape-2026
  - guides/self-hosting-llms-hardware-and-economics
  - glossary/data-sovereignty
last_verified: 2026-09-25
last_updated: 2026-09-25
lastmod: 2026-09-25
---

<figure class="bz-figure">
  <img src="/img/ai-machine/silhouette-machine-scale-notext.png" alt="A dark silhouette holding a balance scale, weighing two sides against each other." loading="lazy">
  <figcaption>DeepSeek and ChatGPT trade off on price, openness, and polish in ways that are unusually clear-cut for a head-to-head AI comparison.</figcaption>
</figure>

DeepSeek and ChatGPT get compared constantly because they sit at opposite ends of the same trade: DeepSeek is a Chinese lab that gives away its model weights for free and charges very little for API access; ChatGPT is a US product built on closed models that costs more but ships as a more complete, more polished product. Both claims are roughly true, and both need real numbers behind them rather than vibes. They also moved in September 2026: DeepSeek released **DeepSeek-V4.1-Flash** on 10 September and OpenAI released **GPT-6 Sol and GPT-6 Luna** on 22 September. Luna in particular undercuts DeepSeek's cheapest model on most token prices, which breaks the old "DeepSeek is cheaper at every tier" rule. This page gives you those numbers — current pricing, independently measured benchmark standings, and a factual look at where your data actually goes with each — and ends with plain guidance on which one fits your situation.

## What you're actually choosing between

"DeepSeek vs ChatGPT" collapses three different decisions into one question, and which one you're asking changes the answer.

- **The free chat apps** — chat.deepseek.com or the DeepSeek mobile app, versus chatgpt.com or the ChatGPT app. This is the comparison most people mean.
- **The developer APIs** — building a product against DeepSeek's API versus OpenAI's API. See [DeepSeek](/tools/deepseek/) and [OpenAI API](/tools/openai-api/) for the full technical reference on each.
- **Self-hosting the model yourself.** DeepSeek publishes its model weights under the MIT license, so you can download and run DeepSeek-V4.1-Flash or DeepSeek-V4-Pro on your own hardware or a cloud GPU instance you control. OpenAI does not offer this for its flagship models — GPT-6 Sol, GPT-6 Luna, GPT-6 Astra and GPT-5.6 are closed and only reachable through OpenAI's hosted API (OpenAI does publish small open-weight `gpt-oss` models, but they are not the models this comparison is actually about).

That third option matters more here than in almost any other comparison this wiki covers, because it changes the privacy answer completely — see below.

## Price: it depends on the tier now

Until September 2026 this section could say DeepSeek was cheaper at every tier. That is no longer true. At the top of the range DeepSeek is still far cheaper; at the bottom, OpenAI's new GPT-6 Luna is cheaper than DeepSeek-V4.1-Flash on fresh input and output tokens [1][3].

**DeepSeek API**, per million tokens, current since 10 September 2026. DeepSeek bills peak/off-peak: peak is 01:00–04:00 and 06:00–10:00 UTC, Monday to Friday, and every other hour (weekends, and Chinese public holidays in full) is off-peak at 50% of the peak rate. Ranges below are off-peak–peak [1]:

| Model | API id | Cache hit (input) | Cache miss (input) | Output | Context |
|---|---|---|---|---|---|
| DeepSeek-V4.1-Flash | `deepseek-flash` | $0.003–$0.006 | $0.15–$0.30 | $0.60–$1.20 | 1M tokens |
| DeepSeek-V4-Pro | `deepseek-v4-pro` | $0.022–$0.044 | $0.66–$1.32 | $1.98–$3.96 | 1M tokens |

V4.1-Flash replaced DeepSeek-V4-Flash, which DeepSeek retired on 10 September (the old `deepseek-v4-flash` id is temporarily routed to V4.1-Flash at the new price). The Flash cut was modest: from $0.22–$0.44 to $0.15–$0.30 on cache-miss input and from $0.66–$1.32 to $0.60–$1.20 on output. V4-Pro continues with its pricing unchanged [1].

**OpenAI API**, per million tokens, standard rate for prompts up to 272K tokens, as of 25 September 2026 [3]:

| Model | Input | Cached input | Output |
|---|---|---|---|
| GPT-6 Luna (22 September 2026) | $0.10 | $0.01 | $0.50 |
| GPT-6 Sol (22 September 2026) | $2.00 | $0.20 | $10.00 |
| GPT-6 Astra (3 September 2026) | $10.00 | $1.00 | $50.00 |
| GPT-5.6 Luna (previous generation) | $0.20 | $0.02 | $1.20 |
| GPT-5.6 Sol (previous generation, promotional rate) | $4.00 | $0.40 | $20.00 |

GPT-6 Sol and Luna have a 1,050,000-token context window. Prompts above 272K tokens cost 2× on input and 1.5× on output, and cache writes are billed at 1.25× the input rate; Batch and Flex are half price [3].

How the tiers line up:

- **Budget tier: GPT-6 Luna vs DeepSeek-V4.1-Flash.** Luna's $0.10 input and $0.50 output are below V4.1-Flash even at DeepSeek's off-peak rate ($0.15 and $0.60), and well below its peak rate ($0.30 and $1.20). DeepSeek wins only on cached input ($0.003–$0.006 against $0.01). For a cache-heavy agent workload the two are close; for fresh-input or output-heavy work Luna is cheaper, unless you use OpenAI's Batch tier against DeepSeek's off-peak window, where the gap narrows again.
- **Mid and top tier: GPT-6 Sol vs DeepSeek-V4-Pro.** DeepSeek is still much cheaper: V4-Pro output at $1.98–$3.96 is roughly a fifth to two-fifths of Sol's $10, and cache-miss input is a third to two-thirds of Sol's $2.
- **Frontier tier: GPT-6 Astra** has no DeepSeek counterpart on price or capability; at $50 per 1M output it is in a different category.

Token prices are not the whole bill. Artificial Analysis measures what each model costs to run its full evaluation suite, which captures verbosity as well as rates: about **$0.07 per task for GPT-6 Luna, $0.27 for DeepSeek-V4.1-Flash, $0.67 for DeepSeek-V4-Pro and $1.06 for GPT-6 Sol** [4][5][6]. Artificial Analysis quotes DeepSeek at its peak rates and notes that V4.1-Flash is very verbose (about 250M output tokens on its suite against a 140M median), which is a large part of why it costs more per task than Luna.

For the **consumer apps**, the contrast is even starker: DeepSeek's chat app and mobile app are entirely free, with no paid tier at all — everything DeepSeek monetizes runs through the metered API [7]. ChatGPT runs a conventional subscription ladder: Free ($0), Go ($8/month), Plus ($20/month), Pro ($100/month for a Codex-focused tier or $200/month for the full-usage tier, added as two separate rungs in April 2026), and Business (from $20–25/seat/month) [8]. If your entire use case is "chat with a capable AI model for free," DeepSeek's free tier already gives you its best model with no paywall; ChatGPT's free tier is capped and routes you toward smaller models under load. See [AI subscription pricing in 2026](/comparisons/ai-subscription-pricing-2026/) for the full consumer-pricing picture across every major vendor, tracked separately from the API numbers above.

## Where your data goes — and why the path you pick changes the answer

This is the one place this comparison genuinely differs from most others on this wiki, because the honest answer depends on which of the three options above you use.

**DeepSeek's hosted app and API.** DeepSeek's own privacy policy states plainly: "To provide you with our services, we directly collect, process and store your Personal Data in People's Republic of China" [9]. That includes prompts, chat history, uploaded files, and device/network metadata. The policy permits disclosure to "law enforcement agencies" and to comply with "applicable law, legal process or government requests" [9] — and as a company incorporated in China, DeepSeek is subject to China's National Intelligence Law, Article 7 of which requires organizations to "support, assist, and cooperate with national intelligence efforts" [10]. DeepSeek does let users opt out of having their data used for model training [9]. Regulators have acted on this, not just theorized about it: Italy's Garante ordered DeepSeek to stop processing Italian users' data in January 2025, citing an "entirely unsatisfactory" response to questions about its data practices, and the block remains in force as of 2026 [11]. Berlin's data protection authority went further, formally notifying Apple and Google in June 2025 that DeepSeek's apps were illegal content under German law and asking both to remove them from their German app stores, after DeepSeek failed to demonstrate its China-based processing met EU-equivalent protection [12]. Several US federal agencies and states have separately banned DeepSeek on government-issued devices, citing the same data-location concern.

**DeepSeek's open weights, self-hosted.** This is a genuinely different posture, not a variation on the above. If you download the MIT-licensed DeepSeek-V4.1-Flash or V4-Pro weights and run them on your own infrastructure — your own GPUs, or a cloud instance you control — no prompt or output ever reaches DeepSeek's servers. DeepSeek's own privacy policy explicitly excludes this case: "processing rules for Personal Data collected from end users when accessing downstream systems or applications developed by developers using our open platform services are not covered by this privacy policy" [9]. The model itself has no known telemetry or phone-home behavior. For sensitive or regulated data, self-hosting the weights is the version of "using DeepSeek" that sidesteps the jurisdiction question entirely — at the cost of the hardware and ops burden covered in [self-hosting LLMs: hardware and economics](/guides/self-hosting-llms-hardware-and-economics/).

**ChatGPT.** OpenAI is a US-incorporated company; its hosted app and API process data on OpenAI's own infrastructure, primarily in the US. By default, data sent to the API is not used to train OpenAI's models unless you explicitly opt in, and API inputs/outputs are retained for up to 30 days for abuse monitoring before deletion [13]. Enterprise and Business customers can request Zero Data Retention on eligible endpoints, removing even that window [14]. OpenAI is not subject to China's National Intelligence Law; it answers to US law instead, including the US CLOUD Act, which reaches any US-headquartered provider regardless of where its servers physically sit — see [Data sovereignty](/glossary/data-sovereignty/) for the general mechanics. Unlike DeepSeek, there is no self-hosting path that removes OpenAI from the picture for GPT-6 Sol, Luna, Astra or GPT-5.6 — those models only run on OpenAI's own infrastructure.

The practical upshot: "is DeepSeek safe for my data" and "is ChatGPT safe for my data" are not answered the same way for every reader. Casual, non-sensitive use makes the jurisdiction question mostly academic for either. Regulated, sensitive, or government data changes the calculus specifically for DeepSeek's hosted app/API (not for the open weights run on your own hardware) — and that specific fork barely exists for ChatGPT, whose only mode is OpenAI's own infrastructure.

## What independent benchmarks actually show

Both companies publish their own benchmark numbers; neither should be taken at face value on its own. Artificial Analysis, a third-party tracker that runs its own evaluation suite across vendors, gives these scores on version 4.3.2 of its Intelligence Index as of 25 September 2026 [4][5][6]:

| Model | Intelligence Index (v4.3.2) |
|---|---|
| Claude Opus 5.5 (for reference, current leader) | 58 |
| GPT-6 Astra | 53 |
| GPT-6 Sol | 48 |
| GPT-5.6 Sol | 47 |
| DeepSeek-V4.1-Flash | 39 |
| GPT-6 Luna | 37 |
| DeepSeek-V4-Pro | 36 |

Two things stand out. First, **DeepSeek's newest and cheapest model now scores above its flagship**: V4.1-Flash edges out V4-Pro, so for most API users V4.1-Flash is the DeepSeek model to evaluate first. Second, the gap to OpenAI depends on the tier: V4.1-Flash and GPT-6 Luna are close at the budget end, while GPT-6 Sol leads DeepSeek's best by about 9 points and Astra by about 14. These scores are not comparable with figures from earlier in September 2026, when this page quoted a different index version (V4-Pro at 53, GPT-5.6 Sol and GPT-6 Astra at 61); Artificial Analysis rescaled its index in between, so compare models only within one version. On LMArena's human-preference leaderboard (Chatbot Arena), DeepSeek's models are consistently the highest-ranked open-weight family, though closed models from OpenAI and Anthropic still occupy most of the top positions; check the live leaderboard before relying on a specific rank, since it reorders with nearly every major release [15].

DeepSeek's much-repeated claim that it trained DeepSeek-V3 for around $5.6 million is a company figure, not an independently audited one, and it refers to a specific final training run rather than the lab's full R&D spend; treat it as a claim about DeepSeek's methodology, not a verified total cost [16].

## Where each one genuinely wins

Neither product is strictly better; each has real, structural advantages the other doesn't match.

| | DeepSeek | ChatGPT |
|---|---|---|
| Price (API) | Much cheaper than GPT-6 Sol and Astra; cheapest cached input | GPT-6 Luna is cheaper than V4.1-Flash on fresh input and output; higher at every other tier |
| Free consumer tier | Full model, no paywall | Capped, smaller models under load |
| Self-hosting | Yes — MIT-licensed weights | No (flagship models are closed) |
| Image input (API) | V4.1-Flash only; V4-Pro is text-only | Yes, on GPT-6 Sol, Luna and Astra |
| Native image generation | No | Yes (GPT Image 2.5) |
| Voice mode / Realtime | Limited | Yes, mature |
| Memory across chats | No | Yes |
| Plugin / apps ecosystem | Minimal | Broad (Custom GPTs, connectors, Canvas) |
| Fine-tuning | Self-host and fine-tune the open weights directly | Managed fine-tuning across most models |
| Independent benchmark standing | Strong for an open model; trails the closed frontier | Leads or near-leads most independent boards |
| Data jurisdiction (hosted use) | PRC, unless self-hosted | US |

## Who should pick which

**Pick DeepSeek's app or API if** you're cost-sensitive at API volume on cache-heavy or Pro-class workloads (at the budget tier, price GPT-6 Luna against V4.1-Flash on your own traffic before assuming DeepSeek wins), want a capable free chatbot with no subscription, are comfortable with (or have specifically evaluated and accepted) data processed in China, or want a model you can eventually self-host as usage grows.

**Self-host DeepSeek's open weights if** you need the cost and openness benefits but the data can't leave your own infrastructure — the one configuration that gets you both. Budget for the GPU hardware; see [self-hosting LLMs](/guides/self-hosting-llms-hardware-and-economics/) before assuming it's cheaper than the hosted API at your volume.

**Pick ChatGPT if** you need native image or voice generation, persistent memory, a mature plugins/integrations ecosystem, or the strongest general capability without shopping benchmarks yourself; you need data to stay under US rather than PRC jurisdiction and self-hosting isn't practical; or you're building a product where OpenAI's broader platform — embeddings, fine-tuning breadth, enterprise support — matters as much as the base model.

**If the stakes are low:** try both free tiers. They cost nothing, and the real differences — DeepSeek's leaner interface versus ChatGPT's broader feature set — are easier to feel in five minutes of use than to read about.

## What this page can't settle for you

DeepSeek's pricing has already changed twice in two months (up in August, Flash down in September), OpenAI released three GPT-6 models in September alone, and both companies revise pricing and model lineups faster than any comparison page can track — verify current rates before budgeting a production workload. Benchmark rankings move with nearly every release, and index versions change; treat the numbers above as a 25 September 2026 snapshot. And whether PRC data jurisdiction is disqualifying for your specific use is a policy or compliance question only you (or your organization) can answer — this page states the facts; it doesn't make that call for you.

## Further reading

- [DeepSeek](/tools/deepseek/): full technical reference, model lineup, and access paths.
- [OpenAI API](/tools/openai-api/): full technical reference for the GPT-6 and GPT-5.6 models.
- [AI subscription pricing in 2026](/comparisons/ai-subscription-pricing-2026/): consumer plan pricing across every major AI vendor.
- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): where DeepSeek and GPT sit among every other model family.
- [Self-hosting LLMs: hardware and economics](/guides/self-hosting-llms-hardware-and-economics/): what it actually costs to run DeepSeek's open weights yourself.
- [Data sovereignty](/glossary/data-sovereignty/): the general principle behind the jurisdiction discussion above.
- [DeepSeek releases V4 open-weight models](/news/deepseek-v4/): this wiki's coverage of the V4 launch.
- [Claude vs ChatGPT](/comparisons/claude-vs-chatgpt/) and [OpenAI vs Anthropic](/comparisons/openai-vs-anthropic/): how ChatGPT compares against the other major closed-model competitor.
- [What is open source?](/basics/what-is-open-source/): the licensing concept behind DeepSeek's open-weight releases.
- [What is ChatGPT?](/basics/what-is-chatgpt/): a plain-language introduction to the product.

## Sources

1. DeepSeek, "Models & Pricing", fetched 25 September 2026: [https://api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing); DeepSeek API changelog, "DeepSeek-V4.1-Flash Release" (10 September 2026: V4-Flash retired, V4-Pro continued, Flash prices reduced): [https://api-docs.deepseek.com/updates](https://api-docs.deepseek.com/updates); DeepSeek-V4.1-Flash model card (MIT licence): [https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash)
2. Engadget, "DeepSeek's AI models are about to cost four times more" (August 2026), on the 16 August 2026 price increase and the earlier promotional-rate reversal: [https://www.engadget.com/2236912/deepseek-ai-models-get-four-times-pricier/](https://www.engadget.com/2236912/deepseek-ai-models-get-four-times-pricier/)
3. OpenAI, API pricing documentation, fetched 25 September 2026: [https://developers.openai.com/api/docs/pricing](https://developers.openai.com/api/docs/pricing); GPT-6 Sol model page (22 September 2026): [https://developers.openai.com/api/docs/models/gpt-6-sol](https://developers.openai.com/api/docs/models/gpt-6-sol); GPT-6 Luna model page (22 September 2026): [https://developers.openai.com/api/docs/models/gpt-6-luna](https://developers.openai.com/api/docs/models/gpt-6-luna); OpenAI API changelog: [https://developers.openai.com/api/docs/changelog](https://developers.openai.com/api/docs/changelog)
4. Artificial Analysis, DeepSeek model pages (Intelligence Index v4.3.2, cost per task), fetched 25 September 2026: [DeepSeek V4.1 Flash](https://artificialanalysis.ai/models/deepseek-v4-1-flash), [DeepSeek V4 Pro 0813](https://artificialanalysis.ai/models/deepseek-v4-pro)
5. Artificial Analysis, OpenAI model pages, fetched 25 September 2026: [GPT-6 Sol](https://artificialanalysis.ai/models/gpt-6-sol), [GPT-6 Luna](https://artificialanalysis.ai/models/gpt-6-luna), [GPT-6 Astra](https://artificialanalysis.ai/models/gpt-6-astra), [GPT-5.6 Sol](https://artificialanalysis.ai/models/gpt-5-6-sol)
6. Artificial Analysis, Claude Opus 5.5 model page (reference score), fetched 25 September 2026: [https://artificialanalysis.ai/models/claude-opus-5-5](https://artificialanalysis.ai/models/claude-opus-5-5)
7. DeepSeek, chat.deepseek.com and mobile app pricing (no paid consumer tier as of September 2026), confirmed against DeepSeek's own site and API pricing documentation.
8. Industry pricing trackers cross-checked against OpenAI's own site for current ChatGPT consumer tiers (Free/Go/Plus/Pro/Business), September 2026 — see also this wiki's [AI subscription pricing 2026](/comparisons/ai-subscription-pricing-2026/), sourced directly to [chatgpt.com/pricing](https://chatgpt.com/pricing/).
9. DeepSeek, Privacy Policy, fetched 4 September 2026: [https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html](https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html)
10. National Intelligence Law of the People's Republic of China, Article 7 (2017, amended 2018) — English translation: [https://www.chinalawtranslate.com/en/national-intelligence-law-of-the-p-r-c-2017/](https://www.chinalawtranslate.com/en/national-intelligence-law-of-the-p-r-c-2017/)
11. Garante per la protezione dei dati personali (Italian data protection authority), press release ordering the limitation on DeepSeek's processing of Italian users' data (30 January 2025): [https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/10097450](https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/10097450); The Hacker News, "Italy Bans Chinese DeepSeek AI Over Data Privacy and Ethical Concerns" (30 January 2025): [https://thehackernews.com/2025/01/italy-bans-chinese-deepseek-ai-over.html](https://thehackernews.com/2025/01/italy-bans-chinese-deepseek-ai-over.html)
12. Berlin Commissioner for Data Protection and Freedom of Information, press release on notifying Apple and Google that DeepSeek's apps constitute illegal content under German law (27 June 2025): [https://www.datenschutz-berlin.de/fileadmin/user_upload/pdf/pressemitteilungen/2025/20250627-BlnBDI-Press-Release_DeepSeek.pdf](https://www.datenschutz-berlin.de/fileadmin/user_upload/pdf/pressemitteilungen/2025/20250627-BlnBDI-Press-Release_DeepSeek.pdf)
13. OpenAI, "Data controls in the OpenAI platform" (default 30-day API retention, training opt-in): [https://developers.openai.com/api/docs/guides/your-data](https://developers.openai.com/api/docs/guides/your-data)
14. OpenAI, "Enterprise privacy at OpenAI" (Zero Data Retention for eligible enterprise endpoints): [https://openai.com/enterprise-privacy/](https://openai.com/enterprise-privacy/)
15. LMArena (Chatbot Arena) leaderboard, live rankings: [https://arena.ai/leaderboard](https://arena.ai/leaderboard)
16. This wiki, [DeepSeek](/tools/deepseek/) and [OpenAI API](/tools/openai-api/): full model lineups, the DeepSeek-V3 training-cost claim, and technical detail underlying the tables above.
