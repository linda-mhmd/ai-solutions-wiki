---
title: "Architecture Decision Records"
description: "Document the why behind technical choices. ADRs capture context, options considered, and reasoning—so future you (and your team) understands decisions."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, architecture, documentation, decisions, planning]
faqs:
  - question: "Do I need ADRs for a small project?"
    answer: "Even solo projects benefit from lightweight ADRs. You'll forget why you made choices in 6 months. A simple 'I chose X because Y' note in a decisions.md file is enough. Scale the formality to your needs."
  - question: "When should I write an ADR?"
    answer: "For any decision that's hard to reverse or you might question later: database choice, framework selection, authentication approach, deployment strategy. Don't write ADRs for every small choice."
  - question: "What if a decision turns out to be wrong?"
    answer: "Write a new ADR that supersedes the old one. Document what you learned and why you're changing. The history of decisions (including mistakes) is valuable context."
last_updated: 2026-07-30
---

{{< quickanswer >}}
Architecture Decision Records (ADRs) document significant technical decisions: what you decided, why you decided it, what alternatives you considered, and what context led to the choice. They're not bureaucracy—they're a gift to future you who will wonder "why did we do it this way?" Good ADRs make decisions defensible, onboarding easier, and changes less scary.
{{< /quickanswer >}}

## Why document decisions?

Six months from now, you'll look at your code and wonder:
- "Why did we use MongoDB instead of PostgreSQL?"
- "Why is auth implemented this way?"
- "Can I change this, or will something break?"

Without ADRs, you'll:
- Waste time re-investigating already-made decisions
- Accidentally undo decisions that had good reasons
- Struggle to onboard new people
- Make the same mistakes again

With ADRs, the reasoning is preserved.

## ADR structure

A simple, effective format:

```markdown
# ADR-001: [Short title of decision]

## Status
[Proposed | Accepted | Deprecated | Superseded by ADR-XXX]

## Context
What situation prompted this decision? What problem are we solving?

## Decision
What did we decide? Be specific.

## Alternatives Considered
What other options did we evaluate? Why didn't we choose them?

## Consequences
What are the implications—good and bad—of this decision?

## Date
When was this decision made?
```

## Example: Database choice

```markdown
# ADR-001: Use PostgreSQL for primary database

## Status
Accepted

## Context
We're building a task management app that needs to store users, tasks, 
and projects. Data is relational (users have tasks, tasks belong to 
projects). We need ACID compliance for data integrity. Team has experience 
with SQL databases.

## Decision
We will use PostgreSQL as our primary database, hosted on Railway.

## Alternatives Considered

**MongoDB**
- Pros: Flexible schema, JSON-native
- Cons: Our data is relational, team has more SQL experience
- Rejected: Schema flexibility isn't valuable for us, and relational 
  queries would be awkward

**SQLite**
- Pros: Simple, no separate server, good for small apps
- Cons: Doesn't scale to multiple servers, limited concurrent writes
- Rejected: We may need to scale beyond single-server

**MySQL**
- Pros: Widely used, team knows it
- Cons: PostgreSQL has better JSON support, CTEs, and modern features
- Rejected: PostgreSQL is slightly better fit, and we have experience 
  with both

## Consequences

**Positive:**
- Strong data integrity with ACID transactions
- Excellent Prisma ORM support
- Good scaling path (read replicas, connection pooling)
- Railway offers managed PostgreSQL

**Negative:**
- Schema changes require migrations
- More complex setup than SQLite
- Need to manage connection pooling at scale

## Date
2026-07-30
```

## Example: Authentication approach

```markdown
# ADR-002: Use NextAuth.js for authentication

## Status
Accepted

## Context
We need user authentication for the task app. Requirements:
- Email/password login
- Possible social login later (Google, GitHub)
- Session-based auth (not just API)
- Works with Next.js App Router

## Decision
Use NextAuth.js (now Auth.js) with the Prisma adapter and credentials 
provider.

## Alternatives Considered

**Clerk**
- Pros: Fully managed, great DX, handles everything
- Cons: $25/month after free tier, vendor lock-in
- Rejected: Cost adds up, and we want control over auth flow

**Supabase Auth**
- Pros: Good free tier, integrates with Supabase DB
- Cons: We're using PostgreSQL on Railway, not Supabase
- Rejected: Would add unnecessary coupling to Supabase ecosystem

**Build from scratch**
- Pros: Full control, no dependencies
- Cons: Security risk, significant time investment
- Rejected: Auth is security-critical; don't reinvent it

## Consequences

**Positive:**
- Well-maintained, widely used
- Easy to add OAuth providers later
- Works well with Prisma
- Free and open source

**Negative:**
- Configuration can be complex
- Documentation sometimes lags behind releases
- We own security of credentials provider

## Date
2026-07-30
```

