---
title: "Set Spending Limits Before You Ship"
description: "Put a cap on your AI, cloud, and hosting bills before your first users arrive, so a runaway loop or a viral weekend cannot empty your account."
date: 2026-07-17
categories: [Guides]
tags: ["beginner", "cost-management", "cloud-costs", "billing", "spending-limits"]
related:
  - guides/ai-project-budgeting
  - guides/ai-cost-accounting
  - guides/ai-total-cost-ownership
  - basics/what-is-the-cloud
---

<figure class="bz-figure">
  <img src="/img/dark-cherry/vortex-complexity.png" alt="A dark spiralling vortex pulling inward toward a glowing red core." loading="lazy">
  <figcaption>A runaway loop works like a vortex: every single pass looks tiny, and the pull only becomes visible on the invoice.</figcaption>
</figure>

Your side project costs EUR 5 a month right up until the day it does not. Three things turn a hobby bill into a real invoice: a bug that calls an AI model in a loop, a post that goes viral, and stored files that quietly grow. None of them announce themselves. The invoice does.

This guide shows you how to cap every layer of your stack before you ship. Every claim about what a limit switch actually does is verified against the provider's own documentation, because the difference between "alerts you" and "stops the spending" is the whole point.

A note on currency: providers bill in US dollars. EUR figures in this guide assume USD 1 is roughly EUR 0.90 and are rounded. The rate moves daily; the arithmetic is what matters.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Price it</span>
    <span class="bz-flow-step-desc">Estimate requests per day, tokens per request, and price per token before launch.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Cap the model spend</span>
    <span class="bz-flow-step-desc">Set a spend limit in your AI provider's console. Know if it hard-stops.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Budget the cloud</span>
    <span class="bz-flow-step-desc">Create an AWS budget with alerts at 50% and 80% of your ceiling.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Cap the hosting</span>
    <span class="bz-flow-step-desc">Enable the pause or hard-limit switch on Vercel, Railway, or Supabase.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 5</span>
    <span class="bz-flow-step-name">Rehearse the bad day</span>
    <span class="bz-flow-step-desc">Know your kill switch, your key rotation steps, and your usage dashboard.</span>
  </div>
</div>

## The three bills that surprise builders

Three separate meters run while your app is live. Each one surprises builders in a different way.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">AI tokens</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Input tokens</span>
      <span class="bz-arch-chip">Output tokens</span>
      <span class="bz-arch-chip-note">Billed per million tokens. Grows with every request, every retry, and every loop iteration.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Hosting and egress</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Compute time</span>
      <span class="bz-arch-chip">Bandwidth out</span>
      <span class="bz-arch-chip-note">Scales with traffic. A viral moment multiplies compute and egress on the same day.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Storage</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Files</span>
      <span class="bz-arch-chip">Logs</span>
      <span class="bz-arch-chip">Backups</span>
      <span class="bz-arch-chip-note">Never resets. Last month's data is still there when this month's arrives.</span>
    </div>
  </div>
</div>

**AI API tokens.** Model providers bill per [token](/glossary/tokenization/), a small chunk of text roughly three quarters of a word. You pay for tokens going in and tokens coming out, at different rates. The danger is that token spend scales with bugs, not only with users. A retry loop without a delay burns tokens at machine speed while you sleep. If your AI tool starts looping, [interrupt it and change the approach](/guides/getting-unstuck-when-the-ai-loops/) instead of letting it run.

**Hosting and egress.** Your hosting platform bills for compute time and for bandwidth leaving its servers, called egress. Both scale with traffic. That is the point of the cloud, and also the trap: the same elasticity that survives a viral weekend also bills you for it. [What is the Cloud](/basics/what-is-the-cloud/) explains this pay-per-use model from the ground up.

**Storage.** Storage looks harmless because the per-gigabyte price is tiny. It surprises you through accumulation: uploaded files, application logs, database backups, and vector embeddings all pile up, and last month's gigabytes bill again this month. Storage is the bill that grows while nothing is happening.

## Do the arithmetic before shipping

You can predict your token bill with one multiplication. Do it before launch, not after.

```text
monthly cost = requests per day x 30
             x ( input tokens  x input price per token
               + output tokens x output price per token )
```

A worked example. Assume a small chat app: 1,000 requests per day, each sending 1,500 input tokens and receiving 400 output tokens. On Claude Sonnet 5, Anthropic lists $3 (about EUR 2.70) per million input tokens and $15 (about EUR 13.50) per million output tokens.

```text
Input:  1,000 x 1,500 = 1.5M tokens/day x  $3/M  =  $4.50/day
Output: 1,000 x   400 = 0.4M tokens/day x $15/M  =  $6.00/day

Per day:    $10.50
Per month:  $315   (about EUR 284)
```

That is not a EUR 5 hobby bill. The same app on Claude Haiku 4.5, listed at $1 (about EUR 0.90) input and $5 (about EUR 4.50) output per million tokens, costs $3.50 per day, about EUR 95 per month. Model choice is a 3x lever before you optimise anything else.

