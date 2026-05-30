---
title: "Infrastructure as Code (IaC)"
description: "What Infrastructure as Code is, and how Terraform, AWS CDK, and CloudFormation compare for managing AI project infrastructure."
date: 2026-03-24
categories: [Glossary]
tags: ["devops", "beginner", "infrastructure-as-code", "iac", "terraform", "automation", "provisioning"]
last_updated: 2026-05-30
---

Infrastructure as Code (IaC) is the practice of managing and provisioning cloud infrastructure through machine-readable configuration files rather than manual console operations. With IaC, your infrastructure has the same version history, code review process, and deployment automation as your application code.

<figure class="bz-figure">
  <img src="/img/basics/diagram-infrastructure.png" alt="A diagram showing infrastructure components connected by code: servers, databases, and networks defined as configuration rather than manual setup." loading="lazy">
  <figcaption>Infrastructure as Code treats your cloud resources like application code. Every server, database, and network rule is defined in version-controlled files that can be reviewed, tested, and deployed automatically.</figcaption>
</figure>

## Why IaC for AI Projects

AI projects typically involve many interconnected AWS services: S3 buckets, Lambda functions, Step Functions state machines, IAM roles, Bedrock configurations, EventBridge rules, and more. Manually creating these through the AWS console is:

- **Not repeatable** - no reliable way to recreate the exact environment for a new region, team member, or after an incident
- **Not auditable** - no record of who changed what and when
- **Prone to drift** - the console configuration diverges from what the team thinks is deployed

IaC makes infrastructure reproducible, reviewable, and deployable in CI/CD pipelines alongside application code.

## Terraform

Terraform (by HashiCorp) is the most widely used IaC tool. It uses HCL (HashiCorp Configuration Language), a declarative format describing desired state. Terraform supports every major cloud provider and thousands of third-party services through its provider ecosystem.

Advantages: multi-cloud (same workflow for AWS, Azure, GCP), large community, mature module ecosystem on the Terraform Registry.

Limitations: HCL is a custom language (not a general-purpose programming language), dynamic configuration requires workarounds, the AWS provider sometimes lags behind new service launches.

## AWS CDK

AWS Cloud Development Kit (CDK) lets you define infrastructure using TypeScript, Python, Java, C#, or Go. CDK synthesizes to CloudFormation templates, so it is ultimately CloudFormation under the hood.

Advantages: use real programming languages (loops, conditionals, classes), strong TypeScript typing catches errors at compile time, L2/L3 constructs provide sensible defaults for common patterns.

Limitations: AWS-only, CloudFormation service limits apply, deployment can be slower than Terraform for large stacks.

## CloudFormation

AWS CloudFormation is AWS's native IaC service. Templates are YAML or JSON. CDK compiles to CloudFormation, so they share the same execution model.

Advantages: no additional tooling required, deep AWS service support (new services often ship CloudFormation support on day one), native drift detection.

Limitations: YAML/JSON is verbose, limited abstraction capability, error messages are notoriously unhelpful.

## Comparison Summary

| Dimension | Terraform | CDK | CloudFormation |
|---|---|---|---|
| Language | HCL | Python/TS/etc. | YAML/JSON |
| Multi-cloud | Yes | No | No |
| Abstraction | Modules | L2/L3 constructs | Nested stacks |
| State management | S3 + DynamoDB | Managed by CF | Managed by CF |
| Learning curve | Medium | Medium (Python familiar) | Medium (YAML verbose) |

See the [Terraform vs CDK comparison]({{< relref "/comparisons/terraform-vs-cdk.md" >}}) for a detailed decision framework.

## IaC for AI Projects in Practice

For AI projects, IaC typically manages:
- Storage (S3 buckets with lifecycle policies, versioning, encryption)
- Compute (Lambda functions, ECS tasks, Step Functions)
- AI services (Bedrock model access, Knowledge Base configurations)
- Auth (Cognito User Pools, IAM roles and policies)
- Networking (VPC, security groups for private AI endpoints)

The IAM layer is where IaC provides the most value for AI projects - precisely defining what each Lambda function and Step Functions state can access prevents privilege escalation and limits blast radius.

## Related Articles

- [Terraform]({{< relref "/tools/terraform.md" >}}) - detailed guide
- [Terraform vs CDK]({{< relref "/comparisons/terraform-vs-cdk.md" >}}) - choosing between tools
- [Serverless Computing]({{< relref "serverless.md" >}}) - primary infrastructure pattern for AI workloads

## Sources

- Morris, K. (2016). *Infrastructure as Code: Managing Servers in the Cloud*. O'Reilly Media. (First book to comprehensively define IaC practices; established the principles of dynamic infrastructure management.)
- Hashimoto, M. (2014). Terraform: A tool for building, changing, and versioning infrastructure safely and efficiently. *HashiCorp*. (Terraform introduction; the most widely adopted IaC tool for multi-cloud infrastructure.)
- Humble, J., & Farley, D. (2010). *Continuous Delivery*. Addison-Wesley. Chapter 11: Managing Infrastructure and Environments. (Established treating infrastructure as code as a prerequisite for continuous delivery.)
