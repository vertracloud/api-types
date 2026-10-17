---
"@vertracloud/api-types": patch
---

Add the `building` application status and the `APP_BUILDING` / `BUILD_INTERRUPTED` error codes. `POST /v1/apps` now answers `202` with the application in `building` instead of waiting for the build; `removed_directories` is no longer part of that response. Applications now expose `last_build_error` (`ApplicationBuildError | null`), the code of the last failed build or install.
