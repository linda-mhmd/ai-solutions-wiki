---
title: "Encapsulation"
description: "A fundamental object-oriented programming principle that bundles data and the methods that operate on that data within a single unit, restricting direct access to internal state."
date: 2026-03-28
categories: [Glossary]
tags: [OOP, encapsulation, information-hiding, object-oriented-design, access-control]
related:
  - glossary/object-oriented-programming
  - glossary/abstraction
  - glossary/inheritance-and-polymorphism
  - glossary/law-of-demeter
  - glossary/solid-principles
last_updated: 2026-05-30
---

Encapsulation is a fundamental object-oriented programming principle that bundles data (fields, attributes) and the methods (functions, procedures) that operate on that data within a single unit (a class or object), and restricts direct access to the object's internal state. External code interacts with the object only through its public interface.

## Origins and History

The concept of encapsulation has its roots in information hiding, a principle articulated by David Parnas in his influential 1972 paper "On the Criteria To Be Used in Decomposing Systems into Modules." Parnas argued that modules should hide design decisions that are likely to change, exposing only stable interfaces. Ole-Johan Dahl and Kristen Nygaard implemented encapsulation mechanisms in Simula 67 (1967) with classes that bundled data and procedures. Alan Kay's Smalltalk (1972) made encapsulation a core tenet of object-oriented programming: all instance variables in Smalltalk are private, accessible only through methods. The principle was refined through C++ (access specifiers: public, protected, private), Java, and C#, and remains a cornerstone of modern OOP.

## How It Works

Encapsulation operates through two mechanisms. **Bundling** groups related data and behavior into a class, ensuring that the methods that manipulate an object's data live with that data. **Access restriction** uses visibility modifiers (private, protected, public) to control what external code can see and modify.

Private fields cannot be accessed directly from outside the class. Public methods provide controlled access: getters return data (possibly transformed), setters validate input before modifying state, and behavior methods perform operations that maintain invariants. The internal representation can change without affecting any code outside the class, as long as the public interface remains stable.

## When to Apply It

Encapsulation applies to virtually all object-oriented design. Specifically, make fields private when the object must maintain invariants (e.g., a `BankAccount` must never have a negative balance without an overdraft agreement), when the internal representation may change (e.g., switching from a list to a hash map internally), when access should be logged or validated, or when thread safety requires controlled state modification.

## Common Pitfalls

Generating public getters and setters for every private field (the "anemic domain model" anti-pattern) exposes all internal state and defeats the purpose of encapsulation. Encapsulation means exposing behavior, not data. Reflection and serialization frameworks can bypass access restrictions, creating backdoor dependencies on internal state. In dynamic languages (Python, JavaScript), encapsulation relies on convention (underscore prefixes) rather than compiler enforcement, requiring disciplined adherence.

## Relationship to Other Principles

Encapsulation supports the Law of Demeter (objects communicate through narrow interfaces), Abstraction (hiding implementation complexity), and SRP (bundled data and methods form a cohesive unit). It enables the Open-Closed Principle by allowing internal changes without affecting clients.

## Sources

1. Parnas, D.L. (1972). "On the Criteria To Be Used in Decomposing Systems into Modules." *Communications of the ACM*, 15(12).
2. Dahl, O.-J., Nygaard, K. (1966). "SIMULA: An ALGOL-Based Simulation Language." *Communications of the ACM*, 9(9).
3. Bloch, J. (2008). *Effective Java*, 2nd Edition. Addison-Wesley.
4. Martin, R.C. (2008). *Clean Code: A Handbook of Agile Software Craftsmanship*. Prentice Hall.
