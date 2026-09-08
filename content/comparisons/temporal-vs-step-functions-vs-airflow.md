---
title: "Temporal vs AWS Step Functions vs Apache Airflow for Durable Agent Orchestration"
description: "For a workflow that has to wait hours or days on a human approval or a slow tool call, the load-bearing question isn't features — it's whether the platform can even be deployed outside AWS, what a multi-day wait actually costs, and whether Airflow's 2026 human-in-the-loop operators closed the gap with Temporal."
date: 2026-09-04
categories: [Comparisons]
tags: ["temporal", "aws-step-functions", "apache-airflow", "durable-execution", "workflow-orchestration", "ai-agents", "human-in-the-loop", "vendor-lock-in"]
tools: ["temporal", "aws-step-functions", "apache-airflow"]
related:
  - guides/constraint-driven-comparisons
  - guides/durable-execution-for-agent-workflows
  - comparisons/airflow-vs-step-functions
  - patterns/human-in-the-loop
  - guides/software-licensing-and-vendor-lock-in
  - glossary/workflow-engine
last_verified: 2026-09-04
last_updated: 2026-09-04
lastmod: 2026-09-04
---

An agent orchestration workflow that dispatches a tool call and gets a result back in two seconds does not need any of the three platforms compared here — a retry decorator and a queue will do. The question these three exist to answer is different: what happens to a multi-step workflow when one of its steps is "wait for a human to click approve" or "wait for a slow external job to finish," and that wait runs from hours to days, spanning process restarts, deploys, and autoscaling events the workflow's own code has no control over. That is a narrower, harder problem than generic ETL scheduling, and it is the one this page is scoped to. A broader, ML-pipeline-focused comparison of Airflow and Step Functions already exists at [Airflow vs Step Functions for ML pipelines](/comparisons/airflow-vs-step-functions/) and is not repeated here; see [durable execution for agent workflows](/guides/durable-execution-for-agent-workflows/) for the mechanics of why an agent's own process is not durable storage in the first place.

## What each one actually is

**Temporal** is an open-source durable execution platform. Workflow logic is written as ordinary code (Go, Java, TypeScript, Python, or .NET) rather than a declarative spec; the Temporal Server persists every step as an Event History so a crashed Worker process can be replaced and the workflow resumed without repeating completed work [1]. It runs self-hosted or as Temporal Cloud, the company's managed SaaS.

**AWS Step Functions** is a fully managed, serverless state-machine service. Workflows are defined in Amazon States Language (JSON or YAML) and execute as either Standard Workflows (up to one year, audited, priced per state transition) or Express Workflows (up to five minutes, priced per request and duration) [2][3]. It has no self-hosted form and runs only inside AWS.

**Apache Airflow** is an open-source, Python-DAG batch orchestrator, governed as a top-level Apache Software Foundation project under the Apache License 2.0 since January 2019 [4]. Airflow 3.0 (April 2025) and, more directly relevant here, Airflow 3.1 (September 2025) and 3.3 (July 2026) changed what it can do with a paused task — covered in detail below. It runs self-hosted, as Amazon MWAA, or as Google Cloud Composer.

## The constraints that actually apply

### Gates

**Deployability outside AWS.** Step Functions has no self-hosted, on-premises, or other-cloud form — it is a regional AWS service, full stop [2]. If a reader's constraint is "must be able to run this workflow engine outside AWS" (multi-cloud mandate, on-prem/air-gapped requirement, an exit strategy from AWS specifically), Step Functions is not a candidate to weigh against the other two — it is eliminated before any feature comparison starts. Temporal (self-hosted, MIT-licensed [5]) and Airflow (self-hosted, Apache 2.0 [4]) both remain available regardless of cloud.

