---
title: "CRISP-DM: Cross-Industry Standard Process for Data Mining"
description: "The most widely used methodology for data science and machine learning projects, providing a structured six-phase approach from business understanding through deployment."
date: 2026-03-28
categories: [Frameworks]
tags: [crisp-dm, data-science, methodology, project-management, machine-learning]
related:
  - frameworks/tdsp
  - frameworks/agile-ai-delivery
  - frameworks/build-measure-learn
  - frameworks/design-thinking-ai
  - frameworks/maturity-model-ai
last_updated: 2026-05-30
---

CRISP-DM (Cross-Industry Standard Process for Data Mining) has been the dominant methodology for data science projects since its introduction in 1996. Despite its age, it remains the most commonly used framework because its six phases map naturally to how data science work actually happens - including the messy, iterative reality that linear project management frameworks miss.

## The Six Phases

### 1. Business Understanding

The most important and most frequently skipped phase. Before touching data, define the business problem clearly. What decision will this model inform? What does success look like in business terms, not model metrics? A model with 95% accuracy is useless if the business needed 99.9% or if it optimizes for the wrong outcome.

Key outputs: business objectives, success criteria, project plan, and an initial assessment of the situation including available resources, constraints, and risks.

### 2. Data Understanding

Explore available data sources. What data exists? What is its quality? How does it relate to the business problem? This phase prevents the common failure mode of building a model and then discovering that the training data does not represent the production environment.

Activities include data collection, descriptive statistics, data quality assessment, and initial exploration to identify patterns, anomalies, and interesting subsets. Document data dictionaries and lineage - future team members will need this context.

### 3. Data Preparation

The phase that consumes the most time in practice - often 60-80% of the total project effort. Raw data is cleaned, transformed, and structured for modeling. This includes handling missing values, encoding categorical variables, feature engineering, and creating training/validation/test splits.

Data preparation decisions have outsized impact on model quality. A thoughtful feature engineering step often matters more than the choice of algorithm. Document every transformation so the pipeline can be reproduced and audited.

### 4. Modeling

Select modeling techniques, design experiments, build models, and evaluate their performance. This is the phase most people think of as "data science," but it is effective only if the preceding phases were done well.

Build multiple models with different approaches. Compare them on the same validation set. Avoid over-optimizing on a single metric - check for fairness, robustness, and interpretability alongside raw performance. Document hyperparameter choices and the rationale behind them.

### 5. Evaluation

Assess whether the model actually solves the business problem defined in Phase 1. A model that performs well on technical metrics may still fail in business terms if it does not integrate into the decision-making process, if it is too slow for real-time use, or if its errors are concentrated in the cases that matter most.

This phase includes reviewing the entire process to identify steps that could be improved. It is the decision point: proceed to deployment, iterate on the model, or revisit the business understanding because the problem was not well-defined.

### 6. Deployment

Put the model into production where it can deliver value. This ranges from a simple report delivered to a stakeholder to a fully automated real-time inference service. Deployment includes monitoring, maintenance planning, and documentation for the operations team.

Many data science projects stall at this phase because the team optimized for model quality without considering deployment constraints. Plan for deployment from Phase 1.

## The Iterative Nature

CRISP-DM's most important property is that it is explicitly iterative. Arrows in the process diagram point backward as well as forward. Data understanding reveals that the business problem needs reframing. Modeling reveals that the data preparation was insufficient. Evaluation reveals that the model solves a different problem than intended.

Teams that treat CRISP-DM as a linear waterfall process miss the point. The framework acknowledges that discovery is non-linear and builds in structured checkpoints to course-correct.

## CRISP-DM and Modern AI

The framework predates deep learning, LLMs, and MLOps, but its phases remain relevant. For LLM-based projects, Business Understanding maps to use case definition and success criteria. Data Understanding maps to evaluating available context data and retrieval sources. Data Preparation maps to building RAG pipelines and prompt engineering. Modeling maps to model selection and fine-tuning. Evaluation maps to systematic evaluation of LLM outputs. Deployment maps to productionizing the AI system with monitoring and guardrails.

## Limitations

CRISP-DM does not prescribe specific tools, team structures, or agile practices. It does not address MLOps concerns like model versioning, continuous training, or A/B testing in production. Teams typically supplement CRISP-DM with modern MLOps practices and agile delivery frameworks to fill these gaps.
