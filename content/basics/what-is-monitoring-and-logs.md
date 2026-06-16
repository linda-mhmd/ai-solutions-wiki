---
title: "What is Monitoring (and Logs)?"
description: "Monitoring watches your running software live and warns you when something is wrong. Logs are the written record of everything it did."
date: 2026-06-15
level: 1
categories: [Basics]
tags: [beginner, monitoring, logs, observability]
last_updated: 2026-06-15
---

{{< quickanswer >}}
Monitoring is watching your live software while it runs, the speed, the errors, the cost, and getting an alert the moment something crosses a line. Logs are the written trail of what actually happened, step by step. Together they let you find and fix problems, often before a single user notices.
{{< /quickanswer >}}

## What it is

Once software is running, you cannot see inside it just by looking. Monitoring and logs are how you keep an eye on it.

- **Monitoring** watches live numbers as the system runs: how fast it responds, how many requests are failing, how busy the machines are, how much it is costing. When a number crosses a line you set, an **alarm** fires and tells you.
- **Logs** are the written record. Every time the software does something important, it writes a line: who asked for what, what it answered, and any error it hit. Logs are the diary you read after the fact to understand what happened and why.

Monitoring tells you *that* something is wrong, right now. Logs tell you *what* went wrong, in detail. You need both.

## An everyday analogy

Picture a greenhouse with a sensor wall and a log book.

The sensor wall shows live readings: temperature, humidity, light, all updating in real time. If the temperature spikes past a safe point, a buzzer goes off so you can act immediately. That is monitoring.

The log book is the written history of every day: what you planted, when you watered, which plants struggled, what the weather did. Nothing on the sensor wall, but it explains how today's reading came to be. That is your logs.

You glance at the sensors to know if things are healthy now. You open the log book when you need to understand why a plant died last week.

## How it works in practice

Imagine your app starts throwing errors at 2am. Here is the difference monitoring and logs make.

- **Logs** are the written trail of what happened: each request, each response, each error, with a timestamp.
- **Metrics** are the live numbers monitoring tracks: how much, how fast, how many failures.
- **Alarms** are the rules that say "tell me when this is wrong" so a human gets paged.

With these in place, the alarm wakes you the moment error rates climb. You open the logs, see the exact line where requests started failing, and fix it in five minutes. Without them, you find out hours later from an angry customer, and then you are guessing in the dark.

As the saying goes, at 2am a clear log is the difference between a five-minute fix and a lost night.

## Why it matters

Software does not stay perfect after you ship it. Traffic spikes, a dependency breaks, a bad change slips through, costs creep up. Monitoring and logs turn these surprises into things you can see and respond to.

The goal is simple: know it broke before your customers tell you. A team that monitors well stays calm, because problems are caught early and the evidence to fix them is already written down.

## Where you will see this

- **Dashboards** are screens full of live charts (response time, error rate, traffic). Tools like Amazon CloudWatch, Grafana, and Datadog build these.
- **On-call** is the rotation where one engineer answers alarms, often outside work hours.
- **Observability** is the umbrella term for understanding what your system is doing from the outside, using logs, metrics, and traces together.

Monitoring is what happens after [deployment](/basics/what-is-deployment/): it is how you watch the live system out in the world. The errors you watch for often come from [code](/basics/what-is-code/) changes, and the numbers you track tell you when it is time to think about [scaling](/basics/what-is-scaling/).

## What's next

Next: [What is Security (and Auth)?](/basics/what-is-security-and-auth/), how you let the right people in and keep everything else out.
