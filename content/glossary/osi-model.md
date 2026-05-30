---
title: "OSI Model"
description: "The Open Systems Interconnection model, a seven-layer conceptual framework that standardizes how network communication functions are organized and interact."
date: 2026-03-28
categories: [Glossary]
tags: [networking, osi-model, protocols, network-architecture, standards]
last_updated: 2026-05-30
---

The Open Systems Interconnection (OSI) model is a conceptual framework that divides network communication into seven layers, each responsible for a specific set of functions. It provides a common vocabulary for discussing networking and a standard reference for designing protocols and troubleshooting network issues.

## The Seven Layers

**Layer 1 - Physical** defines the electrical, optical, and mechanical specifications for transmitting raw bits over a physical medium. This covers cables, connectors, voltage levels, signal timing, and wireless frequencies. Ethernet cables, fiber optic links, and Wi-Fi radio signals operate at this layer.

**Layer 2 - Data Link** provides node-to-node data transfer on the same network segment. It frames raw bits into structured frames, handles MAC (Media Access Control) addressing, and manages access to the shared medium. Ethernet switches operate here, forwarding frames based on MAC addresses. Error detection (CRC checksums) occurs at this layer.

**Layer 3 - Network** handles routing packets across different networks. IP addressing, subnet masking, and routing protocols operate here. Routers are Layer 3 devices that forward packets toward their destination based on IP addresses.

**Layer 4 - Transport** provides end-to-end communication between applications. TCP offers reliable, ordered delivery with flow control and congestion management. UDP provides faster, connectionless delivery without guarantees. Port numbers identify specific applications.

**Layer 5 - Session** manages sessions between applications, including establishing, maintaining, and terminating connections. In practice, this functionality is often absorbed into the application or transport layer.

**Layer 6 - Presentation** handles data format translation, encryption, and compression. Character encoding conversions and TLS encryption are sometimes attributed to this layer, though modern implementations typically integrate these into the application layer.

**Layer 7 - Application** is the layer closest to the end user. HTTP, SMTP, DNS, FTP, and SSH are application-layer protocols that provide services directly to user applications.

## Practical Use

In practice, the OSI model is primarily a teaching and troubleshooting tool. The real Internet follows the simpler TCP/IP four-layer model, and Layers 5 and 6 of the OSI model do not correspond to distinct protocols in common use. However, the OSI model remains valuable for structured thinking about where a network problem occurs: is it a physical cable issue (Layer 1), a switching problem (Layer 2), a routing issue (Layer 3), or an application misconfiguration (Layer 7)?

## Origins and History

The OSI model was developed by the International Organization for Standardization (ISO) and published as ISO 7498 in 1984 [1]. The model drew heavily on the work of Hubert Zimmermann, who proposed the layered architecture in a 1980 paper [2]. While the OSI protocol suite itself never achieved widespread adoption (losing to TCP/IP), the model's layered framework became the universal reference for networking education.

## Sources

1. ISO 7498 (1984). "Information processing systems - Open Systems Interconnection - Basic Reference Model." International Organization for Standardization.
2. Zimmermann, H. (1980). "OSI Reference Model - The ISO Model of Architecture for Open Systems Interconnection." *IEEE Transactions on Communications*, 28(4), 425-432.
