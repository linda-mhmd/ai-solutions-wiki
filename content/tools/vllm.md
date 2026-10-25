---
title: "vLLM - High-Performance LLM Serving Engine"
description: "vLLM is an open-source library for high-throughput, low-latency serving of large language models using PagedAttention memory management."
date: 2026-03-28
categories: [Tools]
tags: [open-source, llm, model-serving, inference, gpu, high-performance]
related:
  - tools/amazon-bedrock
  - tools/ollama
  - tools/huggingface-transformers
  - tools/ray
  - tools/kubeflow
alternatives:
  open_source:
    - tools/ollama
  aws: tools/amazon-bedrock
  azure: tools/azure-openai
  gcp: tools/google-vertex-ai
last_updated: 2026-10-25
lastmod: 2026-10-25
last_verified: 2026-09-25
---

vLLM is a high-throughput, memory-efficient inference and serving engine for large language models. Its core innovation is PagedAttention, a novel attention algorithm inspired by virtual memory paging in operating systems, which manages the KV (key-value) cache in non-contiguous memory blocks. This approach eliminates the memory waste caused by fragmentation and reservation in traditional LLM serving systems, achieving near-zero waste of KV cache memory and enabling 2-4x higher throughput compared to naive serving implementations.

vLLM provides an OpenAI-compatible API server out of the box, making it a drop-in replacement for production deployments. It supports continuous batching (dynamically adding and removing requests from running batches), tensor parallelism for distributing models across multiple GPUs, pipeline parallelism for multi-node serving, speculative decoding for faster generation, prefix caching for shared prompt optimization, and quantization methods including AWQ, GPTQ, and FP8. The engine supports a wide range of model architectures from the Hugging Face ecosystem, including Llama, Mistral, Qwen, DeepSeek, Gemma, and many others.

vLLM has become the industry standard for production LLM serving, used by companies and research labs that need to maximize GPU utilization and minimize inference costs. It is deployed at organizations including Anyscale, Cloudflare, and numerous AI startups. The project integrates with Ray for distributed serving, Kubernetes for orchestration, and is supported by all major GPU cloud providers.

## Key Capabilities

- **PagedAttention** - Virtual-memory-inspired KV cache management that eliminates memory fragmentation and enables near-optimal GPU memory utilization
- **Continuous Batching** - Dynamic batching that adds new requests to running batches without waiting, maximizing GPU throughput
- **Tensor Parallelism** - Distribute model layers across multiple GPUs for serving models larger than single-GPU memory
- **OpenAI-Compatible API** - Production-ready HTTP server with streaming, function calling, and tool use support matching the OpenAI API format

## Security note: upgrade to 0.32.0 (October 2026)

Two vLLM advisories published on 20 October 2026 both name **0.32.0** as the patched version; neither had a CVE ID on 25 October.

- **GHSA-h3rc-j82p-2c3h** (High, CVSS 3.1 8.1): in 0.30.0, `ImageMediaIO` passed attacker-controlled image bytes to Pillow's format autodetection, so "An EPS payload labeled `image/png` reached the host's Ghostscript executable". On a host whose Ghostscript is vulnerable to CVE-2024-29510 that becomes command execution with vLLM's privileges. The reporter reproduced it at the loader level; the HTTP path "is source-traced but was not exercised end to end". It needs an image-capable endpoint the attacker can reach and a vulnerable Ghostscript on the host.
- **GHSA-6757-hggm-hp2w** (High): with `--mm-processor-cache-type shm` enabled, an authenticated caller could forge a multimodal shared-memory handle that reaches `pickle.loads()` in the worker, "with insecure serialization disabled", through ordinary public HTTP routes. The confirmed affected version is 0.25.1 and earlier. Note the score: the advisory's metadata gives CVSS 3.1 7.5 (`AC:H`), while the report text inside it gives 8.8 (`AC:L`); the advisory does not explain the difference.

The preconditions the advisories list are a vulnerable Ghostscript build on the host for the first and the SHM multimodal cache being enabled for the second; the fix in both cases is 0.32.0. See the [AI agent security roundup, October 2026](/news/ai-agent-security-roundup-october-2026/).

## Cloud Equivalents

vLLM is the open-source alternative to the inference backends powering AWS Bedrock, Azure OpenAI Service, and Google Vertex AI model endpoints (Vertex AI was rebranded Gemini Enterprise Agent Platform in April 2026 - see [Google Vertex AI](/tools/google-vertex-ai/) for the full story). Cloud services abstract away serving infrastructure entirely, while vLLM gives organizations full control over serving optimization, GPU utilization, and cost per token at the expense of managing infrastructure.

## Origins and History

vLLM was created by Woosuk Kwon, Zhuohan Li, and other researchers at UC Berkeley's Sky Computing Lab, with the PagedAttention paper published at SOSP 2023. The project was open-sourced in June 2023 under the Apache License 2.0. It rapidly grew to become the most popular open-source LLM serving framework, passing 90,000 GitHub stars by September 2026. vLLM is a hosted project of the PyTorch Foundation (Linux Foundation), alongside PyTorch and Ray, with contributors from UC Berkeley, Anyscale, Red Hat, and many other companies; releases ship roughly every few weeks (v0.30.0 on 22 September 2026).

## Sources

1. https://github.com/vllm-project/vllm
2. PyTorch Foundation, hosted projects (vLLM, Ray, DeepSpeed): https://pytorch.org/foundation/
3. vLLM releases (v0.30.0, 22 September 2026): https://github.com/vllm-project/vllm/releases
4. Kwon, W. et al. "Efficient Memory Management for Large Language Model Serving with PagedAttention." SOSP, 2023.
5. vLLM, GitHub security advisory GHSA-h3rc-j82p-2c3h, "Untrusted EPS inputs can trigger denial of service or Ghostscript RCE in vLLM" (20 October 2026): https://github.com/vllm-project/vllm/security/advisories/GHSA-h3rc-j82p-2c3h
6. vLLM, GitHub security advisory GHSA-6757-hggm-hp2w, "Public multimodal SHM handle forgery reaches worker-side `pickle.loads()` with insecure serialization disabled" (20 October 2026): https://github.com/vllm-project/vllm/security/advisories/GHSA-6757-hggm-hp2w
