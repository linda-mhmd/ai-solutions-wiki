---
title: "AWS Consolidates Its AI Stack: Kendra, Bedrock Agents, and Q Business Enter Maintenance Mode"
description: "In mid-2026 AWS moved a wave of services into maintenance mode and pointed customers at newer platforms: Kendra to Bedrock Knowledge Bases, Bedrock Agents to AgentCore, Q Business to Quick Suite, and Q Developer's IDE plugins to Kiro."
date: 2026-07-17
lastmod: 2026-07-17
last_updated: 2026-07-17
categories: [News]
tags: [aws, deprecation, bedrock, amazon-q, kendra, service-lifecycle]
related:
  - news/bedrock-agentcore-general-availability
  - guides/service-lifecycle-and-deprecation
  - guides/preparing-for-ai-provider-restrictions
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
| **Amazon Q Business** | Closed to new customers, still supported | 31 July 2026 | Amazon Quick Suite |
| **Amazon Q Developer (IDE plugins, paid tiers)** | End of support | 30 April 2027 | Kiro |
| **Amazon Cognito Sync** | Closed to new customers | 30 July 2026 | AppSync, DynamoDB |
| **Amazon SageMaker Studio Lab** | Closed to new customers | 30 July 2026 | SageMaker Studio |
| **AWS Proton** | Full end of support, data deleted after | 7 October 2026 | CloudFormation Git Sync |

Two of these need precise wording. **Amazon Q Business** is, in AWS's own language, "no longer open to new customers starting on July 31, 2026" and "remains fully supported," with no shutdown date announced; AWS recommends new work go to Amazon Quick Suite. **Amazon Q Developer** is a separate product with a separate timeline: its IDE plugins and paid subscriptions reach end of support on 30 April 2027, with Kiro as the successor, while Amazon Q in the AWS Console, the documentation, and the Slack and Teams integrations are unaffected.

The clearest picture is one consolidation into three newer platforms plus one editor: retrieval and search move to **Bedrock Managed Knowledge Bases**, agent building moves to **Bedrock AgentCore**, assistants and business intelligence move to **Amazon Quick Suite**, and the AI coding assistant moves to **Kiro**. Amazon Bedrock itself, its Knowledge Bases, and Guardrails are not affected; only the original 2023 "Bedrock Agents" feature, now labelled "Classic," is.

Only **AWS Proton** is a true shutdown: support ends 7 October 2026, after which the console and resources become inaccessible and the data is deleted, though CloudFormation stacks Proton deployed stay intact.

## The SageMaker AI cluster

The same wave swept up a cluster of Amazon SageMaker AI features, the machine-learning tooling many teams use to train, monitor, and label. All of the following were announced on 30 June 2026 and close to new customers on 30 July 2026, in the same maintenance-mode sense as above: **Clarify** (bias and explainability), **Model Monitor** (drift detection), **Debugger**, **Ground Truth** (data labeling), **Augmented AI (A2I)** (human review), the **Mechanical Turk** workforce integration, **Role Manager**, and **Geospatial** capabilities.

For the two most widely used, AWS names specific replacements. For **Clarify**, it points to Amazon Bedrock Evaluations and Guardrails plus the open-source `fmeval` library and standard bias formulas. For **Model Monitor**, it points to open-source monitoring solutions built on MLflow and Evidently AI, with CloudWatch and QuickSight for dashboards. AWS's own wording for the group, from its Services in Maintenance reference: "Customers can't on-board to services and features in the maintenance stage. Customers already using these services and features can continue to do so. AWS will continue to operate and support these services and features but won't enhance or add functionality to them."

Two SageMaker items go further than maintenance mode. **Ground Truth Plus**, the managed labeling service, reached full end of support on 30 June 2026. **SageMaker Profiler** is entering sunset: closed to new customers on 30 July 2026, with full end of support on 30 June 2027.

## What "closed to new customers" really means

AWS's wording is careful, and it is worth translating into what it means in practice. "Closed to new customers" is scoped to your AWS account. If your account was not already using the service before the cutoff date, you cannot start using it at all: the create actions are blocked. Amazon Bedrock Agents Classic is explicit about the mechanism. It allowlists only accounts with usage in the past twelve months and returns an access-denied error to everyone else.

So two things are true at once. For a team already running the service, it is "still fully supported." For everyone else, a new account, a new project, or a colleague who never touched it, the service is effectively gone. That is why, for any green-field decision today, every service in this wave is off the table: you either already depend on it, or you can no longer choose it. In that practical sense these services are deprecated for new work, even though AWS avoids the word. "Closed to new customers" is the polite phrasing for "unavailable unless you were already here."

## Why it matters for builders

If your architecture rests on any of these, the clock is a planning input, not an emergency. The practical steps: check whether you have workloads on Kendra, Bedrock Agents Classic, or Q Business; note that maintenance mode still runs, so nothing breaks on the cutoff date, but new features stop and new accounts are locked out; and schedule migration to the named successor before you build anything new on the old service. Teams still on Amazon Q Developer's IDE plugins have until April 2027 and a clear path to Kiro.

The wider lesson is the one this wiki keeps returning to: on a managed cloud, the platform's lifecycle is part of your architecture. A service you picked for a good reason can enter maintenance mode on the vendor's schedule, not yours. The defence is the same as for model deprecations: know which of your dependencies are load-bearing, keep an eye on lifecycle notices, and avoid designs that are expensive to unwind. See [service lifecycle and deprecation](/guides/service-lifecycle-and-deprecation/) for how to plan around it, and [preparing for AI provider restrictions](/guides/preparing-for-ai-provider-restrictions/) for the same discipline applied to models.

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

## Further reading

- [Amazon Bedrock AgentCore reaches general availability](/news/bedrock-agentcore-general-availability/): the successor to the Bedrock Agents feature now in maintenance mode.
- [Service lifecycle and deprecation](/guides/service-lifecycle-and-deprecation/): how to plan for the platform changing under you.
- [Preparing for AI provider restrictions](/guides/preparing-for-ai-provider-restrictions/): the same discipline applied to models rather than services.
- [Amazon Kendra](/tools/amazon-kendra/): the enterprise-search service now in maintenance mode.
- [Amazon Bedrock](/tools/amazon-bedrock/): the platform whose Agents feature became "Classic", unaffected otherwise.
