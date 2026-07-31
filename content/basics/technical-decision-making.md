---
title: "Technical Decision Making"
description: "Build vs buy vs open source, technology selection, and how to make architecture decisions you won't regret. Frameworks for choices that compound over time."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, architecture, decisions, planning, technology]
faqs:
  - question: "How do I know if I'm choosing the right technology?"
    answer: "You can't know for certain, but you can make the decision more defensible: understand the tradeoffs, consider your constraints, evaluate how reversible the choice is, and document your reasoning. Perfect choices don't exist—informed choices do."
  - question: "Should I use the newest technology?"
    answer: "Usually no. New means less documentation, fewer solved problems, more bugs, and risk of abandonment. Unless the new thing solves a specific problem existing options can't, boring technology is often the better choice."
  - question: "What if I make the wrong choice?"
    answer: "You will, sometimes. The question is: how costly is it to change? For reversible decisions, move fast and learn. For irreversible ones (database, core language), invest more time upfront."
last_updated: 2026-07-30
---

{{< quickanswer >}}
Technical decisions compound—a quick choice now becomes architecture you're stuck with later. Use frameworks: understand the tradeoffs (not just benefits), assess reversibility (can you change it later?), consider your constraints (team skills, timeline, budget), and document why you decided. "What should I use?" is the wrong question—"What are the tradeoffs I'm accepting?" is better.
{{< /quickanswer >}}

## The decision landscape

Every technical decision sits somewhere on two axes:

```
                    High Impact
                        │
    Careful analysis ───┼─── Most critical
    (Database choice)   │    (Core architecture)
                        │
    ────────────────────┼────────────────────
       Reversible       │      Irreversible
                        │
    Just pick one ──────┼─── Analyze enough
    (CSS framework)     │    (Cloud provider)
                        │
                    Low Impact
```

**High impact + irreversible**: Invest significant time. Database choice, core language, cloud provider.

**High impact + reversible**: Analyze but don't overthink. You can change it.

**Low impact**: Just pick something reasonable. Don't spend a week choosing between two CSS libraries.

## Build vs buy vs open source

The classic decision: do we build it ourselves?

### Build (custom code)

**Choose when:**
- It's your core differentiator
- Nothing existing fits your needs
- You need complete control
- Scale or performance requirements are extreme

**Avoid when:**
- Solved problems (auth, payments, email)
- You're resource-constrained
- Security is critical (auth, crypto)
- It's not your expertise

### Buy (SaaS/paid service)

**Choose when:**
- It solves the problem well
- The cost is less than building/maintaining
- You need it working now
- Reliability matters and they provide it

**Avoid when:**
- Vendor lock-in is dangerous
- Costs scale badly with your growth
- You need deep customization
- The vendor might disappear

### Open source (self-hosted)

**Choose when:**
- Need more control than SaaS
- Cost of SaaS at scale is prohibitive
- You have ops capability
- Strong community and maintenance

**Avoid when:**
- You don't have ops skills
- The project is poorly maintained
- Hidden complexity will eat your time
- Managed service exists and is affordable

### Decision matrix

| Factor | Build | Buy (SaaS) | Open Source |
|--------|-------|------------|-------------|
| Time to value | Slowest | Fastest | Medium |
| Upfront cost | High (dev time) | Low | Low |
| Ongoing cost | Maintenance | Subscription | Ops time |
| Customization | Full | Limited | Full |
| Control | Full | Low | Full |
| Risk | On you | On vendor | On you |

### Example: User authentication

```
Build from scratch?
→ Probably not. Security-critical, solved problem.

Buy (Auth0, Clerk, Supabase Auth)?
→ Good default. Works immediately, handles edge cases.

Open source (Keycloak, Authentik)?
→ If you need control and have ops skills.

When to build?
→ Unusual requirements SaaS can't handle.
→ Extreme scale where per-user pricing hurts.
```

## Technology selection framework

When choosing between options (frameworks, databases, libraries):

### 1. Define requirements first

Before comparing options, know what you need:
- Performance requirements (scale, latency)
- Team expertise (what do people know?)
- Integration needs (what does it talk to?)
- Timeline (when do you need it working?)
- Longevity (how long will you use this?)

### 2. List realistic options

Not all options, just viable ones:
- Widely used (community, docs, hiring)
- Active maintenance
- Your team can learn it
- Fits your constraints

### 3. Evaluate on your requirements

