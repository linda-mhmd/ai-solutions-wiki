---
title: "The Agile Manifesto"
date: 2026-03-26
draft: false
tags: ["software-engineering", "project-management", "agile", "methodology", "sdlc"]
categories: ["Software Engineering"]
related:
  - software-engineering/waterfall-methodology
  - software-engineering/scrum-framework
last_updated: 2026-05-30
---

In February 2001, seventeen software practitioners gathered at The Lodge at Snowbird ski resort in Utah to discuss lightweight alternatives to documentation-heavy software development processes. The result was the Agile Manifesto - a 68-word statement of values and an accompanying set of twelve principles that has since reshaped how the majority of commercial software teams organise their work.

<figure class="bz-figure">
<img src="/img/craft/waterfall-fountain-vs-agile-pottery-text.png" alt="Split image comparing waterfall methodology (represented by a formal fountain with water flowing in one direction) to agile methodology (represented by hands shaping clay on a pottery wheel), illustrating the shift from rigid sequential processes to iterative, hands-on development." loading="lazy">
<figcaption>The Agile Manifesto marked a fundamental shift from sequential, documentation-heavy processes to iterative, collaborative development where working software emerges through continuous refinement.</figcaption>
</figure>

## Historical Context: The Heavyweight Process Problem

By the mid-1990s, software organisations had accumulated a substantial body of formal process methodology. The Capability Maturity Model (CMM) from Carnegie Mellon's Software Engineering Institute defined process maturity on a five-level scale. ISO 9001 certification required documented procedures for every development activity. The Rational Unified Process (RUP) prescribed roles, artifacts, and workflows running to hundreds of pages. The Software Engineering Institute estimated that organisations at CMM Level 1 (ad hoc, no defined processes) had a 70% project failure rate - but the heavyweight processes introduced to solve this produced their own failure modes: projects consumed by documentation, delayed by approval gates, and unable to respond when requirements changed.

The seventeen signatories at Snowbird - including Kent Beck (creator of Extreme Programming), Martin Fowler, Alistair Cockburn, Ward Cunningham, and Jeff Sutherland - came from different lightweight methodologies but shared a diagnosis of the problem.

## The Four Values

The Manifesto states four value pairs, each expressing a preference rather than an absolute:

> We are uncovering better ways of developing software by doing it and helping others do it. Through this work we have come to value:
>
> **Individuals and interactions** over processes and tools
>
> **Working software** over comprehensive documentation
>
> **Customer collaboration** over contract negotiation
>
> **Responding to change** over following a plan
>
> That is, while there is value in the items on the right, we value the items on the left more.

The final sentence is frequently overlooked. The Manifesto does not assert that processes, documentation, contracts, and plans have no value - it asserts that when the two sides come into conflict, teams should favour the left-hand items. This distinction matters enormously for correct application.

### Value 1: Individuals and Interactions over Processes and Tools

Processes and tools cannot substitute for skilled people communicating effectively. A team using sticky notes and a whiteboard outperforms a dysfunctional team with enterprise project management software. The implication is that investment in team dynamics, communication, and skill development yields higher returns than investment in tooling or process compliance.

### Value 2: Working Software over Comprehensive Documentation

Documentation that describes what software will do has less value than software that already does it. This value emerged directly from projects where teams produced thousands of pages of requirements and design documents but delivered no running system. It does not mean "write no documentation" - the Agile community widely practises just-enough documentation, with the test that documentation should be maintained and read, not filed and forgotten.

### Value 3: Customer Collaboration over Contract Negotiation

Fixed-scope contracts create adversarial dynamics. When scope changes (and scope always changes), the customer and vendor argue about whether the change is covered by the contract rather than solving the problem. Agile favours ongoing collaboration - frequent delivery, regular feedback, and a shared goal - over legally enforcing the original scope. This has significant implications for procurement and contracting models.

### Value 4: Responding to Change over Following a Plan

Plans become less accurate as time passes and learning occurs. A plan made before any code is written reflects the team's least-informed state. Agile processes build in regular opportunities to revise the plan - typically at the end of each iteration - so that the plan reflects current knowledge rather than original assumptions.

