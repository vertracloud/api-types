---
"@vertracloud/api-types": patch
---

Add `POST /v1/images/:image_id/rebuild`: builds a custom image again without a new upload, from the stored build context or, for an image linked to GitHub, from the tip of the linked branch. In the `images:write` scope.

Add the `FETCH_ZIP_ERROR` error code, already returned by the routes that build from a GitHub repository.
