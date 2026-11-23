---
"@vertracloud/api-types": patch
---

Document the 409 `STORAGE_ABOVE_NEW_LIMIT` of `PUT /v1/databases/:id`: lowering the RAM of a database is refused when its data takes more space than the new storage allows. `details` is the new `APIStorageAboveNewLimitDetails` (`used_mb`, `limit_mb`, `free_mb`, in MB); free `free_mb` and try again.
