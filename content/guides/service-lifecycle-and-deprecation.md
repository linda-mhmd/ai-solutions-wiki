---
title: "How Technology Dies: The Service Lifecycle from Launch to Legacy"
description: "Technology fades through stages, from active to maintenance to legacy to end of life. A guide to the service lifecycle, real deprecation examples, and how to avoid being trapped."
date: 2026-06-23
categories: [Guides]
tags: ["legacy", "deprecation", "lifecycle", "technical-debt", "migration", "risk", "beginner"]
tools: []
related:
  - glossary/technical-debt
  - guides/ai-for-legacy-modernization
  - guides/software-licensing-and-vendor-lock-in
  - guides/history-of-it
  - news/aws-service-deprecations-2026
last_updated: 2026-09-03
---

The service lifecycle describes how a piece of technology moves from brand new to abandoned. It does not happen overnight. A tool drifts through predictable stages, and at each stage the cost of leaving climbs higher. Understanding this pattern explains why banks still run software written in the 1980s, and why "legacy" makes engineers wince while everyone else shrugs.

<figure class="bz-figure">
  <img src="/img/wardrobe/shadows-technical-debt.png" alt="Shadowed garments hanging in a dark wardrobe, their detail lost to gloom. Technology fades into legacy the same way, slowly and out of sight." loading="lazy">
  <figcaption>Technology rarely dies in one moment. It fades into the shadows one stage at a time.</figcaption>
</figure>

## The five stages

Every product, library, and service follows roughly the same path. Vendors use different words for it, but the shape is always the same.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Stage 1</span><span class="bz-flow-step-name">Active</span><span class="bz-flow-step-desc">Current, recommended, getting new features.</span></div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Stage 2</span><span class="bz-flow-step-name">Maintenance only</span><span class="bz-flow-step-desc">Supported, but no major new features.</span></div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Stage 3</span><span class="bz-flow-step-name">Closed to new customers</span><span class="bz-flow-step-desc">Existing users kept, no longer sold to newcomers.</span></div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Stage 4</span><span class="bz-flow-step-name">Legacy, still running</span><span class="bz-flow-step-desc">Past its prime, kept because replacing it costs too much.</span></div>
  <div class="bz-flow-arrow">&rarr;</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Stage 5</span><span class="bz-flow-step-name">Discontinued</span><span class="bz-flow-step-desc">End of life. No support, no security fixes.</span></div>
</div>

## What each stage means

### Stage 1: Active

The technology is current. The vendor recommends it for new projects. It receives new features, performance improvements, and security patches. Documentation is fresh and the community is busy. This is the safest stage to build on, because the road ahead is long.

### Stage 2: Maintenance only

The product still works and still gets security fixes, but the big investment has moved elsewhere. New features slow to a trickle or stop. The vendor is steering you toward a newer option. You are safe for now, yet the clock has started. Watch for an end-of-life date in the release notes.

### Stage 3: Closed to new customers

The vendor stops selling the product to newcomers but keeps existing users running. You may hear this called "sunset", "deprecated for new use", or "available to current customers only". If you already depend on it, you can stay. If you are choosing a tool today, treat this as a warning sign and look at what replaced it.

### Stage 4: Legacy, still running

The product is past its prime. The vendor wants it gone, but enough customers depend on it that switching off would cause real damage. So it keeps running, often for years. The system works, the team grows nervous, and migration sits on a roadmap that never quite arrives. This is where most "legacy" lives.

### Stage 5: Discontinued

End of life. The vendor stops all support. No more security patches, no bug fixes, no help desk. Anything still running on it is exposed. New flaws never get fixed, so attackers target these systems first. If you reach this stage without a plan, you are running on borrowed time.

## Why legacy persists: the economics

People assume old systems survive through laziness. The real reason is arithmetic. An organization keeps a system when the cost and risk of migrating exceed the cost and risk of staying. Migration is expensive, slow, and risky. A running system, even an old one, earns its keep every day.

