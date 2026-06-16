---
title: "What is a Model?"
description: "A model is the learned thing an AI produces from data and then uses to make predictions. Training it is the slow part, using it is fast and cheap."
date: 2026-06-15
level: 1
categories: [Basics]
tags: [beginner, ai, machine-learning, models]
last_updated: 2026-06-15
---

{{< quickanswer >}}
A model is the result of teaching a computer a pattern by showing it lots of examples. Once the pattern is captured, the model can look at something new and make a sensible guess about it. The model is the learned thing an AI produces, and then uses, to answer questions.
{{< /quickanswer >}}

## What a model actually is

When people say "AI", they usually mean a **model**. A model is not a program someone wrote line by line. It is a pattern a computer figured out by studying examples.

Imagine you want a system that can tell a photo of a cat from a photo of a dog. You do not write rules like "if it has pointy ears, it is a cat". Instead, you show the computer thousands of labelled photos and let it work out the pattern on its own. That captured pattern, the thing it learned, is the model. After that, you can hand it a brand new photo and it will make a prediction: cat or dog.

So a model is two things at once: the output of a learning process, and the tool you use afterwards to make predictions.

## An everyday analogy

Think of an experienced gardener. After many seasons of planting, watering, and watching things grow or fail, that gardener can glance at a new seedling and judge it instantly: this one is healthy, that one needs more light, this one will not survive.

Nobody handed the gardener a rulebook. The instinct was built up slowly, over many seasons. That hard-won instinct is the model. Building it took years. Using it takes a second. A computer model works the same way: the "many seasons" is the training data, the instinct is the model, and just like the gardener, it can be wrong on something it has never seen before.

## How it works in practice

There are two clearly separate phases, and the difference between them matters a lot.

- **Data:** you gather a huge number of examples, often millions of them.
- **Training:** you feed those examples through the learning process. This is slow and expensive, and usually done once.
- **The model:** the learned pattern that comes out the other end. This is the valuable result.
- **Using it:** you hand the finished model a new input and it gives you a fast answer.

The key takeaway: **training makes the model, using it is cheap.** The slow, costly work happens once, up front. Every answer after that is fast.

This is why you do not need to train your own model to build with AI. When you call a service like Amazon Bedrock or OpenAI, you are using a model someone else already trained. They paid the expensive training cost. You just pay a small amount each time you use it. (See [What is an API?]({{< relref "basics/what-is-an-api" >}}) for how that call works.)

## Why it matters

Understanding the two phases saves you from a common worry. Beginners often assume that to use AI, you must build and train a model yourself. You almost never do. The models behind most AI products today are pre-trained and ready to use through an API. It also explains the costs: training is the giant, one-time expense, while using a model is small and per-request.

## Common confusions

- **A model is not the whole app.** The model makes predictions. The app around it handles the screen, the buttons, the database, and the logic. (See [What is Software?]({{< relref "basics/what-is-software" >}}).)
- **A model is not always right.** It makes its best guess based on patterns it saw during training. New or unusual inputs can fool it.
- **A model is not the same as the data.** The data is the examples. The model is the pattern learned from them. Once trained, the model can work without keeping every original example around.
- **"Model" is broad.** A spam filter, an image recogniser, and a large language model are all models. They share the same idea: a pattern learned from data, then used to predict.

## What's next

Next: [What is AI?]({{< relref "basics/what-is-ai" >}}), the bigger picture of how models fit into artificial intelligence, and [What is Data and JSON?]({{< relref "basics/what-is-data-and-json" >}}), the raw material that every model learns from.
