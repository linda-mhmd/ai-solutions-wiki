---
title: "Cloud Exit Costs and Data Gravity: What It Takes to Leave"
description: "Egress pricing, the EU Data Act's phase-out of switching charges by 12 January 2027, migration-time arithmetic, and why large datasets become architecturally immovable. The costs that decide whether leaving a provider is possible at all."
date: 2026-09-02
lastmod: 2026-09-02
last_updated: 2026-09-02
categories: [Guides]
tags: ["cloud-costs", "egress", "data-gravity", "vendor-lock-in", "eu-data-act", "migration", "finops"]
related:
  - guides/software-licensing-and-vendor-lock-in
  - comparisons/on-premise-vs-cloud-ai
  - guides/finops-for-ai
  - guides/ai-total-cost-ownership
---

Most cloud cost analysis models the cost of *running*. Far less models the cost of *leaving*, which is the number that decides whether a provider choice is reversible. Two forces make exit expensive, and only one of them is a price list: **egress charges**, which are shrinking under regulatory pressure, and **data gravity**, which is not.

## Egress: the shrinking half of the problem

Outbound data transfer has historically been asymmetric. Uploading to a cloud is free; retrieving at scale is billed per gigabyte, commonly in the region of $0.05–$0.09/GB to the internet for major providers, with lower rates for cross-region transfer. Inbound free, outbound charged, is what makes a dataset easier to accumulate than to reclaim.

Three things have changed this since 2024.

**Provider policy changes.** Google Cloud announced free network data transfer for customers migrating off the platform on **11 January 2024**; AWS followed on **3 March 2024**. Both are conditional rather than blanket: they require approval from the provider's account or support team, and Google's version requires a full exit completed within 60 days, whereas AWS's does not require closing the account. Neither reduces the cost of ordinary day-to-day egress.

**The EU Data Act.** Regulation (EU) 2023/2854 makes this a legal obligation rather than a courtesy. Article 29 sets a two-stage phase-out for providers of data processing services:

| Period | Rule |
|---|---|
| 11 Jan 2024 – 12 Jan 2027 | Reduced switching charges permitted, but they **must not exceed the costs directly linked to the switching process** |
| From **12 January 2027** | Providers **may not impose any switching charges** for the switching process |

**The distinction that gets lost.** This applies to *switching*. Regular operational egress — serving your data to your own users, replicating between regions, pulling results back for processing — is untouched and remains billable indefinitely. Reading "egress fees are abolished in 2027" as "data transfer becomes free" is a costly misreading. Providers may also still charge for services beyond the Act's minimum, such as accelerating a migration or converting data into a specific format.

## Data gravity: the half that is not going away

Even at zero cost per gigabyte, a large dataset resists movement. **Data gravity** describes the tendency of applications and services to accumulate around large datasets, because moving compute to the data is cheaper than the reverse. The larger the dataset, the more that is true, and the effect compounds.

Three mechanisms, none of which a price change addresses:

**1. Time.** Transfer is bandwidth-bound. A useful sanity check before any migration plan:

```
hours = (TB × 8,000) / (Gbps × 3,600) ÷ efficiency
```

At a sustained 1 Gbps with 70% efficiency, 100 TB takes roughly 320 hours — about 13 days of continuous transfer. At 10 Gbps, a day and a half. Most organisations do not have a dedicated 10 Gbps path they can saturate for days without affecting production. This is why providers sell physical transfer appliances (AWS Snowball, Azure Data Box, Google Transfer Appliance): past a certain size, shipping disks is genuinely faster than the internet, and it is a real line item, not a joke.

**2. Coupling.** The data is rarely the hard part. Identity, event wiring, managed database dialects, proprietary serverless runtimes, and IAM policy all have to be rebuilt. A dataset in object storage is portable; the forty Lambda functions, the event bus, and the queue semantics around it are not.

**3. Continuity.** You cannot usually stop writing for thirteen days. Real migrations run dual-write or continuous replication with a cutover, which means paying for both platforms simultaneously for the overlap — often the single largest line in the migration budget, and the one most often omitted.

## What this means in practice

**Model the exit before the entry.** At the point of choosing a platform, record: how much data will accumulate, what it would cost and take to retrieve it, and which services have no equivalent elsewhere. It takes an hour, and it is the only time anyone will do it dispassionately.

