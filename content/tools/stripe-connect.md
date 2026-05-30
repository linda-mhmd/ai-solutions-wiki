---
title: "Stripe Connect - Payment Infrastructure for Marketplaces and Platforms"
description: "Stripe Connect routes payments between buyers, sellers, and platforms: handling KYC, escrow, fee splitting, tax reporting, and dispute management so you never have to."
date: 2026-05-28
categories: [Tools]
tags: [payments, marketplace, platform, stripe, fintech, compliance, kyc]
related:
  - tools/fastapi
  - tools/railway
  - guides/from-zero-to-production
solutions:
  - guides/from-zero-to-production
last_updated: 2026-05-30
---

Stripe Connect is the payments infrastructure layer designed specifically for marketplaces and platforms, any product where money moves between more than two parties. In a standard Stripe integration, a business accepts payment from a customer. Connect adds a third party: the seller, contractor, creator, or service provider who receives a portion of that payment. Stripe handles the routing, compliance, and regulatory obligations automatically.

The core value proposition is legal and operational: to split payments between parties across jurisdictions, you need money transmission licenses, KYC compliance, tax reporting infrastructure, and dispute handling. Stripe Connect provides all of this as a managed service. Building it yourself is not a viable option for any company without a dedicated fintech compliance team.

<figure class="bz-figure">
  <img src="/img/wardrobe/junior-partner-collaboration.png" alt="Two people working closely together at a shared workspace: a senior and junior collaborator, trust and transaction between two parties." loading="lazy">
  <figcaption>Every marketplace transaction has two sides: the buyer and the seller, connected by a trusted infrastructure. Stripe Connect is that infrastructure. It handles everything that happens between them.</figcaption>
</figure>

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Buyer</span>
    <span class="bz-flow-step-name">Buyer pays</span>
    <span class="bz-flow-step-desc">Card, Apple Pay, bank transfer. full payment goes to Stripe, not directly to seller</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Process</span>
    <span class="bz-flow-step-name">Stripe processes</span>
    <span class="bz-flow-step-desc">Stripe authorises, captures, and holds funds; fraud checks run automatically</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Split</span>
    <span class="bz-flow-step-name">Platform fee deducted</span>
    <span class="bz-flow-step-desc">Your application_fee_amount is retained; remainder is scheduled for the seller</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Payout</span>
    <span class="bz-flow-step-name">Seller receives funds</span>
    <span class="bz-flow-step-desc">Stripe transfers to seller's connected account on your chosen payout schedule</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Compliance</span>
    <span class="bz-flow-step-name">Stripe reports tax</span>
    <span class="bz-flow-step-desc">1099-K (US) and equivalent EU VAT/DAC7 reporting filed by Stripe, not you</span>
  </div>
</div>

## The Three Connect Account Types

Stripe Connect offers three account models. The right choice depends on how much control you need over the seller experience versus how much onboarding friction you can tolerate.

**Standard accounts**: The seller creates their own Stripe account independently and grants your platform access. Stripe owns the relationship with the seller: Stripe's branding appears in onboarding, Stripe handles support, and the seller can use their account with multiple platforms. This is the fastest to implement and the lowest compliance burden for you, but offers the least control over the experience.

**Express accounts**: Sellers onboard through a Stripe-hosted flow that you redirect to. Your platform is clearly the operator, but Stripe still manages the underlying KYC verification. You control the payout schedule and fee structure. The Stripe Express Dashboard gives sellers visibility into their payouts without exposing your platform's internals. This is the most common choice for new marketplaces: a balance of reasonable control and managed compliance.

**Custom accounts**: You build the entire onboarding and dashboard experience. Stripe is invisible to the seller. You are responsible for collecting and submitting KYC information to Stripe via API. This gives maximum control but maximum obligation: you own the seller experience end to end, you are responsible for regulatory disclosures, and you carry more legal exposure in most jurisdictions. Custom accounts are appropriate for large platforms with dedicated product and compliance teams.

| | Standard | Express | Custom |
|---|---|---|---|
| Onboarding UI | Stripe's | Stripe-hosted (redirect) | You build it |
| KYC responsibility | Stripe | Stripe | You collect, Stripe verifies |
| Seller dashboard | Full Stripe Dashboard | Stripe Express Dashboard | You build it |
| Platform branding | Minimal | Partial | Full |
| Appropriate for | Simple integrations | Most new marketplaces | Large platforms |

