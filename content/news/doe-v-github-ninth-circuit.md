---
title: "Ninth Circuit Upholds Dismissal of DMCA Claims Against GitHub Copilot in Doe v. GitHub"
description: "On 16 September 2026 the Ninth Circuit ruled unanimously that generating new code without attribution is not 'removing' copyright management information under DMCA §1202(b). It rejected a strict identicality rule, found the plaintiffs had standing, and left ordinary copyright claims and a training-stage theory undecided."
date: 2026-09-16
lastmod: 2026-09-25
last_verified: 2026-09-25
categories: [News]
tags: [ai-copyright, litigation, dmca, github-copilot, openai, codex, open-source, legal]
related:
  - news/ai-copyright-litigation-2026
  - tools/github-copilot
  - guides/ai-regulatory-compliance-checklist
---

The US Court of Appeals for the Ninth Circuit **upheld the dismissal of DMCA claims against GitHub, Microsoft and OpenAI** on 16 September 2026 in **Doe v. GitHub, Inc.** (No. 24-7700). The plaintiffs are anonymous open-source programmers who argued that **GitHub Copilot and OpenAI's Codex** broke the Digital Millennium Copyright Act by reproducing their code without its author names, copyright notices and licence terms. The unanimous panel held that the tools, as the complaint describes them, **generate new code that never contained that information**, so nothing was "removed or altered". The court expressly left open whether that output could support an ordinary copyright infringement claim.

## What happened

**The claim.** Section 1202(b) of the DMCA prohibits intentionally removing or altering **copyright management information (CMI)**, such as the author's name, copyright notice and terms of use. It also prohibits distributing copies knowing their CMI was stripped. Statutory damages run from **$2,500 to $25,000 per violation**. That scale is why Courthouse News reports the plaintiffs, who sued in 2021, sought more than **$9 billion**.

**The district court.** The trial court in Oakland dismissed the §1202(b) claims on the basis that the challenged copies had to be **identical** to the originals, and the plaintiffs' examples included modified code. It certified that "identicality" question for interlocutory appeal.

**The Ninth Circuit's holdings**, per the opinion by Judge Eric Miller as summarised by Gibson Dunn and Courthouse News:

- **Output without CMI is not removal of CMI.** "Remove" and "alter" require an affirmative act on CMI attached to an existing work. The complaint describes Copilot as learning statistical patterns and generating code probabilistically. That, the court said, describes creating new work, not copying stored code and stripping its CMI. The court contrasted this with a search engine that retrieves and displays stored material, which could give a stronger basis for a removal claim.
- **No strict identicality requirement.** The court rejected the district court's reasoning on this point. Where a defendant substantially reproduces a work and omits its CMI, that "will often be strong circumstantial evidence" of removal, and minor cosmetic changes are not a defence in themselves.
- **Ordinary infringement is a separate question.** "To be sure, Copilot's output may in some cases be substantially similar to existing code," Miller wrote. "We express no view on whether that similarity would allow plaintiffs to assert a claim for copyright infringement." And: "We decline plaintiffs' invitation to transform run-of-the-mill copyright infringement claims into DMCA claims."
- **The training-stage theory was not decided.** The plaintiffs also argued that CMI was stripped *before* their code was used as training data. The court declined to consider this because they had not preserved it in the district court.
- **Standing.** The panel found the plaintiffs had standing at the pleading stage, based on examples of Copilot reproducing portions of their code and research showing that LLMs can emit memorised training data verbatim. They would need real evidence to survive summary judgment.

The other panel members were Senior Circuit Judge Sidney Thomas and District Judge Stanley Blumenfeld Jr. According to Courthouse News, the plaintiffs' **breach-of-contract claims remain pending** before the trial judge, and neither side's lawyers had commented.

## Why it matters for builders

**Code-generation tools get a clearer defence against one kind of claim.** A DMCA §1202(b) claim based only on an AI output lacking attribution now needs facts showing CMI was actually removed from a copy of an existing work. For tools that generate code probabilistically, that is a significant bar, and it takes the risk of $2,500-$25,000 per-violation statutory damages off the table for this theory.

**It is not a win on copyright generally.** The court said nothing about whether substantially similar output infringes. It did not decide the training-stage CMI theory, and it made it *easier* to bring §1202(b) claims where copying is substantial but not exact. Gibson Dunn's advice to AI developers is to understand what CMI accompanies source materials, whether collection or preprocessing steps remove it, and what happens to the resulting copies. That means pipelines that strip licence headers during data preparation are the place to look.

**For teams using Copilot-style tools, keep the usual hygiene.** Duplicate-detection or code-referencing filters, licence scanning in CI, and review of large verbatim-looking suggestions still matter. The contract claims are still live, and ordinary infringement suits remain possible. For the wider litigation picture, see [AI copyright litigation in 2026](/news/ai-copyright-litigation-2026/).

## Sources

1. Courthouse News Service, "Coders lose appeal in copyright fight against AI tools" (16 September 2026): [https://www.courthousenews.com/coders-lose-appeal-in-copyright-fight-against-ai-tools/](https://www.courthousenews.com/coders-lose-appeal-in-copyright-fight-against-ai-tools/)
2. Gibson Dunn, "Ninth Circuit Clarifies Limits of DMCA Liability for AI-Generated Code" (18 September 2026): [https://www.gibsondunn.com/ninth-circuit-clarifies-limits-of-dmca-liability-for-ai-generated-code/](https://www.gibsondunn.com/ninth-circuit-clarifies-limits-of-dmca-liability-for-ai-generated-code/)

## Further reading

- [AI copyright litigation broadens in 2026](/news/ai-copyright-litigation-2026/): the other live cases.
- [GitHub Copilot](/tools/github-copilot/): the tool at issue.
- [AI regulatory compliance checklist](/guides/ai-regulatory-compliance-checklist/): data provenance and record-keeping.
