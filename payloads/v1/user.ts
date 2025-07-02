import type {
	APIApplication,
	APIDatabase,
	ISODateString,
	SnowFlake,
} from "../../v1";

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/users
 */
export type UserPlan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export const UserPlan = {
	Free: 1,
	Economy: 2,
	Pro: 3,
	Scale: 4,
	Enterprise4: 5,
	Enterprise8: 6,
	Enterprise16: 7,
	Enterprise32: 8,
} as const;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/users
 */
export type UserDatabasePlan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export const UserDatabasePlan = {
	Redis128: 1,
	Redis256: 2,
	Redis512: 3,
	Redis1024: 4,
	MongoDB1: 5,
	MongoDB2: 6,
	MongoDB5: 7,
	MongoDB10: 8,
	PostgreSQL1: 9,
	PostgreSQL2: 10,
	PostgreSQL5: 11,
	PostgreSQL10: 12,
} as const;

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
export interface APIUserPlan {
	id: UserPlan;
	name: string;
	expires_at: ISODateString | null;
	memory: APIUserPlanMemory;
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
