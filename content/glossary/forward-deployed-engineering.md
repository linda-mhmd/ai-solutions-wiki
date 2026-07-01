---
title: "Forward Deployed Engineering"
description: "An experienced engineer who embeds inside a customer's team to build and ship a working system with the customer's own data, systems, and constraints."
date: 2026-07-01
tags: ["glossary", "engineering", "ai-agents", "delivery", "aws"]
related: ["glossary/ai-agents", "glossary/agentic-loops", "guides/from-zero-to-production", "glossary/working-backwards"]
---

<figure class="bz-figure"><img src="/img/enterprise-dark/hands-hologram-interface-notext.png" alt="Hands on a glowing holographic interface, representing an engineer embedded directly in a customer team." loading="lazy"><figcaption>A forward deployed engineer works hands-on inside the customer's systems, not from a slide deck across the table.</figcaption></figure>

A **forward deployed engineer** (FDE) is an experienced engineer who embeds directly inside a customer's team to build and ship a working system. The FDE uses the customer's own data, systems, and constraints. This is the opposite of advising from the outside. The goal is a running product in production, and a customer team that can keep building without you.

## A plain-English analogy

Picture two ways to fix a struggling restaurant kitchen.

The first way sends a consultant who watches for a week, then hands over a report and leaves. The kitchen still cannot cook the new menu.

The second way sends a chef who puts on an apron, stands at the stove with your staff, cooks real service every night, and does not leave until your team can run the menu alone. A forward deployed engineer is the second chef. They ship the working thing, and they leave your people more capable than they found them.

## How it works

Forward deployed engineering originated at Palantir, where engineers sat inside customer sites and built directly against messy, real-world data. The model prizes three things over the traditional consulting playbook.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Principle 1</span>
    <span class="bz-flow-step-name">Outcomes over hours</span>
    <span class="bz-flow-step-desc">Success is a system running in production, not billable time or a finished deck.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Principle 2</span>
    <span class="bz-flow-step-name">Building over advising</span>
    <span class="bz-flow-step-desc">Engineers write and ship code against real data, they do not just recommend it.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Principle 3</span>
    <span class="bz-flow-step-name">Capability, not dependency</span>
    <span class="bz-flow-step-desc">The customer keeps new skills, patterns, and workflows after the team leaves.</span>
  </div>
</div>

An FDE partners with the customer's business, engineering, and security people at the same table. They work inside the real constraints: the actual data sources, the existing systems, the governance rules. The output is not a plan for someone else to build later. The output is the thing itself.

## The AI-era version

The newer version of this model is agentic-first delivery. Forward deployed engineers now work alongside [AI agents](/glossary/ai-agents/) across the development lifecycle. Agents handle heavy lifting at each phase while human engineers verify and guide the work through [agentic loops](/glossary/agentic-loops/). Vendors position this as a way to shorten delivery from months to weeks or days, though the real gain depends on the problem and the state of the customer's data.

In June 2026 AWS launched a Forward Deployed Engineering unit backed by a 1 billion US dollar investment (about 950 million EUR at mid-2026 rates). The unit embeds small expert pods directly within customer teams to co-build and deploy AI agent systems. Reuters reported that AWS plans to send pods of about five to six engineers to customers for 45-day engagements, drawn from a unit AWS expects to grow to thousands of people.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">People</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Embedded FDE pod</span>
      <span class="bz-arch-chip">Customer engineers</span>
      <span class="bz-arch-chip">Business and security teams</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">AI layer</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Purpose-built agents</span>
      <span class="bz-arch-chip">Semantic layer</span>
      <span class="bz-arch-chip-note">Semantic layers, knowledge graphs, or other enterprise context systems, where the engagement needs them</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Outcome</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Production system</span>
      <span class="bz-arch-chip">Runbooks and docs</span>
      <span class="bz-arch-chip-note">Customer becomes self-sufficient operator</span>
    </div>
  </div>
</div>

AWS named early customers including the Allen Institute, Cox Automotive, the NBA, the NFL, Ricoh, and Southwest Airlines. Each engagement is designed to leave behind codified expertise: runbooks, documentation, and, where relevant, semantic layers or knowledge graphs the customer keeps and operates.

## How it differs from traditional consulting

| | Traditional consulting | Forward deployed engineering |
|---|---|---|
| **Main deliverable** | Report or slide deck | Running production system |
| **Success metric** | Billable hours | Working outcome |
| **Where work happens** | Outside the customer | Inside the customer team |
| **After the engagement** | Customer needs more help | Customer builds alone |
| **Best for** | Strategy and analysis | Shipping real systems |

## How it connects to other concepts

Forward deployed engineering is the delivery method that turns [AI agents](/glossary/ai-agents/) into production value. It relies on [agentic loops](/glossary/agentic-loops/) where a human guides and verifies agent output at each step. The end state, a system live and owned by the customer, maps directly to the practice of getting [from zero to production](/guides/from-zero-to-production/). For the concrete AWS announcement and what it signals for enterprise teams, read the [AWS forward deployed engineers news item](/news/aws-forward-deployed-engineers/).

## Further reading

- [What are AI agents?](/glossary/ai-agents/): the software the FDE pods build and deploy.
- [Agentic loops](/glossary/agentic-loops/): the guide-and-verify cycle behind agentic delivery.
- [From zero to production](/guides/from-zero-to-production/): the path an FDE engagement drives toward.
- [AWS forward deployed engineers](/news/aws-forward-deployed-engineers/): the 1 billion US dollar unit explained.
- [AWS: 1 billion US dollars for forward deployed AI engineers](https://www.aboutamazon.com/news/aws/aws-1-billion-forward-deployed-ai-engineers): the primary announcement.
- [Reuters: AWS commits 1 billion dollars to a new embedded AI engineers unit](https://www.reuters.com/business/retail-consumer/amazons-aws-commits-1-billion-toward-new-unit-embedded-ai-engineers-2026-06-30/): the pod size and 45-day engagement detail.
- [The New Stack: AWS Forward Deployed Engineering](https://thenewstack.io/aws-forward-deployed-engineering/): analysis of why the model matters for enterprise teams.

## Sources

- https://www.aboutamazon.com/news/aws/aws-1-billion-forward-deployed-ai-engineers
- https://www.reuters.com/business/retail-consumer/amazons-aws-commits-1-billion-toward-new-unit-embedded-ai-engineers-2026-06-30/
- https://thenewstack.io/aws-forward-deployed-engineering/
