---
title: "Observability"
description: "What observability means, the three pillars of logs, metrics, and traces, and why AI systems need specialized observability for token costs, latency, and hallucination rates."
date: 2026-03-25
categories: [Glossary]
tags: ["devops", "intermediate", "observability", "monitoring", "logging", "tracing", "metrics"]
related:
  - patterns/observability-ai
  - tools/aws-cloudwatch
  - glossary/drift-detection
  - guides/ci-cd-ai-detailed
last_updated: 2026-05-30
---

Observability is the property of a system that allows its internal state to be inferred from its external outputs. An observable system provides enough data through its logs, metrics, and traces that engineers can understand what it is doing and why - without needing to add new instrumentation for each new question they want to answer.

<figure class="bz-figure">
  <img src="/img/enterprise-dark/gear-lens-dark-red-notext.png" alt="A precision lens focused on intricate gears: observability gives you the optics to see inside complex systems and understand their behavior." loading="lazy">
  <figcaption>Observability is the lens that lets you see inside the machine. Without it, you are guessing. With it, you can trace a request through every gear and understand exactly where time is spent and errors occur.</figcaption>
</figure>

The term originates in control theory (a system is "observable" if its internal state can be determined from its outputs over time) and was adapted for software systems by Charity Majors and others at Parse and Honeycomb in the 2010s.

## The Three Pillars

Observability in software systems rests on three categories of telemetry data. Each answers a different type of question.

**Logs** are timestamped records of discrete events. A log entry captures what happened at a specific moment: a request arrived, a function was called, an error occurred, a response was returned. Logs are the highest-fidelity telemetry - they preserve the full context of individual events - but they are expensive to store and query at scale. Well-structured logs use a consistent JSON format with fields that can be queried (request ID, user ID, error code, duration) rather than free-text strings.

**Metrics** are numeric measurements aggregated over time. A metric answers "how many?" or "how much?" - requests per second, error rate as a percentage, latency at the 95th percentile, memory usage in megabytes. Metrics are cheap to store (a few numbers per interval rather than a full event record) and fast to query, making them suitable for dashboards and alarms. The trade-off is that aggregation loses individual event context.

**Traces** record the path of a request through a distributed system. A trace consists of spans - one span per service or function the request passes through - with timing and context information. Traces answer "where is the time going?" in a system where a user-facing request triggers multiple downstream service calls. In a multi-agent AI system, a trace might span an API Gateway handler, a Lambda orchestrator, a Bedrock agent invocation, a knowledge base retrieval, and a database call.

## Why Monitoring Is Not the Same as Observability

Monitoring asks known questions about known failure modes: "Is the error rate above 5%?" "Is latency above 10 seconds?" These questions are defined in advance. When a new failure mode appears, monitoring does not help unless someone thought to instrument for it.

Observability allows engineers to ask new questions about unknown failure modes using the data that is already being collected. A highly observable system contains enough context in its telemetry that engineers can investigate an unusual pattern - one nobody anticipated - using the existing data.

## AI-Specific Observability Requirements

Standard application observability (error rates, latency, availability) is necessary but not sufficient for AI systems. AI workloads introduce failure modes that require additional instrumentation.

**Token cost tracking.** Every Bedrock API call has a cost measured in tokens. Without token metrics, it is impossible to identify runaway usage (a malformed prompt that generates thousands of tokens), attribute costs to specific features or users, or detect prompt injection attacks that dramatically increase token consumption. Token usage must be captured as a metric on every inference call.

**Hallucination and quality measurement.** A model can return a 200 OK response with coherent-sounding text that is factually incorrect. Standard error metrics do not catch this. Detecting hallucinations requires either human review (expensive), automated evaluation using a second model (LLM-as-judge pattern), or comparison against a known-correct answer set (requires golden dataset). Some teams capture user feedback (thumbs up/down) as a quality proxy metric.

**Prompt and response logging.** In production debugging, the most useful artefact is often the exact prompt that triggered a bad response. Without prompt logging, reproduction is impossible. Prompt logging must be balanced against data privacy requirements - logging full user queries may be prohibited in regulated environments.

**LLM-specific tracing.** Langfuse, an open-source LLM observability platform, captures the full chain of an LLM interaction: the input messages, the model response, token counts, cost, latency, and any tool calls made by the model. This is qualitatively different from generic distributed tracing and is the recommended tool for production LLM quality monitoring.

**Drift detection.** Model quality degrades over time as the real-world data distribution shifts away from the distribution the model was trained on. Detecting this requires tracking output quality metrics longitudinally and comparing against a baseline captured at deployment time.

## Sources and Further Reading

- AWS Documentation: Amazon CloudWatch. [https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/)
- Langfuse Documentation. [https://langfuse.com/docs](https://langfuse.com/docs)
- OpenTelemetry Documentation. [https://opentelemetry.io/docs/](https://opentelemetry.io/docs/)
- Majors, C., Fong-Jones, L., and Miranda, G. (2022). *Observability Engineering: Achieving Production Excellence*. O'Reilly Media.
- Majors, C. "Observability - A 3-Year Retrospective." InfoQ. [https://www.infoq.com/articles/observability-3-year-retrospective/](https://www.infoq.com/articles/observability-3-year-retrospective/)
