---
title: "Agile for Solo Builders"
description: "Lightweight agile practices for individuals and tiny teams. Sprints, backlogs, and retrospectives without the corporate overhead."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, agile, product, planning, productivity, solo]
faqs:
  - question: "Isn't agile for teams? Can I really use it solo?"
    answer: "The core ideas—working in short cycles, regular reflection, adapting to feedback—work for anyone. Skip the meetings that need multiple people. Keep the practices that help you focus and improve."
  - question: "How long should my sprints be?"
    answer: "One week is usually right for solo builders. Long enough to finish something meaningful, short enough to course-correct quickly. Some prefer 2-week cycles for bigger projects. Try one and adjust."
  - question: "This still sounds like overhead. Is it worth it?"
    answer: "The goal is less overhead, not more. A 5-minute planning session saves hours of working on the wrong thing. A 10-minute retrospective helps you not repeat mistakes. If a practice doesn't help, drop it."
last_updated: 2026-07-30
---

{{< quickanswer >}}
Agile for solo builders: work in 1-week sprints with a clear goal, maintain a prioritized backlog of work, and reflect weekly on what's working. Skip the ceremonies designed for teams. Keep the practices that help you focus: timeboxing, small batches, regular shipping, and continuous improvement.
{{< /quickanswer >}}

## What to keep, what to skip

### Keep

- **Short cycles (sprints)**: Work in focused 1-2 week periods
- **Backlog**: Prioritized list of what to build
- **Sprint goal**: One clear focus per cycle
- **Definition of done**: Know when something is actually complete
- **Retrospectives**: Regular reflection on what's working
- **Working software**: Ship frequently, not just "progress"

### Skip

- **Daily standups**: No team to stand up with
- **Story point estimation**: For solo work, "small/medium/large" is enough
- **Velocity tracking**: You know your own pace
- **Sprint planning meetings**: 5 minutes of thinking replaces an hour meeting
- **Scrum master**: You're managing yourself

## The solo sprint

### Weekly rhythm

```
Monday: Plan the week (10 min)
├── Review backlog
├── Pick 3-5 things to complete
├── Write the sprint goal
│
Tuesday-Thursday: Build
├── Focus on sprint items
├── Ship small pieces daily if possible
│
Friday: Review and reflect (15 min)
├── What got done?
├── What didn't? Why?
├── Update backlog
├── What to improve next week?
│
Weekend: Off (seriously)
```

### Planning (5-10 minutes)

Look at your backlog. Ask:
1. What's the most important thing to ship this week?
2. What can I realistically complete?
3. What's my sprint goal in one sentence?

**Sprint goal example**: "Users can create and view tasks"

Pick 3-5 items that achieve the goal. That's your sprint.

### During the sprint

- Focus on sprint items first, before other work
- If something takes longer than expected, cut scope—don't extend the sprint
- New ideas go to the backlog, not into the current sprint
- Ship something every day if possible (even small)

### End of sprint (10-15 minutes)

**Review**: What shipped? Demo it to yourself. Does it work?

**Retrospective**: 
- What went well?
- What didn't go well?
- What will I do differently?

Write down one thing to try next sprint.

## The backlog

A prioritized list of everything you might build.

### Structure

```
Backlog:
1. [Must] User can create tasks ← Doing this sprint
2. [Must] User can complete tasks ← Doing this sprint
3. [Should] User can edit tasks ← Maybe this sprint
4. [Should] User can delete tasks
5. [Could] Tasks have due dates
6. [Could] Filter by status
7. [Won't] Team collaboration ← Not now
...
```

### Keeping it healthy

- **Prioritize ruthlessly**: Top items are what you'll build soonest
- **Groom regularly**: Remove things you'll never do
- **Keep it visible**: You should see it daily
- **One source of truth**: Don't keep TODOs in multiple places

### Tools

- **Simple**: Text file, Notion page, GitHub issues
- **Kanban**: Trello, Linear, GitHub Projects
- **Whatever you'll actually use**

## Timeboxing

Set a fixed time for tasks. When time's up, you're done (or you consciously extend).

### Why it helps

- Prevents perfectionism spiraling
- Forces decisions about what's essential
- Creates natural review points
- Makes progress visible

### How to do it

```
"I will spend 2 hours on the login form"

After 2 hours:
- Is it done? Ship it.
- Not done but close? 30 more minutes.
- Way more work than expected? Stop, reassess, maybe simplify.
```

