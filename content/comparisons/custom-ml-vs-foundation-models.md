---
title: "Custom ML Models vs Foundation Models: The Constraints That Decide It"
description: "SageMaker AI custom training vs Bedrock foundation models, organized around what actually rules an option out for a given team — ML capability, cost structure, EU AI Act provider status, and vendor-driven model lifecycles — not a feature checklist with a recommendation bolted on."
date: 2026-03-24
last_verified: 2026-09-03
categories: [Comparisons]
tags: ["ai-ml", "intermediate", "custom-ml", "foundation-models", "comparison", "build-vs-buy", "llm", "decision-making", "eu-ai-act"]
tools: [amazon-sagemaker, amazon-bedrock]
last_updated: 2026-09-03
lastmod: 2026-09-03
related:
  - guides/constraint-driven-comparisons
  - guides/shared-responsibility-model
  - guides/software-licensing-and-vendor-lock-in
  - guides/governance-thresholds-as-you-scale
  - comparisons/sagemaker-vs-bedrock
  - comparisons/fine-tuning-vs-prompt-engineering
---

Build vs. buy for AI usually narrows, on AWS, to a specific pair: fine-tune or train a custom model on SageMaker AI, or call a foundation model through Bedrock. The standard way to compare them is a feature list — cost per call, latency, accuracy — ending in "choose custom when you need X, choose a foundation model when you need Y." That comparison is real, but it is not where the decision actually starts for most teams. What usually decides it is narrower and more concrete: whether the team has the ML engineering capacity to run a training pipeline at all, whether the fine-tuning you're planning tips you into a different legal role under the EU AI Act, whether you can live with a foundation model's lifecycle forcing a migration on a schedule you don't control, and what a specific customer's data-handling requirement actually rules in or out. This page works through those constraints first, and narrows to feature-level detail only for what survives them. See [Constraint-driven comparisons](/guides/constraint-driven-comparisons/) for the reasoning behind organizing it this way.

## What each option actually is

**Foundation models via Bedrock.** Amazon Bedrock is a multi-provider catalog accessed through a single API: Anthropic Claude, Amazon Nova (the successor to the earlier Amazon Titan family), Meta Llama, Mistral, Cohere, and, since June 2026, OpenAI models (GPT-5.5, GPT-5.4, and Codex are generally available on Bedrock) [1][3]. These models are trained on massive general-purpose datasets and perform well on a wide range of tasks out of the box, without any training data of your own. Default on-demand pricing is per token, billed separately for input and output, with batch inference, provisioned throughput, and prompt caching available as lower-cost options for the right workload shape [2].

**Custom ML on SageMaker AI.** The original Amazon SageMaker was renamed SageMaker AI at re:Invent 2024; the name Amazon SageMaker now refers to the broader unified data, analytics, and AI platform, with SageMaker AI remaining the place you build, train, and deploy models [4]. Training a purpose-built model on your own labeled data produces a model specialized for your specific task. SageMaker AI covers more than classic ML — it also supports fine-tuning and customizing foundation models, such as a custom Amazon Nova model — so "custom ML" here is really a spectrum from from-scratch classifiers to fine-tuned foundation models, not a single technique. Training and inference are billed by instance-hour rather than per token [5].

| | Foundation model via Bedrock | Custom model via SageMaker AI |
|---|---|---|
| Training data required to start | None — works with prompting | Labeled examples (rule of thumb: 1,000+ per class minimum, 10,000+ for strong performance — a common engineering heuristic, not a formal benchmark) |
| Typical inference latency | Roughly 100–500ms for LLM inference | Roughly 5–20ms for a small deployed classifier |
| Output behavior | Generative, variable by default; determinism needs extra engineering | Deterministic for classification/regression tasks |
| Pricing unit | Per input/output token (on-demand), or batch / provisioned-throughput / prompt-caching | Per instance-hour, for both training and hosting |

This table is descriptive, not a scorecard — which cell matters to you depends on the constraints below, not on which column has more entries.

## The constraints that decide it

### Internal capability and knowledge retention — the practical gate

Operating a SageMaker AI training pipeline requires real ML engineering skill: preparing a labeled dataset, choosing and tuning a training approach, evaluating it honestly, deploying it as an endpoint, and then watching for drift and retraining as the input distribution shifts. That capability requirement is worth naming as a gate rather than a soft preference: a team with no ML engineering capacity in-house, and no near-term plan to hire or contract for it, cannot realistically operate the custom-model path today — regardless of how favorable its unit economics look on paper at your volume. It is a gate on the organization's *current* state, not a technical one; unlike a jurisdictional gate, it can be removed by hiring, contracting, or training people, which is exactly why it is worth distinguishing from a constraint that money alone cannot fix.

