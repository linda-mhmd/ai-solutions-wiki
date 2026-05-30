---
title: "Network Protocols Overview"
description: "A survey of essential network protocols beyond TCP, UDP, and HTTP, including ARP, ICMP, DHCP, FTP, SMTP, and SSH."
date: 2026-03-28
categories: [Glossary]
tags: [networking, protocols, arp, icmp, dhcp, ftp, smtp, ssh]
last_updated: 2026-05-30
---

Network protocols are standardized sets of rules that govern how devices communicate over a network. Beyond the major protocols like TCP, UDP, and HTTP, a collection of supporting protocols handles address resolution, network diagnostics, automatic configuration, file transfer, email delivery, and secure remote access.

## Address Resolution and Diagnostics

**ARP (Address Resolution Protocol)** maps IP addresses to MAC addresses on a local network. When a device needs to send a frame to another device on the same subnet, it broadcasts an ARP request asking "who has this IP address?" The target device responds with its MAC address. ARP tables cache these mappings to avoid repeated broadcasts. ARP operates at the link between Layer 2 and Layer 3 [1].

**ICMP (Internet Control Message Protocol)** carries diagnostic and error messages for IP networks. The `ping` command uses ICMP Echo Request and Echo Reply to test reachability. `traceroute` uses ICMP Time Exceeded messages (or UDP probes) to map the path packets take through the network. ICMP also reports unreachable destinations and fragmentation issues [2].

## Network Configuration

**DHCP (Dynamic Host Configuration Protocol)** automatically assigns IP addresses, subnet masks, default gateways, and DNS server addresses to devices joining a network. A four-step process (Discover, Offer, Request, Acknowledge) allows a device with no IP address to obtain one from a DHCP server. DHCP leases expire after a configurable period, and devices must renew them [3].

## File Transfer

**FTP (File Transfer Protocol)** transfers files between a client and server using separate control and data connections. The control connection (port 21) handles commands and responses; the data connection transfers file contents. FTPS adds TLS encryption. SFTP (SSH File Transfer Protocol) provides file transfer over an SSH tunnel and is generally preferred over FTP for security reasons [4].

## Email

**SMTP (Simple Mail Transfer Protocol)** handles the sending and relaying of email messages between mail servers. A sending server connects to the recipient's mail server (identified via MX DNS records) on port 25 (or 587 for submission) and transfers the message. SMTP handles delivery between servers; clients retrieve email using IMAP or POP3 protocols [5].

## Secure Remote Access

**SSH (Secure Shell)** provides encrypted remote login and command execution over an unsecured network. SSH replaced the unencrypted Telnet and rlogin protocols. It authenticates using passwords or public key cryptography and encrypts all traffic, including passwords and data. SSH also supports port forwarding (tunneling), secure file copy (SCP), and the SFTP subsystem [6].

## Origins and History

These protocols emerged at different points during the Internet's development. ARP was defined by David Plummer in RFC 826 (1982) [1]. ICMP was specified alongside IP in RFC 792 (1981) [2]. DHCP evolved from BOOTP and was standardized in RFC 2131 (1997) [3]. FTP dates to RFC 114 (1971), making it one of the oldest Internet protocols [4]. SMTP was defined by Jon Postel in RFC 821 (1982) [5]. SSH was developed by Tatu Ylonen in 1995 and standardized in RFC 4251 (2006) [6].

## Sources

1. Plummer, D. (1982). "An Ethernet Address Resolution Protocol." RFC 826. IETF.
2. Postel, J. (1981). "Internet Control Message Protocol." RFC 792. IETF.
3. Droms, R. (1997). "Dynamic Host Configuration Protocol." RFC 2131. IETF.
4. Postel, J. & Reynolds, J. (1985). "File Transfer Protocol (FTP)." RFC 959. IETF.
5. Postel, J. (1982). "Simple Mail Transfer Protocol." RFC 821. IETF.
6. Ylonen, T. & Lonvick, C. (2006). "The Secure Shell (SSH) Protocol Architecture." RFC 4251. IETF.
