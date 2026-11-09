---
"@vertracloud/api-types": patch
---

Referral program contract. Orders: `APIOrderQuote` gains `referral_discount`, `referral_balance_applied` and `discount_source`; `APIOrderCreateResponse` gains `referral_balance_amount`; `APIOrderDiscount` gains `source`; the order and quote bodies gain `use_referral_balance` (dashboard session only; ignored with an API key); new `OrderDiscountSource`. New dashboard-session-only `/v1/referrals*` payloads and REST types, and the `REFERRAL_*` error codes. `ReferralStatus` is `attributed | qualified | no_reward` (referred accounts stay anonymous: no reason is ever exposed); `ReferralLedgerKind` uses `adjustment` for manual adjustments.
