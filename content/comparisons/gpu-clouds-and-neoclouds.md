---
title: "GPU Clouds and Neoclouds Compared"
description: "A constraint-first guide to GPU clouds and neoclouds: the jurisdictional, compliance, resilience, and lock-in constraints that rule providers out before bare GPU rental, serverless, inference APIs, and marketplaces are worth comparing on price."
date: 2026-06-29
lastmod: 2026-09-03
last_updated: 2026-09-03
categories: [Comparisons]
tags: ["gpu", "cloud", "infrastructure", "inference", "training", "neocloud", "vendor-lock-in", "data-sovereignty"]
related:
  - guides/constraint-driven-comparisons
  - glossary/neocloud
  - glossary/inference
  - glossary/cloud-act
  - guides/cloud-exit-costs-and-data-gravity
  - guides/software-licensing-and-vendor-lock-in
  - tools/coreweave
  - tools/lambda-cloud
  - tools/together-ai
  - tools/fireworks-ai
  - tools/groq
  - tools/nebius
  - tools/crusoe
  - tools/modal
  - tools/baseten
  - tools/runpod
  - tools/vast-ai
  - tools/paperspace
  - tools/vultr
  - comparisons/llm-landscape-2026
---

<figure class="bz-figure">
  <img src="/img/enterprise-dark/cubes-modular-dark-notext.png" alt="Dark modular cubes with red edges, representing the many GPU-cloud options an AI team can choose from." loading="lazy">
  <figcaption>Every GPU cloud is a modular block in the same stack. The skill is picking the block your own constraints leave you free to pick.</figcaption>
</figure>

Training and running AI models needs GPUs, and most teams rent them rather than buy them. The market splits into two camps. General-purpose hyperscalers (AWS, Azure, Google Cloud, Oracle Cloud) offer GPUs alongside hundreds of other services. A newer set of specialists, often called a [neocloud](/glossary/neocloud/), focuses almost entirely on GPU compute for AI training and [inference](/glossary/inference/).

Most guides to this market start with a feature grid — type, offering, price per GPU-hour — and end with "choose A if you need X, choose B if you need Y." That's useful once you know which providers are actually available to you, but it skips the question that usually decides the shortlist before price ever enters it: what does your own jurisdiction, contract, or compliance obligation rule out first? This page follows the [constraint-driven comparison methodology](/guides/constraint-driven-comparisons/) this wiki uses for exactly that reason. It names the constraints that are load-bearing for a GPU-cloud decision specifically, separates the ones that eliminate an option outright from the ones that are genuine tradeoffs, and only then gets to the type-by-type reference table. Prices and instance specs change often regardless of any of this — check each provider's own pricing page before you commit.

## The two camps

A hyperscaler runs a broad cloud: compute, storage, databases, networking, identity, and much more. GPUs are one product among many. You reach for a hyperscaler when your AI workload sits next to a lot of other cloud services and you want one bill, one identity system, and one security model.

A neocloud is built for GPUs first. These providers buy large fleets of NVIDIA accelerators, wire them with fast interconnect, and rent them out for training and inference, with less of the surrounding platform than a hyperscaler. Pricing on raw GPU compute tends to undercut hyperscaler list pricing for comparable hardware — SemiAnalysis's own GPU cluster cost data puts Gold-tier neocloud pricing around the 25th percentile of the market, against hyperscalers typically at the 50th–75th percentile [16] — and individual neoclouds have led on hardware-generation timing too: CoreWeave, for instance, was the first cloud provider to bring NVIDIA GB200 NVL72 instances to general availability [17]. That's a real, sourced pattern, not a rule that holds for every neocloud equally. Independent benchmarking from SemiAnalysis, whose ClusterMAX rating tracks GPU cloud reliability and performance, places CoreWeave in its Platinum tier — the sole provider to hold it as of the most recent rating — with Nebius and Crusoe in the Gold tier just below [1].

## What rules a provider out before you compare features

Six constraint categories are actually load-bearing for a GPU-cloud decision, in roughly the order they tend to bite. The first two can be outright **gates** — they eliminate a provider for a given reader regardless of price or benchmark. The rest are real **tradeoffs** worth weighing deliberately rather than defaulting past. Not every reader has all six; skip to the ones that apply to you and treat the rest as background.

