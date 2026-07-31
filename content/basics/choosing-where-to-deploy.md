---
title: "Choosing Where to Deploy Your App"
description: "Static sites, SPAs, SSR apps, APIs, workers, scheduled jobs—different workloads need different platforms. Learn how to match your app type to the right deployment option."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, deployment, hosting, architecture, workloads, serverless, containers]
faqs:
  - question: "Can I deploy everything to one platform?"
    answer: "Often yes. Platforms like Railway, Render, and Fly.io can handle frontends, APIs, databases, and workers together. But sometimes splitting makes sense—e.g., frontend on Vercel, API on Railway."
  - question: "What if I choose wrong?"
    answer: "You can migrate. Start simple and move when you hit real limitations. Premature optimization of infrastructure is as wasteful as premature code optimization."
  - question: "Should I use serverless or containers?"
    answer: "Serverless for sporadic traffic and simple functions. Containers for consistent traffic, complex apps, or when you need more control. Many apps work fine with either."
last_updated: 2026-07-30
---

{{< quickanswer >}}
Match your workload to the right platform: **Static sites** → Vercel/Netlify. **SSR apps** → Vercel/Render. **APIs with databases** → Railway/Render. **Global low-latency** → Fly.io/Cloudflare. **Background jobs** → Railway/Render workers. **Heavy compute** → dedicated servers or cloud VMs. Start simple, scale when needed.
{{< /quickanswer >}}

## Workload types

Before choosing a platform, identify what you're deploying:

| Workload | Characteristics | Examples |
|----------|-----------------|----------|
| Static site | HTML/CSS/JS files, no server | Blogs, docs, landing pages |
| SPA | Client-side app, API calls | Dashboards, admin panels |
| SSR app | Server-rendered pages | E-commerce, content sites |
| API | HTTP endpoints, database access | REST/GraphQL backends |
| Real-time | WebSockets, persistent connections | Chat, collaboration |
| Background worker | Async processing, queues | Email sending, image processing |
| Scheduled job | Runs on a schedule | Reports, cleanup, syncing |
| ML/AI | GPU compute, model inference | Predictions, generation |

---

## Static sites

**What**: Pre-built HTML, CSS, JavaScript. No server needed.

**Examples**: Documentation, blogs, marketing sites, portfolios.

### Best platforms

| Platform | Why |
|----------|-----|
| **Netlify** | Built for static, great free tier |
| **Vercel** | Fast CDN, preview deploys |
| **Cloudflare Pages** | Unlimited bandwidth free |
| **GitHub Pages** | Free for public repos |

### Decision factors
```
Need forms? → Netlify (built-in) or external service
Need authentication? → Netlify Identity or external
Build time matters? → Cloudflare or Vercel are faster
Budget is zero? → GitHub Pages or Cloudflare Pages
```

### Typical costs
- **Free tier**: Usually sufficient forever
- **Bandwidth**: Free or very cheap (CDN is efficient)

---

## Single-page applications (SPAs)

**What**: Client-rendered apps that call APIs. The "app" runs in the browser.

**Examples**: Admin dashboards, internal tools, complex interactive apps.

### Best platforms

| Platform | Why |
|----------|-----|
| **Vercel** | Easy deploys, good CDN |
| **Netlify** | Similar, good free tier |
| **Cloudflare Pages** | Cheapest at scale |
| **S3 + CloudFront** | Most control, cheapest at massive scale |

### Decision factors
```
Simple app? → Any static host works
Need API routes? → Vercel/Netlify with functions
High traffic? → Cloudflare Pages (free bandwidth)
Enterprise? → S3 + CloudFront for control
```

### What about the API?
SPAs need a backend. Options:
- **Same platform**: Vercel/Netlify functions
- **Separate service**: Railway, Render, Fly.io
- **BaaS**: Supabase, Firebase (database + auth + API)

---

## Server-side rendered apps (SSR)

**What**: Server generates HTML for each request. Better SEO, faster initial load.

**Examples**: E-commerce, content sites, any SEO-critical app.

