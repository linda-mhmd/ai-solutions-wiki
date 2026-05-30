---
title: "Foundations"
description: "The engineering principles that make AI systems reliable, maintainable, and production-ready. Timeless patterns that existed before the current AI wave and will endure after the tools change."
last_updated: 2026-05-30
---

---

**Related paths:** This page covers timeless software engineering principles (SOLID, Clean Architecture, DDD, testing, deployment) that apply to AI systems. If you want a conceptual overview of how the wiki organizes AI system components into layers (Applications, Orchestration, Models, Data, Infrastructure), see [The Five Layers of AI Systems](/layers/) instead. Choose Foundations if you want to learn engineering principles; choose Layers if you want a map of the AI stack.

---

Every era of software produces new tools, new frameworks, and new paradigms. The tools change on a cycle of years. The underlying principles change on a cycle of decades, if they change at all.

The principles collected here - SOLID, Clean Architecture, Domain-Driven Design, the testing pyramid, continuous delivery, and the rest - were formalized in the late 1990s and early 2000s. They emerged from practitioners who had spent careers building systems that failed in predictable ways: components too tightly coupled to change, business rules buried in frameworks, test suites that gave false confidence, deployments that required coordination across teams. These principles are the distillation of those failures.

The current AI development environment creates the same pressures in new forms. A system built on a single LLM provider with prompt logic scattered throughout application code, no evaluation harness, and no deployment strategy is not an AI-first system - it is a prototype with the same structural problems that have caused software failures since the 1970s.

Understanding these foundations is what separates a working prototype from a system that can be maintained, extended, and trusted in production. None of the principles here are specific to AI. All of them apply directly to it.
