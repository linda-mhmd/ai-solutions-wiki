---
title: "Paperspace"
description: "Paperspace, now part of DigitalOcean, offers cloud GPUs, Jupyter notebooks, and virtual machines for developer-friendly machine learning work."
date: 2026-06-29
tags: ["gpu-cloud", "notebooks", "machine-learning", "infrastructure", "digitalocean"]
tool_category: "Infrastructure"
related:
  - glossary/inference
  - tools/runpod
  - tools/coreweave
  - tools/lambda-cloud
  - comparisons/gpu-clouds-and-neoclouds
---

<figure class="bz-figure">
  <img src="/img/dark-cherry/cable-sparks.png" alt="An industrial cable throwing red sparks, representing cloud GPU notebooks and machines." loading="lazy">
  <figcaption>Paperspace connects a browser notebook to a live GPU in a few clicks, sparking the compute you need on demand.</figcaption>
</figure>

Paperspace is a cloud platform for GPU-accelerated machine learning work. It gives you web-based Jupyter notebooks, virtual machines with attached GPUs, and container deployments, without asking you to configure drivers or provision hardware yourself. The problem it solves is friction: getting a GPU-backed development environment running usually means wrestling with CUDA installs, cloud IAM, and instance types. Paperspace lets you open a notebook in the browser and start training. It is now part of DigitalOcean, which acquired the company in 2023.

Paperspace targets individual developers, researchers, and small teams who want a fast path from idea to a running model. It sits in the developer-friendly corner of the GPU cloud market, where onboarding speed matters more than reserving thousands of accelerators. For heavy production [inference](/glossary/inference/) or large training clusters, you look elsewhere in the stack.

## Where Paperspace sits

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Interface</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Browser Jupyter notebook</span>
      <span class="bz-arch-chip">Web console</span>
      <span class="bz-arch-chip">CLI</span>
      <span class="bz-arch-chip-note">Open a notebook without local setup</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Products</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Notebooks</span>
      <span class="bz-arch-chip">Machines</span>
      <span class="bz-arch-chip">Deployments</span>
      <span class="bz-arch-chip">Workflows</span>
      <span class="bz-arch-chip-note">Develop, train, then serve models</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Compute</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">NVIDIA GPUs incl. H100</span>
      <span class="bz-arch-chip">Persistent storage</span>
      <span class="bz-arch-chip-note">Attached to notebooks and VMs</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Provider</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">DigitalOcean</span>
      <span class="bz-arch-chip-note">Paperspace is part of DigitalOcean since 2023</span>
    </div>
  </div>
</div>

The four Paperspace products map to the arc of a machine learning project. Notebooks are the web-based Jupyter environment with shared persistent storage, backed by an accelerated machine. Machines are Linux and Windows virtual machines with GPU options and persistent disks for longer training runs. Deployments run container images to serve models as endpoints. Workflows automate the steps between those stages into a pipeline.

## How to access it and how it fits

You do not install Paperspace locally. You sign up, then open a notebook or launch a machine from the web console. This is the core appeal: the GPU environment lives in the cloud, and you reach it through a browser tab or the command line.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Create an account</span>
    <span class="bz-flow-step-desc">Sign up on Paperspace or through DigitalOcean and pick a GPU type.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Open a notebook</span>
    <span class="bz-flow-step-desc">Launch a Jupyter notebook in the browser, backed by a GPU machine.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Train and iterate</span>
    <span class="bz-flow-step-desc">Write code, run training, and keep data on persistent storage between sessions.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Deploy</span>
    <span class="bz-flow-step-desc">Package the model in a container and serve it through a Deployment.</span>
  </div>
</div>

Because it is now part of DigitalOcean, Paperspace fits naturally alongside the rest of a DigitalOcean stack: app hosting, managed databases, and storage in the same account. DigitalOcean has been folding the GPU offering into its broader Gradient product line, so the exact product names and pricing you see may shift as that integration continues. If you already run infrastructure on DigitalOcean, the GPU compute becomes another service in the same console rather than a separate vendor relationship.

## How it compares

| | Paperspace | [RunPod](/tools/runpod/) | [Lambda Cloud](/tools/lambda-cloud/) | [CoreWeave](/tools/coreweave/) |
|---|---|---|---|---|
| **Primary appeal** | Notebooks, easy onboarding | Cheap on-demand GPUs | GPU cloud built for ML | Large-scale GPU clusters |
| **Notebook out of the box** | Yes, browser Jupyter | Via templates | Via instances | Not the focus |
| **Best fit** | Developers, small teams | Cost-sensitive experiments | Training and fine-tuning | Enterprise-scale training |
| **Owned by** | DigitalOcean | Independent | Independent | Independent |

The distinction across these providers is who they optimise for. Paperspace optimises for a developer who wants a notebook running in minutes. Providers like RunPod compete on raw hourly GPU price. Lambda Cloud and CoreWeave lean toward larger training and cluster workloads. The [GPU clouds and neoclouds comparison](/comparisons/gpu-clouds-and-neoclouds/) sets out the wider landscape and where each provider earns its keep.

## When not to use it

Paperspace is not the right choice in several cases.

- **You need very large training clusters.** For hundreds or thousands of interconnected GPUs, a provider built for cluster-scale training fits better.
- **You are chasing the lowest possible hourly GPU price.** Marketplace-style providers often undercut managed notebook platforms.
- **You need long-term platform stability today.** The standalone Paperspace product is being integrated into DigitalOcean's Gradient offering, so product names, features, and pricing are in flux. Confirm current details before committing.
- **You are already deep in a hyperscaler.** If your data and identity live in AWS, Azure, or Google Cloud, their own notebook and GPU services may reduce data movement and billing sprawl.

## Further reading

- [What is inference?](/glossary/inference/): the runtime step where a trained model produces predictions, the workload GPU clouds serve.
- [RunPod](/tools/runpod/): a GPU cloud that competes on low on-demand hourly pricing.
- [Lambda Cloud](/tools/lambda-cloud/): a GPU cloud built specifically for machine learning training.
- [CoreWeave](/tools/coreweave/): a provider aimed at large-scale GPU cluster workloads.
- [GPU clouds and neoclouds compared](/comparisons/gpu-clouds-and-neoclouds/): how the developer-friendly and cluster-scale providers differ.
- [Paperspace](https://www.paperspace.com/): the official product site, now part of DigitalOcean.
- [Paperspace on DigitalOcean docs](https://docs.digitalocean.com/products/paperspace/): official documentation for Notebooks, Machines, Deployments, and Workflows.

## Sources

- [Paperspace official site](https://www.paperspace.com/): product overview, DigitalOcean ownership, and NVIDIA H100 availability.
- [Paperspace documentation, DigitalOcean](https://docs.digitalocean.com/products/paperspace/): confirms the four products (Notebooks, Machines, Deployments, Workflows) and describes Paperspace as a cloud machine learning platform with GPU virtual machines and a container service.
- [Paperspace notebooks page, DigitalOcean](https://www.paperspace.com/notebooks): describes the fully managed browser Jupyter notebook environment.
