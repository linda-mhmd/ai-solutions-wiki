---
title: "Open Source Foundations"
description: "Linux Foundation, Apache, CNCF, OpenJS—organizations that govern and fund open source projects. What they do, why they exist, and how they work."
date: 2026-07-30
level: 3
categories: [Basics]
tags: [open-source, foundations, linux-foundation, apache, cncf, governance]
faqs:
  - question: "Why do open source projects need foundations?"
    answer: "Legal protection (holding trademarks, handling liability), neutral governance (preventing single-company control), funding (sponsorships, grants), and infrastructure (hosting, CI, security). A foundation lets a project outlast any individual or company."
  - question: "Do foundations pay developers?"
    answer: "Some do, directly or through grants. But most open-source work is done by people employed by member companies, not by the foundation itself. Foundations provide structure and funding, but the actual coding is usually done by people whose employers contribute their time."
  - question: "How do projects join foundations?"
    answer: "Each foundation has its own process. Generally: the project applies, demonstrates community health and governance, meets technical requirements, and goes through a review. Some foundations actively recruit projects; others wait for applications."
last_updated: 2026-07-30
---

{{< quickanswer >}}
Open source foundations are nonprofit organizations that provide governance, legal protection, and funding for open-source projects. They hold trademarks, manage infrastructure, handle money, and create neutral ground where competing companies can collaborate. Major foundations include the Linux Foundation, Apache Software Foundation, and Cloud Native Computing Foundation (CNCF). They're funded by corporate memberships and donations.
{{< /quickanswer >}}

## Why foundations exist

### Legal protection

Open-source projects need legal infrastructure:

- **Trademarks**: Someone must own "Linux" or "Kubernetes" to prevent misuse
- **Contributor agreements**: Legal clarity on who owns contributions
- **Liability shield**: Protecting individual contributors from lawsuits
- **Intellectual property**: Managing patents and licensing

Individual maintainers can't easily handle this. Foundations provide legal shelter.

### Neutral governance

When a project matters to multiple companies:

- No single company should control direction
- Governance needs to be transparent and fair
- Decisions need legitimate process
- Conflicts need resolution mechanisms

Foundations create neutral territory where competitors collaborate.

### Funding and sustainability

Projects need resources:

- Infrastructure (hosting, CI/CD, security scanning)
- Events (conferences, meetups)
- Marketing (awareness, adoption)
- Sometimes: paid maintainers

Foundations aggregate corporate sponsorship and distribute it.

### Community infrastructure

Beyond code:

- Communication platforms
- Documentation hosting
- Security response processes
- Mentorship programs
- Standards and best practices

## Major foundations

### Linux Foundation

**Founded**: 2000 (merger of Open Source Development Labs and Free Standards Group)

**Notable projects**: Linux kernel, Kubernetes (via CNCF), Node.js (via OpenJS), Let's Encrypt, Hyperledger

**How it works**:
- Umbrella organization hosting many sub-foundations
- Corporate membership tiers ($5,000 to $500,000+ annually)
- Employs Linus Torvalds (Linux kernel) and other key maintainers
- Runs events (Open Source Summit, KubeCon, etc.)
- Provides training and certification

**Scale**: 2,000+ member companies, 60,000+ individual members, hosts 800+ projects

**Criticism**: Corporate-dominated governance, high membership fees, some see it as "pay-to-play"

### Cloud Native Computing Foundation (CNCF)

**Founded**: 2015 (part of Linux Foundation)

**Notable projects**: Kubernetes, Prometheus, Envoy, containerd, Helm, Argo, Jaeger, OpenTelemetry

**How it works**:
- Graduated/Incubating/Sandbox project tiers
- Projects must meet maturity criteria to advance
- Provides infrastructure, marketing, events
- KubeCon is one of the largest open-source conferences

**Focus**: Cloud-native technologies—containers, microservices, orchestration, observability

### Apache Software Foundation (ASF)

**Founded**: 1999

**Notable projects**: Apache HTTP Server, Kafka, Spark, Hadoop, Cassandra, Airflow, Flink, Lucene/Solr

**How it works**:
- "The Apache Way": community-driven governance principles
- All projects must follow Apache governance model
- Individual membership (not corporate-dominated)
- Projects governed by elected Project Management Committees (PMCs)
- All decisions made on public mailing lists

**Philosophy**: "Community over code"—prioritizes healthy communities over individual projects. Individuals vote, not companies.

**Criticism**: Governance can be slow, process-heavy compared to nimbler organizations

### OpenJS Foundation

**Founded**: 2019 (merger of Node.js Foundation and JS Foundation)

**Notable projects**: Node.js, jQuery, webpack, Electron, ESLint, Lodash

**How it works**:
- Focused on JavaScript ecosystem
- Provides neutral governance for JavaScript projects
- Events, marketing, infrastructure

### Python Software Foundation (PSF)

**Founded**: 2001

**Focus**: Python language, ecosystem, community

**What it does**:
- Holds Python intellectual property
- Runs PyCon and supports regional conferences
- Funds grants for Python development
- Manages Python Package Index (PyPI)

### Mozilla Foundation

**Founded**: 2003

**Notable projects**: Firefox, historically Rust (now separate)

**Focus**: Internet health, privacy, open web

**Unique**: Mission-driven nonprofit with commercial subsidiary (Mozilla Corporation makes Firefox)

### Rust Foundation

**Founded**: 2021

**Focus**: Rust programming language

**Members**: AWS, Google, Huawei, Meta, Microsoft, and others

**Backstory**: Mozilla created Rust; when Mozilla had layoffs in 2020, the Rust Foundation was formed to ensure project continuity independent of any single company.

### Eclipse Foundation

**Founded**: 2004

**Notable projects**: Eclipse IDE, Jakarta EE, Mosquitto (MQTT)

