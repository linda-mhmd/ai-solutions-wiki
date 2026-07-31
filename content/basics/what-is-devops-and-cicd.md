---
title: "What is DevOps and CI/CD?"
description: "DevOps is a culture of collaboration between development and operations. CI/CD automates building, testing, and deploying code. Together, they enable fast, reliable software delivery."
date: 2026-07-30
level: 2
categories: [Basics]
tags: [devops, ci-cd, automation, deployment, github-actions, infrastructure]
faqs:
  - question: "Is DevOps a job title or a practice?"
    answer: "Both. DevOps started as a philosophy of breaking down silos between dev and ops teams. Now there are also 'DevOps engineers'—people who build and maintain the automation infrastructure. The title and the practice coexist."
  - question: "Do I need CI/CD for my small project?"
    answer: "Not necessarily, but it helps even at small scale. Setting up a simple pipeline (run tests, deploy if they pass) takes an hour and saves countless manual steps. Start simple: GitHub Actions or Vercel's built-in automation."
  - question: "What's the difference between CI and CD?"
    answer: "CI (Continuous Integration) automatically builds and tests code when you push changes. CD can mean Continuous Delivery (automatically prepare releases for manual deployment) or Continuous Deployment (automatically deploy to production). Most people mean 'automatic deployment' when they say CI/CD."
last_updated: 2026-07-30
---

{{< quickanswer >}}
DevOps is a culture and set of practices that unite software development (Dev) and IT operations (Ops). CI/CD automates the path from code change to production: Continuous Integration (CI) automatically builds and tests code, while Continuous Deployment/Delivery (CD) automates releases. Together, they enable teams to ship faster with fewer errors.
{{< /quickanswer >}}

## The problem DevOps solves

### The old way: silos

Traditionally, teams were separate:

**Developers**: Write code, throw it "over the wall" to operations.

**Operations**: Receive code, try to deploy it, deal with problems.

This created friction:
- "It works on my machine" vs. "It doesn't work in production"
- Developers blaming ops for deployment problems
- Ops blaming devs for unstable code
- Slow, painful, risky releases
- Long gaps between deployments

### The DevOps response

DevOps breaks down these silos:
- **Shared responsibility**: Devs and ops work together
- **Automation**: Manual processes become automated pipelines
- **Fast feedback**: Problems are caught early, not in production
- **Continuous improvement**: Iterative, incremental changes
- **Measurement**: Data-driven decisions about quality and speed

## Core DevOps practices

### Infrastructure as Code (IaC)

Define infrastructure in code, not by clicking around consoles:

```hcl
# Terraform example
resource "aws_instance" "web" {
  ami           = "ami-12345678"
  instance_type = "t3.micro"
  
  tags = {
    Name = "web-server"
  }
}
```

Benefits:
- Infrastructure is version-controlled
- Changes are reviewable
- Environments are reproducible
- Drift is detectable

Tools: Terraform, Pulumi, CloudFormation, Ansible

### Configuration management

Keep configuration consistent across servers:
- Install the same software
- Apply the same settings
- Manage users and permissions

Tools: Ansible, Chef, Puppet, SaltStack

### Monitoring and observability

Know what's happening in your systems:
- **Metrics**: Numbers over time (CPU, memory, request rate)
- **Logs**: Events that happened
- **Traces**: Request paths through services

Tools: Prometheus, Grafana, Datadog, Loki, Jaeger

### Collaboration and communication

Technical practices enable cultural change:
- Shared dashboards
- Incident response as a team
- Blameless postmortems
- Shared on-call rotations (sometimes)

## CI/CD: the automation backbone

### Continuous Integration (CI)

Every code change triggers:
1. Build the application
2. Run automated tests
3. Check code quality (linting, security scans)
4. Report results

```yaml
# GitHub Actions example
name: CI
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      - run: npm test
      - run: npm run lint
```

**The rule**: If tests fail, the build is "broken." Fix it before merging.

### Continuous Delivery (CD)

Code that passes CI is automatically prepared for deployment:
- Build deployable artifacts (containers, packages)
- Deploy to staging environments
- Run integration tests
- Make it ready for production with one click

Humans decide when to push to production.

### Continuous Deployment

Code that passes all tests automatically deploys to production. No human approval needed for routine changes.

This requires:
- High test coverage
- Excellent monitoring
- Fast rollback capability
- Feature flags for risk mitigation

```
Code → CI → Tests Pass → Deploy to Production (automatic)
```

## A typical CI/CD pipeline

