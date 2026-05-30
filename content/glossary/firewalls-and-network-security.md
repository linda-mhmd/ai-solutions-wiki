---
title: "Firewalls and Network Security"
description: "Network security devices and techniques that control traffic flow between networks, including packet filtering, stateful inspection, and next-generation firewall capabilities."
date: 2026-03-28
categories: [Glossary]
tags: [networking, firewalls, network-security, packet-filtering, security]
last_updated: 2026-05-30
---

A firewall is a network security device or software that monitors and controls incoming and outgoing network traffic based on a set of security rules. Firewalls establish a barrier between trusted internal networks and untrusted external networks, enforcing access policies that determine which traffic is allowed and which is blocked.

## Firewall Types

**Packet filtering firewalls** inspect individual packets and allow or deny them based on source and destination IP addresses, ports, and protocols. Rules are stateless: each packet is evaluated independently without knowledge of whether it belongs to an established connection. Simple and fast but unable to detect attacks that span multiple packets.

**Stateful inspection firewalls** track the state of network connections (TCP handshakes, established sessions) and make decisions based on the connection context, not just individual packet headers. A response packet from an external server is allowed only if it corresponds to a connection initiated from inside the network. This significantly reduces the attack surface compared to stateless packet filtering.

**Application-layer firewalls** (proxy firewalls) inspect traffic at Layer 7, understanding the content of protocols like HTTP, DNS, and FTP. They can block specific HTTP methods, filter URLs, or detect malicious payloads within application traffic.

**Next-Generation Firewalls (NGFW)** combine stateful inspection with deep packet inspection (DPI), intrusion prevention systems (IPS), application awareness, TLS inspection, and threat intelligence feeds. They identify and control traffic by application (e.g., allowing Slack but blocking file sharing) rather than just port numbers.

## Network Security Concepts

**Network segmentation** divides the network into zones with different trust levels. A DMZ (demilitarized zone) hosts public-facing servers between the external firewall and the internal network. Microsegmentation extends this concept to individual workloads or containers.

**Intrusion Detection and Prevention Systems (IDS/IPS)** monitor network traffic for malicious patterns. An IDS alerts on suspicious activity; an IPS actively blocks it. Signature-based detection matches known attack patterns, while anomaly-based detection flags deviations from normal traffic baselines.

**Security Groups** in cloud environments (AWS, Azure) act as virtual stateful firewalls attached to individual resources. They define allowed inbound and outbound traffic at the instance level. Network ACLs provide stateless filtering at the subnet level.

## Defense in Depth

Effective network security layers multiple controls: perimeter firewalls, internal segmentation, host-based firewalls, IDS/IPS, and application-layer security. No single control is sufficient. The principle of least privilege applies: rules should allow only the specific traffic required and deny everything else by default.

## Origins and History

The concept of a network firewall emerged in the late 1980s. Digital Equipment Corporation (DEC) developed the first commercial firewall, the DEC SEAL, in 1992 [1]. Bill Cheswick and Steve Bellovin documented firewall design principles in their 1994 book [2]. Stateful inspection was pioneered by Check Point Software Technologies with its FireWall-1 product in 1994 [3]. The NGFW category was defined by Gartner in 2009 to describe firewalls that combine traditional capabilities with application awareness and integrated threat prevention.

## Sources

1. Mogul, J. (1989). "Simple and Flexible Datagram Access Controls for Unix-based Gateways." *USENIX Conference Proceedings*.
2. Cheswick, W.R. & Bellovin, S.M. (1994). *Firewalls and Internet Security: Repelling the Wily Hacker*. Addison-Wesley.
3. Check Point Software Technologies (1994). FireWall-1 product documentation.
