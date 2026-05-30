---
title: "NAT Gateway"
description: "What NAT gateways do, how they enable private subnet internet access, and cost considerations for AWS deployments."
date: 2026-03-28
categories: [Glossary]
tags: [NAT-gateway, VPC, networking, security, AWS]
related:
  - glossary/vpc
  - glossary/subnet
last_updated: 2026-05-30
---

A NAT (Network Address Translation) gateway enables resources in private subnets to initiate outbound connections to the internet while preventing unsolicited inbound connections from the internet. It translates private IP addresses to a public IP address for outbound traffic and routes responses back to the originating resource.

## How It Works

A NAT gateway is placed in a public subnet and assigned an Elastic IP address. The route table for private subnets is updated to direct internet-bound traffic (0.0.0.0/0) to the NAT gateway. When a resource in a private subnet makes an outbound request (downloading a model, calling an external API, pulling a container image), the traffic routes through the NAT gateway, which translates the private IP to its public IP. The response follows the reverse path.

Inbound connections from the internet cannot reach resources behind the NAT gateway - it only supports outbound-initiated connections.

## Why It Matters

Private subnets are the correct placement for most resources (databases, inference endpoints, application servers) because they are not directly reachable from the internet. However, these resources often need outbound internet access: pulling container images, downloading model weights, calling third-party APIs, or sending data to monitoring services. NAT gateways bridge this gap securely.

## Cost Considerations

NAT gateways are one of the more expensive networking components on AWS:

- Hourly charge per NAT gateway (approximately $0.045/hour per gateway, varies by region)
- Data processing charge per GB of traffic through the gateway
- One NAT gateway per AZ for high availability means multiplying costs by AZ count

For AI workloads that transfer large amounts of data (model downloads, training data), NAT gateway data processing charges can be substantial. Mitigate costs by using VPC endpoints for AWS service traffic (S3, Bedrock, ECR), which bypasses the NAT gateway entirely. Use S3 gateway endpoints (free) and interface endpoints for other services to reduce NAT gateway data transfer.

## Practical Guidance

Deploy one NAT gateway per availability zone for high availability. Use VPC endpoints for all frequently accessed AWS services to minimize NAT gateway data charges. Monitor NAT gateway costs in Cost Explorer, especially for data-intensive workloads. If outbound internet access is not required, omit the NAT gateway entirely to reduce cost and attack surface.

## Sources

- Srisuresh, P., & Holdrege, M. (1999). *IP Network Address Translator (NAT) Terminology and Considerations*. RFC 2663. IETF. (Original RFC defining NAT terminology; address translation mechanics and the distinction between inbound and outbound connection handling.)
- Rosenberg, J., & Rosen, E. (2002). Cisco Guide to Harden Cisco IOS Devices. (NAT gateway security model; why private subnets with NAT are preferred over public IP assignment for backend resources.)
- AWS. (2024). *Amazon VPC User Guide: NAT Gateway*. Amazon Web Services. (NAT gateway placement, routing table configuration, Elastic IP assignment, and cost structure on AWS.)
