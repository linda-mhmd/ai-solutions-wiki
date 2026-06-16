---
title: "Gemma 4 Lands on Amazon Bedrock"
description: "Google DeepMind's open Gemma 4 family is now available on Amazon Bedrock in three variants, including a 256K-context dense model and a mixture-of-experts variant. What it is and when to reach for each one."
date: 2026-06-15
lastmod: 2026-06-16
last_updated: 2026-06-16
categories: [News]
tags: ["gemma", "amazon-bedrock", "foundation-models", "open-models", "mixture-of-experts", "aws", "google-deepmind"]
related:
  - tools/amazon-bedrock
  - glossary/foundation-models
  - glossary/mixture-of-experts
  - glossary/inference
---

If you build on AWS, the practical question with any new model is rarely "is it good," but "can I call it from the platform I already use, and which size fits my workload." As of the AWS Weekly Roundup on June 15, 2026, Google DeepMind's open **Gemma 4** family is available on {{< relref "tools/amazon-bedrock" >}}, so you can reach it through the same managed API, security, and billing as every other Bedrock model, with no servers to run.

## What happened

AWS announced that the Gemma 4 family is now available on Amazon Bedrock in three variants, each aimed at a different point on the cost, latency, and capability curve:

- **Gemma 4 31B** is a dense model with a **256K-token context window**, suited to reasoning and coding workloads where you need to hold a lot of context at once.
- **Gemma 4 26B-A4B** uses a **mixture-of-experts** architecture, which activates only part of the network per token. That targets cost- and latency-sensitive workloads: you get a large model's quality while paying closer to a smaller model's compute.
- **Gemma 4 E2B** is the smallest variant, designed for low-latency, interactive use cases.

Gemma is Google DeepMind's family of open models, the open-weight cousin of the proprietary Gemini line. Putting it on Bedrock means you can use an open model without standing up your own inference infrastructure.

## Why it matters for builders

Two things are useful here. First, **open models on a managed platform** give you a middle path: more transparency and portability than a fully closed API, but without the operational burden of hosting the weights yourself. If you later want to self-host for control or cost, an open model keeps that door open in a way a closed one does not.

Second, the three variants make the **cost/latency trade-off explicit**. A {{< relref "glossary/mixture-of-experts" >}} model like the 26B-A4B is the interesting one for production: it is built to keep {{< relref "glossary/inference" >}} cheap and fast at scale, which is exactly where token spend compounds. The 256K-context 31B is the one to reach for when the task genuinely needs to see a large document or codebase at once, not by default.

The deeper point is the one the wiki keeps making: a {{< relref "glossary/foundation-models" >}} choice is an architecture decision, not a leaderboard pick. Match the variant to the access pattern.

## What to do

- Pick the variant by workload, not by size. Reach for **E2B** for interactive, low-latency features, **26B-A4B** when you are cost- or latency-sensitive at volume, and **31B** only when you truly need the 256K context.
- Try it the same way you try any Bedrock model: through the unified API, with usage-based pricing. See {{< relref "tools/amazon-bedrock" >}} for how access, pricing, and integration work.
- Confirm regional availability and current pricing on the official AWS pages before you commit, since both vary by capability and Region.

## Further reading

- [Amazon Bedrock]({{< relref "tools/amazon-bedrock" >}}) and {{< relref "glossary/foundation-models" >}}: what a managed model platform is and how to choose a model.
- {{< relref "glossary/mixture-of-experts" >}}: why an MoE model can be both large and cheap to run.
- [Building RAG systems]({{< relref "guides/building-rag-systems" >}}): a common place a large-context open model earns its keep.
- AWS Bedrock documentation: [supported foundation models](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html) and [pricing](https://aws.amazon.com/bedrock/pricing/).
- Google DeepMind: [the Gemma open models](https://ai.google.dev/gemma).

## Sources

1. Amazon Web Services. "AWS Weekly Roundup: AWS FinOps Agent in preview, Gemma 4 on Bedrock, Kiro Pro Max, and more (June 15, 2026)." [https://aws.amazon.com/blogs/aws/aws-weekly-roundup-aws-finops-agent-in-preview-gemma-4-on-bedrock-kiro-pro-max-and-more-june-15-2026/](https://aws.amazon.com/blogs/aws/aws-weekly-roundup-aws-finops-agent-in-preview-gemma-4-on-bedrock-kiro-pro-max-and-more-june-15-2026/)
2. Amazon Web Services. "Amazon Bedrock: supported foundation models." [https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html)
3. Google DeepMind. "Gemma open models." [https://ai.google.dev/gemma](https://ai.google.dev/gemma)
