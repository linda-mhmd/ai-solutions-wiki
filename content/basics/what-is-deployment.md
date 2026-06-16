---
title: "What is Deployment?"
description: "Deployment is the step that takes your working code off your own computer and puts it online, at an address anyone in the world can reach."
date: 2026-06-15
level: 1
categories: [Basics]
tags: [beginner, deployment, hosting, devops]
last_updated: 2026-06-15
---

{{< quickanswer >}}
Deployment is how software goes from running only on your computer to running live, where other people can actually use it. You take your finished code, package it up, and put it on a server with a public web address. Once it is deployed, anyone with the link can open it.
{{< /quickanswer >}}

## What deployment actually means

When you build something on your laptop, only you can see it. It runs on your machine, behind your screen, at an address like `localhost` that nobody else can reach. That is useful for testing, but it helps no one else.

Deployment is the step that changes that. It moves your code onto real servers (computers that run all the time, see [What is a Server?]({{< relref "basics/what-is-a-server" >}})) and gives it a public address like `https://your-app.com`. From that moment, the thing you made is live for the world.

## An everyday analogy

Think of growing a plant. While the seedling sits on your windowsill, it is safe and easy to fuss over, but only you ever see it. Deployment is the day you move that seedling out into the real field, where the soil is shared and anyone walking past can pick from it.

The plant did not change. Where it lives did. That move from your private windowsill to the open field is exactly what deployment does for code: same software, brand new audience.

## How it works in practice

Code that runs only on your laptop helps no one. Deploying packages it up and puts it on real servers, with an address anyone can reach. The good news for beginners: modern deploys are usually one command.

A typical deploy looks like this in the terminal:

```
$ make deploy
Building ...
Uploading ...
Live at https://your-app.com
```

Three quiet steps are happening there:

- Building: your code is bundled into a clean package, ready to run anywhere.
- Uploading: that package is sent to a server in the cloud (see [What is the Cloud?]({{< relref "basics/what-is-the-cloud" >}})).
- Live: the server starts running it and hands you a public web address.

Behind a single command, a hosting platform (Vercel, Netlify, Railway, AWS, and many others) takes care of the servers, the network, and keeping the app running. You describe what you want; the platform does the heavy lifting.

## Why it matters

The goal is to deploy often, in small steps, not once in a big scary push. When you ship small changes frequently, each deploy is tiny and easy to understand. If something breaks, you know exactly which little change caused it, and you can roll back fast.

Teams that deploy this way release many times a day without drama. Teams that save everything for one giant launch tend to have stressful, error-prone launches. Small and frequent beats big and rare.

## Where you will see this

- Pushing code to [GitHub]({{< relref "basics/what-is-github" >}}) often triggers an automatic deploy, so saving your work and shipping it can be the same action.
- "Staging" and "production" are two common deploy targets: staging is a private copy for testing, production is the real one your users see.
- "It works on my machine" is the classic problem deployment solves: getting the same code to run the same way somewhere other than your laptop.

## What's next

Next: [What is the Cloud?]({{< relref "basics/what-is-the-cloud" >}}), the rented computers your deployed app actually runs on.
