---
title: "Client-Server Architecture"
description: "A distributed architecture where clients send requests to centralized servers that provide services and resources."
date: 2026-03-28
categories: [Glossary]
tags: [client-server, architecture-patterns, distributed-systems, networking]
last_updated: 2026-05-30
---

Client-server architecture is a distributed computing model in which client devices send requests to a centralized server that processes the requests and returns responses. The server provides services, resources, or data; the client consumes them. This separation of roles is the foundational paradigm for networked computing.

## Origins and History

The client-server model emerged in the late 1960s and 1970s with the development of time-sharing systems and computer networking. The ARPANET, operational from 1969, was built on the concept of resource-sharing between hosts. The terms "client" and "server" were formalized in early networking RFCs and became standard terminology with the growth of local area networks in the 1980s. The model gained enterprise prominence in the late 1980s and 1990s as organizations moved from mainframe-terminal architectures to PC-based clients communicating with database servers over LANs. Two-tier client-server (fat client with direct database connection) evolved into three-tier architecture (client, application server, database server) to improve scalability and maintainability. The World Wide Web (Tim Berners-Lee, 1990) is the most pervasive implementation of client-server architecture, with web browsers as clients and HTTP servers providing content.

## How It Works

A **client** initiates communication by sending a request to a server. Clients can be thick (significant local processing, e.g., desktop applications) or thin (minimal local processing, e.g., web browsers). A **server** listens for incoming requests, processes them (querying databases, executing business logic, accessing files), and returns responses. Servers are typically shared resources serving multiple concurrent clients. Communication follows defined protocols: HTTP/HTTPS for web traffic, SMTP for email, DNS for name resolution, and SQL-based protocols for database access. Servers can also act as clients to other servers, creating multi-tier architectures.

## Practical Applications

Client-server architecture underpins web applications, email systems, database applications, file sharing, online gaming, and virtually all internet services. Modern variations include RESTful API services, GraphQL endpoints, and WebSocket-based real-time communication. While peer-to-peer and serverless architectures address specific use cases, the client-server model remains the dominant paradigm for networked application design.

## Sources

1. Berners-Lee, T. (1990). "Information Management: A Proposal." CERN.
2. Orfali, R., Harkey, D., and Edwards, J. (1999). *Client/Server Survival Guide*, 3rd ed. Wiley.
3. Tanenbaum, A.S. and Van Steen, M. (2017). *Distributed Systems: Principles and Paradigms*, 3rd ed. Pearson.
