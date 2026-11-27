# @vertracloud/api-types

## 0.8.1

### Patch Changes

- 9ac94f6: `node` on applications and databases is now the name of the server that runs the resource, such as `amethyst` (`string`; `NodeId` was removed). Creation bodies no longer accept `node`: the platform always picks the server inside the chosen `region`. `NODE_NOT_ALLOWED` and `NODE_NOT_IN_REGION` were removed.

## 0.8.0

### Minor Changes

- 10bc088: Regions. Breaking: `APIApplication.cluster` and `APIDatabase.cluster` were removed, together with `ApplicationCluster` and `DatabaseCluster`. Applications and databases now have `region` (`RegionId`: `"ny"` or `"sp"`) and `node` (`NodeId`, the server inside the region, such as `ny1`). Dashboard route `GET /v1/regions` (`RESTGetAPIRegionsResponse`, `APIRegion`; session only). The create bodies of applications (`POST /v1/apps`, `POST /v1/apps/image`) and databases (`POST /v1/databases`) accept an optional `region` and `node`. New error codes `REGION_NOT_AVAILABLE`, `NODE_NOT_ALLOWED` and `NODE_NOT_IN_REGION`.

## 0.7.15

### Patch Changes

- c99e992: Documentation updates.

## 0.7.14

### Patch Changes

- ecdd50e: Realtime stream of an application: new console note `deploy_note:recreated:<reason>`, sent when zero-downtime deploy was on but the deploy restarted the application instead. `<reason>` is `plan_memory` or `recreate_required`, and may be absent.

## 0.7.13

### Patch Changes

- 1dfa72e: Realtime stream of an application: new `next_metrics` event with the live reading of the new version during a zero-downtime deploy, same format as `metrics`. Custom images: new build phase `preparing`, while the platform gets the source of a build before it enters the queue. `POST /v1/images/:image_id/rebuild` now answers right away with the image in `building`/`preparing`; a problem with the source (`FETCH_ZIP_ERROR`, `INSTALLATION_NOT_FOUND`, `IMAGE_CONTEXT_TOO_LARGE`, `DOCKERFILE_REFUSED`) is no longer an error of the call and ends the build as `failed` with that `error_code`.

## 0.7.12

### Patch Changes

- 8d2a75b: Realtime stream of an application: new `metrics` event (`APIApplicationLiveMetrics`) with the live CPU, memory and network reading about every 5 seconds, sent when the connection is opened with `metrics=true`.
- 8d2a75b: Realtime stream of an application: new `next_logs` event with the output of the new version during a zero-downtime deploy, optional reason in `deploy_note:discarded:<release_id>:<reason>`, and notes sent again at connection start carry the time they happened.
- 8d2a75b: Document the new console note `install_note:build_oom` of `GET /v1/apps/:id/realtime`: the build command ran out of memory and was stopped.
- 8d2a75b: Metric points of applications and databases (`APIApplicationMetric`, `APIDatabaseMetrics`) have a new `events` list (`APIMetricEvent`: `at`, `kind`, `out_of_memory`) with the restarts, automatic restarts and crashes between that point and the next; empty when nothing happened. New `APIMetricEventKind`.

## 0.7.11

### Patch Changes

- deef6aa: Add `IMAGE_VOLUME_REFUSED`, `IMAGE_LABEL_REFUSED` and `IMAGE_PULL_FAILED` to `ApplicationBuildError`: an app created from a Docker image that the platform refuses now reports the reason in `last_build_error` instead of a generic `BUILD_FAILED`.

## 0.7.10

### Patch Changes

- 60870d7: Add `auto_restart` to the application, to application creation (`POST /v1/apps`, and `POST /v1/apps/image` for Docker image apps) and to `PATCH /v1/apps/:id/config`: restart automatically when the app stops unexpectedly, on by default; changing it applies right away. Deleting a file now returns `space_released` (`now` or `on_restart`). New console notes: `install_note:done`, `run_note:started`, `image_note:*` and `restart_note:auto_restart_disabled`.
- 60870d7: Database creation (`POST /v1/databases`), adding a database to a stack and deploying a template now return the database password once; afterwards reset it to see a new one. `APIDatabase.legacy_host` tells when a database still uses its original connection address, and resetting the certificates now returns the new `host` and `client_variables_with_old_host` (your own variables that still contain the previous address). Moving a database that has `legacy_host: true` to the current address is done only from the dashboard: resetting its certificates with an API key responds 403 `WEBSITE_ONLY`.
- 60870d7: Document the 409 `STORAGE_ABOVE_NEW_LIMIT` of `PUT /v1/databases/:id`: lowering the RAM of a database is refused when its data takes more space than the new storage allows. `details` is the new `APIStorageAboveNewLimitDetails` (`used_mb`, `limit_mb`, `free_mb`, in MB); free `free_mb` and try again.
- 60870d7: Document that `PATCH /v1/apps/:id/config` fails with 400 `MAIN_FILE_NOT_FOUND` when `main_file` points to a file that does not exist in the app's files, and that `POST /v1/apps/:id/files/upload` answers the same when, after the upload, the main file would not exist (neither the zip nor the app's files have it).
- 60870d7: Document two new console notes of `GET /v1/apps/:id/realtime`: `runtime_note:line_changed:<language>:<from>:<to>:<reason>` (the application started on a different runtime version line; `reason` is `retired`, `unavailable` or `requested`) and the `install_note:timeout:<seconds>` parameter (`900` = one install step exceeded its limit, `1500` = the install phase exceeded its total time).

  The `reason` `requested` of that note also covers the version you follow (such as the recommended one) moving to a new line, without an explicit request.

- 60870d7: Document the new console note `run_note:port_not_listening:<port>` of `GET /v1/apps/:id/realtime`: the application started but did not begin listening on the expected port (`<port>`) within the allowed time.

## 0.7.9

### Patch Changes

- 1d2062c: Add `runtime_update` (`APIRuntimeUpdate`) to app and database status: whether the base runtime or database engine is up to date (`available`), with `security` and `retired` flags; a newer build is applied on the next restart. Dashboard only.

## 0.7.8

### Patch Changes

- 10eb6b7: Add `APIImagePullProgress` (`runtime`, `version`, `percent`, `done_bytes`, `total_bytes`) and the optional `image_pull` field on the app and database status (single and bulk), plus the optional `installing` flag on the database status. Dashboard only: the base image download progress is not part of the documented API, and it never exposes the internal image name.

## 0.7.7

### Patch Changes

