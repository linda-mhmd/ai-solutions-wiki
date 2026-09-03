---
title: "Red Hat OpenShift AI"
description: "A hybrid cloud MLOps platform for building, training, serving, and monitoring AI and ML models on Red Hat OpenShift, from data center to edge."
date: 2026-06-29
tags: ["mlops", "kubernetes", "openshift", "model-serving", "hybrid-cloud", "red-hat"]
tool_category: "AI"
related:
  - tools/red-hat-openshift
  - glossary/mlops
  - glossary/inference
  - guides/multi-cloud-ai-strategy
  - guides/how-ai-models-are-evaluated
  - tools/amazon-bedrock
  - tools/azure-openai
---

<figure class="bz-figure">
  <img src="/img/obsidian-lab/pipeline-components-sequence-notext.png" alt="Industrial components arranged in sequence, representing an end-to-end MLOps pipeline on a container platform." loading="lazy">
  <figcaption>OpenShift AI chains the stages of the model lifecycle - experiment, train, serve, monitor - on one Kubernetes-based platform.</figcaption>
</figure>

Red Hat OpenShift AI (formerly Red Hat OpenShift Data Science) is a platform for building, training, serving, and monitoring AI and ML models on top of Red Hat OpenShift. It packages the tools a data science team needs into one Kubernetes-based environment, so you avoid stitching notebooks, pipelines, and model serving together yourself. Its main draw is portability: you run the same [MLOps](/glossary/mlops/) workflow in a public cloud, in your own data center, at the edge, or in a disconnected environment.

The problem it solves is fragmentation. Most teams assemble Jupyter, a pipeline engine, a serving runtime, and GPU scheduling from separate projects, then maintain that glue forever. OpenShift AI integrates those components as a supported product and keeps them consistent wherever OpenShift runs.

## Where it sits in the stack

OpenShift AI is a layer on top of [Red Hat OpenShift](/tools/red-hat-openshift/), which is itself a layer on top of Kubernetes. The lower layers handle containers, GPUs, and cluster operations. OpenShift AI adds the AI and ML tooling above them.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Data science tooling</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Workbenches (Jupyter)</span>
      <span class="bz-arch-chip">Data science pipelines</span>
      <span class="bz-arch-chip">Model serving</span>
      <span class="bz-arch-chip">Model monitoring</span>
      <span class="bz-arch-chip-note">Red Hat OpenShift AI</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Open-source frameworks</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">PyTorch</span>
      <span class="bz-arch-chip">Kubeflow</span>
      <span class="bz-arch-chip">KServe</span>
      <span class="bz-arch-chip">vLLM</span>
      <span class="bz-arch-chip">MLflow</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Application platform</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Red Hat OpenShift</span>
      <span class="bz-arch-chip">Kubernetes</span>
      <span class="bz-arch-chip-note">Container orchestration and GPU scheduling</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Infrastructure</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">On premise</span>
      <span class="bz-arch-chip">Public cloud</span>
      <span class="bz-arch-chip">Edge</span>
      <span class="bz-arch-chip">Disconnected</span>
    </div>
  </div>
</div>

## How it fits and how to use it

OpenShift AI does not ship as a command-line install you drop onto a laptop. You add it to an existing OpenShift cluster as an operator, then work through its dashboard and Kubernetes-native resources. You can run it on OpenShift you manage yourself (self-managed) or on a managed OpenShift service from a cloud provider. Red Hat lists AWS, Azure, Google Cloud, and IBM among the environments it runs in, alongside hardware partners including NVIDIA, AMD, Intel, Dell, and Lenovo.

The platform maps onto the standard MLOps lifecycle. Each stage uses an open-source project underneath, so skills and artifacts transfer between clusters.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 1</span>
    <span class="bz-flow-step-name">Experiment</span>
    <span class="bz-flow-step-desc">Work in Jupyter-based workbenches with PyTorch and other libraries. Prototype in a shared, trusted environment.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 2</span>
    <span class="bz-flow-step-name">Pipeline</span>
    <span class="bz-flow-step-desc">Automate data prep and training with data science pipelines built on Kubeflow, so runs are repeatable and shareable.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 3</span>
    <span class="bz-flow-step-name">Serve</span>
    <span class="bz-flow-step-desc">Deploy models with KServe. Serve large language models through the vLLM runtime with GPU scheduling handled for you.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 4</span>
    <span class="bz-flow-step-name">Monitor</span>
    <span class="bz-flow-step-desc">Track models in production and keep traceability with MLflow across the models and tools you run.</span>
  </div>
