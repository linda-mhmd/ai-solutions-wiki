---
title: "Sustainability (Well-Architected Pillar)"
description: "The Well-Architected pillar added in 2021 covering efficient resource usage, managed services, and data lifecycle management - and how it applies to AI workloads including model selection, efficient inference, and training in renewable energy regions."
date: 2026-03-26
categories: [Glossary]
tags: ["architecture", "beginner", "sustainability", "well-architected", "aws", "green-computing", "efficiency"]
related:
  - frameworks/well-architected-framework
  - frameworks/well-architected-ai-ml-lens
  - glossary/cost-optimization-pillar
  - glossary/performance-efficiency
last_updated: 2026-05-30
---

Sustainability is the sixth pillar of the AWS Well-Architected Framework, added in November 2021. It covers minimizing the environmental impact of running cloud workloads - specifically energy consumption and the carbon emissions associated with it. The pillar recognizes that cloud infrastructure, while more energy-efficient than typical on-premises data centers, still consumes significant electricity, and that architectural choices directly affect how much energy a workload consumes.

Source: [AWS Well-Architected Sustainability Pillar](https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sustainability-pillar.html)

## Background: Why Sustainability Was Added

The addition of Sustainability as a pillar in 2021 reflected growing organizational commitments to reduce carbon footprints, increasing regulatory interest in the environmental impact of technology, and a recognition that sustainable architectures tend to align with efficient architectures: wasting fewer compute cycles and storing less unnecessary data reduces both cost and environmental impact.

AWS has committed to powering its global infrastructure with 100 percent renewable energy by 2025 and achieving net-zero carbon by 2040, as part of The Climate Pledge. The sustainability pillar provides a framework for customers to contribute to those goals through their architectural choices.

The Amazon Sustainability Report documents AWS's progress toward renewable energy goals and the carbon footprint metrics associated with AWS regions. Organizations with sustainability commitments can use this information to inform where they deploy workloads.

## Core Concepts

**Efficient resource usage** means maximizing the utilization of the resources provisioned and avoiding idle capacity. An instance running at 10 percent CPU utilization consumes nearly as much energy as one running at 80 percent utilization, but produces far less useful work per unit of energy. Efficiency improvements - right-sizing, bin-packing multiple workloads onto fewer instances, using serverless architectures that consume compute only when processing requests - reduce energy consumption per unit of work.

**Managed services over self-managed alternatives** achieve higher resource utilization because they share infrastructure across many customers. A managed database service like RDS runs on hardware shared across many customers' databases, enabling higher overall utilization than each customer running their own database on dedicated instances. Serverless compute like Lambda allocates compute only when processing a request, with zero idle consumption. The sustainability pillar recommends preferring managed and serverless services where they meet functional requirements.

**Data lifecycle management** prevents the accumulation of data that is stored indefinitely but rarely or never accessed. S3 Lifecycle policies automatically transition objects to lower-cost, lower-energy storage classes (S3 Infrequent Access, S3 Glacier) after a defined period of inactivity, and delete them when they exceed a defined retention period. Storing data beyond its useful life wastes storage resources and the energy required to maintain them.

**Workload scheduling** enables compute-intensive jobs to run when and where the grid is cleanest. AWS publishes the carbon intensity of each region, enabling teams to schedule batch workloads to run in regions with a higher percentage of renewable energy, or at times when renewable generation is highest.

## Application to AI Workloads

AI workloads - particularly large language model training and inference - have significant energy footprints, making sustainability design especially important.

**Choosing smaller models when sufficient** is the most impactful sustainability decision for AI workloads. A smaller model requires less compute per inference request, processes more requests per unit of GPU capacity, and produces proportionally less energy consumption per unit of useful output. The principle is identical to right-sizing compute: do not use a 70-billion parameter model for a task that a 7-billion parameter model handles adequately. Fine-tuning a smaller model on domain-specific data often achieves equivalent quality to a larger general-purpose model for narrow tasks, at a fraction of the compute cost.

**Efficient inference patterns** reduce energy consumption per request. Batching groups multiple requests for processing in a single forward pass, increasing GPU utilization and reducing the energy cost per request. Model quantization reduces the arithmetic precision of model weights, decreasing the compute required per inference. Caching responses for repeated or semantically similar queries eliminates redundant model invocations entirely.

**Training job scheduling for renewable energy regions** applies the workload scheduling principle to the most energy-intensive ML operations. Large training runs may consume hundreds of megawatt-hours of electricity. Scheduling training jobs in AWS regions with high renewable energy percentages - such as US-West-2 (Oregon), EU-West-1 (Ireland), or EU-North-1 (Stockholm) - reduces the carbon footprint of those jobs. The AWS Customer Carbon Footprint Tool provides region-level carbon intensity data to support these decisions.

**Experiment discipline** reduces waste in the model development phase. Running large-scale training experiments that are unlikely to yield improvements consumes energy with little expected return. Investing in smaller-scale experiments to validate hypotheses before committing to full training runs reduces both cost and energy consumption.

The sustainability pillar frames environmental responsibility not as a constraint on performance or capability but as a design quality: a workload that accomplishes its purpose with less energy is, in that respect, better designed than one that accomplishes the same purpose with more.

## Sources

- AWS. (2023). *AWS Well-Architected Framework: Sustainability Pillar*. Amazon Web Services. (Definitive reference for the six sustainability design principles: understand your impact, establish sustainability goals, maximize utilization, use managed services, reduce downstream impact, and use efficient programming languages.)
- Patterson, D., Gonzalez, J., Le, Q., Liang, C., Munguia, L.-M., Rothchild, D., So, D., Texier, M., & Dean, J. (2021). Carbon considerations for large language model and code synthesis training. *IEEE Micro*, 42(5), 9–16. (Carbon cost of ML model training; efficient hardware selection, renewable energy regions, and model reuse to reduce AI carbon footprint.)
- Lannelongue, L., Grealey, J., & Inouye, M. (2021). Green algorithms: Quantifying the carbon footprint of computation. *Advanced Science*, 8(12), 2100707. (Carbon footprint quantification for computational workloads; the methodology underlying AWS Customer Carbon Footprint Tool calculations.)
