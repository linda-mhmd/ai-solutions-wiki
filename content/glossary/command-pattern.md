---
title: "Command Pattern"
description: "A behavioral design pattern that encapsulates a request as an object, allowing parameterization of clients with different requests, queuing, logging, and undoable operations."
date: 2026-03-28
categories: [Glossary]
tags: [design-patterns, behavioral-patterns, GoF, command, undo, object-oriented-design]
related:
  - glossary/memento-pattern
  - glossary/chain-of-responsibility-pattern
  - glossary/strategy-pattern
  - glossary/observer-pattern
last_updated: 2026-05-30
---

The Command pattern is a behavioral design pattern that encapsulates a request as an object, thereby allowing you to parameterize clients with different requests, queue or log requests, and support undoable operations.

## Origins and History

The Command pattern was cataloged by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides in *Design Patterns: Elements of Reusable Object-Oriented Software* (1994). The concept has roots in callback mechanisms from procedural programming and in the message-passing paradigm of Smalltalk. The pattern formalized how GUI frameworks decouple menu items and buttons from the actions they trigger. MacApp and ET++ both used command objects extensively for implementing undo/redo functionality in document-based applications.

## How It Works

The **Command** interface declares an `execute()` method. A **ConcreteCommand** binds together a receiver and an action, implementing `execute()` by invoking the corresponding operation on the receiver. The **Receiver** knows how to perform the actual work. The **Invoker** stores a Command and triggers it at the appropriate time. The **Client** creates a ConcreteCommand and sets its receiver.

For undo support, the Command interface adds an `undo()` method, and each ConcreteCommand stores enough state to reverse its effect. An undo history is maintained as a stack of executed commands.

## When to Use It

Use Command when you want to parameterize objects with an action to perform, when you need to specify, queue, and execute requests at different times, when you need undo/redo functionality, when you want to log changes for crash recovery, or when you need to structure a system around high-level operations built on primitive operations (transactions). Common applications include GUI button actions, task scheduling, macro recording, transaction systems, and CQRS architectures.

## Common Pitfalls

Every distinct action requires its own ConcreteCommand class, which can lead to a large number of small classes. Commands that store significant state for undo consume memory proportional to the history depth. Complex undo logic (especially when commands interact or have side effects on external systems) can be difficult to implement correctly.

## Relationship to Other Patterns

Command can use Memento to store state needed for undo. Chain of Responsibility can pass Command objects along a handler chain. Strategy and Command both encapsulate behavior, but Command focuses on when and by whom an action is triggered, while Strategy focuses on choosing among algorithm variants.

## Sources

1. Gamma, E., Helm, R., Johnson, R., Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
2. Freeman, E., Robson, E. (2004). *Head First Design Patterns*. O'Reilly Media.
3. Nystrom, R. (2014). *Game Programming Patterns*. Genever Benning.
