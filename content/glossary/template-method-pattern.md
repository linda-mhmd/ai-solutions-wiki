---
title: "Template Method Pattern"
description: "A behavioral design pattern that defines the skeleton of an algorithm in a base class, letting subclasses override specific steps without changing the algorithm's structure."
date: 2026-03-28
categories: [Glossary]
tags: [design-patterns, behavioral-patterns, GoF, template-method, inheritance, object-oriented-design]
related:
  - glossary/strategy-pattern
  - glossary/factory-method-pattern
  - glossary/observer-pattern
  - glossary/object-oriented-programming
last_updated: 2026-05-30
---

The Template Method pattern is a behavioral design pattern that defines the skeleton of an algorithm in a method of a base class, deferring some steps to subclasses. It lets subclasses redefine certain steps of an algorithm without changing the algorithm's overall structure.

## Origins and History

The Template Method pattern was cataloged by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides in *Design Patterns: Elements of Reusable Object-Oriented Software* (1994). It is one of the most fundamental patterns in object-oriented programming, appearing naturally in any framework that uses inheritance-based customization. The pattern was already prevalent in Smalltalk class libraries and C++ application frameworks, where base classes defined processing flows with hook methods that subclasses could override. The GoF called it "one of the fundamental techniques for code reuse."

## How It Works

The **AbstractClass** defines the template method, a concrete method that outlines the algorithm as a sequence of steps. Some steps are implemented directly in the base class (invariant behavior), while others are declared as abstract methods (variant behavior) that subclasses must implement. Optional steps called "hook methods" provide default behavior that subclasses may override.

The **ConcreteClass** implements the abstract methods to provide step-specific behavior. The key principle is the "Hollywood Principle" ("Don't call us, we'll call you"): the base class controls the algorithm flow and calls subclass methods at the right moments, inverting the normal direction of control.

## When to Use It

Use Template Method when you want to let clients extend only particular steps of an algorithm without changing the algorithm's structure, when you have several classes with nearly identical algorithms differing in only a few steps, or when you want to control the points at which subclassing is allowed. Common applications include framework lifecycle methods, data processing pipelines with customizable parse/transform/output steps, test framework setup/execute/teardown flows, and document generation with variable formatting.

## Common Pitfalls

Template Method relies on inheritance, which creates tight coupling between base and subclass. Deep inheritance hierarchies become brittle and hard to understand. Subclasses that override too many steps effectively replace the algorithm, defeating the pattern's purpose. The Strategy pattern offers a composition-based alternative that is often more flexible, especially when the varying behavior is independent of the base class.

## Sources

1. Gamma, E., Helm, R., Johnson, R., Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
2. Freeman, E., Robson, E. (2004). *Head First Design Patterns*. O'Reilly Media.
3. Martin, R.C. (2002). *Agile Software Development, Principles, Patterns, and Practices*. Prentice Hall.
