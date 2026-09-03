---
title: "Constraint-Driven Comparisons: Why 'Better' Is the Wrong Question"
description: "Most technology comparisons rank features and declare a winner. The comparisons on this wiki are built around a different question: what constraint does your organization actually have, and which option does that constraint rule out — independent of which one scores higher on a spec sheet."
date: 2026-09-03
lastmod: 2026-09-03
last_updated: 2026-09-03
categories: [Guides]
tags: ["decision-making", "architecture", "vendor-selection", "comparisons", "methodology", "cloud-strategy"]
related:
  - frameworks/architecture-decision-records
  - guides/shared-responsibility-model
  - comparisons/on-premise-vs-cloud-ai
  - glossary/data-sovereignty
---

A feature-comparison table between two cloud providers, two model vendors, or two deployment models almost always produces the same shape of answer: a grid of checkmarks, a "winner" per row, and a recommendation that reads like "choose A if you need X, choose B if you need Y." This looks like a decision framework. It is usually a spec sheet with a conclusion bolted onto the end — and it quietly imports the failure mode of vendor sales collateral, which is also organized as a feature grid with a foregone conclusion, even when nobody intended that.

The comparisons on this wiki are built around a different starting question, and this page is the methodology behind them: not *which option has more features*, but *what constraint does this organization actually have, and which options does that constraint eliminate* — before features enter the discussion at all.

## Why feature comparison is the wrong default

Three things go wrong when a comparison starts from features.

**It hides the real reason decisions get made.** In practice, nobody chooses a self-hosted deployment, a specific cloud region, or a specific vendor for fun, and rarely purely because it scored higher on a capability matrix. Something makes the alternative unavailable or unacceptable first — a data residency rule, a contract already in force, hardware already paid for, a regulator's expectation, a customer's security questionnaire. A feature comparison is silent about all of this, because features are not where these decisions actually originate.

**It produces false symmetry.** Laying two options side by side in a table implies they are commensurable — that the decision is a weighted sum of rows. Real organizational constraints are usually not weights, they are gates: a system that must keep certain data inside a specific jurisdiction does not have a "how much do we value cloud region" score to trade off against "how much do we value autopilot scaling." One rules the other out, full stop, regardless of how the rest of the table reads.

**It is the same shape as sales material.** A competitive-positioning deck from a vendor's own sales team is, structurally, a feature table with a conclusion. A comparison that only differs from that in which company wins is not neutral by virtue of even-handedness — a scrupulously balanced feature table between two vendors is still asking the reader to reason from spec sheet to purchase, which is exactly the reasoning path sales enablement content is built to shortcut.

## What drives the decision instead

Before comparing two options on any dimension, name the constraint categories that are actually deciding the question for a given reader, and let the comparison be organized around those. The categories below are general-purpose — they recur across cloud-vs-on-prem decisions, vendor selection, build-vs-buy, and platform choice — and this wiki has independent, sourced treatment of most of them already; a good comparison links out to that depth rather than re-deriving it.

**Regulatory and jurisdictional exposure.** Does the data or the use case fall under a rule that constrains where it may be processed, stored, or by whom? This is not one constraint but several distinct ones with different triggers: GDPR's territorial and processing rules, the EU AI Act's risk-tier and transparency obligations (see [governance thresholds as you scale](/guides/governance-thresholds-as-you-scale/) for exactly when each applies), sector-specific rules (health, finance, public sector), and extraterritorial reach like the US CLOUD Act (see [the US CLOUD Act](/glossary/cloud-act/)) that can apply regardless of where a provider's data centre physically sits. This is usually a gate, not a score: a use case that is high-risk under Annex III has the same obligations whether the vendor comparison favours option A or B on every other axis.

**Cost structure and sunk investment.** Not "which is cheaper" in the abstract, but what an organization has already paid for and what its usage pattern actually looks like. Hardware already purchased and depreciating is a sunk cost that changes the marginal economics of a cloud migration regardless of the cloud option's per-unit price; a workload that runs continuously prices very differently against one that runs intermittently (see [on-premise vs cloud for AI workloads](/comparisons/on-premise-vs-cloud-ai/) for the break-even mechanics, and [cloud exit costs and data gravity](/guides/cloud-exit-costs-and-data-gravity/) for what leaving costs, which a point-in-time price comparison never captures).

**Resilience and business continuity requirements.** What does an outage of this specific option actually cost the organization, and does that number change the calculus? A single-region dependency, a single-vendor dependency, and a single-environment dependency are three different resilience risks that a feature table typically flattens into one "reliability" row with a checkmark.

**Vendor lock-in and exit cost.** How hard, specifically, is it to leave once committed — not as a vague worry, but as an actual, checkable cost: proprietary APIs with no equivalent elsewhere, data formats that don't export cleanly, contractual minimums, or a team's accumulated expertise in one vendor's specific tooling. [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/) covers how to make this concrete rather than rhetorical.

