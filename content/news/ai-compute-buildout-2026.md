---
title: "The 2026 AI Compute Buildout: OpenAI's $122B, Gigawatt Deals, and Vera Rubin"
description: "The first half of 2026 saw record AI capital and compute commitments: OpenAI's $122 billion round, multi-gigawatt data-center deals, and NVIDIA's Vera Rubin platform entering production."
date: 2026-06-04
lastmod: 2026-07-13
last_updated: 2026-07-13
categories: [News]
tags: [ai-infrastructure, funding, compute, nvidia, data-centers, gpu]
related:
  - news/anthropic-series-h
  - news/nvidia-nemotron-3
  - comparisons/gpu-clouds-and-neoclouds
---

Through the first half of 2026 the money and hardware behind AI reached a scale that reshapes who can compete. OpenAI closed a round it describes as $122 billion in committed capital, hyperscalers and labs signed multi-gigawatt data-center deals, and NVIDIA moved its next-generation Vera Rubin platform into production. The common thread is compute: frontier AI now runs on capital commitments that only a handful of companies can make.

## What happened

On the capital side, OpenAI states it closed its latest round with $122 billion in committed capital at an $852 billion post-money valuation, co-led by SoftBank with a16z, D. E. Shaw, MGX, and TPG, and says it is generating around $2 billion in revenue per month. (OpenAI's site blocks automated retrieval; these figures are quoted from OpenAI's own announcement.) [Anthropic raised $65 billion at a $965 billion valuation](/news/anthropic-series-h/) the same period, and Databricks completed roughly $5 billion of equity at a $134 billion valuation on 9 February 2026.

The compute deals were as large as the raises. CoreWeave and Meta expanded an AI-cloud agreement to about $21 billion through December 2032 (9 April 2026). NVIDIA took equity stakes in its own cloud customers, including $2 billion in Nebius (11 March) and a share right of up to $2.1 billion in IREN (7 May), a pattern that has drawn scrutiny as circular financing. On hardware, NVIDIA launched the seven-chip Vera Rubin platform at GTC on 16 March and reported it ramping into full production by 31 May; AMD and Meta agreed to deploy 6 gigawatts of AMD GPUs (24 February); and SK hynix shipped first 12-layer HBM4E memory samples on 18 June.

## Why it matters for builders

You do not need a gigawatt data center to build on AI, but the buildout shapes what you build on. Three effects matter. First, capacity: the gigawatt deals are why frontier APIs can serve the traffic they do, and why new capacity keeps arriving. Second, concentration: when training a frontier model requires tens of billions in compute, the number of organizations that can do it stays small, which is why open-weight releases (like [NVIDIA's Nemotron 3](/news/nvidia-nemotron-3/)) matter for everyone else. Third, cost trajectory: new memory (HBM4E) and new silicon (Vera Rubin) are aimed squarely at the long-context agentic workloads that are getting expensive to serve.

For where to actually rent this compute, see the [GPU clouds and neoclouds comparison](/comparisons/gpu-clouds-and-neoclouds/). The practical takeaway: the infrastructure is being built for agentic, long-context AI, so design for that direction.

## Sources

- OpenAI, "Accelerating the next phase of AI" ($122B committed capital): https://openai.com/index/accelerating-the-next-phase-ai/
- CoreWeave, "CoreWeave and Meta announce $21 billion expanded AI infrastructure agreement" (9 April 2026): https://www.coreweave.com/news/coreweave-and-meta-announce-21-billion-expanded-ai-infrastructure-agreement
- NVIDIA, "NVIDIA Vera Rubin platform" (GTC 2026, 16 March 2026): https://nvidianews.nvidia.com/news/nvidia-vera-rubin-platform
- AMD, "AMD and Meta announce expanded strategic partnership" (24 February 2026): https://www.amd.com/en/newsroom/press-releases/2026-2-24-amd-and-meta-announce-expanded-strategic-partnersh.html
- SK hynix, "12-layer HBM4E sample" (18 June 2026): https://news.skhynix.com/12-layer-hbm4e-sample/
- Databricks newsroom (9 February 2026): https://www.databricks.com/company/newsroom/press-releases/databricks-grows-65-yoy-surpasses-5-4-billion-revenue-run-rate

## Further reading

- [Anthropic raises $65B at a $965B valuation](/news/anthropic-series-h/): the other record raise of the period.
- [NVIDIA Nemotron 3 open models](/news/nvidia-nemotron-3/): why open weights matter when compute concentrates.
- [GPU clouds and neoclouds compared](/comparisons/gpu-clouds-and-neoclouds/): where to rent the compute this buildout creates.
