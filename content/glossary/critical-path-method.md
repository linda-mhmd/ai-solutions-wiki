---
title: "Critical Path Method (CPM)"
description: "A schedule analysis technique that identifies the longest sequence of dependent activities determining the minimum project duration."
date: 2026-03-28
categories: [Glossary]
tags: [critical-path, project-management, scheduling, CPM, planning]
last_updated: 2026-05-30
---

The Critical Path Method (CPM) is a project scheduling technique that identifies the longest sequence of dependent activities (the critical path) through a project network. The critical path determines the shortest possible project duration; any delay to a critical-path activity directly delays the project completion date.

## Origins and History

CPM was developed in 1957 by Morgan Walker of DuPont and James Kelley Jr. of Remington Rand as a method for scheduling plant maintenance shutdowns at DuPont chemical facilities. The first application reduced the shutdown time of a DuPont plant from 125 hours to 78 hours. Around the same time, the US Navy developed PERT (Program Evaluation and Review Technique) for the Polaris missile program, which added probabilistic time estimates to network scheduling. While PERT and CPM were developed independently, they share the same underlying network analysis technique and are often discussed together. By the 1960s, CPM became standard practice in construction, engineering, and defense projects. Modern project management software (Microsoft Project, Primavera P6, Smartsheet) implements CPM as a core scheduling algorithm.

## How It Works

CPM involves defining all project activities and their dependencies, estimating the duration of each activity, constructing a network diagram (activity-on-node or activity-on-arrow), and performing a **forward pass** (calculating the earliest start and finish for each activity) and a **backward pass** (calculating the latest start and finish without delaying the project). The **float** (or slack) for each activity is the difference between its latest and earliest start times. Activities with zero float form the critical path. Any delay to a zero-float activity delays the entire project. **Near-critical paths** (activities with very small float) also require monitoring as they can easily become critical.

## Practical Applications

CPM is used in construction project planning, software development scheduling, event planning, manufacturing process design, and any project where understanding task dependencies and time constraints is essential. It informs resource leveling, schedule compression (crashing and fast-tracking), and earned value analysis.

## Sources

1. Kelley, J.E. and Walker, M.R. (1959). "Critical-Path Planning and Scheduling." *Proceedings of the Eastern Joint Computer Conference*, 160-173.
2. Project Management Institute (2021). *A Guide to the Project Management Body of Knowledge (PMBOK Guide)*, 7th ed. PMI.
3. Moder, J.J., Phillips, C.R., and Davis, E.W. (1983). *Project Management with CPM, PERT, and Precedence Diagramming*, 3rd ed. Van Nostrand Reinhold.
