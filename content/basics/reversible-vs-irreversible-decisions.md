---
title: "Reversible vs Irreversible Decisions"
description: "One-way doors vs two-way doors. Know which decisions need careful analysis and which just need action. Calibrate your decision effort to decision stakes."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, decisions, planning, strategy, product]
faqs:
  - question: "How do I know if a decision is reversible?"
    answer: "Ask: Can I change this later? At what cost? If change is cheap and easy, it's reversible. If change requires significant rework, data migration, or user disruption, it's less reversible. Most decisions are more reversible than they feel in the moment."
  - question: "Does irreversible mean I should avoid the decision?"
    answer: "No—it means invest more time in analysis. You can't avoid all irreversible decisions. But you can be intentional: gather information, consider alternatives, accept the tradeoffs consciously, and document your reasoning."
  - question: "What about decisions that feel irreversible but aren't?"
    answer: "Many. 'We chose React' feels permanent but isn't—you can migrate. 'We hired this person' feels permanent but isn't—you can part ways. Check your assumptions about what's truly hard to undo."
last_updated: 2026-07-30
---

{{< quickanswer >}}
One-way door (irreversible): Hard or impossible to undo. Database architecture, public API contracts, major pricing changes. Invest time in analysis. Two-way door (reversible): Easy to undo or change. Most feature decisions, UI choices, internal tooling. Decide quickly and learn. Most decisions are two-way doors—treat them that way instead of agonizing.
{{< /quickanswer >}}

## The one-way/two-way door framework

From Amazon's decision-making philosophy:

### One-way doors (Type 1 decisions)

Irreversible or costly to reverse. Once you walk through, you can't easily come back.

**Characteristics:**
- High switching cost
- Data migration required
- User disruption if changed
- Contractual or legal commitment
- Public commitments that create expectations

**Examples:**
- Core database choice (after data exists)
- Public API schema (after clients depend on it)
- Pricing model (after customers buy in)
- Major architectural patterns
- Hiring decisions (harder than most think)
- Saying something publicly

**Approach:** Invest in analysis. Consider alternatives. Seek input. Document reasoning. Accept you're committing.

### Two-way doors (Type 2 decisions)

Reversible with low cost. You can walk through, look around, and walk back.

**Characteristics:**
- Can be changed without major disruption
- Affects internal implementation, not contracts
- Users won't notice the change (or benefit from it)
- Isolated scope

**Examples:**
- Internal code structure (refactorable)
- CSS framework choice
- Most feature implementations
- Internal tools
- Experiment variations
- Individual file organization

**Approach:** Decide quickly. Try something. Learn from results. Change if needed.

## The mistake most people make

**Treating two-way doors like one-way doors:**
- Endless analysis for decisions that can be undone
- Waiting for perfect information that doesn't exist
- Slow iteration because every choice feels permanent
- Paralysis over reversible choices

**Why it happens:**
- All decisions feel important in the moment
- Risk aversion defaults to more analysis
- Hard to tell the difference without practice

## How to assess reversibility

Ask these questions:

### 1. What does changing this cost?

**Low cost (reversible):**
- A few hours of development
- A code refactor
- A config change

**High cost (irreversible):**
- Weeks of migration work
- Breaking existing integrations
- Losing user data or trust

### 2. Who does it affect?

**Internal only (usually reversible):**
- Code organization
- Internal tools
- Implementation details

**External (often irreversible):**
- Public APIs
- User-facing features people depend on
- Contracts and commitments

### 3. Is there a point of no return?

**No clear point (reversible):**
- You can change direction anytime

**Clear point (irreversible):**
- After users have data in your system
- After clients integrate with your API
- After you've made public commitments

### 4. What's the blast radius?

**Small blast radius (reversible):**
- One component
- One feature
- One user flow

**Large blast radius (irreversible):**
- Core data model
- Authentication system
- Fundamental architecture

## Examples: Analyzing real decisions

### Choosing a frontend framework

**Is it reversible?** Yes, but with cost.
- Pre-launch: Very reversible, just rebuild
- Post-launch with complex app: Expensive but doable
- Verdict: Two-way door early, one-way door later

