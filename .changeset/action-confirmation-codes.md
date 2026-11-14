---
"@vertracloud/api-types": patch
---

Confirmation codes for high-impact actions in the dashboard: `APIActionCodeAction`, `APIActionCodeProvider`, `ACTION_CODE_HEADER`, `APIActionCodeRequested`, `RESTPostAPIUserActionCodeBody`/`Response` (`POST /v1/users/me/action-codes`, dashboard session only) and the error codes `ACTION_CODE_REQUIRED`, `ACTION_CODE_INVALID`, `TOO_MANY_ATTEMPTS`, `INVALID_CODE`, `EXPIRED_CODE`, `PROVIDER_ALREADY_LINKED`, `ACCOUNT_ALREADY_LINKED` and `SERVICE_UNAVAILABLE`. Requests made with an API key are not affected.
