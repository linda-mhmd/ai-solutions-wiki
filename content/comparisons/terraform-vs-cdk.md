---
title: "Terraform vs AWS CDK - Which IaC Tool to Choose"
description: "When to use Terraform vs AWS CDK for AI project infrastructure: pros, cons, and decision criteria for each tool."
date: 2026-03-24
last_verified: 2026-05-30
categories: [Comparisons]
tags: ["devops", "intermediate", "terraform", "aws-cdk", "infrastructure-as-code", "comparison", "provisioning"]
last_updated: 2026-05-30
---

Terraform and AWS CDK are the two dominant infrastructure-as-code tools for AWS projects. They have different philosophies, strengths, and team fit. This article provides a decision framework for AI projects.

## Core Difference

**Terraform** uses HCL (HashiCorp Configuration Language), a declarative DSL designed specifically for infrastructure. You describe what resources you want; Terraform figures out the execution order and API calls.

**AWS CDK** uses general-purpose programming languages (TypeScript, Python, Java, C#, Go). CDK code compiles to CloudFormation templates, which AWS then deploys. CDK provides L2 constructs (opinionated resource configurations with defaults) and L3 constructs (patterns like a Lambda-behind-API-Gateway) that reduce boilerplate.

Both manage infrastructure state: Terraform in its own state file (stored in S3), CDK via CloudFormation's own state management.

## Where Terraform Wins

**Multi-cloud and hybrid:** If your AI project touches AWS, Cloudflare (DNS/CDN), Datadog (monitoring), PagerDuty (alerting), and GitHub (repositories), Terraform manages all of them in the same workflow. CDK is AWS-only; you need separate tooling for other providers.

**Predictable plan output:** `terraform plan` produces a diff that is easy to read and review in PRs. CloudFormation change sets (CDK's equivalent) are less readable, especially for large changes.

**Team-agnostic:** HCL is simple enough that infrastructure can be reviewed by people who are not Python or TypeScript developers. Non-engineering stakeholders can read a Terraform plan output.

**Existing module ecosystem:** The Terraform Registry has well-maintained modules for common AWS patterns. For AI projects, modules for VPC, EKS, RDS, and S3 are battle-tested by thousands of teams.

## Where CDK Wins

**Programming language power:** CDK's real advantage is using a programming language for infrastructure. Loops, conditionals, functions, and classes make dynamic infrastructure straightforward. Creating 10 similar Lambda functions with minor variations requires a loop in CDK; in Terraform it requires `count`, `for_each`, or code generation.

**TypeScript type safety:** In TypeScript CDK, the compiler catches invalid resource configurations before deployment. Passing an incorrect ARN format or wrong enum value is a compile-time error. Terraform validates at plan time, not compile time.

**L2/L3 constructs:** CDK's higher-level constructs encode AWS best practices. `lambda.Function` automatically creates an IAM execution role, log group, and sensible defaults. You write less configuration for common patterns.

**AWS-first teams:** If the team writes Python or TypeScript daily and infrastructure is AWS-only, CDK feels more natural than learning HCL syntax.

## For AI Projects Specifically

Most AI projects on AWS are AWS-only (no multi-cloud requirements) and have Python developers. These factors favor CDK. However:

- If the project involves Cloudflare Workers or external SaaS APIs, Terraform handles the whole stack.
- If infrastructure is reviewed by a broad team (including non-developers), Terraform's plan output is more accessible.
- If the project uses a standard architecture (Lambda + API Gateway + DynamoDB + S3), CDK's L3 constructs save significant boilerplate.

## Migration Considerations

Migrating between the two is painful because there is no automatic conversion path. Terraform state and CloudFormation state are incompatible. Plan for a full re-provision rather than an in-place migration.

Choose based on long-term fit rather than short-term convenience.

## Related Articles

- [Terraform]({{< relref "/tools/terraform.md" >}}) - detailed Terraform guide
- [Infrastructure as Code]({{< relref "/glossary/infrastructure-as-code.md" >}}) - IaC fundamentals
