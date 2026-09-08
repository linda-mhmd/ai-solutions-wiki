---
title: "OpenTelemetry vs Datadog vs Langfuse for LLM Observability"
description: "Why this is not a three-way choice: OpenTelemetry is the vendor-neutral instrumentation standard both Datadog and Langfuse now ingest natively, and the real question is how much lock-in survives that support once you look at what each backend actually does with the data."
date: 2026-09-04
categories: [Comparisons]
tags: ["opentelemetry", "datadog", "langfuse", "observability", "tracing", "llm-observability", "vendor-lock-in", "self-hosting"]
tools: ["opentelemetry", "langfuse"]
related:
  - guides/constraint-driven-comparisons
  - comparisons/datadog-vs-cloudwatch
  - comparisons/deepeval-vs-promptfoo
  - glossary/observability
  - glossary/cloud-act
  - guides/software-licensing-and-vendor-lock-in
  - guides/ai-observability-guide
last_verified: 2026-09-04
last_updated: 2026-09-04
lastmod: 2026-09-04
---

The way this comparison is usually framed — OpenTelemetry vs. Datadog vs. Langfuse, pick one — is wrong on its face. OpenTelemetry is not a backend and has no UI to look at traces in; it is a specification and a set of SDKs for generating and shipping telemetry. Datadog and Langfuse are backends: places that receive telemetry, store it, and let a human query it. The real question, and the one this page is built around, is narrower and more useful: given that both Datadog and Langfuse now accept OpenTelemetry-native data, how much does instrumenting with OTel actually protect you from backend lock-in, and where does each vendor's own product logic re-create the lock-in that OTel was supposed to remove?

## What each of these actually is

**OpenTelemetry (OTel)** is a CNCF project providing vendor-neutral APIs, SDKs, and a Collector for generating, processing, and exporting traces, metrics, and logs. It graduated to CNCF Graduated status on May 21, 2026, and CNCF cites it as the second-highest-velocity project in the cloud native ecosystem, after Kubernetes [1][18]. The Collector can fan the same telemetry out to multiple backends simultaneously, which is the entire basis for "instrument once, send anywhere." What OTel does *not* provide is a place to look at the data — that is always a downstream backend's job. See [OpenTelemetry](/tools/opentelemetry/) for the base mechanics.

**Datadog** is a commercial, US-headquartered ($NASDAQ: DDOG$, New York) full-stack observability SaaS platform, with LLM-specific tracing, evaluation, and cost tracking layered on top as a distinct product now branded **Agent Observability** in Datadog's own docs (the same feature was previously marketed as "LLM Observability," and both names still appear interchangeably in Datadog's materials) [2][3]. This wiki has no dedicated `tools/datadog.md` page; [Datadog vs CloudWatch](/comparisons/datadog-vs-cloudwatch/) is where Datadog's general monitoring, dashboard, and cost model have already been sourced, and this page does not re-derive that ground — it focuses on what's specific to LLM/agent tracing and to the OTel question.

**Langfuse** is an open-source, LLM- and agent-trace-specific observability platform: traces, prompt/completion capture, token and cost accounting, evaluation scores, and a prompt-management layer, self-hostable or cloud-hosted [4]. On January 16, 2026, Langfuse was acquired by ClickHouse Inc. as part of a $400M Series D round; ClickHouse's own announcement states Langfuse "remains 100% open-source" under its existing license and that Langfuse Cloud continues operating independently [5][6]. See [Langfuse](/tools/langfuse/) for the tracing model (traces, spans, generations, scores).

## Does OTel-native ingestion actually change the lock-in picture?

Yes, partially, and the gap between "partially" and "fully" is the substance of this comparison.

**Both backends genuinely ingest OTel now.** Langfuse operates an OTLP/HTTP endpoint (`/api/public/otel`, supporting `HTTP/JSON` and `HTTP/protobuf`, not yet gRPC) that has been available since Langfuse OSS 3.22.0, and this is now positioned as the primary ingestion path — the older `/api/public/ingestion` REST API is marked deprecated in favor of it [7]. Datadog's Agent Observability natively supports the OpenTelemetry GenAI semantic conventions (v1.37 and later): spans exported by any OTel SDK using `gen_ai.*` attributes can go straight to Datadog's OTLP intake, through the Datadog Agent, or through a Collector, with no Datadog-specific SDK required [8][2]. So the "instrument once with OTel, point it wherever" promise is real for both vendors at the transport layer.

