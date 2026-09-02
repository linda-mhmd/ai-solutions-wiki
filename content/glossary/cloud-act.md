---
title: "US CLOUD Act"
description: "The 2018 US statute that requires providers subject to US jurisdiction to disclose data in their possession, custody, or control regardless of where in the world it is stored — and the reason it collides with Article 48 GDPR."
date: 2026-09-02
categories: [Glossary]
tags: [cloud-act, data-sovereignty, gdpr, jurisdiction, compliance, cross-border-transfers, legal]
related:
  - glossary/data-sovereignty
  - glossary/sovereign-ai
  - guides/cross-border-data-transfers-ai
  - comparisons/eu-vs-us-ai-regulation
last_updated: 2026-09-02
---

The **Clarifying Lawful Overseas Use of Data Act (CLOUD Act)**, enacted in the United States in March 2018, establishes that a provider subject to US jurisdiction must comply with lawful US orders to preserve or disclose data **irrespective of where that data is physically stored**. It is the legal mechanism underneath most concerns about "trusting" a US-headquartered cloud provider, and it is frequently discussed inaccurately — so the statutory text is worth reading directly.

## What the statute actually says

The operative provision, codified at **18 U.S.C. § 2713**, is a single sentence [1]:

> "A provider of electronic communication service or remote computing service shall comply with the obligations of this chapter to preserve, backup, or disclose the contents of a wire or electronic communication and any record or other information pertaining to a customer or subscriber within such provider's possession, custody, or control, regardless of whether such communication, record, or other information is located within or outside of the United States."

Three points follow precisely from that wording, and they bound the issue:

**Jurisdiction attaches to the provider, not the data centre.** The trigger is that the provider is subject to US legal process. A European subsidiary of a US parent may fall within scope where the parent has possession, custody, or control. Building a data centre in Frankfurt does not, by itself, remove a provider from reach.

**It is not a general surveillance power.** The Act operates through the existing Stored Communications Act framework: a warrant based on probable cause is required for content, with lower standards for metadata. It does not create bulk access.

**It also created a reciprocal channel.** The Act allows the US to enter **executive agreements** with qualifying foreign governments, letting each side's authorities request data directly from the other's providers instead of using the slower Mutual Legal Assistance Treaty (MLAT) route. The US–UK agreement was the first.

## Origins

The Act resolved *Microsoft Corp. v. United States* — the "Microsoft Ireland" case — in which Microsoft resisted a warrant for email stored in Dublin, arguing the Stored Communications Act did not apply extraterritorially. The Second Circuit agreed; the government appealed to the Supreme Court. Congress passed the CLOUD Act while the appeal was pending, which mooted the case: the statute now answered the question directly.

## The conflict with GDPR Article 48

This is the substance of the European objection, and it is a genuine legal conflict rather than a matter of sentiment.

**Article 48 GDPR** provides that a judgment or decision of a third-country authority requiring a controller or processor to transfer personal data is only recognisable or enforceable in the EU if it is based on an international agreement, such as an MLAT. A US warrant served directly on a provider is not such an agreement.

In their **joint response of 10 July 2019**, the European Data Protection Board and the European Data Protection Supervisor concluded that a CLOUD Act request alone does not constitute a legal basis for transferring personal data to the United States [2]. A provider caught between the two faces a direct conflict of laws: complying may breach the GDPR, refusing may breach US law.

A secondary conflict compounds it. US orders frequently carry a **protective order** — a gag prohibiting notification — while the GDPR obliges the controller to inform data subjects and, in some circumstances, the supervisory authority. Both obligations cannot be satisfied.

## Why this drives architecture

Because the conflict is unresolved, organisations manage it structurally rather than contractually. Common responses:

- **Sovereign cloud offerings.** Providers have built EU-operated, EU-staffed, legally separated offerings intended to place operational control outside US reach. Whether such structures fully defeat the possession-custody-or-control test is legally contested, not settled.
- **Encryption with customer-held keys.** If the provider cannot decrypt, it cannot meaningfully disclose plaintext. This is the most technically robust mitigation and the one that most directly addresses the statutory language — though it constrains which managed services you can use, since a service that processes your data must be able to read it.
- **Keeping regulated data out entirely.** The reasoning behind many [hybrid architectures](/comparisons/on-premise-vs-cloud-ai/): the classified or regulated dataset never leaves infrastructure the organisation controls, and only non-sensitive processing goes to a public cloud.
- **European providers.** Removing US jurisdiction from the equation rather than mitigating it.

## Common misconceptions

| Claim | Accurate position |
|---|---|
| "The CLOUD Act lets the US government read anything in any US cloud" | It requires lawful process — a warrant on probable cause for content — through the Stored Communications Act |
| "Storing data in the EU puts it out of reach" | Jurisdiction follows the provider's control, not the data's location |
| "It only affects US companies" | It affects any provider subject to US legal process, which can include non-US subsidiaries and affiliates |
| "Encryption makes no difference" | Provider-held keys make disclosure possible; customer-held keys substantially change what can be produced |
| "This is settled law in the EU" | The EDPB/EDPS position is clear, but the conflict has not been resolved by legislation or a definitive court ruling |

## Relationship to Schrems II and the DPF

The CLOUD Act is distinct from, but part of the same landscape as, the *Schrems II* judgment (2020), which invalidated the EU–US Privacy Shield over US government access to data, and the EU–US Data Privacy Framework that succeeded it in 2023. Those instruments concern the lawfulness of *transfers* under Chapter V GDPR. The CLOUD Act concerns *compelled disclosure* by a provider. An organisation can be fully compliant on transfer mechanisms and still face the Article 48 conflict. See [cross-border data transfers for AI](/guides/cross-border-data-transfers-ai/).

## Sources

1. 18 U.S.C. § 2713 — "Required preservation and disclosure of communications and records." Cornell Legal Information Institute. [https://www.law.cornell.edu/uscode/text/18/2713](https://www.law.cornell.edu/uscode/text/18/2713)
2. EDPB and EDPS. "Initial legal assessment of the impact of the US CLOUD Act on the EU legal framework for the protection of personal data" (10 July 2019). [https://www.edpb.europa.eu/our-work-tools/our-documents/letters/edpb-edps-joint-response-libe-committee-impact-us-cloud-act_en](https://www.edpb.europa.eu/our-work-tools/our-documents/letters/edpb-edps-joint-response-libe-committee-impact-us-cloud-act_en)
3. Regulation (EU) 2016/679 (GDPR), Article 48 — "Transfers or disclosures not authorised by Union law." [https://gdpr-info.eu/art-48-gdpr/](https://gdpr-info.eu/art-48-gdpr/)
4. US Department of Justice. "Promoting Public Safety, Privacy, and the Rule of Law Around the World: The Purpose and Impact of the CLOUD Act." [https://www.justice.gov/criminal/cloud-act-resources](https://www.justice.gov/criminal/cloud-act-resources)
5. Court of Justice of the European Union. *Data Protection Commissioner v Facebook Ireland and Maximillian Schrems* (Schrems II), C-311/18. [https://curia.europa.eu/juris/liste.jsf?num=C-311/18](https://curia.europa.eu/juris/liste.jsf?num=C-311/18)
