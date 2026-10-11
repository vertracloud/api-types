---
"@vertracloud/api-types": patch
---

Add the release history contract: `APIApplicationRelease`, `APIApplicationReleaseLog`, `ApplicationReleaseSource` and `ApplicationReleaseStatus`, `GET /v1/apps/:id/releases` and `GET /v1/apps/:id/releases/:release_id/log` (API keys with `apps:read`), an optional `message` on the file upload, and the `RELEASE_NOT_FOUND` error code.
