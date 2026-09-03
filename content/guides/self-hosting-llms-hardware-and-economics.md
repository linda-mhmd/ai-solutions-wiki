---
title: "Self-Hosting LLMs: Hardware and Economics"
description: "The full hardware ladder for running your own models, worked VRAM and KV-cache sizing math at multiple precisions, and a transparent cost comparison against consumer AI subscriptions at different utilization levels."
date: 2026-09-03
lastmod: 2026-09-03
last_updated: 2026-09-03
categories: [Guides]
tags: ["self-hosting", "llm-inference", "gpu-hardware", "vram", "quantization", "kv-cache", "cost-optimization"]
related:
  - guides/llm-cost-optimization
  - guides/gpu-scheduling-for-ai
  - comparisons/on-premise-vs-cloud-ai
  - comparisons/gpu-clouds-and-neoclouds
  - comparisons/managed-vs-reserved-vs-self-hosted-inference
  - glossary/quantization
  - glossary/hardware-constraints
---

Self-hosting an LLM is not a hardware decision first. It is a utilization bet. The same GPU running the same model can cost you 25 to 75 times more or less per million tokens depending entirely on how busy it is — and a GPU that sits mostly idle, which describes most individual and small-team self-hosting setups, almost never beats a flat monthly subscription on raw token economics. This page works through the actual numbers: how much memory a model needs at each precision, why context length blows that budget up further than people expect, what the hardware options cost at each rung of the ladder, and what a million self-hosted tokens really costs compared to the consumer AI subscriptions this wiki already prices out.

## The hardware ladder

Four rungs cover almost every self-hosting decision, from a single consumer card to renting whatever a cloud provider has in stock. Capability, cost, and commitment all rise together.

<figure>
<svg viewBox="0 0 930 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ladder-title">
  <title id="ladder-title">Four hardware tiers for self-hosting LLMs, from a single consumer GPU to rented cloud capacity</title>
  <defs>
    <marker id="arrowhead" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="currentColor"></path>
    </marker>
  </defs>

  <rect x="20" y="25" width="200" height="150" rx="8" fill="none" stroke="currentColor" stroke-width="1.5"></rect>
  <text x="120" y="52" text-anchor="middle" font-size="13" font-weight="bold" fill="currentColor">Consumer GPU</text>
  <text x="120" y="74" text-anchor="middle" font-size="11" fill="currentColor">RTX 4090 · RTX 5090</text>
  <text x="120" y="112" text-anchor="middle" font-size="12" fill="currentColor">24–32 GB VRAM</text>
  <text x="120" y="134" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.85">~$1.6k–$4.6k, one card</text>

  <rect x="250" y="25" width="200" height="150" rx="8" fill="none" stroke="currentColor" stroke-width="1.5"></rect>
  <text x="350" y="52" text-anchor="middle" font-size="13" font-weight="bold" fill="currentColor">Prosumer / workstation</text>
  <text x="350" y="74" text-anchor="middle" font-size="11" fill="currentColor">RTX 6000 Ada · A6000</text>
  <text x="350" y="90" text-anchor="middle" font-size="11" fill="currentColor">Mac Studio (unified mem.)</text>
  <text x="350" y="112" text-anchor="middle" font-size="11" fill="currentColor">48 GB–512 GB* memory</text>
  <text x="350" y="134" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.85">~$4.6k–$18k+</text>

  <rect x="480" y="25" width="200" height="150" rx="8" fill="none" stroke="currentColor" stroke-width="1.5"></rect>
  <text x="580" y="52" text-anchor="middle" font-size="13" font-weight="bold" fill="currentColor">Single-node server</text>
  <text x="580" y="74" text-anchor="middle" font-size="11" fill="currentColor">8× A100 80GB or</text>
  <text x="580" y="90" text-anchor="middle" font-size="11" fill="currentColor">8× H100 80GB</text>
  <text x="580" y="112" text-anchor="middle" font-size="12" fill="currentColor">640 GB pooled VRAM</text>
  <text x="580" y="134" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.85">~$150k–$450k+</text>

  <rect x="710" y="25" width="200" height="150" rx="8" fill="none" stroke="currentColor" stroke-width="1.5"></rect>
  <text x="810" y="52" text-anchor="middle" font-size="13" font-weight="bold" fill="currentColor">Rented cloud GPU</text>
  <text x="810" y="74" text-anchor="middle" font-size="11" fill="currentColor">RunPod · Vast.ai · Lambda</text>
  <text x="810" y="90" text-anchor="middle" font-size="11" fill="currentColor">Nebius · CoreWeave · Crusoe</text>
  <text x="810" y="112" text-anchor="middle" font-size="12" fill="currentColor">Whatever they have in stock</text>
  <text x="810" y="134" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.85">~$0.30–$4.30+ / GPU-hr</text>

  <line x1="120" y1="175" x2="120" y2="205" stroke="currentColor" stroke-width="1"></line>
  <line x1="350" y1="175" x2="350" y2="205" stroke="currentColor" stroke-width="1"></line>
  <line x1="580" y1="175" x2="580" y2="205" stroke="currentColor" stroke-width="1"></line>
  <line x1="810" y1="175" x2="810" y2="205" stroke="currentColor" stroke-width="1"></line>
  <line x1="20" y1="205" x2="910" y2="205" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrowhead)"></line>
  <text x="465" y="230" text-anchor="middle" font-size="12" fill="currentColor">Rising VRAM, rising cost, rising commitment</text>