- f05ceb3: Remove `APIApplicationScanSuggestions`, `RESTPostAPIApplicationScanBody` and `RESTPostAPIApplicationScanResponse`: `POST /v1/apps/scan` no longer exists and answers `404`. The route was only used by the dashboard, which now pre-fills the new application form in the browser. Breaking change, consciously taken before 1.0.
- a7b243c: Add `origin` on snapshots (`manual`, or `automatic` for the daily backup and the snapshot the platform takes before removing a resource, for example when the plan expires), `daily_app_backups` and `daily_database_backups` on plan features (they replace `daily_backups`, which is removed: breaking change, consciously taken before 1.0), typed `details` for `SNAPSHOT_RATE_LIMITED` (`scope` `resource` or `account`), `SNAPSHOT_TOO_LARGE` (`max_bytes`), `RESTORE_COOLDOWN` (`APIRestoreCooldownDetails`, `retry_after`) and `OPERATION_IN_PROGRESS` when creating a snapshot (`APIOperationInProgressDetails`, `job_id` of the manual snapshot of the same resource already running), and the error codes `DATABASE_NOT_READY` (503) and `SNAPSHOT_TIMEOUT` (504). Every response with `details.retry_after` also sends the `Retry-After` header with the same seconds. `APIResourceSnapshot.author_id` is removed (it was always `null`: breaking change, consciously taken before 1.0). Add `APIFileTooLargeDetails` for the `FILE_TOO_LARGE` error, now HTTP 413 when the file manager reads or saves a file above 10 MiB.

  Add the contract for snapshots and restores that run as jobs: `APISnapshotJob` (with `SnapshotJobKind`, `SnapshotJobStatus` and `origin` on snapshot jobs) read through `GET /v1/users/:id/snapshots/jobs` (`limit` from 1 to 50, default 10; outside that range `400 VALIDATION_ERROR`) and `GET /v1/users/:id/snapshots/jobs/:job_id` (`scope` optional: the job knows its kind), covered by the `snapshots:read` scope. Snapshots of applications gain the optional `changed_files`. Work that takes longer answers `202 { response: { job_id } }` to follow: creating a snapshot answers `201` with the snapshot, or `202` with `APISnapshotCreateAccepted` (`job_id`) when it takes longer than 90 seconds; restoring a snapshot answers `202` with `APISnapshotRestoreAccepted` (`job_id`), and `APISnapshotRestoreResponse` is removed. New error codes: `SNAPSHOT_EXCEEDS_STORAGE` (`APISnapshotExceedsStorageDetails`), `SNAPSHOT_CORRUPTED` and `RESTORE_IN_PROGRESS`. Creating an application or a database from a snapshot answers `202` (it was `201`: breaking change, consciously taken before 1.0) with `restore_job_id`: the data comes back by a restore job, without the size limit; if the restore fails, a database or an application on a custom Docker image is kept as it is and an application created from a code snapshot is deleted; `SNAPSHOT_EXCEEDS_STORAGE` replaces `SNAPSHOT_TOO_LARGE` there. Restoring a stack snapshot answers `202` with `APIStackSnapshotRestoreAccepted` (one `APIStackSnapshotRestoreMemberJob` per member, databases first, each application after them, with its own `warning` when its recorded image version no longer exists) instead of waiting for every member; a member that is not restored because an earlier one failed gets the job reason `STACK_RESTORE_MEMBER_FAILED`.

  Remove `GET /v1/apps/:id/download` from the contract (`RESTGetAPIApplicationDownloadResponse` and the route in the `apps:files` scope): the route no longer exists and answers `404`. Downloading a whole application is taking a snapshot (`POST /v1/users/:id/snapshots`, `snapshots:write`) and downloading it (`GET /v1/users/:id/snapshots/:snapshot_id/download`, `snapshots:read`); an API key with `apps:files` and without `snapshots:read` can no longer download an application. Breaking change, consciously taken before 1.0. `DOWNLOAD_TOO_LARGE` now only comes from saving an application as a template.

  Remove `WORKSPACE_INVITES_DISABLED` from `WORKSPACE_ERROR_CODES`: the API no longer returns it. Inviting by e-mail an account that turned off invites now answers like any other invite (a pending invite), without sending the e-mail, so the response does not reveal whether the e-mail has an account. `workspace_invites_enabled` only controls whether the account receives the invite e-mail.

  Add `progress` (`APISnapshotJobProgress`, with `SnapshotJobPhase`) on a running `APISnapshotJob`: the phase, the overall `percent`, the bytes done and total, and the estimated seconds left.

  `APISnapshotJob` gains `details` (the same `details` the `reason` would carry on a direct response, `APISnapshotTooLargeDetails` or `APISnapshotExceedsStorageDetails`, only on a job with `reason`) and `snapshot_id` on restore jobs (the snapshot being restored; on snapshot jobs it is the snapshot produced, always set when the job is `ready`). `restore_job_id` is typed `SnowFlake`.

  Taking a stack snapshot (`POST /v1/stacks/:stack_id/snapshots`) now answers `202` with `APIStackSnapshotAccepted` (the stack snapshot `id` and one `APIStackSnapshotJob` per member, databases first) instead of waiting for every member. `APIStackSnapshot` gains `status` (`StackSnapshotStatus`: `pending` or `ready`), and while it is `pending` each member has `snapshot_id: null` and the `job_id` to follow; a stack snapshot that failed is not listed.

  Deleting an application, a database or a stack, resetting a database and restoring a snapshot take no snapshot first: take one yourself if you may need the data again. `StackSnapshotReason` no longer has `delete` (no stack snapshot is taken when a stack is deleted). The `delete_snapshot` plan feature and the `FORCED_SNAPSHOT_RATE_LIMIT` error code are removed (breaking change, consciously taken before 1.0). `APITemplateDeployStepState` gains `jobs` (`APIStackSnapshotJob[]`) on the `snapshot` and `rollback` steps of a template update, to follow the progress of each snapshot or restore job.

  The status of an application and of a database (`APIApplicationStatus`, `APIDatabaseStatus`) and the status list that feeds the project list (`APIApplicationStatusShort`, `APIDatabaseStatusShort`) gain `restore_job_id` (`SnowFlake | null`, always present): set while a restore of the resource is queued or running, to follow on `GET /v1/users/:id/snapshots/jobs/:job_id`. While it is set, `installing` is not sent.

  Resetting a database (`POST /v1/databases/:id/reset`) moves from the `databases:write` scope to `databases:delete`, next to deleting it, since it erases every table: an API key with `databases:write` and without `databases:delete` now gets `403 API_KEY_SCOPE_DENIED` there. Breaking change, consciously taken before 1.0.

## 0.7.6

### Patch Changes

- caacb72: Add `APIOrderProration` and the optional `proration`/`prorated` fields on order quotes, created orders, order status and the order list, for upgrades that charge only the difference for the days left in the cycle.

## 0.7.5

### Patch Changes

- 5b382e2: Removes `RESTPostAPIUserGenerateApiKeyResponse`: the `POST /v1/users/me/generate-api-key` route no longer exists. Create keys with `POST /v1/users/me/api-keys` (`RESTPostAPIUserApiKeyCreateResponse`).
- ed16ad1: `APIActionCodeAction` gains `revoke_sessions`: signing out of every other session (`DELETE /v1/users/me/sessions`) now asks for a confirmation code in the dashboard (`X-Action-Code`).

## 0.7.4

### Patch Changes

- d551dd1: Confirmation codes for high-impact actions in the dashboard: `APIActionCodeAction`, `APIActionCodeProvider`, `ACTION_CODE_HEADER`, `APIActionCodeRequested`, `RESTPostAPIUserActionCodeBody`/`Response` (`POST /v1/users/me/action-codes`, dashboard session only) and the error codes `ACTION_CODE_REQUIRED`, `ACTION_CODE_INVALID`, `TOO_MANY_ATTEMPTS`, `INVALID_CODE`, `EXPIRED_CODE`, `PROVIDER_ALREADY_LINKED`, `ACCOUNT_ALREADY_LINKED` and `SERVICE_UNAVAILABLE`. Requests made with an API key are not affected.
- d551dd1: API key scopes: `GET /v1/apps/:id/download` moves from `apps:read` to `apps:files`, and `PATCH /v1/apps/:id/config` also requires `apps:files` when it changes `start_command`, `build_command` or `main_file`.
- d551dd1: Card attempt limits in the dashboard: the error codes `CARD_ATTEMPTS_LOCKED` (429, `details` is the new `APICardAttemptsLockedDetails` with `retry_after` and `scope`, typed by `CardAttemptsLockScope`) and `CAPTCHA_REQUIRED` (403), and `RESTPostAPIBillingCardSetupBody` with the optional `turnstile_token` for `POST /v1/users/me/cards/setup`. Requests made with an API key are not affected.

