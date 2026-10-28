---
title: "Data Protection Meets AI Agents: the ICO's Call for Evidence and the Council's GDPR Mandate"
description: "In October 2026 the UK ICO opened a call for evidence on agentic AI, closing 20 November, and EU member states agreed their mandate on the Digital Omnibus, including a legitimate-interest basis for AI development under GDPR. What each says and what builders should do now."
date: 2026-10-21
lastmod: 2026-10-28
last_updated: 2026-10-28
last_verified: 2026-10-28
categories: [News]
tags: [gdpr, uk-gdpr, data-protection, ai-agents, agentic-ai, digital-omnibus, legitimate-interest, ico, ai-regulation, automated-decision-making]
related:
  - comparisons/gdpr-vs-eu-ai-act
  - frameworks/gdpr-ai-framework
  - guides/gdpr-for-ai-teams
  - glossary/automated-decision-making
  - guides/agent-identity-and-authorization
  - news/eu-ai-act-enforcement-begins-2026
  - news/ai-privacy-regulation-2026
---

Two data protection regulators moved on AI in October 2026, from opposite ends. The UK's Information Commissioner's Office (ICO) opened a **call for evidence on agentic AI** on 8 October, closing on **20 November 2026**. In Brussels, EU member states' ambassadors agreed the Council's **negotiating mandate on the Digital Omnibus** on **21 October**, the GDPR half of the EU's simplification package. It includes a legal basis for processing personal data to develop and run AI. Neither is law yet. Both tell builders where the questions about AI and personal data are heading.

## What happened

### The ICO asks how data protection applies to agents

The ICO's call for evidence runs from **8 October to 20 November 2026**, through the ICO's Citizen Space survey, and the ICO says it "may not consider responses received after this deadline". In its launch release the ICO says the evidence will "support the development of our forthcoming statutory code of practice on AI and automated decision-making", so this is input to a statutory code, not a general consultation.

The ICO lists six themes, which it says are "not exhaustive":

1. "How do data security issues appear within agentic AI, and how can organisations address them?"
2. "Transparency in complex agentic AI supply chains"
3. "Allocating and evidencing accountability across agentic AI systems"
4. "Understanding where the UK GDPR ADM provisions apply to agentic AI and applying the appropriate safeguards"
5. "Fairness and purpose limitations in agentic AI"
6. "Lawful processing of personal information in agentic AI"

The detail pages read like an engineering checklist. Under data security the ICO asks for evidence on "session isolation controls" and "structured logging measures that record AI agent identity alongside agent actions". Under lawful processing it asks how organisations run Legitimate Interests Assessments "for agentic AI data processing, including training or adapting orchestrator models". One survey question asks directly whether an organisation has "delayed or abandoned plans to deploy agentic AI because of uncertainty relating to data protection requirements".

The same 8 October release says the ICO had "recently made enquiries with OpenAI, Anthropic, Meta and the UK's AI Security Institute" about how agentic AI is tested and deployed, and that it had secured changes from ten foundation model developers: Amazon, Anthropic, Apple, Cohere, DeepSeek, Google, Meta, Microsoft, OpenAI and Stability AI. The call builds on the ICO's "Tech futures: Agentic AI" report, which the call page dates to January 2026.

### EU member states agree their GDPR mandate

The Council document **14756/26**, dated 22 October 2026, carries "the text of the mandate for negotiations with the European Parliament ... as agreed by the Permanent Representatives Committee at its meeting on 21 October 2026". This is the procedure 2025/0360(COD), the Commission's Digital Omnibus proposal of 19 November 2025 that amends GDPR, the ePrivacy Directive, NIS2 and other data laws. A Council vote planned for 26 June 2026 had been cancelled for lack of agreement, so this is the first time member states have a common position.

It is a different law from the **Digital Omnibus on AI**, Regulation (EU) 2026/1744, which amended the AI Act and has been in force since 27 July 2026 (see [EU AI Act enforcement begins](/news/eu-ai-act-enforcement-begins-2026/)).

What the mandate does on the points that matter most for AI teams, read from the marked-up text (the Council marks its changes to the Commission proposal in bold and its deletions in strikethrough):

**A legal basis for AI development, kept but narrowed.** The Commission proposed a new GDPR Article 88c, "Processing in the context of the development and operation of AI". The Council keeps it, renumbered **Article 88 bis**. Paragraph 1 says processing of personal data "in the context of the development and operation of an AI system or of an AI model" may be "carried out for a legitimate interest of the controller or a third party in accordance with Article 6(1)(f)". The new recital (33a) adds the limit that matters: "the development and operation of an AI system or AI model does not in itself constitute a legitimate interest, and the applicability of Article 6(1)(f) to processing in the context of AI is to be assessed on a case-by-case basis". In other words, the Council confirms that legitimate interest can be used for AI, and also that building AI is not itself the legitimate interest. You still need the three-part test.

**The unconditional opt-out is gone.** The Commission's text required safeguards including "providing data subjects with an unconditional right to object". The Council struck that out. Its new paragraph 3 says that whatever the lawful ground, AI processing "shall be subject to appropriate technical and organisational measures and safeguards ... including the right to object under Article 21". The ordinary Article 21 right lets a controller continue if it shows compelling legitimate grounds, so this is a weaker right than the Commission proposed. Practitioners had argued the unconditional version could not work for data scraped from the open web.

**Breach notification.** The proposal, which the Council keeps on these points, limits the duty to notify the regulator to breaches "likely to result in a high risk" and sets the deadline at "not later than 96 hours". Current GDPR requires notification within 72 hours unless the breach is unlikely to result in a risk. The Council replaced the Commission's single EU entry point with "the national entry point" set up under NIS2.

