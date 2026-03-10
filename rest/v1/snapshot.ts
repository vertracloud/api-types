import type { APIGroupedResourceSnapshots, APIPayload, APIResourceSnapshot } from "../../v1";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/snapshots
 */
export type RESTGetAPISnapshotsResponse = APIPayload<APIResourceSnapshot[]>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/snapshots
 */
export type RESTGetAPIGroupedSnapshotsResponse = APIPayload<APIGroupedResourceSnapshots[]>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/snapshots
 */
export type RESTGetAPISnapshotResponse = APIPayload<APIResourceSnapshot>;
