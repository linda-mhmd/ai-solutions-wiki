---
title: "Number Systems: Binary, Decimal, and Hexadecimal Explained"
description: "A plain-English guide to how computers count using binary, decimal, and hexadecimal, and how numbers turn letters into text."
date: 2026-06-23
level: 1
categories: [Basics]
tags: ["beginner","binary","number-systems","hexadecimal","bits-and-bytes","ascii","unicode"]
docs: "https://home.unicode.org/"
docs_label: "The Unicode Consortium"
faqs:
  - question: "Why do computers use binary instead of the decimal numbers we use every day?"
    answer: "A computer is built from electronic switches, and each switch has two stable states: on or off. Binary uses only two digits, 0 and 1, so it maps perfectly onto those two states. Decimal would need ten distinct states per position, which is harder and less reliable to build in hardware."
  - question: "What is the difference between a bit and a byte?"
    answer: "A bit is a single binary digit, one 0 or one 1. A byte is a group of 8 bits. Eight bits can represent 256 different values, from 0 to 255, which is enough to store one character of basic text or one small number."
  - question: "Why is hexadecimal used so often in computing?"
    answer: "Hexadecimal is base 16, and 16 is a power of 2. Each hex digit stands for exactly 4 bits, so one byte fits neatly into two hex digits. This makes long strings of 0s and 1s much shorter and easier to read for programmers."
  - question: "Why does 0.1 plus 0.2 not equal exactly 0.3 on a computer?"
    answer: "Computers store decimal fractions in binary using a format called IEEE 754 floating point. Numbers like 0.1 and 0.2 cannot be written exactly in binary, the same way 1/3 cannot be written exactly in decimal. The tiny rounding errors add up, so the result is very close to 0.3 but not exact."
---

{{< quickanswer >}}
A number system is a way of writing numbers using a fixed set of digits. People count in decimal (base 10) because we have ten fingers. Computers count in binary (base 2) because every part of a computer is an electronic switch that is either on or off, which you can write as 1 or 0. Hexadecimal (base 16) is a shorthand that packs long strings of 0s and 1s into a shorter form that is easier to read. The same 0s and 1s also store text, by giving every letter and symbol a number.
{{< /quickanswer >}}

<figure class="bz-figure">
  <img src="/img/dark-cherry/data-projection.png" alt="A dark cylinder projecting rows of small red dots into the air. No em-dashes." loading="lazy">
  <figcaption>Each glowing dot is either lit or dark, the same two-state pattern that gives binary its 0s and 1s.</figcaption>
</figure>

Every number you see on a screen lives inside the computer as a pattern of 0s and 1s. This page shows you how that works. You will learn what a "base" is, why computers prefer binary, how hexadecimal makes binary readable, and how the same digits turn letters into text.

## One number, three ways to write it

The number thirteen is a good example to follow. It looks different in each number system, but it always means the same quantity. Here is how it travels from the decimal you know to the binary a computer stores, and then to hexadecimal shorthand.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Base 10</span>
    <span class="bz-flow-step-name">13</span>
    <span class="bz-flow-step-desc">The decimal form you use every day. One ten plus three ones.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Base 2</span>
    <span class="bz-flow-step-name">1101</span>
    <span class="bz-flow-step-desc">The binary form. One eight, one four, no two, one one. 8 + 4 + 1 = 13.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Base 16</span>
    <span class="bz-flow-step-name">0xD</span>
    <span class="bz-flow-step-desc">The hexadecimal form. One hex digit, D, stands for the four bits 1101.</span>
  </div>
</div>

The prefix `0x` is a label that tells you the number is written in hexadecimal. Without it, you might read `D` as a letter instead of a value.

## The finger analogy

You count in tens without thinking about it. The reason is physical: you have ten fingers. When you run out of fingers, you start a new group of ten. That is why the number after nine rolls over to "10", which means "one group of ten, and zero left over".

A computer has no fingers. It has switches. Each switch is either on or off, with nothing in between. So a computer counts in twos. When it runs out, it starts a new group of two. Both systems work the same way. They differ only in how many digits they use before they roll over.

## What a number system is

A number system, also called a base, is a way of writing numbers using a fixed set of digits. The base tells you two things: how many different digits you can use, and how much each position is worth.

In any base, the value of a digit depends on its position. The rightmost position is worth one. Each position to the left is worth the base times the position to its right. This is called place value.

## Decimal: base 10

Decimal uses ten digits: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9. Each position is worth ten times the one to its right. The positions, from the right, are worth 1, 10, 100, 1000, and so on.

Take the number 13. The rightmost digit, 3, sits in the ones place, so it is worth 3. The next digit, 1, sits in the tens place, so it is worth 10. Add them: 10 + 3 = 13. You do this in your head automatically. Seeing the steps written out helps you read other bases the same way.

## Binary: base 2, and why computers use it

Binary uses only two digits: 0 and 1. A single binary digit is called a bit. Each position is worth two times the one to its right. The positions, from the right, are worth 1, 2, 4, 8, 16, 32, and so on. Every position is a power of two.

