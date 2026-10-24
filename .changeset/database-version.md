---
"@vertracloud/api-types": patch
---

Database engine versions: `APIDatabase` gains `version` (the engine major line), `RESTPostAPIDatabaseCreateBody` gains the optional `version`, and `GET /databases/versions` is typed by `RESTGetAPIDatabaseVersionsResponse` (`APIDatabaseVersions`, `APIDatabaseVersionCatalog`). New error codes `INVALID_DATABASE_VERSION` and `SNAPSHOT_VERSION_NEWER`.
