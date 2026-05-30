---
title: "Load Balancer"
description: "What load balancers do, the types available on AWS, and how to choose the right one for your workload."
date: 2026-03-28
categories: [Glossary]
tags: [load-balancer, high-availability, scaling, networking, AWS]
related:
  - glossary/auto-scaling
  - glossary/api-gateway
  - glossary/vpc
last_updated: 2026-05-30
---

A load balancer distributes incoming network traffic across multiple backend targets (EC2 instances, containers, Lambda functions, IP addresses) to ensure no single target is overwhelmed. Load balancers improve availability (traffic is routed away from unhealthy targets), scalability (new targets can be added transparently), and performance (requests go to the least-loaded target).

## AWS Load Balancer Types

**Application Load Balancer (ALB)** operates at Layer 7 (HTTP/HTTPS). It supports content-based routing (route by URL path, hostname, headers, or query parameters), WebSocket connections, and HTTP/2. ALB is the right choice for most web applications and API workloads, including AI inference endpoints fronted by containers.

**Network Load Balancer (NLB)** operates at Layer 4 (TCP/UDP). It handles millions of requests per second with ultra-low latency. Use NLB for non-HTTP protocols, extreme throughput requirements, or when you need static IP addresses (for allowlisting by clients).

**Gateway Load Balancer (GWLB)** routes traffic through third-party virtual appliances (firewalls, intrusion detection) transparently. Used for network security architectures, not typical application workloads.

## Why It Matters

Load balancers are the standard mechanism for achieving high availability and horizontal scalability. Without a load balancer, a single server failure takes down your service. With one, unhealthy targets are automatically removed from the pool, and traffic is distributed to remaining healthy targets.

For AI workloads, ALB fronts inference endpoints running on ECS Fargate or EKS, distributing requests across multiple model instances. Health checks verify that inference containers are responsive. Target group weight shifting enables canary deployments of new model versions.

## Practical Guidance

Use ALB for HTTP/HTTPS workloads (the vast majority of cases). Use NLB only when you need Layer 4 features, static IPs, or extreme performance. Configure health checks that actually test your application's readiness (not just TCP connectivity) with appropriate intervals and thresholds. Enable access logging for debugging and cross-zone load balancing for even distribution across availability zones.

## Sources

- Alizadeh, M., Greenberg, A., Maltz, D. A., Padhye, J., Patel, P., Poutievski, L., ... & Wetherall, D. (2010). Data center TCP (DCTCP). *Proceedings of ACM SIGCOMM*, 63–74. (Load balancing at data center scale; incast, buffer pressure, and the network-level challenges that application load balancers must handle.)
- Patel, P., Bansal, D., Yuan, L., Murthy, A., Greenberg, A., Maltz, D. A., ... & Karri, N. (2013). Ananta: Cloud scale load balancing. *Proceedings of ACM SIGCOMM*, 207–218. (Architecture of a production cloud load balancer; direct server return, consistent hashing, and Layer 4/7 processing at scale.)
- AWS. (2024). *AWS Elastic Load Balancing User Guide*. Amazon Web Services. (ALB, NLB, and GWLB feature comparison; target groups, health checks, and routing rules.)
