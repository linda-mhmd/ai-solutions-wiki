---
title: "BPMN - Business Process Model and Notation"
description: "A standardized graphical notation for specifying business processes in workflow and process diagrams."
date: 2026-03-28
categories: [Glossary]
tags: [BPMN, BPM, process-modeling, OMG, workflow]
last_updated: 2026-05-30
---

Business Process Model and Notation (BPMN) is a standardized graphical notation used to model business processes in a format that is understandable by both business analysts and technical implementers. It provides a common visual language for documenting, analyzing, and automating workflows across organizations.

## Origins and History

BPMN was originally developed by the Business Process Management Initiative (BPMI.org), with the first specification (BPMN 1.0) released in 2004 under the leadership of Stephen A. White. In 2005, BPMI.org merged with the Object Management Group (OMG), which took over stewardship of the standard. OMG released BPMN 2.0 in 2011, a major revision that added formal execution semantics, making diagrams directly executable by process engines. This version bridged the long-standing gap between business-readable process diagrams and technically executable workflow definitions.

## Core Concepts

BPMN diagrams use four main element categories. **Flow objects** include events (circles), activities (rounded rectangles), and gateways (diamonds) that represent what happens in a process. **Connecting objects** such as sequence flows, message flows, and associations link flow objects together. **Swimlanes** (pools and lanes) organize activities by participant or role. **Artifacts** like data objects, groups, and annotations provide additional context without affecting process flow.

A typical BPMN diagram reads left to right, beginning with a start event, passing through activities and decision gateways, and concluding at one or more end events. Gateways control branching: exclusive gateways route to exactly one path, parallel gateways fork into concurrent paths, and inclusive gateways allow one or more paths based on conditions.

## Practical Applications

BPMN is widely used for documenting as-is and to-be processes during business transformation projects, for generating executable process definitions consumed by workflow engines such as Camunda or jBPM, and for regulatory compliance documentation where auditable process definitions are required.

## Sources

1. White, S.A. (2004). "Business Process Modeling Notation (BPMN) Version 1.0." BPMI.org.
2. Object Management Group (2011). "Business Process Model and Notation (BPMN) Version 2.0." OMG Document Number: formal/2011-01-03. [https://www.omg.org/spec/BPMN/2.0](https://www.omg.org/spec/BPMN/2.0)
3. Silver, B. (2009). *BPMN Method and Style*. Cody-Cassidy Press.