</svg>
<figcaption>*The Mac Studio's memory is unified system RAM, not dedicated GPU VRAM, and carries far less memory bandwidth than a datacenter GPU — see the unified-memory note below.</figcaption>
</figure>

### Tier 1: consumer GPU

The RTX 4090 (24 GB GDDR6X) and RTX 5090 (32 GB GDDR7, 1.79 TB/s bandwidth) are the current top of NVIDIA's gaming line and the default entry point for local LLM work. The RTX 5090 launched at a $1,999 MSRP in January 2025; NVIDIA production of the RTX 4090 ended in late 2024, and both cards have traded well above their original list prices through 2026 on constrained supply and AI demand, with the RTX 5090 frequently listed above $2,500 and sometimes above $4,500 at retail.[^5090price][^4090price] A single card in this tier comfortably runs 7B–13B models at INT4 or INT8, and 34B at INT4 with careful memory management.

### Tier 2: prosumer / workstation

The RTX 6000 Ada Generation (48 GB GDDR6, $7,350 at launch) and its Ampere predecessor the RTX A6000 (48 GB, roughly $4,650 new) are workstation cards built for exactly this: enough VRAM in one slot to hold a 34B model at FP16 or a 70B model at INT4 with room for a KV cache.[^6000ada][^a6000]

Apple's Mac Studio is a fundamentally different machine, not a discrete GPU, and it belongs on this rung for a different reason: unified memory. The CPU, GPU, and Neural Engine share one memory pool, so a model's weights sit in a single address space instead of being split across VRAM and system RAM. As of the M5 Ultra refresh announced by Apple on August 25, 2026, that pool scales up to 512 GB, with the base M5 Ultra Mac Studio starting at $5,499 and a currently orderable maximum configuration (256 GB memory, 16 TB storage) at $18,299; the 512 GB configuration was announced but not yet priced at the time of writing, with Apple stating only that it ships "in late October" 2026.[^macstudio] The tradeoff is bandwidth: M5 Ultra's unified memory runs at 1.2 TB/s, against 3.35 TB/s on an H100 and roughly 2 TB/s on an A100.[^m5ultra][^h100spec][^a100spec] A Mac Studio can hold a model no single GPU in this tier can fit — but token generation is memory-bandwidth-bound, so it will generate those tokens more slowly than a card with a fraction of the capacity and several times the bandwidth. It is the right answer when the question is "can this fit at all," not "how fast can this serve concurrent users."

### Tier 3: single-node on-prem server

An 8-GPU server pools VRAM across cards over NVLink or a similar fast interconnect, giving 640 GB of usable VRAM in an 80 GB×8 configuration — enough for the largest open-weight models at full precision. NVIDIA does not publish list prices for these systems; market estimates place a full 8× A100 80GB DGX-class system at roughly $150,000–$200,000, and an 8× H100 80GB system (DGX-class or third-party HGX build) at roughly $250,000–$450,000, varying with networking, storage, and support contract.[^a100server][^h100server] Add facilities: GPU servers in this class draw 2–5 kW and annual power-and-cooling can run 20–30% of the hardware cost.[^onprem] This tier is a multi-year capital commitment, not a purchase you make to test an idea.

### Tier 4: rented cloud GPU

Renting sidesteps the capital outlay and the 3–4 year refresh cycle entirely — you pay only for the hours you use, on hardware someone else maintains. [RunPod](/tools/runpod/) and [Vast.ai](/tools/vast-ai/) run marketplace-style pricing that gets an RTX 4090 down to roughly $0.29–$0.74/GPU-hour and an H100 SXM to roughly $2.69–$3.29/GPU-hour depending on reliability tier.[^runpod][^vastai] [Lambda](/tools/lambda-cloud/) prices on-demand H100 SXM at $3.99–$4.29/GPU-hour depending on cluster size (cheaper per-GPU in an 8-GPU instance than a single-GPU one), with A100 80GB — sold only as an 8-GPU instance — at $2.79/GPU-hour.[^lambda] [Nebius](/tools/nebius/), [CoreWeave](/tools/coreweave/), [Crusoe](/tools/crusoe/), and [Paperspace](/tools/paperspace/) round out the field with their own mixes of managed platform, top-tier reliability, energy-optimized fleets, and notebook-first tooling respectively — see [GPU clouds and neoclouds compared](/comparisons/gpu-clouds-and-neoclouds/) for how they differ. This tier is where the utilization argument later on this page matters most, because rental cost scales with hours used automatically — there is no idle fixed cost to amortize, which is precisely the opposite failure mode from owned hardware.

