---
title: "KISS Principle - Keep It Simple"
description: "A design principle stating that systems work best when they are kept simple rather than made complex, favoring straightforward solutions over elaborate ones."
date: 2026-03-28
categories: [Glossary]
tags: [design-principles, KISS, simplicity, software-engineering, code-quality]
related:
  - glossary/yagni-principle
  - glossary/dry-principle
  - glossary/solid-principles
  - glossary/clean-architecture
last_updated: 2026-05-30
---

The KISS principle (Keep It Simple, Stupid) states that most systems work best if they are kept simple rather than made complex. It advocates for straightforward, understandable solutions and warns against unnecessary complexity in design, code, and architecture.

## Origins and History

The KISS principle originated with Kelly Johnson, lead engineer at Lockheed Skunk Works, in the 1960s. Johnson challenged his engineering team to design aircraft that could be repaired by an average mechanic in the field under combat conditions using only ordinary tools. The constraint demanded simplicity. The phrase "Keep It Simple, Stupid" became a core design tenet at Skunk Works, where it guided the engineering of aircraft like the SR-71 Blackbird and the U-2 spy plane. The principle was adopted broadly across engineering disciplines and entered software development through its resonance with early Unix philosophy ("do one thing and do it well") and later through its inclusion in software engineering literature by authors like Robert C. Martin and the Pragmatic Programmer authors.

## How It Works

KISS asks developers to choose the simplest solution that adequately solves the problem. Before adding an abstraction layer, framework, design pattern, or architectural component, ask whether the added complexity is justified by a concrete current requirement. Simpler code is easier to read, test, debug, and modify. Simpler architectures have fewer failure modes and are easier to operate.

In practice, KISS manifests as: preferring standard library functions over custom implementations, using straightforward control flow over clever tricks, choosing established tools over novel ones without compelling reason, and writing code that a new team member can understand without extensive onboarding.

## When to Apply It

KISS applies universally but is particularly important in early-stage projects where requirements are uncertain, in systems that will be maintained by teams with varying experience levels, in operational systems where debugging simplicity reduces mean time to recovery, and when evaluating whether to introduce a design pattern, framework, or architectural boundary.

## Common Pitfalls

KISS is sometimes misused to justify avoiding all abstraction or design, resulting in tangled, monolithic code. Simplicity does not mean naivety. A well-structured system with appropriate abstractions can be simpler to understand and modify than a flat script with everything inlined. The key is proportionality: the complexity of the solution should match the complexity of the problem. Additionally, what counts as "simple" depends on the audience: a functional programming pattern may be simple for an experienced FP developer but complex for a team unfamiliar with it.

## Relationship to Other Principles

KISS complements YAGNI (do not build what you do not need yet) and DRY (eliminate knowledge duplication, but not at the cost of excessive abstraction). Together, these three principles form a pragmatic foundation for software design that resists over-engineering.

## Sources

1. Johnson, C.L. "Kelly" (1960s). Lockheed Skunk Works design principles.
2. Rich, B.R., Janos, L. (1994). *Skunk Works: A Personal Memoir of My Years at Lockheed*. Little, Brown and Company.
3. Raymond, E.S. (2003). *The Art of Unix Programming*. Addison-Wesley.
4. Martin, R.C. (2008). *Clean Code: A Handbook of Agile Software Craftsmanship*. Prentice Hall.
