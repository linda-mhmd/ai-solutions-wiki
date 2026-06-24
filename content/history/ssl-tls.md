---
title: "SSL and TLS: Encrypting the Web"
description: "SSL and its successor TLS encrypt traffic between browsers and servers, providing the confidentiality and authentication that make HTTPS and modern online trust possible."
date: 2026-06-23
categories: [History]
tags: [security, cryptography, https, tls, ssl, networking, web]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/http-html
  - history/mosaic-netscape
  - history/arpanet
faqs:
  - question: "What is the difference between SSL and TLS?"
    answer: "SSL came first, designed at Netscape in the mid-1990s. TLS is its successor, standardized by the IETF starting in 1999. They serve the same goal: encrypting and authenticating web traffic. People often say SSL when they mean TLS. All modern systems use TLS, and every SSL version is now considered insecure and disabled."
  - question: "Is SSL still used today?"
    answer: "Not in any safe form. SSL 2.0 and SSL 3.0 are both broken and turned off in current browsers and servers. The protocol that protects your HTTPS connections is TLS, usually version 1.2 or 1.3. The phrase 'SSL certificate' survives as a habit, but the technology underneath is TLS."
  - question: "Why does the padlock in my browser matter?"
    answer: "The padlock means your browser opened a TLS connection. That gives you two guarantees: nobody can read the data in transit, and the server proved its identity with a certificate. Without it, anyone on the network path could read or alter the page, including passwords and payment details."
---

SSL, the Secure Sockets Layer, was the first widely used protocol for encrypting traffic between a web browser and a server. Netscape designed it in 1994 to make online commerce safe, and its successor, TLS, still protects nearly every web request you make today. Without it, the modern web of logins, payments, and private messages could not exist.

<figure class="bz-figure"><img src="/img/enterprise-dark/cubes-modular-dark-notext.png" alt="Dark modular cubes with a red corner glow, stacked as building blocks. SSL and TLS add a security layer that slots beneath the web like one of these blocks." loading="lazy"><figcaption>SSL and TLS act as a security layer that slots beneath the web, wrapping every connection in encryption.</figcaption></figure>

## What it was

SSL sits between the network and the application. When a browser asks for a page, SSL wraps that conversation so outsiders cannot read or change it. It does two jobs. First, confidentiality: it scrambles the data so only the two endpoints can read it. Second, authentication: it lets the server prove who it is using a digital certificate signed by a trusted authority.

Think of sending a letter through the post. A normal web request is a postcard. Anyone who handles it can read every word. SSL puts the letter inside a sealed, tamper-proof envelope, and it also checks the recipient's ID before handing the envelope over. You know the letter reached the right person and that nobody read it on the way.

The clever part is the handshake. Public-key cryptography is slow but lets two strangers agree on a shared secret without ever sending it openly. Symmetric encryption is fast but needs a shared key first. SSL uses the slow method to set up the fast one, then encrypts the real traffic with the fast key.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Hello</span><span class="bz-flow-step-desc">Browser and server announce versions and supported ciphers.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Certificate</span><span class="bz-flow-step-desc">Server sends its certificate. The browser checks the signature against a trusted authority.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Key exchange</span><span class="bz-flow-step-desc">Both sides agree on a shared session key using public-key cryptography.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Encrypted data</span><span class="bz-flow-step-desc">All further traffic uses fast symmetric encryption with that key.</span></div>
</div>

Taher Elgamal led the cryptography work at Netscape and is often called a father of SSL. SSL 1.0 never shipped because of security flaws. SSL 2.0 was released in 1995, and SSL 3.0, a near-complete redesign, was finalized in November 1996.

## Why it mattered

Before SSL, the web had no safe way to send a credit card number. The data crossed the internet in plain text, readable at every hop. That made real online business risky and slow to adopt.

SSL changed the equation. It gave merchants a way to take payments and gave shoppers a visible signal of safety, the padlock icon, that they could learn to trust. The protocol arrived alongside the Netscape browser boom, so it spread fast. Online commerce became plausible at scale.

SSL also introduced the certificate authority model that still underpins web trust. A small set of trusted organizations vouch for the identity of servers by signing their certificates. Your browser ships with a list of those authorities. This chain of trust, designed in the 1990s, remains the foundation of HTTPS.

## How it connects to AI today

Every modern AI system you touch runs on the direct descendant of SSL. When your code calls an AI model over an API, that request travels over HTTPS, which means it runs inside a TLS session. TLS is the successor to SSL, standardized by the IETF in 1999 with TLS 1.0, then improved through TLS 1.2 in 2008 and TLS 1.3 in 2018.

A builder meets TLS constantly. Calling a language model endpoint over `https://` means the prompt, the response, and your API key all travel encrypted. The certificate check confirms you are talking to the real provider and not an attacker impersonating it. Without that authentication, anyone on the network could intercept your prompts or steal your key.

TLS protects the whole AI supply chain. Training data downloaded from object storage, model weights pulled from a registry, embeddings written to a vector database, and tokens streamed back from inference all move over TLS connections. TLS 1.3 added faster handshakes and removed weak options, which matters when an agent makes thousands of API calls in a loop.

The trust model carries into AI security too. Mutual TLS, where both client and server present certificates, secures service-to-service traffic inside the data centers that run large models. The certificate authority idea from 1996 now governs how microservices in an AI platform prove their identity to each other.

## Still in use today

This entry is a milestone. SSL itself is dead, but its core ideas are very much alive in TLS.

Every SSL version is now banned. SSL 2.0 and SSL 3.0 both contain serious flaws. The 2014 POODLE attack broke SSL 3.0, and browsers and servers disabled it soon after. No safe system should accept any SSL version.

TLS replaced it and is active and heavily maintained. TLS 1.2 and TLS 1.3 carry the modern web. Older TLS 1.0 and 1.1 were deprecated by the IETF in 2021 and are now switched off in major browsers. The language survives in confusing ways. People still say "SSL certificate" and call libraries "OpenSSL," but the protocol on the wire is TLS.

The model persists because the problem never went away. Any two parties communicating over an untrusted network need confidentiality and authentication. That was true for a 1996 web store and it is true for a 2026 AI agent. The names change, the cryptography hardens, but the layer SSL pioneered is now permanent infrastructure.

## Further reading

- [IT History Timeline](/explore/it-timeline/): see where SSL and TLS sit among the milestones of computing.
- [AI Learning Galaxy](/explore/galaxy/): explore how networking and security connect to modern AI topics.
- [HTTP and HTML](/history/http-html/): the web protocol that TLS wraps to create HTTPS.
- [Mosaic and Netscape](/history/mosaic-netscape/): the browser boom that made SSL spread across the web.
- [The TLS 1.3 specification (RFC 8446)](https://datatracker.ietf.org/doc/html/rfc8446): the current standard, published by the IETF in 2018.
- [Transport Layer Security on Wikipedia](https://en.wikipedia.org/wiki/Transport_Layer_Security): a broad overview of SSL and TLS history, versions, and attacks.
- [Mozilla guidance on TLS configuration](https://wiki.mozilla.org/Security/Server_Side_TLS): practical advice on which protocol versions and ciphers to enable today.
