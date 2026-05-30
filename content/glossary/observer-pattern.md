---
title: "Observer Pattern"
description: "A behavioral design pattern that defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically."
date: 2026-03-28
categories: [Glossary]
tags: [design-patterns, behavioral-patterns, GoF, observer, publish-subscribe, event-driven, object-oriented-design]
related:
  - glossary/mediator-pattern
  - glossary/event-driven-architecture
  - glossary/pub-sub
  - glossary/state-pattern
last_updated: 2026-05-30
---

The Observer pattern is a behavioral design pattern that defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically. It is also known as the Publish-Subscribe pattern.

## Origins and History

The Observer pattern was cataloged by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides in *Design Patterns: Elements of Reusable Object-Oriented Software* (1994). The pattern has roots in Smalltalk's Model-View-Controller (MVC) architecture from the late 1970s at Xerox PARC, where the Model (subject) notified Views (observers) of state changes. The pattern formalized the decoupling between data producers and data consumers that was already standard practice in GUI frameworks and event systems.

## How It Works

The **Subject** maintains a list of observers and provides methods to attach, detach, and notify them. When its state changes, the Subject calls `notify()`, which iterates through all registered observers and calls their `update()` method. The **Observer** interface declares the `update()` method that subjects call. **ConcreteObservers** implement `update()` to synchronize their state with the subject's state.

Two notification models exist. In the **push model**, the Subject sends detailed change information to observers as parameters of `update()`. In the **pull model**, the Subject sends minimal notification and observers query the Subject for the details they need.

## When to Use It

Use Observer when a change to one object requires changing others and you do not know how many objects need to change, when an object should notify other objects without making assumptions about who they are, or when you need a broadcast communication mechanism. Common applications include GUI event handling, reactive data binding, stock price feeds, social media notification systems, and the reactive programming paradigm (RxJS, Project Reactor).

## Common Pitfalls

The notification order among observers is typically undefined, which can cause problems if observers have interdependencies. Memory leaks occur when observers are registered but never unregistered (the "lapsed listener" problem). Cascading updates happen when an observer's update triggers further notifications, potentially causing infinite loops. In distributed systems, ensuring reliable delivery and ordering of notifications adds significant complexity.

## Relationship to Other Patterns

Mediator centralizes communication that Observer distributes. Observer is used within MVC, MVVM, and event-driven architectures. Command can encapsulate the notifications for queuing or logging purposes.

## Sources

1. Gamma, E., Helm, R., Johnson, R., Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
2. Freeman, E., Robson, E. (2004). *Head First Design Patterns*. O'Reilly Media.
3. Reactivex.io. "ReactiveX - Observable." [http://reactivex.io/](http://reactivex.io/)
