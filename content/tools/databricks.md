---
title: "Databricks"
description: "Databricks is a lakehouse data and AI platform that unifies data engineering, analytics, and machine learning so teams can build AI on their own governed data."
date: 2026-06-29
tags: ["data", "lakehouse", "mlops", "generative-ai", "data-platform"]
tool_category: "Data"
related:
  - glossary/rag
  - glossary/fine-tuning
  - glossary/mlops
  - tools/amazon-bedrock
  - guides/how-ai-models-are-evaluated
---

<figure class="bz-figure">
  <img src="/img/dark-cherry/data-projection.png" alt="A cylinder projecting rows of red data points, representing a unified data and AI lakehouse platform." loading="lazy">
  <figcaption>Databricks projects one governed copy of your data into engineering, analytics, and AI workloads at once.</figcaption>
</figure>

Databricks is a unified data and AI platform built on the lakehouse architecture. It combines the low-cost open storage of a data lake with the reliability and query performance of a data warehouse, then layers governance, analytics, and machine learning on top. Data teams use it to run ETL pipelines, business intelligence, and generative AI against a single governed copy of their own data, instead of copying that data between separate systems.

The core problem it solves is fragmentation. Most organisations keep raw data in a lake, curated data in a warehouse, and models in a third place, then spend engineering effort keeping the copies in sync. Databricks puts all three workloads on one platform with one governance layer, so the data your dashboards read is the same data your models train on.

## Where it sits in the stack

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">AI and apps</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Mosaic AI model serving</span>
      <span class="bz-arch-chip">Vector Search</span>
      <span class="bz-arch-chip">AI agents</span>
      <span class="bz-arch-chip-note">RAG, fine-tuning, agent evaluation on your own data</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Analytics and ML</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Databricks SQL</span>
      <span class="bz-arch-chip">MLflow</span>
      <span class="bz-arch-chip">Notebooks</span>
      <span class="bz-arch-chip-note">BI, model training, experiment tracking</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Governance</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Unity Catalog</span>
      <span class="bz-arch-chip-note">Fine-grained access control, lineage, one catalog for data and AI</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Data engineering</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Lakeflow ETL</span>
      <span class="bz-arch-chip">Batch and streaming</span>
      <span class="bz-arch-chip-note">Ingest and transform data into the lakehouse</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Open storage</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Delta Lake</span>
      <span class="bz-arch-chip">Cloud object storage</span>
      <span class="bz-arch-chip-note">ACID transactions and schema enforcement on open file formats</span>
    </div>
  </div>
</div>

## The lakehouse idea in plain words

A data warehouse is tidy and fast for reports, but it often stores data in proprietary formats and struggles with the raw, messy data that machine learning needs. A data lake is cheap and holds anything, but it lacks the reliability and governance that trustworthy analytics require. The lakehouse merges the two. You keep your data in open formats on ordinary cloud object storage, then add a transactional layer on top so the same files behave like warehouse tables.

Two technologies make this work:

- **Delta Lake** is the storage layer. It adds ACID transactions and schema enforcement to plain files, so writes are reliable and bad data is rejected during ingestion.
- **Unity Catalog** is the governance layer. It provides fine-grained access control, tracks data lineage, and governs data and AI assets from one place, so the permissions on a table also apply to the models and dashboards built from it.

The practical result is a single source of truth. Your BI reports, your training data, and your AI features all read the same governed tables.

## How it fits and how to use it

Databricks runs as a managed service on AWS, Microsoft Azure, and Google Cloud. You do not install it locally. You provision a workspace in your cloud account, connect your object storage, then work through a browser workspace, SQL clients, notebooks, or its APIs and SDKs. Compute runs in your own cloud tenancy, so the data stays in your account.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Ingest</span>
    <span class="bz-flow-step-desc">Land batch and streaming data into Delta Lake tables with Lakeflow pipelines.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Govern</span>
    <span class="bz-flow-step-desc">Register tables in Unity Catalog with access rules and lineage.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Analyse and train</span>
    <span class="bz-flow-step-desc">Run SQL analytics and train models, tracking runs with MLflow.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Serve AI</span>
    <span class="bz-flow-step-desc">Deploy models and agents grounded in your governed data.</span>
  </div>
