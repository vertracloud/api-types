---
"@vertracloud/api-types": minor
---

Add the card payment contract: `OrderProvider.CARD`, `allowed_payment_methods` on order create/status, `POST /v1/orders/:orderId/pay/card` (`RESTPostAPIOrderCardPaymentBody`, `APIOrderCardPayment`, `OrderCardPaymentStatus`), billing details and saved cards (`APIBillingDetails`, `APIBillingAddress`, `APIBillingTaxId`, `BillingTaxIdType`, `APIBillingCard` and the `/v1/users/me/billing` and `/v1/users/me/cards` envelopes), and the error codes `COUPON_PAYMENT_METHOD`, `PAYMENT_METHOD_UNAVAILABLE`, `BILLING_DETAILS_INVALID`, `TAX_ID_INVALID`, `CARD_NOT_FOUND`, `CARD_NOT_ALLOWED_FOR_PLAN` and `CARD_DECLINED`. Billing, card and card payment routes are dashboard session only. Orders accept 1, 3 or 12 months; the Economy plan only 1 month and only PIX.
