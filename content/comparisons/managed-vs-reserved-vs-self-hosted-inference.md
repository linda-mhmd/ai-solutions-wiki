---
title: "Managed vs Reserved vs Self-Hosted Inference - Choosing by Utilization"
description: "The four ways to pay for LLM inference — pay-as-you-go API calls, provisioned/reserved throughput, committed-spend contracts with third-party inference providers, and fully self-hosted hardware — checked first against the constraints that can rule one out (jurisdiction, the CLOUD Act, lock-in, capability, contracts), then compared on the variable that decides among what's left: how continuously you use the capacity."
date: 2026-09-03
last_verified: 2026-09-03
categories: [Comparisons]
tags: ["inference-pricing", "provisioned-throughput", "reserved-capacity", "pay-as-you-go", "self-hosting", "cost-optimization", "bedrock", "azure-openai"]
tools: [ollama, vllm, together-ai, fireworks-ai]
last_updated: 2026-09-03
lastmod: 2026-09-03
related:
  - guides/constraint-driven-comparisons
  - comparisons/on-premise-vs-cloud-ai
  - guides/self-hosting-llms-hardware-and-economics
  - guides/llm-cost-optimization
  - comparisons/gpu-clouds-and-neoclouds
  - glossary/cloud-act
  - glossary/data-sovereignty
  - tools/together-ai
  - tools/baseten
---

Two teams can run the exact same model, on the exact same underlying GPUs, in the exact same AWS region, and pay wildly different amounts per token — because the question that actually sets the price is not *what* you run or *where*, it's *how you pay for the capacity relative to how continuously you use it*. That is a different axis from the one covered in [on-premise vs cloud AI](/comparisons/on-premise-vs-cloud-ai/), which is about where the hardware physically sits and who controls it. This page is about payment model: whether you pay per token as you go, pay a fixed fee for guaranteed capacity whether you use it or not, sign a committed-spend contract with an inference vendor for a discount, or buy and run the hardware outright. All four exist on cloud infrastructure; all four also have on-premise or dedicated-hardware analogs. The deciding variable across every one of them is the same: **utilization** — the fraction of the capacity you're paying for that you're actually using.

That utilization math, worked out in full below, assumes something: that all four options are actually available to you and the only question is which is cheapest. For a lot of organizations that assumption doesn't hold — something rules one or more options out before cost ever enters the conversation. This wiki's [methodology for comparisons](/guides/constraint-driven-comparisons/) calls that a **gate**, distinct from a **tradeoff** (a factor worth weighing, not one that disqualifies an option outright). Check the gates first.

## Constraints that decide this before cost does

**Regulatory and jurisdictional exposure — usually a gate.** Options 1–3 (pay-as-you-go, hyperscaler reserved throughput, and third-party committed-spend) all run on infrastructure the vendor operates, in regions the vendor has chosen to offer. Option 4 (self-hosted) is the only one where you pick the physical location and the operating entity yourself. Whether that distinction matters here depends entirely on which rule applies to your data and how it's triggered — this page doesn't re-derive that. See [data sovereignty](/glossary/data-sovereignty/) for the residency-vs-sovereignty distinction, and [governance thresholds as you scale](/guides/governance-thresholds-as-you-scale/) for the specific conditions that trigger GDPR, EU AI Act, or sector-specific rules. If one of those applies and rules out a region or a vendor, resolve that before comparing anything below on cost.

**Trust and legal control over the relationship — usually a gate for the specific exposure it addresses.** The US CLOUD Act attaches to the *provider's* jurisdiction, not the data's physical location: a provider subject to US legal process must produce data within its "possession, custody, or control" on lawful request, "regardless of whether such communication, record, or other information is located within or outside of the United States."¹⁴ Every vendor named across options 1–3 in this piece — AWS, Microsoft, Google, OpenAI, Anthropic, Together AI, Fireworks, Groq, Baseten — is a US entity, so choosing a non-US region does not clear this exposure; see [the US CLOUD Act](/glossary/cloud-act/) for the full mechanism. Renting hardware from a US-headquartered neocloud for option 4 doesn't clear it either — only self-hosting on infrastructure operated by an entity outside US jurisdiction does. If this specific exposure is what's actually driving the decision, it narrows the field further than a simple "self-hosted vs. everything else" split.

