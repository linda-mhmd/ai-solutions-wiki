---
title: "How to Get AWS Funding for Your AI Project"
description: "A practical guide to AWS PoC funding, MAP migration funding, and the BOX program - eligibility, application process, and how an AWS Partner helps you navigate it."
date: 2026-03-24
categories: [Guides]
tags: ["project-management", "beginner", "aws-funding", "poc", "proof-of-concept", "cloud-credits", "startup"]
tools: [amazon-bedrock, amazon-sagemaker]
last_updated: 2026-05-30
---

AWS provides funding programs that offset the cost of proof-of-concept projects, cloud migrations, and production AI workloads. These programs are underused, primarily because most companies do not know they exist or find the application process opaque. If you are planning an AI project on AWS, funding should be one of the first things you explore.

Specific credit amounts are not published on public AWS pages. They are communicated through the AWS Partner Central portal and vary by region, partner tier, and project scope. The figures in this article are drawn from AWS Partner network documentation and published case studies from AWS Partners.

## PoC Funding

The AWS Proof of Concept funding program provides credits to offset the AWS compute, storage, and API costs of building and running a prototype. The program calculates credits as **10% of the expected Annual Recurring Revenue (ARR)** the workload will generate once in production, capped at **$25,000 USD**.[^1]

For context: a project expected to generate $100,000 in annual AWS spend post-production would qualify for $10,000 in PoC credits. Projects with lower projected ARR qualify for proportionally less.

**What qualifies** - A defined project with a clear technical scope, measurable success criteria, and a realistic path to production. AWS funds PoCs that, if successful, lead to ongoing workloads on AWS. Generic exploration projects or PoCs with no clear production path do not qualify. AI projects with Bedrock, SageMaker, or Transcribe as the primary workload are actively prioritised.

**What it covers** - AWS service credits applied to your account. It does not cover consultant time, software licences, or internal staff costs.

**Application process** - Funding applications go through your AWS account team or an AWS Partner. The application describes the project, the technical architecture, the expected AWS service consumption, and the business case. Turnaround is typically 2-4 weeks.

## Migration Funding (MAP)

The AWS Migration Acceleration Program (MAP) covers migration of existing workloads to AWS - databases, applications, data warehouses. For AI projects that involve migrating data from on-premise to AWS before building AI capabilities, MAP can cover a substantial part of the migration cost.

MAP funding has been updated significantly. As of mid-2024, the maximum credit pool increased from approximately $460,000 to **$2 million USD** for large migrations.[^2]

MAP comes in two tiers:

- **MAP Lite** - designed for workloads with **$100,000 to $500,000** in projected annual AWS spend post-migration.[^3]
- **Standard MAP** - designed for workloads with **$500,000 or more** in projected annual AWS spend.

Credits are structured across three phases, each with its own rate:[^3]

- **Assess phase** - 5% of projected ARR, capped at $75,000
- **Mobilize phase** - 20% of post-migration ARR
- **Migrate phase** - 15-25% of ARR in credits

MAP funding comes in two components: a migration planning engagement (usually delivered by an AWS Partner) funded by AWS, and credit funding for the migration execution work. The planning engagement produces the business case, architecture, and migration plan that support the credit application.

**Eligibility** - Existing on-premise or competing cloud workloads. New-to-cloud customers qualify; migrations away from Azure or GCP also qualify. The workloads must be moving to AWS and staying there.

## Business Outcomes Xcelerator (BOX)

The BOX program is an AWS Partner program designed for partners building new practice areas or go-to-market motions around specific AWS services. It provides a combination of **cash incentives and AWS credits up to $70,000 USD**, tied to hitting defined milestones.[^4]

BOX is less commonly discussed than PoC or MAP because it targets the AWS Partner directly rather than the end customer. If you work with an AWS Partner, their BOX program participation can influence how much investment they put into your engagement - partners who are actively working toward BOX milestones have financial incentive to move workloads forward.

## How an AWS Partner Navigates This for You

