---
title: "Model Distillation Patterns for Production AI"
description: "Using large model outputs to train smaller, cheaper, faster models for specific tasks. When to distill, training approaches, and quality validation."
date: 2026-03-28
categories: [Patterns]
tags: [model-distillation, fine-tuning, cost-optimization, performance, training]
last_updated: 2026-05-30
---

Model distillation uses a large, capable model (the teacher) to generate training data for a smaller, cheaper model (the student). The student learns to replicate the teacher's behavior on a specific task at a fraction of the inference cost. This is the most effective cost optimization pattern for AI applications that have identified a stable, well-defined task.

## When to Distill

Distillation is worth the effort when three conditions are met: you have a specific, well-defined task; you are processing enough volume that the cost difference between large and small models is significant; and the task's requirements are stable enough that the distilled model will not need frequent retraining.

**Good candidates** - Classification tasks, entity extraction, structured data generation, template-based responses, and any task where the output format is predictable and the quality bar is clearly defined.

**Poor candidates** - Open-ended generation, tasks where requirements change frequently, tasks requiring broad world knowledge, and tasks where the quality bar is hard to define or measure objectively.

## Training Data Generation

The teacher model generates the training dataset by processing a large set of representative inputs.

**Input selection** - Curate a diverse, representative set of inputs that covers the full range of production scenarios. Include edge cases and difficult examples, not just easy ones. If the training set is biased toward simple cases, the student will fail on harder ones.

**Quality filtering** - Not all teacher outputs are worth training on. Filter out low-confidence outputs, outputs that failed validation checks, and outputs that human reviewers flagged as incorrect. A smaller, high-quality training set produces a better student than a larger, noisy one.

**Volume** - The required training set size depends on task complexity. Simple binary classification may need 1,000-5,000 examples. Multi-class classification or extraction tasks typically need 5,000-20,000. Complex generation tasks may need 50,000+. Start small, evaluate, and add data if the student underperforms.

## Training Approach

**Direct fine-tuning** - Fine-tune the student model on the teacher's input-output pairs using the standard supervised learning approach. This is the simplest method and works well for most tasks.

**Output distribution matching** - Instead of training on the teacher's top-1 output, train on the full output distribution (logits or probability distribution over tokens). This transfers more information from the teacher, including the teacher's uncertainty, which can improve student calibration.

**Curriculum training** - Train the student on easy examples first and progressively harder ones. This often produces better results than random ordering, especially when the task has a wide difficulty range.

## Quality Validation

The student model must match the teacher's quality on the specific task to be a valid replacement.

**Benchmark comparison** - Evaluate both teacher and student on a held-out test set that was not used for training. Compare accuracy, precision, recall, and any task-specific metrics. The student should match the teacher within an acceptable margin (typically within 2-3% on the primary metric).

**Segment analysis** - Overall metrics can hide underperformance on specific input types. Analyze performance by input category, difficulty level, and edge cases. A student that matches overall accuracy but fails on 20% of edge cases is not ready for production.

**Production validation** - Run the student in shadow mode alongside the teacher on production traffic before switching. This catches issues that test datasets miss because production traffic is always more varied than test data.

## Maintenance

Distilled models need periodic refreshing as the production data distribution shifts. Monitor student model accuracy on production data continuously. When accuracy degrades below the acceptable threshold, regenerate training data with the current teacher model and retrain. Budget for quarterly retraining cycles as a baseline.