Consider mainframes and COBOL, the language behind much of the world's banking. Banks process trillions of euros through COBOL programs written decades ago. Those programs are correct, fast, and battle-tested. Rewriting them means re-encoding rules nobody fully remembers, then proving the new system matches the old one to the cent. One mistake can move real money. The safe choice is to keep paying for the old system.

Windows XP tells the same story in hardware. Its extended support ended on 2014-04-08, yet it kept running in ATMs, hospital equipment, and factory machines for years. The software was glued to physical devices that cost a fortune to replace. The machine still dispensed cash, so the bank kept the old operating system rather than swap out a network of ATMs.

In both cases the system is not loved. It is trapped, and so is the owner. Staying feels cheaper than leaving, right up until a security breach or a vendor cutoff changes the math.

## Good deprecation vs bad deprecation

Deprecation means announcing that something will be removed, so people can prepare. Done well, it gives users a clear date, a migration path, and time to act. Done badly, it strands people with no warning.

The Kubernetes dockershim removal is the model for good deprecation. Kubernetes announced in December 2020 that it would deprecate the dockershim component in version v1.20. The team published a blog post titled "Don't Panic", explained exactly what was changing, and gave concrete migration guidance. The actual removal did not land until v1.24 in May 2022. That is roughly eighteen months of warning, with documentation pointing every user to a supported runtime. Anyone who read the notes had ample time to switch.

Bad deprecation is the opposite. A vendor switches off a service with little notice, no migration tool, and no replacement. Users discover the change when something breaks in production. The lesson for builders is to favor vendors with published lifecycle policies and long, signposted deprecation windows. A clear end-of-life date is a gift, not a threat.

## Real examples

History is full of technologies at every stage. These five show the range, from systems that survived long past death to clean, well-planned sunsets.

- **Windows XP (legacy, accepted).** Released in 2001, extended support ended 2014-04-08. It kept running in ATMs and industrial systems for years afterward, because the hardware around it was too costly to replace.
- **Adobe Flash (discontinued).** Adobe set the end of life for 2020-12-31 and blocked Flash content from running in January 2021. Years of warning gave the web time to move on, and the shutoff still broke old sites overnight.
- **Google Reader (free-service shutdown).** Launched in 2005, shut down on 2013-07-01. It was free, popular, and gone with months of notice. The lesson is sharp: do not build anything critical on a free vendor service, because the vendor owes you nothing.
- **Python 2 (well-planned sunset).** Python 2 reached end of life on 2020-01-01. Migration to Python 3 began back in 2008, so the community had over a decade to move. This is what a calm, signposted death looks like.
- **Red Hat CentOS (abrupt strategy shift).** On 2020-12-08, Red Hat ended CentOS Linux and pushed users to CentOS Stream. It cut CentOS 8 support from 2029 to the end of 2021, an eight-year jump forward. The backlash spawned two community forks, Rocky Linux and AlmaLinux, built to restore what users lost.

## What's mid-lifecycle right now

The stages above are not just history. As of September 2026, several AI and cloud services are moving through Stage 5 at the same time, all landing within a few days of each other:

| Service | Vendor | Key date | Points to |
|---|---|---|---|
| **AWS App Mesh** | AWS | 2026-09-30, full discontinuation | Amazon ECS Service Connect or Amazon VPC Lattice |
| **Amazon Nova Reel v1:1** (Bedrock) | AWS | 2026-09-30, model end of life | A newer Bedrock video model |
| **gemini-omni-flash-preview** | Google | 2026-09-30, endpoint shutdown | `gemini-omni-1.1-flash` |
| **[Azure AI Personalizer](/tools/azure-personalizer/)** | Microsoft | 2026-10-01, service retirement | The open-source `microsoft/learning-loop` project |

App Mesh and Personalizer are full Stage 5 shutdowns: after the date, the console and API stop responding, not merely stop accepting new customers. The two model retirements are the same pattern applied to a model ID instead of a service, once the EOL date passes, a call to that endpoint stops working, exactly like an API losing support. Nova Reel's v1:0 build carries the identical 2026-09-30 end-of-life date, so both versions leave at once. Personalizer's own date is worth treating as provisional: Microsoft's original 2023 announcement and most current documentation say 1 October 2026, but Microsoft's own product-lifecycle tracker page currently lists 26 August 2026 for the same retirement, an unresolved conflict between Microsoft's own properties rather than a settled date.