## KYC: Know Your Customer

Financial regulations in every major jurisdiction require that money-transmitting services verify the identity of the people receiving funds. This is KYC (Know Your Customer), collecting and verifying legal name, date of birth, address, government ID, and (for businesses) incorporation documents and beneficial ownership information.

KYC requirements exist under US FinCEN regulations, EU Anti-Money Laundering Directives (AMLD), UK FCA requirements, and equivalent frameworks globally. They are not optional. Platforms that pay sellers without KYC are operating as unlicensed money transmitters.

With Standard and Express accounts, Stripe collects and verifies this information directly from sellers. For Custom accounts, your platform collects the data and submits it to Stripe via the Account API. Stripe then verifies it against identity databases and flags accounts that require additional documentation. Stripe maintains money transmission licenses in all required jurisdictions; when you use Stripe Connect, you operate under Stripe's licenses rather than needing your own.

Stripe's verification process is largely automated for straightforward cases and escalates to manual review for edge cases. Sellers who fail KYC are restricted from receiving payouts until they provide compliant documentation.

## Escrow and Dispute Handling

Connect supports a separation between payment capture and payout to sellers, a functional escrow pattern. By using `transfer_data` with delayed transfers, or by using `on_behalf_of` with manual payout schedules, platforms can hold funds after a buyer pays and release them only after delivery confirmation, service completion, or dispute windows close.

Disputes (chargebacks) are handled through Stripe's dispute resolution flow. When a buyer disputes a charge, Stripe notifies your platform via the `charge.dispute.created` webhook. You submit evidence through the Stripe Dashboard or API. The platform or the seller, depending on your Connect configuration, bears the dispute liability. For destination charges, the platform account typically bears the dispute cost unless you explicitly pass liability to the connected account. This is a critical architecture decision to make before going live.

Stripe's Radar fraud detection runs on all Connect payments, reducing dispute rates through ML-based fraud scoring.

## Webhook Events

These are the key webhook events for a Connect integration:

- **`payment_intent.succeeded`**: The buyer's payment was captured. Safe to trigger order fulfillment.
- **`transfer.created`**: Stripe has initiated a transfer to a connected account. Funds are in motion to the seller.
- **`transfer.reversed`**: A transfer was reversed, typically due to a dispute. Update your records.
- **`charge.dispute.created`**: A buyer has opened a dispute. You have a time-limited window to submit evidence.
- **`charge.dispute.closed`**: The dispute resolved. Either `won` (you keep the funds) or `lost` (Stripe deducted the amount and dispute fee).
- **`account.updated`**: A connected account's verification status changed. Use to gate payouts or prompt sellers to complete KYC.
- **`payout.paid`**: Funds have left Stripe and arrived in the seller's bank account.

Register Connect webhooks in the Stripe Dashboard under Webhooks, with "Listen to events on Connected accounts" enabled in addition to your platform account.

## Tax Reporting

In the United States, Stripe files Form 1099-K for sellers who exceed $600 in annual payments (the threshold introduced by the American Rescue Plan Act). For EU platforms, Stripe handles DAC7 reporting, the EU directive requiring digital platforms to report seller income to tax authorities. UK platforms are covered by equivalent HMRC reporting obligations.

Stripe collects the necessary tax information (SSN/EIN for US sellers, VAT numbers for EU sellers) during KYC onboarding. Stripe's Tax reporting feature generates and distributes 1099s to sellers electronically and files the required returns with the IRS. This is one of the most practically valuable aspects of Connect: the reporting obligation alone would require significant engineering and legal work to implement independently.

## Code Example: Creating a Payment Intent with Connect

Creating a payment that routes a platform fee and sends the remainder to a connected seller account:

```javascript
const paymentIntent = await stripe.paymentIntents.create({
  amount: 5000,               // €50.00 in cents
  currency: 'eur',
  payment_method_types: ['card'],
  application_fee_amount: 500, // €5.00 platform fee (10%)
  transfer_data: {
    destination: 'acct_seller_connected_account_id',
  },
});
```

