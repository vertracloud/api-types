---
"@vertracloud/api-types": patch
---

Add the release rollback contract: `GET /v1/apps/:id/releases/:release_id/rollback` previews a rollback (`APIApplicationRollbackPreview`, with the environment variable names that would change), and `POST` on the same route restores the release as a new release with `source: "rollback"` (optional `restore_environment`). Adds `ApplicationEnvironmentChange`, the `RELEASE_EXPIRED`, `RELEASE_ALREADY_ACTIVE` and `PLAN_DOES_NOT_SUPPORT_ROLLBACK` error codes, and API key scopes: the preview needs `apps:envs`, the rollback needs `apps:write` (plus `apps:envs` when `restore_environment` is `true`).
