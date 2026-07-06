---
title: "World Model"
description: "A model that learns an internal, predictive representation of how an environment evolves, predicting future states in a latent space so it can support understanding and planning."
date: 2026-07-06
lastmod: 2026-07-06
categories: [Glossary]
tags: ["ai-ml", "advanced", "planning", "self-supervised", "robotics"]
related:
  - glossary/neural-network
  - glossary/computer-vision
  - glossary/reinforcement-learning
  - glossary/reasoning-models
last_updated: 2026-07-06
---

A world model is a model that learns an internal, predictive representation of how an environment evolves. Rather than generating raw pixels or text, it predicts future states in a latent space, an abstract representation, so that the prediction can be used for understanding and planning rather than for display. A leading self-supervised example is Meta's V-JEPA 2, a video model trained on internet-scale video that learns such a representation without labelled supervision. Its action-conditioned variant, V-JEPA 2-AC, uses the learned model to do zero-shot robot planning, showing that a world model built for understanding and prediction can also drive action.

## What a world model does

A world model captures the dynamics of an environment: given the current situation, it predicts what comes next. The key design choice in V-JEPA 2 is that prediction happens in a latent space. Instead of reconstructing every pixel of a future frame, the model predicts a compact representation of the future, which keeps it focused on the structure that matters for understanding and prediction. This is the basis for using the model in downstream tasks: a {{< relref "glossary/neural-network" >}} that has learned how a scene will evolve can be queried for "what happens if" without acting in the real world first. V-JEPA 2 learns this from internet-scale video in a self-supervised way, so it does not depend on hand-labelled data.

## From prediction to planning

Understanding and prediction become useful when they support planning. V-JEPA 2-AC is the action-conditioned variant of V-JEPA 2: it conditions the learned dynamics on actions, so the model can predict how the environment responds to a given action. Meta reports that this enables zero-shot robot planning, planning to reach a goal without task-specific training for that robot or task. This connects world models to {{< relref "glossary/reinforcement-learning" >}} and to {{< relref "glossary/reasoning-models" >}}: a system that can simulate outcomes internally can select actions by reasoning over predicted futures rather than by trial and error alone. The video grounding also ties world models to {{< relref "glossary/computer-vision" >}}, since the environment is perceived through video.

## Why it matters

Predicting in a latent space, rather than generating raw observations, makes a world model an efficient substrate for understanding, prediction, and planning. Training on internet-scale video with self-supervision means the approach scales without labelled datasets. The V-JEPA 2 and V-JEPA 2-AC results show a single learned model supporting both understanding and zero-shot planning, which is why world models are treated as a route toward agents that plan by simulating consequences.

## Origins and History

V-JEPA 2 was introduced by Mahmoud Assran, Nicolas Ballas, Yann LeCun, and colleagues at Meta FAIR in "V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning" (arXiv 2506.09985), released on 11 June 2025. The work trains self-supervised video models on internet-scale video and demonstrates that the resulting world model supports understanding and prediction. The action-conditioned variant, V-JEPA 2-AC, extends the model to zero-shot robot planning, making the understanding-to-planning path concrete.

## Sources

1. Assran, M., Ballas, N., LeCun, Y., et al. (Meta FAIR). *V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning.* arXiv:2506.09985, 11 June 2025. [https://arxiv.org/abs/2506.09985](https://arxiv.org/abs/2506.09985)
2. Meta AI. *V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning.* [https://ai.meta.com/research/publications/v-jepa-2-self-supervised-video-models-enable-understanding-prediction-and-planning/](https://ai.meta.com/research/publications/v-jepa-2-self-supervised-video-models-enable-understanding-prediction-and-planning/)
