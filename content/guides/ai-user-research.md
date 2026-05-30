---
title: "AI User Research - Testing and Measuring Trust"
description: "User research methods for AI products including Wizard-of-Oz testing, measuring user trust in AI, and designing studies for probabilistic systems."
date: 2026-03-28
categories: [Guides]
tags: [user-research, trust, Wizard-of-Oz, UX-research, AI-products]
related:
  - guides/ai-product-management
  - guides/user-acceptance-testing-ai
  - guides/ai-go-to-market
last_updated: 2026-05-30
---

User research for AI products faces a unique challenge: the system's behavior is non-deterministic, and user trust is fragile. One bad experience can undo weeks of good predictions. Standard usability testing methods need adaptation to account for probabilistic outputs, evolving model behavior, and the asymmetric impact of errors on trust. This guide covers research methods tailored for AI products.

## Wizard-of-Oz Testing

Wizard-of-Oz (WoZ) testing simulates AI behavior using a human behind the scenes. The user interacts with what appears to be an AI system, but a researcher provides the responses. This technique is invaluable for AI products because it lets you test the user experience before building the model.

### When to Use WoZ

- **Before model development.** Test whether users want the AI capability at all before investing in building it. If users do not find value in perfect AI responses, they certainly will not find value in imperfect ones.
- **To calibrate error rates.** Introduce deliberate errors at controlled rates (5%, 10%, 20%) to find the error threshold at which users lose trust or abandon the workflow.
- **To test error recovery UX.** Simulate specific error types and observe how users respond. Do they notice the error? Can they correct it? Does correction feel burdensome?

### Running a WoZ Study

**Setup.** Build a realistic interface. The wizard operates from a separate screen, reviewing user inputs and selecting or typing responses. Use a messaging delay (1-3 seconds) to simulate model inference time.

**Briefing.** Tell participants they are testing a new AI feature. Do not reveal the wizard. Debriefing comes after the session, where the wizard's role is disclosed and participants are asked if they noticed.

**Data collection.** Record task completion time, error identification rate (did the user notice AI errors?), correction actions, and post-task survey responses about trust and satisfaction.

**Sample size.** WoZ studies are qualitative. 8-12 participants per study variant are typically sufficient to identify major UX issues.

## Measuring User Trust

Trust in AI is not a single metric. It has multiple dimensions:

**Competence trust** - Does the user believe the AI is capable of performing the task? Measured by asking: "How confident are you that the system will give you a correct answer?"

**Reliability trust** - Does the user believe the AI will perform consistently? Measured by tracking override rates over time and asking: "Do you expect the system to perform the same tomorrow as it did today?"

**Transparency trust** - Does the user understand why the AI made a specific decision? Measured by asking users to explain the AI's reasoning. If they cannot, the system lacks transparency, which erodes trust.

**Benevolence trust** - Does the user believe the AI has their interests in mind? Relevant for recommendation systems and advisory tools. Measured by asking: "Do you believe the system's suggestions are in your best interest?"

### Trust Measurement Methods

**Trust surveys.** Administer standardized trust scales (e.g., Jian et al.'s Trust in Automation scale or Madsen and Gregor's Human-Computer Trust scale) before and after AI interactions. Track trust scores over time.

**Behavioral proxies.** Override rate (how often users change the AI's suggestion), verification rate (how often users check the AI's work), and automation complacency (how often users accept incorrect AI outputs without checking). These behavioral measures are more reliable than self-reported trust.

**Trust recovery experiments.** Deliberately introduce an AI error after a series of correct outputs. Measure how many correct outputs are needed to restore the user's pre-error behavior. Research shows trust recovery takes 3-5x more positive experiences than the single negative experience that broke trust.

## Designing Studies for Probabilistic Systems

### Within-Subject vs Between-Subject

For comparing AI accuracy levels, use between-subject designs where each participant experiences only one accuracy level. Within-subject designs (where the same participant sees both high and low accuracy) create ordering effects that confound the results.

### Ecological Validity

Lab studies with synthetic tasks underestimate the impact of AI errors. When possible, study users performing their actual work tasks with actual data. The stakes are real, and the behavior is more authentic.

### Longitudinal Studies

Trust evolves over time. A one-session study captures first impressions but not the trust dynamics that develop over weeks of daily use. Diary studies (participants log their experiences daily for 2-4 weeks) and longitudinal observational studies capture the trajectory of trust.

## Common Research Pitfalls

**Testing with curated data.** If the study uses carefully selected inputs where the model performs well, the results will overestimate real-world user satisfaction. Use production-representative data, including inputs where the model struggles.

**Ignoring the cost of errors.** A 95% accuracy rate means 1 in 20 interactions is wrong. If those interactions involve high-stakes decisions (medical, financial, legal), the impact of errors dominates the user experience regardless of the overall accuracy.

**Assuming more accuracy always means more trust.** Users calibrate their expectations. If a system is consistently 85% accurate, users develop efficient checking workflows. An improvement to 90% that is inconsistent (sometimes 95%, sometimes 80%) can actually reduce trust because the system becomes unpredictable.