## The Twelve Principles

The Manifesto is accompanied by twelve principles that provide more concrete guidance:

1. Satisfy the customer through early and continuous delivery of valuable software.
2. Welcome changing requirements, even late in development. Agile processes harness change for the customer's competitive advantage.
3. Deliver working software frequently, from a couple of weeks to a couple of months, with a preference for the shorter timescale.
4. Business people and developers must work together daily throughout the project.
5. Build projects around motivated individuals. Give them the environment and support they need, and trust them to get the job done.
6. The most efficient and effective method of conveying information to and within a development team is face-to-face conversation.
7. Working software is the primary measure of progress.
8. Agile processes promote sustainable development. The sponsors, developers, and users should be able to maintain a constant pace indefinitely.
9. Continuous attention to technical excellence and good design enhances agility.
10. Simplicity - the art of maximising the amount of work not done - is essential.
11. The best architectures, requirements, and designs emerge from self-organising teams.
12. At regular intervals, the team reflects on how to become more effective, then tunes and adjusts its behaviour accordingly.

Principle 8 - sustainable pace - is often neglected in Agile adoption. The Manifesto's authors were explicit that heroic crunch periods were a symptom of poor planning, not a feature of a healthy process. A team that requires repeated overtime to meet sprint commitments is not practising Agile; it is practising unsustainable delivery under an Agile label.

Principle 9 - continuous attention to technical excellence - directly counters the misconception that Agile means moving fast and accumulating technical debt. Kent Beck's Extreme Programming, one of the disciplines represented at Snowbird, made practices like test-driven development, continuous integration, and refactoring central to sustainable pace.

## Impact on the Software Industry

The Agile Manifesto initiated a measurable shift in how software teams operate. The Scrum framework, which pre-dates the Manifesto but aligns closely with its values, became the dominant project management methodology in software development. Annual surveys by VersionOne (later Digital.ai) found that by 2020, over 95% of respondents reported their organisations practised Agile to some degree.

The Manifesto also influenced adjacent fields. DevOps practices - continuous integration, continuous delivery, infrastructure as code - extend Agile's value of working software by automating the path from code commit to production. Lean UX and design thinking apply iterative, hypothesis-driven approaches to product design.

## Common Misunderstandings

**"Agile means no documentation."** The Manifesto values working software over comprehensive documentation, not over any documentation. Teams practising Agile typically maintain architecture decision records, API documentation, and runbooks - the difference is that documentation is written to serve a reader, not to satisfy a process.

**"Agile means no planning."** The Manifesto values responding to change over following a plan. Agile teams plan extensively - they plan every sprint, maintain a product backlog, and conduct release planning. The difference is that plans are treated as revisable artifacts rather than binding contracts.

**"Agile means the customer can change requirements whenever they want."** The Manifesto's second principle says to welcome changing requirements. In practice, this is managed through the backlog: new requirements are added, prioritised, and scheduled into future iterations. Mid-sprint scope changes typically violate the team's commitment for that iteration.

**"Agile is incompatible with regulated industries."** The V-Model and IEC 62304 can be applied iteratively. Several regulatory bodies, including the FDA, have issued guidance on how Agile practices can satisfy documentation and traceability requirements. The incompatibility is with pure waterfall procurement models, not with regulatory intent.

## Relationship to Other Methodologies

The Scrum framework is the most widely adopted implementation of Agile values. See [Scrum Framework](/software-engineering/scrum-framework) for the roles, ceremonies, and artifacts Scrum defines.

For an understanding of what Agile was reacting against, see [Waterfall Methodology](/software-engineering/waterfall-methodology).

## Sources

- Beck, K., et al. (2001). *Manifesto for Agile Software Development*. agilemanifesto.org.
- Fowler, M., and Highsmith, J. (2001). "The Agile Manifesto." *Software Development Magazine*, 9(8), 28-35.
- Digital.ai. *15th Annual State of Agile Report* (2021).
- Cockburn, A. (2002). *Agile Software Development*. Addison-Wesley.
- Beck, K. (2000). *Extreme Programming Explained: Embrace Change*. Addison-Wesley.
