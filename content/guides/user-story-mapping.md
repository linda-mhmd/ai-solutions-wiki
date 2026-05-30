---
title: "User Story Mapping - Visualising the User Journey"
description: "A complete guide to User Story Mapping, the technique Jeff Patton developed to replace flat backlogs with a two-dimensional view of the user journey that preserves context and drives better release slicing."
date: 2026-05-28
categories: [Guides]
tags: [open-practice-library, product-management, discovery, agile, user-stories, sprint-planning]
related:
  - guides/impact-mapping
  - guides/event-storming
  - guides/lean-canvas
  - guides/build-measure-learn
last_updated: 2026-05-30
---

A flat backlog is a list of stories sorted by priority. The problem with a flat backlog is that it destroys context. When a story sits in a list, you cannot tell which part of the user's day it belongs to, which other stories it depends on, or what a coherent slice of value looks like across several stories. User Story Mapping, developed by Jeff Patton, solves this by arranging stories on a two-dimensional canvas: the user journey runs left to right, and story priority runs top to bottom.

The result is a map you can actually navigate, and one that makes release planning a spatial exercise rather than a spreadsheet argument.

<figure class="bz-figure">
  <img src="/img/wardrobe/polaroid-wall-git-commits.png" alt="A cork board covered in Polaroid photographs of outfits, each pinned with a deep red pin: representing snapshots of state arranged on a wall, like stories mapped to a user journey." loading="lazy">
  <figcaption>Stories on a wall. Like Polaroids pinned in sequence, each story captures a moment in the user's journey: visible, arrangeable, and removable when the plan changes.</figcaption>
</figure>

## The Structure of a Story Map

A story map has two axes and a series of horizontal slice lines.

**The spine (horizontal).** The top row of the map is the user journey, written as a series of high-level activities in the order a user performs them. These are sometimes called "epics" or "backbone activities" but the key characteristic is that they describe what the user does, not what the system does. For a marketplace: Browse → Search → List an item → Negotiate → Pay → Leave feedback.

**The ribs (vertical).** Beneath each activity, stories hang in vertical columns. The stories closer to the top are higher priority: either more important to the user or simpler to implement. Stories lower down are still valuable but can wait for later releases.

**Slice lines (horizontal cuts).** A horizontal line drawn across the entire map creates a release. Everything above the line is in scope for that release; everything below is deferred. The first slice is the MVP. The second is V2. And so on.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Spine</span>
    <span class="bz-flow-step-name">Activities (left to right)</span>
    <span class="bz-flow-step-desc">The user journey written as high-level steps: Browse → Search → List → Pay → Review. These never move.</span>
  </div>
  <div class="bz-flow-arrow">↓</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Ribs</span>
    <span class="bz-flow-step-name">Stories (top to bottom per activity)</span>
    <span class="bz-flow-step-desc">User stories hanging beneath each activity, ordered by priority. Top stories are MVP candidates; lower stories are future enhancements.</span>
  </div>
  <div class="bz-flow-arrow">↓</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Slice</span>
    <span class="bz-flow-step-name">Horizontal cut = release</span>
    <span class="bz-flow-step-desc">Draw a line across the map. Everything above is in scope for this release. The first cut is your MVP; each subsequent cut adds a version.</span>
  </div>
  <div class="bz-flow-arrow">↓</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Validate</span>
    <span class="bz-flow-step-name">Check each slice for coherence</span>
    <span class="bz-flow-step-desc">A valid slice delivers a complete, working experience for the user. If a user cannot complete their journey with only the stories above the line, adjust the cut.</span>
  </div>
</div>

## The Problem It Solves

Flat backlogs optimise for one thing: making the next story easy to find. They are terrible at:

- Showing how stories relate to each other across the user journey
- Revealing gaps where entire parts of the user experience have no stories
- Making release decisions, "what is the smallest thing we can ship that is still useful?"
- Onboarding new team members who need to understand the product scope

