---
title: "YAGNI Principle - You Aren't Gonna Need It"
description: "A software development principle from Extreme Programming stating that functionality should not be added until it is actually needed."
date: 2026-03-28
categories: [Glossary]
tags: [design-principles, YAGNI, extreme-programming, agile, simplicity]
related:
  - glossary/kiss-principle
  - glossary/dry-principle
  - glossary/solid-principles
  - glossary/open-closed-principle
last_updated: 2026-05-30
---

YAGNI (You Aren't Gonna Need It) is a software development principle stating that a programmer should not add functionality until it is actually needed. It opposes speculative generalization, where developers build features, abstractions, or infrastructure based on anticipated future requirements rather than current ones.

## Origins and History

YAGNI emerged from the Extreme Programming (XP) movement in the late 1990s. Ron Jeffries, one of the three founders of XP alongside Kent Beck and Ward Cunningham, is most closely associated with articulating the principle. It was described as a core practice in Kent Beck's *Extreme Programming Explained* (1999). The principle was a reaction against the prevailing culture of "big design up front" (BDUF), where teams spent months architecting systems to handle every conceivable future scenario before writing production code. XP argued that requirements are inherently unpredictable and that building for unknown futures wastes effort and adds complexity.

## How It Works

YAGNI instructs developers to implement only what is required to satisfy current, concrete requirements. When tempted to add a configuration option "in case someone needs it," an abstraction layer "for future flexibility," or a feature "because we might need it next quarter," YAGNI says: do not build it until there is a real, immediate need.

The economic argument is straightforward. Speculative features incur three costs: the cost of building them, the cost of maintaining them, and the cost of the complexity they add to the system (making other changes harder). If the anticipated need never materializes (which is common), all three costs are pure waste.

## When to Apply It

Apply YAGNI when deciding whether to build a feature that has no current user story or requirement, when considering adding abstraction layers to handle hypothetical future variations, when evaluating whether to support additional platforms, formats, or protocols before any user has requested them, or when designing a database schema with fields for data that might be collected someday.

## Common Pitfalls

YAGNI does not mean "never plan ahead." Architectural decisions that are expensive to reverse (database choice, API contracts, security model) warrant forward thinking. YAGNI targets incremental decisions about features and abstractions, not foundational architectural constraints. It also does not override good engineering practices: writing tests, following SOLID principles, and maintaining clean code are not speculative overhead.

## Relationship to Other Principles

YAGNI complements KISS (keep solutions simple) and DRY (eliminate actual duplication). It can tension with the Open-Closed Principle, which encourages designing for extension. The balance is to structure code so that extension is possible when needed, without pre-building the extensions themselves.

## Sources

1. Beck, K. (1999). *Extreme Programming Explained: Embrace Change*. Addison-Wesley.
2. Jeffries, R. "You Aren't Gonna Need It." *ronjeffries.com*.
3. Fowler, M. (2004). "Yagni." *martinfowler.com*. [https://martinfowler.com/bliki/Yagni.html](https://martinfowler.com/bliki/Yagni.html)
