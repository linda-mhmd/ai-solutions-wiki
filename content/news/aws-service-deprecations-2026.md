---
title: "AWS Consolidates Its AI Stack: Kendra, Bedrock Agents, and Q Business Enter Maintenance Mode"
description: "In mid-2026 AWS moved a wave of services into maintenance mode and pointed customers at newer platforms: Kendra to Bedrock Knowledge Bases, Bedrock Agents to AgentCore, Q Business to Amazon Quick, and Q Developer's IDE plugins to Kiro. Updated for two later AWS retirements plus comparable Google and Microsoft deprecations landing the same week."
date: 2026-07-17
lastmod: 2026-09-03
last_updated: 2026-09-03
categories: [News]
tags: [aws, deprecation, bedrock, amazon-q, kendra, service-lifecycle, azure, google]
related:
  - news/bedrock-agentcore-general-availability
  - guides/service-lifecycle-and-deprecation
  - guides/preparing-for-ai-provider-restrictions
  - tools/azure-personalizer
---

Through June and July 2026 AWS moved a broad set of services into maintenance mode and pointed customers toward newer replacements. Several of them sit right in the AI stack: enterprise search, the original Bedrock agents feature, and the Amazon Q assistants. None of the AI services is being shut down overnight, but each is now a service you should plan to migrate off rather than build new work on. One correction up front, because the wording matters: Amazon Q Business is not "dead." It is closed to new customers and still fully supported.

<figure class="bz-figure">
  <img src="/img/rapid-ai/legacy-vs-modern-split-notext.png" alt="A split image: dark tangled cables and a server rack on one side, clean green modular cubes on the other, representing migration from a legacy system to a modern one." loading="lazy">
  <figcaption>A lifecycle wave is a migration prompt, not a fire. Maintenance mode means no new features and no new customers, while existing workloads keep running.</figcaption>
</figure>

## What happened

AWS placed the following services into maintenance mode or end of support. "Maintenance mode" is AWS's term for a service that keeps running with security and bug fixes but gets no new features and, past a cutoff date, no new customers.

| Service | What changed | Key date | AWS points you to |
|---|---|---|---|
| **Amazon Kendra** | Maintenance mode | 30 June 2026 | Bedrock Managed Knowledge Base |
| **Amazon Bedrock Agents** | Renamed "Classic", closed to new customers | 30 July 2026 | Bedrock AgentCore |
| **Amazon Q Business** | Closed to new customers, still supported | 30 July 2026 | Amazon Quick |
| **Amazon Q Developer (IDE plugins, paid tiers)** | End of support | 30 April 2027 | Kiro |
| **Amazon Cognito Sync** | Closed to new customers | 30 July 2026 | AppSync, DynamoDB |
| **Amazon SageMaker Studio Lab** | Closed to new customers | 30 July 2026 | SageMaker Studio |
| **AWS Proton** | Full end of support, data deleted after | 7 October 2026 | CloudFormation Git Sync |
| **Amazon Mechanical Turk** | Full permanent closure — existing customers affected, not just new | 30 September 2026 | No direct successor named |

