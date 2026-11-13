---
title: "Part 5: Security and reliability"
description: "Part 5 of If You Were an AWS Service, a fun intro to AWS: the answers that picked AWS IAM, AWS Well-Architected, Amazon Verified Permissions and AWS Elastic Disaster Recovery at AWS Hero Summit Seattle 2025."
date: 2026-11-12
last_updated: 2026-11-13
lastmod: 2026-11-13
weight: 5
part: 5
group: "Security & reliability"
summary: "Who may do what in your AWS account and in your own apps, how to review an architecture, and how to recover when things go wrong."
tags: ["aws", "beginner", "video", "security", "reliability"]
---

This part is about keeping things safe and keeping them running.

### AWS IAM

> **The answers:** IAM, because everyone needs it and nobody thinks about it. And IAM as passport control.

{{< video src="fun-videos/if-you-were-an-aws-service/p5-iam.mp4" title="AWS IAM: the explanation" caption="The explanation from the full video, with the people cut out. Narrated by Linda Mohamed (her cloned voice)." >}}

IAM, Identity and Access Management, controls who can sign in to AWS and what they are allowed to do. Every operation in AWS must be authenticated and authorized by IAM. Apart from the root user, every request starts as a no. Only a policy that allows it lets it through, and one explicit deny beats every allow. A role has no password of its own: you assume it, and you get temporary credentials for that session.

Passport control is the picture to keep: your passport proves who you are, that is authentication; your visa says what you may do, that is authorization.

### AWS Well-Architected

> **The answer:** one person picks Well-Architected. The reason is in the full video.

{{< video src="fun-videos/if-you-were-an-aws-service/p5-wellarchitected.mp4" title="AWS Well-Architected: the explanation" caption="The explanation from the full video, with the people cut out. Narrated by Linda Mohamed (her cloned voice)." >}}

The Well-Architected Framework helps you weigh the pros and cons of your decisions when you build on AWS. It asks the same careful questions about every workload, across six pillars: operational excellence, security, reliability, performance efficiency, cost optimization and sustainability. The free Well-Architected Tool walks you through them and flags high risk issues.

### Amazon Verified Permissions

> **The answer:** one person picks Verified Permissions. The reason is in the full video.

{{< video src="fun-videos/if-you-were-an-aws-service/p5-verifiedpermissions.mp4" title="Amazon Verified Permissions: the explanation" caption="The explanation from the full video, with the people cut out. Narrated by Linda Mohamed (her cloned voice)." >}}

Verified Permissions decides who may do what inside the applications you build yourself. Your AWS account is IAM's part. Your app asks one question: can this user do this action on this resource? Verified Permissions answers allow or deny, from policies written in Cedar. Nothing is allowed by default, and a forbid always beats a permit.

### AWS Elastic Disaster Recovery

> **The answer:** Elastic Disaster Recovery, from someone who thinks in redundancy.

{{< video src="fun-videos/if-you-were-an-aws-service/p5-drs.mp4" title="AWS Elastic Disaster Recovery: the explanation" caption="The explanation from the full video, with the people cut out. Narrated by Linda Mohamed (her cloned voice)." >}}

Elastic Disaster Recovery keeps a ready copy of your servers on AWS, so you recover fast and lose little data. It copies your servers block by block into a staging area in your AWS account. If disaster strikes, you launch recovery instances within minutes. The explainer agrees with thinking in redundancy: high availability keeps the parts running, disaster recovery keeps a copy of the whole thing.

## Sources

1. AWS IAM User Guide, "How AWS enforcement code logic evaluates requests to allow or deny access" (implicit deny except root; explicit deny overrides allow): https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic_policy-eval-denyallow.html
2. AWS IAM User Guide, "IAM roles" (no long-term credentials; temporary credentials when assumed): https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html
3. AWS Well-Architected Framework, "The pillars of the framework": https://docs.aws.amazon.com/wellarchitected/latest/framework/the-pillars-of-the-framework.html
4. AWS Well-Architected Tool User Guide: https://docs.aws.amazon.com/wellarchitected/latest/userguide/intro.html
5. Amazon Verified Permissions User Guide, "What is Amazon Verified Permissions?" (policies in Cedar): https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/what-is-avp.html
6. Cedar documentation, "Authorization" (a satisfied forbid overrides any permit): https://docs.cedarpolicy.com/auth/authorization.html
7. AWS Elastic Disaster Recovery User Guide, "What is Elastic Disaster Recovery?" (staging area in your account, recovery instances within minutes): https://docs.aws.amazon.com/drs/latest/userguide/what-is-drs.html
8. AWS whitepaper, "Disaster Recovery of Workloads on AWS: Recovery in the Cloud", section "Disaster recovery options in the cloud" (block-level replication): https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html
