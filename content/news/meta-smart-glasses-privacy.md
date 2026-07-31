---
title: "Meta smart glasses face privacy lawsuits and covert-recording concerns"
description: "A class action, worker footage review in Kenya, covert filming, and unreleased face-recognition code put Meta's AI camera glasses under privacy scrutiny in 2026."
date: 2026-07-01
lastmod: 2026-07-30
last_updated: 2026-07-30
categories: [News]
tags: ["privacy", "smart glasses", "meta", "surveillance", "ai-safety", "consent"]
related:
  - glossary/ai-safety
  - frameworks/eu-ai-act-risk-framework
  - news/global-ai-governance-2026
---

<figure class="bz-figure">
  <img src="/img/shaping-ai/eye-neural-network-notext.png" alt="An extreme close-up of an eye laced with a red neural web, representing constant recording and surveillance through camera glasses." loading="lazy">
  <figcaption>Face-worn cameras turn ordinary eye contact into a potential recording, which is exactly what regulators and plaintiffs now question.</figcaption>
</figure>

Meta's AI camera glasses, built with eyewear maker Luxottica, are under scrutiny on several fronts in 2026. On 4 March 2026, plaintiffs Gina Bartone (New Jersey) and Mateo Canu (California) filed a class action against Meta Platforms and Luxottica of America. The complaint alleges Meta paired privacy-centric marketing, including the claim "designed for privacy, controlled by you", with insufficiently clear disclosure about transmission, cloud processing, and human review of captured media.

The disclosure question grew sharper after a Swedish investigation, reported by newspapers including Svenska Dagbladet and Göteborgs-Posten, found that workers at a Kenya-based subcontractor reviewed footage from customers' glasses. That footage included sensitive content such as nudity, people having sex, and using the toilet. Meta said it blurs faces in images before review, but sources disputed that the blurring worked consistently.

The concerns are not limited to what happens after capture. A BBC investigation found men using smart glasses to covertly film women who did not know they were being recorded. Because the camera sits on the face and blends into ordinary interaction, recording becomes ambient and hard to detect. The UK regulator, the Information Commissioner's Office (ICO), has begun investigating.

In June 2026, WIRED reported that Meta had silently embedded face-recognition code, internally called NameTag, into the Meta AI companion app downloaded to more than 50 million phones. Though not yet enabled, the code was designed to recognize faces in the glasses' field of view and link them to contact information or social media profiles. One day after WIRED's report, Meta removed nearly all traces of the code. Separately, WIRED reported that Meta had been testing face-recognition software built by Rank One Computing, a company that sells surveillance tools to police departments and the US military.

The Electronic Frontier Foundation (EFF) published an analysis in March 2026 warning consumers to "think twice before buying or using Meta's Ray-Bans." The EFF noted that all AI features require feeding footage to Meta, that recorded audio from conversations with Meta AI is saved by default, and that the glasses are "designed to be invisible to those being recorded."

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Capture</span>
    <span class="bz-flow-step-desc">A face-worn camera records video and images during ordinary interaction, often without a clear signal to bystanders.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Transmit</span>
    <span class="bz-flow-step-desc">Media moves to cloud processing. The complaint alleges buyers were not clearly told this happens.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Human review</span>
    <span class="bz-flow-step-desc">Subcontracted workers, reported in Kenya, review footage to label data, including intimate content.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Scrutiny</span>
    <span class="bz-flow-step-desc">A class action, an ICO investigation, and researcher findings follow the disclosures.</span>
  </div>
</div>

The central tension is between marketing and consent. Meta promoted the glasses as privacy-first. Plaintiffs argue that ordinary buyers never understood what actually happens to captured data, even where a privacy policy technically mentioned human review. The complaint frames that gap as false advertising and a consumer-protection problem, not a mere technicality.

## Why it matters

Always-available, face-worn cameras change the social norms that usually govern filming. A phone raised to record is visible, and people around it can object or move away. Glasses collapse the distinction between social interaction and data capture, which makes recording frictionless and difficult to perceive. That shift affects bystanders who never bought the product and never agreed to anything.

The Kenya footage review reframes what "AI processing" means to a buyer. Many people assume a model handles their media automatically. In practice, human reviewers may watch intimate moments to label training data. When face blurring does not work consistently, the promise of anonymised review weakens. The unreleased face-recognition code deepens the worry, because identifying strangers in real time without consent is a step beyond passive recording.

Regulators are responding on multiple tracks. The ICO investigation signals that UK data-protection law applies to wearable capture, not only to platforms. In Europe, systems that enable this kind of monitoring intersect with the [EU AI Act risk framework](/frameworks/eu-ai-act-risk-framework/), which treats certain biometric and surveillance uses as high risk. For builders, these cases are a concrete lesson in [AI safety](/glossary/ai-safety/) and honest disclosure: what you say in marketing must match what your data pipeline actually does.

## Further reading

- [AI safety](/glossary/ai-safety/): why honest disclosure and consent are part of responsible AI design, not an afterthought.
- [EU AI Act risk framework](/frameworks/eu-ai-act-risk-framework/): how European law classifies biometric and surveillance uses by risk tier.
- [TechCrunch: Meta sued over AI smart glasses privacy](https://techcrunch.com/2026/03/05/meta-sued-over-ai-smartglasses-privacy-concerns-after-workers-reviewed-nudity-sex-and-other-footage/): the lawsuit, plaintiffs, and the Kenya footage review.
- [National Law Review: Smart glasses and privacy](https://natlawreview.com/article/smart-glasses-and-privacy-wearable-surveillance-and-disclosure-issues): the legal analysis of wearable surveillance, consent, and disclosure.
- [Malwarebytes: Meta's face-recognition code](https://www.malwarebytes.com/blog/privacy/2026/06/metas-face-recognition-code-raises-new-concerns-about-smart-glasses): the researcher findings on hidden identification code.

## Sources

- [TechCrunch: Meta sued over AI smart glasses privacy concerns after workers reviewed footage (2026-03-05)](https://techcrunch.com/2026/03/05/meta-sued-over-ai-smartglasses-privacy-concerns-after-workers-reviewed-nudity-sex-and-other-footage/)
- [Fortune: Meta smart glasses, filming, workers, and the lawsuit (2026-03-27)](https://fortune.com/2026/03/27/meta-smart-glasses-filming-watching-workers-lawsuit-privacy/)
- [WIRED: Meta Silently Added Face-Recognition Code for Its Smart Glasses to Millions of Phones (2026-06-04)](https://www.wired.com/story/meta-smart-glasses-face-recognition-nametag-connections/)
- [WIRED: Meta Deletes Face-Recognition System From Its Smart Glasses App After WIRED Report (2026-06-05)](https://www.wired.com/story/meta-removes-face-recognition-code-meta-ai-app-smart-glasses/)
- [WIRED: Meta Tapped a Pentagon Supplier to Prototype Face Recognition for Its Glasses (2026-06-15)](https://www.wired.com/story/meta-rank-one-computing-face-recognition-smart-glasses/)
- [EFF: Think Twice Before Buying or Using Meta's Ray-Bans (2026-03)](https://www.eff.org/deeplinks/2026/03/think-twice-buying-or-using-metas-ray-bans)
- [Euronews: Meta faces privacy lawsuit over AI smart glasses (2026-03-06)](https://www.euronews.com/next/2026/03/06/meta-faces-privacy-lawsuit-over-ai-smart-glasses)
- [National Law Review: Smart glasses and privacy - wearable surveillance and disclosure issues](https://natlawreview.com/article/smart-glasses-and-privacy-wearable-surveillance-and-disclosure-issues)