</div>

For generative AI, Databricks groups its tooling under Mosaic AI. Vector Search builds managed indexes for [retrieval-augmented generation](/glossary/rag/), letting an agent pull relevant text from your own documents at query time. Model serving exposes foundation models and your own models through governed APIs. The platform also supports [fine-tuning](/glossary/fine-tuning/) models on proprietary data, and MLflow provides experiment tracking and tracing so you can measure agent quality. Because model training and serving live next to the data, you keep [MLOps](/glossary/mlops/) practices, lineage, and access control consistent across the whole lifecycle. When you build agents this way, treat evaluation as a first-class step rather than an afterthought; see our guide on [how AI models are evaluated](/guides/how-ai-models-are-evaluated/).

## How it compares

| | Databricks | Snowflake | Cloud data warehouse | DIY lakehouse |
|---|---|---|---|---|
| **Core model** | Lakehouse on open storage | Cloud data warehouse | Managed warehouse | Assembled from parts |
| **Storage format** | Open (Delta Lake) | Managed tables | Often proprietary | Open, your choice |
| **AI and ML** | Built in (Mosaic AI, MLflow) | Growing AI features | Add-on or external | You wire it up |
| **Governance** | Unity Catalog | Native governance | Warehouse controls | Self-built |
| **Best for** | Unified data and AI teams | SQL analytics teams | BI-first workloads | Full control, high effort |

A DIY lakehouse stack combines open-source pieces such as Apache Spark, a table format, and a serving layer yourself. That gives maximum control and avoids vendor lock-in, at the cost of significant engineering and maintenance. Databricks packages those layers into one managed platform. If you want to run hosted AI models on managed cloud infrastructure without a full data platform, a service like [Amazon Bedrock](/tools/amazon-bedrock/) sits closer to the model layer than to the data layer.

## When not to use it

Databricks is a heavy platform aimed at teams with real data volume and AI ambitions. It is likely the wrong fit when:

- **Your needs are pure BI on modest data.** A standalone warehouse or even a managed SQL database is simpler and cheaper.
- **You have no data engineering capacity.** The platform rewards teams who build pipelines and models. A small team with a few reports will not use most of it.
- **You only need to call a hosted model.** If you are not training on or retrieving from your own data at scale, a model API is a lighter path than a data platform.
- **Cost predictability is critical and volumes are low.** Consumption-based compute can be hard to forecast for spiky or small workloads.

Match the platform to the workload. Databricks earns its complexity when unifying data engineering, analytics, and AI on shared governed data is the actual goal.

## Further reading

- [What is RAG?](/glossary/rag/): how retrieval grounds a model in your own data, the pattern behind Vector Search.
- [What is fine-tuning?](/glossary/fine-tuning/): adapting a model to proprietary data, supported inside Mosaic AI.
- [What is MLOps?](/glossary/mlops/): the operational practices Databricks builds around with MLflow and Unity Catalog.
- [Amazon Bedrock](/tools/amazon-bedrock/): a managed model service that sits at the model layer rather than the data layer.
- [How AI models are evaluated](/guides/how-ai-models-are-evaluated/): why evaluation is a first-class step when shipping agents.
- [Databricks Data Intelligence Platform](https://www.databricks.com/): the official product overview and documentation entry point.
- [Delta Lake project](https://delta.io/): the open storage layer that provides ACID transactions on files.

## Sources

- Databricks Data Intelligence Platform: https://www.databricks.com/
- Databricks lakehouse architecture documentation: https://docs.databricks.com/aws/en/lakehouse/
- Databricks generative AI documentation: https://docs.databricks.com/aws/en/generative-ai/guide/introduction-generative-ai-apps
- Delta Lake: https://delta.io/
