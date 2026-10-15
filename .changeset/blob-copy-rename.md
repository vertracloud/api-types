---
"@vertracloud/api-types": patch
---

Add `rename_on_conflict` to blob copy: a taken path (including the source's own) is saved as `name-1.ext`, `name-2.ext`, … instead of failing.
