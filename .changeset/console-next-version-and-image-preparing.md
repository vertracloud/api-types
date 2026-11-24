---
"@vertracloud/api-types": patch
---

Realtime stream of an application: new `next_metrics` event with the live reading of the new version during a zero-downtime deploy, same format as `metrics`. Custom images: new build phase `preparing`, while the platform gets the source of a build before it enters the queue. `POST /v1/images/:image_id/rebuild` now answers right away with the image in `building`/`preparing`; a problem with the source (`FETCH_ZIP_ERROR`, `INSTALLATION_NOT_FOUND`, `IMAGE_CONTEXT_TOO_LARGE`, `DOCKERFILE_REFUSED`) is no longer an error of the call and ends the build as `failed` with that `error_code`.
