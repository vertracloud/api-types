---
"@vertracloud/api-types": patch
---

Add `runtime_update` (`APIRuntimeUpdate`) to app and database status: whether the base runtime or database engine is up to date (`available`), with `security` and `retired` flags; a newer build is applied on the next restart. Dashboard only.
