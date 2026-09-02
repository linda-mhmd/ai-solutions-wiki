---
title: "Nvidia Backstops $105B of OpenAI's Ohio Data Centre — $145B Less Than Reported"
description: "Nvidia disclosed a capped $105 billion aggregate payment obligation supporting an 8 GW OpenAI campus in Pike County, Ohio. The structure is a guarantee, not a purchase, and the final number came in far below July's reported $250 billion."
date: 2026-08-18
lastmod: 2026-09-02
last_updated: 2026-09-02
categories: [News]
tags: [nvidia, openai, ai-infrastructure, data-centers, compute, financing]
related:
  - news/ai-compute-buildout-2026
  - news/ai-infrastructure-bubble-concerns-2026
  - glossary/ai-factory
  - guides/scaling-ai-infrastructure
---

On **18 August 2026** Nvidia disclosed, in an SEC filing accompanying the partnership announcement, an **aggregate payment obligation capped at $105 billion** supporting a new OpenAI data centre campus in Pike County, Ohio. Two details matter more than the headline number: the figure landed roughly **$145 billion below** what was reported as under consideration in July, and Nvidia is not buying the campus — it is guaranteeing someone else's payments on it.

## What happened

The site is a former Department of Energy uranium-enrichment facility in Pike County, Ohio. The developer is **SB Energy**, the SoftBank-backed infrastructure company. OpenAI takes a lease of up to **20 years**.

Nvidia's role is a credit backstop. It guarantees certain lease and power payments and protects the value of the infrastructure in the event OpenAI defaults. Reporting on the filing characterises this as substantially reducing Nvidia's direct financial exposure relative to an equity or purchase commitment. Nvidia is separately investing **$1.5 billion in SB Energy**, and will be the exclusive chip provider for the campus's initial phase.

The physical plan:

| | |
|---|---|
| First tranche online | **800 MW**, expected 2028 |
| Ultimate campus capacity | **8 GW** |
| Planned on-site generation | ~**9.2 GW** of natural gas |
| Lease term | up to **20 years** |

The number moved in public. Reporting in July put roughly **$250 billion** under consideration; by 14 August the figure discussed was under $120 billion; the signed deal capped Nvidia's obligation at **$105 billion**.

## Why the structure is the story

A guarantee is not a purchase order. Nvidia is not paying $105 billion for compute; it is promising to make someone whole up to $105 billion if OpenAI stops paying. The capital that builds the campus comes from SB Energy and its lenders, who are lending against Nvidia's credit rather than OpenAI's.

That structure is the reason the number is scrutinised. It is the clearest instance yet of the circularity that has worried analysts through 2026: the chip vendor underwrites the customer's ability to buy the chips, which converts vendor credit into demand that appears, in aggregate revenue figures, to be independent. Reuters noted alongside the deal that investor anxiety has shifted to "enormous capital expenditures, rising debt and uncertainty over when that spending will generate returns."

The downward revision cuts both ways. Read charitably, it is discipline: a deal negotiated to a defensible size rather than a headline. Read sceptically, it is the market repricing a number that was floated when sentiment was warmer. Both readings are consistent with the facts on record.

Note also the electricity. **9.2 GW of planned natural-gas generation** for a single campus is a power project with a data centre attached, not the reverse — and it is a fossil build-out, which sits awkwardly against most of the operators' own climate commitments.

## Why it matters for builders

You are not signing gigawatt leases, but three things follow for anyone budgeting AI capacity.

**Capacity you can buy in 2026 was contracted in 2024.** The first 800 MW here lands in **2028**. Frontier training and inference capacity is a multi-year pipeline, and the reason your provider's rate limits move the way they do is upstream of any conversation you can have with your account team.

**Price stability is now a financing question.** When inference pricing is set by vendors carrying long-dated, leveraged capacity commitments, per-token prices are not simply a function of model efficiency. Both directions of the August price moves — Google's expiring introductory rate on [Gemini 3.7 Flash](/news/gemini-3-7-flash/), Anthropic making [Sonnet 5's introductory price permanent](/news/claude-sonnet-5-pricing-permanent/) — are competitive decisions taken against these balance sheets. Budget with headroom and see [FinOps for AI](/guides/finops-for-ai/).

**Concentration risk is structural, not hypothetical.** One vendor's credit now sits underneath a meaningful share of frontier compute. That is an argument for keeping a [multi-provider failover path](/patterns/multi-provider-llm-failover/) genuinely exercised rather than merely documented.

## Sources

1. CNBC, "Nvidia backing $105 billion in financing for OpenAI data center" (17 August 2026): [https://www.cnbc.com/2026/08/17/nvidia-financing-open-ai-data-center-ohio.html](https://www.cnbc.com/2026/08/17/nvidia-financing-open-ai-data-center-ohio.html)
2. Fortune, "OpenAI data center deal with Nvidia comes in $145 billion lower than reported" (18 August 2026): [https://fortune.com/2026/08/18/openai-data-center-deal-with-nvidia-comes-in-145-billion-lower-than-reportedsignaling-concerns-of-artificial-demand-for-chips/](https://fortune.com/2026/08/18/openai-data-center-deal-with-nvidia-comes-in-145-billion-lower-than-reportedsignaling-concerns-of-artificial-demand-for-chips/)
3. TechCrunch, "The billion-dollar infrastructure deals powering the AI boom": [https://techcrunch.com/2026/02/28/billion-dollar-infrastructure-deals-ai-boom-data-centers-openai-oracle-nvidia-microsoft-google-meta/](https://techcrunch.com/2026/02/28/billion-dollar-infrastructure-deals-ai-boom-data-centers-openai-oracle-nvidia-microsoft-google-meta/)
4. J.P. Morgan, "Financing AI infrastructure and U.S. data centers": [https://www.jpmorgan.com/insights/banking/capital-markets/financing-ai-infrastructure-data-centers](https://www.jpmorgan.com/insights/banking/capital-markets/financing-ai-infrastructure-data-centers)
5. Nvidia investor relations and SEC filings: [https://investor.nvidia.com/financial-info/sec-filings/](https://investor.nvidia.com/financial-info/sec-filings/)

## Further reading

- [The 2026 AI compute buildout](/news/ai-compute-buildout-2026/): the wider pipeline this fits into.
- [AI infrastructure bubble concerns](/news/ai-infrastructure-bubble-concerns-2026/): the circular-financing argument in full.
- [Anthropic's $35B Lambda agreement](/news/anthropic-lambda-cloud-agreement/): the same week, a different structure.
- [Scaling AI infrastructure](/guides/scaling-ai-infrastructure/): what capacity planning looks like downstream of this.
- [GPU clouds and neoclouds](/comparisons/gpu-clouds-and-neoclouds/): who actually operates the capacity.