Two of these need precise wording. **Amazon Q Business** is, in AWS's own language, "no longer open to new customers" as of the same wave, with AWS's June 2026 announcement giving July 30, 2026 as the effective date (AWS's Q Business migration guide itself states the policy but does not repeat the date) — and Q Business "remains fully supported," with no shutdown date announced; AWS recommends new work go to Amazon Quick. **Amazon Q Developer** is a separate product with a separate timeline: its IDE plugins and paid subscriptions reach end of support on 30 April 2027, with Kiro as the successor, while Amazon Q in the AWS Console, the documentation, and the Slack and Teams integrations are unaffected.

The clearest picture is one consolidation into three newer platforms plus one editor: retrieval and search move to **Bedrock Managed Knowledge Bases**, agent building moves to **Bedrock AgentCore**, assistants and business intelligence move to **Amazon Quick** (AWS's marketing name for the service; it is not called "Quick Suite" in AWS's own docs), and the AI coding assistant moves to **Kiro**. Amazon Bedrock itself, its Knowledge Bases, and Guardrails are not affected; only the original 2023 "Bedrock Agents" feature, now labelled "Classic," is.

Only **AWS Proton** is a true shutdown: support ends 7 October 2026, after which the console and resources become inaccessible and the data is deleted, though CloudFormation stacks Proton deployed stay intact.

## The SageMaker AI cluster

The same wave swept up a cluster of Amazon SageMaker AI features, the machine-learning tooling many teams use to train, monitor, and label. All of the following were announced on 30 June 2026 and close to new customers on 30 July 2026, in the same maintenance-mode sense as above: **Clarify** (bias and explainability), **Model Monitor** (drift detection), **Debugger**, **Ground Truth** (data labeling), **Augmented AI (A2I)** (human review), **Role Manager**, and **Geospatial** capabilities. The **Mechanical Turk** workforce integration used by Ground Truth and A2I is a separate, more severe case: AWS announced on 25 August 2026 that Mechanical Turk itself is being **permanently closed on 30 September 2026** — not just closed to new customers, but shut down for everyone, which removes the Mechanical Turk workforce option from both Ground Truth and A2I entirely.

For the two most widely used, AWS names specific replacements. For **Clarify**, it points to Amazon Bedrock Evaluations and Guardrails plus the open-source `fmeval` library and standard bias formulas. For **Model Monitor**, it points to open-source monitoring solutions built on MLflow and Evidently AI, with CloudWatch and QuickSight for dashboards. AWS's own wording for the group, from its Services in Maintenance reference: "Customers can't on-board to services and features in the maintenance stage. Customers already using these services and features can continue to do so. AWS will continue to operate and support these services and features but won't enhance or add functionality to them."

Two SageMaker items go further than maintenance mode. **Ground Truth Plus**, the managed labeling service, reached full end of support on 30 June 2026. **SageMaker Profiler** is entering sunset: closed to new customers on 30 July 2026, with full end of support on 30 June 2027.

## What "closed to new customers" really means

AWS's wording is careful, and it is worth translating into what it means in practice. "Closed to new customers" is scoped to your AWS account. If your account was not already using the service before the cutoff date, you cannot start using it at all: the create actions are blocked. Amazon Bedrock Agents Classic is explicit about the mechanism. It allowlists only accounts with usage in the past twelve months and returns an access-denied error to everyone else.

So two things are true at once. For a team already running the service, it is "still fully supported." For everyone else, a new account, a new project, or a colleague who never touched it, the service is effectively gone. That is why, for any green-field decision today, every service in this wave is off the table: you either already depend on it, or you can no longer choose it. In that practical sense these services are deprecated for new work, even though AWS avoids the word. "Closed to new customers" is the polite phrasing for "unavailable unless you were already here."

## Why it matters for builders

If your architecture rests on any of these, the clock is a planning input, not an emergency. The practical steps: check whether you have workloads on Kendra, Bedrock Agents Classic, or Q Business; note that maintenance mode still runs, so nothing breaks on the cutoff date, but new features stop and new accounts are locked out; and schedule migration to the named successor before you build anything new on the old service. Teams still on Amazon Q Developer's IDE plugins have until April 2027 and a clear path to Kiro.

The wider lesson is the one this wiki keeps returning to: on a managed cloud, the platform's lifecycle is part of your architecture. A service you picked for a good reason can enter maintenance mode on the vendor's schedule, not yours. The defence is the same as for model deprecations: know which of your dependencies are load-bearing, keep an eye on lifecycle notices, and avoid designs that are expensive to unwind. See [service lifecycle and deprecation](/guides/service-lifecycle-and-deprecation/) for how to plan around it, and [preparing for AI provider restrictions](/guides/preparing-for-ai-provider-restrictions/) for the same discipline applied to models.

## Update: two more AWS retirements since this wave

This tracker keeps growing. Two more AWS deprecations, unrelated to the original AI-stack consolidation described above, land in the same late-September window:

| Service | What changed | Key date | AWS points you to |
|---|---|---|---|
| **AWS App Mesh** | Full end of support; console and resources become inaccessible | 30 September 2026 | Amazon ECS Service Connect (for ECS) or Amazon VPC Lattice (for EKS and cross-account networking) |
| **Amazon Nova Reel v1:1** (Bedrock model) | Model reaches end of life; requests fail after this date | 30 September 2026 | A newer, Active Nova Reel model version on Bedrock |

**AWS App Mesh** is a true shutdown like AWS Proton above, not another "maintenance mode" step. Existing customers can keep creating App Mesh resources right up to the cutoff, and AWS keeps shipping security and availability updates until then, but after 30 September 2026 the App Mesh console and all App Mesh resources become inaccessible. AWS's migration guidance splits by workload: Amazon ECS users are pointed to ECS Service Connect, while Amazon EKS and cross-account users are pointed to Amazon VPC Lattice.

**Nova Reel v1:1** is a model retirement, not a service shutdown, so it runs on Bedrock's separate [model lifecycle](https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html) rather than the "maintenance mode" track above: it entered Legacy status on 30 March 2026 and reaches End-of-Life on 30 September 2026, after which requests to that specific model ID (`amazon.nova-reel-v1:1`, offered in us-east-1) fail across all regions, with no automatic migration. This is narrower than it sounds: Bedrock's model-lifecycle table also lists `amazon.nova-reel-v1:0` and Amazon Nova Canvas reaching the same 30 September 2026 EOL date, so check which specific Nova model IDs your application is pinned to.

## Beyond AWS: two more deprecations landing the same week

Two non-AWS deprecations fall in the same narrow window and are worth flagging for anyone building across clouds, even though they sit outside this article's AWS focus.

| Service | Vendor | What changed | Key date | Migrate to |
|---|---|---|---|---|
| **Gemini Omni Flash Preview** (`gemini-omni-flash-preview`) | Google | Preview model shuts down | 30 September 2026 | `gemini-omni-1.1-flash` |
| **Azure AI Personalizer** | Microsoft | Full service retirement | 1 October 2026 | Open-source [`microsoft/learning-loop`](https://github.com/microsoft/learning-loop) |

`gemini-omni-flash-preview` shipped in public preview on 30 June 2026 and, per Google's own Gemini API deprecations page, shuts down three months later on 30 September 2026 in favor of the now-generally-available `gemini-omni-1.1-flash`. That is a short preview lifecycle even by Gemini's standards, and a reminder that "preview" model IDs from any provider are not meant for production pinning.

Azure AI Personalizer, the reinforcement-learning content-selection service covered on this wiki at [Azure Personalizer](/tools/azure-personalizer/), has been closed to new resources since 20 September 2023 and is now scheduled for full retirement. Microsoft's own documentation is genuinely inconsistent here, and it is worth being precise about which sources say what. The Personalizer product docs (now archived, as of 1 September 2026, into Microsoft's "previous versions" tier) state "the Personalizer service is being retired on the 25th of August, 2026." The Microsoft Lifecycle page for Personalizer gives a third date in its own structured Support Dates table — 26 August 2026 — while separately linking out to a Microsoft announcement titled "AI services: Personalizer will be retired on 1 October 2026" (that announcement page no longer resolves). Weighing against the August dates: Azure Advisor's Service Upgrade and Retirement reference, a comprehensive, actively maintained tracker of every Azure retirement, lists Azure Personalizer retiring **1 October 2026**, grouped in the same batch as Azure Anomaly Detector and Azure Metrics Advisor — which matches independent trackers and is the most recently confirmed source we found. That is the date to plan against, though given the conflicting August dates elsewhere in Microsoft's own docs, confirm against the Azure Advisor recommendation for your own subscription before treating either date as final. Microsoft recommends migrating to the open-source `microsoft/learning-loop` project.

For the general pattern behind all of these moves, not just AWS, see [service lifecycle and deprecation](/guides/service-lifecycle-and-deprecation/).

## Sources

- AWS, "Amazon Q Business availability change": https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/qbusiness-availability-change.html
- AWS DevOps Blog, "Amazon Q Developer end of support announcement": https://aws.amazon.com/blogs/devops/amazon-q-developer-end-of-support-announcement/
- AWS, "Amazon Kendra availability change" (maintenance mode): https://docs.aws.amazon.com/kendra/latest/dg/kendra-availability-change.html
- AWS, "Amazon Bedrock Agents Classic maintenance mode": https://docs.aws.amazon.com/bedrock/latest/userguide/agents-classic-maintenance-mode.html
- AWS, "AWS Proton end of support": https://docs.aws.amazon.com/proton/latest/userguide/proton-end-of-support.html
- AWS, "Amazon Cognito Sync availability change": https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-sync-availability-change.html
- AWS, "Amazon SageMaker Studio Lab availability change": https://docs.aws.amazon.com/sagemaker/latest/dg/studio-lab-availability-change.html
- AWS, "Services in maintenance" reference (the SageMaker AI cluster and announcement dates): https://docs.aws.amazon.com/general/latest/gr/maintenance_services.html
- AWS What's New, "Announcing availability changes for AWS services and features": https://aws.amazon.com/about-aws/whats-new/2026/06/aws-service-availability/
- AWS, "Document history for App Mesh" (end-of-support notice): https://docs.aws.amazon.com/app-mesh/latest/userguide/doc-history.html
- AWS, "Amazon Bedrock model lifecycle" (Nova Reel v1:1 Legacy/EOL dates): https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html
- Google AI for Developers, "Gemini deprecations": https://ai.google.dev/gemini-api/docs/deprecations
- Microsoft, "Azure Personalizer" (Microsoft Lifecycle; table gives 26 August 2026): https://learn.microsoft.com/en-us/lifecycle/products/azure-personalizer
- Microsoft, "Personalizer documentation" (archived docs; gives 25 August 2026): https://learn.microsoft.com/en-us/azure/ai-services/personalizer/
- Microsoft, "Use Service Upgrade and Retirement recommendations" (Azure Advisor; gives 1 October 2026, grouped with Azure Anomaly Detector and Azure Metrics Advisor): https://learn.microsoft.com/en-us/azure/advisor/advisor-how-to-use-service-upgrade-retirement-recommendations

## Further reading

- [Amazon Bedrock AgentCore reaches general availability](/news/bedrock-agentcore-general-availability/): the successor to the Bedrock Agents feature now in maintenance mode.
- [Service lifecycle and deprecation](/guides/service-lifecycle-and-deprecation/): how to plan for the platform changing under you.
- [Preparing for AI provider restrictions](/guides/preparing-for-ai-provider-restrictions/): the same discipline applied to models rather than services.
- [Amazon Kendra](/tools/amazon-kendra/): the enterprise-search service now in maintenance mode.
- [Amazon Bedrock](/tools/amazon-bedrock/): the platform whose Agents feature became "Classic", unaffected otherwise.
- [Azure Personalizer](/tools/azure-personalizer/): the reinforcement-learning service now scheduled for retirement on 1 October 2026.
