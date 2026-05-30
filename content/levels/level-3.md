---
title: "Level 3: The Infrastructure"
description: "Databases, servers, APIs, and the cloud. Where software runs, how it stores data, and how systems communicate with each other."
date: 2026-05-29
level_num: 3
tags: ["intermediate", "infrastructure", "databases", "cloud", "api"]
last_updated: 2026-05-30
---

<figure class="bz-figure">
  <img src="/img/dark-cherry/architect-system.png" alt="A silhouette of a person facing a massive red-lit industrial tower: one human comprehending a system far larger than themselves, understanding its architecture from the outside." loading="lazy">
  <figcaption>An architecture diagram is a map. Level 3 gives you the vocabulary to read every component on it and understand why each one exists and what happens if it fails.</figcaption>
</figure>

<span class="bz-section-label">Level 3 of 4</span>

## Where software actually runs

Code does not float in the cloud. It runs on specific machines, reads and writes to specific databases, responds to specific requests, and communicates with other systems through defined contracts called APIs. Level 3 makes all of that concrete.

This is the level where architecture diagrams stop being walls of boxes and start being readable maps. Four articles. Each covers one foundational infrastructure concept. Together they give you the vocabulary to read a technical architecture document, participate in infrastructure conversations, and make informed build versus buy decisions.

---

## What you know after Level 3

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Storage</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Relational databases</span>
      <span class="bz-arch-chip">NoSQL</span>
      <span class="bz-arch-chip">SQL queries</span>
      <span class="bz-arch-chip">Schemas</span>
      <span class="bz-arch-chip-note">How applications store structured data permanently; why you choose Postgres over MongoDB or vice versa</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Compute</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Web servers</span>
      <span class="bz-arch-chip">Application servers</span>
      <span class="bz-arch-chip">Request/response cycle</span>
      <span class="bz-arch-chip-note">What a server does: listens for requests, executes code, returns responses. The unit of compute in production</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Cloud</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">AWS / GCP / Azure</span>
      <span class="bz-arch-chip">Managed services</span>
      <span class="bz-arch-chip">Regions</span>
      <span class="bz-arch-chip">Pricing models</span>
      <span class="bz-arch-chip-note">Infrastructure you rent by the hour or second, globally distributed, with no physical hardware to manage</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">APIs</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">REST</span>
      <span class="bz-arch-chip">HTTP methods</span>
      <span class="bz-arch-chip">JSON</span>
      <span class="bz-arch-chip">Authentication</span>
      <span class="bz-arch-chip-note">Defined contracts between systems. How your frontend talks to your backend and how your product talks to third-party services</span>
    </div>
  </div>
</div>

---

## Learning path

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Start here</span>
    <span class="bz-flow-step-name">Data storage</span>
    <span class="bz-flow-step-desc">What a database is, why tables exist, and how SQL retrieves exactly the data a request needs.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Layer 2</span>
    <span class="bz-flow-step-name">Server infrastructure</span>
    <span class="bz-flow-step-desc">What a server is, what the request/response cycle looks like, and how application servers handle load.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Layer 3</span>
    <span class="bz-flow-step-name">Cloud deployment</span>
    <span class="bz-flow-step-desc">How infrastructure is rented instead of owned, what managed services handle automatically, and how regions affect latency.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Layer 4</span>
    <span class="bz-flow-step-name">API design</span>
    <span class="bz-flow-step-desc">How systems communicate through defined contracts. REST, JSON, HTTP methods, and authentication patterns.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Ready</span>
    <span class="bz-flow-step-name">Level 4</span>
    <span class="bz-flow-step-desc">You can read an architecture diagram. Level 4 places AI systems on top of this infrastructure.</span>
  </div>
</div>

---

## Before and after

| | Before Level 3 | After Level 3 |
|---|---|---|
| **Architecture diagrams** | A wall of boxes with arrows connecting them | A readable map: each box has a role; each arrow is an API call or database query |
| **"The database is slow"** | A problem for engineers | A diagnosable category: slow query, missing index, connection pool exhaustion, or schema design issue |
| **Cloud bills** | A large number broken into lines you ignore | EC2 is compute; RDS is managed database; S3 is object storage; data transfer is network egress |
| **APIs** | "The system connects to Stripe somehow" | Stripe exposes an HTTP API; your backend calls it with your API key; the response is JSON your code parses |
| **Server vs serverless** | Marketing terms | A server runs continuously; serverless executes per request and scales to zero when idle |
| **Data residency** | A compliance requirement you forward to legal | Choosing an AWS region determines where data physically sits, which determines which regulations apply |

---

## Articles in this level