**But the standard both of them are ingesting is not itself stable.** As of mid-2026, every `gen_ai.*` attribute, span, and event in the OpenTelemetry registry carries a "Development" stability badge, not "Stable" [9]. In June 2026 (semantic-conventions v1.42.0), the GenAI conventions were removed from the main `semantic-conventions` repository entirely and moved to a dedicated repository, which as of this writing has no tagged release [9][10]. Datadog's own instrumentation docs confirm this instability in practice: teams on older GenAI semconv versions must set `OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental` to keep receiving data correctly as the schema shifts [3]. Concretely: dashboards, queries, and evaluators built against today's `gen_ai.request.model` or `gen_ai.usage.input_tokens` attribute names are not guaranteed to survive the next semantic-convention revision unchanged, on either backend. This is a materially different risk profile than OTel's traces/metrics conventions, which reached GA in 2021 and 2023 respectively [11].

**And the OTel transport layer is only ever a fraction of what each product does with the data.** Ingesting a `gen_ai` span gets you the span. It does not get you Datadog's configured evaluators, cost-attribution dashboards, or its correlation of an LLM span with the surrounding APM trace and infrastructure metrics — those are Datadog product logic built on top of ingestion, and none of it travels with you if you point the same OTel stream at a different backend tomorrow. Symmetrically, ingesting a span into Langfuse via OTLP gets you a trace; it does not by itself get you Langfuse's prompt-versioning, dataset, or LLM-as-judge evaluation configuration, which live in Langfuse's own data model. OTel standardizes the wire format, not the product built to consume it.

## Constraint categories that apply here

**Vendor lock-in and exit cost.** This is the load-bearing category for this specific choice, for the reasons above: OTel-native ingestion reduces re-instrumentation cost on backend switch, but does not reduce the cost of losing vendor-side configuration (evaluators, dashboards, alerting) or of an unstable wire format changing under you. See [software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/) for how to make exit cost concrete rather than rhetorical.

**Internal capability and operational burden.** Self-hosting is the deepest form of exit from either commercial dependency, but it is not free of its own constraint. Self-hosted Langfuse (as of its current architecture) requires operating four components: PostgreSQL for transactional data, ClickHouse as the OLAP store for traces/observations/scores, Redis or Valkey for queuing and caching, and S3-compatible object storage for raw events and multimodal payloads [12] — a materially heavier stack than the Postgres-plus-Redis setup often described for earlier Langfuse versions. Running ClickHouse at production scale is a real, non-trivial operational skill most application teams do not already have; the ClickHouse acquisition puts that expertise one company away, but does not remove the requirement for a self-hosting team. Datadog offers no self-hosted option at all — the entire point of choosing it is to hand this operational burden to the vendor.

**Trust, jurisdiction, and data gravity.** LLM traces are a qualitatively more sensitive telemetry class than infrastructure metrics: a trace captures the verbatim prompt and completion, which routinely contains user PII, proprietary system prompts, and retrieved business data — not just a latency number. Datadog Inc. is a US-domiciled, NASDAQ-listed company [13]; Langfuse's acquirer, ClickHouse Inc., is also a US company. Per the [CLOUD Act](/glossary/cloud-act/), US jurisdiction attaches to the provider, not to the data center — so choosing an EU-region Langfuse Cloud site (Langfuse Cloud offers US, EU, Japan, and a HIPAA-eligible region [14]) narrows *residency* exposure under [data sovereignty](/glossary/data-sovereignty/) framing but does not remove CLOUD Act reach, because the entity that can be compelled is still US-domiciled. The only way to remove that vector entirely, for either product, is self-hosting the backend outside a US-jurisdiction provider's control — which for Langfuse is a real, documented option; for Datadog it does not exist as an option at all.

**Cost structure.** OpenTelemetry itself has no license fee — its cost is engineering time to instrument and to operate a Collector. Datadog's Agent Observability (the LLM-tracing product) is priced separately from Datadog's general infrastructure/APM pricing already covered in [Datadog vs CloudWatch](/comparisons/datadog-vs-cloudwatch/): a free tier up to 40,000 LLM spans/month with 15-day retention, and a Pro tier at $160/month (annual commitment) for up to 100,000 LLM spans/month, with additional spans billed on demand and longer retention sold as an add-on; only LLM-provider-call spans are billed, tool/agent/retrieval spans are free [15]. Langfuse Cloud prices on a usage-unit model across four tiers — Hobby (free, 50k units/month, 30-day retention, 2 users), Core ($29/month, 100k units, 90-day retention, unlimited users), Pro ($199/month, 3-year retention), and Enterprise ($2,499/month, SSO/SCIM/audit logs/SLA) — with graduated overage pricing beyond the included units, or self-hosting for the cost of the four-component infrastructure above and no license fee for the open-source core [16].

