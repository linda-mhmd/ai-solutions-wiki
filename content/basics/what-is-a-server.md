---
title: "What is a Server?"
description: "A server is just a computer that runs continuously and waits for requests. When you load a website, a server somewhere in the world responds."
date: 2026-05-24
level: 3
categories: [Basics]
tags: [beginner, server, infrastructure, backend, hosting]
youtube_id: "VXmvM2QtuMU"
youtube_title: "What is a Server? Servers vs Desktops Explained"
youtube_channel: "PowerCert Animated Videos"
docs: "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_web_server"
docs_label: "What is a web server?, MDN"
faqs:
  - question: "What is the difference between a web server and an application server?"
    answer: "A web server serves static files, HTML, CSS, images, JavaScript. It handles HTTP requests and returns files. nginx and Apache are web servers. An application server runs your application's business logic, it processes requests, queries databases, applies rules, and generates responses dynamically. In practice, many deployments use nginx as a reverse proxy in front of a Node.js, Python, or Go application server. The two often run on the same machine."
  - question: "What is serverless?"
    answer: "Serverless means you run code without managing server infrastructure. You write a function, deploy it to a provider (AWS Lambda, Cloudflare Workers, Vercel Functions), and the provider handles everything: starting, stopping, scaling, and billing per execution. You do not pay for idle time. Serverless is not literally without servers, there are still servers, but you never think about them. It is excellent for event-driven tasks and APIs with variable traffic."
  - question: "What is a container, and how is it different from a virtual machine?"
    answer: "A virtual machine (VM) emulates a complete computer with its own OS, heavy, slow to start, isolated. A container shares the host OS kernel but packages an application with its dependencies in an isolated process, lightweight, starts in seconds, portable. Docker is the most common container tool. Running a containerised app on any server with Docker installed behaves identically, regardless of what else is on that server. This solved 'it works on my machine' problems."
last_updated: 2026-05-30
---

{{< quickanswer >}}
A server is a computer, physically similar to your laptop, that is kept on 24/7, connected to the internet, and configured to respond to requests. When you visit a website, your browser sends a request to a server, which processes it and sends back a response. Every web app you use runs on servers.
{{< /quickanswer >}}

## The client-server model

Every interaction on the web is a conversation:

1. **Client** (your browser, phone, or app) sends a **request**: "Give me the homepage of example.com"
2. **Server** receives the request, processes it, and sends a **response**: the HTML of the homepage
3. **Client** receives and displays the result

This request-response pattern underpins everything: loading a web page, calling an API, sending a form, streaming a video. The details vary; the model is always the same. [More: Client-server model, MDN](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works)

## What makes a server different from your laptop?

Physically, almost nothing. A server is a computer with a CPU, RAM, and storage. What differs:

- **Always on**, servers run 24/7. A web app cannot go offline at night.
- **No screen**, servers are managed remotely via the terminal (SSH), not by sitting in front of them.
- **Optimised for throughput**, servers handle thousands of simultaneous connections; your laptop handles one.
- **Located in data centres**, dedicated buildings with backup power, cooling, redundant internet connections, and physical security.
- **Accessible by IP address**, anyone with the right credentials can connect from anywhere in the world.

A laptop could technically be a server. In fact, your computer is a server when you run `npm run dev`, it listens on port 3000 and responds to requests from your own browser.

## Types of servers

| Type | Role | Examples |
|---|---|---|
| **Web server** | Serves static files over HTTP | nginx, Apache |
| **Application server** | Runs backend code, processes requests | Node.js, Python (Gunicorn), Go |
| **Database server** | Stores and retrieves structured data | PostgreSQL, MySQL, Redis |
| **File/object storage server** | Stores and serves files, images, videos | S3, Cloudflare R2, MinIO |
| **Email server** | Sends and receives email | Postfix, SendGrid |
| **Cache server** | Stores frequently accessed data in memory | Redis, Memcached |
| **Reverse proxy** | Sits in front of other servers, routes and load-balances | nginx, Cloudflare |

In practice, one physical machine often runs several of these simultaneously. A small startup might run their entire stack on a single server. A large company might have hundreds of servers for each role.

## Containers: solving "it works on my machine"

A classic problem: code works on your laptop but fails when deployed to the server. Different operating systems, different library versions, different configurations.

