---
title: "Kanban for Software Development"
date: 2026-03-26
draft: false
tags: ["software-engineering", "project-management", "kanban", "agile", "lean", "methodology"]
categories: ["Software Engineering"]
last_updated: 2026-05-30
---

Kanban is a method for managing and improving knowledge work that David J. Anderson developed by adapting principles from the Toyota Production System (TPS) for software development teams. Anderson formalized this approach between 2004 and 2007 while working at Microsoft and Corbis, and published his synthesis in *Kanban: Successful Evolutionary Change for Your Technology Business* in 2010.

The word "kanban" is Japanese for "signal card" or "visual card." In Toyota's manufacturing system, physical kanban cards authorized the production or movement of parts, preventing overproduction by making the entire production system visible and self-regulating. Anderson's insight was that the same principles could govern the flow of work items through software development stages.

Unlike XP or Scrum, Kanban does not prescribe roles, ceremonies, or fixed-length iterations. It is a method that layers on top of an existing workflow rather than replacing it. This makes adoption easier in some contexts - teams can start where they are - but it also means that Kanban provides fewer explicit structures for teams that need guidance on how to organize their work.

## The Six Core Practices

Anderson's Kanban method is defined by six practices, which he later called the "general practices" to distinguish them from the change management principles.

### 1. Visualize the Workflow

Make the work visible. A Kanban board represents the stages through which a work item passes from start to completion. Each column represents a stage; each card represents a work item. The board reveals the current state of all work simultaneously: what is in progress, what is waiting, what is blocked, and where items tend to accumulate.

Visualization alone produces insight. Before implementing any other change, teams typically discover that they have far more work in progress than they realized, that work is clustered in unexpected places, and that certain stages are consistently overloaded. Visualization is the prerequisite for all subsequent improvement.

### 2. Limit Work in Progress

WIP limits are explicit constraints on how many items can be in any given stage at one time. When a stage reaches its limit, no new work can enter until an existing item moves forward. Developers who would otherwise pull new work must instead help clear the bottleneck.

The rationale for WIP limits comes from queuing theory. Little's Law, formulated by John D.C. Little in 1961 and proven mathematically in his 1961 paper, states that in a stable system:

**Lead Time = WIP / Throughput**

This relationship has a direct implication for software teams: if throughput is fixed, reducing WIP reduces lead time proportionally. A team that has 20 items in progress and completes 5 items per week has an average lead time of 4 weeks. The same team with 10 items in progress maintains a 2-week average lead time. The work does not get done faster per item, but items spend less time waiting, which from the customer's perspective means faster delivery.

WIP limits also expose systemic problems that would otherwise be hidden. When a limit is hit and work stops, the blockage is visible. The team must address root causes rather than simply absorbing more work.

### 3. Manage Flow

Observe and measure how work moves through the system. Flow is characterized by smoothness and predictability - items moving steadily from start to completion without long waits, returns, or blockages. Interruptions to flow signal problems: unclear requirements, technical dependencies, skill gaps, or stages with insufficient capacity.

Managing flow means treating the system's throughput as the primary optimization target rather than individual developer utilization. High individual utilization often produces low throughput because it eliminates slack, causing bottlenecks to cascade. A well-flowing system has some idle capacity at most stages most of the time.

### 4. Make Policies Explicit

The rules governing how work flows through the system should be written down and visible to everyone. What does "done" mean for each stage? What criteria must a work item meet to be pulled into the next stage? What happens when a high-priority item arrives? How are blocked items handled?

Explicit policies eliminate decision ambiguity and enable consistent behavior across team members. They also enable improvement: you cannot argue about changing a policy that was never written down. Making policies explicit often reveals that team members had different implicit assumptions about how the process worked.

### 5. Implement Feedback Loops