AWS funding is not accessible through a public application form. Access runs through the AWS Partner network - consultants and system integrators with AWS Partner status can propose funding on your behalf through the AWS Partner Central portal.[^5]

An AWS Partner who knows the programs can:

- Identify which funding mechanism fits your situation
- Structure the project scope and application to align with what AWS funds
- Manage the application process and AWS account team communication
- Ensure the project delivers the metrics (workload growth, technical adoption) that lead to ongoing AWS investment in your account

For most customers, the partner's effort to navigate funding is included in the engagement cost. PoC credits on a project with meaningful AWS consumption are material - a $10,000 credit against $15,000-20,000 in AWS service costs changes the economics of running the prototype.

## What AWS Looks For

AWS funds projects with a clear path to production workloads. Success criteria in the PoC phase - measurable accuracy, latency, cost per transaction - that align with a production business case are more fundable than capability demonstrations without business context. Projects already in progress are harder to retroactively fund. Start the funding conversation before you start spending.

## Further reading

- [AWS Partner Funding Benefits](https://aws.amazon.com/partners/funding/): official overview of available partner funding programs
- [AWS Migration Acceleration Program](https://aws.amazon.com/migration-acceleration-program/): MAP program overview covering the three-phase framework (Assess, Mobilize, Migrate)
- [New MAP Incentives to Accelerate Migration and Modernization](https://aws.amazon.com/blogs/apn/new-map-incentives-to-accelerate-migration-and-modernization/): AWS APN blog announcing MAP 2.0 scaled incentives and strategic partner updates (July 2024)
- [Business Outcomes Xcelerator Program](https://aws.amazon.com/blogs/apn/business-outcomes-xcelerator-program/): AWS APN blog introduction to the BOX program
- [AWS Proof of Concept Funding Guide](https://www.metaltoad.com/blog/aws-partner-proof-concept-funding): AWS Partner Metal Toad on PoC funding mechanics and the 10% ARR calculation
- [3 Changes to the AWS Migration Acceleration Program](https://rapidscale.net/resources/blog/aws/3-changes-to-aws-migration-acceleration-program-map): RapidScale on MAP Lite thresholds and SPI credit caps

---

[^1]: Metal Toad (AWS Partner), [AWS Partner Proof of Concept Funding](https://www.metaltoad.com/blog/aws-partner-proof-concept-funding). PoC funding is calculated at 10% of expected ARR, capped at $25,000 USD. Specific amounts are confirmed by multiple AWS Partners including [Dedicatted](https://dedicatted.com/insights/aws-proof-of-concept-how-to-try-new-cloud-services-for-free).

[^2]: RapidScale, [3 Changes to the AWS Migration Acceleration Program](https://rapidscale.net/resources/blog/aws/3-changes-to-aws-migration-acceleration-program-map). Confirms the credit cap increase from approximately $460,000 to $2 million effective July 1, 2024. The AWS APN blog post [New MAP Incentives to Accelerate Migration and Modernization](https://aws.amazon.com/blogs/apn/new-map-incentives-to-accelerate-migration-and-modernization/) announces the same update in qualitative terms.

[^3]: RapidScale, [3 Changes to the AWS Migration Acceleration Program](https://rapidscale.net/resources/blog/aws/3-changes-to-aws-migration-acceleration-program-map). Covers MAP Lite thresholds ($100K-$500K ARR), standard MAP thresholds, and per-phase credit percentages. Further detail at [Opsio Cloud](https://opsiocloud.com/knowledge-base/what-are-aws-map-credits/).

[^4]: AWS APN Blog, [Business Outcomes Xcelerator Program](https://aws.amazon.com/blogs/apn/business-outcomes-xcelerator-program/). The $70,000 figure is referenced in AWS Partner Network materials and cited by multiple AWS Partners. Specific milestone amounts are communicated through AWS Partner Central.

[^5]: AWS, [Funding Benefits for AWS Partners](https://aws.amazon.com/partners/funding/). Funding applications are submitted through the AWS Partner Central self-serve portal by AWS Partners on behalf of customers.