**Docker** solved this. You define your application and its dependencies in a `Dockerfile`. Docker packages everything into a **container**, a portable unit that runs identically on any machine with Docker installed. [More: Docker getting started](https://docs.docker.com/get-started/)

```dockerfile
FROM python:3.12
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

This container will run exactly the same on your laptop, on AWS, on Google Cloud, or in any data centre. No "works on my machine" anymore.

**Kubernetes** orchestrates containers at scale, deciding which server runs which containers, restarting failed containers, scaling up under load. Most large deployments use it. [More: Kubernetes](https://kubernetes.io/docs/concepts/overview/)

## Serverless: code without infrastructure

**Serverless** platforms (AWS Lambda, Cloudflare Workers, Vercel Functions, Netlify Functions) let you deploy individual functions rather than whole applications. You write a function, push it, and the platform:

- Runs it on request
- Scales automatically from zero to millions of executions
- Bills you per invocation, not per hour

For a simple API endpoint or a webhook handler, serverless is often the simplest and cheapest option. For long-running processes or stateful applications, it is less suitable.

## Where to host your first project

| Platform | What it is | Best for |
|---|---|---|
| **Vercel** | Serverless deployment with Git integration | Next.js, React apps, APIs |
| **Railway** | Simple container hosting | Any backend, databases |
| **Render** | PaaS with free tier | APIs, web services, cron jobs |
| **Fly.io** | Container deployment close to users | Low-latency global apps |
| **AWS / GCP / Azure** | Full cloud platforms | Production apps, complex infrastructure |
| **DigitalOcean** | VPS and managed services | More control than PaaS, less than raw AWS |

For a prototype or demo: start with Vercel, Railway, or Render. You push code from GitHub and it deploys in minutes. No server management required.

## The request lifecycle

What actually happens when someone visits your web app:

1. Browser resolves the domain to an IP address via DNS
2. TCP connection established with the server
3. Browser sends HTTP request
4. nginx (or another reverse proxy) receives it, passes to your app server
5. Your app server runs your code: reads the request, queries the database, applies logic
6. Database server returns data
7. App server formats the response (JSON, HTML)
8. nginx sends the response back to the browser
9. Browser renders the result

This happens in under 100ms for well-optimised apps.

<div class="bz-diagram">
<div class="bz-diagram-label">Request lifecycle: browser to database and back</div>
<div class="bz-diagram-body">
<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Client</span>
    <span class="bz-flow-step-name">Browser</span>
    <span class="bz-flow-step-desc">Sends HTTP GET to the domain. DNS resolves it to an IP.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Edge / Proxy</span>
    <span class="bz-flow-step-name">nginx / CDN</span>
    <span class="bz-flow-step-desc">Terminates TLS, serves static files, routes dynamic requests to the app.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">App server</span>
    <span class="bz-flow-step-name">Your code</span>
    <span class="bz-flow-step-desc">Processes request, applies business logic, queries database.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Data layer</span>
    <span class="bz-flow-step-name">DB + Cache</span>
    <span class="bz-flow-step-desc">PostgreSQL for persistent data; Redis serves cached results in microseconds.</span>
  </div>
</div>
</div>
</div>

<figure class="bz-figure">
<img src="/img/dark-cherry/grid-foundation.png" alt="A dark industrial floor with red neon grid seams laid in precise layers: infrastructure built in sections, each zone isolated and addressable." loading="lazy">
<figcaption>A production server stack. Each layer handles a specific concern: edge caching, load distribution, application logic, data persistence. This is what deploying to the cloud actually means. The grid is already there. You configure how traffic moves through it.</figcaption>
</figure>

## Further reading

- [What is a web server?, MDN](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_web_server)
- [DigitalOcean Tutorials](https://www.digitalocean.com/community/tutorials), some of the best practical server administration guides on the internet, free
- [Docker getting started](https://docs.docker.com/get-started/), official guide, good for understanding containers from scratch
- [How nginx works, nginx beginner's guide](https://nginx.org/en/docs/beginners_guide.html)
- [The Twelve-Factor App](https://12factor.net/), methodology for building deployable, maintainable web apps
- [ByteByteGo on YouTube](https://www.youtube.com/@ByteByteGo), system design and infrastructure explained with excellent diagrams

## What's next

Next: [What is the Cloud?](/basics/what-is-the-cloud/), what "the cloud" actually means and why everyone moved there.
