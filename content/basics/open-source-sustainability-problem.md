---
title: "The Open Source Sustainability Problem"
description: "Critical software maintained by unpaid volunteers, burnout, corporate extraction, and the challenge of funding work everyone depends on but nobody pays for."
date: 2026-07-30
level: 3
categories: [Basics]
tags: [open-source, sustainability, burnout, funding, maintainer, community]
faqs:
  - question: "Why don't companies just pay for the open source they use?"
    answer: "Some do, but most don't. Open source is free to use, and there's no invoice. Companies optimize costs, and free dependencies get $0 budget. Tragedy of the commons: everyone benefits, so nobody takes responsibility."
  - question: "Is open source maintainer burnout really that common?"
    answer: "Yes. Studies and surveys consistently show high rates of burnout. Maintaining popular software means constant demands (issues, PRs, security reports) with often zero compensation. Many maintainers step back or abandon projects."
  - question: "What can I do to help?"
    answer: "Sponsor maintainers on GitHub Sponsors or Open Collective. Contribute (code, docs, issue triage). Advocate for your company to fund dependencies. Be respectful and patient in issues. Don't demand free labor."
last_updated: 2026-07-30
---

{{< quickanswer >}}
Much of the internet's critical infrastructure is maintained by unpaid volunteers. This creates a sustainability problem: companies worth billions depend on software maintained by individuals in their spare time, often without compensation. Maintainers burn out, security vulnerabilities go unpatched, and critical projects get abandoned. There's no clear solution—funding mechanisms exist but don't scale, and the culture of free software makes compensation complex.
{{< /quickanswer >}}

## The problem in one image

The XKCD "Dependency" comic (xkcd.com/2347) shows "All modern digital infrastructure" as a precarious tower, with one tiny block labeled "A project some random person in Nebraska has been mass-maintaining since 2003."

This is not exaggeration. Real examples:

**OpenSSL (Heartbleed)**: For years, one of the internet's most critical security libraries was maintained by one full-time developer earning $20,000/year. The Heartbleed bug in 2014 exposed this—a security flaw in software used by hundreds of millions of servers, maintained on a shoestring.

**left-pad (2016)**: An 11-line npm package was unpublished, breaking builds across the JavaScript ecosystem. Trivial code, but thousands of projects depended on it. One person's decision disrupted global software development.

**core-js**: A JavaScript polyfill library used by millions of projects, maintained primarily by one person who at times was imprisoned in Russia and received almost no funding despite widespread corporate use.

**Log4Shell (2021)**: Log4j, a Java logging library, had a critical vulnerability. Maintained by volunteers, used by nearly every Java application. Volunteer maintainers faced a security crisis with the same resources as before the crisis.

## The tragedy of the commons

Open source creates a classic tragedy of the commons:

1. **The resource is valuable**: Open-source software saves companies billions
2. **The resource is free to use**: No invoice, no cost center, no budget line
3. **Nobody is responsible for maintaining it**: Companies assume "someone" handles it
4. **The resource degrades**: Maintainers burn out, security languishes, projects stagnate

Companies optimizing costs don't pay for free things. The calculus seems rational individually (why pay for something free?) but collectively leads to underinvestment in shared infrastructure.

## The numbers are stark

**Tidelift survey findings**:
- 46% of maintainers are unpaid
- Only 26% receive any meaningful income from their work
- Average maintenance time: 10+ hours/week
- Many maintainers have considered quitting

**Dependency analysis**:
- Average application depends on hundreds of open-source packages
- Most companies don't know what open source they use
- Almost none actively fund their dependencies

**Value extraction**:
- Companies save billions by using open source
- Cloud providers build services on open-source projects
- The maintainers who create that value often see none of it

## Why maintainers burn out

### Infinite demand, finite capacity

Popular projects mean:
- Hundreds of open issues
- Pull requests requiring review
- Security vulnerability reports
- Questions in multiple channels
- Compatibility requests for new platforms/versions
- Documentation demands

One person (or a small team) can't keep up indefinitely.

### Entitlement from users

Maintainers report:
- Demands disguised as requests
- Anger when issues aren't fixed immediately
- Complaints about free software not meeting needs
- Threats when changes break users' code
- Zero appreciation for years of work

The disconnect: users expect commercial-grade support for hobby-project investment.

### Emotional labor

