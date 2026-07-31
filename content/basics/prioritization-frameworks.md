---
title: "Prioritization Frameworks"
description: "Decide what to build first. RICE, ICE, MoSCoW, and other frameworks for ranking features when you can't build everything."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, product, planning, decisions, prioritization]
faqs:
  - question: "Which framework should I use?"
    answer: "Start with the simplest one that helps you decide. For solo builders, Impact/Effort is usually enough. Use more structured frameworks (RICE) when you need to justify decisions to others or when gut feel keeps leading you astray."
  - question: "What if everything feels high priority?"
    answer: "Force rank them. If you could only ship one thing, which would it be? Now which would be second? If everything is priority 1, nothing is. The point of prioritization is making hard choices."
  - question: "How do I estimate impact if I don't know yet?"
    answer: "You're guessing either way. Make your assumptions explicit, prioritize based on those guesses, then validate with real users. Adjust priorities as you learn. Perfect upfront prioritization is impossible."
last_updated: 2026-07-30
---

{{< quickanswer >}}
Prioritization frameworks help you decide what to build when you can't build everything. Common approaches: Impact/Effort (quick and visual), RICE scoring (structured with numbers), MoSCoW (categorization), and Cost of Delay (time-sensitive decisions). The framework matters less than consistently applying one—any systematic approach beats gut feel alone.
{{< /quickanswer >}}

## Why prioritize?

You have infinite ideas and limited time. Without prioritization:
- You work on whatever feels urgent today
- Important-but-not-urgent work never happens
- You build features nobody uses
- You never finish anything because you're always starting something new

Prioritization means deciding—consciously—what matters most.

## Impact/Effort matrix

The simplest framework. Plot features on two axes:

```
                High Impact
                    │
    Quick wins ─────┼───── Big bets
    (Do first)      │      (Plan carefully)
                    │
    ────────────────┼────────────────────
       Low Effort   │      High Effort
                    │
    Fill-ins ───────┼───── Money pits
    (Do if time)    │      (Probably don't)
                    │
                Low Impact
```

### How to use it

1. List your features/ideas
2. Estimate impact (user value, business value)
3. Estimate effort (time, complexity)
4. Plot them
5. Work top-left (quick wins) first

### Example

| Feature | Impact | Effort | Quadrant |
|---------|--------|--------|----------|
| Password reset | High | Low | Quick win |
| Dark mode | Low | Low | Fill-in |
| Real-time collaboration | High | High | Big bet |
| Custom themes | Low | High | Money pit |

**Do first**: Password reset
**Plan for later**: Real-time collaboration
**Skip or defer**: Custom themes

## RICE framework

More structured scoring: Reach × Impact × Confidence ÷ Effort

### Components

**Reach**: How many users affected in a time period?
- "500 users per month will use this"

**Impact**: How much does it help each user?
- 3 = Massive impact
- 2 = High
- 1 = Medium
- 0.5 = Low
- 0.25 = Minimal

**Confidence**: How sure are you about reach and impact?
- 100% = High confidence (data-backed)
- 80% = Medium (some data)
- 50% = Low (mostly guessing)

**Effort**: Person-weeks (or hours, or days—be consistent)

### Formula

```
RICE Score = (Reach × Impact × Confidence) / Effort
```

### Example

| Feature | Reach | Impact | Confidence | Effort | Score |
|---------|-------|--------|------------|--------|-------|
| Onboarding flow | 1000 | 2 | 80% | 4 weeks | 400 |
| Export to CSV | 200 | 1 | 100% | 1 week | 200 |
| Mobile app | 500 | 2 | 50% | 12 weeks | 42 |

**Priority order**: Onboarding > Export > Mobile app

### When to use RICE

- Comparing many features
- Need to justify priorities to stakeholders
- Want to reduce gut-feel bias
- Team disagrees on what matters

## ICE framework

Simpler than RICE: Impact × Confidence × Ease

Each on a 1-10 scale. Multiply them.

| Feature | Impact | Confidence | Ease | Score |
|---------|--------|------------|------|-------|
| Onboarding | 8 | 7 | 6 | 336 |
| Export | 5 | 9 | 9 | 405 |
| Mobile app | 7 | 4 | 2 | 56 |

**When to use**: Quick prioritization, smaller backlogs, early-stage products.

## MoSCoW method

Categorize, don't score:

- **M**ust have: Without this, the release/product fails
- **S**hould have: Important but not critical
- **C**ould have: Nice to have if there's time
- **W**on't have: Explicitly out of scope (this time)

### Example: MVP for task app

| Feature | Category |
|---------|----------|
| Create tasks | Must |
| Complete tasks | Must |
| View task list | Must |
| Edit tasks | Should |
| Delete tasks | Should |
| Due dates | Could |
| Tags/categories | Could |
| Team collaboration | Won't |
| Mobile app | Won't |

