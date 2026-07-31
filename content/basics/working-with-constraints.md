---
title: "Working with Constraints"
description: "Time, budget, scope—you can't have everything. Learn to make tradeoffs, work within limits, and use constraints as a creative advantage rather than a frustration."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, product, planning, constraints, tradeoffs, decision-making]
faqs:
  - question: "What if the constraints are unrealistic?"
    answer: "Push back with data. 'We can build X in the timeline, or Y in the budget, but not both.' Make tradeoffs visible. If constraints can't change, scope must."
  - question: "How do I handle changing constraints?"
    answer: "Constraints change—that's normal. When they do, revisit scope and priorities. Don't pretend you can absorb new constraints without adjusting something else."
  - question: "Are constraints always bad?"
    answer: "No. Constraints force creativity, focus decisions, and prevent scope creep. A blank canvas is often harder than a constrained one. Embrace reasonable limits."
last_updated: 2026-07-30
---

{{< quickanswer >}}
Every project has constraints: time, money, people, technology. You can't change all constraints, but you can choose tradeoffs. The iron triangle (scope, time, cost) says you can optimize two, not three. Pick what matters, accept the consequences, and use constraints to force focus rather than fighting them.
{{< /quickanswer >}}

## The iron triangle

```
           SCOPE
            /\
           /  \
          /    \
         /      \
        /        \
       /__________\
     TIME        COST
```

**You can pick two**:
- **Fixed scope + time**: Cost increases (more people, tools)
- **Fixed scope + cost**: Time increases (takes longer)
- **Fixed time + cost**: Scope decreases (build less)

You cannot have fixed scope, fixed time, AND fixed cost. Something has to flex.

### The conversation

**Unrealistic**: "Build everything, by Friday, with no budget"

**Realistic**: "Given your budget and timeline, here's what we can build. If you need more scope, we need more time or money. Which constraint can flex?"

---

## Types of constraints

### Time constraints

**Hard deadlines**: Events, regulatory requirements, contractual obligations
**Soft deadlines**: Goals, preferences, hopes

Hard deadlines don't move. Soft deadlines can negotiate.

### Budget constraints

**Financial limits**: How much money is available
**Resource limits**: How many people, how much compute, what tools

### Technical constraints

**Existing systems**: Must integrate with legacy database
**Technology choices**: Must use company's approved stack
**Performance requirements**: Must handle X requests/second

### Capability constraints

**Skills**: What you know how to build
**Learning curve**: What you can learn in the available time
**Team size**: Solo builder vs team

---

## Working with time constraints

### The deadline is fixed

When the deadline can't move:

1. **List everything** you planned to build
2. **Rank by value** to users
3. **Cut from the bottom** until the timeline fits
4. **Communicate** what's in and what's out

```
Original plan: 12 features
Timeline allows: 6 features

Top 6 (building):
✓ Core feature A
✓ Core feature B
✓ User authentication
✓ Basic settings
✓ Payment integration
✓ Email notifications

Deferred (not building):
✗ Advanced reporting
✗ Team features
✗ API access
✗ Mobile app
✗ Dark mode
✗ Custom branding
```

### Time-boxing

Set time limits for decisions and work:

```
Research: 2 days max, then decide
Design: 1 week, then build
Feature X: 3 days, then ship what's done
Bug investigation: 4 hours, then escalate
```

Time limits prevent perfectionism and scope creep.

### The 80% rule

80% of value often comes from 20% of features:

```
Feature: Full-text search
80% version: Basic keyword matching (1 day)
100% version: Fuzzy search, filters, ranking (2 weeks)

Ship 80% first. Add the rest if users need it.
```

---

## Working with budget constraints

### Fixed budget, flexible scope

When money is limited:

1. **Price out the ideal scope**
2. **Find the gap** between ideal and available
3. **Cut features** (not quality) to fit
4. **Propose phases** if full scope is needed eventually

```
Ideal scope: $50,000
Available budget: $30,000
Gap: $20,000

Options:
A. Cut features X, Y, Z → Fits budget
B. Phase 1 ($30K) now, Phase 2 ($20K) later
C. Reduce polish, keep features → Risky
```

### Budget optimization

| Approach | Tradeoff |
|----------|----------|
| Use open source | More setup, less support |
| Use managed services | Easier, but usage costs |
| Build vs buy | Time vs money |
| MVP first | Less upfront, iterate later |
| Reduce polish | Faster, rougher edges |

### The hidden costs

Budget isn't just development:
- Hosting and infrastructure
- Third-party services
- Maintenance over time
- Support and documentation

Plan for ongoing costs, not just build costs.

---

## Working with technical constraints

### Legacy system integration

When you must work with existing systems:

1. **Understand the constraints** fully (APIs, data formats, limitations)
2. **Design around them** rather than fighting them
3. **Isolate dependencies** so legacy doesn't infect new code
4. **Plan for eventual migration** if legacy will be replaced

```
Constraint: Must use legacy SOAP API

Approach:
- Create adapter layer that converts REST ↔ SOAP
- New code talks to adapter
- Adapter talks to legacy
- When legacy is replaced, only adapter changes
```