| Requirement | Option A | Option B | Option C |
|-------------|----------|----------|----------|
| Performance | ✓ | ✓ | ✓ |
| Team knows it | ✓ | ✗ | ✓ |
| Good docs | ✓ | ✓ | ✗ |
| Active development | ✓ | ✓ | ✗ |

### 4. Consider the tradeoffs you're accepting

Every option has downsides. Know them:

> "We're choosing PostgreSQL over MongoDB because our data is relational and we value consistency over flexibility. The tradeoff is that schema changes require migrations."

### 5. Document the decision

Write down what you chose and why. See [Architecture Decision Records](/basics/architecture-decision-records/).

## The "boring technology" principle

New technology is exciting but risky:
- Less documentation
- Fewer Stack Overflow answers
- Unknown edge cases
- Potential bugs
- Might be abandoned

Boring technology is proven:
- Well-documented
- Known failure modes
- Large community
- Bugs already found and fixed
- Will exist in 5 years

**Default to boring. Choose new only when it solves a real problem boring can't.**

### Innovation tokens

You have limited capacity for new/complex technology. Each one adds:
- Learning time
- Unknown failure modes
- Integration challenges
- Debugging difficulty

**Spend innovation tokens intentionally.** If your product innovation is a new UI approach, keep your backend boring. If your backend is novel, keep your frontend simple.

## Reversibility assessment

Before deciding, ask: how hard is this to change?

### Easy to change (reversible)

- UI components and styling
- Most libraries (with good abstraction)
- API endpoint structure
- Feature implementations

For these: decide quickly, learn from use, change if needed.

### Hard to change (irreversible)

- Database choice and schema design
- Core programming language
- Cloud provider (with deep integration)
- Authentication system (after users exist)
- Public API contracts (after clients depend on it)

For these: invest more time, get input, consider alternatives seriously.

### Semi-reversible

- Framework choice (can migrate, but painful)
- Third-party integrations (depends on coupling)
- Deployment platform (depends on abstraction)

For these: analyze enough to be confident, but don't agonize.

## Common decision patterns

### The safe default

When you don't have strong requirements, pick the popular option:
- Web app? React or Next.js
- Backend? Node.js or Python
- Database? PostgreSQL
- Hosting? Vercel, Railway, or AWS

Popular means: more resources, easier hiring, more solved problems.

### The "right tool for the job"

Don't use a hammer for screws:
- Need full-text search? Elasticsearch, not SQL LIKE queries
- Need real-time? WebSockets, not polling
- Need ML? Python, not JavaScript
- Need performance-critical code? Rust/Go, not Python

But also: don't add a new tool for marginal benefit.

### The constraint flip

If you're stuck, flip a constraint:
- "We need this in 2 weeks" → What if we had 2 months?
- "We must use our existing stack" → What if we didn't?
- "It has to scale to 1M users" → What if we only needed 10K?

Sometimes the constraint is negotiable, and that changes the answer.

## Decision anti-patterns

### Resume-driven development

Choosing technology because you want to learn it, not because it fits.

**Fix**: Separate learning projects from production work.

### Analysis paralysis

Spending more time deciding than it would take to try both options.

**Fix**: Set a time limit. If reversible, just pick one.

### Hype-driven decisions

Choosing because it's trending on Hacker News.

**Fix**: Ask "What problem does this solve that my current approach doesn't?"

### Nobody-got-fired-for-IBM

Choosing the safest, most conservative option even when it's wrong for your needs.

**Fix**: Match the solution to your actual requirements, not imagined enterprise needs.

### Premature architecture

Building for scale you don't have.

**Fix**: Build for current needs. You can change later—and you'll know more then.

## Quick decision framework

For any technical decision:

1. **What problem are we solving?** (Be specific)
2. **What are the realistic options?** (2-4, not 10)
3. **What are our constraints?** (Time, skills, budget)
4. **How reversible is this?** (Determines effort to invest)
5. **What tradeoffs are we accepting?** (Every option has downsides)
6. **Document it** (Future you will thank present you)

## Further reading

- [Architecture decision records](/basics/architecture-decision-records/): Document your decisions
- [Reversible vs irreversible decisions](/basics/reversible-vs-irreversible-decisions/): Calibrate decision effort
- [Prioritization frameworks](/basics/prioritization-frameworks/): When you have to choose what to build
- [When to say no](/basics/when-to-say-no/): Declining features and complexity
