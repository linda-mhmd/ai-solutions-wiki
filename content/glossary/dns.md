---
title: "DNS - Domain Name System"
description: "The hierarchical, distributed naming system that translates human-readable domain names into IP addresses, serving as the Internet's directory service."
date: 2026-03-28
categories: [Glossary]
tags: [networking, dns, domain-names, internet, name-resolution]
last_updated: 2026-05-30
---

The Domain Name System (DNS) is a hierarchical, distributed database that translates human-readable domain names (like example.com) into numerical IP addresses (like 93.184.216.34) that computers use to route traffic. DNS is often called the phonebook of the Internet. Without it, users would need to memorize IP addresses to visit websites.

## How DNS Resolution Works

When a user types a domain name into a browser, a multi-step lookup process occurs.

**Recursive resolver** - The client sends the query to a recursive DNS resolver (typically provided by the ISP or a service like Cloudflare 1.1.1.1 or Google 8.8.8.8). The resolver checks its cache first. If the answer is cached and the TTL (Time to Live) has not expired, it returns the cached result immediately.

**Root name servers** - If the resolver has no cached answer, it queries one of the 13 root name server clusters. The root server does not know the final IP address but responds with a referral to the appropriate Top-Level Domain (TLD) server (.com, .org, .uk).

**TLD name servers** - The resolver queries the TLD server, which responds with a referral to the authoritative name server for the specific domain.

**Authoritative name server** - The resolver queries the authoritative server, which holds the actual DNS records for the domain. It returns the IP address (A record for IPv4, AAAA for IPv6), and the resolver caches the result for future queries.

## DNS Record Types

**A record** maps a domain to an IPv4 address. **AAAA record** maps to an IPv6 address. **CNAME record** creates an alias pointing one domain to another. **MX record** specifies the mail server for the domain. **TXT record** holds arbitrary text, commonly used for email authentication (SPF, DKIM, DMARC). **NS record** delegates a domain to specific name servers. **SOA record** contains administrative information about the zone.

## DNS in Practice

DNS caching at multiple levels (browser, operating system, resolver) dramatically reduces query latency. TTL values control how long records are cached. Short TTLs allow rapid changes but increase query load on authoritative servers. Long TTLs reduce load but delay propagation of changes.

**DNS-based load balancing** distributes traffic by returning different IP addresses for the same domain. Amazon Route 53 and other managed DNS services offer weighted, latency-based, and geolocation routing policies.

## Origins and History

Paul Mockapetris designed DNS and published the original specifications in RFC 882 and RFC 883 in 1983, replacing the previous system of manually maintained HOSTS.TXT files [1][2]. These were superseded by RFC 1034 and RFC 1035 in 1987, which remain the core DNS specifications [3][4]. DNSSEC (DNS Security Extensions) was later added to protect against spoofing attacks.

## Sources

1. Mockapetris, P. (1983). "Domain Names - Concepts and Facilities." RFC 882. IETF.
2. Mockapetris, P. (1983). "Domain Names - Implementation and Specification." RFC 883. IETF.
3. Mockapetris, P. (1987). "Domain Names - Concepts and Facilities." RFC 1034. IETF.
4. Mockapetris, P. (1987). "Domain Names - Implementation and Specification." RFC 1035. IETF.
