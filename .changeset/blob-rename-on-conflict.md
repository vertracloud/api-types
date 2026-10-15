---
"@vertracloud/api-types": patch
---

Add `rename_on_conflict` to blob uploads: a taken path is saved as `name-1.ext`, `name-2.ext`, … instead of failing.