**Where it goes next.** The European Parliament has not adopted its position. Its Legislative Observatory lists the file as "Awaiting committee decision", with ITRE and LIBE as joint lead committees, a draft report of 22 June 2026 and amendments tabled on 27 July 2026. Trilogue negotiations cannot start until Parliament votes, so the final text can still change in any direction.

## What is actually different

For the UK, nothing changes in law today. What is new is that the regulator has framed the questions it will answer in a statutory code: agent identity in logs, session isolation, accountability across a supply chain of models and tools, and when an agent's action counts as automated decision-making under UK GDPR.

For the EU, the Council has settled three things that were open in September: member states accept a legitimate-interest route for AI, they do not want the unconditional objection right, and they want breach reports to go through national NIS2 entry points. Until Parliament votes, none of it binds anyone.

## Why it matters for builders

- **Respond to the ICO if you deploy agents in the UK.** The survey closes on 20 November 2026. The questions on logging, isolation and accountability are exactly the controls a future code is likely to expect, so the answers are also a useful self-assessment.
- **Log agent identity next to agent actions.** The ICO names it as evidence it wants, and it is good practice anyway: see [agent identity and authorization](/guides/agent-identity-and-authorization/).
- **Keep doing legitimate-interest assessments for training and fine-tuning.** Neither text removes the balancing test. The Council's recital says AI development is not, by itself, a legitimate interest. Document the purpose, the necessity and the balancing, as described in [GDPR for AI teams](/guides/gdpr-for-ai-teams/).
- **Do not build on the 96-hour deadline or the high-risk threshold.** They are proposals. Today's GDPR deadline is 72 hours.
- **Map where agents make decisions about people.** Both the ICO's theme on automated decision-making and the GDPR's existing [automated decision-making](/glossary/automated-decision-making/) rules turn on whether a decision with legal or similarly significant effects is made without meaningful human involvement.

## Sources

1. ICO, "Agentic AI call for evidence" (start date 8 October 2026, closing date 20 November 2026; fetched 28 October 2026): [https://ico.org.uk/about-the-ico/ico-and-stakeholder-consultations/2026/10/agentic-ai-call-for-evidence/](https://ico.org.uk/about-the-ico/ico-and-stakeholder-consultations/2026/10/agentic-ai-call-for-evidence/)
2. ICO, "ICO secures changes from leading AI developers as scrutiny extends to AI agents" (8 October 2026): [https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/10/ico-secures-changes-from-leading-ai-developers-as-scrutiny-extends-to-ai-agents/](https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/10/ico-secures-changes-from-leading-ai-developers-as-scrutiny-extends-to-ai-agents/)
3. ICO, "The ICO's call for evidence on agentic AI", themes and evidence pages (undated, fetched 28 October 2026): [https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/the-ico-s-call-for-evidence-on-agentic-ai/](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/the-ico-s-call-for-evidence-on-agentic-ai/)
4. ICO, "ICO tech futures: Agentic AI" (January 2026, per the call page): [https://ico.org.uk/about-the-ico/research-reports-impact-and-evaluation/research-and-reports/technology-and-innovation/tech-horizons-and-ico-tech-futures/ico-tech-futures-agentic-ai/](https://ico.org.uk/about-the-ico/research-reports-impact-and-evaluation/research-and-reports/technology-and-innovation/tech-horizons-and-ico-tech-futures/ico-tech-futures-agentic-ai/)
5. Council of the European Union, document 14756/26, "Digital Omnibus - Mandate for negotiations with the European Parliament" (22 October 2026, agreed by Coreper on 21 October 2026): [https://data.consilium.europa.eu/doc/document/ST-14756-2026-INIT/en/pdf](https://data.consilium.europa.eu/doc/document/ST-14756-2026-INIT/en/pdf)
6. Council of the European Union, "Digital rulebook: Council agrees position to simplify data protection, privacy and cyber reporting rules" (21 October 2026; returned an access error to our fetch, so not used for any claim above): [https://www.consilium.europa.eu/en/press/press-releases/2026/10/21/digital-rulebook-council-agrees-position-to-simplify-data-protection-privacy-and-cyber-reporting-rules/](https://www.consilium.europa.eu/en/press/press-releases/2026/10/21/digital-rulebook-council-agrees-position-to-simplify-data-protection-privacy-and-cyber-reporting-rules/)
7. European Parliament, Legislative Observatory, procedure 2025/0360(COD) (fetched 28 October 2026): [https://oeil.europarl.europa.eu/oeil/en/procedure-file?reference=2025/0360(COD)](https://oeil.europarl.europa.eu/oeil/en/procedure-file?reference=2025/0360(COD))
8. European Commission, Proposal COM(2025) 837 final (Digital Omnibus, 19 November 2025): [https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52025PC0837](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52025PC0837)

## Further reading

- [GDPR vs the EU AI Act](/comparisons/gdpr-vs-eu-ai-act/): what is in force, and how the two reform tracks differ
- [GDPR framework for AI](/frameworks/gdpr-ai-framework/)
- [GDPR for AI teams](/guides/gdpr-for-ai-teams/)
- [EU AI Act enforcement begins](/news/eu-ai-act-enforcement-begins-2026/): the AI Act omnibus that is already law
- [Agent identity and authorization](/guides/agent-identity-and-authorization/)
- [Automated decision-making](/glossary/automated-decision-making/)
