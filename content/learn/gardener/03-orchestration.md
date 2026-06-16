---
title: "Orchestration: the potting line"
description: "How a workflow runs the steps of a system in order, retries failures, and shows exactly where something broke. Lesson 3 of the Gardener Path."
date: 2026-06-14
lastmod: 2026-06-14
last_updated: 2026-06-14
type: lesson
categories: [Learn]
tags: ["learning", "beginner", "orchestration", "workflow", "gardener-path"]
chapter: "Chapter 1 - Prepare the soil"
weight: 3
video: "garden/orchestration-potting-line.mp4"
video_type: "metaphor"
video_title: "The garden metaphor - the potting line"
summary:
  - "Orchestration is the recipe a system follows: which step runs, in what order, and what happens if one fails."
  - "A good orchestrator retries failures and makes every step, with its input and output, visible."
  - "It turns a tangle of functions into a workflow you can watch and debug."
quiz:
  - q: "What does orchestration do in a software system?"
    options:
      - "It writes the code for you"
      - "It decides which steps run, in what order, and what happens when one fails"
      - "It stores all your files"
      - "It replaces the need for any functions"
    answer: 1
    explain: "Orchestration is the coordination layer: sequencing steps, handling errors and retries, and running steps in parallel where possible."
  - q: "Why is a visible workflow valuable at 2am?"
    options:
      - "It looks nice"
      - "You can see exactly which step failed, with its input and output, instead of hunting through logs"
      - "It makes the system run faster"
      - "It removes the need for testing"
    answer: 1
    explain: "When every step and its data are inspectable, finding the broken step is immediate rather than a log hunt."
  - q: "Which garden image fits orchestration best?"
    options:
      - "A single seed in a pot"
      - "A potting line where every step happens in order and you can see which one jammed"
      - "A locked greenhouse"
      - "A pile of unlabelled seeds"
    answer: 1
    explain: "A potting line runs each step in sequence and makes a jam obvious, like a workflow that shows exactly where it broke."
---

Imagine a potting line in a nursery: a seed is sown, watered, labelled, moved to a bigger pot, and set out, each step in order, each handing off to the next. If the line jams, you can see exactly which station stopped. Orchestration is that line for software. It is the layer that decides which step runs, in what order, what happens in parallel, and what to do when a step fails.

## Why you need it

A real system is many small pieces, often many [serverless functions]({{< relref "learn/gardener/02-serverless" >}}), and something has to run them in the right sequence. Without orchestration, that coordination logic ends up scattered and hard to follow, and a failure halfway through leaves the system in an unknown state. An orchestrator centralizes the recipe: it sequences the steps, retries the ones that fail, runs independent steps at the same time, and keeps the state of each run.

## The debugging payoff

The biggest practical benefit shows up when something breaks. A good workflow engine records every step with its input, its output, and any error, so finding the broken step is immediate rather than a hunt through scattered logs. A workflow that fails loudly and visibly is far cheaper to operate than a clever one that fails silently.

## Further reading

- [AWS Step Functions]({{< relref "tools/aws-step-functions" >}}) a widely used workflow orchestration service, with the practical patterns.
- [Agentic workflows]({{< relref "patterns/agentic-workflows" >}}) what orchestration looks like once AI agents are the steps.
- [Serverless]({{< relref "learn/gardener/02-serverless" >}}) the previous lesson, the functions an orchestrator coordinates.

## Sources

1. AWS. "AWS Step Functions Developer Guide." https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html
2. AWS. "What is workflow orchestration?" https://aws.amazon.com/what-is/workflow-orchestration/
