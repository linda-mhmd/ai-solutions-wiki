---
title: "What is Hosting?"
description: "Hosting is where your code actually runs when people visit your site. Your laptop is not a server. You need somewhere on the internet to put your app."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, hosting, deployment, servers, cloud]
faqs:
  - question: "Can I host my app for free?"
    answer: "Yes, for small projects. Vercel, Netlify, and Cloudflare Pages have generous free tiers for static sites and serverless functions. Railway and Render have limited free tiers. Once you get real traffic or need databases, you'll start paying."
  - question: "What's the difference between Vercel and AWS?"
    answer: "Vercel is like a car with automatic transmission—it handles everything for you. AWS is like building a car from parts—maximum control, maximum complexity. For most vibecoders, start with Vercel/Netlify/Railway. Move to AWS when you have a specific reason."
  - question: "Do I need my own server?"
    answer: "Probably not. Running your own server means you're responsible for security updates, scaling, backups, and uptime. Platforms like Vercel handle all of that. Only get your own server when you have requirements those platforms can't meet."
last_updated: 2026-07-30
---

{{< quickanswer >}}
Hosting is renting computer power on the internet to run your website or app. Your code needs to live somewhere that's always on and accessible to anyone with the URL. Your laptop at home doesn't count—it's not always on, it's behind your home network, and it's not built to handle many visitors.
{{< /quickanswer >}}

## Why you can't just use your laptop

When you run `npm run dev` on your computer, you can see your app at `localhost:3000`. But:

1. **Only you can access it** - localhost means "this computer"
2. **It stops when you close your laptop** - no sleep mode allowed
3. **Your home network blocks incoming traffic** - your router won't let strangers in
4. **It can't handle load** - your laptop will melt if 10,000 people visit

You need a computer that:
- Has a public IP address anyone can reach
- Runs 24/7 without sleeping
- Has fast internet that can handle many connections
- Is built for this job

That's a server. And hosting is renting access to servers.

## The hosting landscape (simplified)

### Tier 1: Deploy in 30 seconds (start here)

These platforms take your code and handle everything else:

| Platform | Best for | Free tier |
|---|---|---|
| **Vercel** | Next.js, React, frontend | Generous |
| **Netlify** | Static sites, Jamstack | Generous |
| **Cloudflare Pages** | Static sites, global speed | Generous |
| **Railway** | Full-stack, databases | Limited |
| **Render** | Full-stack, databases | Limited |

How it works: Connect your GitHub repo. Push code. They build and deploy automatically. Done.

### Tier 2: More control, more complexity

| Platform | What you get |
|---|---|
| **DigitalOcean** | Virtual servers you manage yourself |
| **Fly.io** | Containers that run globally |
| **Heroku** | App platform, but getting expensive |

### Tier 3: Maximum power, maximum complexity

| Platform | When you need it |
|---|---|
| **AWS** | Enterprise scale, specific services |
| **Google Cloud** | Same, Google ecosystem |
| **Azure** | Same, Microsoft ecosystem |

Most vibecoders never need Tier 3. Start with Tier 1. Graduate when you hit limits.

## What "serverless" actually means

You'll hear "serverless" a lot. It doesn't mean no servers—it means you don't manage them.

**Traditional hosting**: You rent a server that runs 24/7. You pay even when nobody's using it.

**Serverless**: Your code only runs when someone makes a request. You pay per execution. When nobody's visiting, you pay nothing.

Vercel, Netlify, and Cloudflare Workers are serverless. Your functions wake up when needed and go to sleep after.

Serverless trade-offs:
- ✅ Scales automatically
- ✅ Pay only for what you use
- ✅ No server maintenance
- ❌ Cold starts (first request can be slow)
- ❌ Execution time limits (can't run forever)
- ❌ Some things are harder (websockets, long processes)

## The cost reality

**Free tier gets you far**: A personal project or early startup can run on Vercel's free tier indefinitely.

**Databases cost money**: The app itself might be free, but a PostgreSQL database starts at $5-15/month.

**AI APIs add up**: Your hosting might be $0, but Claude/OpenAI calls are the real expense. See [What is a token?](/basics/what-is-a-token/)

**Scale costs scale**: Traffic, storage, and compute all increase with success. A viral launch can blow through free tiers in hours.

Typical monthly costs for a small SaaS:
- Hosting (Vercel/Railway): $0-20
- Database: $5-25
- AI API: $10-500 (varies wildly)
- Domain: $1 (yearly cost / 12)
- Total: $15-550/month

## How to choose

**Just starting? Use Vercel or Netlify.**
- Connect GitHub, push code, it deploys
- Free tier is plenty for learning
- Automatic HTTPS, preview deployments, the works

**Need a database too? Add Railway or Supabase.**
- Railway gives you Postgres alongside your app
- Supabase is Postgres + auth + storage in one

**Outgrowing free tiers? Stay on the same platform, pay.**
- Vercel Pro, Railway paid tier, etc.
- Migration is painful—avoid it if you can

**Specific requirements? Then research.**
- Need GPU? Look at Modal, Replicate, Banana
- Need to run in EU only? Check data residency options
- Need persistent websockets? Fly.io or traditional servers

## What hosting actually does

When someone visits `myapp.com`:

1. DNS translates the domain to an IP address
2. The request reaches your hosting provider's servers
3. Your code runs (or wakes up if serverless)
4. A response goes back to the visitor's browser

The hosting provider handles:
- Running your code
- Routing requests to the right place
- SSL certificates (HTTPS)
- Scaling up when traffic spikes
- Keeping things running when hardware fails

That's a lot of complexity you don't have to think about.

## Further reading

- [What is localhost?](/basics/what-is-localhost/): Where you test before deploying
- [What is a domain name?](/basics/what-is-a-domain-name/): The address that points to your hosting
- [What is deployment?](/basics/what-is-deployment/): The process of getting code to your host
- [What is the cloud?](/basics/what-is-the-cloud/): The infrastructure underneath all of this
