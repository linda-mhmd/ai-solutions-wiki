---
title: "Adversarial Machine Learning"
description: "How evasion, poisoning, and model extraction attacks threaten ML systems, and the defenses available to mitigate them."
date: 2026-03-28
categories: [Glossary]
tags: [adversarial-ML, security, evasion-attacks, data-poisoning, model-robustness]
related:
  - glossary/ai-safety
  - glossary/ai-red-team
  - glossary/prompt-injection
  - glossary/guardrails
last_updated: 2026-05-30
---

Adversarial machine learning studies how attackers can manipulate ML systems and how to defend against such attacks. Unlike traditional software security, which focuses on code vulnerabilities, adversarial ML exploits the statistical nature of learned models. Small, carefully crafted perturbations to inputs can cause misclassification, training data manipulation can corrupt model behavior, and external queries can steal model functionality.

## How It Works

**Evasion attacks** modify inputs at inference time to cause misclassification. Adversarial examples add imperceptible perturbations to images that fool classifiers (a stop sign misclassified as a speed limit sign) or modify text to bypass content filters. Methods like FGSM, PGD, and C&W generate adversarial examples by optimizing perturbations to maximize the model's loss.

**Poisoning attacks** corrupt training data to manipulate model behavior. Backdoor attacks insert triggered patterns (e.g., a small patch in training images) that cause specific misclassifications when the trigger is present at inference time, while performing normally on clean inputs. Data poisoning can also degrade overall model accuracy by introducing mislabeled or adversarial training examples.

**Model extraction attacks** use query access to a deployed model to train a surrogate model that replicates its behavior. An attacker sends carefully chosen inputs, collects predictions, and trains a copy. This threatens proprietary models, as the extracted model can be used to generate adversarial examples or to avoid API costs.

## Adversarial ML in modern AI systems

Classic adversarial ML grew up around image and text classifiers. Large language models, retrieval systems, and agents add new attack surfaces that overlap with it but are not identical.

- **Prompt injection** is related to, but distinct from, classic evasion. It manipulates a model through natural-language instructions rather than optimized numeric perturbations. See [prompt injection](/glossary/prompt-injection/).
- **Agent and tool attacks** target what a model can do, not only what it says. When a model can call tools, browse, or run code, an attacker who steers it can reach the systems around it.
- **Retrieval poisoning** is a poisoning attack aimed at retrieval-augmented generation: planting adversarial content in a knowledge base so the model retrieves and repeats it. That makes [RAG evaluation](/glossary/rag-evaluation/) a security concern, not only a quality one.
- **Benchmark robustness is not production robustness.** A model that resists a fixed adversarial test set can still fail against novel, adaptive attacks in the wild. Treat a passing robustness score as a floor, not a guarantee.

## Why It Matters

As ML systems are deployed in safety-critical and security-sensitive contexts (autonomous driving, malware detection, financial fraud prevention, content moderation), adversarial vulnerabilities become a direct business and safety risk. Understanding these threats is essential for risk assessment and compliance, particularly as AI regulations increasingly require robustness testing.

## Practical Considerations

Defense starts with threat modeling: identify which attack types are realistic for your deployment. Adversarial training (including adversarial examples during training) is the most established defense against evasion attacks. Input preprocessing, certified defenses, and ensemble methods add additional layers. For model extraction, implement rate limiting, query monitoring, and watermarking. For poisoning, invest in data provenance and validation. Tools like IBM ART, Foolbox, and CleverHans support adversarial robustness evaluation. Include adversarial testing in your ML deployment pipeline alongside standard accuracy metrics.

## Sources

- Goodfellow, I., Shlens, J., & Szegedy, C. (2015). Explaining and harnessing adversarial examples. *International Conference on Learning Representations (ICLR)*. (Introduced FGSM; foundational evasion attack paper.)
- Szegedy, C., et al. (2014). Intriguing properties of neural networks. *ICLR 2014*. (First demonstration that imperceptible perturbations cause deep network misclassification.)
- Carlini, N., & Wagner, D. (2017). Towards evaluating the robustness of neural networks. *IEEE S&P 2017*. (C&W attack; benchmark for adversarial example strength.)
- Madry, A., et al. (2018). Towards deep learning models resistant to adversarial attacks. *ICLR 2018*. (PGD adversarial training; widely used robust training standard.)
- Chen, P.Y., et al. (2017). ZOO: Zeroth Order Optimization based black-box attacks. *ACM CCS Workshop on AISec 2017*.
- Tramèr, F., et al. (2016). Stealing machine learning models via prediction APIs. *USENIX Security 2016*. (Model extraction attacks.)

## Further reading

- [How AI models are evaluated](/guides/how-ai-models-are-evaluated/): where adversarial robustness testing and red teaming fit in the broader model evaluation lifecycle.
