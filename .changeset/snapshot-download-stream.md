---
"@vertracloud/api-types": patch
---

`GET /v1/users/:id/snapshots/:snapshot_id/download` always answers `200` with the zip, whatever its size: remove the `redirect` query field and the `APISnapshotDownloadURL` / `RESTGetAPISnapshotDownloadURLResponse` types added in 0.6.3, which no longer have a route behind them. `DOWNLOAD_TOO_LARGE` stays.
