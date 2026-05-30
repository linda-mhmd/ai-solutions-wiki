---
title: "The Scrum Framework"
date: 2026-03-26
draft: false
tags: ["software-engineering", "project-management", "scrum", "agile", "methodology", "sdlc"]
categories: ["Software Engineering"]
related:
  - software-engineering/agile-manifesto
  - software-engineering/waterfall-methodology
last_updated: 2026-05-30
---

Scrum is a lightweight framework for developing and sustaining complex products. It was first formally described by Ken Schwaber and Jeff Sutherland in a 1995 paper presented at OOPSLA, and has been maintained since 2010 in the periodically updated Scrum Guide - the authoritative definition of the framework. The current version is the 2020 Scrum Guide, which removed prescriptive detail and reinforced Scrum's identity as a framework rather than a full methodology.

<figure class="bz-figure">
<img src="/img/craft/blueprint-recipe-sdlc-text.png" alt="A blueprint document alongside a recipe card, illustrating how the Scrum framework provides a structured yet flexible approach to software development, combining planning with iterative execution." loading="lazy">
<figcaption>Scrum provides a lightweight framework that balances structure with flexibility, enabling teams to deliver complex products through iterative cycles of planning, execution, and adaptation.</figcaption>
</figure>

Scrum's theoretical foundation is **empirical process control**: the idea that knowledge comes from experience and that decisions should be based on what is known. It operates through three pillars - transparency, inspection, and adaptation - applied through a defined set of roles, events, and artifacts.

## The Three Pillars

**Transparency** means that the process and its current state must be visible to all who are affected by it. The product backlog, sprint backlog, and definition of done are all transparency mechanisms. Hidden work, undisclosed blockers, and informal agreements between team members undermine Scrum's ability to function.

**Inspection** means that Scrum artifacts and progress toward goals are frequently examined. Every Scrum event is an inspection point: the daily scrum inspects progress toward the sprint goal; the sprint review inspects the increment; the retrospective inspects the team's process.

**Adaptation** means that when an inspection reveals that something is outside acceptable limits, the process or the artifact being produced must be adjusted. Adaptation without inspection is guessing; inspection without adaptation is theatre.

## Roles (The Scrum Team)

The 2020 Scrum Guide replaced the term "Development Team" with "Developers" and removed the sub-team concept to emphasise that the Scrum Team is a single cohesive unit.

### Product Owner

The Product Owner is accountable for maximising the value of the product and for managing the Product Backlog. Specific accountabilities include:

- Developing and explicitly communicating the Product Goal
- Creating and ordering Product Backlog items
- Ensuring the Product Backlog is transparent, visible, and understood

The Product Owner is one person, not a committee. Stakeholders may influence the Product Backlog, but the Product Owner makes the final call on ordering. Overriding the Product Owner's decisions undermines accountability and is a common source of team dysfunction.

### Scrum Master

The Scrum Master is accountable for the Scrum Team's effectiveness. This is a service role, not a managerial one. The Scrum Master serves the Scrum Team by coaching in self-management and cross-functionality, removing impediments, and ensuring all Scrum events take place and are productive.

The Scrum Master also serves the organisation by leading, training, and coaching in Scrum adoption and by helping employees understand how to interact with the Scrum Team to maximise value.

A common anti-pattern is treating the Scrum Master as a project manager who assigns tasks and tracks individual velocity. This replaces self-management with command-and-control, which directly contradicts Scrum's intent.

### Developers

Developers are the people in the Scrum Team who are committed to creating any aspect of a usable Increment each Sprint. The specific skills required depend on the domain - a software team includes engineers and testers; a hardware team might include mechanical engineers. The Scrum Guide is intentionally silent on specific job titles.

Developers are self-managing: they decide internally how to accomplish the work, who does what, and how to respond to emerging technical constraints. No one outside the Scrum Team should tell Developers how to turn Product Backlog items into Increments of value.

## Events

Scrum defines five events. Each event is both an opportunity to inspect and adapt and a formal touchpoint that creates regularity and minimises the need for unscheduled meetings.

### The Sprint

The Sprint is the heartbeat of Scrum - a fixed-length event of one month or less during which a usable Increment is created. Sprints have consistent durations throughout the development effort. A new Sprint begins immediately after the conclusion of the previous one.

Sprints are not cancelled because of difficulty. The Product Owner may cancel a Sprint if the Sprint Goal becomes obsolete, but this is rare and represents a significant disruption. The stability of the Sprint creates a predictable cadence that allows planning, commitment, and meaningful inspection.

### Sprint Planning

Sprint Planning initiates the Sprint. The entire Scrum Team collaborates to define:

- **Why** is this Sprint valuable? (The Sprint Goal)
- **What** can be done this Sprint? (Selected Product Backlog items)
- **How** will the chosen work get done? (The plan - decomposed into tasks)

Sprint Planning is time-boxed to eight hours for a one-month Sprint (shorter for shorter Sprints). The Sprint Goal is a commitment by the Developers to deliver a coherent outcome, not simply a list of items to complete.

### Daily Scrum

The Daily Scrum is a fifteen-minute event for the Developers of the Scrum Team. It is held at the same time and place every working day of the Sprint. Its purpose is to inspect progress toward the Sprint Goal and adapt the Sprint Backlog as necessary.

The 2020 Scrum Guide removed the classic three-question format ("What did I do yesterday? What will I do today? What is in my way?") as a mandatory structure. Teams may use any structure that achieves the goal. The three questions remain a useful default for teams without a preferred alternative.

The Daily Scrum is not a status report for managers. Its audience is the Developers; managers and stakeholders who attend should observe, not direct.

### Sprint Review

