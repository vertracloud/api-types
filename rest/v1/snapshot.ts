import type { APIGroupedResourceSnapshots, APIPayload, APIResourceSnapshot, APISnapshotRestoreResponse } from "../../v1";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/commits/getall
 */
export type RESTGetAPISnapshotsResponse = APIPayload<APIResourceSnapshot[]>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/commits/getall
 */
export type RESTGetAPIGroupedSnapshotsResponse = APIPayload<APIGroupedResourceSnapshots[]>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/commits/upload
 */
export type RESTGetAPISnapshotResponse = APIPayload<APIResourceSnapshot>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/commits/upload
 */
export type RESTPostAPISnapshotCreateResponse = APIPayload<APIResourceSnapshot>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/commits/revert
 */
export type RESTPostAPISnapshotRestoreResponse = APIPayload<APISnapshotRestoreResponse>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/commits/download
 */
export type RESTGetAPISnapshotDownloadResponse = ArrayBuffer;
