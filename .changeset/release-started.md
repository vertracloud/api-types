---
"@vertracloud/api-types": patch
---

Add `first_started_at` to `APIApplicationRelease`: when the application first started with the release's code, or `null` while the code is in the application folder but the application has not been restarted with it yet.
