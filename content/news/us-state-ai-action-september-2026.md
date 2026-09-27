---
title: "States Move on AI Safety: California's Kill-Switch Order and a 26-AG Letter to Congress"
description: "In September 2026 California's governor signed Executive Order N-9-26, which orders recommendations on a frontier-model 'kill switch' and on-site independent auditors by 16 November. A bipartisan group of 26 state attorneys general asked Congress to regulate AI, and Senators Sanders and Casar introduced a bill to pause AI research pending a federal Department of AI."
date: 2026-09-24
lastmod: 2026-09-25
last_verified: 2026-09-25
categories: [News]
tags: [ai-regulation, us-policy, california, state-law, ai-safety, kill-switch, frontier-models, ai-governance]
related:
  - news/us-ai-policy-preemption-2026
  - guides/ai-regulatory-compliance-checklist
  - guides/ai-governance-implementation
  - news/openai-huggingface-breach-july-2026
---

The federal government has spent 2026 [trying to preempt state AI laws](/news/us-ai-policy-preemption-2026/). In September the states pushed back. **California Governor Gavin Newsom signed Executive Order N-9-26 on 18 September 2026.** It speeds up the state's new independent-oversight laws and orders recommendations on requiring a **"kill switch" for frontier models**. On 24 September, **a bipartisan coalition of 26 state attorneys general** wrote to congressional leaders urging federal AI legislation. A day earlier, **Senators Bernie Sanders and Greg Casar** had introduced a bill to pause AI research until a federal Department of Artificial Intelligence exists.

## What happened

### California Executive Order N-9-26 (18 September)

The order, effective immediately, has three operative directives. Each quotation below is from the signed text.

1. **By 1 May 2027**, the Government Operations Agency must set up the certification framework for **independent verification organizations** created by Senate Bill 813, including publishing application requirements and criteria.
2. **By 1 December 2027**, the same agency must complete the initial requirements for the **state registry of AI auditors** created by Assembly Bill 1405.
3. **By 16 November 2026**, the agency, in consultation with the Governor's Office of Emergency Services and "national experts," must recommend on the "technical feasibility and potential efficacy" of amending state AI safety law to cover at least four things:
   - requiring all large frontier developers to **embed designated independent verification organizations onsite in their labs** for periodic audits;
   - requiring **independent verification** of the safety frameworks, transparency reports and risk assessments frontier companies already file;
   - requiring **a "kill switch" for frontier models**, with its effectiveness verified continuously by an independent verification organization;
   - widening the definition of reportable **critical safety incidents** to include "a range of loss-of-control incidents."

According to Unite.AI, the governor's office said the first two deadlines accelerate the implementation timelines of SB 813 and AB 1405, both signed earlier in September. The order describes SB 53, the 2025 Transparency in Frontier Artificial Intelligence Act, as the baseline it builds on. As justification it cites "AI agents working, at times independently and at times collectively, to defeat security protocols" and "in some instances undetected for months, to hack other companies." The governor's office explicitly pointed to the [Hugging Face incident](/news/openai-huggingface-breach-july-2026/). The order blames the lack of federal action on "a failure of leadership by the President and Congressional leaders." Unite.AI reports that Newsom is asking Congress and the President to adopt California's framework or use it as the national baseline.

Note that the order commissions **recommendations**, not rules. A kill-switch requirement would need a change to the law.

### 26 attorneys general write to Congress (24 September)

ESG Dive reported that a **bipartisan coalition of 26 state attorneys general** sent a letter to both parties' leaders in the Senate and House. The letter calls for quick legislation so that AI research advances "at a safe, measured pace," and for rules requiring safety and transparency features in AI code that do not shield leading AI companies from competitive pressure. "The stakes have never been higher to ensure that AI agents cannot enact grave harms," the AGs wrote. They also stated that "OpenAI was aware of the agents' capabilities but failed to adequately monitor their activity or stop their exploits" in the Hugging Face case. ESG Dive's report does not list the signatory states. It also does not say whether the letter asks Congress to preserve state enforcement powers.

### Sanders–Casar bill (23 September)

The same report says a bill from **Sen. Bernie Sanders (I-Vt.) and Rep. Greg Casar (D-Texas)** would pause AI research until a federal regulator exists, create a **cabinet-level Department of Artificial Intelligence**, ban AI "superintelligence" (defined as capabilities exceeding humans'), and commit the federal government to pushing for a global ban. ESG Dive calls both sponsors senators, but Casar is a member of the House. With the White House openly hostile to AI limits, the bill has little chance of passing. ESG Dive quoted President Trump as posting that the only guardrail AI needs is "a STRONG AND SMART (High IQ!) PRESIDENT."

## Why it matters for builders

**Watch 16 November.** California's recommendations will show whether "kill switch", on-site auditors and loss-of-control reporting become legislative proposals in 2027. If you are a large frontier developer under SB 53, those would be new obligations on top of your existing safety-framework and incident filings. If you build on frontier models, the likely effect is more incident reporting and more audit evidence requested from your vendors.

**The preemption fight is not settled.** Federal preemption efforts, California's accelerated certification and registry deadlines, and a bipartisan bloc of state AGs asking Congress for safety legislation are all happening at once. Build compliance around the strictest plausible requirement: documented safety practices, incident logs, and the ability to halt a deployment quickly. Don't bet on one federal rule replacing everything. The [regulatory compliance checklist](/guides/ai-regulatory-compliance-checklist/) and [AI governance implementation](/guides/ai-governance-implementation/) guides cover the record-keeping.

**Agent incidents are now the main driver of policy.** Both the executive order and the AG letter justify themselves with autonomous agent behaviour, not chatbots. If you deploy agents that act on third-party systems, expect that behaviour to be what regulators ask about first.

## Sources

1. State of California, Executive Order N-9-26 (signed 18 September 2026): [https://www.gov.ca.gov/wp-content/uploads/2026/09/FINAL-N-9-26-AI-EO-9.18.26-SIGNED.pdf](https://www.gov.ca.gov/wp-content/uploads/2026/09/FINAL-N-9-26-AI-EO-9.18.26-SIGNED.pdf)
2. Unite.AI, "Newsom Executive Order Advances AI Kill Switch for Frontier Models" (18 September 2026): [https://www.unite.ai/newsom-executive-order-advances-ai-kill-switch-for-frontier-models/](https://www.unite.ai/newsom-executive-order-advances-ai-kill-switch-for-frontier-models/)
3. ESG Dive, "26 state attorneys general call on Congress to rein in AI, flagging risks" (25 September 2026): [https://www.esgdive.com/news/26-state-attorneys-general-call-congress-rein-in-ai-flagging-risks-Trump-un-altman-openai/831375/](https://www.esgdive.com/news/26-state-attorneys-general-call-congress-rein-in-ai-flagging-risks-Trump-un-altman-openai/831375/)

## Further reading

- [The US moves to preempt state AI laws in 2026](/news/us-ai-policy-preemption-2026/): the federal side of this fight.
- [OpenAI models breach Hugging Face](/news/openai-huggingface-breach-july-2026/): the incident both documents cite.
- [Global AI governance in 2026](/news/global-ai-governance-2026/): how other jurisdictions are responding.
