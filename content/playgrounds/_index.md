---
title: "Playgrounds: Build and Experiment for Free"
description: "A beginner's map of every free, no-risk place to try AI and build on real cloud, which one to use when, and the honest point where you finally need to pay for a server."
date: 2026-07-13
lastmod: 2026-07-13
last_updated: 2026-07-13
tags: ["playground", "free-tier", "sandbox", "learning", "cloud", "getting-started"]
---

<figure class="bz-figure">
  <img src="/img/rapid-ai/glass-platforms-staircase-energy-notext.png" alt="Three glowing glass platforms rising like a staircase, standing for the steps from a free playground to a real running system." loading="lazy">
  <figcaption>You can climb a long way for free. This page maps every free step, and marks the one where you finally need to pay for a server.</figcaption>
</figure>

You can learn a huge amount and build real, working things without spending a cent and without any risk: no credit card, no account you might forget and get billed on, nothing left running by accident. This page is a plain-language map of every free place to experiment. It explains what each one is, who it is for, and the honest point where a free option runs out and you actually need to pay for a server.

A few words first, in plain terms:

- A **playground** is a website where you type a prompt and see what an AI model does. No code, no setup.
- A **sandbox** is a temporary computer you are lent for a short time. You can build real things in it, and it is wiped clean afterwards, so you cannot break anything or run up a bill.
- A **free tier** is a free allowance on a real service you sign up for. It stays yours, but you have to keep an eye on what you use.
- A **server** is a computer that stays switched on to answer requests from other people. Keeping it on is the thing you eventually pay for.

## Quick pick: which one should you use?

If you read nothing else, use this. Find your situation on the left.

| If you want to... | Use this | Why it fits |
|---|---|---|
| **See what an AI model does** | A browser playground | No setup, no code, instant |
| **Write and run some code** | A free notebook or API | Free GPU and free model calls |
| **Try real AWS with zero bill risk** | AWS Builder Sandbox | No card, deletes itself in 8h |
| **Your own AWS account to learn over weeks** | AWS Free Tier | Free credits, closes itself |
| **Put something online for other people** | A paid server | Free options cannot stay on |

The rest of this page explains each one. The rule underneath all of it: **start free, and only pay when something forces you to.**

## Try models in your browser (no code, no card)

The fastest way in. Open a page, type a prompt, watch what a model does. Good for your very first look and for comparing models.

