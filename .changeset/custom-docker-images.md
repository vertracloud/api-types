---
"@vertracloud/api-types": patch
---

Add custom Docker images. New types `APICustomImage`, `APICustomImageApp`, `APICustomImageVersion`, `APIDockerfileCheck` and `DockerfileIssue`, the enums `CustomImageStatus`, `CustomImageBuildSource`, `CustomImageOwner` and `DockerfileIssueCode`, and `APIApplication.custom_image` (`null` for a regular app). New routes `GET` and `POST /v1/images`, `GET`, `PUT`, `PATCH` and `DELETE /v1/images/:image_id`, `GET /v1/images/:image_id/versions`, `/logs` and `/context`, `PUT` and `DELETE /v1/images/:image_id/github`, `POST /v1/images/check` and `POST /v1/apps/image`, with their `RESTGet`/`RESTPost`/`RESTPut`/`RESTDeleteAPICustomImage*` and `RESTPostAPIApplicationImage*` types; every image route accepts an optional `workspace_id` (`RESTAPICustomImageWorkspaceQuery`). New error codes `IMAGE_NOT_FOUND`, `MAX_IMAGES_REACHED`, `PLAN_DOES_NOT_SUPPORT_CUSTOM_IMAGES`, `IMAGE_BUILD_IN_PROGRESS`, `IMAGE_NOT_READY`, `DOCKERFILE_NOT_FOUND`, `DOCKERFILE_REFUSED`, `IMAGE_NAME_MISMATCH`, `IMAGE_VERSION_NOT_FOUND`, `IMAGE_BUILDER_UNAVAILABLE`, `IMAGE_CONTEXT_TOO_LARGE`, `IMAGE_TOO_LARGE`, `IMAGE_LABEL_REFUSED`, `IMAGE_VOLUME_REFUSED` and `IMAGE_APP_PORT_REQUIRED`, the `DockerfileIssueCode` value `volume_refused`, the `images:read` and `images:write` API key scopes, and `WorkspaceResourceType` gains `"image"`.

The activity target type `ActivityTargetType` gains `"image"` (activities of custom images).

An upload to an application on a custom image is a commit that rebuilds the image: `APIApplicationFileUpload` gains the optional `image_build` (`APIApplicationImageBuild`, `{ image_id, build_id }`) and `message`. `RESTPostAPISnapshotRestoreBody.restore_image_version` and the `warning` (`APISnapshotImageWarning`, `"IMAGE_VERSION_NOT_FOUND"`) of `APISnapshotRestoreResponse` and of `RESTPostAPIApplicationCreateResponse` cover snapshots of image apps, and the error codes `IMAGE_APP_FIELD_NOT_APPLICABLE` and `IMAGE_APP_CODE_NOT_APPLICABLE` are new.

The `details` of the `DOCKERFILE_REFUSED` error is typed as `APIDockerfileRefusedDetails` (`{ issues: DockerfileIssue[] }`).

`RESTPostAPIApplicationWebPublishBody` gains the optional `port`, used to publish an application on a custom image that was created without web.

`APICustomImage.suggested_port` carries the port suggested for a new app on the image (first `EXPOSE` of the `Dockerfile`, or `80`).

The auto-deploy of an application can follow a chosen branch: `RESTPostAPIApplicationWebhookCreateBody` gains the optional `branch` and `APIApplicationWebhook` gains `branch` (`string | null`; `null` keeps reacting to a push on `main` or `master`).

A custom image can be renamed and described: `APICustomImage.description` (`string | null`, up to 128 characters), the optional `description` of `RESTPostAPICustomImageBody`, and the new `PATCH /v1/images/:image_id` (`RESTPatchAPICustomImageBody` with `name` and `description`, `RESTPatchAPICustomImageResult`), covered by the `images:write` API key scope.
