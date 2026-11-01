---
"@vertracloud/api-types": minor
---

Add the new plan grid: plan families and sizes, the single `PlanName` type (and constant) for plan names, billing periods of 1, 3, 6 and 12 months, the public plans listing (`GET /v1/plans`), the order quote (`POST /v1/orders/quote`) and the `PLAN_NOT_FOR_SALE` error. `ApplicationCluster` and `DatabaseCluster` are now `1 | 2`.

**Breaking:** `UserPlanName` (type and constant) is replaced by `PlanName`, which lists only the current plans; the previous plan names (`economy`, `pro`, `scale`, `intermediary`, `enterprise-4` to `enterprise-30`) are no longer part of the type. The `USA_3` cluster constant is removed.