**Keep the data where leaving is cheapest.** This is the structural reason hybrid architectures persist: if the bulk dataset stays on storage you already own and only processing happens in a cloud, there is no accumulated egress liability and no gravity well. You pay for compute when you use it, and the exit cost stays near zero. This trade-off is quantified in [on-premise vs cloud AI](/comparisons/on-premise-vs-cloud-ai/).

**Distinguish the layers you can move from the ones you cannot.** Object storage and containers are portable. Managed databases are portable with effort. Proprietary orchestration, event routing, and identity are usually rewrites. Concentrating lock-in in the layers that are cheap to replace is a design decision available at the start and almost never available later.

**Treat the 2027 date as a planning input, not a solution.** It removes a fee. It does not move your data, decouple your services, or pay for the overlap period.

**Measure egress continuously.** Unexpected egress growth is one of the most common cloud cost surprises and often signals an architectural mistake — a chatty cross-region call, an unintended public download path, an analytics job pulling raw data out rather than pushing compute in. See [FinOps for AI](/guides/finops-for-ai/).

## Why AI workloads make this sharper

Model artefacts and training corpora are large, and inference is chatty. Three specifics:

- **Weights are big.** A frontier open-weight checkpoint can be hundreds of gigabytes. Moving a model registry between providers is a data-transfer project.
- **Training data has the strongest gravity of anything you own.** It is large, it is append-only, and everything else clusters around it.
- **Retrieval systems multiply reads.** A [RAG](/glossary/rag/) system reads its index constantly. If the index and the model sit on different sides of a network boundary, egress is a per-query cost, not a one-off.

The practical consequence is that where you put the training data and the vector index determines where everything else ends up. Choose that location on the assumption you will one day want to leave it.

## Further reading

- [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/): the contractual side of the same problem.
- [On-premise vs cloud AI](/comparisons/on-premise-vs-cloud-ai/): the break-even calculation, including transfer costs.
- [FinOps for AI](/guides/finops-for-ai/): measuring egress before it surprises you.
- [Multi-cloud AI strategy](/guides/multi-cloud-ai-strategy/): whether spreading across providers actually helps.
- [Data sovereignty](/glossary/data-sovereignty/): the legal constraints that often decide location first.

## Sources

1. European Union. "Regulation (EU) 2023/2854 (Data Act)," Article 29 — Gradual withdrawal of switching charges. [https://eur-lex.europa.eu/eli/reg/2023/2854/oj](https://eur-lex.europa.eu/eli/reg/2023/2854/oj)
2. European Commission. "Data Act" overview and application dates. [https://digital-strategy.ec.europa.eu/en/policies/data-act](https://digital-strategy.ec.europa.eu/en/policies/data-act)
3. Latham & Watkins. "EU Data Act: Significant New Switching Requirements Due to Take Effect for Data Processing Services." [https://www.lw.com/en/insights/eu-data-act-significant-new-switching-requirements-due-to-take-effect-for-data-processing-services](https://www.lw.com/en/insights/eu-data-act-significant-new-switching-requirements-due-to-take-effect-for-data-processing-services)
4. DataCenterDynamics. "Google Cloud removes exit fees" (January 2024). [https://www.datacenterdynamics.com/en/news/google-cloud-removes-exit-fees/](https://www.datacenterdynamics.com/en/news/google-cloud-removes-exit-fees/)
5. DataCenterDynamics. "AWS removes some data transfer fees for customers exiting its cloud" (March 2024). [https://www.datacenterdynamics.com/en/news/aws-removes-some-data-transfer-fees-for-customers-exiting-its-cloud/](https://www.datacenterdynamics.com/en/news/aws-removes-some-data-transfer-fees-for-customers-exiting-its-cloud/)
6. Amazon Web Services. "AWS Snow Family" (physical data transfer). [https://aws.amazon.com/snow/](https://aws.amazon.com/snow/)
7. Microsoft. "Azure Data Box." [https://azure.microsoft.com/en-us/products/databox/](https://azure.microsoft.com/en-us/products/databox/)
8. Google Cloud. "Transfer Appliance." [https://cloud.google.com/transfer-appliance/docs/4.0/overview](https://cloud.google.com/transfer-appliance/docs/4.0/overview)