Foundation models via Bedrock invert this: no training data curation, no pipeline to operate, and capability improvements arrive from the provider without your engineering effort. Fine-tuning an existing foundation model on SageMaker AI sits in between — it needs real ML judgment but not the full classic-ML pipeline competence a from-scratch classifier does.

### Regulatory exposure: EU AI Act provider vs. deployer status

This is not a jurisdiction question — both services run on AWS, so it doesn't depend on which of the two you pick. It's about legal role under Regulation (EU) 2024/1689, and it's a genuine gate in the sense that it's a legal designation, not a preference you can weigh against cost.

Simply calling a Bedrock foundation model through its API and using the response makes you a **deployer** of that model, not a provider. None of the provider obligations in Articles 53 and 55 — technical documentation and the training-data summary under Article 53, or the additional systemic-risk testing Article 55 imposes above the compute threshold — fall on a deployer [6]. Fine-tuning an existing foundation model on SageMaker AI does not, by itself, change that. But the European Commission's GPAI Guidelines set an *indicative* threshold — training compute for the modification exceeding roughly one-third of the compute used to train the original model — past which the fine-tuning counts as a "significant modification," and you become the provider of the modified model, with a training-data-summary obligation of your own. For most teams fine-tuning on a few thousand labeled examples this threshold is far away; it becomes a live question only for heavier customization. See [Governance Thresholds as You Scale](/guides/governance-thresholds-as-you-scale/) for the full mechanics, the exact compute-ratio sourcing, and why the guidelines treat it as a signal rather than an exclusive bright line.

A from-scratch classical model trained on your own labeled data on SageMaker AI — the kind "custom ML" usually means in the classification/regression sense — is not a modification of anyone's GPAI model at all, so this specific gate doesn't apply to it. It's relevant only on the fine-tuning end of the SageMaker AI spectrum.

### Trust and data access: does the model provider see your data?

A common version of this worry, stated plainly: "if we call Bedrock, does Anthropic — or Meta, or Mistral, or Cohere, or OpenAI — get access to our prompts?" AWS documents a specific architecture that answers this: Bedrock maintains a separate model deployment account per model provider in each region, performs a deep copy of that provider's inference software into the account, and the model providers have no access to those accounts — which AWS states directly means "they don't have access to Amazon Bedrock logs or to customer prompts and completions" [7]. On-demand prompts and completions are not used to train or improve the underlying models, and any model customization you run uses a private copy of the base model, so a fine-tuned model's training data is not shared with the model provider either [8]. If a customer's security questionnaire asks this exact question, that's the sourced, factual answer for Bedrock specifically — though it's a fair question to ask of any foundation model provider, since not every vendor's architecture works the same way.

**What this doesn't resolve.** Both SageMaker AI and Bedrock are AWS services, so AWS itself sits under the same shared responsibility boundary [9] — and the same underlying jurisdictional exposure, since AWS is a US company subject to US legal process regardless of which of the two you choose. If your actual constraint is "we do not want a US-headquartered provider able to access this data under any circumstance," this comparison does not resolve it; that constraint is about the choice of cloud provider and region, not Bedrock vs. SageMaker AI within AWS. See [The US CLOUD Act](/glossary/cloud-act/) for the statutory basis of that exposure and [On-premise vs cloud for AI workloads](/comparisons/on-premise-vs-cloud-ai/) for that layer of the decision.

### Cost structure and sunk investment

Foundation models via Bedrock price per token, so cost scales directly and continuously with usage. As an illustration, at a mid-tier model's on-demand rate (Claude Sonnet-tier pricing runs roughly $3 per million input tokens and $15 per million output tokens on Bedrock), processing on the order of 1 million tokens per day works out to roughly a few hundred EUR per month, depending on the input/output mix — check the current Bedrock pricing page for exact, current per-token rates, which vary by model, provider, and region and which AWS has continued to add options against, including Flex/Priority/Reserved service tiers and per-request routing pricing [2].

Custom SageMaker AI models price by instance-hour for both training and hosting: a deployed endpoint for a small classifier runs roughly 100–300 EUR/month regardless of volume, and a moderately complex training run costs roughly 50–500 EUR in compute and takes hours to days [5]. That fixed-cost shape sits behind an upfront investment, not in front of it: labeling a training set is a sunk cost the moment it's paid for, and it changes the marginal economics of staying on the custom-model path even if a newer foundation model would technically outperform it on raw capability — which is the sunk-investment half of this constraint, distinct from a pure per-unit price comparison.