### Regulatory and jurisdictional exposure — usually a gate

If a workload's data falls under a residency rule, or the use case sits in a high-risk tier under the EU AI Act, the provider's legal jurisdiction and cluster locations are non-negotiable inputs, not one more row to weigh against price. See [data sovereignty](/glossary/data-sovereignty/) for the vocabulary that separates *where data physically sits* from *which government can compel access to it* — they are different questions, and a GPU cloud decision usually turns on the second one.

The mechanism that matters most here is the US [CLOUD Act](/glossary/cloud-act/): jurisdiction follows the provider entity's exposure to US legal process, not the data centre's country. Building a cluster in Frankfurt does not, by itself, remove a US-domiciled provider from reach [2]. That makes the provider's own domicile a genuine, checkable fact rather than a matter of impression:

- **CoreWeave** is headquartered in Livingston, New Jersey, US [3].
- **RunPod** is incorporated in Dover, Delaware, US [4].
- **Vast.ai Inc.** is a Delaware C Corporation headquartered in Los Angeles, California, US [5].
- **Nebius** is headquartered in Amsterdam, the Netherlands, and trades on Nasdaq as Nebius Group N.V. — a different jurisdictional starting point than the US-domiciled providers above [6].
- Lambda and Crusoe are both US-domiciled AI infrastructure companies; we did not independently verify their exact corporate addresses this session, so treat that detail as unconfirmed if it matters to you.
- AWS, Azure, Google Cloud, and Oracle Cloud all have US-domiciled parent entities. Each also operates EU-region data centres and, in some cases, dedicated "sovereign cloud" offerings meant to add legal and operational separation from the US parent — a materially more engineered mitigation than an EU data centre address alone, per the CLOUD Act's own possession-custody-or-control test [2].

None of this settles the question for you. A Netherlands-domiciled provider is a different starting point, not a guarantee — the CLOUD Act can reach a non-US affiliate where the US parent retains possession, custody, or control, and whether that applies to any specific corporate structure is legally contested, not something a comparison page can resolve [2]. If a jurisdictional requirement is hard (a specific regulator's data-residency rule, a customer's own sovereignty clause), it is a gate: the provider that fails it is out, independent of everything else in this page.

### Contractual and customer-driven requirements — sometimes a gate

Distinct from law: sometimes the deciding constraint is a specific customer's security questionnaire, your own auditor, or a contractual requirement to produce a specific certification — and it can rule a provider out even where no regulation technically demands it.

What we could verify this session, directly from each provider's own published material:

| Provider | Published compliance posture (verified this session) |
|---|---|
| CoreWeave | Lists SOC 2, ISO 27001, ISO 27017, and ISO 27018 on its Trust Center; further reports are "available upon request" [7] |
| RunPod | States platform-wide SOC 2 Type II certification and describes itself as HIPAA- and GDPR-compliant in its own marketing material [8]. Its separate security documentation, however, attributes SOC 2, ISO 27001, and PCI DSS specifically to **Secure Cloud's** vetted infrastructure partners, and does not make the same claim for **Community Cloud's** third-party hosts [9]. Confirm which tier a given certification actually covers before relying on it. |
| Vast.ai | Its own documentation states the platform cannot guarantee availability and does not offer a platform-wide SLA on standard marketplace instances [10] — a materially different accountability model than a single operator standing behind a certification. |

We did not verify the compliance posture of Nebius, Lambda, Crusoe, Together AI, Fireworks AI, Groq, Modal, Baseten, Paperspace, Vultr, or any hyperscaler this session — their presence in the reference table further down is a description of what they sell, not a claim about what they've certified. If a specific certification is a hard requirement, that is a gate: go to the provider's own trust page, confirm the certifying body, the scope of the audit, and the date, and treat anything short of that as unverified.

### Resilience and business continuity — a gate for production serving, a tradeoff for fault-tolerant work

What an outage or a mid-job interruption of a given option actually costs you determines whether this is a hard gate or a tradeoff worth taking deliberately.