### [What is a Database?](/basics/what-is-a-database/)

Structured storage with a query language. Covers relational databases (tables, rows, columns, foreign keys), SQL as a query language, NoSQL alternatives, and why different data shapes call for different storage solutions. Includes a comparison of PostgreSQL, MySQL, MongoDB, and Redis by use case.

**You should read this if:** You know that applications "connect to a database" but could not explain what a table is, why a join exists, or why a developer might choose PostgreSQL over MongoDB for a specific feature.

### [What is a Server?](/basics/what-is-a-server/)

The machine that responds to requests. Covers the request/response cycle, what web servers and application servers do, how load balancers distribute traffic, and what "scaling" means at the server level: vertical (bigger machine) versus horizontal (more machines). Includes the full lifecycle of an HTTP request from browser to database and back.

**You should read this if:** You use phrases like "the server is down" without knowing what a server does in the first place, or you want to understand why adding more users makes a system slower in specific, predictable ways.

### [What is the Cloud?](/basics/what-is-the-cloud/)

Infrastructure you rent instead of own. Covers the major cloud providers (AWS, Google Cloud, Azure), what managed services are and why they exist, how regions and availability zones work, and how cloud pricing models (on-demand, reserved, spot) affect product economics. Explains why "migrating to the cloud" is not the same as moving files to a server.

**You should read this if:** You make decisions that involve cloud costs, regional expansion, or vendor selection and want to read a cloud architecture review without an engineering interpreter.

### [What is an API?](/basics/what-is-an-api/)

The contract between communicating systems. Covers REST, HTTP methods (GET, POST, PUT, DELETE), JSON as the standard data format, API authentication (API keys, OAuth, JWTs), and rate limiting. Explains what "breaking change" means, why API versioning matters, and how to read API documentation well enough to evaluate a vendor integration.

**You should read this if:** You have signed a contract for a third-party API integration and had no way to evaluate whether the API design was good, or you want to understand what an API contract review actually covers.

---

## Why this matters in practice

**Reading architecture documents**: Every technical design document includes an architecture diagram. Level 3 gives you the vocabulary to read every component. You can ask "what happens if the database fails?" and "why is this API synchronous rather than asynchronous?" instead of reading the boxes.

**Infrastructure cost conversations**: Cloud spend is one of the largest line items in a scaling software product. Understanding that EC2 is compute-per-hour, RDS is managed Postgres, and S3 is object storage per gigabyte means you can read the bill and challenge it. Cost optimisation decisions require product input on usage patterns.

**Vendor API evaluation**: When you integrate a payment provider, a messaging API, or an AI model provider, you are signing a contract with a technical interface. Rate limits, authentication patterns, webhook reliability, and versioning policies are API design decisions that affect your product. Level 3 lets you evaluate them before you sign.

**AI product infrastructure**: Every AI product sits on this stack. A language model API is a standard HTTP call returning JSON. A vector database is a specialised storage system. A RAG pipeline connects an API, a database, and a server. Level 3 is the prerequisite for understanding AI infrastructure at Level 4.

---

## What comes next

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Behind you</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Levels 0, 1, 2</span>
      <span class="bz-arch-chip-note">Hardware, code, version control</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">You are here</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Level 3: The Infrastructure</span>
      <span class="bz-arch-chip-note">Databases, servers, cloud, APIs</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Up next</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Level 4: AI and Building</span>
      <span class="bz-arch-chip-note">Language models, vibe coding, and production AI systems on this infrastructure</span>
    </div>
  </div>
</div>

**[Start Level 4: AI and Building →](/levels/level-4/)**

Level 3 infrastructure is the platform. Level 4 puts AI systems on top of it and shows you how to build with them.

---

## Further reading

- [What is a Database?](/basics/what-is-a-database/): tables, SQL, and the data storage options behind every application
- [What is an API?](/basics/what-is-an-api/): REST, HTTP methods, and the contracts between communicating systems
- [AWS Documentation: Overview of Amazon Web Services](https://docs.aws.amazon.com/whitepapers/latest/aws-overview/introduction.html): the authoritative map of cloud services and what each one does
- [REST API Tutorial](https://restapitutorial.com/): plain-English introduction to REST design, HTTP methods, and status codes
- [Cloudflare Learning: What is a web server?](https://www.cloudflare.com/learning/what-is-a-web-server/): clear explanation of server roles with diagrams
- [PostgreSQL Documentation: Tutorial](https://www.postgresql.org/docs/current/tutorial.html): start here for relational databases; the canonical reference
- [API Design Guide, Google Cloud](https://cloud.google.com/apis/design): how Google designs APIs; the standard reference for REST API design patterns
