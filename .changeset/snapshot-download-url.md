---
"@vertracloud/api-types": patch
---

`GET /v1/users/:id/snapshots/:snapshot_id/download` now redirects (`302`) snapshots larger than 100 MB to a short-lived link that serves the zip, so snapshots of any size can be downloaded; smaller ones are still served directly, and clients that follow redirects receive the file in both cases. Add `redirect` to `RESTGetAPISnapshotDownloadQuery` (`false` returns the link as JSON) and the `APISnapshotDownloadURL` / `RESTGetAPISnapshotDownloadURLResponse` types.

Add the `DOWNLOAD_TOO_LARGE` error code (413): the application or database is too large to download as a zip on the spot; download a snapshot instead.