### Technology constraints

When stack is mandated:

```
Constraint: Must use company-approved technologies
- Java backend (no Node.js)
- Oracle database (no Postgres)
- Angular frontend (no React)

Response:
1. Accept the constraints
2. Design within them
3. Document why alternatives would be better (for future)
4. Don't complain—build
```

Fighting approved stacks wastes energy. Work with what you have.

### Performance constraints

When performance requirements are strict:

```
Constraint: Page must load in < 2 seconds

Implications:
- Server-side rendering preferred
- Image optimization required
- Code splitting necessary
- CDN required
- Database queries must be fast

Plan:
1. Set up monitoring from day one
2. Build with performance in mind
3. Test against constraint regularly
4. Optimize bottlenecks as you find them
```

---

## Making tradeoffs visible

### The tradeoff matrix

When presenting options:

| Option | Time | Cost | Scope | Risk |
|--------|------|------|-------|------|
| A | 8 weeks | $40K | Full | Medium |
| B | 4 weeks | $40K | 70% | Low |
| C | 8 weeks | $25K | 70% | Medium |
| D | 4 weeks | $25K | 50% | Low |

Let stakeholders see the tradeoffs and choose.

### The "yes, and" response

When asked for something that conflicts with constraints:

**Bad**: "No, we can't do that"

**Good**: "Yes, we can do that. Here's what it would require:
- Additional 2 weeks
- OR cutting features X and Y
- OR additional $10K budget

Which works for you?"

Make the cost visible, let them decide.

### The scope lever

When constraints tighten, scope is usually the only lever:

```
New constraint: Deadline moved up 3 weeks

Options:
A. Cut these features: [list]
B. Ship partial version, complete later
C. Reduce quality (not recommended)

I recommend option A because [reason].
```

---

## Constraints as advantages

### Constraints force focus

Without limits, you build everything. With limits, you build what matters.

```
Unlimited time: Build 20 features, polish endlessly
Limited time: Build 5 features that really matter
```

### Constraints spark creativity

Limitations breed invention:

- "We can't afford X service" → Build simpler alternative
- "We don't have that skill" → Find a different approach
- "The API doesn't support that" → Design around it

### Constraints prevent perfectionism

You can always make something better. Constraints say "done."

```
Without constraint: "Let's add one more feature"
With constraint: "Deadline is tomorrow, ship what we have"
```

---

## The constraint conversation

### With yourself (solo builder)

```
I have: 
- 20 hours this week
- $50/month for services
- My current skills

I want to build: [list]

What's realistic?
- Core feature: 12 hours ✓
- User accounts: 6 hours ✓
- Nice-to-have: 8 hours ✗ (doesn't fit)

Decision: Build core + accounts. Nice-to-have next week.
```

### With stakeholders

```
You've asked for X, Y, and Z by [date].

My assessment:
- X: 2 weeks
- Y: 3 weeks  
- Z: 1 week
Total: 6 weeks

You have: 4 weeks

Options:
1. Build X and Z (fits timeline, most critical)
2. Build all three, extend deadline to 6 weeks
3. Add resources, attempt all three (adds cost and risk)

Which priority is most important to you?
```

### When constraints conflict

```
Stakeholder A wants: Large scope
Stakeholder B wants: Low cost
Stakeholder C wants: Fast delivery

These conflict. Someone needs to prioritize.

My recommendation: [option] because [reason].

Can you align on which constraint is most flexible?
```

---

## Common constraint mistakes

### 1. Ignoring constraints

Pretending limits don't exist leads to missed deadlines and blown budgets.

**Fix**: Acknowledge constraints early and plan around them.

### 2. Fighting constraints

Spending energy arguing against fixed constraints wastes time.

**Fix**: Accept what's fixed, negotiate what's flexible.

### 3. Hidden constraints

Discovering constraints late causes rework.

**Fix**: Ask about constraints upfront. What's the timeline? Budget? Technical requirements? Non-negotiables?

### 4. All constraints are equal

Some constraints are harder than others.

**Fix**: Identify which constraints are truly fixed vs. negotiable. Focus negotiation energy on the flexible ones.

### 5. Not adjusting when constraints change

When constraints change, plans must too.

**Fix**: Revisit scope when constraints change. Don't absorb new constraints without adjusting something.

---

## The honest take

**Constraints are normal.** Every project has them. The question isn't whether you have constraints but how you work with them.

**Scope is the safest lever.** Cutting features hurts less than cutting quality, missing deadlines, or blowing budgets.

**Make tradeoffs visible.** Don't absorb impossible asks. Show the tradeoffs and let stakeholders choose.

**Constraints help more than hurt.** Limits force focus, creativity, and completion. Embrace them.

## Further reading

- [Prioritization frameworks](/basics/prioritization-frameworks/): Deciding what fits in constraints
- [The art of done](/basics/the-art-of-done/): Shipping within limits
- [Scope creep and feature bloat](/basics/scope-creep-and-feature-bloat/): Protecting scope
- [Technical decision making](/basics/technical-decision-making/): Choosing within constraints
