---
title: "Capacity Planning for AI Inference"
description: "How to right-size GPU and TPU clusters, configure autoscaling for inference workloads, manage GPU memory, and plan capacity for variable AI traffic patterns."
date: 2026-03-28
categories: [Guides]
tags: [capacity-planning, gpu, autoscaling, inference, cost-optimization, ai-engineering]
related:
  - guides/disaster-recovery-ai
  - guides/platform-engineering-ai
  - glossary/serverless
---

AI inference workloads have different capacity planning requirements than traditional web services. GPU memory is the primary constraint, not CPU or network bandwidth. Latency varies with input size (longer prompts take longer). Cold starts are expensive because model loading takes seconds to minutes. Autoscaling must account for these characteristics or it will either waste resources or fail under load.

## Understanding GPU Resource Requirements

### GPU Memory Budget

A model's GPU memory consumption includes:

- **Model weights** - The base memory requirement. A 7B parameter model in FP16 (2 bytes/parameter) requires approximately 14 GB for weights alone. A 70B model requires approximately 140 GB. These figures cover only the stored parameters, they are not the total GPU memory required for inference.
- **KV cache** - Memory required to store key-value attention pairs during generation. Scales with batch size × sequence length × number of layers × head dimension × 2 (K and V). At batch size 8 and 2048-token sequences on a 32-layer model, KV cache adds approximately 4–8 GB. At batch size 32 or 8192-token contexts, KV cache can exceed model weight memory. vLLM's PagedAttention manages KV cache in non-contiguous blocks to improve utilisation, but does not eliminate this constraint [1].
- **Activation memory** - Temporary memory during forward pass computation.
- **Framework overhead** - CUDA context, library allocations, and buffer space.

Calculate the total memory budget before selecting GPU types:

| GPU | Memory | Typical Use |
|---|---|---|
| NVIDIA T4 | 16 GB | Small models (≤3B FP16), embeddings, INT8 classification |
| NVIDIA A10G | 24 GB | 7B INT8/INT4 models, embeddings, small-batch FP16 |
| NVIDIA A100 40 GB | 40 GB | 7B FP16 production inference, 13B with quantisation |
| NVIDIA A100 80 GB | 80 GB | 13–70B models, long-context inference |
| NVIDIA H100 | 80 GB | 70B+ models, high-throughput production inference |

### Throughput Estimation

Measure throughput empirically rather than estimating from specifications:

1. Deploy the model on the target GPU
2. Send requests with representative input distributions (not just short prompts)
3. Measure tokens per second at various batch sizes
4. Find the batch size that maximises throughput without exceeding the latency SLO
5. This is your per-GPU capacity

## Autoscaling Configuration

### Scaling Metrics

Standard CPU utilisation is a poor scaling metric for GPU inference. Use:

- **GPU utilisation** - Scale when GPU compute utilisation exceeds 70-80%. Available from DCGM (Data Center GPU Manager) or nvidia-smi.
- **Request queue depth** - Scale when pending requests exceed a threshold. This reacts to demand before latency degrades.
- **Inference latency** - Scale when P95 latency exceeds the SLO. Latency-based scaling is reactive but directly tied to user experience.
- **Custom metrics** - Tokens per second per replica, batch queue wait time, or KV cache utilisation.

### Scaling Configuration

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: inference-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: inference-service
  minReplicas: 2
  maxReplicas: 20
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
        - type: Pods
          value: 2
          periodSeconds: 60
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Pods
          value: 1
          periodSeconds: 120
  metrics:
    - type: Pods
      pods:
        metric:
          name: gpu_utilization
        target:
          type: AverageValue
          averageValue: "75"
```

Key settings:
- **Scale-up fast** - Add replicas quickly when demand increases (60-second stabilisation)
- **Scale-down slow** - Remove replicas cautiously to avoid flapping (300-second stabilisation)
- **Minimum replicas** - Always keep at least 2 replicas for availability. GPU cold starts take 30-120 seconds for model loading.

### Predictive Scaling

For workloads with predictable patterns (business hours traffic), use scheduled scaling to pre-provision capacity before demand arrives. AWS Target Tracking with predictive scaling or Kubernetes CronHPA can pre-scale inference replicas before the morning traffic ramp.

## Cost Optimisation

### GPU Right-Sizing

Do not default to the largest GPU. A model that fits on an A10G (24 GB, lower cost) should not run on an A100 (80 GB, higher cost) unless throughput requirements demand it. Profile the workload:

- If GPU utilisation is consistently below 50%, the GPU is oversized
- If memory utilisation is below 60%, a smaller GPU may suffice
- If batch size is always 1, the GPU's parallel processing capability is wasted

### Spot/Preemptible Instances

Use spot instances for non-latency-sensitive inference (batch processing, evaluation) and reserved instances for latency-sensitive production endpoints. Spot GPU instances can be 60-70% cheaper but can be reclaimed with 2-minute notice.

### Model Optimisation

Reduce GPU requirements through model optimisation:

- **Quantisation** - INT8 or INT4 quantisation reduces memory by 2-4x with modest quality impact
- **Model distillation** - Train a smaller model to match the larger model's behaviour
- **Speculative decoding** - Use a small draft model to generate candidate tokens, verified by the large model

## Capacity Planning Process

1. **Baseline** - Measure current traffic patterns, peak load, and growth rate
2. **Model** - Calculate per-replica throughput and the number of replicas needed for peak load with headroom
3. **Provision** - Secure GPU capacity (reserved instances for baseline, on-demand for burst)
4. **Monitor** - Track utilisation, latency, and cost continuously
5. **Adjust** - Review monthly. Adjust reserved capacity based on actual usage trends.

Plan for 30% headroom above measured peak. GPU capacity shortages during traffic spikes cannot be resolved quickly - on-demand GPU instances may not be available when you need them most.

## Sources

1. Kwon, W. et al. "Efficient Memory Management for Large Language Model Serving with PagedAttention." *Proceedings of the ACM SIGOPS 29th Symposium on Operating Systems Principles*, 2023. [https://dl.acm.org/doi/10.1145/3600006.3613165](https://dl.acm.org/doi/10.1145/3600006.3613165)
