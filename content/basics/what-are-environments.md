---
title: "What are Environments?"
description: "An environment is a separate copy of your software: one to experiment in safely, one your real users actually touch."
date: 2026-06-15
level: 1
categories: [Basics]
tags: [beginner, environments, deployment, devops]
last_updated: 2026-06-15
---

{{< quickanswer >}}
An environment is a separate copy of your software where it runs. You keep at least two: one for experimenting, where mistakes are free, and one for real, where your actual users are. You test changes in the safe copy first, and only move them to the real one once they work.
{{< /quickanswer >}}

## What an environment is

When you build software, the same app lives in more than one place at the same time. Each of those places is an environment: a self-contained copy of the system, with its own data, its own settings, and its own users (or none at all).

They look almost identical, but they serve different purposes. One is a place to break things on purpose and learn. Another is the live version that customers depend on. Keeping them apart is one of the most basic safety habits in all of software.

## An everyday analogy

Think of a kitchen garden. You have a big field that people actually eat from, and a small balcony tray off to the side where you test a new seed you are not sure about.

If the new seed turns out to be a weed, or it fails, no harm done. It only affected the tray. You never plant something untested directly into the field everyone relies on for dinner. The balcony tray is your test environment. The field is production, the real thing.

Software works the same way. You try a risky change in the safe copy, watch what happens, and only plant it in the real system once you trust it.

## How it works in practice

Most teams keep a small ladder of environments and move a change up the rungs:

- DEV (development): where you experiment freely and mistakes cost nothing.
- STAGING: a dress rehearsal that mirrors the real setup, used to catch problems before users do.
- PRODUCTION: the real one, with real users and real data.

A change starts in development. When it looks good, it is promoted to staging, where the team checks it under conditions that closely match real life. Only after it passes there does it go to production, where actual people use it.

The golden rule: never test a risky change directly on the field people are eating from. Production is the last stop, not the first.

## Why it matters

Without separate environments, every experiment is a gamble with your live service. One typo could take down the app while customers are using it, or quietly corrupt real data you cannot get back.

Environments give you a safety net. They let you:

- Make bold changes without fear, because development is disposable.
- Catch bugs in staging, where only your team sees them.
- Protect real users, because nothing reaches production until it has been tested.

This is also why you hear "it works on my machine." A developer's laptop is yet another environment, and if it differs from production, code that ran locally can still break for users.

## Where you will see this

- A website with a "staging" or "test" link that looks like the real site but is for the team only.
- App settings labelled dev, test, and prod.
- A deploy that "goes to production," meaning the change has reached real users.
- Tools that spin up a fresh copy of an app to try something safely.

Moving a tested change from one environment to the next is called deploying. That step relies on tracking exactly what changed, which is where {{< relref "basics/what-is-version-control" >}} comes in, often using {{< relref "basics/what-is-git" >}}. The environments themselves usually run in {{< relref "basics/what-is-the-cloud" >}}, on machines called servers (see {{< relref "basics/what-is-a-server" >}}).

## What's next

Next: [What is the Cloud?]({{< relref "basics/what-is-the-cloud" >}}), the rented computers where most environments actually run.
