---
title: "DRY Principle - Don't Repeat Yourself"
description: "A software development principle stating that every piece of knowledge must have a single, unambiguous, authoritative representation within a system."
date: 2026-03-28
categories: [Glossary]
tags: [design-principles, DRY, code-quality, refactoring, pragmatic-programmer]
related:
  - glossary/solid-principles
  - glossary/kiss-principle
  - glossary/single-responsibility-principle
  - glossary/clean-architecture
last_updated: 2026-05-30
---

The DRY principle (Don't Repeat Yourself) states that every piece of knowledge must have a single, unambiguous, authoritative representation within a system. It targets the elimination of duplication not just in code, but in all forms of knowledge representation including documentation, data schemas, build processes, and configuration.

## Origins and History

The DRY principle was coined by Andrew Hunt and David Thomas in *The Pragmatic Programmer: From Journeyman to Master* (1999). Hunt and Thomas defined it broadly: "Every piece of knowledge must have a single, unambiguous, authoritative representation within a system." They emphasized that DRY is not merely about avoiding copy-paste code duplication. It applies to database schemas that duplicate business rules, documentation that restates code logic, build scripts that duplicate environment configuration, and any other case where the same knowledge exists in multiple places that must be kept in sync.

## How It Works

When you identify duplicated knowledge, you extract it into a single source of truth and have all consumers reference that source. For code, this means extracting shared logic into functions, classes, or modules. For data, it means normalizing schemas so that facts are stored once. For configuration, it means deriving environment-specific values from a single base configuration. For documentation, it means generating docs from code or schemas rather than maintaining them separately.

The benefit is that when the knowledge changes, you update it in one place. Without DRY, updating knowledge requires finding and changing every copy, and missing one copy introduces inconsistency.

## When to Apply It

Apply DRY when you find yourself making the same change in multiple places, when a bug fix in one location must be replicated across several files, when business rules are encoded both in code and in database constraints that can drift apart, or when test data, mocks, and production code all encode the same assumptions independently.

## Common Pitfalls

The most common misapplication of DRY is treating superficial code similarity as duplication. Two functions that happen to have identical code today but represent different business concepts should not be merged. Their logic may diverge as requirements evolve, and forcing them to share an implementation creates coupling between unrelated concerns. "DRY is about knowledge, not code" is a critical distinction. Premature abstraction in the name of DRY can produce overly generic, hard-to-understand code. The "Rule of Three" (wait until duplication occurs three times before extracting) is a common heuristic to avoid premature DRYing.

## Relationship to Other Principles

DRY complements SRP (each piece of knowledge has one home, just as each class has one responsibility). It works with KISS by reducing the surface area of change, and with YAGNI by focusing extraction on actual, observed duplication rather than speculative future reuse.

## Sources

1. Hunt, A., Thomas, D. (1999). *The Pragmatic Programmer: From Journeyman to Master*. Addison-Wesley.
2. Hunt, A., Thomas, D. (2019). *The Pragmatic Programmer*, 20th Anniversary Edition. Addison-Wesley.
3. Martin, R.C. (2008). *Clean Code: A Handbook of Agile Software Craftsmanship*. Prentice Hall.
