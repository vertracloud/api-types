---
"@vertracloud/api-types": patch
---

Remove `APIUserInfoResponse.can_use_templates`. Every account sees templates; whether an account can use them is answered by the API itself, which refuses with `403 FORBIDDEN` while templates are rolling out to that account.
