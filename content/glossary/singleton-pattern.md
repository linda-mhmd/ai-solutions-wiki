---
title: "Singleton Pattern"
description: "A creational design pattern that ensures a class has only one instance and provides a global point of access to it."
date: 2026-03-28
categories: [Glossary]
tags: [design-patterns, creational-patterns, GoF, singleton, object-oriented-design]
related:
  - glossary/factory-method-pattern
  - glossary/abstract-factory-pattern
  - glossary/object-oriented-programming
last_updated: 2026-05-30
---

The Singleton pattern is a creational design pattern that restricts the instantiation of a class to a single object and provides a global access point to that instance. It is one of the simplest yet most debated patterns in the Gang of Four catalog.

## Origins and History

The Singleton pattern was formally cataloged by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides in their landmark book *Design Patterns: Elements of Reusable Object-Oriented Software* (1994), commonly known as the "Gang of Four" (GoF) book. The concept of a single shared resource existed in earlier systems programming, but the GoF gave it a formal name, structure, and documented its trade-offs within the broader pattern language.

## How It Works

The pattern involves three key elements. First, the class constructor is made private or protected so that external code cannot create new instances. Second, a static method (often called `getInstance()`) returns the sole instance, creating it on the first call and returning the existing one on subsequent calls. Third, the single instance is stored as a private static field within the class itself.

The result is that every part of the application that needs this object receives the same instance, ensuring consistent state and avoiding duplicate resource allocation.

## When to Use It

Singleton is appropriate when exactly one instance of a class must coordinate actions across a system. Common use cases include logging services, configuration managers, connection pools, and hardware interface controllers. The pattern is also useful when the single instance must be extensible by subclassing without modifying client code.

## Common Pitfalls

Singleton is frequently criticized and sometimes called an anti-pattern. It introduces hidden global state, making unit testing difficult because the single instance carries state between tests. It creates tight coupling since client code depends on the concrete Singleton class. In multithreaded environments, naive implementations suffer from race conditions during initialization, requiring double-checked locking or other synchronization mechanisms. Overuse of Singleton often indicates that dependency injection would be a better approach, providing the same single-instance behavior without the global state drawbacks.

## Modern Alternatives

In contemporary software development, dependency injection containers handle single-instance lifecycle management more cleanly. Frameworks like Spring (Java), .NET Core DI, and Angular all support registering a service as a singleton within the container, giving the same one-instance guarantee without the tight coupling and testability problems of the classical GoF Singleton.

## Sources

1. Gamma, E., Helm, R., Johnson, R., Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
2. Freeman, E., Robson, E. (2004). *Head First Design Patterns*. O'Reilly Media.
3. Martin, R.C. (2002). *Agile Software Development, Principles, Patterns, and Practices*. Prentice Hall.