A story map answers all of these at a glance. It also makes scope conversations with stakeholders concrete: instead of debating whether story 47 should be above story 52 in the backlog, you can point to the map and ask whether the slice line is in the right place.

## When to Use It

User Story Mapping fits naturally after Impact Mapping has established what you are building and why. It is the right tool at the start of a product initiative, at the start of a quarter when you are planning a new release, or any time the team has lost the thread of how individual stories connect to user value.

It is not a substitute for Impact Mapping, the map tells you the How and the What, but Impact Mapping first ensures you have the right Why.

## How to Run the Session

**Preparation (30 minutes before the session).** Gather all participants: product owner, engineers, a designer if available, and at least one person with recent direct user contact. Prepare sticky notes in two colours: one for activities (the spine), one for stories (the ribs). Book 2-3 hours for a new product; 90 minutes for a feature-level map. Use a physical wall if possible: the spatial aspect is harder to replicate in digital tools, though Miro and FigJam both work.

**Step 1: Write the user narrative (20 minutes).** Ask: "Walk me through what a user does from the moment they arrive until they have achieved their goal." Write each high-level step on a spine-colour sticky note and pin them in sequence across the top of the wall. Keep these at a high level: "Search" not "Types query into search box." Aim for 6-10 activities.

**Step 2: Add stories beneath each activity (30 minutes).** For each activity, write the user stories that fall under it. Use the standard format or keep them short. Pin them below the activity in no particular order yet. Do not worry about priority at this stage: get everything out of people's heads first.

**Step 3: Order by priority (20 minutes).** Within each activity column, reorder the stories vertically. Higher priority stories move to the top. The team will disagree: that is the point. The conversation about priority is the value, not the final order.

**Step 4: Draw release slices (20 minutes).** Ask: "What is the minimum set of stories that lets a user complete the whole journey, even if badly?" Draw a line across the map at that point. This is your MVP. Then ask: "What do we add next to make the experience noticeably better?" Draw a second line. That is V2. Repeat for V3.

**Step 5: Review each slice for coherence (10 minutes).** For each release slice, walk the user journey from left to right using only the stories above the line. Can a real user complete the journey? If there is a gap: an activity with no stories above the line: the slice is not coherent. Either add a story or move the slice line.

## Common Mistakes

**Making the spine too granular.** If your backbone activities read like user stories ("User types search query"), you are operating at the wrong level. The spine should be readable by a non-technical stakeholder in 30 seconds.

**Starting with priority.** Trying to order stories before they are all on the wall leads to premature commitment and missed coverage. Get everything out first.

**Skipping the slice review.** Teams often draw the slice line and move on without checking whether the slice actually delivers a coherent user experience. An MVP that leaves users stranded halfway through the journey is not an MVP.

**Building the map alone.** A story map built by one person and presented to the team is a deliverable, not a practice. The value comes from the conversation during the session.

## Connecting to Other Practices

| Before Story Mapping | After Story Mapping |
|---|---|
| Impact Mapping, establishes the goal and the actors | Sprint planning, each sprint draws from the top of the current release slice |
| Event Storming, surfaces the domain model and the business process | Definition of Done, the slice line gives context for what "done" means for a release |
| User research, provides the raw user journeys | Backlog refinement, stories from the map enter the backlog with context attached |

## Further Reading

- [Impact Mapping](/guides/impact-mapping/): run this first to establish the goal before mapping stories
- [Event Storming](/guides/event-storming/): use this to discover the domain model that shapes your story map
- [Sprint Planning for AI Teams](/guides/sprint-planning-ai/): how to pull from a story map into sprint commitments
- [Agile for AI Projects](/guides/agile-for-ai-projects/): adapting these practices to the realities of ML work
- [Open Practice Library overview](/guides/open-practice-library/): the broader collection of practices these methods belong to
- [Backlog Prioritisation for AI](/guides/backlog-prioritization-ai/): prioritisation techniques for AI-specific backlogs
