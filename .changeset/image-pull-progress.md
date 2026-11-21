---
"@vertracloud/api-types": patch
---

Add `APIImagePullProgress` (`runtime`, `version`, `percent`, `done_bytes`, `total_bytes`) and the optional `image_pull` field on the app and database status (single and bulk), plus the optional `installing` flag on the database status. Dashboard only: the base image download progress is not part of the documented API, and it never exposes the internal image name.