### Best platforms

| Platform | Why |
|----------|-----|
| **Vercel** | Best Next.js support, edge rendering |
| **Render** | Good for any framework |
| **Railway** | Full-stack with database |
| **Fly.io** | Global edge deployment |

### Decision factors
```
Using Next.js? → Vercel (optimized integration)
Need database? → Railway or Render
Global users? → Fly.io or Vercel Edge
Budget constrained? → Render
```

### Cost considerations
SSR costs more than static—servers run for each request:
- **Serverless**: Pay per request (can spike)
- **Containers**: Predictable monthly cost
- **Edge**: Fast but can be expensive

---

## APIs and backends

**What**: HTTP endpoints serving data. Usually connected to a database.

**Examples**: REST APIs, GraphQL servers, BFF (backend for frontend).

### Best platforms

| Platform | Why |
|----------|-----|
| **Railway** | Database included, simple setup |
| **Render** | Managed Postgres, good pricing |
| **Fly.io** | Global, low latency |
| **AWS App Runner** | Scales to zero, AWS ecosystem |

### Decision factors
```
Need managed database? → Railway or Render
Global latency matters? → Fly.io
Want AWS ecosystem? → App Runner or ECS
Sporadic traffic? → Serverless (Lambda, Cloud Run)
Predictable traffic? → Containers on Railway/Render
```

### Database co-location
Put your API near your database:
- Same platform (Railway API + Railway Postgres)
- Same region (Render Oregon API + Render Oregon DB)
- Latency adds up with every query

---

## Real-time applications

**What**: WebSockets, Server-Sent Events, persistent connections.

**Examples**: Chat apps, collaborative tools, live dashboards, gaming.

### Best platforms

| Platform | Why |
|----------|-----|
| **Fly.io** | Global, excellent for WebSockets |
| **Railway** | Supports WebSockets, simple |
| **Render** | WebSocket support included |
| **Cloudflare Durable Objects** | Edge state, WebSockets |

### Challenges
- Serverless struggles with persistent connections
- Need sticky sessions or connection state management
- Consider dedicated real-time services:

### Managed alternatives
If you don't want to run your own:
- **Pusher**: Real-time messaging
- **Ably**: Pub/sub messaging
- **Supabase Realtime**: Database-driven real-time
- **Liveblocks**: Collaboration features

---

## Background workers

**What**: Async processing outside request/response cycle.

**Examples**: Email sending, image processing, data imports, webhook handling.

### Best platforms

| Platform | Why |
|----------|-----|
| **Railway** | Run workers alongside API |
| **Render** | Background workers built-in |
| **Fly.io** | Machines API for workers |
| **AWS Lambda** | Event-driven processing |

### Decision factors
```
Simple queue processing? → Railway/Render worker
Event-driven (S3 uploads, etc.)? → Lambda
Long-running jobs (hours)? → Containers on Railway
Need job management UI? → Add a queue service
```

### Queue options
Workers often need queues:
- **BullMQ + Redis**: Node.js, self-hosted
- **Celery + Redis**: Python, self-hosted
- **AWS SQS**: Managed, AWS ecosystem
- **Inngest**: Managed job orchestration

---

## Scheduled jobs (cron)

**What**: Tasks that run on a schedule.

**Examples**: Daily reports, database cleanup, sync jobs, backups.

### Best platforms

| Platform | Why |
|----------|-----|
| **Render** | Cron jobs built-in |
| **Railway** | Cron service available |
| **Vercel** | Cron with vercel.json |
| **GitHub Actions** | Free for scheduled tasks |
| **AWS EventBridge + Lambda** | Scalable, managed |

### Decision factors
```
Simple daily task? → GitHub Actions (free)
Part of existing app? → Same platform's cron
Need reliability/monitoring? → Render or Railway
Complex orchestration? → Temporal or Inngest
```

### Cron gotchas
- Timezone handling (use UTC)
- Missed runs (what if it fails?)
- Overlap prevention (locks)
- Monitoring (did it run?)

---

