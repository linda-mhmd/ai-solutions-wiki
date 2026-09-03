---
title: "What is the Cloud?"
description: "The cloud is other people's computers, rented by the second. Here is what that actually means for building software and why it changed everything."
date: 2026-05-24
level: 3
categories: [Basics]
tags: [beginner, cloud, aws, infrastructure, deployment]
youtube_id: "M988_fsOSWo"
youtube_title: "Cloud Computing In 6 Minutes"
youtube_channel: "Simplilearn"
docs: "https://aws.amazon.com/what-is-cloud-computing/"
docs_label: "What is Cloud Computing?, AWS"
faqs:
  - question: "What is the difference between cloud, hosting, and serverless?"
    answer: "Traditional hosting: you rent a fixed server, pay monthly, manage it yourself. Cloud: you rent computing resources on demand, pay for what you use, the provider manages the hardware. Serverless: you deploy code without thinking about servers at all, the cloud platform handles everything including scaling. They are three levels on a spectrum from more control to less control, and from more responsibility to less. For most beginners, serverless platforms like Vercel or Railway are the right starting point."
  - question: "What does IaaS, PaaS, and SaaS mean?"
    answer: "These describe how much the cloud provider manages. IaaS (Infrastructure as a Service): you rent raw computing resources, VMs, storage, networking. You manage the OS, runtime, and app. Example: AWS EC2. PaaS (Platform as a Service): you deploy code; the provider manages servers, OS, scaling. Example: Heroku, Railway, Render. SaaS (Software as a Service): you use finished software through a browser. Example: Salesforce, Notion, GitHub. As you move from IaaS to SaaS, you control less but manage less."
  - question: "What is GDPR and why does my server location matter?"
    answer: "GDPR (General Data Protection Regulation) is EU law governing personal data. If you collect or process personal data about people in the EU (names, emails, location, usage data), you have legal obligations around how it is stored and processed. Storing EU user data on servers in the US without appropriate safeguards can be a violation. Most cloud providers offer EU-based regions (AWS eu-west, GCP europe-west). For apps serving EU users, run them in EU regions. This is not optional if you are serious about compliance."
last_updated: 2026-09-03
---

{{< quickanswer >}}
"The cloud" means computing resources, servers, storage, databases, networking, that you rent over the internet instead of owning yourself. You pay for what you use, scale up or down instantly, and never need to buy hardware. The joke that "the cloud is just someone else's computer" is true. It is just very well-managed, very reliable someone else's computers.
{{< /quickanswer >}}

<figure class="bz-figure">
  <img src="/img/dark-cherry/grid-foundation.png" alt="A dark concrete floor with deep red neon seams tracing a precise grid: infrastructure laid down before anything visible is built on top." loading="lazy">
  <figcaption>The cloud is infrastructure you rent instead of own. The grid is already there. You build on top of it. When you are done, you stop paying. The grid remains for the next tenant.</figcaption>
</figure>

## Why the cloud changed everything

Before cloud computing (roughly pre-2006), running a web app required:
- Buying physical servers (thousands to tens of thousands of euros)
- Renting space in a data centre (colocated hosting)
- Managing hardware: replacing failed disks, maintaining cooling
- Guessing the right capacity upfront, too little and your site crashes under load; too much and you waste money

