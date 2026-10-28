import type { APIGroupedResourceSnapshots, APIPayload, APIResourceSnapshot, APISnapshotRestoreResponse, SnapshotScope } from "../../v1";

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
 * `POST /v1/users/:id/snapshots`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/snapshots/create
 */
export type RESTPostAPISnapshotCreateQuery = RESTGetAPISnapshotsQuery;

/**
 * `POST /v1/users/:id/snapshots/:snapshot_id/restore`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/snapshots/restore
 */
export type RESTPostAPISnapshotRestoreQuery = RESTGetAPISnapshotsQuery;

/**
 * `GET /v1/users/:id/snapshots/:snapshot_id/download`.
 * A snapshot marked `closed` cannot be downloaded: the route returns `TEMPLATE_CLOSED`.
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
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/snapshots/create
 */
export type RESTPostAPISnapshotCreateResponse = APIPayload<APIResourceSnapshot>;

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
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/snapshots/restore
 */
export type RESTPostAPISnapshotRestoreResponse = APIPayload<APISnapshotRestoreResponse>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/snapshots/download
 */
export type RESTGetAPISnapshotDownloadResponse = ArrayBuffer;
