---
"@vertracloud/api-types": patch
---

Card attempt limits in the dashboard: the error codes `CARD_ATTEMPTS_LOCKED` (429, `details` is the new `APICardAttemptsLockedDetails` with `retry_after` and `scope`, typed by `CardAttemptsLockScope`) and `CAPTCHA_REQUIRED` (403), and `RESTPostAPIBillingCardSetupBody` with the optional `turnstile_token` for `POST /v1/users/me/cards/setup`. Requests made with an API key are not affected.
