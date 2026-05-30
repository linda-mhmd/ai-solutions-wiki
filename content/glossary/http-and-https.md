---
title: "HTTP and HTTPS"
description: "The foundational web protocols for transferring hypertext documents and resources, with HTTPS adding encryption via TLS for secure communication."
date: 2026-03-28
categories: [Glossary]
tags: [networking, http, https, web-protocols, tls, security]
last_updated: 2026-05-30
---

HTTP (Hypertext Transfer Protocol) is the application-layer protocol used to transfer web pages, APIs, and other resources between clients and servers. HTTPS (HTTP Secure) is HTTP with encryption provided by TLS (Transport Layer Security), protecting data in transit from eavesdropping and tampering.

## How HTTP Works

HTTP follows a request-response model. A client (typically a browser) sends an HTTP request to a server, which processes the request and returns an HTTP response.

**Request structure** includes a method (GET, POST, PUT, DELETE, PATCH), a URI identifying the resource, headers (metadata like Content-Type, Authorization, Accept), and an optional body (for POST and PUT requests).

**Response structure** includes a status code (200 OK, 301 Redirect, 404 Not Found, 500 Server Error), headers (Content-Type, Cache-Control, Set-Cookie), and a body containing the requested resource or error message.

**HTTP methods** define the intended action. GET retrieves a resource without side effects. POST submits data to create a resource. PUT replaces a resource entirely. PATCH modifies it partially. DELETE removes it. HEAD retrieves only headers without the body. OPTIONS describes the communication options available.

## HTTP Versions

**HTTP/1.0** established the basic request-response model with one request per TCP connection. **HTTP/1.1** added persistent connections (keep-alive), pipelining, chunked transfer encoding, and host headers enabling virtual hosting. **HTTP/2** introduced binary framing, multiplexing multiple requests over a single TCP connection, header compression (HPACK), and server push. **HTTP/3** replaces TCP with QUIC (a UDP-based transport), eliminating head-of-line blocking at the transport layer and improving performance on unreliable networks.

## HTTPS and TLS

HTTPS wraps HTTP communication inside a TLS-encrypted tunnel. The client and server perform a TLS handshake to establish an encrypted session before any HTTP data is exchanged. HTTPS ensures confidentiality (data cannot be read by intermediaries), integrity (data cannot be modified in transit), and authentication (the server's identity is verified via its TLS certificate).

Modern browsers mark HTTP sites as "Not Secure" and many features (geolocation, service workers, HTTP/2) require HTTPS. HTTPS is effectively mandatory for production web applications.

## Origins and History

Tim Berners-Lee and his team at CERN developed HTTP as part of the World Wide Web project beginning in 1989. HTTP/1.0 was documented in RFC 1945 in 1996 [1]. HTTP/1.1 was standardized in RFC 2068 (1997) and revised in RFC 2616 (1999) [2]. HTTP/2 was published as RFC 7540 in 2015, based on Google's SPDY protocol [3]. HTTP/3, based on QUIC, was published as RFC 9114 in 2022 [4].

## Sources

1. Berners-Lee, T., Fielding, R., & Frystyk, H. (1996). "Hypertext Transfer Protocol -- HTTP/1.0." RFC 1945. IETF.
2. Fielding, R. et al. (1999). "Hypertext Transfer Protocol -- HTTP/1.1." RFC 2616. IETF.
3. Belshe, M., Peon, R., & Thomson, M. (2015). "Hypertext Transfer Protocol Version 2 (HTTP/2)." RFC 7540. IETF.
4. Bishop, M. (2022). "HTTP/3." RFC 9114. IETF.
