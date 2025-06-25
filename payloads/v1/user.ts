import type {
	APIApplication,
	APIDatabase,
	ISODateString,
	SnowFlake,
} from "../../v1";

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/users
 */
export type UserActivityType = 1 | 2 | 3 | 4 | 5;
export const UserActivityType = {
	Deploy: 1,
	Backup: 2,
	Server: 3,
	Security: 4,
	Creation: 5,
} as const;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/users
 */
export type UserPlan = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export const UserPlan = {
	Free: 1,
	Core: 2,
	Pro: 3,
	Scale: 4,
	Starter: 5,
	Enterprise12: 6,
	Enterprise16: 7,
} as const;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/users
 */
export interface APIUserActivity {
	id: string;
	type: UserActivityType;
	message: string;
	timestamp: ISODateString;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/users
 */
export interface APIUser {
	id: SnowFlake;
	name: string;
	plan: UserPlan;
	created_at: ISODateString;
	updated_at: ISODateString;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/users
 */
export interface APIUserPlanMemory {
	limit: number;
	used: number;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/users
 */
export interface APIUserPlanStorage {
	limit: number;
	used: number;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/users
 */
export interface APIUserPlan {
	id: UserPlan;
	name: string;
	memory: APIUserPlanMemory;
	storage: {
		mongodb: APIUserPlanStorage;
		postgresql: APIUserPlanStorage;
		redis: APIUserPlanStorage;
	};
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/users
 */
export interface APIUserInfoResponse {
	id: SnowFlake;
	name: string;
	plan: APIUserPlan;
	applications: APIApplication[];
	databases: APIDatabase[];
	created_at: ISODateString;
	updated_at: ISODateString;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/users
 */
export interface APIUserOrgInviteKey {
	code: SnowFlake;
	created_at: ISODateString;
	expire_at: ISODateString;
}
