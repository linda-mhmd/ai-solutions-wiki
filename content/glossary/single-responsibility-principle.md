---
title: "Single Responsibility Principle (SRP)"
description: "A SOLID design principle stating that a class should have only one reason to change, meaning it should encapsulate exactly one responsibility."
date: 2026-03-28
categories: [Glossary]
tags: [SOLID, SRP, design-principles, object-oriented-design, clean-code]
related:
  - glossary/solid-principles
  - glossary/open-closed-principle
  - glossary/interface-segregation-principle
  - glossary/clean-architecture
last_updated: 2026-05-30
---

The Single Responsibility Principle (SRP) states that a class should have only one reason to change. In practical terms, each class should encapsulate a single responsibility or concern, so that changes to one aspect of the system's behavior require modification of only one class.

## Origins and History

The Single Responsibility Principle was articulated by Robert C. Martin (Uncle Bob) and first presented in his paper "Design Principles and Design Patterns" (2000). He elaborated on it in *Agile Software Development, Principles, Patterns, and Practices* (2002). Martin refined the definition over time, later describing SRP as "a module should be responsible to one, and only one, actor" in *Clean Architecture* (2017), where "actor" refers to a group of stakeholders or users who would request a particular type of change. The principle builds on earlier concepts of cohesion from structured design, notably Larry Constantine and Edward Yourdon's work on coupling and cohesion in *Structured Design* (1979).

## How It Works

SRP asks you to consider who or what might cause a class to change. If a class handles both business rule calculations and database persistence, it has two reasons to change: business rule changes and data access changes. These two responsibilities should be separated into distinct classes.

A class with a single responsibility is cohesive: all its methods and data relate to one purpose. When a change request arrives, it affects one class, minimizing the risk of unintended side effects on unrelated functionality.

## When to Apply It

Apply SRP when a class is large and difficult to understand because it handles multiple concerns, when changes to one feature require modifying code that handles an unrelated feature, when the same class appears in unrelated test suites, or when you find yourself describing what a class does with "and" (e.g., "it validates orders *and* sends email notifications").

## Common Pitfalls

Over-applying SRP fragments logic into excessively granular classes, making the system harder to navigate. A class with only two lines of code delegating to another single-line class adds indirection without value. The judgment of what constitutes "one reason to change" is subjective and context-dependent. In small applications, aggressive separation may create unnecessary complexity. The goal is pragmatic cohesion, not the smallest possible class.

## Relationship to Other Principles

SRP works closely with Interface Segregation (which applies the same idea to interfaces) and supports the Open-Closed Principle (classes with focused responsibilities are easier to extend without modification).

## Sources

1. Martin, R.C. (2002). *Agile Software Development, Principles, Patterns, and Practices*. Prentice Hall.
2. Martin, R.C. (2017). *Clean Architecture: A Craftsman's Guide to Software Structure and Design*. Prentice Hall.
3. Constantine, L., Yourdon, E. (1979). *Structured Design*. Prentice Hall.
