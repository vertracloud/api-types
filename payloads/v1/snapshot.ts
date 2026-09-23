import type { ApplicationType, DatabaseType, ISODateString, SnowFlake } from "../../v1";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/snapshots
 */
export type ResourceType = 1 | 2;
export const ResourceType = {
	APPLICATION: 1,
	DATABASE: 2,
} as const;

/**
 * `resource_type` of a snapshot: the resource's own type at snapshot time — `ApplicationType` for
 * an application snapshot, `DatabaseType` (the engine) for a database snapshot.
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/snapshots
 */
export type SnapshotResourceType = ApplicationType | DatabaseType;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/snapshots
 */
export interface APIResourceSnapshot {
	id: SnowFlake;
	resource_id: SnowFlake;
	author_id: SnowFlake | null;
	resource_type: SnapshotResourceType | null;
	size: string;
	date: ISODateString;
	/**
	 * Name the resource had when this snapshot was taken — frozen: it does not follow renames and
	 * is kept after the project is deleted. `null` for snapshots taken before this field existed.
	 * For the CURRENT resource name, use `APIGroupedResourceSnapshots.resource_name`.
	 */
	resource_name: string | null;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/snapshots
 */
export interface APIGroupedResourceSnapshots {
	resource_id: SnowFlake;
	/**
	 * CURRENT resource name. If the resource was deleted, falls back to the `resource_name` of the
	 * group's most recent snapshot; `null` only when neither exists.
	 */
	resource_name: string | null;
	type: ResourceType;
	resource_type: SnapshotResourceType | null;
	snapshots: APIResourceSnapshot[];
}

/**
 * Query of the snapshot routes under `/v1/users/...`: which kind of resource the snapshot belongs
 * to. Required — a missing `scope` returns 400.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/snapshots
 */
export type SnapshotScope = "applications" | "databases";
export const SnapshotScope = {
	APPLICATIONS: "applications",
	DATABASES: "databases",
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/snapshots/restore
 */
export interface APISnapshotRestoreResponse {
	message: string;
}