```
┌──────────────────────────────────────────────────────────────────┐
│                         Developer Workflow                        │
│  ┌─────────┐   ┌────────┐   ┌─────────┐   ┌────────────────────┐ │
│  │  Write  │──▶│  Push  │──▶│  Pull   │──▶│      Merge to      │ │
│  │  Code   │   │to Repo │   │ Request │   │       Main         │ │
│  └─────────┘   └────────┘   └─────────┘   └────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────┐
│                          CI Pipeline                              │
│  ┌─────────┐   ┌────────┐   ┌─────────┐   ┌────────────────────┐ │
│  │  Lint   │──▶│ Build  │──▶│  Test   │──▶│  Security Scan     │ │
│  └─────────┘   └────────┘   └─────────┘   └────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
                                │
                         Tests Pass?
                        /           \
                      Yes            No
                       │              │
                       ▼              ▼
┌──────────────────────────┐    ┌────────────────────┐
│       CD Pipeline        │    │   Stop & Fix       │
│  ┌────────────────────┐  │    └────────────────────┘
│  │  Build Container   │  │
│  └────────────────────┘  │
│           │              │
│           ▼              │
│  ┌────────────────────┐  │
│  │ Deploy to Staging  │  │
│  └────────────────────┘  │
│           │              │
│           ▼              │
│  ┌────────────────────┐  │
│  │ Integration Tests  │  │
│  └────────────────────┘  │
│           │              │
│           ▼              │
│  ┌────────────────────┐  │
│  │  Deploy to Prod    │  │
│  └────────────────────┘  │
└──────────────────────────┘
```

## Common CI/CD tools

### Hosted / SaaS

| Tool | Best for | Notes |
|------|----------|-------|
| **GitHub Actions** | GitHub repos | Free tier, huge ecosystem |
| **GitLab CI** | GitLab repos | Tightly integrated |
| **CircleCI** | Complex pipelines | Powerful, mature |
| **Vercel/Netlify** | Frontend apps | Zero-config deployment |
| **Railway** | Simple backends | Automatic from Git |

### Self-hosted

| Tool | Notes |
|------|-------|
| **Jenkins** | Oldest, most flexible, most configuration |
| **ArgoCD** | GitOps for Kubernetes |
| **Drone** | Container-native CI |
| **Concourse** | Pipeline-as-code philosophy |

### For Kubernetes

- **ArgoCD**: GitOps deployments
- **Flux**: Alternative GitOps tool
- **Tekton**: Kubernetes-native CI/CD

## GitOps: a modern approach

GitOps applies DevOps principles to deployment:

**Core idea**: Git is the source of truth for both code and infrastructure.

1. All configuration is in Git
2. Changes are made via pull requests
3. Automated systems sync Git state to production
4. Drift is detected and corrected

```
Git Repo (desired state)
        │
        ▼
┌─────────────────┐
│  GitOps Agent   │ (ArgoCD, Flux)
│   Watches Git   │
└─────────────────┘
        │
        ▼ (sync)
┌─────────────────┐
│  Kubernetes     │ (actual state)
└─────────────────┘
```

Benefits:
- Auditable history of all changes
- Easy rollback (revert the commit)
- Declarative, reproducible
- Developer-friendly (PRs for deployments)

## DevOps metrics: DORA

The DevOps Research and Assessment (DORA) team identified four key metrics:

| Metric | Elite | High | Medium | Low |
|--------|-------|------|--------|-----|
| **Deployment frequency** | On-demand (multiple/day) | Weekly to monthly | Monthly to 6-monthly | Less than 6-monthly |
| **Lead time for changes** | Less than a day | Week to month | Month to 6 months | More than 6 months |
| **Time to restore service** | Less than an hour | Less than a day | Day to week | More than 6 months |
| **Change failure rate** | 0-15% | 0-15% | 16-30% | 16-30%+ |

These metrics help teams measure and improve their DevOps practices.

## Starting with CI/CD (for vibecoders)

### Simplest setup: GitHub Actions

1. Create `.github/workflows/ci.yml`:

```yaml
name: CI
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install
      - run: npm test
```

2. Push to GitHub
3. Tests run automatically on every push

### Add deployment

Many platforms auto-deploy from GitHub:
- **Vercel**: Connect repo, deploys on push
- **Railway**: Connect repo, deploys on push
- **Netlify**: Connect repo, deploys on push

No pipeline configuration needed.

### Grow complexity as needed

Start simple. Add complexity when you need it:
1. Basic CI (tests on push)
2. Auto-deploy to staging
3. Manual promotion to production
4. Automatic production deploys (when confident)
5. Advanced: canary deployments, feature flags

## DevOps culture vs. DevOps tools

Tools alone don't make DevOps. Culture does:

**Culture**: "We ship small changes frequently because it's safer."
**Tools**: CI/CD enables this with automation.

**Culture**: "When there's an incident, we learn from it without blame."
**Tools**: Monitoring, logging, and postmortem processes support this.

**Culture**: "Everyone is responsible for production stability."
**Tools**: Shared dashboards, on-call rotations, deployment access.

Buying tools without cultural change just adds complexity.

## The DevOps engineer role

DevOps started as a philosophy, but now there are DevOps engineers—people who:

- Build and maintain CI/CD pipelines
- Manage infrastructure as code
- Set up monitoring and alerting
- Automate repetitive tasks
- Bridge the gap between dev and ops teams
- Sometimes called "Platform Engineers" or "SRE" (Site Reliability Engineer)

Whether you need dedicated DevOps people depends on your scale and complexity.

## Further reading

- [What are containers?](/basics/what-are-containers/): What CI/CD often builds and deploys
- [What is Kubernetes?](/basics/what-is-kubernetes/): Where many CD pipelines deploy to
- [What is cloud-native?](/basics/what-is-cloud-native/): The broader philosophy
- [What is deployment?](/basics/what-is-deployment/): The end goal of CI/CD
- [What is testing?](/basics/what-is-testing/): The tests CI runs
