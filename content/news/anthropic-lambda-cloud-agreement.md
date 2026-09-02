---
title: "Anthropic Signs a Reported $35B, Six-Year Cloud Agreement With Lambda"
description: "Bloomberg and the Wall Street Journal report a $35 billion, six-year compute agreement between Anthropic and Nvidia-backed Lambda, anchored on roughly 350 MW in a Hut 8-developed Texas data centre."
date: 2026-08-31
lastmod: 2026-09-02
last_updated: 2026-09-02
categories: [News]
tags: [anthropic, lambda, ai-infrastructure, compute, neocloud, nvidia]
related:
  - tools/lambda-cloud
  - news/micron-anthropic-ai-infrastructure-agreement
  - comparisons/gpu-clouds-and-neoclouds
  - glossary/neocloud
---

Anthropic has signed a **$35 billion, six-year cloud computing agreement with Lambda**, according to reporting by the Wall Street Journal and Bloomberg on **31 August 2026**. The capacity is Nvidia-based and is intended to serve growing demand for Claude. Anthropic has not published its own announcement, so everything below rests on that reporting rather than on a company statement — worth holding in mind, because deal values reported ahead of confirmation have moved materially this year.

## What happened

The reported shape of the deal:

| | |
|---|---|
| Counterparty | **Lambda** (Nvidia-backed GPU cloud) |
| Value | **$35 billion** |
| Term | **six years** |
| Anchor site | Nueces County, **Texas** |
| Capacity | roughly **350 MW**, Nvidia silicon |
| Developer | **Hut 8** (formerly a crypto-mining operator) |
| Lease held by | Lambda |

Two structural details are worth separating out. First, Lambda — not Anthropic — holds the data centre lease, so Anthropic is buying capacity rather than taking on the real-estate obligation. Second, the site is being developed by Hut 8, one of several former bitcoin miners that converted power interconnects and shells into AI capacity. That conversion pipeline is now a meaningful share of new US supply.

This continues a pattern of Anthropic contracting across multiple suppliers rather than concentrating on one hyperscaler: it follows the [Micron infrastructure agreement](/news/micron-anthropic-ai-infrastructure-agreement/) in June and sits alongside its existing cloud relationships.

## How it compares

The same fortnight produced two very different compute structures:

- **Nvidia and OpenAI** ([18 August](/news/nvidia-openai-ohio-data-center-financing/)): Nvidia guarantees up to $105 billion of a third party's lease and power payments. Nvidia's exposure is contingent — it pays if OpenAI defaults.
- **Anthropic and Lambda** (31 August): Anthropic reportedly commits to $35 billion of purchases over six years. The exposure is Anthropic's own, and it is a firm commitment rather than a backstop.

The second is the more conventional arrangement, and the more legible one. A six-year purchase commitment is a liability that appears on Anthropic's own books and has to be covered by Claude revenue — relevant context given Anthropic's [confidential IPO filing](/news/openai-anthropic-ipo-filings-2026/) earlier in the year, where exactly this kind of long-dated obligation becomes a disclosure item.

## Why it matters for builders

**Neoclouds are now frontier-grade suppliers.** Lambda, CoreWeave, Crusoe, and Nebius were until recently a cheaper alternative for training runs you could not get on a hyperscaler. A frontier lab anchoring six years of capacity on one is a different signal. If you have been treating [neoclouds](/glossary/neocloud/) as second-tier, the assumption is out of date — see [GPU clouds and neoclouds](/comparisons/gpu-clouds-and-neoclouds/).

**Long-term contracts precede rate-limit relief, by years.** 350 MW that is being *developed* is not capacity you can call this quarter. Provider capacity constraints you feel today reflect deals signed well before this one.

**Watch the miner-to-AI conversion pipeline.** Hut 8's involvement is not incidental. Sites with existing grid interconnects are the scarce input, and companies holding them from the crypto era are converting them. That pipeline determines how fast US capacity actually arrives, more than chip supply does.

**Treat the number as reported, not confirmed.** Anthropic has not stated these terms publicly. In August alone, the Nvidia–OpenAI figure moved from a reported ~$250 billion to a filed $105 billion. Reported deal values in this market are estimates until a filing or a company statement pins them.

## Sources

1. Bloomberg, "Anthropic Strikes $35 Billion Cloud Deal With Nvidia-Backed Lambda" (31 August 2026): [https://www.bloomberg.com/news/articles/2026-08-31/anthropic-seals-35-billion-cloud-deal-with-nvidia-backed-lambda](https://www.bloomberg.com/news/articles/2026-08-31/anthropic-seals-35-billion-cloud-deal-with-nvidia-backed-lambda)
2. Reuters via Yahoo Finance, "Anthropic signs $35 billion Lambda cloud deal: WSJ": [https://finance.yahoo.com/technology/ai/articles/anthropic-signs-35-billion-lambda-144113886.html](https://finance.yahoo.com/technology/ai/articles/anthropic-signs-35-billion-lambda-144113886.html)
3. Investing.com, "Anthropic signs $35 billion cloud deal with Nvidia-backed Lambda": [https://www.investing.com/news/stock-market-news/anthropic-signs-35-billion-cloud-deal-with-nvidiabacked-lambda-source-says-4883414](https://www.investing.com/news/stock-market-news/anthropic-signs-35-billion-cloud-deal-with-nvidiabacked-lambda-source-says-4883414)
4. Benzinga, "Anthropic Signs $35 Billion Cloud Agreement With Nvidia-Backed Lambda": [https://www.benzinga.com/markets/tech/26/08/61538775/anthropic-35-billion-lambda-nvidia-cloud-agreement-lease](https://www.benzinga.com/markets/tech/26/08/61538775/anthropic-35-billion-lambda-nvidia-cloud-agreement-lease)
5. Anthropic newsroom (no company statement on this agreement as of 2 September 2026): [https://www.anthropic.com/news](https://www.anthropic.com/news)

## Further reading

- [Nvidia backstops $105B of OpenAI's Ohio data centre](/news/nvidia-openai-ohio-data-center-financing/): the contrasting structure, same fortnight.
- [Micron and Anthropic sign a strategic AI infrastructure agreement](/news/micron-anthropic-ai-infrastructure-agreement/): the earlier supply deal.
- [GPU clouds and neoclouds](/comparisons/gpu-clouds-and-neoclouds/): who the alternatives are and how they price.
- [OpenAI and Anthropic file confidential IPO paperwork](/news/openai-anthropic-ipo-filings-2026/): why long-dated commitments now carry disclosure weight.
- [Lambda Cloud](/tools/lambda-cloud/): the platform itself.
