---
title: "Apple Unveils Third-Generation Foundation Models at WWDC 2026"
description: "At WWDC on 8 June 2026 Apple introduced a five-model third-generation Apple Foundation Models family, built in collaboration with Google, and opened its server model to developers through the Foundation Models framework."
date: 2026-06-08
lastmod: 2026-07-13
last_updated: 2026-07-13
categories: [News]
tags: [apple, on-device-ai, foundation-models, siri, model-release, privacy]
related:
  - comparisons/llm-landscape-2026
  - glossary/agentic-ai
  - news/claude-opus-4-8
---

At WWDC on 8 June 2026 Apple introduced the third generation of Apple Foundation Models, a family of five models spanning on-device and Apple's Private Cloud Compute, and rebuilt Apple Intelligence and Siri around them. Two things make this release notable beyond a version bump: the on-device tier grew into a sparse mixture-of-experts model that is natively multimodal, and Apple opened its server model to third-party developers for the first time.

## What happened

The family has five members: AFM 3 Core and AFM 3 Core Advanced run on-device, while AFM 3 Cloud, an image model, and AFM 3 Cloud Pro run on Private Cloud Compute. Apple states the models were custom-built in collaboration with Google. The on-device Core Advanced is a roughly 20-billion-parameter sparse model that activates only a few billion parameters per request and accepts audio and image input, a step up from the single dense on-device model of prior generations.

For developers, the Foundation Models framework now exposes the server model through a new PrivateCloudComputeLanguageModel with a 32,000-token context window and a reasoning capability, adds image input to the on-device model, and can call third-party providers including Claude and Gemini. Apple rebuilt Siri as "Siri AI" with on-screen awareness and system-wide app actions, shipping as a beta later in 2026, with EU availability delayed citing the Digital Markets Act. Apple said a full technical report would follow later in the summer; as of the announcement it was not yet published, so detailed benchmarks are not yet available.

## Why it matters for builders

Apple's pitch has always been privacy through on-device processing. A natively multimodal on-device model widens what an app can do locally, without sending user data anywhere. The bigger shift for developers is programmatic access to the server model plus the ability to route to Claude or Gemini through the same framework, which turns Apple's platforms into a place you can build serious AI features rather than only consume Apple's own assistant.

The Google collaboration is the strategic surprise: Apple building its frontier models with a direct competitor signals how concentrated frontier training capability has become. If you build for Apple platforms, the practical takeaway is to design for on-device first and reach for the cloud model only when a task needs it. For how Apple's models sit against the rest of the field, see the [2026 LLM landscape](/comparisons/llm-landscape-2026/).

## Sources

- Apple Machine Learning Research, "Introducing the third generation of Apple Foundation Models" (8 June 2026): https://machinelearning.apple.com/research/introducing-third-generation-of-apple-foundation-models
- Apple Newsroom, "Apple unveils the next generation of Apple Intelligence, Siri AI, and more" (8 June 2026): https://www.apple.com/newsroom/2026/06/apple-unveils-next-generation-of-apple-intelligence-siri-ai-and-more/
- Apple Developer, "What's new in Apple Intelligence": https://developer.apple.com/apple-intelligence/whats-new/

## Further reading

- [The 2026 LLM landscape](/comparisons/llm-landscape-2026/): where Apple's models fit among the frontier.
- [Claude Opus 4.8](/news/claude-opus-4-8/): one of the third-party models Apple's framework can now call.
- [What is agentic AI?](/glossary/agentic-ai/): the system-wide app actions Siri AI is built to perform.
