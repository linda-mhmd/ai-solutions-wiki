---
title: "Pre-Built AI Services vs Foundation Models - When a Narrow API Beats an LLM"
description: "Task-specific AI APIs for OCR, transcription, and vision versus sending the same job to a general foundation model — organized around the regulatory gate that rules some tasks out before vendor choice matters, then the cost, lock-in, capability, and data-handling tradeoffs that decide the rest."
date: 2026-09-02
last_verified: 2026-09-03
categories: [Comparisons]
tags: ["ai-ml", "intermediate", "comparison", "ai-services", "foundation-models", "ocr", "computer-vision", "cost", "eu-ai-act", "vendor-lock-in", "data-privacy"]
tools: [amazon-textract, amazon-rekognition, amazon-transcribe, amazon-bedrock]
last_updated: 2026-09-03
lastmod: 2026-09-03
related:
  - guides/constraint-driven-comparisons
  - guides/governance-thresholds-as-you-scale
  - guides/software-licensing-and-vendor-lock-in
  - guides/cloud-exit-costs-and-data-gravity
  - comparisons/custom-ml-vs-foundation-models
---

There is a decision that comes up in almost every applied AI project and gets surprisingly little written about it: you need to read text off a document, transcribe an audio file, or detect objects in an image. Do you call a **task-specific AI service** built for exactly that, or do you send it to a **general foundation model** that can also do it?