**Contractual and licensing terms.** Langfuse's core (tracing, evals, prompt management, datasets, playground) is MIT-licensed; only the `ee/` directories (enterprise features: organization creators, instance management API, UI customization, and, per Langfuse's own tiering, SSO/RBAC/audit logs at higher paid tiers) require a commercial license key [17][16]. Datadog is closed-source SaaS throughout — there is no self-hosted or source-available option for any part of the platform.

## Gates vs. tradeoffs

**Gates — these rule an option out categorically for a given reader, not just make it less attractive:**

- If your organization has a hard rule against sending raw prompts/completions containing regulated personal data to any third-party US-jurisdiction processor, and that rule cannot be satisfied by a DPA and standard contractual clauses, **Datadog Cloud and Langfuse Cloud are both out** regardless of region selection, because CLOUD Act exposure attaches to the provider's domicile, not the data center. Self-hosted Langfuse (or a self-hosted OTel-compatible backend outside this comparison) is the remaining path.
- If your team has no capacity to operate a ClickHouse cluster and no budget for either Langfuse Cloud or a commercial alternative, **self-hosted Langfuse is not actually a free option for you** — the "free and open source" framing assumes operational capability that has a real cost even without a license fee.
- If you need LLM-specific evaluation, prompt-versioning, or dataset management as a product feature, **OpenTelemetry alone is not a candidate** — it has no such concept; it only transports whatever attributes you attach to a span.

**Tradeoffs — worth weighing, not disqualifying:**

- Instrumenting with OTel now, ahead of GenAI semantic-convention stabilization (no public timeline exists as of this writing [9]), trades near-term backend portability for the risk of attribute-shape churn as the spec moves; instrumenting with a vendor SDK (Datadog's or Langfuse's own) trades that churn risk for tighter, more immediately-supported product integration.
- Datadog's per-span pricing is straightforward to reason about at low-to-moderate LLM call volume but scales with every provider call, including retries; Langfuse's per-unit pricing (spans and events both count) and self-hosting option give more control over the cost curve at the price of more operational ownership.
- Datadog buys correlation with the rest of your infrastructure stack (APM, logs, infra metrics) in one product; Langfuse buys deeper LLM-specific tooling (prompt playground, dataset-based regression testing, LLM-as-judge scoring) at the cost of running a second, separate observability surface alongside whatever already monitors your infrastructure.

Evaluation itself — scoring whether an output is *good*, as distinct from tracing whether a call *happened* — is a related but separate concern from everything above; see [DeepEval vs Promptfoo](/comparisons/deepeval-vs-promptfoo/) for how that evaluation layer is chosen independently of the tracing backend.

## What this comparison cannot resolve

Whether your specific data-protection or procurement policy treats a US-domiciled processor with an EU data region as acceptable is a determination for your own legal or compliance review, not a general rule this page can settle — organizations read CLOUD Act exposure differently depending on what data actually flows through traces and what their regulator or customer contracts require. Whether your team can realistically operate a ClickHouse cluster in production is a capability question only your own platform team can answer; "ClickHouse is now owned by the company that makes it" changes the support relationship, not whether your team has the skill today. Pricing at your actual span/event volume requires running your own projected numbers through both vendors' current calculators rather than trusting the anchor figures above, which will drift. And the GenAI semantic-conventions stabilization timeline is, per OpenTelemetry's own transition plan, unset [9] — re-check its status before treating today's `gen_ai.*` attribute names as a long-term contract with either backend.

## Further reading

- [Constraint-driven comparisons](/guides/constraint-driven-comparisons/): the methodology behind this page's structure.
- [Datadog vs CloudWatch](/comparisons/datadog-vs-cloudwatch/): Datadog's general APM, dashboard, and infrastructure pricing model, not repeated here.
- [DeepEval vs Promptfoo](/comparisons/deepeval-vs-promptfoo/): evaluation of output quality, a distinct concern from tracing that calls happened.
- [OpenTelemetry](/tools/opentelemetry/): the instrumentation standard itself, in more depth.
- [Langfuse](/tools/langfuse/): the trace/span/generation/score data model in more depth.
- [Observability](/glossary/observability/): the three-pillars vocabulary (logs, metrics, traces) this comparison assumes.
- [The US CLOUD Act](/glossary/cloud-act/): why provider domicile, not data-center region, is the operative jurisdiction question.
- [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/): making exit cost concrete rather than rhetorical, applied generally.
- [AI observability guide](/guides/ai-observability-guide/): the broader full-stack observability picture this comparison's tracing layer sits inside.

## Sources