The `application_fee_amount` is retained by your platform account. The remainder (`amount` minus `application_fee_amount` minus Stripe's processing fee) is transferred to the `destination` connected account. This is a destination charge, the most common pattern for marketplace payments.

For on-behalf-of charges (where the seller's account is the business of record for the transaction, useful for tax and statement descriptor purposes):

```javascript
const paymentIntent = await stripe.paymentIntents.create({
  amount: 5000,
  currency: 'eur',
  payment_method_types: ['card'],
  application_fee_amount: 500,
  on_behalf_of: 'acct_seller_connected_account_id',
  transfer_data: {
    destination: 'acct_seller_connected_account_id',
  },
});
```

## Pricing

Stripe Connect pricing layers on top of Stripe's standard processing fees. As of 2026:

- **Standard processing**: 2.9% + €0.30 per successful card charge (EU rates vary; UK is 1.5% + 20p for domestic cards)
- **Connect fee**: 0.25% + €0.25 per payout to connected accounts (for Express and Custom accounts)
- **Instant payouts**: Additional 1% if sellers request same-day payouts to a debit card
- **Stripe Tax** (for 1099/DAC7 filing): Priced separately per tax form filed

For high-volume platforms, Stripe offers custom pricing negotiated directly. The economics work well for platforms taking 5–20% fees from sellers; at lower platform margins, Stripe's Connect fee becomes meaningful relative to your revenue.

## The Stripe Dashboard for Marketplace Operators

The Stripe Dashboard gives platform operators a unified view of all connected accounts, their verification status, payout schedules, balance, and dispute history. You can:

- View all connected accounts and their KYC status
- Manually trigger or pause payouts
- Manage disputes across all sellers in one interface
- View transfer and fee reports by time period
- Export transaction data for reconciliation

For Express account sellers, the separate Stripe Express Dashboard (accessible via a Stripe-generated login link) gives sellers visibility into their earnings and payout history without exposing your platform's business data.

## Testing

Stripe provides a full test mode with no live money involved. Use Stripe's test card numbers:

- `4242 4242 4242 4242`, Successful payment
- `4000 0025 0000 3155`, Requires 3D Secure authentication
- `4000 0000 0000 9995`, Declined (insufficient funds)

For Connect specifically, create test connected accounts using the `create` API with `{test: true}` account capabilities. Stripe's test mode mirrors the full production API, including webhooks (sent to your registered test webhook endpoint). Use the Stripe CLI to forward test webhooks to your local development environment:

```bash
stripe listen --forward-to localhost:3000/webhooks/stripe
```

Test the full payment flow, create a PaymentIntent, confirm it, trigger a payout, then simulate a dispute using the Dashboard's dispute testing tools, before going to production.

## Stripe Connect vs. Alternatives

| | Stripe Connect | PayPal Marketplace | Adyen Marketplace |
|---|---|---|---|
| Setup complexity | Moderate | Moderate | High |
| KYC ownership | Stripe | PayPal | Shared with platform |
| Seller experience | Express Dashboard | PayPal account | Platform-built |
| Global coverage | 46+ countries | 200+ countries | 30+ countries |
| Tax reporting | Automated (1099, DAC7) | Limited | Manual |
| Pricing | Transparent, published | Published + hidden fees | Negotiated |
| Best for | Tech-first marketplaces | Consumer-facing, PayPal users | Enterprise, high volume |

PayPal Marketplace (via PayPal Commerce Platform / Braintree) has broader consumer brand recognition, which can reduce checkout friction in B2C marketplaces. Adyen Marketplace targets enterprise platforms with high transaction volumes and dedicated integrations teams. For most software-led marketplaces and platforms, Stripe Connect is the default choice: the documentation is comprehensive, the API is well-designed, and the developer tooling is best-in-class.

**Do not build split payments yourself.** The regulatory overhead alone: money transmission licensing, KYC compliance, tax reporting: requires years and millions in legal and engineering investment. Stripe Connect, PayPal, or Adyen are not optional conveniences; they are regulatory necessities.

## Sources

1. https://stripe.com/docs/connect
2. https://stripe.com/docs/connect/account-types
3. https://stripe.com/docs/connect/charges
4. https://stripe.com/docs/connect/webhooks
5. https://stripe.com/docs/connect/tax-reporting
6. https://stripe.com/pricing/connect