## Sizing VRAM: the formula, worked

**Weights.** VRAM for weights follows one formula: parameters (billions) × bytes-per-parameter. FP16/BF16 uses 2 bytes/parameter, INT8 uses 1, INT4 uses 0.5.

```
VRAM (GB) = params (billions) × bytes-per-parameter
```

| Model size | FP16 (×2) | INT8 (×1) | INT4 (×0.5) |
|---|---|---|---|
| 7B | 7 × 2 = **14 GB** | 7 × 1 = **7 GB** | 7 × 0.5 = **3.5 GB** |
| 13B | 13 × 2 = **26 GB** | 13 × 1 = **13 GB** | 13 × 0.5 = **6.5 GB** |
| 34B | 34 × 2 = **68 GB** | 34 × 1 = **34 GB** | 34 × 0.5 = **17 GB** |
| 70B | 70 × 2 = **140 GB** | 70 × 1 = **70 GB** | 70 × 0.5 = **35 GB** |

That is weights only. Add 15–40% on top for KV cache, activations, and runtime/framework overhead — presenting the weight-only number as "what you need" is the single most common sizing mistake. Applying that range to the table above:

| Model size | FP16 realistic | INT8 realistic | INT4 realistic |
|---|---|---|---|
| 7B | 16.1–19.6 GB | 8.1–9.8 GB | 4.0–4.9 GB |
| 13B | 29.9–36.4 GB | 15.0–18.2 GB | 7.5–9.1 GB |
| 34B | 78.2–95.2 GB | 39.1–47.6 GB | 19.6–23.8 GB |
| 70B | 161–196 GB | 80.5–98 GB | 40.3–49 GB |

Read straight off this table against the hardware ladder above: a 24–32 GB consumer card fits 7B at any precision and 13B at INT8/INT4. A 48 GB workstation card comfortably fits 34B at INT8 (39.1–47.6 GB) across the whole overhead range, but 70B at INT4 (40.3–49 GB) only fits at the low end of that range — meaning a short context window. Push the context out and 70B INT4 spills past 48 GB, which is exactly the KV-cache effect covered next.

### The KV cache: why context length changes the math

The formula above sizes the model. It says nothing about the conversation. Every token generated keeps a key and value vector cached per layer, per attention head, so a long conversation or a large retrieved-document context adds memory on top of the weights, independent of model precision:

```
KV cache (bytes) = 2 × L × H_kv × d × T × bytes-per-element
  L      = number of transformer layers
  H_kv   = number of key/value heads
  d      = head dimension
  T      = sequence length (tokens)
  2      = one Key tensor + one Value tensor per token
```

The detail that trips people up is `H_kv`. Under plain multi-head attention it equals the model's total attention head count. But most current open-weight models use grouped-query attention (GQA), where several query heads share one key/value head specifically to shrink this cache — `H_kv` is then far smaller than the head count you'd read off the model card at a glance.[^gqa] Llama-3-70B is a working example: 80 layers, 64 query heads, but only **8** key/value heads, head dimension 128, published in its Hugging Face config.[^llama3config]

Worked at BF16 (2 bytes/element):

```
Per-token KV cache = 2 × 80 × 8 × 128 × 2 bytes = 327,680 bytes ≈ 0.31 MB/token

At 4,096-token context:   327,680 × 4,096   ≈ 1.25 GB   (one sequence)
At 128,000-token context: 327,680 × 128,000 ≈ 39.1 GB   (one sequence)
```

At a short context, the KV cache is a rounding error next to the weights. At a long context, it is not: one 128K-token sequence on Llama-3-70B needs about 39 GB of cache — more memory than the entire model's weights at INT4 (35 GB, from the table above), and that is *per concurrent sequence*, so a handful of simultaneous long-context requests can exceed the weight footprint several times over. And that 39 GB figure is the *reduced* number: had this model used plain multi-head attention instead of GQA (`H_kv` = 64 instead of 8), the same sequence would need roughly 313 GB, which is why GQA is now close to universal in production model architectures rather than an optional optimization. This is the concrete, verifiable version of "long-context serving needs meaningfully more memory than the weights alone" — run the arithmetic yourself against a model's own `config.json` before sizing hardware for a long-context deployment. See [GPU scheduling for AI](/guides/gpu-scheduling-for-ai/) for how serving engines like [vLLM](/tools/vllm/) manage this cache across concurrent requests via paged attention.