This wave is not an isolated event. Earlier in 2026, AWS moved a much larger batch of AI services, Kendra, the original Bedrock Agents, Amazon Q Business, into maintenance mode on their own separate timeline; see [AWS consolidates its AI stack](/news/aws-service-deprecations-2026/) for that fuller list and for how "maintenance mode" and "closed to new customers" differ from a hard shutdown like the ones above.

## How to respond at each stage

You cannot stop the lifecycle, but you can read where a technology sits and act early. The right move depends on the stage.

| | Stage signal | Risk level | What to do |
|---|---|---|---|
| **Active** | New features shipping | Low | Build with confidence |
| **Maintenance** | Features slowing down | Low to medium | Note the EOL date |
| **Closed to new** | No longer sold | Medium | Plan a replacement |
| **Legacy** | Vendor pushing successor | High | Budget the migration now |
| **Discontinued** | No security patches | Critical | Migrate or isolate fast |

## How to plan for it

You avoid being trapped by treating the lifecycle as a known fact, not a surprise. Four habits keep you ahead of it.

- **Track end-of-life dates.** Keep a list of every critical dependency and its published EOL date. Review it every quarter.
- **Budget migration before it is forced.** Migrating on your schedule costs far less than migrating in a panic. Set money and time aside while the system still works.
- **Avoid depending on free tiers for anything critical.** A free service can vanish with little notice, as Google Reader did. Pay for the things you cannot afford to lose.
- **Keep an exit plan.** Before you adopt a tool, know how you would leave it. Favor open standards and portable data, so switching stays possible.

The systems that hurt are the ones nobody planned to leave. Watch the stages, mark the dates, and you turn a slow death into a managed move.

## Further reading

- [The history of IT](/guides/history-of-it/): how each generation of technology rose and gave way to the next.
- [Technical debt](/glossary/technical-debt/): why deferred maintenance compounds and pushes systems toward legacy.
- [AI for legacy modernization](/guides/ai-for-legacy-modernization/): using AI to understand and migrate old systems.
- [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/): how licensing choices raise the cost of leaving.
- [AWS consolidates its AI stack](/news/aws-service-deprecations-2026/): a 2026 wave of AI services moved to maintenance mode, and what that term actually means.
- [Microsoft Windows XP lifecycle](https://learn.microsoft.com/en-us/lifecycle/products/windows-xp): the official support dates for a famous legacy system.
- [Sunsetting Python 2](https://www.python.org/doc/sunset-python-2/): a model end-of-life announcement with a long migration window.
- [Don't Panic: Kubernetes and Docker](https://kubernetes.io/blog/2020/12/02/dont-panic-kubernetes-and-docker/): the dockershim deprecation, explained calmly and early.
- [AWS App Mesh end-of-support notice](https://docs.aws.amazon.com/app-mesh/latest/userguide/doc-history.html): the 30 September 2026 discontinuation date, stated directly in the doc history.
- [Amazon Nova Reel model card](https://docs.aws.amazon.com/bedrock/latest/userguide/model-card-amazon-nova-reel.html): Bedrock's own EOL date for the Nova Reel v1:0/v1:1 models.
- [Gemini API deprecations](https://ai.google.dev/gemini-api/docs/deprecations): Google's list of retiring model endpoints, including `gemini-omni-flash-preview`.
- [Azure Personalizer product lifecycle](https://learn.microsoft.com/en-us/lifecycle/products/azure-personalizer): Microsoft's own lifecycle tracker, which lists 26 August 2026 as the retirement date, conflicting with the 1 October 2026 date used above and given in the [original 2023 retirement announcement](https://azure.microsoft.com/updates/ai-services-personalizer-will-be-retired-on-1-october-2026/) — an unresolved discrepancy between Microsoft's own sources at the time of writing.