Now the runaway case. A retry loop with no delay fires 2 requests per second. Left alone for one 6-hour afternoon, that is 43,200 requests:

```text
Input:  43,200 x 1,500 = 64.8M tokens x  $3/M = $194.40
Output: 43,200 x   400 = 17.3M tokens x $15/M = $259.20

One afternoon: about $454   (about EUR 408)
```

One bug, one afternoon, EUR 408. This is why the next three sections exist. If you have not made an API call yet, start with [your first LLM API call](/guides/your-first-llm-api-call/) to see where these token counts come from.

Note on pricing: model prices change. Anthropic's [models overview](https://platform.claude.com/docs/en/about-claude/models/overview) is the source for the numbers above, including an introductory Sonnet 5 rate of $2/$10 per million tokens through 2026-08-31. Re-check prices on the provider's own page before you budget.

## Set hard limits on the AI provider

**Anthropic.** The Claude API has real hard stops. Each usage tier carries a monthly spend cap, and Anthropic's documentation states that once you reach it, API usage pauses until the next month. The Start tier caps at $500 (about EUR 450). You can also set your own limit below the tier cap: in the [Claude Console](https://platform.claude.com/), go to Settings, then Limits, then Change Limit in the Spend limits section. Set it to a number that would annoy you but not hurt you. Workspaces can carry their own lower limits, which is useful for separating a production key from an experiments key. See the [Claude and Anthropic tool page](/tools/claude-anthropic/) for the wider platform.

**OpenAI.** Say this plainly: an OpenAI project budget does not stop anything. OpenAI's documentation states that when usage exceeds the monthly budget, API requests continue to be processed without interruption; the budget triggers alert emails only. Set it anyway, in project settings under Limits, with a notification threshold below 100%. The actual hard stop on OpenAI is prepaid billing: you buy credits, and when the balance reaches zero, requests fail. Keep auto-recharge off, or set a low monthly recharge limit, and your credit balance becomes your cap. The [OpenAI API tool page](/tools/openai-api/) covers the platform in detail.

Whichever provider you use, treat the API key itself as part of the cost story. A leaked key means someone else spends your budget. [Protect your accounts](/guides/protect-your-accounts/) covers key hygiene before launch.

## Set budgets and alerts on the cloud

AWS Budgets is the standard cost control on AWS, and you should know exactly what it is: an alerting system, not a circuit breaker. A budget watches your spend and emails you at thresholds you choose, on actual or forecasted cost. AWS documents that budget data updates up to three times a day, so real spend can pass your threshold hours before the alert fires. Budgets warn; they do not cap.

Create one anyway, the day you open the account. Console path: Billing and Cost Management, then Budgets, then Create budget. Or from the terminal:

```bash
aws budgets create-budget \
  --account-id 111122223333 \
  --budget '{
    "BudgetName": "monthly-cap-50",
    "BudgetLimit": {"Amount": "50", "Unit": "USD"},
    "TimeUnit": "MONTHLY",
    "BudgetType": "COST"
  }' \
  --notifications-with-subscribers '[{
    "Notification": {
      "NotificationType": "ACTUAL",
      "ComparisonOperator": "GREATER_THAN",
      "Threshold": 80
    },
    "Subscribers": [{"SubscriptionType": "EMAIL", "Address": "you@example.com"}]
  }]'
```

That alerts you at 80% of $50 (about EUR 45). Add a second notification at 50% so the first email arrives while the number is still small.

For a partial hard stop, AWS offers budget actions: when a threshold trips, AWS can apply an IAM policy that denies creating new resources, or stop specific EC2 and RDS instances, automatically or after your approval. Useful, but not a full kill switch: serverless services and storage keep billing. Storage in particular has no off switch; the only cap is deleting data you no longer need, so set lifecycle rules on buckets early. See [Amazon S3](/tools/aws-s3/) for how object storage billing works.

## Cap the hosting platform

Hosting platforms differ sharply here, so check the switch you are relying on.

**Vercel.** Spend Management on the Pro plan notifies you at 50%, 75%, and 100% of a spend amount, can call a webhook, and can pause the production deployments of all your projects. The pause is optional and off until you enable it. Vercel checks spend every few minutes, so a pause can trigger several minutes after you cross the line; set the amount below your true maximum. Paused projects serve a 503 and must be resumed manually.

**Railway.** [Railway](/tools/railway/) has the cleanest model: a soft limit that only emails you, and a hard limit that takes all your workloads offline when reached, with warnings at 75% and 90%. The hard limit is a genuine kill switch. Your app goes down, which is exactly what you asked for.

**Supabase.** [Supabase](/tools/supabase/) Pro has a spend cap: with it enabled, usage beyond your plan's quota for metered items like egress and storage is disallowed until the next billing cycle. Hard stop, no overage charges. With the cap disabled, overages bill per unit. Free plan projects cannot run up a bill at all; they get restricted instead.

## Where the limit switch lives

