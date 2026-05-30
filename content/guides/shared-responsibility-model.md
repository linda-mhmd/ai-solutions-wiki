---
title: "The Shared Responsibility Model for AI on AWS"
description: "How AWS shared responsibility applies to AI and ML workloads: data, model, and infrastructure responsibilities across Bedrock and SageMaker."
date: 2026-03-25
categories: [Guides]
tags: ["security", "intermediate", "shared-responsibility", "cloud-security", "aws", "compliance", "governance"]
related:
  - glossary/shared-responsibility
  - tools/amazon-bedrock
  - guides/deployment-models-ai
  - patterns/observability-ai
last_updated: 2026-05-30
---

Every AWS customer operates under the shared responsibility model. AWS secures the cloud itself - the physical data centres, the hypervisor, the managed service infrastructure. The customer secures what they put in the cloud: their data, their application logic, their access controls, their compliance configuration. For standard web applications this division is well understood. For AI and ML workloads, the boundary requires more careful thought.

This article maps the shared responsibility model specifically to AI workloads, covering data responsibility, model responsibility, and how the split changes depending on whether you use Bedrock or SageMaker.

## The Core Division

AWS is responsible for:

- Physical security of data centres (ISO 27001, SOC 2)
- Hardware and network infrastructure
- The managed service layer (the Bedrock API, the SageMaker platform, the Lambda runtime)
- Patching and updating underlying infrastructure
- Global network security between AWS regions

The customer is responsible for:

- Identity and access management (IAM roles, resource policies)
- Data classification and encryption key management
- Network configuration (VPC, security groups, private endpoints)
- Application logic and prompt engineering
- Compliance with regulations that apply to their industry (GDPR, HIPAA, PCI DSS)
- Monitoring, logging, and incident response

This division does not change for AI workloads. What changes is the surface area on the customer side.

## Data Responsibility in AI

AI workloads handle data differently from standard applications. Three categories require specific attention.

**Training data.** If you fine-tune a model on SageMaker, you are responsible for the training dataset. This includes: ensuring the data was lawfully obtained, removing PII before training, documenting data provenance for reproducibility, and controlling access to the training corpus in S3. AWS does not inspect or validate your training data.

**Prompts and inference inputs.** Every user message sent to a Bedrock model is your data. If users can submit free-text input, you are responsible for preventing PII from entering prompts unnecessarily, logging inference inputs appropriately, and complying with data residency requirements. Bedrock does not use your prompts to train foundation models, but your application may log them to CloudWatch or DynamoDB - those logs are your responsibility.

**Model outputs.** Generated text may contain PII, copyrighted material, or confidential information echoed from the context. You are responsible for filtering outputs before displaying them to users, and for handling cases where the model reproduces information it should not.

## Model Responsibility

**Managed foundation models (Bedrock).** When you use Amazon Bedrock to call Anthropic Claude, Meta Llama, or Amazon Titan, the model weights are AWS infrastructure. AWS is responsible for the availability, security, and maintenance of those model artifacts. You are responsible for how you use the model: the prompts you send, the guardrails you configure, and the outputs you pass to users.

**Custom models and fine-tuned models.** If you upload a fine-tuned model to Bedrock Custom Model Import, or train and deploy a model on SageMaker, the model artifact is your intellectual property and your responsibility. You are responsible for model bias assessment, content safety evaluation, and version control. If a custom model produces harmful outputs, that liability rests with the customer, not AWS.

**Model access controls.** You are responsible for controlling which IAM principals can invoke which model endpoints. Overly permissive IAM policies are one of the most common AI security failures in AWS environments.

## Infrastructure Responsibility

**Bedrock.** Bedrock is a fully managed service. AWS operates and patches the underlying compute that runs inference. The customer does not select instance types or patch operating systems. Customer infrastructure responsibility is limited to: VPC endpoint configuration (if using private networking), KMS key management for encrypted data, CloudWatch log destination configuration, and S3 bucket policy for knowledge bases.

**SageMaker.** SageMaker gives customers control over the underlying instance type, the container image, and the endpoint configuration. This means more customer responsibility. You are responsible for: selecting appropriately secured container images, configuring instance isolation, enabling SageMaker network isolation for training jobs, and patching application dependencies in your inference containers. SageMaker patches the host OS, but not your application layer.

**Lambda + Bedrock (Serverless AI).** Lambda execution environments are AWS infrastructure. The customer is responsible for the function code, the IAM execution role, environment variables (including secrets management via AWS Secrets Manager rather than plaintext), and the configured memory and timeout settings.

## Responsibility Across the AI Lifecycle

| Lifecycle Stage | AWS Responsibility | Customer Responsibility |
|---|---|---|
| Data storage | S3 durability and availability | Encryption, access policy, data classification |
| Model training | SageMaker platform availability | Training data quality, instance configuration |
| Model serving (Bedrock) | Inference infrastructure | Prompt design, guardrails, output filtering |
| Model serving (SageMaker) | Host OS patching | Container, endpoint config, scaling policy |
| Logging | CloudWatch ingestion | Log retention, access control, alerting |
| Compliance | AWS compliance certifications | Customer workload compliance (GDPR, HIPAA) |

## Practical Security Controls

Regardless of which service you use, these controls are always the customer's responsibility:

**Enable Bedrock model invocation logging.** This captures request and response metadata to CloudWatch or S3 for audit purposes. It is off by default.

**Use resource-based policies on Bedrock knowledge bases.** Prevent other principals in your account from accessing knowledge base resources by default.

**Apply least-privilege IAM.** Lambda functions that call Bedrock should have exactly the permissions they need: bedrock:InvokeModel on the specific model ARN, nothing broader.

**Use AWS PrivateLink for Bedrock.** In regulated environments, route Bedrock API calls through a VPC endpoint so traffic never traverses the public internet.

**Encrypt model artifacts at rest.** SageMaker model artifacts in S3 should use customer-managed KMS keys so you control key rotation and can revoke access.

## Sources and Further Reading

- AWS Documentation: Shared Responsibility Model. [https://aws.amazon.com/compliance/shared-responsibility-model/](https://aws.amazon.com/compliance/shared-responsibility-model/)
- AWS Documentation: Shared Responsibility in the AWS Well-Architected Machine Learning Lens. [https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/shared-responsibility.html](https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/shared-responsibility.html)
- AWS Documentation: Amazon Bedrock security. [https://docs.aws.amazon.com/bedrock/latest/userguide/security.html](https://docs.aws.amazon.com/bedrock/latest/userguide/security.html)
- AWS Documentation: SageMaker security best practices. [https://docs.aws.amazon.com/sagemaker/latest/dg/security-best-practices.html](https://docs.aws.amazon.com/sagemaker/latest/dg/security-best-practices.html)
- Mohamed, L. (2026). "The Shared Responsibility Model for AI on AWS." AI Solutions Wiki. Linda Mohamed, AI & Cloud Consultant.
