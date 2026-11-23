---
"@vertracloud/api-types": patch
---

Add `IMAGE_VOLUME_REFUSED`, `IMAGE_LABEL_REFUSED` and `IMAGE_PULL_FAILED` to `ApplicationBuildError`: an app created from a Docker image that the platform refuses now reports the reason in `last_build_error` instead of a generic `BUILD_FAILED`.
