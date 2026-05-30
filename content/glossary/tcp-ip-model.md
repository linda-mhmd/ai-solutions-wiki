---
title: "TCP/IP Model"
description: "The four-layer Internet protocol suite that defines how data is transmitted across networks, forming the architectural foundation of the modern Internet."
date: 2026-03-28
categories: [Glossary]
tags: [networking, tcp-ip, protocols, internet, network-architecture]
last_updated: 2026-05-30
---

The TCP/IP model (also called the Internet protocol suite) is a four-layer framework that defines how data is packaged, addressed, transmitted, and received across interconnected networks. Unlike the OSI model, which is a theoretical reference framework, TCP/IP is the actual protocol architecture that powers the Internet.

## The Four Layers

**Link Layer** (also called Network Access or Network Interface) handles the physical transmission of data on a local network segment. It encompasses both the physical media and the data link framing. Ethernet, Wi-Fi (802.11), and PPP operate at this layer. The link layer takes IP packets and encapsulates them in frames with hardware (MAC) addresses for local delivery.

**Internet Layer** provides logical addressing and routing across network boundaries. The Internet Protocol (IP) is the core protocol at this layer. IPv4 uses 32-bit addresses; IPv6 uses 128-bit addresses. ICMP (used by ping and traceroute) and routing protocols like OSPF and BGP also operate here. The internet layer is responsible for getting packets from source to destination across multiple networks.

**Transport Layer** provides end-to-end communication between applications running on different hosts. TCP (Transmission Control Protocol) provides reliable, ordered, connection-oriented delivery with flow control and congestion avoidance. UDP (User Datagram Protocol) provides simple, connectionless delivery without reliability guarantees but with lower overhead. Port numbers at this layer multiplex traffic to specific applications.

**Application Layer** combines the functions of the OSI model's session, presentation, and application layers into a single layer. HTTP, HTTPS, DNS, SMTP, FTP, SSH, TLS, and DHCP all operate here. Applications interact with the transport layer through sockets.

## TCP/IP vs. OSI

The OSI model has seven layers; TCP/IP has four. The key differences are that TCP/IP merges OSI Layers 5, 6, and 7 into a single application layer, and merges OSI Layers 1 and 2 into a single link layer. TCP/IP was designed pragmatically around working protocols rather than as an abstract reference model. The Internet was built on TCP/IP, not on the OSI protocol suite.

## Encapsulation

As data moves down through the layers, each layer adds its own header (and sometimes trailer) information. Application data becomes a TCP segment, which becomes an IP packet, which becomes an Ethernet frame. At the receiving end, each layer strips its header and passes the payload up to the next layer. This process is called encapsulation and decapsulation.

## Origins and History

Vint Cerf and Bob Kahn published the foundational design for TCP/IP in 1974, describing a protocol for packet network intercommunication [1]. The original monolithic protocol was later split into TCP and IP as separate layers. The ARPANET transitioned to TCP/IP on January 1, 1983 (known as "flag day"), establishing it as the standard Internet protocol suite [2].

## Sources

1. Cerf, V.G. & Kahn, R.E. (1974). "A Protocol for Packet Network Intercommunication." *IEEE Transactions on Communications*, 22(5), 637-648.
2. Leiner, B.M., Cerf, V.G., Clark, D.D., et al. (1997). "Brief History of the Internet." Internet Society. [https://www.internetsociety.org/internet/history-internet/brief-history-internet/](https://www.internetsociety.org/internet/history-internet/brief-history-internet/)
