---
"@vertracloud/api-types": patch
---

Add the `PATH_IS_FILE` error code: writing or creating a folder whose path goes through an existing file returns 409 instead of a server error.
