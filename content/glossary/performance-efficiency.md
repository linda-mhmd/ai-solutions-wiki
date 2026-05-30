---
title: "Performance Efficiency (Well-Architected Pillar)"
description: "The Well-Architected pillar covering compute selection, storage, database, and networking choices - and how it applies to AI workloads including GPU selection, model quantization, and inference scaling."
date: 2026-03-26
categories: [Glossary]
tags: ["architecture", "beginner", "performance-efficiency", "well-architected", "aws", "scalability", "optimization"]
related:
  - frameworks/well-architected-framework
  - frameworks/well-architected-ai-ml-lens
  - glossary/cost-optimization-pillar
  - glossary/reliability-pillar
last_updated: 2026-05-30
---

Performance Efficiency is one of the six pillars of the AWS Well-Architected Framework. It covers the ability to use computing resources efficiently to meet system requirements, and to maintain that efficiency as demand changes and technology evolves. The pillar recognizes that the right resource choice varies by workload: what is efficient for a transactional database is different from what is efficient for a batch analytics job or a machine learning inference endpoint.

Source: [AWS Well-Architected Performance Efficiency Pillar](https://docs.aws.amazon.com/wellarchitected/latest/performance-efficiency-pillar/welcome.html)

## Core Concepts

**Compute selection** means choosing the right compute type for each workload. AWS offers general-purpose instances (M family), compute-optimized instances (C family), memory-optimized instances (R family), storage-optimized instances (I family), and accelerated computing instances including GPU instances (P and G families) and custom ML chips (Trainium for training, Inferentia for inference). Selecting the wrong compute type results in either over-payment for resources the workload does not need or under-performance because the workload is running on unsuitable hardware.

**Storage selection** applies the same principle to storage: different storage types optimize for different combinations of throughput, latency, durability, and cost. S3 provides high-durability object storage at low cost, suitable for training data and model artifacts. EBS provides block storage with low-latency access, suitable for instance-attached databases. EFS provides shared file storage accessible from multiple instances, suitable for shared training data in distributed training scenarios. FSx for Lustre provides high-performance parallel file storage optimized for ML training workloads.

**Database selection** means choosing between relational databases for structured transactional data, NoSQL databases for flexible schema or high-throughput key-value access, and vector databases for similarity search on embedding vectors. Using a relational database for a workload that requires high-throughput key-value access results in poor performance and high cost. Using a key-value store for a workload that requires complex queries results in application-layer complexity that compensates for the database's limitations.

**Networking** covers the placement of resources relative to each other and to users. Resources that communicate frequently should be in the same Availability Zone to minimize latency and inter-AZ data transfer costs. Content delivery networks (CloudFront) bring static content closer to end users. Connection pooling reduces the overhead of establishing database connections.

**Performance review** should be ongoing. AWS publishes new instance types and managed services regularly. A compute selection that was optimal two years ago may be outdated today. The performance efficiency pillar requires periodic re-evaluation of resource choices against the current catalog of available options.

## Application to AI Workloads

AI workloads have distinctive performance characteristics that require specific consideration.

**GPU instance selection** for training and inference is a critical decision with significant cost and performance implications. AWS GPU instances range from single-GPU instances (G4dn with NVIDIA T4, suitable for smaller models and inference) to multi-GPU instances (P4d with eight NVIDIA A100s, suitable for large model training). AWS Trainium instances use custom chips optimized for training deep learning models and can be more cost-efficient than GPU instances for large-scale training. AWS Inferentia instances use custom chips optimized for inference throughput at lower cost than GPU instances.

Selecting between GPU families requires benchmarking the specific model architecture and batch size on candidate instance types, because performance varies significantly by model type and size.

**Model quantization** reduces the numerical precision of model weights from 32-bit floating point to 16-bit, 8-bit, or 4-bit representations. Quantization reduces the memory footprint of a model - enabling larger models to fit on smaller GPU instances - and increases inference throughput, because lower-precision arithmetic requires fewer compute cycles. The trade-off is a potential reduction in output quality, which varies by model architecture and quantization technique. Techniques like GPTQ and AWQ for post-training quantization, and quantization-aware training for models trained with reduced precision, minimize quality degradation.

**Inference endpoint scaling** requires understanding the relationship between concurrency, batch size, and latency for the specific model. Auto-scaling policies for SageMaker endpoints should be defined based on load testing data, not default parameters. The target metric for scaling - typically concurrent requests or GPU utilization - should be set to a level that maintains acceptable latency under peak load while avoiding over-provisioning at low load.

**Batch processing patterns** trade latency for throughput and cost efficiency. For workloads where requests do not require immediate responses, batching multiple inputs together and processing them in a single model forward pass significantly increases GPU utilization. SageMaker batch transform runs inference over large datasets stored in S3 without the overhead of maintaining a persistent endpoint. This pattern is well-suited for document processing, bulk classification, and periodic report generation.

## Sources

- AWS. (2023). *AWS Well-Architected Framework: Performance Efficiency Pillar*. Amazon Web Services. (Definitive reference for the five performance efficiency design principles: selection, review, monitoring, tradeoffs, and democratize advanced technologies.)
- Jouppi, N. P., Young, C., Patil, N., Patterson, D., Agrawal, G., Bajwa, R., ... & Yoon, D. H. (2017). In-datacenter performance analysis of a tensor processing unit. *Proceedings of the 44th Annual International Symposium on Computer Architecture (ISCA)*, 1–12. (Domain-specific hardware for ML workloads; the performance case for Tensor Processing Units vs. CPUs and GPUs.)
- Dettmers, T., Lewis, M., Shleifer, S., & Zettlemoyer, L. (2022). LLM.int8(): 8-bit matrix multiplication for transformers at scale. *Advances in Neural Information Processing Systems (NeurIPS) 35*. (Quantization for LLM inference performance; the technique enabling large models on smaller GPU instances.)