**Approach:** Choose reasonably quickly. If you're pre-launch, don't agonize. If you're established with a large codebase, invest more in the decision.

### Database choice

**Is it reversible?** Partially.
- Schema and queries: Can migrate, but work required
- Core database type: Very expensive to change post-data
- Verdict: One-way door

**Approach:** Invest time upfront. Consider data model, scaling needs, team experience. Document the decision. Accept you're committing.

### Feature implementation details

**Is it reversible?** Yes.
- Code can be refactored
- UI can be redesigned
- Internal APIs can change

**Approach:** Ship something. Learn from usage. Iterate.

### Pricing model

**Is it reversible?** Technically yes, practically difficult.
- Changing prices upsets existing customers
- Grandfathering creates complexity
- Market positioning is hard to change

**Approach:** Think carefully. Test with soft launches. Be prepared to commit.

### Hiring someone

**Is it reversible?** Yes, but costly.
- Parting ways is possible but disruptive
- Training and ramp-up time is sunk cost
- Team dynamics affected

**Approach:** Don't treat it as a two-way door. Invest in the process. But also don't agonize for months—you can't know everything upfront.

## Decision time proportional to stakes

| Decision type | Time to invest | Examples |
|---------------|---------------|----------|
| Trivially reversible | Minutes | Variable names, minor UI tweaks |
| Easily reversible | Hours | Feature implementation, library choice |
| Moderately reversible | Days | Framework choice, integration approach |
| Difficult to reverse | Weeks | Database, core architecture, major hires |
| Practically irreversible | Appropriate thoroughness | Public contracts, major pivots |

## Speed vs correctness tradeoffs

### When to optimize for speed

- Two-way door decisions
- Early-stage products (everything is changeable)
- Experiments and tests
- Internal tooling
- When learning beats planning

### When to optimize for correctness

- One-way door decisions
- Decisions affecting trust (security, privacy)
- Public commitments
- Foundational architecture
- When mistakes are costly

## Making irreversible decisions well

When you identify a one-way door:

1. **Clarify the decision**: What exactly are you deciding?
2. **Identify alternatives**: What else could you do?
3. **Understand tradeoffs**: What do you gain and lose with each option?
4. **Gather input**: Who else should weigh in?
5. **Set a deadline**: Don't analyze forever
6. **Decide and commit**: Accept the tradeoffs
7. **Document reasoning**: Future you will thank you

## Making reversible decisions well

When you identify a two-way door:

1. **Decide quickly**: Analysis won't help much
2. **Set success criteria**: How will you know if it worked?
3. **Try it**: Implementation beats speculation
4. **Evaluate**: Did it work?
5. **Iterate or reverse**: Change based on learning

## Converting one-way to two-way doors

Sometimes you can reduce irreversibility:

### Feature flags

Ship features off by default. Turn them on gradually. If they fail, turn them off.

**Converts:** Risky feature launches from one-way to two-way.

### Abstraction layers

Build interfaces that hide implementation details. Change implementation without changing consumers.

**Converts:** Technology choices from one-way to two-way.

### Staged rollouts

Release to 1%, then 10%, then 50%, then 100%. Roll back at any stage.

**Converts:** Risky changes from one-way to two-way.

### Deprecation periods

Before removing something, announce deprecation, give time to migrate, then remove.

**Converts:** Breaking changes from sudden to gradual.

## Quick decision framework

For any decision:

1. **Is this reversible?** (Low cost to undo)
2. **What's the blast radius?** (Who's affected)
3. **Is there a point of no return?** (After which it's locked)

Based on answers:

- **Highly reversible, small blast radius**: Decide now. Move on.
- **Somewhat reversible, medium blast radius**: Brief analysis, then decide.
- **Low reversibility, large blast radius**: Invest in analysis. Seek input. Document.
- **Irreversible, critical impact**: Full analysis. Get agreement. Commit consciously.

## Further reading

- [Technical decision making](/basics/technical-decision-making/): How to evaluate options
- [Architecture decision records](/basics/architecture-decision-records/): Document your reasoning
- [The art of done](/basics/the-art-of-done/): When to stop analyzing and ship
- [Prioritization frameworks](/basics/prioritization-frameworks/): Deciding what to decide about
