---
"@vertracloud/api-types": patch
---

Add the deploy settings contract. `APIApplication.deploy` (`APIApplicationDeploySettings`) returns `zero_downtime` (`ApplicationZeroDowntime`: `auto` | `on` | `off`), `zero_downtime_active`, `auto_rollback` and `health_check_path`. `PATCH /v1/apps/:id/config` accepts `deploy?: { zero_downtime?, auto_rollback?, health_check_path? }`. New error codes: `PLAN_DOES_NOT_SUPPORT_ZERO_DOWNTIME` and `PLAN_DOES_NOT_SUPPORT_AUTO_ROLLBACK` (403, returned when the plan does not include the requested option). The `system` realtime event documents the `deploy_note:failed:<release_id>` and `deploy_note:rollback:<from>:<to>` notices.