Computers use binary because digital circuits have two stable states. A switch is on or off. A wire carries voltage or it does not. You write the "on" state as 1 and the "off" state as 0. Two states are easy to build, easy to detect, and resistant to error. Ten states would be far harder to make reliable.

Read the binary number 1101 from the right:

- The first 1 sits in the ones place: worth 1.
- The 0 sits in the twos place: worth 0.
- The next 1 sits in the fours place: worth 4.
- The last 1 sits in the eights place: worth 8.

Add the values: 8 + 4 + 0 + 1 = 13. So binary 1101 equals decimal 13.

## Bits and bytes

A bit is the smallest unit of data: one 0 or one 1. On its own, a bit holds very little. Computers group bits together to store useful values.

Eight bits make one byte. A byte can hold 256 different patterns, from 00000000 to 11111111, which represent the values 0 through 255. One byte is enough to store a single character of basic text or a small whole number. Larger numbers and richer text use several bytes together.

You see bytes everywhere. File sizes, memory, and network speeds are all measured in bytes and their multiples, such as kilobytes and megabytes.

## Hexadecimal: base 16 as binary shorthand

Binary is reliable for machines but exhausting for people to read. A single byte is eight digits long, and real data runs to thousands of bits. Hexadecimal solves this.

Hexadecimal uses sixteen digits. The first ten are the familiar 0 through 9. The next six are the letters A, B, C, D, E, and F, which stand for the values 10, 11, 12, 13, 14, and 15. So A means ten, and F means fifteen.

Hexadecimal is useful because 16 is a power of 2. Each hex digit maps to exactly four bits. That means one byte, eight bits, fits into two hex digits. The four bits 1101 equal decimal 13, and in hex that is the single digit D. So decimal 13 is written `0xD` in hexadecimal.

You will meet hexadecimal in colour codes for the web, such as `#E0314B` for a shade of red, and in memory addresses that programmers read while debugging.

## How text becomes numbers

A computer stores only numbers, so text needs a code. The code assigns a number to every letter, digit, and symbol. When you type a letter, the computer stores its number. When it shows the letter, it looks the number up.

The first widely used standard for this was ASCII, the American Standard Code for Information Interchange, first published as ASA X3.4-1963. ASCII defines 128 code points: 95 printable characters such as letters and punctuation, and 33 control characters that do things like start a new line. In ASCII, the capital letter A is the number 65, and a space is the number 32.

ASCII covers English well, but 128 codes cannot hold every alphabet, accent, and symbol used around the world. Unicode fixes this. Unicode is a universal character encoding standard maintained by the Unicode Consortium. It gives a unique number to characters from nearly every writing system, plus symbols and emoji. Modern software uses Unicode so that text in any language displays correctly.

## How fractions are stored

Whole numbers map cleanly onto binary. Fractions such as 0.1 or 3.75 are harder. Computers store them using IEEE 754, the IEEE Standard for Floating-Point Arithmetic, whose current edition is IEEE 754-2019. Floating point stores a number in three parts: a sign, a set of significant digits, and a power that says where the point goes. This lets one fixed-size value represent very large and very small numbers.

The trade-off is precision. Some decimal fractions cannot be written exactly in binary, the same way one third cannot be written exactly in decimal. The decimals 0.1 and 0.2 are two of them. When a computer adds them, it adds their nearest binary approximations, and the result is 0.30000000000000004, not exactly 0.3. The error is tiny, but it is real. This is why financial software often stores money as whole cents rather than as decimal fractions.

## A short history note

Binary is older than the computer. In 1703, the mathematician Gottfried Wilhelm Leibniz described binary arithmetic using only 0 and 1, in a paper titled "Explication de l'Arithmetique Binaire" (printed in 1705). He worked out how to add, subtract, and multiply with two digits long before any machine could use the idea. Centuries later, electronic switches made his two-digit system the natural language of every computer.

## Comparing the number systems

| | Decimal | Binary | Hexadecimal | Octal |
|---|---|---|---|---|
| **Base** | 10 | 2 | 16 | 8 |
| **Digits used** | 0-9 | 0 and 1 | 0-9 then A-F | 0-7 |
| **Used by** | People | Computers | Programmers | Older systems |
| **The number 13** | 13 | 1101 | 0xD | 015 |

## What's next

- [What is a Data Structure?](/basics/what-is-a-data-structure/): see how computers organise these numbers into lists, tables, and trees.
- [What is a Computer?](/basics/what-is-a-computer/): understand the switches and circuits that make binary possible.

## Further reading

- [The Unicode Consortium](https://home.unicode.org/): the organisation that maintains the universal standard for encoding text in every language.
- [ASCII](https://en.wikipedia.org/wiki/ASCII): the history and full table of the original 128-character code for English text.
- [IEEE 754 floating-point standard](https://en.wikipedia.org/wiki/IEEE_754): how computers store and calculate with decimal fractions, and why rounding happens.
- [What is a Computer?](/basics/what-is-a-computer/): the hardware foundation that turns on-and-off switches into binary numbers.
- [What is Coding?](/basics/what-is-coding/): how programmers write instructions that work with these numbers and values.
- [What is a Data Structure?](/basics/what-is-a-data-structure/): the next step, organising stored numbers into useful shapes.
