import type { APIGroupedResourceSnapshots, APIPayload, APIResourceSnapshot, APISnapshotCreateAccepted, APISnapshotJob, APISnapshotRestoreAccepted, SnapshotJobKind, SnapshotScope } from "../../v1";

/**
 * `GET /v1/users/:id/snapshots` — snapshots of one resource. Every snapshot route under
 * `/v1/users/...` requires `scope`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/snapshots/getall
 */
export interface RESTGetAPISnapshotsQuery {
	scope: SnapshotScope;
}

/**
 * `GET /v1/users/snapshots` — every snapshot of the account, grouped by resource.
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/snapshots
 */
export type RESTGetAPIGroupedSnapshotsQuery = RESTGetAPISnapshotsQuery;

/**
 * `POST /v1/users/:id/snapshots` — a manual snapshot. It is also how to download a whole application: take the snapshot, then
 * download it with `GET /v1/users/:id/snapshots/:snapshot_id/download`. An application of an account without a plan answers
 * `403 PLAN_NOT_ALLOWED`; the snapshots it already has can still be listed and downloaded.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/snapshots/create
 */
export type RESTPostAPISnapshotCreateQuery = RESTGetAPISnapshotsQuery;

/**
 * `POST /v1/users/:id/snapshots/:snapshot_id/restore`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/snapshots/restore
 */
export type RESTPostAPISnapshotRestoreQuery = RESTGetAPISnapshotsQuery;

/**
 * `GET /v1/users/:id/snapshots/:snapshot_id/download`. The response is the snapshot's zip (`200`), whatever its size.
 * A snapshot marked `closed` cannot be downloaded: the route returns `TEMPLATE_CLOSED`. With an API key, the `snapshots:read`
 * scope is required (also to download a whole application, which is a snapshot).
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/snapshots/download
 */
export type RESTGetAPISnapshotDownloadQuery = RESTGetAPISnapshotsQuery;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/snapshots/getall
 */
export type RESTGetAPISnapshotsResponse = APIPayload<APIResourceSnapshot[]>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/snapshots
 */
export type RESTGetAPIGroupedSnapshotsResponse = APIPayload<APIGroupedResourceSnapshots[]>;

/**
 * `201` with the snapshot when it is ready within 90 seconds; otherwise `202` with `{ response: { job_id } }`, the job
 * to follow on `GET /v1/users/:id/snapshots/jobs/:job_id` (once `ready`, its `snapshot_id` is the snapshot, which also
 * shows up in the list). Clients must handle both. A manual snapshot of the same account already running answers
 * `409 OPERATION_IN_PROGRESS` (`APIOperationInProgressDetails`).
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/snapshots/create
 */
export type RESTPostAPISnapshotCreateResponse = APIPayload<APIResourceSnapshot> | APIPayload<APISnapshotCreateAccepted>;

/**
 * Optional body of the restore. `resource_id` absent = restore into the resource of the URL's `:id`. A snapshot marked `closed` only restores into an application of the same
 * template (otherwise `TEMPLATE_CLOSED`).
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/snapshots/restore
 */
export interface RESTPostAPISnapshotRestoreBody {
	/** Target resource (same kind as the snapshot) when restoring into another resource. */
	resource_id?: string;
	/** Application on a custom Docker image: also go back to the image version the application ran when the snapshot was taken, if it still exists. Default `false` (data only). */
	restore_image_version?: boolean;
}

/**
 * `202`: the restore runs as a job and the resource is not restored yet; follow `response.job_id` on
 * `GET /v1/users/:id/snapshots/jobs/:job_id`. The restore replaces the target's current data and there is no undo: take a
 * snapshot of the target first if you may need its data again. A restore too soon after the previous one
 * answers `429 RESTORE_COOLDOWN` (`APIRestoreCooldownDetails`: wait `retry_after` seconds).
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/snapshots/restore
 */
export type RESTPostAPISnapshotRestoreResponse = APIPayload<APISnapshotRestoreAccepted>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/snapshots/download
 */
export type RESTGetAPISnapshotDownloadResponse = ArrayBuffer;

/**
 * `GET /v1/users/:id/snapshots/jobs` — snapshot and restore jobs of one resource, most recent first. `:id` is the
 * resource; `scope` is required like on the other snapshot routes.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/snapshots/jobs/list
 */
export interface RESTGetAPISnapshotJobsQuery extends RESTGetAPISnapshotsQuery {
	/** Only jobs of this kind. Default: both. */
	kind?: SnapshotJobKind;
	/** Maximum number of jobs, from 1 to 50. Default 10. Outside that range the response is `400 VALIDATION_ERROR`. */
	limit?: number;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/snapshots/jobs/list
 */
export type RESTGetAPISnapshotJobsResponse = APIPayload<APISnapshotJob[]>;

/**
 * `GET /v1/users/:id/snapshots/jobs/:job_id` — one job of the resource `:id`. `scope` is optional here: the job knows whether
 * it is of an application or a database. A job of another resource or account, or an unknown one, is `404 SNAPSHOT_NOT_FOUND`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/snapshots/jobs/get
 */
export type RESTGetAPISnapshotJobQuery = Partial<RESTGetAPISnapshotsQuery>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/snapshots/jobs/get
 */
export type RESTGetAPISnapshotJobResponse = APIPayload<APISnapshotJob>;
