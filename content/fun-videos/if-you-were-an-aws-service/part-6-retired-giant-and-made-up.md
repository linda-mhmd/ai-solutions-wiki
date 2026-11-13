---
title: "Part 6: Retired, giant and made-up services"
description: "Part 6 of If You Were an AWS Service, a fun intro to AWS: answers that picked retired services like SimpleDB, the Snowmobile truck, Kiro, and two services invented on the spot, and what each says about AWS."
date: 2026-11-12
last_updated: 2026-11-13
lastmod: 2026-11-13
weight: 6
part: 6
group: "Retired, giant and made-up"
summary: "How AWS retires a service, a data centre on a truck, an AI development environment, and two services that do not exist yet."
tags: ["aws", "beginner", "video", "history"]
---

The last part collects the answers that do not fit a service group: the old, the very big and the invented.

### Retired services: SimpleDB and DeepRacer

> **The answers:** SimpleDB, and DeepRacer, both services AWS has retired.

{{< video src="fun-videos/if-you-were-an-aws-service/p6-retired.mp4" title="Retired services: the explanation" caption="The explanation from the full video, with the people cut out. Narrated by Linda Mohamed (her cloned voice)." >}}

AWS retires services in three stages it calls maintenance, sunset and full shutdown. In maintenance, existing customers keep using a service, but new ones cannot join. Usually there is somewhere to go: EC2-Classic customers moved to VPC, and DynamoDB was built for what SimpleDB could not do. SimpleDB was announced in December 2007. DeepRacer's console closed in December 2025, and it lives on as open source.

### AWS Snowmobile and Kiro

> **The answers:** one person picks two services: Snowmobile, and Kiro.

{{< video src="fun-videos/if-you-were-an-aws-service/p6-snowmobile-kiro.mp4" title="AWS Snowmobile and Kiro: the explanation" caption="The explanation from the full video, with the people cut out. Narrated by Linda Mohamed (her cloned voice)." >}}

Snowmobile was AWS's truck-sized data transfer service: a forty-five-foot shipping container pulled by a semi-trailer truck, carrying up to one hundred petabytes to the cloud. AWS shut it down on 14 March 2024. Today data travels over the network with DataSync, or, for Enterprise Support customers, you bring your own disks to a Data Transfer Terminal. Kiro is AWS's agentic development environment, built for spec-driven development: it writes a spec with you first, and the agent works through it, task by task. It started in July 2025 as an IDE and now also comes as a CLI, a web interface and a mobile app.

### Two made-up services

> **The answers:** a feedback service, invented for cranky feedback. And AWS Classic Elastic Lambda.

{{< video src="fun-videos/if-you-were-an-aws-service/p6-madeup.mp4" title="Two made-up services: the explanation" caption="The explanation from the full video, with the people cut out. Narrated by Linda Mohamed (her cloned voice)." >}}

Neither exists, and both jokes point at something real. Feedback shapes AWS: Jeff Barr wrote in 2017 that about ninety percent of the items on the AWS roadmap originate with customer requests, every docs page asks whether it helped you, and some teams keep their roadmap in the open on GitHub, where anyone can open an issue or upvote one. And Elastic and Classic are both real words in AWS service names. In November 2025 AWS launched Lambda Managed Instances, which runs Lambda functions on EC2 instances in your account.

### The ones who did not pick

Not everyone picks a service. The last answers in the film are about the summit instead. They are in the full video.

## Sources

1. AWS General Reference, "AWS Lifecycle Changes" (maintenance, sunset, full shutdown): https://docs.aws.amazon.com/general/latest/gr/service-lifecycle.html
2. AWS General Reference, list of services in full shutdown (Snowmobile, 14 March 2024): https://docs.aws.amazon.com/general/latest/gr/full_shutdown_services.html
3. AWS News Blog, Jeff Barr, "EC2-Classic Networking is Retiring - Here's How to Prepare" (28 July 2021): https://aws.amazon.com/blogs/aws/ec2-classic-is-retiring-heres-how-to-prepare/
4. AWS, "Announcing Amazon SimpleDB (limited beta)" (13 December 2007): https://aws.amazon.com/about-aws/whats-new/2007/12/13/announcing-amazon-simpledb-limited-beta/
5. AWS DeepRacer FAQs (console closed 15 December 2025; open source): https://aws.amazon.com/deepracer/faqs/
6. AWS News Blog, Jeff Barr, "AWS Snowmobile - Move Exabytes of Data to the Cloud in Weeks" (30 November 2016; 45-foot container, up to 100 PB): https://aws.amazon.com/blogs/aws/aws-snowmobile-move-exabytes-of-data-to-the-cloud-in-weeks/
7. AWS DataSync User Guide, "What is AWS DataSync?": https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html
8. AWS Data Transfer Terminal User Guide, "What is Data Transfer Terminal?" (Enterprise Support customers): https://docs.aws.amazon.com/datatransferterminal/latest/userguide/what-is-dtt.html
9. Kiro, "Introducing Kiro" (14 July 2025): https://kiro.dev/blog/introducing-kiro/
10. AWS DevOps Blog, Amazon Q Developer end-of-support announcement (30 April 2026; Kiro "built from the ground up for spec-driven development"): https://aws.amazon.com/blogs/devops/amazon-q-developer-end-of-support-announcement/
11. AWS News Blog, Jeff Barr, "AWS Named as a Leader in Gartner's Infrastructure as a Service (IaaS) Magic Quadrant for 7th Consecutive Year" (16 June 2017; "Approximately 90% of the items on the roadmap originate with customer requests"): https://aws.amazon.com/blogs/aws/aws-named-as-a-leader-in-gartners-infrastructure-as-a-service-iaas-magic-quadrant-for-7th-consecutive-year/
12. AWS, "Announcing AWS Lambda Managed Instances, a capability to run functions on your Amazon EC2 instances" (30 November 2025): https://aws.amazon.com/about-aws/whats-new/2025/11/aws-lambda-managed-instances/
