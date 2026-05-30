---
title: "Shared Responsibility Model"
description: "What the shared responsibility model is, how AWS, Azure, and GCP divide security duties, and special considerations for AI and ML workloads."
date: 2026-03-25
categories: [Glossary]
tags: ["security", "beginner", "shared-responsibility", "cloud-security", "aws", "compliance", "model"]
related:
  - guides/shared-responsibility-model
  - tools/amazon-bedrock
  - guides/deployment-models-ai
last_updated: 2026-05-30
---

The Shared Responsibility Model is a cloud security framework that defines which security and compliance obligations belong to the cloud provider and which belong to the customer. The division exists because cloud computing separates ownership: the provider owns and operates the physical infrastructure, while the customer controls what they deploy on top of it.

The core principle is summarised in AWS's formulation: AWS is responsible for security "of the cloud," and the customer is responsible for security "in the cloud."

## Provider Responsibilities

Cloud providers take responsibility for:

- Physical security of data centres (guards, biometric access, surveillance)
- Hardware maintenance and disposal (secure disk wiping, hardware lifecycle)
- Hypervisor and virtualisation layer security
- Global network infrastructure and DDoS protection at the network layer
- Managed service platforms (the runtime and infrastructure behind Lambda, Bedrock, RDS)
- Compliance certifications for the infrastructure layer (ISO 27001, SOC 2, PCI DSS, HIPAA eligibility)

## Customer Responsibilities

Customers are responsible for:

- Identity and access management (who can access what)
- Data encryption (choosing to enable encryption, managing encryption keys)
- Network configuration (VPCs, security groups, firewall rules)
- Operating system patching (for IaaS deployments - EC2, ECS, self-managed Kubernetes)
- Application security (input validation, authentication, business logic)
- Data classification and compliance configuration (enabling HIPAA controls, configuring data residency)
- Monitoring, logging, and incident response

## How the Division Shifts by Service Type

The customer's responsibility surface changes based on which type of managed service they use. More managed services mean less customer responsibility.

| Service Type | Example | Customer manages |
|---|---|---|
| IaaS | EC2 instance | OS, runtime, app, data, network |
| PaaS | SageMaker endpoint | App code, data, endpoint config |
| SaaS | Bedrock managed model | API usage, data sent, IAM, output handling |
| Serverless | Lambda function | Function code, IAM, data |

## Shared Responsibility Across Cloud Providers

All three major cloud providers use this model, with minor differences in terminology.

**AWS:** "Security of the cloud vs security in the cloud." The most widely cited formulation.

**Microsoft Azure:** Divides responsibilities across on-premises, IaaS, PaaS, and SaaS with a table showing which responsibilities transfer to Microsoft at each service tier. Azure emphasises that customer responsibility for identity management remains constant regardless of service type.

**Google Cloud Platform:** Uses similar framing but places greater emphasis on the "shared fate" concept, where GCP provides security best practices and tools to help customers fulfill their obligations.

## AI and ML Workload Considerations

Standard shared responsibility frameworks were written before AI/ML became a core cloud workload category. AI workloads introduce responsibilities not covered by the standard model.

**Training data responsibility.** The customer is solely responsible for training data: lawful acquisition, PII removal, quality, and access control. AWS does not inspect or validate customer training data.

**Prompt and inference data.** Every input sent to a foundation model is customer data. The customer decides what can be sent, how it is logged, and what data residency requirements apply.

**Output responsibility.** The customer is responsible for filtering and validating model outputs before presenting them to users. AWS (or the model provider) is not responsible for content in model outputs used in ways that violate guidelines or regulations.

**Fine-tuned model responsibility.** A fine-tuned model is a customer asset. AWS is responsible for the fine-tuning platform availability; the customer is responsible for the model's behaviour, bias, and safety characteristics.

**Model access control.** Ensuring that only authorised principals can invoke AI endpoints is always a customer responsibility.

## Sources and Further Reading

- AWS Documentation: Shared Responsibility Model. [https://aws.amazon.com/compliance/shared-responsibility-model/](https://aws.amazon.com/compliance/shared-responsibility-model/)
- AWS Documentation: Shared responsibility in the Machine Learning Lens. [https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/shared-responsibility.html](https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/shared-responsibility.html)
- Microsoft Azure: Shared responsibility in the cloud. [https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility](https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility)
- Google Cloud: Shared responsibility and shared fate on Google Cloud. [https://cloud.google.com/architecture/framework/security/shared-responsibility-shared-fate](https://cloud.google.com/architecture/framework/security/shared-responsibility-shared-fate)
