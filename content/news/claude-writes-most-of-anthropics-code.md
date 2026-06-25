---
title: "Claude now writes more than 80% of Anthropic's code"
description: "Anthropic says Claude authored over 80% of the code merged into its production codebase in May 2026, up from low single digits in early 2025."
date: 2026-06-25
lastmod: 2026-06-25
categories: [News]
tags: ["anthropic", "claude", "ai-agents", "software-engineering"]
related:
  - glossary/ai-agents
  - glossary/agentic-loops
---

<figure class="bz-figure"><img src="/img/enterprise-dark/gears-neural-wires-notext.png" alt="Interlocking dark gears laced with red neural wires, suggesting machine-assisted engineering." loading="lazy"><figcaption>Anthropic now describes much of its own engineering as a loop where the model writes the code and people set the direction.</figcaption></figure>

Anthropic has disclosed that Claude authored more than 80% of the code merged into its production codebase in May 2026. That share was in the low single digits when Anthropic launched Claude Code in February 2025. For anyone planning headcount or budget around AI-assisted engineering, it is one of the clearest first-party data points yet on how far code generation has moved inside a frontier lab.

## What Anthropic reported

The figure measures code that was merged into production, not code that was merely suggested. Anthropic also said the average engineer now merges roughly eight times as much code per day as in 2024. The company frames the change as a shift in where human effort goes, not a removal of it.

| | Early 2025 | May 2026 |
|---|---|---|
| **Claude's share of merged code** | low single digits | more than 80% |
| **Reference point** | Claude Code launch (Feb 2025) | latest disclosure |
| **Engineer code merged per day** | 2024 baseline | about 8x baseline |
| **Stated human role** | writing most code | setting goals, checking outputs |

Anthropic has also signalled it expects the share to keep climbing, pointing toward 90% within 2026. That part is a projection, not a measured result, and should be read as the company's own expectation rather than a fact.

## Why the number is high but narrow

The 80% figure counts lines authored by the model, weighted toward routine and well-scoped work. Choosing what to build, framing the problem, and deciding whether a result can be trusted remain human tasks. Anthropic describes the remaining human edge as research judgment: picking the right problem, trusting the right result, and knowing when an experiment is finished.

That distinction matters for reading the headline correctly. A high authorship share does not mean engineering disappears. It means the implementation step is increasingly automated while specification and verification stay with people.

<div class="bz-flow"><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Human sets the goal</span><span class="bz-flow-step-desc">A person frames the problem and the constraints.</span></div><div class="bz-flow-arrow">&rarr;</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Model writes code</span><span class="bz-flow-step-desc">Claude drafts the implementation across the codebase.</span></div><div class="bz-flow-arrow">&rarr;</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Human verifies</span><span class="bz-flow-step-desc">A person reviews, tests, and decides whether to merge.</span></div><div class="bz-flow-arrow">&rarr;</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Code is merged</span><span class="bz-flow-step-desc">Reviewed output enters the production codebase.</span></div></div>

This loop is the practical shape of an [agentic loop](/glossary/agentic-loops/): the model takes an instruction, produces work, and a check decides what happens next. The model does the volume; the human owns the boundary.

## The recursive self-improvement framing

Anthropic placed the disclosure inside a broader argument about AI that helps build AI. Its research arm noted that AI has already started to speed up AI development, and warned this trend could move toward recursive self-improvement, the point at which a model designs and trains a more capable successor with little human input.

The company says it is not at that point. It characterised the feedback loop as incomplete and said recursive self-improvement is not inevitable. It also called for frontier labs, policymakers, and researchers to design a mechanism that could slow or pause development if such self-improvement began to outpace safety work.

For builders, the operational takeaway is narrower than the safety debate. The same review and testing that catch a junior developer's mistakes still apply when an [AI agent](/glossary/ai-agents/) writes the code. The volume of generated code rises, so the cost of weak verification rises with it.

## What it means for teams building with AI

The disclosure feeds the "AI-native team" narrative: small teams shipping far more code because agents handle implementation. Treat the 80% figure as evidence that the bottleneck is moving, not vanishing. Several points are worth holding onto:

- The number is specific to Anthropic, a lab whose engineers build the tools they use. Results in other organisations will differ.
- Authorship share is not the same as value share. Deciding what to build and confirming it works still drives most of the risk and most of the cost.
- More generated code raises the importance of code review, tests, and clear ownership of which problems matter.

If you are sizing a project, the lesson is to budget for direction and verification, not to assume engineering headcount falls in proportion to the authorship figure. Working across [multiple environments](/guides/working-with-multiple-environments/) safely becomes more important as the amount of machine-written code grows.

## Further reading

- [What is an AI agent](/glossary/ai-agents/): the system pattern behind code-writing assistants.
- [Agentic loops](/glossary/agentic-loops/): how an agent takes an instruction, acts, and checks the result.
- [Working with multiple environments](/guides/working-with-multiple-environments/): keeping generated code safe between development and production.
- [VentureBeat coverage](https://venturebeat.com/technology/anthropic-says-80-of-its-new-production-code-is-now-authored-by-claude-how-your-enterprise-can-keep-up): enterprise framing of the disclosure.
- [Tom's Hardware coverage](https://www.tomshardware.com/tech-industry/artificial-intelligence/anthropic-says-claude-now-writes-more-than-80-percent-of-its-merged-code): the recursive self-improvement angle.

## Sources

- [VentureBeat](https://venturebeat.com/technology/anthropic-says-80-of-its-new-production-code-is-now-authored-by-claude-how-your-enterprise-can-keep-up)
- [Tom's Hardware](https://www.tomshardware.com/tech-industry/artificial-intelligence/anthropic-says-claude-now-writes-more-than-80-percent-of-its-merged-code)
- [The Neuron](https://www.theneurondaily.com/p/anthropic-ai-is-building-ai-now)