**Focus**: Developer tools, IoT, cloud-native Java

### OpenSSF (Open Source Security Foundation)

**Founded**: 2020 (part of Linux Foundation)

**Focus**: Security of open-source software

**Why it matters**: After Log4Shell and other vulnerabilities, improving open-source security became urgent. OpenSSF coordinates security efforts across the ecosystem.

**Initiatives**: 
- Scorecards (automated security analysis)
- Sigstore (artifact signing)
- Security education
- Funding critical projects

## How projects join foundations

### Apache Incubation

1. Project submits proposal
2. Champion (existing Apache member) sponsors it
3. Incubation period begins
4. Project adopts Apache governance, licensing, practices
5. Community demonstrates health
6. Graduates to top-level project (or retires)

**Timeline**: Months to years

### CNCF Sandbox → Incubation → Graduation

**Sandbox**: Early-stage, experimental. Low barrier to entry.

**Incubating**: Demonstrated adoption, healthy community, security practices.

**Graduated**: Production-ready, widely adopted, diverse contributor base.

**Criteria include**:
- Number of contributors
- Production users
- Security audit
- Governance documentation

### Linux Foundation Projects

Various paths depending on project type. Generally:
- Demonstrate community interest
- Identify sponsors/supporters
- Negotiate governance and funding model
- May form sub-foundation for large projects

## What foundations actually do

### Infrastructure

- CI/CD systems (GitHub Actions, custom runners)
- Package repositories and CDNs
- Documentation hosting
- Communication tools (Slack, mailing lists, forums)
- Security scanning and vulnerability management

### Legal

- Hold and defend trademarks
- Manage contributor license agreements (CLAs)
- Provide legal counsel
- Handle intellectual property issues
- Manage tax-exempt status

### Events

- Organize conferences (KubeCon, ApacheCon, PyCon)
- Coordinate community meetups
- Run workshops and training

### Marketing

- Project promotion
- Case studies and success stories
- Analyst relations
- Press and communications

### Governance support

- Help projects establish governance
- Mediate conflicts
- Provide templates and best practices
- Support leadership transitions

### Funding distribution

- Accept corporate sponsorship
- Fund infrastructure costs
- Award grants for development
- Sometimes pay maintainers directly

## How foundations are funded

### Corporate membership

Most foundation revenue comes from companies:

| Tier | Typical cost | What you get |
|------|-------------|--------------|
| Platinum/Premier | $100K-500K+/year | Board seat, logo placement, influence |
| Gold | $50K-100K/year | Advisory role, event benefits |
| Silver | $5K-25K/year | Community membership, basic benefits |

**Who joins**: Companies that depend on the projects (cloud providers, enterprise software vendors, tech giants)

### Event revenue

Conference tickets and sponsorships generate significant income:
- KubeCon tickets: hundreds of dollars
- Sponsor booths: tens of thousands
- Training and certification: additional revenue

### Individual donations

Smaller but meaningful:
- GitHub Sponsors (for individuals)
- Direct donations to foundations
- Membership fees for individual members

### Grants

Some foundations receive grants from:
- Government programs
- Other foundations
- Corporate philanthropy

## Governance models

### Foundation-led

The foundation sets direction, hires staff, runs projects.

Example: Linux Foundation employs maintainers and has significant influence.

### Project-led

Projects govern themselves; foundation provides services.

Example: Apache projects are independent PMCs; ASF provides infrastructure but doesn't direct projects.

### Corporate-led (with foundation wrapper)

One company dominates development; foundation provides neutral governance appearance.

Example: Some projects where 90%+ of commits come from one company. The foundation provides legitimacy but limited actual neutrality.

### Community-led

Individual contributors vote; corporate influence is limited.

Example: Debian, some Apache projects.

## Criticism of foundations

### Pay-to-play concerns

High membership fees mean well-funded companies have more influence. Startups and individuals may be marginalized.

### Bureaucracy

Foundation governance can be slow. Process requirements may discourage contributors. The "Apache Way" is thorough but time-consuming.

### Conflict of interest

Board members often work for competing companies. Decisions may reflect corporate politics rather than community interest.

### Marketing over substance

Some see foundations as marketing vehicles—providing legitimacy badges rather than genuine support.

### Sustainability gap

Foundations help big projects. Many critical small projects receive nothing. The long tail of open source remains unfunded.

## When projects don't use foundations

Some projects thrive without foundations:

**Single-company backed**: React (Meta), Angular (Google), Swift (Apple). The company provides resources; no foundation needed.

**Small scope**: Not every library needs a foundation. Overhead isn't worth it for small projects.

**Philosophical choice**: Some maintainers prefer independence over foundation governance.

**Informal community**: Projects can function with informal governance, especially early-stage.

## Finding a foundation for your project

### When to consider a foundation

- Multiple companies depend on your project
- You need neutral governance
- Legal protection matters
- You want long-term sustainability
- Corporate contribution requires a neutral home

### When not to bother

- Small project with limited scope
- Single-company project (they can fund it)
- You want to move fast without process
- Governance overhead exceeds benefit

### How to choose

- **Match mission**: CNCF for cloud-native, Apache for big data, PSF for Python
- **Evaluate governance**: Do you want company-led or community-led?
- **Consider requirements**: Can you meet their criteria?
- **Talk to existing projects**: What's their experience?

## Further reading

- [What is open source?](/basics/what-is-open-source/): The ecosystem foundations serve
- [Famous open source projects](/basics/famous-open-source-projects/): Projects that live in foundations
- [The open source sustainability problem](/basics/open-source-sustainability-problem/): Challenges foundations try to address
- [How to contribute to open source](/basics/how-to-contribute-to-open-source/): Participating in foundation-hosted projects
