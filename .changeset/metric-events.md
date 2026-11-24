---
"@vertracloud/api-types": patch
---

Metric points of applications and databases (`APIApplicationMetric`, `APIDatabaseMetrics`) have a new `events` list (`APIMetricEvent`: `at`, `kind`, `out_of_memory`) with the restarts, automatic restarts and crashes between that point and the next; empty when nothing happened. New `APIMetricEventKind`.