## 0.7.3

### Patch Changes

- 05e83b5: `IMAGE_NAME_TAKEN` (409): creating, renaming or rebuilding into a name another of your images already uses now answers this code instead of `VALIDATION_ERROR`. `details.path` stays `"name"`.

## 0.7.2

### Patch Changes

- 111bfb1: Direct upload of image build contexts: `POST /v1/images/uploads` (`RESTPostAPICustomImageUploadBody`, `APICustomImageUpload`, in the `images:write` scope), `upload_id` in `POST /v1/images` and `PUT /v1/images/:image_id`, and the error codes `IMAGE_UPLOAD_NOT_FOUND` and `IMAGE_UPLOAD_INCOMPLETE`.

## 0.7.1

### Patch Changes

- ee2be51: Rename the `machine` platform step of the build log to `prepare` and reword the build phase docs.

## 0.7.0

### Minor Changes

- 12a8f90: Add `build_phase` (`CustomImageBuildPhase`: `queued`, `starting`, `building`, `verifying`) `queue_position` and `queued_at` to `APICustomImage`, plus `error_code` next to `error`, so a build waiting for a machine can be told apart from one running. `status` keeps its values.

  Describe the build log stream (`GET /v1/images/:image_id/logs`) as step-based: `step` (`APICustomImageLogStep`, with `kind` `platform` or `dockerfile`), `log` (`APICustomImageLogLine`) and `end` (`APICustomImageLogEnd`) events, plus the `CustomImageLogPlatformStep` ids (`queue`, `machine`, `context`, `push`, `verify`, `done`). The log of every build stays available after it ends.

  The `IMAGE_BUILDER_UNAVAILABLE` message now also covers builds that are unavailable at the moment.

  Add the `IMAGE_BUILD_RATE_LIMITED` error (HTTP 429) with `APIImageBuildRateLimitedDetails` (`limit`, `window`, `scope`, `retry_at`) for image builds above the plan's daily limit or the hourly limit on one image.

## 0.6.6

### Patch Changes

- d93854b: Add `POST /v1/images/:image_id/rebuild`: builds a custom image again without a new upload, from the stored build context or, for an image linked to GitHub, from the tip of the linked branch. In the `images:write` scope.

  Add the `FETCH_ZIP_ERROR` error code, already returned by the routes that build from a GitHub repository.

## 0.6.5

### Patch Changes

- d6bc97e: Referral program contract. Orders: `APIOrderQuote` gains `referral_discount`, `referral_balance_applied` and `discount_source`; `APIOrderCreateResponse` gains `referral_balance_amount`; `APIOrderDiscount` gains `source`; the order and quote bodies gain `use_referral_balance` (dashboard session only; ignored with an API key); new `OrderDiscountSource`. New dashboard-session-only `/v1/referrals*` payloads and REST types, and the `REFERRAL_*` error codes. `ReferralStatus` is `attributed | qualified | no_reward` (referred accounts stay anonymous: no reason is ever exposed); `ReferralLedgerKind` uses `adjustment` for manual adjustments.

## 0.6.4

### Patch Changes

- 6ac3249: `GET /v1/users/:id/snapshots/:snapshot_id/download` always answers `200` with the zip, whatever its size: remove the `redirect` query field and the `APISnapshotDownloadURL` / `RESTGetAPISnapshotDownloadURLResponse` types added in 0.6.3, which no longer have a route behind them. `DOWNLOAD_TOO_LARGE` stays.

## 0.6.3

### Patch Changes

- f5024a6: `GET /v1/users/:id/snapshots/:snapshot_id/download` now redirects (`302`) snapshots larger than 100 MB to a short-lived link that serves the zip, so snapshots of any size can be downloaded; smaller ones are still served directly, and clients that follow redirects receive the file in both cases. Add `redirect` to `RESTGetAPISnapshotDownloadQuery` (`false` returns the link as JSON) and the `APISnapshotDownloadURL` / `RESTGetAPISnapshotDownloadURLResponse` types.

  Add the `DOWNLOAD_TOO_LARGE` error code (413): the application or database is too large to download as a zip on the spot; download a snapshot instead.

## 0.6.2

### Patch Changes

- 73bb05c: Add `auto_update_apps` to `APICustomImage` and to the body of `PATCH /v1/images/:image_id` (`RESTPatchAPICustomImageBody`). When `true`, every successful build of the image restarts its running apps on the new version; images created from a GitHub repository start with `true`, the others with `false`.

  Add `warnings` (`DockerfileIssue[]`) to `APICustomImage`, with the warnings of the `Dockerfile` check of the latest build, and clarify that `DockerfileIssueCode.WORKDIR_APP` applies to the final stage only.

## 0.6.1

### Patch Changes

- f5d4b0a: Add Web Analytics for applications. New routes `GET /v1/apps/:id/analytics` (traffic), `/analytics/errors`, `/analytics/performance` and `/analytics/requests`, with their `RESTGetAPIApplicationAnalytics*Query` and `...Response` types and the shared `RESTAPIApplicationAnalyticsRangeQuery` (window) and `RESTAPIApplicationAnalyticsFilters` (one filter per dimension). New payloads `APIApplicationAnalyticsTraffic`, `APIApplicationAnalyticsErrors`, `APIApplicationAnalyticsPerformance` and `APIApplicationAnalyticsRequestList`, with their summaries, series points, breakdown and latency entries, `APIApplicationAnalyticsPeriod` (the previous period of `compare=true`, or the period chosen with `compare_start`), `APIApplicationAnalyticsRequest` (one request of the log) and `APIApplicationAnalyticsRangeExceedsPlanDetails`. New enums `ApplicationAnalyticsDimension`, `ApplicationAnalyticsInterval`, `ApplicationAnalyticsStatusClass` and `ApplicationAnalyticsOrder`, and the `ANALYTICS_NO_VALUE` constant. Open unions with companion constants for known values (`ApplicationAnalyticsDevice`, `ApplicationAnalyticsHTTPMethod`, `ApplicationAnalyticsProtocol`, `ApplicationAnalyticsCacheStatus`), filters typed per dimension (`ApplicationAnalyticsFilterValues`) and the generic `APIApplicationAnalyticsReport`. `compare_start` on the traffic, errors and performance queries compares against a custom period of the same length. The four routes are part of the `apps:read` API key scope.

  New error codes `PLAN_DOES_NOT_SUPPORT_WEB_ANALYTICS_PERFORMANCE`, `PLAN_DOES_NOT_SUPPORT_WEB_ANALYTICS_REQUESTS`, `ANALYTICS_RANGE_EXCEEDS_PLAN` and `ANALYTICS_BUSY` (`ANALYTICS_ERROR_CODES`). The plans listing gains `features.web_analytics_performance`, `features.web_analytics_requests` and `limits.web_analytics_history_days`.

## 0.6.0

### Minor Changes

- 01b6df0: Add the new plans: plan families and sizes, the single `PlanName` type (and constant) for plan names, billing periods of 1, 3, 6 and 12 months, the public plans listing (`GET /v1/plans`), the order quote (`POST /v1/orders/quote`) and the `PLAN_NOT_FOR_SALE` error. `ApplicationCluster` and `DatabaseCluster` are now `1 | 2`.

  **Breaking:** `UserPlanName` (type and constant) is replaced by `PlanName`, which lists only the current plans; the previous plan names (`economy`, `pro`, `scale`, `intermediary`, `enterprise-4` to `enterprise-30`) are no longer part of the type. The `USA_3` cluster constant is removed.