**A single wait or execution that must exceed roughly a year.** AWS documents a one-year maximum execution time for Standard Workflows, including a task waiting on a callback token — a limit AWS's own quota documentation lists among its hard, non-adjustable quotas for task executions, with the same one-year ceiling repeated for execution and idle time [6]. Express Workflows cap out at five minutes and, separately, do not support the callback-token wait pattern at all [7]. A reader whose workflow must be able to sit open for longer than a year in a single execution (a slow-moving compliance case, a multi-year entitlement) cannot use Step Functions for that step, regardless of everything else about the comparison. Neither Temporal nor Airflow enforces a platform-wide wall-clock ceiling of that kind (Temporal's actual constraint is different — see Tradeoffs, below).

**A policy requiring vendor-neutral foundation governance for adopted open-source software.** Airflow is governed by the ASF's meritocratic Project Management Committee process [4]. Temporal's server and SDKs are MIT-licensed [5], but the project itself has not been donated to a neutral foundation — it remains the copyrighted work of Temporal Technologies Inc., the same company that sells Temporal Cloud, per the project's own LICENSE file [5]. For an organization whose approved-open-source-software policy specifically requires foundation governance (some regulated enterprises do write this into procurement), that rules Temporal out regardless of the MIT license's permissiveness. This is a narrower and less common gate than the first two, but it is a real, checkable one where it applies — see [software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/) for why a permissive license does not, by itself, answer a governance-control question.

### Tradeoffs

**What a multi-day wait actually costs.** Step Functions Standard bills per state transition, not per unit of time [3] — a task parked on a callback token for a week does not itself accrue an ongoing charge; the workflow only pays when it transitions. Temporal Cloud bills per Action (starting a Workflow, a Signal, a Heartbeat) at a tiered rate starting at $50 per million and declining to $25 per million for the 100M–200M tier — above 200M/month, Temporal moves pricing to a negotiated Sales conversation rather than a published per-million rate [8] — plus separate Active Storage ($0.042/GB-hour) and Retained Storage ($0.00105/GB-hour) charges that accrue for as long as a workflow's Event History exists — including while it is paused waiting on a signal [8]. For a workflow that stays open for days with a large payload in its history, that storage line item is a real, ongoing cost Step Functions' pricing model does not have an equivalent to. Airflow's cost structure is a function of deployment mode rather than wait duration: a standard MWAA environment bills hourly regardless of whether any DAG is running [9], while MWAA Serverless (launched November 2025) bills per task-second with no charge for idle infrastructure [9] — how a days-long `awaiting_input` task interacts with Serverless billing specifically is not detailed in AWS's public pricing page as of this writing, and is worth confirming with AWS directly before relying on it.

**Operational burden.** Step Functions has zero infrastructure to operate, by construction. Self-hosted Temporal requires running the Temporal Server plus a persistence layer (Cassandra, MySQL, or PostgreSQL, with Elasticsearch optional for advanced visibility) [1] — Temporal Cloud removes that burden at the Actions-based price above. Self-hosted Airflow requires a scheduler, web server, metadata database, and worker fleet [4]; MWAA and MWAA Serverless remove that burden in exchange for AWS's pricing and AWS's release cadence for new Airflow versions.

**Portability and exit cost.** ASL state machines are AWS-specific with no meaningful export path to another platform. Temporal workflows are ordinary application code, portable between self-hosted Temporal and Temporal Cloud without a rewrite. Airflow DAGs are Python and are, per AWS's own documentation, "broadly portable" between MWAA, self-hosted Airflow, and Google Cloud Composer [9].

**Long-running execution mechanics.** Temporal does not impose a wall-clock ceiling, but a single Workflow Execution's Event History is capped at 51,200 events or 50 MB — exceeding either terminates the workflow with an error — which is why genuinely long-lived or high-signal-volume workflows are expected to use the Continue-As-New pattern to reset their history periodically [10]. That is an operational discipline a team has to know to apply; Step Functions' one-year cap is a simpler, harder ceiling with no equivalent pattern to learn, and Airflow's DAG-run model has no comparable concept at all.

## The mechanism that actually differs: waiting on a signal without polling

This is the question the research behind this page treats as decisive for agent workloads specifically: can a workflow suspend on an external signal — a human approval, a slow tool call — for hours or days, without the platform (or a hand-rolled loop) polling something on an interval to check?

