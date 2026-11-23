---
"@vertracloud/api-types": patch
---

Document two new console notes of `GET /v1/apps/:id/realtime`: `runtime_note:line_changed:<language>:<from>:<to>:<reason>` (the application started on a different runtime version line; `reason` is `retired`, `unavailable` or `requested`) and the `install_note:timeout:<seconds>` parameter (`900` = one install step exceeded its limit, `1500` = the install phase exceeded its total time).

The `reason` `requested` of that note also covers the version you follow (such as the recommended one) moving to a new line, without an explicit request.
