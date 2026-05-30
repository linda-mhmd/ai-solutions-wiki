---
title: "Number Systems and Encoding"
description: "Binary, hexadecimal, and character encoding systems (ASCII, Unicode) that underpin how computers represent data."
date: 2026-03-28
categories: [Glossary]
tags: [number-systems, binary, hexadecimal, ASCII, Unicode, encoding]
last_updated: 2026-05-30
---

Number systems and encoding schemes define how computers represent numeric values and text characters internally. Understanding these representations is fundamental to computing, from low-level hardware design to high-level application development.

## Origins and History

Binary (base-2) number systems have been explored mathematically since Leibniz's 1703 paper "Explication de l'Arithmetique Binaire." Binary became the practical basis of computing because electronic circuits naturally represent two states (on/off, high/low voltage). Hexadecimal (base-16) notation emerged as a compact representation of binary values, with each hex digit corresponding to exactly four binary digits. For character encoding, the American Standard Code for Information Interchange (ASCII) was published as ANSI X3.4 in 1963, defining 128 characters (95 printable) using 7-bit codes. ASCII was developed by a committee chaired by Robert W. Bemer at IBM. As computing globalized, ASCII's limitation to English characters became problematic. The Unicode Consortium, founded in 1991 by Joe Becker, Lee Collins, and Mark Davis, developed the Unicode standard to provide a unique code point for every character in every writing system. Unicode 1.0 (1991) defined about 7,000 characters; the current standard includes over 150,000 characters covering 161 scripts.

## Core Concepts

**Binary (base-2)** uses digits 0 and 1. An 8-bit byte represents values 0-255. Signed integers use two's complement representation. **Hexadecimal (base-16)** uses digits 0-9 and A-F, where each hex digit maps to 4 bits (a nibble). Memory addresses, color codes, and binary data are commonly displayed in hex. **Octal (base-8)** uses digits 0-7 and appears in Unix file permissions. **ASCII** maps characters to 7-bit values (A=65, a=97, 0=48). **Unicode** assigns code points (U+0000 to U+10FFFF) to characters. **UTF-8** is a variable-length encoding (1-4 bytes) that is backward-compatible with ASCII and has become the dominant encoding on the web. **UTF-16** uses 2 or 4 bytes and is used internally by Java and Windows.

## Practical Applications

Number systems are essential for memory addressing, bitwise operations, network protocols, and hardware interfaces. Character encoding is critical for internationalization (i18n), data interchange between systems, file storage, and web content delivery. Encoding mismatches are a common source of bugs when text appears garbled.

## Sources

1. American National Standards Institute (1963). "American Standard Code for Information Interchange." ANSI X3.4-1963.
2. The Unicode Consortium (2023). *The Unicode Standard, Version 15.1*. [https://www.unicode.org/versions/latest/](https://www.unicode.org/versions/latest/)
3. Petzold, C. (2000). *Code: The Hidden Language of Computer Hardware and Software*. Microsoft Press.