## Lightweight ADRs for solo projects

Full ADRs feel heavy for solo work? Simplify:

```markdown
# Decisions Log

## 2026-07-30: PostgreSQL over MongoDB
Chose PostgreSQL because our data is relational (users → tasks → projects). 
Team knows SQL better. Can always add a document store later if needed.

## 2026-07-30: NextAuth.js for auth
Considered Clerk (too expensive at scale), Supabase Auth (don't want full 
Supabase), and building from scratch (too risky). NextAuth is free, 
flexible, and well-maintained.

## 2026-08-05: Railway for hosting
Simpler than AWS, cheaper than Heroku, good PostgreSQL and Redis support. 
Can migrate later if needed—not deeply locked in.
```

Even a few sentences capture the reasoning.

## When to write ADRs

**Do write ADRs for:**
- Database and data store choices
- Framework and language decisions
- Authentication/authorization approach
- Deployment and infrastructure
- Major architectural patterns
- Third-party service integrations
- Decisions that were contentious or debated

**Don't need ADRs for:**
- Which button color to use
- Library choices that are easily swapped
- Implementation details that don't affect architecture
- Decisions everyone already understands

## ADR lifecycle

**Proposed**: Under discussion, not yet final
**Accepted**: Decision made and in effect
**Deprecated**: No longer applies (context changed)
**Superseded**: Replaced by a newer ADR (link to it)

### Superseding an ADR

When a decision changes:

```markdown
# ADR-008: Migrate from MongoDB to PostgreSQL

## Status
Accepted (Supersedes ADR-001)

## Context
We chose MongoDB in ADR-001 for flexibility. After 6 months:
- All our data is actually relational
- Joins are awkward and slow
- Team struggles with aggregation pipelines
- We're not using document flexibility at all

## Decision
Migrate to PostgreSQL. Use Prisma ORM.

## Consequences
- Migration effort: ~2 weeks
- Better query performance for our use cases
- Team is more comfortable
- Lose some schema flexibility (acceptable tradeoff)

## Date
2026-08-15
```

The history (original decision + change) is preserved.

## Where to store ADRs

### In your repository

```
project/
├── docs/
│   └── decisions/
│       ├── 001-database-choice.md
│       ├── 002-authentication.md
│       └── 003-deployment.md
├── src/
└── ...
```

**Pros**: Version controlled with code, always available, can link from code comments.

### In a wiki/Notion

**Pros**: Easier to browse, search, comment
**Cons**: Separated from code, might get stale

### Hybrid

Major decisions in repo, supplementary context in wiki.

## Making ADRs useful

### Link to them

In code:
```javascript
// Auth flow explained in docs/decisions/002-authentication.md
```

In PRs:
```
This implements the approach from ADR-002.
```

### Review them during onboarding

New team member joins? Walk through key ADRs. They'll understand the system faster.

### Reference them in discussions

"We considered that in ADR-001. The reason we didn't was..."

### Keep them findable

Index them, tag them, or at minimum keep them in one predictable location.

## Template

Copy this for new ADRs:

```markdown
# ADR-XXX: [Title]

## Status
Proposed

## Context
[What is the situation? What problem are we solving? What constraints exist?]

## Decision
[What did we decide? Be specific about the choice.]

## Alternatives Considered

**[Alternative 1]**
- Pros: [advantages]
- Cons: [disadvantages]
- Rejected because: [reason]

**[Alternative 2]**
- Pros: [advantages]
- Cons: [disadvantages]
- Rejected because: [reason]

## Consequences

**Positive:**
- [Good outcome]
- [Good outcome]

**Negative:**
- [Tradeoff or risk]
- [Tradeoff or risk]

## Date
[YYYY-MM-DD]
```

## Further reading

- [Technical decision making](/basics/technical-decision-making/): How to make good decisions
- [Reversible vs irreversible decisions](/basics/reversible-vs-irreversible-decisions/): Which decisions need ADRs
- [When to say no](/basics/when-to-say-no/): Documenting what you won't do
