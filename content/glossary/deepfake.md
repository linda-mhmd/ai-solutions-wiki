---
title: "Deepfake"
description: "What makes synthetic media a deepfake rather than generic AI-generated content, the GAN and diffusion techniques behind it, and the EU AI Act's statutory definition."
date: 2026-09-04
categories: [Glossary]
tags: [deepfake, synthetic-media, gan, diffusion-models, eu-ai-act, content-authenticity, ai-safety]
related:
  - glossary/gan
  - glossary/diffusion-models
  - glossary/ai-watermarking
  - frameworks/eu-ai-act-risk-framework
  - news/deepfake-fraud-epidemic-2026
  - guides/synthetic-media-eu-ai-act-transparency
  - guides/ai-image-video-generation-guide
last_verified: 2026-09-04
last_updated: 2026-09-04
lastmod: 2026-09-04
---

A deepfake is synthetic or manipulated image, audio, or video content that depicts a real, identifiable person, place, or event doing or saying something that did not happen. That last clause is the definitional line: not all AI-generated media is a deepfake. A wholly imaginary illustration or a synthetic voice reading a script it was licensed to read is [synthetic data](/glossary/synthetic-data/) or generative output; a deepfake specifically trades on the resemblance to something real, so that a viewer or listener could mistake it for an authentic recording. The term was coined in late 2017 by a Reddit user posting face-swapped videos under the handle "deepfakes," blending "deep learning" and "fake," and the word has since broadened from that narrow origin into both everyday usage and statutory definitions.

## Generation techniques

Deepfakes are produced with two main families of model, covered at the technical level elsewhere in this wiki rather than repeated here. Early and still-common face-swap tools use encoder-decoder architectures and [GANs](/glossary/gan/): a shared encoder learns a compressed representation of two faces, and a discriminator pushes the decoder's output toward photorealism, which is how tools like the original DeepFaceLab and FaceSwap pipelines work. More recent, higher-fidelity synthesis, including full-body and video generation, lip-sync dubbing, and voice cloning, increasingly relies on [diffusion models](/glossary/diffusion-models/), which iteratively denoise toward a target output conditioned on a driving video, audio track, or text prompt. Diffusion-based methods generally produce fewer of the boundary artifacts and temporal flicker that made earlier GAN face swaps detectable, which is part of why detection and [AI watermarking](/glossary/ai-watermarking/) have become active countermeasures rather than solved problems.

## Statutory definition vs. colloquial usage

Colloquially, "deepfake" is used loosely for almost any convincing piece of synthetic media, including invented (not resemblance-based) AI images and even AI-generated text. The EU AI Act narrows this considerably. Article 3(60) of Regulation (EU) 2024/1689 defines a "deep fake" as "AI-generated or manipulated image, audio or video content that resembles existing persons, objects, places, entities or events and would falsely appear to a person to be authentic or truthful." Three things follow from that wording: text is explicitly excluded (a fabricated AI-written quote is not a "deep fake" under the Act, even though it may trigger other transparency duties), the content must resemble something that actually exists, and the standard is whether it would falsely appear authentic to a person, not whether it is technically flawless.

That definition feeds directly into Article 50(4), which requires deployers of a deepfake-generating or manipulating AI system to disclose that the content is artificially generated or manipulated. Deployers must make that disclosure to the affected natural person at the latest at the time of first exposure, in a manner that is clear and distinguishable. An exception applies where the content is part of an evidently artistic, creative, satirical, fictional, or similar work: there, disclosure can be limited to noting that manipulated content exists, in a way that does not interfere with enjoying the work. These transparency obligations are separate from the upstream marking duty in Article 50(2), which requires *providers* of generative AI systems to make outputs machine-readable and detectable as synthetic in the first place. Both provisions apply from 2 August 2026, per the Act's implementation timeline (see the [EU AI Act risk framework](/frameworks/eu-ai-act-risk-framework/)). Deepfakes sit in the Act's "limited risk" tier, meaning transparency obligations rather than a full high-risk conformity regime, unless the specific use case (for example, biometric identification) triggers high-risk classification independently. For the provider/deployer distinction, the artistic exception's real limits, and how this plays out in practice, see [deepfakes and synthetic media under the EU AI Act](/guides/synthetic-media-eu-ai-act-transparency/). For the generation side — what image and video tools can do, their pricing models, and the licensing and consent questions to check before generating anything — see [AI image and video generation](/guides/ai-image-video-generation-guide/).

## Sources

1. European Parliament and Council. "Regulation (EU) 2024/1689 ... (Artificial Intelligence Act)," Article 3(60) and Article 50(4). *Official Journal of the European Union*, 12 July 2024. [eur-lex.europa.eu](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ:L_202401689) (Statutory definition of "deep fake" and the deployer disclosure obligation, including the artistic/satirical exception.)
2. AI Act Explorer / EU Artificial Intelligence Act (Future of Life Institute). "Article 3: Definitions" and "Transparency Rules: Article 50." [artificialintelligenceact.eu](https://artificialintelligenceact.eu/article/3/) — annotated reference cross-checked against the Official Journal text.
3. Reality Defender. "A Brief History of Deepfakes." [realitydefender.com/insights/history-of-deepfakes](https://www.realitydefender.com/insights/history-of-deepfakes) (Origin of the term on Reddit in 2017.)
4. MIT Sloan. "Deepfakes, Explained." [mitsloan.mit.edu/ideas-made-to-matter/deepfakes-explained](https://mitsloan.mit.edu/ideas-made-to-matter/deepfakes-explained) (Plain-language technical overview of face-swap and generative techniques.)

## Further reading

- [GAN](/glossary/gan/): the generator/discriminator architecture behind early face-swap deepfakes.
- [Diffusion models](/glossary/diffusion-models/): the technique behind most current high-fidelity synthetic video and voice.
- [AI watermarking](/glossary/ai-watermarking/): technical countermeasures for detecting and attributing synthetic media.
- [EU AI Act risk classification framework](/frameworks/eu-ai-act-risk-framework/): where deepfake transparency duties sit among the Act's four risk tiers.
- [Deepfake fraud reaches $3.7 billion in documented losses](/news/deepfake-fraud-epidemic-2026/): the real-world fraud impact this definition underpins.
- [Deepfakes and synthetic media under the EU AI Act](/guides/synthetic-media-eu-ai-act-transparency/): the provider/deployer duty split, the artistic exception, and practical compliance steps.
- [AI image and video generation](/guides/ai-image-video-generation-guide/): what generation tools can do, their pricing models, and the licensing/consent checklist before you generate.