The Sprint Review is held at the end of the Sprint to inspect the outcome and determine future adaptations. The Scrum Team presents the results of their work to key stakeholders, and progress toward the Product Goal is discussed.

The Sprint Review is a working session, not a demo presentation. Stakeholders and the Scrum Team collaborate on what to do next. The Product Backlog may be adjusted in response to the discussion.

### Sprint Retrospective

The Sprint Retrospective concludes the Sprint. The Scrum Team inspects how the last Sprint went - individuals, interactions, processes, tools, and Definition of Done - and identifies improvements to enact in the next Sprint.

The retrospective is where Scrum's adaptation pillar is most directly applied to the team's own process. A team that runs retrospectives but makes no changes is treating them as a ritual rather than a mechanism for improvement.

## Artifacts

### Product Backlog

The Product Backlog is an ordered list of everything that might be needed to improve the product. It is the single source of work undertaken by the Scrum Team. Items at the top of the backlog are more refined and smaller; items lower in the backlog are larger and less well understood.

The commitment associated with the Product Backlog is the **Product Goal** - a long-term objective for the Scrum Team that provides context for planning.

### Sprint Backlog

The Sprint Backlog is composed of the Sprint Goal (the why), the set of Product Backlog items selected for the Sprint (the what), and an actionable plan for delivering the Increment (the how). It is updated throughout the Sprint as more is learned. The Sprint Backlog is owned by the Developers.

### Increment

An Increment is a concrete step toward the Product Goal. Each Increment is additive to all prior Increments, thoroughly verified, and usable. Multiple Increments may be created within a Sprint. The sum of Increments is presented at the Sprint Review.

The commitment associated with each Increment is the **Definition of Done**.

## Definition of Done

The Definition of Done is a formal description of the state an Increment must reach to be considered complete. It creates transparency and ensures a shared understanding of what "done" means.

A typical Definition of Done for a software team might include:

```
Definition of Done - Example
- Code reviewed by at least one other Developer
- All automated tests pass (unit, integration, end-to-end)
- New code covered by unit tests (minimum 80% line coverage)
- No known critical or high-severity defects
- Security scanning completed with no new high-severity findings
- Feature flags configured and documented
- Deployed to staging environment and verified
- Product Owner has accepted the item
```

If an item does not meet the Definition of Done at the end of the Sprint, it is returned to the Product Backlog. It is not marked as done and not included in the Increment. Violating this rule - shipping items that are "mostly done" - destroys transparency and accumulates undisclosed technical debt.

## Common Anti-Patterns

**Cargo cult Scrum.** Teams perform the ceremonies (standups, retrospectives, sprint reviews) but ignore the principles. Daily standups become status meetings for managers; retrospectives produce no action items; the Definition of Done is aspirational rather than enforced. The rituals exist but the empirical process control does not.

**Zombie Scrum.** Teams go through the motions of Scrum without any energy or purpose. Sprints complete, velocity is tracked, but no one is certain what problem the product is solving or whether the work creates value. Zombie Scrum often indicates a disconnected Product Owner who cannot communicate a meaningful Product Goal.

**Sprint zero** (indefinitely extended). Teams use a "sprint zero" for setup and architecture work, then extend it repeatedly to avoid committing to a delivery cadence. The Sprint zero concept is not in the Scrum Guide. Setup work should be done within regular Sprints, with an understanding that early Sprints may produce less visible output.

**Scrum-but.** Teams say "we do Scrum, but without retrospectives" or "we do Scrum, but the Product Owner doesn't attend Sprint Reviews." Each "but" removes a feedback loop. Scrum's parts are designed as an integrated system; removing elements degrades the whole.

**Treating velocity as a target.** Velocity (the sum of story points completed per Sprint) is a planning tool, not a performance metric. Pressuring teams to increase velocity incentivises inflating estimates, cutting quality, and shipping items that do not meet the Definition of Done.

## Scrum in Practice: A Sprint Cycle

```
Day 1: Sprint Planning (up to 8 hours)
  - Team selects items from Product Backlog
  - Sprint Goal is defined
  - Items are decomposed into tasks

Days 1-9: Sprint Execution
  - Daily Scrum each day (15 minutes)
  - Developers self-organise around the Sprint Backlog
  - Scrum Master removes impediments as they arise
  - Product Owner is available for clarification

Day 10: Sprint Review (up to 4 hours)
  - Increment is demonstrated to stakeholders
  - Product Backlog is updated based on feedback

Day 10: Sprint Retrospective (up to 3 hours)
  - Team identifies process improvements
  - At least one improvement is added to the next Sprint Backlog

Day 11: Sprint Planning (next Sprint begins)
```

## Relationship to Other Frameworks

Scrum is a framework, not a complete methodology. Many teams combine Scrum with engineering practices from Extreme Programming (test-driven development, pair programming, continuous integration) to address the technical excellence that Scrum itself does not prescribe.

Scrum is grounded in the values and principles of the [Agile Manifesto](/software-engineering/agile-manifesto). For the predecessor model that Scrum largely supplanted in commercial software development, see [Waterfall Methodology](/software-engineering/waterfall-methodology).

## Sources

- Schwaber, K., and Sutherland, J. *The Scrum Guide* (2020). scrumguides.org.
- Schwaber, K., and Sutherland, J. (1995). "SCRUM Development Process." *OOPSLA Business Object Design and Implementation Workshop*.
- Sutherland, J. (2014). *Scrum: The Art of Doing Twice the Work in Half the Time*. Crown Business.
- Lacey, M. (2012). *The Scrum Field Guide*. Addison-Wesley.
- Verwijs, C., and Russo, D. (2022). "The Scrum Anti-Patterns Guide." Zombie Scrum Survivors.
