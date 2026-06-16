---
title: "Serverless: water only when a plant is dry"
description: "What serverless really means, why you still have servers, and when it is the right choice. Lesson 2 of the Gardener Path."
date: 2026-06-14
lastmod: 2026-06-14
last_updated: 2026-06-14
type: lesson
categories: [Learn]
tags: ["learning", "beginner", "serverless", "gardener-path"]
chapter: "Chapter 1 - Prepare the soil"
weight: 2
video: "garden/serverless-drip-ondemand.mp4"
video_type: "metaphor"
video_title: "The garden metaphor - drip irrigation on demand"
summary:
  - "Serverless means you run code without managing any servers yourself."
  - "A function wakes for one task, runs for seconds, then disappears, and you pay only while it runs."
  - "There are still servers; the provider runs them for you and hides them."
quiz:
  - q: "What does serverless actually mean?"
    options:
      - "There are no servers involved at all"
      - "You run code without managing the servers yourself; the provider runs them"
      - "It only works without the internet"
      - "Your code never stops running"
    answer: 1
    explain: "Serverless does not mean no servers. It means you do not provision or manage them; the provider does, and hides them from you."
  - q: "When does a serverless function cost you money?"
    options:
      - "All the time, even when idle"
      - "Only while it is actually running, billed per use"
      - "Once a month, as a flat fee"
      - "Only when it fails"
    answer: 1
    explain: "You pay per invocation and runtime. While nothing is calling it, it costs nothing."
  - q: "Which garden image fits serverless best?"
    options:
      - "A sprinkler that runs all day regardless"
      - "Drip irrigation that switches on only when a plant is dry, then stops"
      - "A greenhouse that never opens"
      - "A field left to the rain"
    answer: 1
    explain: "On-demand drip irrigation waters only when needed and then stops, like a function that wakes for one task and disappears."
---

A sprinkler that runs all day wastes water and money. Drip irrigation is smarter: a sensor notices a plant is dry, the water switches on for that plant, and then it stops. Serverless computing works the same way. Your code sits dormant, an event wakes it (a file arrives, a request comes in), it runs for a few seconds to do one job, and then it goes back to sleep. You pay only for the seconds it ran.

## You still have servers

The name is misleading. Serverless does not mean there are no servers. It means you never see or manage them. The provider keeps a fleet of machines ready, runs your function on one of them when it is needed, and takes it away afterward. Provisioning, scaling, patching, and capacity planning become the provider's job, not yours. What you give up is some control and predictability (for example, a cold start when a function has not run recently); what you gain is that you only think about your code.

## When serverless fits

Serverless shines for event-driven work: glue between services, light processing, APIs with uneven traffic, and tasks that are bursty or unpredictable. It fits less well for steady, heavy, long-running workloads where a continuously running server is cheaper, or where you need tight control over latency. As with the cloud itself, the point is to match the tool to the shape of the work.

## Further reading

- [Serverless]({{< relref "glossary/serverless" >}}) the glossary definition, with more depth.
- [AWS Lambda for AI pipelines]({{< relref "tools/aws-lambda" >}}) the most widely used serverless compute service, in practice.
- [What is the cloud?]({{< relref "learn/gardener/01-what-is-the-cloud" >}}) the previous lesson, if you skipped it.

## Sources

1. AWS. "What is serverless computing?" https://aws.amazon.com/serverless/
2. AWS. "AWS Lambda Developer Guide." https://docs.aws.amazon.com/lambda/latest/dg/welcome.html
