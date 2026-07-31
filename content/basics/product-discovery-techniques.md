---
title: "Product Discovery Techniques"
description: "Figure out what to build before building it. Impact mapping, event storming, user interviews, and Open Practice Library methods for understanding user needs."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, product, discovery, agile, planning, open-practice-library]
faqs:
  - question: "When should I do discovery vs just start building?"
    answer: "Always do some discovery, but scale it to the risk. Building a quick prototype to test? Minimal discovery. Building something that takes months? More discovery upfront. The goal is learning enough to build the right thing, not producing documents."
  - question: "These techniques seem heavy for a solo builder. Can I simplify?"
    answer: "Yes. Impact mapping becomes 'write down the goal and 3 ways to measure it.' User interviews become 'talk to 5 people who might use this.' Event storming becomes 'sketch the main user flow on paper.' The technique doesn't matter—understanding users does."
  - question: "What's the Open Practice Library?"
    answer: "A community collection of practices for software delivery, organized by when you'd use them (discovery, delivery, operations). Free at openpracticelibrary.com. Great source of techniques beyond what's covered here."
last_updated: 2026-07-30
---

{{< quickanswer >}}
Product discovery answers "what should we build?" before you build it. Techniques like impact mapping (connect features to goals), event storming (map the domain), and user interviews (understand real needs) help you avoid building features nobody wants. With AI making building fast, discovery becomes more important—building the wrong thing fast is still waste.
{{< /quickanswer >}}

## Why discovery matters more now

Building is getting faster. AI can implement features in hours that used to take weeks.

This makes the question "should we build this?" more important than "can we build this?"

**Without discovery:**
- You guess what users want
- AI builds it quickly
- Users don't use it
- You wasted time (and tokens)

**With discovery:**
- You learn what users actually need
- You build only what matters
- AI implements the right things
- Users get value

## Impact mapping

Connect what you build to why you're building it.

### The structure

```
WHY? ────→ WHO? ────→ HOW? ────→ WHAT?
Goal       Actors     Impacts     Deliverables

"Increase  "New       "Try the    "Free trial"
 revenue"   users"     product"   "Demo video"
                      "Refer      "Referral
                       others"     program"
```

### Example

```
Goal: Increase monthly active users by 50%
│
├── Actor: New visitors
│   ├── Impact: Understand value quickly
│   │   └── Deliverable: Landing page with clear value prop
│   └── Impact: Try without commitment
│       └── Deliverable: Free tier / trial
│
├── Actor: Trial users
│   ├── Impact: Experience core value
│   │   └── Deliverable: Onboarding flow
│   └── Impact: Get help when stuck
│       └── Deliverable: In-app guidance
│
└── Actor: Existing users
    └── Impact: Bring others
        └── Deliverable: Referral program
```

### How to use it

1. Start with the goal (business outcome, not feature)
2. Identify who affects that goal
3. Ask: what behavior change (impact) would achieve the goal?
4. Only then: what could we build to enable that impact?

**The insight**: Many deliverables could create the same impact. Pick the smallest one that tests your assumption.

## Event storming

Visualize the domain by mapping events in the system.

### How it works

1. Get sticky notes (orange for events)
2. Write domain events in past tense: "Order Placed", "Payment Received", "Item Shipped"
3. Arrange on timeline
4. Add actors (who triggers this?) and systems (what handles it?)
5. Identify pain points, questions, opportunities

### Example: Order flow

```
[Customer]              [System]                    [Warehouse]
    │                      │                            │
    │ "Order Submitted"    │                            │
    │─────────────────────>│                            │
    │                      │ "Payment Processed"        │
    │                      │ "Inventory Checked"        │
    │                      │─────────────────────────-->│
    │                      │                            │
    │                      │            "Order Packed"  │
    │                      │<───────────────────────────│
    │                      │                            │
    │ "Shipping             │        "Order Shipped"    │
    │  Notification Sent"  │<───────────────────────────│
    │<─────────────────────│                            │
```

### Why it helps

- Everyone sees the whole picture
- You find gaps ("what happens if payment fails?")
- You identify bounded contexts (order vs shipping vs payment)
- It becomes the basis for your data model and APIs

**Simplified for solo builders**: Sketch the main user journey on paper. What happens at each step? What could go wrong?

## User interviews

Talk to actual users (or potential users). Nothing substitutes for this.

### The approach

**Don't ask:**
- "Would you use this?" (people say yes to be nice)
- "What features do you want?" (people describe solutions, not problems)

**Do ask:**
- "Tell me about the last time you [did the thing your product helps with]"
- "What was the hardest part?"
- "How do you currently solve this?"
- "What have you tried that didn't work?"

### Example script