## 0.5.6

### Patch Changes

- 296719c: Remove `APIUserInfoResponse.can_use_templates`. Every account sees templates; whether an account can use them is answered by the API itself, which refuses with `403 FORBIDDEN` while templates are rolling out to that account.

## 0.5.5

### Patch Changes

- 0855545: Add templates and stacks. New types `APITemplate`, `APITemplateDetail`, `APITemplateVersion`, `APITemplateManifest` (with `APITemplateAppService`, `APITemplateDatabaseService`, `APITemplateBlobService`, `APITemplateInput`, `APITemplatePermissions` and the other parts of the manifest), `APITemplateDeploy`, `APITemplateShareLink`, `APITemplateSharePreview`, `APITemplateUpdateInfo`, `APITemplateValidation`, `APIStack`, `APIStackMember`, `APIStackBinding`, `APIStackSnapshot` and `APIStackConnectionInfo`, the enums `TemplateOrigin`, `TemplateVisibility`, `TemplateCategory`, `TemplateSourceType`, `TemplateWebMode`, `TemplateInputType`, `TemplateDatabaseEngine`, `TemplateBlobVisibility`, `TemplateShareLinkMode`, `TemplateDeployStatus`, `TemplateDeployStep`, `TemplateReportReason`, `StackNetworkMode` and `StackMemberType`, and the new routes under `/v1/templates`, `/v1/template-deploys`, `/v1/share/templates` and `/v1/stacks` with their `RESTGet`/`RESTPost`/`RESTPatch`/`RESTPut`/`RESTDeleteAPITemplate*` and `...APIStack*` types. A template can use several applications, databases and a Blob folder, creates a stack when it has more than one service, and can be private, shared by link and closed.

  New API key scopes `templates:read`, `templates:write`, `templates:deploy` (also in the `write` preset), `stacks:read`, `stacks:write` and `stacks:delete`. An API key can be restricted to a Blob folder: `APIApiKey.blob_prefix` and the optional `blob_prefix` of the create body (the S3 credentials derived from the key inherit it), and `APIApiKey.managed_by` marks the keys the platform creates for a stack. New error codes `BLOB_PREFIX_DENIED`, `API_KEY_MANAGED`, `IMAGE_TEMPLATE_ONLY`, `IDEMPOTENCY_KEY_CONFLICT`, `IMAGE_IN_USE`, `MANAGED_ENV_READONLY` and the `TEMPLATE_*`, `SHARE_LINK_*` and `STACK_*` codes.

  Optional fields on existing payloads: `stack_id` and `stack_service_key` on `APIApplication` and `APIDatabase`, `APIApplication.template`, `managed_by` on `APIApplicationEnvironment`, `kind` and `origin` on `APICustomImage`, `closed` on `APIResourceSnapshot`, `notes` and `flow_layout` on `APIWorkspaceResourceFolder` and on the folder bodies, and `WorkspaceResourceType` gains `"stack"` (folders and favorites accept stacks).

  Restart notice: `APIRestartRequired` (`restart_required` and `apps_to_restart`) is part of the answer to the changes that can alter the variables or certificates an application reads (`APIStackChange`, `APIStackBindingChange`, `APIStackDatabaseAdded`, `APIStackBlobAdded`, `APIDatabasePasswordReset`, `APIDatabaseCertificateReset`, and the delete-connection answer). `StackBindingValue` gains `ssl.pem_path`, `ssl.p12_path` and `prisma_url`. The error codes `TEMPLATE_DETACH_CONFIRMATION_REQUIRED` and `TEMPLATE_STORAGE_UNAVAILABLE`, and the optional `confirm_detach` (`RESTAPIConfirmDetach`) of the routes that change the code of an application, were added. The error code `TEMPLATE_ROLLBACK_REQUIRES_DATA` (409; `details` is an `APITemplateRollbackRequiresDataDetails`) is returned when a rollback of only the code is refused because the template's software migrates its data on update.

  The `StackBindingValue` and `RESTGetAPITemplatesSort` unions gain a companion `const`.

  `APIApplication.locked_deploy_settings` lists the deploy settings the template of the application locks, and `PATCH /v1/apps/:id/config` answers the new error code `TEMPLATE_SETTING_LOCKED` when one of them changes. `StackBindingValue` gains `domain` (the host name of an application, without scheme), and `APITemplateValidation` gains `warnings` (`APITemplateValidationWarning`) for a manifest that is valid but limited.

## 0.5.4

### Patch Changes

- d00eb00: Add custom Docker images. New types `APICustomImage`, `APICustomImageApp`, `APICustomImageVersion`, `APIDockerfileCheck` and `DockerfileIssue`, the enums `CustomImageStatus`, `CustomImageBuildSource`, `CustomImageOwner` and `DockerfileIssueCode`, and `APIApplication.custom_image` (`null` for a regular app). New routes `GET` and `POST /v1/images`, `GET`, `PUT`, `PATCH` and `DELETE /v1/images/:image_id`, `GET /v1/images/:image_id/versions`, `/logs` and `/context`, `PUT` and `DELETE /v1/images/:image_id/github`, `POST /v1/images/check` and `POST /v1/apps/image`, with their `RESTGet`/`RESTPost`/`RESTPut`/`RESTDeleteAPICustomImage*` and `RESTPostAPIApplicationImage*` types; every image route accepts an optional `workspace_id` (`RESTAPICustomImageWorkspaceQuery`). New error codes `IMAGE_NOT_FOUND`, `MAX_IMAGES_REACHED`, `PLAN_DOES_NOT_SUPPORT_CUSTOM_IMAGES`, `IMAGE_BUILD_IN_PROGRESS`, `IMAGE_NOT_READY`, `DOCKERFILE_NOT_FOUND`, `DOCKERFILE_REFUSED`, `IMAGE_NAME_MISMATCH`, `IMAGE_VERSION_NOT_FOUND`, `IMAGE_BUILDER_UNAVAILABLE`, `IMAGE_CONTEXT_TOO_LARGE`, `IMAGE_TOO_LARGE`, `IMAGE_LABEL_REFUSED`, `IMAGE_VOLUME_REFUSED` and `IMAGE_APP_PORT_REQUIRED`, the `DockerfileIssueCode` value `volume_refused`, the `images:read`, `images:write` and `images:delete` API key scopes, and `WorkspaceResourceType` gains `"image"`.

  The activity target type `ActivityTargetType` gains `"image"` (activities of custom images).

  An upload to an application on a custom image is a commit that rebuilds the image: `APIApplicationFileUpload` gains the optional `image_build` (`APIApplicationImageBuild`, `{ image_id, build_id }`) and `message`. `RESTPostAPISnapshotRestoreBody.restore_image_version` and the `warning` (`APISnapshotImageWarning`, `"IMAGE_VERSION_NOT_FOUND"`) of `APISnapshotRestoreResponse` and of `RESTPostAPIApplicationCreateResponse` cover snapshots of image apps, and the error codes `IMAGE_APP_FIELD_NOT_APPLICABLE` and `IMAGE_APP_CODE_NOT_APPLICABLE` are new.

  The `details` of the `DOCKERFILE_REFUSED` error is typed as `APIDockerfileRefusedDetails` (`{ issues: DockerfileIssue[] }`).

  `RESTPostAPIApplicationWebPublishBody` gains the optional `port`, used to publish an application on a custom image that was created without web.

  `APICustomImage.suggested_port` carries the port suggested for a new app on the image (first `EXPOSE` of the `Dockerfile`, or `80`).

  The auto-deploy of an application can follow a chosen branch: `RESTPostAPIApplicationWebhookCreateBody` gains the optional `branch` and `APIApplicationWebhook` gains `branch` (`string | null`; `null` keeps reacting to a push on `main` or `master`).

  A custom image can be renamed and described: `APICustomImage.description` (`string | null`, up to 128 characters), the optional `description` of `RESTPostAPICustomImageBody`, and the new `PATCH /v1/images/:image_id` (`RESTPatchAPICustomImageBody` with `name` and `description`, `RESTPatchAPICustomImageResult`), covered by the `images:write` API key scope (deleting an image needs `images:delete`).

