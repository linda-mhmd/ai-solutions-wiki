---
title: "Part 2: Compute"
description: "Part 2 of If You Were an AWS Service, a fun intro to AWS: the answers that picked AWS Lambda, Amazon EC2 and the AWS Nitro System at AWS Hero Summit Seattle 2025, and what each service does."
date: 2026-11-12
last_updated: 2026-11-13
lastmod: 2026-11-13
weight: 2
part: 2
group: "Compute"
summary: "Where code runs: Lambda runs it when something happens, EC2 gives you a virtual server, Nitro sits underneath."
tags: ["aws", "beginner", "video", "compute", "serverless"]
services: ["aws-lambda"]
---

Compute is where your code runs. This part goes from no servers at all to the hardware underneath.

### AWS Lambda

> **The answers:** Lambda, because it can burst into explosion. Because it is short and ephemeral. Because everybody loves it. Because it meets and mingles with everybody. Because it is event-driven, like the first coffee of the morning. And because it takes a couple of minutes to get going.

{{< video src="fun-videos/if-you-were-an-aws-service/p2-lambda.mp4" title="AWS Lambda: the explanation" caption="The explanation from the full video, with the people cut out. Narrated by Linda Mohamed (her cloned voice)." >}}

Lambda runs your code without you managing servers. It runs when something happens: a file lands in S3, a message arrives in a queue, a request comes in through API Gateway.

- **Burst into explosion.** When requests pour in, each function can add up to a thousand execution environments every ten seconds.
- **Short and ephemeral.** A standard invocation runs for fifteen minutes at most.
- **Meets and mingles with everybody, event-driven.** Many AWS services can trigger a function directly.
- **A couple of minutes to get going.** This is the cold start: when no environment is ready, Lambda first downloads your code, starts the runtime and runs your setup code. Provisioned concurrency keeps environments warm, and SnapStart resumes from a snapshot.

### Amazon EC2

> **The answers:** several people pick EC2. One of them adds: expensive and high maintenance.

{{< video src="fun-videos/if-you-were-an-aws-service/p2-ec2.mp4" title="Amazon EC2: the explanation" caption="The explanation from the full video, with the people cut out. Narrated by Linda Mohamed (her cloned voice)." >}}

EC2 gives you virtual servers that you start whenever you need them. It launched as a beta in August 2006 with a single instance type. Today AWS counts over a thousand, and its twentieth-birthday post in August 2026 says over 1,200.

The explainer takes "expensive and high maintenance" seriously. With your own virtual server you look after the operating system, its updates and security patches, your software and your firewall rules. The price depends on how you buy: by the second, with Savings Plans, or as Spot Instances.

### AWS Nitro System

> **The answer:** one person picks Nitro. The reason is in the full video.

{{< video src="fun-videos/if-you-were-an-aws-service/p2-nitro.mp4" title="AWS Nitro System: the explanation" caption="The explanation from the full video, with the people cut out. Narrated by Linda Mohamed (her cloned voice)." >}}

Nitro is the hardware and software platform underneath modern EC2 instances. Dedicated Nitro Cards take networking, storage and management off the main server, and a minimal hypervisor built on the open-source KVM splits up CPU and memory. By design, no system or person can log in to a Nitro host.

## Sources

1. AWS Lambda Developer Guide, "Event Function scaling behavior" (1,000 execution environments every 10 seconds): https://docs.aws.amazon.com/lambda/latest/dg/scaling-behavior.html
2. AWS Lambda Developer Guide, "Configure Lambda Event Function timeout" (up to 900 seconds): https://docs.aws.amazon.com/lambda/latest/dg/configuration-timeout.html
3. AWS Lambda Developer Guide, "Invoking Lambda with events from other AWS services": https://docs.aws.amazon.com/lambda/latest/dg/lambda-services.html
4. AWS Lambda Developer Guide, "Understanding the Lambda execution environment lifecycle": https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtime-environment.html
5. AWS Lambda Developer Guide, "Configuring provisioned concurrency for an Event Function": https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html
6. AWS Lambda Developer Guide, "Improving startup performance with Lambda SnapStart": https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html
7. AWS, "Announcing Amazon Elastic Compute Cloud (Amazon EC2) - beta" (24 August 2006): https://aws.amazon.com/about-aws/whats-new/2006/08/24/announcing-amazon-elastic-compute-cloud-amazon-ec2---beta/
8. AWS News Blog, "Happy 20th Birthday, Amazon EC2" (25 August 2026; one instance type at launch, over 1,200 today): https://aws.amazon.com/blogs/aws/happy-20th-birthday-amazon-ec2/
9. Amazon EC2 product page ("over 1,000 instance types"): https://aws.amazon.com/ec2/
10. Amazon EC2 User Guide, "Amazon EC2 billing and purchasing options": https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-purchasing-options.html
11. AWS whitepaper, "The Security Design of the AWS Nitro System", section "No AWS operator access": https://docs.aws.amazon.com/whitepapers/latest/security-design-of-aws-nitro-system/no-aws-operator-access.html
12. AWS whitepaper, "The Security Design of the AWS Nitro System", section on the components of the Nitro System (Nitro Cards for networking, storage and management): https://docs.aws.amazon.com/whitepapers/latest/security-design-of-aws-nitro-system/the-components-of-the-nitro-system.html
13. Amazon EC2 FAQs ("the lightweight Nitro Hypervisor that is based on core KVM technology"): https://aws.amazon.com/ec2/faqs/
