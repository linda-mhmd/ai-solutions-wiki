---
title: "Security (Well-Architected Pillar)"
description: "The Well-Architected pillar covering IAM, encryption, network security, and detection - and how it applies to AI workloads including training data protection, prompt injection defense, and Bedrock Guardrails."
date: 2026-03-26
categories: [Glossary]
tags: ["security", "beginner", "security", "well-architected", "aws", "zero-trust", "compliance"]
related:
  - frameworks/well-architected-framework
  - frameworks/well-architected-ai-ml-lens
  - glossary/reliability-pillar
---

Security is one of the six pillars of the AWS Well-Architected Framework. It covers the ability to protect data, systems, and assets while delivering business value. The security pillar recognizes that security must be designed into a workload from the beginning, not added after the fact. Retroactive security is consistently more expensive and less effective than security by design.

Source: [AWS Well-Architected Security Pillar](https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html)

## Core Concepts

**Identity and Access Management (IAM)** is the foundation of cloud security. Every entity that accesses a cloud resource - a person, an application, a service - should have an identity with only the permissions required to perform its function. The principle of least privilege means granting the minimum set of permissions needed, and reviewing permissions regularly to remove those that are no longer required. IAM misconfigurations - overly permissive roles, unused credentials with full admin access, lack of multi-factor authentication - are among the most common sources of cloud security incidents.

**Encryption at rest and in transit** protects data from unauthorized access when it is stored and when it moves between systems. AWS services like S3, RDS, and EBS support encryption at rest using AWS Key Management Service. Data in transit should be encrypted using TLS. Key management - controlling who can access encryption keys and rotating keys on a defined schedule - is as important as encryption itself.

**Network security** limits which systems can communicate with each other. Security groups and network ACLs control traffic at the instance and subnet level. Private subnets ensure that services are not directly accessible from the internet unless required. VPC endpoints allow private communication with AWS services without routing traffic through the public internet.

**Detection** covers the monitoring and alerting needed to identify security events. AWS CloudTrail logs all API calls. AWS GuardDuty provides threat detection based on network traffic and CloudTrail logs. AWS Security Hub aggregates findings from multiple security services into a single view. Effective detection requires defining what constitutes a security event, routing alerts to the right people, and having playbooks for responding to each alert type.

## Application to AI Workloads

AI workloads introduce security concerns that extend beyond the standard cloud security model.

**Training data protection** is critical because training datasets often contain sensitive information: customer records, medical data, proprietary documents, or internal communications used to build domain-specific models. Access to training data in S3 should be governed by IAM policies with least-privilege permissions. Training pipelines should log all data access. Data used for fine-tuning foundation models should be subject to the same data governance controls as production databases.

**Model access control** covers who can invoke a deployed model endpoint and what they can ask it to do. SageMaker endpoints support IAM authentication. Amazon Bedrock integrates with IAM for controlling access to foundation models and for logging inference requests to CloudTrail. Access policies should distinguish between users who can invoke a model for inference, users who can update model deployments, and users who can access training data.

**Prompt injection** is a security vulnerability specific to large language model applications. It occurs when malicious content in user input - or in data retrieved by the model - causes the model to behave in unintended ways: disclosing information it should not, ignoring its system prompt, or taking actions outside its intended scope. Defenses include input validation before passing content to the model, system prompt hardening that explicitly instructs the model to ignore conflicting instructions, output filtering to catch responses that match patterns indicating injection, and architectural separation between trusted instructions and untrusted user input.

**PII in prompts** is a data protection concern: if users include personally identifiable information in prompts sent to a foundation model, that information may be logged, stored, or used in ways that conflict with privacy regulations. Applications handling sensitive user data should implement PII detection on input before sending to model APIs, and should configure logging to redact or exclude PII from audit logs.

**Amazon Bedrock Guardrails** is a managed service that enforces content policies on Bedrock interactions. It provides configurable controls for content filtering (blocking harmful or inappropriate content), topic restriction (preventing the model from discussing defined topics), PII detection and redaction, and grounding checks that compare model responses against source documents. Guardrails provide a managed layer of AI-specific security controls that complement standard cloud security practices.

## Sources

- AWS. (2023). *AWS Well-Architected Framework: Security Pillar*. Amazon Web Services. (Definitive reference for the seven security design principles: implement a strong identity foundation, enable traceability, apply security at all layers, automate security best practices, protect data in transit and at rest, keep people away from data, prepare for security events.)
- NIST. (2018). *Framework for Improving Critical Infrastructure Cybersecurity (NIST Cybersecurity Framework) v1.1*. National Institute of Standards and Technology. (Identify, protect, detect, respond, recover, the framework informing the Well-Architected security pillar structure.)
- Perez-Botero, D., Soriano, J., & Rana, O. F. (2013). A brief introduction to cloud computing security challenges. *2013 International Joint Conference on Awareness Science and Technology & Ubi-Media Computing (iCAST 2013 & UMEDIA 2013)*, 596–601. (Cloud security challenges; shared responsibility model and the security implications for AI inference workloads.)