## 0.5.3

### Patch Changes

- 955a761: Database engine versions: `APIDatabase` gains `version` (the engine major line), `RESTPostAPIDatabaseCreateBody` gains the optional `version`, and `GET /databases/versions` is typed by `RESTGetAPIDatabaseVersionsResponse` (`APIDatabaseVersions`, `APIDatabaseVersionCatalog`). New error codes `INVALID_DATABASE_VERSION` and `SNAPSHOT_VERSION_NEWER`.

## 0.5.2

### Patch Changes

- 0274edf: `APIDatabase` gains `username`: the user to connect with. Databases created from v26.4.8 on use `vertracloud` (default database `vertracloud`, no superuser); older databases keep the engine's user (`postgres`, `default` or `root`).

## 0.5.1

### Patch Changes

- 473b843: Add the `deno`, `dotnet` and `elixir` application languages. `POST /v1/apps` accepts an optional `language` to force the language (without it the platform detects it from the project manifest). The project-detection response types gain `language`, `main`, `version`, `has_manifest` and `candidates`. Remove `missing_dependencies` from the application, the file upload response and the project-detection response. Remove `cleanup_old_runtime_language` from the restart body and the `CLEANUP_LANGUAGE_SAME_AS_CURRENT` error code: the platform now cleans the previous runtime's dependencies automatically when the language changes.

## 0.5.0

### Minor Changes

- 7d29613: Plans are now identified by name and applications can have several custom domains. This release has breaking changes.

  Plans: `UserPlan` (numeric ids) is replaced by `UserPlanName` (type and const, `economy`, `pro`, `scale`, `intermediary` and `enterprise-<size>`, sizes in `EnterprisePlanSizes`). The Free plan no longer exists: an account without a plan has `plan: null`. `APIUser.plan_id` and `APIUserPlan.id` are removed, `APIUserInfoResponse.plan` is `APIUserPlan | null`, `APIUserPlan.name` is a `UserPlanName` and `APIUserPlan.expires_at` is no longer nullable. `owner_plan_id` is replaced by `owner_plan: UserPlanName | null` on `APIApplication`, `APIDatabase` and `APIWorkspaceInfoResponse`. Orders, coupons and redeem codes keep `plan: string`. The `FREE_PLAN_SUSPENDED` error code is replaced by `PLAN_REQUIRED`.

  Domains: `APIApplication.custom_domain` is replaced by `domains: APIApplicationDomain[]` and `APIApplicationWebPublish.custom_domain` by `domains: string[]`. New types `APIApplicationDomain`, `APIApplicationDomainStatus`, `APIApplicationDomainSslStatus`, `APIApplicationDomainRedirectStatus`, `APIApplicationDomainDnsRecord` and `APIApplicationDomainConnect`. New routes `GET` and `POST /v1/apps/:id/domains`, `PATCH` and `DELETE /v1/apps/:id/domains/:domain_id`, `GET /v1/apps/:id/domains/:domain_id/dns` and `POST /v1/apps/:id/domains/:domain_id/connect`, with the `RESTGetAPIApplicationDomainsResponse`, `RESTPostAPIApplicationDomainBody` / `RESTPostAPIApplicationDomainResponse`, `RESTPatchAPIApplicationDomainBody` / `RESTPatchAPIApplicationDomainResponse`, `RESTDeleteAPIApplicationDomainResponse`, `RESTGetAPIApplicationDomainDnsResponse` and `RESTPostAPIApplicationDomainConnectResponse` types, and the matching `apps:read` and `apps:write` API key scope entries. Removed: `GET`, `POST` and `DELETE /v1/apps/:id/network/custom` and `GET /v1/apps/:id/network/dns` (types `APIApplicationCustomDomain`, `APIApplicationDnsRecord`, `ApplicationDnsRecordType`, `ApplicationDnsRecordStatus`, `RESTGetAPIApplicationCustomDomainResponse`, `RESTPostAPIApplicationCustomDomainBody`, `RESTPostAPIApplicationCustomDomainResponse`, `RESTDeleteAPIApplicationCustomDomainResponse` and `RESTGetAPIApplicationDnsRecordsResponse`). New error codes: `DOMAIN_NOT_FOUND`, `DOMAIN_LIMIT_REACHED`, `DOMAIN_PORT_LIMIT_REACHED`, `INVALID_DOMAIN_PORT`, `INVALID_PATH_PREFIX`, `INVALID_REDIRECT_TARGET`, `DOMAIN_CONNECT_UNAVAILABLE` and `PLAN_REQUIRED`; `NO_CUSTOM_DOMAIN` and `FREE_PLAN_NO_WEB_PUBLISH` are removed (publishing without a plan answers `PLAN_REQUIRED`).

## 0.4.3

### Patch Changes

- dabc97f: Add the `building` application status and the `APP_BUILDING` / `BUILD_INTERRUPTED` error codes. `POST /v1/apps` now answers `202` with the application in `building` instead of waiting for the build; `removed_directories` is no longer part of that response. Applications now expose `last_build_error` (`ApplicationBuildError | null`), the code of the last failed build or install.

## 0.4.2

### Patch Changes

