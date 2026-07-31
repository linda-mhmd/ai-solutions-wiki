---
title: "When Do I Need a Server?"
description: "Not every app needs a server. Static sites, SPAs, and serverless functions cover most vibecoder projects. Here's how to know when you actually need one."
date: 2026-07-30
level: 2
categories: [Basics]
tags: [beginner, server, hosting, deployment, architecture]
faqs:
  - question: "Can I just use Vercel for everything?"
    answer: "For most vibecoder projects, yes. Vercel handles static hosting, serverless functions, and even edge functions. You only need to look elsewhere when you need persistent processes, websockets, custom runtimes, or more control over the server environment."
  - question: "What if my AI app needs to run long tasks?"
    answer: "Serverless functions typically have execution limits (10-60 seconds). For long-running AI tasks, you need either a background job queue (like Inngest or Trigger.dev) or an actual server that can run processes for minutes or hours."
  - question: "Is serverless cheaper than a server?"
    answer: "Depends on your traffic pattern. Serverless is cheaper for bursty, unpredictable traffic with lots of idle time. A server is cheaper for consistent, predictable load. A $5/month DigitalOcean droplet beats serverless costs if it's busy 24/7."
last_updated: 2026-07-30
---

{{< quickanswer >}}
You need a server when your app requires persistent processes, long-running tasks, websockets, or custom system-level access. For most vibecoder projects—landing pages, dashboards, AI wrappers, simple APIs—serverless platforms like Vercel or Netlify are enough. Only add server complexity when you hit a wall that serverless can't solve.
{{< /quickanswer >}}

## The decision tree

Ask these questions in order:

### 1. Is your app just HTML, CSS, and JavaScript?

**Yes → Static hosting. No server needed.**

A portfolio site, documentation, marketing page, or client-side React app can live entirely on static hosting (Vercel, Netlify, Cloudflare Pages, GitHub Pages). These platforms serve files from a CDN, handle HTTPS, and cost nothing for reasonable traffic.

Your "build" produces HTML/CSS/JS files. The platform serves them. No server involved.

### 2. Do you need to run code when users make requests?

**Yes → Serverless functions probably work.**

Most backend logic fits in serverless functions:
- API endpoints that respond in seconds
- Form submissions
- Authentication callbacks
- Webhook handlers
- AI API calls (that complete quickly)

Vercel Functions, Netlify Functions, Cloudflare Workers, and AWS Lambda all handle this. You write a function, deploy it, and it runs on demand.

```javascript
// Example: Vercel serverless function
export default async function handler(req, res) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    // ... call Claude API
  });
  const data = await response.json();
  res.status(200).json(data);
}
```

This runs when someone hits the endpoint, then shuts down. No server to manage.

### 3. Do you need any of these?

- **Long-running processes** (tasks that take minutes or hours)
- **Websockets** (real-time, persistent connections)
- **Background workers** (jobs that run without a request)
- **Custom system dependencies** (binaries, specific OS packages)
- **Persistent state in memory** (caching without Redis)
- **Scheduled jobs that run frequently** (every minute)

**Yes to any → You probably need a server.**

This is where serverless hits its limits. A function that times out after 60 seconds can't process a 10-minute video. A function that spins down between requests can't hold a websocket open.

## What serverless can't do well

### Execution time limits

| Platform | Max execution time |
|---|---|
| Vercel (Hobby) | 10 seconds |
| Vercel (Pro) | 60 seconds |
| Netlify | 10-26 seconds |
| Cloudflare Workers | 30 seconds (paid) |
| AWS Lambda | 15 minutes |

If your task takes longer, it gets killed mid-execution. For AI tasks that involve generating long content, processing documents, or running agents with many tool calls, this limit matters.

**Workarounds:**
- Break work into chunks that complete within limits
- Use background job services (Inngest, Trigger.dev, Upstash QStash)
- Switch to a server for that specific workload

### Websockets and real-time

Serverless functions are request-response: one request in, one response out, connection closed. Websockets need persistent connections where either side can send messages at any time.

**What needs websockets:**
- Chat applications
- Collaborative editing (like Google Docs)
- Live dashboards with push updates
- Multiplayer games
- Streaming AI responses (token by token)

**Serverless alternatives:**
- Polling (check for updates every few seconds)
- Server-sent events (one-way streaming, works on some platforms)
- Managed websocket services (Pusher, Ably, Supabase Realtime)

But if you need true bidirectional websockets you control, you need a server.

### Cold starts

Serverless functions "wake up" when called. The first request after idle time is slower—sometimes 1-5 seconds slower. This is a cold start.

For user-facing requests where latency matters, cold starts feel bad. A server that's always running doesn't have this problem.

**Mitigation:**
- Keep functions warm with scheduled pings
- Use edge functions (Cloudflare Workers have minimal cold starts)
- Accept the latency for non-interactive workloads

## When a server makes sense

### You're running an AI agent with long tasks

If your app runs Claude or GPT agents that execute multiple steps, use tools, and take minutes to complete, you need something that won't time out.

Options:
- A server (Railway, Render, Fly.io, DigitalOcean)
- A background job service
- A managed agent platform (if one fits your use case)

### You need persistent connections

A Discord bot, a Slack app with real-time features, a trading system that streams market data—these need processes that stay alive and connected.

### You're running custom binaries

Your AI workflow needs ffmpeg for video processing, ImageMagick for images, or some niche tool that isn't available on serverless platforms. A server lets you install whatever you need.

### You want predictable costs at scale

If your app gets consistent traffic (thousands of requests per hour, 24/7), a $20/month server might be cheaper than pay-per-invocation serverless.

## The hybrid approach

You don't have to choose one or the other. Many apps use:

- **Vercel** for the frontend and simple API routes
- **A small server** (Railway, Fly.io) for background jobs and long tasks
- **Managed services** for databases, auth, and storage

Your Next.js app deploys to Vercel. When a user kicks off a long AI task, you queue a job. A worker running on Railway picks it up, processes it for 5 minutes, and writes the result to the database. The frontend polls or uses webhooks to know when it's done.

This gives you the simplicity of serverless for 90% of your app and a server only where you need it.

## How to get a server (the easy ways)

If you decide you need a server:

| Platform | Effort | Best for |
|---|---|---|
| **Railway** | Low | Docker containers, quick deploys |
| **Render** | Low | Background workers, web services |
| **Fly.io** | Medium | Global distribution, low latency |
| **DigitalOcean App Platform** | Low | Simple deployments |
| **DigitalOcean Droplets** | Medium | Full control, SSH access |

Railway and Render are the "Vercel of servers"—connect GitHub, deploy. You don't manage the OS, you just deploy your code or container.

DigitalOcean Droplets give you a Linux machine you SSH into and configure yourself. More control, more responsibility.

## Further reading

- [What is a server?](/basics/what-is-a-server/): The underlying concept
- [What is hosting?](/basics/what-is-hosting/): Where your code lives
- [What is serverless?](/glossary/serverless/): The alternative to traditional servers
- [What is scaling?](/basics/what-is-scaling/): What happens when traffic grows
- [When do I need multiple servers?](/basics/when-do-i-need-multiple-servers/): The next question after "do I need one?"