Regular meetings and reviews create the feedback loops that allow a Kanban system to self-correct. Anderson's method specifies several standard cadences: daily standup focused on flow rather than individual status, queue replenishment meetings to select upcoming work, retrospectives to improve the process, and service delivery reviews with stakeholders. These are not ceremonies in the Scrum sense - they are feedback loops operating at different timescales.

### 6. Improve Collaboratively and Evolve Experimentally

Change the system based on evidence, using models and the scientific method. Do not implement changes based on intuition or authority alone. Form a hypothesis, make a small change, measure the effect, and decide whether to keep, modify, or reverse the change. Improvement is continuous and evolutionary rather than periodic and revolutionary.

## Kanban Board Structure

A basic Kanban board has columns representing workflow stages and cards representing work items. A minimal software board might have: Backlog, Selected for Development, In Development, In Review, In Testing, Done. More mature boards often add buffer columns ("Ready for Review") between active stages to distinguish waiting from active work, making the distinction between queue time and processing time explicit.

Each column with active work typically shows its WIP limit, often written in the column header. Cards carry relevant information - title, requester, type of work, any blocking issues - and may use color coding to distinguish work types or priorities.

## Cumulative Flow Diagrams

The cumulative flow diagram (CFD) is the primary analytical tool for Kanban teams. A CFD plots the cumulative count of work items in each stage over time, producing a set of stacked area bands. Reading a CFD correctly reveals system behavior that is difficult to see from daily snapshots:

- **Band width** at any point represents the amount of WIP in that stage at that time.
- **Vertical distance** between the top and bottom of the chart represents total WIP and correlates with average lead time (from Little's Law).
- **Horizontal distance** between when an item enters the system and when it exits represents the actual lead time for items that entered at that point.
- **Widening bands** indicate work is accumulating in a stage - a bottleneck is forming.
- **Narrowing bands** indicate a stage is clearing faster than it is receiving work.

A healthy CFD shows bands of consistent width moving steadily upward at consistent slopes. Deviations from this pattern are signals worth investigating.

## Kanban vs. Scrum

Scrum and Kanban address similar problems with different structures. The comparison is useful because many teams choose between them or combine elements of both.

Scrum organizes work into fixed-length sprints (typically two weeks) with defined start and end ceremonies. Kanban uses a continuous flow model with no fixed iterations. Scrum defines three explicit roles: Product Owner, Scrum Master, and Development Team. Kanban prescribes no roles. Scrum has four ceremonies (Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective) as core artifacts of the framework. Kanban has no mandatory ceremonies, though it recommends regular cadences.

Scrum's commitment-based model - the team commits to completing a defined scope in a sprint - works well when work can be estimated, sized, and batched into sprints. Kanban's flow-based model works better when work arrives unpredictably, varies widely in size, or needs to be delivered as soon as it is ready rather than at sprint boundaries.

The two are not mutually exclusive. "Scrumban" - a hybrid that takes Scrum's planning structures and adds Kanban's WIP limits and flow metrics - is common in practice and was described by Corey Ladas in 2008.

## When to Use Kanban

Kanban fits well in specific contexts that do not suit iteration-based frameworks.

**Support and operations teams** handle incoming work that is unpredictable in timing and size. A sprint commitment is meaningless when interruptions arrive continuously. Kanban accommodates this naturally - new work is pulled when capacity exists.

**Continuous delivery environments** where software is released continuously rather than in discrete versions benefit from Kanban's flow model. There is no natural sprint boundary aligned with a release.

**Maintenance and sustaining engineering** work tends to be interrupt-driven and varied in scope, making sprint planning difficult. Kanban's pull-based system handles this better than a push-based iteration model.

**Teams with existing processes** that need improvement without disruption can adopt Kanban incrementally. Because Kanban starts with the current workflow and improves it, the organizational cost of adoption is lower than starting a new methodology from scratch.

Teams building new products with uncertain requirements and a need for sustained planning cadence often find Scrum or XP a better fit. Kanban's strength is optimizing flow in an existing, understood process, not providing a complete framework for a team that has no existing process.