Maintaining popular software involves:
- Saying no (to features, to PRs that don't fit)
- Managing conflicts in the community
- Explaining the same things repeatedly
- Dealing with harassment (especially visible maintainers)
- Carrying responsibility for others' production systems

This labor is invisible and draining.

### Career opportunity cost

Time spent on open source could be spent on:
- Paid employment
- Family and personal life
- Side projects that generate income
- Rest

Maintainers often sacrifice economically for work that benefits others.

## How projects die

### Abandonment

Maintainer walks away. Last commit: 2 years ago. Issues pile up. Forks fragment the user base. Security vulnerabilities remain unpatched.

### Enshittification

Project gets acquired or commercialized aggressively. Free version degrades. Open-source spirit dies while the name continues.

### Single point of failure

One maintainer, one person's life circumstances change. Health issue, new job, new child, losing interest—any life event can end a project.

### Corporate capture

A company becomes the primary contributor, then changes direction (open-core, licensing changes) in ways that don't serve the community.

## Funding mechanisms that exist

### GitHub Sponsors

Individual developers can receive recurring donations. Works for some maintainers. Doesn't scale to full income for most. Depends on individual generosity.

### Open Collective

Transparent budgets for projects. Companies and individuals contribute. Project expenses are visible. Better for projects than individuals.

### Tidelift

Companies pay Tidelift to ensure their dependencies are maintained. Tidelift pays maintainers. Attempts to make funding transactional. Growing but not dominant.

### Company sponsorship

Some companies directly sponsor projects they depend on. Google, Microsoft, and others fund critical infrastructure. Inconsistent and often insufficient.

### Foundations

Linux Foundation, Apache Foundation, etc. employ some maintainers. Provide legal and organizational support. Can't fund everyone.

### Open-core / dual licensing

Free open-source version, paid commercial features. Works for some projects (GitLab, MongoDB historically). Creates tension between free and paid users.

### Consulting and support

Maintainers sell expertise on their project. Competes with maintenance time. Income tied to specific demands, not general maintenance.

## What doesn't work

### "Just ask for money"

Most maintainers who ask receive little. The people who use the software aren't the people with purchasing authority. $5/month from individuals doesn't pay rent.

### Assuming corporations will do the right thing

They optimize costs. Free dependencies get $0. Exceptions exist, but aren't the norm. Don't expect gratitude to translate to funding.

### Relying on one person forever

Single-maintainer projects are fragile. Life happens. Projects need succession planning and community investment.

### Thinking "someone else" will fund it

If everyone thinks this, no one funds it. Classic collective action problem.

## Partial solutions

### For maintainers

- **Set boundaries**: It's okay to not respond to every issue
- **Document policies**: "No, we don't support X" in CONTRIBUTING.md
- **Build a team**: Distribute burden, reduce single point of failure
- **Consider funding**: GitHub Sponsors, Open Collective, Tidelift
- **Take breaks**: Burnout is real, projects survive pauses

### For companies

- **Audit dependencies**: Know what open source you use
- **Budget for funding**: Treat it like infrastructure cost
- **Contribute back**: Code, docs, triage—not just money
- **Sponsor strategically**: Fund critical dependencies, not just popular ones
- **Hire maintainers**: Paying people to do open-source work full-time

### For individuals

- **Sponsor maintainers**: Even $5/month matters in aggregate
- **Contribute respectfully**: Good issues, documentation, patience
- **Don't demand**: Free software comes with no SLA
- **Advocate**: Push your employer to fund open source

### For the ecosystem

- **Foundations**: Provide neutral ground and funding
- **Standards**: Make dependency funding normal
- **Education**: Help companies understand the risk of unfunded dependencies
- **Tooling**: Make it easy to see and fund what you depend on

## The uncomfortable truths

### Open source won't solve itself

The culture of "free as in beer" makes funding awkward. Maintainers feel guilty asking for money. Users feel entitled to free support. This culture needs to change.

### Companies extract more than they give

The collective value extracted from open source vastly exceeds what goes back to maintainers. This isn't sustainable.

### Not every project can be funded

There are millions of open-source projects. Most are small, niche, or experimental. Funding can't scale to everything. Triage is necessary.

### Sometimes projects should end

Not every project needs to live forever. Graceful deprecation is better than zombie maintenance. It's okay to say "this project is complete" or "I'm done."

## A different framing

Instead of asking "how do we fund open source?" consider:

**How do we build software sustainably?**

- Some software should be commercial (funded by customers)
- Some should be infrastructure (funded by collective investment)
- Some is hobby/exploration (funded by intrinsic motivation)
- The lines between these are blurry

Open source isn't inherently a business model. It's a development methodology. The business model—how maintenance gets funded—is a separate question that the open-source movement never fully answered.

## Further reading

- [What is open source?](/basics/what-is-open-source/): The ecosystem with these challenges
- [Open source foundations](/basics/open-source-foundations/): Organizations trying to help
- [Famous open source projects](/basics/famous-open-source-projects/): How major projects sustain themselves
- [How to contribute to open source](/basics/how-to-contribute-to-open-source/): Being part of the solution