**Build order**: All Musts → Shoulds → Coulds if time remains

### When to use MoSCoW

- Defining MVP scope
- Release planning with hard deadlines
- When you need to cut scope
- Communicating priorities to stakeholders

## Cost of Delay

When timing matters: what do we lose by waiting?

### Types of delay cost

**Linear**: Every week of delay costs the same
- Example: A feature that brings $1K/week revenue

**Exponential**: Cost increases over time
- Example: Compliance deadline—minor now, critical later

**Fixed deadline**: Worthless if late
- Example: Conference demo, tax season feature

**Peak opportunity**: Value decays after a point
- Example: Holiday shopping feature

### Using cost of delay

Calculate: **Cost of Delay / Duration** (CD3)

| Feature | Cost of Delay/week | Duration | CD3 |
|---------|-------------------|----------|-----|
| Payment fix | $5,000 | 1 week | 5,000 |
| New feature | $2,000 | 4 weeks | 500 |
| Compliance | $10,000 (if late) | 2 weeks | 5,000 |

**Priority**: Payment fix = Compliance > New feature

### When to use

- Time-sensitive decisions
- Revenue-impacting features
- Compliance/deadline work

## Kano model

Categorize features by customer satisfaction impact:

**Must-haves (Basic)**: Expected. Missing = angry customers. Present = neutral.
- Example: App loads, login works

**Performance (Linear)**: More = better. Direct correlation to satisfaction.
- Example: Speed, storage space

**Delighters (Excitement)**: Unexpected positive. Absence doesn't hurt.
- Example: Smart suggestions, delightful animations

**Indifferent**: Users don't care either way.
- Example: Backend refactoring (invisible to users)

**Reverse**: Some users actively dislike this.
- Example: Forced tutorials, aggressive upsells

### Prioritization implication

1. **Must-haves first**: You can't delight users who can't log in
2. **Then performance**: Improve core value
3. **Then delighters**: Differentiate from competitors
4. **Skip indifferent**: Unless technically necessary
5. **Avoid reverse**: Unless data proves you wrong

## Weighted scoring

Create your own scoring system:

1. Define criteria (impact, effort, strategic fit, risk)
2. Assign weights (importance of each criterion)
3. Score each feature
4. Calculate weighted total

### Example

| Criterion | Weight |
|-----------|--------|
| User value | 40% |
| Strategic fit | 30% |
| Effort (inverse) | 20% |
| Risk (inverse) | 10% |

| Feature | User (40%) | Strategic (30%) | Effort (20%) | Risk (10%) | Total |
|---------|------------|-----------------|--------------|------------|-------|
| A | 8 × 0.4 = 3.2 | 6 × 0.3 = 1.8 | 7 × 0.2 = 1.4 | 8 × 0.1 = 0.8 | 7.2 |
| B | 6 × 0.4 = 2.4 | 9 × 0.3 = 2.7 | 5 × 0.2 = 1.0 | 6 × 0.1 = 0.6 | 6.7 |

### When to use

- Complex decisions with multiple factors
- Need to balance competing priorities
- Want to make tradeoffs explicit

## Anti-patterns in prioritization

### HiPPO (Highest Paid Person's Opinion)

Priorities set by whoever has most authority, not best judgment.

**Fix**: Use frameworks. Make reasoning explicit. Gather input.

### Squeaky wheel

Whoever complains loudest gets priority.

**Fix**: Aggregate feedback. One loud user ≠ common problem.

### Recency bias

Whatever was mentioned most recently feels most important.

**Fix**: Review the full backlog, not just new items.

### Sunk cost fallacy

Continuing features because you've already invested, not because they matter.

**Fix**: Evaluate current value, not past investment.

### Analysis paralysis

Spending so long prioritizing that you don't build anything.

**Fix**: Time-box prioritization. Good enough beats perfect.

## Quick prioritization for solo builders

Don't need complex frameworks? Try this:

1. **List everything** you could build
2. **Ask for each item**: If I could only ship one thing, is this it?
3. **Force rank** the top 5
4. **Work on #1** until done
5. **Re-evaluate** when done

That's it. Simple, effective.

## Making prioritization stick

- **Write it down**: Priorities you forget aren't priorities
- **Review regularly**: Weekly or per-sprint
- **Say no explicitly**: "Won't" list is as important as "Will" list
- **Revisit assumptions**: Priorities change as you learn

## Further reading

- [How to slice work effectively](/basics/how-to-slice-work-effectively/): Break priorities into deliverables
- [When to say no](/basics/when-to-say-no/): Declining features and requests
- [Product discovery techniques](/basics/product-discovery-techniques/): Understand what to prioritize
- [Technical decision making](/basics/technical-decision-making/): Choosing how to build priorities