- **[NVIDIA Arcade (build.nvidia.com)](https://build.nvidia.com/)**: run leading AI models in the browser, and copy the exact code when you are ready to move on. See [our write-up](/news/nvidia-blueprints-vendor-independent-alternative/).
- **[AWS PartyRock](https://partyrock.aws/)**: describe a small AI app in plain English and it builds it, no code and no AWS account.
- **Provider consoles**: the [Amazon Bedrock](/guides/getting-started-with-bedrock/) playground, Claude.ai, and ChatGPT all let you test prompts before you write any code.

**Who it is for:** complete beginners, and anyone comparing models before picking one. Nothing to install, nothing to clean up, nothing to pay.

## Run real code with free GPUs

When you want to write and run actual code, a notebook gives you a real machine, often with a free GPU, for the length of a session. A GPU is the chip that makes AI models run fast.

- **[Google Colab](https://colab.research.google.com/)**: write Python in the browser with free GPU time. The usual starting point.
- **[Kaggle Notebooks](https://www.kaggle.com/code)**: free notebooks with GPUs, plus practice datasets.
- **[Hugging Face Spaces](https://huggingface.co/spaces)**: host a small demo app for free and share a public link.

**Who it is for:** anyone learning to code with AI, or building a small experiment. The machine is temporary and free, so when the session ends it is gone and you were never billed.

## Build on real cloud: Sandbox vs Free Tier

This is where beginners get confused, because AWS gives you two different free ways in. Here is the difference in plain terms.

**[AWS Builder Sandbox](https://builder.aws.com/)** lends you a real AWS account for **8 hours**, with **no sign-up and no credit card**, and it **deletes itself** when the time is up. You reach it from a workshop, which walks you through the steps. Think of it as training wheels that vanish: you cannot forget to switch anything off, and there is no card to charge. Full details in [our news piece](/news/aws-builder-center-free-sandbox/).

**AWS Free Tier** is **your own AWS account**. You get **$100 in credits right away and up to $100 more as you explore, so up to $200 over 6 months**. The free plan uses a selected set of services, and **30+ services stay free forever** within monthly limits. The account **closes by itself after 6 months, or when the credits run out**, and you are **not charged unless you choose to upgrade** to a paid plan. Think of it as your own bike with a safety limit: it is yours to keep building on for weeks, but you should watch what you leave running.

| | AWS Builder Sandbox | AWS Free Tier |
|---|---|---|
| **Sign-up** | None | Your own account |
| **Credit card** | No | Not charged unless you upgrade |
| **How long** | 8 hours, then wiped | Up to 6 months of credits |
| **Cleanup** | Automatic | You manage it |
| **Best for** | A quick, guided, zero-risk try | Learning AWS over days and weeks |

**Which to pick:** if you just want to follow a workshop or try one thing with no risk at all, use the **Sandbox**. If you want your own account to build in over time, use the **Free Tier**, and check the billing page now and then. Other clouds (Google Cloud, Azure) have their own free tiers that work the same way as AWS Free Tier.

## Free API tiers to plug into your app

Once you are writing an app, it needs to call an AI model from your own code. An [API](/basics/what-is-an-api/) is how one program talks to another. Several providers give you a free or trial allowance for exactly this.

- **[NVIDIA endpoints](https://build.nvidia.com/)**, **[Groq](https://console.groq.com/)**, **[Together AI](https://www.together.ai/)**, and **[OpenRouter](https://openrouter.ai/)** all offer free or trial API access, so you can prototype now and switch providers later if you need to.

**Who it is for:** anyone building an app that uses AI. You prototype against a free quota, and only upgrade on purpose if you outgrow it.

## Free dev environment and hosting

The rest of a project can be free too, at least to start.

- **[GitHub Codespaces](https://github.com/codespaces)** gives you a full coding environment in the browser, and local Docker costs nothing on your own machine.
- **Static hosting** (GitHub Pages, Cloudflare Pages, Netlify) puts a website or front-end online for free. This wiki is a static site.

## When do you actually need a server (or to pay)?

Here is the honest part. Everything above is for **trying, learning, and prototyping**. You do **not** need a paid server to do any of it. You start needing real, paid infrastructure only when one of these becomes true:

- **It has to be always on** for other people to use, not just running while your laptop is open.
- **It has to remember things** between visits: accounts, saved work, a [database](/basics/what-is-a-database/).
- **It has real users or traffic**, or must be reliable.
- **It outgrows the free limits** on compute, requests, or storage.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Playground</span>
    <span class="bz-flow-step-desc">Try a model or an idea in the browser. Free, instant, nothing to manage.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Notebook or free API</span>
    <span class="bz-flow-step-desc">Write code and call a model from a free tier while you work. Still free.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Sandbox or free tier</span>
    <span class="bz-flow-step-desc">Put a small version on real cloud to try it or share it briefly.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Cheap always-on</span>
    <span class="bz-flow-step-desc">It needs to run for others: a small server or serverless, from a few euros a month.</span>
  </div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 5</span>
    <span class="bz-flow-step-name">Production</span>
    <span class="bz-flow-step-desc">Real traffic and reliability: managed cloud, scaled to what you actually use.</span>
  </div>
</div>

The jump to paid is smaller than people fear. It is rarely a big scary bill. Serverless options charge per request and cost almost nothing while idle, and a small server can be a few euros a month. The point is to take that step on purpose, when the work needs it, not before.

| What you want to do | Free is enough | You need a server (paid) |
|---|---|---|
| **Try a model, learn, analyse once** | Yes | No |
| **Prototype an app while you code** | Yes | No |
| **Share a demo for a few hours** | Yes | No |
| **An app or API always on for others** | No | Yes |
| **Keep user data between visits** | Rarely | Usually |
| **Real traffic or a reliability promise** | No | Yes |

For the cheap middle ground between free and full production, [working with multiple environments](/guides/working-with-multiple-environments/) shows how to keep a shared stage nearly free, and [from zero to production](/guides/from-zero-to-production/) walks the whole path end to end.

## A rule of thumb

Start in a playground. Move to a free notebook or API the moment you write code. Use a sandbox or a free tier to put something on real cloud. Pay for a server only when your thing must run for other people, remember data, or handle traffic. Until then, build everything for free, and enjoy the fact that you cannot break anything or run up a bill.

## Further reading

- [AWS Builder Center free sandboxes](/news/aws-builder-center-free-sandbox/): a real AWS account for 8 hours, no account or card.
- [NVIDIA's free model playgrounds](/news/nvidia-blueprints-vendor-independent-alternative/): try leading models in the browser for free.
- [What is the cloud?](/basics/what-is-the-cloud/): the plain-English foundation under all of this.
- [Working with multiple environments](/guides/working-with-multiple-environments/): keep a real second stage nearly free.
- [From zero to production](/guides/from-zero-to-production/): the full path from a first prototype to a live system.
- [Getting started with Amazon Bedrock](/guides/getting-started-with-bedrock/): try managed AI models, ideally inside a sandbox.