### The precision tradeoff is real, not free

INT8 quantization is close to a free lunch for most applications: a peer-reviewed evaluation of well-tuned INT8 weight-and-activation quantization (W8A8) found accuracy degradation of only 1–3% against the full-precision baseline across a broad benchmark suite.[^bf16death] INT4 is a different story once the task involves multi-step reasoning. The same body of work found INT4 weight-only quantization "more competitive than expected" on general benchmarks — but a separate study focused specifically on mathematical reasoning (GSM8K, MATH, AIME) found post-training INT4 quantization causing accuracy drops of up to **69.81%** in its harder evaluation settings, concentrated in procedural/execution errors rather than conceptual mistakes.[^quantreasoning] Treat INT4 as safe for retrieval, summarization, and classification-style workloads, and validate it explicitly — against your own evaluation set, not a general leaderboard — before shipping it on anything reasoning-heavy. See [Quantization](/glossary/quantization/) and [Hardware constraints for AI systems](/glossary/hardware-constraints/) for the underlying mechanics.

## The self-hosted cost model

Two cases need different arithmetic: hardware you own, where cost is fixed regardless of use, and hardware you rent, where cost scales with hours consumed automatically.

**Owned hardware.** The purchase price is sunk over the depreciation period whether or not the card is running. Spread it over calendar hours in that period, then divide by the fraction of hours actually spent generating tokens (utilization, `U`) to get the fixed-cost component per hour of actual use. Power is metered only while running.

```
$/hour-of-use = [ price / (years × 8,760 hours × U) ]  +  (TDP in kW × $/kWh)
```

**Rented hardware.** No amortization term — the provider already priced depreciation, power, and their margin into the hourly rate:

```
$/hour-of-use = rental $/GPU-hour
```

Either way, convert to a cost per million tokens with the model's sustained generation throughput:

```
$ per million tokens = ($/hour-of-use ÷ (tokens/second × 3,600)) × 1,000,000
```

### Worked example 1: an individual, owned GPU

Take an RTX 5090 bought at its $1,999 MSRP, depreciated over 3 years (26,280 hours) — the refresh cycle this wiki's on-premise comparison also uses for GPU hardware.[^onprem] TDP is 575 W (0.575 kW).[^5090price] Electricity at the June 2026 US average residential rate of 18.34¢/kWh gives a power cost of 0.575 kW × $0.1834/kWh ≈ $0.105/hour while running.[^eia] For throughput, published community benchmarks for an 8B-class model at 4-bit quantization on this GPU class cluster loosely around 100–150 single-stream tokens/second, varying widely by inference engine, context length, and exact quantization method; this example uses a conservative **100 tokens/second** — plug in your own measured number to refine it.[^rtxbench]

| Utilization (hours running, of the total 26,280) | Fixed HW cost / hr-of-use | + Power / hr-of-use | = Total $/hr-of-use | $/million tokens |
|---|---|---|---|---|
| 100% (runs continuously) | $0.076 | $0.105 | $0.181 | **$0.50** |
| 50% | $0.152 | $0.105 | $0.257 | **$0.72** |
| 20% | $0.380 | $0.105 | $0.485 | **$1.35** |
| 5% (a few hours/day) | $1.521 | $0.105 | $1.626 | **$4.52** |
| 1% (roughly an hour a day) | $7.607 | $0.105 | $7.712 | **$21.42** |

The fixed hardware cost does not change — the card cost $1,999 whether it ran once or continuously. What changes is how many tokens it generated during the period over which that cost is spread, so cost per token rises sharply as utilization falls. This is the same "does it run continuously or intermittently" logic this wiki uses for automation and on-premise-vs-cloud decisions generally; see [When automation pays for itself](/guides/when-automation-pays-for-itself/) and [On-premise vs cloud for AI workloads](/comparisons/on-premise-vs-cloud-ai/) for the general argument. What this table adds is the specific self-hosted-LLM numbers.

### Worked example 2: rented GPU at scale — utilization decides everything

Rent a single H100 SXM at a representative $3/GPU-hour (within the $2.69–$4.29 range quoted above) to serve a 70B-class model. Throughput here depends almost entirely on concurrency:

**Low concurrency (interactive, one request at a time).** Published single-stream benchmarks for a 70B model at INT4 (AWQ) on an A100/H100-class GPU cluster around 35–45 tokens/second.[^awqbench] At 40 tokens/second:

```
tokens/hour = 40 × 3,600 = 144,000
$/million tokens = ($3 ÷ 144,000) × 1,000,000 = $20.83
```

