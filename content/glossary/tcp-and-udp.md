---
title: "TCP and UDP"
description: "The two primary transport-layer protocols of the Internet: TCP provides reliable, ordered delivery while UDP provides fast, connectionless transmission."
date: 2026-03-28
categories: [Glossary]
tags: [networking, tcp, udp, transport-protocols, internet]
last_updated: 2026-05-30
---

TCP (Transmission Control Protocol) and UDP (User Datagram Protocol) are the two primary transport-layer protocols in the Internet protocol suite. They sit between the application layer and the network layer (IP), providing the mechanisms by which application data is delivered between hosts. TCP guarantees reliable, ordered delivery; UDP provides minimal overhead without reliability guarantees.

## TCP - Transmission Control Protocol

TCP is a connection-oriented protocol. Before data transfer, a three-way handshake establishes a connection: the client sends SYN, the server responds with SYN-ACK, and the client completes with ACK. Data then flows bidirectionally over this connection, and a four-way handshake (FIN/ACK sequences) terminates it.

**Reliability** is achieved through sequence numbers and acknowledgments. Each byte of data is assigned a sequence number. The receiver acknowledges received data, and the sender retransmits anything not acknowledged within a timeout period.

**Ordered delivery** ensures that data arrives at the application in the same order it was sent, even if packets arrive out of order at the network layer. The receiver buffers out-of-order segments and delivers them sequentially.

**Flow control** uses a sliding window mechanism. The receiver advertises how much buffer space it has available, preventing a fast sender from overwhelming a slow receiver.

**Congestion control** algorithms (slow start, congestion avoidance, fast retransmit, fast recovery) detect and respond to network congestion, reducing the sending rate when packet loss indicates the network is overloaded.

TCP is used by HTTP/1.1, HTTP/2, SMTP, FTP, SSH, and most protocols that require reliable data delivery.

## UDP - User Datagram Protocol

UDP is a connectionless protocol with minimal overhead. It adds only a source port, destination port, length, and optional checksum to each datagram. There is no handshake, no sequence numbers, no acknowledgments, no retransmission, and no congestion control.

**Speed** is UDP's primary advantage. Without the overhead of connection setup, ordering, and reliability, UDP has lower latency and higher throughput for applications that can tolerate some data loss.

**Common uses** include DNS queries (small, single-exchange lookups), video and audio streaming (where a dropped frame is preferable to delayed playback), online gaming (where stale state updates are useless), and VoIP. QUIC (the transport protocol underlying HTTP/3) builds reliability on top of UDP rather than using TCP.

## Choosing Between TCP and UDP

Use TCP when data must arrive completely and in order: web pages, file transfers, database queries, email. Use UDP when low latency matters more than perfect delivery: real-time media, game state updates, IoT telemetry. When you need reliability over UDP, implement it at the application layer (as QUIC does).

## Origins and History

Vint Cerf and Bob Kahn described the original combined TCP in RFC 675 (1974) [1]. The protocol was later split into TCP (RFC 793, 1981) and IP (RFC 791, 1981) [2]. Jon Postel specified UDP in RFC 768 (1980) as a simpler alternative for applications that did not need TCP's reliability [3].

## Sources

1. Cerf, V.G., Dalal, Y.K., & Sunshine, C.A. (1974). "Specification of Internet Transmission Control Program." RFC 675. IETF.
2. Postel, J. (1981). "Transmission Control Protocol." RFC 793. IETF.
3. Postel, J. (1980). "User Datagram Protocol." RFC 768. IETF.
