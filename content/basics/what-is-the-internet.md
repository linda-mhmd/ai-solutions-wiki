---
title: "What is the Internet?"
description: "The internet is a global network of computers that have agreed to speak the same language. Here is how it actually works."
date: 2026-05-24
level: 0
categories: [Basics]
tags: [beginner, internet, networking, http]
youtube_id: "Dxcc6ycZ73M"
youtube_title: "How Does the Internet Work?"
youtube_channel: "Code.org"
docs: "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work"
docs_label: "How does the Internet work?, MDN"
faqs:
  - question: "What is the difference between the internet and the web?"
    answer: "The internet is the physical infrastructure, cables, routers, servers, that connects computers worldwide. The World Wide Web is one service that runs on top of the internet, using HTTP to link documents and pages. Email, video calls, SSH, and file transfers also run over the internet but are not 'the web'. The web is what you access with a browser. The internet is the network underneath everything."
  - question: "Why is HTTPS more secure than HTTP?"
    answer: "HTTPS uses TLS (Transport Layer Security) to encrypt the connection between your browser and the server. Without it, anyone on the same network, a coffee shop Wi-Fi, your ISP, could read the data in transit. HTTPS means: the site is who it claims to be (certificate verification) and the data cannot be read by anyone intercepting the connection. All sites handling passwords, payments, or personal data must use HTTPS."
  - question: "What happens when I type a URL into my browser?"
    answer: "1. Your browser asks a DNS resolver to look up the IP address for the domain. 2. The resolver checks caches and queries root/authoritative DNS servers if needed. 3. Your browser connects to that IP address using TCP, then sends an HTTP request. 4. The server processes the request and sends back an HTTP response containing the HTML. 5. Your browser parses the HTML, fetches linked CSS and JavaScript, and renders the page."
---

{{< quickanswer >}}
The internet is billions of computers connected to each other through physical cables, fibre, and wireless links. They communicate by following shared rules called protocols. When you visit a website, your computer sends a request across this network and receives a response, usually in under a second.
{{< /quickanswer >}}

## It is a physical thing

The internet often gets described as a "cloud" or something abstract. It is not. It is an enormous physical infrastructure:

- **Undersea cables** running along ocean floors connect continents. You can see them all at [submarinecablemap.com](https://www.submarinecablemap.com/). There are hundreds of them carrying virtually all international internet traffic.
- **Data centres**, buildings full of servers, store most of the world's websites and data. A single large data centre can contain hundreds of thousands of servers.
- **Your router at home** connects your devices to your internet provider's network, which connects to larger networks, which eventually reach those data centres.

When you load a video from another country, data is physically travelling through cables, including along the ocean floor, and reaching you in under 100 milliseconds.

## The internet vs the web

These two terms are not interchangeable.

**The internet** is the global network: the physical cables, routers, and protocols that allow computers to communicate. It is infrastructure.

**The web** (World Wide Web) is one service that runs on top of the internet. It is the system of linked pages you access with a browser, built on HTTP. Tim Berners-Lee proposed it in 1989 and made it publicly available in 1991.

Email, video calls (Zoom, FaceTime), file transfers (FTP), and SSH connections also run over the internet, but they are not "the web". The web is the specifically browser-based part.

## How computers find each other: IP addresses and DNS

Every device on the internet has a numerical address called an **IP address**. IPv4 addresses look like `142.250.74.46`. IPv6 addresses (the newer standard) are longer. These numbers identify where on the network a device is located.

You do not type IP addresses. You type domain names like `google.com`. This works because of **DNS (Domain Name System)**, a distributed global database that maps human-readable names to IP addresses. [More: How DNS works, Cloudflare](https://www.cloudflare.com/learning/dns/what-is-dns/)

When you type `github.com`:
1. Your browser checks its local DNS cache
2. If not found, asks your router, which asks your ISP's DNS server
3. If still not found, the query reaches an authoritative DNS server for `.com` domains
4. The final answer, an IP address like `140.82.114.3`, travels back to your browser

The whole process takes milliseconds. There is even a [comic explaining how DNS works](https://howdns.works/) if you want to go deeper.

<div class="bz-diagram">
<div class="bz-diagram-label">DNS resolution: how a domain name becomes an IP address</div>
<div class="bz-diagram-body">
<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">You type</span>
    <span class="bz-flow-step-name">github.com</span>
    <span class="bz-flow-step-desc">Human-readable domain name</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Browser cache</span>
    <span class="bz-flow-step-name">Known IP?</span>
    <span class="bz-flow-step-desc">If visited recently, answer is cached locally</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">ISP DNS</span>
    <span class="bz-flow-step-name">Recursive resolver</span>
    <span class="bz-flow-step-desc">Asks root → .com → github.com authoritative servers</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Answer</span>
    <span class="bz-flow-step-name">140.82.114.3</span>
    <span class="bz-flow-step-desc">IP address returned; browser connects here via TCP</span>
  </div>
</div>
</div>
</div>

## How data travels: packets

Data sent over the internet does not travel as one continuous stream. It is broken into small chunks called **packets**, typically a few kilobytes each. Each packet travels independently through the network and is reassembled at the destination.

This is why:
- Videos buffer when packets are delayed or lost
- Your download can use multiple paths simultaneously for speed
- A single cable failing does not bring down the internet (packets reroute)

The rules for how packets are addressed and routed are defined by **TCP/IP**, the foundational protocol suite of the internet. TCP guarantees that packets are reassembled in order and re-requested if lost. UDP, the other main protocol in the suite, skips that guarantee for speed and is used in video calls and online games where a dropped frame is better than a delayed one. [More: TCP/IP, Wikipedia](https://en.wikipedia.org/wiki/Internet_protocol_suite)

## HTTP and HTTPS: the language of the web

When your browser talks to a web server, they use **HTTP** (HyperText Transfer Protocol). HTTP defines how requests are structured and how responses are returned. [More: HTTP, MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)

A basic HTTP exchange looks like:

```
Request:  GET /index.html HTTP/1.1
          Host: example.com

Response: HTTP/1.1 200 OK
          Content-Type: text/html
          [the HTML of the page]
```

**HTTPS** is HTTP with TLS encryption. The `S` stands for Secure. The data is encrypted end-to-end, the server's identity is verified via a certificate, and no one in the middle can read or alter it. Any site handling logins, payments, or personal data must use HTTPS. Browsers now flag HTTP-only sites as "Not Secure".

HTTP status codes tell you what happened: `200 OK` (success), `404 Not Found`, `500 Internal Server Error`, `301 Moved Permanently`. You will see these when building apps or debugging.

## What a website actually is

A website is a collection of files stored on a server:
- **HTML**, the structure and content
- **CSS**, the visual design and layout
- **JavaScript**, the interactive behaviour

When you visit a URL, your browser sends an HTTP request to the server hosting those files. The server sends them back. Your browser parses them and renders the page you see. A single page load can involve dozens of individual requests, for the HTML, then each image, stylesheet, and script.

## How this shapes everything you build

Every web application you build or describe to an AI tool operates on these same fundamentals. When you hear:

- **"Make an API call"**, send an HTTP request to a server and handle its response
- **"Deploy to the cloud"**, put your code on a server with an internet-facing IP address
- **"CORS error"**, a browser security rule blocking cross-origin HTTP requests
- **"SSL certificate"**, the certificate that enables HTTPS

These all make more sense knowing the underlying model: computers sending structured messages to each other over a global physical network.

## Further reading

- [How does the Internet work?, MDN](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work), clear technical overview
- [How DNS works, interactive comic](https://howdns.works/), genuinely fun explanation of DNS resolution
- [Cloudflare Learning Center](https://www.cloudflare.com/learning/), free articles on networking, security, and web performance
- [Submarine Cable Map](https://www.submarinecablemap.com/), visualise the physical cables that carry the internet
- [HTTP, MDN reference](https://developer.mozilla.org/en-US/docs/Web/HTTP), everything about HTTP requests, responses, and status codes
- [Networks, Crash Course Computer Science](https://www.youtube.com/playlist?list=PL8dPuuaLjXtNlUrzyH5r6jN9ulIgZBpdo), episodes 28–30 cover networking clearly

## What's next

Next: [What is Code?](/basics/what-is-code/), the instructions that tell computers what to do.