**High concurrency, continuous batching (many simultaneous requests, well-tuned serving).** A serving engine that batches many concurrent requests together — this is what [vLLM](/tools/vllm/) and similar engines exist to do — pushes far more tokens through the same GPU per hour. Batched, offline-style throughput benchmarks for a 70B model on a single H100 have been reported in the 1,000–3,000+ tokens/second range depending on precision and batch composition, including a widely reported MLPerf Inference v4.1 submission.[^mlperf] Taking that range:

```
At 1,000 tok/s:  ($3 ÷ 3,600,000) × 1,000,000 = $0.83/million tokens
At 3,000 tok/s:  ($3 ÷ 10,800,000) × 1,000,000 = $0.28/million tokens
```

Same GPU, same rental rate, same model class — a **25 to 75x swing** in cost per token, driven entirely by whether the serving stack keeps the GPU saturated with concurrent work. This is why [GPU scheduling](/guides/gpu-scheduling-for-ai/) and serving-engine choice ([vLLM](/tools/vllm/) vs. simpler runtimes like [Ollama](/tools/ollama/)) are cost decisions, not just performance decisions — see [Reducing LLM inference costs in production](/guides/llm-cost-optimization/) for the operational tactics that get you toward the batched end of that range.

## Self-hosted vs. consumer subscription: the actual numbers

This wiki's own pricing page puts Claude Pro at $20/month (monthly billing) or $17/month (annual), ChatGPT Plus at €23/month, and Google AI Pro at €21.99/month, as of June 2026 — flat fees with capped, unmetered usage rather than per-token billing.[^subpricing] Anthropic's current API rate for its mid-tier model (Claude Sonnet 5) is $2 input / $10 output per million tokens.[^anthropicpricing]

Take the owned-GPU numbers from worked example 1 and ask: at $20/month, how many self-hosted tokens does that buy at compute-only cost?

| Utilization | $/million tokens | Tokens $20 buys |
|---|---|---|
| 100% | $0.50 | ~40.0 million |
| 20% | $1.35 | ~14.8 million |
| 5% | $4.52 | ~4.4 million |
| 1% | $21.42 | ~0.9 million |

A human typing into a chat interface — even for hours a day — is not generating tens of millions of tokens a month; the workload this wiki's own subscription-pricing page uses as its "heavy automated" example totals about 25 million tokens across 10,000 API calls in a month.[^subpricing] An individual's GPU spends most of its calendar hours idle between prompts, which lands realistically in the 1–5% utilization band above, not 100%. **The honest conclusion: for an individual chatting with a model, self-hosting essentially never beats a $20/month subscription on pure token economics**, unless the hardware is already paid for and busy with something else (gaming, local image generation, other workloads), making the marginal cost of also serving your own chat close to zero. The reasons to self-host at this scale are real — data never leaves your machine, no rate limits, offline capability, full control over the exact model and its behavior — but none of them are "it's cheaper per token." See [AI subscription and pricing models in 2026](/comparisons/ai-subscription-pricing-2026/) for the full consumer-tier breakdown and [Managed vs. reserved vs. self-hosted inference](/comparisons/managed-vs-reserved-vs-self-hosted-inference/) for how this changes once you're serving other people, not just yourself.

The picture inverts for worked example 2's high-concurrency case: $0.28–$0.83 per million tokens undercuts Sonnet 5's $2–$10 API pricing by roughly 2x to 36x — but only at sustained, well-batched, high-concurrency utilization, which describes an operator serving many users through automated pipelines, not an individual's chat session. That is the same "continuous vs. intermittent" divide this wiki's automation-economics reasoning applies elsewhere, applied here specifically to self-hosted token generation: see [When automation pays for itself](/guides/when-automation-pays-for-itself/) for the general version of that argument and [LLM cost optimization](/guides/llm-cost-optimization/) for cutting the cost further on either side of it.

## What this math doesn't capture

Every number above is compute cost only. It excludes the engineer-hours to stand up and maintain a serving stack, on-call burden when a GPU node fails at 2am, security patching, redundancy for uptime, and the capability gap between the open-weight model you can run and the frontier proprietary model an API gives you access to for the same token price. A self-hosting decision that only pencils out on the compute-cost line and ignores these is incomplete — see [AI total cost of ownership](/guides/ai-total-cost-ownership/) for folding operational cost into the comparison properly.

## Sources

