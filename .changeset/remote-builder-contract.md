---
"@vertracloud/api-types": minor
---

Add `build_phase` (`CustomImageBuildPhase`: `queued`, `starting`, `building`, `verifying`) `queue_position` and `queued_at` to `APICustomImage`, plus `error_code` next to `error`, so a build waiting for a machine can be told apart from one running. `status` keeps its values.

Describe the build log stream (`GET /v1/images/:image_id/logs`) as step-based: `step` (`APICustomImageLogStep`, with `kind` `platform` or `dockerfile`), `log` (`APICustomImageLogLine`) and `end` (`APICustomImageLogEnd`) events, plus the `CustomImageLogPlatformStep` ids (`queue`, `machine`, `context`, `push`, `verify`, `done`). The log of every build stays available after it ends.

The `IMAGE_BUILDER_UNAVAILABLE` message now also covers builds that are unavailable at the moment.

Add the `IMAGE_BUILD_RATE_LIMITED` error (HTTP 429) with `APIImageBuildRateLimitedDetails` (`limit`, `window`, `scope`, `retry_at`) for image builds above the plan's daily limit or the hourly limit on one image.