One wrinkle connects cost back to the resilience constraint below: once a Bedrock model enters "public extended access" near the end of its life, pricing is set by the model provider, and AWS's own guidance is that customers "should expect higher pricing" during that window [10]. A foundation-model workload's per-token cost is not fixed for the life of the model version the way a self-trained SageMaker AI model's compute cost is; it can rise as the specific model ages, independent of anything you did.

### Resilience and business continuity: who controls the model's lifecycle

Every model offered on Bedrock moves through a defined lifecycle: **Active**, then **Legacy**, then **End-of-Life (EOL)**. A model stays on Bedrock at least 12 months before its EOL date, spends at least 6 months in Legacy before EOL (or, for EOL dates after 1 February 2026, a minimum 3 months in Legacy followed by a minimum 3-month "public extended access" period at potentially higher, provider-set pricing), and after the EOL date requests to that model fail outright — migration is not automatic, and you must update your application code before that date [10]. AWS publishes per-model Legacy and EOL dates and notifies account owners, so this is trackable, but it runs on AWS's and the model provider's schedule, not yours: a Bedrock-based system carries a recurring, vendor-scheduled migration obligation baked into the platform for as long as it depends on any specific model version.

A custom model trained and deployed on SageMaker AI has no equivalent externally-imposed retirement date. It keeps serving traffic until you decide to retrain or retire it. That cuts both ways: you are then fully responsible for detecting drift and deciding when a retrain is actually needed, where Bedrock's lifecycle at least forces a periodic, provider-driven capability refresh you might not otherwise schedule for yourself.

### Vendor lock-in and exit cost

Both paths tie you into AWS-specific tooling to different degrees, and neither is portable by default. Prompting and behavior tuning built around one foundation model family's quirks doesn't transfer cleanly to a different model without re-validation, even though Bedrock's single API surface across providers lowers the plumbing cost of trying a different one. A SageMaker AI-trained model artifact is yours to export, but a pipeline built deeply on SageMaker-specific tooling — Pipelines, Feature Store, built-in algorithms — accumulates its own switching cost, the same way any platform-specific tooling does. [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/) has the general framework for pricing this out concretely for your specific tooling choices, rather than treating it as a vague worry on either side.

## Where the constraints land

| Constraint | Gate or tradeoff | What it implies |
|---|---|---|
| Internal ML capability | Practical gate (removable by hiring/contracting) | No in-house or contracted ML engineering capacity rules out the custom-model path today, independent of its unit economics |
| EU AI Act provider/deployer status | Legal gate, narrow and threshold-triggered | Calling a Bedrock foundation model keeps you a deployer; fine-tuning past the significant-modification compute threshold makes you the provider of the modified model |
| Model-provider access to your data | Resolved for Bedrock specifically, not a live constraint | AWS's Bedrock architecture keeps model providers out of your prompts and completions; verify the same for any other FM provider you're considering |
| Cost structure | Tradeoff | Per-token cost grows continuously with volume; instance-hour cost is fixed once deployed but sits behind an upfront labeling and training investment |
| Model lifecycle / resilience | Tradeoff | Bedrock forces periodic, vendor-scheduled migration and can raise pricing near end-of-life; SageMaker AI's custom model has no imposed retirement but also no imposed refresh |
| Vendor lock-in | Tradeoff | Prompt/behavior tuning and SageMaker-specific pipeline tooling both create switching costs, of different kinds |

Unlike a comparison where a jurisdictional rule rules an entire option out, most of what decides this one is genuine tradeoffs to weigh, not binary excludes — internal capability is the one that comes closest to a hard gate for most teams, and the AI Act provider question is a real but narrow one.

## The hybrid architecture most teams actually land on

Most mature AI systems on AWS use both services rather than choosing one. The common pattern:

1. Foundation model during prototyping and for complex or rare cases.
2. Foundation model generates training-data labels for the high-volume, well-defined slice of the task.
3. A custom SageMaker AI model trained on those labels handles that volume.
4. The foundation model serves as fallback when the custom model's confidence is low.

This gets cost efficiency at scale while keeping flexibility for edge cases: the custom model handles 80–90% of traffic at low, fixed cost, and the foundation model handles the remaining 10–20% where it's actually needed. It also reframes several of the constraints above rather than eliminating them — you still need the ML capability to build and maintain the custom-model half, and the foundation-model half still carries its lifecycle and per-token cost exposure; the hybrid just narrows how much traffic each constraint touches.

