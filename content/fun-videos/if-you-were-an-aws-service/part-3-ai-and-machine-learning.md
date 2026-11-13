---
title: "Part 3: AI and machine learning"
description: "Part 3 of If You Were an AWS Service, a fun intro to AWS: the answers that picked Amazon Bedrock, AgentCore, PartyRock, QuickSight, SageMaker AI, DeepRacer, Elemental Live and Mechanical Turk at AWS Hero Summit Seattle 2025."
date: 2026-11-12
last_updated: 2026-11-13
lastmod: 2026-11-13
weight: 3
part: 3
group: "AI & machine learning"
summary: "From foundation models and AI agents to a race car that learns by its mistakes, and the people who labelled the data behind modern AI."
tags: ["aws", "beginner", "video", "ai", "machine-learning", "generative-ai"]
services: ["amazon-bedrock", "bedrock-agentcore", "amazon-quicksight", "amazon-sagemaker"]
---

This part covers the AWS services for AI and machine learning, and a few the answers bring along the way.

### Amazon Bedrock

> **The answer:** Bedrock, "because I am confidently wrong".

{{< video src="fun-videos/if-you-were-an-aws-service/p3-bedrock.mp4" title="Amazon Bedrock: the explanation" caption="The explanation from the full video, with the people cut out. Narrated by Linda Mohamed (her cloned voice)." >}}

Bedrock is AWS's managed service for using foundation models from many AI companies to build generative AI apps. The explainer takes the joke seriously. A model predicts the most likely next words. When it does not know, it often guesses, fluently. That is a hallucination. Grounding helps: a knowledge base finds the relevant passages in your own documents and cites them, and a guardrail can block what is not backed up. Fewer hallucinations, easier to catch, but never zero.

### Amazon Bedrock AgentCore

> **The answers:** AgentCore Runtime, because it gives the workloads more duration. And AgentCore Code Interpreter, because of a love of writing code.

{{< video src="fun-videos/if-you-were-an-aws-service/p3-agentcore.mp4" title="Amazon Bedrock AgentCore: the explanation" caption="The explanation from the full video, with the people cut out. Narrated by Linda Mohamed (her cloned voice)." >}}

AgentCore is AWS's platform for building, deploying and running AI agents, with any framework and model. More duration is the point of Runtime: each agent session gets its own microVM, which can run for up to eight hours, and the session can carry on beyond that on a new one. Code Interpreter lets an agent write Python, JavaScript or TypeScript and run it in a sandbox.

### PartyRock and Amazon QuickSight

> **The answers:** one person picks PartyRock. Another picks QuickSight, because it was the first AWS service they were introduced to.

{{< video src="fun-videos/if-you-were-an-aws-service/p3-partyrock-quicksight.mp4" title="PartyRock and Amazon QuickSight: the explanation" caption="The explanation from the full video, with the people cut out. Narrated by Linda Mohamed (her cloned voice)." >}}

PartyRock is a Bedrock playground where anyone builds AI apps by describing them: no code, no AWS account, no credit card. QuickSight brings dashboards and business intelligence on your own data, and is now part of AWS Quick.

### Amazon SageMaker AI

> **The answer:** Linda answers her own question with SageMaker: a generalist with deep knowledge in places, the classic T-shape.

{{< video src="fun-videos/if-you-were-an-aws-service/p3-sagemaker.mp4" title="Amazon SageMaker AI: the explanation" caption="The explanation from the full video, with the people cut out. Narrated by Linda Mohamed (her cloned voice)." >}}

SageMaker is AWS's unified platform for data, analytics and AI, and SageMaker AI is its machine learning part. The explainer shows both strokes of the T: the broad platform, and HyperPod for training foundation models on thousands of accelerators.

### AWS DeepRacer and AWS Elemental Live

> **The answers:** one person finds two answers with a quiz app: DeepRacer and Elemental Live.

{{< video src="fun-videos/if-you-were-an-aws-service/p3-deepracer-elemental.mp4" title="AWS DeepRacer and AWS Elemental Live: the explanation" caption="The explanation from the full video, with the people cut out. Narrated by Linda Mohamed (her cloned voice)." >}}

DeepRacer is a one-eighteenth scale race car that learns to drive with reinforcement learning: the model gets a reward for staying on the track and a penalty for leaving it, and gets better by trial and error. Elemental Live is AWS's on-site encoder for live events. In the cloud, MediaLive turns one live feed into a ladder of qualities, so every screen gets a stream that fits its connection.

### Amazon Mechanical Turk

> **The answer:** one person picks Mechanical Turk. The reason is in the full video.

{{< video src="fun-videos/if-you-were-an-aws-service/p3-mturk.mp4" title="Amazon Mechanical Turk: the explanation" caption="The explanation from the full video, with the people cut out. Narrated by Linda Mohamed (her cloned voice)." >}}

Mechanical Turk was AWS's marketplace where programs could hand small tasks to people. It launched in November 2005, and the images in the ImageNet dataset were checked by people working through it. After almost twenty-one years, it closed at the end of September 2026.

## Sources

1. Amazon Bedrock User Guide, "Overview": https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html
2. Amazon Bedrock User Guide, "Retrieve data and generate AI responses with Amazon Bedrock Knowledge Bases": https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html
3. Amazon Bedrock User Guide, "Detect and filter harmful content by using Amazon Bedrock Guardrails": https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html
4. Amazon Bedrock AgentCore Developer Guide, "Use isolated sessions for agents" (own microVM per session, up to 8 hours per microVM lifecycle): https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-sessions.html
5. Amazon Bedrock AgentCore Developer Guide, "Execute code and analyze data using Amazon Bedrock AgentCore Code Interpreter" (Python, JavaScript, TypeScript): https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/code-interpreter-tool.html
6. AWS News Blog, Danilo Poccia, "Introducing new PartyRock capabilities and free daily usage" (1 December 2024; "No credit card or AWS account is required"): https://aws.amazon.com/blogs/aws/introducing-new-partyrock-capabilities-and-free-daily-usage/
7. AWS Quick User Guide, "What is AWS Quick?": https://docs.aws.amazon.com/quicksight/latest/user/welcome.html
8. Amazon SageMaker product page: https://aws.amazon.com/sagemaker/
9. Amazon SageMaker AI Developer Guide, "Amazon SageMaker HyperPod": https://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-hyperpod.html
10. AWS DeepRacer FAQs (1/18th scale car; console closed 15 December 2025; open source): https://aws.amazon.com/deepracer/faqs/
11. AWS Elemental Live product page: https://aws.amazon.com/elemental-live/
12. AWS Elemental MediaLive User Guide, "What Is MediaLive?": https://docs.aws.amazon.com/medialive/latest/ug/what-is.html
13. AWS News Blog, "Amazon's Mechanical Turk: The First Three Weeks" (21 November 2005): https://aws.amazon.com/blogs/aws/amazons_mechani/
14. Russakovsky et al., "ImageNet Large Scale Visual Recognition Challenge", arXiv 1409.0575 (2014), on verifying images with Amazon Mechanical Turk: https://arxiv.org/abs/1409.0575
15. Amazon Mechanical Turk ("permanently closed on September 30, 2026"); AWS lists 29 September 2026 as the full shutdown date: https://www.mturk.com/ and https://docs.aws.amazon.com/general/latest/gr/full_shutdown_services.html
