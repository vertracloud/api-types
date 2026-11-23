---
"@vertracloud/api-types": patch
---

Document that `PATCH /v1/apps/:id/config` fails with 400 `MAIN_FILE_NOT_FOUND` when `main_file` points to a file that does not exist in the app's files, and that `POST /v1/apps/:id/files/upload` answers the same when, after the upload, the main file would not exist (neither the zip nor the app's files have it).
