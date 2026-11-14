---
"@vertracloud/api-types": patch
---

Removes `RESTPostAPIUserGenerateApiKeyResponse`: the `POST /v1/users/me/generate-api-key` route no longer exists. Create keys with `POST /v1/users/me/api-keys` (`RESTPostAPIUserApiKeyCreateResponse`).
