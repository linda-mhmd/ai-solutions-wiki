---
title: "Binary and Number Systems in Computing"
description: "How computers represent all data in base-2 (binary), why transistors make this fundamental, and how number systems connect to AI model quantization."
date: 2026-03-26
categories: [Glossary]
tags: ["cs-fundamentals", "beginner", "binary", "bits", "number-systems", "computer-science", "fundamentals"]
related:
  - glossary/floating-point
  - glossary/hardware-constraints
  - glossary/time-complexity
last_updated: 2026-05-30
---

Every computer, from a microcontroller to a GPU cluster, operates on a single primitive: a switch that is either on or off. This physical reality - the transistor - is why all computing is built on binary, the base-2 number system.

## Why Binary

A transistor is a semiconductor device that reliably represents two states: conducting current (1) or not (0). Billions of these switches, toggling billions of times per second, execute every computation. Designing hardware around more than two states would introduce unreliability: distinguishing ten voltage levels (as base-10 would require) is far harder than distinguishing two.

Binary (base-2) uses only the digits 0 and 1. Each binary digit is a bit. Eight bits form a byte. A single byte can represent 256 distinct values (2^8). A 32-bit integer can represent over 4 billion values (2^32).

## Hexadecimal for Human Readability

Binary is unwieldy for humans. A 32-bit memory address written in binary is 32 characters long. Hexadecimal (base-16) compresses this: each hex digit represents exactly 4 binary digits, so a 32-bit address becomes 8 hex characters.

Hexadecimal uses digits 0-9 and letters A-F (A=10, B=11, C=12, D=13, E=14, F=15). The binary sequence `1111 1010 1100 0011` becomes `FAC3` in hex. Programmers encounter hex in memory addresses, color codes (#FF5733), and cryptographic hashes.

## Text as Numbers: ASCII and Unicode

Computers cannot natively store the letter "A" - they store numbers. ASCII (American Standard Code for Information Interchange) is a mapping: "A" = 65, "B" = 66, space = 32. ASCII uses 7 bits and covers 128 characters, sufficient for English text.

Unicode extends this to cover every writing system. UTF-8, the dominant web encoding, uses variable-length encoding: common characters take 1 byte (backward-compatible with ASCII), while characters from other scripts take 2-4 bytes. Python 3 strings are Unicode by default.

## Connection to AI: Floating-Point and Quantization

Model weights - the numbers that encode what a neural network has learned - are stored as floating-point values in binary. The IEEE 754 standard defines how floating-point numbers are represented:

- **FP32 (single precision)**: 32 bits per weight. The current standard for training.
- **FP16 (half precision)**: 16 bits per weight. Half the memory, some precision loss.
- **INT8 (8-bit integer)**: 8 bits per weight. Dramatically reduced memory, faster inference on compatible hardware.

A 7-billion-parameter model stored in FP32 requires approximately 28 GB of memory (7B x 4 bytes). The same model in INT8 requires 7 GB. This is what model quantization does: it converts weights from higher-precision floating-point to lower-precision integer representation, trading a small amount of accuracy for significant reductions in memory use and inference latency.

This is why the choice of number representation is not academic for AI practitioners. Running a model locally on a consumer GPU (which might have 8-16 GB VRAM) often requires quantized models. Bedrock handles this automatically; self-hosted models on SageMaker require explicit decisions about precision.

## Practical Implications

Understanding binary representation helps when:
- Reading model size estimates (parameters x bytes per parameter)
- Choosing quantization levels for self-hosted inference
- Interpreting memory errors and overflow conditions
- Understanding why ML frameworks have explicit dtype parameters (torch.float32, torch.float16, torch.bfloat16)

The number system is the foundation. Everything above it - from sorting algorithms to neural networks - ultimately reduces to switching transistors between on and off.

## Sources

- Hennessy, J. L., and Patterson, D. A. *Computer Organization and Design: ARM Edition* (6th ed., 2020). Morgan Kaufmann.
- IEEE. *IEEE 754-2019: Standard for Floating-Point Arithmetic*. https://standards.ieee.org/ieee/754/6210/