</div>

### Model serving and inference

Serving is where the open-source foundation matters most. OpenShift AI uses KServe to orchestrate serving workloads and to autoscale model servers based on load. It ships vLLM runtime templates for efficient large-model [inference](/glossary/inference/) on GPUs. KServe supports both a serverless mode and a raw deployment mode, so multiple workloads can share GPU resources and scale down when idle. This matters because idle GPUs are expensive, and autoscaling means you pay for them mainly while they serve traffic.

### The hybrid and portability angle

The reason to choose OpenShift AI over a single-cloud service is the same reason to choose OpenShift itself: you run one platform everywhere. Red Hat positions it as a way to develop, train, and deploy models in a common environment whether on site, in the cloud, or at the edge, including disconnected environments with no internet access. If regulation, data residency, or latency keeps some workloads out of a public cloud, that portability is the point. For the wider decision, see the [multi-cloud AI strategy guide](/guides/multi-cloud-ai-strategy/).

## How it compares

The main alternatives are managed MLOps platforms tied to a single cloud. OpenShift AI trades some of their turnkey convenience for portability across environments.

| | OpenShift AI | Amazon SageMaker | Azure ML | Vertex AI |
|---|---|---|---|---|
| **Runs where** | Any OpenShift cluster | AWS | Azure | Google Cloud |
| **Foundation** | Kubernetes, open source | AWS managed services | Azure managed services | Google managed services |
| **On premise and edge** | Yes | Limited | Limited | Limited |
| **Serving runtime** | KServe, vLLM | SageMaker endpoints | Managed endpoints | Managed endpoints |
| **Best for** | Hybrid and regulated estates | AWS-native teams | Azure-native teams | Google-native teams |

*Vertex AI was rebranded Gemini Enterprise Agent Platform in April 2026 — see [Google Vertex AI](/tools/google-vertex-ai/) for the full story.*

For a broader view of running AI across providers, see [Amazon Bedrock](/tools/amazon-bedrock/) and [Azure OpenAI](/tools/azure-openai/).

## When not to use it

OpenShift AI is a good fit for organisations that already run OpenShift or need workloads in more than one environment. It is a poor fit in several cases.

- **You have no Kubernetes or OpenShift footprint.** Standing up OpenShift purely to get MLOps is heavy. A managed cloud platform is faster to start.
- **You are all-in on one cloud.** If everything lives in AWS, Azure, or Google Cloud and will stay there, that cloud's native platform removes more operational work.
- **You want a fully hosted, zero-operations service.** OpenShift AI still runs on a cluster your team or a provider operates. It is not a serverless API you call and forget.
- **Your models are tiny and infrequent.** If you serve one small model occasionally, a container or a hosted endpoint is simpler than a full MLOps platform.

## Further reading

- [Red Hat OpenShift](/tools/red-hat-openshift/): the application platform OpenShift AI is built on.
- [What is MLOps?](/glossary/mlops/): the lifecycle this platform is designed to support.
- [What is inference?](/glossary/inference/): what happens when a served model answers a request.
- [Multi-cloud AI strategy](/guides/multi-cloud-ai-strategy/): how to decide where AI workloads should run.
- [How AI models are evaluated](/guides/how-ai-models-are-evaluated/): judging model quality before and after you serve it.
- [Red Hat OpenShift AI product page](https://www.redhat.com/en/products/ai/openshift-ai): the official product overview.
- [Red Hat OpenShift AI documentation](https://docs.redhat.com/en/documentation/red_hat_openshift_ai_self-managed/): install, configure, and operate the self-managed edition.

## Sources

- Red Hat OpenShift AI product page: https://www.redhat.com/en/technologies/cloud-computing/openshift/openshift-ai
- Red Hat OpenShift AI product page (products path): https://www.redhat.com/en/products/ai/openshift-ai
- Red Hat OpenShift AI for developers: https://developers.redhat.com/products/red-hat-openshift-ai
- Red Hat OpenShift AI self-managed documentation: https://docs.redhat.com/en/documentation/red_hat_openshift_ai_self-managed/
- KServe project: https://github.com/kserve/kserve
- Autoscaling vLLM with OpenShift AI (Red Hat Developer): https://developers.redhat.com/articles/2025/10/02/autoscaling-vllm-openshift-ai