1. OpenTelemetry, "OpenTelemetry is a CNCF Graduated Project" (May 21, 2026): [https://opentelemetry.io/blog/2026/otel-graduates/](https://opentelemetry.io/blog/2026/otel-graduates/)
2. Datadog Docs, "Agent Observability" (product overview, naming, and APM relationship): [https://docs.datadoghq.com/llm_observability/](https://docs.datadoghq.com/llm_observability/)
3. Datadog Docs, "OpenTelemetry Instrumentation" for Agent Observability (semconv version, `OTEL_SEMCONV_STABILITY_OPT_IN`, ingestion paths, latency caveat): [https://docs.datadoghq.com/llm_observability/instrumentation/otel_instrumentation/](https://docs.datadoghq.com/llm_observability/instrumentation/otel_instrumentation/)
4. Langfuse Docs, product and self-hosting overview: [https://langfuse.com/self-hosting](https://langfuse.com/self-hosting)
5. ClickHouse, "ClickHouse raises $400M Series D... acquires Langfuse" (January 16, 2026): [https://clickhouse.com/blog/clickhouse-raises-400-million-series-d-acquires-langfuse-launches-postgres](https://clickhouse.com/blog/clickhouse-raises-400-million-series-d-acquires-langfuse-launches-postgres)
6. ClickHouse, "ClickHouse welcomes Langfuse: The future of open-source LLM observability" (open-source/self-hosting commitment): [https://clickhouse.com/blog/clickhouse-acquires-langfuse-open-source-llm-observability](https://clickhouse.com/blog/clickhouse-acquires-langfuse-open-source-llm-observability)
7. Langfuse Docs, "OpenTelemetry (OTEL) for LLM Observability" (endpoint, protocol support, version introduced, deprecation of legacy ingestion API): [https://langfuse.com/integrations/native/opentelemetry](https://langfuse.com/integrations/native/opentelemetry)
8. Datadog, "Use OpenTelemetry-native observability with Datadog" and "Datadog Agent Observability natively supports OpenTelemetry GenAI Semantic Conventions": [https://www.datadoghq.com/blog/llm-otel-semantic-convention/](https://www.datadoghq.com/blog/llm-otel-semantic-convention/)
9. OpenTelemetry `semantic-conventions` repository, GenAI directory moved-notice and stability status (Development, no stable tag as of this writing): [https://github.com/open-telemetry/semantic-conventions/tree/main/docs/gen-ai](https://github.com/open-telemetry/semantic-conventions/tree/main/docs/gen-ai) and the dedicated repository [https://github.com/open-telemetry/semantic-conventions-genai](https://github.com/open-telemetry/semantic-conventions-genai)
10. OpenTelemetry, semantic-conventions release history (v1.42.0, June 2026, GenAI conventions split out): [https://github.com/open-telemetry/semantic-conventions/releases](https://github.com/open-telemetry/semantic-conventions/releases)
11. OpenTelemetry, tracing and metrics specification stability milestones (GA 2021 and 2023): [https://opentelemetry.io/docs/specs/status/](https://opentelemetry.io/docs/specs/status/)
12. Langfuse Docs, self-hosting infrastructure components (PostgreSQL, ClickHouse, Redis/Valkey, S3-compatible blob storage): [https://langfuse.com/self-hosting](https://langfuse.com/self-hosting)
13. Datadog, Inc. company and listing information (NASDAQ: DDOG, New York headquarters): [https://www.datadoghq.com/about/](https://www.datadoghq.com/about/)
14. Langfuse Docs, "Data Regions & Availability" (US, EU, Japan, HIPAA regions): [https://langfuse.com/security/data-regions](https://langfuse.com/security/data-regions)
15. Datadog, "Agent Observability" product/pricing page (free tier 40k spans, Pro $160/month for 100k spans, per-LLM-span billing): [https://www.datadoghq.com/products/ai/agent-observability/](https://www.datadoghq.com/products/ai/agent-observability/)
16. Langfuse, pricing page (Hobby/Core/Pro/Enterprise tiers, included units, overage pricing): [https://langfuse.com/pricing](https://langfuse.com/pricing)
17. Langfuse, repository LICENSE (MIT core, `ee/` directories under commercial license): [https://github.com/langfuse/langfuse/blob/main/LICENSE](https://github.com/langfuse/langfuse/blob/main/LICENSE)
18. CNCF, "Cloud Native Computing Foundation Announces OpenTelemetry's Graduation" (May 21, 2026) — source of the "second-highest project velocity... second only to Kubernetes" figure, which does not appear on the OpenTelemetry blog post cited as [1]: [https://www.cncf.io/announcements/2026/05/21/cloud-native-computing-foundation-announces-opentelemetrys-graduation-solidifying-status-as-the-de-facto-observability-standard/](https://www.cncf.io/announcements/2026/05/21/cloud-native-computing-foundation-announces-opentelemetrys-graduation-solidifying-status-as-the-de-facto-observability-standard/)