The reflex in 2026 is to reach for the foundation model, because one API covers everything. That is often right and frequently expensive — but before either question is worth asking, one narrower question needs answering: does your specific task even touch a regulatory gate that has nothing to do with which vendor you pick? For most of what these services do (OCR, generic object detection, transcription, translation) the answer is no, and the rest of this page is a set of tradeoffs to weigh. For one specific capability some of these services offer — matching or categorizing faces — the answer can be yes, and it decides the question before cost, latency, or accuracy get a vote. (Two categories this wiki usually raises in a vendor comparison, jurisdiction-of-operator and data residency, don't split these two options apart: in their default form, both the task-specific services and Amazon Bedrock's foundation models are AWS-operated services running in AWS regions, so a constraint that turns on *which company operates the infrastructure* doesn't distinguish between them here the way it would in an on-premise-vs-cloud or multi-cloud comparison.)

This page follows this wiki's [constraint-driven comparison methodology](/guides/constraint-driven-comparisons/): the gate first, then the tradeoffs, then the feature detail — not a feature grid with a recommendation bolted on.

## What each one is

**Pre-built AI services** are narrow, pre-trained models exposed as an API for a single task: document text extraction, speech-to-text, object detection, language detection, translation. You send input, you get structured output. There is no prompt, no model choice, and no ML expertise required. Examples include Amazon Textract, Transcribe, Rekognition and Comprehend, and their Azure and Google equivalents. Some of these go beyond generic labeling: Amazon Rekognition specifically offers **Face Comparison** ("comparing one face to one or more faces to measure similarity") and **Face Search** ("using an input face to search for similar matches in a collection of stored faces") — the latter marketed for building applications like "multi-factor authentication for bank payments, automated building entry for employees, and more" [7]. That distinction — comparing a face against a database versus detecting that a photo contains a car — is exactly what the next section turns on.

**Foundation models** are large general-purpose models — typically multimodal — accessed through a platform like [Amazon Bedrock](/tools/amazon-bedrock/). One endpoint handles text, images, and often audio, steered entirely by the prompt. See [foundation models](/glossary/foundation-models/).

## The gate: biometric identification and categorization

This is a **gate**, not a tradeoff — if it applies to your task, it applies regardless of which of these two options you pick, and it has to be resolved before either one is a live option.

If the job is generic object or scene detection — cars, furniture, document layout, speech-to-text — none of this section applies to you; skip to [the tradeoffs](#the-tradeoffs-once-the-gate-is-cleared). It applies specifically when the task is establishing or inferring something about a *person's identity or protected attributes* from biometric data — the Face Search / Face Comparison territory above, or an equivalent capability built by prompting a foundation model to compare or classify faces, which is not exempt just because it's general-purpose reasoning rather than a purpose-built API.

Two EU AI Act provisions bear on this directly:

- **Article 5(1)(g)** prohibits biometric categorization systems that "categorise individually natural persons based on their biometric data to deduce or infer their race, political opinions, trade union membership, religious or philosophical beliefs, sex life or sexual orientation" — with narrow exceptions for labelling lawfully-acquired datasets and law-enforcement categorization [7].
- **Article 5(1)(h)** prohibits real-time remote biometric identification in publicly accessible spaces for law-enforcement purposes outright, except for a narrow, judicially- or administratively-authorized set of purposes (locating specific missing or trafficked persons, preventing an imminent threat to life, or investigating specified serious crimes) [7].

Short of an outright Article 5 prohibition, **Annex III** classifies "remote biometric identification" — matching a face against a stored database to establish who someone is — and "biometric categorization" by protected attributes as high-risk AI systems, carrying the Act's full technical-documentation, human-oversight, and conformity-assessment obligations. Annex III explicitly **excludes** biometric *verification* systems — those designed only to confirm that someone is who they already claim to be (a 1:1 check) — from the high-risk tier; the high-risk category is specifically 1:N identification against a database [8].

That verification-vs-identification line matters here because it maps onto the exact feature split above — though not as cleanly as the marketing language suggests. AWS describes Face Comparison in verification-shaped terms: its own example is using it "to verify a person's identity against their personnel photo on file in near real-time." Face Search is the 1:N technology — matching an input face against "a collection of stored faces" — and it is Face Search, not Face Comparison, that AWS markets for "multi-factor authentication for bank payments, automated building entry for employees." That is worth sitting with on its own: a use case named with verification-sounding language ("multi-factor authentication") can still be built on the identification-shaped, 1:N technology Annex III treats as high-risk. Whether your specific implementation of either feature lands on the verification or identification side of the Annex III line — and whether your jurisdiction's regulator reads it the same way — is a legal classification question this page cannot answer for you. That determination needs your own counsel or DPO, not a general comparison.

GDPR adds a second, independent trigger: biometric data processed "for the purpose of uniquely identifying a natural person" is itself a special category of personal data under Article 9, prohibited by default unless a specific lawful basis applies — on top of, not instead of, whatever the AI Act requires [9].

One more scoping note, since it's easy to assume the foundation-model side of this comparison carries heavier EU AI Act baggage generally: it doesn't, for a team that is only calling a hosted model's API rather than training or heavily fine-tuning one. The Act's heaviest general-purpose-AI-model obligations — Article 53's baseline technical documentation and training-data summary duties, and Article 55's additional systemic-risk testing for models trained above the 10²⁵ FLOP threshold — fall on whoever trained the model or pushed a fine-tune past a specific compute threshold, not on a downstream caller of Bedrock — see [governance thresholds as you scale](/guides/governance-thresholds-as-you-scale/) for exactly where that line sits. A narrow pre-built service doesn't raise this question at all, because it isn't a "general-purpose AI model" under the Act's definition in the first place; a foundation-model integration only raises it if you go well past prompting into training your own model on top of it.

## The tradeoffs, once the gate is cleared

Everything below is a genuine tradeoff — worth weighing against the others, not something that eliminates an option outright the way the biometric gate does.

### Trust and legal control: who gets to use your content, by default

This is a real, checkable difference in default posture, not a vague lock-in worry. AWS's own documentation states that its AI services — Textract, Rekognition, Transcribe, and Comprehend are all named on the list — "may use and store customer content for service improvement, such as fixing operational issues, evaluating service performance, debugging, or model training," unless the organization attaches an AI services opt-out policy through AWS Organizations [10][11]. Amazon Bedrock's stated default runs the other way: "users' inputs and model outputs are not shared with any model providers," and "AWS and the third-party model providers will not use any inputs to or outputs from Amazon Bedrock to train Amazon Nova, Amazon Titan, or any third-party models" — stated as the baseline term, not an opt-out you have to configure [12].

Practically: if your organization hasn't set an AI services opt-out policy, verify that before assuming your document, image, or audio content isn't contributing to model improvement somewhere. This is a setting to check, not a reason by itself to prefer one path over the other — but it is exactly the kind of "vendor lock-in risk" claim the [constraint-driven comparison methodology](/guides/constraint-driven-comparisons/) insists get sourced rather than asserted from impression.

### Cost structure and sunk investment

The two price on different units, which makes intuition unreliable at volume. Document processing is billed per page; a foundation model is billed per token, and a dense page can consume thousands of input tokens before it produces any output [1][4]. At single-digit volumes the difference is noise. At hundreds of thousands of pages per month it is often an order of magnitude, and it goes in the pre-built service's favor. This is a tradeoff, not a gate: nothing about the pricing model makes an option unavailable, it just changes how much the more expensive path costs you at your actual volume. Do the arithmetic on your actual volume rather than reasoning from per-unit prices, and re-do it when volume changes by 10x. See [LLM cost optimization](/guides/llm-cost-optimization/) and [AI total cost of ownership](/guides/ai-total-cost-ownership/).

### Vendor lock-in and exit cost

A pre-built service's output is structured to that vendor's own schema — Textract's block-and-geometry JSON, Rekognition's label taxonomy. Moving from Textract to Azure AI Document Intelligence or Google Document AI is a re-integration of your parsing layer, not a drop-in swap, even though the underlying task is identical [1][5][6]. A foundation-model integration is comparatively more portable at the interface layer, since the major providers now expose broadly similar prompt/completion APIs — but "portable interface" does not mean "interchangeable behavior": a prompt tuned against one model's outputs commonly needs re-validation, and often re-tuning, against another model or even a new version of the same model, so switching cost there is lower but not zero. See [software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/) for how to make an exit-cost question like this concrete before you commit, and [cloud exit costs and data gravity](/guides/cloud-exit-costs-and-data-gravity/) for what migrating accumulated output/data actually costs once volume is real.

### Internal capability and knowledge retention

A pre-built service requires no ML expertise to operate reliably: call the API, threshold on the confidence score it returns. A foundation-model pipeline is not a "call and done" dependency in the same way — prompts need iteration, outputs need [structured-output](/glossary/structured-output/) enforcement to be reliably parseable, and behavior can shift across model versions in ways that need active monitoring rather than a one-time integration. This doesn't make the foundation-model path worse; it makes it a different kind of ongoing commitment — one that assumes an organization has, or is willing to build, the capability to maintain prompts and evaluate outputs over time, the way [fine-tuning vs prompt engineering](/comparisons/fine-tuning-vs-prompt-engineering/) covers in more depth. A team without that capability and without a reason to build it is taking on a real operational cost by defaulting to the foundation-model route for a task a narrow service already does reliably.

### Contractual and customer-driven requirements

If a customer contract, an internal audit program, or a regulator expects a machine-checkable confidence value or coordinate-level provenance for each extracted field, a pre-built service provides that natively as part of its output contract — bounding boxes and per-field confidence scores, out of the box. A foundation model does not provide an equivalent by default; building one requires deliberately engineering structured-output enforcement, and even then, a generative model's self-reported confidence is a different statistical object from a purpose-built classifier's calibrated confidence score — it is the model's claim about itself, not a measured property the way a classifier's score is. Where this becomes a hard requirement rather than a preference — an auditor or a customer's security review specifically asking for calibrated per-field confidence as an audit trail — it functions as a soft gate on the foundation-model path unless you've independently invested in calibrating it, not just a minor feature gap.

## The tradeoffs cleared: how they compare on execution

Once you know your task isn't in Annex III/Article 5 territory, this is how the two actually behave.

| | Pre-built AI service | Foundation model |
|---|---|---|
| **Setup** | Call the API | Call the API, write and maintain a prompt |
| **Output** | Structured by contract (JSON schema, confidence scores, bounding boxes) | Free text unless constrained; needs [structured output](/glossary/structured-output/) enforcement |
| **Determinism** | High — same input, same output | Variable; needs temperature control and still drifts across model versions |
| **Cost basis** | Per page, per minute, per image | Per token, input and output |
| **Latency** | Low and predictable | Higher and variable with output length |
| **Flexibility** | None outside the trained task | Arbitrary — reasoning, summarizing, and extraction in one call |
| **Custom concepts** | Only via a custom-training variant, where offered | Describe it in the prompt |
| **Failure mode** | Low confidence score you can threshold on | A fluent, plausible, wrong answer |

## The generic-object limitation

The constraint most often discovered late: **a pre-built vision or document service only recognizes what it was trained on**. Generic object detection identifies cars, people, and furniture. It will not identify your company's specific components, a domain-specific form layout, or an industry-specific defect — those are not in the label set, and no prompt exists to add them.

This is the cleanest decision rule available once you're past the gate above:

- **Your target is generic** → the pre-built service is almost certainly cheaper, faster, and more accurate.
- **Your target is domain-specific** → either use a foundation model, which can be told what to look for in words, or [fine-tune a custom model](/comparisons/custom-ml-vs-foundation-models/).

## The accuracy trade is not one-directional

A common assumption is that the bigger model is more accurate. On constrained tasks the opposite is often true. A dedicated OCR service trained on millions of documents typically beats a general model at reading a dense, low-quality scan, and it returns confidence scores and coordinates that a general model does not natively provide. Bounding boxes and per-field confidence are what let you build a [human-in-the-loop](/glossary/human-in-the-loop/) review queue that routes only uncertain items to a person.

Conversely, the general model wins whenever the task requires **understanding rather than extraction**: reading a document *and* deciding whether it satisfies a policy, transcribing audio *and* summarizing the decisions in it. A pre-built service returns facts; a foundation model returns judgment — with the corresponding risk, covered above, that the judgment is confidently wrong and not accompanied by a calibrated confidence value the way a classifier's is.

## Where this leaves you

**The gate comes first and is non-negotiable.** If your task is matching or categorizing faces, resolve the Article 5 / Annex III / GDPR Article 9 question — with your own counsel, for your specific implementation and jurisdiction — before comparing anything else. Neither option is "the safe one" by default; the classification turns on what the system does, not which vendor built it.

**Past the gate, the tradeoffs point in a fairly consistent direction for high-volume, narrow, generic tasks:** cost per unit, determinism, and a native audit trail favor the pre-built service, and the capability bar to operate one is low. They point the other way when the task requires judgment, the target concepts are domain-specific and easier to describe in words than to retrain a model on, or volume is low enough that per-token cost is noise.

**Use both, in most production systems.** Extract with the specialized service, reason over the result with the foundation model. A document pipeline that runs OCR with a purpose-built service and then passes clean, structured text to a foundation model for classification and summarization is cheaper, more accurate, and easier to evaluate than either approach alone, because each stage does what it's good at and each stage can be tested separately. This isn't a hedge to avoid the decision — it follows directly from the tradeoffs above: the extraction stage is a generic, high-volume, structured-output task where the pre-built service wins on every tradeoff named here, and the reasoning stage is exactly the judgment task the foundation model is for.

**What this page can't resolve for you:** whether your specific face-matching or categorization feature is verification or identification under Annex III; whether your regulator would agree; the exact data-processing terms in your organization's specific AWS contract, which can differ from the general FAQ language cited here; and whether your organization currently has an AI services opt-out policy configured at all. Those are checks to run against your own account and your own counsel, not conclusions a general comparison can reach for you.

## Further reading

- [Constraint-driven comparisons](/guides/constraint-driven-comparisons/): the methodology this page follows — gates before tradeoffs, tradeoffs before feature detail.
- [Governance thresholds as you scale](/guides/governance-thresholds-as-you-scale/): the fuller treatment of use-case-driven vs scale-driven regulatory triggers, including the GPAI provider/deployer line this page only touches.
- [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/): making an exit-cost question concrete and checkable rather than a vague worry.
- [Cloud exit costs and data gravity](/guides/cloud-exit-costs-and-data-gravity/): what migrating accumulated data and integrations actually costs once volume is real.
- [Custom ML models vs foundation models](/comparisons/custom-ml-vs-foundation-models/): the other axis, when neither pre-built option fits.
- [Fine-tuning vs prompt engineering](/comparisons/fine-tuning-vs-prompt-engineering/): the capability commitment behind the foundation-model path in more depth.
- [AI deployment models](/guides/deployment-models-ai/): where each of these sits on the managed-to-self-managed spectrum.
- [Document extraction](/glossary/document-extraction/): the task itself in more detail.
- [AI for document workflows](/guides/ai-for-document-workflows/): the end-to-end pipeline.
- [Structured output](/glossary/structured-output/): making a foundation model return parseable results.
- [LLM cost optimization](/guides/llm-cost-optimization/): the arithmetic at volume.

## Sources

1. Amazon Web Services. "Amazon Textract — document text and data extraction." [https://aws.amazon.com/textract/](https://aws.amazon.com/textract/)
2. Amazon Web Services. "Amazon Rekognition — image and video analysis." [https://aws.amazon.com/rekognition/](https://aws.amazon.com/rekognition/)
3. Amazon Web Services. "Amazon Transcribe — automatic speech recognition." [https://aws.amazon.com/transcribe/](https://aws.amazon.com/transcribe/)
4. Amazon Web Services. "Amazon Bedrock pricing." [https://aws.amazon.com/bedrock/pricing/](https://aws.amazon.com/bedrock/pricing/)
5. Microsoft. "Azure AI Document Intelligence." [https://azure.microsoft.com/en-us/products/ai-services/ai-document-intelligence](https://azure.microsoft.com/en-us/products/ai-services/ai-document-intelligence)
6. Google Cloud. "Document AI." [https://cloud.google.com/document-ai](https://cloud.google.com/document-ai)
7. artificialintelligenceact.eu. "Article 5: Prohibited AI Practices," Regulation (EU) 2024/1689. [https://artificialintelligenceact.eu/article/5/](https://artificialintelligenceact.eu/article/5/) — see also Amazon Web Services, "Amazon Rekognition FAQs," for the Face Comparison / Face Search feature descriptions: [https://aws.amazon.com/rekognition/faqs/](https://aws.amazon.com/rekognition/faqs/)
8. artificialintelligenceact.eu. "Annex III: High-Risk AI Systems," Regulation (EU) 2024/1689. [https://artificialintelligenceact.eu/annex/3/](https://artificialintelligenceact.eu/annex/3/)
9. Regulation (EU) 2016/679 (GDPR), Article 9. [https://gdpr-info.eu/art-9-gdpr/](https://gdpr-info.eu/art-9-gdpr/)
10. Amazon Web Services. "AI services opt-out policies," AWS Organizations User Guide. [https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_ai-opt-out.html](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_ai-opt-out.html)
11. Amazon Web Services. "Opt out from all supported AWS AI services," AWS Organizations User Guide — confirms Textract, Rekognition, Transcribe, and Comprehend are covered services. [https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_ai-opt-out_all.html](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_ai-opt-out_all.html)
12. Amazon Web Services. "Amazon Bedrock FAQs." [https://aws.amazon.com/bedrock/faqs/](https://aws.amazon.com/bedrock/faqs/)
