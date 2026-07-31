---
title: "Deployment Platforms Compared"
description: "Vercel, Railway, Render, Fly.io, Netlify, Heroku, AWS—where should you deploy? An honest comparison of pricing, features, and when to choose each platform."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, deployment, vercel, railway, render, flyio, netlify, heroku, aws, hosting]
faqs:
  - question: "Which platform is cheapest?"
    answer: "For hobby projects: Vercel, Netlify, and Render have generous free tiers. For production: Railway and Render are often cheapest. AWS can be cheapest at scale but has hidden costs and complexity."
  - question: "Can I change platforms later?"
    answer: "Yes, but it gets harder over time. Containerized apps (Docker) are most portable. Platforms with proprietary features (Vercel edge functions, Netlify functions) create some lock-in."
  - question: "Do I need to understand DevOps?"
    answer: "Not for PaaS platforms like Vercel, Railway, or Render. They handle infrastructure. For AWS/GCP/Azure, you need more knowledge or should use managed services."
last_updated: 2026-07-30
---

{{< quickanswer >}}
**Vercel** is best for Next.js and frontend. **Railway** is the easiest for full-stack with databases. **Render** offers great value for production apps. **Fly.io** excels at edge deployment globally. **Netlify** is perfect for static sites and JAMstack. **Heroku** is simple but expensive now. **AWS** is powerful but complex. For most vibecoders: start with Vercel or Railway.
{{< /quickanswer >}}

## Platform categories

| Category | Examples | Best for |
|----------|----------|----------|
| **Frontend PaaS** | Vercel, Netlify | Static sites, SSR frontends |
| **Full-stack PaaS** | Railway, Render, Heroku | Apps with databases |
| **Edge/Global** | Fly.io, Cloudflare | Low latency worldwide |
| **Cloud providers** | AWS, GCP, Azure | Full control, scale |
| **Container platforms** | DigitalOcean, Linode | Self-managed containers |

---

## Vercel

The Next.js company's platform. Optimized for frontend frameworks.

### What it is
- Frontend-focused deployment platform
- Created by the Next.js team
- Serverless functions and edge runtime
- Git-based deployments

### Pricing (2024)

| Tier | Cost | Limits |
|------|------|--------|
| Hobby | Free | 100GB bandwidth, 100 hours serverless |
| Pro | $20/user/mo | 1TB bandwidth, 1000 hours serverless |
| Enterprise | Custom | Unlimited, SLAs |

### Strengths
- **Next.js integration**: Unmatched, features work automatically
- **Preview deployments**: Every PR gets a URL
- **Edge network**: Fast globally
- **Developer experience**: Git push to deploy
- **Analytics**: Built-in web vitals

### Weaknesses
- **Expensive at scale**: Costs grow quickly
- **Database limitations**: No built-in database (use external)
- **Vendor lock-in**: Some features are Vercel-only
- **Function limits**: 10s timeout on hobby, cold starts
- **Not for backends**: API-only apps don't fit well

### Best for
- Next.js applications
- Frontend projects
- Marketing sites
- Projects needing preview URLs

### Deploy example
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (interactive)
vercel

# Deploy to production
vercel --prod
```

---

## Railway

Modern PaaS for full-stack applications. "Heroku done right."

### What it is
- Full-stack deployment platform
- One-click databases (Postgres, Redis, MySQL)
- Docker-based under the hood
- Usage-based pricing

### Pricing

| Resource | Cost |
|----------|------|
| Compute | $0.000463/vCPU/min |
| Memory | $0.000231/GB/min |
| Storage | $0.25/GB/month |
| Bandwidth | $0.10/GB |
| **Trial** | $5 free credit |
| **Minimum** | ~$5/mo for small app + DB |

### Strengths
- **Full-stack friendly**: Backend + database in one place
- **Simple**: Heroku-like simplicity, modern UX
- **Usage-based**: Pay for what you use
- **Databases**: One-click Postgres, Redis, MySQL, MongoDB
- **Private networking**: Services talk securely

### Weaknesses
- **No free tier**: Trial credits run out
- **Newer platform**: Less battle-tested
- **Scaling limits**: Not for massive scale
- **Edge features**: Limited edge/CDN options

### Best for
- Full-stack applications
- Apps needing databases
- Side projects and startups
- Teams wanting simple DevOps

### Deploy example
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

---

## Render

Heroku alternative with better pricing and modern features.

### What it is
- Unified cloud for apps, databases, cron jobs
- Free tier available
- Managed Postgres and Redis
- Background workers support

### Pricing

| Service | Free tier | Paid |
|---------|-----------|------|
| Static sites | Unlimited | - |
| Web services | 750 hours/mo | From $7/mo |
| Postgres | 90 days | From $7/mo |
| Redis | 25MB | From $7/mo |

### Strengths
- **Free tier**: Generous for static and basic apps
- **Predictable pricing**: Fixed monthly costs
- **Managed databases**: Postgres and Redis included
- **Background workers**: Cron jobs and queues
- **Blueprint files**: Infrastructure as code

### Weaknesses
- **Cold starts**: Free tier spins down
- **Slower deployments**: Not as fast as Vercel
- **Limited regions**: Fewer than Fly.io
- **No edge runtime**: Traditional server model

### Best for
- Production apps on a budget
- Teams migrating from Heroku
- Apps needing managed databases
- Background job processing

### Deploy example
```yaml
# render.yaml (Blueprint)
services:
  - type: web
    name: my-app
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: my-db
          property: connectionString