**Trust and legal control over the relationship.** Distinct from regulatory exposure: does the organization have a reason — contractual, reputational, or a customer's own requirement — to control which entity can access its data or compel its provider to act, independent of whether that access would currently be lawful. This is where questions like "who can this vendor's government compel to hand over what" belong, not folded into a generic "security" row.

**Data gravity and migration burden.** Once meaningful volumes of data exist somewhere, moving them has a real, calculable cost in time and risk that a per-unit price comparison does not capture (see [cloud exit costs and data gravity](/guides/cloud-exit-costs-and-data-gravity/)). This constraint grows over time, which is exactly why "we'll decide later" is itself a decision with a shelf life.

**Internal capability and knowledge retention.** Does the organization have, or want to build and keep, the expertise to operate an option itself, or is depending on a vendor's operational expertise the actual goal? A self-hosted option is not automatically the sovereign, in-control choice if nobody on the team can operate it reliably — that trades one risk (vendor dependency) for another (single-point-of-failure expertise), and a genuinely neutral comparison names both.

**Contractual and customer-driven requirements.** Sometimes the deciding constraint is not a law or a cost model but a specific counterparty — an enterprise customer's procurement process, a partner's security questionnaire, an existing contract's terms. This is a real, common, and entirely legitimate category of "constraint," and it deserves to be named as what it is rather than folded into "compliance" as if it were governed by the same logic as a regulation.

## The structure a comparison should actually have

**State the constraint categories before the comparison, not after.** A reader should be able to identify which of the categories above actually applies to their situation before reading a single feature row, and skip straight to the section that resolves it.

**Separate gates from tradeoffs explicitly.** Some constraints eliminate an option outright (a jurisdictional rule that makes one location categorically unavailable). Others are genuine tradeoffs worth weighing (marginally higher cost against materially lower operational burden). Conflating the two — presenting a hard gate as if it were just one more row in a scored table — is the single most common way a comparison misleads a reader who has that constraint.

**Only compare features once the constraint-eligible set is established.** If a regulatory or contractual gate already rules one option out for a given reader, a feature-by-feature comparison of that option is irrelevant to them — say so, rather than presenting fifteen rows of specification detail on an option their own constraints have already excluded.

**Source every constraint claim as rigorously as every feature claim.** "This vendor is subject to the CLOUD Act" and "this model supports a 1M token context window" both need a real citation. A comparison that carefully sources feature claims while asserting constraint claims from general impression is not actually more rigorous than a spec sheet — it has just added an unsourced paragraph on top of one.

**Name what the comparison cannot resolve.** Some constraints are organization-specific in a way no general comparison can settle — the exact terms of a specific contract, a specific regulator's read on a specific use case, a specific team's actual capability. State plainly where a reader needs their own legal or architectural review rather than implying the comparison has covered every case.

## What this replaces

The pattern to avoid, concretely: a table of capabilities with one column per option, a checkmark or short phrase per cell, and a closing "Choose A when you need X, choose B when you need Y" section that is itself just the same feature list restated as conditionals. This is not neutral because it lists both options fairly — it is structurally a sales comparison regardless of which side it favours, because it never asks what makes an option unavailable to a given reader in the first place. See [architecture decision records](/frameworks/architecture-decision-records/) for the closest formal analogue to what a constraint-driven comparison is actually doing: recording the context and the forces at play, not just the options and a scorecard.

## Sources

1. Nygard, M. "Documenting Architecture Decisions." (2011) — the original ADR pattern, built around context and forces, not option scoring: [https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
2. "Architectural Decision Records (ADR)" — the community reference site for the ADR pattern and its templates: [https://adr.github.io/](https://adr.github.io/)
3. NIST, "The NIST Definition of Cloud Computing" (SP 800-145) — the essential characteristics and deployment models that inform where genuine tradeoffs versus gates arise: [https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-145.pdf](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-145.pdf)
4. NIST, "Cloud Computing Synopsis and Recommendations" (SP 800-146), Section 4 on cloud deployment decision factors: [https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-146.pdf](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-146.pdf)

## Further reading

- [Architecture decision records](/frameworks/architecture-decision-records/): the formal pattern for recording context and forces, not just options.
- [The shared responsibility model for AI on AWS](/guides/shared-responsibility-model/): a worked example of a decision boundary that is a gate, not a preference.
- [On-premise vs cloud for AI workloads](/comparisons/on-premise-vs-cloud-ai/): cost-structure and control tradeoffs applied concretely.
- [Cloud exit costs and data gravity](/guides/cloud-exit-costs-and-data-gravity/): making the lock-in and migration-burden constraint categories concrete and calculable.
- [The US CLOUD Act](/glossary/cloud-act/): a worked example of a trust/jurisdiction constraint that is not solved by choosing a data centre location.
- [Data sovereignty](/glossary/data-sovereignty/): the vocabulary for separating residency from sovereignty as distinct constraints.
