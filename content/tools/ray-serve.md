---
title: "Ray Serve"
description: "Ray Serve is a framework-agnostic model-serving library on Ray that scales single models and multi-model pipelines across a cluster with autoscaling and Python-native composition."
date: 2026-06-29
tags: ["ray", "model-serving", "inference", "distributed-systems", "autoscaling"]
tool_category: "Infrastructure"
related:
  - glossary/inference
  - glossary/ai-agents
  - tools/tgi
  - guides/from-zero-to-production
---

<figure class="bz-figure">
  <img src="/img/rapid-ai/microservices-platforms-purple-notext.png" alt="Floating interconnected purple nodes, representing a distributed framework for scaling model serving." loading="lazy">
  <figcaption>Ray Serve treats each model and each piece of business logic as an independently scaling node in a connected graph.</figcaption>
</figure>

Ray Serve is a scalable model-serving library built on Ray, the distributed computing framework maintained as open source and commercialised by Anyscale. It lets you deploy machine learning models and plain Python logic as online [inference](/glossary/inference/) APIs, then scale each piece independently across a cluster. Its focus sets it apart from single-model servers: Ray Serve is built for composing several models and steps into one service, not for squeezing maximum throughput out of one large language model on one node.

The problem it solves is orchestration. A real inference service is rarely one model. It is a preprocessing step, a retrieval call, one or more models, and post-processing glue. Wiring these together across machines, and scaling each part to match its own load, is the hard part. Ray Serve exposes that graph as ordinary Python, so calls between models look like function calls rather than network plumbing.

## Where it sits

Ray Serve is the serving layer of the Ray ecosystem. It runs on Ray Core and shares a cluster with the rest of the Ray libraries.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Client</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">HTTP request</span>
      <span class="bz-arch-chip">DeploymentHandle</span>
      <span class="bz-arch-chip-note">Callers reach the service over HTTP or from other Python code</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Ray Serve</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Deployments</span>
      <span class="bz-arch-chip">Replicas</span>
      <span class="bz-arch-chip">Autoscaling</span>
      <span class="bz-arch-chip">Request batching</span>
      <span class="bz-arch-chip-note">Each deployment scales its replica count on its own</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Models and logic</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">PyTorch</span>
      <span class="bz-arch-chip">TensorFlow</span>
      <span class="bz-arch-chip">Scikit-learn</span>
      <span class="bz-arch-chip">Python business logic</span>
      <span class="bz-arch-chip-note">Framework agnostic by design</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Ray Core</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Cluster scheduler</span>
      <span class="bz-arch-chip">Multi-node</span>
      <span class="bz-arch-chip">Multi-GPU</span>
      <span class="bz-arch-chip-note">Places replicas across machines and accelerators</span>
    </div>
  </div>
</div>

## How to use it and how it fits

A deployment is the core unit. You decorate a Python class with `@serve.deployment`, bind its constructor arguments with `.bind()`, and run the result with `serve.run()`. Ray Serve then hosts one or more replicas of that class and routes requests to them.

Composition is where Ray Serve earns its place. One deployment holds a `DeploymentHandle` to another and calls its methods with `.remote()`, which runs the call asynchronously somewhere in the cluster. The example below chains a preprocessing step into a model, each as its own deployment that scales independently.

```python
from ray import serve
from ray.serve.handle import DeploymentHandle

@serve.deployment(num_replicas=2)
class Preprocessor:
    def clean(self, text: str) -> str:
        return text.strip().lower()

@serve.deployment(
    autoscaling_config={"min_replicas": 1, "max_replicas": 8}
)
class Classifier:
    def __init__(self, prep: DeploymentHandle):
        self.prep = prep
        # load your PyTorch or scikit-learn model here

    async def __call__(self, request):
        raw = (await request.json())["text"]
        cleaned = await self.prep.clean.remote(raw)
        return {"label": self.predict(cleaned)}

    def predict(self, text: str) -> str:
        return "positive" if "good" in text else "negative"

app = Classifier.bind(Preprocessor.bind())
serve.run(app)
```

Two details matter for scale. First, `autoscaling_config` adjusts the replica count up and down with load, so a heavy model and a cheap preprocessor size themselves separately. Second, Ray Serve supports dynamic request batching, which groups incoming requests to use vectorised operations more efficiently. For large language model workloads, Ray Serve adds response streaming and multi-node, multi-GPU serving. This same composition model suits [AI agents](/glossary/ai-agents/), where a request may route through several models and tools before returning.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Define deployments</span>
    <span class="bz-flow-step-desc">Wrap each model and logic step in a class with @serve.deployment.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Bind the graph</span>
    <span class="bz-flow-step-desc">Pass one deployment into another with .bind() to build the pipeline.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Run on the cluster</span>
    <span class="bz-flow-step-desc">serve.run() places replicas across nodes and GPUs.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Serve and scale</span>
    <span class="bz-flow-step-desc">Autoscaling and batching adjust each deployment to its own load.</span>
  </div>
</div>

## How it compares

Ray Serve occupies a different niche from dedicated LLM inference servers. Those tools optimise one model on one deployment. Ray Serve orchestrates many pieces across a cluster and can call those servers as parts of a larger graph.

| | Ray Serve | TGI | vLLM | Managed endpoint |
|---|---|---|---|---|
| **Primary focus** | Multi-model composition | Single LLM serving | Single LLM serving | Hosted single model |
| **Framework support** | Any Python framework | Transformer LLMs | Transformer LLMs | Provider models |
| **Runs where** | Your Ray cluster | Your server | Your server | Provider infrastructure |
| **Scaling unit** | Per-deployment replicas | Model replicas | Model replicas | Provider-managed |
| **You operate it** | Yes | Yes | Yes | No |
| **Best for** | Pipelines, mixed models | One high-throughput LLM | One high-throughput LLM | Fastest time to live |

If you need raw throughput for a single model, [TGI](/tools/tgi/) or vLLM are more direct. If you need to stitch several models and steps into one autoscaling service, Ray Serve is the composition layer, and it can host TGI or vLLM inside individual deployments.

## When not to use it

Ray Serve adds a cluster and a programming model. That overhead is not always worth it.

- **You serve one model with one endpoint.** A single-model server such as TGI or vLLM is simpler to run and tune, and a managed endpoint removes operations entirely.
- **You want a fully managed service.** Ray Serve is a library you deploy and operate yourself. If you prefer not to run infrastructure, a hosted inference endpoint fits better.
- **Your team has no Ray experience.** The distributed model, replicas, and handles carry a learning curve. For a first production service, weigh that against a simpler path in the [zero to production guide](/guides/from-zero-to-production/).
- **Latency budgets are extremely tight and the graph is trivial.** Extra hops between deployments add coordination cost that a single process avoids.

## Further reading

- [Ray Serve documentation](https://docs.ray.io/en/latest/serve/index.html): official reference for deployments, composition, and autoscaling.
- [Ray project home](https://www.ray.io/): overview of Ray Core, Data, Train, Serve, Tune, and RLlib.
- [What is inference?](/glossary/inference/): the serving stage Ray Serve is built to run.
- [TGI](/tools/tgi/): a single-model LLM server you can compare against or host inside a deployment.
- [AI agents](/glossary/ai-agents/): multi-step services that map naturally onto Ray Serve composition.
- [From zero to production](/guides/from-zero-to-production/): a path to your first deployed service.

## Sources

- [Ray Serve documentation](https://docs.ray.io/en/latest/serve/index.html), Ray project, fetched 2026-06-29.
- [Ray project home](https://www.ray.io/), Ray project, fetched 2026-06-29.