databases:
  - name: my-db
    plan: free
```

---

## Fly.io

Edge deployment platform. Run apps close to users globally.

### What it is
- Run Docker containers on edge servers
- Global deployment by default
- Built-in Postgres (LiteFS, distributed SQLite)
- Machines API for fine control

### Pricing

| Resource | Cost |
|----------|------|
| Shared CPU | From $1.94/mo |
| Dedicated CPU | From $31/mo |
| Memory | $0.00000193/MB/s |
| Storage | $0.15/GB/mo |
| Bandwidth | $0.02/GB (after free) |
| **Free allowance** | 3 shared VMs, 3GB storage |

### Strengths
- **Global by default**: Apps run worldwide
- **Low latency**: Edge servers near users
- **Docker native**: Run any container
- **Fine control**: Machines API for custom scaling
- **Distributed databases**: LiteFS for SQLite replication

### Weaknesses
- **Learning curve**: More concepts to understand
- **CLI-focused**: Less GUI than competitors
- **Complexity**: More control means more decisions
- **Debugging**: Distributed systems are harder

### Best for
- Global applications
- Real-time features (chat, games)
- Low-latency requirements
- Teams comfortable with Docker

### Deploy example
```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Login
fly auth login

# Create app
fly launch

# Deploy
fly deploy
```

---

## Netlify

The original JAMstack platform. Static sites and serverless functions.

### What it is
- Static site hosting with serverless functions
- Git-based continuous deployment
- Forms and identity built-in
- Edge functions

### Pricing

| Tier | Cost | Limits |
|------|------|--------|
| Free | $0 | 100GB bandwidth, 300 build min |
| Pro | $19/user/mo | 1TB bandwidth, 1000 build min |
| Business | $99/user/mo | More features, support |

### Strengths
- **Static sites**: Perfect for marketing, docs, blogs
- **Deploy previews**: Every PR gets a URL
- **Forms**: Built-in form handling
- **Identity**: Simple authentication
- **Split testing**: A/B test deployments

### Weaknesses
- **Not for backends**: Functions are limited
- **Build times**: Can be slow for large sites
- **Database**: No built-in database
- **Function limits**: 10s timeout, cold starts

### Best for
- Static sites and blogs
- Marketing websites
- Documentation sites
- JAMstack applications

### Deploy example
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

---

## Heroku

The original PaaS. Simple but expensive now.

### What it is
- Pioneer of platform-as-a-service
- Salesforce-owned
- Add-ons marketplace
- Deprecated free tier (ended 2022)

### Pricing

| Dyno | Cost | RAM |
|------|------|-----|
| Eco | $5/mo | 512MB, sleeps |
| Basic | $7/mo | 512MB |
| Standard | $25-50/mo | 512MB-1GB |
| Performance | $250-500/mo | 2.5-14GB |

### Strengths
- **Simplicity**: Very easy to use
- **Add-ons**: Huge marketplace
- **Mature**: Well-documented, stable
- **Pipelines**: Good CI/CD workflow

### Weaknesses
- **Expensive**: Much pricier than alternatives
- **No free tier**: Minimum $5/mo for anything
- **Slow innovation**: Platform feels dated
- **Cold starts**: Eco dynos sleep

### Best for
- Teams already using Heroku
- Needing specific add-ons
- Enterprise with Salesforce relationship
- Simple apps where cost doesn't matter

---

## AWS (and cloud providers)

The everything platform. Maximum power, maximum complexity.

### What it is
- Amazon's cloud platform
- Hundreds of services
- Global infrastructure
- Pay-as-you-go pricing

### Relevant services

| Service | What it does | Complexity |
|---------|--------------|------------|
| **Amplify** | Frontend hosting | Low |
| **App Runner** | Container PaaS | Low |
| **Elastic Beanstalk** | Traditional PaaS | Medium |
| **ECS/Fargate** | Container orchestration | High |
| **Lambda** | Serverless functions | Medium |
| **EC2** | Virtual machines | High |

### Strengths
- **Everything**: Any service you need exists
- **Scale**: Handles any traffic
- **Mature**: Battle-tested at massive scale
- **Compliance**: Certifications for any industry
- **Cost at scale**: Can be cheapest for large apps

### Weaknesses
- **Complexity**: Overwhelming number of options
- **Learning curve**: Steep, requires expertise
- **Hidden costs**: Data transfer, requests add up
- **Configuration**: Lots of setup required
- **Overkill**: Too much for small projects

### Best for
- Large-scale applications
- Enterprise requirements
- Specific compliance needs
- Teams with DevOps expertise
- Cost optimization at scale

### Simpler AWS options
If you want AWS without the complexity:
- **AWS Amplify**: Vercel-like frontend hosting
- **AWS App Runner**: Railway-like container hosting
- **AWS Lightsail**: Simple VPS hosting

---

## Quick comparison

| Platform | Free tier | Min paid | Best for | Complexity |
|----------|-----------|----------|----------|------------|
| Vercel | Yes | $20/user | Next.js, frontend | Low |
| Railway | $5 credit | ~$5/mo | Full-stack | Low |
| Render | Yes | $7/mo | Production apps | Low |
| Fly.io | Yes | ~$2/mo | Global apps | Medium |
| Netlify | Yes | $19/user | Static sites | Low |
| Heroku | No | $5/mo | Legacy, add-ons | Low |
| AWS | Yes (limited) | Varies | Everything | High |

## Cost comparison (example app)

Small app: API + Postgres + Redis

| Platform | Estimated monthly |
|----------|-------------------|
| Railway | $10-20 |
| Render | $21+ ($7 x 3 services) |
| Fly.io | $10-15 |
| Heroku | $35+ |
| AWS (App Runner + RDS) | $25-50 |

*Costs vary significantly based on usage, regions, and specific requirements.*

## Decision flowchart

```
Building with Next.js?
  → Vercel
  