| | Temporal | AWS Step Functions | Apache Airflow |
|---|---|---|---|
| Mechanism | Signals: an external caller sends a Signal to a running Workflow; the Workflow suspends on `await`/a condition until it arrives [11] | Callback with Task Token: an external system calls `SendTaskSuccess`/`SendTaskFailure`/`SendTaskHeartbeat` with a token the workflow handed it [7] | As of 3.3 (July 2026): a dedicated, scheduler-managed `awaiting_input` task state, resumed by a human/API response or a timeout sweep [12][13] |
| Resource held while waiting | No thread, DB connection, or polling loop — an entry in Temporal's datastore [11] | Nothing — no compute billed while the token is outstanding [3][7] | Nothing — as of 3.3, no worker slot, no Triggerer, no pool slot [12] |
| Availability | Any Workflow, any SDK language, general-purpose (arbitrary code can run on signal receipt) | Standard Workflows only — Express Workflows do not support `.waitForTaskToken` [7] | Built-in HITL operators (`ApprovalOperator`, `HITLBranchOperator`, `HITLEntryOperator`) added in 3.1 (Sept 2025) [14]; ships a review UI out of the box |
| Max wait | No platform ceiling (subject to Event History limits above) [10] | One year (Standard Workflows' execution quota) [6] | No platform-advertised ceiling; per-task `response_timeout` is configurable and optional |

The detail that matters most for teams relying on older comparisons: through Airflow 3.0, a paused HITL-style task was a deferred operator running on the Triggerer — event-driven rather than busy-polling, but still occupying a Triggerer resource [12]. As of **Airflow 3.1 (released September 25, 2025)**, four HITL operators shipped in the standard provider package with a built-in web-form review UI in the Airflow UI [14]. As of **Airflow 3.3 (released July 2026)**, the mechanism changed again: a waiting task moved to a scheduler-managed `awaiting_input` state that holds no worker slot, no Triggerer, and no pool slot at all, letting the Triggerer scale to zero even while tasks sit waiting [12]. Amazon MWAA added support for Airflow 3.3.1 on **September 1, 2026** [15] — three days before this page's verification date — so the managed AWS offering is current with this change, not lagging behind it. The older claim that "Airflow can't do signal-driven waits without polling, only Temporal can" was accurate through 2024 and is no longer accurate as of mid-2026.

What Airflow's HITL operators do not (yet, as documented) provide is Temporal's generality: a Temporal Signal can carry arbitrary data into arbitrary running workflow code, including code that reacts by canceling other in-flight steps, spawning child workflows, or altering control flow in ways not pre-declared in the DAG's structure. Airflow's HITL operators are a specific, well-built pattern for "a task pauses for a human decision, then a DAG branches or continues" — not a general-purpose signal channel for arbitrary external systems to redirect a running workflow's logic. Step Functions' callback-token pattern is the most primitive of the three: AWS supplies the token mechanism, but no built-in approval UI — the calling application has to build whatever notifies the approver and captures their decision.

## What this comparison cannot resolve

Whether an organization's specific procurement policy treats "MIT-licensed, single-company-governed" as acceptable open source is a legal-and-policy question this page cannot answer generically. Temporal Cloud's specific compliance certifications, data-residency options, and SLA terms need to be checked against Temporal's own current trust and compliance documentation, not inferred from its pricing page. How MWAA Serverless bills a multi-day `awaiting_input` state in practice — whether it is genuinely free while parked, as the "no worker/Triggerer slot" architecture suggests, or whether some other charge applies — is not spelled out in AWS's public pricing documentation as of this writing and should be confirmed with AWS or tested directly before being relied on for a cost model. And which of the three a given team can operate well depends on internal capability this page has no visibility into: Go/Java/Python/TypeScript fluency for Temporal's code-first model, ASL and Step Functions' 200+ service integrations for AWS-native teams, or existing Airflow DAG expertise — none of which a general comparison can assess for a specific team.

## Further reading

- [Constraint-driven comparisons](/guides/constraint-driven-comparisons/): the methodology this page follows.
- [Durable execution for agent workflows](/guides/durable-execution-for-agent-workflows/): why an agent's own process isn't durable storage, and Temporal's Event History mechanism in full.
- [Airflow vs Step Functions for ML pipelines](/comparisons/airflow-vs-step-functions/): the batch/data-pipeline comparison this page deliberately does not repeat.
- [Human-in-the-loop patterns for AI systems](/patterns/human-in-the-loop/): design patterns for review queues and approval steps independent of which orchestrator implements them.
- [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/): the legal background behind the MIT-vs-foundation-governance distinction raised above.
- [Workflow engine](/glossary/workflow-engine/): the general concept all three platforms are instances of.

## Sources

1. Temporal, "Understanding Temporal": [https://docs.temporal.io/evaluate/understanding-temporal](https://docs.temporal.io/evaluate/understanding-temporal)
2. AWS, "Discover service integration patterns in Step Functions": [https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html](https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html)
3. AWS, "AWS Step Functions Pricing": [https://aws.amazon.com/step-functions/pricing/](https://aws.amazon.com/step-functions/pricing/)
4. The Apache Software Foundation, "The Apache Software Foundation Announces Apache Airflow as a Top-Level Project" (January 8, 2019): [https://news.apache.org/foundation/entry/the-apache-software-foundation-announces44](https://news.apache.org/foundation/entry/the-apache-software-foundation-announces44)
5. Temporal, LICENSE (MIT, Temporal Technologies Inc. / Uber Technologies Inc.): [https://github.com/temporalio/temporal/blob/main/LICENSE](https://github.com/temporalio/temporal/blob/main/LICENSE)
6. AWS, "Step Functions service quotas": [https://docs.aws.amazon.com/step-functions/latest/dg/limits-overview.html](https://docs.aws.amazon.com/step-functions/latest/dg/limits-overview.html)
7. AWS, "Wait for a Callback with Task Token": [https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html#connect-wait-token](https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html#connect-wait-token)
8. Temporal, "Temporal Cloud Pricing": [https://docs.temporal.io/cloud/pricing](https://docs.temporal.io/cloud/pricing)
9. AWS, "Amazon Managed Workflows for Apache Airflow Pricing" and MWAA Serverless announcement (November 17, 2025): [https://aws.amazon.com/managed-workflows-for-apache-airflow/pricing/](https://aws.amazon.com/managed-workflows-for-apache-airflow/pricing/)
10. Temporal, "Temporal Cloud limits" (Event History thresholds: 51,200 events / 50 MB error, 10,240 events / 10 MB warning): [https://docs.temporal.io/cloud/limits](https://docs.temporal.io/cloud/limits)
11. Temporal, "External Interaction Patterns" (Signals, Approval pattern): [https://docs.temporal.io/design-patterns/external-interaction-patterns](https://docs.temporal.io/design-patterns/external-interaction-patterns)
12. Apache Airflow, "HITLOperator (Human-in-the-loop)" and Airflow 3.3 release notes (`awaiting_input` state): [https://airflow.apache.org/docs/apache-airflow/stable/tutorial/hitl.html](https://airflow.apache.org/docs/apache-airflow/stable/tutorial/hitl.html)
13. Apache Airflow, "Apache Airflow 3.3.0: Stateful Tasks and Multi-Language Support" (release blog): [https://airflow.apache.org/blog/airflow-3.3.0/](https://airflow.apache.org/blog/airflow-3.3.0/)
14. Apache Airflow, "Apache Airflow 3.1.0: Human-Centered Workflows" (release blog, September 25, 2025): [https://airflow.apache.org/blog/airflow-3.1.0/](https://airflow.apache.org/blog/airflow-3.1.0/)
15. AWS, "Amazon MWAA supports Apache Airflow version 3.3.1" (September 1, 2026): [https://aws.amazon.com/about-aws/whats-new/2026/09/amazon-mwaa-apache-airflow-3-3-1/](https://aws.amazon.com/about-aws/whats-new/2026/09/amazon-mwaa-apache-airflow-3-3-1/)