### Pomodoro variation

25 minutes work, 5 minute break. After 4 cycles, longer break.

Good for: Deep focus work, avoiding burnout, staying fresh.

## Definition of done

Know when something is actually complete, not just "mostly works."

### Example definition

A feature is done when:
- [ ] Code is written and works
- [ ] It handles the main error cases
- [ ] It's committed to main branch
- [ ] It's deployed (or ready to deploy)
- [ ] You've tested it yourself
- [ ] Documentation updated (if needed)

### Why it matters

Without this, "done" means different things at different times. You'll think you're making progress while accumulating half-finished work.

## Retrospectives (solo version)

Weekly reflection to improve how you work.

### Quick format (10 minutes)

Answer three questions:
1. **What worked well?** (Keep doing this)
2. **What didn't work?** (Stop or change this)
3. **What will I try next week?** (One specific action)

### Example

```
Week of Jan 15:

Worked well:
- Morning coding sessions (no interruptions)
- Breaking login into small slices

Didn't work:
- Spent 4 hours on styling that didn't matter
- Didn't ship Monday or Tuesday

Try next week:
- Timebox styling to 1 hour max per feature
- Commit to shipping something by Tuesday
```

### Track over time

Keep a log. After a few weeks, you'll see patterns:
- What consistently works
- What you keep trying to fix (maybe needs a different approach)
- How your productivity changes

## Kanban for solo work

Simple columns for visualizing work:

```
┌──────────────┬──────────────┬──────────────┐
│   Backlog    │   Doing      │    Done      │
├──────────────┼──────────────┼──────────────┤
│ Edit tasks   │ Create task  │ Project setup│
│ Delete tasks │ Complete task│              │
│ Due dates    │              │              │
│ Filters      │              │              │
└──────────────┴──────────────┴──────────────┘
```

**Rules:**
- Limit "Doing" to 2-3 items max
- Move things only when truly done
- If Doing is full, finish something before starting new

## Work-in-progress limits

The fewer things you work on simultaneously, the more you actually complete.

**Common mistake**: Start 5 features, finish 0
**Better approach**: Start 1 feature, finish 1, repeat

### The math

```
5 features, context switching between all:
Week 1: All 20% done
Week 2: All 40% done
Week 3: All 60% done
Week 4: All 80% done
Week 5: All 100% done
→ Nothing ships until week 5

1 feature at a time:
Week 1: Feature 1 done and shipped
Week 2: Feature 2 done and shipped
Week 3: Feature 3 done and shipped
...
→ Something ships every week
```

Shipping early means earlier feedback, earlier value, earlier learning.

## Continuous improvement

Agile is about getting better, not following rules.

### The cycle

```
Plan → Build → Review → Learn → Plan better
```

### Questions to ask regularly

- Am I shipping working software?
- Am I learning from users?
- Am I improving how I work?
- Am I working on the right things?

If any answer is "no," change something.

### Experiment mindset

Treat process changes as experiments:
- "I'll try 30-minute timeboxes this week"
- "I'll do a mini-review after each feature"
- "I'll write the user story before coding"

If it helps, keep it. If not, try something else.

## Common anti-patterns

### 1. Planning without shipping

Spending more time organizing work than doing it. If your backlog is perfect but you haven't shipped in 2 weeks, something's wrong.

### 2. No slack

Scheduling 100% of your time. You need buffer for unexpected issues, learning, and thinking.

### 3. Skipping retrospectives

"I don't have time to reflect." Then you repeat the same mistakes. 10 minutes of reflection can save hours of wasted work.

### 4. Scope creep

Adding things mid-sprint because "it's quick." Put it in the backlog. Protect your focus.

### 5. Never shipping

Always "almost done." Ship ugly, ship incomplete, ship something. You can't improve what doesn't exist.

## Minimum viable agile

If you do nothing else:

1. **Weekly goal**: One sentence describing what you'll ship
2. **Daily shipping**: Commit something working every day
3. **Weekly reflection**: 10 minutes on what to improve

That's it. Add more practices only if they help.

## Further reading

- [How to slice work effectively](/basics/how-to-slice-work-effectively/): Break work into shippable pieces
- [How to write user stories](/basics/how-to-write-user-stories/): Define what you're building
- [Product discovery techniques](/basics/product-discovery-techniques/): Decide what goes in the backlog
- [How to delegate to AI effectively](/basics/how-to-delegate-to-ai-effectively/): Use sprints to manage AI work
