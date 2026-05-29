---
title: "VPC - Virtual Private Cloud"
description: "What a VPC is, how it provides network isolation on AWS, and essential VPC design considerations for AI workloads."
date: 2026-03-28
categories: [Glossary]
tags: [VPC, networking, security, AWS, subnet]
related:
  - glossary/subnet
  - glossary/nat-gateway
  - glossary/security-pillar
---

A Virtual Private Cloud (VPC) is a logically isolated virtual network within AWS where you launch resources. It gives you full control over IP address ranges, subnets, route tables, and network gateways. Every EC2 instance, RDS database, Lambda function (when VPC-attached), and ECS task runs within a VPC.


<figure class="bz-figure">
  <img src="/img/dark-cherry/grid-foundation.png" alt="A dark industrial floor grid with precise red-lit seams: isolated sections of the same foundation, separated by invisible boundaries." loading="lazy">
  <figcaption>A VPC is your section of the cloud's grid. The physical infrastructure is shared. The network boundaries are yours. Traffic stays inside unless you explicitly open a door.</figcaption>
</figure>

## How It Works

When you create a VPC, you define a CIDR block (IP address range, e.g., 10.0.0.0/16). Within the VPC, you create subnets in specific availability zones, configure route tables to control traffic flow, and attach internet gateways or NAT gateways for external connectivity. Security groups (instance-level firewalls) and network ACLs (subnet-level firewalls) control inbound and outbound traffic.

## VPC Design for AI Workloads

**Public subnets** have a route to the internet gateway. Use them for load balancers and bastion hosts. Do not place inference endpoints or databases in public subnets.

**Private subnets** have no direct internet access. Place inference endpoints, training instances, databases, and internal services here. Use NAT gateways for outbound internet access (downloading models, calling external APIs).

**VPC endpoints** provide private connectivity to AWS services (S3, Bedrock, SageMaker, DynamoDB) without traversing the internet. This improves security and reduces data transfer costs. For AI workloads that call Bedrock or S3 frequently, VPC endpoints are essential.

## Why It Matters

VPC configuration is foundational to security and compliance. Data that stays within your VPC never traverses the public internet. VPC flow logs provide network-level audit trails. Private subnets ensure that your model inference endpoints and training data are not directly accessible from the internet.

## Practical Guidance

Use at least two availability zones for high availability. Place all data-processing and AI inference resources in private subnets. Create VPC endpoints for frequently used AWS services to reduce latency and cost. Size your CIDR blocks generously to avoid running out of IP addresses as workloads grow. For organizations with multiple accounts, use AWS Transit Gateway to connect VPCs without complex peering arrangements.

## Sources

- Rekhter, Y., Moskowitz, B., Karrenberg, D., de Groot, G. J., & Lear, E. (1996). *Address Allocation for Private Internets*. RFC 1918. IETF. (The RFC defining private IP address ranges used in VPC CIDR blocks; 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.)
- Mogul, J., & Postel, J. (1985). *Internet Standard Subnetting Procedure*. RFC 950. IETF. (Original subnet masking standard; the foundation for CIDR and VPC subnet design.)
- AWS. (2024). *Amazon VPC User Guide*. Amazon Web Services. (VPC architecture: subnets, route tables, internet gateways, security groups, NACLs, and VPC endpoints, the authoritative reference for AWS network isolation.)