Static site or JAMstack?
  → Netlify or Vercel
  
Need database included?
  → Railway or Render
  
Global low-latency critical?
  → Fly.io
  
Enterprise/compliance needs?
  → AWS or GCP
  
Want cheapest production hosting?
  → Render or Railway
  
Already on Heroku?
  → Stay or migrate to Render
  
Just starting out?
  → Vercel (frontend) or Railway (full-stack)
```

## Migration difficulty

| From | To | Difficulty |
|------|----|------------|
| Any | Vercel | Easy (if frontend) |
| Heroku | Railway | Easy |
| Heroku | Render | Easy |
| Vercel | Others | Medium (if using Vercel features) |
| AWS | PaaS | Easy-Medium |
| PaaS | AWS | Hard |

## The honest take

**For most vibecoders**:
- **Frontend only**: Vercel or Netlify
- **Full-stack**: Railway or Render
- **Need to be cheap**: Render free tier or Fly.io

**Don't start with AWS** unless you have specific requirements. PaaS platforms are simpler and often cheaper for small-medium apps.

**Pricing changes**: Platforms adjust pricing frequently. Always check current rates before committing.

**Vendor lock-in is real**: Use Docker and standard databases to stay portable. Avoid platform-specific features unless the value is clear.

## Further reading

- [Choosing where to deploy](/basics/choosing-where-to-deploy/): Matching workloads to platforms
- [What is deployment?](/basics/what-is-deployment/): Deployment fundamentals
- [What is hosting?](/basics/what-is-hosting/): Hosting basics
- [Databases compared](/basics/databases-compared/): Choosing your database
