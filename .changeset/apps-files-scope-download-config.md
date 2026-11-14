---
"@vertracloud/api-types": patch
---

API key scopes: `GET /v1/apps/:id/download` moves from `apps:read` to `apps:files`, and `PATCH /v1/apps/:id/config` also requires `apps:files` when it changes `start_command`, `build_command` or `main_file`.
