---
title: "What is Serverless?"
description: "Running code without managing servers. Lambda functions, edge functions, and why vibecoders love serverless platforms."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, serverless, lambda, cloud, deployment, functions]
faqs:
  - question: "Is serverless actually serverless?"
    answer: "No—there are still servers. You just don't manage them. The cloud provider handles provisioning, scaling, and maintenance. You write code, they run it. The servers are someone else's problem."
  - question: "When should I use serverless vs a traditional server?"
    answer: "Serverless is great for: APIs with variable traffic, background jobs, webhooks, scheduled tasks, and getting started quickly. Traditional servers are better for: long-running processes, consistent high traffic, WebSocket connections, and when you need more control."
  - question: "Why does my serverless function sometimes respond slowly?"
    answer: "Cold starts. When a function hasn't been called recently, the cloud provider needs to spin up a new instance. This can add 100ms-1s of latency. Subsequent calls to a 'warm' function are fast."
last_updated: 2026-07-30
---

{{< quickanswer >}}
Serverless lets you run code without managing servers. You upload a function, and the cloud provider runs it when needed, scales it automatically, and charges you only for what you use. Vercel functions, AWS Lambda, and Cloudflare Workers are serverless—you write code, deploy, and it just works.
{{< /quickanswer >}}

## The idea

Traditional servers:
```
You: Set up server, install dependencies, configure networking,
     deploy code, monitor health, handle scaling, apply patches...
```

Serverless:
```
You: Upload function
Cloud: We'll handle literally everything else
```

You write a function. The cloud provider runs it when triggered, scales to handle load, and bills you per execution.

## How it works

### Traditional server

```
Server runs 24/7
↓
Handles requests when they arrive
↓
Sits idle when no requests
↓
You pay for idle time
```

### Serverless function

```
Function is dormant
↓
Request arrives
↓
Cloud spins up instance
↓
Function handles request
↓
Instance shuts down after timeout
↓
You pay only for execution time
```

## What serverless functions look like

### Vercel/Next.js API route

```javascript
// app/api/hello/route.js
export async function GET(request) {
  return Response.json({ message: 'Hello!' });
}

// Automatically deployed as serverless function
```

### AWS Lambda

```javascript
export const handler = async (event) => {
  const name = event.queryStringParameters?.name || 'World';
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Hello, ${name}!` }),
  };
};
```

### Cloudflare Workers

```javascript
export default {
  async fetch(request) {
    return new Response('Hello!', {
      headers: { 'content-type': 'text/plain' },
    });
  },
};
```

## Popular serverless platforms

| Platform | Best for | Notes |
|----------|----------|-------|
| **Vercel Functions** | Next.js apps | Zero config, automatic |
| **Netlify Functions** | Jamstack sites | Easy to set up |
| **AWS Lambda** | Everything | Most powerful, most complex |
| **Cloudflare Workers** | Edge computing | Runs closest to users, very fast |
| **Supabase Edge Functions** | Supabase projects | Integrates with Supabase |
| **Railway** | Full apps | Not strictly serverless but very easy |

## When serverless makes sense

### Good for serverless

**API endpoints:**
```javascript
// Perfect: stateless request → response
export async function POST(req) {
  const data = await req.json();
  const result = await processData(data);
  return Response.json(result);
}
```

**Webhooks:**
```javascript
// Receive webhook, process, return
export async function POST(req) {
  const event = await req.json();
  await handleStripeWebhook(event);
  return new Response('OK');
}
```

**Scheduled tasks:**
```javascript
// Run daily at midnight
// (configured in platform)
export async function handler() {
  await sendDailyReport();
  await cleanupOldData();
}
```

**Background jobs:**
```javascript
// Triggered by queue/event
export async function handler(event) {
  await processUploadedImage(event.imageId);
}
```

### Less ideal for serverless

**Long-running processes:**
```javascript
// Problem: might hit timeout (often 10-30 seconds)
export async function handler() {
  await veryLongProcess();  // Takes 5 minutes
}
```

**WebSocket connections:**
```javascript
// Problem: serverless functions are stateless
// Can't maintain persistent connections
// (Some platforms now support this, but it's limited)
```

**High consistent traffic:**
```
// If you have 10,000 requests/second consistently,
// a traditional server is probably cheaper
```

## Cold starts

The main gotcha with serverless.

**What happens:**
1. Your function hasn't been called in a while
2. Request comes in
3. Cloud needs to start a new instance (cold start)
4. 100ms-2s delay before your code runs
5. Subsequent requests hit the warm instance (fast)

**Mitigations:**
- Keep functions small (faster to start)
- Minimize dependencies (less to load)
- Use edge functions (Cloudflare Workers) for lowest latency
- Some platforms offer "warm" instances (costs more)

## Serverless vs edge functions

**Serverless functions:**
- Run in specific regions (us-east-1, eu-west-1)
- More resources (memory, CPU, time)
- Standard Node.js environment

**Edge functions:**
- Run at 200+ locations worldwide
- Closest to users (lowest latency)
- More restricted environment
- Best for: fast responses, personalization, A/B testing

```javascript
// Edge function (Cloudflare Workers, Vercel Edge)
export const config = { runtime: 'edge' };