**Vendor lock-in and exit cost — a tradeoff, sharper for some options than others.** Two distinct lock-in mechanisms get conflated here. *Model* lock-in: Claude, GPT, and Gemini are proprietary APIs with no drop-in equivalent, and that's true whether you pay for them on-demand or reserve capacity for them — the payment model doesn't change it. *Capacity-commitment* lock-in: a 6-month or 1-year reservation (Bedrock Provisioned Throughput, an Azure PTU reservation) or an annual committed-spend contract is a term commitment regardless of whether your usage keeps up — and on Bedrock specifically, Provisioned Throughput is the *only* way to serve a model **fine-tuned inside Bedrock**, which becomes its own lock-in once you've customized a model that way. (A model you import with your own already-customized weights avoids that particular lock-in: Bedrock Custom Model Import bills on-demand, no Provisioned Throughput required — see the mechanics in the section below.)² Self-hosting an open-weight model on a standard serving engine ([vLLM](/tools/vllm/), TGI) has the lowest lock-in of the four, since both the weights and the serving stack are portable across hardware providers. [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/) and [cloud exit costs and data gravity](/guides/cloud-exit-costs-and-data-gravity/) cover how to make either mechanism concrete rather than a general worry.

**Internal capability and knowledge retention — a gate for option 4 specifically.** Self-hosting is not automatically the more sovereign, in-control choice — it only is if the organization has, or is willing to build, the operational expertise to run a production inference stack reliably: GPU fleet management, a serving engine tuned for throughput, monitoring, and on-call coverage for a system that, unlike a managed API, has no vendor SLA behind it. [The shared responsibility model](/guides/shared-responsibility-model/) describes the same boundary from the cloud side — every responsibility a managed vendor absorbs is one your team now owns instead. If that capability doesn't exist and isn't budgeted for, self-hosting isn't a live option no matter how favorable the break-even math below looks: it trades vendor dependency for single-point-of-failure expertise, a different risk, not a smaller one.

**Contractual and customer-driven requirements — a gate, and the one this page genuinely cannot resolve for you.** An enterprise customer's security questionnaire, a "no third-party subprocessor" clause, or a pre-existing enterprise agreement with a specific hyperscaler can rule an option in or out before any constraint above even applies. This is a real and common category, distinct from regulation, and it is inherently specific to your own contracts. Nothing in this comparison — or any general comparison — can tell you what a specific contract says; that determination belongs to whoever owns the agreement.

**Cost structure and sunk investment — feeds the utilization math below, but is worth naming on its own.** If your organization already owns GPU hardware, its fixed cost is sunk, not marginal — that changes the self-hosted side of the break-even calculation from "should we commit to this" to "the alternative is idle hardware we already paid for." The formula in the Decision framework section still applies; the inputs are just different once the fixed cost is sunk rather than prospective.

None of this eliminates the utilization question below — it just determines which of the four options you're allowed to run that question against. If nothing above rules an option out for your organization, all four remain on the table and the rest of this page applies in full.

## What each option actually is

### 1. Pay-as-you-go (token-metered, no commitment)

The default for nearly every managed model API: Anthropic's Claude API, OpenAI's API, Google's Gemini API, Amazon Bedrock's on-demand mode, Azure OpenAI's standard deployments. You are billed per input token and per output token, at a published rate, with no minimum spend and no commitment. Anthropic calls this the **Standard** service tier — "the default service tier for all API requests," with best-effort availability and no latency SLA — and it works the same way structurally everywhere else: shared, multi-tenant capacity, priced per token, available in seconds.¹ There is nothing to provision and nothing to release when you stop. The tradeoff is that you have no guaranteed throughput: under load, requests can queue or get rate-limited, and per-token unit economics don't improve no matter how much you spend — the millionth token costs the same as the first.

### 2. Provisioned throughput / reserved capacity

This is dedicated, exclusive capacity that you pay for on a clock, independent of how many requests you actually send it. You are not buying cheaper tokens — you're buying a guaranteed floor of throughput and, usually, a latency SLA. Every major hosted-model provider now offers some version of this:

- **Amazon Bedrock Provisioned Throughput.** You purchase capacity in **Model Units (MUs)**; each MU delivers a fixed number of input and output tokens per minute for a specific model, but AWS's own Provisioned Throughput documentation doesn't publish the factors behind that per-model figure — it directs you to your AWS account manager for MU specifics and pricing.² You choose a commitment term — **no commitment** (cancel any time), **1 month**, or **6 months** — and the longer the term, the lower the effective hourly rate.² Billing is hourly and continues until you explicitly delete the Provisioned Throughput, regardless of usage.² Several first-party and partner models (Amazon's own models, Meta Llama, Cohere) publish per-MU hourly rates directly on AWS's pricing page; for others, including Anthropic's Claude models, Bedrock's own pricing page states that Provisioned Throughput pricing requires contacting your AWS account team rather than listing a public rate.³ For a model **fine-tuned inside Bedrock** using its own customization jobs, Provisioned Throughput is required to serve it at all — there's no on-demand path.² That is a distinct case from a model **imported** via Bedrock Custom Model Import (bringing weights you customized elsewhere): imported models get their own on-demand billing path, metered in **Custom Model Units (CMUs)** — sized by "model architecture, model parameter count, and context length" and billed per active model copy per minute, no Provisioned Throughput or term commitment required.¹⁵ The two "custom model" paths are easy to conflate but carry opposite lock-in profiles: fine-tune inside Bedrock and you're committed to Provisioned Throughput; import your own weights and you stay on-demand.
- **Azure OpenAI (Microsoft Foundry) Provisioned Throughput Units (PTUs).** A PTU is a model-independent unit of dedicated processing capacity — the same PTU pool deploys any supported model in a region, and how many tokens-per-minute one PTU buys depends on which model you point it at.⁴ Every model has a documented minimum PTU count to create a deployment at all.⁴ You can run PTUs on **hourly billing** (flexible, but Microsoft's own guidance is explicit that this is for short-term scenarios like benchmarking or a one-off event, not production⁵), or buy an **Azure Reservation** — a 1-month or 1-year term commitment against the PTU billing meter — for a discounted effective $/PTU/hour rate; the discount size varies by model family and term length and is published on Azure's live pricing calculator rather than as a single flat percentage.⁵ A deployment can't be paused; billing stops only when you delete it.⁵ Azure also has an intermediate option, **Priority processing** — pay-per-token at a priority rate for a defined per-model latency target, with no long-term commitment — sitting between Standard and full PTU reservation.⁴
- **Google Vertex AI Provisioned Throughput** (Vertex AI was rebranded [Gemini Enterprise Agent Platform](/tools/google-vertex-ai/) in April 2026; this page keeps the "Vertex AI" name it still ships under in Google's own docs) **and OpenAI's Scale Tier** follow the identical shape under different names: Vertex AI reserves capacity in **Generative AI Scale Units (GSUs)** across several fixed commitment terms;⁶ OpenAI's Scale Tier sells committed input/output throughput bundles (minimum 30-day terms) with a 99.9% uptime SLA and pricing quoted per unit per day.⁷ Check each vendor's current pricing page directly — these rates and even which models are eligible change frequently.
- **Model labs' own committed-throughput programs are not permanent fixtures.** Anthropic ran a **Priority Tier** — commit to input/output tokens-per-minute for 1, 3, 6, or 12 months against a specific model, target 99.5% uptime, automatic overflow to Standard tier when you exceed committed capacity — but as of this writing Anthropic's own documentation states plainly that "Priority Tier capacity commitments are no longer available for purchase," with existing commitments honored through their contract end date and guaranteed capacity now handled through direct sales conversations instead.⁸ Treat any specific reserved-capacity program named in this article as something to reverify against the vendor's current docs before you build a commitment around it.

### 3. Committed-spend / annual contracts with third-party inference providers

A step further from the hyperscalers: independent inference platforms that serve open-weight and partner models, offering a discount off standard pricing in exchange for a spend or capacity commitment, distinct from their pay-as-you-go tier. What each one currently offers, checked directly against each vendor's own docs rather than assumed:

- **[Together AI](/tools/together-ai/)** runs three separate reserved-capacity products. **Dedicated Endpoints** bill per-minute per GPU replica on-demand (Together's docs list $3.99/hour for a single H100 80GB, scaling proportionally for multi-GPU configs, with a separate **Reserved** option — "commit to capacity for a set term at a lower effective rate, with guaranteed hardware availability" — available on request rather than at a published rate).⁹ A newer, separate **Provisioned Throughput** product sells reserved token capacity in PTUs at $0.05 per PTU per minute with a one-month minimum term and volume discounts at higher commitment, but as of this writing it's limited to a small set of models (MiniMax M3 and GLM 5.2) in US/Canada regions — confirm current model coverage before assuming it applies to the model you want.¹⁰
- **[Fireworks AI](/tools/fireworks-ai/)** bills serverless inference per token and dedicated on-demand deployments per GPU-hour, and separately lists a **Reserved Throughput** tier for select models with an SLA — Fireworks' own pricing docs state pricing is "the same as standard unless otherwise specified" and direct interested customers to sales rather than publishing reserved rates.¹¹
- **[Groq](/tools/groq/)** confirmed as having a real reserved-capacity product distinct from pay-per-token: the **Performance Tier**, available only on enterprise plans. Instead of paying per token, you purchase input/output token-capacity bundles and pay for that provisioned capacity, backed by a 99.9% availability SLA and a 99% latency guarantee specified in the enterprise agreement — with no public price list; Groq's docs direct you to contact their enterprise team.¹²
- **[Baseten](/tools/baseten/)** bills its default Dedicated Deployments per-minute-per-GPU with no idle charges (autoscaling), and offers **Pro** and **Enterprise** tiers with volume discounts, custom SLAs, and (at Enterprise) self-hosted or hybrid deployment and full data-residency control — but Baseten's own pricing page states these are quote-required, and does not publish a specific minimum spend or committed-capacity rate structure.¹³

The common thread: none of these four publish a simple public discount table for committed spend the way cloud reserved-instance pricing is public. All four require a sales conversation to get an actual number. Budget the time for that conversation into your evaluation, not just the technical trial.

### 4. Fully self-hosted, on owned or rented hardware

You buy (or long-term rent) the GPUs and run the serving stack yourself — [Ollama](/tools/ollama/) for simple single-node serving, [vLLM](/tools/vllm/) or [TGI](/tools/tgi/) or [SGLang](/tools/sglang/) or [TensorRT-LLM](/tools/tensorrt-llm/) for production-grade throughput, on hardware from a [GPU cloud or neocloud](/comparisons/gpu-clouds-and-neoclouds/) (RunPod, Vast.ai, Lambda, Nebius, CoreWeave, Crusoe, Paperspace) or fully owned on-premise hardware. There is no per-token bill from a model API vendor at all — your marginal cost per additional token approaches the cost of electricity and depreciation, once the hardware is paid for. This is structurally the same commitment shape as options 2 and 3 taken to its limit: 100% of the fixed cost is yours regardless of use, with none of it abstracted behind a vendor's SLA. The full cost math — GPU pricing, VRAM sizing, the 15-40% overhead beyond raw weight memory, break-even utilization against renting — is covered in [self-hosting LLMs: hardware and economics](/guides/self-hosting-llms-hardware-and-economics/); this page won't repeat it.

## The comparison

The table below is a tradeoff comparison, not a gate check — it assumes you've already filtered the four options against the constraints above and are choosing among whichever survived.

| | 1. Pay-as-you-go | 2. Provisioned / reserved (hyperscaler) | 3. Committed-spend (inference vendor) | 4. Self-hosted |
|---|---|---|---|---|
| Billing unit | Per input/output token | Per capacity unit per hour (MU / PTU / GSU), regardless of tokens sent | Negotiated: per-minute GPU, per-PTU, or volume-discounted tokens | GPU-hour (rented) or amortized hardware + power + staff (owned) |
| What you commit to | Nothing | A fixed throughput level, for a term (none / 1-month / 6-month / 1-year depending on vendor) | A spend floor or capacity floor, contract length varies | Hardware lease or purchase term |
| Cost when idle | $0 | Full rate — you pay whether or not you send requests | Usually full committed rate; occasionally usage-based within a spend commitment | Full cost regardless of use |
| Marginal cost of one more token, once committed | Full published rate | ~$0 up to committed capacity, then either blocked or overflow to standard-tier pricing | ~$0 up to committed capacity | ~$0 (power only) |
| Custom / fine-tuned model support | Rarely (base models only, most vendors) | Yes — on Bedrock, required to serve a model fine-tuned *inside* Bedrock² (imported custom weights instead get on-demand billing¹⁵) | Varies by vendor | Yes, full control |
| Latency / uptime guarantee | None (best-effort) | Yes, defined SLA (e.g. Groq's 99.9% availability / 99% latency guarantee)¹² | Varies; often SLA-backed at Enterprise tiers | Whatever you engineer |
| Minimum commitment to start | None | Often none for hourly billing; term commitments for the discount | Typically enterprise sales conversation | Rental: hours. Owned: procurement cycle (weeks-months) |
| Cancel / scale down | Instantly, any time | Term-locked once committed; hourly tiers can be deleted any time but Azure explicitly warns capacity may not be available again if you scale back up⁵ | Contract-dependent | Rented: end lease. Owned: sunk cost |
| Who manages the infrastructure | Vendor | Vendor | Vendor | You |
| Best fit | Low or spiky, unpredictable traffic; prototyping | Predictable, latency-sensitive production traffic that's cheaper than sustained on-demand at your volume | High-volume production on open/partner models, wants vendor-managed ops with a volume discount | Very high, sustained utilization; data residency or customization needs; long time horizon |

## Decision framework

This is the exact same economic logic as reserved vs. on-demand cloud compute in general — AWS Reserved Instances and Savings Plans vs. EC2 on-demand, Azure Reserved VM Instances vs. pay-as-you-go — applied to a narrower resource (a model's inference throughput instead of a virtual machine). The mechanism in every case is identical: a vendor offers you a discount for taking on the utilization risk yourself. Pay-as-you-go prices in the vendor's cost of carrying spare capacity for you; a reservation or commitment removes that carrying cost for the vendor, and passes some of the savings back, but only if *you* keep the meter busy. If you don't, you're worse off than if you'd stayed on-demand — you paid for capacity you didn't use.

### The formula

For any provisioned/reserved/committed option, there is a break-even utilization below which pay-as-you-go is cheaper, and above which the commitment is cheaper:

```
u* = C / (T_max × p)

where:
  C      = fixed cost of the reserved capacity for the period (e.g. hourly rate × hours in the month)
  T_max  = maximum tokens that capacity can process in that period, at 100% utilization
  p      = pay-as-you-go price per token for the same workload
  u*     = break-even utilization, as a fraction of T_max
```

Below u*, you're spending more on the commitment than you would have on-demand for the same actual traffic. Above u*, the commitment wins, and the gap widens the closer you get to 100% utilization.

**Worked example (illustrative round numbers — plug in your own quoted rate):**

Suppose a reserved throughput unit costs $20/hour and, at full load, can process 3,000,000 tokens per hour combined input+output. Over a 730-hour month:

- `C` = $20 × 730 = **$14,600/month**
- `T_max` = 3,000,000 × 730 = **2.19 billion tokens/month**
- Suppose the equivalent pay-as-you-go blended rate is `p` = **$8 per million tokens** ($0.000008/token) — a plausible blended rate for a mid-size model's input+output mix

```
u* = 14,600 / (2,190,000,000 × 0.000008)
   = 14,600 / 17,520
   ≈ 0.833
```

That says the reservation only pays for itself once you're routing at least **83% of that unit's maximum throughput** through it, on average, across the month. Below 83% utilization, staying on pay-as-you-go is cheaper for the same traffic; above it, the reservation wins, and the wider the gap the more attractive it gets. That threshold is high enough that it rules out "reserve now, grow into it later" reasoning — if your actual traffic is at 40% of the unit's capacity, you are paying roughly double what pay-as-you-go would have cost for the same tokens. Rerun the same three-line calculation with your actual quoted hourly rate, your actual measured tokens-per-hour capacity, and your actual on-demand rate for the same model — that is the only version of this number worth trusting; real vendor figures for this calculation are rarely public, per the Sources above.

<figure class="bz-figure">
<svg viewBox="0 0 480 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Line chart showing reserved capacity cost as a flat horizontal line and pay-as-you-go cost rising linearly with utilization, crossing at the break-even point.">
  <line x1="60" y1="200" x2="440" y2="200" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <line x1="60" y1="200" x2="60" y2="20" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <line x1="60" y1="110" x2="440" y2="110" stroke="currentColor" stroke-width="2" fill="none"/>
  <text x="360" y="102" fill="currentColor" font-size="12">Reserved (fixed)</text>
  <line x1="60" y1="200" x2="440" y2="40" stroke="currentColor" stroke-width="2" stroke-dasharray="6 4" fill="none"/>
  <text x="330" y="55" fill="currentColor" font-size="12">Pay-as-you-go</text>
  <line x1="274" y1="110" x2="274" y2="200" stroke="currentColor" stroke-width="1" stroke-dasharray="2 3" fill="none" opacity="0.6"/>
  <circle cx="274" cy="110" r="3.5" fill="currentColor"/>
  <text x="200" y="220" fill="currentColor" font-size="12">u* (break-even utilization)</text>
  <text x="20" y="115" fill="currentColor" font-size="11" transform="rotate(-90 20 115)">Monthly cost</text>
  <text x="230" y="245" fill="currentColor" font-size="12">Utilization →</text>
</svg>
<figcaption>Below the break-even utilization, pay-as-you-go costs less. Above it, the fixed reserved cost wins — and the gap grows the closer utilization gets to 100%.</figcaption>
</figure>

### Applying it across all four options

- **Pay-as-you-go** is the right default whenever you cannot forecast volume, are prototyping, have spiky or seasonal traffic, or your total spend is too low for any vendor to offer a meaningful commitment discount. It is also the only option with zero risk of over-committing.
- **Provisioned/reserved throughput** wins once your traffic is steady enough that you can forecast a floor with confidence, *and* that floor's utilization clears u* — which usually means you're already spending enough on pay-as-you-go that a sales rep will take your call. Latency-sensitive production traffic (user-facing chat, agents in a critical path) is often worth reserving even slightly below the pure-cost break-even, because the SLA has its own value.
- **Committed-spend contracts with inference vendors** make sense at the same utilization threshold as option 2, but are the right choice specifically when you're running open-weight or partner models where a hyperscaler's Provisioned Throughput either isn't available for that model or, as with Bedrock and Anthropic's models, isn't even publicly priced — and where you want the vendor to keep owning uptime and hardware.
- **Self-hosting** only clears its own, much higher break-even bar, because you're also absorbing the operations staff, the depreciation risk on hardware that ages out in 3-4 years, and the procurement lag — covered in full in the [self-hosting economics guide](/guides/self-hosting-llms-hardware-and-economics/). As a rule of thumb consistent with the on-premise-vs-cloud analysis elsewhere on this wiki, self-hosting only beats even a *reserved* cloud rate at sustained, near-continuous utilization on a meaningful GPU count — it is a much higher bar than clearing u* for a Provisioned Throughput unit.

**In practice: measure before you commit.** Every one of these programs (Bedrock PT, Azure PTU, Together's dedicated/reserved products, Fireworks Reserved Throughput, Groq Performance Tier) recommends running on pay-as-you-go or hourly billing first to establish your real tokens-per-minute and requests-per-minute profile, and Microsoft's own PTU guidance says this explicitly — use hourly billing to benchmark, then buy the reservation only once you've confirmed the capacity you need is actually available and actually gets used.⁵ Committing to a 6-month or annual term on a guess is how the break-even math above works against you instead of for you.

## Further reading

- [Constraint-driven comparisons](/guides/constraint-driven-comparisons/): the methodology behind this page's structure — why gates and tradeoffs get separated instead of folded into one feature grid.
- [On-premise vs cloud for AI workloads](/comparisons/on-premise-vs-cloud-ai/): the *location and control* axis — where the hardware sits — as distinct from the payment-model axis this page covers.
- [Data sovereignty](/glossary/data-sovereignty/): residency vs. sovereignty as distinct constraints, load-bearing for the jurisdictional gate above.
- [The US CLOUD Act](/glossary/cloud-act/): the full mechanism behind the trust/legal-control gate above, including why region selection alone doesn't resolve it.
- [Governance thresholds as you scale](/guides/governance-thresholds-as-you-scale/): the specific conditions that trigger GDPR, EU AI Act, and sector-specific rules for a given workload.
- [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/): making the lock-in category concrete rather than a vague worry.
- [Cloud exit costs and data gravity](/guides/cloud-exit-costs-and-data-gravity/): what leaving a committed capacity contract or a self-hosted footprint actually costs once data volume grows.
- [The shared responsibility model for AI on AWS](/guides/shared-responsibility-model/): the operational-responsibility boundary behind the internal-capability gate above.
- [Self-hosting LLMs: hardware and economics](/guides/self-hosting-llms-hardware-and-economics/): the full cost math for option 4, including VRAM sizing and hardware break-even against renting.
- [Reducing LLM inference costs in production](/guides/llm-cost-optimization/): tactics (caching, routing, batching, prompt optimization) that reduce spend inside whichever payment model you choose.
- [GPU clouds and neoclouds compared](/comparisons/gpu-clouds-and-neoclouds/): where to rent the GPUs behind both on-demand dedicated deployments and fully self-hosted serving.
- [vLLM](/tools/vllm/): the production-grade serving engine most self-hosted deployments run to get throughput comparable to a managed API.
- [Ollama](/tools/ollama/): the simplest path to running a model yourself, for evaluation before deciding whether self-hosting clears the utilization bar.

## Sources

1. [Service tiers, Claude Platform Docs](https://platform.claude.com/docs/en/api/service-tiers) — Standard tier definition, and the Priority Tier discontinuation notice ("Priority Tier capacity commitments are no longer available for purchase").
2. [Increase model invocation capacity with Provisioned Throughput in Amazon Bedrock, AWS Docs](https://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html) — Model Unit definition, the no-commitment/1-month/6-month commitment tiers, hourly billing until deletion, and the requirement to use Provisioned Throughput for models customized via Bedrock's own fine-tuning (imported models are a separate on-demand path — see source 15).
3. [Amazon Bedrock Pricing, AWS](https://aws.amazon.com/bedrock/pricing/) — on-demand token pricing, and confirmation that Provisioned Throughput pricing for some models (including Anthropic's) requires contacting an AWS account team rather than being publicly listed.
4. [Provisioned throughput for Foundry Models, Microsoft Learn](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/provisioned-throughput) — PTU definition, model-independence, per-model minimum PTU counts, deployment types (Global/Data Zone/Regional), and Priority processing as an intermediate deployment option.
5. [Provisioned throughput billing and cost management, Microsoft Learn](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/provisioned-throughput-billing) — hourly billing vs. Azure Reservations mechanics, 1-month/1-year reservation terms, and guidance against scaling PTUs up/down on hourly billing for production.
6. [Provisioned Throughput overview, Google Cloud Vertex AI Docs](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/provisioned-throughput/overview) — GSU-based reserved capacity for generative AI models on Vertex AI; check this page directly for current commitment terms and per-GSU rates, which are not fully public in this article.
7. [Scale Tier for API Customers, OpenAI](https://openai.com/api-scale-tier/) — committed throughput-unit purchasing, 99.9% uptime SLA, minimum 30-day terms.
8. [Service tiers, Claude Platform Docs](https://platform.claude.com/docs/en/api/service-tiers) — Priority Tier commitment structure (input/output TPM, 1/3/6/12-month terms, 99.5% uptime target, automatic overflow to Standard tier) and its current discontinuation for new purchases.
9. [Pricing, Together AI Docs (Dedicated Endpoints)](https://docs.together.ai/docs/dedicated-endpoints/pricing) — per-minute per-GPU-replica billing, on-demand H100 80GB rate, and the Reserved option description.
10. [Provisioned Throughput, Together AI](https://www.together.ai/provisioned-throughput) — PTU definition, $0.05/PTU/minute rate, one-month minimum term, and current model/region limitations (MiniMax M3, GLM 5.2, US/Canada).
11. [Serverless Pricing, Fireworks AI Docs](https://docs.fireworks.ai/serverless/pricing) — per-token serverless pricing structure and the Reserved Throughput tier description.
12. [Performance Tier, GroqDocs](https://console.groq.com/docs/performance-tier) — provisioned input/output capacity bundles, 99.9% availability SLA, 99% latency guarantee, enterprise-only access.
13. [Pricing, Baseten](https://www.baseten.co/pricing/) — per-minute Dedicated Deployment billing with no idle charges, and Pro/Enterprise volume-discount and custom-SLA tiers.
14. [18 U.S.C. § 2713](https://www.law.cornell.edu/uscode/text/18/2713), Cornell Legal Information Institute — the operative CLOUD Act text: a provider subject to US jurisdiction must disclose data in its "possession, custody, or control" regardless of where it is physically located.
15. [Use Custom model import to import a customized open-source model into Amazon Bedrock, AWS Docs](https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-import-model.html) — confirms imported models run on **on-demand** throughput (no Provisioned Throughput purchase required), distinct from the Provisioned-Throughput-only path required for models fine-tuned via Bedrock's own customization jobs; Custom Model Unit sizing and per-CMU-minute billing are covered on Amazon Bedrock's pricing page's Custom Model Import tab, linked from this doc.
