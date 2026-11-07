import type { APIGroupedResourceSnapshots, APIPayload, APIResourceSnapshot, APISnapshotDownloadURL, APISnapshotRestoreResponse, SnapshotScope } from "../../v1";

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
 * By default the response is the zip: snapshots up to 100 MB are served directly (`200`), larger ones answer `302 Found` with a short-lived `Location`
 * (valid for a few minutes) that serves the zip; HTTP clients that follow redirects (browsers, `fetch`, the SDKs, `curl -L`) receive the file in both cases.
 * With `redirect=false` it always answers `200` with that link as JSON (`RESTGetAPISnapshotDownloadURLResponse`), for clients that want to start the
 * download themselves.
 * A snapshot marked `closed` cannot be downloaded: the route returns `TEMPLATE_CLOSED`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/snapshots/download
 */
export interface RESTGetAPISnapshotDownloadQuery extends RESTGetAPISnapshotsQuery {
	/** `false` returns the download link as JSON instead of redirecting. Default `true`. */
	redirect?: boolean;
}

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
 * Body after following the redirect of the download (the zip itself).
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/snapshots/download
 */
export type RESTGetAPISnapshotDownloadResponse = ArrayBuffer;

/**
 * `GET /v1/users/:id/snapshots/:snapshot_id/download?redirect=false`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/snapshots/download
 */
export type RESTGetAPISnapshotDownloadURLResponse = APIPayload<APISnapshotDownloadURL>;
