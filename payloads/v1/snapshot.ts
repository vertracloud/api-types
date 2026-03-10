import type { ISODateString, SnowFlake } from "../../v1";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/snapshots
 */
export type ResourceType = 1 | 2;
export const ResourceType = {
	APPLICATION: 1,
	DATABASE: 2,
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/snapshots
 */
export interface APIResourceSnapshot {
	id: SnowFlake;
	resource_id: SnowFlake;
	author_id: SnowFlake | null;
	size: string;
	date: ISODateString;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/snapshots
 */
export interface APIGroupedResourceSnapshots {
	resource_id: SnowFlake;
	resource_name: string | null;
	type: ResourceType;
	snapshots: APIResourceSnapshot[];
}