- **Vast.ai** documents two distinct rental types: on-demand/reserved instances run at a fixed price and are not interrupted; interruptible instances are bid-priced, can be paused or stopped when a higher bidder appears or the host reclaims capacity, and typically save 50–80% against on-demand pricing in exchange [10].
- **RunPod's** Secure Cloud is described as running in "enterprise-grade" T3/T4 data centres; its documentation does not make an equivalent reliability claim for Community Cloud's peer-hosted capacity [9].
- SemiAnalysis's ClusterMAX rating independently tiers neocloud reliability and operational maturity, placing CoreWeave in its Platinum tier — the only provider to hold it — as of its most recent rating [1].

For a production inference endpoint serving real users, an interruptible or community-hosted tier is a genuine **gate**, not just a cost line — unless the application is explicitly architected to lose and resume mid-request. For a long training run that checkpoints regularly, the same interruption risk is a **tradeoff**: a large, real cost saving against a bounded, manageable risk, worth taking on purpose rather than defaulting into by picking the cheapest listed price.

### Vendor lock-in and exit cost — a tradeoff

How hard it is to leave a given GPU cloud once you've committed data and workflows to it, concretely rather than as a vague worry. [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/) and [cloud exit costs and data gravity](/guides/cloud-exit-costs-and-data-gravity/) cover the general mechanics; here's how they apply to this specific market.

**Egress pricing varies by provider, and it's one of the more concrete, checkable numbers in this whole comparison.** AWS's own VPC pricing page lists $0.09/GB for the first tier of data transfer out to the internet, after a 100 GB monthly free allowance shared across services [11] — see [cloud exit costs and data gravity](/guides/cloud-exit-costs-and-data-gravity/) for the fuller tiered breakdown and for what the EU Data Act's 2027 switching-charge phase-out does and doesn't change. **CoreWeave**, by contrast, publishes flat "Data transfer between CoreWeave and internet: Free" and "Data transfer within CoreWeave: Free" pricing, and separately runs a Zero Egress Migration program that covers the egress fees a customer's *existing* cloud charges to move data onto CoreWeave [12][13]. That's a verified, provider-specific fact about CoreWeave, not a claim about neoclouds generally — several other neoclouds market similarly low or free egress as a competitive point against hyperscaler tiered pricing, but we did not independently verify each one's current terms this session, and egress pricing is exactly the kind of term that changes without notice. Confirm directly before you build a migration plan around it.

**Software and hardware coupling** is the other half. Bare-GPU workloads generally run on standard CUDA, Slurm, and Kubernetes tooling that transfers reasonably well between bare-GPU providers. A serverless platform's deployment format or an inference API's specific request shape transfers far less cleanly — the coupling is deeper the higher up the managed-service stack you go, which is the general pattern [software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/) describes for any vendor relationship, not something specific to GPU clouds. Training checkpoints and model weights are also large, append-only artifacts with the same data-gravity dynamics as any other large dataset — see [cloud exit costs and data gravity](/guides/cloud-exit-costs-and-data-gravity/) for the arithmetic on how long moving them actually takes.

### Cost structure and sunk investment — a tradeoff

Not "which is cheaper" in the abstract, but what you've already committed to and what your usage pattern looks like.

If your organisation already carries a committed-spend agreement or an enterprise discount programme with a hyperscaler, the marginal price of GPU capacity there is not the list price, and moving GPU workload to a neocloud can mean losing ground against a commitment you've already made — the general mechanics of sunk cost changing the marginal economics of a move are covered in [on-premise vs cloud for AI workloads](/comparisons/on-premise-vs-cloud-ai/). Usage shape matters too: a sustained training workload amortizes better under reserved or committed capacity (hyperscaler or neocloud), while a bursty or intermittent workload — spiky serving traffic, exploratory work — tends to favour serverless scale-to-zero platforms or marketplace/spot pricing, accepting more variability in exchange for not paying for idle GPUs. We're keeping this qualitative on purpose: published $/GPU-hour figures move fast enough that a specific number written today would likely be stale by the time you read it. Check each provider's current pricing page before you commit, exactly as before.

### Internal capability and knowledge retention — a tradeoff

Bare-GPU rental hands you the hardware and leaves cluster orchestration, scheduling, and failure handling to your own team. Serverless platforms and inference APIs absorb that operational work into the vendor relationship instead. Neither is automatically the safer or more "in control" choice: a team that self-manages a bare-metal GPU cluster without anyone who can actually operate it reliably has traded a vendor-dependency risk for a single-point-of-failure-expertise risk, not eliminated risk. Naming both sides of that trade plainly, rather than treating "we run it ourselves" as self-evidently the more sovereign option, is the point of this constraint category.

