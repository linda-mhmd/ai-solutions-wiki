---
title: "IP Addressing and Subnetting"
description: "The system of numerical addresses used to identify devices on IP networks, including IPv4, IPv6, CIDR notation, and subnet design for efficient network segmentation."
date: 2026-03-28
categories: [Glossary]
tags: [networking, ip-addressing, subnetting, ipv4, ipv6, cidr]
last_updated: 2026-05-30
---

IP addressing assigns a unique numerical identifier to every device on an IP network. Subnetting divides a large network into smaller, more manageable segments. Together, they form the addressing foundation that enables routing across the Internet and within private networks.

## IPv4 Addressing

IPv4 addresses are 32 bits long, written as four decimal octets separated by dots (e.g., 192.168.1.10). This provides approximately 4.3 billion unique addresses. Each address has two parts: the network portion (identifying the network) and the host portion (identifying the specific device on that network). The subnet mask determines where the boundary falls.

**Private address ranges** are reserved for internal networks and are not routable on the public Internet: 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16. Network Address Translation (NAT) allows multiple devices with private addresses to share a single public IP address.

## Subnetting and CIDR

**Classful addressing** originally divided IPv4 into Class A (/8), Class B (/16), and Class C (/24) networks. This was wasteful: a Class B network allocated 65,534 host addresses even if only a few hundred were needed.

**CIDR (Classless Inter-Domain Routing)** replaced classful addressing in 1993, allowing subnet masks of any length. A /26 network provides 62 usable host addresses, a /28 provides 14. CIDR notation appends the prefix length to the address (e.g., 10.0.1.0/24).

**Subnetting** divides a larger network into smaller subnets by borrowing bits from the host portion. A /24 network (256 addresses) can be split into two /25 subnets (128 addresses each), four /26 subnets (64 each), and so on. Each subnet has a network address (first address), a broadcast address (last address), and usable host addresses in between.

## IPv6 Addressing

IPv6 uses 128-bit addresses, written as eight groups of four hexadecimal digits separated by colons (e.g., 2001:0db8:85a3:0000:0000:8a2e:0370:7334). Leading zeros within a group can be omitted, and consecutive groups of all zeros can be replaced with :: once per address.

IPv6 provides approximately 3.4 x 10^38 addresses, eliminating the address exhaustion problem. IPv6 removes the need for NAT, supports built-in autoconfiguration (SLAAC), and simplifies header processing for routers.

## Practical Design

Network architects design subnet schemes to match organizational requirements: separate subnets for different departments, server tiers, or security zones. VPCs in cloud environments (AWS, Azure) use CIDR blocks to define network boundaries, with subnets allocated across availability zones.

## Origins and History

IPv4 was specified by Jon Postel in RFC 791 (1981) [1]. CIDR was introduced in RFC 1519 (1993) to slow IPv4 address exhaustion [2]. IPv6 was specified in RFC 2460 (1998) by Steve Deering and Bob Hinden to provide a long-term addressing solution [3].

## Sources

1. Postel, J. (1981). "Internet Protocol." RFC 791. IETF.
2. Fuller, V., Li, T., Yu, J., & Varadhan, K. (1993). "Classless Inter-Domain Routing (CIDR): an Address Assignment and Aggregation Strategy." RFC 1519. IETF.
3. Deering, S. & Hinden, R. (1998). "Internet Protocol, Version 6 (IPv6) Specification." RFC 2460. IETF.