## ML/AI workloads

**What**: Model inference, GPU compute, AI features.

**Examples**: Image generation, LLM APIs, recommendations, predictions.

### Best platforms

| Platform | Why |
|----------|-----|
| **Modal** | GPU serverless, Python-native |
| **Replicate** | Run models via API |
| **Hugging Face** | Model hosting and inference |
| **RunPod** | Cheap GPU servers |
| **AWS SageMaker** | Enterprise ML platform |

### Decision factors
```
Using existing models? → Replicate or HuggingFace
Custom model, occasional use? → Modal
Custom model, heavy use? → RunPod or cloud GPU
Enterprise requirements? → SageMaker
```

### Cost warning
GPU compute is expensive:
- On-demand: $0.50-4/hour per GPU
- Inference: Pay per prediction
- Consider: Do you need real-time, or can you batch?

---

## Workload-to-platform matrix

| Workload | Vercel | Railway | Render | Fly.io | Netlify | AWS |
|----------|--------|---------|--------|--------|---------|-----|
| Static | Great | - | Good | - | Great | Good |
| SPA | Great | - | Good | - | Great | Good |
| SSR | Best | Good | Good | Great | Limited | Good |
| API | Good | Great | Great | Great | Limited | Great |
| Real-time | Limited | Good | Good | Best | No | Good |
| Workers | Limited | Great | Great | Good | Limited | Great |
| Cron | Good | Good | Great | Good | Limited | Great |
| ML/AI | No | No | No | Limited | No | Good |

---

## The "just tell me what to use" guide

### Solo vibecoder, starting out
```
Static site or SPA → Vercel or Netlify (free tier)
Full-stack with DB → Railway ($5-10/mo)
```

### Small team, real users
```
Frontend → Vercel
Backend + DB → Railway or Render
Workers → Same as backend
```

### Growing startup
```
Frontend → Vercel or Cloudflare
Backend → Render or Fly.io
Database → Managed Postgres (Neon, Supabase, RDS)
Workers → Same platform or dedicated queue
```

### Enterprise/scale
```
Everything → AWS, GCP, or Azure
With managed services for each workload
Plus dedicated DevOps team
```

---

## Cost optimization tips

### Start free or cheap
1. Use free tiers while validating
2. Move to paid when you have revenue
3. Optimize when costs hurt

### Reduce hosting costs
| Strategy | How |
|----------|-----|
| CDN caching | Serve static assets from CDN |
| Database connection pooling | Use PgBouncer or similar |
| Right-size instances | Don't over-provision |
| Scale to zero | Serverless for sporadic traffic |
| Caching layer | Redis for frequent queries |

### When to optimize
- Costs exceed 5-10% of revenue
- Bills are unpredictable/spiking
- You're paying for idle capacity

---

## Migration considerations

### Stay portable
- Use Docker for backends
- Standard databases (Postgres, Redis)
- Avoid platform-specific features unless essential
- Infrastructure as code (Terraform, Pulumi)

### Signs you need to migrate
- Hitting platform limits
- Costs growing faster than revenue
- Need features platform doesn't support
- Reliability problems

### Migration is real work
Budget 1-4 weeks for a migration. Include:
- Environment setup
- Data migration
- DNS changes
- Testing
- Rollback plan

---

## The honest take

**Don't overthink it**. Pick a platform that fits your current needs:
- Vercel for frontend-heavy apps
- Railway for full-stack simplicity
- Render for production-ready at reasonable cost

**You can migrate later** if you use standard technologies. The cost of picking "wrong" is usually a few days of work, not catastrophe.

**Platform choice matters less than shipping**. A deployed app on the "wrong" platform beats a perfect architecture that never launches.

## Further reading

- [Deployment platforms compared](/basics/deployment-platforms-compared/): Detailed platform comparison
- [What is serverless?](/basics/what-is-serverless/): Serverless explained
- [Databases compared](/basics/databases-compared/): Choosing your database
- [What is deployment?](/basics/what-is-deployment/): Deployment fundamentals
