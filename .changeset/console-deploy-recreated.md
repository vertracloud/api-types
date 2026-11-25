---
"@vertracloud/api-types": patch
---

Realtime stream of an application: new console note `deploy_note:recreated:<reason>`, sent when zero-downtime deploy was on but the deploy restarted the application instead. `<reason>` is `plan_memory`, `host_memory` or `recreate_required`.
