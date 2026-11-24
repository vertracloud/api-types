---
"@vertracloud/api-types": patch
---

Realtime stream of an application: new `next_logs` event with the output of the new version during a zero-downtime deploy, optional reason in `deploy_note:discarded:<release_id>:<reason>`, and notes sent again at connection start carry the time they happened.