export default function handler(request) {
  // Runs close to user, very fast
  return new Response('Hello from the edge!');
}
```

## Pricing model

Serverless pricing is based on:
- **Invocations**: Number of times function runs
- **Duration**: How long each run takes
- **Memory**: How much memory allocated

**Example (rough AWS Lambda pricing):**
- 1 million requests: ~$0.20
- Execution time: ~$0.0000166667 per GB-second

For most small apps: effectively free (generous free tiers).

At scale: can be cheaper or more expensive than servers, depending on traffic patterns.

## Limits to know

| Limit | Typical value |
|-------|---------------|
| Execution timeout | 10-30 seconds (some platforms allow more) |
| Memory | 128MB-3GB |
| Payload size | 5-10MB |
| Concurrent executions | 1000 (can be increased) |
| Cold start | 100ms-2s |

If you hit these limits, you might need:
- Break work into smaller chunks
- Use a background job queue
- Consider traditional servers

## Serverless in practice

### Next.js app on Vercel

```javascript
// app/api/users/route.js
import { db } from '@/lib/db';

export async function GET() {
  const users = await db.user.findMany();
  return Response.json(users);
}

export async function POST(request) {
  const data = await request.json();
  const user = await db.user.create({ data });
  return Response.json(user);
}

// Deploy to Vercel → automatically serverless
```

### Scheduled function (cron)

```javascript
// Vercel cron job (configured in vercel.json)
export async function GET() {
  await sendDailyEmails();
  return new Response('Done');
}

// vercel.json
{
  "crons": [{
    "path": "/api/daily-emails",
    "schedule": "0 8 * * *"  // Every day at 8am
  }]
}
```

## Serverless for vibecoders

Why vibecoders love serverless:

1. **No server management**: Deploy and forget
2. **Auto-scaling**: Handles 0 or 10,000 requests
3. **Pay for use**: Free tier covers most small projects
4. **Fast deployment**: Push code, it's live
5. **Framework integration**: Next.js, Remix just work

Most vibecoder projects never outgrow serverless. And if they do, migrating isn't that hard.

## Quick reference

```javascript
// Vercel/Next.js API route
// app/api/example/route.js
export async function GET(request) {
  return Response.json({ data: 'value' });
}

// With edge runtime (faster, more global)
export const config = { runtime: 'edge' };

// AWS Lambda format
export const handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ data: 'value' }),
  };
};

// Cloudflare Workers
export default {
  async fetch(request, env, ctx) {
    return new Response('Hello!');
  },
};
```

## Further reading

- [What is a server?](/basics/what-is-a-server/): Traditional alternative
- [What is an API?](/basics/what-is-an-api/): What serverless functions often implement
- [What is deployment?](/basics/what-is-deployment/): How serverless gets deployed
- [What is scaling?](/basics/what-is-scaling/): How serverless handles load