```
"I'm building [product] and trying to understand how people 
currently handle [problem space]. Can I ask you a few questions?"

1. "Tell me about your role and what you do day-to-day."
2. "When's the last time you had to [specific task]?"
3. "Walk me through what you did."
4. "What was frustrating about that?"
5. "Have you tried any tools/solutions for this?"
6. "What would make this significantly better?"

Listen more than talk. Follow up with "why?" and "tell me more."
```

### How many interviews?

5-8 interviews usually reveal the main patterns. After that, you hear the same things.

### What to do with insights

- Look for patterns (3+ people mentioning the same thing)
- Prioritize problems by frequency and severity
- Update your assumptions
- Feed insights into impact mapping and user stories

## Assumption mapping

Make your assumptions explicit so you can test them.

### The exercise

List everything you're assuming:
- About users ("They need X", "They're willing to pay")
- About the problem ("This is painful enough to solve")
- About the solution ("This approach will work")
- About the market ("There's no good alternative")

### Plot on a matrix

```
                Important
                    │
    Test these ─────┼───── Test these first
    soon            │      (highest risk)
                    │
    ────────────────┼────────────────────
      Low risk      │       High risk
                    │
    Don't worry ────┼───── Monitor these
    about these     │
                    │
              Not important
```

### Example assumptions for a budgeting app

```
High importance, High uncertainty (test first):
- "People will connect their bank accounts"
- "Users will pay $10/month"

High importance, Low uncertainty:
- "People want to track spending" (known problem)

Low importance, High uncertainty (deprioritize):
- "Users want social features"

Low importance, Low uncertainty (ignore):
- "The app needs a logo"
```

## Prioritization techniques

### MoSCoW

Categorize features:
- **M**ust have: Without this, the product doesn't work
- **S**hould have: Important but not critical
- **C**ould have: Nice to have
- **W**on't have (this time): Explicitly out of scope

### RICE scoring

Score each feature:
- **R**each: How many users affected?
- **I**mpact: How much does it help them? (1-3 scale)
- **C**onfidence: How sure are you about reach and impact?
- **E**ffort: How long to build?

Score = (Reach × Impact × Confidence) / Effort

### Buy a feature

If stakeholders disagree, give everyone fake "money" to spend on features. See what gets funded.

## Lean experiments

Test assumptions before building.

### Types of experiments

| Assumption | Experiment |
|------------|------------|
| "People want this" | Landing page with signup |
| "This solves the problem" | Manual/Wizard of Oz test |
| "People will pay" | Pre-order or early access |
| "This UX works" | Clickable prototype |

### Example: Testing demand

Before building a scheduling app:
1. Create landing page describing the product
2. Add "Join waitlist" button
3. Drive some traffic (Reddit, ads, communities)
4. See how many sign up
5. If few sign up, your value prop or audience is wrong

Cost: A day of work and maybe $50 in ads. Versus months building something nobody wants.

## Discovery for solo builders (simplified)

Don't have time for full workshops? Minimum viable discovery:

1. **Write the goal**: One sentence on what success looks like
2. **Talk to 5 people**: Who have the problem you're solving
3. **List assumptions**: What must be true for this to work?
4. **Build the smallest test**: Validate the riskiest assumption
5. **One user story at a time**: Write it, build it, get feedback

This takes hours, not weeks. It still beats building blind.

## Open Practice Library

The Open Practice Library (openpracticelibrary.com) is a community collection of practices organized by:

- **Discovery**: Understanding what to build
- **Delivery**: Building and shipping
- **Operations**: Running and improving

Techniques covered there but not detailed here:
- **How Might We**: Reframe problems as opportunities
- **Affinity Mapping**: Group insights into themes
- **Design Studio**: Rapid collaborative sketching
- **Mob Programming**: Whole team codes together
- **Retrospectives**: Learn from what happened

All free, with templates and facilitation guides.

## Quick reference

| Technique | Use when | Time |
|-----------|----------|------|
| Impact Mapping | Connecting features to business goals | 1-2 hours |
| Event Storming | Understanding complex domains | 2-4 hours |
| User Interviews | Learning about user needs | 30-60 min each |
| Assumption Mapping | Identifying risks | 30 min |
| MoSCoW | Prioritizing features | 30 min |
| Landing Page Test | Validating demand | 1 day |

## Further reading

- [How to write user stories](/basics/how-to-write-user-stories/): Turn discoveries into requirements
- [How to slice work effectively](/basics/how-to-slice-work-effectively/): Break discoveries into buildable pieces
- [Agile for solo builders](/basics/agile-for-solo-builders/): Manage your discovery and delivery
- [Open Practice Library](https://openpracticelibrary.com/): More techniques
