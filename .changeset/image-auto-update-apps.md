---
"@vertracloud/api-types": patch
---

Add `auto_update_apps` to `APICustomImage` and to the body of `PATCH /v1/images/:image_id` (`RESTPatchAPICustomImageBody`). When `true`, every successful build of the image restarts its running apps on the new version; images created from a GitHub repository start with `true`, the others with `false`.

Add `warnings` (`DockerfileIssue[]`) to `APICustomImage`, with the warnings of the `Dockerfile` check of the latest build, and clarify that `DockerfileIssueCode.WORKDIR_APP` applies to the final stage only.
