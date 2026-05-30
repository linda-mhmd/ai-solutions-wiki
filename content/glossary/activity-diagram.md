---
title: "Activity Diagram"
description: "A UML behavioral diagram for modeling workflows, business processes, and algorithms with support for parallel execution, branching, and swimlanes."
date: 2026-03-28
categories: [Glossary]
tags: [uml, activity-diagram, workflow, business-process, behavioral-diagrams]
last_updated: 2026-05-30
---

An activity diagram is a UML behavioral diagram that models the flow of activities in a process, workflow, or algorithm. It shows the sequence of actions, decision points, parallel execution paths, and the flow of control from start to finish. Activity diagrams are well-suited for modeling business processes, use case flows, and complex algorithms.

## Key Elements

**Initial node** is a filled circle that marks the starting point of the activity flow. **Activity final node** is a filled circle inside a larger circle that marks the end of the entire activity. **Flow final node** (a circle with an X) terminates a single flow path without ending the entire activity.

**Actions** (activity nodes) are the fundamental units of work, drawn as rounded rectangles. Each action represents a single step in the process: "Validate Order," "Process Payment," "Send Confirmation Email."

**Control flow edges** are arrows connecting nodes, showing the sequence in which actions execute.

**Decision nodes** are diamonds where the flow branches based on a guard condition. Each outgoing edge is labeled with a condition (e.g., [order valid], [order invalid]). **Merge nodes** are also diamonds that rejoin alternative paths into a single flow.

**Fork nodes** are thick horizontal bars that split a single flow into multiple concurrent paths. **Join nodes** are thick bars that synchronize concurrent paths, waiting for all incoming flows to complete before proceeding.

## Swimlanes

Swimlanes (activity partitions) divide the diagram into vertical or horizontal lanes, each representing a responsible actor, department, or system component. Actions are placed in the lane of the entity that performs them. This makes responsibility assignment visually explicit. An order processing diagram might have lanes for Customer, Order Service, Payment Service, and Warehouse.

## Object Flows

Activity diagrams can model the flow of data as well as control. Object nodes (rectangles) represent data objects produced or consumed by actions. Pins on action nodes show inputs and outputs. This is useful for modeling data transformation pipelines.

## When to Use Activity Diagrams

Activity diagrams are the right choice for modeling business processes that involve multiple departments or systems, use case scenarios with complex branching and concurrency, workflow engines and orchestration logic, and algorithms with parallelism. They are less suitable for modeling object interactions (use sequence diagrams) or state-dependent behavior (use state machine diagrams).

## Origins and History

Activity diagrams evolved from flowcharts and Petri nets. The formal semantics of concurrent execution in activity diagrams draw from Carl Adam Petri's work on Petri nets (1962) [1]. UML 1.0 (1997) included activity diagrams as a variant of state diagrams. UML 2.0 (2005) significantly overhauled them with token-based semantics inspired by Petri nets, making them a first-class diagram type with proper support for concurrency and object flow [2].

## Sources

1. Petri, C.A. (1962). "Kommunikation mit Automaten." Ph.D. dissertation, University of Bonn.
2. Object Management Group (2017). "Unified Modeling Language Specification Version 2.5.1." [https://www.omg.org/spec/UML/2.5.1](https://www.omg.org/spec/UML/2.5.1)
