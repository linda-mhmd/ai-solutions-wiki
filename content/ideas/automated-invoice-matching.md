---
title: "AI Spark: Automated Three-Way Invoice Matching"
description: "Use AI to match invoices against purchase orders and receiving reports, automating the most tedious step in accounts payable."
date: 2026-03-28
categories: [Ideas]
tags: [accounts-payable, invoice-matching, finance, automation]
last_updated: 2026-05-30
---

Three-way matching - comparing an invoice against its purchase order and goods receipt - is the cornerstone of accounts payable controls. It is also mind-numbingly repetitive. An AP clerk compares line items, quantities, and prices across three documents dozens of times per day.

## The Problem

Invoices rarely match purchase orders exactly. Quantity variances from partial shipments, price adjustments from negotiations, and line item description differences all require human judgment to determine whether a mismatch is a genuine discrepancy or an expected variation. Traditional automation handles exact matches but fails on the 30-40% of invoices that require interpretation.

## The AI Approach

An LLM can compare line items across invoice, PO, and receipt documents using semantic understanding rather than exact matching. It recognizes that "Widget A - Blue, 24-pack" on the invoice matches "Widget A (Blue) x24" on the PO, and that a 2% price variance on a specific vendor is within the agreed tolerance.

## Three-Step Build

**Step 1 - Document extraction.** Extract structured line items from all three documents. Use OCR for paper documents and API integration for electronic formats.

**Step 2 - Intelligent matching.** Send line items from all three documents to an LLM. The model matches corresponding items across documents, identifies variances, and classifies each variance as within tolerance or requiring review.

**Step 3 - Exception routing.** Auto-approve matched invoices. Route exceptions to AP staff with a clear explanation of each discrepancy and the relevant source data side by side.

## Where It Breaks

Complex POs with hundreds of line items and partial shipments across multiple invoices create matching complexity that may exceed context windows. Credit notes, returns, and retroactive price adjustments add scenarios the basic matching logic does not cover.

## The Production Path

Start with your highest-volume, simplest invoice type to build confidence. Define tolerance rules per vendor and commodity type. Measure straight-through processing rates and exception resolution times. Target 70% straight-through processing in the first quarter.
