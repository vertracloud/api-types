import type { ISODateString, SnowFlake } from "../../v1";

/**
 * @see https://docs.cloud.com/api-reference/endpoint/status
 */
export type UserActivitiesType = 1 | 2 | 3 | 4 | 5;
export const UserActivitiesType = {
	Deploy: 1,
	Backup: 2,
	Server: 3,
	Security: 4,
	Creation: 5,
} as const;

/**
 * @see https://docs.cloud.com/api-reference/endpoint/users
 */
export interface APIUserActivities {
	id: string;
	type: UserActivitiesType;
	message: string;
	timestamp: ISODateString;
}

/**
 * @see https://docs.cloud.com/api-reference/endpoint/users
 */
export interface APIUser {
	id: SnowFlake;
	name: string;
	created_at: ISODateString;
	updated_at: ISODateString;
}