| | Where the switch lives | Hard stop or alert | Fine print |
|---|---|---|---|
| **Anthropic API** | Console, Settings, Limits | Hard stop at cap | Self-set limit below tier cap |
| **OpenAI budgets** | Project settings, Limits | Alert only | Requests keep processing |
| **OpenAI credits** | Billing, prepaid balance | Hard stop at zero | Keep auto-recharge off |
| **AWS Budgets** | Billing, Budgets | Alert only | Data lags hours behind spend |
| **AWS budget actions** | Budgets, Actions | Stops EC2, RDS only | Storage keeps billing |
| **Vercel** | Team Billing, Spend Management | Hard stop if enabled | Pause lags a few minutes |
| **Railway** | Workspace usage limits | Hard stop at hard limit | Emails at 75% and 90% |
| **Supabase** | Org billing, spend cap | Hard stop over quota | Pro plan feature |

## The day the bill spikes

An alert arrives, or the dashboard shows a number that makes no sense. Work the list in order.

1. **Pull the kill switch.** Stop the spending before you diagnose it. Disable or delete the API key in the provider console; a dead key stops token spend instantly. Pause the deployment on your hosting platform. Losing an hour of uptime costs less than the loop.
2. **Rotate your keys.** If you cannot explain the usage, assume the key leaked. Create a new key, update your app, delete the old one. A key committed to a public repository gets found by scanners within minutes. [Protect your accounts](/guides/protect-your-accounts/) walks through rotation.
3. **Read the usage logs.** Every provider has a usage page: the Claude Console Usage page, the OpenAI usage dashboard, AWS Cost Explorer. Find which key, which model, which day, and which hour. A spike from one key at 03:00 is a bug or a leak; a broad rise across a week is real traffic.
4. **Fix the cause.** Runaway loops usually come from retries without a delay or an agent stuck repeating itself. Add exponential backoff, cap retry counts, and set per-request token limits. The error message usually names the problem; [learn to read it](/guides/how-to-read-an-error-message/).
5. **Talk to support.** Explain what happened and what you fixed. Some providers reduce a first accidental bill. None promise it, so do not plan around forgiveness; plan around the caps in this guide.

## Free-tier cliffs to know about

Free tiers end in three ways, and each one is a different cliff. A clock: trial credits expire on a date, and paid billing starts. A meter: a monthly quota resets, but a card on file means overage bills silently. An upgrade: you move to a paid plan for one feature and inherit metered billing for everything. Read which one applies before you enter a card number. AWS in particular has changed its free-tier terms over time; read the current official page rather than an old blog post.

Two safe positions exist. The first is a platform that cannot charge you, like a Supabase Free project, which gets restricted instead of billed. The second is no card at all: the [AI playgrounds](/playgrounds/) on this wiki list places to try models in the browser without an API key or a billing account. For everything else, the rule from [What is the Cloud](/basics/what-is-the-cloud/) applies: if a platform meters it, something can multiply it.

## Further reading

- [Budgeting an AI Project](/guides/ai-project-budgeting/): the full cost picture beyond inference, from data preparation to operations
- [AI Cost Accounting](/guides/ai-cost-accounting/): tracking and attributing AI spend once you have real usage
- [Your First LLM API Call](/guides/your-first-llm-api-call/): where tokens, requests, and usage numbers come from
- [Getting Unstuck When the AI Loops](/guides/getting-unstuck-when-the-ai-loops/): recognising and breaking loops before they cost money
- [What is the Cloud?](/basics/what-is-the-cloud/): the pay-per-use model that makes all of this necessary
- [AWS Cost Optimization Pillar](https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html): AWS's own framework for keeping cloud spend under control
- [Anthropic rate limits and spend limits](https://platform.claude.com/docs/en/api/rate-limits): the official reference for Claude API caps and tiers
- [AWS Budgets best practices](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-best-practices.html): official guidance on structuring budgets and alerts

## Sources

- [Anthropic: rate limits and spend limits](https://platform.claude.com/docs/en/api/rate-limits): spend caps per usage tier; usage pauses at the cap until the next month
- [Anthropic: models overview and pricing](https://platform.claude.com/docs/en/about-claude/models/overview): per-million-token prices used in the worked example
- [OpenAI: managing projects and budgets](https://help.openai.com/en/articles/9186755-managing-your-work-in-the-api-platform-with-projects): monthly budgets alert only; requests continue processing
- [OpenAI: what is prepaid billing](https://help.openai.com/en/articles/8264778-what-is-prepaid-billing): credit balance, auto-recharge, and usage halting at zero balance
- [AWS: managing costs with AWS Budgets](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html): alert behaviour, update frequency, and notification delay
- [AWS: configuring budget actions](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-controls.html): IAM and SCP actions; stopping EC2 and RDS instances
- [Vercel: Spend Management](https://vercel.com/docs/spend-management): notification thresholds, webhook, and the optional project pause
- [Railway: usage limits](https://docs.railway.com/reference/usage-limits): soft limit emails; hard limit takes workloads offline
- [Supabase: cost control and the spend cap](https://supabase.com/docs/guides/platform/cost-control): over-quota usage disallowed until the next billing cycle
