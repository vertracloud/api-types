---
"@vertracloud/api-types": patch
---

Add `expires_at` to `APIOrderPixPayment` (when the Pix QR code stops being payable; a new one can be requested for the same open order) and to `APIOrderStatus` (when the unpaid order expires).