1. NVIDIA, "GeForce RTX 5090" product specifications: [https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5090/](https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5090/) — 32 GB GDDR7, 575W TDP, $1,999 MSRP, January 2025 launch.
2. VideoCardz, "GeForce RTX 5090 turns one, now costs nearly twice the MSRP": [https://videocardz.com/newz/geforce-rtx-5090-turns-one-now-costs-nearly-twice-the-msrp](https://videocardz.com/newz/geforce-rtx-5090-turns-one-now-costs-nearly-twice-the-msrp) — 2026 street pricing.
3. VideoCardz, "NVIDIA RTX 6000 (Ada) workstation GPU with 48GB memory is now available": [https://videocardz.com/newz/nvidia-rtx-6000-ada-workstation-gpu-with-48gb-memory-is-now-available-price-starts-at-7350](https://videocardz.com/newz/nvidia-rtx-6000-ada-workstation-gpu-with-48gb-memory-is-now-available-price-starts-at-7350) — RTX 6000 Ada MSRP.
4. Thunder Compute, "NVIDIA RTX A6000 Pricing (August 2026)": [https://www.thundercompute.com/blog/nvidia-rtx-a6000-pricing](https://www.thundercompute.com/blog/nvidia-rtx-a6000-pricing) — RTX A6000 hardware and rental pricing.
5. Apple Newsroom, "Apple introduces new Mac Studio with M5 Max and M5 Ultra" (August 25, 2026): [https://www.apple.com/newsroom/2026/08/apple-introduces-new-mac-studio-with-m5-max-and-m5-ultra/](https://www.apple.com/newsroom/2026/08/apple-introduces-new-mac-studio-with-m5-max-and-m5-ultra/) — official max unified memory (512 GB), memory bandwidth (1.2 TB/s), and base pricing ($5,499).
6. MacRumors, "Mac Studio With M5 Ultra Chip and 512GB of RAM Launching in October": [https://www.macrumors.com/2026/08/25/mac-studio-m5-ultra-512gb-ram-october/](https://www.macrumors.com/2026/08/25/mac-studio-m5-ultra-512gb-ram-october/) — 512GB configuration delayed, price unannounced.
7. AppleInsider, "You can spend $18,299 on a Mac Studio today, or more in October": [https://appleinsider.com/articles/26/08/25/you-can-spend-18299-on-a-mac-studio-today-or-more-in-october](https://appleinsider.com/articles/26/08/25/you-can-spend-18299-on-a-mac-studio-today-or-more-in-october) — current maximum orderable configuration and price.
8. NVIDIA, "NVIDIA H100 Tensor Core GPU" datasheet (via reseller/comparison aggregation of NVIDIA-published specs): 80 GB HBM3, 3.35 TB/s memory bandwidth.
9. NVIDIA, "NVIDIA A100 Tensor Core GPU" datasheet (via reseller/comparison aggregation of NVIDIA-published specs): 80 GB HBM2e, ~2 TB/s memory bandwidth.
10. U.S. Energy Information Administration, Electric Power Monthly, Table 5.6.A: [https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_6_a](https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_6_a) — U.S. average residential (18.34¢/kWh) and commercial (14.19¢/kWh) retail electricity prices, June 2026 data, published August 26, 2026.
11. Ainslie, J., Lee-Thorp, J., de Jong, M., Zemlyanskiy, Y., Lebrón, F., & Sanghai, S., "GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints," arXiv:2305.13245: [https://arxiv.org/abs/2305.13245](https://arxiv.org/abs/2305.13245)
12. NousResearch/Meta-Llama-3-70B-Instruct, `config.json` on Hugging Face: [https://huggingface.co/NousResearch/Meta-Llama-3-70B-Instruct/blob/main/config.json](https://huggingface.co/NousResearch/Meta-Llama-3-70B-Instruct/blob/main/config.json) — 80 layers, 64 attention heads, 8 key/value heads (GQA), head dimension 128.
13. Kurtic, E., Marques, A., Pandit, S., Kurtz, M., & Alistarh, D., "'Give Me BF16 or Give Me Death'? Accuracy-Performance Trade-Offs in LLM Quantization," ACL 2025, arXiv:2411.02355: [https://arxiv.org/abs/2411.02355](https://arxiv.org/abs/2411.02355)
14. Li, Z., Su, Y., Wang, S., Yang, R., Xie, C., Liu, A., Li, M., Cao, J., Xie, Y., Wong, N., & Yang, H., "Quantization Meets Reasoning: Exploring and Mitigating Degradation of Low-Bit LLMs in Mathematical Reasoning," arXiv:2505.11574: [https://arxiv.org/abs/2505.11574](https://arxiv.org/abs/2505.11574)
15. RunPod, "H100 SXM GPU Rental" and "RTX 4090 GPU Rental": [https://www.runpod.io/gpu-models/h100-sxm](https://www.runpod.io/gpu-models/h100-sxm), [https://www.runpod.io/gpu-models/rtx-4090](https://www.runpod.io/gpu-models/rtx-4090) — Community/Secure Cloud hourly rates.
16. Vast.ai marketplace pricing aggregation, 2026 — RTX 4090 typical on-demand range.
17. Lambda, Cloud GPU pricing pages — H100 SXM and A100 80GB hourly rates, 2026.
18. vLLM Blog, "vLLM v0.6.0: 2.7x Throughput Improvement and 5x Latency Reduction": [https://vllm.ai/blog/2024-09-05-perf-update](https://vllm.ai/blog/2024-09-05-perf-update) — continuous-batching throughput gains from serving-engine improvements alone.
19. NVIDIA, MLPerf Inference v4.1 submission coverage (blogs.nvidia.com and independent MLPerf reporting) — H100 Llama-2-70B offline batched throughput benchmark.
20. This wiki, "AI subscription and pricing models in 2026": [/comparisons/ai-subscription-pricing-2026/](/comparisons/ai-subscription-pricing-2026/) — consumer subscription tier pricing baseline, June 2026.
21. Anthropic, API pricing: [https://platform.claude.com/docs/en/docs/about-claude/pricing](https://platform.claude.com/docs/en/docs/about-claude/pricing) — Claude Sonnet 5 at $2/$10 per million input/output tokens.
22. This wiki, "On-premise vs cloud for AI workloads": [/comparisons/on-premise-vs-cloud-ai/](/comparisons/on-premise-vs-cloud-ai/) — on-prem hardware cost ranges and 3–4 year refresh cycle.

[^5090price]: NVIDIA, [GeForce RTX 5090 specifications](https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5090/) — 32GB GDDR7, 575W, $1,999 MSRP. Street pricing per [VideoCardz](https://videocardz.com/newz/geforce-rtx-5090-turns-one-now-costs-nearly-twice-the-msrp).
[^4090price]: RTX 4090 production ended in late 2024 per public reporting; 2026 street prices commonly $1,800–$3,500+, in the same constrained-supply environment covered by [VideoCardz's RTX 5090 pricing report](https://videocardz.com/newz/geforce-rtx-5090-turns-one-now-costs-nearly-twice-the-msrp).
[^6000ada]: [VideoCardz, NVIDIA RTX 6000 (Ada) workstation GPU now available, price starts at $7,350](https://videocardz.com/newz/nvidia-rtx-6000-ada-workstation-gpu-with-48gb-memory-is-now-available-price-starts-at-7350).
[^a6000]: [Thunder Compute, NVIDIA RTX A6000 Pricing (August 2026)](https://www.thundercompute.com/blog/nvidia-rtx-a6000-pricing).
[^macstudio]: [Apple Newsroom, Apple introduces new Mac Studio with M5 Max and M5 Ultra (Aug 25, 2026)](https://www.apple.com/newsroom/2026/08/apple-introduces-new-mac-studio-with-m5-max-and-m5-ultra/); [AppleInsider, current $18,299 maximum configuration](https://appleinsider.com/articles/26/08/25/you-can-spend-18299-on-a-mac-studio-today-or-more-in-october); [MacRumors, 512GB configuration delayed to October, price unannounced](https://www.macrumors.com/2026/08/25/mac-studio-m5-ultra-512gb-ram-october/).
[^m5ultra]: [Apple Newsroom, Apple introduces new Mac Studio with M5 Max and M5 Ultra](https://www.apple.com/newsroom/2026/08/apple-introduces-new-mac-studio-with-m5-max-and-m5-ultra/) — 512GB max unified memory, 1.2TB/s bandwidth.
[^h100spec]: NVIDIA H100 Tensor Core GPU datasheet — 80GB HBM3, 3.35TB/s memory bandwidth (publicly documented NVIDIA spec).
[^a100spec]: NVIDIA A100 Tensor Core GPU datasheet — 80GB HBM2e, ~2TB/s memory bandwidth (publicly documented NVIDIA spec).
[^onprem]: This wiki, [On-premise vs cloud for AI workloads](/comparisons/on-premise-vs-cloud-ai/) — 3–4 year GPU refresh cycle, 2–5kW server power draw, 20–30% annual power/cooling cost.
[^a100server]: This wiki, [On-premise vs cloud for AI workloads](/comparisons/on-premise-vs-cloud-ai/) — ~$150,000–$200,000 for an 8× A100 80GB DGX-class system.
[^h100server]: Market/integrator estimates for 8× H100 80GB systems, 2026, e.g. reporting summarized via [Mercatus AI](https://www.mercatus-ai.com/blog/h100-server-price) and prior public reporting on DGX H100 pricing (e.g. a [2023 Hacker News discussion](https://news.ycombinator.com/item?id=36133665) noting mid-$300k street pricing); NVIDIA does not publish an official list price for DGX-class systems, so treat this as a market estimate, not a vendor quote.
[^runpod]: [RunPod, H100 SXM GPU Rental](https://www.runpod.io/gpu-models/h100-sxm) and [RTX 4090 GPU Rental](https://www.runpod.io/gpu-models/rtx-4090) — Community/Secure Cloud hourly rates, 2026.
[^vastai]: Vast.ai marketplace pricing, 2026 — RTX 4090 typically $0.29–$0.59/hr on-demand across independent hosts.
[^lambda]: [Lambda Cloud GPU pricing](https://lambda.ai/service/gpu-cloud), 2026 — on-demand H100 SXM $3.99/GPU-hr (8x instance) to $4.29/GPU-hr (1x instance); A100 80GB SXM $2.79/GPU-hr, sold only as an 8-GPU instance.
[^eia]: U.S. Energy Information Administration, [Electric Power Monthly, Table 5.6.A](https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_6_a) — U.S. average residential rate 18.34¢/kWh, commercial rate 14.19¢/kWh, June 2026 data.
[^rtxbench]: Community benchmark aggregation for 8B-class models at 4-bit quantization on RTX 40/50-series GPUs, 2026; figures vary by inference engine, context length, and quantization method and are not from one single controlled study — treat as illustrative, not a guaranteed number.
[^gqa]: Ainslie, J. et al., ["GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints," arXiv:2305.13245](https://arxiv.org/abs/2305.13245).
[^llama3config]: [NousResearch/Meta-Llama-3-70B-Instruct, config.json](https://huggingface.co/NousResearch/Meta-Llama-3-70B-Instruct/blob/main/config.json) — 80 hidden layers, 64 attention heads, 8 key/value heads, head dimension 128.
[^bf16death]: Kurtic, E. et al., ["Give Me BF16 or Give Me Death"? Accuracy-Performance Trade-Offs in LLM Quantization, ACL 2025, arXiv:2411.02355](https://arxiv.org/abs/2411.02355) — well-tuned INT8 (W8A8) shows 1–3% accuracy degradation; INT4 weight-only is "more competitive than expected" on general benchmarks.
[^quantreasoning]: Li, Z. et al., ["Quantization Meets Reasoning: Exploring and Mitigating Degradation of Low-Bit LLMs in Mathematical Reasoning," arXiv:2505.11574](https://arxiv.org/abs/2505.11574) — post-training INT4 quantization (AWQ/GPTQ/SmoothQuant) causes accuracy drops up to 69.81% in harder GSM8K/MATH/AIME settings on 0.5B–7B models.
[^awqbench]: Community AWQ/vLLM benchmark aggregation for 70B-class models at INT4, single-stream (batch=1) on A100/H100-class GPUs, 2026; illustrative, not from one controlled study.
[^mlperf]: Widely reported NVIDIA MLPerf Inference v4.1 submission results for H100 on the Llama-2-70B offline (batched) scenario; see [NVIDIA's MLPerf coverage on blogs.nvidia.com](https://blogs.nvidia.com/blog/mlperf-inference-benchmark-blackwell/) for the same benchmark family, and [vLLM's own throughput engineering results](https://vllm.ai/blog/2024-09-05-perf-update) for confirmation that batched throughput is highly configuration- and engine-version-dependent. Treat the specific tokens/second figures here as an approximate, widely reported ceiling under heavy concurrent load — not a number any specific deployment is guaranteed to hit.
[^subpricing]: This wiki, [AI subscription and pricing models in 2026](/comparisons/ai-subscription-pricing-2026/) — Claude Pro, ChatGPT Plus, Google AI Pro consumer tier pricing and the 10,000-call/25-million-token worked example, as of June 2026.
[^anthropicpricing]: Anthropic, [API pricing](https://platform.claude.com/docs/en/docs/about-claude/pricing) — Claude Sonnet 5 at $2.00 input / $10.00 output per million tokens.

## Further reading

- [On-premise vs cloud for AI workloads](/comparisons/on-premise-vs-cloud-ai/): the general capital-vs-operating-expense argument this page applies specifically to LLM inference.
- [GPU clouds and neoclouds compared](/comparisons/gpu-clouds-and-neoclouds/): how the rented-GPU providers named in the hardware ladder differ beyond price.
- [When automation pays for itself](/guides/when-automation-pays-for-itself/): the same continuous-vs-intermittent utilization logic, generalized beyond GPUs.
- [Managed vs. reserved vs. self-hosted inference](/comparisons/managed-vs-reserved-vs-self-hosted-inference/): where self-hosting sits against managed and reserved-capacity alternatives once you're serving more than yourself.
- [GPU scheduling for AI](/guides/gpu-scheduling-for-ai/): how to actually keep a self-hosted GPU busy enough to hit the batched end of the cost range on this page.
- [AI subscription and pricing models in 2026](/comparisons/ai-subscription-pricing-2026/): the consumer subscription figures used as the comparison baseline above.
