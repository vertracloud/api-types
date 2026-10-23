---
"@vertracloud/api-types": patch
---

`APIDatabase` gains `username`: the user to connect with. Databases created from v26.4.8 on use `vertracloud` (default database `vertracloud`, no superuser); older databases keep the engine's user (`postgres`, `default` or `root`).
