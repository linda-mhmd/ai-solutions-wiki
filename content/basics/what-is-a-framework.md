---
title: "What is a Framework?"
description: "A framework is a ready-made starting kit for building software, so you do not begin from nothing and only write the part that is actually yours."
date: 2026-06-15
level: 1
categories: [Basics]
tags: [beginner, framework, software, tools]
last_updated: 2026-06-15
---

{{< quickanswer >}}
A framework is a ready-made starting kit for building software. The hard, common parts (the structure, the plumbing, the sensible defaults) are already done, so you do not start from nothing. You add only the part that is actually yours, and the framework handles the rest.
{{< /quickanswer >}}

## What it is

When people build an app or a website, a lot of the work is the same every time: how screens are organised, how pages connect, how data moves around. Solving all of that from scratch, for every project, would waste months.

A framework is a package of those common parts, already solved. It gives you a structure to build inside and a set of conventions (agreed ways of doing things) so you do not have to invent everything yourself. You focus on what makes your project different, and the framework handles the repetitive groundwork.

## An everyday analogy

Think of growing a plant. You can start from a single seed and do all the slow, fragile early work yourself, keeping it alive through its weakest weeks. Or you can buy an established plant from a garden centre. The hard early work is already done. You take it home, give it a good spot, and tend it from there.

A framework is the established plant. Someone else has already done the difficult early growing, so you start from something healthy and ready, then shape it into your own.

## How it works in practice

The rule of thumb is: do not rebuild the basics. A framework hands you the common parts every project of its kind needs (the structure, the way pages route to each other, the standard conventions), so the only code you write is the part that is genuinely unique to your idea.

Different frameworks are built for different jobs. A few you will hear about often:

- React, for building the screens and buttons people see and interact with
- Next.js, for building complete web apps on top of React
- FastAPI, for building backends, the behind-the-scenes part that stores data and does the real work

Choosing the right framework for the job can save months of effort. As a real example: the video course this wiki grew from is itself built inside a framework called Remotion, which turns code into video.

## Why it matters

You almost never build software entirely from scratch, and you should not want to. A good framework means a small team, or even one person directing an AI tool, can build something that would once have needed a large group and a long timeline.

For a beginner, the takeaway is simple. When you start a project, the first useful question is not "how do I build all of this?" It is "which framework already solves most of this for me?" Picking well is one of the highest-leverage decisions you can make.

## Common confusions

- Framework vs library. A library is a box of tools you reach for when you want them: you stay in charge of the order of events. A framework is more like a house you build inside: it sets the overall shape and decides when your parts get used. In everyday talk, people use the word "framework" loosely for both.
- A framework is not the finished product. It is the starting kit, not the app. You still build the part that makes your project yours.
- More features is not always better. The right framework is the one that fits your job.

## Related

- [What is Code?]({{< relref "basics/what-is-code" >}}), the instructions a framework helps you organise
- [What is a Function?]({{< relref "basics/what-is-a-function" >}}), the reusable building blocks frameworks are made of
- [What is Software?]({{< relref "basics/what-is-software" >}}), the bigger thing a framework helps you build
- [What is Open Source?]({{< relref "basics/what-is-open-source" >}}), how most popular frameworks are free to use and built in the open
