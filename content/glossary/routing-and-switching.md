---
title: "Routing and Switching"
description: "The fundamental network operations of forwarding data at Layer 2 (switching via MAC addresses) and Layer 3 (routing via IP addresses) to deliver packets to their destinations."
date: 2026-03-28
categories: [Glossary]
tags: [networking, routing, switching, routers, network-infrastructure]
last_updated: 2026-05-30
---

Routing and switching are the two core operations that move data through networks. Switching operates at Layer 2 (Data Link), forwarding frames based on MAC addresses within a local network segment. Routing operates at Layer 3 (Network), forwarding packets based on IP addresses across different networks. Together, they form the packet delivery infrastructure of all modern networks.

## Switching

A network switch connects devices on the same local area network (LAN). When a device sends a frame, the switch reads the destination MAC address and forwards the frame only to the port where that device is connected, rather than flooding it to all ports.

**MAC address learning** happens automatically. The switch maintains a MAC address table (also called a CAM table) that maps MAC addresses to physical ports. When a frame arrives, the switch records the source MAC address and the port it arrived on. Over time, the table is populated with all connected devices.

**VLANs (Virtual LANs)** logically segment a physical switch into multiple broadcast domains. Devices on different VLANs cannot communicate without a router, even if they share the same physical switch. VLANs improve security and reduce broadcast traffic.

**Spanning Tree Protocol (STP)** prevents loops in networks with redundant switch connections. Without STP, frames could circulate indefinitely. STP selects a root bridge and disables redundant paths, activating them only if the primary path fails.

## Routing

A router connects different networks and forwards packets based on their destination IP address. The router consults its routing table to determine the best next hop for each packet.

**Static routes** are manually configured by administrators. They are simple and predictable but do not adapt to network changes.

**Dynamic routing protocols** allow routers to discover paths automatically and adapt to topology changes. Interior Gateway Protocols (IGPs) route within an autonomous system: OSPF (Open Shortest Path First) uses link-state information to calculate shortest paths, while EIGRP uses a distance-vector approach. The Border Gateway Protocol (BGP) routes between autonomous systems and is the protocol that holds the Internet together.

**Routing decisions** consider metrics such as hop count, bandwidth, latency, and administrative cost. When multiple paths exist, the router selects the path with the best metric.

## Layer 3 Switching

Modern enterprise networks use Layer 3 switches that combine switching and routing in a single device. They forward traffic at wire speed using hardware-based routing tables (ASICs), handling inter-VLAN routing without a separate router.

## Origins and History

Ethernet switching evolved from early hubs and bridges. Kalpana introduced the first commercial Ethernet switch in 1990 [1]. Routing protocols emerged alongside the ARPANET: the first routing protocol was the Routing Information Protocol (RIP), based on the Bellman-Ford algorithm, used in the ARPANET in the early 1980s [2]. OSPF was standardized in RFC 1247 (1991) [3], and BGP-4 in RFC 1771 (1995) [4].

## Sources

1. Kalpana, Inc. (1990). EtherSwitch product documentation.
2. Hedrick, C. (1988). "Routing Information Protocol." RFC 1058. IETF.
3. Moy, J. (1991). "OSPF Version 2." RFC 1247. IETF.
4. Rekhter, Y. & Li, T. (1995). "A Border Gateway Protocol 4 (BGP-4)." RFC 1771. IETF.