- 7781f37: Add `rename_on_conflict` to blob copy: a taken path (including the source's own) is saved as `name-1.ext`, `name-2.ext`, … instead of failing.

## 0.4.1

### Patch Changes

- 18cd0c1: Add `rename_on_conflict` to blob uploads: a taken path is saved as `name-1.ext`, `name-2.ext`, … instead of failing.

## 0.4.0

### Minor Changes

- b9c0bdb: Add the Blob Storage contract (`blob.vertracloud.app`). Payloads: `APIBlobObject`, `APIBlobObjectList`, `APIBlobUpload`, `APIBlobUploadPart`, `APIBlobDownload`, `APIBlobLimits`, `APIBlobStats`, `APIBlobBatchResult`, `APIBlobDeleteResult`, `APIBlobUploadToken`, `APIBlobShare`, `APIBlobSharePublic`, `APIBlobRule`, `APIBlobRules`, `APIBlobS3Credentials`, `APIBlobCustomDomain`, and the `BlobVisibility`, `BlobContentDisposition`, `BlobUploadMode`, `BlobUploadStatus` and `BlobCustomDomainStatus` enums. REST types for objects (simple upload, list, get, update one or many, copy/move, delete one or many, temporary download link), direct and multipart uploads, shares (including the public share page routes), folder rules (`If-Match`), stats, upload tokens, S3 credentials and custom domains. New API key scopes `blob:read` and `blob:write`; new workspace permissions `blob:read` and `blob:manage` (not included in any seed role). New error codes: `BLOB_OBJECT_NOT_FOUND`, `BLOB_OBJECT_ALREADY_EXISTS`, `BLOB_UPLOAD_NOT_FOUND`, `BLOB_UPLOAD_EXPIRED`, `BLOB_UPLOAD_INCOMPLETE`, `BLOB_UPLOAD_LIMIT`, `BLOB_CHECKSUM_MISMATCH`, `BLOB_FILE_TOO_LARGE`, `STORAGE_QUOTA_EXCEEDED`, `BLOCKED_FILE_TYPE`, `BLOB_NAMESPACE_SUSPENDED`, `BLOB_UPLOAD_TOKEN_INVALID`, `BLOB_UPLOAD_TOKEN_EXHAUSTED`, `BLOB_UPLOAD_TOKEN_NOT_ALLOWED`, `BLOB_UPLOAD_TOKEN_CONSTRAINT`, `BLOB_SHARE_NOT_FOUND`, `BLOB_SHARE_EXHAUSTED`, `BLOB_SHARE_PASSWORD_INVALID`, `BLOB_RULES_CONFLICT`, `BLOB_RULE_LIMIT`, `BLOB_CUSTOM_DOMAIN_LIMIT`, `BLOB_CUSTOM_DOMAIN_TAKEN` and `BLOB_CUSTOM_DOMAIN_NOT_FOUND`.

  Also: `RESTPostAPIBlobUploadTokenBody.overwrite` (an upload token never replaces an existing object unless it was created with `overwrite: true`); `APIBlobCustomDomain.verification` (the `TXT` record that proves ownership of a custom domain; the domain only turns `active` once it resolves); `checksum_sha256` is valid only for single-request and one-part direct uploads (a multipart upload refuses it). `APIBlobCustomDomain.web_content` and `PATCH /v1/domains/:domain_id` (`RESTPatchAPIBlobDomainBody`): a custom domain can serve `.html`, `.htm`, `.xhtml`, `.svg` and `.xml` in the browser, sandboxed; off by default.

## 0.3.6

### Patch Changes

- 625355e: Document that `APIApplicationDeploySettings.zero_downtime` defaults to `off` and `auto_rollback` to `false`: zero-downtime deploys and automatic rollback are opt-in.
- 911f8d6: Add `expires_at` to `APIOrderPixPayment` (when the Pix QR code stops being payable; a new one can be requested for the same open order) and to `APIOrderStatus` (when the unpaid order expires).

## 0.3.5

### Patch Changes

- 53a5902: Add the release rollback contract: `GET /v1/apps/:id/releases/:release_id/rollback` previews a rollback (`APIApplicationRollbackPreview`, with the environment variable names that would change), and `POST` on the same route restores the release as a new release with `source: "rollback"` (optional `restore_environment`). Adds `ApplicationEnvironmentChange`, the `RELEASE_EXPIRED`, `RELEASE_ALREADY_ACTIVE` and `PLAN_DOES_NOT_SUPPORT_ROLLBACK` error codes, and API key scopes: the preview needs `apps:envs`, the rollback needs `apps:write` (plus `apps:envs` when `restore_environment` is `true`).
- 9da6a30: Add the deploy settings contract. `APIApplication.deploy` (`APIApplicationDeploySettings`) returns `zero_downtime` (`ApplicationZeroDowntime`: `auto` | `on` | `off`), `zero_downtime_active`, `auto_rollback` and `health_check_path`. `PATCH /v1/apps/:id/config` accepts `deploy?: { zero_downtime?, auto_rollback?, health_check_path? }`. New error codes: `PLAN_DOES_NOT_SUPPORT_ZERO_DOWNTIME` and `PLAN_DOES_NOT_SUPPORT_AUTO_ROLLBACK` (403, returned when the plan does not include the requested option). The `system` realtime event documents the `deploy_note:failed:<release_id>`, `deploy_note:rollback:<from>:<to>` and `deploy_note:discarded:<release_id>` notices. `deploy_note:discarded:<release_id>`: the new version did not become healthy and was discarded; the previous one keeps running (Enterprise, zero-downtime deploys).
- 411fd5c: Add `first_started_at` to `APIApplicationRelease`: when the application first started with the release's code, or `null` while the code is in the application folder but the application has not been restarted with it yet.
- abffc08: Add the release history contract: `APIApplicationRelease`, `APIApplicationReleaseLog`, `ApplicationReleaseSource` and `ApplicationReleaseStatus`, `GET /v1/apps/:id/releases` and `GET /v1/apps/:id/releases/:release_id/log` (API keys with `apps:read`), an optional `message` on the file upload, and the `RELEASE_NOT_FOUND` error code.

## 0.3.4

### Patch Changes

- c051583: Add optional `path` (destination folder) to `RESTPostAPIApplicationFileUploadQuery`.

## 0.3.3

### Patch Changes

- b8700e6: Add `marketing_emails_enabled` to `APIUser` and `RESTPatchAPIUserMeBody`.

## 0.3.2

### Patch Changes

- 432808b: Billing address gains `number`, `district` and `city_code`; phone becomes optional and `complete` now covers what the service invoice needs.
- 432808b: `GET`/`PUT /v1/users/me/billing` reachable with API keys (`billing:read`/`billing:write`); new error `BILLING_DETAILS_INCOMPLETE` on `POST /v1/orders`.

## 0.3.1

### Patch Changes

- 4641cb2: Add the `PATH_IS_FILE` error code: writing or creating a folder whose path goes through an existing file returns 409 instead of a server error.

## 0.3.0

### Minor Changes

- 50a3c77: Add `GET` and `PATCH /v1/users/me/billing/renewal` to turn the automatic plan renewal off and on: `APIBillingRenewal`, `RESTGetAPIBillingRenewalResponse`, `RESTPatchAPIBillingRenewalBody` and `RESTPatchAPIBillingRenewalResponse`. Dashboard session only.
- 50a3c77: Add the card payment contract: `OrderProvider.CARD`, `allowed_payment_methods` on order create/status, `POST /v1/orders/:orderId/pay/card` (`RESTPostAPIOrderCardPaymentBody`, `APIOrderCardPayment`, `OrderCardPaymentStatus`), billing details and saved cards (`APIBillingDetails`, `APIBillingAddress`, `APIBillingTaxId`, `BillingTaxIdType`, `APIBillingCard` and the `/v1/users/me/billing` and `/v1/users/me/cards` envelopes), and the error codes `COUPON_PAYMENT_METHOD`, `PAYMENT_METHOD_UNAVAILABLE`, `BILLING_DETAILS_INVALID`, `TAX_ID_INVALID`, `CARD_NOT_FOUND`, `CARD_NOT_ALLOWED_FOR_PLAN` and `CARD_DECLINED`. Billing, card and card payment routes are dashboard session only. Orders accept 1, 3 or 12 months; the Economy plan only 1 month and only PIX.
- 720378e: Add `APIOrderCouponPreview` and `RESTPostAPIOrderCouponPreviewBody`/`Response` for `POST /v1/orders/coupon-preview`, and the `COUPON_*` error codes that order creation already returns.
- 720378e: Add `has_receipt` to `APIOrderListItem`, `APIOrderReceipt` and `RESTGetAPIOrderReceiptResponse` for `GET /v1/orders/:orderId/receipt`, and the `ORDER_RECEIPT_UNAVAILABLE` error code.

## 0.2.5

### Patch Changes

- dd88d9b: Remove `SUBDOMAIN_ALREADY_IN_USE` from `API_ERROR_CODES`: the API returns `SUBDOMAIN_TAKEN` for a subdomain already in use on every route.
- 8a2a34c: Add the `FREE_PLAN_SUSPENDED` error code: creating an application or database on the Free plan now requires a paid plan.

## 0.2.4

### Patch Changes

- 2ad1d99: Remove workspace ownership transfer types (feature removed, no consumers)

## 0.2.3

### Patch Changes

- 444cf4f: Add the `SNAPSHOT_FAILED` error code: the snapshot taken before deleting or resetting a database failed, so the database was not changed.

## 0.2.2

### Patch Changes

- 2e2139d: Add eleven error codes the API already returned to the public contract: `API_KEY_NOT_FOUND`, `API_KEY_LIMIT_REACHED`, `API_KEY_INVALID_NAME`, `API_KEY_INVALID_SCOPES`, `API_KEY_INVALID_IPS`, `WEBSITE_ONLY`, `INVALID_VERSION` in `APIErrorCode`, and `WORKSPACE_INVITES_DISABLED`, `WORKSPACE_ALREADY_MEMBER`, `WORKSPACE_ACTION_REQUEST_EXPIRED`, `WORKSPACE_ACTION_REQUEST_ALREADY_DECIDED` in `WorkspaceErrorCode`.
- 2feec8c: Remove the `autorestart`/`auto_restart` field from `RESTPostAPIApplicationCreateBody`, `RESTPatchAPIApplicationUpdateConfigBody` and `APIApplication`. Auto-restart has been unconditionally on for every plan since 2026-09-17 and the field was only accepted-and-ignored; it is now gone from the wire entirely. Breaking for any client still reading `auto_restart` off the application payload.
- 68b59ea: Remove `POST /v1/github/repository/file` from the public contract: `APIGitHubFile`, `RESTPostAPIGitHubFileBody` and `RESTPostAPIGitHubFileResponse` no longer exist. The route was built for the hosted AI, which has been removed from the product; nothing consumes it. Breaking for any client still importing these types.

## 0.2.1

### Patch Changes

- 9230102: Move personal and workspace folder and favorite endpoints to `/folders` and `/favorites` paths without the `resource-organization` segment.

## 0.2.0

Esta versão alinha o contrato com o que a API pública realmente aceita e devolve. Há muitas mudanças **breaking**: nomes foram renomeados sem alias, campos soltos foram estreitados e tipos sem rota correspondente foram removidos.

### Envelope e erros

- **Breaking:** `APIPayload<T>` passa a ser a união `{ response: T } | APIErrorPayload`, em vez de um objeto com todos os campos opcionais. O formato no fio não muda; o TypeScript agora separa sucesso de erro com `"code" in body`, e ler `response` sem essa checagem deixa de compilar.
- Novo `APIErrorPayload` — o corpo de erro `{ code, message?, details? }`, com `code` obrigatório. Em `VALIDATION_ERROR`, o campo inválido vem em `details.path`.
- Rotas sem retorno respondem `{ response: null }`: toda resposta vazia passa a ser `APIPayload<null>` (antes `APIPayload<void>`).
- Novo catálogo de códigos de erro públicos em `payloads/v1/api-error`.
- Novo `RESTAPIWorkspaceQuery` (`workspace_id?`), compartilhado pelas rotas de aplicação e banco.

### Aplicações

- `APIApplication` ganha `build_command`, `github` (`repo_owner`/`repo_name` ou `null`) e `shield_cooldown` (contenção ativa do Vertra Shield, com `until`, `reason`, `direction` e `strikes`; `null` quando não há contenção).
- `RESTPostAPIApplicationCreateBody` ganha `build` e `snapshot_id`; `memory`, `main` e `version` ficam opcionais (obrigatórios só ao criar a partir de `file`). `file` e `snapshot_id` são mutuamente exclusivos.
- `RESTPostAPIApplicationRestartBody` com `reinstall_dependencies`, `force_build` e `cleanup_old_runtime_language`. Os dois primeiros contam no limite de deploys por hora do plano.
- Publicação web liga e desliga depois da criação: `APIApplicationWebPublish` e os envelopes de `POST`/`DELETE /v1/apps/{id}/network/publish`. `subdomain` é opcional — ausente, a plataforma sorteia o endereço.
- `APIApplicationStatus` e `APIApplicationStatusShort` ganham `installing` e `uptime` (segundos, `null` quando desconhecido). `APIApplicationStatus` perde `status` (nunca era enviado) e `network` fica anulável; `APIApplicationStatusShort` ganha `storage` e `network` opcionais.
- `GET /v1/apps/status` e `GET /v1/databases/status` devolvem listas.
- `APIApplicationFileContent` é sempre base64, com `size` e `last_modified`. A forma `buffer` e `ApplicationFileContentType.BUFFER` foram removidas. `last_modified` pode ser reenviado no `PUT` de arquivo para detectar conflito (`FILE_MODIFIED`).
- Novos: `APIApplicationRuntime`/`APIApplicationRuntimes` (`GET /v1/apps/runtimes`), `ApplicationRealtimeEventType` e `APIApplicationRealtimeEvent`, `ApplicationDnsRecordType`, `ApplicationDnsRecordStatus`, `RESTGetAPIApplicationFileTreeResponse` e os tipos de query de métricas, tempo real, arquivos e upload.
- Webhook de deploy automático: caminho unificado no singular; `APIApplicationWebhook` carrega `webhook_url`, `repo_owner` e `repo_name`.
- Removidos `RESTPostAPIApplicationInstallDependenciesBody`/`Response` (use `reinstall_dependencies` no restart) e `APIApplicationActivity`.

### Bancos de dados

- Contrato da aba **Dados** do banco em `payloads/v1/database-data` e `rest/v1/database-data` (SQL, Mongo e Redis). Disponível apenas pelo painel.
- `RESTPostAPIDatabaseCreateBody` ganha `snapshot_id`; ao criar de uma snapshot, `type` fica opcional.
- `APIDatabaseStatus.status` é `"running" | "stopped"` e `network` fica anulável.
- Atualizar e resetar devolvem `APIDatabaseOperationResponse`; excluir devolve o id; o certificado vem em JSON (`APIDatabaseCertificate`). Novo `RESTPutAPIDatabaseUpdateBody`.
- As respostas de iniciar e parar foram renomeadas pelo verbo da rota e devolvem `{ status }`.
- Removidos `APIDatabaseActivity` e `APIDatabaseSnapshot`.

### Snapshots

- `APIResourceSnapshot` ganha `resource_name`.
- Novos `SnapshotScope`, `SnapshotResourceType`, `RESTPostAPISnapshotRestoreBody` e queries por rota (`RESTGetAPISnapshotsQuery`, `RESTGetAPIGroupedSnapshotsQuery`, `RESTPostAPISnapshotCreateQuery`, `RESTPostAPISnapshotRestoreQuery`, `RESTGetAPISnapshotDownloadQuery`).
- `APIGroupedResourceSnapshots.snapshots` usa o formato compacto `APIGroupedResourceSnapshot`.
- Removido `RESTGetAPISnapshotResponse` (a rota não existe).

### Conta, chaves de API e OAuth

- Chaves de API múltiplas com escopos: `APIApiKey`, `APIApiKeyCreated`, `APIApiKeyScope`, o catálogo `API_KEY_SCOPES`, presets (`apiKeyPresetScopes`) e os envelopes de `/v1/users/me/api-keys`, incluindo o histórico de requisições por chave.
- Novos escopos `billing:read`, `billing:write`, `redeem:write`, `workspaces:delete` e `workspaces:invites`.
- Ficam só no painel, sem escopo de chave: aba Dados do banco, notificações e log de atividades.
- Fluxo OAuth de "conectar conta" (`payloads/v1/oauth`, `rest/v1/oauth`): cliente, registro dinâmico, consentimento e troca do código por token. O token emitido é uma chave de API comum.
- Novo `UserLanguage` (`"pt-br" | "en-us" | "es-es"`). `RESTPatchAPIUserMeResponse` e `RESTPostAPIUserDowngradeResponse` devolvem `APIUser`.
- Leitura de arquivo de repositório do GitHub: `APIGitHubFile` e os envelopes de `POST /v1/github/repository/file`.

### Workspaces e atividades

- Workspaces v2: catálogo de `WorkspacePermission`, papéis personalizáveis (`APIWorkspaceRole`, presets `admin`/`developer`/`operator`/`viewer`), convites por e-mail e link (`APIWorkspaceInvite*`), pedidos de ação (`APIWorkspaceActionRequest`, união discriminada por `action`) e `WORKSPACE_ERROR_CODES`.
- Organização salva de aplicações e bancos por usuário: pastas e favoritos, no escopo pessoal ou do workspace.
- `APIActivity` ganha `origin` (`ActivityOrigin`), `workspace_id` e `author`; a listagem reflete a resposta paginada, com query própria.
- `APIUser` ganha `workspace_invites_enabled`.
- Removidos `WorkspaceMemberRole`, `APIUserWorkspaceInviteKey`, `RESTGetAPIWorkspaceResponse`, `RESTGetAPIActivityResponse` e `APIReturnService`.

### Pedidos

- `POST /v1/orders` aceita apenas planos: `RESTPostAPIOrderCreateBody.plan` e `months` são obrigatórios, `amount` saiu, e `related_to.plan` é sempre presente.
- `OrderStatus`, `OrderType` e `OrderProvider` ganham `const` companheiro. `APIOrderCreateResponse` ganha `discount` (`APIOrderDiscount`). Nova `RESTGetAPIOrderListQuery`.
- `APIApplication` e `APIDatabase` perdem `use_credits` e `credits_used`; os tipos de saldo e uso foram removidos.

### Renomeados

- `RESTPostAPIApplicationUpdateConfigResponse` → `RESTPatchAPIApplicationUpdateConfigResponse`
- `RESTPostAPIPixPaymentResponse` → `RESTPostAPIOrderPixPaymentResponse`; `APIPixPaymentResponse` → `APIOrderPixPayment`
- `RESTPostAPIApplicationEnvironmentObject` → `RESTPostAPIApplicationEnvironmentVariableBody`
- `APICustomDomainResponse` → `APIApplicationCustomDomain`, `APISubdomainResponse` → `APIApplicationSubdomain`, `APIWebhookUrl` → `APIApplicationWebhookUrl`, `APIDnsRecord` → `APIApplicationDnsRecord`, `APIAppFileUploadResponse` → `APIApplicationFileUpload`
- `APIOrderCreateType` → `OrderType`

### Pacote

- Tipos que nunca fizeram parte da API pública foram removidos.
- Todo link `@see` aponta para uma página existente da referência da API.

## 0.1.1

- `APIApplication` ganha `missing_dependencies`, com os tipos REST de instalação de dependências.

## 0.1.0

- `APIActivity.title` e `message` passam de `string` para `LocalizedContent`, para tradução.
- `plan_id` em aplicação e workspace; aplicação e banco ganham o workspace dono.
- Variáveis de ambiente de aplicação e ajustes no status.
- `APIDatabase` perde `db_name`, `username`, `password` e `connection`.
- `domain` renomeado para `subdomain`.

## 0.0.38 (2026-03-21)

- Tipos de pedido (`APIOrderCreateResponse`, `APIOrderStatus`, `APIOrderListItem`, `OrderStatus`, `OrderType`, `OrderProvider`), resgate de código (`APIRedeemResponse`) e notificações (`RESTGetAPINotificationsResponse`).
- Aplicação: `APIApplicationOperationResponse`, `APIApplicationDeployment`, DNS, webhook, subdomínio e domínio personalizado.
- Banco: `APIDatabasePasswordReset`. Usuário: `APIUserApiKey` e `is_current` em `APIUserSession`. Workspace: adicionar membro e alterar papel. Snapshot: `APISnapshotRestoreResponse`.
- Envelopes REST de aplicações, bancos, usuário, workspaces e snapshots.
- Links `@see` apontam para a documentação.

## 0.0.37 (2026-03-19)

- Tipos de workspace (`APIWorkspace`, `APIWorkspaceInfoResponse`, `APIWorkspaceMember`) substituem os de organização.
- `offline_since` em `APIApplication` e `APIDatabase`.

## 0.0.36 (2026-03-17)

- Linguagens `ruby`, `java` e `rust` em `ApplicationLanguage`.

## 0.0.35 (2026-03-10)

- Módulo `snapshot` dedicado: `APIResourceSnapshot`, `APIGroupedResourceSnapshots` e `ResourceType`.

## 0.0.34 (2026-03-09)

- **Breaking:** backup passa a se chamar snapshot em todos os tipos e campos. Tipos de commit removidos.

## 0.0.33 (2026-03-08)

- Ajustes nos tipos de banco.

## 0.0.32 (2026-03-06)

- Notificações: `APINotification`, `NotificationType`, `NotificationImportance` e `LocalizedContent`.
- Usuário: `language`, `APIUserConnection` e `APIUserSession`. Novo `RESTGetAPIUserInfoResponse`.

## 0.0.31 (2026-01-17)

- `description` opcional em `APIApplication`; `email` em `APIUser`.

## 0.0.30 (2025-12-01)

- Linguagens `go` e `php` em `ApplicationLanguage`.

## 0.0.29 (2025-11-24)

- Ajustes no tipo de plano do usuário.

## 0.0.28 (2025-11-14)

- `static` em `ApplicationLanguage`, para sites estáticos.

## 0.0.27 (2025-11-10)

- Cluster `USA_3` em `ApplicationCluster` e `DatabaseCluster`.

## 0.0.26 (2025-10-22)

- Plano `INTERMEDIARY` (id 9) em `UserPlan`.

## 0.0.25 (2025-09-22)

- Ajustes no enum de linguagens.

## 0.0.24 (2025-09-19)

- Melhorias gerais de tipagem.

## 0.0.23 (2025-08-03)

- **Breaking:** `APIDatabase` perde `password`, `username` e `connection`.

## 0.0.22 (2025-07-25)

- Estrutura de memória de `APIUserPlan` e tipos de organização e usuário atualizados.

## 0.0.21 (2025-07-22)

- Ajustes no plano do usuário.

## 0.0.20 (2025-07-12)

- Ajustes na conexão de banco.

## 0.0.19 (2025-07-10)

- `APIApplicationEnvironment` e `RESTGetAPIApplicationEnvironmentResponse`.

## 0.0.18 (2025-07-03)

- `APIApplicationNetwork`, métricas e status de banco.

## 0.0.17 (2025-06-28)

- Atividades: `APIActivity`, `ActivityStatus`, `ActivityTargetType` e envelopes REST.

## 0.0.16 (2025-06-25)

- Tipos de backup de aplicação (depois renomeados para snapshot).

## 0.0.15 (2025-06-17)

- Tipos de commit de aplicação (depois substituídos por snapshots).

## 0.0.14 (2025-05-03)

- Gerenciador de arquivos: `APIApplicationFile`, `APIApplicationFileTree`, `APIApplicationFileContent` e tipos relacionados.
- `custom_domain` em `APIApplication`.

## 0.0.13 (2025-04-28)

- Tipos de organização (depois renomeados para workspace).

## 0.0.12 (2025-04-21)

- Primeira versão: usuário, plano, aplicação, banco, status, tipos comuns e envelopes REST.
