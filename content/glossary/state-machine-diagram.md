---
title: "State Machine Diagram"
description: "A UML behavioral diagram that models the states of an object and the transitions between them in response to events, based on Harel statecharts."
date: 2026-03-28
categories: [Glossary]
tags: [uml, state-machine, statecharts, behavioral-diagrams, software-modeling]
last_updated: 2026-05-30
---

A state machine diagram is a UML behavioral diagram that models the discrete states an object can be in during its lifetime and the transitions between those states triggered by events. It captures state-dependent behavior: the same event may produce different responses depending on the object's current state. State machine diagrams are essential for modeling objects with complex lifecycle behavior.

## Key Elements

**States** are drawn as rounded rectangles containing the state name. A state represents a condition during which an object satisfies a constraint, performs an action, or waits for an event. An Order object might have states like Pending, Confirmed, Shipped, Delivered, and Cancelled.

**Transitions** are arrows between states, labeled with the trigger event, an optional guard condition in brackets, and an optional action. The notation is `event [guard] / action`. For example, `paymentReceived [amount >= total] / shipOrder` means: when the paymentReceived event occurs and the amount covers the total, execute the shipOrder action and transition to the next state.

**Initial pseudo-state** is a filled circle indicating the starting state. **Final state** is a filled circle inside a larger circle indicating the object's termination.

**Entry and exit actions** are actions automatically performed when entering or leaving a state. Entry actions initialize the state; exit actions clean up. These are written inside the state rectangle as `entry / action` and `exit / action`.

**Internal transitions** handle events within a state without triggering entry/exit actions or changing state. Written as `event / action` inside the state body.

## Composite States

**Composite (nested) states** contain sub-states, allowing hierarchical decomposition of complex behavior. An Active state might contain sub-states Processing and Waiting. Transitions can target the composite state (entering via the default initial sub-state) or a specific sub-state directly.

**Orthogonal regions** model concurrent sub-states within a composite state. The object is simultaneously in one sub-state from each region, separated by a dashed line within the composite state.

**History pseudo-states** remember which sub-state was active when the composite state was last exited. Shallow history (H) remembers the immediate sub-state; deep history (H*) remembers the entire nested state configuration.

## Practical Applications

State machine diagrams are valuable for modeling protocol state machines (TCP connection states), user interface navigation (screen states and transitions), order processing workflows, embedded system controllers, and any object whose behavior depends on accumulated history. Many frameworks (XState, Spring Statemachine) implement state machines directly from diagram specifications.

## Origins and History

David Harel introduced statecharts in 1987, extending traditional finite state machines with hierarchy (composite states), concurrency (orthogonal regions), and communication [1]. Harel's statecharts solved the "state explosion" problem of flat state machines and became the foundation for UML state machine diagrams. UML adopted and adapted statechart notation from its inception in 1997 [2].

## Sources

1. Harel, D. (1987). "Statecharts: A Visual Formalism for Complex Systems." *Science of Computer Programming*, 8(3), 231-274.
2. Object Management Group (2017). "Unified Modeling Language Specification Version 2.5.1." [https://www.omg.org/spec/UML/2.5.1](https://www.omg.org/spec/UML/2.5.1)