## Once your constraints have set your eligible set: matching workload shape

Everything below assumes the constraints above have already narrowed which providers you're even choosing between. Within that set, match the layer to your workload rather than chasing the lowest headline rate.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Training or inference</span>
    <span class="bz-flow-step-desc">Long training runs favour bare GPU clusters. Serving models favours serverless or an inference API.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Managed or raw</span>
    <span class="bz-flow-step-desc">Want the platform to handle scaling and endpoints? Pick serverless or an API. Want full control? Rent bare GPUs.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Cost or reliability</span>
    <span class="bz-flow-step-desc">Marketplaces cut cost but vary in reliability. Top-tier neoclouds and hyperscalers cost more and stay steady.</span>
  </div>
</div>

**Training vs inference.** If you fine-tune or pretrain models, you need sustained access to many GPUs with fast interconnect. Bare GPU neoclouds like [CoreWeave](/tools/coreweave/), [Lambda](/tools/lambda-cloud/), [Nebius](/tools/nebius/), and [Crusoe](/tools/crusoe/) are built for this. If you only serve models, an inference API like [Together AI](/tools/together-ai/), [Fireworks AI](/tools/fireworks-ai/), or [Groq](/tools/groq/) removes the operations work entirely, and you pay per token.

**Managed vs raw.** Serverless platforms such as [Modal](/tools/modal/) and [Baseten](/tools/baseten/) let you deploy custom code or models and scale to zero when idle, which suits spiky traffic. Raw GPU rental gives you full control over the environment but leaves scaling, endpoints, and reliability to you — see the internal-capability tradeoff above before assuming raw control is automatically the safer choice.

**Cost vs reliability.** A marketplace like [Vast.ai](/tools/vast-ai/) and cost-focused options like [RunPod](/tools/runpod/) push prices down, with more variability in hardware and uptime, per the resilience constraint above. Top-tier neoclouds and hyperscaler GPUs cost more but deliver steadier performance for production. [Paperspace](/tools/paperspace/) and [Vultr](/tools/vultr/) sit closer to a broader cloud experience, useful when GPUs are one part of a larger footprint.

If your models sit alongside existing cloud services and none of the gates above eliminate that hyperscaler, staying put can be worth a higher GPU price for the single bill, shared identity, and shared security model — see [the shared responsibility model for AI on AWS](/guides/shared-responsibility-model/) for what that security model does and doesn't cover you for. If GPU compute is the core cost and no gate rules a neocloud out, a neocloud usually wins on price for comparable raw GPU capacity, per the sourced pricing pattern in "The two camps" above — though exact gaps move fast and narrow over time, so check current rates directly before deciding on price alone.

## Provider reference

Types: **bare GPU** means you rent raw GPU instances or clusters and manage them yourself. **Serverless** means you deploy code or containers and the platform scales GPUs up and down, including to zero [14][15]. **Inference API** means you call hosted models over an endpoint and pay per token or per request. **Marketplace** means you rent capacity from many independent hosts at spot-style prices. This table describes what each option sells — it is not a re-statement of the compliance or jurisdiction facts above, and a row appearing here is not a claim that a given provider clears every constraint discussed earlier.

