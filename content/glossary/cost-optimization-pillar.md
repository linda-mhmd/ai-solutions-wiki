---
title: "Cost Optimization (Well-Architected Pillar)"
description: "The Well-Architected pillar covering right-sizing, reserved capacity, spot instances, and cost allocation - and how it applies to AI workloads including model selection tradeoffs, Bedrock pricing, and caching strategies."
date: 2026-03-26
categories: [Glossary]
tags: ["architecture", "beginner", "cost-optimization", "well-architected", "aws", "cloud-costs", "efficiency"]
related:
  - frameworks/well-architected-framework
  - frameworks/well-architected-ai-ml-lens
  - glossary/performance-efficiency
  - glossary/sustainability-pillar
last_updated: 2026-05-30
---

Cost Optimization is one of the six pillars of the AWS Well-Architected Framework. It covers the ability to run systems at the lowest price point that still meets business requirements. The pillar reframes cost management not as a constraint but as a design consideration: the goal is to understand where money is being spent, eliminate waste, and make deliberate choices about when higher cost is justified by the value delivered.

Source: [AWS Well-Architected Cost Optimization Pillar](https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html)

## Core Concepts

**Right-sizing** means matching instance types and sizes to actual workload requirements. Over-provisioning - running large instances because they feel safe - is one of the most common sources of wasted cloud spend. Right-sizing requires measuring actual CPU, memory, and network utilization and selecting instances that meet peak requirements without significant headroom. AWS Compute Optimizer analyzes utilization data and recommends right-sized instance types.

**Reserved capacity** reduces cost for workloads with predictable, steady-state resource requirements. Reserved Instances and Savings Plans commit to a usage level for one or three years in exchange for discounts of 30 to 70 percent compared to on-demand pricing. Reserved capacity is appropriate for production workloads that run continuously. It should not be purchased for workloads that are still scaling or whose resource requirements are uncertain.

**Spot instances** provide access to unused EC2 capacity at discounts of 60 to 90 percent compared to on-demand pricing. The trade-off is that spot instances can be interrupted with a two-minute warning when AWS needs the capacity back. Spot instances are appropriate for workloads that are fault-tolerant and can be restarted: batch processing jobs, development and testing environments, and training jobs that checkpoint their state.

**Cost allocation** means tagging cloud resources with metadata that attributes costs to specific teams, projects, or workloads. Without cost allocation, cloud bills arrive as an aggregate number with limited visibility into what is driving cost. Tags applied consistently to all resources enable cost reporting by team, environment, and workload, and support chargeback and showback models in larger organizations.

**Budgets and alerting** create accountability for cloud spending. AWS Budgets can be configured to alert when actual or forecasted spending exceeds defined thresholds. Receiving an alert when a workload is trending toward exceeding its budget - before the bill arrives - enables teams to investigate and remediate before the overrun becomes significant.

## Application to AI Workloads

AI workloads introduce cost challenges that are distinct from traditional cloud workloads because the cost per request is higher, more variable, and harder to estimate in advance.

**Model selection by cost and quality tradeoff** is the most impactful cost decision for generative AI workloads. Foundation models vary significantly in cost per token: smaller models cost less per token but may produce lower quality outputs for complex tasks. The right model for a given use case is the smallest model that meets quality requirements. For tasks like document classification, summarization of short texts, or simple question-answering, a smaller, cheaper model often performs equivalently to a larger one. For tasks requiring complex reasoning or nuanced generation, a larger model may be necessary. Benchmarking models against the specific task before committing to production is essential.

**Bedrock pricing tiers** include on-demand pricing charged per input and output token, and Provisioned Throughput pricing that reserves model capacity for consistent latency and throughput at a fixed hourly rate. On-demand pricing is appropriate for variable or low-volume workloads. Provisioned Throughput becomes cost-effective for high-volume workloads where reserved capacity discounts offset the fixed cost.

**Caching to reduce API calls** is one of the highest-impact cost reduction strategies for generative AI. If identical or semantically similar prompts can be served from a cache rather than invoking the model, both cost and latency decrease. Exact caching handles identical prompts. Semantic caching uses vector similarity to identify prompts that are different in wording but equivalent in meaning. AWS offers prompt caching for certain Bedrock models, which caches the processed representation of a prompt prefix and reduces the cost of repeated use of the same system prompt.

**Batch vs real-time inference** is a cost-quality trade-off. Real-time inference processes each request immediately with low latency. Batch inference groups requests and processes them together, significantly improving GPU utilization and reducing per-request cost, but introducing latency. For use cases where users are not waiting for an immediate response - document processing, report generation, scheduled analysis - batch inference can reduce inference costs by 50 percent or more compared to real-time.

**Spot instances for training** apply to SageMaker training jobs, which can be configured to use managed spot training. SageMaker handles checkpointing automatically so that training jobs resume from their last checkpoint if interrupted, making spot training practical even for long-running jobs.

## Sources

- AWS. (2023). *AWS Well-Architected Framework: Cost Optimization Pillar*. Amazon Web Services. (Definitive reference for the five cost optimization design principles: cloud financial management, expenditure awareness, cost-effective resources, demand management, and optimizing over time.)
- Greenberg, A., Hamilton, J., Maltz, D. A., & Patel, P. (2009). The cost of a cloud: Research problems in data center networks. *ACM SIGCOMM Computer Communication Review*, 39(1), 68–73. (Economics of data center infrastructure; compute, storage, and networking cost structures underlying cloud pricing.)
- Patel, P., Bansal, D., Yuan, L., Murthy, A., Greenberg, A., Maltz, D. A., Kern, R., Kumar, H., Zikos, M., Wu, H., Kim, C., & Karri, N. (2013). Ananta: Cloud scale load balancing. *Proceedings of ACM SIGCOMM*, 207–218. (Cloud-scale infrastructure economics informing cost optimization strategies for high-throughput workloads.)
