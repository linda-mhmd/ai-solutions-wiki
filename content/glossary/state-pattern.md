---
title: "State Pattern"
description: "A behavioral design pattern that allows an object to alter its behavior when its internal state changes, appearing to change its class."
date: 2026-03-28
categories: [Glossary]
tags: [design-patterns, behavioral-patterns, GoF, state, finite-state-machine, object-oriented-design]
related:
  - glossary/strategy-pattern
  - glossary/singleton-pattern
  - glossary/flyweight-pattern
  - glossary/object-oriented-programming
last_updated: 2026-05-30
---

The State pattern is a behavioral design pattern that allows an object to alter its behavior when its internal state changes. The object appears to change its class because its behavior changes completely based on its current state.

## Origins and History

The State pattern was cataloged by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides in *Design Patterns: Elements of Reusable Object-Oriented Software* (1994). The pattern provides an object-oriented representation of finite state machines (FSMs), a concept from automata theory dating back to the 1950s. The GoF recognized that large conditional statements (switch/case or if-else chains) that select behavior based on state variables are difficult to maintain and extend, and proposed distributing state-specific behavior into separate state classes.

## How It Works

The **Context** is the object whose behavior varies with its state. It maintains a reference to a current State object and delegates state-specific behavior to it. The **State** interface declares methods for each action the context can perform. **ConcreteState** classes implement behavior specific to a particular state and may trigger state transitions by replacing the Context's current state object with a different ConcreteState.

When the Context receives a request, it delegates to its current State object. The State object performs the work and, if appropriate, transitions the Context to a new state by setting a new ConcreteState instance. This replaces conditional logic with polymorphism.

## When to Use It

Use State when an object's behavior depends on its state and it must change behavior at runtime based on that state, when operations have large conditional statements that depend on the object's state (replacing those conditionals with state classes), or when state transitions follow well-defined rules. Common applications include order processing workflows, TCP connection states, game character behavior, media player controls, and document approval pipelines.

## Common Pitfalls

The pattern increases the number of classes in the system, with one class per state. If there are many states with little behavioral difference between them, the overhead may not be justified. Determining where transition logic belongs (in the Context, in the State, or in a separate transition table) can lead to design debates. Shared state objects (to avoid creating new state instances) require that state classes be stateless, which limits their flexibility.

## Relationship to Other Patterns

State and Strategy have identical structures but different intents: State encapsulates state-dependent behavior that changes over time, while Strategy encapsulates interchangeable algorithms chosen once. State objects can be Singletons or Flyweights if they carry no per-context data.

## Sources

1. Gamma, E., Helm, R., Johnson, R., Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
2. Freeman, E., Robson, E. (2004). *Head First Design Patterns*. O'Reilly Media.
3. Nystrom, R. (2014). *Game Programming Patterns*. Genever Benning.
