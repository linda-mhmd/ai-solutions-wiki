---
title: "Data Processor"
description: "An entity that processes personal data on behalf of a data controller under GDPR, relevant to AI service providers, cloud platforms, and ML pipeline operators."
date: 2026-03-28
categories: [Glossary]
tags: [gdpr, data-processor, data-protection, compliance, regulation]
related:
  - glossary/data-controller
  - glossary/gdpr
  - frameworks/gdpr-ai-framework
  - guides/gdpr-for-ai-teams
last_updated: 2026-05-30
---

A data processor, as defined in Article 4(8) of GDPR, is a natural or legal person, public authority, agency, or other body that processes personal data on behalf of the data controller. The processor acts on the controller's instructions and does not determine the purposes or means of processing independently.

## Obligations Under GDPR

While historically processors had fewer direct obligations, GDPR imposes specific duties on processors. These include processing data only on documented instructions from the controller, ensuring that personnel processing data are bound by confidentiality, implementing appropriate technical and organizational security measures, engaging sub-processors only with the controller's authorization, assisting the controller with data subject rights requests, deleting or returning data at the end of the service, and making available all information necessary to demonstrate compliance.

## Data Processing Agreements

Article 28 of GDPR requires that processing by a processor be governed by a contract or legal act. This data processing agreement (DPA) must specify the subject matter and duration of processing, the nature and purpose of processing, the types of personal data and categories of data subjects, and the obligations and rights of the controller. For AI services, the DPA should also address whether the processor can use data for model training or improvement.

## AI and Cloud Context

In modern AI architectures, the processor role is common. Cloud providers hosting AI workloads, AI-as-a-service platforms offering inference APIs, data labeling services annotating training data, and MLOps platforms managing model pipelines all typically act as processors. Each must have a DPA with the controller.

A critical consideration is sub-processing. If an AI processor uses another cloud service or API, that sub-processor must be authorized by the controller and bound by equivalent data protection obligations. The chain of processing relationships in complex AI systems can be several layers deep, and the controller remains responsible for ensuring compliance throughout.

When a processor starts making its own decisions about data use, such as training its own models on customer data, it may be reclassified as a controller for that processing, with all attendant obligations.

## Sources

- European Parliament and Council. (2016). *Regulation (EU) 2016/679 (GDPR)*, Articles 4(8), 28–29. Official Journal of the European Union. (Primary legal source; defines data processor and processor obligations, including data processing agreement requirements.)
- European Data Protection Board. (2021). *Guidelines 07/2020 on the concepts of controller and processor in the GDPR*. EDPB. (Authoritative guidance interpreting Article 28; addresses sub-processing chains and reclassification scenarios.)
- Information Commissioner's Office. (2021). *Controllers and processors*. ICO guidance. (Practical regulator interpretation of processor obligations in cloud and AI service contexts.)
