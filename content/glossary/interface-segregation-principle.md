---
title: "Interface Segregation Principle (ISP)"
description: "A SOLID design principle stating that no client should be forced to depend on methods it does not use, favoring small, specific interfaces over large, monolithic ones."
date: 2026-03-28
categories: [Glossary]
tags: [SOLID, ISP, design-principles, object-oriented-design, interfaces, decoupling]
related:
  - glossary/solid-principles
  - glossary/single-responsibility-principle
  - glossary/dependency-inversion-principle
  - glossary/adapter-pattern
last_updated: 2026-05-30
---

The Interface Segregation Principle (ISP) states that no client should be forced to depend on methods it does not use. It promotes the design of small, focused interfaces tailored to specific client needs rather than large, general-purpose interfaces that bundle unrelated capabilities.

## Origins and History

The Interface Segregation Principle was formulated by Robert C. Martin while consulting for Xerox in the early 1990s. The Xerox printer system had a single `Job` class used for printing, stapling, and faxing. When changes were made to the stapling interface, printing clients that had no relationship to stapling required recompilation and redeployment. Martin documented this experience and the principle in his paper "The Interface Segregation Principle" (1996) and later in *Agile Software Development, Principles, Patterns, and Practices* (2002).

## How It Works

ISP requires that fat interfaces be broken into smaller, more cohesive ones. Instead of one `Printer` interface with `print()`, `scan()`, `fax()`, and `staple()` methods, you create separate `Printable`, `Scannable`, `Faxable`, and `Stapleable` interfaces. A class that only prints implements only `Printable`. A multi-function device implements all four. Clients depend only on the interfaces they actually use.

In languages without explicit interfaces (like Python or JavaScript), ISP still applies conceptually: objects should expose only the methods relevant to each consumer, and function parameters should accept the narrowest type that satisfies the requirement.

## When to Apply It

Apply ISP when a large interface forces implementing classes to provide stub implementations for methods they do not support, when changes to one part of an interface cause recompilation or breakage in unrelated clients, when different clients of the same class use different subsets of its methods, or when mock objects in tests require implementing many irrelevant methods.

## Common Pitfalls

Over-segmenting interfaces creates a proliferation of single-method interfaces that are difficult to discover and manage. The goal is cohesive groupings, not maximum granularity. ISP should be driven by actual client usage patterns rather than speculative future needs. In languages that support default interface methods (Java 8+, C# 8+), the pressure from ISP violations is somewhat reduced, but the coupling problem remains.

## Relationship to Other Principles

ISP is the interface-level counterpart of SRP (which applies to classes). It supports DIP by encouraging clients to depend on narrow abstractions. Adapter pattern can be used to create compliant narrow interfaces over existing fat interfaces.

## Sources

1. Martin, R.C. (1996). "The Interface Segregation Principle." *The C++ Report*.
2. Martin, R.C. (2002). *Agile Software Development, Principles, Patterns, and Practices*. Prentice Hall.
3. Martin, R.C. (2017). *Clean Architecture: A Craftsman's Guide to Software Structure and Design*. Prentice Hall.
