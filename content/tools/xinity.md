---
title: "Xinity"
description: "Xinity is open-source sovereign AI infrastructure software: an OpenAI-compatible engine that runs large language models entirely on your own hardware, with zero data egress."
date: 2026-07-01
tags: ["sovereign-ai", "on-premise", "inference", "open-source", "gateway", "compliance"]
tool_category: "Infrastructure"
related:
  - glossary/sovereign-ai
  - glossary/data-sovereignty
  - comparisons/on-premise-vs-cloud-ai
  - tools/ollama
  - tools/vllm
  - guides/hybrid-and-multicloud-ai
---

<figure class="bz-figure">
  <img src="/img/enterprise-dark/gateway-chamber-split-notext.png" alt="A dark industrial gateway lit red at its core, representing an OpenAI-compatible gateway that keeps data inside your own premises." loading="lazy">
  <figcaption>Xinity is a gateway you own. Apps point at a local endpoint, and prompts never cross your boundary.</figcaption>
</figure>

Xinity is open-source software for running generative AI entirely on your own infrastructure. It provides an OpenAI-compatible API in front of models hosted on your own GPUs, so existing applications keep working after you change one thing: the endpoint URL. The point is [sovereignty](/glossary/sovereign-ai/). Data, models, and compute all stay inside your premises and your jurisdiction, with zero data egress to an external provider. Xinity targets regulated European enterprises (media, manufacturing, and public institutions) that cannot send prompts or documents to a foreign cloud. It ships as two layers: an open-source engine and a paid enterprise platform.

## Where Xinity sits

Xinity is the control and serving layer between your applications and the GPUs in your building. Your app calls the gateway; the gateway routes to model runtimes on your GPU nodes.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Application</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Existing apps</span>
      <span class="bz-arch-chip">Agents</span>
      <span class="bz-arch-chip-note">Point OpenAI SDKs at a local endpoint</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Gateway and control</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">OpenAI-compatible gateway</span>
      <span class="bz-arch-chip">Dashboard (RBAC, SSO)</span>
      <span class="bz-arch-chip">Infoserver (model registry)</span>
      <span class="bz-arch-chip-note">Routing, rate limiting, audit trails</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Runtime</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Daemon on GPU nodes</span>
      <span class="bz-arch-chip">Ollama / vLLM</span>
      <span class="bz-arch-chip-note">Runs the actual model weights</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Your hardware</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Local GPUs</span>
      <span class="bz-arch-chip">On-premise datacentre</span>
      <span class="bz-arch-chip-note">From a single workstation to a cluster</span>
    </div>
  </div>
</div>

## What it is made of

Xinity is a set of components, most of them Apache 2.0 licensed:

- **Gateway**: the OpenAI-compatible API proxy that handles routing and rate limiting.
- **Daemon**: the model runtime that runs on GPU nodes, backed by [Ollama](/tools/ollama/) or [vLLM](/tools/vllm/).
- **Infoserver**: the model registry and configuration server.
- **Database layer**: PostgreSQL and Redis for state.
- **Dashboard**: a management interface with role-based access and single sign-on. This component uses the Elastic License v2 with a free tier for one organisation and one node, while the gateway, daemon, CLI, infoserver, and database schema are Apache 2.0.

Because it exposes an OpenAI-compatible API and can run open-weight or your own models, Xinity acts as a drop-in replacement for a hosted API without the data leaving your control.

## Installing and running Xinity

Install the CLI, then bring the platform up.

```bash
# Install the CLI
curl -fsSL https://get.xinity.ai/install.sh | bash

# Bring up all services (gateway, daemon, infoserver, dashboard, DB)
xinity up all
```

Deploy a model so the gateway can serve it:

```bash
xinity act deployment.create '{
  "name": "Phi-3 Mini",
  "publicSpecifier": "phi-3-mini",
  "modelSpecifier": "phi3:mini",
  "enabled": true
}'
```

Running the platform needs Docker and Docker Compose on the host. Model runtimes need local GPUs for anything beyond small models.

## Calling it like OpenAI

The whole value proposition is that your existing code barely changes. Point any OpenAI client at the local gateway:

```python
from openai import OpenAI

# The only change from a hosted provider is the base_url
client = OpenAI(base_url="http://localhost:3000/v1", api_key="sk_...")

resp = client.chat.completions.create(
    model="phi-3-mini",
    messages=[{"role": "user", "content": "Summarise this contract clause."}],
)
print(resp.choices[0].message.content)
```

The same request over plain HTTP:

```bash
curl http://localhost:3000/v1/chat/completions \
  -H "Authorization: Bearer sk_..." \
  -H "Content-Type: application/json" \
  -d '{"model": "phi-3-mini", "messages": [{"role": "user", "content": "Hello"}]}'
```

## The path to a sovereign endpoint

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Install</span>
    <span class="bz-flow-step-desc">Run the CLI installer on a host with GPUs and Docker.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Deploy a model</span>
    <span class="bz-flow-step-desc">Register open-weight or your own models with the infoserver.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Repoint apps</span>
    <span class="bz-flow-step-desc">Change the base URL in your OpenAI SDK to the local gateway.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Govern</span>
    <span class="bz-flow-step-desc">Manage access and audit trails from the dashboard.</span>
  </div>
</div>

Xinity uses capacity-based pricing (you pay for the GPU resources you run, not per token) with published tiers that run from a free Community tier up to enterprise plans. It positions its audit trails as mapped to EU AI Act articles, and its compliance story around GDPR, the EU AI Act, and NIS2. Treat those as vendor claims to verify against your own obligations.

## How it compares

| | Xinity | [Ollama](/tools/ollama/) | [vLLM](/tools/vllm/) | Hosted cloud API |
|---|---|---|---|---|
| **Deployment** | On-premise platform | Local runtime | Serving framework | Fully managed |
| **Sovereignty** | Full, zero egress | Full (local) | Full (self-hosted) | Provider-controlled |
| **OpenAI-compatible** | Yes | Yes | Yes | Native |
| **Management** | Dashboard, RBAC, SSO, audit | Minimal | Minimal | Provider console |
| **Best for** | Regulated enterprise fleets | Single-machine local use | High-throughput serving | Fastest path, least control |

Xinity sits above runtimes like Ollama and vLLM rather than replacing them; it uses them underneath and adds the gateway, governance, and multi-node management an enterprise needs.

## When not to use Xinity

- **You have no sovereignty requirement.** If your data can go to a cloud, a hosted API such as [Azure OpenAI](/tools/azure-openai/) or [Amazon Bedrock](/tools/amazon-bedrock/) is faster to adopt and needs no operations.
- **You have no GPUs to run it on.** Xinity serves models on hardware you own or control. For rented compute, see [GPU clouds and neoclouds](/comparisons/gpu-clouds-and-neoclouds/).
- **You only need one model on one machine.** For a single local model with no governance needs, [Ollama](/tools/ollama/) alone is simpler.
- **You want peak single-endpoint throughput and nothing else.** A tuned [vLLM](/tools/vllm/) or [SGLang](/tools/sglang/) deployment may serve raw throughput needs more directly.
- **You need a large, proven ecosystem.** Xinity is a newer, focused product. If you need a wide partner and support ecosystem today, weigh the larger sovereign stacks from established vendors.

## Further reading

- [What is sovereign AI?](/glossary/sovereign-ai/): the concept and the 2026 landscape Xinity fits into.
- [What is data sovereignty?](/glossary/data-sovereignty/): the narrower data-control idea.
- [On-premise vs cloud AI](/comparisons/on-premise-vs-cloud-ai/): the core trade-off Xinity addresses.
- [Hybrid and multicloud AI](/guides/hybrid-and-multicloud-ai/): splitting sensitive and non-sensitive workloads.
- [Ollama](/tools/ollama/): a local runtime Xinity can use underneath.
- [Xinity website](https://xinity.ai/): official product, pricing, and documentation.
- [Xinity on GitHub](https://github.com/xinity-ai/xinity-ai): the open-source engine and install instructions.

## Sources

- Xinity. Sovereign AI Infrastructure Software for European Enterprises. https://xinity.ai/
- Xinity. Open-source engine (GitHub, components and install). https://github.com/xinity-ai/xinity-ai
- Xinity. Pricing. https://xinity.ai/sovereign-ai-pricing