| Provider | Type | Main offering | Best for |
|---|---|---|---|
| [CoreWeave](/tools/coreweave/) | Bare GPU | Large managed GPU clusters with fast interconnect | Large-scale training, reliability at scale |
| [Lambda](/tools/lambda-cloud/) | Bare GPU | On-demand GPU instances and clusters | Training and fine-tuning, simple setup |
| [Nebius](/tools/nebius/) | Bare GPU | GPU cloud with managed platform layer | Training with a full cloud platform around it, or an EU-domiciled provider relationship |
| [Crusoe](/tools/crusoe/) | Bare GPU | Energy-optimized GPU clusters | Sustainability-conscious training workloads |
| [Together AI](/tools/together-ai/) | Inference API | Hosted open models plus fine-tuning and training | Open-model inference and fine-tuning |
| [Fireworks AI](/tools/fireworks-ai/) | Inference API | Fast hosted open-model inference | Low-latency open-model serving |
| [Groq](/tools/groq/) | Inference API | High-throughput inference on custom hardware | Very fast token generation |
| [Modal](/tools/modal/) | Serverless | Run Python with GPUs attached, scale to zero | Custom inference and batch jobs from code |
| [Baseten](/tools/baseten/) | Serverless | Deploy and scale ML models, model APIs | Serving custom models with autoscaling |
| [RunPod](/tools/runpod/) | Serverless plus bare GPU | Pay-as-you-go GPUs and serverless workers; Secure Cloud and Community Cloud tiers | Cost-conscious inference, varied GPU choice — verify which tier meets your compliance needs |
| [Vast.ai](/tools/vast-ai/) | Marketplace | Spot GPU rental from independent hosts, no platform-wide SLA | Lowest cost, tolerant of variable reliability |
| [Paperspace](/tools/paperspace/) | Serverless plus notebooks | GPU notebooks and deployments (DigitalOcean) | Prototyping and notebook-based work |
| [Vultr](/tools/vultr/) | Bare GPU | GPU instances across many regions | Regional GPU compute near a broader cloud |
| Hyperscalers | Bare GPU | GPUs inside AWS, Azure, GCP, Oracle | Workloads that sit next to other cloud services, or that need a specific sovereign/region offering |

## What this comparison cannot resolve for you

Some of what decides this is specific to your situation in a way no general comparison can settle:

- **Whether a specific certification's scope satisfies a specific auditor or customer.** The compliance table above records what each provider states publicly; it does not record the audit period, the exact systems in scope, or whether your specific auditor will accept it. That is a direct conversation with the provider's trust or compliance team, not something this page can stand in for.
- **Whether a jurisdictional mitigation actually holds for your case.** Whether a US-linked subsidiary, investor, or infrastructure dependency reintroduces CLOUD Act exposure for an otherwise non-US-domiciled provider is legally contested territory, not a settled fact — see [the US CLOUD Act](/glossary/cloud-act/) for why.
- **Current pricing.** Every dollar figure in this piece is dated to when it was checked and cited accordingly; GPU-hour, storage, and egress pricing across this market moves often enough that none of it should be treated as current without a direct check.
- **The compliance and jurisdiction posture of most listed providers.** We verified specific claims for CoreWeave, RunPod, Vast.ai, and Nebius this session. Nebius's exact compliance certifications, and the compliance and jurisdiction posture of Lambda, Crusoe, Together AI, Fireworks AI, Groq, Modal, Baseten, Paperspace, and Vultr, were not independently verified here — their appearance in the reference table is a description of their product category, not a claim about what they've certified or where they're domiciled.
- **The terms of your own contract.** Any negotiated SLA, indemnification clause, or data processing addendum with a specific provider governs over anything generalized here.

## Further reading

