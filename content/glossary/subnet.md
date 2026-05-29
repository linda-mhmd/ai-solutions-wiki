---
title: "Subnet"
description: "What subnets are, how they segment VPC networks, and best practices for subnet architecture on AWS."
date: 2026-03-28
categories: [Glossary]
tags: [subnet, VPC, networking, security, AWS]
related:
  - glossary/vpc
  - glossary/nat-gateway
  - glossary/security-pillar
---

A subnet is a subdivision of a VPC's IP address range, placed in a specific availability zone. Subnets segment your network into logical sections with different access controls and routing rules. Each resource launched in a VPC (EC2 instance, RDS instance, ECS task, Lambda function) is placed in a specific subnet.


<figure class="bz-figure">
  <img src="/img/dark-cherry/grid-foundation.png" alt="A dark floor grid with red seam lines dividing it into distinct zones: each segment bounded, addressable, and isolated from adjacent sections." loading="lazy">
  <figcaption>A subnet is a zone within the grid. It has its own address range. Traffic routes differently depending on whether it is public-facing or private. The division is administrative, not physical.</figcaption>
</figure>

## How It Works

Each subnet is associated with a route table that determines where network traffic is directed. A subnet is considered "public" if its route table includes a route to an internet gateway (allowing direct internet access) and "private" if it does not.

Resources in the same subnet can communicate freely. Communication between subnets is controlled by network ACLs (stateless packet filters at the subnet boundary) and security groups (stateful firewalls at the resource level).

## Subnet Architecture Best Practices

**Multi-AZ design** - create subnets in at least two availability zones. If one AZ experiences an outage, resources in the other AZ continue operating. This is the minimum for production workloads.

**Public/private separation** - use public subnets only for resources that must be internet-accessible (load balancers, NAT gateways). Place everything else (application servers, databases, inference endpoints) in private subnets.

**Tiered architecture** - many organizations use three tiers: public subnets (load balancers), private application subnets (compute), and private data subnets (databases). Each tier has its own network ACL rules, limiting blast radius if one tier is compromised.

**CIDR sizing** - allocate subnet CIDR blocks large enough for growth. A /24 subnet provides 251 usable IPs; a /20 provides over 4,000. Running out of IPs in a subnet requires creating a new subnet, which is disruptive.

## Why It Matters

Subnet design directly affects security posture, availability, and operational flexibility. Poor subnet architecture (everything in public subnets, single AZ, undersized CIDR blocks) creates security vulnerabilities, single points of failure, and scaling constraints that are expensive to remediate later. Getting subnet design right from the start is one of the highest-leverage infrastructure decisions.

## Sources

- Fuller, V., & Li, T. (2006). *Classless Inter-Domain Routing (CIDR): The Internet Address Assignment and Aggregation Plan*. RFC 4632. IETF. (CIDR notation and subnet mask calculation; the standard defining how IP address ranges are divided into subnets.)
- Droms, R. (1997). *Dynamic Host Configuration Protocol*. RFC 2131. IETF. (DHCP address allocation within subnets; the mechanism by which AWS assigns private IP addresses to resources in subnets.)
- AWS. (2024). *Amazon VPC User Guide: Subnets*. Amazon Web Services. (AWS subnet types, public, private, and isolated; route table configuration; availability zone placement and multi-AZ design.)