Amazon Web Services launched in 2006. [More: History of cloud computing, Wikipedia](https://en.wikipedia.org/wiki/Cloud_computing#History)

The cloud eliminated all of this. You rent computing capacity by the hour or second. If your app goes viral and needs 100x more capacity, you provision it in minutes. If you shut down the project, you turn off the resources and stop paying. No hardware, no long-term contracts, no upfront capital cost.

## The three major cloud providers

**AWS (Amazon Web Services)**, launched 2006, largest market share (~33%), broadest range of services (200+). The default choice if you have no strong reason to pick otherwise.

**Microsoft Azure**, strong in enterprise (especially Microsoft ecosystem: Active Directory, .NET, Windows Server). Second-largest provider.

**Google Cloud Platform (GCP)**, strong in AI/ML, big data (BigQuery), and Kubernetes (they created it). Growing market share.

All three offer similar core capabilities. The choice typically comes down to what your team knows, what tools you are using, or compliance requirements. Free tiers on all three let you experiment at no cost.

## IaaS, PaaS, and SaaS, the cloud service model

The cloud is not one thing. It is a spectrum of how much the provider manages:

**IaaS (Infrastructure as a Service)**, you rent raw resources: virtual machines, storage, networking. You manage the operating system, runtime, security updates, and application. Maximum control, maximum responsibility. Example: AWS EC2, Google Compute Engine, DigitalOcean Droplets.

**PaaS (Platform as a Service)**, you deploy code; the provider manages the underlying infrastructure, OS, and runtime. You focus on your application. Less control, far less management overhead. Example: Heroku, Railway, Render, Google App Engine.

**SaaS (Software as a Service)**, you use finished software through a browser. No infrastructure to manage. Example: GitHub, Notion, Salesforce, Google Workspace.

For building your first app: **PaaS is the right starting point**. Push code from GitHub, the platform deploys it. No server management.

## What cloud services actually include

"The cloud" covers thousands of individual services. The most commonly used categories:

| Category | What it provides | Examples |
|---|---|---|
| **Compute** | Run code (VMs, containers, functions) | EC2, Lambda, Cloud Run |
| **Storage** | Store files and large binary data | S3, GCS, Cloudflare R2 |
| **Databases** | Managed relational and NoSQL databases | RDS (PostgreSQL), DynamoDB, Firestore |
| **Networking** | Load balancers, CDNs, DNS, firewalls | CloudFront, Cloud CDN |
| **AI/ML** | Pre-trained models, GPU instances, AI APIs | Bedrock, Vertex AI (rebranded [Gemini Enterprise Agent Platform](/tools/google-vertex-ai/) in April 2026) |
| **Security** | Identity management, secrets, certificates | IAM, KMS, Certificate Manager |
| **Monitoring** | Logs, metrics, alerts | CloudWatch, Cloud Logging |
| **Email/SMS** | Transactional messaging | SES, Twilio (not strictly cloud but partner) |

A simple web app typically uses compute (to run the code) + storage (for files) + a managed database. You do not need to understand everything.

## CDN: making your app fast for everyone

A **CDN (Content Delivery Network)** stores copies of your static assets (images, CSS, JavaScript, videos) on servers distributed around the world. When a user in Tokyo requests a file from a server in Frankfurt, it is slow. When they request it from a CDN edge server in Tokyo, it is fast.

CDNs like [Cloudflare](https://www.cloudflare.com/), AWS CloudFront, and Fastly are used by virtually every production website. They also provide DDoS protection and reduce the load on your origin server. [More: What is a CDN?, Cloudflare](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/)

## Regions and availability zones, where data lives

Cloud providers split their infrastructure into **regions** (geographic areas) and **availability zones** (separate data centres within a region). Examples:
- `eu-west-1` = AWS Ireland
- `europe-west1` = GCP Belgium
- `us-east-1` = AWS Northern Virginia

This matters for two reasons:

1. **Latency**, running your app in the same region as your users makes it faster. A server in Ireland is faster for European users than one in Virginia.
2. **Data sovereignty**, GDPR and similar regulations may require that data about EU residents stays in EU-based servers. Choose your region accordingly.

**Multi-region** deployment (running in multiple regions simultaneously) makes your app resilient to a single data centre failure and reduces latency globally. Most production apps start in one region and expand later.

## Cloud costs, what to expect

Cloud billing is based on usage. Common cost drivers:
- Compute: per vCPU per hour and GB RAM per hour
- Storage: per GB per month
- Data transfer: usually free to receive (ingress), charged to send (egress)
- Database: instance size per hour plus storage

For a prototype or small app: **free tiers cover most of what you need**. AWS Free Tier, GCP Free Tier, and Azure Free Account all provide 12 months of meaningful free resources for new accounts.

For production apps: start small and monitor. Tools like [Infracost](https://www.infracost.io/) estimate costs from your infrastructure code before you deploy.

## Recommended starting points

| You want to... | Use |
|---|---|
| Deploy a React/Next.js app | [Vercel](https://vercel.com/), push to GitHub, deployed instantly |
| Deploy any backend service | [Railway](https://railway.app/) or [Render](https://render.com/) |
| Store files and images | [Cloudflare R2](https://developers.cloudflare.com/r2/) or [AWS S3](https://aws.amazon.com/s3/) |
| Managed PostgreSQL | [Supabase](https://supabase.com/) or [Neon](https://neon.tech/) |
| Learn proper cloud (AWS) | [AWS Free Tier](https://aws.amazon.com/free/) |

## Further reading

- [What is cloud computing?, AWS](https://aws.amazon.com/what-is-cloud-computing/)
- [Cloudflare Learning Center](https://www.cloudflare.com/learning/), excellent free articles on CDNs, networking, security
- [Google Cloud skills boost (free)](https://cloudskillsboost.google/), hands-on labs
- [AWS Skill Builder (free tier)](https://skillbuilder.aws/), structured AWS learning paths
- [The Twelve-Factor App](https://12factor.net/), methodology for cloud-native application design
- [ByteByteGo on YouTube](https://www.youtube.com/@ByteByteGo), system design and infrastructure diagrams

## What's next

Next: [What is an API?](/basics/what-is-an-api/), how different pieces of software talk to each other, and how your app connects to external services.
