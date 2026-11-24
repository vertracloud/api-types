---
"@vertracloud/api-types": patch
---

Realtime stream of an application: new `metrics` event (`APIApplicationLiveMetrics`) with the live CPU, memory and network reading about every 5 seconds, sent when the connection is opened with `metrics=true`.