- [Constraint-driven comparisons](/guides/constraint-driven-comparisons/): the methodology this page follows, and why a feature grid is the wrong default for a decision like this.
- [What is a neocloud?](/glossary/neocloud/): the specialist GPU providers, defined against hyperscalers.
- [What is inference?](/glossary/inference/): why serving models is a distinct workload from training.
- [The US CLOUD Act](/glossary/cloud-act/): the jurisdictional mechanism behind the regulatory-exposure constraint above.
- [Data sovereignty](/glossary/data-sovereignty/): the vocabulary for separating data residency from legal control.
- [Cloud exit costs and data gravity](/guides/cloud-exit-costs-and-data-gravity/): the egress-pricing and migration-time arithmetic behind the lock-in constraint above.
- [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/): the general mechanics of exit cost applied here to GPU platforms.
- [The shared responsibility model for AI on AWS](/guides/shared-responsibility-model/): what a hyperscaler's security model does and doesn't cover you for.
- [Governance thresholds as you scale](/guides/governance-thresholds-as-you-scale/): which regulatory obligations actually trigger, and when, as a workload grows.
- [The LLM landscape in 2026](/comparisons/llm-landscape-2026/): the models you might run on this hardware.
- [ClusterMAX GPU cloud rating](https://newsletter.semianalysis.com/p/clustermax-20-the-industry-standard): SemiAnalysis's independent tiering of GPU cloud reliability and performance.

## Sources

1. SemiAnalysis, "ClusterMAX 2.0: The Industry Standard GPU Cloud Rating System" — provider tiering and the neocloud vs hyperscaler distinction: [https://newsletter.semianalysis.com/p/clustermax-20-the-industry-standard](https://newsletter.semianalysis.com/p/clustermax-20-the-industry-standard)
2. 18 U.S.C. § 2713 and the EDPB/EDPS joint assessment of the CLOUD Act's conflict with GDPR Article 48 — see [/glossary/cloud-act/](/glossary/cloud-act/) for the full statutory text and citations.
3. Wikipedia, "CoreWeave" — current headquarters (Livingston, New Jersey): [https://en.wikipedia.org/wiki/CoreWeave](https://en.wikipedia.org/wiki/CoreWeave)
4. Public corporate records reporting RunPod's incorporation in Dover, Delaware, US, cross-checked via company-profile aggregators (Crunchbase, PitchBook) during this session.
5. Vast.ai, "About Vast.ai" — headquarters (Los Angeles, California) and incorporation (Delaware C Corporation, 2016): [https://vast.ai/about](https://vast.ai/about)
6. Nebius, company page — headquarters (Amsterdam, Netherlands) and Nasdaq listing (NBIS): [https://nebius.com/company](https://nebius.com/company)
7. CoreWeave, "Trust Center" — SOC 2, ISO 27001, ISO 27017, and ISO 27018: [https://www.coreweave.com/trust](https://www.coreweave.com/trust)
8. RunPod, "Secure AI Deployments with Runpod's SOC2 Compliance": [https://www.runpod.io/articles/guides/secure-ai-deployments-soc2-compliance](https://www.runpod.io/articles/guides/secure-ai-deployments-soc2-compliance)
9. RunPod, "Data security and legal compliance" documentation — Secure Cloud vs Community Cloud distinction: [https://docs.runpod.io/references/security-and-compliance](https://docs.runpod.io/references/security-and-compliance)
10. Vast.ai, "Rental Types FAQ" — on-demand vs interruptible instances, and the absence of a platform-wide SLA: [https://docs.vast.ai/documentation/reference/faq/rental-types](https://docs.vast.ai/documentation/reference/faq/rental-types)
11. Amazon Web Services, "Amazon VPC Pricing" — $0.09/GB entry-tier rate for data transfer out to the internet: [https://aws.amazon.com/vpc/pricing/](https://aws.amazon.com/vpc/pricing/)
12. CoreWeave, "Pricing" — free data transfer between CoreWeave and the internet, and within CoreWeave: [https://www.coreweave.com/pricing](https://www.coreweave.com/pricing)
13. CoreWeave, "Introducing our Zero Egress Migration program": [https://www.coreweave.com/blog/set-your-data-free-no-egress-fees-no-catch-introducing-the-coreweave-zero-egress-migration-0em-program](https://www.coreweave.com/blog/set-your-data-free-no-egress-fees-no-catch-introducing-the-coreweave-zero-egress-migration-0em-program)
14. RunPod, "Top Serverless GPU Clouds for 2026" — serverless GPU category and provider roles: [https://www.runpod.io/articles/guides/top-serverless-gpu-clouds](https://www.runpod.io/articles/guides/top-serverless-gpu-clouds)
15. Modal, "Top 5 serverless GPU providers" — serverless platform positioning: [https://modal.com/blog/serverless-gpu-article](https://modal.com/blog/serverless-gpu-article)
16. SemiAnalysis, "How Much Do GPU Clusters Really Cost?" — Gold-tier neocloud pricing near the 25th percentile of the market against hyperscaler pricing at the 50th–75th percentile: [https://newsletter.semianalysis.com/p/how-much-do-gpu-clusters-really-cost](https://newsletter.semianalysis.com/p/how-much-do-gpu-clusters-really-cost)
17. CoreWeave, "CoreWeave First Cloud Provider to Announce General Availability of NVIDIA GB200 NVL72 Instances" (February 2025): [https://www.coreweave.com/news/coreweave-first-cloud-provider-to-announce-general-availability-of-nvidia-gb200-nvl72-instances](https://www.coreweave.com/news/coreweave-first-cloud-provider-to-announce-general-availability-of-nvidia-gb200-nvl72-instances)