## What this comparison cannot resolve

- **Exact current pricing** for the specific Bedrock models and SageMaker AI instance types you'd use. Rates vary by model, instance type, and region, and change over time — check the live pricing pages linked in Sources before budgeting.
- **Whether your specific fine-tuning plan crosses the EU AI Act's significant-modification compute threshold.** That's a computation specific to your training compute and the base model's disclosed or presumed training compute; this page names the constraint, [Governance Thresholds as You Scale](/guides/governance-thresholds-as-you-scale/) has the mechanics, but the actual number is yours to run.
- **Whether a specific customer's security questionnaire or contract treats "processed via a third-party-model AWS service, provider has no logged access" as sufficient**, or requires something stricter. That's a negotiation with that specific counterparty, not something a general comparison can settle.
- **The exact Legacy and EOL dates for whichever specific model you deploy on Bedrock.** These are published per model and change; check the model lifecycle page directly before committing a long-lived system to a specific model version.
- **Whether AWS itself is the right jurisdiction for your data at all**, as opposed to Bedrock vs. SageMaker AI specifically within AWS. That's a separate, prior decision — see [Data sovereignty](/glossary/data-sovereignty/) and [On-premise vs cloud for AI workloads](/comparisons/on-premise-vs-cloud-ai/).

## Related comparisons

For a head-to-head on the two services themselves outside this constraint framing, see {{< relref "comparisons/sagemaker-vs-bedrock" >}}. The build-versus-buy decision more broadly is covered in {{< relref "comparisons/build-vs-buy-ai" >}}, and fine-tuning versus prompting in {{< relref "comparisons/fine-tuning-vs-prompt-engineering" >}}.

## Sources

1. [Amazon Bedrock](https://aws.amazon.com/bedrock/) - foundation model providers and platform capabilities.
2. [Amazon Bedrock pricing](https://aws.amazon.com/bedrock/pricing/) - on-demand (per token), batch, provisioned throughput, service tiers, and prompt caching options.
3. [OpenAI models now generally available on Amazon Bedrock](https://www.aboutamazon.com/news/aws/bedrock-openai-models) - GPT-5.5, GPT-5.4, and Codex on Bedrock (June 2026).
4. [What is Amazon SageMaker?](https://docs.aws.amazon.com/next-generation-sagemaker/latest/userguide/what-is-sagemaker.html) - confirms the original SageMaker was renamed SageMaker AI and explains the next-generation platform.
5. [Amazon SageMaker AI pricing](https://aws.amazon.com/sagemaker/ai/pricing/) - training and inference billed by instance-hour.
6. Regulation (EU) 2024/1689 (AI Act), Article 53 (baseline obligations for providers of general-purpose AI models) and Article 55 (additional obligations for providers of general-purpose AI models with systemic risk), EUR-Lex: [https://eur-lex.europa.eu/eli/reg/2024/1689/oj](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)
7. [Data protection in Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html) - AWS documentation on per-provider model deployment accounts and model providers' lack of access to customer prompts and completions.
8. [Amazon Bedrock security and compliance](https://aws.amazon.com/bedrock/security-compliance/) - on model customization using a private copy of the base model, not shared with or used to improve models for other customers or the model provider.
9. [The Shared Responsibility Model for AI on AWS](/guides/shared-responsibility-model/) - the data, model, and infrastructure responsibility split across Bedrock and SageMaker, and confirmation that Bedrock does not use prompts to train foundation models.
10. [Amazon Bedrock model lifecycle](https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html) - Active/Legacy/EOL states, minimum durations, public extended access pricing, and migration responsibility.

## Further reading

- [Constraint-driven comparisons](/guides/constraint-driven-comparisons/): the methodology behind organizing this page around constraints rather than features.
- [The Shared Responsibility Model for AI on AWS](/guides/shared-responsibility-model/): the fuller data/model/infrastructure boundary this page's trust-and-access section draws on.
- [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/): the general framework for pricing out exit cost, applied here qualitatively.
- [Governance Thresholds as You Scale](/guides/governance-thresholds-as-you-scale/): the full EU AI Act provider-vs-deployer mechanics and the significant-modification compute threshold.
- [Cloud exit costs and data gravity](/guides/cloud-exit-costs-and-data-gravity/): what it actually costs to move training data and model artifacts once they've accumulated somewhere.
- [The US CLOUD Act](/glossary/cloud-act/): the jurisdictional exposure this comparison shares equally across both options, since both are AWS.
